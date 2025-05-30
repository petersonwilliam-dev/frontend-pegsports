import styles from "./Navbar.module.css";
import logo from "../../assets/img/logo.png";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";


// CONTEXT
import { Context } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

// HOOKS

function Navbar() {

  const { authenticated, logout, user } = useContext(Context);
  const {cart} = useContext(CartContext)
  const [search, setSearch] = useState('')

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <Link to="/">
            <img src={logo} alt="Logo PEG Sports" />
          </Link>
        </div>
        <div className={styles.search}>
          <input type="text" name="search" id="search" placeholder="O que você procura?" onChange={(e) => setSearch(e.target.value)} />
          <Link to={`/search?name=${search}&page=1`}>
            <ion-icon name="search"></ion-icon>
          </Link>
        </div>
        <div>
          <ul className={styles.menu}>
            {authenticated ? (
              <>
                <li>
                  {cart && (
                    <Link to="/cart" className={styles.link_cart}>
                      <ion-icon name="cart-outline"></ion-icon>
                      <span>{cart.products.length}</span>
                    </Link>
                  )}
                </li>
                {user && (
                  <>
                    {user.permission && (
                      <li>
                        <Link to="/dashboard" className={styles.link_cart}>Painel</Link>
                      </li>
                    )}
                  </>
                )}
                <li onClick={logout}>
                  <Link>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Entrar</Link>
                </li>
                <li>
                  <Link to="/register">Registrar</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
