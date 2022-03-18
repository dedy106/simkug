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
class server_report_saku3_dash_rptDashGenBeb extends server_report_basic
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
        <div class='row'>
            <div class='col-md-12'>
                <div class='panel'>
                    <div class='panel-heading'>
                        <div class='pull-right navigasi' style='margin-top: ; padding-bottom: 1rem;'>
                        <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                        <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                        <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                        </div>
                        <h3 class='text-left' style='font-weight: bold'>Laporan Neraca Lajur (Beban)</h3>
                        <h5 class='text-right' style='margin-top: -2.8rem;'>Lokasi : 32 &nbsp;&nbsp;".$periode."</h5>
                    </div>
                    <hr/>
                    <div class='panel-body'>
                        <center><h4 style='font-weight: bold; margin-top: -2rem;'>Nama Perusahaan</h4></center>
                        <center><h4 style='font-weight: bold; color: #000000;'>Neraca Lajur Beban</h4></center>
                        <center><h6 style='font-weight: bold; color: #000000;'>Periode ".$periode."</h6></center>
                        <table class='table table-bordered'>
                            <thead style='color: #ffffff; background-color: #247ed5;'>
                                <tr>
                                    <th rowspan='2' style='text-align: center; vertical-align:middle;width:5%'>No</th>
                                    <th rowspan='2' style='text-align: center; vertical-align:middle;width:10%'>Kode Akun</th>
                                    <th rowspan='2' style='text-align: center; vertical-align:middle;width:25%'>Nama Akun</th>
                                    <th colspan='2' style='text-align: center; vertical-align:middle;width:20%'>Saldo Awal</th>
                                    <th colspan='2' style='text-align: center; vertical-align:middle;width:20%'>Mutasi</th>
                                    <th colspan='2' style='text-align: center; vertical-align:middle;width:20%'>Saldo Akhir</th>
                                </tr>
                                <tr>
                                    <th style='text-align: center;width:10% '>Debet</th>
                                    <th style='text-align: center;width:10% '>Kredit</th>
                                    <th style='text-align: center;width:10% '>Debet</th>
                                    <th style='text-align: center;width:10% '>Kredit</th>
                                    <th style='text-align: center;width:10% '>Debet</th>
                                    <th style='text-align: center;width:10% '>Kredit</th>
                                </tr>
                            </thead>
                            <tbody>";
                                // $periode    = date('Y');
                                $kode_lokasi = '32';
                                // $pendapatan =$dbLib->execute("select a.kode_akun,b.nama, sum(a.so_awal) 'so_awal', sum(a.debet) 'debet', sum(a.kredit) 'kredit', 
                                //                     sum(a.so_akhir) 'so_akhir' from exs_glma a
                                //                     inner join masakun b on a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun
                                //                     where a.kode_lokasi = '$kode_lokasi' and b.jenis = 'Beban' and a.periode = '$periode'
                                //                     group by a.kode_akun,b.nama");

                                $pendapatan=$dbLib->execute("select a.kode_akun,b.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
                                case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
                                case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
                                case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
                                case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
                                 from exs_glma a
                                 left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                 where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.jenis='Beban'
                                 order by a.kode_akun");

                                 $no=1;
                                 $so_awal_debet=0;
                                 $so_awal_kredit=0;
                                 $debet=0;
                                 $kredit=0;
                                 $so_akhir_debet=0;
                                 $so_akhir_kredit=0;
                                 while ($row = $pendapatan->FetchNextObject($toupper=false))
                                 {
                                     $so_awal_debet=$so_awal_debet+$row->so_awal_debet;
                                     $so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
                                     $debet=$debet+$row->debet;
                                     $kredit=$kredit+$row->kredit;
                                     $so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
                                     $so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
                                echo"
                                <tr>
                                    <td style='text-align: center;'>$no</td>
                                    <td style='text-align: center;'>$row->kode_akun</td>
                                    <td style='text-align: left;'>$row->nama</td>
                                    <td style='text-align: right;'>".number_format($row->so_awal_debet,0,',','.')."</td>
                                    <td style='text-align: right;'>".number_format($row->so_awal_kredit,0,',','.')."</td>
                                    <td style='text-align: right;'>".number_format($row->debet,0,',','.')."</td>
                                    <td style='text-align: right;'>".number_format($row->kredit,0,',','.')."</td>
                                    <td style='text-align: right;'>".number_format($row->so_akhir_debet,0,',','.')."</td>
                                    <td style='text-align: right;'>".number_format($row->so_akhir_kredit,0,',','.')."</td>	
                                </tr>";
                                $no++;
                                } 
                                echo"
                                <tr>
                                    <td style='text-align: right; font-weight: bold;' colspan='3'>Total</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($so_awal_debet,0,',','.')."</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($so_awal_kredit,0,',','.')."</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($debet,0,',','.')."</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($kredit,0,',','.')."</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($so_akhir_debet,0,',','.')."</td>
                                    <td style='text-align: right; font-weight: bold'>".number_format($so_akhir_kredit,0,',','.')."</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
                <script>
                $('.navigasi').on('click','#close_btn',function(){
                    // alert('test');
                    window.history.go(-1); return false;
                });
                $('.navigasi').on('click','#back_btn',function(){
                    // alert('test');
                    window.history.go(-1); return false;
                });

                $('.navigasi').on('click','#refresh_btn',function(){
                    // alert('test');
                    location.reload();
                });

                </script>
        ";

        // echo"TEST";
       
        

		return "";
	}
	
}
?>
