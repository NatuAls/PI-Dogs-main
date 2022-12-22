const axios = require('axios');

module.exports = getApiTemps = async () => {
    const apiTemperaments = await axios.get('https://api.thedogapi.com/v1/breeds')
        .then(response => response.data)
        .then(data => data.map(el => el.temperament));

    let temperaments = [];

    apiTemperaments.forEach(el => {
        if(el){
            let splitedApiTemps = el.split(', ');
            splitedApiTemps.forEach(x => {
                if(!temperaments.includes(x)) temperaments.push(x);
            })
        }
    });

    temperaments = temperaments.map(el => {return {name: el}});

    return temperaments;
}