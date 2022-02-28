import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import BooksSearchSlice from "./BooksSearchSlice";
// import testSlice from "./TestSlice";

const reducer = combineReducers({
  books: BooksSearchSlice,
  // test: testSlice
});

const store = configureStore({
  reducer,
});

export default store;