<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_dmt_rptAging extends server_report_basic
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
		$sql = "select a.no_ar,date_format(a.tanggal,'%d/%m/%Y') as tanggal,datediff(day,a.tanggal,'$tgl_aging') as jml,c.nama as nama_cust,b.no_po,a.no_dokumen,a.nilai,a.ppn,(a.nilai+a.ppn) as total,
       a.keterangan,isnull(d.kredit_ar,0) as kredit_ar,isnull(d.kredit_pph,0) as kredit_pph,isnull(d.kredit_adm,0) as kredit_adm,isnull(d.kredit,0) as kredit,
	   (a.nilai+a.ppn)-isnull(d.kredit,0) as saldo
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
left join (select a.no_ar,sum(b.nilai) as kredit,
				  sum(case b.jenis when 'AR' then b.nilai else 0 end) as kredit_ar,
				  sum(case b.jenis when 'PPH' then b.nilai else 0 end) as kredit_pph,
				  sum(case b.jenis when 'ADM' then b.nilai else 0 end) as kredit_adm
		   from dmt_ar_m a
		   inner join dmt_kaspiutang_d b on a.no_ar=b.no_ar
		   inner join kas_m c on b.no_kas=c.no_kas
		   where c.tanggal<'2011-08-30' 
		   group by a.no_ar
		   )d on a.no_ar=d.no_ar
where a.tanggal<'$tgl_aging'
order by a.no_ar 
";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("AGING PIUTANG",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' class='header_laporan'>No</td>
    <td width='150' rowspan='2' class='header_laporan'>Operator</td>
    <td width='100' rowspan='2' class='header_laporan'>No PO </td>
    <td width='60' rowspan='2' class='header_laporan'>Tanggal </td>
    <td width='100' rowspan='2' class='header_laporan'>No INV </td>
    <td width='60' rowspan='2' class='header_laporan'>Umur Piutang </td>
    <td colspan='2' class='header_laporan'>Tagihan</td>
    <td width='90' rowspan='2' class='header_laporan'>Total Tagihan</td>
	 <td colspan='3' class='header_laporan'>Pelunasan</td>
    <td width='90' rowspan='2' class='header_laporan'>Total Pelunasan </td>
    <td width='90' rowspan='2' class='header_laporan'>Oustanding AR </td>
    <td width='150' rowspan='2' class='header_laporan'>Keterangan</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Nominal</td>
    <td width='80' align='center' class='header_laporan'>PPN</td>
	<td width='90' align='center' class='header_laporan'>AR</td>
    <td width='80' align='center' class='header_laporan'>PPH</td>
	<td width='80' align='center' class='header_laporan'>ADM</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->nama_cust</td>
    <td class='isi_laporan'>$row->no_po</td>
    <td class='isi_laporan'>$row->tanggal</td>
    <td class='isi_laporan'>$row->no_ar</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->ppn,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->total,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->kredit_ar,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->kredit_pph,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->kredit_adm,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row->kredit,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->saldo,0,",",".")."</td>
    <td class='isi_laporan'>$row->keterangan</td>
  </tr>";
			$i=$i+1;
		}
		echo "</table><br></div>";
		return "";
	}
	
	
}
?>
