const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
})

//Utils

function insertMovies(movies, container){
    container.innerHTML = "";
    movies.forEach(movie => {
        const movie_container = document.createElement('div');
        movie_container.classList.add('movie-container');
        movie_container.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })

        const movie_img = document.createElement('img');
        movie_img.classList.add('alt');
        movie_img.setAttribute('alt', movie.title);
        movie_img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

        movie_container.appendChild(movie_img);
        container.appendChild(movie_container);
    });
}

function insertCategories(container, categories){
    container.innerHTML = "";
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
        container.appendChild(category_container);
    });
}

// Llamados a la API

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    insertMovies(movies, generic_list_general_section);
};

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    insertMovies(movies, trending_section);
};

async function getCategoryPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    insertCategories(categories_section, categories);
};

async function getMoviesByCategory(category_id){
    const { data } = await api('discover/movie', {
        params: {
            'with_genres': category_id,
        },
    });
    const categories = data.results;
    insertMovies(categories, generic_list_general_section);
};

async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;

    insertMovies(movies, generic_list_general_section);
};

async function getMovieById(movie_id){
    const { data: movie } = await api('movie/' + movie_id);

    movie_details_title.innerHTML = movie.title;
    movie_detail_description.innerHTML = movie.overview;
    movie_details_score.innerHTML = movie.vote_average;

    const movie_img = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    header_general_section.style.background = `url(${movie_img})`;

    insertCategories(article_categories_list, movie.genres);
};