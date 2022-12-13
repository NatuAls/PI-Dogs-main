const {Dog, Temperament} = require('../db');

module.exports = getIdBreed = async idRaza => {
    try {
        const apiBreed = await fetch('https://api.thedogapi.com/v1/breeds')
            .then(response => response.json())
            .then(data => data.filter(el => el.id === parseInt(idRaza)));

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

        const dbBreed = await Dog.findByPk(idRaza, {
            attributes: {exclude: ['id']},
            include: {
                model: Temperament,
                through: {
                    attributes: []
                }
            }
        });

        if(dbBreed) return dbBreed;
        return false;
    } catch (error) {
        return false;
    }
}