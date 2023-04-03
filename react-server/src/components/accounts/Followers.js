import * as React from 'react';
import { ImCross } from "react-icons/im"
import { TbUserSearch } from "react-icons/tb";
import { useState } from 'react';

function Followers({isOpen = false, toggleModal}){

    const [hideIcon, setHideIcon] = useState(true);

    function textEntered(e){
        if(e.target.value !== '')
        {
            setHideIcon(false);
        }
        else
        {
            setHideIcon(true);
        }
    }

    
    return(
        <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => toggleModal()}></div>
            <div className="fixed overflow-y-auto">
                <div className='fixed bg-[#E4E5E7] top-[15%] left-[40%] w-[25%] h-[80%] rounded-lg container mx-auto'>
                    <ImCross onClick={() => toggleModal()} className='relative left-[75%] sm:left-[80%] md:left-[90%] top-[2%] hover:cursor-pointer'/>
                    <div className='bg-[#F9FAFA] w-full h-[7%] text-center font-extrabold text-xl'>Followers</div>
                    { hideIcon && <TbUserSearch className='fixed mt-2 ml-[108px]' size={25}/>}
                    <input id="searchbar" className='bg-[#F9FAFA] w-full h-[7%] mt-1 text-center' onChange={(e) => textEntered(e)} type="text" placeholder='Search...'></input>
                    <div className='w-full h-[80%] overflow-y-scroll'>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                        <div className='bg-white w-full h-10 mt-1 p-2'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Followers;