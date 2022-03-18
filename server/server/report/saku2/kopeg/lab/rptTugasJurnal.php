<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptTugasJurnal extends server_report_basic
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
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";  
		echo $AddOnLib->judul_laporan("daftar JURNAL",$this->lokasi,"");
		$sql="select a.no_tugas,a.keterangan,a.kode_matkul,a.kode_dosen,a.kode_lokasi,
	   b.nama as nama_matkul,c.nama as nama_dosen,d.nama as nama_kelas,e.nik_user,f.nama as nama_mhs 
from lab_tugas a
inner join lab_matkul b on a.kode_matkul=b.kode_matkul and a.kode_lokasi=b.kode_lokasi
inner join lab_dosen c on a.kode_dosen=c.kode_dosen and a.kode_lokasi=c.kode_lokasi
inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
inner join (select nik_user,no_tugas,kode_lokasi 
			from lab_ju_m a
			$this->filter
			group by nik_user,no_tugas,kode_lokasi
		    )e on a.no_tugas=e.no_tugas and a.kode_lokasi=e.kode_lokasi
inner join lab_mhs f on e.nik_user=f.nim and e.kode_lokasi=f.kode_lokasi ";
		
		$rs = $dbLib->execute($sql);
			
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
		
		$sql="select a.nu,a.tanggal,a.keterangan,a.jenis,isnull(b.jml,0) as jml 
from lab_tugas_d a 
left join (select no_tugas,kode_lokasi,id_soal,count(id_soal) as jml 
           from lab_ju_m 
           where nik_user='$row->nik_user' and no_tugas='$row->no_tugas' and kode_lokasi='$row->kode_lokasi' 
           group by no_tugas,kode_lokasi,id_soal
           ) b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and a.nu=b.id_soal    
where a.no_tugas='$row->no_tugas' and a.kode_lokasi='$row->kode_lokasi' 
order by a.nu ";
		
		$rs1 = $dbLib->execute($sql);
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='500'  align='center' class='header_laporan'>Deskripsi</td>
	  <td width='60'  align='center' class='header_laporan'>Jenis</td>
       <td width='60'  align='center' class='header_laporan'>Jml Jawab</td>
	  </tr>  ";
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		echo "<tr>
     <td class='isi_laporan' align='center'>$i</td>
	   <td class='isi_laporan'>$row1->tanggal</td> ";
	 echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_tugas','$row->kode_lokasi','$row1->nu','$row->nik_user');\">$row1->keterangan</a> </td>";
	 echo "<td class='isi_laporan'>$row1->jenis</td>
	 <td class='isi_laporan' align='center'>$row1->jml</td>
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
