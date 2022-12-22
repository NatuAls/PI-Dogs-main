const {Router} = require('express');
const getApiDogs = require('../controllers/getApiDogs');
const getDbDogs = require('../controllers/getDbDogs');
const postDog = require('../controllers/postDog');
const getApiBreed = require('../controllers/getApiBreed');
const getDbBreed = require('../controllers/getDbBreed');

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    try {
        if(name){
            const apiDogByName = await getApiDogs(name);
            const dbDogByName = await getDbDogs(name);
            const result = dbDogByName.concat(apiDogByName);
            if(result.length) return res.send(result);
            return res.status(400).send(`No existe ninguna raza de perro con el nombre ${name}`);
        }
        const apiDogs = await getApiDogs();
        const dbDogs = await getDbDogs();
        let result;
        if(dbDogs.length) result = dbDogs.concat(apiDogs);
        else result = apiDogs;
        console.log(result[0]);
        res.send(result);        
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', async (req,res) => {
    const {name, height, weight, life_span = null, temperaments = []} = req.body;
    try {
        if(name, height, weight){
            const newDog = await postDog(name, height, weight, life_span, temperaments);
            return res.send(newDog);
        }
        res.status(400).send('ERROR No ingreso los parametros necesarios');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:idBreed', async (req, res) => {
    const {idBreed} = req.params;
    try {
        const apiBreed = await getApiBreed(idBreed);
        if(apiBreed) return res.send(apiBreed);
        const dbBreed = await getDbBreed(idBreed);
        if(dbBreed) return res.send(dbBreed);
        return res.status(400).send(`No se encontro ninguna raza de perro con el id ${idBreed}`)
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;