import SearchBar from "./SearchBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



const Navbar = () =>{
    const { currentUser, logout, setError } = useAuth();
    const navigate = useNavigate();


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
            <div className="p-5 bg-sky-300 shadow md:flex md:items-center md:justify-between w-screen fixed">
                <span className="text-2xl font-[Poppins]">
                    <img className="h-10 inline" src ="https://static.vecteezy.com/system/resources/thumbnails/003/746/974/small/fc-logo-monogram-isolated-on-circle-element-design-template-free-vector.jpg"></img>
                    <a href="/">Fitcheck</a>
                    
                </span>
                <div className="w-80">
                    <SearchBar/>
                </div>
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7">
                    <li className="mx-4 my-6 md:my-0">
                    <button onClick={handleLogout} className="text-xl hover:text-cyan duration-500">Logout</button>
                    </li>
                </ul>
            </div>
        )
    }
        return(
            <div className="p-5 bg-sky-300 shadow md:flex md:items-center md:justify-between w-screen fixed">
                <span className="text-2xl font-[Poppins]">
                    <img className="h-10 inline" src ="https://static.vecteezy.com/system/resources/thumbnails/003/746/974/small/fc-logo-monogram-isolated-on-circle-element-design-template-free-vector.jpg"></img>
                    <a href="/">Fitcheck</a>
                    
                </span>
                <div className="w-80">
                    <SearchBar/>
                </div>
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7">
                    <li className="mx-4 my-6 md:my-0">
                    <a href="/login" className="text-xl hover:text-cyan duration-500">Login</a>
                    </li>
                    <li>
                    <a href="/register" className="text-xl hover:text-cyan duration-500" >Sign Up</a>
                    </li>
                </ul>
            </div>
        )
}
export default Navbar;
