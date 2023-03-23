import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import axios from "axios";
import API from "./API";

function AuthMiddleware() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token, removeToken } = useToken();
    const { user, setUser, removeUser } = useUser();
    const { auth_api_url } = API();
    const navigate = useNavigate();
    const location = useLocation();

    const checkUserToken = () => {
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            if (user) removeUser()
            if (location.pathname !== '/login' && location.pathname !== '/signup')
                return navigate('/login')
        } else {
            setIsLoggedIn(true);
            if (!user || user === 'undefined') {
                axios.get(`${auth_api_url}/user`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => {
                        setUser(JSON.stringify(res.data))
                        if (res.data['image'] === null || res.data['phone_no'] === null || res.data['bio'] === null) navigate('/on-boarding')
                    }).catch(err => {
                        if (err.response.status === 401) removeToken()
                        console.log(err)
                    })
            }
            if (location.pathname === '/login' || location.pathname === '/signup')
                return navigate('/')
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn, token]);

    return {
        isLoggedIn
    }
}

export default AuthMiddleware;