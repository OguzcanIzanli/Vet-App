import { Link } from "react-router-dom";
import "./Homepage.styles.css";
import IconPaw from "../../assets/icons/IconPaw";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Veteriner Yönetim Sistemine Hoşgeldiniz..</h2>
        <Link to="/appointment" className="loginButton">
          Giriş Yapmak İçin Tıklayın <IconPaw />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
