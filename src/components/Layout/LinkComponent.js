import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = ({
  selected,
  handleSelectedMenu,
  Icon,
  path,
  index,
  description,
  hasSpan,  
}) => {
  return (
    <>
      <Link
        to={path}
        className={`nav-link ${selected === index ? "active" : ""} link-dark`}
        onClick={() => handleSelectedMenu(index)}
        // style={{color: "#000"}}
      >
        {hasSpan ? null : description}
        {hasSpan && (
          <>
            <span className="menus">{Icon && <Icon />}</span>
            {description}
          </>
        )}
      </Link>
    </>
  );
};

export default LinkComponent;
