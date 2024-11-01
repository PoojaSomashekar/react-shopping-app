import { useEffect, useState } from "react";

import classes from "./ProductList.module.css";
import { useLocation, useNavigate } from "react-router";
import { wishListAction } from "../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { apperalCategoryList, categoriesSizeNotAvailable } from "../service";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistData = useSelector(state => state.wishlist.wishListData);

  const [apperalData, setApperalData] = useState([]);

  console.log(location.state);
  useEffect(() => {
    if(location.state.category){
      setApperalData(apperalCategoryList[location.state.category]);
    }
    let data = apperalCategoryList[location.state.category];
    if(wishlistData.length === 0){
      data = data.map(item => {
        if(item.wishlisted){
          item.wishlisted = !item.wishlisted;
        }
        return item;
      });
      setApperalData(data);
    } else {
      data = data.map(item => {
        const apperalItem = wishlistData.find(_item => _item.id === item.id);
        if(!apperalItem){
          item.wishlisted = false;
        } else {
          item.wishlisted = true;
        }
        return item;
      });
      setApperalData(data);
    }
  }, [location.state.category, wishlistData, dispatch]);

  const handleProductClick = (productItem) => {
    navigate('/productDetails', {state:{productItem}});
  };

  const handleWishList = (item) => {  
     
      dispatch(wishListAction.handleWishListData({currentItem: item, isCategorySizeAvailable: categoriesSizeNotAvailable.includes(item.category)}));
      const updateData = apperalData.map((_item) => {
       if( _item.id === item.id) {
        _item.wishlisted = !_item.wishlisted;
       }
       return _item;
      } )
      setApperalData([...updateData]);
    };

  return (
    <div className={classes.productList_category}>
      <ul>
        {apperalData.map((apperalItem) => (
          <li key={apperalItem.id}>
            <div className={classes.cards}>
              <img src={apperalItem.image} alt={apperalItem.category} onClick={() => handleProductClick(apperalItem)} />
              <div className={classes.rating}>
                <h3>{apperalItem.rating.rate}</h3>
                {Math.floor(apperalItem.rating.rate) === 5 ? (
                  <i className="fa-sharp fa-solid fa-star"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                )}
              </div>
              <div className={classes.list}>
                <div className={classes.menus}>
                  <h3>{apperalItem.brand}</h3>
                  <p>{apperalItem.title}</p>
                  <h3>Price: {apperalItem.price}</h3>
                </div>
                <button >
                  <i className={`${apperalItem.wishlisted === true ? `${classes.active} fa-solid` : 'fa-regular'} fa-heart `} onClick={() => handleWishList(apperalItem)}></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
