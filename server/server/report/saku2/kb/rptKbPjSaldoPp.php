<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbPjSaldoPp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		
		$sql="select a.kode_pp,d.nama as nama_pp,sum(a.nilai) as nilai, 
	   sum(isnull(c.nilai,0))+sum(isnull(c.nilai_kas,0)) as nilai_ptg,
       sum(a.nilai) - (sum(isnull(c.nilai,0))+sum(isnull(c.nilai_kas,0))) as saldo
from panjar_m a 
inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi
$this->filter
group by a.kode_pp,d.nama
order by a.kode_pp ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap saldo panjar panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Kode PP</td>
    <td width='300' align='center' class='header_laporan'>Nama PP</td>
    <td width='100' align='center' class='header_laporan'>Pencairan</td>
    <td width='100' align='center' class='header_laporan'>Pertanggungjawaban</td>
	<td width='100' align='center' class='header_laporan'>Saldo</td>
  </tr>
 ";
		$nilai=0; $nilai_ptg=0; $nilai_kas=0; $saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ptg=$nilai_ptg+$row->nilai_ptg;
			$saldo=$saldo+$row->saldo;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPanjar('$row->kode_pp','$kode_lokasi','$periode');\">$row->kode_pp</a>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='3'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
