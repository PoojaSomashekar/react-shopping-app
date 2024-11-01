import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import classes from "./ProductDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceAction, wishListAction } from "../store/cart-slice";
import _ from "lodash";
import { categoriesSizeNotAvailable, sizes } from "../service";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productItem, setProductItem] = useState(null);
  const [currentSize, setCurrentSize] = useState("");
  const cartItemList = useSelector(state => state.cart.cartItems);
  const [sameSizeExist, setSameSizeExist] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [isCategorySizeNotAvailable, setIsCategorySizeNotAvailable] = useState(false);
  
  useEffect(() => {
    if(location.state.productItem){
     const sizeExist = categoriesSizeNotAvailable.includes(location.state.productItem.category);
     setIsCategorySizeNotAvailable(sizeExist);
    }
    setProductItem(location.state.productItem);
  }, [location.state.productItem]);

  const handleSizeChange = (event) => {
    event.preventDefault();
    setSameSizeExist(false);
    setSizeError(false);
    setCurrentSize(event.target.value);
    if(cartItemList.length > 0) {
      cartItemList.forEach(item => {
        if(item.size === event.target.value && item.item.id === productItem.id){
          setSameSizeExist(true);
        }
      })
    }
  };

  const handleAddToBag = () => {
    const uniqueID = _.uniqueId('cart-');
    if(currentSize !== "") {
      setSizeError(false);
      dispatch(cartSliceAction.addToCartItems({currentItem: productItem, size: currentSize, id: uniqueID, isCategorySizeAvailable: isCategorySizeNotAvailable}));
      if(cartItemList.length === 0){
        setSameSizeExist(true);
      } else {
        cartItemList.forEach(item => {
          if(item.size !== currentSize){
            setSameSizeExist(true);
          }
        })
      }
    } else {
      if(!isCategorySizeNotAvailable){
        setSizeError(true);
        
      } else{
        dispatch(cartSliceAction.addToCartItems({currentItem: productItem, size: currentSize, id: uniqueID, isCategorySizeAvailable: isCategorySizeNotAvailable}));
        navigate('/cart');
       
      }
     
    }
  };

  const handleWishList = () => {   
    dispatch(wishListAction.handleWishListData({currentItem: productItem, isCategorySizeAvailable: isCategorySizeNotAvailable}));
    setProductItem({...productItem, wishlisted: !productItem.wishlisted});
  };

  const goToCart = () => {   
    navigate('/cart');
  };

  return (
    productItem && (
      <div className={classes.product_container}>
        <img src={productItem.image} alt={productItem.title} />
        <ul>
          <li>
            <h2>{productItem.brand}</h2>
          </li>
          <li>
            <label>{productItem.title}</label>
          </li>
          <li className={classes.ratingLi}>
            <div className={classes.rating}>
              <h3>{productItem.rating.rate}</h3>
              {Math.floor(productItem.rating.rate) === 5 ? (
                <i className="fa-sharp fa-solid fa-star"></i>
              ) : (
                <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
              )}
              |{" "}
              <h3 className={classes.count}>
                {productItem.rating.count} Ratings
              </h3>
            </div>
          </li>
          <li>
            <h3>Price: {productItem.price} </h3>
          </li>
          {!isCategorySizeNotAvailable && <li>
            <h3>Select Size</h3>
            <div className={classes.size_container}>
            {sizes.map((_size) => (<label 
                key={_size.id}
                htmlFor={_size.id}
                className={currentSize === _size.size ? classes.active : ""}
              >
                <input
                  type="radio"
                  id={_size.id}
                  name="toggle"
                  value={_size.size}
                  checked={currentSize === _size.size ? true : false}
                  onChange={handleSizeChange}
                />
                <span className={currentSize === _size.size ? classes.activespan : ""}>
                 {_size.size}
                </span>
              </label>))}
            </div>
          </li>}
          <li>
            <div className={classes.action_btns}>
              <button className={classes.addToBag} onClick={sameSizeExist ? goToCart : handleAddToBag}>
              <i className="fa-solid fa-bag-shopping"></i>  {sameSizeExist === false ?  'ADD TO BAG' :'GO TO BAG' } 
              </button>
              <button className={classes.addToWishlist}>
                {" "}
                <i className={`${productItem.wishlisted === true ? `${classes.active} fa-solid` : 'fa-regular'} fa-heart`} onClick={handleWishList}></i> WISHLIST
              </button>
            </div>
          </li>
          {!isCategorySizeNotAvailable && sizeError &&  <li>
           <p className={classes.sizeError}>*Please select the size before adding item to the bag.</p>
          </li>}
          <li className={classes.reviewDiv}>
            <ul>
              <h2 className={classes.reviews}>Reviews</h2>{" "}
              {productItem.reviews.map((userReview, index) => (
                <li key={index}>
                  <h3 className={classes.reviewers_name}>{userReview.name}</h3>
                  <p className={classes.users_review}>{userReview.review}</p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    )
  );
};

export default ProductDetails;
