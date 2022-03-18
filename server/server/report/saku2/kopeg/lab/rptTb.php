<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_lab_rptTb extends server_report_basic
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
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
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
		
		$rs = $dbLib->execute($sql);	
			
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
		
		$id_dosen=$row->kode_dosen."_".$userid;
		$sql2="exec sp_lab_glma_tmp '$row->kode_lokasi','$row->no_tugas','$row->kode_dosen','$id_dosen'";
		
		$rs = $dbLib->execute($sql);	
		$rs = $dbLib->execute($sql2);	
		if ($trail=="1")
		{
			$sql="select a.kode_akun,b.nama as nama_akun,a.no_tugas,a.kode_lokasi,a.nik_user,
					 case when a.debet-a.kredit>=0 then a.debet-a.kredit else 0 end as debet ,
					 case when a.debet-a.kredit<0 then a.debet-a.kredit else 0 end as kredit,
					 a.debet_adj,a.kredit_adj,
					 case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end as sakhir_debet ,
					 case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end as sakhir_kredit,
					 case when b.modul='L' then (case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as lr_debet,
	   case when b.modul='L' then (case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as lr_kredit,
	   case when b.jenis='Neraca' then (case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as nrc_debet,
	   case when b.jenis='Neraca' then (case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as nrc_kredit,
		a.debet+a.debet_adj-a.kredit-a.kredit_adj as saldo_mhs, c.debet+c.debet_adj-c.kredit-c.kredit_adj as saldo_dosen
from lab_glma_tmp a
inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
inner join lab_relakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and a.no_tugas=c.no_tugas and a.nik_user=c.nik_user
left join lab_glma_tmp d on  a.no_tugas=d.no_tugas and a.kode_lokasi=d.kode_lokasi and a.kode_akun=d.kode_akun
where a.no_tugas='$row->no_tugas'  and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user' and a.userid='$userid' and c.kode_neraca='$kode_neraca' and d.userid='$id_dosen' 
order by a.kode_akun ";
		}
		else
		{
			$sql="select a.kode_akun,b.nama as nama_akun,a.no_tugas,a.kode_lokasi,a.nik_user,
					 case when a.debet-a.kredit>=0 then a.debet-a.kredit else 0 end as debet ,
					 abs(case when a.debet-a.kredit<0 then a.debet-a.kredit else 0 end) as kredit,
					 a.debet_adj,abs(a.kredit_adj) as kredit_adj,
					 case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end as sakhir_debet ,
					 abs(case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) as sakhir_kredit,
					 case when b.modul='L' then (case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as lr_debet,
	   abs(case when b.modul='L' then (case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end) as lr_kredit,
	   case when b.jenis='Neraca' then (case when a.debet+a.debet_adj-a.kredit-a.kredit_adj>=0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end as nrc_debet,
	   abs(case when b.jenis='Neraca' then (case when  a.debet+a.debet_adj-a.kredit-a.kredit_adj<0 then a.debet+a.debet_adj-a.kredit-a.kredit_adj else 0 end) else 0 end) as nrc_kredit,
	   a.debet+a.debet_adj-a.kredit-a.kredit_adj as saldo_mhs, c.debet+c.debet_adj-c.kredit-c.kredit_adj as saldo_dosen
from lab_glma_tmp a
inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user
left join lab_glma_tmp c on  a.no_tugas=c.no_tugas and a.kode_lokasi=c.kode_lokasi and a.kode_akun=c.kode_akun
where a.no_tugas='$row->no_tugas'  and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$row->nik_user' and a.userid='$userid' and c.userid='$id_dosen' 
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
    <td colspan='2' class='header_laporan'>NERACA SALDO</td>
    <td colspan='2' class='header_laporan'>PENYESUAIAN </td>
    <td colspan='2' class='header_laporan'>NERACA SALDO STLH PENYESUAIAN</td>
	<td colspan='2' class='header_laporan'>LABA RUGI </td>
	<td colspan='2' class='header_laporan'>NERACA </td>
	<td width='60' rowspan='2' class='header_laporan'>Evaluasi</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>Debet</td>
    <td width='80' align='center' class='header_laporan'>Kredit</td>
    <td width='80' align='center' class='header_laporan'>Debet</td>
    <td width='80' align='center' class='header_laporan'>Kredit</td>
    <td width='80' align='center' class='header_laporan'>Debet</td>
    <td width='80' align='center' class='header_laporan'>Kredit</td>
	<td width='80' align='center' class='header_laporan'>Debet</td>
    <td width='80' align='center' class='header_laporan'>Kredit</td>
	<td width='80' align='center' class='header_laporan'>Debet</td>
    <td width='80' align='center' class='header_laporan'>Kredit</td>
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
			$sakhir_kredit+=$row1->sakhir_kredit;
			$lr_debet+=$row1->lr_debet;
			$lr_kredit+=$row1->lr_kredit;
			$nrc_debet+=$row1->nrc_debet;
			$nrc_kredit+=$row1->nrc_kredit;
			$awal_debet=0; $awal_kredit=0;
			$lampu= $path ."image/red.png";
			if ($row1->saldo_mhs==$row1->saldo_dosen)
			{
				$lampu= $path ."image/green.png";
			}
			
		echo " <tr>
    <td class='isi_laporan'>$row1->kode_akun</td>
     <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row1->kode_akun','$row1->kode_lokasi','$row1->no_tugas','$row1->nik_user');\">$row1->nama_akun</a>";
	echo "</td>
     <td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->debet_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->kredit_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->sakhir_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->sakhir_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->lr_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->lr_kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->nrc_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->nrc_kredit,0,',','.')."</td>
	<td class='isi_laporan' align='center'><img src=$lampu  /></td>
  </tr>";
			$i=$i+1;
		}
		$lr_ditahan=$lr_kredit-$lr_debet;
		echo " <tr><td class='isi_laporan' align='center' colspan='2'>TOTAL</td>
     <td class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_adj,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($sakhir_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($sakhir_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($lr_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($lr_kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($nrc_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nrc_kredit,0,',','.')."</td>
  </tr>";
		
		$lr_ditahan_debet="";$lr_ditahan_kredit="";
		if ($lr_debet<$lr_kredit)
		{
			$lr_ditahan_debet=$lr_ditahan;
			
		}
		if ($lr_kredit<$lr_debet)
		{
			
			$lr_ditahan_kredit=$lr_ditahan;
		}
		
		$nrc_ditahan_debet="";$nrc_ditahan_kredit="";
		if ($nrc_debet<$nrc_kredit)
		{
			$nrc_ditahan_debet=$lr_ditahan;
			
		}
		if ($nrc_kredit<$nrc_debet)
		{
			
			$nrc_ditahan_kredit=$lr_ditahan;
		}
		
		echo " <tr><td class='isi_laporan' align='center' colspan='8'>&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($lr_ditahan_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($lr_ditahan_kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($nrc_ditahan_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nrc_ditahan_kredit,0,',','.')."</td>
  </tr>";
  
		echo " <tr><td class='isi_laporan' align='center' colspan='8'>&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($lr_debet+$lr_ditahan_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($lr_kredit+$lr_ditahan_kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($nrc_debet+$nrc_ditahan_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nrc_kredit+$nrc_ditahan_kredit,0,',','.')."</td>
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
