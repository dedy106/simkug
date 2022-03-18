<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptJadwal extends server_report_basic
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_ta,a.kode_kelas,c.nama as kls,b.nama as ta,d.kode_jur, d.nama as jur
from (select a.kode_lokasi,a.kode_kelas,a.kode_ta,a.kode_pp 
from sis_jadwal a
$this->filter
group by a.kode_lokasi,a.kode_kelas,a.kode_ta,a.kode_pp 
	)a
inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
inner join sis_jur d on d.kode_jur=c.kode_jur and a.kode_lokasi=d.kode_lokasi and d.kode_pp=c.kode_pp
order by a.kode_kelas ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar jadwal",$this->lokasi."<br>".$nama_pp,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Tahun ajaran</td>
        <td width='360' class='header_laporan'>: $row->ta</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->kls</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Jurusan</td>
        <td width='360' class='header_laporan'>: $row->jur</td>
      </tr>	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='60' class='header_laporan' align='center'>Jam</td>
    <td width='100' class='header_laporan' align='center'>Senin</td>
    <td width='100' class='header_laporan' align='center'>Selasa</td>
	<td width='100'  class='header_laporan' align='center'>Rabu</td>	
	<td width='100' class='header_laporan' align='center'>Kamis</td>	
	<td width='100' class='header_laporan' align='center'>Jumat</td>
	<td width='100' class='header_laporan' align='center'>Sabtu</td>
	<td width='100' class='header_laporan' align='center'>Minggu</td>

	</tr>

";
			
			$sql="select a.kode_slot,b.nama as slot,
			case when a.kode_hari='1' then concat (c.nama, '-' ,a.kode_matpel) end as senin,
			case when a.kode_hari='2' then concat (c.nama, '-' ,a.kode_matpel) end as selasa,
			case when a.kode_hari='3' then concat (c.nama, '-' ,a.kode_matpel) end as rabu,
			case when a.kode_hari='4' then concat (c.nama, '-' ,a.kode_matpel) end as kamis,
			case when a.kode_hari='5' then concat (c.nama, '-' ,a.kode_matpel) end as jumat,
			case when a.kode_hari='6' then concat (c.nama, '-' ,a.kode_matpel) end as sabtu,
			case when a.kode_hari='7' then concat (c.nama, '-' ,a.kode_matpel) end as minggu
from sis_jadwal a
inner join sis_slot b on a.kode_slot=b.kode_slot and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.kode_guru=c.nik and a.kode_lokasi=c.kode_lokasi
inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_slot
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan' align='center'>$row1->slot</td>
     <td class='isi_laporan'>$row1->senin</td>
	 <td class='isi_laporan'>$row1->selasa</td>
     <td class='isi_laporan'>$row1->rabu</td>
      <td class='isi_laporan'>$row1->kamis</td>
     <td class='isi_laporan'>$row1->jumat</td>
     <td class='isi_laporan'>$row1->sabtu</td>
     <td class='isi_laporan'>$row1->minggu</td>

 </tr>";
				
			}
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
