import { AiFillHome, AiFillSnippets } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";

const Sidebar = () => {
  return (
    <div
      className="h-full w-16
                  flex flex-col
                  bg-gray-900 text-white shadow fixed overflow-x-hidden"
    >
      <SideBarIcon href={"/homePage"} icon={<AiFillHome size="32" />} />{" "}
      <SideBarIcon href={"/"} icon={<AiFillSnippets size="32" />} />{" "}
      <SideBarIcon href={"/Wardrobe"} icon={<BiCloset size="32" />} />{" "}
      <SideBarIcon href={"/likePage"} icon={<FaHandHoldingHeart size="32" />} />{" "}
      <SideBarIcon href={"/shoppingCart"} icon={<MdShoppingCart size="32" />} />
    </div>
  );
};
const SideBarIcon = ({ icon, href }) => <div className="sidebar-icon top-24 overflow-y-hidden"><a href={href}>{icon}</a></div>;

export default Sidebar;
