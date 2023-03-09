// Global Scope Variables
var weatherApiKey = '913e4ecb2e82a023f127e2c8a73988fa';
var citySearch = '';
var currentDate = dayjs().format('MM/DD/YYYY');
var upcomingForcastEl = $('.upcomingForecast');
var todaysForecast = $('.todaysForecast');
var pastSearches = $('.pastSearches');
var searchHistory = [];

// Function to push searched city to the local storage and retreive weather forecast
$('.searchBtn').on('click', function(event) {
    event.preventDefault();
    city = $(this).siblings('.cityInput').val().trim();
    if(city == '') {
        return;
    };
    searchHistory.push(city);
    localStorage.setItem('city', JSON.stringify(searchHistory));
    upcomingForcastEl.empty();
    getSearchHistory();
    getForecast();
});

// Function that renders and stores search history
function renderSearchHistory() {
    pastSearches.empty();
    for (var i = 0; i <searchHistory.length; i++) {
        var rowEl = $('<div>');
        var btnEl = $('<button>').text('${searchHistory[i]}');
        rowEl.addClass('row');
        btnEl.addClass('btn btn-outline-primary submitBtn mt-1');
        pastSearches.prepend(rowEl);
        rowEl.append(btnEl);
    }
    $('.pastBtn').click(function(event) {
        event.preventDefault;
        city = $(this).text();
        todaysForecast.empty;
        getForecast();
        upcomingForcastEl.empty();
    });
};

// Function to render weather API

// Function runs on page load, it uses City as the cityName for an example so we can populate the page before the user even searches anything.
function initLoad() {
    var previousSearchStorage = JSON.parse(localStorage.getItem('city'));
	if (previousSearchStorage !== null) {
	searchHistory = previousSearchStorage
    }
    renderSearchHistory();
    renderForecast();
};

