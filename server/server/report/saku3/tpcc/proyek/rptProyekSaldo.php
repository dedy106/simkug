<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptProyekSaldo extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_bill,b.kode_proyek,b.nama as pryk,a.keterangan,
		(a.nilai+a.nilai_ppn) as total,a.nilai as tagihan,c.nama as nama_cust,c.divisi,e.nama as nama_group,f.nama as nama_cons,a.nilai_ppn as ppn,
	   isnull(d.nilai_kas,0) as byr,(a.nilai+a.nilai_ppn-isnull(d.nilai_kas,0)) as saldo,convert(varchar,a.tanggal,103) as tanggal
from bill_m a
inner join trans_m x on a.no_bill=x.no_bukti and a.kode_lokasi=x.kode_lokasi
inner join pr_proyek b on a.no_kontrak=b.kode_proyek and a.kode_lokasi=b.kode_lokasi 
inner join cust c on c.kode_cust=b.kode_cust and c.kode_lokasi=b.kode_lokasi 
left join cust_klp e on c.kode_klpcust=e.kode_klpcust  and e.kode_lokasi=c.kode_lokasi
inner join consumer f on b.kode_cons=f.kode_cons and b.kode_lokasi=f.kode_lokasi
left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai) as nilai_kas				  
           from piutang_bayar a
		   where a.periode<='$periode'
		   group by a.no_piutang,a.kode_lokasi
		  )d on a.no_bill=d.no_piutang and a.kode_lokasi=d.kode_lokasi 


$this->filter
 order by a.tanggal";

//  echo $sql;
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Kode Proyek</td>
     <td width='80' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Customer</td>
     <td width='100' rowspan='2' align='center' class='header_laporan'>Divisi</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Consumer</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Bayar</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$tagihan=0;$ppn=0;$total=0;$saldo=0;$byr=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$ppn=$ppn+$row->ppn;
			$total=$total+$row->total;
			$saldo=$saldo+$row->saldo;
			$byr=$byr+$row->byr;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_bill</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->divisi</td>
	 <td class='isi_laporan'>$row->nama_cons</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_bill','$row->kode_lokasi');\">".number_format($row->byr,0,",",".")."</a></td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($byr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
