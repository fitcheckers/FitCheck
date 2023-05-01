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

    const closeDropDownMenu = () => {
        if(isOpen === true){
            setOpen(false);
        }
    }
    const handleDropDown = () => {
        setOpen(!isOpen);
    };

    async function handleLogout(){
        try{
            setError("");
            handleDropDown();
            await logout();
            navigate('/login');
        } catch {
            setError("Failed to logout");
        }
    }

    if(currentUser)
    {
        return(
            <div className="p-5 bg-[#015668] shadow items-center justify-between w-screen fixed z-10 top-0 h-20 flex" onClick={closeDropDownMenu}> {/*nav bar */}
                <span className="text-2xl font-[Poppins] flex-none">
                    <a href="/"><img className="h-10 inline object-cover" src ={Logo} alt="fitcheck logo"></img></a>
                    
                </span>
                <SearchBar/>
                <ul className="flex-none static py-4 pl-11 place-items-end">
                    <button type="button" onClick={handleDropDown}>
                        <img className="w-16 h-16 rounded-full object-cover mt-2" alt="profile" src={currentUser.photoURL || picture}></img>
                    </button>
                        <div className={`fixed inset-0 bg-inherit bg-opacity-70 transition-opacity z-0 ${isOpen ? "fixed" : "hidden"}`}>
                        <div className={`z-10 right-6 top-16 ${isOpen ? "fixed" : "hidden"}`}>
                            <ul>
                                <li><a className="rounded-t-md px-5 bg-gray-300 border-b-2 hover:text-sky-400/100" href="/Profile">Edit Profile</a></li>
                                <li><button className="w-full rounded-b-md px-5 bg-gray-300 hover:text-sky-400/100" onClick={handleLogout}>Log Out</button></li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </div>
        )
    }
        return(
            <div className="p-5 bg-[#015668] shadow flex items-center justify-between w-screen fixed z-10 top-0 h-20" onClick={closeDropDownMenu}>
                <span className="text-2xl font-[Poppins] flex-none">
                    <a href="/"><img className="h-10 inline object-cover" src ={Logo} alt="fitcheck logo"></img></a>
                    
                </span>
                <SearchBar/>
                <ul className="flex items-center static py-4 place-items-end whitespace-nowrap w-[148px]">
                    <li className="mx-4">
                        <a href="/login" className="text-xl text-white hover:text-cyan-400 duration-500 static">Login</a>
                    </li>
                    <li>
                        <a href="/register" className="text-xl text-white hover:text-cyan-400 duration-500 static" >Sign Up</a>
                    </li>
                </ul>
            </div>
        )
}
export default Navbar;