import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount,navigate } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">

        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>

        <hr />

        {/* TOTAL */}
        <div className="flex justify-between font-semibold">
          <p>TOTAL</p>
          <p>{currency} {getCartAmount() + delivery_fee}.00</p>
        </div>

      </div>
    </div>
  );
};

export default CartTotal;
