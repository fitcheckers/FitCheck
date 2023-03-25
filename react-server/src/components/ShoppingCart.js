import React from "react";
import UserPrefModal from "./accounts/UserPref.js"
import { useState } from 'react'
function ShoppingCart() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () =>{
    setShowModal(true)
  }
  return(
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        {showModal &&<UserPrefModal setShowModal={setShowModal}/>}
        <button onClick={openModal}className="px-15 py-0 border-none bg-gray-100">Open Modal</button>
      </div>
    </div>
  );
}

export default ShoppingCart;