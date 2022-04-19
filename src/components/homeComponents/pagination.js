import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page }) => {
  const number = [];
  for (let i = 1; i < page; i++) {
    number.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {
          number.map((item, id) => (
            <li className={`page-item d-flex flex-wrap`} key={id}>
              <Link className="page-link" to={"#"}>
                {item}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Pagination;
