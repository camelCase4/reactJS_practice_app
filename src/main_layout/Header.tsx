import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMenuPage = location.pathname === "/";

  const handleBackBtn = () => {
    navigate(-1);
  };
  return (
    <>
      <header className="bg-dark text-light py-4 d-flex align-items-center position-relative">
        {!isMenuPage && (
          <button
            className="btn btn-secondary btn-sm ms-2"
            onClick={handleBackBtn}
          >
            <i className="fa-solid fa-left-long"></i>
          </button>
        )}

        <small className="position-absolute start-50 translate-middle-x">
          © 2026 Roger Jay Sering App. All rights reserved.
        </small>
      </header>
    </>
  );
}

export default Header;
