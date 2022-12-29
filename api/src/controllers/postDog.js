const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

module.exports = postDog = async (name, height, weight, life_span, temperaments) => {
    const newDog = await Dog.create({name, height, weight, life_span});
    const dbTemperaments = await Temperament.findAll({
        where: {
            name: {
                [Op.or]: temperaments
            }
        }
    });
    await newDog.addTemperament(dbTemperaments);
    const dbDog = await Dog.findByPk(newDog.id, {
        include: {
            model: Temperament,
            as: 'temperament',
            through: {
                attributes: []
            }
        }
    });
    let result = JSON.parse(JSON.stringify(dbDog));
    result = {
        ...result,
        temperament: result.temperament.map(el => el.name).join(', ')
    }
    return result;
} 