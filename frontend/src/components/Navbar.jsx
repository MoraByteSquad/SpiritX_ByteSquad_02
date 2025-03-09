import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import {useState ,useEffect} from "react";
import getTokenData from "../api/token";


function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState("User");

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const { decodedToken } = await getTokenData();
                setUser(decodedToken.username);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTokenData();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        () => navigate("/");
    };


    return (
        <div>
            <div className="flex justify-between text-center items-center text-white p-4 bg-black/50 backdrop-blur-lg">
                <div className="flex items-center">
                    <h1 className="cursor-pointer px-3 text-2xl font-bold" onClick={() => navigate("/")}>
                        SpiritX_ByteSquad
                    </h1>
                </div>
                <h1 className="bg-red-800/30 px-3 py-2 rounded-sm hover:bg-white/30 cursor-pointer">
                    UserName:{user}
                </h1>

                <h1 className="bg-red-800/30 px-3 py-2 rounded-sm hover:bg-white/30 cursor-pointer" onClick={handleLogout}>
                    Log Out
                </h1>
            </div>
            <div className="h-1 bg-white/50"></div>
        </div>
    );
}

export default Navbar;