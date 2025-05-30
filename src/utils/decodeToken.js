import { jwtDecode } from "jwt-decode";

export default function decodeToken(token) {

    if (!token) return null

    try {
        const decoded = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)

        if (decoded.exp && decoded.exp < currentTime) {
            return null
        }

        return decoded
        
    } catch (err) {
        console.log(err)
        return null
    }
}