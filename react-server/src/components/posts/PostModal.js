import React, { useState, useEffect } from 'react';
import { TfiArrowLeft } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";
import profile from "../accounts/profile.webp"
import Picker from 'emoji-picker-react';
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';
import {TiCancel} from "react-icons/ti";

function PostModal(props) {
    const { isOpen = false, toggleModal } = props;
    const { title, image_url, description, user_id, id } = props.post;
    const { profile_pic_url, display_name } = props.user;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [isMenuOpen, setOpen] = useState(false);
    const { currentUser, setError } = useAuth();
    const [postComments, setPostComments] = useState([]);
    const [commentUpdated, setCommentUpdated] = useState("");

    async function getPostComments() {
        try {
          const response = await axios.post("http://localhost:80/post/comments/get", { post_id: id});
          setPostComments(response.data);
          console.log(response.data);
          return response.data;
        } catch (e) {
          console.log(e);
          console.log("Error from getting post comments");
          setError("Failed to load comments");
        }
    }

    async function newComments(user_id, post_id, comments) {
        try {
          const response = await axios.post("http://localhost:80/post/comments/add", {
            user_id: user_id,
            post_id: post_id,
            content: comments,
          });
          setCommentUpdated(response);
          console.log("commentUpdated set to true");
          console.log("Calling axios from newComments");
          console.log(response);
          return response;
        } catch (e) {
          console.log(e);
          console.log("Error from calling axios from newComments");
        }
    }

    async function onPostClick()
    {
        if (inputStr.trim())
        {
            const comment = await newComments(currentUser.uid, id ,inputStr.trim());
            setInputStr('');
        }
    }

    useEffect(() => {
        async function fetchData() {
        const data = await getPostComments();
        }
        if(id)
        {
            fetchData();
        }
      }, [id, commentUpdated]);

    const onEmojiClick = (emojiObject) => { 
        setInputStr(prevInput => prevInput + emojiObject.emoji);
    };
    const closeEmojiPicker = () =>{
        if(showPicker === true){
            setShowPicker(false);
        }
    }
    const toggleDropMenu = () =>{
        setOpen(!isMenuOpen);
        console.log(currentUser.uid);
        console.log(user_id);
    }
    const closeDropDownMenu = () =>{
        if(isMenuOpen === true){
            setOpen(false);
        }
    }

    async function deleteComment(post, user)
    {
        if(currentUser.uid === user)
        {
            console.log(post);
            console.log(user);
            try {
                const response = await axios.post("http://localhost:80/post/comments/delete", { comment_id: post});
                setCommentUpdated(response);
                console.log(response);
                console.log("commentUpdated set to true");
              } catch (e) {
                console.log(e);
                console.log("Error from delete post comments");
            }
        }
        else
        {
            setError("You did not make the comments");
        }
    }

    if(currentUser && currentUser.uid){
        if(currentUser.uid === user_id){
            return(
                <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => {toggleModal(); closeEmojiPicker(); closeDropDownMenu()}}>
                    </div>
                        <div className='fixed bg-[#D9D9D9] top-[5%] left-[18%] w-[68%] h-[88%] rounded-3xl inline-block items' onClick={() => {closeEmojiPicker(); closeDropDownMenu()}}>
                            
                            {/* Exit Post Modal button */} 
                            <TfiArrowLeft onClick={() => toggleModal()} size={28} className="relative left-2 top-2 cursor-pointer"/>

                            {/* Post Imgage */}
                            <img className='fixed object-contain object-center top-[10%] left-[20%] h-[77%] w-[30%] rounded-tl-2xl rounded-bl-2xl drop-shadow-lg border-white border-y-4 border-l-4' src={image_url} alt="user's post"></img>

                            {/* User Info */}
                            <div className='flex fixed border-b-2 border-gray-200 bg-white h-[13%] w-[34%] top-[10%] left-[50%] rounded-tr-2xl z-0 items-center'>
                                <img className="relative left-[3%] h-16 w-16 object-cover rounded-full" src={profile_pic_url || profile} alt="user's pfp"></img>
                                <div className='relative left-[5%] font-bold text-xl w-[77%]'>{display_name}</div>
                                <BsThreeDotsVertical onClick={() => toggleDropMenu()} size={28} className='cursor-pointer z-10'/>
                            </div>
                        
                            {/* Content of Post (Title, Description, Comments and Comment Bar) */}
                            <div className='fixed bg-white h-[64%] w-[34%] top-[23%] left-[50%] rounded-br-2xl flex flex-col pb-2'> {/*  */}
                                <div className='relative flex items-center left-[6%] top-[5%] w-[90%] h-[7%] font-bold pl-1 bg-gray-300 text-base sm:text-2xl' >{title}</div>
                                <div className='relative flex items-center left-[6%] top-[10%] font-light w-[90%] h-[5%] pl-1 bg-gray-300'>{description}</div>
                                <div className='relative left-[6%] top-[15%] font-bold text-2xl w-[90%] h-[22%] pl-1 mb-1 bg-gray-300 z-0'>Comments</div>
                                <div className='relative left-[6%] w-[90%] h-[50%] pl-1 bg-white z-0 overflow-y-scroll'>
                                    {postComments.map((comment) => (
                                    <div className='flex mt-1 pl-1 pr-2' key={comment.comment_id}>
                                        <div className='break-words w-full'>
                                            <img className='w-8 h-8 float-left rounded-full object-cover' src={profile} alt="profile"></img>
                                            <span className='ml-1 font-bold italic'>username</span>
                                            <span className='ml-1 text-gray-700 break-words'>{comment.content}</span>
                                            <TiCancel className='inline-block' onClick={() => deleteComment(comment.comment_id, comment.user_id)}/>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className='relative items-center left-[6%] font-bold text-2xl w-[90%] h-[7%] pl-1 mt-1 z-50'>
                                    <button className=''><BsFillHeartFill/></button>
                                    <button className='relative left-[1%]'><BsFillCartFill /></button>
                                </div>
                                
                                {/* Comment Bar */}
                                <div className='relative flex items-center top-[0%] w-[90%] left-[6%] bg-gray-200 '> 
                                    <img className='relative cursor-pointer w-[3%] min-w-[20px] z-20 left-[1.5%]' alt="emoji" src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg' onClick={() => setShowPicker(val => !val)}/>
                                    <input id="content" className='relative flex pl-4 w-full h-[8%] left-[0%] min-h-[50px] bg-gray-200 outline-none pr-1' type='text' placeholder='Add a comment...' value={inputStr} onChange={e => setInputStr(e.target.value)}/>
                                    <button className='text-blue-600 font-bold pr-2' onClick={() => onPostClick()}>Post</button>
                                </div>
                            </div>
                        </div>

                        {/* Emoji Picker Modal */}

                        <div className='fixed left-[43%] top-[29%] z-10 h-[50%] w-[20%]'style={{ height: showPicker ? "50%" : "0", width: showPicker ? "20%" : "0" }}>
                            {showPicker && (
                            <Picker
                                onEmojiClick={onEmojiClick}
                                height="100%"
                                width="100%"
                            />
                            )}
                        </div>
                        <div className={`fixed left-[74%] top-[19%] z-20 ${isMenuOpen ? "fixed" : "hidden"}`}>
                                <ul className='rounded-xl border-2 border-gray-200 bg-gray-200 text-center w-28'>
                                    {/* <li><button className="rounded-xl border-b-2 hover:text-sky-400/100 hover:bg-gray-100 w-full">Edit</button></li> */}
                                    <li><button className="rounded-xl p-[1px] hover:text-red-400/100 hover:bg-gray-100 w-full">Delete</button></li>
                                </ul>
                        </div>
                </div>
            );
        }
        else
        {
            return(
                <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => {toggleModal();closeEmojiPicker(); closeDropDownMenu()}}>
                    </div>
                        <div className='fixed bg-[#D9D9D9] top-[5%] left-[18%] w-[68%] h-[88%] rounded-3xl inline-block items' onClick={() => {closeEmojiPicker(); closeDropDownMenu()}}>
                            
                            {/* Exit Post Modal button */} 
                            <TfiArrowLeft onClick={() => toggleModal()} size={28} className="relative left-2 top-2 cursor-pointer"/>
    
                            {/* Post Imgage */}
                            <img className='fixed object-contain object-center top-[10%] left-[20%] h-[77%] w-[30%] rounded-tl-2xl rounded-bl-2xl drop-shadow-lg border-white border-y-4 border-l-4' src={image_url} alt="user's post"></img>
    
                            {/* User Info */}
                            <div className='flex fixed border-b-2 border-gray-200 bg-white h-[13%] w-[34%] top-[10%] left-[50%] rounded-tr-2xl z-0 items-center'>
                                <img className="relative left-[3%] h-16 w-16 object-cover rounded-full" src={profile_pic_url || profile} alt="user's pfp"></img>
                                <div className='relative left-[5%] font-bold text-xl w-[77%]'>{display_name}</div>
                                <BsThreeDotsVertical onClick={() => toggleDropMenu()} size={28} className='cursor-pointer z-10'/>
                                <div>delete</div>
                            </div>
                        
                            {/* Content of Post (Title, Description, Comments and Comment Bar) */}
                            <div className='fixed bg-white h-[64%] w-[34%] top-[23%] left-[50%] rounded-br-2xl flex flex-col object-cover pb-2'> {/*  */}
                            <div className='relative flex items-center left-[6%] top-[5%] w-[90%] h-[7%] font-bold pl-1 bg-gray-300 text-base sm:text-2xl' >{title}</div>
                                <div className='relative flex items-center left-[6%] top-[10%] font-light w-[90%] h-[5%] pl-1 bg-gray-300'>{description}</div>
                                <div className='relative left-[6%] top-[15%] font-bold text-2xl w-[90%] h-[45%] pl-1 bg-gray-300 z-0'>Comments</div>
                                <div className='relative flex items-center left-[6%] top-[19%] font-bold text-2xl w-[90%] h-[7%] pl-1 bg-inherit z-0'>
                                    <button className=''><BsFillHeartFill/></button>
                                    <button className='relative left-[1%]'><BsFillCartFill /></button>
                                </div>
                                
                                {/* Comment Bar */}
                                <div className='relative flex items-center top-[22%] w-[90%] left-[6%] bg-gray-200 '> 
                                    <img className='relative cursor-pointer w-[3%] min-w-[20px] z-20 left-[1.5%]' alt="emoji" src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg' onClick={() => setShowPicker(val => !val)}/>
                                    <input className='relative flex pl-4 w-full h-[8%] left-[0%] min-h-[50px] bg-gray-200 outline-none pr-1' type='text' placeholder='Add a comment...' value={inputStr} onChange={e => setInputStr(e.target.value)}/>
                                    <button className='text-blue-600 font-bold pr-2'>Post</button>
                                </div>
                            </div>
                        </div>
    
                        {/* Emoji Picker Modal */}
                        <div className='fixed left-[43%] top-[29%] z-10 h-[50%] w-[20%]'style={{ height: showPicker ? "50%" : "0", width: showPicker ? "20%" : "0" }}>
                            {showPicker && (
                            <Picker
                                onEmojiClick={onEmojiClick}
                                height="100%"
                                width="100%"
                            />
                            )}
                        </div>
                        <div className={`fixed left-[74%] top-[19%] z-20 ${isMenuOpen ? "fixed" : "hidden"}`}>
                                <ul className='rounded-xl border-2 border-gray-200 bg-gray-200 text-center w-28'>
                                    <li><button className="rounded-xl p-[1px] hover:text-red-400/100 hover:bg-gray-100 w-full">Report</button></li>
                                </ul>
                        </div>
                </div>
            );
        }
    }
    else{
        return(
            <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => {toggleModal();closeEmojiPicker(); closeDropDownMenu()}}>
                </div>
                    <div className='fixed bg-[#D9D9D9] top-[5%] left-[18%] w-[68%] h-[88%] rounded-3xl inline-block items' onClick={() => {closeEmojiPicker(); closeDropDownMenu()}}>
                        
                        {/* Exit Post Modal button */} 
                        <TfiArrowLeft onClick={() => toggleModal()} size={28} className="relative left-2 top-2 cursor-pointer"/>

                        {/* Post Imgage */}
                        <img className='fixed object-contain object-center top-[10%] left-[20%] h-[77%] w-[30%] rounded-tl-2xl rounded-bl-2xl drop-shadow-lg border-white border-y-4 border-l-4' src={image_url} alt="user's post"></img>

                        {/* User Info */}
                        <div className='flex fixed border-b-2 border-gray-200 bg-white h-[13%] w-[34%] top-[10%] left-[50%] rounded-tr-2xl z-0 items-center'>
                            <img className="relative left-[3%] h-16 w-16 object-cover rounded-full" src={profile_pic_url || profile} alt="user's pfp"></img>
                            <div className='relative left-[5%] font-bold text-xl w-[77%]'>{display_name}</div>
                            <BsThreeDotsVertical onClick={() => toggleDropMenu()} size={28} className='cursor-pointer z-10'/>
                            
                        </div>
                    
                        {/* Content of Post (Title, Description, Comments and Comment Bar) */}
                        <div className='fixed bg-white h-[64%] w-[34%] top-[23%] left-[50%] rounded-br-2xl flex flex-col object-cover pb-2'> {/*  */}
                        <div className='relative flex items-center left-[6%] top-[5%] w-[90%] h-[7%] font-bold pl-1 bg-gray-300 text-base sm:text-2xl' >{title}</div>
                            <div className='relative flex items-center left-[6%] top-[10%] font-light w-[90%] h-[5%] pl-1 bg-gray-300'>{description}</div>
                            <div className='relative left-[6%] top-[15%] font-bold text-2xl w-[90%] h-[45%] pl-1 bg-gray-300 z-0'>Comments</div>
                            <div className='relative flex items-center left-[6%] top-[19%] font-bold text-2xl w-[90%] h-[7%] pl-1 bg-inherit z-0'>
                                <button className=''><BsFillHeartFill/></button>
                                <button className='relative left-[1%]'><BsFillCartFill /></button>
                            </div>
                            
                            {/* Comment Bar */}
                            <div className='relative flex items-center top-[22%] w-[90%] left-[6%] bg-gray-200 '> 
                                <img className='relative cursor-pointer w-[3%] min-w-[20px] z-20 left-[1.5%]' alt="emoji" src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg' onClick={() => setShowPicker(val => !val)}/>
                                <input className='relative flex pl-4 w-full h-[8%] left-[0%] min-h-[50px] bg-gray-200 outline-none pr-1' type='text' placeholder='Add a comment...' value={inputStr} onChange={e => setInputStr(e.target.value)}/>
                                <button className='text-blue-600 font-bold pr-2'>Post</button>
                            </div>
                        </div>
                    </div>

                    {/* Emoji Picker Modal */}
                    <div className='fixed left-[43%] top-[29%] z-10 h-[50%] w-[20%]'style={{ height: showPicker ? "50%" : "0", width: showPicker ? "20%" : "0" }}>
                        {showPicker && (
                        <Picker
                            onEmojiClick={onEmojiClick}
                            height="100%"
                            width="100%"
                        />
                        )}
                    </div>
                    <div className={`fixed left-[74%] top-[19%] z-20 ${isMenuOpen ? "fixed" : "hidden"}`}>
                            <ul className='rounded-xl border-2 border-gray-200 bg-gray-200 text-center w-28'>
                                <li><button className="rounded-xl p-[1px] hover:text-red-400/100 hover:bg-gray-100 w-full">Report</button></li>
                            </ul>
                    </div>
            </div>
        );
    }
}

export default PostModal;