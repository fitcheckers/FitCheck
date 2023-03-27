import React, { useEffect } from "react";
import UserPrefModal from "./accounts/UserPref.js"
import { useState } from 'react'
function Preference() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () =>{
    setShowModal(true)
  }
  useEffect(() => {
    openModal();
  },[]);
  
  return(
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        {showModal &&<UserPrefModal setShowModal={setShowModal}/>}
      </div>
    </div>
  );
}

export default Preference;