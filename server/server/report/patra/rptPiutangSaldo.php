<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_patra_rptPiutangSaldo extends server_report_basic
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
	
		$sql="select a.kode_lokasi,a.no_ar,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,b.nama as nama_cust,
					 a.kode_curr,a.kurs,a.nilai_curr,a.ppn_curr,a.nilai,a.ppn,a.nilai_curr+a.ppn_curr as total_curr,a.nilai+a.ppn as total,
					 isnull(c.nilai_curr,0) as nilai_kas,c.ket_kas,
					 a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0) as saldo_curr,
					 (a.nilai_curr+a.ppn_curr-isnull(c.nilai_curr,0))*a.kurs as saldo
from patra_ar_m a
inner join patra_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
left join (select no_ar,kode_lokasi,sum(case when dc='C' then nilai_curr else -nilai_curr end) as nilai_curr,
				  dbo.fnGetBuktiKasPiutang(no_ar) as ket_kas
	       from patra_kaspiutang_d
		   where jenis='AR' and periode<='$periode'
		   group by no_ar,kode_lokasi
		   )c on a.no_ar=c.no_ar and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_ar";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Piutang</td>
	 <td width='100'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Kode Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Kurs Tagihan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PPN Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Tagihan IDR</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PPN IDR</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan IDR</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo IDR</td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan Kas</td>
     </tr>  ";
		$nilai_curr=0;$ppn_curr=0;$total_curr=0;
		$nilai=0;$ppn=0;$total=0;
		$nilai_kas=0;
		$saldo_curr=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$ppn_curr=$ppn_curr+$row->ppn_curr;
			$total_curr=$total_curr+$row->total_curr;
			$nilai=$nilai+$row->nilai;
			$ppn=$ppn+$row->ppn;
			$total=$total+$row->total;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo_curr=$saldo_curr+$row->saldo_curr;
			$saldo=$saldo+$row->saldo;
					
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_ar','$row->kode_lokasi');\">$row->no_ar</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->kode_curr</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kurs,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_curr,2,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn_curr,2,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total_curr,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo_curr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_curr,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn_curr,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total_curr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo_curr,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
