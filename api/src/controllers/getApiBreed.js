module.exports = getIdBreed = async idBreed => {
    try {
        const apiBreed = await fetch('https://api.thedogapi.com/v1/breeds')
            .then(response => response.json())
            .then(data => data.filter(el => el.id === parseInt(idBreed)));

        if(apiBreed.length){
            const result = {
                name: apiBreed[0].name,
                height: apiBreed[0].height,
                weight: apiBreed[0].weight,
                life_span: apiBreed[0].life_span,
                Temperament: apiBreed[0].Temperament,
                image: apiBreed[0].image
            }
            return result;
        }
        return false
    } catch (error) {
        throw TypeError(error.message);
    }
}