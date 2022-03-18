<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptPjPtg extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_panjar)
from gr_panjar_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter ";
		
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_ptg,a.no_panjar,a.tanggal,a.kode_pp,b.nama as nama_pp,c.nik_buat,c.nik_app as nik_app_panjar,a.nik_app,
		d.nama as nama_app,e.nama as nama_buat ,f.nama as nama_app_panjar,a.nilai,a.keterangan,
		c.nilai as nilai_panjar,c.nilai-a.nilai as saldo 
from gr_panjarptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join gr_panjar_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on c.nik_buat=e.nik and c.kode_lokasi=e.kode_lokasi
inner join karyawan f on c.nik_app=f.nik and c.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_ptg";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='412'>PT GRAHA INFORMATIKA NUSANTARA</td>
        <td width='197' align='right'>Lampiran : </td>
        <td width='171'>&nbsp;</td>
      </tr>
      <tr>
        <td>JL S Parman Kavling 56 JAKARTA</td>
        <td align='right'>No : </td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle15'>DAFTAR PERTANGGUNGAN  PANJAR </td>
  </tr>
  <tr>
    <td align='center' class='istyle15'>Nomor : $row->no_ptg</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='91'>Unit Kerja </td>
        <td width='320'>: $row->nama_pp </td>
        <td width='91'>Departemen</td>
        <td width='280'>: $row->nama_pp </td>
      </tr>
      <tr>
        <td>No Panjar </td>
        <td>: $row->no_panjar </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='37' class='header_laporan'>No</td>
        <td width='100' class='header_laporan'>No Perkiraan </td>
		<td width='200' class='header_laporan' >Nama Perkiraan </td>
        <td width='300' class='header_laporan'>Uraian Kebutuhan</td>
        <td width='100' class='header_laporan'>Jumlah</td>
      </tr>";
		$sql1="select a.kode_akun,b.nama,a.nilai,a.keterangan
from gr_panjarptg_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ptg='$row->no_ptg' and a.dc='D' order by a.kode_akun ";
		$i=1;$nilai=0;			
		$rs1 = $dbLib->execute($sql1);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
        <td class='isi_laporan'>$i</td>
        <td class='isi_laporan'>$row1->kode_akun</td>
		<td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row->keterangan</td>
        <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='2' align='center' class='header_laporan'>Total</td>
        <td colspan='2' class='header_laporan'>".$AddOnLib->terbilang($nilai)."</td>
		<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' align='center' class='header_laporan'>Jumlah Panjar </td>
        <td colspan='2' class='header_laporan'>&nbsp;</td>
        <td align='right' class='header_laporan'>".number_format($row->nilai_panjar,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' align='center' class='header_laporan'>Saldo Panjar</td>
        <td colspan='2' class='header_laporan'>&nbsp;</td>
        <td align='right' class='header_laporan'>".number_format($row->saldo,0,",",".")."</td>
      </tr>
    </table></td>
  </tr>
   <tr><td>&nbsp;</td>
   </tr>
  <tr>
    <td align='center'><table width='608' border='0' cellspacing='1' cellpadding='2' >
      <tr>
        <td width='200' align='center'>Menyetujui</td>
        <td width='200' align='center'>Mengetahui</td>
        <td width='200' align='center'>Pemegang Panjar </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>( $row->nama_app ) </td>
        <td align='center'>( $row->nama_app_panjar ) </td>
        <td align='center'>( $row->nama_buat ) </td>
      </tr>
      <tr>
        <td align='center'>NIK : $row->nik_app </td>
        <td align='center'>NIK : $row->nik_app_panjar</td>
        <td align='center'>NIK : $row->nik_buat </td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
