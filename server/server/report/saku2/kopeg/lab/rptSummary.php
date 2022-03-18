<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku2_kopeg_lab_rptSummary extends server_report_basic
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
		$userid=$tmp[0];
		$sts_userid=$tmp[1];
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		if ($sts_userid=="M")
		{
			$sql="select a.kode_kelas,b.nama as nama_kelas,b.kode_dosen,c.nama as nama_dosen,b.kode_matkul,f.nama as nama_matkul,
	   isnull(d.jum_mhs,0) as jml_mhs,isnull(e.jum_tugas,0) as jum_tugas,isnull(g.jum_close,0) as jum_close,isnull(h.jum_eval,0) as jum_eval
from (select a.kode_kelas,a.nim,a.kode_lokasi
	  from lab_kelas_mhs a
	  where a.nim='$userid'
	  group by a.kode_kelas,a.nim,a.kode_lokasi
	  )a
inner join lab_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi	
inner join lab_dosen c on b.kode_dosen=c.kode_dosen and b.kode_lokasi=c.kode_lokasi 
inner join lab_matkul f on b.kode_matkul=f.kode_matkul and b.kode_lokasi=f.kode_lokasi
left join (select kode_kelas,kode_lokasi,count(nim) as jum_mhs
		   from lab_kelas_mhs
		   group by kode_kelas,kode_lokasi
		   )d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
left join (select kode_kelas,kode_lokasi,count(no_tugas) as jum_tugas
		   from lab_tugas
		   group by kode_kelas,kode_lokasi
		   )e on a.kode_kelas=e.kode_kelas and a.kode_lokasi=e.kode_lokasi
left join (select b.kode_kelas,b.kode_lokasi,count(a.no_tugas) as jum_close
		   from lab_close a
	       inner join lab_tugas b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi 
		   group by b.kode_kelas,b.kode_lokasi
		   )g on a.kode_kelas=g.kode_kelas and a.kode_lokasi=g.kode_lokasi
left join (select c.kode_kelas,c.kode_lokasi,count(c.no_tugas) as jum_eval
		   from lab_eval a
		   inner join lab_close b on a.no_close=b.no_close and a.kode_lokasi=b.kode_lokasi 
	       inner join lab_tugas c on b.no_tugas=c.no_tugas and b.kode_lokasi=c.kode_lokasi 
		   group by c.kode_kelas,c.kode_lokasi
		   )h on a.kode_kelas=h.kode_kelas and a.kode_lokasi=h.kode_lokasi";
		
			$rs = $dbLib->execute($sql);	
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				echo "<table width='609' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='603'>Kelas : $row->kode_kelas - $row->nama_kelas </td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='157'>Nama Mata Kuliah </td>
        <td width='433'>: $row->kode_matkul - $row->nama_matkul </td>
      </tr>
      <tr>
        <td>Nama Dosen </td>
        <td> : $row->kode_dosen - $row->nama_dosen </td>
      </tr>
      <tr>
        <td>Jumlah Mahasiswa </td>
        <td>: ".number_format($row->jum_mhs,0,',','.')." </td>
      </tr>
   
      <tr>
        <td>Jumlah Tugas</td>
        <td>: ".number_format($row->jum_tugas,0,',','.')."</td>
      </tr>
      <tr>
        <td>Jumlah Tugas Close</td>
        <td>: ".number_format($row->jum_close,0,',','.')."</td>
      </tr>
     
      <tr>
        <td>Jumlah Penilaian</td>
        <td>: ".number_format($row->jum_eval,0,',','.')."</td>
      </tr>
	     <tr>
        <td>Jumlah Materi</td>
        <td>: a </td>
      </tr>
	   <tr>
        <td>Jumlah Pengumuman </td>
        <td>: a </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='3'>Tugas Dalam Pekerjaan </td>
        </tr> ";
		$sql="select b.no_tugas,b.nama,a.nim,b.kode_lokasi
from lab_kelas_mhs a 
inner join lab_tugas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi 
inner join lab_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
left join lab_close d on a.nim=d.nik_user and a.kode_lokasi=d.kode_lokasi and d.no_tugas=b.no_tugas 
where a.nim='$userid' and d.no_close is null ";
		$rs1 = $dbLib->execute($sql);	
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td width='120'>No Tugas </td>
			<td>: $row1->no_tugas </td>
			</tr>
		  <tr>
			<td>Nama Tugas</td>
			<td>: $row1->nama </td>
			</tr>
		  <tr>
			<td>Trail Laporan </td>
			<td align='left'>: 
			<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasJurnal('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Jurnal</a>
			| <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasBb('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Buku Besar</a> 
			| <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasTb('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Worksheet</a> 
			| <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasLr('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Laba Rugi</a> 
			| <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasModal('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Modal</a> 
			| <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasNeraca('$row1->kode_lokasi','$row1->no_tugas','$row1->nim','$userid');\">Neraca</a></td>
			</tr>";
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>";
			}
		}
		else
		{
			echo "<table width='609' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='603'>Nama Kelas </td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='157'>Nama Mata Kuliah </td>
          <td width='433'>: a </td>
        </tr>
        <tr>
          <td>Nama Dosen </td>
          <td> : a </td>
        </tr>
        <tr>
          <td>Jumlah Mahasiswa </td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Jumlah Materi</td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Jumlah Tugas</td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Jumlah Tugas Close</td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Jumlah Pengumuman </td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Jumlah Penilaian</td>
          <td>: a </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td colspan='3'>Tugas Dalam Penilaian </td>
        </tr>
        <tr>
          <td width='140'>No Tugas </td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Nama Tugas</td>
          <td>: a </td>
        </tr>
        <tr>
          <td>Nik - Nama </td>
          <td align='left'>: Jurnal | Buku Besar | Worksheet | Laba Rugi | Modal | Neraca</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>";
		}
		echo "<div align='center'>";  
		echo "</div>";
		
		
		
		return "";
		
	}
	
}
?>
