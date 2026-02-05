import { useLocation, useNavigate } from "react-router-dom";
import layoutIcon from "./layout_imgs/layout_icon.png";
import homeIcon from "./layout_imgs/layout_icon_2.png"; // your home icon

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMenuPage = location.pathname === "/";

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate("/"); // go to menu/home page
  };

  return (
    <header
      className=" text-white px-4 py-3 d-flex align-items-center justify-content-between shadow"
      style={{
        position: "relative",
        background: "linear-gradient(90deg, #212529 95%, #6c757d 100%)", // dark → light
      }}
    >
      {/* Left: Back Button + App Name + Logo */}
      <div className="d-flex align-items-center">
        {!isMenuPage && (
          <button
            className="btn btn-light btn-sm me-3 d-flex align-items-center gap-2"
            onClick={handleBackBtn}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <h6
          className="m-0 fw-bold d-flex align-items-center"
          style={{ letterSpacing: "1px", gap: "8px" }}
        >
          <small>Vite + React + TS + Bootstrap + ASP.NET Core + SSMS</small>
          <img
            className="mb-1"
            src={layoutIcon}
            alt="App Logo"
            style={{ height: "24px", width: "24px", objectFit: "contain" }}
          />
        </h6>
      </div>

      {/* Right: Home Icon */}
      <div>
        <img
          src={homeIcon}
          alt="Home"
          onClick={handleHomeClick}
          style={{ height: "28px", width: "28px", cursor: "pointer" }}
        />
      </div>
    </header>
  );
}

export default Header;
