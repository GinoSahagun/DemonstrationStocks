$(function() {


    var serchUrl = getUrlParameter("search");
    console.log(serchUrl);
    if (typeof(serchUrl) == "undefined" && currentSymbol == "") {
      $(".searchTable").hide();
    } else {
        search(serchUrl);
        currentSymbol = serchUrl;
        $(".searchTable").show();
    }


});
