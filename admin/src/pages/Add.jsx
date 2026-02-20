import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = () => {
  const token = localStorage.getItem("adminToken");

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

    if (!token) return toast.error("Admin not logged in");
    if (sizes.length === 0) return toast.error("Select at least one size");

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

      const res = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);

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
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Add product failed");
    }
  };
return (
  <div className="flex h-[calc(100vh-70px)] bg-slate-100 p-6">
    
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Add New Product
      </h2>

      {/* TOP GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* IMAGE SECTION */}
        <div>
          <p className="font-semibold mb-2">Images</p>

          <div className="grid grid-cols-2 gap-3">
            {[image1, image2, image3, image4].map((img, i) => (
              <label
                key={i}
                className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  className="h-8 opacity-70"
                  alt=""
                />
                <input
                  hidden
                  type="file"
                  onChange={(e) =>
                    [setImage1, setImage2, setImage3, setImage4][i](
                      e.target.files[0]
                    )
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* NAME + DESCRIPTION */}
        <div className="col-span-2 space-y-3">
          <input
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            rows="4"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      {/* CATEGORY / PRICE */}
      <div className="grid grid-cols-3 gap-4">
        <select
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <select
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
        >
          <option value="">Sub Category</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Footwear">Footwear</option>
        </select>

        <input
          type="number"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* SIZES + BESTSELLER */}
      <div className="flex items-center justify-between">

        <div className="flex gap-2">
          {["s", "m", "l", "xl", "xxl"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-1 rounded-md border text-sm transition ${
                sizes.includes(size)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-slate-100"
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={() => setIsBestSeller(!isBestSeller)}
            className="accent-blue-600"
          />
          Bestseller
        </label>
      </div>

      {/* BUTTON */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition">
        Add Product
      </button>
    </form>
  </div>
);
}

export default Add;
