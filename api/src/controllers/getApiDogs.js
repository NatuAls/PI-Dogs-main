module.exports = getApiDogs = async (name = null) => {
    if(name){
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            .then(response => response.json())
            .then(data => {
                if(!data.length) return data;
                return  data.map(e => {
                    return {
                        name: e.name,
                        weight: e.weight,
                        temperament: e.temperament,
                        image: e.image
                    }
                });
            });
    }
    return fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => data.map(e => {
            return {
                name: e.name,
                weight: e.weight,
                temperament: e.temperament,
                image: e.image
            }
        }));
}