import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { allowedNodeEnvironmentFlags } from "process";
import { IBooks, IData, IStore } from '../common/interfaces/reduxStoreInterfaces'

const apiKey = process.env.REACT_APP_API_KEY
const booksUrl = 'https://www.googleapis.com/books/v1/volumes/'
const q = 'js'

const initialState: IBooks = {
    data: [],
    currentBookCardData: [],
    search: '',
    maxResults: 30,
    startIndex: 30,
    category: '',
    booksCount: 0,
    orderBy: 'relevance',

    booksDisplay: false,
    bookCardDisplay: false,

    loading: false,
    apiError: false,
}

export const getBooks: any = createAsyncThunk(
    'books/getBooks',
    async (_, { rejectWithValue, dispatch, getState }) => {
        const state: any = getState()
        const res = await axios({
            method: 'get',
            url: `${booksUrl}?q=intitle:${state.books.search}+subject:${state.books.category}&key=${apiKey}&maxResults=${state.books.maxResults}&orderBy=${state.books.orderBy}`
        });

        dispatch(setBooksStartIndex(30))
        dispatch(setBooksCount(res.data.totalItems))
        dispatch(setBooksDisplay(true))
        dispatch(setBooksData(res.data.items))
        dispatch(setBookCardDisplay(false))
    }
)

export const getBookCardById: any = createAsyncThunk(
    'books/getBookCardById',
    async (bookID, { rejectWithValue, dispatch, getState }) => {
        const state: any = getState()
        const res = await axios({
            method: 'get',
            url: `${booksUrl}${bookID}`
        });

        dispatch(setCurrentBookCardData(res.data))
    }
)

export const loadMoreBooks: any = createAsyncThunk(
    'books/loadMoreBooks',
    async (_, { rejectWithValue, dispatch, getState }) => {
        const state: any = getState()
        const res = await axios({
            method: 'get',
            url: `${booksUrl}?q=intitle:${state.books.search}+subject:${state.books.category}&key=${apiKey}&maxResults=${state.books.maxResults}&startIndex=${state.books.startIndex}`
        });

        dispatch(pushBooksData(res.data.items))
        dispatch(setBookCardDisplay(false))
    }
)

const booksSearchSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooksData: (state, action) => {
            state.data = action.payload;
        },
        setCurrentBookCardData: (state, action) => {
            state.currentBookCardData = action.payload;
        },
        setBooksCategory: (state, action) => {
            state.category = action.payload;
        },
        setBooksSearch: (state, action) => {
            state.search = action.payload;
        },
        setBooksCount: (state, action) => {
            state.booksCount = action.payload
        },
        setBooksDisplay: (state, action) => {
            state.booksDisplay = action.payload
        },
        setBookCardDisplay: (state, action) => {
            state.bookCardDisplay = action.payload
        },
        setBooksStartIndex: (state, action) => {
            state.startIndex = action.payload
        },
        setBooksOrderBy: (state, action) => {
            state.orderBy = action.payload
        },
        pushBooksData: (state, action) => {
            state.data = [...state.data, ...action.payload]
            state.startIndex = state.startIndex + 30
        },
    },
    extraReducers: {
        [getBooks.pending]: (state) => { state.loading = true; state.booksDisplay = false; state.bookCardDisplay = false },
        [getBooks.fulfilled]: (state) => { state.loading = false },
        [getBooks.rejected]: (state) => { state.loading = false; state.apiError = true; },
        [getBookCardById.rejected]: (state) => { state.apiError = true; },
        [loadMoreBooks.rejected]: (state) => { state.apiError = true; },
    }
});

export const { setBooksData, pushBooksData, setBooksCategory, setBooksSearch, setBooksCount, setBooksDisplay, setBookCardDisplay,
    setBooksOrderBy, setBooksStartIndex, setCurrentBookCardData } = booksSearchSlice.actions;

export default booksSearchSlice.reducer;