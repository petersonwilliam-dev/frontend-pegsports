import styles from './Profile.module.css'

import { useState, useEffect } from "react"
import { useNavigate, Link, Outlet } from "react-router-dom"

import decodeToken from '../../../utils/decodeToken'

function Profile() {

    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    useEffect(() => {
        const user = decodeToken(token)
       
        if (!token || !user) {
            navigate("/", {replace: true})
            return
        }
    }, [token])

    return (
        <section>
            <h2 className="display-5">Minha conta</h2>
            <div className={styles.menu}>
                <Link><ion-icon name="person-outline"></ion-icon> Meus dados</Link>
                <Link to="/profile/myorders"><ion-icon name="cube-outline"></ion-icon>Minhas compras</Link>
                <Link to="/profile/address" ><ion-icon name="home-outline"></ion-icon>Seus endereços</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </section>
    )
}

export default Profile