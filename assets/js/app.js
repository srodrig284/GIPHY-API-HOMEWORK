/*
* Trivia Game
* Sandra Rodriguez
* 2017 UCF Coding Bootcamp
*/


var initialTopics = ["Dog and Cat",
                     "Grandma",
                     "Little Girl",
                     "Cat",
                     "Dog",
    "Roomba Cat"];


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
            .text(topic)
            .on('click', function(){
                event.preventDefault();
                retrieveGiphy($(this).attr('data-topic'));
            })
            .prependTo("#buttons-view");
    };

    // retrieveGiphy will parse the data received and display the giphy
    function retrieveGiphy(topic)
    {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "+funny+video&limit=10&api_key=dc6zaTOxFJmzC";

        searchTopic = topic;
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {
                // clear giphy area
                $('#giphy-view').empty();

                $.each(response.data, function(index, value){
                    var charPic = $('<img>')
                        .addClass('topic-image')
                        .attr('src', value.images.original_still.url)
                        .data('still-url', value.images.original_still.url)
                        .data('looping-url', value.images.original.url)
                        .data('image-state', 'still')
                        .on('click', function(){
                            if($(this).data('image-state') === 'still'){
                                $(this).data('image-state', 'loop'); // change state
                                $(this).attr('src', $(this).data('looping-url'));
                            } else
                            {
                                $(this).data('image-state', 'still');  // change state
                                $(this).attr('src', $(this).data('still-url'));
                            }
                        });

                    var charRating = $('<div>')
                        .addClass('panel-footer text-center')
                        .html("Rating: " + value.rating);

                    var panelBody = $('<div>')
                        .addClass('panel-body')
                        .append(charPic);

                    var panelDiv =  $('<div>')
                        .addClass('panel panel-default panel-style')
                        .append(panelBody, charRating);

                    $('#giphy-view').append(panelDiv);

                });
        });
    };

    // formatForSearch will replace whitespace with '+'.
    // This will prepare the user's input to be appended to the url search string
    function formatForSearch(topic){
        return topic.replace(/\s/g, "+");
    };


    // This function handles events where the add topic button is clicked
    $("#add-topic-button").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var newTopic = $("#add-topic-input").val().trim();

        $("#add-topic-input").val("");

        // Calling renderButtons which handles the processing of our movie array
        renderButtons(newTopic);
    });


// Calling the renderButtons function to display the intial buttons
    $.each(initialTopics, function(index, value){
        renderButtons(value);
    });


}) // END document.ready

