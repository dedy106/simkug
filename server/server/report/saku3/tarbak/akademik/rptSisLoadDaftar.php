<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisLoadDaftar extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="kartu.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/tarbak.jpg";
		
		$sql="select a.no_kas,a.tanggal,a.keterangan
		from kas_m a
$this->filter
order by a.no_kas ";

		
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("kartu siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' rowspan='4'><img src='$pathfoto' width='236' height='80' /></td>
        <td width='700' align='center' class='header_laporan'>YAYASAN PENDIDIKAN TELKOM</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>$nama_pp</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>PEMBAYARAN PENDAFTARAN SISWA</td>
      </tr>
 
    </table></td>
  </tr>
  <tr>
    <td>";
			echo "
			<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
  <tr>
    <td colspan='12' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>No Bukti</td>
        <td width='400' class='header_laporan'>: $row->no_kas</td>
      </tr>
	  <tr>
        <td width='60' class='header_laporan'>Tanggal</td>
        <td width='400' class='header_laporan'>: $row->tanggal</td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi</td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>

    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'>No</td>
    <td width='60' class='header_laporan'>No Bukti </td>
    <td width='80' class='header_laporan'>No Registrasi</td>
		<td width='60' class='header_laporan'>Nama</td>
		<td width='60' class='header_laporan'>Periode</td>
		<td width='60' class='header_laporan'>Nilai Bayar</td>
  </tr>
 ";
			$sql1="select a.no_kas,a.no_reg,a.nilai,a.periode, b.nama 
			from sis_reg_bayar a
			inner join sis_siswareg b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.no_reg=b.no_reg
			inner join kas_m c on a.no_kas=c.no_kas
			where a.kode_lokasi = '$kode_lokasi' and c.no_kas='$row->no_kas' ";

			
			$rs1 = $dbLib->execute($sql1);
			$tagihan=0;$bayar=0;$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				
				$lunas1+=$row1->nilai;
				
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->no_kas</td>
				<td class='isi_laporan'>$row1->no_reg</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->periode</td>
				<td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='5'>Total</td>
				<td align='right' class='header_laporan'>".number_format($lunas1,0,",",".")."</td>
			  </tr>";
			
			echo "</table>
		</td>
  </tr>
</table>"; 
			echo "<br>"; 
			
			$i=$i+1;
		}
		
		echo "</div>";
		return "";
	}
	
}
?>
  
