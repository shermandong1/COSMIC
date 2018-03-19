<!DOCTYPE html>
<html lang="en" ng-app="myApp">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>COSMIC-System</title>
    <!-- Bootstrap core CSS -->
    <link href="./vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
    <!-- Custom fonts for this template -->
    <link href="./vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
    <!-- Daterange picker CSS -->
    <link rel="stylesheet" type="text/css"  href="http://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
    <!-- Custom styles for this template -->
    <link href="./css/agency.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/toaster.css" rel="stylesheet">
    <link href="./css/angular-clndr.css" rel="stylesheet">
  </head>
  <body id="page-top" ng-app="COSMIC"  ng-cloak="">
    >
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="#inventory">COSMIC-System</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#inventory">Inventory</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#dashboard">Dashboard</a>
            </li>
          </ul>
        </div>


      </div>
    </nav>
    <section>
      <!--<div class="container" ng-view autoscroll="true">-->
      <div class="container">
        <div data-ng-view="" id="ng-view" class="slide-animation" autoscroll="true"></div>
        <hr />
      </div>
    </section>
    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <span class="copyright">COSMIC-System 2017</span>
          </div>
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
            <ul class="list-inline quicklinks">
              <li class="list-inline-item">
                <a href="https://viterbipk12.usc.edu/stem-eop/">USC STEM EOP</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <!-- Bootstrap core JavaScript -->
    <script src="./vendor/jquery/jquery.min.js"></script>
    <script src="./vendor/popper/popper.min.js"></script>
    <script src="./vendor/bootstrap/js/bootstrap.js"></script>
    <!-- Plugin JavaScript -->
    <script src="./vendor/jquery-easing/jquery.easing.min.js"></script>
    <toaster-container toaster-options="{'time-out': 400}"></toaster-container>
    <!-- Libs -->
    <script src="./js/angular.min.js"></script>
    <script src="./js/angular-route.min.js"></script>
    <script src="./js/angular-animate.min.js" ></script>
    <script src="./js/toaster.js"></script>
    <script src="./js/angular-file-upload.min.js"></script>
    <script src="./js/match-media.js"></script>
    <script src="./app/app.js"></script>
    <script src="./app/data.js"></script>
    <script src="./app/directives.js"></script>
    <!-- Controllers -->
    <script src="./app/authCtrl.js"></script>
    <script src="./app/aboutCtrl.js"></script>
    <script src="./app/inventoryCtrl.js"></script>
    <script src="./app/itemCtrl.js"></script>
    <script src="./app/newitemCtrl.js"></script>
    <script src="./app/dashboardCtrl.js"></script>
    <script src="./app/removeusersCtrl.js"></script>
    <script src="./app/changepasswordCtrl.js"></script>
    <!-- Daterange Picker -->
    <script type="text/javascript" src="http://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="http://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
    <!-- CLNDR -->
    <script src="./js/momentOld.js"></script>
    <script src="./js/clndr.js"></script>
    <script src="./js/angular-clndr.min.js"></script>

    <script src="./js/isteven-multi-select.js"></script>
    <link rel="stylesheet" href="./css/isteven-multi-select.css">
  </body>
</html>
