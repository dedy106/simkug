<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptPinjMou extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.kode_mou,a.nama,a.kode_curr,a.nilai,b.company_name as nama_cocd,c.nama as nama_mitra,d.nama as nama_class,isnull(e.realisasi,0) as realisasi
		from sla_mou a
		inner join mysym_company_code b on a.kode_cocd=b.cocd
		inner join sla_mitra c on a.kode_mitra=c.kode_mitra
		inner join sla_class d on a.kode_class=d.kode_class
		left join (select kode_mou,sum(nilai) as realisasi 
		  from sla_kkp_m 
		  group by kode_mou 
		 ) e on a.kode_mou=e.kode_mou 
$this->filter
order by a.kode_mou";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo mou",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>Kode MOU</td>
	 <td width='150'  align='center' class='header_laporan'>nama MOU</td>
	 <td width='150'  align='center' class='header_laporan'>Company</td>
	 <td width='100'  align='center' class='header_laporan'>Classification</td>
	 <td width='100'  align='center' class='header_laporan'>Bank (Institution)</td>
     <td width='50'  align='center' class='header_laporan'>Curr</td>
     <td width='100'  align='center' class='header_laporan'>Plafon</td>
	 <td width='100'  align='center' class='header_laporan'>Realisasi</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo</td>
	  </tr>  ";
		$nilai=0;$realisasi=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$realisasi+=$row->realisasi;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td  class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_mou');\">$row->kode_mou</a></td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_cocd</td>
	 <td class='isi_laporan'>$row->nama_class</td>
	 <td class='isi_laporan'>$row->nama_mitra</td>
	 <td class='isi_laporan'>$row->kode_curr</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->realisasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai-$row->realisasi,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='7'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($realisasi,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai-$realisasi,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
