import {Link} from "react-router-dom";
import logoImg from '../../assets/logo.png';

const Logo = () => (
   <div className="py-8 px-6 lg:px-0">
      <Link to="/">
         <img src={logoImg} alt="digivote logo" width="192px"/>
      </Link>
   </div>
);

export default Logo;