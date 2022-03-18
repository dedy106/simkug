<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_simlog_rptBast extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_hutang,a.keterangan,a.no_dokumen,a.tanggal,a.kode_vendor,a.akun_hutang,a.kode_lokasi,
       b.nama as nama_vendor,c.nama as nama_akun,convert(varchar,a.tanggal,103) as tgl
from hutang_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.akun_hutang=c.kode_akun and a.kode_lokasi=c.kode_lokasi
$this->filter and a.modul='LOGBAST'							 
order by a.no_hutang";
		
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("bast",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_hutang</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
        </tr>
		
		<tr>
        <td class='header_laporan'>Mitra </td>
        <td class='header_laporan'>:&nbsp;$row->nama_vendor</td>
      </tr>
      <tr>
        <td class='header_laporan'>No SPK</td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Akun Hutang</td>
        <td class='header_laporan'>:&nbsp;$row->akun_hutang - $row->nama_akun</td>
      </tr>
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='100' align='center' class='header_laporan'>No Seri</td>
	<td width='60' align='center' class='header_laporan'>Kode Akun</td>
    <td width='60' align='center' class='header_laporan'>Klp Asset</td>
	<td width='40' align='center' class='header_laporan'>Jenis</td>
	<td width='90' align='center' class='header_laporan'>Harga</td>
    
  </tr>";
			$sql1="select id_pesan,no_fa,nama,merk,tipe,no_seri,nilai,kode_akun,kode_klpfa,kode_unit,jenis
from fa_asset
where no_po='$row->no_dokumen' and kode_lokasi='$row->kode_lokasi'
order by no_fa ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->no_fa</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
	<td  class='isi_laporan'>$row1->kode_klpfa</td>
	<td  class='isi_laporan' align='center'>$row1->jenis</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>

  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='8' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
