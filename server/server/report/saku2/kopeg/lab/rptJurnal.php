<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptJurnal extends server_report_basic
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
		
		$sql="select a.no_ju as no_bukti,c.nama,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.kode_akun,a.posted,b.keterangan,
		case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit 
		         from lab_ju_m a 
				 inner join lab_ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
			     inner join lab_masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and b.no_tugas=c.no_tugas and b.nik_user=c.nik_user
				 where a.no_tugas='$row->no_tugas' and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user'
				 order by a.no_ju ";
	
		$rs1 = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='70' class='header_laporan' align='center'>No Bukti</td>
	 <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='50' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='150' class='header_laporan' align='center'>Nama Akun </td>
    <td width='30' class='header_laporan' align='center'>Posted</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row1->no_bukti; 
			if ($tmp!=$row1->no_bukti)
			{
				$tmp=$row1->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row1->debet;
			$kredit=$kredit+$row1->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan' align='center'>$i</td>
    <td valign='middle' class='isi_laporan'>$row1->no_bukti</td>
	<td height='20' valign='middle' class='isi_laporan'>$row1->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row1->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".$row1->nama."</td>
 	  <td valign='middle' class='isi_laporan' align='center'>$row1->posted</td>
    <td valign='middle' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row1->kredit,0,',','.')."</td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
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
