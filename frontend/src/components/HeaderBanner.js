import React from "react";

export default function HeaderBanner(props) {
  return (
    <section
    style={{
      background: 'url("img/photogrid.jpg") center center repeat',
      backgroundSize: "cover",
    }}
    className="relative-positioned"
  >
    {/* Carousel Start*/}
    <div className="home-carousel">
      <div className="dark-mask mask-primary" />
      <div className="container">
        <div className="homepage owl-carousel">
          <div className="item">
            <div className="row">
              <div className="col-md-5 text-right">
                <p>
                  <img src="img/logo.png" alt className="ml-auto" />
                </p>
                <h1>Unlocking a Compelling Online Event Experience</h1>
                <p>
                Host a Successful Virtual Event
                </p>
              </div>
              <div className="col-md-7">
                <img
                  src="img/holi-7.jpg"
                  alt
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-md-7 text-center">
                <img src="img/hometemplate-1.jpg" alt className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h2>Key beneﬁts of online learning</h2>
                <ul className="list-unstyled">
                  <li>Upskilling is Becoming Increasingly Necessary</li>
                  <li>Flexible learning schedule</li>
                  <li>
                  Online Learning Helps Us Stay Relevant in a Quickly Changing World
                  </li>
                  <li>Geographic Flexibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Carousel End*/}
  </section>
  );
}
