import React, { useState } from "react"

function UserPref()
{
    const [page, setPage] = useState(0);

    if(page === 0)
    {
    //<div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10"><div/>
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className = "flex justify-center items-center h-screen">
                <div className = "w-1/3 h-[550px] mt-20 p-8 shadow-lg bg-gray-300 rounded-md">
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
                        <input type = "radio" id="" class = "hidden" onClick={() => setPage(page + 1)}/>
                            Next
                    </label>
                </div>
            </div>
        </div>
    );
    }
    else if(page === 1)
    {
        return(
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className = "flex justify-center items-center h-screen">
                <div className = "w-1/3 h-[550px] mt-20 p-8 shadow-lg bg-gray-300 rounded-md">
                <p className="text-4xl mx-auto font-bold text-[#015668] text-center">
                What is your fit?
                </p><br></br>
                <p className="text-2xl mx-auto font-bold text-[#015668] text-center" required>
                This helps us recommend you with more relevant outfits
                </p>
                <form className="text-xl font-bold pl-[20%] pt-2 text-[#015668]">
                    <input type="radio" id="male" name="gender" value="MALE"></input>
                    <label for="male">Male</label><br></br> 
                    <input type="radio" id="female" name="gender" value="FEMALE"></input>
                    <label for="female">Female</label><br></br>
                    <input type="radio" id="other" name="gender" value="OTHER"></input>
                    <label for="other">Other</label>
                </form>
                <br></br>
                <p className="text-3xl mx-auto font-bold text-[#015668] text-center">
                    What is your display name
                </p>
                <input type="text" id="username" name="username" required placeholder="Enter a Display Name">
                </input>
                </div>
            </div>
        </div>
        )

    }
}

export default UserPref;