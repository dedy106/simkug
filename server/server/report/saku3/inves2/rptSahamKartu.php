<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(a.no_depo)
		from inv_depo_m a
$this->filter ";
		
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
		$kartu=$tmp[2];
		$sql="select a.no_shmbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
       a.nilai_komisi,a.nilai_ppn,a.nilai_levy,a.nilai_pph,b.nama as nama_kelola,
	   c.kode_saham,d.nama as nama_saham,c.h_oleh,c.harga,c.jumlah,c.n_beli
from inv_shmbeli_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
inner join inv_shmbeli_d c on a.no_shmbeli=c.no_shmbeli
inner join inv_saham d on c.kode_saham=d.kode_saham
 order by a.no_shmbeli";
		$tmp_periode="";
		if ($kartu!="kartu")
		{
			$tmp_periode=" and b.periode<='$periode' ";
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu saham",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_shmbeli</td>
      </tr>
	   <tr>
        <td class='header_laporan'>No Dokumen</td>
        <td class='header_laporan'>: $row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tanggal</td>
        <td  class='header_laporan'>: $row->tanggal</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Tanggal Set</td>
        <td  class='header_laporan'>: $row->tgl_set</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Saham </td>
        <td class='header_laporan'>: $row->kode_saham - $row->nama_saham</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Broker / MI </td>
        <td class='header_laporan'>: $row->nama_kelola</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
	  

	  <tr>
        <td class='header_laporan'>Jumlah Saham </td>
        <td class='header_laporan'>: ".number_format($row->jumlah,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Harga Perolehan </td>
        <td class='header_laporan'>: ".number_format($row->h_oleh,2,',','.')."</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='90' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Jumlah</td>
	<td width='80' class='header_laporan' align='center'>Nilai Buku</td>
	<td width='80' class='header_laporan' align='center'>Nilai Wajar</td>
	  </tr>
  ";
 
 
		
			$sql="select a.no_spi as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,b.kode_saham,b.kode_kelola,
	   b.jumlah,b.h_oleh,b.h_buku,b.h_wajar
from inv_shmspi_m a
inner join inv_shmspi_d b on a.no_spi=b.no_spi
where b.kode_saham='$row->kode_saham'";
			
			$rs1 = $dbLib->execute($sql);
			$akru=0; $rev=0; $cair=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$akru=$akru + $row1->akru;	
				$rev=$rev+$row1->rev;
				$cair=$cair+$row1->cair;
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi');\">$row1->no_bukti</a>";
				echo "</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->jumlah,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->h_buku,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->h_wajar,0,',','.')."</td>
  </tr>";
				
			}
			
			echo "</table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
