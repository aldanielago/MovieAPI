let page = 1;
let max_page;
let infinitive_scroll;

window.addEventListener('DOMContentLoaded', navegator, false);
window.addEventListener('hashchange', navegator, false);
window.addEventListener('scroll', infinitive_scroll, false);

header_form_btn.addEventListener('click', () => {
    location.hash = '#search=' + header_input.value;
});

trending_btn.addEventListener('click', () => {
    location.hash = '#trends=';
});

header_arrow.addEventListener('click', () => {
    if(document.referrer.includes(window.location.hostname)){
        window.history.back();
    }
    else {
        location.hash = '#home';
    }
})

function navegator(){
    if(infinitive_scroll){
        window.removeEventListener('scroll', infinitive_scroll, { passive: false} );
        infinitive_scroll = undefined;
    }

    location.hash.startsWith('#trends') ?
    trendsPage() :
    location.hash.startsWith('#search=') ?
    searchPage() :
    location.hash.startsWith('#movie=') ?
    movieDetailsPage() :
    location.hash.startsWith('#category=') ?
    categoriesPage() :
    homePage()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(infinitive_scroll){
        window.addEventListener('scroll', infinitive_scroll, { passive: false });
    }
}

function homePage(){
    header_general_section.classList.remove('header-container--long')
    header_general_section.style.background = '';
    header_arrow.classList.add('inactive');
    header_arrow.classList.remove('header-arrow--white');
    header_title.classList.remove('inactive');
    header_category_title.classList.add('inactive');
    header_form.classList.remove('inactive');

    trending_general_section.classList.remove('inactive');
    categories_general_section.classList.remove('inactive');
    generic_list_general_section.classList.add('inactive');
    movie_details_general_section.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoryPreview();
    insertFavoriteMovies();
}

function trendsPage(){
    header_general_section.classList.remove('header-container--long')
    header_general_section.style.background = '';
    header_arrow.classList.remove('inactive');
    header_arrow.classList.remove('header-arrow--white');
    header_title.classList.add('inactive');
    header_category_title.classList.remove('inactive');
    header_form.classList.add('inactive');

    trending_general_section.classList.add('inactive');
    categories_general_section.classList.add('inactive');
    generic_list_general_section.classList.remove('inactive');
    movie_details_general_section.classList.add('inactive');

    header_category_title.innerHTML = 'Trends';

    getTrendingMovies();
    infinitive_scroll = getMoreTrendingMovies;
}

function searchPage(){
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);

    header_general_section.classList.remove('header-container--long')
    header_general_section.style.background = '';
    header_arrow.classList.remove('inactive');
    header_arrow.classList.remove('header-arrow--white');
    header_title.classList.add('inactive');
    header_category_title.classList.add('inactive');
    header_form.classList.remove('inactive');

    trending_general_section.classList.add('inactive');
    categories_general_section.classList.add('inactive');
    generic_list_general_section.classList.remove('inactive');
    movie_details_general_section.classList.add('inactive');

    infinitive_scroll = getMoreMoviesBySearch(query)
}

function movieDetailsPage(){
    const [_, movie_id] = location.hash.split('=');

    header_general_section.classList.add('header-container--long');
    header_arrow.classList.remove('inactive');
    header_arrow.classList.add('header-arrow--white');
    header_title.classList.add('inactive');
    header_category_title.classList.add('inactive');
    header_form.classList.add('inactive');

    trending_general_section.classList.add('inactive');
    categories_general_section.classList.add('inactive');
    generic_list_general_section.classList.add('inactive');
    movie_details_general_section.classList.remove('inactive');

    getMovieById(movie_id);
}

function categoriesPage(){
    window.scroll(0,0);
    const [_, category_data] = location.hash.split('=');
    const [category_id, category_name] = category_data.split('-');

    header_general_section.classList.remove('header-container--long')
    header_general_section.style.background = '';
    header_arrow.classList.remove('inactive');
    header_arrow.classList.remove('header-arrow--white');
    header_title.classList.add('inactive');
    header_category_title.classList.remove('inactive');
    header_category_title.innerHTML = category_name;
    header_form.classList.add('inactive');

    trending_general_section.classList.add('inactive');
    categories_general_section.classList.add('inactive');
    generic_list_general_section.classList.remove('inactive');
    movie_details_general_section.classList.add('inactive');

    getMoviesByCategory(category_id);
    infinitive_scroll = getMoreMoviesByCategory(category_id);
}
