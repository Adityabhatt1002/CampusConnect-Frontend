import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AuthChecker=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const checkLogin= async()=>{
            try{
                 
                const res= await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`,
                    {withCredentials:true}
                );

                dispatch(
                    login({
                        user:res.data,
                        role:res.data.role,
                    })
                );
                if(location.pathname==="/login"){
                    navigate("/home");
                }
            }
            catch(err){


            }
        };
        checkLogin();
    },[dispatch,navigate,location.pathname]);
}
export default AuthChecker;