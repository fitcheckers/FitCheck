import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import artsy from "../../img/artsy.jpg";
import athleisure from "../../img/athleisure.jpg";
import bcasual from "../../img/bcasual.jpg";
import biker from "../../img/biker.jpg";
import casual from "../../img/casual.jpg";
import classic from "../../img/classic.jpg";
import hipster from "../../img/hipster.jpg";
import kawaii from "../../img/kawaii.jpg";
import korean from "../../img/korean.jpg";
import minimalist from "../../img/minimalist.jpg";
import sporty from "../../img/sporty.jpg";
import street from "../../img/street.jpg";

const UserPrefModal = ({setShowModal}) =>
{
    const { currentUser, updateUserProfile, setError  } = useAuth();
    const [page, setPage] = useState(0);
    const [userPref, setUserPref] = useState([]);
    const [ username, setUsername ] = useState("");
    const navigate = useNavigate();
    //console.log(userPref);

    function addTo(styles)
    {
        if(userPref.includes(styles))
        {
            setUserPref(userPref.filter(style => style !== styles));
            const element = document.getElementById(styles);
            element.classList.remove("border-blue-500", "border-8");
        }
        else
        {
            setUserPref([...userPref, styles]);
            const element = document.getElementById(styles);
            element.classList.add("border-blue-500", "border-8");
        }
        console.log(userPref);
    }

    async function createUserObject(){
        const userObject = {
            id: currentUser.uid,
            display_name: username,
            profile_banner_url: "https://firebasestorage.googleapis.com/v0/b/fitcheck-b023b.appspot.com/o/bannerImages%2FblueNwhite.avif?alt=media&token=5f9fff41-ef1c-449e-942b-596d81e3ac84",
            posts: [],
            styles: userPref,
            followers: [],
            following: [],
            likes: [],
            bio: ("Bio Section"),
        }
        try{
            const response = await axios.post("http://localhost:80/users/update", userObject);
            return response.data;
        } catch (e){
            console.log(e);
        }
    }

    function saveName(){
        const name = document.getElementById("username").value;
        setUsername(name);
    }

    function checkRequire(){
        let radio1 = document.getElementById("male");
        let radio2 = document.getElementById("female");
        let radio3 = document.getElementById("other");
        let name = document.getElementById("username").value;
        if((radio1.checked || radio2.checked || radio3.checked) && name)
        {
            if (radio1.checked) {
                setUserPref([...userPref,'Male']);
            }
            else if (radio2.checked) {
                setUserPref([...userPref,'Female']);
            }
            else{
                setUserPref([...userPref, 'Other']);
            }
            saveName();
            setPage(page + 1);
        }
        else
        {
            setError("Please select your fit and enter a display name!");
        }
    }

    async function handleFormSubmit() {
        try {
          const user = currentUser;
          const profile = {
            displayName: username,
          };
          await updateUserProfile(user, profile);
          //console.log(currentUser.displayName);
          //navigate("/profile");
        } catch (e) {
          setError("Failed to update profile");
        }
    };

    //handle close modal
    const closeModal = async () =>{
        setShowModal(false);
        try{
            const response = await createUserObject();
            //console.log(response.data);
        } catch(e){
            console.log(e);
        }
        handleFormSubmit();
        navigate("/profile");
    }

    function checkUserStyle(){
        if(userPref.length >= 4)
        {
            console.log(userPref.length);
            closeModal();
        }
        else
        {
            setError("Please select at least 3 styles you are interested.");
        }
    }


    if(page===0){
        return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                <div className="absolute bg-[#D9D9D9] my-10 pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[70%] rounded-3xl overflow-y-scroll z-10">
                    {/* <div onClick={closeModal} className="cursor-pointer block font-bold text-2xl hover:scale-y-110">
                        <span>&times;</span>
                    </div> */}
                    <div className="h-4 sm:h-10"></div>
                    <div className="flex justify-center">
                    <div className="">
                        <p className="text-xl md:text-2xl lg:text-4xl font-bold text-[#015668] text-center pt-10 pb-10">
                        Welcome to FitCheck!
                        </p>

                        <p className="text-sm md:text-md lg:text-xl mx-auto w-2/3 font-bold text-[#015668] text-center pb-20">
                        We will ask you a few questions to tailor the site just for
                        you!
                        </p>
                        <button onClick={() => setPage(page + 1)} className="flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">Next</button>
                        <div className="flex bottom-3 top-10 gap-2 pt-3 justify-center">
                            <div className="relative h-3 w-3 bg-gray-400 rounded-full drop-shadow-xl"></div>
                            <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                            <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
    else if(page === 1)
    {
        return(
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="absolute bg-[#D9D9D9] pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[70%] rounded-3xl pr-[7px] my-10 overflow-y-scroll z-10">
                {/* <div onClick={closeModal} className="cursor-pointer">
                    <span>&times;</span>
                </div> */}
                <div className="h-4 sm:h-10"></div>
                <div className="flex h-[90%] justify-start items-start flex-col">
                    <p className="text-4xl mx-auto font-bold text-[#015668] pb-4">
                    What is your fit?
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668]">
                    This helps us recommend you with more relevant outfits
                    </p>
                    <form className="font-bold pl-[27%] pt-2 text-[#015668] sm:pb-10 pb-4 text-sm md:text-md lg:text-xl">
                        <input type="radio" id="male" name="gender" value="MALE"></input>
                        <label htmlFor="male" className="">Male</label>
                        <br></br> 
                        <input type="radio" id="female" name="gender" value="FEMALE"></input>
                        <label htmlFor="female">Female</label>
                        <br></br>
                        <input type="radio" id="other" name="gender" value="OTHER"></input>
                        <label htmlFor="other">Other</label>
                    </form>
                    <p className="mx-auto font-bold text-[#015668] sm:pb-4 pb-0 text-md md:text-xl lg:text-2xl">
                    What is your display name?
                    </p>
                    <form className="relative pb-4 mx-auto"> 
                        <input type="text" id="username" name="username" required placeholder="Enter a Display Name" className="text-center text-[10px] md:text-md lg:text-lg mx-auto"></input>
                    </form>
                    <button onClick={() => checkRequire() } className="flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">Next</button>
                    <div className="flex bottom-3 top-10 gap-2 pt-3 mx-auto">
                        <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                        <div className="relative h-3 w-3 bg-gray-400 rounded-full drop-shadow-xl"></div>
                        <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                    </div>
                </div>
            </div>
        </>
        )
    }
    else if(page === 2)
    {
        return(
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            <div className="absolute bg-[#D9D9D9] pt-1 pl-2 top-[11%] left-[28%] w-[50%] h-[76%] rounded-3xl pr-[7px] my-10 overflow-y-scroll z-10">
                {/* <div onClick={closeModal} className="cursor-pointer">
                    <span>&times;</span>
                </div> */}

                <div className="flex h-[90%] justify-start items-start flex-col">
                    <p className="text-4xl mx-auto font-bold text-[#015668] pb-4">
                    What's your style?
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668]">
                    This will help us customize your feed.
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668]">
                    Pick at least 3.
                    </p>
                    <div className="overflow-scroll bg-gray-400 w-full text-center mt-2 mb-2">
                        <div className="inline-flex gap-2">
                            <div className="text-center font-medium text-[#015668]">Artsy<img id="Artsy" className="w-48 h-60 object-cover rounded-3xl" alt="artsy" onClick={() => addTo("Artsy")} src={artsy}></img></div>
                            <div className="text-center font-medium text-[#015668]">Athleisure<img id="Athleisure" className="w-48 h-60 object-cover rounded-3xl" alt="athleisure" onClick={() => addTo("Athleisure")} src={athleisure}></img></div>
                            <div className="text-center font-medium text-[#015668]">Business<img id="Business" className="w-48 h-60 object-cover rounded-3xl" alt="business casual" onClick={() => addTo("Business")} src={bcasual}></img></div>
                        </div>
                        <div className="inline-flex gap-2 mt-3">
                            <div className="text-center font-medium text-[#015668]">Biker<img className="w-48 h-60 object-cover rounded-3xl" alt="biker" onClick={() => addTo("Biker")} id="Biker" src={biker}></img></div>
                            <div className="text-center font-medium text-[#015668]">Casual<img className="w-48 h-60 object-cover rounded-3xl" onClick={() => addTo("Casual")} id="Casual" alt="Casual" src={casual}></img></div>
                            <div className="text-center font-medium text-[#015668]">Classic<img className="w-48 h-60 object-cover rounded-3xl" alt="classic" onClick={() => addTo("Classic")} id="Classic" src={classic}></img></div>
                        </div>
                        <div className="inline-flex gap-2 mt-3">
                            <div className="text-center font-medium text-[#015668]">Hipster<img className="w-48 h-60 object-cover rounded-3xl" alt="hipster" onClick={() => addTo("Hipster")} id="Hipster" src={hipster}></img></div>
                            <div className="text-center font-medium text-[#015668]">Kawaii<img className="w-48 h-60 object-cover rounded-3xl" alt="kawaii" onClick={() => addTo("Kawaii")} id="Kawaii" src={kawaii}></img></div>
                            <div className="text-center font-medium text-[#015668]">Korean<img className="w-48 h-60 object-cover rounded-3xl" onClick={() => addTo("Korean")} id="Korean" alt="korean" src={korean}></img></div>
                        </div>
                        <div className="inline-flex gap-2 mt-3">
                            <div className="text-center font-medium text-[#015668]">Minimalist<img className="w-48 h-60 object-cover rounded-3xl" alt="minimalist" onClick={() => addTo("Minimalist")} id="Minimalist" src={minimalist}></img></div>
                            <div className="text-center font-medium text-[#015668]">Sporty<img className="w-48 h-60 object-cover rounded-3xl" alt="sporty" onClick={() => addTo("Sporty")} id="Sporty" src={sporty}></img></div>
                            <div className="text-center font-medium text-[#015668]">Street<img className="w-48 h-60 object-cover rounded-3xl" alt="street" onClick={() => addTo("Street")} id="Street" src={street}></img></div>
                        </div>
                    </div>
                    <div className="mx-auto mt-1">
                        <button onClick={() => setPage(page - 1)} className="text-center border-2 border-[#015668] rounded-md py-2 w-20 mr-1 text-[#015668] hover:bg-[#015668] hover:text-white">Previous</button>
                        <button onClick={() => checkUserStyle()} className="text-center border-2 border-[#015668] rounded-md py-2 w-20 ml-1 text-[#015668] hover:bg-[#015668] hover:text-white">Finish</button>
                    </div>
                    <div className="flex bottom-3 top-10 gap-2 pt-3 mx-auto">
                        <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                        <div className="relative h-3 w-3 bg-white rounded-full drop-shadow-xl"></div>
                        <div className="relative h-3 w-3 bg-gray-400 rounded-full drop-shadow-xl"></div>
                    </div>
                </div>
            </div>
        </>
        )
    }

}

export default UserPrefModal;