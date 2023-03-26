import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const UserPrefModal = ({setShowModal}) =>
{
    const { currentUser } = useAuth();

    //handle close modal
    const closeModal = () =>{
        setShowModal(false)
        setPage(0)
    }
    const [page, setPage] = useState(0);
    console.log("pageNum:",page);

    async function createUserObject(){
        //var file = document.querySelector("input[type='file'][id='bg_img']").files[0]; gonna need this to get the input from user

        const userObject = {
            id: currentUser.uid,
            profile_banner_url: "",
        }
        try{
            const response = await axios.post("http://localhost:80/users/get", userObject);
            console.log(response.data);
            return response.data;
        } catch (e){
            console.log(e);
        }
    }


    if(page===0){
        return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                <div className="absolute bg-[#D9D9D9] my-10 pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[70%] rounded-3xl overflow-y-scroll z-10">
                    <div onClick={closeModal} className="cursor-pointer block font-bold text-2xl hover:scale-y-110">
                        <span>&times;</span>
                    </div>
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
                <div onClick={closeModal} className="cursor-pointer">
                    <span>&times;</span>
                </div>

                <div className="flex h-[90%] justify-start items-start flex-col">
                    <p className="text-4xl mx-auto font-bold text-[#015668] pb-4">
                    What is your fit?
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668]">
                    This helps us recommend you with more relevant outfits
                    </p>
                    <form className="font-bold pl-[27%] pt-2 text-[#015668] sm:pb-10 pb-4 text-sm md:text-md lg:text-xl">
                        <input type="radio" id="male" name="gender" value="MALE"></input>
                        <label for="male" className="">Male</label>
                        <br></br> 
                        <input type="radio" id="female" name="gender" value="FEMALE"></input>
                        <label for="female">Female</label>
                        <br></br>
                        <input type="radio" id="other" name="gender" value="OTHER"></input>
                        <label for="other">Other</label>
                    </form>
                    <p className="mx-auto font-bold text-[#015668] sm:pb-4 pb-0 text-md md:text-xl lg:text-2xl">
                    What is your display name?
                    </p>
                    <form className="relative pb-4 mx-auto"> 
                        <input type="text" id="username" name="username" required placeholder="Enter a Display Name" className="text-center text-[10px] md:text-md lg:text-lg mx-auto"></input>
                    </form>
                    <button onClick={() => setPage(page + 1)} className="flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">Next</button>
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
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            <div className="absolute bg-[#D9D9D9] pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[70%] rounded-3xl pr-[7px] my-10 overflow-y-scroll">
                <div onClick={closeModal} className="cursor-pointer">
                    <span>&times;</span>
                </div>

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
                    <button onClick={() => closeModal()} className="flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">Finish</button>
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