import React from "react";

const Pagination = ({ totalPosts, perPagePosts, setPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / perPagePosts); i++) {
    pages.push(i);
  }
  return (
    <div className="d-flex">
      {pages?.map((item, index) => {
        return (
          <button
            className="btn btn-primary m-3"
            onClick={() => {
              setPage(item);
            }}
            key={index}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
