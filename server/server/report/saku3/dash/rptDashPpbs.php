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
class server_report_saku3_dash_rptDashPpbs extends server_report_basic
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
        $kode_fs=$tmp[4];
        $tahun=substr($periode,0,4);
        $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n13 else b.n13 end) as nilai
                   from db_grafik_d a
                   inner join agg_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                   where a.kode_lokasi='$kode_lokasi' and b.tahun='2020' and b.kode_fs='FS1'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB21','DB22','DB23','DB24') and a.kode_lokasi='$kode_lokasi'
                  ";
	
        $rs = $dbLib->execute($sqlBox);  

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' ";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan      <div class='navbar-custom-menu pull-right padding:0px'>
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
                    ";
        
                echo"
                        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->nama."</p>
                                    <h3 id='home_kas_box' style='font-size:22px'>".number_format($nilai,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPpbsDet','','$kode_lokasi|$periode|all|$row->kode_grafik|$kode_pp|$nik|$row->nama|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }

       $sql = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n13 else b.n13 end as nilai2, c.rumus, c.nama as nama_rasio
        from db_rasio_d a
        inner join agg_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
        inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and b.tahun='2020' and c.flag_box='1' order by a.kode_rasio";

        $boxras = $dbLib->execute($sql);
        
        while ($row = $boxras->FetchNextObject(false)){
            $nil[] =(array)$row;
        }
        
        $dfr = array();

        for($i=0; $i<count($nil); $i++){
            if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
                $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
            }

            $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
                'kode_neraca'=>$nil[$i]['kode_neraca'],
                'nilai2'=>$nil[$i]['nilai2']
            );
        }

        foreach($dfr as $d){
                $p = '';
                for($z=0; $z<count($d['par']); $z++){
                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";

                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];
                }
                $kode=$d['nama_rasio'];
         echo  "<div class='col-md-15 col-md-3'>
                    <div class='small-box bg-aqua'>
                        <div class='inner'>
                            <center>
                                <p>".$d['nama_rasio']."</p>
                                <h3 id='home_kas_box'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa fa-bank'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashBangtelDet','','$kode_lokasi|$periode|all|$kode|$kode_pp|$nik|OR');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                    </div>
                </div>";             
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
                                <h3 class='box-title'>Laba Rugi</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_labarugi'></div>
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
                        $resPer = $dbLib->execute("select distinct periode from periode where kode_lokasi='$kode_lokasi' order by periode");

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
       case when a.jenis_akun='Pendapatan' then -a.n1 else a.n1 end n1,
	   case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end n2,
	   case when a.jenis_akun='Pendapatan' then -a.n3 else a.n3 end n3,
	   case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end n4,
	   case when a.jenis_akun='Pendapatan' then -a.n5 else a.n5 end n5,
	   case when a.jenis_akun='Pendapatan' then -a.n6 else a.n6 end n6,
	   case when a.jenis_akun='Pendapatan' then -a.n7 else a.n7 end n7,
	   case when a.jenis_akun='Pendapatan' then -a.n8 else a.n8 end n8,
	   case when a.jenis_akun='Pendapatan' then -a.n9 else a.n9 end n9,
	   case when a.jenis_akun='Pendapatan' then -a.n10 else a.n10 end n10,
       case when a.jenis_akun='Pendapatan' then -a.n11 else a.n11 end n11,
	   case when a.jenis_akun='Pendapatan' then -a.n12 else a.n12 end n12,
	   case when a.jenis_akun='Pendapatan' then -a.n13 else a.n13 end n13 
from agg_neraca a
inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
where a.kode_lokasi='03' and a.tahun='2020' and b.kode_grafik='DB24' and a.kode_fs='FS1'";

        $res = $dbLib->execute($sqlLB);
		while ($row = $res->FetchNextObject(false)){
            $LB["series"][] = array("name" =>"Laba Rugi", "data" => array(
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
                renderTo: 'dash_main_chart_labarugi',
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
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashBangtel','','$kode_lokasi/'+periode+'/all/$row->kode_grafik/$kode_pp/$nik/$row->nama');
                }
            // } 
           
        });
        </script>";

		return "";
	}
	
}
?>
