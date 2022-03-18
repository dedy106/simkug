<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptIfKartuUnit extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$kode_lokasi=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.nik,b.nama,a.kode_pp,c.nama as nama_pp,a.nilai,a.kode_lokasi 
from it_if_sub a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter ";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan imprest fund unit",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>NIK</td>
        <td width='360' class='header_laporan'>: $row->nik</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nama</td>
        <td width='360' class='header_laporan'>: $row->nama</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>PP</td>
        <td width='360' class='header_laporan'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
    
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal</td>
    <td class='header_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
  </tr>";
	
  echo "<tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='60' height='23' class='header_laporan' align='center'>Kode Akun</td>
	<td width='150' height='23' class='header_laporan' align='center'>Nama Akun</td>
	<td width='60' height='23' class='header_laporan' align='center'>Kode DRK</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
	<td width='80' class='header_laporan' align='center'>Kredit</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.no_bukti,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.nilai,0 as nilai_kas,
			a.kode_akun,c.nama as nama_akun,a.tanggal
from it_ifaju_m a
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
where a.nik_user='$row->nik' and a.kode_lokasi='$row->kode_lokasi' 
union
select a.no_ver as no_bukti,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,0 as nilai,a.nilai as nilai_kas,
			a.kode_akun,c.nama as nama_akun,a.tanggal
from it_ifaju_m a
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
where a.nik_user='$row->nik' and a.kode_lokasi='$row->kode_lokasi' and a.no_ver<>'-'
order by a.tanggal
 ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai=0; $nilai_kas=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->nilai_kas - $row1->nilai ;	
				$nilai+=$row1->nilai;
				$nilai_kas+=$row1->nilai_kas;
				echo "<tr>
	 <td height='23'  class='isi_laporan'>".$row1->tgl."</td>
    <td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_aju','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
				
				<td  class='isi_laporan'>".$row1->kode_akun."</td>
				<td  class='isi_laporan'>".$row1->nama_akun."</td>
				<td  class='isi_laporan'>".$row1->kode_drk."</td>
    <td  class='isi_laporan'>".$row1->keterangan."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai_kas,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
