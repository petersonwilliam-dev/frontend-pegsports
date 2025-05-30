import api from "../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import decodeToken from "../utils/decodeToken";

export default function useAuth() {
    
    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem("token");

        const userDecoded = decodeToken(token)

        if (userDecoded) {
            setUser(userDecoded)
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }

    }, [authenticated]);

    async function register(user) {
        try {
        const response = await api
            .post("/users/register", user)
            .then((response) => {
            return response.data;
            });
        authUser(response);
        } catch (err) {
        console.log(err);
        }
    }

    async function login(user) {
        try {
        const response = await api.post("/users/login", user).then((response) => {
            return response.data;
        });
        authUser(response);
        } catch (err) {
        console.log(err);
        }
    }

    function authUser(data) {
        setAuthenticated(true);
        setUser(data.user)
        localStorage.setItem("token", data.token);
        navigate("/", {replace: true})
    }

    function logout() {
        setAuthenticated(false)
        setUser(null)
        api.defaults.headers.Authorization = undefined
        localStorage.removeItem("token")
        navigate(0, {replace: true})
    }

    return { register, login, logout, authenticated, user};
}
