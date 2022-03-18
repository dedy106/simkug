<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlBbArusKas extends server_report_basic
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
		$nik_user=$tmp[2];
		$trail=$tmp[3];
		$kode_fs=$tmp[4];
		$tahun=substr($periode,0,4);
		$sql = "select b.no_bukti,b.kode_lokasi,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,
					case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit
				from dw_buktikas a
				inner join gldt b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
				$this->filter and b.periode<='$periode'  and substring(b.periode,1,4)='$tahun' 
				and substring(b.periode,1,4)=substring('$periode',1,4) and a.nik_user='$nik_user'
				order by b.tanggal
			";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>BUKU BESAR ARUS KAS</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak' width='800'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='100'  class='header_laporan' align='center'>No Bukti</td>
    <td width='60'  class='header_laporan' align='center'>Tanggal</td>
	<td width='300'  class='header_laporan' align='center'>Keterangan</td>
    <td height='25' width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>
";
		$i=1;
		$debet=0;
		$kredit=0;
		$so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir=$so_akhir+$row->so_akhir;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_bukti','$row->kode_lokasi','$periode');\">$row->no_bukti</a>";
	echo "</td>
	  <td class='isi_laporan'>$row->tgl</td>
	  <td class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
    <td height='20' colspan='4' class='header_laporan' align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
</tr>";
		echo "</td></tr>";
		echo "</table>";
		echo "<br>";
		
		echo "</div>";
		return "";
	}
	
}
?>
