<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptPiutangSaldoCust extends server_report_basic
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
		$sql="select a.kode_cust,a.nama,a.kode_lokasi,isnull(d.nilai,0)-isnull(e.nilai,0) as so_awal,
		isnull(b.nilai,0) as debet,isnull(c.nilai,0) as kredit,
		isnull(d.nilai,0)-isnull(e.nilai,0)+isnull(b.nilai,0)-isnull(c.nilai,0) as so_akhir
from cust a
inner join (select a.kode_lokasi,a.kode_cust
			from piutang_d a
			inner join trans_m b on a.no_piutang=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			where a.kode_lokasi='$kode_lokasi'
			group by a.kode_cust,a.kode_lokasi
			)f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi
left join (select a.kode_lokasi,a.kode_cust,sum(a.nilai+a.nilai_ppn) as nilai
			from piutang_d a
			inner join trans_m b on a.no_piutang=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.kode_cust,a.kode_lokasi
			)b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
left join (select b.kode_lokasi,b.kode_cust,sum(a.nilai) as nilai
			from piubayar_d a
			inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
			inner join trans_m c on b.no_piutang=c.no_bukti and b.kode_lokasi=c.kode_lokasi 
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by b.kode_cust,b.kode_lokasi
			)c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_lokasi,a.kode_cust,sum(a.nilai+a.nilai_ppn) as nilai
			from piutang_d a
			inner join trans_m b on a.no_piutang=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode'
			group by a.kode_cust,a.kode_lokasi
			)d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
left join (select b.kode_lokasi,b.kode_cust,sum(a.nilai) as nilai
			from piubayar_d a
			inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
			inner join trans_m c on b.no_piutang=c.no_bukti and b.kode_lokasi=c.kode_lokasi 
			where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode'
			group by b.kode_cust,b.kode_lokasi
			)e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
$this->filter 
order by a.kode_cust
	";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang customer",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode </td>
     <td width='250'  align='center' class='header_laporan'>Nama Customer</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo Awal</td>
     <td width='100' align='center' class='header_laporan'>Tagihan</td>
     <td width='100'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo</td> 
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
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_cust','$row->kode_lokasi');\">$row->kode_cust</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 
	 <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
     <td class='header_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($debet,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
