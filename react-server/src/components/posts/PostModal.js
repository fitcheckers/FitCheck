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
import { useNavigate } from 'react-router-dom';

function PostModal(props) {
    const navigate = useNavigate();
    const { currentUser, setError } = useAuth();
    const { isOpen = false, toggleModal, like } = props;
    const { title, image_url, description, user_id, id, numLikes, post_id, tags} = props.post;
    const { profile_pic_url, display_name } = props.user;
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [isMenuOpen, setOpen] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [commentUpdated, setCommentUpdated] = useState("");
    const [postLike, setPostLike] = useState("");
    
    async function getPost(){
        if(id)
        {
            try {
                console.log("1");
                const response = await axios.post("http://localhost:80/post/get", {id: id});
                setPostLike(response.data.content);
                console.log("Post Fetched");
                return response.data.content;
            } catch (e) {
                console.log(e);
                console.log("Error from getting post comments");
                setError("Failed to load comments");
            }
        }
        else if(post_id)
        {
            try {
                console.log("2");
                const response = await axios.post("http://localhost:80/post/get", {id: post_id});
                setPostLike(response.data.content);
                console.log("Post Fetched");
                return response.data.content;
              } catch (e) {
                console.log(e);
                console.log("Error from getting post comments");
                setError("Failed to load comments");
              }
        }
    }

    async function getPostComments() {
        if(id)
        {
            try {
                console.log("3");
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
        else if(post_id)
        {
            try {
                console.log("4");
              const response = await axios.post("http://localhost:80/post/comments/get", { post_id: post_id});
              setPostComments(response.data);
              console.log(response.data);
              return response.data;
            } catch (e) {
              console.log(e);
              console.log("Error from getting post comments");
              setError("Failed to load comments");
            }
        }
    }

    async function newComments(user_id, posid, comments) {
        if(posid)
        {
            try {
            const response = await axios.post("http://localhost:80/post/comments/add", {
                user_id: user_id,
                post_id: posid,
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
        else if(post_id)
        {
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
            if(id || post_id)
            {
                const data = await getPostComments();
            }
            if(numLikes === 0 || numLikes > 0)
            {
                console.log("No need fetching");
            }
            else
            {
                const data2 = await getPost();
            }
        }
        if(id || post_id)
        {
            fetchData();
        }
      }, [id, post_id, commentUpdated]);

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
    const likeButton = async () =>{
        console.log(id);
        console.log(post_id);
        if(id)
        {
            props.onLikeModal(!like, id);
            const userObject = {
                user_id: currentUser.uid,
                post_id: id,
            }
            if(like)
            {                
                try{
                    const response = await axios.post("http://localhost:80/post/unlike", userObject);
                    console.log("unliked from id");
                    console.log(response);
                } catch (e){
                    console.log(e);
                }
            }
            else
            {
                try{
                    const response = await axios.post("http://localhost:80/post/like", userObject);
                    console.log(response);
                } catch (e){
                    console.log(e);
                }
            }
        }
        else if(post_id)
        {
            props.onLikeModal(!like, post_id);
            const userObject = {
                user_id: currentUser.uid,
                post_id: post_id,
            }
            if(like)
            {
                try{
                    const response = await axios.post("http://localhost:80/post/unlike", userObject);
                    console.log("unliked from post_id");
                    console.log(response);
                } catch (e){
                    console.log(e);
                }
            }
            else
            {
                //setModalLike(true);
                try{
                    const response = await axios.post("http://localhost:80/post/like", userObject);
                    console.log(response);
                } catch (e){
                    console.log(e);
                }
            }
        }
    }
    const handleDelete = async () => {

        if(id)
        {
            try {
                const response = await axios.post("http://localhost:80/post/delete", {id: id});
                console.log("Post Deleted 1");
                navigate(0);
                return response;
            } catch (e) {
                console.log(e);
                console.log("Error from deleting post");
                setError("Failed to delete post");
            }
        }
        else if(post_id)
        {
            try {
                const response = await axios.post("http://localhost:80/post/delete", {id: post_id});
                console.log("Post Deleted 2");
                navigate(0);
                return response;
              } catch (e) {
                console.log(e);
                console.log("Error from deleting post");
                setError("Failed to delete post");
              }
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
                                <img onClick={() => navigate("/MyPost")} className="relative left-[3%] h-16 w-16 object-cover rounded-full cursor-pointer" src={profile_pic_url || profile} alt="user's pfp"></img>
                                <div onClick={() => navigate("/MyPost")} className='relative left-[5%] font-bold text-xl w-[77%] cursor-pointer'>{display_name}</div>
                                <BsThreeDotsVertical onClick={() => toggleDropMenu()} size={28} className='cursor-pointer z-10'/>
                            </div>
                        
                            {/* Content of Post (Title, Description, Comments and Comment Bar) */}
                            <div className='fixed bg-white h-[64%] w-[34%] top-[23%] left-[50%] rounded-br-2xl flex flex-col pb-2'> {/*  */}
                                <div className='relative flex items-center left-[3%] w-[90%] h-[8%] font-bold ml-1 text-base sm:text-2xl' >{title}</div>
                                <div className='relative z-10 flex items-center left-[3%] font-light w-[90%] h-[6%] ml-1 pb-1'>{description}</div>
                                <div className='relative z-10 flex items-center left-[3%] font-light w-[90%]'>
                                    {tags && tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-200 rounded-md px-2 py-1 mx-1">{tag}</span>
                                    ))}
                                </div>
                                <div className='relative left-[1%] w-[93%] h-[60%] ml-1 overflow-y-hidden hover:overflow-y-scroll mt-2'>
                                    {postComments.map((comment) => (
                                    <div className='flex mt-1 ml-1 pr-2' key={comment.comment_id}>
                                        <div className='break-words w-full'>
                                            <img onClick={() => {if(comment.user_id === currentUser.uid){navigate('/MyPost')} else{navigate(`/user/${comment.user_id}`)}}} className='w-8 h-8 float-left rounded-full object-cover cursor-pointer' src={comment.user.profile_pic_url || profile} alt="profile"></img>
                                            <span onClick={() => {if(comment.user_id === currentUser.uid){navigate('/MyPost')} else{navigate(`/user/${comment.user_id}`)}}} className='ml-2 font-bold italic cursor-pointer'>{comment.user.display_name}</span>
                                            <span className='ml-1 text-gray-700 break-words'>{comment.content}</span>
                                            <TiCancel className='inline-block ' role='button' onClick={() => deleteComment(comment.comment_id, comment.user_id)}/>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className='relative items-center left-[2%] font-bold text-2xl w-[90%] h-[4%] ml-1 mt-2 mb-2 z-30'>
                                    <button className='' onClick={() => likeButton()}><BsFillHeartFill color={like ? 'red' : 'black'}/></button>
                                    <button className='relative left-[1%]'><BsFillCartFill /></button>
                                </div>
                                <div className='relative left-[3%] text-base'>{numLikes || (postLike.likes && postLike.likes.length ? postLike.likes.length : "0" )} likes</div>
                                {/* Comment Bar */}
                                <div className='relative flex items-center w-[93%] left-[3%] bg-gray-200 '> 
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
                                    <li><button  onClick ={() => handleDelete()} className="rounded-xl p-[1px] hover:text-red-400/100 hover:bg-gray-100 w-full">Delete</button></li>
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
                                <img onClick={() => {navigate(`/user/${user_id}`)}} className="relative left-[3%] h-16 w-16 object-cover rounded-full cursor-pointer" src={profile_pic_url || profile} alt="user's pfp"></img>
                                <div onClick={() => {navigate(`/user/${user_id}`)}} className='relative left-[5%] font-bold text-xl w-[77%] cursor-pointer'>{display_name}</div>
                                <BsThreeDotsVertical onClick={() => toggleDropMenu()} size={28} className='cursor-pointer z-10'/>
                            </div>
                        
                            {/* Content of Post (Title, Description, Comments and Comment Bar) */}
                            <div className='fixed bg-white h-[64%] w-[34%] top-[23%] left-[50%] rounded-br-2xl flex flex-col pb-2'> {/*  */}
                                <div className='relative flex items-center left-[3%] w-[90%] h-[8%] font-bold ml-1 text-base sm:text-2xl' >{title}</div>
                                <div className='relative z-10 flex items-center left-[3%] font-light w-[90%] h-[6%] ml-1 pb-1'>{description}</div>
                                <div className='relative z-10 flex items-center left-[3%] font-light w-[90%]'>
                                    {tags && tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-200 rounded-md px-2 py-1 mx-1">{tag}</span>
                                    ))}
                                </div>
                                <div className='relative left-[1%] w-[93%] h-[60%] ml-1 overflow-y-hidden hover:overflow-y-scroll mt-2'>
                                    {postComments.map((comment) => (
                                    <div className='flex mt-1 ml-1 pr-2' key={comment.comment_id}>
                                        <div className='break-words w-full'>
                                            <img onClick={() => {if(comment.user_id === currentUser.uid){navigate('/MyPost')} else{navigate(`/user/${comment.user_id}`)}}} className='w-8 h-8 float-left rounded-full object-cover cursor-pointer' src={comment.user.profile_pic_url || profile} alt="profile"></img>
                                            <span onClick={() => {if(comment.user_id === currentUser.uid){navigate('/MyPost')} else{navigate(`/user/${comment.user_id}`)}}} className='ml-2 font-bold italic cursor-pointer'>{comment.user.display_name}</span>
                                            <span className='ml-1 text-gray-700 break-words'>{comment.content}</span>
                                            <TiCancel className='inline-block' role='button' onClick={() => deleteComment(comment.comment_id, comment.user_id)}/>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className='relative items-center left-[2%] font-bold text-2xl w-[90%] h-[4%] ml-1 mt-2 mb-2 z-30'>
                                    <button className='' onClick={() => likeButton()}><BsFillHeartFill color={like ? 'red' : 'black'}/></button>
                                    <button className='relative left-[1%]'><BsFillCartFill /></button>
                                </div>
                                <div className='relative left-[3%] text-base'>{numLikes || (postLike.likes && postLike.likes.length ? postLike.likes.length : "0" )} likes</div>
                                {/* Comment Bar */}
                                <div className='relative flex items-center w-[93%] left-[3%] bg-gray-200 '> 
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
                                    <li><button className="rounded-xl p-[1px] hover:text-red-400/100 hover:bg-gray-100 w-full">Report</button></li>
                                </ul>
                        </div>
                </div>
            );
        }
    }
    else{
    }
}

export default PostModal;