var pokemons
var poke_imagens = {}

//Search
document.addEventListener('DOMContentLoaded', function () {
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=001&limit=251')
        .then(resultado => {
            pokemons = resultado.data.results
            var primeiroPoke = pokemons[Math.floor(Math.random()*pokemons.length)];
            pokemons.forEach(poke => {
                var split = poke.url.split('/')
                var numero = split[split.length - 2]
                var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + numero + '.png'
                poke_imagens[poke.name] = url
            })
            buscarPokemon(primeiroPoke.name)
        })
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, { data: poke_imagens });

});

function onPress(){
    var input = document.querySelector('#autocomplete-input');
    buscarPokemon(input.value)
}

function buscarPokemon(nome) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resultado => {
            document.querySelector('#nomePokemon').innerHTML = resultado.data.name.toUpperCase()
            var lista = document.querySelector('#listaHabilidades');
            var habilidades = resultado.data.abilities.map(habi => `<p>${habi.ability.name}</p>`)
            lista.innerHTML = habilidades.join('')
            var imagem = poke_imagens[resultado.data.name]
            document.querySelector('#pokeImage').src = imagem
            var tipos = resultado.data.types.map(tipo => tipo.type.name)
            document.querySelector('#listaTipos').innerHTML = tipos.join(', ')
            axios.get(`https://pokeapi.co/api/v2/type/${tipos[0]}`)
                .then(resultado => {
                    var exibe_carousel = resultado.data.pokemon.slice(0, 10)
                    links = exibe_carousel.map(elm => {
                        textoLink = `
                        <a class="carousel-item" href="#"  onclick="buscarPokemon('${elm.pokemon.name}')"><img
                            src="${poke_imagens[elm.pokemon.name]}"></a>`
                        return textoLink
                    })
                    document.querySelector('#carouselPoke').innerHTML = links.join('')
                    startCarousel();
                })
        })
}

//Carousel
function startCarousel () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, { 'fullWidth': true, 'padding': 10 });
};

