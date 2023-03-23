import axios from "axios";
import { useNavigate } from "react-router";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import API from "../utils/API";

function AxiosService() {
    const { base_api_url } = API()
    const { token, removeToken, setToken } = useToken()
    const { user, removeUser } = useUser()
    const navigate = useNavigate()

    const _api = axios.create({
        baseURL: base_api_url,
        headers: token && { Authorization: `Bearer ${token}` }
    })

    _api.interceptors.response.use(
        (response) => {
            const _token = response.data['token']
            if (_token) {
                if (token) removeToken()
                setToken(_token)
            }
            return Promise.resolve(response)
        },
        (error) => {
            if (error.response.status === 401) {
                console.error("You are not logged in!");
                if (token) removeToken()
                if (user) removeUser()
                navigate('/login')
                return Promise.reject();
            }
            return Promise.reject(error);
        }
    )
    return {
        _api
    }
}

export default AxiosService;