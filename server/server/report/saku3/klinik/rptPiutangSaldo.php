<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_klinik_rptPiutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_jual)
from kli_jual_m a
inner join kli_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
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
		$lokasi=$tmp[1];
		
		
		
		$sql="select a.kode_lokasi,a.no_jual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tanggal,a.keterangan,b.nama as nama_cust,
	   a.nilai,a.nilai_ppn,(a.nilai-a.nilai_ppn) as tagihan,isnull(c.nilai_kas,0) as nilai_kas,a.nilai-isnull(c.nilai_kas,0) as saldo
from kli_jual_m a
inner join kli_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_jual,a.kode_lokasi,sum(a.nilai_kas) as nilai_kas
from kli_jualbayar_d a
where a.kode_lokasi='$lokasi' and a.periode<='$periode'
group by a.no_jual,a.kode_lokasi
		)c on a.no_jual=c.no_jual and a.kode_lokasi=b.kode_lokasi
$this->filter 
order by a.no_jual";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='120'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Customer</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Kas</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_ppn=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan+=$row->tagihan;
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$nilai_ppn+=$row->nilai_lain;
			$saldo+=$row->saldo;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_jual','$row->kode_lokasi');\">$row->no_jual</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     
     </tr>
	 ";
		
		echo "</table>";
		echo "</td>
  </tr>
 
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
