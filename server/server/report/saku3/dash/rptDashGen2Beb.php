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
class server_report_saku3_dash_rptDashGen2Beb extends server_report_basic
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
        
        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/mobile";

        echo"
        <div class='row'>
            <div class='col-md-12'>
                <div class='panel'>
                    <div class='panel-heading'>
                        <div class='pull-right navigasi' style='margin-right: -1rem; margin-top: ; padding-bottom: 1rem;'>
                        <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                        <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                        <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                        </div>
                        <h3 class='text-left' style='font-weight: bold'>Laporan Neraca Lajur (Beban)</h3>
                        <h5 class='text-right' style='margin-top: -2.8rem;'>Lokasi : 32 &nbsp;&nbsp;$periode</h5>
                    </div>
                    <hr/>
                    <div class='panel-body'>
                        <center><h4 style='font-weight: bold; margin-top: -2rem;'>Nama Perusahaan</h4></center>
                        <center><h4 style='font-weight: bold; color: #000000;'>Neraca Lajur Beban</h4></center>
                        <center><h6 style='font-weight: bold; color: #000000;'>Periode $periode</h6></center>

                        <table class='table table-bordered' id='tableNrcSaldo'>
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
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
                <script>
                $('.navigasi').on('click','#close_btn',function(){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGeneral2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
                });
                $('.navigasi').on('click','#back_btn',function(){
                    window.history.go(-1); return false;
                });
        
                $('.navigasi').on('click','#refresh_btn',function(){
                    location.reload();
                });

                function sepNumPas(x){
                    var num = parseInt(x);
                    var parts = num.toString().split('.');
                    var len = num.toString().length;
                    // parts[1] = parts[1]/(Math.pow(10, len));
                    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                    return parts.join(',');
                }

                function loadService(index,method,url,param=null){
                    $.ajax({
                        type: method,
                        url: url,
                        dataType: 'json',
                        data: {'periode':'$periode','param':param},
                        success:function(result){    
                            if(result.status){
                                switch(index){
                                    case 'getNeracaSaldo' :
                                        var html='';
                                        var no=1;
                                        var so_awal_debet=0;
                                        var so_awal_kredit=0;
                                        var debet=0;
                                        var kredit=0;
                                        var so_akhir_debet=0;
                                        var so_akhir_kredit=0;
                                        for(var i=0;i<result.daftar.length;i++){
                                            var line=result.daftar[i];
                                            so_awal_debet=so_awal_debet+parseInt(line.so_awal_debet);
                                            so_awal_kredit=so_awal_kredit+parseInt(line.so_awal_kredit);
                                            debet=debet+parseInt(line.debet);
                                            kredit=kredit+parseInt(line.kredit);
                                            so_akhir_debet=so_akhir_debet + parseInt(line.so_akhir_debet);
                                            so_akhir_kredit=so_akhir_kredit + parseInt(line.so_akhir_kredit);
                                            html += `<tr>
                                                <td style='text-align: center;'>`+no+`</td>
                                                <td style='text-align: center;'>`+line.kode_akun+`</td>
                                                <td style='text-align: left;'>`+line.nama+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.so_awal_debet)+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.so_awal_kredit)+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.debet)+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.kredit)+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.so_akhir_debet)+`</td>
                                                <td style='text-align: right;'>`+sepNumPas(line.so_akhir_kredit)+`</td>	
                                            </tr>`;
                                            no++;
                                        }
                                        html +=`<tr>
                                            <td style='text-align: right; font-weight: bold;' colspan='3'>Total</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(so_awal_debet)+`</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(so_awal_kredit)+`</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(debet)+`</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(kredit)+`</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(so_akhir_debet)+`</td>
                                            <td style='text-align: right; font-weight: bold'>`+sepNumPas(so_akhir_kredit)+`</td>
                                        </tr>`;
                                        $('#tableNrcSaldo tbody').append(html);
                                    break;
                                }
                            }
                        }
                    });
                }

                function initDash(){
                    loadService('getNeracaSaldo','GET','$root_ser/generalDash.php?fx=getNeracaSaldo','Beban');
                }

                initDash();

                </script>
        ";
       
        

		return "";
	}
	
}
?>
