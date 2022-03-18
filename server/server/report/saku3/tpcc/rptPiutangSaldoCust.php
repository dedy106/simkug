<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_rptPiutangSaldoCust extends server_report_basic
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
		
		$sql2=""; $sql3="";
		
		$sql2=" and a.modul='PIUBILL' ";
		$sql3=" and b.modul='PIUBILL' ";
		$nama_jenis="<br>Piutang BILLING";
		
		
		$sql="select a.kode_cust,a.kode_lokasi,a.nama,isnull(b.nilai,0) as nilai,isnull(b.nilai_ppn,0) as nilai_ppn,isnull(b.tagihan,0) as tagihan,
		isnull(b.nilai_ppn,0) as nilai_ppn,isnull(b.nilai_kas,0) as nilai_kas,isnull(b.nilai,0)-isnull(b.nilai_kas,0) as saldo
 from cust a
 inner join (select a.kode_cust,a.kode_lokasi,
				sum(a.nilai+a.nilai_ppn) as nilai,sum(a.nilai_ppn) as nilai_ppn,sum(a.nilai) as tagihan,sum(isnull(b.nilai,0)) as nilai_kas
		 from piutang_d a 
		 left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai) as nilai 
				 from piubayar_d a 
				 where a.kode_lokasi='$kode_lokasi' and(a.periode <= '$periode') 
				 group by a.no_piutang,a.kode_lokasi 
				 )b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
		 where(a.kode_lokasi = '$kode_lokasi')and(a.periode <= '$periode')and a.modul in ('PIUBILL') 
		 group by a.kode_cust,a.kode_lokasi
		 )b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'  
order by a.kode_cust";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang bill per customer",$this->lokasi,"PERIODE SD ".$AddOnLib->ubah_periode($periode).$nama_jenis);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' heigt='23' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='80' rowspan='2' align='center' class='header_laporan'>Kode</td>
	 <td width='300' rowspan='2' align='center' class='header_laporan'>Customer</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
     <td width='100' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
    <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='100'  align='center' class='header_laporan'>Total Tagihan</td>
	
     </tr>
   ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan+=$row->tagihan;
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
			$nilai_ppn+=$row->nilai_ppn;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->kode_cust','$row->kode_lokasi');\">$row->kode_cust</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
     <td class='header_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
