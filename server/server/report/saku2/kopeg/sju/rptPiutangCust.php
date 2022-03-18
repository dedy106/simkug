<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPiutangCust extends server_report_basic
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
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$status=$tmp[4];
		$sql2="";
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$periode_bayar=$periode;
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		$periode_bayar=$periode;
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
			$periode_bayar=$periode2;
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$tmp="";
		if ($status=="Lunas")
		{
			$tmp=" and isnull(g.no_bukti,'-')<>'-' "; 
		}
		if ($status=="OutStanding")
		{
			$tmp=" and isnull(g.no_bukti,'-')='-' ";
		}
		$sql="select c.kode_cust,c.nama as nama_cust,sum(a.fee) as fee,
		sum((a.premi*a.kurs)+(a.p_cost*a.kurs)+(a.materai*a.kurs)-(a.diskon*a.kurs)) as piutang
from sju_bill_d a
inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
left join ( select a.no_polis,a.kode_lokasi,a.ke,a.no_bill,a.kode_vendor,
				   ISNULL(a.no_bukti,'-') as no_bukti,ISNULL(a.no_kashut,'-') as no_kashut
			from sju_polisbayar_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode_bayar'
		    union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C' 
			union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join ju_m b on a.no_bill=b.no_ju and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C'
		)g on a.no_polis=g.no_polis and a.kode_lokasi=b.kode_lokasi and a.ke=g.ke and a.no_bill=g.no_bill and a.kode_vendor=g.kode_vendor
$this->filter $tmp and a.dc='D'
group by c.kode_cust,c.nama
order by c.kode_cust ";
		
		$rs = $dbLib->execute($sql);
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar piutang per tertanggung",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='400'  align='center' class='header_laporan'>Tertanggung</td>
	 <td width='100'  align='center' class='header_laporan'>Komisi</td>
	 <td width='100'  align='center' class='header_laporan'>Piutang</td>
      </tr>  ";
		$piutang=0; $fee=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$piutang+=$row->piutang;
			$fee+=$row->fee;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
     echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAkru('$row->kode_cust','$row->kode_lokasi');\">$row->nama_cust</a></td>";
	echo "
	
	<td class='isi_laporan' align='right'>".number_format($row->fee,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->piutang,2,",",".")."</td>";
	echo "</tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($fee,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piutang,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
