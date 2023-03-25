import React, { useState } from "react";

const UserPrefModal = ({setShowModal}) =>
{
    //handle close modal
    const closeModal = () =>{
        setShowModal(false)
        setPage(0)
    }
    const [page, setPage] = useState(0);
    console.log("pageNum:",page);
    if(page===0){
        return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
                <div className="absolute bg-[#D9D9D9] pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[60%] rounded-3xl">
                    <div onClick={closeModal} className="cursor-pointer block font-bold text-2xl hover:scale-y-110">
                        <span>&times;</span>
                    </div>
                    <div className="flex">
                    <div className="">
                        <p className="text-4xl font-bold text-[#015668] text-center pt-10 pb-20">
                        Welcome to FitCheck!
                        </p>

                        <p className="text-2xl mx-auto w-2/3 font-bold text-[#015668] text-center pb-20">
                        We will ask you a few questions to tailor the site just for
                        you!
                        </p>
                        <label className="flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">
                        <input
                            type="radio"
                            id=""
                            class="hidden"
                            onClick={() => setPage(page + 1)}
                        />
                        Next
                        </label>
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
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            <div className="absolute bg-[#D9D9D9] pt-1 pl-2 top-[15%] left-[38%] w-[30%] h-[60%] rounded-3xl pr-[7px]">
                <div onClick={closeModal} className="cursor-pointer">
                    <span>&times;</span>
                </div>

                <div className="flex h-[90%] justify-start items-start flex-col">
                    <p className="text-4xl mx-auto font-bold text-[#015668] pb-4">
                    What is your fit?
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668]">
                    This helps us recommend you with more
                    </p>
                    <p className="text-xs mx-auto font-bold text-[#015668] pb-10">
                    relevant outfits
                    </p>
                    <form className="text-xl font-bold pl-[27%] pt-2 text-[#015668] pb-10">
                        <input type="radio" id="male" name="gender" value="MALE"></input>
                        <label for="male" className="">Male</label>
                        <br></br> 
                        <input type="radio" id="female" name="gender" value="FEMALE"></input>
                        <label for="female">Female</label>
                        <br></br>
                        <input type="radio" id="other" name="gender" value="OTHER"></input>
                        <label for="other">Other</label>
                    </form>
                    <p className="text-3xl mx-auto font-bold text-[#015668] pb-4">
                    What is your display name?
                    </p>
                    <form className="pl-[150px] pb-4"> 
                        <input type="text" id="username" name="username" required placeholder="Enter a Display Name" className="pl-8"></input>
                    </form>

                    <label className="h-[10%] flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">
                    <input
                        type="radio"
                        id=""
                        class="hidden"
                        onClick={() => closeModal()}
                    />
                    Finish
                    </label>
                </div>
            </div>
        </>
        )
    }

}

export default UserPrefModal;