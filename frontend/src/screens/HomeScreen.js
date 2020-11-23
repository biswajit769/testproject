import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import HeaderBanner from "../components/HeaderBanner";
import EventSection from '../components/EventSection'
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { arrangeproducts } from '../helper'; 

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  if(!loading && !error){
    //const productcategories = arrangeproducts(products);
  }
  const [owloptions, setOwlOptions] = useState({
    loop: true,
    autoplay:false,
    responsive:{
      0: {
          items: 1,
      },
      600: {
          items: 3,
      },
      1000: {
          items: 4,
      },
  },
  });
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);
  return (
    <>
    <HeaderBanner />
    <section className="newbar background-white no-mb">
      <div className="container">
        <div className="heading text-center">
          <h2>Upcoming</h2>
        </div>
        {/* Carousel Start*/}
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="products-big">
          <div className="row products">
          <OwlCarousel items={3}  
          className="owl-theme"
          margin={20} {...owloptions}> 
          {arrangeproducts(products).upcomingProducts.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
          </OwlCarousel>
          </div>
        </div>
      )}
        {/* Carousel End*/}
        <div className="text-center maintain-space">
          <Link className="btn btn-template-outlined show-more" to="/productfilter/upcoming">See more</Link>
        </div>
      </div>
      </section>
      <section className="newbar background-white no-mb">
      <div className="container">
        <div className="heading text-center">
          <h2>New</h2>
        </div>
        {/* Carousel Start*/}
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="products-big">
          <div className="row products">
          <OwlCarousel items={3}  
          className="owl-theme"
          margin={20} {...owloptions}> 
          {arrangeproducts(products).newProducts.map((product) => (
            <Product key={product._id} product={product} isNew></Product>
          ))}
          </OwlCarousel>
          </div>
        </div>
      )}
        {/* Carousel End*/}
        <div className="text-center maintain-space">
          <Link className="btn btn-template-outlined show-more" to="/productfilter/new">See more</Link>
        </div>
      </div>
      </section>
      <section className="newbar background-white no-mb">
      <div className="container">
        <div className="heading text-center">
          <h2>Top User Picks</h2>
        </div>
        {/* Carousel Start*/}
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="products-big">
          <div className="row products">
          <OwlCarousel items={3}  
          className="owl-theme"
          margin={20} {...owloptions}> 
          {arrangeproducts(products).topUserPicksProducts.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
          </OwlCarousel>
          </div>
        </div>
      )}
        {/* Carousel End*/}
        <div className="text-center maintain-space">
          <Link className="btn btn-template-outlined show-more" to="/productfilter/top user picks">See more</Link>
        </div>
      </div>
      </section>
      
    </>
  );
}
