$(function (){
  var quoteUrl = "";
  quoteUrl = getUrlParameter("history");
  console.log(quoteUrl);
  if (typeof(quoteUrl) == "undefined") {
      $(".histTable").hide();
      $("#main-content").show();
  } else if (quoteUrl != ""  && typeof(quoteUrl) != "undefined") {
      getHistory(quoteUrl);
      $("#main-content").hide();
      $(".histTable").show();
  }  else{
    $("#main-content").hide();
    $(".histTable").hide();
  }

  $(".hist-quote-view").click(function(){
    var sym = quoteUrl;
    window.location.href = "quote.php?quote="+sym;
  });
  $('.modal').modal();
  // Click Button for Graph
  $(".hist-history-result").click(function(){

  });

});
