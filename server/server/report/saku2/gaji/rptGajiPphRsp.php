<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiPphRsp extends server_report_basic
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
		
		$sql="select a.nik,a.nama,a.kode_lokasi,a.sts_pajak,d.nama as nama_jab,
		isnull(b.gaji,0)*12 as gaji,isnull(b.tjms,0) as tjms,(isnull(b.gaji,0)*12)+isnull(b.tjms,0) as bruto,isnull(b.pjms,0) as pjms,
		isnull(b.ppph,0) as ppph,isnull(b.ppph,0)*12 as ppph_thn
from hr_karyawan a
inner join hr_status_pajak c on a.sts_pajak=c.sts_pajak and a.kode_lokasi=c.kode_lokasi 
left join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi
inner join (select a.nik,a.kode_lokasi,
				   sum(case when a.kode_param='PJMS' then a.nilai else 0 end) as pjms,
				   sum(case when a.kode_param='PPPH' then a.nilai else 0 end) as ppph,
				   sum(case when a.kode_param='GDAS' then a.nilai else 0 end) as gdas,
				   sum(case when a.kode_param='TDAS' then a.nilai else 0 end) as tdas,
				   sum(case when a.kode_param='TJMS' then a.nilai else 0 end) as tjms,
				   sum(case when a.kode_param='TPOS' then a.nilai else 0 end) as tpos,
				   sum(case when a.kode_param='TPRS' then a.nilai else 0 end) as tprs,
				   sum(case when a.kode_param='TRET' then a.nilai else 0 end) as tret,
				   sum(case when a.kode_param in ('GDAS','TDAS','TPOS','TRET','TPRS') then a.nilai else 0 end) as gaji
			from hr_gaji_d a
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.nama	";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan pph21",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No Urut </td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Karyawan</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Jabatan</td>
    <td colspan='5' align='center' class='header_laporan'>Penghasilan </td>
    <td colspan='4' align='center' class='header_laporan'>Pengurangan</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>PPh Pasal 21 Terhutang Setahun</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>PPh Pasal 21 Ditanggung Pemerintah</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>PPh Pasal 21 Yang Harus Dipotong</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Angsuran PPh Pasal 21 Setahun</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>PPh Pasal 21 ( Kurang ) Lebih Bayar</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Gaji</td>
    <td width='90' align='center' class='header_laporan'>Tunjangan Cuti</td>
    <td width='90' align='center' class='header_laporan'>THR</td>
    <td width='90' align='center' class='header_laporan'>PREMI JAMSOSTEK PERUSAHAAN</td>
	 <td width='90' align='center' class='header_laporan'>Penghasilan Brutto</td>
    <td width='90' align='center' class='header_laporan'>B. Jabatan </td>
	<td width='90' align='center' class='header_laporan'>B. Jabatan THR</td>
    <td width='90' align='center' class='header_laporan'>PREMI JAMSOSTEK JHT KARY</td>
	<td width='90' align='center' class='header_laporan'>Total B. Jabatan</td>
  </tr>";
		$rs = $dbLib->execute($sql);
		$gaji=0; $tjms=0; $bruto=0; $pjms=0; $ppph=0; $ppph_thn=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gaji+=$row->gaji;
			$tjms+=$row->tjms;
			$bruto+=$row->bruto;
			$pjms+=$row->pjms;
			$ppph+=$row->ppph;
			$ppph_thn+=$row->ppph_thn;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->nama_jab</td>
   <td align='right' class='isi_laporan'>".number_format($row->gaji,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->tjms,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->bruto,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->pjms,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->ppph_thn,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->ppph,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->pdpt,0,',','.')."</td>
  </tr>";
			$i+=1;
		}
  echo "<tr>
    <td colspan='4' align='right' class='header_laporan'>Total</td>
   <td align='right' class='header_laporan'>".number_format($gaji,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($tjms,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($bruto,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($pjms,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($ppph_thn,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($ppph,0,',','.')."</td>
	<td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($pdpt,0,',','.')."</td>
  </tr>
</table> ";
		$nilai=0;
		
		echo "</div>";
		return "";
		
	}
	
}
?>
