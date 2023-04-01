import * as React from 'react';
import { Component } from 'react';
import { ImCross } from "react-icons/im"


class Followers extends Component {
    render(){
        const { isOpen = false, toggleModal } = this.props;
        return(
        <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => toggleModal()}>
            </div>
                <div className="fixed overflow-y-auto">
                    <div className='fixed bg-[#E4E5E7] top-[15%] left-[40%] w-[25%] h-[80%] rounded-lg container mx-auto'>
                        <ImCross onClick={() => toggleModal()} className='relative left-[75%] sm:left-[80%] md:left-[90%] top-[2%] hover:cursor-pointer'/>
                        <div className='bg-[#F9FAFA] w-full h-[7%] text-center font-extrabold text-xl'>Followers</div>
                        <div className='bg-[#F9FAFA] w-full h-[7%] mt-1'></div>
                        <div>
                            <div className='fixed bg-white w-full'></div>  
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}
export default Followers;