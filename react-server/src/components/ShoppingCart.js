import React from "react";
import { useState } from 'react'
import Followers from "./accounts/Followers.js";

function ShoppingCart() {
  const [showModal, setShowModal] = useState(true);

  return(
    <div>
      <Followers isOpen={showModal} toggleModal={() => setShowModal(false)}/>
    </div>
  );
}

export default ShoppingCart;