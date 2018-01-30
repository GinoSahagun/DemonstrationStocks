//GET URL Parameters
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
var currentSymbol = "";

$(function() {

    // Animate loader off screen


    //Loading GIF
    $body = $("body");
    $(window).ajaxStart(function() {
        $body.addClass("loading");
    });
    $(window).ajaxStop(function() {
        $body.removeClass("loading");
    });
    //enter symbol or name of company so that enter works
    $("#autocomplete-input").keyup(function(e) {
        var val = $("#autocomplete-input").val();
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            window.location.href = "search.php?search=" + val;
        }
        currentSymbol = val;

    });

    //quote button to find a specific quote
    $("#quote-button").click(function() {
        var val = $("#autocomplete-input").val();
        console.log("quote.php?quote=" + val);
        window.location.href = "quote.php?quote=" + val;
        currentSymbol = val;

    });
    //quote button to find speific quote
    $("#quote-but").click(function() {
        var val = $("#autocomplete-symbol").val();
        console.log("quote.php?quote=" + val);
        window.location.href = "quote.php?quote=" + val;
        currentSymbol = val;

    });

    //Search button to find a specific symbol for a company
    $("#find-symbol").click(function() {
        var val = $("#autocomplete-input").val();
        window.location.href = "search.php?search=" + val;
        currentSymbol = val;
    });



});
//a query for finding a specific quote
//select symName, qQuoteDateTime, qLastSalePrice, qNetChangePrice, qNetChangePct, qShareVolumeQty from symbols join quotes on symSymbol=qSymbol  where symSymbol='a'  order by qQuoteDateTime desc;
//function used to query the database for a speicifc quote
//Parameters: Quote symbol
//Post: Retrieves  JSON of the quote symbols information
function queryDatabase(val = "") {
    console.log(val);
    var symbol = {
        "quote": val
    };
    //use an ajax call for a get because a query
    $.ajax({
        type: 'GET',
        url: "createTable.php",
        data: symbol,
        success: function(data) {
            var array = $.parseJSON(JSON.stringify(data));
            array = $.parseJSON(array);
            var mapped = [];
            for (var d in array[0]) {
                mapped.push([d, array[0][d]]);
            }
            //console.log(mapped);
            //if the array length is zero for some odd reason
            //Dont show an empty table and have the user be prompted
            //No quotes found try and search again
            console.log(array);
            if (array.length == 0) {
                $("#main-content").show();
                $(".quoteTable").hide();
                $(".Search-Input").show();
                return;
            }

            //Headers
            $("#quote-title").text(array[0].symName);
            $(".sym").text(array[0].symSymbol);
            $(".symbol-time").text(array[0].qQuoteDateTime);
            $(".quote-brand").text(array[0].symExchange);

            var table = $("#create-quote");
            var table2 = $("#create-quote-second");
            //console.log(table);
            if (table.length != 0) {
                $("#create-quote").empty();
            }
            if (table.length != 0) {
                $("#create-quote-second").empty();
            }
            table.append("<thead><tr><th>Basics</th></tr></thead>");
            var row;
            table.append("<tr><td>Last</td><td>" + Number(array[0].qLastSalePrice).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td>Prev Close" + "</td><td>" + Number(array[0].qPreviousClosePrice).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td></tr>");
            table.append("<tr><td>Change</td><td>" + Number(array[0].qNetChangePrice).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td>Bid" + "</td><td>" + Number(array[0].qBidPrice).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td></tr>");
            table.append("<tr><td>%Change</td><td>" + Number(array[0].qNetChangePct).toLocaleString("en") + "%" + "</td><td>Ask" + "</td><td>" + Number(array[0].qAskPrice).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td></tr>");
            table.append("<tr><td>High</td><td>" + Number(array[0].qTodaysHigh).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td>52 Week High" + "</td><td>" + Number(array[0].q52WeekHigh).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td></tr>");
            table.append("<tr><td>Daily Volume</td><td>" + Number(array[0].qShareVolumeQty).toLocaleString("en"));

            table2.append("<thead><tr><th>Fundamentals</th></tr></thead>")
            table2.append("<tr><td>PE. Ratio</td><td>" + Number(array[0].qCurrentPERatio).toLocaleString("en") + "</td><td>Market Cap" + "</td><td>" + Number(array[0].symMarketCap).toLocaleString("en", {}) + "</td></tr>");
            table2.append("<tr><td>Earnings/Share</td><td>" + Number(array[0].qEarningsPerShare).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td># Shares Out" + "</td><td>" + Number(array[0].qTotalOutstandingSharesQty).toLocaleString("en") + "</td></tr>");
            table2.append("<tr><td>Div/Share</td><td>" + Number(array[0].qCashDividendAmount).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td>Div Yield" + "</td><td>" + Number(array[0].qCurrentYieldPct).toLocaleString("en") + "%" + "</td></tr>");
            table2.append("<tr><td>Low</td><td>" + Number(array[0].qTodaysLow).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            }) + "</td><td>52 Week Low" + "</td><td>" + array[0].q52WeekLow + "</td></tr>");

            //Hightlight table rows except headers
            $("#create-quote tr").not(':first').hover(
                function() {
                    $(this).css("background", "#01579b");
                },
                function() {
                    $(this).css("background", "");
                }
            );

            //Hightlight table rows except headers
            $("#create-quote-second tr").not(':first').hover(
                function() {
                    $(this).css("background", "#01579b");
                },
                function() {
                    $(this).css("background", "");
                }
            );

        },
        error: function(err) {
            console.log(err);
            alert("could not connect to database error");
        }
    });

}

//build a row for a specific quote information
function build_quote(data) {
    if (typeof(data) == "undefined")
        return;

    var row;
    row = "<td>" + data[0] + "</td><td>" + data[1] + "</td>";
    return row;


}

//Function: Get History uses a quote symbol to get that quotes history
//Parameters: a quote symbol
//Post: Returns a JSON encoded object through a php script
var SUPERDATA;
function getHistory(val = "") {
    var symbol = {
        "history": val
    };
    $.ajax({
        type: 'GET',
        url: "createTable.php",
        data: symbol,
        success: function(data) {
            var array = $.parseJSON(JSON.stringify(data));
            array = $.parseJSON(array);
            SUPERDATA = array;
            //var time = [];
            console.log(array);
            var table = $("#history-create");
            $("#history-title").text(array[0].symName);
            $(".graphName").val(array[0].symName);
            $(".sym").text(array[0].symSymbol);
            $(".symbol-time").text(array[0].qQuoteDateTime);
            $(".quote-brand").text(array[0].symExchange);
            if (array.length == 0) {
                $("#main-content").show();
                $(".histTable").hide();
                return;
            }
            if (table.length != 0) {
                table.empty();

            }
            var row;
            table.append("<thead><tr><th>Date</th><th>Last</th><th>Change</th><th>%Change</th><th>Volume</th></tr></thead>");
            for (var d of array) {
                row += build_history(d);
                //time.push(d.qQuoteDateTime.split(" ")[0]);
            }
            table.append(row);
            //console.log(time);

            //Hover a row to make it be highlited in that color
            $("#history-create tr").not(":first").hover(
                function() {
                    $(this).css("background", "#01579b");
                },
                function() {
                    $(this).css("background", "");
                }
            );

            //create Graph
            //load_data(array, time);

        },
        error: function(err) {
            console.log(err);
            alert("could not connect to database error");
        }
    });

}
// chart object for the history chart credit to Evan
var Graph = function() {
	this.data = {};
	this.chart = {};
	this.chartOptions = {
		vAxis: {format: 'currency'},
		hAxis: {viewWindow: {min: new Date(0), max: new Date()} },
		legend: {position: 'top'},
    animation: {startup: "true", duration: 1000, easing: 'in'},
    chartArea: {  width: "100%", height: "100%" },
		explorer: { axis: 'horizontal', actions: ['dragToPan', 'rightClickToReset']}

	};
	this.dataSymbol = "";

}
//create History Graph
function load_data() {
  var graph = new Graph();
  graph.data = new google.visualization.DataTable();
  graph.data.addColumn('date', 'Date');
	graph.data.addColumn('number', 'Price');

  var dat = [];
  //console.log(array);
  for (var i of SUPERDATA) {
				dat.push([new Date(), parseFloat(i.qLastSalePrice)])
	}
  console.log(dat);
  graph.data.addRows(dat);

  graph.chart = new google.charts.Line(document.getElementById('chart'));
  graph.chart.draw(graph.data,graph.chartOptions);
  graph.chartOptions.hAxis.viewWindow.min = graph.data.getValue(graph.data.getNumberOfRows() - 1, 0);
}

//A specific way of building the history graph table
function build_history(data) {
    //console.log(data);
    var row = "<tr>";
    row += "<td>" + data.qQuoteDateTime + "</td>" + "<td>" + Number(data.qLastSalePrice).toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    }) + "</td>";
    row += "<td>" + Number(data.qNetChangePrice).toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    }) + "</td>" + "<td>" + data.qNetChangePct + "%" + "</td>";
    row += "<td>" + Number(data.qShareVolumeQty).toLocaleString("en") + "</td>";
    row += "</tr>";
    return row;

}

