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
class server_report_saku3_dash_rptDashPbh extends server_report_basic
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
        
        $sqlBox1 = " select count(*) as jum from pbh_pb_m where progress='0' and kode_lokasi='$kode_lokasi'";
        $rs = $dbLib->execute($sqlBox1);  
        $sqlBox2 = " select count(*) as jum from pbh_pb_m where progress='1' and kode_lokasi='$kode_lokasi'";
        $rs1 = $dbLib->execute($sqlBox2);  
        $sqlBox3 = " select count(*) as jum from pbh_pb_m where progress='3' and kode_lokasi='$kode_lokasi'";
        $rs2x = $dbLib->execute($sqlBox3);  
        $sqlBox4 = " select count(*) as jum from pbh_pb_m where progress='3' and kode_lokasi='$kode_lokasi'";
        $rs3x = $dbLib->execute($sqlBox4); 
        $sqlBox5 = " select count(*) as jum from pbh_pb_m where progress='2' and kode_lokasi='$kode_lokasi'";
        $rs4x = $dbLib->execute($sqlBox5);  
        // echo $rs3x->fields[0];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);
		
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
                            <i class='fa fa-users text-aqua'></i> $row->pesan
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#'>View all</a></li>
                    </ul>
                </li>
                <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:0px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </li>
                <li>
                    <a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:0px 15px 10px 10px'><i class='fa fa-gears'></i></a>
                </li>
                </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red','green');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
        // while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[0]."'>
                            <div class='inner'>
                                <center>
                                    <p>Pengajuan</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rs->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[0]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[1]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rs1->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[1]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
     echo"       <div class='col-md-15 col-md-3'>
                    <div class='small-box bg-".$color[4]."'>
                        <div class='inner'>
                            <center>
                                <p>SPB</p>
                                <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rs4x->fields[0],0,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa ".$icon[4]."'></i></div>
                             <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k5');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                    </div>
                </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[2]."'>
                            <div class='inner'>
                                <center>
                                    <p>Pembayaran</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rs2x->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[2]."'></i></div>
                                 <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
      
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[3]."'>
                            <div class='inner'>
                                <center>
                                    <p>Selesai</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rs3x->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[3]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k4');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        // }

         echo"           
                </div>"; 
            
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Pengajuan</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_pengajuan'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";


            echo "<aside class='control-sidebar control-sidebar-dark' style='margin-top:40px;padding-bottom:500px;padding-top:20px'>
            <div class='tab-content'>
                <div class='tab-pane active' id='control-sidebar-home-tab'>
                    <select class='form-control input-sm' id='dash_lokasi' style='margin-bottom:5px;' hidden>
                        <option value=''>Pilih Lokasi</option>";

                        $resLok = $dbLib->execute("select distinct kode_lokasi from lokasi order by kode_lokasi");
                       
                        while ($row = $resLok->FetchNextObject(false)){
                            echo " <option value=".$row->kode_lokasi.">".$row->kode_lokasi."</option>";
                        }
				
                echo"  
                    </select>
                    <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
                        <option value=''>Pilih Periode</option>";
                        $resPer = $dbLib->execute("select distinct periode from gldt where kode_lokasi='$kode_lokasi' order by periode desc");

                        while ($row = $resPer->FetchNextObject(false)){
                            echo " <option value=".$row->periode.">".$row->periode."</option>";
                        }
                        
                echo"
                    </select>
                    <a class='btn btn-sm btn-default pull-right' id='dash_refresh' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                </div>
            </div>
            </aside>";

        echo"</div>
            </div>
        </div>";

        $sqlLB = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then nilai else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then nilai else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then nilai else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then nilai else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then nilai else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then nilai else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then nilai else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then nilai else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then nilai else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then nilai else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then nilai else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then nilai else 0 end) n12
        from pbh_pb_m a
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' 
        group by a.kode_lokasi";

        // echo $sqlLB;

        $res = $dbLib->execute($sqlLB);
		while ($row = $res->FetchNextObject(false)){
            $LB["series"][] = array("name" =>"Pengajuan", "data" => array(
                                            round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                            round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                            round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                            round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                        ));
        }	
                		
		echo "
        <script type='text/javascript'>

        $('#dash_lokasi').hide();

        var options = {
            chart: {
                renderTo: 'dash_main_chart_pengajuan',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($LB["series"]).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
            },
            yAxis:{
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            credits: {
                enabled: false
            },
        };

        options.plotOptions = {
            series: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;    
                            var kd= this.options.key;
                            // alert(kd);                        
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);


        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('click', '#open-sidebar', function(){
            
            if($('aside').hasClass('control-sidebar-open')){
                 $('aside').removeClass('control-sidebar-open');
            }else{
                 $('aside').addClass('control-sidebar-open');
            }
        });


        $('#control-sidebar-home-tab').on('click','#dash_refresh', function(){
            var lokasi = $('#dash_lokasi').val();
            var periode = $('#dash_periode').val();
            // alert(lokasi);
            // if (lokasi == '' && periode ==''){
            //     alert('Harap isi terlebih dahulu lokasi dan periode nya');
            // }else{
            //     if(lokasi == ''){
            //         alert('Harap isi terlebih dahulu lokasi nya');   
            //     }else 
                if(periode == ''){
                    alert('Harap isi terlebih dahulu periode nya');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbh','','$kode_lokasi/'+periode+'/all/$row->kode_grafik/$kode_pp/$nik/$row->nama');
                }
            // } 
           
        });
        </script>";

		return "";
	}
	
}
?>
