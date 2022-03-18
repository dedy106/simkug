<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiDaftarRsp extends server_report_basic
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
		$sql="select max(no_gaji) as no_pos from hr_gaji_pos where kode_lokasi='$kode_lokasi' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$no_pos=$row->no_pos;
		echo "<div align='center'>"; 
		echo "<table width='1500' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'  class='style16'>REKAP GAJI KARYAWAN PT. RASAPALA - APOTEK TELEMEDIKA 1 SENTOT BANDUNG</td>
  </tr>
  <tr>
    <td align='center'  class='style16'>PERIODE BULAN MEI 2013 </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td class='header_laporan' width='60'>NO</td>
		 <td class='header_laporan' width='60'>NIK</td>
        <td class='header_laporan' width='150'>NAMA</td>
        <td  class='header_laporan' width='150'>POSISI</td>
		 <td  class='header_laporan' width='150'>LOKER</td>
        <td class='header_laporan' width='40'>JOB LEVEL</td>
		<td class='header_laporan'>STS NIKAH</td>
		<td class='header_laporan'>STS PAJAK</td>
        <td class='header_laporan'>MASA KERJA</td>
		
		<td class='header_laporan' width='90'>GADAS</td>
        <td class='header_laporan' width='90'>GADAS > 1 1THN</td>
		<td class='header_laporan' width='90'>TUNJ. POSISI</td>
        <td class='header_laporan' width='90'>TUNJ.DASAR</td>
		<td class='header_laporan' width='90'>GADAS & TUDAS SETELAH KENAIKAN INDEX</td>
        <td class='header_laporan' width='90'>TUNJ. PRESTASI</td>
		<td class='header_laporan' width='90'>TOTAL GAJI</td>
		<td class='header_laporan' width='90'>LEMBUR</td>
		<td class='header_laporan' width='90'>TUNJ. RETENSI</td>
        <td class='header_laporan' width='90'>TUNJ. KOMPETENSI</td>
		<td class='header_laporan' width='90'>RAPEL</td>
		<td class='header_laporan' width='90'>GAJI + LEMBUR</td>
		<td class='header_laporan' width='90'>JKK, JK, JHT PERUSAHAAN</td>
		<td class='header_laporan' width='90'>BIAYA JABATAN</td>
		<td class='header_laporan' width='90'>JHT JAMSOSTEK</td>
		<td class='header_laporan' width='90'>GAJI EXC B. JAB & THT</td>
		<td class='header_laporan' width='90'>PTKP SINGLE</td>
		<td class='header_laporan' width='90'>PTKP KELUARGA </td>
		<td class='header_laporan' width='90'>TOTAL PTKP</td>
		<td class='header_laporan' width='90'>PKP</td>
		<td class='header_laporan' width='90'>PPH 21 5%</td>
		<td class='header_laporan' width='90'>THP</td>
      </tr>
   ";
		$sql=" select a.nik,a.nama,a.kode_lokasi,c.nama as nama_jab,a.kode_level,datediff(year,'2013-05-25',a.tgl_pegtap) as masa_kerja,
	   isnull(b.gdas,0) as gdas,isnull(b.tpos,0) as tpos,isnull(b.tdas,0) as tdas,isnull(b.tprs,0) as tprs,isnull(b.tret,0) as tret,isnull(b.tkom,0) as tkom,isnull(b.tjms,0) as tjms,
	   isnull(b.pjms,0) as pjms,isnull(b.ppph,0) as ppph,isnull(b.gaji,0) as gaji,isnull(b.tret,0) as tret,
	   (0.24/100)*isnull(b.gaji,0) as jkk,(0.3/100)*isnull(b.gaji,0) as jk,0.037*isnull(b.gaji,0) as jhtp,
	   case when a.sts_sdm='1' then 0.02*isnull(b.gaji,0) else 0 end as jhtk,
	   e.ptkp1,a.sts_nikah,a.sts_pajak,a.kode_loker,f.nama as nama_loker,d.nilai as ptkp,
	   (cast((case when substring(a.sts_pajak,1,1)='K' then substring(a.sts_pajak,3,2)+1 else '0' end) as int)) * (e.ptkp1) as ptkp2,
	   (cast((case when substring(a.sts_pajak,1,1)='K' then substring(a.sts_pajak,3,2)+1 else '0' end) as int)) * (e.ptkp1) +  e.ptkp1 as tot_ptkp
