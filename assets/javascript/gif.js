//API key 6e5bc0dc9889475588222f614775a952
$(document).ready(function() {
  var topics = ["Joker", "The Penguin", "Cat Woman", "Poison Ivy",  
    "Bane", "Two Face", "Riddler", "Mr Freeze", "Scarecrow", "Red Hood",
    "Hugo Strange", "Harley Quinn", "Ra's al Ghul"];
  var userInput;
  //Create buttons for all villains
  function addButtons() {
    $('#selections').empty();
    for (var i = 0; i < topics.length; i++) {
    	var villain = $('<button>');
    	villain.addClass('btn btn-primary villain');
    	villain.attr('villain-name', topics[i]);
    	villain.text(topics[i]);
    	$('#selections').append(villain);
    }
  }
  //Add new action villain button
  $('#createButton').on('click', function(event) {
    event.preventDefault();
    userInput = $('input').val().trim();
    topics.push(userInput);
    addButtons();
  });
  //Add gifs to html
  function gifTastic(){
    var villain = $(this).attr('villain-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + 
      villain + 
      '&limit=10&rating=pg&api_key=6e5bc0dc9889475588222f614775a952'
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        //$('#gifs').prepend("<div id='image'" + i + ">")
        $('#gifs').prepend("<div class='images'><img class='gif' src='" + 
          response.data[i].images.fixed_height_still.url + 
          "' data-still= '" + 
          response.data[i].images.fixed_height_still.url + 
          "' data-animate='" + 
          response.data[i].images.fixed_height.url + 
          "' data-state='still'><p>Rating: " + 
          response.data[i].rating + 
          "</p></div>");
        //$('#gifs').prepend("<label>Rating: " + response.data[i].rating + "</label>");
      }
    });
  }
  //Click event to add gifs
  $(document).on("click", ".villain", gifTastic);
  //Start and stop gifs
  $(document).on("click", ".gif", function() {
    var dataAnimate = $(this).attr('data-animate');
    var dataStill = $(this).attr('data-still');
    var dataState = $(this).attr('data-state');
    if (dataState === "still") {
      $(this).attr('src', dataAnimate);
      $(this).attr('data-state', 'animate')        
    }
    else if (dataState  === 'animate') {
      $(this).attr('src', dataStill);
      $(this).attr('data-state', 'still')  
    }
  });
  addButtons();
});
