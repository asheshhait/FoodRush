import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "./../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
const {
  cartIteam,
  food_list,
  removeFromCart,
  getTotalCartAmount,
  url
} = useContext(StoreContext);



  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
       {food_list.map((item) => {
  if (cartIteam[item._id] > 0) {
    return (
      <div key={item._id}>
        <div className="cart-items-title cart-items-item">
          <img src={url + "/images/" + item.images} alt="" />
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>{cartIteam[item._id]}</p>
          <p>${item.price * cartIteam[item._id]}</p>
          <p
            className="cross"
            onClick={() => removeFromCart(item._id)}
          >
            X
          </p>
        </div>
        <hr />
      </div>
    );
  }
})}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p> If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder=" your promo code"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
