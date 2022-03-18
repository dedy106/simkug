

<!DOCTYPE html>
<html>

  <head>
    <!--<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="<?=$folder_css?>/jquery.scrolling-tabs.css">

    <style>
/* .nav-tabs,
.tab-content {
  display: none;
}

.st-demo-header {
  background-color: #666666;
  color: white;
  font-size: 24px;
  padding: 8px 24px;
}

.st-demo-header button {
  color: black;
  font-size: 12px;
}

.st-demo-subheader {
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
  height: 65px;
  margin-top: 50px;
  padding: 8px 24px;
}

.st-demo-subheader:first-child {
  margin-top: 0;
} */

    </style>
  </head>

  <body>

  
  <style>
      
.scrtabs-tabs-fixed-container{
    height: 45px;
    width:330px !important;
}


.scrtabs-tab-scroll-arrow-left{
    visibility: hidden;
    display: none !important;
}
.scrtabs-tab-scroll-arrow-right{
    visibility: hidden;
    display: none !important;
}

.scrtabs-tabs-fixed-container ul.nav-tabs > li {
    margin-bottom:10px;
}
.nav-tabs > li {
    float:none !important;
    display:inline-block !important;
    zoom:1;
    background: white;
    border-radius: 15px;
    border: 1px solid #8080802e;
}
.nav-tabs > .nav-tabs > li {
    width:30% !important;
    max-width:95px !important;
    text-align:center !important;
    border:1px solid #cccbcbe3 !important;
    border-radius:20px !important;
    margin:3px !important;
}

.nav-tabs > li.active {
    border-top:0px !important;
    border:2px solid #dd4b39 !important;
    background: white;
    border-radius: 15px;
    
}
.nav-tabs > li> a {
    padding:6px !important; 
    color: black;  
    
}
.nav-tabs > li.active > a {
    border:0px solid #dd4b39 !important;
    border-radius:20px !important;
    background : #dd4b390d !important;
    color:black !important;                         
}
.nav-tabs > li.active > a:hover {
    border:0px solid #dd4b39 !important;
    border-radius:20px !important;
    background : #dd4b390d !important;
    color:black !important;
    
}
</style>
                                    <!-- <ul class='nav nav-tabs' role='tablist' >
                                        <li role="presentation" class='active'><a href='#tab_1' data-toggle='tab'>Senin</a></li>
                                        <li role="presentation"><a href='#tab_2' role="tab" data-toggle='tab'>Selasa</a></li>
                                        <li role="presentation"><a href='#tab_3' role="tab" data-toggle='tab'>Rabu</a></li>
                                        <li role="presentation"><a href='#tab_4' role="tab" data-toggle='tab'>Kamis</a></li>
                                        <li role="presentation"><a href='#tab_5' role="tab" data-toggle='tab'>Jumat</a></li>
                                        <li role="presentation"><a href='#tab_6' role="tab" data-toggle='tab'>Sabtu</a></li>
                                        <li role="presentation"><a href='#tab_7' role="tab" data-toggle='tab'>Sabtu</a></li>
                                        <li role="presentation"><a href='#tab_8' role="tab" data-toggle='tab'>Sabtu</a></li>
                                        <li role="presentation"><a href='#tab_9' role="tab" data-toggle='tab'>Sabtu</a></li>
                                        <li role="presentation"><a href='#tab_10' role="tab" data-toggle='tab'>Sabtu</a></li>
                                        <li role="presentation"><a href='#tab_11' role="tab" data-toggle='tab'>Sabtu</a></li>
                                    </ul>
                                    <div class='tab-content'>
                                        <div  role="tabpanel" class='tab-pane active' id='tab_1'>
                                        </div>
                                    </div> -->


    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#tab1" role="tab" data-toggle="tab">Tab Number 1</a></li>
      <li role="presentation"><a href="#tab2" role="tab" data-toggle="tab">Tab Number 2</a></li>
      <li role="presentation"><a href="#tab3" role="tab" data-toggle="tab">Tab Number 3</a></li>
      <li role="presentation"><a href="#tab4" role="tab" data-toggle="tab">Tab Number 4</a></li>
      <li role="presentation"><a href="#tab5" role="tab" data-toggle="tab">Tab Number 5</a></li>
      <li role="presentation"><a href="#tab6" role="tab" data-toggle="tab">Tab Number 6</a></li>
      <li role="presentation"><a href="#tab7" role="tab" data-toggle="tab">Tab Number 7</a></li>
    </ul> 

    
    <div class="tab-content" style='margin-top:20px'>
      <div role="tabpanel" class="tab-pane active" id="tab1">Tab 1 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab2">Tab 2 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab3">Tab 3 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab4">Tab 4 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab5">Tab 5 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab6">Tab 6 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab7">Tab 7 content...</div>
    </div>

<!-- 
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> -->

    <script src="<?=$folder_js?>/jquery.scrolling-tabs.js"></script>

    <script>
    ;(function() {
        'use strict';


        $(activate);


        function activate() {

            $('.nav-tabs').scrollingTabs({
                enableSwiping: true
            })
            .on('ready.scrtabs', function() {
                $('.tab-content').show();
            });

        }

     }());

    </script>
  </body>

</html>
