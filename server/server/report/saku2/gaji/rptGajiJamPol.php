<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiJamPol extends server_report_basic
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
    <td align='center'  class='style16'>DAFTAR IURAN JAMSOSTEK YAYASAN PENDIDIKAN TELKOM DI LINGKUNGAN POLITEKNIK TELKOM</td>
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
        <td colspan='3' class='header_laporan'>PENGHASILAN</td>
        <td colspan='4' class='header_laporan'>IURAN</td>
        <td colspan='2' class='header_laporan'>DITANGGUNG</td>
        <td colspan='1' rowspan='2' class='header_laporan' width='80'>SETOR/BLN</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='20' class='header_laporan'>NO</td>
		<td width='80' class='header_laporan'>NO KPJ</td>
        <td width='150' class='header_laporan'>NAMA LENGKAP</td>
        <td width='60' class='header_laporan'>POSISI</td>
		 <td width='130' class='header_laporan'>LOKER</td>
        <td width='80' class='header_laporan'>GADAS</td>
        <td width='80' class='header_laporan'>TUDAS </td>
        <td width='80' class='header_laporan'>JUMLAH</td>
        <td width='80' class='header_laporan'>JKK (0.24%)</td>
        <td width='80' class='header_laporan'>JKM (0.3%)</td>
        <td width='80' class='header_laporan'>JHT (3.7%)</td>
        <td width='80' class='header_laporan'>JHT (2%)</td>
        <td width='80' class='header_laporan'>Yayasan</td>
        <td width='80' class='header_laporan'>Pegawai</td>
      
      </tr>";
		$sql="select a.nik,a.nama,b.nama as nama_sts,c.nama as nama_grade,f.nama as nama_lokasi,e.tgl_transfer,
	   isnull(d.gdas,0) as gdas,isnull(d.tdas,0) as tdas,isnull(d.jumlah,0) as jumlah,
       0.0024*isnull(d.jumlah,0) as jkk,0.003*isnull(d.jumlah,0) as jkm,0.037*isnull(d.jumlah,0) as jht,0.02*isnull(d.jumlah,0) as jht2 
from hr_karyawan a
inner join hr_status_sdm b on a.sts_sdm=b.sts_sdm and a.kode_lokasi=b.kode_lokasi
inner join hr_grade c on a.kode_grade=c.kode_grade and a.kode_lokasi=c.kode_lokasi 
inner join (select a.nik,a.no_gaji,a.kode_lokasi,
				   sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,
				   sum(case a.kode_param when 'TDAS' then a.nilai else 0 end) as tdas,
				   sum(case when a.kode_param in ('TDAS','GDAS') then a.nilai else 0 end) as jumlah
			from hr_gaji_d a 
			where a.periode='201306' and a.kode_lokasi='04' and a.no_gaji='04-GJ1306.007'
			group by a.nik,a.no_gaji,a.kode_lokasi
		   )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
left join hr_gaji_m e on d.no_gaji=e.no_gaji and d.kode_lokasi=e.kode_lokasi
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
where a.kode_lokasi='04' and year(a.tgl_pegtap)='2013'
order by a.nama";
		$i=1;
		$rs = $dbLib->execute($sql);
		$gdas=0; $tdas=0; $jumlah=0; $jkk=0; $jkm=0; $jht=0; $jht2=0; 
		$yayasan=0; $pegawai=0; $setor=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gdas+=$row->gdas;
			$tdas+=$row->tdas;
			$jumlah+=$row->jumlah;
			$jkk+=$row->jkk;
			$jkm+=$row->jkm;
			$jht+=$row->jht;
			$jht2+=$row->jht2;
			$yayasan+=$row->jkk+$row->jkm+$row->jht;
			$pegawai+=$row->jht2;
			$setor+=$row->jkk+$row->jkm+$row->jht+$row->jht2;
			$tgl_transfer=$row->tgl_transfer;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan' >$row->nik</td>
        <td class='isi_laporan' >$row->nama</td>
        <td class='isi_laporan' >$row->nama_grade</td>
		<td class='isi_laporan' >$row->nama_lokasi</td>
          <td class='isi_laporan' align='center'>".number_format($row->gdas,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row->tdas,0,',','.')."</td>
         <td class='isi_laporan' align='center'>".number_format($row->jumlah,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jkk,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jkm,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jht,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->jht2,0,',','.')."</td>
          <td class='isi_laporan' align='right'>".number_format($row->jkk+$row->jkm+$row->jht,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jht2,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jkk+$row->jkm+$row->jht+$row->jht2,0,',','.')."</td>
	     </tr>";
    
			$i=$i+1;
		}
		  echo "<tr>
        <td colspan='5' align='center' class='header_laporan' >TOTAL</td>
        <td class='isi_laporan' align='center'>".number_format($gdas,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($tdas,0,',','.')."</td>
         <td class='isi_laporan' align='center'>".number_format($jumlah,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($jkk,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($jkm,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($jht,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($jht2,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($yayasan,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($pegawai,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($setor,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'><table width='900' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='700'>&nbsp;</td>
    <td width='200'>Bandung, ".substr($tgl_transfer,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$tgl_transfer),0,6))."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>* JKK + JKM + JHT 3.7% DITANGGUNG PERUSAHAAN</td>
    <td>Manajer DUKMAN </td>
  </tr>
  <tr>
    <td valign='top'>* JHT 2% DITANGGUNG PEGAWAI</td>
    <td height='60'>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>Ellys Siregar </td>
  </tr>
</table></td>
  </tr>
</table>";
		echo " </div>";
		return "";
		
	}
	
}
?>
