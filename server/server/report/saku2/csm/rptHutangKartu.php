<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_csm_rptHutangKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(a.no_hutang)
		from csm_hutang_m a
inner join csm_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
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
		$sql="select a.kode_lokasi,a.no_hutang,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,b.nama as nama_vendor
from csm_hutang_m a
inner join csm_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
$this->filter order by a.no_hutang";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembayaran hutang",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Invoice</td>
        <td width='360' class='header_laporan'>: $row->no_hutang</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>No Invoice</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Vendor </td>
        <td class='header_laporan'>: $row->nama_vendor</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='4' class='header_laporan' align='right'>Nilai Tagihan</td>
    <td class='header_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='110' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Nilai Kas</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_bukti,a.nilai as nilai_kas,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.keterangan
from csm_hutbayar_d a
inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_hutang='$row->no_hutang' and a.kode_lokasi='$row->kode_lokasi' ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai_kas=0;
			$nilai_lain=0;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - ($row1->nilai_kas+$row1->nilai_lain);	
				$nilai_kas=$nilai_kas+$row1->nilai_kas;
				
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai_kas,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
   
  <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
