import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByTemperaments, filterByExistingC, getCurrentPage, getDogs, loading} from "../../redux/actions";

const FilterByTemps = () => {

    const temperaments = useSelector(state => state.temperaments);
    const dispatch = useDispatch();

    async function handleChange(e){
        e.preventDefault();
        const fExisting = document.getElementById('fExisting').value;
        if(e.target.value !== ''){
            dispatch(loading());
            await dispatch(getDogs());
            if(fExisting === 'api') dispatch(filterByExistingC('api'));
            if(fExisting === 'db') dispatch(filterByExistingC('db'));
            dispatch(getCurrentPage(1));
            await dispatch(filterByTemperaments(e.target.value));
            dispatch(loading());
        }
    }

    return (
        <select onChange={handleChange} id='fTemps'>
            <option value=''>Filtrar por temperamento</option>
            <option value='todos'>Todos</option>
            {temperaments && temperaments.map(el => {
                return <option key={el.id} value={el.name}>{el.name}</option>
            })}
        </select>
    )
}

export default FilterByTemps