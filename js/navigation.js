window.addEventListener('DOMContentLoaded', navegator, true);
window.addEventListener('hashchange', navegator, true);

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
}

function homePage(){
    getTrendingMoviesPreview();
    getCategoryPreview();
}

function trendsPage(){

}

function searchPage(){

}

function movieDetailsPage(){

}

function categoriesPage(){

}
