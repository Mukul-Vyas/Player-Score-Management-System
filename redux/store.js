// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cardsReducer, {addCard} from "./cardsSlice"


const preExistingCards = [
  {
    id: "1",
    name: "Rahul Dravid",
    country: "India",
    score: "120",
  },
  {
    id: "2",
    name: "Ross Taylor",
    country: "New Zealand",
    score: "92",
  },
  
];

const rootReducer = combineReducers({
  cards: cardsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

preExistingCards.forEach((card) => {
  store.dispatch(addCard(card));
});

export default store;
