const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

module.exports = getDbDogs = async (name = null) => {
    if(name){
        const result = await Dog.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`}
            },
            attributes: ['name', 'weight', 'createInDb'],
            include: [{
                model: Temperament,
                through: {
                    attributes: []
                }            
            }]
        });
        console.log('result: ', result);
        return result
    }
    return await Dog.findAll({
        attributes: ['name', 'weight', 'createInDb'],
        include: [{
            model: Temperament,
            through: {
                attributes: []
            }            
        }]
    });
}