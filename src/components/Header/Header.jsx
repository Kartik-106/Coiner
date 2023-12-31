import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export const Header = ({back}) => {
  return (
    <header className="Header">
      <div className="Width">
        {back && (
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                fill="currentColor"
                d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z"
              />
            </svg>
          </Link>
        )}
        <h1>
          <Link to="/">Coiner</Link>
        </h1>
      </div>
    </header>
  );
};
