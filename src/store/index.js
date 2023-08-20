import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import books from "./bookSlice";
import report from "./reportSlice";

export default configureStore({
    reducer: { books, auth, report }
})