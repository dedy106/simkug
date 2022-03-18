<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrRekapCob extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$urut=$tmp[2];
		$sql2=" order by c.nama,a.kode_tipe,a.kode_pic ";
		if ($urut=="Premi")
		{
			$sql2=" order by a.premi desc ";
		}
		if ($urut=="Brokerage")
		{
			$sql2=" order by a.fee desc ";
		}
		$sql="select a.kode_pic,a.kode_lokasi,a.kode_cust,a.kode_tipe,
	   ISNULL(a.premi,0) as premi,ISNULL(a.fee,0) as fee,
	   b.nama as nama_lokasi,b.kota,c.nama as nama_cust,d.nama as nama_pic,isnull(e.tahun,'-') as tahun
from (select b.kode_pic,a.kode_lokasi,b.kode_cust,b.kode_tipe,
	   SUM(a.premi*a.kurs) as premi,sum(a.fee*a.kurs) as fee
from sju_polis_termin a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_bill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' $periode
group by b.kode_pic,a.kode_lokasi,b.kode_cust,b.kode_tipe
	)a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
left join (select kode_cust,kode_tipe,kode_lokasi,MIN(substring(periode,1,4)) as tahun
from sju_polis_m
where kode_lokasi='$kode_lokasi'
group by kode_cust,kode_tipe,kode_lokasi
		)e on a.kode_cust=e.kode_cust and a.kode_tipe=e.kode_tipe and a.kode_lokasi=e.kode_lokasi
$this->filter
$sql2 ";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Database Nasabah",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='40'  align='center' class='header_laporan'>Kode</td>
	  <td width='250'  align='center' class='header_laporan'>Nama Tertanggung</td>
	 <td width='60'  align='center' class='header_laporan'>COB</td>
     <td width='50'  align='center' class='header_laporan'>Tahun Masuk</td>
     <td width='100'  align='center' class='header_laporan'>PIC</td>
     <td width='100'  align='center' class='header_laporan'>Cabang</td>
	 <td width='100'  align='center' class='header_laporan'>Premi</td>
	 <td width='100'  align='center' class='header_laporan'>Brokerage</td>
	 <td width='80'  align='center' class='header_laporan'>Prosentase</td>
	  </tr>  ";
		$premi=0;$fee=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$premi+=$row->premi;
			$fee+=$row->fee;
			$persen=0;
			if ($row->premi > 0)
			{
				$persen=($row->fee/$row->premi)*100;
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
     echo "<td class='isi_laporan'>$row->kode_cust</td>";
	 echo "<td class='isi_laporan'>$row->nama_cust</td>";
	  echo "<td class='isi_laporan'>$row->kode_tipe</td>";
	  echo "<td class='isi_laporan' align='center'>$row->tahun</td>";
	  echo "<td class='isi_laporan'>$row->nama_pic</td>";
	  echo "<td class='isi_laporan'>$row->kota</td>";
	 echo "<td class='isi_laporan' align='right'>".number_format($row->premi,0,',','.')."</td>";
 	 echo "<td class='isi_laporan' align='right'>".number_format($row->fee,0,',','.')."</td>";
	 echo "<td class='isi_laporan' align='center'>".number_format($persen,2,',','.')."%</td>";
	echo "
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='7'>Total</td>
    
 	<td class='isi_laporan' align='right'>".number_format($premi,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($fee,0,',','.')."</td></tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
