import React from "react";

export default function EventCard(props) {
  const { product } = props;
  //console.log("image name===",{product.image);
  return (
    <li className="item">
      <div className="testimonial d-flex flex-wrap">
        <div className="home-blog-post">
          <div className="image">
            <img src="img/portfolio-3.jpg" alt="..." className="img-fluid" />
            <div className="overlay d-flex align-items-center justify-content-center">
              <a href="#" className="btn btn-template-outlined-white">
                <i className="fa fa-chain"> </i> Read More
              </a>
            </div>
          </div>
          <div className="text">
            <h4>
              <a href="#">{product.name}</a>
            </h4>
            <p className="author-category">
              By <a href="#">John Snow</a> in <a href="blog.html">Webdesign</a>
            </p>
            <p className="intro">
              Fifth abundantly made Give sixth hath. Cattle creature i be don't
              them behold green moved fowl Moved life us beast good yielding.
              Have bring.
            </p>
            <a href="#" className="btn btn-template-outlined">
              Continue Reading
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
