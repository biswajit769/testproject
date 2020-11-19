import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import DateTimePicker from "react-datetime-picker";
import { parentCategories, eventCategories } from "../helper";
import MultiSelect from "../components/MultiSelect";
import { Link } from "react-router-dom";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [pagetitle, setPagetitle] = useState("add");
  //const [hdate, setHDate] = useState(new Date());
  const [hdate, setHDate] = useState(new Date());
  const [pcategoryids, setPcategoryids] = useState([]);
  const [ecategoryids, setEcategoryids] = useState([]);
  const [pcategory, setPCategory] = useState([
    { id: 1, value: "upcoming", isChecked: false },
    { id: 2, value: "new", isChecked: false },
    { id: 3, value: "top user picks", isChecked: false },
  ]);
  const [ecategory, setECategory] = useState([
    { id: 1, value: "Education & Family", isChecked: false },
    { id: 2, value: "Entertainment & Visual Arts", isChecked: false },
    { id: 3, value: "Food & Drink", isChecked: false },
    { id: 4, value: "Fitness & Health", isChecked: false },
    { id: 5, value: "Home & Lifestyle", isChecked: false },
    { id: 6, value: "Community & Spirituality", isChecked: false },
    { id: 7, value: "Other", isChecked: false },
  ]);
  const [ticketCancellationPolicy, setTicketCancellationPolicy] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setPagetitle(product.pageaction)
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      setShortDescription(product.shortdescription);
      //setHDate(product.hdate);
      setPcategoryids(product.pcategoryids);
      setEcategoryids(product.ecategoryids);
      setPCategory(product.pcategory)
      setECategory(product.ecategory);
      setTicketCancellationPolicy(product.ticketCancellationPolicy);
      //setHDate(product.hdate);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const checkUncheckPcategory = (event) => {
    const newitem = event.target.value;
    const checked = event.target.checked;
    //setPcategoryids((olditms)=>[...olditms,newitem])
    if (checked) {
      const duplicate = pcategoryids.includes(newitem);
      if (!duplicate) {
        setPcategoryids((olditms) => [...olditms, newitem]);
      }
    } else {
      const removeitem = pcategoryids.includes(newitem);
      if (removeitem) {
        setPcategoryids(pcategoryids.filter((item) => item != newitem));
      }
    }
  };

  const checkUncheckEcategory = (event) => {
    const newitem = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      const duplicate = ecategoryids.includes(newitem);
      if (!duplicate) {
        setEcategoryids((olditms) => [...olditms, newitem]);
      }
    } else {
      const removeitem = ecategoryids.includes(newitem);
      if (removeitem) {
        setEcategoryids(ecategoryids.filter((item) => item != newitem));
      }
    }
  };

  const handleCheckChieldElement = (event) => {
    let updatedPacategory = Object.assign([], pcategory);
    updatedPacategory.forEach((pcat) => {
      if (pcat.value === event.target.value)
        pcat.isChecked = event.target.checked;
    });
    checkUncheckPcategory(event);
    setPCategory(updatedPacategory);
  };

  const listingredirect = (e) =>{
    props.history.push("/productlist");
  }

  const handleCheckEcategoryElement = (event) => {
    let updatedEcacategory = Object.assign([], ecategory);
    updatedEcacategory.forEach((ecat) => {
      if (ecat.value === event.target.value)
        ecat.isChecked = event.target.checked;
    });
    checkUncheckEcategory(event);
    setECategory(updatedEcacategory);
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const hostname =
    userInfo.name !== undefined ? userInfo.name : "Anonymous user";
  const hostuserid = userInfo._id;
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
        shortdescription,
        hdate,
        pcategory,
        ecategory,
        pcategoryids,
        ecategoryids,
        hostname: hostname,
        hostuserid,
        pageaction:'edit',
        ticketCancellationPolicy
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <>
      <div id="heading-breadcrumbs" class="brder-top-0 border-bottom-0">
        <div class="container">
          <div class="row d-flex align-items-center flex-wrap">
            <div class="col-md-7">
              <h1 class="h2">{pagetitle} Event</h1>
            </div>
            <div class="col-md-5">
              <ul class="breadcrumb d-flex justify-content-end">
                <li class="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li class="breadcrumb-item active">{pagetitle} Event</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div id="contact" className="container">
          <div className="row">
            <div className="col-lg-8">
              <section className="bar">
                <div className="heading">
                  <h3>Event Details</h3>
                </div>
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstname">Event Title</label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastname">Ticket Price</label>
                        <input
                          id="price"
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Parent Group</label>
                        <>
                          {pcategory.map((categoryItem) => (
                            <div
                              className="checkbox multi-select"
                              key={categoryItem.id}
                            >
                              <label>
                                <MultiSelect
                                  {...categoryItem}
                                  handleCheckChieldElement={
                                    handleCheckChieldElement
                                  }
                                />
                              </label>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Categories</label>
                        <>
                          {ecategory.map((ecategoryItem) => (
                            <div
                              className="checkbox multi-select"
                              key={ecategoryItem.id}
                            >
                              <label>
                                <MultiSelect
                                  {...ecategoryItem}
                                  handleCheckChieldElement={
                                    handleCheckEcategoryElement
                                  }
                                />
                              </label>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="shortdescription">
                          Short Description
                        </label>
                        <textarea
                          id="shortdescription"
                          className="form-control"
                          value={shortdescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="countInStock">Capacity</label>
                        <input
                          id="countInStock"
                          type="text"
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hdate">Date</label>
                        <DateTimePicker
                          onChange={setHDate}
                          value={hdate}
                          className="form-control-date"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                          className="form-control"
                          id="image"
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="imageFile">Image File</label>
                        <input
                          className="form-control"
                          type="file"
                          id="imageFile"
                          label="Choose Image"
                          onChange={uploadFileHandler}
                        />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                        {errorUpload && (
                          <MessageBox variant="danger">
                            {errorUpload}
                          </MessageBox>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="ticketCancellationPolicy">Ticket Cancellation Policy</label>
                        <input
                          id="ticketCancellationPolicy"
                          type="text"
                          value={ticketCancellationPolicy}
                          onChange={(e) => setTicketCancellationPolicy(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="box mt-0 pb-0 no-horizontal-padding">
                  <div class="box-footer d-flex justify-content-between align-items-center">
                    <div class="left-col">
                      <button type="button" onClick={listingredirect} className="btn btn-secondary mt-0"><i className="fa fa-chevron-left"></i>Cancel</button>
                      </div>
                    <div class="right-col">
                      <button type="submit" className="btn btn-template-outlined">{(pagetitle == 'edit')?'update':'add'} Event <i className="fa fa-chevron-right"></i></button>
                    </div>
                  </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
