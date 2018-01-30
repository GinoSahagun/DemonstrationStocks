$(function (){
  var quoteUrl = "";
  quoteUrl = getUrlParameter("quote");
  console.log(quoteUrl);
  if (typeof(quoteUrl) == "undefined") {
      $(".quoteTable").hide();
      $("#main-content").hide();
      $(".Search-Input").show();
  } else if (quoteUrl != ""  && typeof(quoteUrl) != "undefined") {
      queryDatabase(quoteUrl);
      currentSymbol = quoteUrl;
      $("#main-content").hide();
      $(".Search-Input").hide();
  }else{
    $("#main-content").hide();
    $(".quoteTable").hide();
    $(".Search-Input").show();
  }

  $(".history-view").click(function(){
    var sym = quoteUrl;
    window.location.href="history.php?history=" + sym;

  });

});
