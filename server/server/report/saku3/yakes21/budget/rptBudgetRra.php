<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetRra extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
    $tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		// $nama_cab=$tmp[1];
		$jenis_file=$tmp[1];
		$nama_file="rra.xls";

		$sql="select a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_pdrk,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat
from rra_pdrk_m a
inner join karyawan b on a.nik_buat=b.nik 
 $this->filter order by a.no_pdrk";
 //echo $sql;
    if ($jenis_file=="Excel"){
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");;
        header("Content-Disposition: attachment;filename=$nama_file"); 
        header("Content-Transfer-Encoding: binary ");
      }

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pengajuan rra",$this->lokasi,$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pdrk</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat </td>
      </tr>
     

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun</td>
    <td width='200' align='center' class='header_laporan'>Nama Akun</td>
    <td width='60' align='center' class='header_laporan'>Kode PP </td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
    <td width='60' align='center' class='header_laporan'>Kode DRK</td>
    <td width='200' align='center' class='header_laporan'>Nama DRK</td>
    <td width='60' align='center' class='header_laporan'>Periode</td>
<td width='90' align='center' class='header_laporan'>Donor</td>
<td width='90' align='center' class='header_laporan'>Penerima</td>
  </tr>";
	  $sql1="select a.kode_akun,a.kode_pp,a.kode_drk,a.periode,a.dc,a.nilai,
       b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk, 
	   case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
from rra_pdrk_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring('$row->periode',1,4)
where a.no_pdrk='$row->no_pdrk' 
order by a.dc,a.kode_akun ";
//echo $sql;
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$debet=0;
		$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row1->debet;
			$kredit=$kredit+$row1->kredit;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan'>$row1->nama_pp</td>
    <td class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->nama_drk</td>
    <td class='isi_laporan'>$row1->periode</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		
		
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
	<td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
  </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
