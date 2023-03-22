import * as React from 'react';
import { TfiArrowLeft } from "react-icons/tfi";
import { Component } from 'react';
import profile from "../accounts/profile.webp"

class PostModal extends Component {
    render(){
        const { isOpen, toggleModal } = this.props;
        const { title, url, description, user_name, user_pfp } = this.props.post;
        return(
        <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={toggleModal}>
            </div>
                <div className="fixed overflow-y-auto">
                    <div className='fixed bg-[#D9D9D9] top-[5%] left-[10%] w-[80%] h-[90%] rounded-3xl'>
                        <TfiArrowLeft onClick={toggleModal} size={28} className="relative left-2 top-2 cursor-pointer"/>
                        <img className='relative h-[80%] w-[32%] object-cover object-center top-[1%] left-[10%] rounded-tl-2xl rounded-bl-2xl drop-shadow-lg border-white border-y-4 border-l-4' src={url} alt="user's post"></img>
                        <div className='fixed bg-white h-[72%] w-[39%] top-[10%] left-[43%] -z-10 rounded-tr-2xl rounded-br-2xl break-all overflow-y-scroll'>
                            <div className='fixed border-b-2 border-gray-200 bg-white  h-[13%] w-[39%] top-[10%] left-[43%] rounded-tr-2xl z-10'></div>
                            <img className="fixed h-16 w-16 object-cover rounded-full top-[12%] left-[45%] z-20" src={user_pfp || profile} alt="user's pfp"></img>
                            <div className='fixed left-[60%] sm:left-[58%] md:left-[55%] top-[100px] font-bold text-xl z-20'>{user_name}</div>
                            <div className='relative left-10 sm:left-12 top-28 w-[60%] sm:w-[72%] md:w-[86%] font-bold text-2xl'>{title}</div>
                            <div className='relative left-10 sm:left-12 top-36 font-light'>{description}</div>
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}
export default PostModal;