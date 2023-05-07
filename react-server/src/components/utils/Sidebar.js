import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { GiClothes } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div
      className="h-full w-16
                  flex flex-col
                  bg-gray-900 text-white shadow fixed overflow-x-hidden"
    >
      <SideBarIcon href={"/"} icon={<AiFillHome size="32" />} text="Home"/>{" "}
      <SideBarIcon href={"/YourFit"} icon={<GiClothes size="32" />} text="YourFit"/>{" "}
      <SideBarIcon href={"/MyPost"} icon={<CgProfile size="32" />} text="Profile"/>{" "}
      <SideBarIcon href={"/LikePage"} icon={<FaHandHoldingHeart size="32" />} text="Likes"/>{" "}
      <SideBarIcon href={"/ShoppingCart"} icon={<MdShoppingCart size="32" />} text="Cart"/>
    </div>
  );
};
const SideBarIcon = ({ icon, href, text = "tooltip"}) => (
  <div className="sidebar-icon top-24 group">
    {icon}
    <span className = "sidebar-tooltip group-hover:scale-90">
      <a className="px-[9px] py-[19px]" href={href}>{text}</a>
    </span>
  </div>
);

export default Sidebar;
