import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { formatPrice, formatDate } from "../helper"
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit/`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts('','','','',userInfo._id));
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Event Management</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Event Management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <div id="content">
        <div className="container">
          <div className="row bar mb-0">
            <div id="customer-orders" className="col-md-12">
              <div className="box mt-0 mb-lg-0">
                <div className="table-responsive">
                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Event Title</th>
                          <th>Price</th>
                          <th>PCategory</th>
                          <th>Host</th>
                          <th>Capacity</th>
                          <th>Hosting Date</th>
                          <th>Creation Date</th>
                          <th colSpan="2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td>#{product._id}</td>
                            <td>{product.name}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>
                              <ul>
                                {product.pcategoryids && product.pcategoryids.map(element => <li className="badge badge-info">{element}</li>)}
                              </ul>
                            </td>
                            <td>{product.hostname}</td>
                            <td>{product.countInStock}</td>
                            <td>{formatDate(product.hdate)}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td colSpan="2">
                              <button
                                type="button"
                                className="btn btn-sm btn-warning btn-sm"
                                onClick={() =>
                                  props.history.push(
                                    `/product/${product._id}/edit`
                                  )
                                }
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger btn-sm"
                                onClick={() => deleteHandler(product)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="box-footer d-flex justify-content-between align-items-center">
                  <div className="left-col">&nbsp;</div>
                  <div className="right-col">
                    <button type="button" className="btn btn-template-outlined" onClick={createHandler}>
                      Add an Event<i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
