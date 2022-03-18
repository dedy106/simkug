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
class server_report_saku3_dash_rptDashYspte2Det2 extends server_report_basic
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
        $nik=$tmp[2];
        $kode_pp=$tmp[3];
        $kode_fs=$tmp[4];
        $kunci=$tmp[5];
        $key=$tmp[6];

        $AddOnLib=new server_util_AddOnLib();
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/yspt.png";
        
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";
        
        $root_ser = $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";
        
        // echo $key4;

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
            </style>
            <div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <div class='pull-right navigasi' style='margin-right: -1rem; margin-top: ; padding-bottom: 1rem;'>
                            <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                            <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                            <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                        </div>
                    </div>";
        switch($kunci){
            case "bk" :
            echo"
                    <div class='col-md-12'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Jurnal</h3>
                        </div>
                        <div class='box-body'>
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Tanggal
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        <span id ='no_bukti'></span>
                                        </strong>
                                        <br>
                                        <span id ='periode'></span>
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped' id='table-jurnal'>
                                    <thead>
                                    <tr style='background:#247ed5;color:white'>
                                        <th width='30' >NO</th>
                                        <th width='100' >KODE AKUN </th>
                                        <th width='200' >NAMA AKUN </th>
                                        <th width='270' >KETERANGAN</th>
                                        <th width='60' >PP</th>
                                        <th width='100' >DEBET</th>
                                        <th width='100' >KREDIT</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->"; 
                        echo"
                        </div>
                    </div>";
            break;
            case "piu" :
               
                echo "<div align='center'>"; 
                echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                        <td><table class='table table-bordered table-striped' width='800' id='KartuPiuBody'>
                            <thead>
                            <tr>
                                <td colspan='6' style='padding:3px;background: white; border-right: 1px solid white;' colspan='3'>
                                    <table width='100%' class='table no-border' id='KartuPiuHead'>
                                    <tbody>
                                    </tbody>
                                    </table>
                                </td>
                                <td width='100' colspan='3' style='background:white'><img src='$pathfoto' width='236' height='80' /></td>
                            </tr>
                            <tr align='center' style='background:#247ed5;color:white'>
                                <td width='20' class='header_laporan'>No</td>
                                <td width='60' class='header_laporan'>Tanggal </td>
                                <td width='80' class='header_laporan'>No Bukti</td>
                                <td width='60' class='header_laporan'>Modul</td>
                                <td width='60' class='header_laporan'>Parameter</td>
                                <td width='150' class='header_laporan'>Keterangan</td>
                                <td width='90' class='header_laporan'>Tagihan</td>
                                <td width='90' class='header_laporan'>Pembayaran</td>
                                <td width='90' class='header_laporan'>Saldo</td>
                            </tr>
                            </thead>
                            <tbody class='isi'>
                            </tbody>
                            </table>
                        </td>    
                    </tr>
                    </table>
                    </div>"; 
			echo "<br>"; 
		

            break;
            case "pdd" :
            echo "<div align='center'>";
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td>";
                    echo "
                    <table  class='table table-bordered table-striped' id='KartuPDDBody'>
                    <thead>
                    <tr>
                        <td colspan='6' style='padding:3px;border-right:1px solid white;background:white'>
                        <table width='100%'  class='table no-border' id='KartuPDDHead'>
                        <tbody>
                        </tbody>
                        </table></td>
                        <td width='100' colspan='3' style='background:white'><img src='$pathfoto' width='236' height='80' /></td>
                    </tr>
                        <tr align='center' bgcolor='#247ed5' style='color:white'>
                        <td width='20' class='header_laporan'>No</td>
                        <td width='60' class='header_laporan'>Tanggal </td>
                        <td width='80' class='header_laporan'>No Bukti</td>
                        <td width='60' class='header_laporan'>Modul</td>
                        <td width='60' class='header_laporan'>Parameter</td>
                        <td width='150' class='header_laporan'>Keterangan</td>
                        <td width='90' class='header_laporan'>Tagihan</td>
                        <td width='90' class='header_laporan'>Pembayaran</td>
                        <td width='90' class='header_laporan'>Saldo</td>
                    </tr>
                    </thead>
                    <tbody class='isi'>
                    </tbody>
                    </table>
                    </td>
            </tr>
            </table>"; 
                
                echo "</div>";
                
            break;

        }
                     

        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>
        function sepNum(x){
            var num = parseFloat(x).toFixed(2);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }
        function sepNumPas(x){
            var num = parseInt(x);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }

        function toJuta(x) {
            var nil = x / 1000000;
            return sepNum(nil) + ' JT';
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
                            case 'getJurnal' :
                                $('#table-jurnal tbody').html('');
                                $('#no_bukti').html(result.data.no_bukti);
                                $('#periode').html(result.data.periode);
                                var html='';
                                var x=1;
                                var tot_debet=0;
                                var tot_kredit=0;
                                var debet =0;
                                var kredit =0;
                                for (var i=0; i<result.data2.length;i++)
                                {
                                    var line = result.data2[i];
                                    debet = sepNumPas(line.debet);
                                    kredit = sepNumPas(line.kredit);
                                    tot_debet += +line.debet;
                                    tot_kredit += +line.kredit;
                                    html+=`<tr>
                                        <td>`+x+`</td>
                                        <td >`+line.kode_akun+`</td>
                                        <td >`+line.nama_akun+`</td>
                                        <td >`+line.keterangan+`</td>
                                        <td >`+line.kode_pp+`</td>
                                        <td align='right'>`+line.debet+`</td>
                                        <td align='right'>`+line.kredit+`</td>
                                    </tr>`;
                                    x++;
                                }
                                tot_debet1=sepNumPas(tot_debet);
                                tot_kredit1=sepNumPas(tot_debet);
                                html+=`<tr>
                                        <td colspan='5'  align='right'><b>Total</b></td>
                                        <td  align='right'><b>`+tot_debet1+`</b></td>
                                        <td  align='right'><b>`+tot_kredit1+`</b></td>
                                    </tr>`;
                                
                                $('#table-jurnal tbody').append(html);
                            break;
                            case 'KartuPiu':
                            var head ='';

                            $('#KartuPiuHead tbody').html('');
                            
                            $('#KartuPiuBody tbody').html('');
                            head +=`
                                <tr>
                                    <td width='60' class='header_laporan'>NIS</td>
                                    <td width='400' class='header_laporan'>: `+result.data.nis+`</td>
                                </tr>
                                <tr>
                                    <td width='60' class='header_laporan'>ID Bank</td>
                                    <td width='400' class='header_laporan'>: `+result.data.id_bank+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Nama</td>
                                    <td class='header_laporan'>: `+result.data.nama+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Kelas</td>
                                    <td class='header_laporan'>: `+result.data.kode_kelas+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Angkatan</td>
                                    <td class='header_laporan'>: `+result.data.kode_akt+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Jurusan</td>
                                    <td class='header_laporan'>: `+result.data.kode_jur+` - `+result.data.nama_jur+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Saldo Piutang</td>
                                    <td class='header_laporan'>: `+sepNumPas(result.data.so_akhir)+`</td>
                                </tr>`;
                                
                                $('#KartuPiuHead tbody').append(head);

                                var body='';

                                var tagihan=0;
                                var bayar=0;
                                var saldo=0;
                                var no=1;
                                
                                for (var i =0;i<result.data2.length;i++)
                                {	
                                    var line = result.data2[i];
                                    tagihan+=+line.tagihan;
                                    bayar+=+line.bayar;
                                    saldo+=+line.tagihan-line.bayar;
                                    modul=line.modul; 
                                    
                                   body +=`<tr>
                                    <td class='isi_laporan' align='center'>`+no+`</td>
                                    <td class='isi_laporan'>`+line.tgl+`</td>
                                    <td class='isi_laporan'>`+line.no_bukti+`</td>
                                    <td class='isi_laporan'>`+modul+`</td>
                                    <td class='isi_laporan'>`+line.kode_param+`</td>
                                    <td class='isi_laporan'>`+line.keterangan+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(line.tagihan)+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(line.bayar)+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(saldo)+`</td>
                                    </tr>`;
                                    no++;
                                }
                                body +=`<tr>
                                    <td align='right' class='header_laporan' colspan='6'>Total</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(tagihan)+`</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(bayar)+`</td>
                                    <td align='right' class='header_laporan'>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align='right' class='header_laporan' colspan='8'>Saldo</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(saldo)+`</td>
                                </tr>`;

                                
                                $('#KartuPiuBody tbody.isi').append(body);
                            break;
                            case 'KartuPDD':
                            var head ='';

                            $('#KartuPDDHead tbody').html('');
                            
                            $('#KartuPDDBody tbody').html('');
                            head +=`
                                <tr>
                                    <td width='60' class='header_laporan'>NIS</td>
                                    <td width='400' class='header_laporan'>: `+result.data.nis+`</td>
                                </tr>
                                <tr>
                                    <td width='60' class='header_laporan'>ID Bank</td>
                                    <td width='400' class='header_laporan'>: `+result.data.id_bank+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Nama</td>
                                    <td class='header_laporan'>: `+result.data.nama+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Kelas</td>
                                    <td class='header_laporan'>: `+result.data.kode_kelas+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Angkatan</td>
                                    <td class='header_laporan'>: `+result.data.kode_akt+`</td>
                                </tr>
                                <tr>
                                    <td class='header_laporan'>Jurusan</td>
                                    <td class='header_laporan'>: `+result.data.kode_jur+` - `+result.data.nama_jur+`</td>
                                </tr>`;
                                
                                $('#KartuPDDHead tbody').append(head);

                                var body='';

                                var debet=0;
                                var kredit=0;
                                var saldo=0;
                                var no=1;
                                
                                for (var i =0;i<result.data2.length;i++)
                                {	
                                    var line = result.data2[i];
                                    debet+=+line.debet;
                                    kredit+=+line.kredit;
                                    saldo+=+line.debet-line.kredit;
                                    modul=line.modul; 
                                    
                                   body +=`<tr>
                                    <td class='isi_laporan' align='center'>`+no+`</td>
                                    <td class='isi_laporan'>`+line.tgl+`</td>
                                    <td class='isi_laporan'>`+line.no_bukti+`</td>
                                    <td class='isi_laporan'>`+modul+`</td>
                                    <td class='isi_laporan'>`+line.kode_param+`</td>
                                    <td class='isi_laporan'>`+line.keterangan+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(line.debet)+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(line.kredit)+`</td>
                                    <td align='right' class='isi_laporan'>`+sepNumPas(saldo)+`</td>
                                    </tr>`;
                                    no++;
                                }
                                body +=`<tr>
                                    <td align='right' class='header_laporan' colspan='6'>Total</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(debet)+`</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(kredit)+`</td>
                                    <td align='right' class='header_laporan'>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align='right' class='header_laporan' colspan='8'>Saldo</td>
                                    <td align='right' class='header_laporan'>`+sepNumPas(saldo)+`</td>
                                </tr>`;

                                
                                $('#KartuPDDBody tbody.isi').append(body);
                            break;
                           
                        }
                    }
                }
            });
        }
        

        $('.navigasi').on('click','#close_btn',function(){
            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$kunci');
        });
        $('.navigasi').on('click','#back_btn',function(){
            window.history.go(-1); return false;
        });

        $('.navigasi').on('click','#refresh_btn',function(){
            location.reload();
        });

        ";
        switch($kunci){
            case "bk" :
            echo"

            function initDash(){
                loadService('getJurnal','GET','$root_ser/dashSekolah.php?fx=getJurnal','$key');
            }

            ";
            break;
            case "piu":
            echo"
            
            function initDash(){
                loadService('KartuPiu','GET','$root_ser/dashSekolah.php?fx=getKartuPiu','$key');
            }
            ";
            break;
            case "pdd":
            echo"
            
            function initDash(){
                loadService('KartuPDD','GET','$root_ser/dashSekolah.php?fx=getKartuPDD','$key');
            }
            ";
            break;
        }
        echo"
        
        initDash();
        </script>
        ";
        
		return "";
	}
	
}
?>
