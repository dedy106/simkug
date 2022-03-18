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
class server_report_saku3_dash_rptDashSppdA extends server_report_basic
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
        
        $sqlBox = "select a.kode_proses,a.nama,isnull(b.jumlah,0) as jumlah
        from lab_proses a
        left join (select a.progress,a.kode_lokasi,count(isnull(a.no_spj,0)) as jumlah
                from (select a.kode_lokasi,a.no_spj,
                                case 
                                when a.progress in ('0','S') then '01'
                                when a.progress in ('1') then '02'
                                when a.progress in ('2') then '03'
                                when a.progress in ('3') then '04'
                                when a.progress in ('4') then '05'
                                when a.progress in ('Z') then '11'
                                when a.progress in ('Z') then '11'
                                end as progress
                        from sp_spj_m a
                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik'
                        )a 
                    group by a.progress,a.kode_lokasi
                    union 
                    select a.progress,a.kode_lokasi,count(a.no_aju) as jumlah
                    from (select a.kode_lokasi,a.no_aju,
                                case 
                                    when a.progress in ('0') then '06'
                                    when a.progress in ('1') then '07'
                                    when a.progress in ('2') then '08'
                                    when a.progress in ('S') then '09'
                                    when a.progress in ('3','4') then '10'
                                end as progress
                        from it_aju_m a
                        inner join sp_stugas_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        inner join sp_spj_m c on b.no_stugas=c.no_stugas and b.kode_lokasi=c.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and c.nik_spj='$nik'
                    )a 
                    group by a.progress,a.kode_lokasi
                    )b on a.kode_proses=b.progress and a.kode_lokasi=b.kode_lokasi

        where a.kode_lokasi='$kode_lokasi' and a.modul = 'SPPD_APP'
        order by a.nu
                  ";

        $rs = $dbLib->execute($sqlBox);  

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Modul SPPD  
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
                <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px'><i class='fa fa-undo'> <span style='font-family:Arial'><b>Refresh</b></span></i></a>
                </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        while ($row = $rs->FetchNextObject($toupper=false)) {
            $jumlah=$row->jumlah;

        echo"       <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->nama."</p>
                                    <h3 id='home_kas_box'>".number_format($jumlah,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdDet2','','$kode_lokasi/$periode/$kode_pp/$nik/$row->kode_proses/server_report_saku3_dash_rptDashSppdA');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }
         echo"           
                </div>"; 
         echo"
                <div id='sai_home_grafik'>
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-warning'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pengajuan SPPD per bulan</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_sppd'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";    
      
        echo"</div>
            </div>
        </div>";
          
        $sqlLB = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then nilai_trans+nilai_uhar else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then nilai_trans+nilai_uhar else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then nilai_trans+nilai_uhar else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then nilai_trans+nilai_uhar else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then nilai_trans+nilai_uhar else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then nilai_trans+nilai_uhar else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then nilai_trans+nilai_uhar else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then nilai_trans+nilai_uhar else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then nilai_trans+nilai_uhar else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then nilai_trans+nilai_uhar else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then nilai_trans+nilai_uhar else 0 end) n11,
        sum(case when substring(a.periode,5,2)='12' then nilai_trans+nilai_uhar else 0 end) n12	   
        from sp_spj_m a
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.progress='2' and (a.nik_app1='$nik' or a.nik_app2='$nik')
        group by a.kode_lokasi";

        $res = $dbLib->execute($sqlLB);
		while ($row = $res->FetchNextObject(false)){
            $SPPD["series"][] = array("name" =>"Pengajuan SPPD", "data" => array(
                                            round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                            round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                            round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                            round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                        ));
        }	

		echo "
        <script type='text/javascript'>

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        var options = {
            chart: {
                renderTo: 'dash_main_chart_sppd',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($SPPD["series"]).",
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

        </script>";

		return "";
	}
	
}
?>
