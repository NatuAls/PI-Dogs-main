import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import BlackBlock from "../BlackBlock/BlackBlock";
import { getDogs, postDog, } from "../../redux/actions";
import image from '../../images/kisspng-computer-icons-check-mark-presentation-symbol-check-list-5ac41358197303.9196128115227994481043.png'
import './BreedForm.css'

export function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'El nombre es necesario';
    } else if(!/^[a-zA-Z ]+$/.test(input.name)){
        errors.name = 'El nombre no puede contener simbolos ni numeros';
    }
    if(input.height_min >= input.height_max){
        errors.height = 'El valor minimo debe ser menor que el maximo';
    }
    if(input.height_max <= input.height_min){
        errors.height = 'El valor maximo debe ser mayor que el minimo';
    }
    if(input.weight_min >= input.weight_max){
        errors.weight = 'El valor minimo debe ser menor que el maximo';
    }
    if(input.weight_max <= input.weight_min){
        errors.weight = 'El valor maximo debe ser menor que el minimo';
    }
    if(input.image !== '' && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)){
        errors.image = 'Imagen deberia ser un URL'
    }
    return errors;
}

function BreedForm() {

    const allTemperaments = useSelector(state => state.temperaments);
    const dispatch = useDispatch();
    const history = useHistory();
    const [result, setResult] = useState(false);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        image: '',
        height_min: 10,
        height_max: 20,
        weight_min: 30,
        weight_max: 40,
        life_span: 0,
        temperaments: []
    });

    function handleOnchange(e){
        if(e.target.name === 'temps'){
            let array = [...input.temperaments];
            if(e.target.checked) array.push(e.target.value);
            else array = array.filter(temp => temp !== e.target.value);
            setInput({
                ...input,
                temperaments: array    
            });
        } else {
            const obj = {
                ...input,
                [e.target.name]: e.target.value
            }
            setInput(obj);
            if(e.target.name !== 'life_span'){
                setErrors(validate(obj));
            }
        }
    }

    async function handleOnSubmit(e){
        e.preventDefault();
        let life_span = null;
        if(input.life_span > 0) life_span = `${input.life_span} años`;
        const result = {
            name: input.name,
            image: input.image,
            height: `${input.height_min} - ${input.height_max}`,
            weight: `${input.weight_min} - ${input.weight_max}`,
            life_span: life_span,
            temperaments: input.temperaments
        }
        await dispatch(getDogs());
        await dispatch(postDog(result));
        setResult(true);
        //const newDog = allDogs[0];
        await setTimeout(() => history.push(`/home`), 1000);
    }

    return(
        <div className="background">
            <NavBar/>
            <div className="divtitulo">
                <h1 className="titulodetail">Crea tu propia raza de perro en Henry Dogs</h1>
            </div>
            {result && <div className="resultdiv">
                <h1>Raza creada exitosamente</h1>
                <img src={image} alt='tilde verde'/>
            </div>}
            <div className="divform">
                <form onChange={handleOnchange} onSubmit={handleOnSubmit} className='form'>
                    <legend>Nombre <span className="asterisk">*</span></legend>
                    <div className="divinput">
                        <input 
                        type="text" 
                        name='name'
                        value={input.name}
                        onChange={handleOnchange}
                        id='inputname'
                        className={errors.name ? 'danger' : null}
                        />
                    </div>
                    {errors.name && <p className="danger">{errors.name}</p>}
                    
                    <legend>Altura <span className="asterisk">*</span></legend>
                    <div className="divinput">
                        <label className="labelleft" htmlFor="height_min">Minima:</label>
                        <input
                        type='number'
                        name="height_min"
                        value={input.height_min}
                        onChange={handleOnchange}
                        className={`input ${errors.height ? 'danger' : null}`}
                        />
                        <span>cm</span>
                        <label htmlFor="height_max">Maxima:</label>
                        <input
                        type='number'
                        name="height_max"
                        value={input.height_max}
                        onChange={handleOnchange}
                        className={`input ${errors.height ? 'danger' : null}`}
                        />
                        <span>cm</span>
                    </div>
                    {errors.height && <p className="danger">{errors.height}</p>}

                    <legend>Peso <span className="asterisk">*</span></legend>
                    <div className="divinput">
                        <label className="labelleft" htmlFor="weight_min">Minimo:</label>
                        <input
                        type='number'
                        name="weight_min"
                        value={input.weight_min}
                        onChange={handleOnchange}
                        className={`input ${errors.weight ? 'danger' : null}`}
                        />
                        <span>Kg</span>
                        <label htmlFor="height_max">Maximo:</label>
                        <input
                        type='number'
                        name="weight_max"
                        value={input.weight_max}
                        onChange={handleOnchange}
                        className={`input ${errors.weight ? 'danger' : null}`}
                        />
                        <span>Kg</span>
                    </div>
                    {errors.weight && <p className="danger">{errors.weight}</p>}

                    <legend>Esperanza de vida</legend>
                    <div className="divinput">
                        <input
                        type='number'
                        name="life_span"
                        value={input.life_span}
                        onChange={handleOnchange}
                        className='input'
                        />
                        <span className="spanlife">Años</span>
                    </div>

                    <legend>Imagen</legend>
                    <div className="divinput">
                        <label className="labelleft" htmlFor="image">URL:</label>
                        <input 
                        type="text" 
                        name='image'
                        value={input.image}
                        onChange={handleOnchange}
                        id='inputimage'
                        className={errors.image ? 'danger' : null}
                        />
                    </div>
                    {errors.image && <p className="danger">{errors.image}</p>}

                    <legend>Selecciona sus temperamentos:</legend>
                    <div className="tempsdiv">
                        {allTemperaments.length > 0 && allTemperaments.map(({name, id}, index) => {
                            return (
                                <div key={index}>
                                    <input type='checkbox' key={id} value={name} name='temps'/>
                                    <label>{name} </label>
                                </div>
                            )
                        })}
                    </div>

                    <p>Los campos con (<b className="asterisk">*</b>) son obligatorios.</p>

                    <input 
                    type='submit' 
                    value='Crear Raza' 
                    disabled={Object.keys(errors).length > 0 || !input.name}
                    />
                </form>
            </div>
            <BlackBlock/>
        </div>
    )
}

export default BreedForm;