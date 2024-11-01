import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import classes from "./WishList.module.css";
import { wishListAction } from "../store/cart-slice";
import { EmptyWishlistPage } from "./OrderConfirmation";


const Whilst = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishListData = useSelector(state => state.wishlist.wishListData);
  const [wishList, setWishList] = useState(wishListData);

    useEffect(() => {
      if(wishListData.length > 0){
        setWishList([...wishListData]);
      } else {
        setWishList(wishListData);
      }
    }, [wishListData]);

    const handleProductClick = (productItem) => {
      navigate('/productDetails', {state:{productItem}});
    };

    const handleDelete = (item) => {
      dispatch(wishListAction.handleWishListDataDelete({currentItem: item}));
    };
    return wishList.length === 0 ? <EmptyWishlistPage /> : <div className={classes.wishList_container}>
    <ul>
      {wishList.map((apperal) => (
        <li key={apperal.id}>
          <div className={classes.cards}>
          <button className={classes.delCartBtn} onClick={() => handleDelete(apperal)}>
                <i className="fa-solid fa-x"></i>
              </button>
            <img src={apperal.image} alt={apperal.category} onClick={() => handleProductClick(apperal)} />
            <div className={classes.rating}>
              <h3>{apperal.rating.rate}</h3>
              {Math.floor(apperal.rating.rate) === 5 ? (
                <i className="fa-sharp fa-solid fa-star"></i>
              ) : (
                <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
              )}
            </div>
            <div className={classes.list}>
              <div className={classes.menus}>
                <h3>{apperal.brand}</h3>
                <p>{apperal.title}</p>
                <h3>Price: {apperal.price}</h3>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>;
};

export default Whilst;