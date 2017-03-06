/*
* Trivia Game
* Sandra Rodriguez
* 2017 UCF Coding Bootcamp
*/

var userInput = "";   // variable to grab the input from user

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&limit=10&fmt=json&api_key=dc6zaTOxFJmzC";

var initialTopics = ["Dog and Cat",
                     "Grandma",
                     "Little Girl",
                     "Cat",
                     "Dog"];


$(document).ready(function(){

    // renderButtons will build a button for topic that is passed to the function
    function renderButtons(topic)
    {
        // this will format the user input correctly for the search url
        var sanitizedTopic = formatForSearch(topic);

        $("<button>")
            .addClass('list-group-item')
            .attr('type', 'button')
            .attr('data-topic', sanitizedTopic)
            .attr('status', 'still')

            .text(topic)
            //.on('click', function(){
            //    retrieveGiphy($(this).data('data-topic'));
            //})
            .prependTo("#buttons-view");
    }






// Calling the renderButtons function to display the intial buttons
    $.each(initialTopics, function(index, value){
        renderButtons(value);
    });


}) // END document.ready

