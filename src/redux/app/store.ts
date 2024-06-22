import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import  todoReducer  from "../features/todo/sliceTodo";
import { apiSlice } from '../Api/apiSlice';

export const store = configureStore({
    // reducer: todoReducer,
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});