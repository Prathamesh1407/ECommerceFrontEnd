import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [res, setResponse] = useState(null);
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/payment/checkout`,
        { amount: total }
      );
      if (data?.success) {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: data?.order.amount,
          currency: "INR",
          name: "Cart Summary Payment",
          description: "E-commerce Website",
          image: "https://avatars.githubusercontent.com/u/128747798?v=4",
          order_id: data?.order.id,
          // callback_url:
          //   "http://localhost:8000/api/v1/payment/payment-verification",
          handler: function (response) {
            setResponse(response);
          },
          prefill: {
            name: "Prathamesh Thorat",
            email: "@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#0F63EB",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error While Payment Checkout");
    }
  };

  const getTotal = () => {
    try {
      let cartTotal = 0;
      cart?.map((item) => {
        cartTotal = cartTotal + item.price * item.currQuan;
      });
      return cartTotal;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTotal(getTotal());
  }, [cart]);

  const handleVerification = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/payment/payment-verification`,
        {
          razorpay_order_id: res?.razorpay_order_id,
          razorpay_payment_id: res?.razorpay_payment_id,
          razorpay_signature: res?.razorpay_signature,
          cart,
        },
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data?.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Successful with the Verfication");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleVerification();
  }, [res]);

  const handleAmountChange = (delta, Avaquantity, id, amount) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    const newAmount = myCart[index].currQuan + delta;
    if (newAmount >= 1 && newAmount <= Avaquantity) {
      //   setAmount(newAmount);
      myCart[index].currQuan = newAmount;
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center mt-4">
              {auth?.token
                ? cart?.length > 0
                  ? `You have ${cart.length} items in your cart`
                  : "You do not have any Product in Cart , HAPPY SHOPPING :)"
                : "Login to Take a Glance of Your Cart..."}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart?.map((item) => {
              return (
                <div className="row mt-3 p-3 border-info rounded card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${item?._id}`}
                      className="card-img-top img-fluid rounded-circle"
                      style={{
                        height: "8rem",
                        width: "8rem",
                        objectFit: "contain",
                      }}
                      alt={"photo"}
                    />
                  </div>
                  <div className="col-md-8">
                    <h5>{item.name}</h5>
                    <p className="product-description">
                      {(item?.description).substring(0, 50)}...
                    </p>
                    <h6 className="product-price">₹ {item?.price}</h6>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartItem(item._id);
                      }}
                    >
                      Remove
                    </button>
                    <h5 className="product-ship pt-3">
                      Available Quantity:{" "}
                      <span className="span-ship">{item?.quantity}</span>
                    </h5>
                  </div>
                  <div className="product-quantity">
                    <div className="quantity-control">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleAmountChange(
                            -1,
                            item.quantity,
                            item._id,
                            item.currQuan
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{item.currQuan}</span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleAmountChange(
                            1,
                            item.quantity,
                            item._id,
                            item.currQuan
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-3 mt-3 text-center ">
            <h3>CART SUMMARY</h3>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4> Total :{total}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address</h5>
                  <h3>{auth?.user?.address}</h3>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/dashboard/user/profile", {
                        state: "/cart",
                      })
                    }
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div>
              {auth?.token ? (
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Make Payment
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
// import React from "react";
// import { useCart } from "../context/CartContext";
// import Layout from "../components/Layout/Layout";

// const CartPage = () => {
//   const [carts, setCarts] = useCart();
//   console.log(carts)
//   const styles = `
//     .cart-container {
//       padding: 20px;
//       background-color: #f5f5f5;
//     }

//     .cart-heading {
//       font-size: 24px;
//       color: #333;
//       margin-bottom: 20px;
//     }

//     .cart-items {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//       grid-gap: 20px;
//     }

//     .cart-item {
//       background-color: #fff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//     }

//     .cart-item-photo {
//       width: 100%;
//       height: 200px;
//       object-fit: cover;
//     }

//     .cart-item-details {
//       padding: 20px;
//     }

//     .cart-item-name {
//       font-size: 18px;
//       color: #333;
//       margin-bottom: 10px;
//     }

//     .cart-item-description {
//       font-size: 16px;
//       color: #666;
//       margin-bottom: 10px;
//     }

//     .cart-item-quantity,
//     .cart-item-price {
//       font-size: 16px;
//       color: #333;
//       margin-bottom: 5px;
//     }

//     .cart-item-price {
//       font-weight: bold;
//     }
//   `;

//   return (
//     <Layout>
//       <div className="cart-container">
//         <h1 className="cart-heading">Your Cart</h1>
//         <div className="cart-items">
//           {carts?.map((item) => {
//             return (<div className="cart-item">
//               <img
//                 src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${item?._id}`}
//                 className="card-img-top img-fluid"
//                 style={{
//                   height: "25rem",
//                   width: "30rem",
//                   objectFit: "contain",
//                 }}
//                 alt={"photo"}
//               />
//               <div className="cart-item-details">
//                 <h2 className="cart-item-name">{item.name}</h2>
//                 <p className="cart-item-description">{item.description}</p>
//                 <p className="cart-item-quantity">Quantity: 1</p>
//                 <p className="cart-item-price">{item.price}</p>
//               </div>
//             </div>)
//           })}
//           {/* Additional cart items can be added here */}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
