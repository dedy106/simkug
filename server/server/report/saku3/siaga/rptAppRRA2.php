<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptAppRRA2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
				$kode_pp=$tmp[5];
				$no_pdrk=$tmp[6];
        $tahun=date('Y');
		$sql="select a.no_app,convert(varchar,a.tanggal,103) as tanggal,a.modul,a.nik_app,b.nama,a.keterangan,a.periode,a.kode_lokasi,b.email
        from rra_app_m a
        inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_app";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body onload='send()'>"; 
		echo $AddOnLib->judul_laporan("laporan approval",$this->lokasi,$tahun);
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
						//  $email=$row->email;
						$header=$jenis2." - ".$row->no_app." - ".$row->keterangan;
						$jenis=strtoupper($row->jenis);  
						
						$tmp=explode("Approval",$jenis2);
						$approver=$tmp[1];
						if($status != "APPROVE"){
								$header = "NON Approval ".$approver." - ".$row->no_app." - ".$row->keterangan;
						}

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

		$sql3="select b.email as enib,c.email as enik1,g.email as enik2,e.email as enik3,f.email as enik4
		from rra_pdrk_m a
		inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
		inner join karyawan c on a.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi
		inner join karyawan g on a.nik_app2=g.nik and a.kode_lokasi=g.kode_lokasi
		inner join karyawan e on a.nik_app3=e.nik and a.kode_lokasi=e.kode_lokasi
		inner join karyawan f on a.nik_app4=f.nik and a.kode_lokasi=f.kode_lokasi
		inner join lokasi d on a.kode_lokasi=d.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and a.no_pdrk='$no_pdrk' order by a.no_pdrk";
		
		$rs3 = $dbLib->execute($sql3);
		$row3 = $rs3->FetchNextObject($toupper=false);

		if($jenis2 == "Approval VP"){
				$url="dashSiaga.php?fx=sendNotifUserApp";
				$email=$row3->enik2;
				$email2=$row3->enib;
				$subket="RRA Online telah di-$status oleh $approver";
		}else if($jenis2 == "Approval Dir Unit"){
				$url="dashSiaga.php?fx=sendNotifUserAppDir";
				$email=$row3->enik3;
				$email2=$row3->enib;
				if($status == "APPROVE"){
					$subket="RRA Online telah di-$status oleh $approver dan menunggu Approve dari Admin RRA";
				}else{
					$subket="RRA Online telah di-$status oleh $approver";
				}
				
		}else if($jenis2 == "Approval RRA Anggaran"){
				$url="dashSiaga.php?fx=sendNotifUserAppRRA";
				$email=$row3->enik4;
				$email2=$row3->enib;
				$subket="RRA Online telah di-$status oleh $approver";
		}else{
				$url="dashSiaga.php?fx=sendNotifUserAppDireksi";
				$email=$row3->enib;
				if($status != "APPROVE"){
					$email2=$row3->enik3;
				}
				$subket="RRA Online telah di-$status oleh $approver";
		}
		
		//kirim email
		$mail=new server_util_mail();
		
		
		$content = "
		<!DOCTYPE html>
			<html lang='en'>
			<head>
				<title>Approval $status</title>
			</head>
			<body>
				<div style='margin:0; padding:75px; background-color: #EDF0F3; height: auto; margin-left: auto; margin-right: auto;'>
					<table width='80%' style='background-color: white; margin-left: auto; margin-right: auto;'>
						<tr>
							
							<td align = 'center' width = '100%'>
								<h3 style='width:50%; margin-left: auto;margin-right: auto;margin-bottom: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'>SIAGA</h3>
								<h3 style='width:90%; margin-left: auto;margin-right: auto;margin-top: 5px;text-align: center;font-family: Google Sans,Helvetica,Arial,Verdana,sans-serif;'> $subket </h3>
							</td>
						</tr>
						<tr>
							<td colspan = '2' style='border-top-width:1px; border-top-style:solid; border-top-color: #ff4d4d; padding:30px 45px; padding-top: 0px; padding-left: 10px; padding-right: 10px; text-align: justify; font-family: Roboto-Regular,Helvetica,Arial,sans-serif'>
								<p>
									Approval RRA Online
								</p>
								
							</td>
						</tr>";
						$sql="select a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_pdrk,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat,
						a.nik_app1,a.nik_app2,a.nik_app3,a.nik_app4,c.nama as nama_setuju,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email
						from rra_pdrk_m a
						inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
						inner join karyawan c on a.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi
						inner join lokasi d on a.kode_lokasi=d.kode_lokasi
						where a.kode_lokasi='$kode_lokasi' and a.no_pdrk='$no_pdrk' order by a.no_pdrk";
						
						$rse = $dbLib->execute($sql);
						$rowe = $rse->FetchNextObject($toupper=false);
						$content.="
						<tr>
							<td colspan='2' width='100%'>
								<table style='border:0.001px solid black' >
									<tr>
										<td colspan='10' style='padding:5px'>
											<table width='622' border='0'>
												<tr>
													<td width='110'>Periode</td>
													<td width='496'>:&nbsp;$rowe->periode</td>
												</tr>
												<tr>
													<td>Tanggal </td>
													<td >:&nbsp;$rowe->tgl</td>
												</tr>
												<tr>
													<td >No Bukti </td>
													<td >:&nbsp;$rowe->no_pdrk</td>
												</tr>
												<tr>
													<td >Keterangan</td>
													<td >:&nbsp;$rowe->keterangan</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr style='background:#CCCCCC' style='border:0.001px solid black'>
										<td width='20' align='center' >No</td>
										<td width='80' align='center' >Kode Akun</td>
										<td width='300' align='center' >Nama Akun</td>
										<td width='60' align='center' >Periode</td>
										<td width='90' align='center' >Penerima</td>
										<td width='90' align='center' >Pemberi</td>
									</tr>";
									$sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
									b.nama as nama_akun,
									case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
									from rra_pdrk_d a
									inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
									where a.no_pdrk='$rowe->no_pdrk' and a.kode_lokasi='$rowe->kode_lokasi'
									order by a.dc desc ";
									
									$rse1 = $dbLib->execute($sql1);
									$i=1;
									$debet=0;
									$kredit=0;
									$content2="";
									while ($rowe1 = $rse1->FetchNextObject($toupper=false))
									{
										$debet=$debet+$rowe1->debet;
										$kredit=$kredit+$rowe1->kredit;
										$content2.="<tr style='border:0.001px solid black'>
										<td align='center'>$i</td>
										<td >$rowe1->kode_akun</td>
										<td >$rowe1->nama_akun</td>
										<td >$rowe1->periode</td>
										<td align='right' >".number_format($rowe1->debet,0,",",".")."</td>
										<td align='right' >".number_format($rowe1->kredit,0,",",".")."</td>
										</tr>";
										$i=$i+1;
									}
									$content.= $content2." <tr>
										<td colspan='4' align='right' >Total</td>
										<td align='right' >".number_format($debet,0,",",".")."</td>
										<td align='right' >".number_format($kredit,0,",",".")."</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr style='width: 100%; height: 50px; background-color: #ff4d4d;'>
							<td colspan = '2'></td>
						</tr>
					</table>
				</div>
			</body>
			</html>
		";
		$numSent = $mail->sendMail(null, $email,$header, $content,null);
		if(isset($email2)){
			$numSent = $mail->sendMail(null, $email2,$header, $content,null);
		}
		
		echo"</div></body>";


		echo "<script javascript='text/javascript'>

		function send(){
			
			var kode_lokasi = '$kode_lokasi';
			var nik_buat = '$rowe->nik_buat';
			var nik_app1 = '$rowe->nik_app1';
			var nik_app2 = '$rowe->nik_app2';
			var nik_app3 = '$rowe->nik_app3';
			var nik_app4 = '$rowe->nik_app4';
			var no_app = '$no_pdrk';
			var status = '$status';
			var jenis = '$jenis2';
			var kode_pp = '$kode_pp';
			var url='$url';
            alert('Berhasil di'+status);
			$.ajax({
					type: 'POST',
					url: url,
					dataType: 'json',
					data: {'kode_lokasi' : kode_lokasi,'nik_buat': nik_buat,'nik_app1': nik_app1,'nik_app2': nik_app2,'nik_app3': nik_app3,'nik_app4': nik_app4,'no_app': no_app,'status': status,'jenis': jenis,'kode_pp':kode_pp},
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
