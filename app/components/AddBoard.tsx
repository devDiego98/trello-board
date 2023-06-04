import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { addBoard } from "../redux/boardSlice";
const AddBoard: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const boardName = useRef("");
  const dispatch = useDispatch();

  const handleAddCardClick = () => {
    setShowInput(true);
  };

  const handleCardInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    boardName.current = event.target.value;
  };

  const handleCardSubmit = () => {
    // Handle the submission logic here (e.g., send the cardText to an API, update state, etc.)
    dispatch(addBoard({ boardName: boardName.current }));

    // Reset the component state

    boardName.current = "";
    setShowInput(false);
  };

  const handleCardCancel = () => {
    // Reset the component state
    boardName.current = "";
    setShowInput(false);
  };

  const AddNoteBtn = styled.button`
    width: 350px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
    padding: 4px 0 4px 8px;
    border: none;
    &:hover {
      background: #0000ff3b;
      color: white;
    }
    svg {
      width: 20px;
    }
  `;
  const BtnContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `;
  const SubmitBtn = styled.button`
    background: #0c66e4;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    &:hover {
      background: #1259bd;
    }
  `;
  const CancelBtn = styled.button`
    border: none;
    width: 24px;
    height: 24px;
    background: transparent;
    svg {
      width: 24px;
    }
  `;
  const openAnimation = keyframes`
  from {
    height: 0px;
  }
  to {
    height: 100px; /* Adjust the desired height */
  }
`;
  const NoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 350px;
    height: ${showInput ? "100px" : "0px"};
    overflow: hidden;
    transition: height 1s;
    animation: ${showInput ? openAnimation : "none"} 0.4s;
  `;
  const InputTextField = styled.input`
    padding: 8px;
    border-radius: 8px;
    border: 1px solid grey;
    max-width: 100%;
  `;
  return (
    <div>
      {!showInput ? (
        <AddNoteBtn onClick={handleAddCardClick}>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add a board
        </AddNoteBtn>
      ) : (
        <NoteContainer>
          <InputTextField
            placeholder="Board Name Here..."
            type="text"
            onChange={handleCardInputChange}
          />
          <BtnContainer>
            <SubmitBtn onClick={handleCardSubmit}>Add Board</SubmitBtn>
            <CancelBtn onClick={handleCardCancel}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </CancelBtn>
          </BtnContainer>
        </NoteContainer>
      )}
    </div>
  );
};

export default AddBoard;
