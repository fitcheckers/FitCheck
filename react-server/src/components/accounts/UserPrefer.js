import React from "react"

function UserPref()
{
    var page = 0;
    if(page == 0)
    {
        return (
            <div className = "flex justify-center items-center h-screen">
                <div className = "w-1/3 mt-8 p-8 shadow-lg bg-gray-300 rounded-md">
                    <p className="text-6xl font-bold text-[#015668] text-center">
                        Welcome to FitCheck!
                    </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="text-3xl mx-auto w-2/3 font-bold text-[#015668] text-center">
                        We will ask you a few questions to tailor the site just for you!
                    </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <label className = "flex mt-4 mx-auto border-2 border-[#015668] rounded-md py-2 px-4 justify-center w-1/2 text-[#015668] hover:bg-[#015668] hover:text-white">
                        <input type = "radio" id="" class = "hidden"/>
                            Next
                    </label>
                </div>
            </div>
        );
    }
}

export default UserPref;