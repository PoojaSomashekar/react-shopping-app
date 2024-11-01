import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Cart.module.css";
import UserForm from "./UserForm";
import OrderConfirmation from "./OrderConfirmation";
import { cartSliceAction, wishListAction } from "../store/cart-slice";
import Modal from "./Modal";
import {
  MoveCheckedCartItemTemplate,
  RemoveCheckedCartItemTemplate,
} from "./ModalTemplate";
import { categoriesSizeNotAvailable } from "../service";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItemList = useSelector((state) => state.cart.cartItems);
  const [cartItems, setCartItems] = useState(cartItemList);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [cartItemChkBx, setCartItemsChkBx] = useState([]);
  const [chkbxRemoveModalIsOpen, setchkbxRemoveModalIsOpen] = useState(false);
  const [chkbxMoveModalIsOpen, setchkbxMoveModalIsOpen] = useState(false);

  useEffect(() => {
    if (cartItemList) {
      setCartItems(cartItemList);
      let total = 0;
      if (cartItemList.length > 0) {
        cartItems.forEach((cart) => (total += cart.totalQuantityPrice));
      }

      setTotalAmount(total);
    }
  }, [cartItemList, cartItems]);

  const increamentQuantity = (item) => {
    dispatch(cartSliceAction.handleQuantityInc({ currentItem: item, isCategoriesSizeAvailable: categoriesSizeNotAvailable.includes(item.category) }));
  };

  const decreamentQuantity = (item) => {
    dispatch(cartSliceAction.handleQuantityDec({ currentItem: item, isCategoriesSizeAvailable: categoriesSizeNotAvailable.includes(item.category) }));
  };

  const handleDeleteCartitem = (type, item) => {
    dispatch(cartSliceAction.deleteCartitem({ type: type, currentItem: item }));
  };

  const handleDeleteCartCheckeditem = (type) => {
    dispatch(
      cartSliceAction.deleteCartitem({ type: type, currentItem: cartItemChkBx })
    );
    setchkbxRemoveModalIsOpen(false);
    setCartItemsChkBx([]);
  };
  const handleItemCheckboxChange = (event, item) => {
    if (cartItemChkBx.length === 0) {
      let copiedCheckedItem = { ...item };
      copiedCheckedItem.checked = event.target.checked;
      setCartItemsChkBx([copiedCheckedItem]);
    } else {
      setCartItemsChkBx((prevCheckedItems) => {
        let copiedCartItems = [...prevCheckedItems];
        if (event.target.checked === false) {
          copiedCartItems = copiedCartItems.filter(
            (chkbxItem) => chkbxItem.id !== item.id
          );
        } else {
          const isCheckedItemExist = copiedCartItems.find((checkedItem) =>
            checkedItem.id === item.id ? true : false
          );
          if (!isCheckedItemExist) {
            let copiedCheckedItem = { ...item };
            copiedCheckedItem.checked = event.target.checked;
            copiedCartItems.push(copiedCheckedItem);
          }
        }
        return [...copiedCartItems];
      });
    }
  };

  const handleMoveCheckedCartitem = () => {
    dispatch(
      wishListAction.handleWishListData({
        type: "cartToWishlist",
        currentItem: cartItemChkBx,
        cartItemsList: cartItems,
      })
    );
    dispatch(
      cartSliceAction.deleteCartitem({
        type: "checked",
        currentItem: cartItemChkBx,
      })
    );
    setchkbxMoveModalIsOpen(false);
    setCartItemsChkBx([]);
  };

  const handleModalOpen = (type) => {
    if (type === "remove") {
      setchkbxRemoveModalIsOpen(true);
    } else {
      setchkbxMoveModalIsOpen(true);
    }
  };

  return (
    <>
      <Modal open={chkbxRemoveModalIsOpen}>
        <RemoveCheckedCartItemTemplate
          cartItemChkBx={cartItemChkBx}
          onClose={() => setchkbxRemoveModalIsOpen(false)}
          onDeleteCheckedCartItem={() => handleDeleteCartCheckeditem("checked")}
        />
      </Modal>
      <Modal open={chkbxMoveModalIsOpen}>
        <MoveCheckedCartItemTemplate
          cartItemChkBx={cartItemChkBx}
          onClose={() => setchkbxMoveModalIsOpen(false)}
          onMoveCheckedCartItem={() => handleMoveCheckedCartitem()}
        />
      </Modal>
      {orderConfirm ? (
        <OrderConfirmation
          cartItems={cartItems}
          orderConfirm={orderConfirm}
          setOrderConfirm={setOrderConfirm}
        />
      ) : orderConfirm === false && cartItems.length === 0 ? (
        <OrderConfirmation
          cartItems={cartItems}
          orderConfirm={orderConfirm}
          setOrderConfirm={setOrderConfirm}
        />
      ) : (
        <div className={classes.cart_container}>
          <div className={classes.cartItem_list}>
            <p className={classes.note}>
              Note: Limit of quantity to be added per item in the list is only
              10.
            </p>
            <div className={classes.header}>
              <p>
                {`${cartItemChkBx.length} / ${cartItems.length}`} items selected
              </p>
              <button disabled={cartItemChkBx.length===0} onClick={() => handleModalOpen("remove")}>Remove</button>
              <button disabled={cartItemChkBx.length===0} onClick={() => handleModalOpen("move")}>Wishlist</button>
            </div>
            <div className={classes.cartDetails}>
              <ul>
                {" "}
                {cartItems.length > 0 &&
                  cartItems.map((cart) => (
                    <li key={cart.id}>
                      <input
                        type="checkbox"
                        name={cart.id}
                        className={classes.itemCheckbox}
                        onChange={(event) =>
                          handleItemCheckboxChange(event, cart)
                        }
                      />
                      <img src={cart.item.image} alt={cart.item.title} />
                      <div className={classes.lists}>
                        <h2>{cart.item.brand}</h2>
                        <p>{cart.item.title}</p>
                        {!categoriesSizeNotAvailable.includes(cart.item.category) && <p>
                          Size: <span>{cart.size}</span>
                        </p>}
                        <div className={classes.quantity}>
                          <p>
                            Quantity: <span>{cart.quantity}</span>
                          </p>
                          <button onClick={() => increamentQuantity(cart)}>
                            <i className="fa-solid fa-caret-up"></i>
                          </button>
                          <button onClick={() => decreamentQuantity(cart)}>
                            <i className="fa-solid fa-caret-down"></i>
                          </button>
                        </div>
                        <p>
                          Price: <span>{cart.item.price}</span>
                        </p>
                        <p>
                          Total Price: <span>{cart.totalQuantityPrice}</span>
                        </p>
                      </div>
                      <button
                        className={classes.delCartBtn}
                        onClick={() =>
                          handleDeleteCartitem("onClickDelete", cart)
                        }
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={classes.billing}>
              <h3>{`Price Details(${cartItems.length} ${
                cartItems.length === 1 ? "item" : "items"
              })`}</h3>
              <ul>
                <li>
                  <p>Total MRP:</p>
                  <h4>{totalAmount}</h4>
                </li>
                <li>
                  <p>Discount on MRP:</p>
                  <h4>{`${
                    totalAmount === 0 ? 0 : `- ${totalAmount - 500}`
                  }`}</h4>
                </li>
                <li>
                  <p>Coupon Discount:</p>
                  <h4>Applied</h4>
                </li>
                <li className={classes.total_amount}>
                  <p>Total Amount: </p>
                  <h4>{`${totalAmount === 0 ? 0 : totalAmount - 500}`}</h4>
                </li>
              </ul>
            </div>
          </div>
          <UserForm
            setCartItems={setCartItems}
            setOrderConfirm={setOrderConfirm}
          />
        </div>
      )}
    </>
  );
};

export default Cart;
