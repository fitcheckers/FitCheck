import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../config/firebase";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function reset(email){
        return sendPasswordResetEmail(auth, email);
    }

    const updateUserProfile = async (user, profile) => {
        try {
            await updateProfile(user, profile);
        } catch (error) {
            //console.error('Error updating user profile', error);
            throw error;
        }
        //return updateProfile(user, profile);
    }

    function logout(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        register,
        reset,
        error,
        setError,
        updateUserProfile,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}