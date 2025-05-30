import styles from './Footer.module.css'
import logodev from '../../assets/img/logodev.png'


function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={logodev} alt="Logo Petersonw dev" />
            <div className={styles.contacts}>
                <a href=""><i data-feather="instagram"></i></a>
                <a href=""><i data-feather="mail"></i></a>
                <a href=""><i data-feather="phone-call"></i></a>
            </div>
        </footer>
    )
}

export default Footer