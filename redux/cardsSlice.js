import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate an asynchronous operation, e.g., saving to a server
const saveToServer = async (card) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return card;
};

// Simulate an asynchronous operation, e.g., deleting from a server
const deleteFromServer = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return id;
};

// Simulate an asynchronous operation, e.g., updating on a server
const updateOnServer = async (card) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return card;
};

const initialState = {
  cards: [],
};

// Create async action creators
export const addCard = createAsyncThunk("cards/addCard", async (card) => {
  const savedCard = await saveToServer(card);
  return savedCard;
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  await deleteFromServer(id);
  return id;
});

export const updateCard = createAsyncThunk("cards/updateCard", async (card) => {
  const updatedCard = await updateOnServer(card);
  return updatedCard;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.cards = state.cards.filter((card) => card.id !== idToDelete);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const index = state.cards.findIndex((card) => card.id === updatedCard.id);
        if (index !== -1) {
          state.cards[index] = updatedCard;
        }
      });
  },
});

export default cardsSlice.reducer;
