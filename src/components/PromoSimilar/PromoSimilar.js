import React, { useEffect, useState }  from "react";
import Item from "../Item/Item";
import axios from 'axios';
import { useParams } from "react-router-dom";

import "./PromoSimilar.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import clienteAxiosBusiness from "../config/axiosBusiness";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PromoSimilar = (props) => {
  const [categories, setCategories] = useState([]);
  const getProductsDay = async () => {
      //const res = await axios.get('http://localhost:3000/products');
      // const res = await axios.get(`https://la-ganga-api.herokuapp.com/filterCategoryMarca/category=${props.category}&marca=''`);
      const res = await clienteAxiosBusiness.get(`/filterCategoryMarca/category=${props.category}&marca=''`);
      setCategories(res.data.categoriaYmarca);
  };
  useEffect(() => {
      getProductsDay();

  }, [props.category]);

  return (
    <div className="margin-box">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2800}
        deviceType={props.deviceType}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={false}
        draggable={false}
        showDots={false}
      >
        {categories.map((category, index) => (
          <div className="item-carousel" key={index}>
            <Item product={category} addInterest={props.addInterest}/>
          </div>
        ))}
      </Carousel>
    </div >
  );
};

export default PromoSimilar;
