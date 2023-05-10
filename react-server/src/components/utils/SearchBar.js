import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SearchBar = () => {
  const query = "";
  const navigate = useNavigate();
  const { setError } = useAuth();

  const handleChange = () => {
    let element = document.getElementById("default-search").value;
    element = element.toLowerCase();
    switch(element){
      case "artsy":
        navigate("/YourFit/Artsy")
        break;
      case "athleisure":
        navigate("/YourFit/Athleisure")
        break;
      case "business":
        navigate("/YourFit/Business")
        break;
      case "biker":
        navigate("/YourFit/Biker")
        break;
      case "casual":
        navigate("/YourFit/Casual")
        break;
      case "classic":
        navigate("/YourFit/Classic")
        break;
      case "hipster":
        navigate("/YourFit/Hipster")
        break;
      case "kawaii":
        navigate("/YourFit/Kawaii")
        break;
      case "korean":
        navigate("/YourFit/Korean")
        break;
      case "minimalistic":
        navigate("/YourFit/Minimalistic")
        break;
      case "sporty":
        navigate("/YourFit/Sporty")
        break;
      case "street":
        navigate("/YourFit/Street")
        break;
      default:
        setError("Please choose a tag from the options.")
        break;
    }
    return;
  };


  return (
    <div className="w-[30%]">
      <form onSubmit={() => handleChange()}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch />
          </div>
            <input
              list="tags"
              type="search"
              id="default-search"
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Outfit of the Day"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-3 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
            <datalist id="tags">
              <option value="Artsy" />
              <option value="Athleisure" />
              <option value="Business" />
              <option value="Biker" />
              <option value="Casual" />
              <option value="Classic" />
              <option value="Hipster" />
              <option value="Kawaii" />
              <option value="Korean" />
              <option value="Minimalist" />
              <option value="Sporty" />
              <option value="Street" />
            </datalist>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
