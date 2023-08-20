import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk('book/getBooks',
    async (_, thunkABI) => {
        const { rejectWithValue } = thunkABI;
        try {
            const res = await fetch("https://book-data-96nl.onrender.com/books");
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const insertBook = createAsyncThunk('book/insertBook',
    async (bookData, thunkABI) => {
        const { rejectWithValue, getState, dispatch } = thunkABI;
        try {
            bookData.userName = getState().auth.name;
            const res = await fetch("https://book-data-96nl.onrender.com/books", {
                method: 'post',
                body: JSON.stringify(bookData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await res.json();
            dispatch(logInsert({ name: 'insertBook', status: 'success' }))
            return data;
        } catch (error) {
            dispatch(logInsert({ name: 'insertBook', status: 'failed' }))
            return rejectWithValue(error.message);
        }
    })

export const deleteBook = createAsyncThunk('book/deleteBook', async (item, thunkABI) => {
    const { rejectWithValue } = thunkABI;
    try {
        await fetch(`https://book-data-96nl.onrender.com/books/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return item;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const getBook = createAsyncThunk('book/getBook', async (item, thunkABI) => {
    const { rejectWithValue } = thunkABI;
    try {
        await fetch(`https://book-data-96nl.onrender.com/books/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        return item;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})



const bookSlice = createSlice({
    name: "book",
    initialState: { books: [], isLoading: false, error: null, bookInfo: null },
    extraReducers: {
        // get books
        [getBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // insert books
        [insertBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books.push(action.payload)
        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // delete data
        [deleteBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = state.books.filter((el) => el.id !== action.payload.id);
        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // read book
        [getBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bookInfo = action.payload;
        },
    },
})

export default bookSlice.reducer