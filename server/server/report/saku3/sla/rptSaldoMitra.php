<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptSaldoMitra extends server_report_basic
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
		$sql="select a.kode_mitra,a.nama,isnull(b.nilai,0) as nilai,isnull(b.biaya,0) as biaya,
	   isnull(c.ci_bunga,0) as ci_bunga,isnull(c.ci_pokok,0) as ci_pokok,isnull(c.beban,0) as beban,isnull(c.amor,0) as amor,
	   isnull(c.ci_total,0) as ci_total,isnull(b.nilai,0)-isnull(c.ci_total,0) as saldo
from sla_mitra a
left join (select a.kode_mitra,sum(a.nilai) as nilai,sum(a.biaya) as biaya
		   from sla_kkp_m a
		   group by a.kode_mitra
		   )b on a.kode_mitra=b.kode_mitra 
left join (select b.kode_mitra,
				  sum(a.ci_bunga) as ci_bunga,sum(a.ci_pokok) as ci_pokok,sum(a.beban) as beban,sum(a.amor) as amor,sum(a.ci_total) as ci_total
		   from sla_kkp_d a
		   inner join sla_kkp_m b on a.no_sla=b.no_sla
		   group by b.kode_mitra
		   )c on a.kode_mitra=c.kode_mitra 
order by a.kode_mitra";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='200'  align='center' class='header_laporan'>Bank (Institution)</td>
     <td width='100'  align='center' class='header_laporan'>Nilai Nominal</td>
	 <td width='100'  align='center' class='header_laporan'>Biaya transaksi</td>
	 <td width='100'  align='center' class='header_laporan'>Bayar Pokok</td>
	 <td width='100'  align='center' class='header_laporan'>Bayar Bunga</td>
	 <td width='100'  align='center' class='header_laporan'>Total Bayar</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo</td>
	  </tr>  ";
		$nilai=0;$biaya=0;$bunga=0;$ci_pokok=0;$ci_bunga=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$biaya+=$row->biaya;
			$ci_pokok+=$row->ci_pokok;
			$ci_bunga+=$row->ci_bunga;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td  class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->kode_mitra');\">$row->nama</a></td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->biaya,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_pokok,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_bunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='2'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($biaya,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ci_pokok,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ci_bunga,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ci_total,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
