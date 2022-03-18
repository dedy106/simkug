<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptBukuBesar extends server_report_basic
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
		$sql="select a.no_tugas,a.keterangan,a.kode_matkul,a.kode_dosen,a.kode_lokasi,a.nama,isnull(e.nilai,0) as so_awal,
	   b.nama as nama_matkul,c.nama as nama_dosen,d.nama as nama_kelas,e.nik_user,f.nama as nama_mhs 
from lab_tugas a
inner join lab_matkul b on a.kode_matkul=b.kode_matkul and a.kode_lokasi=b.kode_lokasi
inner join lab_dosen c on a.kode_dosen=c.kode_dosen and a.kode_lokasi=c.kode_lokasi
inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
inner join (select nik_user,no_tugas,kode_lokasi,sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai 
			from lab_gldt a
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
    <td align='center' class='style16'>$row->nama</td>
  </tr>
  <tr>
    <td align='center' class='style16'>BUKU BESAR</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>";
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
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
		
		$sql = "select a.kode_akun,b.nama as nama_akun,a.no_tugas,a.kode_lokasi,a.no_tugas,a.nik_user
from (select a.kode_akun,a.no_tugas,a.kode_lokasi,a.nik_user
from lab_gldt a
$this->filter
group by a.kode_akun,a.no_tugas,a.kode_lokasi,a.nik_user
	  )a
inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
where a.no_tugas='$row->no_tugas'  and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user'
order by a.kode_akun ";
		
		$rs1 = $dbLib->execute($sql);
		
		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
				  <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row1->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row1->nama_akun</td>
                  </tr>
                  
                </table></td>
     </tr>
 
 
  <tr bgcolor='#CCCCCC'>
    
	  <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
	<td width='80' height='23' class='header_laporan' align='center'>Referensi</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";
			$sql="select a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.keterangan,a.kode_lokasi,a.no_tugas,a.nik_user,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
from lab_gldt a
where a.kode_lokasi='$row1->kode_lokasi'  and a.kode_akun='$row1->kode_akun' and a.no_tugas='$row1->no_tugas' and a.nik_user='$row1->nik_user'	 
order by a.tanggal,a.jenis  ";
			
			$rs2 = $dbLib->execute($sql);
			$saldo=0;
			$debet=0;
			$kredit=0;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row2->debet - $row2->kredit;	
				$debet=$debet+$row2->debet;
				$kredit=$kredit+$row2->kredit;	
				echo "<tr>";
				echo "</td>
	 <td height='23' valign='top' class='isi_laporan'>".$row2->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row2->keterangan."</td>";
				echo "<td valign='top' class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row2->no_bukti','$row2->kode_lokasi','$row2->no_tugas','$row2->nik_user');\">$row2->no_bukti</a>";
				echo "</td>
     <td valign='top' class='isi_laporan' align='right'>".number_format($row2->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row2->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
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
