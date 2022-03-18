<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptReview extends server_report_basic
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$kode_dosen=$tmp[2];
		$no_tugas=$tmp[3];
		$tmp=explode("_",$nik_user);
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";  
		echo $AddOnLib->judul_laporan("penilaian",$this->lokasi,"");
		$sql="select a.no_tugas,a.keterangan,a.kode_matkul,a.kode_dosen,a.kode_lokasi,
	   b.nama as nama_matkul,c.nama as nama_dosen,d.nama as nama_kelas
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
			echo "<table width='1200' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
     <tr>
        <td class='header_laporan'>Dosen</td>
        <td class='header_laporan'>: $row->kode_dosen - $row->nama_dosen </td>
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
    </table></td>
  </tr>
  <tr>
    <td>";
		
	
	
		
		$sql="select a.nim,c.nama,isnull(convert(varchar,d.tanggal,103),'-') as tgl,isnull(d.catatan,'-') as catatan,isnull(d.no_close,'-') as no_close,isnull(d.no_eval,'-') as no_eval,isnull(d.nilai,'-') as nilai,isnull(e.jumlah,0) as jumlah  
from lab_kelas_mhs a 
inner join lab_tugas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi 
inner join lab_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
left join lab_close d on a.nim=d.nik_user and a.kode_lokasi=d.kode_lokasi and d.no_tugas=b.no_tugas 
left join (select nik_user,kode_lokasi,count(no_ju) as jumlah
			from lab_ju_m
			where no_tugas='$row->no_tugas' and kode_lokasi='$row->kode_lokasi' and jenis<>'SALDO'
			group by nik_user,kode_lokasi
		   ) e on  a.nim=e.nik_user and a.kode_lokasi=e.kode_lokasi 
where b.no_tugas='$row->no_tugas' and b.kode_lokasi='$row->kode_lokasi' 
order by a.nim ";
		$rs1 = $dbLib->execute($sql);
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='80' rowspan='2'  align='center' class='header_laporan'>NIM</td>
	  <td width='200' rowspan='2'  align='center' class='header_laporan'>Nama</td>
	  <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='100' rowspan='2'  align='center' class='header_laporan'>No Close</td>
	  <td width='200' rowspan='2'  align='center' class='header_laporan'>Catatan</td>
	  <td width='100' rowspan='2'  align='center' class='header_laporan'>No Eval</td>
	  <td width='60' rowspan='2'  align='center' class='header_laporan'>Nilai</td>
	   <td width='60' rowspan='2'  align='center' class='header_laporan'>Jumlah Jurnal</td>
	  <td colspan='6'  align='center' class='header_laporan'>Laporan</td>
	  </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='60'  align='center' class='header_laporan'>Jurnal</td>
     <td width='60'  align='center' class='header_laporan'>Buku Besar </td>
     <td width='60'  align='center' class='header_laporan'>Worksheet</td>
     <td width='60'  align='center' class='header_laporan'>Laba Rugi </td>
     <td width='60'  align='center' class='header_laporan'>Modal</td>
     <td width='60'  align='center' class='header_laporan'>Neraca</td>
   </tr>  ";
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$userid=$row1->nim."_".$tmp[1];
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row1->nim</td>
	   <td class='isi_laporan'>$row1->nama</td>
	 <td class='isi_laporan'>$row1->tgl</td>
	 <td class='isi_laporan'>$row1->no_close</td>
	 <td class='isi_laporan'>$row1->catatan</td>
	 <td class='isi_laporan'>$row1->no_eval</td>
	 <td class='isi_laporan' align='center'>$row1->nilai</td>
	 <td class='isi_laporan' align='center'>$row1->jumlah</td>
	 <td class='isi_laporan' align='center' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasJurnal('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasBb('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasTb('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
	<td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasLr('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasModal('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTugasNeraca('$row->kode_lokasi','$row->no_tugas','$row1->nim','$userid');\">View</a></td>
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
