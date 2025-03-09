import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTokenData from "../api/tocken";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const  decodedToken  = await getTokenData();
       
        setUser(decodedToken.decodedToken.userName);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTokenData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between text-center items-center text-white p-4 bg-black/50 backdrop-blur-lg">
        <div className="flex items-center">
          <h1 className="cursor-pointer px-3 text-2xl font-bold" onClick={() => navigate("/")}>
            SpiritX_ByteSquad
          </h1>
        </div>
        <h1 className="bg-red-800/30 px-3 py-2 rounded-sm  cursor-pointer text-yellow-300">
          UserName : { user}
          {userRole === 'admin' && (
          <h1 className="bg-green-300/50 px-3 py-2 rounded-sm hover:bg-white/30 cursor-pointer">
            Admin
          </h1>
        )}
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