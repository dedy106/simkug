<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_tm_rptHutangSaldoVendor extends server_report_basic
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
		$sql="select a.kode_lokasi,b.kode_vendor,b.nama as nama_cust,a.kode_pp as pp_vendor,
		sum(a.nilai-a.nilai_ppn-a.nilai_pph) as nilai,sum(a.nilai_ppn) as nilai_ppn,sum(a.nilai) as tagihan,
	   sum(isnull(c.nilai_kas,0)) as nilai_kas,sum(a.nilai-a.nilai_pph-isnull(c.nilai_kas,0)) as saldo 
from tm_hutang_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_hutang,a.kode_lokasi,sum(a.nilai) as nilai_kas
		   from tm_hutbayar_d a
		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
		   group by a.no_hutang,a.kode_lokasi
		  )c on a.no_hutang=c.no_hutang and a.kode_lokasi=b.kode_lokasi
$this->filter 
group by a.kode_lokasi,b.kode_vendor,b.nama,a.kode_pp
order by a.kode_pp";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang per vendor",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode Vendor</td>
	 <td width='300' rowspan='2' align='center' class='header_laporan'>Nama Vendor</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Hutang</td>
	
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tgl_kas="";$umur=0;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->kode_vendor','$kode_lokasi','$periode');\">$row->kode_vendor</a>";
		echo "</td>
	
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->pp_vendor</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='4'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
