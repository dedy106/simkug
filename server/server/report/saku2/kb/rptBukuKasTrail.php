<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptBukuKasTrail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql = $sql = "select 1  ";
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
		$periode=$tmp[1];
		$nik_user="trail_".$tmp[2];
		$kode_akun=$tmp[3];
		$sql="exec sp_glma_kas_akun_tmp '$kode_akun','$kode_akun','$kode_lokasi','$kode_lokasi','$kode_lokasi','$periode','$nik_user' ";
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_akun,a.nama,a.so_awal,a.kode_lokasi,b.nama as nama_lokasi
from glma_tmp a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' and a.kode_akun='$kode_akun'
order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan buku kasbank",$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='9' class='header_laporan'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='70' class='header_laporan'>Kode Akun</td>
        <td width='360' class='header_laporan'>: $row->kode_akun</td>
       
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	  <tr>
        <td width='70' class='header_laporan'>Kode Lokasi</td>
        <td width='360' class='header_laporan'>: $row->kode_lokasi - $row->nama_lokasi</td>
       
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='70' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='70' height='23' class='header_laporan' align='center'>No Dokumen</td>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
	<td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='50' class='header_laporan' align='center'>Kode PP</td>
	<td width='50' class='header_laporan' align='center'>Kode DRK</td>
     <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
    <td width='80' class='header_laporan' align='center'>Balance</td>
 </tr>

  
";
			
			$sql="select a.kode_lokasi,a.no_kas as no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.keterangan,a.kode_pp,a.kode_drk,
						 case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit
				from kas_j a
				where a.kode_akun='$row->kode_akun' and kode_lokasi='$kode_lokasi' and periode='$periode'
				order by a.tanggal,a.no_dokumen ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>	 
    <td valign='top' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
	echo "</td>
     <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
	<td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
	<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
