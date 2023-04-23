import * as React from 'react';
import { ImCross } from "react-icons/im"
import { TbUserSearch } from "react-icons/tb";
import { useState } from 'react';
import profile from "./profile.webp"

function Followings({isOpen = false, toggleModal, followingsData}){

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

    function test()
    {
        return alert("hello");
    }
    
    return(
        <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => toggleModal()}></div>
            <div className="fixed overflow-y-auto">
                <div className='fixed bg-[#E4E5E7] top-[15%] left-[40%] w-[25%] h-[80%] rounded-lg container mx-auto'>
                    <ImCross onClick={() => toggleModal()} className='relative left-[75%] sm:left-[80%] md:left-[90%] top-[2%] hover:cursor-pointer'/>
                    <div className='bg-[#F9FAFA] w-full h-10 text-center font-extrabold text-xl pt-2'>Followings</div>
                    <div className='flex w-full h-10 mb-1'>
                        { hideIcon && <TbUserSearch className='fixed mt-2 md:ml-[6%] sm:ml-[3%] ml-[1%]' size={25}/>}
                        <input id="searchbar" className='bg-[#F9FAFA] w-full h-[100%] mt-1 text-center' onChange={(e) => textEntered(e)} type="text" placeholder='Search...'></input>
                    </div>
                    <div className='w-full h-[80%] overflow-y-scroll'>
                        {followingsData.map((e, index) => (
                            <div key={index} className='flex bg-white w-full h-12 mt-1 gap-5 pl-4 cursor-pointer' onClick={() => test()}>
                                <img className='relative w-10 h-10 rounded-full top-1' src={profile} alt="profile"></img>
                                <div className='pt-3 text-[1.3vw]'>{e}</div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Followings;