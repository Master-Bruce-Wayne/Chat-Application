import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"

const store = configureStore({
    devTools:true,
    reducer:{
        user: userReducer
    }
});
export default store;