from hr_karyawan a 
inner join (select a.nik,a.kode_lokasi,
				   sum(case when a.kode_param='PJMS' then a.nilai else 0 end) as pjms,
				   sum(case when a.kode_param='PPPH' then a.nilai else 0 end) as ppph,
				   sum(case when a.kode_param='GDAS' then a.nilai else 0 end) as gdas,
				   sum(case when a.kode_param='TDAS' then a.nilai else 0 end) as tdas,
				   sum(case when a.kode_param='TJMS' then a.nilai else 0 end) as tjms,
				   sum(case when a.kode_param='TPOS' then a.nilai else 0 end) as tpos,
				   sum(case when a.kode_param='TPRS' then a.nilai else 0 end) as tprs,
				   sum(case when a.kode_param='TRET' then a.nilai else 0 end) as tret,
				   sum(case when a.kode_param='TKOM' then a.nilai else 0 end) as tkom,
				   sum(case when a.kode_param in ('GDAS','TDAS','TPOS','TPRS') then a.nilai else 0 end) as gaji
			from hr_gaji_d a
			where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
			group by a.nik,a.kode_lokasi)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join hr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
inner join hr_status_pajak d on a.sts_pajak=d.sts_pajak and a.kode_lokasi=d.kode_lokasi
cross join (select nilai as ptkp1 from hr_status_pajak where sts_pajak='TK/00' and kode_Lokasi='51')e
inner join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi
$this->filter
order by a.nama ";
		
		$i=1;
		$rs = $dbLib->execute($sql);
		$gdas=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gdas+=$row->gdas;
			$bjab=(($row->gaji+$row->tret+$row->tkom) + ($row->jk+$row->jkk+$row->jhtp)) * 0.05;
			$gaji2= (($row->gaji+$row->tret+$row->tkom) + ($row->jk+$row->jkk+$row->jhtp) - $bjab - $row->jhtk ) *12;
			$pkp=0;
			if ($gaji2-$row->tot_ptkp > 0)
			{
				$pkp=$gaji2-$row->tot_ptkp;
			}
			$pph=$pkp*0.05;
			$thp=($row->gaji+$row->tret) - $row->ppph - $row->jhtk;
			$pkp=0;
			if ($gaji2-$row->ptkp > 0)
			{
				$pkp=$gaji2-$row->ptkp;
			}
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan' >$row->nik</td>
        <td class='isi_laporan' >$row->nama</td>
        <td class='isi_laporan' >$row->nama_jab</td>
		<td class='isi_laporan' >$row->nama_loker</td>
        <td class='isi_laporan' align='center'>$row->kode_level</td>
		<td class='isi_laporan' align='center'>$row->sts_nikah</td>
		<td class='isi_laporan' align='center'>$row->sts_pajak</td>
		<td class='isi_laporan' align='right'>".number_format($row->masa_kerja,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->tpos,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->tdas,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->gdas+$row->tdas,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->tprs,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->gaji,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->tret,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->tkom,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($row->gaji+$row->tret+$row->tkom,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($row->jk+$row->jkk+$row->jhtp,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($bjab,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($row->jhtk,0,',','.')."</td>
       <td class='isi_laporan' align='right'>".number_format($gaji2,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->ptkp1,0,',','.')."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->ptkp2,0,',','.')."</td>
		 <td class='header_laporan' align='right'>".number_format($row->ptkp,0,',','.')."</td>
		 <td class='header_laporan' align='right'>".number_format($pkp,0,',','.')."</td>
		 <td class='header_laporan' align='right'>".number_format($row->ppph,0,',','.')."</td>
		 <td class='header_laporan' align='right'>".number_format($thp,0,',','.')."</td>
      </tr>";
    
			$i=$i+1;
		}
		  echo "<tr>
        <td colspan='6' align='center' class='header_laporan' >TOTAL</td>
          <td class='header_laporan' align='right'>".number_format($gdas,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($tdas,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($tpos,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($rapl,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($tdpl,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($tjms,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($tpph,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($pdpl,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pjms,0,',','.')."</td>
       <td class='header_laporan' align='right'>".number_format($pgaj,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($ppph,0,',','.')."</td>
        <td class='header_laporan' align='right'>".number_format($pot3,0,',','.')."</td>
       <td class='header_laporan' align='right'>".number_format($zmiw,0,',','.')."</td>
       <td class='header_laporan' align='right'>".number_format($potongan,0,',','.')."</td>
	    <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
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
        <td >Bandung, ".substr($tgl_transfer,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$tgl_transfer),0,6))."</td>
        </tr>
	<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >&nbsp;</td>
        </tr>
      <tr align='center'>
        <td width='300'>YANG MEMBUAT,</td>
        <td width='300'>MENGETAHUI/MENYETUJUI</td>
     
      </tr>
    
      <tr align='center'>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
   
      </tr>
      <tr align='center'>
        <td>Ania Siswanti</td>
        <td>Wiedya Agustianty E.</td>
     
      </tr>
	     <tr align='center'>
        <td>Staf HRD</td>
        <td>PJS Mgr. HRD</td>
     
      </tr>
    </table></td>
  </tr>
</table>";
		echo " </div>";
		return "";
		
	}
	
}
?>
