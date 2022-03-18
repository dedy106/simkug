
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Highcharts Example</title>

        <script type="text/javascript" src="js/lib/jquery.js"></script>
        <script type="text/javascript">
        
        var chart;
        $(function () {
            $(document).ready(function() {
                try{
                    var resource = <?php echo $_GET["resId"];?>;
                    window.parent.system.getResource(resource).objectReady();

                }catch(e){
                    alert(e);
                }
                
            });
        });
        function setChartData(options){
            chart = new Highcharts.Chart(options);
        }
        function getChart(){
            return chart;
        }
        </script>
    </head>
    <body>
<script src="js/lib/highcharts.js"></script>
<script src="js/lib/modules/exporting.js"></script>

<div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>

    </body>
</html>
