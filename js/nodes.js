const $ = (id) => document.querySelector(id);

// header
const header_general_section = $('#header');
const header_title = $('.header-title')
const header_form = $('#search_form');
const header_form_btn = $('.search_form_btn');
const header_arrow = $('.header-arrow');
const header_category_title = $('.header-title--category_view');

// trends section
const trending_general_section = $('#trending_preview');
const trending_title = $('.trending_preview-title');
const trending_btn = $('.trending_preview-btn');
const trending_section = document.querySelector('#trending_preview .trending_preview-movieList');

// categories section
const categories_general_section = $('#categories_preview');
const categories_title = $('.categories_preview-title');
const categories_section = document.querySelector('#categories_preview .categories_preview-list');

// generic list
const generic_list_general_section = $('#generic_list');

//movie details
const movie_details_general_section = $('#movie_detail');
const movie_details_title = $('.movie_details-title');
const movie_details_score = $('.movie_detail-score');
const movie_detail_description = $('.movie_detail-description');

const article_categories_list = $('.categories-list');
const article_related_movies = $('.related_movies-container');
const container_related_movies = $('.related_movies-scroll_container')