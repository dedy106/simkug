<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptAkun extends server_report_basic
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
		echo $AddOnLib->judul_laporan("daftar akun",$this->lokasi,"");
		$sql="select a.no_tugas,a.keterangan,a.kode_matkul,a.kode_dosen,a.kode_lokasi,
	   b.nama as nama_matkul,c.nama as nama_dosen,d.nama as nama_kelas,e.nik_user,f.nama as nama_mhs 
from lab_tugas a
inner join lab_matkul b on a.kode_matkul=b.kode_matkul and a.kode_lokasi=b.kode_lokasi
inner join lab_dosen c on a.kode_dosen=c.kode_dosen and a.kode_lokasi=c.kode_lokasi
inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
inner join (select nik_user,no_tugas,kode_lokasi 
			from lab_masakun a
			$this->filter
			group by nik_user,no_tugas,kode_lokasi
		    )e on a.no_tugas=e.no_tugas and a.kode_lokasi=e.kode_lokasi
inner join lab_mhs f on e.nik_user=f.nim and e.kode_lokasi=f.kode_lokasi ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
			
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>NIM</td>
        <td width='680' class='header_laporan'>: $row->nik_user </td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama_mhs </td>
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
        <td class='header_laporan'>Dosen</td>
        <td class='header_laporan'>: $row->kode_dosen - $row->nama_dosen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Mata Kuliah </td>
        <td class='header_laporan'>: $row->kode_matkul - $row->nama_matkul </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>";
		
	
	
		
		$sql="select a.kode_akun,a.nama,a.modul,a.jenis
from lab_masakun a
where a.no_tugas='$row->no_tugas' and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user'
order by a.nik_user,a.kode_akun";
		$rs1 = $dbLib->execute($sql);
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='500'  align='center' class='header_laporan'>Nama Akun</td>
	 
	
	  </tr>  ";
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row1->kode_akun</td>
	 <td class='isi_laporan'>$row1->nama</td>
	
	
     </tr>";
			$i=$i+1;
		}
	
		echo "</table>";
		echo "</td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
