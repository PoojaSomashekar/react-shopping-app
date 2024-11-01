import classes from "./ProductCategory.module.css";
import { useNavigate } from "react-router";
import { categoryImagesList } from "../service";

const ProductCategory = () => {
  const navigate = useNavigate();
  const handleNavigate = (category) => {
    navigate("/productList", { state: { category: category } });
  };
  return (
    <div className={classes.category_container}>
      <ul>
        {categoryImagesList.map((category, index) => (
          <li key={index} onClick={() => handleNavigate(category.name)}>
            <img src={category.image} alt={category.alt} />{" "}
            <h3>{category.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategory;
