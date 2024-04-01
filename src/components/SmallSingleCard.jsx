import React from "react";
import { useNavigate } from "react-router-dom";

const SmallSingleCard = ({ info }) => {
  const navigate=useNavigate();
  return (
    <div
      className="card"
      onClick={()=>{navigate(`/product/${info.slug}`)}}
      style={{
        width: "190px",
        height: "300px",
        padding: ".8em",
        background: "#f5f5f5",
        position: "relative",
        overflow: "visible",
        cursor:"pointer",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      }}
    >
      <div
        className="card-img"
        style={{
          backgroundColor: "#ffcaa6",
          height: "40%",
          width: "100%",
          borderRadius: ".5rem",
          transition: ".3s ease"
        }}
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${info._id}`}
          className="card-img-top img-fluid"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: ".5rem"
          }}
          alt={"Product_Photo"}
        />
      </div>
      <div className="card-info" style={{ paddingTop: "10%" }}>
        <p className="text-title" style={{ fontWeight: "900", fontSize: "1.2em", lineHeight: "1.5" }}>
          {info?.name}
        </p>
        <p className="text-body" style={{ fontSize: ".9em", paddingBottom: "1px" }}>
          {(info.description).split(" ",3).join(" ")}...
        </p>
      </div>
      <div className="card-footer" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
        <span className="text-title" style={{ fontWeight: "900", fontSize: "1.2em", lineHeight: "" }}>₹ {info.price}</span>
      </div>
    </div>
  );
};

export default SmallSingleCard;
