<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptBukuBesar2AuditTmp extends server_report_basic
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
		
		
		$AddOnLib=new server_util_AddOnLib();
		
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>Akun</td>
	<td width='150' height='23' class='header_laporan' align='center'>Nama</td>
    <td width='30' class='header_laporan' align='center'>No</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='110' class='header_laporan' align='center'>No Bukti </td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";
			$sql="select a.kode_akun, a.nama, a.kode_lokasi, a.periode, a.so_awal, a.no_bukti, a.no_dokumen, convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.kode_pp, 
					a.kode_drk, a.debet, a.kredit, a.totdebet, a.totkredit, a.saldo, a.nik_user, a.nourutju, a.no_urut, a.tgl_input 
				from bb_tmp a
				where a.kode_akun='$row->kode_akun' and kode_lokasi='$row->kode_lokasi' $this->filter 	
				order by a.tanggal,a.no_bukti
				";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			$i = 1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
	<td valign='top' class='isi_laporan'>$row1->kode_akun</td>
    <td valign='top' class='isi_laporan'>$row1->nama</td>
    <td height='23' valign='top' class='isi_laporan' align='center'>$i</td>
    <td valign='top' class='isi_laporan'>$row1->tgl</td>";
				echo "<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>";
				echo "<td valign='top' class='isi_laporan'>$row1->keterangan</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
		}
		echo "</center>";
		return "";
	}
	
}
?>
