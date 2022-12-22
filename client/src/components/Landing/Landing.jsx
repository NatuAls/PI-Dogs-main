import Styles from './Landing.module.css';
import image from '../../images/dog.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className={Styles.image}>
      <div className={Styles.App}>
        <img src={image} alt='Dogs Logo'/>
        <Link to={'/home'} className={Styles.text}>Henry Dogs</Link>
      </div>
    </div>
  );
}

export default Landing;