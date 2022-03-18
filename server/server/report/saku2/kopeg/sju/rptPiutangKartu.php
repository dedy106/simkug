<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPiutangKartu extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$sql="select a.kode_cust,a.nama,ISNULL(b.premi,0) as debet,ISNULL(c.premi,0) as kredit,
		ISNULL(d.premi,0)-ISNULL(e.premi,0) as so_awal,ISNULL(d.premi,0)-ISNULL(e.premi,0)+ISNULL(b.premi,0)-ISNULL(c.premi,0) as so_akhir
from sju_cust a
left join (select d.kode_cust,a.kode_lokasi,sum((a.premi*a.kurs)) as premi
			from sju_polis_termin a 
			inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
			where(a.kode_lokasi = '$kode_lokasi')and(b.periode = '$periode') 
			group by d.kode_cust,a.kode_lokasi
		)b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
left join (select d.kode_cust,a.kode_lokasi,sum((a.premi*a.kurs)) as premi
			from sju_polis_termin a 
			inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
			left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor and g.periode='$periode' 
			where(a.kode_lokasi = '$kode_lokasi')and(b.periode = '$periode') and isnull(g.no_bukti,'-')<>'-' 
			group by d.kode_cust,a.kode_lokasi
		)c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
left join (select d.kode_cust,a.kode_lokasi,sum((a.premi*a.kurs)) as premi
			from sju_polis_termin a 
			inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
			where(a.kode_lokasi = '$kode_lokasi')and(b.periode < '$periode') 
			group by d.kode_cust,a.kode_lokasi
		)d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
left join (select d.kode_cust,a.kode_lokasi,sum((a.premi*a.kurs)) as premi
			from sju_polis_termin a 
			inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
			left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor and g.periode<'$periode' 
			where(a.kode_lokasi = '$kode_lokasi')and(b.periode < '$periode') and isnull(g.no_bukti,'-')<>'-' 
			group by d.kode_cust,a.kode_lokasi
		)e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and ISNULL(b.premi,0)<>0
order by a.kode_cust";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='250'  align='center' class='header_laporan'>Tertanggung</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Awal</td>
	 <td width='100'  align='center' class='header_laporan'>Debet</td>
	 <td width='100'  align='center' class='header_laporan'>Kredit</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Akhir</td>
      </tr>  ";
		$so_awal=0; $debet=0; $kredit=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_awal,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_akhir,2,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($so_awal,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($debet,2,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($kredit,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($so_akhir,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
