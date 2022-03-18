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

class server_report_saku3_dash_rptDashYptGroupPendMoM extends server_report_basic
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
        $nik=$tmp[2];
        $kode_pp=$tmp[3];
        $kode_fs=$tmp[4];
        $kunci=$tmp[5];
        
        $tahun = substr($periode,0,4);
        $tahunSebelum = intval($tahun) - 1;
        
        $bln=substr($periode,5,2);
        $bulan=getNamaBulan($bln);
        $bulan_rev=getNamaBulan($bln-1);

        //SQL Pendapatan
        $sqlbox1 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
        case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1,
        case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
        case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
        case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
        case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
        from exs_neraca a
        where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T'
        order by rowindex ";

        $rsAcvp =$dbLib->execute($sqlbox1);
        $rowAcvp = $rsAcvp->FetchNextObject($toupper);
        $persenAcvp = ($rowAcvp->n6/$rowAcvp->n7)*100;
        $persenMoMp = (($rowAcvp->n6/$rowAcvp->n9)-1)*100;
        
        // echo $sqlbox1;

        //MoM Growth List

        $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, ((a.n6/a.n9)-1)*100 as rasio
        from (select c.kode_bidang,c.nama, 
        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
        sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
        from exs_neraca_pp a
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
        where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T' and a.n9 <> 0
        group by c.kode_bidang,c.nama ) a
        union all
        select a.kode_lokasi,a.skode as nama, b.n7,b.n6,((b.n6/b.n9)-1)*100 as rasio 
        from lokasi a
        left join ( select a.kode_lokasi, 
        sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
        sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
        sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
        from exs_neraca a
        where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n9 <> 0
        group by a.kode_lokasi
        ) b on a.kode_lokasi=b.kode_lokasi
        where b.n9 <> 0";

        $rsMoM=$dbLib->execute($sql);


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
            
            .panel{
                background:#f6f6f6 !important
            }
        </style>
        <div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroup','','$kode_lokasi/$periode/$nik/$kode_pp/$kode_fs');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>
                    <div class='col-md-6'>
                        <h3 style='font-size: 30px;margin-top: 0px;margin-bottom: 0px;'>KOMPOSISI PENDAPATAN</h3>
                        <h4 style='font-size: 30px;margin-top: 0px;'>Periode $bulan $tahun</h4>
                    </div>
                    <div class='col-md-3'>
                        <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius: 10px;'>
                            <div class='inner' style='padding-top: 0px;padding: 0px 10px 10px 10px !important;'>
                                <p class='judul-box' style='text-align:left;font-size: 25px !important;margin-top: 0px;font-weight: normal;margin-bottom: 0px;'> Achivement </p>
                                <h3 id='home_kas_box' style='font-size:35px;margin-bottom:0px'>".number_format($persenAcvp,2,',','.')."%</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Pendapatan</p>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius: 10px;'>
                            <div class='inner' style='padding-top: 0px;padding: 0px 10px 10px 10px !important;'>
                                <p class='judul-box' style='text-align:left;font-size: 25px !important;margin-top: 0px;font-weight: normal;margin-bottom: 0px;'> MoM Growth </p>
                                <h3 id='home_kas_box' style='font-size:35px;margin-bottom:0px'>".number_format($persenMoMp,2,',','.')."%</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;'>Pendapatan</p>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-9'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                
                                <h3 class='box-title' style='font-weight: bold !important;'>Achivement (%)</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:left'>Unit Bisnis</p>
                            </div>
                            <div class='box-body box-click'>
                                <div id='dash_chart_acv'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;'>
                            <div class='inner' style='padding: 10px !important;'>
                                <h3 style='text-align:left;font-weight: bold !important;font-size: 18px;margin-bottom: 0px;'> MoM Growth (%) </h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:left'>Unit Bisnis</p>
                                <div class='table-responsive'>
                                    <table class='table no-border'>";
                                         while($row = $rsMoM->FetchNextObject(false)) {
                                          echo"   
                                             <tr>
                                                 <td>".$row->nama."</td>
                                                 <td class='text-right'>".number_format($row->rasio,2,',','.')."</td>
                                             </tr>";
                                         }
                                    echo"
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div align='center'>
                        <table class='table no-border' >
                        <tr>
                            <td align='center'  > 
                                <table class='table no-border' >
                                <style>
                                    /* .isi-td{
                                        border:1px solid black !important
                                    } */
                                </style>
                                    <tr bgcolor='#dd4b39' style='color:white'>
                                        <td width='400' rowspan='2' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;vertical-align:middle'>P&amp;L ITEMS (in Rp.Bn)</td>
                                        <td width='90' rowspan='2' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;vertical-align:middle'>Actual Ytd $bulan_rev $tahun </td>
                                        <td colspan='4' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;'>Ytd $bulan $tahun</td>
                                    </tr>
                                    <tr bgcolor='#dd4b39' style='color:white'>
                                        <td width='90' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Budget</td>
                                        <td width='90' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Actual</td>
                                        <td width='60' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Ach.</td>
                                        <td width='60' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;'>MoM Growth</td>
                                    </tr>";

                                    $sql="select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
                                case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
                                case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
                                case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
                                case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
                        from exs_neraca a
                        where modul='L' and kode_lokasi='20' and kode_fs='FS1' and periode='$periode'  and kode_neraca='57T'
                        order by rowindex";
                        $rs1 =$dbLib->execute($sql);
                        $p1=0;$p2=0;$p3=0;$p4=0;$p5=0;$p6=0;$p7=0;$p8=0;$p9=0; 
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $p1=$row1->n1; $p2=$row1->n7; $p3=$row1->n3; $p4=$row1->n6; $p5=$row1->n9; $p6=$row1->n6;
                            $p7=$row1->n7; $p8=$row1->n8; $p9=$row1->n9; 
                            $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                            if ($row1->n7!=0)
                            {
                                $persen1=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen7=(($row1->n6/$row1->n9)-1)*100;
                            }
                            if ($row1->n7!=0)
                            {
                                $persen3=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen6=(($row1->n6/$row1->n9)-1)*100;
                            }
                            echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'>PENDAPATAN OPERASIONAL</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                </tr>";
                        }
                        $sql="select c.kode_bidang,c.nama,
                                sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
                        from exs_neraca_pp a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                        where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5') 
                        group by c.kode_bidang,c.nama
                        order by c.kode_bidang";
                        $rs1 =$dbLib->execute($sql);
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                            if ($row1->n7!=0)
                            {
                                $persen1=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen7=(($row1->n6/$row1->n9)-1)*100;
                            }
                            if ($row1->n7!=0)
                            {
                                $persen3=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen6=(($row1->n6/$row1->n9)-1)*100;
                            }
                            echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'>Pendapatan $row1->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                </tr>";
                          
                            $sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
                                case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1,
                                case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                                case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                                case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                        from exs_neraca_pp a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang='$row1->kode_bidang'
                        order by a.rowindex";
                            
                            $rs2 =$dbLib->execute($sql);
                            while ($row2 = $rs2->FetchNextObject($toupper=false))
                            {
                                $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                                if ($row2->n7!=0)
                                {
                                    $persen1=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen7=(($row2->n6/$row2->n9)-1)*100;
                                }
                                if ($row2->n7!=0)
                                {
                                    $persen3=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen6=(($row2->n6/$row2->n9)-1)*100;
                                }
                                
                                echo "<tr>
                                <td class='isi_laporan isi-td'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                
                            </tr>";
                            }
                        }
                    
                    
                    $sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
                                case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                                case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                                case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                                case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                        from exs_neraca a
                        inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T'
                        order by a.kode_lokasi desc";
                    
                    $rs2 =$dbLib->execute($sql);
                    while ($row2 = $rs2->FetchNextObject($toupper=false))
                    {
                        $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                        if ($row2->n7!=0)
                                {
                                    $persen1=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen7=(($row2->n6/$row2->n9)-1)*100;
                                }
                                if ($row2->n7!=0)
                                {
                                    $persen3=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen6=(($row2->n6/$row2->n9)-1)*100;
                                }
                        echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'> Pendapatan $row2->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                
                                
                            </tr>";
                    }
                                echo " </table>";
                    echo "</td></tr>";
                    echo "</table>";
                    echo"
                    </div>
                    <aside class='control-sidebar control-sidebar-dark' style='margin-top:40px;padding-bottom:500px;padding-top:20px;background: #ccc;'>
                        <div class='tab-content'>
                            <div class='tab-pane active' id='control-sidebar-home-tab'>
                                <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
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
                                <a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>"; 
            
            
            //SQL Acv 
            $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
            from (select c.kode_bidang,c.nama, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
            from exs_neraca_pp a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
            where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T'
            group by c.kode_bidang,c.nama ) a
            union all
            select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
            from lokasi a
            left join ( select a.kode_lokasi, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
            from exs_neraca a
            where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15')
            group by a.kode_lokasi
            ) b on a.kode_lokasi=b.kode_lokasi
            where b.n7 > 0";

            $rsPend =$dbLib->execute($sql);

            while($row = $rsPend->FetchNextObject(false)){
                
                $pend[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
                
            }  

            $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
            from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
            case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
            case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end as n7, 
            case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
            case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
            from exs_neraca_pp a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5')
            ) a
            where a.n7 <> 0
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
            }  
            $result["series"] = $grouping;

            $result["grouping"] = array($result["series"]["1"],$result["series"]["2"],$result["series"]["3"],$result["series"]["4"],$result["series"]["5"]);

            echo"
            <script src='https://code.highcharts.com/modules/data.js'></script>
                <script src='https://code.highcharts.com/modules/drilldown.js'></script>
                <script type='text/javascript'>

                $('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
                    var per = $('#dash_periode').val();
                    
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptGroupPend','','$kode_lokasi/'+periode+'/$kode_pp/$nik/$kode_fs');
            
                    
                });

                
                // Create the chart
                Highcharts.chart('dash_chart_acv', {
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
                            name: 'Pendapatan',
                            colorByPoint: true,
                            data: ".json_encode($pend)."
                            
                        }
                    ],
                    drilldown: {
                        series: ".json_encode($result["grouping"]).",
                        drillUpButton :{
                            // position:{
                            //     verticalAlign:'top',
                            //     y: -50,
                            // },
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

        ";
        
		return "";
	}
	
}
?>
