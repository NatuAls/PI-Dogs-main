import React, { useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import Loader from '../Loader/Loader';
import FilterByTemps from '../FilterByTemps/FilterByTemps';
import FilterByExisting from '../FilterByExisting/FilterByExisting';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, loading } from '../../redux/actions';

const Home = () => {

    const allDogs = useSelector(state => state.dogs);
    const currentPage = useSelector(state => state.currentPage);
    const loader = useSelector(state => state.loader);
    const dispatch = useDispatch();

    const dogsPerPage = 8;
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    useEffect(() => {
        async function fetchData(){
            dispatch(loading());
            await dispatch(getDogs());
            dispatch(getTemperaments());
            dispatch(loading());
        }
        fetchData();
    }, [dispatch]);

    return (
        <div>
            <SearchBar/>
            <div>
                <FilterByTemps/>
                <FilterByExisting/>
            </div>
            {loader === false && currentDogs.length > 0 && <Paginado 
                currentPage={currentPage} 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
            />}
            <div>
                {loader === true && <Loader/>}
                {currentDogs.length === 0 && loader === false && <h2>No se encontraron perros</h2>}
                {loader === false && currentDogs.map(el => {
                    return <Card 
                        key={el.id}
                        name={el.name} 
                        image={el.image && el.image.url}
                        temperament={el.temperament} 
                        weight={el.weight}
                        createInDb={el.createInDb}
                    />
                })}
            </div>
        </div>
    );        
}

export default Home;