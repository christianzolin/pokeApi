var pokemons
var poke_imagens = {}

//Search
document.addEventListener('DOMContentLoaded', function () {
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=001&limit=251')
        .then(resultado => {
            pokemons = resultado.data.results
            pokemons.forEach(poke => {
                var split = poke.url.split('/')
                var numero = split[split.length - 2]
                var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numero + '.png'
                poke_imagens[poke.name] = url
            })
        })
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, { data: poke_imagens });

});

function buscarPokemon() {
    var input = document.querySelector('#autocomplete-input');
    axios.get(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
        .then(resultado =>{
            document.querySelector('#nomePokemon').innerHTML = resultado.data.name.toUpperCase()
            var lista =  document.querySelector('#listaHabilidades');
            var habilidades =  resultado.data.abilities.map(habi => `<p>${habi.ability.name}</p>`)
            lista.innerHTML = habilidades.join('')
            var imagem = poke_imagens[resultado.data.name]
            document.querySelector('#pokeImage').src = imagem
        })
}

//Carousel
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, { 'fullWidth': true, 'numVisible': 5, 'padding': 10 });
});

