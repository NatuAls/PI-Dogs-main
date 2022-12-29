function Card({name, image, temperament, weight, createInDb}) {

    return(
        <div>
            {image && <img src={image} alt={name}/>}
            <h1>{name}</h1>
            <h3>{temperament}</h3>
            {createInDb && <h3>{weight}</h3>}
            {!createInDb && <h3>{weight.metric}</h3>}
        </div>
    )
}

export default Card;