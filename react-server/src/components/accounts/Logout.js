import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useRef } from "react";


export default function Logout({modal, setModal}){
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null);
    const { logout, setError } = useAuth();

    async function handleLogout(){
        try{
            setError("");
            await logout();
            setModal(false);
            navigate("/login");
        } catch {
            setError("Failed to logout");
        }
    }
    return (
        <>
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleLogout}
                >
                Confirm Logout?
            </button>
            <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setModal(false)}
                ref={cancelButtonRef}
                >
                Cancel Logout
            </button>
        </>
    );
}