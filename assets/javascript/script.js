$(function () {
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
})
//default array of searches that appear when page loads.
var searchArray = ['Bears','Cats','Parrots','Dogs','Hypno-Toad','Sharks','Thylacine'];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
	//empties out the buttons area to prevent copies.
	$(areaToAddTo).empty();
	for (var i = 0; i < searchArray.length;i++) {
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type', searchArray[i]);
		a.text(searchArray[i]); //Makes it so text matches whats inside searchArray.
		$(areaToAddTo).append(a);

	}
}

$(document).on('click', '.searchButton', function () {
	$('#searches').empty();
	var type = $(this).data('type');


	//giphy api includes limit in URL for how many gifs will be pulled.
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=G6eWumrJdpgeug1LCeZBZApnNbdxerUP&limit=10";



	$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function (response) {

			for (var i = 0; i < response.data.length; i++) {
				//creates reference to the div that is being modified.
				var searchDiv = $('<div class="search-item">');
				//stores the rating of the gif that's being pulled.
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: ' + rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);

			}
		})
})
//registers clicks on each of the images and sets them to either animated or still states.
$(document).on('click', '.searchImage', function () {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})
//eq is looking for a first version of an input/.

$('#addSearch').on('click', function () {
	var newSearch = $('input').eq(0).val();
	searchArray.push(newSearch);
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
	return false;
});