import React, { useContext, useEffect } from 'react'
import "./myOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const myOrders = () => {
    const{url,token} = useContext(StoreContext)
    const [data,setdata] = useSate([]);

    const fetchOrder = async()=>{
        const response = await axios.post(url+"api/order/userorders",{},{headers:{token}})
        setdata(response.data.data);
        console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchOrder();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>{order.amount}.00</p>
                        <p>{order.item.length}</p>
                        <p><span>&#x25cf</span><b>{order.stauts}</b></p>
                        <button>track order</button>
                    </div>
                )

            })}
        </div>
    </div>
  )
}

export default myOrders