<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptVccSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(b.no_invoice)
from gr_vcc_m a
inner join gr_vcc_d b on a.no_vcc=b.no_vcc and a.kode_lokasi=b.kode_lokasi
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
		$jenis=$tmp[1];
		$nama_cab=$tmp[2];
		$nama_file="saldo_tecc.xls";
		
		$sql="select a.kode_lokasi,b.no_invoice,b.nama_cust,b.nilai,b.diskon,b.nilai-b.diskon as nilai_diskon,b.ppn,b.biaya,b.materai,
       b.total as total,isnull(c.nilai_kas,0) as nilai_kas,
	   b.total-isnull(c.nilai_kas,0) as saldo,dbo.fnGetBuktiKasVcc(b.no_invoice,$periode) as ket_kas
from gr_vcc_m a
inner join gr_vcc_d b on a.no_vcc=b.no_vcc and a.kode_lokasi=b.kode_lokasi
left join (select a.no_invoice,a.kode_lokasi,sum(a.nilai_lain+a.nilai_kas) as nilai_kas				  
           from gr_vccbayar_d a
		   where a.periode<='$periode'
		   group by a.no_invoice,a.kode_lokasi
		  )c on b.no_invoice=c.no_invoice
$this->filter order by b.no_invoice ";
		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan VCOSS - cabang $nama_cab",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Invoice</td>
     <td width='250'  align='center' class='header_laporan'>Nama Perusahaan</td>
     <td width='80'  align='center' class='header_laporan'>Jumlah Pemakaian</td>
     <td width='70'  align='center' class='header_laporan'>Diskon</td>
     <td width='80'  align='center' class='header_laporan'>Total Setelah Diskon </td>
     <td width='70'  align='center' class='header_laporan'>PPN</td>
     <td width='70'  align='center' class='header_laporan'>Biaya Print Out</td>
     <td width='70'  align='center' class='header_laporan'>Materai </td>
     <td width='90'  align='center' class='header_laporan'>Total Tagihan </td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo </td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan </td>
   </tr>  ";
		$nilai=0;$diskon=0;$nilai_diskon=0;$ppn=0;$biaya=0;$materai=0;$total=0;
		$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$diskon=$diskon+$row->diskon;
			$nilai_diskon=$nilai_diskon+$row->nilai_diskon;
			$ppn=$ppn+$row->ppn;
			$biaya=$biaya+$row->biaya;
			$materai=$materai+$row->materai;
			$total=$total+$row->total;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_invoice','$row->kode_lokasi');\">$row->no_invoice</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->biaya,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->materai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($biaya,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($materai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
