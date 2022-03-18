<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_dmt_rptAgingSum extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$cust=$tmp[3];
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$tgl_aging=$tmp[2];
		$sql = "select a.kode_cust,a.nama,isnull(b.saldo,0) as saldo, isnull(b.aging1,0) as aging1, 
       isnull(b.aging2,0) as aging2, isnull(b.aging3,0) as aging3 
from cust a 
left join (select a.kode_cust,sum(a.nilai+a.ppn-isnull(b.nilai,0)) as saldo, 
				sum(case when datediff(day,a.tanggal,'$tgl_aging')<=30 then a.nilai+a.ppn-isnull(b.nilai,0) else 0 end) as aging1, 
				sum(case when datediff(day,a.tanggal,'$tgl_aging') between 31 and 60 then a.nilai+a.ppn-isnull(b.nilai,0) else 0 end) as aging2, 
				sum(case when datediff(day,a.tanggal,'$tgl_aging')>60 then a.nilai+a.ppn-isnull(b.nilai,0) else 0 end) as aging3 
		   from dmt_ar_m a 
		   left join (select b.no_ar,sum(b.nilai) as nilai
					  from dmt_kaspiutang_d b
					  inner join kas_m c on b.no_kas=c.no_kas
					  where c.tanggal<='$tgl_aging' 
					  group by b.no_ar) b on a.no_ar=b.no_ar 
		   where a.tanggal<='$tgl_aging'
		   group by a.kode_cust   
          )b on a.kode_cust=b.kode_cust  ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("AGING PIUTANG",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' class='header_laporan'>No</td>
    <td width='200' rowspan='2' class='header_laporan'>Operator</td>
    <td width='90' rowspan='2' class='header_laporan'>Balance</td>
    <td colspan='4' class='header_laporan'>Aging</td>
    </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>< 30 hari</td>
    <td width='90' align='center' class='header_laporan'>31-60 hari</td>
	<td width='90' align='center' class='header_laporan'>> 60 hari</td>
   </tr>";
		$saldo=0; $aging1=0; $aging2=0; $aging3=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saldo=$saldo+$row->saldo;
			$aging1=$aging1+$row->aging1;
			$aging2=$aging2+$row->aging2;
			$aging3=$aging3+$row->aging3;
			echo "<tr>
    <td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->nama</td>
    <td align='right' class='isi_laporan'>".number_format($row->saldo,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->aging1,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->aging2,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->aging3,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Total</td>
    <td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($aging1,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($aging2,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($aging3,0,",",".")."</td>
	 </tr>";
		echo "</table><br></div>";
		return "";
	}
	
	
}
?>
