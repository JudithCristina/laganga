import axios from "axios";
import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import clienteAxiosBusinessLocal from "../config/axiosBusinessLocal";
import Item from "../Item/Item";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 991 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 2,
  },

  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const OfertasDelDia = (props) => {
  const [products, setProducts] = useState([]);

  const getProductsDay = async () => {
    await clienteAxiosBusinessLocal.get("/get-promotion/day/user")
    .then((res) => {
      if (res.data.MensajeRespuesta === "NO EXISTEN DATOS") {
        setProducts([]);
      } else {
        setProducts(res.data.promocionesDelDia);
      }

      // setLoading(false);
    })
    .catch((e) => {
      console.log(e, "error");
    })
  };

  useEffect(() => {
    getProductsDay();
  }, []);

  return (
    <div className="margin-box">
      <div className="box-gangaDelDia">
        <h1 className="title-ganga">Ofertas del día</h1>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2500}
        deviceType={props.deviceType}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={true}
        draggable={false}
        showDots={false}
      >
        {products.map((product) => (
          <div className="item-carousel" key={product._id} >
            <Item product={product}  products={products} addInterest={props.addInterest}/>
          </div>
        ))}
      </Carousel> 
    </div>
  );
};

export default OfertasDelDia;
