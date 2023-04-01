import * as React from 'react';
import { ImCross } from "react-icons/im"
import { useAuth } from "../../contexts/AuthContext";

function ResetPass({toggleModal}){
    const { reset, setError } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        try {
            await reset(email);
        } catch {
            setError("The email is not associated with any account!");
        }
        toggleModal();
    }

    return (
        <form onSubmit={handleSubmit} className='mt-4 text-center'>
            <label htmlFor="email">Email:</label><br></br>
            <input type='text' className='w-[80%] pl-2' id="email" placeholder='email@gmail.com'></input><br></br>
            <input type='submit' className='text-white bg-gray-400 hover:bg-gray-600 mt-8 px-2 rounded-full text-center' value="Reset Password"></input>
        </form>
    )

} export {ResetPass}

function Reset({ isOpen = false, toggleModal }) {
return (
    <div className={`relative z-10 ${isOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity -z-10" onClick={() => toggleModal()}>
        </div>
            <div className="fixed overflow-y-auto">
                <div className='fixed bg-[#D4D4D4] top-[30%] sm:left-[37%] left-[18%] w-96 h-[40%] rounded-lg container mx-auto'>
                    <ImCross onClick={() => toggleModal()} className='relative left-[90%] top-[2%] hover:cursor-pointer'/>
                    <div className='text-center font-extrabold text-xl'>Reset Password</div>
                    <div className='text-center'>To reset your password, please enter the email associated with your FitCheck account.</div>
                    <ResetPass toggleModal={toggleModal}/>
                </div>
            </div>
    </div>
    );
}
export default Reset;