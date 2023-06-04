import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';


interface Note {
  id: string;
  content: string;
}
interface Board {
  id: string;
  name:string;
  notes:Note[]
}

interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [
    {
      name:'Todo',
      id:uuidv4(),
      notes:[
      { id: uuidv4(), content: 'Note 1' },
      { id: uuidv4(), content: 'Note 2' },
    ]},
    {
      name:'In Progress',
      id:uuidv4(),
      notes:[ 
    ]},
    {
      name:'Done',
      id:uuidv4(),
      notes:[]
    },   
  ]
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveNote: (state, action: PayloadAction<{currentBoardId:string; newBoardId: string; noteId: string }>) => {
      const { currentBoardId, newBoardId,noteId } = action.payload;
      const { boards } = state;
      const currentBoardIndex = findBoard(boards,currentBoardId)
      const newBoardIndex = findBoard(boards,newBoardId)
      const noteIndex = findNote(boards[currentBoardIndex],noteId)
      const removedNote =boards[currentBoardIndex].notes.splice(noteIndex,1)[0]
      boards[newBoardIndex].notes.push(removedNote)
      
    },
   
    addNote: (state, action: PayloadAction<{boardId:string; noteText:string;  }>) => {
      const { boards } = state; 
      const { boardId,noteText} = action.payload;
      boards.find(board=>board.id===boardId)?.notes.push({id:uuidv4(),content:noteText})
    },
    addBoard: (state, action: PayloadAction<{boardName:string}>) => {
      const { boards } = state; 
      const { boardName} = action.payload;
      let newBoard = {
        name:boardName,
        id:uuidv4(),
        notes:[]
      }
      boards.push(newBoard)
    },
   
  },
});

export const { moveNote,addNote,addBoard } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;

// Helper functions

const findBoard = (boards:Board[],boardId:string) => {
const foundBoard = boards.findIndex(board=>board.id===boardId)
return foundBoard
}
const findNote = (board:Board,noteId:string) => {
const foundNoteIndex = board.notes.findIndex(note=>note.id===noteId)
return foundNoteIndex
}
