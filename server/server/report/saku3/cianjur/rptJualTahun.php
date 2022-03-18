<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptJualTahun extends server_report_basic
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
		$tahun=$tmp[1];
		$sql="select a.kode_brg,a.kode_lokasi,a.nama,isnull(b.n01,0) as n01,isnull(b.n02,0) as n02,isnull(b.total,0) as total,
	   isnull(b.n03,0) as n03,isnull(b.n04,0) as n04,isnull(b.n05,0) as n05,isnull(b.n06,0) as n06,isnull(b.n07,0) as n07,
	   isnull(b.n08,0) as n08,isnull(b.n09,0) as n09,isnull(b.n10,0) as n10,isnull(b.n11,0) as n11,isnull(b.n12,0) as n12
from apo_brg_m a
inner join (select a.kode_brg,a.kode_lokasi,
				   sum(case when substring(periode,5,2)='01' then a.jumlah else 0 end) as n01,
				   sum(case when substring(periode,5,2)='02' then a.jumlah else 0 end) as n02,
				   sum(case when substring(periode,5,2)='03' then a.jumlah else 0 end) as n03,
				   sum(case when substring(periode,5,2)='04' then a.jumlah else 0 end) as n04,
				   sum(case when substring(periode,5,2)='05' then a.jumlah else 0 end) as n05,
				   sum(case when substring(periode,5,2)='06' then a.jumlah else 0 end) as n06,
				   sum(case when substring(periode,5,2)='07' then a.jumlah else 0 end) as n07,
				   sum(case when substring(periode,5,2)='08' then a.jumlah else 0 end) as n08,
				   sum(case when substring(periode,5,2)='09' then a.jumlah else 0 end) as n09,
				   sum(case when substring(periode,5,2)='10' then a.jumlah else 0 end) as n10,
				   sum(case when substring(periode,5,2)='11' then a.jumlah else 0 end) as n11,
				   sum(case when substring(periode,5,2)='12' then a.jumlah else 0 end) as n12,
				   sum(a.jumlah) as total
			from apo_brg_jual_d a 
			where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
			group by a.kode_brg,a.kode_lokasi
			)b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_brg";

        // echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan per bulan",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Barang</td>
     <td width='200'  align='center' class='header_laporan'>Nama Barang</td>
     <td width='80'  align='center' class='header_laporan'>Januari</td>
	 <td width='80'  align='center' class='header_laporan'>Februari</td>
	 <td width='80'  align='center' class='header_laporan'>Maret</td>
	 <td width='80'  align='center' class='header_laporan'>April</td>
	  <td width='80'  align='center' class='header_laporan'>Mei</td>
	 <td width='80'  align='center' class='header_laporan'>Juni</td>
	 <td width='80'  align='center' class='header_laporan'>Juli</td>
	 <td width='80'  align='center' class='header_laporan'>Agustus</td>
	  <td width='80'  align='center' class='header_laporan'>September</td>
	 <td width='80'  align='center' class='header_laporan'>Oktober</td>
	 <td width='80'  align='center' class='header_laporan'>November</td>
	 <td width='80'  align='center' class='header_laporan'>Desember</td>
	 <td width='80'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$n01=0; $n02=0; $n03=0; $n04=0;
		$n05=0; $n06=0; $n07=0; $n08=0;
		$n09=0; $n10=0; $n11=0; $n12=0;
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $n01+=$row->n01;
            $n02+=$row->n02;
			$n03+=$row->n03;
			$n04+=$row->n04;
			$n05+=$row->n05;
            $n06+=$row->n06;
			$n07+=$row->n07;
			$n08+=$row->n08;
			$n09+=$row->n09;
            $n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_brg</td>
	 <td class='isi_laporan'>$row->nama</td>
     <td class='isi_laporan' align='right'>".number_format($row->n01,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n02,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n03,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n04,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n05,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n06,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n07,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n08,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n09,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
		<td class='header_laporan' align='right'>".number_format($n01,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n02,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n03,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n04,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n05,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n06,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n07,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n08,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n09,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n11,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n12,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
