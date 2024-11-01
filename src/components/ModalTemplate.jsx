import classes from "./ModalTemplate.module.css";

export const CheckoutTemplate = ({ userName, onClose, navigateBack }) => {
  return (
    <div className={classes.modal_container}>
      <h1>Hello {userName}!</h1>
      <p>Are you sure to check-out this items ?</p>
      <div className={classes.actions_btns}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={navigateBack}>Place Order</button>
      </div>
    </div>
  );
};

export const RemoveCheckedCartItemTemplate = ({
  cartItemChkBx,
  onClose,
  onDeleteCheckedCartItem,
}) => {
  return (
    <div className={classes.modal_container}>
      <h1>{`Remove ${cartItemChkBx.length} ${
        cartItemChkBx.length === 1 ? "item" : "items"
      }`}</h1>
      <p>{`Are you sure you want to ${cartItemChkBx.length} ${
        cartItemChkBx.length === 1 ? "item" : "items"
      } from the cart ?`}</p>
      <div className={classes.actions_btns}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDeleteCheckedCartItem}>Remove</button>
      </div>
    </div>
  );
};

export const MoveCheckedCartItemTemplate = ({
  cartItemChkBx,
  onClose,
  onMoveCheckedCartItem,
}) => {
  return (
    <div className={classes.modal_container}>
      <h1>
        {`Move ${cartItemChkBx.length} ${
          cartItemChkBx.length === 1 ? "item" : "items"
        }`}{" "}
        to wishlist
      </h1>
      <p>{`Are you sure you want to move ${
        cartItemChkBx.length === 1 ? "item" : "items"
      } from the cart ?`}</p>
      <div className={classes.actions_btns}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onMoveCheckedCartItem}>Wishlist</button>
      </div>
    </div>
  );
};
