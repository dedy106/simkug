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

function toMilyar($x) {
    $nil = $x / 1000000000;
    return number_format($nil,2,",",".") . " M";
}

function getNamaBulan($no_bulan){
    switch ($no_bulan){
        case 1 : case '1' : case '01': $bulan = "Januari"; break;
        case 2 : case '2' : case '02': $bulan = "Februari"; break;
        case 3 : case '3' : case '03': $bulan = "Maret"; break;
        case 4 : case '4' : case '04': $bulan = "April"; break;
        case 5 : case '5' : case '05': $bulan = "Mei"; break;
        case 6 : case '6' : case '06': $bulan = "Juni"; break;
        case 7 : case '7' : case '07': $bulan = "Juli"; break;
        case 8 : case '8' : case '08': $bulan = "Agustus"; break;
        case 9 : case '9' : case '09': $bulan = "September"; break;
        case 10 : case '10' : case '10': $bulan = "Oktober"; break;
        case 11 : case '11' : case '11': $bulan = "November"; break;
        case 12 : case '12' : case '12': $bulan = "Desember"; break;
        default: $bulan = null;
    }

    return $bulan;
}
class server_report_saku3_dash_rptDashYptGroup extends server_report_basic
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

        if($periode ==""){
            $res = $dbLib->execute("select max(periode) as periode from periode");

            $periode = $res->fields[0];
        }else{
            $periode = $tmp[1];
        }
       
        $tahun = substr($periode,0,4);
        $tahunSebelum = intval($tahun) - 1;
            
        $bln=substr($periode,5,2);
        $bulan=getNamaBulan($bln);
        $bulan_rev=getNamaBulan($bln-1);

        $logomain = $path.'/web/img/yspt2.png';
        $mainname = $_SESSION['namaPP'];

        // if($tmp[5] != ''){
        //     $periode=$tmp[5];
        // }

        $kode_fs="FS1";

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);

       
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        echo "
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    
            body {
                font-family: 'Roboto', sans-serif !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
                font-weight: normal !important;
            }
            .judul-box{
                font-weight:bold;
                font-size:18px !important;
            }
            .inner{
                padding:5px !important;
            }
        
            .box-nil{
                margin-bottom: 20px !important;
            }
        
            text {
                text-decoration: none !important;
            }
            .highcharts-button-box+text {
                fill: white !important;
            }
            .tab-content{
                background:#f6f6f6 !important
            }
            .nav-tabs,.nav-tabs > li.active > a{
                background:#f6f6f6 !important
            }
            
        </style>
		<div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;'>
                <div class='navbar-custom-menu'>
                    <ul class='nav nav-tabs'>
                    <li class='active'><a href='#tab_1' data-toggle='tab'>Dashboard YoY</a></li>
                    <li><a href='#tab_2' data-toggle='tab'>Dashboard MoM</a></li>
                    <li class='pull-right'>
                        <a href='#' data-toggle='control-sidebar' id='open-sidebar' class='btn btn-info btn-sm' style='padding:5px;border-radius:5px'><i class='fa fa-filter'></i> Filter</a>
                    </li>
                    <li class='pull-right'><a class='btn btn-info btn-sm' href='#' id='btn-refresh' style='padding:5px;border-radius:5px'><i class='fa fa-undo'></i> Refresh</a>
                    </li>
                    <li class='dropdown notifications-menu pull-right'>
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
                    </ul>
                </div>
            </div>
            <div class='panel-body' style='padding:0px'>
                <div class='nav-tabs-custom'>
                <div class='tab-content'>
                    <div class='tab-pane active' id='tab_1'>";

                         //SQL Pendapatan
                    $sqlbox1 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T'
                    order by rowindex ";
                    $rsAcvp =$dbLib->execute($sqlbox1);
                    $rowAcvp = $rsAcvp->FetchNextObject($toupper);
                    $persenPend = ($rowAcvp->n4/$rowAcvp->n2)*100;


                    $sqlbox2 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T'
                    order by rowindex ";
                    $rsAcvb =$dbLib->execute($sqlbox2);
                    $rowAcvb = $rsAcvb->FetchNextObject($toupper);
                    $persenBeb = ($rowAcvb->n4/$rowAcvb->n2)*100;

                    $sqlbox3 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T'
                    order by rowindex ";
                    $rsAcvs =$dbLib->execute($sqlbox3);
                    $rowAcvs = $rsAcvs->FetchNextObject($toupper);
                    $persenSHU = ($rowAcvs->n4/$rowAcvs->n2)*100;

                    $sqlboxOR = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_neraca = 'OL'
                    order by rowindex ";
                    $rsOR =$dbLib->execute($sqlboxOR);
                    $rowOR = $rsOR->FetchNextObject($toupper);

                    echo"
                        <div class='row'>
                            <div class='col-md-3 '>
                                <a href='#'>
                                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                        <div class='inner'>
                                            <p class='judul-box' style='text-align:left;'> Pendapatan </p>
                                            <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenPend,2,",",".")."%</h3>
                                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                            <hr style='margin: 5px 0px 25px 0px;'>
                                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $tahunSebelum </p>
                                            <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                            ".toMilyar($rowAcvp->n5)."</h3>
                                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $tahun </p>
                                            <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvp->n2)."</h3>
                                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $tahun</p>
                                            <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvp->n4)."</h3>
                                        </div>
                                    </div>
                                </a>
                        </div>
                    <!-- Beban -->
                        <div class='col-md-3 '>
                            <a href='#'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> Beban </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenBeb,2,',','.')." %</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                    <hr style='margin: 5px 0px 25px 0px;'>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $tahunSebelum</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                    ".toMilyar($rowAcvb->n5)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $tahun </p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvb->n2)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvb->n4)."</h3>
                                </div>
                            </div>
                            </a>
                        </div>
                    <!-- SHU -->
                        <div class='col-md-3 '>
                            <a href='#'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> SHU </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenSHU,2,',','.')."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                    <hr style='margin: 5px 0px 25px 0px;'>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $tahunSebelum</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                    ".toMilyar($rowAcvs->n5)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvs->n2)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd ".$tahun."</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvs->n4)."</h3>
                                </div>
                            </div>
                            </a>
                        </div>
                    <!-- OR -->
                        <div class='col-md-3 '>
                            <a href='#'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n5,2,',','.')." %</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Actual Ytd ".$tahunSebelum."</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class='col-md-3 '>
                            <a href='#'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n2,2,',','.')."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Budget Ytd $tahun</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class='col-md-3 '>
                            <a href='#'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n4,2,',','.')."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Actual Ytd $tahun</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <!-- GRAFIK  -->
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = \"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroupPend','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                                \">
                                <div class='box-header'>
                                    <i class='fa fa-pie-chart'></i>
                                    <h3 class='box-title'>Pendapatan</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                </a>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_pend'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = \"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroupBeban','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                                \">
                                <div class='box-header'>
                                    <i class='fa fa-pie-chart'></i>
                                    <h3 class='box-title'>Beban</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                </a>
                                <div class='box-body box-click' id='box-beb'>
                                    <div id='dash_chart_beb'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>SHU</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                             
                                </div>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_shu'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>OR</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_or'></div>
                                </div>
                            </div>
                        </div>
                        <!-- </ GRAFIK -->";
           
            //PENDAPATAN
            $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n2,a.n4, (a.n4/a.n2)*100 as rasio
            from (select c.kode_bidang,c.nama, 
                    sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
            from exs_neraca_pp a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
            where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T'
            group by c.kode_bidang,c.nama ) a
            union all
            select a.kode_lokasi,a.skode as nama, b.n2,b.n4,(b.n4/b.n2)*100 as rasio 
            from lokasi a
            left join ( select a.kode_lokasi, 
                    sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
            from exs_neraca a
            where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15')
            group by a.kode_lokasi
            ) b on a.kode_lokasi=b.kode_lokasi
            where b.n2 > 0";
        
            $rsPend =$dbLib->execute($sql);
        
            while($row = $rsPend->FetchNextObject(false)){
               
                $pend[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                
            }  
        
            $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n2,a.n4,(a.n4/a.n2)*100 as rasio
            from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                           case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                           case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                           case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                           case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                           case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                           case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                           case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                           case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                   from exs_neraca_pp a
                   inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                   where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5')
           ) a
           where a.n2 <> 0
           order by a.kode_lokasi
            ";
            $rsDrilP =$dbLib->execute($sql);
        
            $grouping = array();
            while($row = $rsDrilP->FetchNextObject(false)){
               
                if (!isset($grouping[$row->kode_lokasi])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                $grouping[$row->kode_lokasi] = $tmp;
        
                // $pendDril[] = array('y'=>floatval($row->n4),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                
            }  
            $result["series"] = $grouping;
        
            $result["grouping"] = array($result["series"]["1"],$result["series"]["2"],$result["series"]["3"],$result["series"]["4"],$result["series"]["5"]);
        
        
            //BEBAN
        
            $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n2,a.n4, (a.n4/a.n2)*100 as rasio
            from (select c.kode_bidang,c.nama, 
                    sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
            from exs_neraca_pp a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
            where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='58T'
            group by c.kode_bidang,c.nama ) a
            union all
            select a.kode_lokasi,a.skode as nama, b.n2,b.n4,(b.n4/b.n2)*100 as rasio 
            from lokasi a
            left join ( select a.kode_lokasi, 
                    sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                    sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
            from exs_neraca a
            where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T' and a.kode_lokasi in ('03','08','11','13','14','15')
            group by a.kode_lokasi
            ) b on a.kode_lokasi=b.kode_lokasi
            where b.n2 <> 0";
        
            $rsBeb =$dbLib->execute($sql);
        
            while($row = $rsBeb->FetchNextObject(false)){
               
                $Beb[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                
            }  
        
           
            $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n2,a.n4,(a.n4/a.n2)*100 as rasio
            from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                           case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                           case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                           case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                           case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                           case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                           case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                           case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                           case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                   from exs_neraca_pp a
                   inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                   where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T' and b.kode_bidang in ('1','2','3','4','5')
           ) a
           where a.n2 <> 0
           order by a.kode_lokasi
            ";
            $rsDrilB =$dbLib->execute($sql);
        
        
            $grouping2 = array();
            while($row = $rsDrilB->FetchNextObject(false)){
               
                if (!isset($grouping2[$row->kode_lokasi])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                $grouping2[$row->kode_lokasi] = $tmp;
        
                // $pendDril[] = array('y'=>floatval($row->n4),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                
            }  
            $result["series2"] = $grouping2;
        
            $result["grouping2"] = array($result["series2"]["1"],$result["series2"]["2"],$result["series2"]["3"],$result["series2"]["4"],$result["series2"]["5"]);
        
            //SHU
        
             $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n2,a.n4, (a.n4/a.n2)*100 as rasio
             from (select c.kode_bidang,c.nama, 
                     sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
             from exs_neraca_pp a
             inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
             inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
             where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='59T'
             group by c.kode_bidang,c.nama ) a
             union all
             select a.kode_lokasi,a.skode as nama, b.n2,b.n4,(b.n4/b.n2)*100 as rasio 
             from lokasi a
             left join ( select a.kode_lokasi, 
                     sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
             from exs_neraca a
             where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T' and a.kode_lokasi in ('03','08','11','13','14','15')
             group by a.kode_lokasi
             ) b on a.kode_lokasi=b.kode_lokasi
             where b.n2 <> 0";
         
             $rsSHU =$dbLib->execute($sql);
         
             while($row = $rsSHU->FetchNextObject(false)){
                
                 $SHU[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                 
             }  
        
             
            $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n2,a.n4,(a.n4/a.n2)*100 as rasio
            from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                           case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                           case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                           case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                           case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                           case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                           case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                           case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                           case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                   from exs_neraca_pp a
                   inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                   where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T' and b.kode_bidang in ('1','2','3','4','5')
           ) a
           where a.n2 <> 0
           order by a.kode_lokasi
            ";
            
            $rsDrilS =$dbLib->execute($sql);
        
            $grouping3 = array();
            while($row = $rsDrilS->FetchNextObject(false)){
               
                if (!isset($grouping3[$row->kode_lokasi])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                $grouping3[$row->kode_lokasi] = $tmp;
        
                // $pendDril[] = array('y'=>floatval($row->n4),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                
            }  
            $result["series3"] = $grouping3;
        
            $result["grouping3"] = array($result["series3"]["1"],$result["series3"]["2"],$result["series3"]["3"],$result["series3"]["4"],$result["series3"]["5"]);
        
             //OR
             $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n2,a.n4, (a.n4/a.n2)*100 as rasio
             from (select c.kode_bidang,c.nama, 
                     sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
             from exs_neraca_pp a
             inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
             inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
             where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='OL'
             group by c.kode_bidang,c.nama ) a
             union all
             select a.kode_lokasi,a.skode as nama, b.n2,b.n4,(b.n4/b.n2)*100 as rasio 
             from lokasi a
             left join ( select a.kode_lokasi, 
                     sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
                     sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
             from exs_neraca a
             where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='OL' and a.kode_lokasi in ('03','08','11','13','14','15')
             group by a.kode_lokasi
             ) b on a.kode_lokasi=b.kode_lokasi
             where b.n2 <> 0";
         
             $rsOR =$dbLib->execute($sql);
         
             while($row = $rsOR->FetchNextObject(false)){
                
                 $OR[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                 
             } 
             
             
            $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n2,a.n4,(a.n4/a.n2)*100 as rasio
            from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                           case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                           case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                           case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                           case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                           case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                           case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                           case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                           case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                   from exs_neraca_pp a
                   inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                   where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL' and b.kode_bidang in ('1','2','3','4','5')
           ) a
           where a.n2 <> 0
           order by a.kode_lokasi
            ";
            
            $rsDrilO =$dbLib->execute($sql);
        
            $grouping4 = array();
            while($row = $rsDrilO->FetchNextObject(false)){
               
                if (!isset($grouping4[$row->kode_lokasi])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                $grouping4[$row->kode_lokasi] = $tmp;
        
                // $pendDril[] = array('y'=>floatval($row->n4),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                
            }  
            $result["series4"] = $grouping4;
        
            $result["grouping4"] = array($result["series4"]["1"],$result["series4"]["2"],$result["series4"]["3"],$result["series4"]["4"],$result["series4"]["5"]);
        
        
            echo"
                    </div>
                </div>
            <div>
           
            <script src='https://code.highcharts.com/modules/data.js'></script>
            <script src='https://code.highcharts.com/modules/drilldown.js'></script>
            <script type='text/javascript'>
   
            // Create the chart
            Highcharts.chart('dash_chart_pend', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'Click the slices to view detail.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.2f}%'
                        }
                    }
                },
                credits: {
                        enabled: false
                    },
        
                tooltip: {
                    headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                    pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
        
                series: [
                    {
                        name: 'Pendapatan',
                        colorByPoint: true,
                        data: ".json_encode($pend)."
                        
                    }
                ],
                drilldown: {
                    series:  ".json_encode($result["grouping"]).",
                    drillUpButton :{
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        theme: {
                            fill: '#00c0ef',
                            'stroke-width': 1,
                            stroke: '#00c0ef',
                            r: 3,
                            states: {
                                hover: {
                                    fill: '#00acd6'
                                },
                                select: {
                                    stroke: '#00acd6',
                                    fill: '#00acd6'
                                }
                            }
                        }
                    }
        
                }
            });
        
        
            Highcharts.chart('dash_chart_beb', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'Click the slices to view detail.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.2f}%'
                        }
                    }
                },
                credits: {
                        enabled: false
                    },
        
                tooltip: {
                    headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                    pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
        
                series: [
                    {
                        name: 'Beban',
                        colorByPoint: true,
                        data: ".json_encode($Beb)."
                        
                    }
                ],
                drilldown: {
                    series: ".json_encode($result["grouping2"]).",
                    drillUpButton :{
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        theme: {
                            fill: '#00c0ef',
                            'stroke-width': 1,
                            stroke: '#00c0ef',
                            r: 3,
                            states: {
                                hover: {
                                    fill: '#00acd6'
                                },
                                select: {
                                    stroke: '#00acd6',
                                    fill: '#00acd6'
                                }
                            }
                        }
                    }
        
                }
            });
        
        
            Highcharts.chart('dash_chart_shu', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'Click the slices to view detail.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.2f}%'
                        }
                    }
                },
                credits: {
                        enabled: false
                    },
        
                tooltip: {
                    headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                    pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
        
                series: [
                    {
                        name: 'SHU',
                        colorByPoint: true,
                        data: ".json_encode($SHU)."
                        
                    }
                ],
                drilldown: {
                    series: ".json_encode($result["grouping3"]).",
                    drillUpButton :{
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        theme: {
                            fill: '#00c0ef',
                            'stroke-width': 1,
                            stroke: '#00c0ef',
                            r: 3,
                            states: {
                                hover: {
                                    fill: '#00acd6'
                                },
                                select: {
                                    stroke: '#00acd6',
                                    fill: '#00acd6'
                                }
                            }
                        }
                    }
        
                }
            });
        
            Highcharts.chart('dash_chart_or', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'Click the slices to view detail.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.2f}%'
                        }
                    }
                },
                credits: {
                        enabled: false
                    },
        
                tooltip: {
                    headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                    pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
        
                series: [
                    {
                        name: 'OR',
                        colorByPoint: true,
                        data: ".json_encode($OR)."
                        
                    }
                ],
                drilldown: {
                    series: ".json_encode($result["grouping4"]).",
                    drillUpButton :{
                        relativeTo: 'spacingBox',
                        position: {
                            y: 0,
                            x: 0
                        },
                        theme: {
                            fill: '#00c0ef',
                            'stroke-width': 1,
                            stroke: '#00c0ef',
                            r: 3,
                            states: {
                                hover: {
                                    fill: '#00acd6'
                                },
                                select: {
                                    stroke: '#00acd6',
                                    fill: '#00acd6'
                                }
                            }
                        }
                    }
        
                }
            });
            </script>
                    </div>
                    <div class='tab-pane' id='tab_2'>";
                    //SQL Pendapatan
                    $sqlbox1 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T'
                    order by rowindex ";
                    $rsAcvp = $dbLib->execute($sqlbox1);
                    $rowAcvp = $rsAcvp->FetchNextObject($toupper);
                    $persenPend = ($rowAcvp->n6/$rowAcvp->n7)*100;


                    $sqlbox2 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T'
                    order by rowindex ";
                    $rsAcvb = $dbLib->execute($sqlbox2);
                    $rowAcvb = $rsAcvb->FetchNextObject($toupper);
                    $persenBeb = ($rowAcvb->n6/$rowAcvb->n7)*100;

                    $sqlbox3 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T'
                    order by rowindex ";
                    $rsAcvs = $dbLib->execute($sqlbox3);
                    $rowAcvs = $rsAcvs->FetchNextObject($toupper);
                    $persenSHU = ($rowAcvs->n6/$rowAcvs->n7)*100;

                    $sqlboxOR = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
                    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca a
                    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_neraca = 'OL'
                    order by rowindex ";
                    $rsOR = $dbLib->execute($sqlboxOR);
                    $rowOR = $rsOR->FetchNextObject($toupper);

                    echo"<div class='row'>
                    <!-- Pendapatan -->
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> Pendapatan </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenPend,2,",",".")." %</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                    <hr style='margin: 5px 0px 25px 0px;'>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan_rev $tahun </p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                    ".toMilyar($rowAcvp->n9)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $bulan $tahun </p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvp->n7)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvp->n6)."</h3>
                                </div>
                            </div>
                            </a>
                        </div>";
                        echo"
                    <!-- Beban -->
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> Beban </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenBeb,2,",",".")."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                    <hr style='margin: 5px 0px 25px 0px;'>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan_rev $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                    ".toMilyar($rowAcvb->n9)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $bulan $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvb->n7)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvb->n6)."</h3>
                                </div>
                            </div>
                            </a>
                        </div>
                    <!-- SHU -->
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> SHU </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($persenSHU,2,",",".")."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Achivement</p>
                                    <hr style='margin: 5px 0px 25px 0px;'>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan_rev $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>
                                    ".toMilyar($rowAcvs->n9)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Budget Ytd $bulan $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvs->n7)."</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Actual Ytd $bulan $tahun</p>
                                    <h3 id='home_kas_box' class='box-nil' style='font-size:25px;text-align:left'>".toMilyar($rowAcvs->n6)."</h3>
                                </div>
                            </div>
                            </a>
                        </div>
                    <!-- OR -->
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n9,2,",",".")."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Actual Ytd $bulan_rev $tahun</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n7,2,",",".")."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Budget Ytd $bulan $tahun </p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <div class='col-md-3 '>
                            <a href='#' class='small-box-footer'  >
                            <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                                <div class='inner'>
                                    <p class='judul-box' style='text-align:left;'> OR </p>
                                    <h3 id='home_kas_box' style='font-size:25px;text-align:center;margin-bottom:0px'>".number_format($rowOR->n6,2,",",".")."%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center'>Actual Ytd $bulan $tahun</p>
                                </div>
                            </div>
                            </a>
                        </div>
                        <!-- GRAFIK  -->
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = \"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroupPendMoM','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                                \">
                                <div class='box-header'>
                                    <i class='fa fa-pie-chart'></i>
                                    <h3 class='box-title'>Pendapatan</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                </a>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_pend2'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = \"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroupBebanMoM','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                                \">
                                <div class='box-header'>
                                    <i class='fa fa-pie-chart'></i>
                                    <h3 class='box-title'>Beban</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                </a>
                                <div class='box-body box-click' id='box-beb'>
                                    <div id='dash_chart_beb2'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>SHU</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                            
                                </div>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_shu2'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>OR</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Achivement (%)</p>
                                </div>
                                <div class='box-body box-click' id='box-pend'>
                                    <div id='dash_chart_or2'></div>
                                </div>
                            </div>
                        </div>
                        <!-- </ GRAFIK -->";
                    
                //PENDAPATAN
                $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
                from (select c.kode_bidang,c.nama, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca_pp a
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T' and a.n7 <> 0
                group by c.kode_bidang,c.nama ) a
                where (a.n6/a.n7)*100 <> 0
                union all
                select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
                from lokasi a
                left join ( select a.kode_lokasi, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca a
                where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
                group by a.kode_lokasi
                ) b on a.kode_lokasi=b.kode_lokasi
                where (b.n6/b.n7)*100 <> 0 ";

                $rsPend = $dbLib->execute($sql);

                while($row = $rsPend->FetchNextObject(false)){
                
                    $pend[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                    
                }  

                $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
                from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                            case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                            case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                            case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                            case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                            case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                            case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                            case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                            case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca_pp a
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5')
                ) a
                where a.n7 <> 0
                order by a.kode_lokasi
                ";
                $rsDrilP = $dbLib->execute($sql);

                $grouping = array();
                while($row = $rsDrilP->FetchNextObject(false)){
                
                    if (!isset($grouping[$row->kode_lokasi])){
                        $tmp["data"][]="";
                        $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                    }
                    $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                    $grouping[$row->kode_lokasi] = $tmp;

                    // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                    
                }  
                $result["series"] = $grouping;

                $result["grouping"] = array($result["series"]["1"],$result["series"]["2"],$result["series"]["3"],$result["series"]["4"],$result["series"]["5"]);


                //BEBAN

                $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
                from (select c.kode_bidang,c.nama, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca_pp a
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='58T' and a.n7 <> 0
                group by c.kode_bidang,c.nama ) a
                where (a.n6/a.n7)*100 <> 0
                union all
                select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
                from lokasi a
                left join ( select a.kode_lokasi, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca a
                where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
                group by a.kode_lokasi
                ) b on a.kode_lokasi=b.kode_lokasi
                where (b.n6/b.n7)*100 <> 0";

                $rsBeb = $dbLib->execute($sql);

                while($row = $rsBeb->FetchNextObject(false)){
                
                    $Beb[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                    
                }  

                $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
                from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                            case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                            case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                            case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                            case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                            case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                            case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                            case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                            case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca_pp a
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T' and b.kode_bidang in ('1','2','3','4','5')
                ) a
                where a.n7 <> 0
                order by a.kode_lokasi
                ";
                $rsDrilB = $dbLib->execute($sql);

                $grouping2 = array();
                while($row = $rsDrilB->FetchNextObject(false)){
                
                    if (!isset($grouping2[$row->kode_lokasi])){
                        $tmp["data"][]="";
                        $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                    }
                    $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                    $grouping2[$row->kode_lokasi] = $tmp;

                    // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                    
                }  
                $result["series2"] = $grouping2;

                $result["grouping2"] = array($result["series2"]["1"],$result["series2"]["2"],$result["series2"]["3"],$result["series2"]["4"],$result["series2"]["5"]);

                //SHU

                $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
                from (select c.kode_bidang,c.nama, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca_pp a
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='59T' and a.n7 <> 0
                group by c.kode_bidang,c.nama ) a
                where (a.n6/a.n7)*100 <> 0
                union all
                select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
                from lokasi a
                left join ( select a.kode_lokasi, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca a
                where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
                group by a.kode_lokasi
                ) b on a.kode_lokasi=b.kode_lokasi
                where (b.n6/b.n7)*100 <> 0";
            
                $rsSHU = $dbLib->execute($sql);
            
                while($row = $rsSHU->FetchNextObject(false)){
                    
                    $SHU[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                    
                }  

                
                $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
                from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                            case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                            case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                            case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                            case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                            case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                            case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                            case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                            case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca_pp a
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T' and b.kode_bidang in ('1','2','3','4','5')
                ) a
                where a.n7 <> 0
                order by a.kode_lokasi
                ";
                
                $rsDrilS = $dbLib->execute($sql);

                $grouping3 = array();
                while($row = $rsDrilS->FetchNextObject(false)){
                
                    if (!isset($grouping3[$row->kode_lokasi])){
                        $tmp["data"][]="";
                        $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                    }
                    $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                    $grouping3[$row->kode_lokasi] = $tmp;
                    
                }  
                $result["series3"] = $grouping3;

                $result["grouping3"] = array($result["series3"]["1"],$result["series3"]["2"],$result["series3"]["3"],$result["series3"]["4"],$result["series3"]["5"]);

                //OR
                $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
                from (select c.kode_bidang,c.nama, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca_pp a
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='OL' and a.n7 <> 0
                group by c.kode_bidang,c.nama ) a
                where (a.n6/a.n7)*100 <> 0
                union all
                select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
                from lokasi a
                left join ( select a.kode_lokasi, 
                        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                        sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
                from exs_neraca a
                where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='OL' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
                group by a.kode_lokasi
                ) b on a.kode_lokasi=b.kode_lokasi
                where (b.n6/b.n7)*100 <> 0";
            
                $rsOR = $dbLib->execute($sql);
            
                while($row = $rsOR->FetchNextObject(false)){
                    
                    $OR[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                    
                } 
                
                
                $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
                from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                            case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                            case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                            case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                            case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                            case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                            case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                            case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                            case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                    from exs_neraca_pp a
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL' and b.kode_bidang in ('1','2','3','4','5')
                ) a
                where a.n7 <> 0
                order by a.kode_lokasi
                ";
                
                $rsDrilO = $dbLib->execute($sql);

                $grouping4 = array();
                while($row = $rsDrilO->FetchNextObject(false)){
                
                    if (!isset($grouping4[$row->kode_lokasi])){
                        $tmp["data"][]="";
                        $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
                    }
                    $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
                    $grouping4[$row->kode_lokasi] = $tmp;

                    // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
                    
                }  
                $result["series4"] = $grouping4;

                $result["grouping4"] = array($result["series4"]["1"],$result["series4"]["2"],$result["series4"]["3"],$result["series4"]["4"],$result["series4"]["5"]);


                 echo"</div>
                    </div>
                <div>
            
                <script src='https://code.highcharts.com/modules/data.js'></script>
                <script src='https://code.highcharts.com/modules/drilldown.js'></script>
                <script type='text/javascript'>

                // Create the chart
                Highcharts.chart('dash_chart_pend2', {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Click the slices to view detail.'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: {point.y:.2f}%'
                            }
                        }
                    },
                    credits: {
                            enabled: false
                        },

                    tooltip: {
                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },

                    series: [
                        {
                            name: 'Pendapatan',
                            colorByPoint: true,
                            data: ".json_encode($pend)."
                            
                        }
                    ],
                    drilldown: {
                        series: ".json_encode($result["grouping"]).",
                        drillUpButton :{
                            relativeTo: 'spacingBox',
                            position: {
                                y: 0,
                                x: 0
                            },
                            theme: {
                                fill: '#00c0ef',
                                'stroke-width': 1,
                                stroke: '#00c0ef',
                                r: 3,
                                states: {
                                    hover: {
                                        fill: '#00acd6'
                                    },
                                    select: {
                                        stroke: '#00acd6',
                                        fill: '#00acd6'
                                    }
                                }
                            }
                        }

                    }
                });


                Highcharts.chart('dash_chart_beb2', {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Click the slices to view detail.'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: {point.y:.2f}%'
                            }
                        }
                    },
                    credits: {
                            enabled: false
                        },

                    tooltip: {
                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },

                    series: [
                        {
                            name: 'Beban',
                            colorByPoint: true,
                            data: ".json_encode($Beb)."
                            
                        }
                    ],
                    drilldown: {
                        series: ".json_encode($result["grouping2"]).",
                        drillUpButton :{
                            relativeTo: 'spacingBox',
                            position: {
                                y: 0,
                                x: 0
                            },
                            theme: {
                                fill: '#00c0ef',
                                'stroke-width': 1,
                                stroke: '#00c0ef',
                                r: 3,
                                states: {
                                    hover: {
                                        fill: '#00acd6'
                                    },
                                    select: {
                                        stroke: '#00acd6',
                                        fill: '#00acd6'
                                    }
                                }
                            }
                        }

                    }
                });


                Highcharts.chart('dash_chart_shu2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Click the slices to view detail.'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: {point.y:.2f}%'
                            }
                        }
                    },
                    credits: {
                            enabled: false
                        },

                    tooltip: {
                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },

                    series: [
                        {
                            name: 'SHU',
                            colorByPoint: true,
                            data: ".json_encode($SHU)."
                            
                        }
                    ],
                    drilldown: {
                        series: ".json_encode($result["grouping3"]).",
                        drillUpButton :{
                            relativeTo: 'spacingBox',
                            position: {
                                y: 0,
                                x: 0
                            },
                            theme: {
                                fill: '#00c0ef',
                                'stroke-width': 1,
                                stroke: '#00c0ef',
                                r: 3,
                                states: {
                                    hover: {
                                        fill: '#00acd6'
                                    },
                                    select: {
                                        stroke: '#00acd6',
                                        fill: '#00acd6'
                                    }
                                }
                            }
                        }

                    }
                });

                Highcharts.chart('dash_chart_or2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Click the slices to view detail.'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: {point.y:.2f}%'
                            }
                        }
                    },
                    credits: {
                            enabled: false
                        },

                    tooltip: {
                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },

                    series: [
                        {
                            name: 'OR',
                            colorByPoint: true,
                            data: ".json_encode($OR)."
                            
                        }
                    ],
                    drilldown: {
                        series: ".json_encode($result["grouping4"]).",
                        drillUpButton :{
                            relativeTo: 'spacingBox',
                            position: {
                                y: 0,
                                x: 0
                            },
                            theme: {
                                fill: '#00c0ef',
                                'stroke-width': 1,
                                stroke: '#00c0ef',
                                r: 3,
                                states: {
                                    hover: {
                                        fill: '#00acd6'
                                    },
                                    select: {
                                        stroke: '#00acd6',
                                        fill: '#00acd6'
                                    }
                                }
                            }
                        }

                    }
                });
                </script>";

                    echo"
                    </div>
                    <aside class='control-sidebar control-sidebar-dark' style='margin-top:42px;padding-bottom:500px;padding-top:10px;background: #ccc;'>
                        <div class='tab-content' style='background:#cccccc !important'>
                            <div class='tab-pane active' id='control-sidebar-home-tab'>
                                <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                                    <option value=''>Pilih Periode</option>";
                                    $resPer = $dbLib->execute("select distinct periode from exs_neraca where kode_lokasi='$kode_lokasi' order by periode desc");

                                    while ($row = $resPer->FetchNextObject(false)){
                                        if($row->periode == $periode){
                                            $selected = "selected";
                                        }else{
                                            $selected = "";
                                        }
                                        echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                                    }
                                    
                            echo"
                                </select>
                                <a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='cursor:pointer; max-height:30px;margin-top: 5px;
                                margin-right: 0px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
        ";

        echo"<script>
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
        
        $('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
            var per = $('#dash_periode').val();
            
            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroup','','$kode_lokasi/'+per+'/$kode_pp/$nik/$kode_fs');
            
        });
        
        </script>";
    
		return "";
	}
	
}
?>
