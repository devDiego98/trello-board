import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { deleteNote, moveNote } from "../redux/boardSlice";
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
  background: #ffffff96;
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
  display: flex;
  justify-content: space-between;
  button {
    background: transparent;
    border: none;
  }
  svg {
    width: 16px;
    color: red;
  }
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
                <button
                  onClick={() => dispatch(deleteNote({ noteId: note.id }))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
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
