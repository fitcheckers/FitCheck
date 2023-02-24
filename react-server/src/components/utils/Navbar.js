const Navbar = () =>{
    return(
        <div className="p-5 bg-sky-300 shadow md:flex md:items-center md:justify-between">
            <span className="text-2xl font-[Poppins]">
                <img className="h-10 inline" src ="https://static.vecteezy.com/system/resources/thumbnails/003/746/974/small/fc-logo-monogram-isolated-on-circle-element-design-template-free-vector.jpg"></img>
                <a href="/">Fitcheck</a>
                
            </span>
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
