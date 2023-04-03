import React, { useState } from 'react';
import { TfiArrowLeft } from "react-icons/tfi";
import profile from "../accounts/profile.webp"
import Picker from 'emoji-picker-react';

function PostModal(props) {
    const { isOpen = false, toggleModal } = props;
    const { title, image_url, user_pfp, user_name, description } = props.post;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
 
    const onEmojiClick = (emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return(
        <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => toggleModal()}>
            </div>
                <div className="fixed overflow-y-auto">
                    <div className='fixed bg-[#D9D9D9] top-[5%] left-[18%] w-[68%] h-[88%] rounded-3xl inline-block'> 
                        <TfiArrowLeft onClick={() => toggleModal()} size={28} className="relative left-2 top-2 cursor-pointer"/>
                        <img className='fixed object-contain object-center top-[10%] left-[20%] h-[77%] w-[30%] rounded-tl-2xl rounded-bl-2xl drop-shadow-lg border-white border-y-4 border-l-4' src={image_url} alt="user's post"></img>
                        <div className='fixed border-b-2 border-gray-200 bg-white h-[11%] w-[34%] top-[10%] left-[50%] rounded-tr-2xl z-10'>
                            <img className="fixed h-16 w-16 object-cover rounded-full top-[12%] left-[51%] z-20 whitespace-normal" src={user_pfp || profile} alt="user's pfp"></img>
                            <div className='relative pl-24 top-[35%] font-bold text-xl z-20'>{user_name}</div>
                        </div>
                        <div className='fixed bg-white h-[66%] w-[34%] top-[21%] left-[50%] -z-10 rounded-br-2xl flex flex-col object-cover'>
                            <div className='relative left-10 top-8 w-[90%] h-[5%] font-bold text-2xl pl-1 bg-gray-300'>{title}</div>
                            <div className='relative left-10 top-16 font-light w-[90%] h-[5%] pl-1 bg-gray-300'>{description}</div>
                            <div className='relative left-10 top-24 font-bold text-2xl w-[90%] h-[50%] pl-1 bg-gray-300 z-0'>Comments</div>
                            <input className='relative left-10 top-[30%] w-[90%] h-[8%] min-h-[50px] bg-gray-100 border-inherit pl-2' placeholder='Add a comment...' value={inputStr} onChange={e => setInputStr(e.target.value)}/>
                            <img className='relative cursor-pointer w-[3%] min-w-[20px] top-[24.5%] left-[92%] z-20' src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg' onClick={() => setShowPicker(val => !val)}/>
                            <div className='fixed left-[74%] top-[38%] z-10'>
                                {showPicker && (
                                <Picker
                                    onEmojiClick={onEmojiClick}
                                    height={400} width={300}
                                />
                                )}
                            </div>
                         
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default PostModal;