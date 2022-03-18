<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptHutangSaldoPolis extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$urut=$tmp[2];
		$nik_user=$tmp[3];
		
		$sql="select a.no_polis,a.kode_lokasi,b.no_dok,b.no_dok2,a.kode_vendor,c.nama as nama_vendor,
	   isnull(d.hutang,0)-isnull(e.bayar,0) as so_awal,isnull(f.hutang,0) as debet,isnull(g.bayar,0) as kredit,
	   isnull(d.hutang,0)-isnull(e.bayar,0)+isnull(f.hutang,0)-isnull(g.bayar,0) as so_akhir
from (select a.no_polis,a.kode_vendor,a.kode_lokasi
	from sju_polis_termin a
	where a.kode_lokasi='$kode_lokasi' and a.no_bill<>'-'
	group by a.no_polis,a.kode_vendor,a.kode_lokasi
	) a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
left join  (select a.no_polis,a.kode_lokasi,sum((a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn+a.pph)*a.kurs) as hutang
			from sju_polis_termin a 
			inner join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.no_bill <> '-' and b.periode<'$periode'
			group by a.no_polis,a.kode_lokasi 
		    )d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
left join  (select a.no_polis,a.kode_lokasi,
				   sum(case a.dc when 'D' then (a.nilai_kas+a.nilai_lain) else -(a.nilai_kas+a.nilai_lain) end) as bayar 
			from sju_hutbayar_d a 
			inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where  a.kode_lokasi='$kode_lokasi' and b.periode<'$periode'
			group by  a.no_polis,a.kode_lokasi
		    )e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi
left join  (select a.no_polis,a.kode_lokasi,sum((a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn+a.pph)*a.kurs) as hutang
			from sju_polis_termin a 
			inner join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.no_bill <> '-' and b.periode='$periode'
			group by a.no_polis,a.kode_lokasi 
		    )f on a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi
left join  (select a.no_polis,a.kode_lokasi,
				   sum(case a.dc when 'D' then (a.nilai_kas+a.nilai_lain) else -(a.nilai_kas+a.nilai_lain) end) as bayar 
			from sju_hutbayar_d a 
			inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where  a.kode_lokasi='$kode_lokasi' and b.periode='$periode'
			group by  a.no_polis,a.kode_lokasi
		    )g on a.no_polis=g.no_polis and a.kode_lokasi=g.kode_lokasi
where a.kode_lokasi='$kode_lokasi' 
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Kode</td>
	 <td width='250'  align='center' class='header_laporan'>Nama Asuradur</td>
	 <td width='100'  align='center' class='header_laporan'>No Register</td>
	 <td width='100'  align='center' class='header_laporan'>No Polis</td>
	 <td width='100'  align='center' class='header_laporan'>No Sertifikat</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Awal Hutang</td>
	 <td width='100'  align='center' class='header_laporan'>Hutang Bulan ini</td>
	 <td width='100'  align='center' class='header_laporan'>Pembayaran Bulan ini</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Akhir Hutang</td>
   </tr>
   ";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
  	<td class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	  <td class='isi_laporan'>$row->no_polis</td>
	   <td class='isi_laporan'>$row->no_dok</td>
	    <td class='isi_laporan'>$row->no_dok2</td>
	<td class='isi_laporan' align='right'>".number_format($row->so_awal,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->debet,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->kredit,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->so_akhir,2,",",".")."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
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
