import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";

export default function LogButton(){
    const [modal, setModal] = useState(false);

    const { currentUser } = useAuth();

    return(
        <>
            <div className="flex md:order-2">
                {currentUser && (
                <>
                    <button
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                    onClick={() => setModal(true)}
                    >
                        Logout
                    </button>
                </>
                )}
            </div>
            {modal && <Logout modal={modal} setModal={setModal} />}
        </>
    )
}