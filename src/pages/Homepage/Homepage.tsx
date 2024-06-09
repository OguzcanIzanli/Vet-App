import { Link } from "react-router-dom";
import "./Homepage.styles.css";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Veteriner Yönetim Sistemine Hoşgeldiniz..</h2>
        <Link to="/appointment" className="loginButton">
          Giriş Yapmak İçin Tıklayın
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
