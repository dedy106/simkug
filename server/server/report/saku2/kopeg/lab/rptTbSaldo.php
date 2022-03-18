<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptTbSaldo extends server_report_basic
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
		$trail=$tmp[1];
		$kode_neraca=$tmp[2];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";  
		$sql="select a.no_tugas,a.keterangan,a.kode_matkul,a.kode_dosen,a.kode_lokasi,a.nama,
	   b.nama as nama_matkul,c.nama as nama_dosen,d.nama as nama_kelas,e.nik_user,f.nama as nama_mhs 
from lab_tugas a
inner join lab_matkul b on a.kode_matkul=b.kode_matkul and a.kode_lokasi=b.kode_lokasi
inner join lab_dosen c on a.kode_dosen=c.kode_dosen and a.kode_lokasi=c.kode_lokasi
inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi
inner join (select nik_user,no_tugas,kode_lokasi 
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
			
			echo "<table width='1200' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='style16'>$row->nama</td>
  </tr>
  <tr>
    <td align='center' class='style16'>WORKSHEET</td>
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
		$sql="exec sp_lab_glma_tmp '$row->kode_lokasi','$row->no_tugas','$row->nik_user','$userid'";
		$rs = $dbLib->execute($sql);	
		if ($trail=="1")
		{
			$sql="select a.kode_akun,b.nama as nama_akun,a.no_tugas,a.kode_lokasi,a.nik_user,
					 a.debet,a.kredit,a.debet_adj,a.kredit_adj,
					 a.debet+a.debet_adj as sakhir_debet,
					 a.kredit+a.kredit_adj as sakhir_kredit,
	   case when b.modul='L' then a.debet+a.debet_adj else 0 end as lr_debet,
	   case when b.modul='L' then a.kredit+a.kredit_adj else 0 end as lr_kredit,
	   case when b.jenis='Neraca' then a.debet+a.debet_adj else 0 end as nrc_debet,
	   case when b.jenis='Neraca' then a.kredit+a.kredit_adj else 0 end as nrc_kredit
from lab_glma_tmp a
inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
inner join lab_relakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and a.no_tugas=c.no_tugas and a.nik_user=c.nik_user
where a.no_tugas='$row->no_tugas'  and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user' and a.userid='$userid' and c.kode_neraca='$kode_neraca'
order by a.kode_akun ";
		}
		else
		{
			$sql="select a.kode_akun,b.nama as nama_akun,a.no_tugas,a.kode_lokasi,a.nik_user,
					 a.debet,a.kredit,a.debet_adj,a.kredit_adj,
					 a.debet+a.debet_adj as sakhir_debet,
					 a.kredit+a.kredit_adj as sakhir_kredit,
	   case when b.modul='L' then a.debet+a.debet_adj else 0 end as lr_debet,
	   case when b.modul='L' then a.kredit+a.kredit_adj else 0 end as lr_kredit,
	   case when b.jenis='Neraca' then a.debet+a.debet_adj else 0 end as nrc_debet,
	   case when b.jenis='Neraca' then a.kredit+a.kredit_adj else 0 end as nrc_kredit
from lab_glma_tmp a
inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
where a.no_tugas='$row->no_tugas'  and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user' and a.userid='$userid' 
order by a.kode_akun ";
		}
		
		$rs1 = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='80' rowspan='2' class='header_laporan'>Kode Akun </td>
    <td width='200' rowspan='2' class='header_laporan'>Nama Akun </td>
    <td width='90' rowspan='2' class='header_laporan'>NERACA SALDO</td>
    <td width='90' colspan='2' class='header_laporan'>PENYESUAIAN </td>
    <td width='90' rowspan='2' class='header_laporan'>NERACA SALDO STLH PENYESUAIAN</td>
	<td width='90' rowspan='2' class='header_laporan'>LABA RUGI </td>
	<td width='90' colspan='2' rowspan='2' class='header_laporan'>NERACA </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Debet</td>
    <td width='90' align='center' class='header_laporan'>Kredit</td>
  </tr>
 
 
 ";
		$debet=0; $kredit=0; $debet_adj=0; $kredit_adj=0;
		$sakhir_debet=0; $sakhir_kredit=0; $lr_debet=0; $lr_kredit=0;
		$nrc_debet=0; $nrc_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet+=$row1->debet;
			$kredit+=$row1->kredit;
			$debet_adj+=$row1->debet_adj;
			$kredit_adj+=$row1->kredit_adj;
			$sakhir_debet+=$row1->sakhir_debet;
			$lr_debet+=$row1->lr_debet;
			$lr_kredit+=$row1->lr_kredit;
			$nrc_debet+=$row1->nrc_debet;
			$nrc_kredit+=$row1->nrc_kredit;
			
		echo " <tr>
    <td class='isi_laporan'>$row1->kode_akun</td>
     <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row1->kode_akun','$row1->kode_lokasi','$row1->no_tugas','$row1->nik_user');\">$row1->nama_akun</a>";
	echo "</td>
     <td class='isi_laporan' align='right'>".number_format($row1->debet-$row1->kredit,0,',','.')."</td>
      <td class='isi_laporan' align='right'>".number_format($row1->debet_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->kredit_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->sakhir_debet-$row1->sakhir_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->lr_debet-$row1->lr_kredit,0,',','.')."</td>
   <td class='isi_laporan' align='right'>".number_format($row1->nrc_debet-$row1->nrc_kredit,0,',','.')."</td>
    </tr>";
			$i=$i+1;
		}
		$lr_ditahan=$lr_kredit-$lr_debet;
		echo " <tr><td class='isi_laporan' align='center' colspan='2'>TOTAL</td>
     <td class='isi_laporan' align='right'>".number_format($debet-$kredit,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($debet_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($sakhir_debet-$sakhir_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($lr_debet-$lr_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nrc_debet-$nrc_kredit,0,',','.')."</td>
  </tr>";
			echo " <tr><td class='isi_laporan' align='center' colspan='6'>&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($lr_ditahan,0,',','.')."</td>
   
    <td class='isi_laporan' align='right'>".number_format($lr_ditahan,0,',','.')."</td>
  </tr>";
		echo " <tr><td class='isi_laporan' align='center' colspan='6'>&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($lr_debet+$lr_ditahan,0,',','.')."</td>
   
    <td class='isi_laporan' align='right'>".number_format($nrc_kredit+$lr_ditahan,0,',','.')."</td>
  </tr>";
		echo " 
</table>";
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
