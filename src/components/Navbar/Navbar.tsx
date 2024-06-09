import "./Navbar.styles.css";
import { Link } from "react-router-dom";
import IconPaw from "../../assets/icons/IconPaw";
import IconPlus from "../../assets/icons/IconPlus";
import IconClose from "../../assets/icons/IconClose";
import { useState, useEffect } from "react";

const pagesRouterRight = [
  { route: "customer", title: "Müşteri" },
  { route: "animal", title: "Hayvan" },
  { route: "doctor", title: "Doktor" },
];

const pagesRouterLeft = [
  { route: "appointment", title: "Randevu" },
  { route: "report", title: "Rapor" },
  { route: "vaccine", title: "Aşı" },
];

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  // Close the dropdown menu when click the document except navbar
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.clientY > 60) {
        setDropdown(false);
      }
    });

    // Close the dropdown menu when scrolling
    document.addEventListener("scroll", () => {
      window.scrollY > 0;
      setDropdown(false);
    });
  }, []);

  return (
    <div id="navbar">
      <div className="navbarLeftSide">
        <Link className="iconHome" to={"/"}>
          <IconPaw className="iconPaw" />
          <p>VYS</p>
        </Link>
        <div className="navbarLeftSideBtns">
          {pagesRouterLeft.map((page) => (
            <Link className="leftSideBtn" key={page.route} to={page.route}>
              {page.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="navbarRightSide">
        <div className={`dropdownBtns ${dropdown ? "dropdownBtnsOpen" : ""}`}>
          {pagesRouterRight.map((page) => (
            <Link className="dropdownBtn" key={page.route} to={page.route}>
              {page.title}
            </Link>
          ))}
        </div>

        <div className="dropdown" onClick={() => setDropdown(!dropdown)}>
          {dropdown ? <IconClose /> : <IconPlus />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
