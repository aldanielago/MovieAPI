window.addEventListener('DOMContentLoaded', navegator, false);
window.addEventListener('hashchange', navegator, false);

function navegator(){
    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    location.hash
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
