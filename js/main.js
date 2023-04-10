URL_API = 'http://api.themoviedb.org/3/trending/movie/day'

async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {
        const trending_section = document.querySelector('#trending_preview .trending_preview-movieList');

        const movie_container = document.createElement('div');
        movie_container.classList.add('movie-container');

        const movie_img = document.createElement('img');
        movie_img.classList.add('alt');
        movie_img.setAttribute('alt', movie.title);
        movie_img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)
        movie_container.appendChild(movie_img);
        trending_section.appendChild(movie_container)
    });
}

getTrendingMoviesPreview()