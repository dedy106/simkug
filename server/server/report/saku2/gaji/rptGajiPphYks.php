<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiPphYks extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$no_gaji=$tmp[2];
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
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$no_gaji=$tmp[2];
		
		$sql="select a.nik,a.nama,a.kode_lokasi,a.sts_pajak,
	   isnull(b.gdas,0) as gdas,isnull(b.tdas,0) as tdas,isnull(b.tpos,0) as tpos,isnull(b.rapl,0) as rapl,isnull(b.pdpt,0) as pdpt,isnull(b.cuti,0) as cuti,
	   case when (0.05*isnull(b.pdpt,0))>500000 then 500000 else (0.05*isnull(b.pdpt,0)) end as bjab,
	   isnull(b.tdpl,0) as tht,isnull(b.tpph,0) as tpph,isnull(b.tpph,0)*12 as tpph_thn,
	   (case when (c.biaya_jab/100)*(isnull(b.pdpt,0)-isnull(b.tdpl,0))*12 > c.jab_max then c.jab_max/12 else  (c.biaya_jab/100)*(isnull(b.pdpt,0)-isnull(b.tdpl,0))*12 end )+isnull(b.tdpl,0) as beban,
	   c.nilai as ptkp
from hr_karyawan a
inner join hr_status_pajak c on a.sts_pajak=c.sts_pajak and a.kode_lokasi=c.kode_lokasi 
inner join (select a.nik,a.kode_lokasi,
				   sum(case when a.kode_param='GDAS' then a.nilai else 0 end) as gdas,
				   sum(case when a.kode_param='TDAS' then a.nilai else 0 end) as tdas,
				   sum(case when a.kode_param='TPOS' then a.nilai else 0 end) as tpos,
				   sum(case when a.kode_param='RAPL' then a.nilai else 0 end) as rapl,
				   sum(case when a.kode_param='TDPL' then a.nilai else 0 end) as tdpl,
				   sum(case when a.kode_param='CUTI' then a.nilai else 0 end) as cuti,
				   sum(case when a.kode_param='TPPH' then a.nilai else 0 end) as tpph,
				   sum(case when a.kode_param in ('GDAS','TDAS','TPOS','RAPL','CUTI') then a.nilai else 0 end) as pdpt
			from hr_gaji_d a
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.nik	";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan pph21",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='2000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='3' align='center' class='header_laporan'>NO</td>
	<td rowspan='3' align='center' class='header_laporan'>NIK</td>
    <td rowspan='3' align='center' class='header_laporan'>NAMA</td>
	<td rowspan='3' align='center' class='header_laporan' width='60'>STATUS PAJAK</td>
    <td colspan='8' align='center' class='header_laporan'>PENGHASILAN</td>
    <td>&nbsp;</td>
    <td align='center' class='header_laporan'>PENGHASILAN</td>
    <td align='center' class='header_laporan'>PENGHASILAN</td>
    <td colspan='2' align='center' class='header_laporan'>(-) PTKP SETAHUN</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center' class='header_laporan'>PTKP</td>
    <td>&nbsp;</td>
    <td align='center' class='header_laporan'>TARIF PASAL</td>
    <td align='center' class='header_laporan' >PPh Pasal 21</td>
	 <td align='center' class='header_laporan' >PPh Pasal 21</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>GAJI</td>
    <td colspan='5' align='center' class='header_laporan'>TUNJANGAN</td>
    <td align='center' class='header_laporan'>BRUTO</td>
    <td align='center' class='header_laporan'>BIAYA</td>
    <td align='center' class='header_laporan'>IURAN</td>
    <td align='center' class='header_laporan'>JUMLAH</td>
    <td align='center' class='header_laporan'>NETTO</td>
    <td align='center' class='header_laporan'>NETTO</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>PEGAWAI</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>TANGGUNGAN</td>
    <td align='center' class='header_laporan'>JUMLAH</td>
    <td align='center' class='header_laporan'>JUMLAH</td>
    <td align='center' class='header_laporan'>I TAHUN</td>
    <td>&nbsp;</td>
    <td align='center' class='header_laporan'>17 UU PPh</td>
    <td align='center' class='header_laporan'>Terutang</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='80'>DASAR</td>
    <td align='center' class='header_laporan' width='80'>DASAR</td>
    <td align='center' class='header_laporan' width='80'>STRUKTURAL</td>
    <td align='center' class='header_laporan' width='80'>RAPEL</td>
	<td align='center' class='header_laporan' width='80'>CUTI</td>
    <td align='center' class='header_laporan' width='80'>DPLK</td>
    <td align='center' class='header_laporan' width='80'>SEBULAN</td>
    <td align='center' class='header_laporan' width='80'>JABATAN</td>
    <td align='center' class='header_laporan' width='80'>THT</td>
    <td align='center' class='header_laporan' width='80'>PENGURANG</td>
    <td align='center' class='header_laporan' width='80'>SEBULAN</td>
    <td align='center' class='header_laporan' width='80'>SETAHUN</td>
    <td align='center' class='header_laporan' width='80'>PTKP</td>
    <td align='center' class='header_laporan' width='80'>PKP SETAHUN</td>
    <td align='center'>&nbsp;</td>
    <td align='center'>%</td>
    <td align='center' class='header_laporan' width='80'>5%</td>
    <td align='center' class='header_laporan' width='80' width='80'>SEBULAN</td>
  </tr> ";
		$nilai=0;
		$sql2="select nilai from hr_status_pajak where  kode_lokasi='04' and sts_pajak='TK/00'";
		$rs2 = $dbLib->execute($sql2);
		$row2 = $rs2->FetchNextObject($toupper=false);
		$pajak_tk=$row2->nilai; 
		
		$sql2="select nilai from hr_status_pajak where  kode_lokasi='04' and sts_pajak='K/00'";
		$rs2 = $dbLib->execute($sql2);
		$row2 = $rs2->FetchNextObject($toupper=false);
		$pajak_k=$row2->nilai;
		$gdas=0; $tdas=0; $tpos=0; $rapl=0; $tht=0; $pdpt=0; $bjab=0; $ptkp=0; 
		$pajak_peg_tot=0; $pajak_anak_tot=0; $pph_thn_tot=0; $pph_bln_tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gdas+=$row->gdas;
			$tdas+=$row->gdas;
			$tpos+=$row->tpos;
			$rapl+=$row->rapl;
			$tht+=$row->tht;
			$bjab+=$row->bjab;
			$pdpt+=$row->pdpt;
			$ptkp+=$row->ptkp;
			if (substr($row->sts_pajak,0,1)=="T")
			{
				$pajak_peg=$pajak_tk;
				$pajak_anak=intval(substr($row->sts_pajak,3,2))*($pajak_k-$pajak_tk);
			}
			if (substr($row->sts_pajak,0,1)=="K")
			{
				$pajak_peg=$pajak_k;
				$pajak_anak=intval(substr($row->sts_pajak,2,2))*($pajak_k-$pajak_tk);
			}
			$pajak_peg_tot+=$pajak_peg;
			$pajak_anak_tot+=$pajak_anak;
			
			$pkp=($row->pdpt-$row->bjab-$row->tht)*12 - $row->ptkp; 
			$sql2="select persen from hr_pph21 where ($pkp between bawah and atas) and kode_lokasi='04' ";
			$rs2 = $dbLib->execute($sql2);
			$row2 = $rs2->FetchNextObject($toupper=false);
			$persen=$row2->persen; 
		
			
			$pph_thn_tot+=$row->tpph_thn;
			$pph_bln_tot+=$row->tpph;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='center'>$row->sts_pajak</td>
    <td align='right' class='isi_laporan'>".number_format($row->gdas,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->tdas,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->tpos,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->rapl,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->cuti,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->tht,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->bjab,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->tht,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->bjab+$row->tht,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->pdpt-$row->bjab-$row->tht,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format(($row->pdpt-$row->bjab-$row->tht)*12,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($pajak_peg,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($pajak_anak,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->ptkp,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format(($row->pdpt-$row->bjab-$row->tht)*12 - $row->ptkp,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format(($row->pdpt-$row->bjab-$row->tht)*12 - $row->ptkp,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($persen,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->tpph_thn,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->tpph,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td align='center' class='isi_laporan' colspan='5'>TOTAL</td>
	<td align='right' class='isi_laporan'>".number_format($gdas,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($tdas,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($tpos,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($rapl,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($tht,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($pdpt,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($bjab,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($tht,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($bjab+$tht,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($pdpt-$bjab-$tht,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format(($pdpt-$bjab-$tht)*12,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($pajak_peg_tot,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($pajak_anak_tot,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($ptkp,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format(($pdpt-$bjab-$tht)*12 - $ptkp,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format(($pdpt-$bjab-$tht)*12 - $ptkp,0,',','.')."</td>
    <td align='center' class='isi_laporan'>&nbsp;</td>
     <td align='right' class='isi_laporan'>".number_format($pph_thn_tot,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($pph_bln_tot,0,',','.')."</td>
  </tr>";
		
		echo "</table> ";
		echo "</div>";
		return "";
		
	}
	
}
?>
