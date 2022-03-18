<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptBebanFormMulti extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_aju)
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,a.kode_lokasi
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_aju";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='600' border='0' cellspacing='2' cellpadding='1'>
  <tr align='center'>
    <td colspan='2' ><b>BUKTI AGENDA </b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width='141'>No Agenda</td>
    <td width='449'>: $row->no_aju </td>
  </tr>
  <tr>
    <td>Tanggal</td>
    <td>: $row->tgl </td>
  </tr>
  <tr>
    <td>PP</td>
    <td>: $row->kode_pp - $row->nama_pp </td>
  </tr>
  <tr>
    <td>MTA</td>
    <td>: $row->kode_akun - $row->nama_akun </td>
  </tr>
  <tr>
    <td>Keterangan</td>
    <td>: $row->keterangan </td>
  </tr>
  <tr>
    <td>Nilai</td>
    <td>: ".number_format($row->nilai,0,",",".")."</td>
  </tr>
   <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' >
        <td width='30' class='header_laporan'>No</td>
        <td width='150' class='header_laporan'>No Rekening</td>
        <td width='90' class='header_laporan'>Nominal</td>
        <td width='150' class='header_laporan'>Nama</td>
        <td width='200' class='header_laporan'>Bank</td>
        <td width='150' class='header_laporan'>Keterangan</td>
        </tr>";
		$sql="select bank,no_rek,nama_rek,bank_trans,nilai,keterangan from it_aju_rek where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi'";
		$rs1 = $dbLib->execute($sql);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td class='isi_laporan' align='center'>$j</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->bank_trans</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        </tr>";
			$j=$j+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
  </tr>
 
  <tr>
    <td>Dibuat Oleh : </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height='50'>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'>$row->nik_user</td>
  </tr>
</table><br>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
