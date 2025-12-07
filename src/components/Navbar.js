import React from "react";

function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-title">
        💰 BrightBalance
      </div>
      <nav className="navbar-links">
        <button
          className={currentPage === "dashboard" ? "nav-btn active" : "nav-btn"}
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={
            currentPage === "transactions" ? "nav-btn active" : "nav-btn"
          }
          onClick={() => onNavigate("transactions")}
        >
          Transactions
        </button>
        <button
          className={currentPage === "addEdit" ? "nav-btn active" : "nav-btn"}
          onClick={() => onNavigate("addEdit")}
        >
          Add Transaction
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
