import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartIteam, setCartItem] = useState({});
  const url = "http://localhost:4000"
  const [token,setToken]= useState("")
  const[food_list,setFoodList] = useState([])


  const addToCart = async (itemId) => {
    if (!cartIteam[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };



  const removeFromCart = async(itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };
  
const getTotalCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartIteam) {
    if (cartIteam[item] > 0) {
      let itemInfo = food_list.find(
        (product) => product._id === item
      );

      if (itemInfo) {
        totalAmount += itemInfo.price * cartIteam[item];
      }
    }
  }

  return totalAmount;
};

const fetchFoodList =  async()=>{
  const response = await axios.get(url+"/api/food/list");
  setFoodList(response.data.data)

}



const loadCartData = async (token) => {
  const response = await axios.post(
    url + "/api/cart/get",
    {},
    {
      headers: { token },
    }
  );

  if (response.data.success) {
    setCartItem(response.data.cartData);
  } else {
    console.log(response.data.message);
  }
};
useEffect(()=>{
 
  async function loadData(){
    await fetchFoodList()
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }
    
  }
  loadData();
    
  
},[])

  const contextValue = {
    food_list,
    cartIteam,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

