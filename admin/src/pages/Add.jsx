import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = () => {
  const token = localStorage.getItem("adminToken"); // ✅ FIX

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Select at least one size");
      return;
    }

    try {
      const formData = new FormData();

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("isBestSeller", isBestSeller);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setCategory("");
        setSubCategory("");
        setPrice("");
        setSizes([]);
        setIsBestSeller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Add product failed");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">

      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, i) => (
          <label key={i}>
            <img
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              className="w-20 h-20 border object-cover cursor-pointer"
              alt=""
            />
            <input
              hidden
              type="file"
              onChange={(e) =>
                [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])
              }
            />
          </label>
        ))}
      </div>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Category</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
        <option value="">Sub Category</option>
        <option value="Topwear">Topwear</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Footwear">Footwear</option>
      </select>

      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />

      <div className="flex gap-2">
        {["s", "m", "l", "xl", "xxl"].map((size) => (
          <button
            type="button"
            key={size}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
              )
            }
            className={`px-3 py-1 border ${sizes.includes(size) ? "bg-blue-600 text-white" : ""}`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>

      <label>
        <input type="checkbox" checked={isBestSeller} onChange={() => setIsBestSeller(!isBestSeller)} />
        Bestseller
      </label>

      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default Add;
