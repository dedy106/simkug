<!DOCTYPE html>
<html>
<head>
  <title>jQuery ScrollTabs :: Josh Reed</title>

  <!-- Latest compiled and minified CSS -->

  <link rel="stylesheet" href="<?=$folder_css?>/scrolltabs.css">
  <link rel="stylesheet" href="<?=$folder_css?>/demo.css">
</head>
<body>


  <div class="navbar navbar-inverse navbar-static-top" role="navigation">
    <div class="container">
      <a class="navbar-brand" href="#">jQuery ScrollTabs</a>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Download</a></li>
        <li><a href="#examples">Examples</a></li>
        <li><a href="documentation.html">Documentation</a></li>
      </ul>
    </div>
  </div>

  <div class="colored_header">
    <div class="container" id='header_image'>
      <!--<h1 style="border-bottom: 1px dotted #CCCCFF;">Too Many Tabs in Your Tabbed Interface? Scroll 'Em!</h1>
      <h3>Customizable. Free. Dynamic.</h3>
      <div>You can make it your own by using simple CSS</div>-->
    </div>
  </div>
  
  <div class="container">

    
    <h3 class="section_title">Custom Styling</h3>

    <div class="indented_text">
      <p>Basic initialization, <em>without any theme</em> or custom CSS applied. Previous examples used the &quot;light&quot; theme: <code>scroll_tabs_theme_light</code>.</p>

      <div id="tabs4">
        <span>First Tab</span>
        <span>Another Tab 2</span>
        <span>Another Tab 3</span>
        <span>Another Tab 4</span>
        <span>Another Tab 5</span>
        <span>Another Tab 6</span>
        <span>Another Tab 7</span>
        <span>Another Tab 8</span>
        <span>Another Tab 9</span>
        <span>Another Tab 10</span>
        <span>Another Tab 11</span>
        <span>Another Tab 12</span>
        <span>Another Tab 13</span>
      </div>
      
      <button type="button" class="btn btn-primary" onclick="javascript:tabs4.removeTabs('span:eq(0)')">Remove First Item</button>

      <br /><br />

      <p>This is an example with the &quot;dark&quot; theme applied. To apply this theme, simply append the class <code>scroll_tabs_theme_dark</code> to the container
      div element.</p>
      
      <div id="tabs5" class="scroll_tabs_theme_dark">
        <span>First Tab</span>
        <span>Another Tab 2</span>
        <span>Another Tab 3</span>
        <span>Another Tab 4</span>
        <span>Another Tab 5</span>
        <span>Another Tab 6</span>
        <span>Another Tab 7</span>
        <span>Another Tab 8</span>
        <span>Another Tab 9</span>
        <span>Another Tab 10</span>
        <span>Another Tab 11</span>
        <span>Another Tab 12</span>
        <span>Another Tab 13</span>
      </div>
      
      <button type="button" class="btn btn-primary" onclick="javascript:tabs5.removeTabs('span:eq(0)')">Remove First Item</button>

    <ul class="nav nav-tabs" id="tab_sc" role="tablist">
        <li role="presentation" class="active"><a href="#tab1" role="tab" data-toggle="tab">Tab Number 1</a></li>
        <li role="presentation"><a href="#tab2" role="tab" data-toggle="tab">Tab Number 2</a></li>
        <li role="presentation"><a href="#tab3" role="tab" data-toggle="tab">Tab Number 3</a></li>
        <li role="presentation"><a href="#tab4" role="tab" data-toggle="tab">Tab Number 4</a></li>
        <li role="presentation"><a href="#tab5" role="tab" data-toggle="tab">Tab Number 5</a></li>
        <li role="presentation"><a href="#tab6" role="tab" data-toggle="tab">Tab Number 6</a></li>
        <li role="presentation"><a href="#tab7" role="tab" data-toggle="tab">Tab Number 7</a></li>
        <li role="presentation"><a href="#tab8" role="tab" data-toggle="tab">Tab Number 8</a></li>
        <li role="presentation"><a href="#tab9" role="tab" data-toggle="tab">Tab Number 9</a></li>
    </ul> 
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="tab1">Tab 1 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab2">Tab 2 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab3">Tab 3 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab4">Tab 4 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab5">Tab 5 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab6">Tab 6 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab7">Tab 7 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab8">Tab 8 content...</div>
      <div role="tabpanel" class="tab-pane" id="tab9">Tab 9 content...</div>
    </div>
      
  </div>

  <div class="footer">
      &copy; Copyright 2014 Josh Reed<br />
      Created in Association with <a href='http://www.mosaik.com'>Mosaik Solutions</a><br />
      Software is released under the MIT License
  </div>

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

  <!-- Latest compiled and minified JavaScript -->
  <!-- <script src="examples/js/bootstrap.min.js"></script> -->
  
  <script src="<?=$folder_js?>/jquery.scrolltabs.js"></script>
  <script src="<?=$folder_js?>/jquery.mousewheel.js"></script>

  <script type="text/javascript">
    var tabs3 = null;
    var tabs4 = null;
    var tabs5 = null;
    var tabs6 = null;
    var tabs7 = null;
    var tab_sc = null;
    $(document).ready(function(){
      $('#tabs1').scrollTabs();
      $('#tabs2').scrollTabs();
      tabs3 = $('#tabs3').scrollTabs();
      tabs4 = $('#tabs4').scrollTabs();
      tabs5 = $('#tabs5').scrollTabs();
      tabs6 = $('#tabs6').scrollTabs();
      tabs7 = $('#tabs7').scrollTabs();
      tab_sc = $('#tab_sc').scrollTabs();
    //   $('.nav-tabs').scrollTabs();
    });
  </script>
</body>
</html>
