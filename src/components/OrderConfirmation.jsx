import { useNavigate } from "react-router";
import orderConfirmmationImg from "../assets/images/order-confirmation.jpg";
import emptyBagImg from "../assets/images/empty-bag.jpg";
import emptyListImg from "../assets/images/empty-list.jpg";

import classes from "./OrderConfirmation.module.css";

const OrderConfirmation = ({ cartItems, setOrderConfirm, orderConfirm }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.order_confirmation}>
      {orderConfirm && cartItems.length > 0 ? (
        <img src={orderConfirmmationImg} alt="Order confirmation image" />
      ) : (
        <img src={emptyBagImg} alt="Empty bag image" />
      )}
      <div className={classes.action_btns}>
        <button
          onClick={() => {
            setOrderConfirm(false);
            navigate("/wishList");
          }}
        >
          Shop more items from your Wishlist
        </button>
        <button
          className={classes.homeBtn}
          onClick={() => {
            setOrderConfirm(false);
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

export const EmptyWishlistPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.order_confirmation}>
      <img src={emptyListImg} alt="Empty wishlist image" />
      <div className={classes.action_btns}>
        <button
          className={classes.homeBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};
