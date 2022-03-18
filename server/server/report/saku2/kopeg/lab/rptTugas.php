<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptTugas extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$nik_user=$tmp[1];
		$no_tugas=$tmp[2];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";  
		
		$sql="select a.no_tugas,a.nama,a.keterangan,a.kode_dosen,a.kode_kelas,b.nama as nama_matkul,c.nama as nama_dosen,a.kode_kelas,d.nama as nama_kelas,a.kode_lokasi,
date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai	,a.kode_matkul	
from lab_tugas a
inner join lab_matkul b on a.kode_matkul=b.kode_matkul and a.kode_lokasi=b.kode_lokasi
inner join lab_dosen c on a.kode_dosen=c.kode_dosen and a.kode_lokasi=c.kode_lokasi
inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
$this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
			
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='style16'>$row->nama</td>
  </tr>
  <tr>
    <td align='center' class='style16'>TUGAS JURNAL</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>";
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
     <tr>
        <td class='header_laporan' width='120'>Dosen</td>
        <td class='header_laporan' width='680'>: $row->kode_dosen - $row->nama_dosen </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Tugas </td>
        <td class='header_laporan'>: $row->no_tugas </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Mata Kuliah </td>
        <td class='header_laporan'>: $row->kode_matkul - $row->nama_matkul </td>
      </tr>
	  <tr>
        <td class='header_laporan'>Jangka Waktu</td>
        <td class='header_laporan'>: $row->tgl_mulai sd $row->tgl_selesai </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>";
		
	
	
		
		$sql="select a.nu,a.tanggal,a.keterangan,a.jenis
from lab_tugas_d a 
where a.no_tugas='$row->no_tugas' and a.kode_lokasi='$row->kode_lokasi' 
order by a.nu ";
		
		$rs1 = $dbLib->execute($sql);
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='500'  align='center' class='header_laporan'>Deskripsi</td>
	  <td width='60'  align='center' class='header_laporan'>Jenis</td>

	  </tr>  ";
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	   <td class='isi_laporan'>$row1->tanggal</td>
	 <td class='isi_laporan'>$row1->keterangan</td>
	 <td class='isi_laporan'>$row1->jenis</td>
	 </tr>";
			$i=$i+1;
		}
	
		echo "</td>
  </tr>
</table>";
			echo "</td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