//Function: Search for the company's quote information and history
function search(val = "") {
    //Show the user what they searched for
    if (val != "")
        $("#search-results").text("Search Results " + '\"' + val + '\"');
    else {
        $("#search-results").text("Search Results *");
    }
    var symbol = {
        "search": val
    };
    $.ajax({
        type: 'GET',
        url: "createTable.php",
        data: symbol,
        success: function(data) {
            //console.log(data);
            var array = $.parseJSON(JSON.stringify(data));
            array = $.parseJSON(array);
            console.log(array);
            var table = $("#table-create");
            console.log(table);
            if (table.length != 0) {
                $("#table-create").empty();

            }
            var row;
            table.append("<thead><tr><th>Symbol Name</th><th>Name</th><th>Quote</th><th>History</th></tr></thead>");
            //table.append("<tbody class='wrapper'>");
            for (var i = 0; i < array.length; i++) {
                row += build_search(array[i]);

            }
            //table.append("</tbody>");
            table.append(row);
            //trs represent the table rows
            var trs = $("#table-create tr");
            //create a variable for the more button
            var btnMore = $("#see-more");
            // less button
            var btnLess = $("#see-less");
            var trsLength = trs.length;
            console.log(trs.length);
            //current index
            var currentIndex = 10;
            //hide all of the table rows
            trs.hide();
            //Only show the first ten records
            trs.slice(0, 10).show();
            checkButton();

            //How the More Button and Less Button react to user
            btnMore.click(function(e) {
                e.preventDefault();
                trs.slice(currentIndex, currentIndex + 10).show();
                currentIndex += 10;
                checkButton();
            });

            btnLess.click(function(e) {
                e.preventDefault();
                trs.slice(currentIndex - 10, currentIndex).hide();
                currentIndex -= 10;
                checkButton();
            });

            //Got to check for the buttons so we dont get out of bounce
            function checkButton() {
                var currentLength = $("#table-create tr:visible").length;

                if (currentLength >= trsLength) {
                    btnMore.hide();
                } else {
                    btnMore.show();
                }

                if (trsLength > 10 && currentLength > 10) {
                    btnLess.show();
                } else {
                    btnLess.hide();
                }

            }

            //Table Created now we can click on each link
            $(".quote-result").click(function() {
                var but = $(this);
                console.log(but[0].dataset.ref);
                queryDatabase(but[0].dataset.ref);

            });
            $(".history-result").click(function() {
                var but = $(this);
                console.log(but[0]);
                getHistory(but[0].dataset.ref);

            });
            //Create the Hover effect to illuminate hovered item
            $("#table-create tr").not(':first').hover(
                function() {
                    $(this).css("background", "#01579b");
                },
                function() {
                    $(this).css("background", "");
                }
            );
            //table.addClass("bordered");
            //$(".mainTable").show();


        },
        error: function(err) {
            console.log(err);
            alert("could not connect to database error");
        }
    });
}

//build search tabe through a simple function
function build_search(das) {
    //console.log(das);
    var row;
    row = "<tr><td>" + das.symSymbol + "</td><td>" + das.symName;
    row += "</td><td><a href=quote.php?quote=" + das.symSymbol + " class='btn-floating teal accent-4 quote-result'><i class='material-icons'>search</i>/a>";
    row += "</td><td><a href=history.php?history=" + das.symSymbol + " class='btn-floating teal accent-4 history-result'><i class='material-icons'>query_builder</i>/a></td></tr>";

    return row;

}
