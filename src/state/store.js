import baseUrlSlice from "./baseUrlSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store=configureStore({
    reducer:{
        baseUrl:baseUrlSlice
    }
})