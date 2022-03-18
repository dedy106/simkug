<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptAssetKartu extends server_report_basic
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
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$sql="select a.no_bukti,a.spesifikasi,a.id_gedung,a.no_ruang,a.kode_klp,convert(varchar,a.tanggal_perolehan,103) as tgl,a.kode_lokasi,a.nilai_perolehan,
			b.nama_klp,a.satuan,isnull(c.nama_gedung,'-') nama_gedung,isnull(d.nama_ruangan,'-') nama_ruangan,a.nama_inv
from amu_asset_bergerak a
inner join amu_klp_brg b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
left join amu_gedung c on a.id_gedung=c.id_gedung and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
left join amu_ruangan d on a.no_ruang=d.no_ruangan and a.kode_lokasi=d.kode_lokasi and a.kode_pp=c.kode_pp
$this->filter
order by a.no_bukti";
		echo $sql;
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu piutang",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_bukti','$row->kode_lokasi');\">$row->no_bukti</a></td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Gedung</td>
        <td width='360' class='header_laporan'>: $row->nama_gedung</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Ruangan</td>
        <td width='360' class='header_laporan'>: $row->nama_ruangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelompok Barang </td>
        <td class='header_laporan'>: $row->nama_klp</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->nama_inv</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Spesifikasi </td>
        <td class='header_laporan'>: $row->spesifikasi</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai Perolehan </td>
        <td class='header_laporan'>: $row->nilai</td>
      </tr>
    </table></td>
  </tr>
 
 
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='110' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>
";
			
			$sql="select a.no_bukti,a.deskripsi,a.id_gedung,a.no_ruang,a.kode_klp,a.tanggal_perolehan,a.kode_lokasi,a.nilai_perolehan,
			b.nama_klp
from amu_asset_bergerak a
inner join amu_klp_brg b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_bukti";

			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai=0;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->nilai;	
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_bukti','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
	   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   
  <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
