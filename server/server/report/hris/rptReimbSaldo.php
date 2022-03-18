<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_hris_rptReimbSaldo extends server_report_basic
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
		$tahun=$tmp[0];
		$sql="select nama from gr_footer ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$footer=$row->nama;
		$sql="select a.nik,a.nama,e.nama as nama_jab,f.nama as nama_dept,a.kode_lokasi, 
	   isnull(c.gg,0) as tgg,isnull(c.kd,0) as tkd,isnull(c.km,0) as tkm,isnull(c.ma,0) as tma, isnull(c.pk,0) as tpk,
	   isnull(d.gg,0) as rgg,isnull(d.kd,0) as rkd,isnull(d.km,0) as rkm,isnull(d.ma,0) as rma, isnull(d.pk,0) as rpk, 
	   isnull(c.gg,0)-isnull(d.gg,0) as sgg,isnull(c.kd,0)-isnull(d.kd,0) as skd, 
	   isnull(c.km,0)-isnull(d.km,0) as skm,isnull(c.ma,0)-isnull(d.ma,0) as sma ,
	   isnull(c.pk,0)-isnull(d.pk,0) as spk 
from gr_karyawan a   
left join (select distinct nik_buat as nik from gr_kes_m 
			where kode_lokasi='01' and substring(periode,1,4)='$tahun')b on a.nik=b.nik 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi=e.kode_lokasi
inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=f.kode_lokasi
left join (select y.nik,sum(case x.kode_jenis when 'GG' then x.nilai else 0 end) as gg, 
				  sum(case x.kode_jenis when 'KD' then x.nilai else 0 end) as kd, 
		  sum(case x.kode_jenis when 'KM' then x.nilai else 0 end) as km, 
		  sum(case x.kode_jenis when 'MA' then x.nilai else 0 end) as ma,
			sum(case x.kode_jenis when 'PK' then x.nilai else 0 end) as pk 
		   from gr_kes_param x 
		   inner join gr_karyawan y on x.kode_grade=y.kode_grade and x.kode_lokasi=y.kode_lokasi 
          inner join gr_jab z on y.kode_jab=z.kode_jab and y.kode_lokasi=z.kode_lokasi and x.kode_klpjab=z.kode_klpjab 
	   where x.kode_lokasi='01' and x.tahun='$tahun'
		   group by y.nik 
		   )c on a.nik=c.nik  
left join (select nik,sum(case kode_jenis when 'GG' then nilai else 0 end) as gg, 
				  sum(case kode_jenis when 'KD' then nilai else 0 end) as kd, 
		  sum(case kode_jenis when 'KM' then nilai else 0 end) as km, 
		  sum(case kode_jenis when 'MA' then nilai else 0 end) as ma,
			sum(case kode_jenis when 'PK' then nilai else 0 end) as pk 
		   from gr_kes_d 
	   where kode_lokasi='01' and substring(periode,1,4)='$tahun'
		   group by nik 
		   )d on a.nik=d.nik $this->filter";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo reimburse",$this->lokasi,"TAHUN ".$tahun);
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='70' rowspan='2'  align='center' class='header_laporan'>NIK</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Jabatan</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Departemen</td>
	 <td colspan='5'  align='center' class='header_laporan'>Plafon</td>
	 <td colspan='5'  align='center' class='header_laporan'>Realisasi</td>
	 <td colspan='5'  align='center' class='header_laporan'>Saldo</td>
	 </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='70'  align='center' class='header_laporan'>Gigi</td>
     <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
     <td width='70'  align='center' class='header_laporan'>Kacamata</td>
     <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
	 <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
     <td width='70'  align='center' class='header_laporan'>Gigi</td>
	 <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
     <td width='70'  align='center' class='header_laporan'>Kacamata</td>
     <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
	  <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
     <td width='70'  align='center' class='header_laporan'>Gigi</td>
     <td width='70'  align='center' class='header_laporan'>Kedukaan</td>
     <td width='70'  align='center' class='header_laporan'>Kacamata</td>
     <td width='70'  align='center' class='header_laporan'>Melahirkan</td>
	 <td width='70'  align='center' class='header_laporan'>Pernikahan</td>
   </tr> ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->nik</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
		<td class='isi_laporan'>$row->nama_jab</td>
		<td class='isi_laporan'>$row->nama_dept</td>
		<td align='right' class='isi_laporan'>".number_format($row->tgg,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->tkd,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->tkm,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->tma,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->tpk,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->rgg,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->rkd,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->rkm,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->rma,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->rpk,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->sgg,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->skd,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->skm,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->sma,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->spk,0,',','.')."</td>
     </tr>";
	
			$i=$i+1;
		}
		
		echo "</table> </td></tr>
  <tr>
    <td align='left' class='isi_laporan'>$footer</td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
