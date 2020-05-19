//Search
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
});

//Carousel
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {'fullWidth':true,'numVisible':5, 'padding': 10});
});