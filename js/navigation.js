window.addEventListener('DOMContentLoaded', navegator, true);
window.addEventListener('hashchange', navegator, true);

header_form_btn.addEventListener('click', () => {
    location.hash = '#search=' + header_input.value;
});

trending_btn.addEventListener('click', () => {
    location.hash = '#trends=';
});

header_arrow.addEventListener('click', () => {
    location.hash = '#home';
})

function navegator(){
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
}

function movieDetailsPage(){
    header_general_section.classList.add('header-container--long')
    // header_general_section.style.background = '';
    header_arrow.classList.remove('inactive');
    header_arrow.classList.add('header-arrow--white');
    header_title.classList.add('inactive');
    header_category_title.classList.add('inactive');
    header_form.classList.add('inactive');

    trending_general_section.classList.add('inactive');
    categories_general_section.classList.add('inactive');
    generic_list_general_section.classList.add('inactive');
    movie_details_general_section.classList.remove('inactive');
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
}
