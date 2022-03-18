<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptKbTbDok extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$mutasi=$tmp[2];
		$filter3=$tmp[3];
		$tmp="";
		if ($mutasi=="Tidak")
		{
			$tmp=" and (isnull(b.debet,0)<>0 and isnull(b.kredit,0)<>0) ";
		}
		$sql = "select a.no_dokumen,a.nama,a.kode_lokasi,isnull(b.debet,0) as debet,isnull(b.kredit,0) as kredit,b.periode
from sju_dokumen a
left join (select dbo.fnDokumen(a.no_kas) as no_dokumen,a.kode_lokasi,a.periode,
				sum(case when a.dc='D' then a.nilai else 0 end) as debet,
				sum(case when a.dc='C' then a.nilai else 0 end) as kredit
			from kas_j a
			$this->filter
			group by dbo.fnDokumen(a.no_kas),a.kode_lokasi,a.periode
			)b on a.no_dokumen=b.no_dokumen and a.kode_lokasi=b.kode_lokasi
$filter3 $tmp
order by a.no_dokumen";
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO KASBANK PER DOKUMEN",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='100' class='header_laporan'>No Dokumen</td>
    <td width='300' class='header_laporan'>Nama</td>
    <td width='90' class='header_laporan'>Debet</td>
    <td width='90' class='header_laporan'>Kredit</td>
  </tr>";
		$debet=0; $kredit=0; $so_awal=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_awal=$so_awal+$row->so_awal;
			$so_akhir=$so_akhir+$row->so_akhir;
			echo "<tr>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->no_dokumen','$row->kode_lokasi','$periode');\">$row->no_dokumen</a></td>";
    echo "<td class='isi_laporan'>$row->nama</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row->debet,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($row->kredit,2,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
  <td class='header_laporan' align='right'>".number_format($debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($kredit,2,',','.')."</td>
  </tr></table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
