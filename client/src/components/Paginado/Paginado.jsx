import React from "react";
import { useDispatch } from "react-redux";
import { getCurrentPage } from "../../redux/actions";

const Paginado = ({currentPage, dogsPerPage, allDogs}) => {
    const pageNumbers = [];
    const dispatch = useDispatch();

    for(let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++){
        pageNumbers.push(i + 1);
    }
    
    function paginado(number){
        dispatch(getCurrentPage(number))
    }

    return(
        <div>
            <button onClick={() => paginado(currentPage === 1 ? pageNumbers.length : currentPage - 1)}>Anterior</button>
            {pageNumbers && pageNumbers.map(number => {
                return <button 
                    key={number} 
                    onClick={() => paginado(number)}
                >
                {currentPage === number ? <b>{number}</b> : number}
                </button>
            })}
            <button onClick={() => paginado(currentPage === pageNumbers.length ? 1 : currentPage + 1)}>Siguiente</button>
        </div>
    )
}

export default Paginado;