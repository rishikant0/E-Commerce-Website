import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../../frontend/src/assets/frontend_assets/assets'

const Sidebar = () => {
  return (
    <div className="w-64 h-screen border-r pt-6 px-4">
      <div className="flex flex-col gap-4">

        <NavLink
  to="/products/add"
  className="flex gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
>
  <img className="w-5 h-5" src={assets.order_icon} alt="add product" />
  <p>Add Product</p>
</NavLink>

        <NavLink to="/list" className="flex items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
          <img className="w-5 h-5" src={assets.order_icon} alt="orders" /> 
          <p >List items</p>
        </NavLink>

        <NavLink
  to="/orders"
  className="flex gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
>
  <img className="w-5 h-5" src={assets.order_icon} alt="orders" />
  <p>Orders</p>
</NavLink>

        </div>
    </div>
  )
}

export default Sidebar