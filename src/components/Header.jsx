import classes from "./Header.module.css";

import shoppingLogoImg from "../assets/images/shoppingLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const cartList = useSelector(state => state.cart.cartItems);
    return <header>
        <nav>
            <ul>
                <li className={classes.shoppingLogo}><Link className={classes.link} to='/'><img src={shoppingLogoImg} alt="Shopping logo" /></Link></li>
                <li className={classes.menus}>
                    <Link className={classes.link} to='/wishList'><i className="fa-regular fa-heart"></i></Link>
                    <Link className={`${classes.link} ${classes.linkBadge}`} to='/cart'>{cartList.length > 0 && <i className={`fa-regular fa-badge ${classes.cart_badge}`}>{cartList.length}</i>}<i className="fa-solid fa-cart-shopping"></i></Link>
                </li>
            </ul>
        </nav>
    </header>;
};

export default Header;