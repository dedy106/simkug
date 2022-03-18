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


function toJuta($x) {
    $nil = $x / 1000000;
    return number_format($nil,2,",",".") . " JT";
}
class server_report_saku3_dash_rptDashGeneralDet extends server_report_basic
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
        
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $box=$tmp[5];

        $kode_fs="FS1";

        $path = "http://".$_SERVER["SERVER_NAME"]."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

        
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        echo"
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
        </style>
        <div class='panel'>
            <div class='panel-body'>
                <div class='panel-heading'>
                    <div class='pull-right navigasi' style='margin-right: -1rem; margin-top: ; padding-bottom: 1rem;'>
                        <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                        <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                        <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                    </div>
                </div>";

                switch($box) {
                    case "kas"  :
                echo"
                <div class='col-md-12'>
                    <div class='box-header with-border'>
                    <i class='fa fa-book'></i>
                    <h3 class='box-title'>Buku Besar</h3>
                    </div>
                    <div class='box-body'>";
                $per= $periode;
                
                $tahun = substr($per,0,4);
                $bulan = substr($per,5,2);
                
                $sql2 = "SELECT DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,'$tahun-$bulan-01')+1,0))";
                
                $rs=$dbLib->execute($sql2);
                $temp = explode(" ",$rs->fields['0']);
                $tgl_akhir=$temp[0];
                
                if($tmp[6] == "All" OR $tmp[6] == ""){
                    
                    $kode_akun="";
                    $filterakun="";
                }else{
                    $kode_akun=$tmp[6];
                    $filterakun=" and c.kode_akun='$kode_akun' ";
                }
                
                if($tmp[7] == "" AND $tmp[8] == ""){
                    $filtertgl="";
                }else if ($tmp[7] != ""  AND $tmp[8] == ""){
                    $filtertgl=" and a.tanggal between '".$tmp[7]."' AND '".$tgl_akhir."' ";
                }else if ($tmp[7] == "" AND $tmp[8] != ""){
                    $filtertgl=" and a.tanggal between '$tahun-$bulan-01' AND '".$tmp[8]."' ";
                }else{
                    $filtertgl=" and a.tanggal between '".$tmp[7]."' AND '".$tmp[8]."' ";
                }
                
                $sql="select c.kode_lokasi,c.kode_akun,d.nama,c.so_awal,c.periode,case when c.so_awal>=0 then c.so_awal else 0 end as so_debet,case when c.so_awal<0 then c.so_awal else 0 end as so_kredit
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB06','DB07') and c.so_akhir<>0 $filterakun 
                order by c.kode_akun";
                
                $rs=$dbLib->execute($sql);
                
                echo"<div class='row invoice-info' style='background:#f6f6f6;margin-left:0px;margin-right:0px'>";
                
                    echo"
                    <div class='col-sm-2 invoice-col'>
                        <address>
                            <strong>
                            Periode
                            </strong>
                            <br>
                            $per
                        </address>
                    </div>
                    <div class='col-sm-3 invoice-col'>
                        <address style='margin-bottom:0px'>
                            <strong>
                            Tgl Awal
                            </strong>
                            <br>
                            <div class='input-group date col-sm-9' style=''>
                                <div class='input-group-addon'>
                                <i class='fa fa-calendar'></i>
                                </div>
                                <input name='tgl_awal' class='form-control' value='".$tmp[7]."' id='tgl-awal'>
                            </div>
                        </address>
                    </div>
                    <div class='col-sm-3 invoice-col'>
                        <address style='margin-bottom:0px'>
                            <strong>
                            Tgl Akhir
                            </strong>
                            <br>
                            <div class='input-group date col-sm-9' style=''>
                                <div class='input-group-addon'>
                                <i class='fa fa-calendar'></i>
                                </div>
                                <input name='tgl_akhir' class='form-control' id='tgl-akhir' value='".$tmp[8]."'>
                            </div>
                        </address>
                    </div>
                    <div class='col-sm-2 invoice-col'>
                        <address>
                            <strong>
                            Kode Akun
                            </strong>
                            <br>
                            <style>
                            .selectize-input{
                                border:none;
                                border-bottom:1px solid #8080806b;
                            }
                            </style>";
                    
                            echo"
                            <select class='form-control input-sm selectize' id='kd_akun' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                            <option value=''>Pilih Akun</option> ";
                            
                            if($kode_akun =="" OR $kode_akun =="All"){ 
                                echo " <option value='All' selected >All</option>";
                            }else{
                                echo " <option value=".$kode_akun." selected>".$kode_akun."</option>";
                            }
                            
                            $res = $dbLib->execute("select distinct c.kode_akun,d.nama
                            from db_grafik_d a
                            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                            inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB06','DB07')  and c.so_akhir<>0 
                            order by c.kode_akun");
                            
                            echo " <option value='All'>All</option>";
                            while ($row = $res->FetchNextObject(false)){
                                echo " <option value=".$row->kode_akun." >".$row->kode_akun."</option>";
                            }
                    
                    echo" </select>
                        </address>
                    </div>
                    <div class='col-sm-2 invoice-col'>
                        <strong>
                        &nbsp;
                        </strong>
                        <address>
                        <a class='btn btn-primary' style='cursor:pointer' id='bTampil'>Tampil</a>
                        </address>
                    </div>        
                </div>
                <br> ";
                
                while($row = $rs->FetchNextObject($toupper=false)){
                    echo"
                    <div class='row'>
                        <div class='col-xs-12 table-responsive'>
                            <table class='table table-striped' id='table-BB'>
                                <thead>
                                    <tr style='background:#247ed5;color:white'>
                                    <th width='100' height='23' >No Bukti</th>
                                    <th width='80' height='23' >No Dokumen</th>
                                    <th width='60' >Tanggal</th>
                                    <th width='250' >Keterangan</th>
                                    <th width='60' >Kode PP</th>
                                    <th width='90' >Debet</th>
                                    <th width='90' >Kredit</th>
                                    <th width='90' >Balance</th>
                                    </tr>
                                </thead>
                                <tbody>";
                    
                                $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen
                                from gldt a
                                where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode' and a.kode_pp='$kode_pp' $filtertgl
                                order by a.tanggal,a.no_bukti,a.dc";
                                
                                $rs1 = $dbLib->execute($sql);
                                
                                $saldo=$row->so_awal;
                                $debet=0;
                                $kredit=0;
                    
                            echo" <tr>
                                    <td colspan='6'>Kode Akun : $row->kode_akun | $row->nama</td>
                                    <td height='23' class='header_laporan' align='right'><b>Saldo Awal<b> </td>
                                    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
                                </tr>";
                                while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $saldo=$saldo + $row1->debet - $row1->kredit;	
                                    $debet=$debet+$row1->debet;
                                    $kredit=$kredit+$row1->kredit;	
                                    echo "<tr><td valign='top' >";
                                    // echo "<a style='color:#4285F4;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$kunci|$row1->no_bukti');\">$row1->no_bukti</a>";
                                    echo $row1->no_bukti;
                                    echo "</td>
                                    <td valign='top' >".$row1->no_dokumen."</td>
                                    <td height='23' valign='top' >".$row1->tgl."</td>
                                    <td valign='top' >".$row1->keterangan."</td>
                                    <td valign='top'  >".$row1->kode_pp."</td>
                                    <td valign='top'  align='right'>".number_format($row1->debet,0,',','.')."</td>
                                    <td valign='top'  align='right'>".number_format($row1->kredit,0,',','.')."</td>
                                    <td valign='top'  align='right'>".number_format($saldo,0,',','.')."</td>
                                    </tr>";
                                    
                                }
                            echo "<tr>
                                    <td height='23' colspan='5' valign='top'  align='right'><b>Total<b>&nbsp;</td>
                                    <td valign='top'  align='right'><b>".number_format($debet,0,',','.')."</b></td>
                                    <td valign='top'  align='right'><b>".number_format($kredit,0,',','.')."</b></td>
                                    <td valign='top'  align='right'><b>".number_format($saldo,0,',','.')."</b></td>
                                </tr>
                            </table>
                            <br>";
                        echo
                        "</tbody>
                    </table>";
                    echo"</div>
                    </div>";    
                }
                echo"
                <script> 

                $('.navigasi').on('click','#close_btn',function(){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGeneral','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                });
                $('.navigasi').on('click','#back_btn',function(){
                    // alert('test');
                    window.history.go(-1); return false;
                });
                $('.navigasi').on('click','#refresh_btn',function(){
                    
                    location.reload();
                });

                var from = $('#tgl-awal').datepicker({ autoclose: true,format:'yyyy-mm-dd',startDate: new Date('$tahun-$bulan-01'),endDate: new Date('$tgl_akhir') }).on('changeDate', function(e){
                    $('#tgl-akhir').datepicker({ autoclose: true,format:'yyyy-mm-dd'}).datepicker('setStartDate', e.date).datepicker('setEndDate',new Date('$tgl_akhir')).focus();
                });

                $('.datepicker, .daterangepicker,.tgl-awal').on('keydown keyup keypress', function(e){
                    e.preventDefault();
                    return false;
                });

                $('#bTampil').click(function(){
                    var akun = $('#kd_akun')[0].selectize.getValue();
                    var tgl1 = $('#tgl-awal').val();
                    var tgl2 = $('#tgl-akhir').val();
                    
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGeneralDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$box|'+akun+'|'+tgl1+'|'+tgl2);

                });
                </script>";

                break;
        }
        echo"
            </div>
        </div>";

        // echo"TEST";
       
        

		return "";
	}
	
}
?>
