<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_simlog_rptPanjarTrm extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$periode=$tmp[0];
		
		
		$sql="select a.periode,a.kode_lokasi,a.no_bukti,sum(a.nilai) as nilai
		 from fa_nilai a
		 inner join gr_pb_m d on a.no_bukti=d.no_pb and a.kode_lokasi=d.kode_lokasi
$this->filter
GROUP BY a.periode,a.kode_lokasi,a.no_bukti
order by a.no_bukti";

$rs = $dbLib->execute($sql);		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penerimaan barang",$this->lokasi," ");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Purchase Request</td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
        </tr>
	
	   <tr>
        <td class='header_laporan'>Sisa Nilai</td>
		<td class='isi_bukti'>: ".number_format($row->nilai,0,",",".")." </td>
		</tr>
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Jenis Barang</td>
	<td width='150' align='center' class='header_laporan'>Nama Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='200' align='center' class='header_laporan'>Spesifikasi</td>
    <td width='90' align='center' class='header_laporan'>Umur</td>
	<td width='90' align='center' class='header_laporan'>% Susut</td>
	<td width='90' align='center' class='header_laporan'>Catatan</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
  </tr>";
			$sql1="select a.catatan,d.nama as klp,a.no_fa,a.umur,a.persen,a.nama,a.merk,a.tipe,a.no_seri,a.nilai
from fa_asset a
inner join fa_klp d on a.kode_klpfa=d.kode_klpfa and a.kode_lokasi=d.kode_lokasi
where a.no_po='$row->no_bukti'
order by a.kode_klpfa ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai1=0; $total=0; $total_nego=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai1=$nilai1+$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td  class='isi_laporan'>$row1->klp</td>
    <td  class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->no_seri</td>
	<td class='isi_laporan'>$row1->umur</td>
    <td  class='isi_laporan'>$row1->persen</td>
    <td  class='isi_laporan'>$row1->catatan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='9' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai1,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
