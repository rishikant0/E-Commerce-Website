import axios from 'axios'
import React ,{useEffect,useState} from 'react'
import { backendUrl,currency } from '../App.jsx'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error(error.message);
    }
  };

     const removeproduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

 return (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-5xl px-4">
      <p className="mb-3 text-lg font-semibold text-center">
        All Products List
      </p>

      {/* Header */}
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 bg-gray-100 border px-3 py-2 text-sm font-medium text-center">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Action</p>
      </div>

      {/* Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center border px-3 py-2 text-sm text-center"
        >
          <img
            src={item.images?.[0]}
            className="w-14 h-14 object-cover mx-auto rounded"
            alt=""
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p className="capitalize">{item.category}</p>
          <button onClick={() => removeproduct(item._id)} className="bg-red-500 text-white px-4 py-1 rounded mx-auto">
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

  
}

export default List