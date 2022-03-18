<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ukm_rptKbSaldoBebanUkm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$tahun=substr($periode,0,4);
		$sql="select a.kode_jurnal,a.kode_lokasi,a.kode_pp,a.nama,
	   ISNULL(b.nilai,0) as so_awal,ISNULL(c.nilai,0) as mutasi,ISNULL(b.nilai,0)+ISNULL(c.nilai,0) as so_akhir
from refju_dual a
left join (select a.kode_lokasi,a.no_dokumen,a.kode_pp,SUM(a.nilai) as nilai 
from kas_m a
where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and SUBSTRING(a.periode,1,4)='$tahun'
group by a.kode_lokasi,a.no_dokumen,a.kode_pp
		)b on a.kode_jurnal=b.no_dokumen and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
left join (select a.kode_lokasi,a.no_dokumen,a.kode_pp,SUM(a.nilai) as nilai 
from kas_m a
where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and SUBSTRING(a.periode,1,4)='$tahun'
group by a.kode_lokasi,a.no_dokumen,a.kode_pp
		)c on a.kode_jurnal=c.no_dokumen and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
$this->filter and a.jenis='BEBAN' 
order by a.kode_jurnal
 ";
		
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO PENGELUARAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='50'  class='header_laporan' align='center'>Kode</td>
    <td width='250'  class='header_laporan' align='center'>Nama</td>
    <td width='60'  class='header_laporan' align='center'>Kode PP</td>
    <td width='90' class='header_laporan' align='center'>Saldo Awal </td>
    <td width='90' class='header_laporan' align='center'>Mutasi</td>
	<td width='90' class='header_laporan' align='center'>Saldo Akhir </td>
  </tr>
 ";
		$mutasi=0; $so_awal=0;
		$kredit=0; $so_akhir=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$mutasi+=$row->mutasi;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_jurnal</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_jurnal','$row->kode_lokasi','$periode','$row->kode_pp');\">$row->nama</a>";
	echo "</td><td class='isi_laporan' align='center'>$row->kode_pp</td>
		<td class='isi_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->mutasi,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($mutasi,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir,0,',','.')."</td>
</tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
