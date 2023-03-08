import SearchBar from "./SearchBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import picture from "../accounts/profile.webp"
import { useState } from "react";

//<button onClick={handleLogout} className="text-xl text-white hover:text-cyan-400 duration-500">Logout</button>

const Navbar = () =>{
    const { currentUser, logout, setError } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    async function handleLogout(){
        try{
            setError("");
            await logout();
            navigate('/login');
        } catch {
            setError("Failed to logout");
        }
    }

    if(currentUser)
    {
        return(
            <div className="p-5 bg-[#015668] shadow flex md:items-center md:justify-between w-screen fixed z-10 top-0 shrink-0 h-20">
                <span className="text-2xl font-[Poppins]">
                    <a href="/"><img className="h-10 inline object-cover" src ={Logo} alt="fitcheck logo"></img></a>
                    
                </span>
                <div className="w-80">
                    <SearchBar/>
                </div>
                <ul className="md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7">
                    <button type="button" onClick={handleDropDown}>
                        <img className="w-16 rounded-full object-cover mt-2" alt="profile" src={currentUser.photoURL || picture}></img>
                    </button>
                    <div className={`z-10 right-6 top-16 ${isOpen ? "fixed" : "hidden"}`}>
                    <ul>
                        <li><a className="rounded-t-md px-5 flex bg-slate-300 border-b-2" href="/Profile">Edit Profile</a></li>
                        <li><a className="rounded-b-md px-5 flex bg-slate-300" onClick={handleLogout}  href="/">Log Out</a></li>
                    </ul>
                    </div>
                </ul>
            </div>
        )
    }
        return(
            <div className="p-5 bg-[#015668] shadow md:flex md:items-center md:justify-between w-screen fixed z-10 top-0">
                <span className="text-2xl font-[Poppins]">
                    <a href="/"><img className="h-10 inline" src ={Logo} alt="fitcheck logo"></img></a>
                    
                </span>
                <div className="w-80">
                    <SearchBar/>
                </div>
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7">
                    <li className="mx-4 my-6 md:my-0">
                    <a href="/login" className="text-xl text-white hover:text-cyan-400 duration-500">Login</a>
                    </li>
                    <li>
                    <a href="/register" className="text-xl text-white hover:text-cyan-400 duration-500" >Sign Up</a>
                    </li>
                </ul>
            </div>
        )
}
export default Navbar;