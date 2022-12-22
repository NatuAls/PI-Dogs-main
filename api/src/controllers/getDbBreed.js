const {Dog, Temperament} = require('../db');

module.exports = getDbBreed = async idBreed => {
    try {
        const dbBreed = await Dog.findByPk(idBreed, {
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