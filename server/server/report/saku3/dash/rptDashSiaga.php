<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashSiaga extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $tahun = substr($periode,0,4);
        $dept="";

        $tahunLalu = floatval($tahun) - 1;
		$periodeLalu = $tahunLalu . substr($periode, 4, 2);
        
        $sqlBox = "select klp, sum(nilai) as n1 from exs_real 
        where tahun = '$tahun' and periode <= '$periode' -- and dept like '$dept'
        group by klp
        having klp in ('REVENUE','COGS','OPEX','GP','Net Income')";
                
        $rs = $dbLib->execute($sqlBox);  

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select top 5 * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' order by tgl_notif desc ";

        $rs3=$dbLib->execute($sqlNot);

        $sqltest="select a.klp, case a.klp when 'REVENUE' then 1 when 'COGS'  then 2 when 'GP' then 3 when 'OPEX' then 4 when 'OTHERS' then 5 else 99 end as nu, a.n1, b.fullyear as fullyear_rkap, b.ytd as ytd_rkap, c.fullyear , c.ytd , a.n1 / b.fullyear * 100 as ach2, a.n1 / b.ytd * 100 as ach, (a.n1 / c.ytd - 1) * 100 as grow
        from ( select klp, sum(nilai) as n1 from exs_real where tahun = '2017' and periode <= '201712'
               group by klp ) a 
        left outer join ( select klp, sum(nilai) as fullyear, sum(case when periode <= '201712' then nilai  
                          else 0 end) as ytd from exs_rkap where tahun = '2017' 
                          group by klp ) b on b.klp = a.klp
        left outer join ( select klp, sum(nilai) as fullyear, sum(case when periode <= '201612' then 
                           nilai else 0 end) as ytd  from exs_real where tahun = '2016' group by klp ) c on c.klp = a.klp
        order by nu";

		$res = $dbLib->execute($sqltest);
		$grouping = array();
				
		$categories = array("Real $tahunLalu", "RKAP $tahun","Real $tahun");

		while ($row = $res->FetchNextObject(false)){
            $summary[] = (array)$row;
            			
			$tmp = array(floatval($row->ytd),floatval($row->fullyear_rkap),floatval($row->n1));
			
			$series[$row->klp] = $tmp;	
					
		}
		// $series = $grouping;
        // json_encode($series["REVENUE"]);

        $sql = "select klp, portofolio, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode 	
        group by klp, portofolio ";
				
		$res = $dbLib->execute($sql);
		$grouping = array();
		while ($row = $res->FetchNextObject(false)){
			
			$tmp = array("name" => $row->klp, "data" => array() );
			$tmp["data"][] = array($row->portofolio, floatval($row->n1));
            $grouping[$row->klp][] = $tmp;
            $categories2[]=$row->portofolio;
		}

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan  
            <div class='navbar-custom-menu pull-right padding:0px'>
            <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                    <i class='fa fa-bell-o'></i>
                    <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                    </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                echo"
                    <li>
                        <ul class='menu'>
                        <li>
                            <a href='#'>
                            <i class='fa fa-users text-aqua'></i> $row->title
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#'  onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashNotifDet','','$kode_lokasi|$periode|$kode_pp|$nik|server_report_saku3_dash_rptDashSiaga');\">View all</a></li>
                    </ul>
                </li>
                <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;' ><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </ul>
                </div>
            </div>
            <div class='panel-body'>";
        // echo "<section class='content' id='ajax-content-section'>
        //         <div id='dash_page_home'>";
        echo   "<div class='row'>";



        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red','aqua');
        $icon = array('fa-line-chart', 'fa-money', 'fa-pie-chart', 'fa-credit-card','fa-bank');
        while ($row = $rs->FetchNextObject($toupper=false)) {

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->klp."</p>
                                    <h3 id='home_kas_box'>".number_format($row->n1,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaDetail','','$kode_lokasi/$periode/all/$row->klp/$kode_pp/$nik/');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }
         echo"           
                </div>"; 




        // ================================> CHART <====================================

            if (trim($dept) == "All")  $dept = "";

            $tahun = substr($periode, 0, 4);
            $tahunLalu = floatval($tahun) - 1;
            $periodeLalu = $tahunLalu . substr($periode, 4, 2);

            $tahun = "'$tahun'";
            $periode = "'$periode'";
            $dept = "'$dept%'";
        
            $result = array("summary" => array(),"categories" => array(), "trend" => array(),"series" => array(), "series2" => array(), "series3" => array() );
            
            $sql = "select a.klp, case a.klp when 'REVENUE' then 1 
                            when 'COGS'  then 2
                            when 'GP' then 3
                            when 'OPEX' then 4
                            when 'OTHERS' then 5
                            else 99 end as nu,
                        a.n1, b.fullyear as fullyear_rkap, b.ytd as ytd_rkap, c.fullyear , c.ytd , a.n1 / b.fullyear * 100 as ach2, a.n1 / b.ytd * 100 as ach, (a.n1 / c.ytd - 1) * 100 as grow
                        from (
                        select klp, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode
                            and dept like $dept
                        group by klp ) a 
                        left outer join (
                        select klp, sum(nilai) as fullyear, sum(case when periode <= $periode then nilai else 0 end) as ytd from exs_rkap where tahun = $tahun 
                            and dept like $dept
                        group by klp ) b on b.klp = a.klp
                        left outer join (
                        select klp, sum(nilai) as fullyear, sum(case when periode <= '$periodeLalu' then nilai else 0 end) as ytd  from exs_real where tahun = '$tahunLalu' 
                            and dept like $dept
                        group by klp ) c on c.klp = a.klp
                        order by nu";
            
            $res = $dbLib->execute($sql);
            $grouping = array();
            
            $result["categories"] = array("Real $tahunLalu", "RKAP $tahun","Real $tahun");

            while ($row = $res->FetchNextObject(false)){
                $result["summary"][] = (array)$row;
                // $tmp = ;
                if (!isset($grouping[$row->klp])){
                    $tmp = array("name" => $row->klp, "colorByPoint" => true,  "data" => array(floatval($row->ytd),floatval($row->fullyear_rkap),floatval($row->n1)  ) );
                }
                $grouping[$row->klp] = $tmp;	
                
            }
            $result["series"] = $grouping;

            $sql = "select klp, portofolio, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode
                            and dept like $dept
                        group by klp, portofolio ";
            
            $res = $dbLib->execute($sql);
            $grouping = array();
            while ($row = $res->FetchNextObject(false)){
                if (!isset($grouping[$row->klp])){
                    $tmp = array("name" => $row->klp, "colorByPoint" => true,  "data" => array() );
                }
                $tmp["data"][] = array($row->portofolio, floatval($row->n1));
                $grouping[$row->klp] = $tmp;
            }
            $result["grouping"] = $grouping;

            // print_r(json_encode($result["series"]['REVENUE']));
            // print_r($result["categories"]);

            $tbl_summary = '';

            foreach($result['summary'] as $sum){
                $tbl_summary .= "
                    <tr>
                        <td>".$sum['klp']."</td>
                        <td>".$sum['ytd']."</td>
                        <td>".$sum['fullyear']."</td>
                        <td>".$sum['ytd_rkap']."</td>
                        <td>".$sum['fullyear_rkap']."</td>
                        <td>".$sum['n1']."</td>
                        <td>".$sum['ach']."</td>
                        <td>".$sum['ach2']."</td>
                        <td>".$sum['grow']."</td>
                    </tr>
                ";
            }
        
        // ================================> CHART <====================================
            
        echo"
                <div class='row'>
                    <div class='col-md-3'>
                        <div class='box box-primary'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> Revenue
                            </div>
                            <div class='box-body pad'>
                                <div id='home_rev_chart1'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-success'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> Rev. Contribution
                            </div>
                            <div class='box-body pad'>
                                <div id='home_rev_chart2'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> GP Contribution
                            </div>
                            <div class='box-body pad'>
                                <div id='home_gp_chart1'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> GP
                            </div>
                            <div class='box-body pad'>
                                <div id='home_gp_chart2'></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-md-4'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> OPEX
                            </div>
                            <div class='box-body pad'>
                                <div id='home_opex_chart1'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> Others
                            </div>
                            <div class='box-body pad'>
                                <div id='home_others_chart1'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> Net Income
                            </div>
                            <div class='box-body pad'>
                                <div id='home_ni_chart1'></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> Summary
                            </div>
                            <div class='box-body pad'>
                                <div id='home_summary_table'>
                                    <table class='table table-striped table-bordered'>
                                        <thead>
                                            <tr>
                                                <th rowspan='2'>Description</th>
                                                <th colspan='2'>Actual</th>
                                                <th colspan='2'>RKAP</th>
                                                <th rowspan='2'>Actual sd</th>
                                                <th colspan='2'>Achiev</th>
                                                <th rowspan='2'>Growth</th>
                                            </tr>
                                            <tr>
                                                <th>sd $tahunLalu</th>
                                                <th>Full $tahunLalu</th>
                                                <th>sd $tahun</th>
                                                <th>Full $tahun</th>
                                                <th>sd</th>
                                                <th>Full</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            $tbl_summary
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>";


        echo"</div>
            </div>
        </div>";
        // echo "</section>";

        // echo"
        // <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        // <script>
        // var OneSignal = window.OneSignal || [];
        // OneSignal.push(function() {
        //     OneSignal.init({
        //     appId: '1ca967ab-9375-4edf-abfd-12a22fc073a5',
        //     });
        // });
        // </script>
        // ";

		echo "
        <script type='text/javascript'>

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.DataTable').DataTable();
        
        function drawChart(type, selector, series_array, categories, exporting, click_callback){
            if (typeof categories === 'undefined') { categories = null; }
            if (typeof exporting === 'undefined') { exporting = false; }
            if (typeof click_callback === 'undefined') { click_callback = null; }
            var options = {
                chart: {
                    renderTo: selector,
                    type: type
                },
                title:{
                    text:''
                },
                exporting: { 
                    enabled: exporting
                },
                series: [],
                xAxis: {
                    title: {
                        text: null
                    },
                    categories: []
                },
                yAxis:{
                    title: {
                        text: null
                    },
                },
                credits: {
                    enabled: false
                },
            };
            
            options.series = series_array;
            options.xAxis.categories = categories;
        
            if(click_callback !== null){
                options.plotOptions = click_callback;
            }
        
            new Highcharts.Chart(options);
        }

        
        drawChart('column', 'home_rev_chart1', [".json_encode($result['series']['REVENUE'])."], ".json_encode($result['categories']).");

        drawChart('pie', 'home_rev_chart2', [".json_encode($result['grouping']['REVENUE'])."]);
        drawChart('pie', 'home_gp_chart1', [".json_encode($result['grouping']['GP'])."]);
        drawChart('column', 'home_gp_chart2', [".json_encode($result['series']['GP'])."], ".json_encode($categories).");
        drawChart('column', 'home_opex_chart1', [".json_encode($result['series']['OPEX'])."], ".json_encode($categories).");
        drawChart('column', 'home_others_chart1', [".json_encode($result['series']['OTHERS'])."], ".json_encode($categories).");
        drawChart('column', 'home_ni_chart1', [".json_encode($result['series']['Net Income'])."], ".json_encode($categories).");

        </script>";

        echo"
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        <script>

            var OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
                OneSignal.init({
                    appId: '1ca967ab-9375-4edf-abfd-12a22fc073a5',
                });

                // OneSignal.getUserId().then(function(userId) {
                //     alert('Your OneSignal ID: '+userId);
                // });
                
                OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
                    if (isEnabled){
                        // console.log('Push notifications are enabled!');
                        // alert('enabled');
                         
                        OneSignal.getUserId().then(function(userId) {
                            // alert('OneSignal User ID:', userId);   
                            // AJAX REGISTER
                            
                            $.ajax({
                                type: 'POST',
                                url: 'dashSiaga.php?fx=saveid',
                                dataType: 'json',
                                data: {nik:'".$nik."', kode_lokasi:'".$kode_lokasi."', token:userId},
                                // contentType: false,
                                // cache: false,
                                // processData: false, 
                                success:function(result){
                                    console.log(result.msg);
                                },
                                fail: function(xhr, textStatus, errorThrown){
                                    alert('request failed:'+textStatus);
                                }
                            });
                        });
                    }
                    else{
                        console.log('Push notifications are not enabled');    
                    }  
                });
            });
        </script>";
       
        

		return "";
	}
	
}
?>
