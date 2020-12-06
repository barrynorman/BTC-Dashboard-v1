import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.svg";

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-dark bg-transparent">
        <div className="navbar-brand">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            alt=""
          />
          BTCDASH
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/Login" className="nav-item nav-link">
              Login <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink to="/" className="nav-item nav-link">
              Home <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink to="/Dashboard" className="nav-item nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/TradingView" className="nav-item nav-link">
              TradingView
            </NavLink>
            <NavLink to="/MarketCap" className="nav-item nav-link">
              MarketCap
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
