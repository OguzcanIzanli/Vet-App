import "./Navbar.styles.css";
import { Link } from "react-router-dom";
import IconPaw from "../../assets/icons/IconPaw";
import IconMenu from "../../assets/icons/IconMenu";
import IconClose from "../../assets/icons/IconClose";
import { useState } from "react";

const pagesRouter = [
  { route: "customer", title: "Müşteri" },
  { route: "animal", title: "Hayvan" },
  { route: "doctor", title: "Doktor" },
];

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div id="navbar">
      <div className="navbarLeftSide">
        <IconPaw className="iconPaw" />
        <p>Vet</p>
      </div>

      <div className="navbarRightSide">
        <div className={`dropdownBtns ${dropdown ? "dropdownBtnsOpen" : ""}`}>
          {pagesRouter.map((page) => (
            <Link className="dropdownBtn" key={page.route} to={page.route}>
              {page.title}
            </Link>
          ))}
        </div>

        <div className="dropdown" onClick={() => setDropdown(!dropdown)}>
          {dropdown ? <IconClose /> : <IconMenu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
