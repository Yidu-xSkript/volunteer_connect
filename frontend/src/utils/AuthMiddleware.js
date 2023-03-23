import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useToken from "../hooks/useToken";

function AuthMiddleware()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token } = useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const checkUserToken = () => {
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            console.log(location.pathname)
            if (location.pathname !== '/login' && location.pathname !== '/signup')
                return navigate('/login')
        } else {
            setIsLoggedIn(true);
            if (location.pathname === '/login' && location.pathname === '/signup')
                return navigate('/')
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return {
        isLoggedIn
    }
}

export default AuthMiddleware;