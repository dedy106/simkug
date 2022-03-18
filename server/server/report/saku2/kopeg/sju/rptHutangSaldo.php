<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptHutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_bill)
from sju_bill_m a
inner join sju_polis_termin b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and c.kode_lokasi=b.kode_lokasi
inner join sju_polis_vendor d on c.no_polis=d.no_polis and c.kode_lokasi=d.kode_lokasi 
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi 
$this->filter";
		
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
		$kode_lokasi=$tmp[1];
	
		$sql="select a.kode_lokasi,a.no_bill,b.no_polis,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.no_polis,
		b.premi+b.p_cost+b.materai-b.fee-b.diskon-b.ppn as nilai,e.nama as nama_vendor,a.keterangan,b.ke,c.no_dok,
		isnull(f.nilai_kas,0) as nilai_kas,
		b.premi+b.p_cost+b.materai-b.fee-b.diskon-b.ppn+b.pph as total,
		b.pph,b.premi+b.p_cost+b.materai-b.fee-b.diskon-b.ppn-isnull(f.nilai_kas,0)+b.pph as saldo
from sju_bill_m a
inner join sju_polis_termin b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and c.kode_lokasi=b.kode_lokasi
inner join sju_polis_vendor d on c.no_polis=d.no_polis and c.kode_lokasi=d.kode_lokasi 
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi 
left join (select  no_bill,no_polis,kode_lokasi,sum(nilai_kas) as nilai_kas,sum(nilai_lain) as nilai_lain 
from sju_hutbayar_d
where kode_lokasi='$kode_lokasi' and periode<='$periode'
group by no_bill,no_polis,kode_lokasi
		   )f on b.no_bill=f.no_bill and b.no_polis=f.no_polis and b.kode_lokasi=f.kode_lokasi 
$this->filter order by a.no_bill";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang premi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Hutang</td>
	 <td width='120'  align='center' class='header_laporan'>No Bukti Polis</td>
	 <td width='120'  align='center' class='header_laporan'>No Dok Polis</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Nama Penanggung</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90' align='center' class='header_laporan'>Hutang Premi</td>
	  <td width='90'  align='center' class='header_laporan'>PPH</td>
	   <td width='90'  align='center' class='header_laporan'>Total</td>
     <td width='90'  align='center' class='header_laporan'>Nilai KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 
   </tr>
   ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;$pph=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
			$pph+=$row->pph;
			$total+=$row->total;
				
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_bill','$row->kode_lokasi');\">$row->no_bill</a>";
		echo "</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_bill','$row->kode_lokasi');\">$row->no_polis-$row->ke</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($pph,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
