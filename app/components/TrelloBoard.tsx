import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { moveNote } from "../redux/boardSlice";
import AddNote from "./AddNote";
import AddBoard from "./AddBoard";
// Styled components
const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ColumnContainer = styled.div`
  padding: 10px;
  background: #8080805e;
  border-radius: 8px;
  min-width: 350px;
  h1 {
    font-size: 24px;
    margin-bottom: 8px;
    color: black;
  }
`;

const Note = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;
const NewBoardBtn = styled.button`
  height: 48px;
  border-radius: 12px;
  min-width: 350px;
  background: rgb(0 0 0 / 57%);
  color: black;
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: white;
  svg {
    width: 24px;
  }
`;
// Column component
const Column: React.FC<{
  id: string;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  children: any;
}> = ({ id, onDragOver, onDrop, children }) => {
  return (
    <ColumnContainer id={id} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </ColumnContainer>
  );
};
// Trello Board component
const TrelloBoard: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.board.boards);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    noteId: string,
    boardId: string
  ) => {
    event.dataTransfer.setData("noteId", noteId);
    event.dataTransfer.setData("currentBoardId", boardId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newBoardId: string
  ) => {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("noteId");
    const currentBoardId = event.dataTransfer.getData("currentBoardId");

    //TODO:handle moving note
    dispatch(moveNote({ currentBoardId, newBoardId, noteId }));
  };

  return (
    <BoardContainer>
      {boards.map((board) => {
        return (
          <Column
            key={board.id}
            id={board.name}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, board.id)}
          >
            <h1>{board.name}</h1>
            {board.notes.map((note) => (
              <Note
                key={note.id}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, note.id, board.id)
                }
              >
                {note.content}
              </Note>
            ))}
            <AddNote boardId={board.id} />
          </Column>
        );
      })}
      <AddBoard />
    </BoardContainer>
  );
};

export default TrelloBoard;
