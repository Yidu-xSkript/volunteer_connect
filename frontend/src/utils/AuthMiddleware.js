import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import API from "./API";
import AxiosService from "../services/axios.services";

// Implement Axios Interceptors to assign refreshed tokens
// You could use react-router-interceptor -- for better implementation
function AuthMiddleware() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token, removeToken } = useToken();
    const { user, setUser, removeUser } = useUser();
    const { auth_api_url } = API();
    const navigate = useNavigate();
    const location = useLocation();
    const { _api } = AxiosService();

    const _user = JSON.parse(user)

    const checkUserToken = () => {
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            if (user) removeUser()
            if (location.pathname !== '/login' && location.pathname !== '/signup')
                return navigate('/login')
        } else {
            setIsLoggedIn(true);
            if (!user || user === 'undefined') {
                _api.get(`${auth_api_url}/user`)
                    .then((res) => {
                        setUser(JSON.stringify(res.data))
                        if (res.data['image'] === null || res.data['phone_no'] === null || res.data['bio'] === null) navigate('/on-boarding')
                    }).catch(err => {
                        if (token)
                        {
                            removeToken()
                            checkUserToken()
                        }
                        console.log(err)
                    })
            }
            if (user && _user.role === 'volunteer')
                if (location.pathname === '/missions' || location.pathname === '/applicants') navigate('/')

            if (user && _user.role === 'organization')
                if (location.pathname === '/applications') navigate('/')

            if (location.pathname === '/login' || location.pathname === '/signup') navigate('/')
            if (user && (_user.image === null || _user.phone_no === null || _user.bio === null)) navigate('/on-boarding')
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