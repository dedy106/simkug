<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptRefSaldo extends server_report_basic
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
		$kode_akun=$tmp[1];
		$flag_saldo=$tmp[2];
		$kode_lokasi=$tmp[3];
		$sts_saldo="";
		if ($flag_saldo=="Tidak")
		{
			$sts_saldo=" and a.nilai-isnull(b.nilai,0)<>0 ";
		}
		$sql="select a.kode_lokasi,a.no_ju,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,
	   isnull(b.nilai,0) as nilai_adj,a.nilai-isnull(b.nilai,0) as saldo
from ju_m a
left join (select a.ref1 as no_ju,a.kode_lokasi,b.kode_akun,sum(a.nilai) as nilai
		from ju_m a
		inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi and b.jenis='AKUNREF'
		where a.kode_lokasi='$kode_lokasi' and a.ref1<>'-' and a.periode<='$periode'
		group by a.ref1,a.kode_lokasi,b.kode_akun
		union all
		select a.ref1 as no_ju,a.kode_lokasi,b.kode_akun,sum(a.nilai) as nilai
		from kas_m a
		inner join kas_j b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.jenis='AKUNREF'
		where a.kode_lokasi='$kode_lokasi' and a.ref1<>'-' and a.modul='KBADJ' and a.periode<='$periode'
		group by a.ref1,a.kode_lokasi,b.kode_akun
		)b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi
$this->filter $sts_saldo order by a.no_ju";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo jurnal referensi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	  <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Ref</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Adjust</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan</td>
     </tr>  ";
		$nilai=0;$nilai_adj=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_adj+=$row->nilai_adj;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_adj,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_adj,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
