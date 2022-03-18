<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdSpiBulan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
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
		$nama_cab=$tmp[1];
		
		
		$sql="select z.kode_rdklp,z.nama as nama_klp,a.kode_rd,a.nama as nama_saham,a.kode_rdkelola,c.nama as nama_kelola,
	   isnull(d.n01,0) as n01,isnull(d.n02,0) as n02,isnull(d.n03,0) as n03,isnull(d.n04,0) as n04,
	   isnull(d.n05,0) as n05,isnull(d.n06,0) as n06,isnull(d.n07,0) as n07,isnull(d.n08,0) as n08,
	   isnull(d.n09,0) as n09,isnull(d.n10,0) as n10,isnull(d.n11,0) as n11,isnull(d.n12,0) as n12,isnull(d.total,0) as total,

	   isnull(e.j01,0) as j01,isnull(e.j02,0) as j02,isnull(e.j03,0) as j03,isnull(e.j04,0) as j04,
	   isnull(e.j05,0) as j05,isnull(e.j06,0) as j06,isnull(e.j07,0) as j07,isnull(e.j08,0) as j08,
	   isnull(e.j09,0) as j09,isnull(e.j10,0) as j10,isnull(e.j11,0) as j11,isnull(e.j12,0) as j12,
	   isnull(e.jtotal,0) as jtotal

