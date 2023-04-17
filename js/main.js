const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
})

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    trending_section.innerHTML = "";
    movies.forEach(movie => {
        const movie_container = document.createElement('div');
        movie_container.classList.add('movie-container');

        const movie_img = document.createElement('img');
        movie_img.classList.add('alt');
        movie_img.setAttribute('alt', movie.title);
        movie_img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movie_container.appendChild(movie_img);
        trending_section.appendChild(movie_container)
    });
};

async function getCategoryPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories_section.innerHTML = "";
    categories.forEach(category => {
        const category_container = document.createElement('div');
        category_container.classList.add('category-container');

        const category_title = document.createElement('h3');
        category_title.classList.add('category-title');
        category_title.setAttribute('id', 'id' + category.id);
        category_title.addEventListener('click', () => {
            location.hash = '#category=' + category.id + '-' + category.name;
        })

        const category_title_text = document.createTextNode(category.name);

        category_title.appendChild(category_title_text);
        category_container.appendChild(category_title);
        categories_section.appendChild(category_container);
    });
};

async function getMoviesByCategory(category_id){
    const { data } = await api('discover/movie', {
        params: {
            'with_genres': category_id,
        },
    });
    const categories = data.results;

    generic_list_general_section.innerHTML = '';
    categories.forEach(movie => {
        const movie_container = document.createElement('div');
        movie_container.classList.add('movie-container');

        const movie_img = document.createElement('img');
        movie_img.classList.add('alt');
        movie_img.setAttribute('alt', movie.title);
        movie_img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movie_container.appendChild(movie_img);
        generic_list_general_section.appendChild(movie_container);
    })
}