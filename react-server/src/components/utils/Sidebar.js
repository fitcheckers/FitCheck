import { AiFillHome, AiFillSnippets } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";

const Sidebar = () => {
  return (
    <div
      className="top-[93px] left-0 h-screen w-16 m-0 
                        flex flex-col
                        bg-gray-900 text-white shadow fixed"
    >
      <a href="/homePage">
        {" "}
        <SideBarIcon icon={<AiFillHome size="32" />} />{" "}
      </a>
      <a href="/">
        <SideBarIcon icon={<AiFillSnippets size="32" />} />{" "}
      </a>
      <SideBarIcon icon={<BiCloset size="32" />} />
      <a href="/likePage"> <SideBarIcon icon={<FaHandHoldingHeart size="32" />} /> </a>
      <SideBarIcon icon={<MdShoppingCart size="32" />} />
    </div>
  );
};
// relative mt-2 mb-2 items-center justify-center mx-auto
const SideBarIcon = ({ icon }) => <div className="sidebar-icon">{icon}</div>;

export default Sidebar;
