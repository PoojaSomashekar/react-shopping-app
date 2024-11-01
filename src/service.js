import { BAGS_APPERALS } from "./apperals-data/bags-apperal-data";
import { COSMETICS_APPERALS } from "./apperals-data/cosmetics-apperal-data";
import { GADGETS_APPERALS } from "./apperals-data/gadget-apperal-data";
import { JWELLERY_APPERALS } from "./apperals-data/jwellery-apperal-data";
import { KIDS_APPERALS } from "./apperals-data/kids-apperal-data";
import { MEN_APPERALS } from "./apperals-data/men-apperal-data";
import { WOMEN_APPERALS } from "./apperals-data/women-apperal-data";
import womenImg from "/src/assets/images/category-slide/women-shopping.jpg";
import menImg from "/src/assets/images/category-slide/men-category.jpg";
import kidsImg from "/src/assets/images/category-slide/kids-shopping.jpg";
import jwelleryImg from "/src/assets/images/category-slide/jwellery-shopping.jpg";
import gadgetImg from "/src/assets/images/category-slide/gadget-shopping.jpg";
import bagsImg from "/src/assets/images/category-slide/bags-shopping.jpg";
import cosmeticsImg from "/src/assets/images/category-slide/cosmetic-shopping.jpg";

export const categoriesSizeNotAvailable = ['Gadgets', 'Bags', 'Cosmetics'];

export const sizes = [{id:'size-1', size:'S'},{id:'size-2', size:'M'},{id:'size-3', size:'L'},{id:'size-4', size:'XL'},{id:'size-5', size:'XXL'}];

export const apperalCategoryList = {
    Women: WOMEN_APPERALS,
    Men: MEN_APPERALS,
    Kids: KIDS_APPERALS,
    Jwellery: JWELLERY_APPERALS,
    Gadgets: GADGETS_APPERALS,
    Bags: BAGS_APPERALS,
    Cosmetics: COSMETICS_APPERALS,
  };

  export const categoryImagesList = [
    { image: womenImg, name: "Women", alt: "Women shopping image" },
    { image: menImg, name: "Men", alt: "Men shopping image" },
    { image: kidsImg, name: "Kids", alt: "Kids shopping image" },
    { image: jwelleryImg, name: "Jwellery", alt: "Jwellery shopping image" },
    { image: gadgetImg, name: "Gadgets", alt: "Gadget shopping image" },
    { image: bagsImg, name: "Bags", alt: "Bags shopping image" },
    { image: cosmeticsImg, name: "Cosmetics", alt: "Cosmetics shopping image" },
  ];