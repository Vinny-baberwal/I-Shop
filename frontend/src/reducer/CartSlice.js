import { createSlice } from "@reduxjs/toolkit";



const CartSlice =createSlice(
    {
        name:"cart",
        initialState:{
            cart:[],
            total:0,
        },
        
        reducers:{
            emptyCart(state){
                state.cart=[]
                state.total=0
                localStorage.removeItem("cartData");
                
            },
            lsToCart(state){
                const lsCartData = localStorage.getItem("cartData");
                if(lsCartData){
                    const d = JSON.parse(lsCartData);
                    state.cart=d.cart;
                    state.total=d.total; 
                }

            },
            addToCart(state, {payload}){
                // console.log(payload)
                const found = state.cart.find(item=>item.pId==payload.pId);
                 if(found){
                    found.qty++;
                 }else{
                    state.cart.push({pId:payload.pId,qty:1})
                 }
           
              state.total += Number(payload.price)
            },
            removeFormCart(state, {payload}){
                const newData= state.cart.filter(
                    (item)=>{
                        if(item.pId==payload.pId){
                            return false;
                        }else{
                            return true;
                        }
                    }
                )
                state.cart=[...newData];
                state.total -=payload.total_price;

            },
            changeQty(state, {payload}){
                const found = state.cart.find(item=>item.pId==payload.pId);
                if(found){
                    found.qty =payload.new_qty;
                } 
                if(payload.flag==true){
                    state.total += Number(payload.price)
                }else{
                    state.total -= Number(payload.price)
                }

            },
            userDBcart(state,{payload}){
                // console.log(payload.userDBcart,"000000000000")
                 state.cart=payload.userDBcart;
                 state.total=payload.total;
            }, 
            

        }
    }
)

export const{addToCart,removeFormCart,changeQty,lsToCart,emptyCart,userDBcart,mergeCart}=CartSlice.actions;
export default CartSlice.reducer;