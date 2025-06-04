import styles from './Dashboard.module.css'

import decodeToken from '../../../utils/decodeToken'
import { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        const user = decodeToken(token)

        if (!token || !user || !user.permission) {
            navigate("/", {replace: true})
            return
        }

    }, [token])

    return (
        <section>
            <h2 className='display-5'>Dashboard</h2>
            <div className={styles.menu}>
                <Link to="/dashboard/product/add">Adicionar produto</Link>
                <Link>Ver vendas</Link>
                <Link to="/dashboard/product/table">Procurar produto</Link>
            </div>
            <div className={styles.container}>
                <Outlet />
            </div>
        </section>
    )
}

export default Dashboard