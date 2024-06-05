import "./Navbar.styles.css";
import { Link } from "react-router-dom";
import IconPaw from "../../assets/icons/IconPaw";
import IconPlus from "../../assets/icons/IconPlus";
import IconClose from "../../assets/icons/IconClose";
import { useState } from "react";

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

  return (
    <div id="navbar">
      <div className="navbarLeftSide">
        <Link className="iconHome" to={"/"}>
          <IconPaw className="iconPaw" />
          <p>Vet</p>
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
