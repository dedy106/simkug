<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptBukuBesar2Pajak extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sql = "select count(a.kode_akun)
from glma_tmp a $filter_akun ";
		
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
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sort=$tmp[5];
		$jenis=$tmp[6];
		$nama_file="buku_besar.xls";
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal
from glma_tmp a $filter_akun 
order by a.kode_akun";
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='1200'>
   
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='60' class='header_laporan' align='center'>Kode PP</td>
    <td width='60' class='header_laporan' align='center'>Kode DRK</td>
	<td width='60' class='header_laporan' align='center'>Modul</td>
	<td width='60' class='header_laporan' align='center'>Saldo Awal</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
	<td width='80' class='header_laporan' align='center'>Kode Akun</td>
	<td width='150' class='header_laporan' align='center'>Nama Akun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td class='header_laporan' align='center'>So Awal</td>
	<td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
	<td class='header_laporan' align='center'>".number_format($row->so_awal,0,',','.')."</td>
	<td class='header_laporan' align='center'>&nbsp;</td>
    <td class='header_laporan' align='center'>&nbsp;</td>
    <td  class='header_laporan' align='center'>&nbsp;</td>
	<td  class='header_laporan' >$row->kode_akun</td>
	<td class='header_laporan' >$row->nama</td>
  </tr>
  ";
			$sql="select a.no_bukti,a.no_dokumen,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.modul,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
from (select a.kode_lokasi,a.no_bukti,a.no_dokumen,a.periode,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan,a.modul 
	  from gldt_h a 
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun'  $this->filter 	  
	  union all 
	  select a.kode_lokasi,a.no_bukti,a.no_dokumen,a.periode,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan,a.modul
	  from gldt a  
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun'  $this->filter
	 )a $sort  ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode');\">$row1->no_bukti</a>";
				echo "</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' >".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
	<td valign='top' class='isi_laporan'>".$row1->modul."</td>
	<td valign='top' class='isi_laporan'>&nbsp;</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	<td valign='top' class='isi_laporan'>$row->kode_akun</td>
	<td valign='top' class='isi_laporan'>$row->nama</td>
  </tr>";
				
			}
			echo "</table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
