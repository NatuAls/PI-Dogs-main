import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getDog } from '../../redux/actions';

function Card({name, image, temperament, weight}) {

    return(
        <div>
            {image && <img src={image} alt={name}/>}
            <h1>{name}</h1>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>
        </div>
    )
}

export default Card;