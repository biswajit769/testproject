import React, { useEffect } from 'react';
import EventCard from "./EventCard";
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from 'react-redux';

export default function EventSection(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <div className="heading text-center">
          <h2>{props.title}</h2>
        </div>
        <p className="lead">
          We have worked with many clients and we always like to hear they come
          out from the cooperation happy and satisfied. Have a look what our
          clients said about us.
        </p>
        {/* Carousel Start*/}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">I am loading</MessageBox>
        ) : (
          <ul className="owl-carousel testimonials list-unstyled equal-height">
            Hey I am loading1
          {products.map((product) => (
            <EventCard key={product._id} product={product}/>
          ))}
        </ul>
        )}
        {/* Carousel End*/}
        <div className="see-more text-center">
          <p>Do you want to see more?</p>
          <a href="portfolio-4.html" className="btn btn-template-outlined">
            See more of our work
          </a>
        </div>
      </div>
    </>
  );
}
