import { createSlice } from "@reduxjs/toolkit";
import { lsToCart } from "./CartSlice";


const UserSlice = createSlice(
    {
        name:"user",
        initialState:{
            data:null,
            token:null
        },
        reducers:{
            signUp(){

            },
            loginUser(state,{payload}){
                // console.log(payload,"0000")
              state.data= payload.user;
              state.token= payload.token;

              localStorage.setItem("user" ,JSON.stringify(payload))
            },
            logoutUser(state){
                state.data=null
                localStorage.removeItem("user");

            },
            lsToUser(state){
                    const lsUser=localStorage.getItem("user");
                    if(lsUser){
                        state.data =JSON.parse(lsUser);
                    }
                }
        }
    }
)

export const {signUp,loginUser,logoutUser,lsToUser}=UserSlice.actions;
export default UserSlice.reducer;