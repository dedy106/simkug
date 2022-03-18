<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_hris_rptGajiLampiran extends server_report_basic
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
		$sql="select a.nik,a.nama,d.nama as bank,a.cabang,a.no_rek,a.nama_rek,isnull(e.total,0) as total 
from gr_karyawan a 
inner join (select distinct x.nik 
			from gr_gaji_d x 
			$this->filter
		   )f on  a.nik=f.nik 
inner join gr_status_bank d on a.sts_bank=d.sts_bank and a.kode_lokasi=d.kode_lokasi 
left join (select nik,sum(case y.dc when 'D' then x.nilai else -x.nilai end) as total  
		   from gr_gaji_d x 
		   inner join gr_gaji_param y on x.kode_param=y.kode_param and x.kode_lokasi=y.kode_lokasi 
		   $this->filter and y.jenis='T' 
		   group by x.nik 
		   )e on a.nik=e.nik 
  order by a.nik";
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
	 <td width='100'  align='center' class='header_laporan'>Bank</td>
	 <td width='150'  align='center' class='header_laporan'>Cabang</td>
	 <td width='90'  align='center' class='header_laporan'>No Rekening</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Rekening</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Transfer</td>
    
	</tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKaryawan('$row->nik','$row->kode_lokasi');\">$row->nik</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
	
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
