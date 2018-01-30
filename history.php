<?php  // This must be the FIRST line in a PHP webpage file
ob_start();		// Enable output buffering
?>
<!DOCTYPE html>
<html>

<head>
    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
    <link type="text/css" rel="stylesheet" href="css/style.css" media="screen,projection" />
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="js/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <!--Personal javascript-->
    <script type="text/javascript" src="js/stocks.js"></script>
    <script type="text/javascript" src="js/ajax.js"></script>
    <script type="text/javascript" src="js/history.js"></script>
    <!--Charts.js library -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
    //google.charts.load('current', {'packages':['line']});
    //google.charts.setOnLoadCallback(load_data);
    </script>
    <!-- <script type="text/javascript" src="js/Chart.bundle.min.js"></script> -->
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>




<body>
    <?php

    include 'autocomplete.php';
    ?>

    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content">
        <li><a href="#!">Materialize Framework</a></li>
        <li class="divider"></li>
        <li><a href="#!">Cat Stuff</a></li>
        <li class="divider"></li>
        <li><a href="#!">Cool Memes</a></li>
    </ul>

    <!-- Navbar goes here -->
    <div class = "navbar-fixed">
    <nav>
      <div class="navbar nav-wrapper hoverable teal accent-4">
          <a href="index.php" class="brand-logo right">Quick Scthocks</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
              <li class="active"><a href="index.php">Home</a></li>
              <li><a href="quote.php">Quote</a></li>
              <li><a href="history.php">History</a></li>
              <li><a href="search.php">Search</a></li>
              <li><a href="http://sahagunc.cs.spu.edu">Portfolio</a></li>
          </ul>
          <ul class="side-nav hoverable teal accent-4" id="mobile-demo">
              <li><a style="color:white; font-size: 16px;" href="quote.php">Quote</a></li>
              <li class="divider"></li>
              <li><a style="color:white; font-size: 16px;" href="history.php">History</a></li>
              <li class="divider"></li>
              <li><a style="color:white; font-size: 16px;" href="search.php">Search</a></li>
              <li class="divider"></li>
              <li><a style="color:white; font-size: 16px;" href="#">Portfolio</a></li>
              <li class="divider"></li>
          </ul>
      </div>
    </nav>
</div>
    <main>





        <!-- Page Layout here -->
        <div id="main-content" class="container">
            <div class="row second hoverable">
                <div  class="row">


                  <div class="row">

                      <div style="padding:10px;" class="col s12">

                        <h1 class="center-align">Sorry History Wasn't Found</h1>
                        <div class="divider"></div>


                      </div>
                  </div>

                </div>
              </div>
              <div id="form-input" class="row hoverable jumbo">
                  <h1 class="center-align">Find a Quotes History</h1>
                  <div class = "row">
                    <div class = "col s12 m12 l12">


                      <div id="inputs"  class="input-field col m6 l6">
                          <i class="material-icons prefix">search</i>
                          <input type="text" id="autocomplete-input" autocomplete="off" class="autocomplete">
                          <label for="autocomplete-input">ex. Microsoft</label>

                        </div>
                      <div class ="col m6 l6">


                        <div id="quote-buttons" style="padding: 5px;" class="col s12 left">
                          <a id="find-symbol" class="waves-effect waves-light btn button">Search</a>
                          <a id="quote-button" class="waves-effect waves-light btn button">Quote</a>
                        </div>
                      </div>




                    </div>
                  </div>

              </div>



        </div>

<!-- Graph for History -->
<!-- Modal Structure -->
<div id="modal1" style="color: black;" class="modal">
  <div class="modal-content row">
    <h4 class="graphName" >Awesome Graph</h4>
    <p class = "graphName" >Awesome Graph</p>
    <div class="row">
      <div id="chart"></div>
    </div>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
  </div>
</div>

        <!-- Page Layout here -->
        <div class="container hoverable">

            <div class="row second histTable">
                <div class="row">
                  <div class="row">
                    <div class="col s12">
                      <h2 id="history-title">Search Result</h2>
                      <a  class="waves-effect waves-light btn button hist-quote-view">View Quote</a>
                      <a class="waves-effect waves-light btn hist-history-result" href="#modal1">View Graph Coming Soon</a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s4">
                      <h4 class="sym">Search Result</h4>
                    </div>
                    <div class="col s4">
                      <h4 class="symbol-time">Search Result</h4>
                    </div>
                    <div class="col s4">
                      <h4 class="quote-brand">Search Result</h4>
                    </div>
                  <div class ="row">
                    <div class="col s6 center">

                    </div>
                    <div class = "col s6 center">

                    </div>

                  </div>


                  </div>
                  <div  class="row ">
                    <div  class="row ">
                      <!-- Page Layout here -->
                            <div class="col s12">
                            <table id="history-create" class=""></table>
                            </div>

                    </div>

                  </div>


                </div>

            </div>



        </div>


    </main>

    <footer class="page-footer hoverable teal accent-4">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Quick Scthocks</h5>
                    <p class="grey-text text-lighten-4">Get Some Quotes in Now</p>
                </div>
                <div class="col l4 offset-l2 s12">
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">

                <p>© 2014 Copyright Gino Sahagun
                    <p>

            </div>
        </div>
    </footer>

</body>
<?php	// This is the LAST section in a PHP webpage file
ob_end_flush();
?>
<div class="gif ">
  <div class="flex-container">


    <div class="col s12 center">
                <div class="preloader-wrapper big active">
                  <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>

                  <div class="spinner-layer spinner-red">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>

                  <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>

                  <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
  </div>
</div>

<script type="text/javascript" src="js/autocomplete.js"></script>

</html>
