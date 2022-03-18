<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptKbNota extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$nama_file="tranfer_".$periode.".xls";
		
		$sql="select a.no_nota,a.no_dokumen,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_btrans,
		a.nama,a.no_rek,a.alamat,a.nik1,a.nik2,b.nama as nama1,c.nama as nama2,a.tanggal
  from pbh_nota a
  inner join karyawan b on a.nik1=b.nik 
  inner join karyawan c on a.nik2=c.nik
  $this->filter order by a.no_nota ";
		//echo $sql;
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>";
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  
		<tr>
		  <td align='center' class='istyle17'>NOTA TRANSFER </td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td>Kepada Yth</td>
		</tr>
		<tr>
		  <td>Pimpinan Bank Mandiri Kanpus Telkom  </td>
		</tr>
		<tr>
		  <td>Jl. Japati No. 1 Bandung</td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td>Perihal  : Transfer Pembayaran</td>
		</tr>
		<tr>
		  <td>Lampiran : 1 (satu) lbr CEK / BG</td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		
		<tr>
		  <td>Dengan hormat,</td>
		</tr>
		<tr>
		  <td>Dimohon kepada Saudara untuk memindahkan dana atas beban rekening Giro/ Cek kami Nomor :  130 009 811 6067 atas nama YAKES TELKOM kepada nama tersebut dibawah ini  :</td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td> "; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{

			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='630'>
	   <tr bgcolor='#CCCCCC'>
		 <td width='30'  align='center' class='header_laporan'>NO</td>
		 <td width='250'  align='center' class='header_laporan'>NAMA PENERIMA</td>
		 <td width='250'  align='center' class='header_laporan'>NAMA DAN REKENING BANK</td>
		 <td width='100'  align='center' class='header_laporan'>JUMLAH (Rp.)</td>
		 </tr>  ";
			$nilai=0;$nilai_ppn=0;$tagihan=0;$i=1;
			$sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai
			from pbh_pb_m a
			inner join pbh_rek b on a.no_pb=b.no_bukti
			where a.no_nota='$row->no_nota'
			order by b.bank,b.no_rek";
			//echo $sql;
			$rs1 = $dbLib->execute($sql);	
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'  >$row1->nama</td>
				<td class='isi_laporan'  >$row1->nama_rek - $row1->no_rek</td>
				<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
				</tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='isi_laporan' colspan='3'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				</tr>";
			echo "</table><br>";
		}
		echo "</td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td>TERBILANG  :</td>
		</tr>
		<tr>
		  <td>Untuk Biaya Transfer s/d Rp. 500.000 dibebankan kepada YAKES TELKOM, sedangkan diatas Rp. 500.000 menjadi beban penerima.</td>
		</tr>
		<tr>
		  <td>Demikian disampaikan, atas perhatian dan kerjasamanya kami ucapkan terimakasih.</td>
		</tr>
		<tr>
		  <td>&nbsp;</td>
		</tr>
		<tr>
		  <td>Mengetahui / menyetujui,</td>
		</tr>
		<tr>
		  <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
			<tr align='center'>
				
				<td>&nbsp;</td>
				<td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
			</tr>
			<tr height='60'>
			
				<td >&nbsp;</td>
				<td >&nbsp;</td>
			</tr>
			
			<tr align='center' valign='bottom'>
				<td>$row->nama1</td>
				<td>$row->nama2</td>
			</tr>
			<tr align='center' valign='bottom'>
				<td>$row->nik1</td>
				<td>$row->nik2</td>
			</tr>
			</table>
		</td>
		</tr>
		
		<tr>
		  <td>&nbsp;</td>
		</tr>
		</table>
		";
		echo "</div>";
		return "";
		
	}
	
}
?>
