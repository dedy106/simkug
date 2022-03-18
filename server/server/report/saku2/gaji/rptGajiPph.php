<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiPph extends server_report_basic
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
		
		$sql="select x.nik,b.nama,b.sts_pajak,x.total_bln,x.total,x.b_jab,x.ptkp,x.pkp,0.02*x.total as jam,
					case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 
  from (select a.nik,a.kode_lokasi,c.sts_pajak,  
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, 
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, 
		 d.nilai as ptkp,d.biaya_jab,d.jab_max, 
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max 
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, 
		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - 
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max 
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp 
	  from hr_gaji_d a  
	  inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi 
	  inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
	  inner join hr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi 
       $this->filter and b.flag_pajak='1' 
	   group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max 
	 ) x 
	inner join hr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi
  inner join hr_gaji_param c on c.kode_param='PPPH' and c.kode_lokasi=x.kode_lokasi 
  left join hr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi 
  order by x.nik";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan pph21",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	 <td width='90'  align='center' class='header_laporan'>DISTH</td>
	 <td width='90'  align='center' class='header_laporan'>5% BIAYA JABATAN</td>
	  <td width='90'  align='center' class='header_laporan'>2% JAMSOSTEK</td>
	 <td width='90'  align='center' class='header_laporan'>PTKP</td>
     <td width='90'  align='center' class='header_laporan'>PKP</td>
	 <td width='90'  align='center' class='header_laporan'>PPH21</td>
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
	<td class='isi_laporan' align='center'>$row->sts_pajak</td>
	<td class='isi_laporan' align='right'>".number_format($row->total_bln,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->b_jab,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jam,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ptkp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pkp,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pph21,0,',','.')."</td>
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
