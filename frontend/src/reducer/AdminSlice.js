import { createSlice } from "@reduxjs/toolkit";
import { lsToCart } from "./CartSlice";


const AdminSlice = createSlice(
    {
        name:"admin",
        initialState:{
            data:null
        },
        reducers:{
            signUp(){

            },
            loginAdmin(state,{payload}){
                // console.log(payload,"0000")
              state.data= payload;
              localStorage.setItem("admin" ,JSON.stringify(payload))
            },
            logoutAdmin(state){
                state.data=null
                localStorage.removeItem("admin");

            },
            lsToAdmin(state){
                    const lsUser=localStorage.getItem("admin");
                    if(lsUser){
                        state.data =JSON.parse(lsUser);
                    }
                }
        }
    }
)

export const {signUp,loginAdmin,logoutAdmin,lsToAdmin}=AdminSlice.actions;
export default AdminSlice.reducer;