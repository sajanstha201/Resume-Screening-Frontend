import { createSlice } from "@reduxjs/toolkit";

export const BaseUrlSlice=createSlice({
    name:'base_url',
    initialState:{
         'backend':'http://sajanstha20155.pythonanywhere.com/',
    //    'backend':'http://127.0.0.1:8000/',
        'frontend':'http://localhost:3000/',
    },
    reducers:{
    }
})
export default BaseUrlSlice.reducer