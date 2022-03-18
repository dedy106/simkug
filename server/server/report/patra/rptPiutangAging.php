<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_patra_rptPiutangAging extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ar)
from patra_ar_m a
inner join patra_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
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
		$tgl_aging=substr($tmp[0],0,4)."-".substr($tmp[0],5,2)."-01";
		$sql="select a.kode_lokasi,a.no_ar,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.nama as nama_cust,a.nilai+a.ppn as tagihan,
	   case when datediff(month,a.tanggal,'$tgl_aging')<1 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging1,
	   case when datediff(month,a.tanggal,'$tgl_aging') between 1 and 3 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging2,
       case when datediff(month,a.tanggal,'$tgl_aging') between 4 and 6 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging3,
	   case when datediff(month,a.tanggal,'$tgl_aging') between 7 and 9 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging4,
	   case when datediff(month,a.tanggal,'$tgl_aging') between 10 and 12 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging5,
       case when datediff(month,a.tanggal,'$tgl_aging')>12 then (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs else 0 end as aging6,
	   (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs as saldo
from patra_ar_m a
inner join patra_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_ar,a.kode_lokasi,sum(a.nilai_curr) as nilai_curr,
				  dbo.fnGetBuktiKasPiutang(no_ar) as ket_kas
	       from patra_kaspiutang_d a
		   inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where b.periode<='$periode'  
		   group by a.no_ar,a.kode_lokasi
		   )c on a.no_ar=c.no_ar and a.kode_lokasi=a.kode_lokasi
$this->filter and (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs <> 0
order by a.kode_cust,a.no_ar";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aging piutang",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='100' rowspan='2'  align='center' class='header_laporan'>No Hutang</td>
	  <td width='100' rowspan='2'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200' rowspan='2'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td colspan='6'  align='center' class='header_laporan'>Aging</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
	 </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Bulan Berjalan</td>
     <td width='90'  align='center' class='header_laporan'>1 - 3 Bulan</td>
     <td width='90'  align='center' class='header_laporan'>4 - 6 Bulan</td>
     <td width='90'  align='center' class='header_laporan'>7 - 9 Bulan</td>
	 <td width='90'  align='center' class='header_laporan'>10 - 12 Bulan</td>
     <td width='90'  align='center' class='header_laporan'>> 12 Bulan</td>
   </tr> 
   ";
		$aging1=0;$aging2=0;$aging3=0;$aging4=0;$aging5=0;$aging6=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saldo=$saldo+$row->saldo;
			$aging1=$aging1+$row->aging1;
			$aging2=$aging2+$row->aging2;
			$aging3=$aging3+$row->aging3;
			$aging4=$aging4+$row->aging4;
			$aging1=$aging1+$row->aging5;
			$aging1=$aging1+$row->aging6;
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenHutang('$row->no_ar','$row->kode_lokasi');\">$row->no_ar</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_ar','$row->kode_lokasi');\">$row->no_dokumen</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	  <td class='isi_laporan' align='right'>".number_format($row->aging1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->aging2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->aging3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->aging4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->aging5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->aging6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($aging1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging6,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
