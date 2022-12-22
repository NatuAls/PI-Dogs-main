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
    await newDog.addTemperaments(dbTemperaments);
    const dbDog = await Dog.findByPk(newDog.id, {
        include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }
    });
    // console.log(JSON.parse(JSON.stringify(dbDog)));
    return JSON.parse(JSON.stringify(dbDog));
} 