import { useState } from "react";

import classes from "./UserForm.module.css";
import Modal from "./Modal";
import { CheckoutTemplate } from "./ModalTemplate";
import { useDispatch } from "react-redux";
import { cartSliceAction } from "../store/cart-slice";

const UserForm = ({setOrderConfirm}) => {  
    const dispatch = useDispatch();  
    const [userFormData, setUserFormData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
 
    const handleFormData = (event) => {
        event.preventDefault();
        const rawFormData = new FormData(event.target);
        const formData = Object.fromEntries(rawFormData.entries());
        console.log(formData);
        setUserFormData(formData);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };
    
    const handleNavigateBack = () => {
        setModalIsOpen(false);
        setOrderConfirm(true);
        dispatch(cartSliceAction.cleanUpCartItems());
    }

    return <>
    <Modal open={modalIsOpen}>
        <CheckoutTemplate userName={userFormData && userFormData.firstname} navigateBack={handleNavigateBack} onClose={handleCloseModal} />
    </Modal>
    <form className={classes.user_form} onSubmit={handleFormData}>
    <h2>Please enter delivery address</h2>
      <div className={classes.control}>
            <label htmlFor="firstname">FirstName: </label>
            <input type="text" id="firstname" name="firstname" required />
      </div>
      <div className={classes.control}>
            <label htmlFor="lastname">LastName: </label>
            <input type="text" id="lastname" name="lastname" required />
      </div>
      <div className={classes.control}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required />
      </div>
      <div className={classes.control}>
                <label htmlFor="tel">Phone: </label>
                <input type="tel" id="tel" name="tel" maxLength={16} required />
      </div>
      <div className={classes.control}>
                <label htmlFor="address">Address: </label>
                <input type="address" id="address" name="address" maxLength={50} required />
      </div>
      <div className={classes.control}>
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" maxLength={20} required />
      </div>
      <div className={classes.control}>
                <label htmlFor="postalcode">Postal Code: </label>
                <input type="address" id="postalcode" name="postalcode" min={0} max={10} minLength={6} required />
      </div>
      <div className={classes.action_btns}>
            <button type="reset" className={classes.resetBtn}>Reset</button>
            <button type="submit" className={classes.submitBtn}>Submit</button>
      </div>
  </form>
  </>
};

export default UserForm;