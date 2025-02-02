import { Children } from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const isVerify = !!token;
    const apiUrl = import.meta.env.VITE_API_URL;

   

    const getuserData = async () => {
        try {
            if (!token) return;

            setLoading(true);
            const response = await fetch(`${apiUrl}/user/v2/api/userinfo`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const res = await response.json();
                setUserData(res.user);
            }
            else {
                const errormessage = await response.json();
                // console.log(errormessage.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Internal Network Error!!")

        } finally {
            setLoading(false);
        }
    };


    const Logout = () => {
        setToken("");
        localStorage.removeItem('token');
         
       window.location.reload()
    };

    useEffect(() => {
        getuserData();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, loading, setLoading,Logout, isVerify,userData }}>
            {children}
        </AuthContext.Provider>
    )
}
