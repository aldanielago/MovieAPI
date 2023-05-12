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

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting == true){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url)
        }
    })
});

function favoriteMovieList(){
    const item = JSON.parse(localStorage.getItem('liked-movies'));
    let movies;

    if(item){
        movies = item;
    }
    else {
        movies = {};
    }

    return movies;
}

function favoriteMovie(movie) {
    const movie_list = favoriteMovieList();
    console.log(movie_list);
    if(movie_list[movie.id]){
        delete movie_list[movie.id];
    }
    else {
        movie_list[movie.id] = movie;
    }

    localStorage.setItem('liked-movies', JSON.stringify(movie_list));
    insertFavoriteMovies();
}

function insertFavoriteMovies(){
    const movie_list = favoriteMovieList();
    const movies = Object.values(movie_list);
    insertMovies(movies, favorite_section, {lazy_load: true, clean: true});
}

function insertMovies(movies, container, {lazy_load = false, clean = true}){
    const movie_list = favoriteMovieList();
    if(clean){
        container.innerHTML = "";
    }

    movies.forEach(movie => {
        const movie_container = document.createElement('div');
        movie_container.classList.add('movie-container');

        const movie_img = document.createElement('img');
        movie_img.classList.add('movie-img');
        movie_img.classList.add('alt');
        movie_img.setAttribute('alt', movie.title);
        movie_img.setAttribute(
            lazy_load ? 'data-img': 'src' ,
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        );
        movie_img.addEventListener('error', () => {
            movie_img.setAttribute(
                'src', 'https://img.freepik.com/vector-gratis/plantilla-web-error-404-gato-malo_23-2147763345.jpg?size=300&ext=jpg'
            )
        });
        movie_img.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        lazyLoader.observe(movie_img);

        const btn_liked = document.createElement('button');
        btn_liked.classList.add('movie-btn');
        btn_liked.addEventListener('click', () => {
            btn_liked.classList.toggle('movie-btn--liked');
            favoriteMovie(movie);
        });

        if(movie_list[movie.id]){
            btn_liked.classList.add('movie-btn--liked');
        }

        movie_container.appendChild(movie_img);
        movie_container.appendChild(btn_liked);
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
    const { data } = await api('trending/movie/day', {
        params: {
            page,
        }
    });
    const movies = data.results;
    max_page = data.total_pages;

    insertMovies(movies, generic_list_general_section, {lazy_load: true, clean: true});
};

async function getMoreTrendingMovies(){
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    const scroll_is_bottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const page_is_max = page == max_page;

    if (scroll_is_bottom && !page_is_max) {
        page ++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            },
        });
        const movies = data.results;

        insertMovies(movies, generic_list_general_section, {lazy_load: true, clean: false});
    }
};

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    insertMovies(movies, trending_section, {lazy_load: true});
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
    insertMovies(categories, generic_list_general_section, {lazy_load: true});
};

function getMoreMoviesByCategory(category_id){
    return async function (){
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scroll_is_bottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
        const page_is_max = page == max_page;

        if (scroll_is_bottom && !page_is_max) {
            page ++;
            const { data } = await api('discover/movie', {
                params: {
                    'with_genres': category_id,
                    page
                },
            });
            const movies = data.results;

            insertMovies(movies, generic_list_general_section, {lazy_load: true, clean: false});
        }
    }
};

async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;
    max_page = data.total_pages;

    insertMovies(movies, generic_list_general_section, {lazy_load: true});
};

function getMoreMoviesBySearch(query){
    return async function (){
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scroll_is_bottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
        const page_is_max = page == max_page;

        if (scroll_is_bottom && !page_is_max) {
            page ++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                }
            });
            const movies = data.results;

            insertMovies(movies, generic_list_general_section, {lazy_load: true, clean: false});
        }
    }
};

async function getMovieById(movie_id){
    const { data: movie } = await api('movie/' + movie_id);

    movie_details_title.innerHTML = movie.title;
    movie_detail_description.innerHTML = movie.overview;
    movie_details_score.innerHTML = movie.vote_average;

    const movie_img = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    header_general_section.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%,
            rgba(0, 0, 0, 0) 29.17%
            ),
        url(${movie_img})
    `;

    insertCategories(article_categories_list, movie.genres);
    getRelatedMovies(movie_id);
};

async function getRelatedMovies(movie_id){
    const { data } = await api(`movie/${movie_id}/recommendations`);
    const related = await data.results;

    insertMovies(related, container_related_movies, {lazy_load: true, clean: true});
};