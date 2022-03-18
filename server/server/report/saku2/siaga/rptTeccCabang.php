<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptTeccCabang extends server_report_basic
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
		
		$sql="select a.kode_lokasi,a.kode_cabang,a.nama,isnull(c.nilai,0) as nilai,isnull(c.diskon,0) as diskon,isnull(c.nilai_diskon,0) as nilai_diskon,
       isnull(c.ppn,0) as ppn,isnull(c.biaya,0) as biaya,isnull(c.materai,0) as materai,isnull(c.total,0) as total,
	   isnull(d.nilai_kas,0) as nilai_kas,isnull(c.total,0)-isnull(d.nilai_kas,0) as saldo
from gr_cabang a
inner join (select distinct kode_cabang
			from gr_tecc_m
		   )b on a.kode_cabang=b.kode_cabang
left join (select a.kode_cabang,sum(b.nilai) as nilai,sum(b.diskon) as diskon,sum(b.nilai-b.diskon) as nilai_diskon,
			   sum(b.ppn) as ppn,sum(b.biaya) as biaya,sum(b.materai) as materai,
			   sum(b.nilai-b.diskon+b.ppn+b.biaya+b.materai) as total
		   from gr_tecc_m a
		   inner join gr_tecc_d b on a.no_tecc=b.no_tecc and a.kode_lokasi=b.kode_lokasi
		   group by a.kode_cabang
		  )c on b.kode_cabang=c.kode_cabang 
left join (select a.kode_cabang,sum(c.nilai_kas) as nilai_kas
		   from gr_tecc_m a
		   inner join gr_tecc_d b on a.no_tecc=b.no_tecc and a.kode_lokasi=b.kode_lokasi
		   inner join gr_teccbayar_d c on c.no_invoice=b.no_invoice and b.kode_lokasi=c.kode_lokasi
		   group by a.kode_cabang
		  )d on b.kode_cabang=d.kode_cabang  ";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan tecc - cabang $nama_cab",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='40'  align='center' class='header_laporan'>Kode Cabang</td>
     <td width='150'  align='center' class='header_laporan'>Nama Cabang</td>
     <td width='80'  align='center' class='header_laporan'>Jumlah Pemakaian</td>
     <td width='70'  align='center' class='header_laporan'>Diskon</td>
     <td width='80'  align='center' class='header_laporan'>Total Setelah Diskon </td>
     <td width='70'  align='center' class='header_laporan'>PPN</td>
     <td width='70'  align='center' class='header_laporan'>Biaya Print Out</td>
     <td width='70'  align='center' class='header_laporan'>Materai </td>
     <td width='90'  align='center' class='header_laporan'>Total Tagihan </td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo </td>
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
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->kode_cabang','$row->kode_lokasi');\">$row->kode_cabang</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->biaya,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->materai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
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
