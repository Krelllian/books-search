import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import BooksSearchSlice from "./BooksSearchSlice";

const reducer = combineReducers({
  books: BooksSearchSlice,
});

const store = configureStore({
  reducer,
});

export default store;