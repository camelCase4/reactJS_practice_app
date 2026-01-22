import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./MainLayout.css";

function Layout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 all-page">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