from inv_rd a
inner join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola 
inner join inv_rdklp z on a.kode_rdklp=z.kode_rdklp
left join (select b.kode_rdkelola,b.kode_rd,
		   sum(case when substring(a.periode,5,2)='01' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n01,
			sum(case when substring(a.periode,5,2)='02' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n02,
			sum(case when substring(a.periode,5,2)='03' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n03,
			sum(case when substring(a.periode,5,2)='04' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n04,
			sum(case when substring(a.periode,5,2)='05' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n05,
			sum(case when substring(a.periode,5,2)='06' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n06,
			sum(case when substring(a.periode,5,2)='07' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n07,
			sum(case when substring(a.periode,5,2)='08' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n08,
			sum(case when substring(a.periode,5,2)='09' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n09,
			sum(case when substring(a.periode,5,2)='10' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n10,
			sum(case when substring(a.periode,5,2)='11' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n11,
			sum(case when substring(a.periode,5,2)='12' then (h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end) else 0 end) as n12,
			sum((h_wajar-h_buku)* (case dc when 'D' then jumlah else -jumlah end)) as total
		from inv_rdspi_m a
		inner join inv_rdspi_d b on a.no_spi=b.no_spi
		where substring(a.periode,1,4)='$tahun' and (b.flag_rev='-' or substring(b.flag_rev,8,2)=substring(a.periode,3,2)) 
		group by b.kode_rdkelola,b.kode_rd
		)d on a.kode_rd=d.kode_rd and a.kode_rdkelola=d.kode_rdkelola 

left join (select b.kode_rdkelola,b.kode_rd,
		 sum(case when substring(a.periode,5,2)='01' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j01,
		 sum(case when substring(a.periode,5,2)='02' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j02,
		 sum(case when substring(a.periode,5,2)='03' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j03,
		 sum(case when substring(a.periode,5,2)='04' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j04,
		 sum(case when substring(a.periode,5,2)='05' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j05,
		 sum(case when substring(a.periode,5,2)='06' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j06,
		 sum(case when substring(a.periode,5,2)='07' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j07,
		 sum(case when substring(a.periode,5,2)='08' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j08,
		 sum(case when substring(a.periode,5,2)='09' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j09,
		 sum(case when substring(a.periode,5,2)='10' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j10,
		 sum(case when substring(a.periode,5,2)='11' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j11,
		 sum(case when substring(a.periode,5,2)='12' then (b.h_oleh - b.h_buku)* b.jumlah else 0 end) as j12,
		 sum((b.h_oleh - b.h_buku)* b.jumlah) as jtotal
	 from inv_rdjual_m a
	 inner join inv_rdjual_d b on a.no_rdjual=b.no_rdjual
	 where substring(a.periode,1,4)='$tahun'
	 group by b.kode_rdkelola,b.kode_rd
	 )e on a.kode_rd=e.kode_rd and a.kode_rdkelola=e.kode_rdkelola 

		$this->filter and (isnull(d.total,0)<>0  or isnull(e.jtotal,0)<>0)
		order by kode_rdklp,a.kode_rdkelola,a.kode_rd
";

		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("reksadana SPI per bulan",$this->lokasi,"TAHUN $tahun");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='30'>No</td>
    <td align='center' class='header_laporan' width='60'>Kode  </td>
    <td align='center' class='header_laporan' width='200'>Jenis RD</td>
	 <td align='center' class='header_laporan' width='60'>Kode Kelola </td>
    <td align='center' class='header_laporan' width='150'>Nama Nama Kelola</td>
	<td  align='center' class='header_laporan' width='90'>Januari</td>
	<td  align='center' class='header_laporan' width='90'>Januari NT</td>
    <td width='90' align='center' class='header_laporan'>Februari</td>
	<td width='90' align='center' class='header_laporan'>Februari NT</td>
    <td width='90' align='center' class='header_laporan'>Maret</td>
	<td width='90' align='center' class='header_laporan'>Maret NT</td>
	<td width='90' align='center' class='header_laporan'>April</td>
	<td width='90' align='center' class='header_laporan'>April NT</td>
	<td width='90' align='center' class='header_laporan'>Mei</td>
	<td width='90' align='center' class='header_laporan'>Mei NT</td>
	<td width='90' align='center' class='header_laporan'>Juni</td>
	<td width='90' align='center' class='header_laporan'>Juni NT</td>
	<td width='90' align='center' class='header_laporan'>Juli</td>
	<td width='90' align='center' class='header_laporan'>Juli NT</td>
	<td width='90' align='center' class='header_laporan'>Agustus</td>
	<td width='90' align='center' class='header_laporan'>Agustus NT</td>
	<td width='90' align='center' class='header_laporan'>September</td>
	<td width='90' align='center' class='header_laporan'>September NT</td>
	<td width='90' align='center' class='header_laporan'>Oktober</td>
	<td width='90' align='center' class='header_laporan'>Oktober NT</td>
	<td width='90' align='center' class='header_laporan'>November</td>
	<td width='90' align='center' class='header_laporan'>November NT</td>
	<td width='90' align='center' class='header_laporan'>Desember</td>
	<td width='90' align='center' class='header_laporan'>Desember NT</td>
	<td width='90' align='center' class='header_laporan'>Total</td>
	<td width='90' align='center' class='header_laporan'>Total NT</td>
    </tr>
  
 ";
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$total=0;
		$j01=0;$j02=0;$j03=0;$j04=0;$j05=0;$j06=0;$j07=0;$j08=0;$j09=0;$j10=0;$j11=0;$j12=0;$jtotal=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n01=$n01+$row->n01;
			$n02=$n02+$row->n02;
			$n03=$n03+$row->n03;
			$n04=$n04+$row->n04;
			$n05=$n05+$row->n05;
			$n06=$n06+$row->n06;
			$n07=$n07+$row->n07;
			$n08=$n08+$row->n08;
			$n09=$n09+$row->n09;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$total=$total+$row->total;

			$j01=$j01+$row->j01;
			$j02=$j02+$row->j02;
			$j03=$j03+$row->j03;
			$j04=$j04+$row->j04;
			$j05=$j05+$row->j05;
			$j06=$j06+$row->j06;
			$j07=$j07+$row->j07;
			$j08=$j08+$row->j08;
			$j09=$j09+$row->j09;
			$j10=$j10+$row->j10;
			$j11=$j11+$row->j11;
			$j12=$j12+$row->j12;
			$jtotal=$jtotal+$row->jtotal;
			
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->nama_klp</td>
	 <td class='isi_laporan'>$row->kode_rdkelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->j12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->jtotal,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='5'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($n01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($j12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($jtotal,0,",",".")."</td>
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
