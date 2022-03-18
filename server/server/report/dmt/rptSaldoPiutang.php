<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptSaldoPiutang extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$sql="select a.kode_cust,a.nama,isnull(b.so_debet,0)-isnull(e.so_kredit,0) as so_awal,
	   isnull(c.nilai,0) as nilai,isnull(c.ppn,0) as ppn,isnull(c.debet,0) as debet,
	   isnull(d.kredit,0) as kredit,isnull(d.kredit_ar,0) as kredit_ar,isnull(d.kredit_pph,0) as kredit_pph,isnull(d.kredit_adm,0) as kredit_adm,
	   isnull(b.so_debet,0)-isnull(e.so_kredit,0)+isnull(c.debet,0)-isnull(d.kredit,0) as so_akhir 
from cust a
left join (select a.kode_cust,sum(a.nilai+a.ppn) as so_debet
		   from dmt_ar_m a 
		   where a.periode<'$periode'
		   group by a.kode_cust	
		   )b on a.kode_cust=b.kode_cust
left join (select a.kode_cust,sum(a.nilai+a.ppn) as debet,sum(a.nilai) as nilai,sum(a.ppn) as ppn
		   from dmt_ar_m a 
		   where a.periode='$periode'
		   group by a.kode_cust
		   )c on a.kode_cust=c.kode_cust
left join (select a.kode_cust,sum(b.nilai) as kredit,
				  sum(case b.jenis when 'AR' then b.nilai else 0 end) as kredit_ar,
				  sum(case b.jenis when 'PPH' then b.nilai else 0 end) as kredit_pph,
				  sum(case b.jenis when 'ADM' then b.nilai else 0 end) as kredit_adm
		   from dmt_ar_m a
		   inner join dmt_kaspiutang_d b on a.no_ar=b.no_ar
		   where b.periode='$periode' 
		   group by a.kode_cust
		   )d on a.kode_cust=d.kode_cust
left join (select a.kode_cust,sum(b.nilai) as so_kredit
		   from dmt_ar_m a
		   inner join dmt_kaspiutang_d b on a.no_ar=b.no_ar 
		   where b.periode<'$periode' 
		   group by a.kode_cust
		   )e on a.kode_cust=e.kode_cust ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO PIUTANG ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
			  <tr bgcolor='#CCCCCC'>
				<td width='20' rowspan='2' align='center' class='header_laporan'>No</td>
				<td width='70' rowspan='2' align='center' class='header_laporan'>Kode Cust </td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Cust </td>
				<td width='90' rowspan='2' align='center' class='header_laporan'>Saldo Awal </td>
				<td colspan='3' align='center' class='header_laporan'>Debet</td>
				<td colspan='4' align='center' class='header_laporan'>Kredit</td>
				<td width='90' rowspan='2' align='center' class='header_laporan'>Saldo Akhir</td>
			  </tr>
			  <tr bgcolor='#CCCCCC'>
				<td width='90' align='center' class='header_laporan'>Piutang</td>
				<td width='80' align='center' class='header_laporan'>PPN</td>
				<td width='90' align='center' class='header_laporan'>Total</td>
				<td width='90' align='center' class='header_laporan'>Piutang</td>
				<td width='80' align='center' class='header_laporan'>PPH</td>
				<td width='90' align='center' class='header_laporan'>ADM</td>
				<td width='90' align='center' class='header_laporan'>Total</td>
			  </tr>";
		$i=1;
		$rs = $dbLib->execute($sql);
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
			<td align='center' class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row->kode_cust</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDoc('$row->kode_cust');\">$row->nama</a></td>
			<td align='right' class='isi_laporan'>".number_format($row->so_awal,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->ppn,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->debet,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->kredit_ar,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->kredit_pph,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->kredit_adm,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->kredit,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row->so_akhir,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
		}
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
