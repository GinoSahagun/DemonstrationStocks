$(function() {
    var data = {
        "action": "symSymbol"
    };
    $.ajax({
        type: 'GET',
        url: "autocomplete-symbols.php",
        data: data,
        success: function(names) {
            //console.log(names)
            var array = $.parseJSON(names);
            //console.log(array);
            //console.log(tempJSON);
            $('#autocomplete-symbol').autocomplete({
                data: array,
                limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
                hover: true,
                onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });

        },
        error: function(err) {
            console.log(err);
            alert("could not connect to database error");
        }
    });



})
