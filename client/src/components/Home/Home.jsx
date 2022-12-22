import Styles from './Home.module.css'
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getDogsByName } from '../../redux/actions';

const Home = () => {

    const dogs = useSelector(state => state.dogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
    }, []);

    return (
        <div>
            <SearchBar/>
            {dogs.length && dogs.map((el, i) => {
                return <Card 
                    key={i}
                    name={el.name} 
                    image={el.image && el.image.url}
                    temperament={el.temperament} 
                    weight={el.weight.metric}
                />
            })}
        </div>
    );
}

export default Home;