<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptPtgPnjr extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_ptg,a.no_dokumen,a.kode_pp,a.no_panjar,a.keterangan,a.nik_buat,a.nik_app,a.periode,a.tanggal,a.kode_lokasi, 
b.nama as nama_pp,d.nama as nama_pengaju,e.nama as nama_setuju,d.jabatan as jabatan_buat,
e.jabatan as jabatan_setuju, f.logo, a.nilai, a.nilai_kas, f.kota 
from panjarptg2_m a
 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
 inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi 
inner join lokasi f on f.kode_lokasi = a.kode_lokasi 
$this->filter order by a.no_ptg";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/log-kopeg.jpg";
		echo $AddOnLib->judul_laporan("",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='8' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
    <td align='left'><img src='$logo' width='200' height='72'></td>
        <td class='judul_bukti' align='center'>PERTANGGUNGAN PANJAR</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		<tr>
        <td class='header_laporan'>Kode PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp;$row->nama_pp</td>
        </tr>
      <tr>
        <td width='120' class='header_laporan'>No Pertanggungan </td>
        <td width='476' class='header_laporan'>:&nbsp;$row->no_ptg</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
     <tr>
        <td class='header_laporan'>No Panjar </td>
        <td class='header_laporan'>:&nbsp;$row->no_panjar</td>
        </tr>
        <tr>
        <td class='header_laporan'>Nilai Panjar </td>
        <td class='header_laporan'>:&nbsp;Rp.".number_format($row->nilai,0,",",".")."</td>
		</tr>
		<tr>
        <td class='header_laporan'>Nilai Kas</td>
        <td class='header_laporan'>:&nbsp;Rp.".number_format($row->nilai_kas,0,",",".")."</td>
		</tr>    
		<tr>
        <td class='header_laporan'>Diajukan Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp;$row->nama_pengaju</td>
        </tr>
		<tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app -&nbsp;$row->nama_setuju</td>
        </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='60' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='250' class='header_laporan'><div align='center'>Keterangan </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode PP </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode DRK </div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>
";
			
			$sql="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
from panjarptg2_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ptg='$row->no_ptg'
order by a.dc desc";
			$rs1 = $dbLib->execute($sql);
			$debet=0; $kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;

				echo "<tr>
			    <td class='isi_laporan' align='center'>$i</td>
			    <td class='isi_laporan'>$row1->kode_akun</td>
			    <td class='isi_laporan'>$row1->nama</td>
			    <td class='isi_laporan'>$row1->keterangan</td>
			    <td class='isi_laporan'>$row1->kode_pp</td>
			    <td class='isi_laporan'>$row1->kode_drk</td>
			    <td class='isi_laporan' align='right'>$row1->debet</td>
			    <td class='isi_laporan' align='right'>$row1->kredit</td>
				</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6'  class='isi_laporan' align='right'>Total&nbsp;</td>
   <td  class='isi_laporan' align='right'>".number_format($tot_debet,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($tot_kredit,0,',','.')."</td>
  
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
