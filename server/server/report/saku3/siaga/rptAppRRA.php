<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_rptAppRRA extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $no_app=$tmp[2];
        $status=$tmp[3];
        $jenis2=$tmp[4];

        // $kode_lokasi="01";
        // $nik="admin";
        // $no_app="01-RRA1905.0100";
        // $status="Approve";
        // $jenis="Approval VP";
        $sql="select a.no_app,convert(varchar,a.tanggal,103) as tanggal,a.modul,a.nik_app,b.nama,a.keterangan,a.periode,a.kode_lokasi
        from rra_app_m a
        inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_app";
        $rs = $dbLib->execute($sql);	
        // echo $sql;
		$i = 1;
		
        $AddOnLib=new server_util_AddOnLib();
        echo"<body onload='send()'>";
		echo $AddOnLib->judul_laporan("laporan approval",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='900'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='13' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Verifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_app</td>
        </tr>
	    <tr>
        <td class='header_laporan'>NIK Approve </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app - $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Modul   </td>
        <td class='header_laporan'>:&nbsp;$row->modul</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No Bukti </td>
    <td width='150' align='center' class='header_laporan'>Catatan </td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
   <td width='250' align='center' class='header_laporan'>Keterangan</td>
	<td width='100' align='center' class='header_laporan'>Status </td>
	
  </tr>
";
		
                $sql1="select a.modul,a.no_bukti,a.catatan,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,
                b.nik_buat,a.sts_pdrk
            from rra_app_d a
            inner join rra_pdrk_m b on a.no_bukti=b.no_pdrk and b.kode_lokasi=a.kode_lokbukti
            inner join karyawan d on b.nik_buat=d.nik and b.kode_lokasi=d.kode_lokasi 
            where a.no_app='$row->no_app' and a.kode_lokasi='$row->kode_lokasi'
            order by a.no_bukti ";

            // echo $sql1;
                    
                    $rs1 = $dbLib->execute($sql1);
                    $j=1;
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                    {
                        echo "<tr>
                <td align='center' class='isi_laporan'>$j</td>
                <td align='left' class='isi_laporan'>$row1->no_bukti</td>
                <td align='left' class='isi_laporan'>$row1->catatan</td>
                <td align='left' class='isi_laporan'>$row1->tanggal</td>
                <td align='left' class='isi_laporan'>$row1->keterangan</td>
                <td align='left' class='isi_laporan'>$row1->sts_pdrk</td>
                
            </tr>";
                    $j=$j+1;
                    }
                    
                echo " </table></td>
            </tr>
            
            </table><br>";
                        
			$i=$i+1;
		}
       
        
        // $mail=new server_util_mail();
		// $email="enahadiani2@gmail.com";
	
		// $content = "
		// <!DOCTYPE html>
		// 	<html lang='en'>
		// 	<head>
		// 		<title>Approval Test</title>
		// 	</head>
		// 	<body>
		// 		<div style='margin:0; padding:75px; background-color: #EDF0F3; height: auto; margin-left: auto; margin-right: auto;'>
		// 			<table width='80%' style='background-color: white; margin-left: auto; margin-right: auto;'>
		// 				<tr>
							
		// 					<td align = 'center' width = '100%'>
		// 						<h3 style='width:50%; margin-left: auto;margin-right: auto;margin-bottom: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'>SIAGA</h3>
		// 						<h3 style='width:90%; margin-left: auto;margin-right: auto;margin-top: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'>Approval RRA Online</h3>
		// 					</td>
		// 				</tr>
		// 				<tr>
		// 					<td colspan = '2' style='border-top-width:1px; border-top-style:solid; border-top-color: #ff4d4d; padding:30px 45px; padding-top: 0px; padding-left: 10px; padding-right: 10px; text-align: justify; font-family: Roboto-Regular,Helvetica,Arial,sans-serif'>
		// 						<p>
		// 							Approval RRA Online
		// 						</p>
								
		// 					</td>
		// 				</tr>
		// 				<tr style='width: 100%; height: 50px; background-color: #ff4d4d;'>
		// 					<td colspan = '2'></td>
		// 				</tr>
		// 			</table>
		// 		</div>
		// 	</body>
		// 	</html>
		// ";
		// $numSent = $mail->sendMail(null, $email,"Pengajuan Test", $content,null);
		echo"</div></body>";

		echo "<script javascript='text/javascript'>

		function send(){
			alert('hello');
			var kode_lokasi = '$kode_lokasi';
			var nik = '$nik';
			var no_app = '$no_app';
			var status = '$status';
			var jenis = '$jenis';
			$.ajax({
					type: 'POST',
					url: 'dashSiaga.php?fx=send',
					dataType: 'json',
					data: {'kode_lokasi' : kode_lokasi,'nik': nik,'no_app': no_app,'status': status,'jenis': jenis},
					success:function(result){
						 alert('Notif Terkirim');
					}
			});
		}

		</script>
		";
			
		return "";
	}
	
}
?>
  
