import {configureStore} from "@reduxjs/toolkit"
import CartSlice from "./reducer/CartSlice";
import UserSlice from "./reducer/UserSlice";
import AdminSlice from "./reducer/AdminSlice";


const store =configureStore(
    {
        reducer:{
        "cart":CartSlice,
        "user":UserSlice,
        "admin":AdminSlice
        }
    }
)

export default store;