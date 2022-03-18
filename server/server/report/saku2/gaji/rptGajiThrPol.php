<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiThrPol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		$bulan=strtoupper($AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>"; 
		echo "<table width='1500' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'  class='style16'>DAFTAR PEMBAYARAN HARI RAYA (THR) PEGAWAI YAYASAN PENDIDIKAN TELKOM DI LINGKUNGAN POLITEKNIK TELKOM</td>
  </tr>
  <tr>
    <td align='center'  class='style16'>PERIODE BULAN $bulan </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' >
      <tr align='center' bgcolor='#CCCCCC'>
        <td colspan='5' class='header_laporan'>DATA PEGAWAI</td>
        <td colspan='4' class='header_laporan'>BOBOT TJ. STRUKTURAL</td>
        <td colspan='6' class='header_laporan'>TUNJANGAN</td>
        <td colspan='6' class='header_laporan'>POTONGAN</td>
        <td colspan='3' class='header_laporan'>JUMLAH</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='20' class='header_laporan'>NO</td>
        <td width='200' class='header_laporan'>NAMA LENGKAP</td>
        <td width='100' class='header_laporan'>STATUS PEG </td>
		 <td width='100' class='header_laporan'>NIP</td>
        <td width='100' class='header_laporan'>GRADE POSISI </td>
        <td width='60' class='header_laporan'>INDEX BOBOT POSISI </td>
        <td width='60' class='header_laporan'>INDEX KRITERIA </td>
        <td width='60' class='header_laporan'>INDEX BOBOT UNIT</td>
        <td width='80' class='header_laporan'>TARIF TUNJANGAN POSISI</td>
        <td width='80' class='header_laporan'>GAJI DASAR</td>
        <td width='80' class='header_laporan'>TUNJANGAN DASAR</td>
        <td width='80' class='header_laporan'>TUNJANGAN POSISI (Index Posisi * Index Kinerja * Index Unit * Tarif Tj. Posisi)</td>
        <td width='80' class='header_laporan'>% THR</td>
        <td width='80' class='header_laporan'>JUMLAH THR</td>
		 <td width='80' class='header_laporan'>TUNJANGAN PPH. 21</td>
        <td width='80' class='header_laporan'>JUMLAH DIBAYAR </td>
        <td width='80' class='header_laporan'>POT. DPLK</td>
		<td width='80' class='header_laporan'>POT. JAMSOSTEK</td>
        <td width='80' class='header_laporan'>POT. GAJI</td>
        <td width='80' class='header_laporan'>POT. PPh 21</td>
        <td width='80' class='header_laporan'>POT. PIHAK 3</td>
        <td width='80' class='header_laporan'>Zakat Mal, Infaq &amp; Wakaf</td>
        <td width='80' class='header_laporan'>JUMLAH. POTONGAN</td>
        <td width='80' class='header_laporan'>JUMLAH. DITERIMA</td>
      </tr>";
		$sql=" select a.nik,a.nama,b.nama as nama_sts,c.nama as nama_grade,
	   isnull(d.gdas,0) as gdas,isnull(d.tdas,0) as tdas,isnull(d.rapl,0) as rapl,isnull(d.tpos,0) as tpos,
	   isnull(d.tdpl,0) as tdpl,isnull(d.tpph,0) as tpph,isnull(d.pdpl,0) as pdpl,isnull(d.pgaj,0) as pgaj,isnull(d.ppph,0) as ppph,
	   isnull(e.pot3,0) as pot3,isnull(e.zmiw,0) as zmiw,isnull(d.pjms,0) as pjms,isnull(d.tjms,0) as tjms,
	   isnull(d.gdas,0)+isnull(d.tdas,0)+isnull(d.rapl,0)+isnull(d.tpos,0)+isnull(d.tdpl,0)+isnull(d.tpph,0)+isnull(d.tjms,0) as pdpt,
	   isnull(d.pdpl,0)+isnull(d.pgaj,0)+isnull(e.pot3,0)+isnull(e.zmiw,0)+isnull(d.ppph,0)+isnull(d.pjms,0) as potongan,
	   isnull(f.idx_posisi,0) as idx_posisi,isnull(f.idx_kinerja,0) as idx_kinerja,isnull(f.idx_unit,0) as idx_unit,isnull(f.tarif,0) as tarif,
	   g.tanggal,g.tgl_transfer,isnull(f.idx_thr,0) as idx_thr
from hr_karyawan a
inner join hr_status_sdm b on a.sts_sdm=b.sts_sdm and a.kode_lokasi=b.kode_lokasi
inner join hr_grade c on a.kode_grade=c.kode_grade and a.kode_lokasi=c.kode_lokasi 
inner join (select a.nik,a.no_gaji,a.kode_lokasi,
				   sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as  gdas,
				   sum(case a.kode_param when 'TDAS' then a.nilai else 0 end) as tdas,
				   sum(case a.kode_param when 'RAPL' then a.nilai else 0 end) as rapl,
				   sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos,
				   sum(case a.kode_param when 'TDPL' then a.nilai else 0 end) as tdpl,
				   sum(case a.kode_param when 'TPPH' then a.nilai else 0 end) as tpph,
				   sum(case a.kode_param when 'PDPL' then a.nilai else 0 end) as pdpl,
			       sum(case a.kode_param when 'PGAJ' then a.nilai else 0 end) as pgaj,
				   sum(case a.kode_param when 'PPPH' then a.nilai else 0 end) as ppph,
				   sum(case a.kode_param when 'PYUD' then a.nilai else 0 end) as pyud,
				   sum(case a.kode_param when 'PJMS' then a.nilai else 0 end) as pjms,
				   sum(case a.kode_param when 'TJMS' then a.nilai else 0 end) as tjms
			from hr_gaji_tambah a 
			where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.no_gaji='$no_gaji'
			group by a.nik,a.no_gaji,a.kode_lokasi
		   )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
inner join (select a.nik,a.no_gaji,a.kode_lokasi,
				   sum(case b.kode_klp when 'POT3' then a.nilai else 0 end) as  pot3,
				   sum(case b.kode_klp when 'ZMIW' then a.nilai else 0 end) as zmiw
			from hr_gaji_d a 
			inner join hr_param_relasi b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
			where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.no_gaji='$no_gaji'
			group by a.nik,a.no_gaji,a.kode_lokasi
		   )e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi
left join hr_gaji_m g on d.no_gaji=g.no_gaji and d.kode_lokasi=g.kode_lokasi
left join hr_gaji_pos f on f.no_gaji=g.no_pos and g.kode_lokasi=f.kode_lokasi and d.nik=f.nik
$this->filter
order by a.nik";
		$i=1;
		$rs = $dbLib->execute($sql);
		$gdas=0; $tdas=0; $tpos=0; $rapl=0; $tdpl=0; $tpph=0; $pdpt=0; $pdpl=0; $pgaj=0; $ppph=0; $pot3=0; $zmiw=0; $potongan=0; $total=0; $pjms=0; $tjms=0;$tot_tthr=0;$thp=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gdas+=$row->gdas;
			$tdas+=$row->tdas;
			$tpos+=$row->tpos;
			$rapl+=$row->rapl;
			$tdpl+=$row->tdpl;
			$tpph+=$row->tpph;
			$pdpt+=$row->pdpt;
			$pgaj+=$row->pgaj;
			$ppph+=$row->ppph;
			$pot3+=$row->pot3;
			$zmiw+=$row->zmiw;
			$pjms+=$row->pjms;
			$tjms+=$row->tjms;
			$pdpl+=$row->pdpl;
			$potongan+=$row->potongan;
			$total+=$row->pdpt-$row->potongan;
			$tanggal=$row->tanggal;
			$tgl_transfer=$row->tgl_transfer;
			$tthr=($row->gdas + $row->tdas + $row->tpos)* ($row->idx_thr/100);
			$tot_tthr+=$tthr;
			$thp+=$tthr+$row->tpph-$row->potongan;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan' >$row->nama</td>
        <td class='isi_laporan' >$row->nama_sts</td>
        <td class='isi_laporan' >$row->nik</td>
       <td class='isi_laporan' >$row->nama_grade</td>
          <td class='isi_laporan' align='center'>".number_format($row->idx_posisi,2,',','.')."%</td>
        <td class='isi_laporan' align='center'>".number_format($row->idx_kinerja,2,',','.')."%</td>
         <td class='isi_laporan' align='center'>".number_format($row->idx_unit,2,',','.')."%</td>
        <td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->tdas,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->tpos,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->idx_thr,2,',','.')."%</td>
        <td class='isi_laporan' align='right'>".number_format($tthr,0,',','.')."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->tpph,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($tthr+$row->tpph,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->pdpl,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->pjms,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($row->pgaj,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->ppph,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->pot3,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($row->zmiw,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($row->potongan,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($tthr+$row->tpph-$row->potongan,0,',','.')."</td>
      </tr>";
    
			$i=$i+1;
		}
		  echo "<tr>
        <td colspan='9' align='center' class='header_laporan' >TOTAL</td>
          <td class='header_laporan' align='right'>".number_format($gdas,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($tdas,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($tpos,0,',','.')."</td>
        <td class='header_laporan' align='right' >&nbsp;</td>
      	<td class='header_laporan' align='right'>".number_format($tot_tthr,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($tpph,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format(472414558,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($pdpl,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pjms,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pgaj,0,',','.')."</td>
         <td class='header_laporan' align='right'>".number_format($ppph,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($pot3,0,',','.')."</td>
       <td class='header_laporan' align='right'>".number_format($zmiw,0,',','.')."</td>
       <td class='header_laporan' align='right'>".number_format($potongan,0,',','.')."</td>
	    <td class='header_laporan' align='right'>".number_format($thp,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >Bandung, ".substr($tgl_transfer,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$tgl_transfer),0,6))."</td>
        </tr>
	<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >&nbsp;</td>
        </tr>
      <tr align='center'>
        <td width='200'>Fiatur</td>
        <td width='200'>Verifikator</td>
        <td width='200'>Mengetahui</td>
		<td width='200'>Pembuat Daftar</td>
      </tr>
      <tr align='center'>
        <td>Direktur</td>
        <td>Wakil Direktur II</td>
        <td>Man. DUKMAN</td>
      </tr>
      <tr align='center'>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>Budi Sulistyo</td>
        <td>Sugeng Priyono</td>
        <td>Ellys Siregar</td>
		<td>Euis Susilawaty</td>
      </tr>
    </table></td>
  </tr>
</table>";
		echo " </div>";
		return "";
		
	}
	
}
?>
