import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.get(`${url}/api/food/remove`, {
      params: {
        id: foodId,
      },
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Catagory</b>
          <b>Price</b>
          <b>Action</b>
          {/* <b></b> */}
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                src={`${url}/images/${item.images}`}
                alt=""
                onLoad={() => console.log("✅ Image Loaded")}
                onError={() => console.log("❌ Image Failed")}
              />

              <p>{item.name}</p>
              <p>{item.catagory}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
