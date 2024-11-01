import { useEffect, useState } from "react";


import womenImg from "../assets/images/category-slide/women-shopping.jpg";
import menImg from "../assets/images/category-slide/men-slide.jpg";
import kidsImg from "../assets/images/category-slide/kids-shopping.jpg";
import jwelleryImg from "../assets/images/category-slide/jwellery-shopping.jpg";
import gadgetImg from "../assets/images/category-slide/gadget-shopping.jpg";
import bagsImg from "../assets/images/category-slide/bags-shopping.jpg";
import cosmeticsImg from "../assets/images/category-slide/cosmetic-shopping.jpg";
import classes from "./ImageSlideshow.module.css";

const images = [
    {image: womenImg, alt: "Women shopping image"},
    {image: menImg, alt: "Men shopping image"},
    {image: kidsImg, alt: "Kids shopping image"},
    {image: jwelleryImg, alt: "Jwellery shopping image"},
    {image: gadgetImg, alt: "Gadget shopping image"},
    {image: bagsImg, alt: "Bags shopping image"},
    {image: cosmeticsImg, alt: "cosmetics shopping image"},
];
const ImageSlideShow = () => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIndex(prevImgInd => prevImgInd < images.length - 1 ? prevImgInd + 1 : 0);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return <div className={classes.slideshow}>
        {images.map((image, index) => <img key={index} src={image.image} alt={image.alt} className={currentImgIndex === index ? classes.active : ''} />)}
    </div>;
};

export default ImageSlideShow;