<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_apparindo_rptAnggota extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.kode_cust)
from cust2 a
 $this->filter ";
 
		error_log($sql);
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
		
		
		$sql="select distinct a.kode_cust,b.nama,a.tahun
from ape_rel_properti a
left join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_cust ";

		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data anggota per tahun",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Nomor Anggota </td>
        <td class='header_laporan'>:&nbsp;$row->kode_cust</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
      </tr>
	    <tr>
        <td class='header_laporan'>Tahun </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td rowspan='2' width='50' class='header_laporan' align='center'>No</td>
    <td colspan='4' width='100' class='header_laporan' align='center'>Properti</td>
    <td colspan='4' width='250' class='header_laporan' align='center'>Asuransi</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
  <td width='80' class='header_laporan' align='center'>Nilai Premi</td>
	<td width='80' class='header_laporan' align='center'>Brokarage</td>
  <td width='80' class='header_laporan' align='center'>Total Asset</td>
	<td width='80' class='header_laporan' align='center'>Equity</td>
  <td width='80' class='header_laporan' align='center'>Limit</td>
	<td width='200' class='header_laporan' align='center'>Penerbit</td>
	<td width='80' class='header_laporan' align='center'>Periode Awal Polis</td>
	<td width='80' class='header_laporan' align='center'>Periode Akhir Polis</td>
  </tr>";
			$sql1="select  DISTINCT s.value as brok
      ,d.value as eq
      ,a.value as pre
      ,m.value as ta,b.limit,b.periode_awal,b.periode_akhir,c.nama
      from ape_rel_properti x
        left join (
          select kode_cust,kode_properti,value
          from ape_rel_properti 
          where kode_properti ='BROK' 
        ) s on x.kode_cust=s.kode_cust
        left join (
          select kode_cust,kode_properti,value
          from ape_rel_properti 
          where kode_properti ='EQ' 
        ) d on x.kode_cust=d.kode_cust
        left join (
          select kode_cust,kode_properti,value
          from ape_rel_properti 
          where kode_properti ='PRE' 
        ) a on x.kode_cust=a.kode_cust
          left join (
          select kode_cust,kode_properti,value
          from ape_rel_properti 
          where kode_properti ='TA' 
        ) m on x.kode_cust=m.kode_cust			
        inner join ape_polis b on x.kode_cust=b.kode_cust and x.kode_lokasi=b.kode_lokasi
        inner join ape_asuransi c on b.kode_asur=c.kode_asur and b.kode_lokasi=c.kode_lokasi

where x.kode_cust='$row->kode_cust' and x.tahun='$row->tahun'  ";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$harga=0; $diskon=0; $jumlah=0; $bonus=0; $total=0; $ppn=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$harga=$harga+$row1->harga;
				$diskon=$diskon+$row1->tot_diskon;
				$jumlah=$jumlah+$row1->jumlah;
				$bonus=$bonus+$row1->bonus;
				$ppn=$row->nilai2;
				$total=$total+$row1->total;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='right' class='isi_laporan'>".number_format($row1->brok,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->eq,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->pre,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->ta,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->limit,0,",",".")."</td>
	<td class='isi_laporan'>$row1->nama</td>
	<td class='isi_laporan'>$row1->periode_awal</td>
	<td class='isi_laporan'>$row1->periode_akhir</td>
  </tr>";		
				$j=$j+1;
			}

		echo "</table>";
		echo "</td>
  </tr>

</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
