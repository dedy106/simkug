<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptGajiDplk extends server_report_basic
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
		$periode=$tmp[0];
		$sql="select nama from gr_footer ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$footer=$row->nama;
		$sql="select a.nik,a.nama,isnull(c.gdas,0) as gdas,isnull(c.tpos,0) as tpos,isnull(c.tpres,0) as tpres,
			0.03*(isnull(c.rem,0)-isnull(c.tsus,0)) as dplk,isnull(c.tsus,0) as tsus,isnull(c.trans,0) as trans,isnull(c.rem,0) as rem,
			isnull(c.rem,0)-isnull(c.tsus,0) as upah_dasar
  from gr_karyawan a 
  inner join (select a.nik,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  
				  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, 
				  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, 
				  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, 
				  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, 
				  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') then a.nilai else 0 end) as rem 
			   from gr_gaji_d a $this->filter
			   group by nik 
		   )c on a.nik=c.nik
  where a.sts_sdm in ('1')
  order by a.nik";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan dplk",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Gaji Dasar</td>
	 <td width='90'  align='center' class='header_laporan'>Tunjangan Posisi</td>
	 <td width='90'  align='center' class='header_laporan'>Tunjangan Prestasi</td>
	 <td width='90'  align='center' class='header_laporan'>Tunjangan Khusus</td>
	 <td width='90'  align='center' class='header_laporan'>Tunjangan Transport</td>
     <td width='90'  align='center' class='header_laporan'>Remunerasi</td>
	 <td width='90'  align='center' class='header_laporan'>Upah Dasar</td>
	 <td width='90'  align='center' class='header_laporan'>Iuran</td>
	</tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->gdas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tpos,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tpres,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->tsus,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->trans,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->rem,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->upah_dasar,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->dplk,0,',','.')."</td>
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
