<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bengkel_rptPiutangSaldo extends server_report_basic
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
		$nama_cab=$tmp[1];
		$sql="select a.kode_lokasi,a.no_jual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_cust,a.no_faktur,
		a.nilai,a.nilai_diskon,a.nilai_ppn,a.nilai_service,a.nilai-a.nilai_diskon+a.nilai_ppn+a.nilai_service as total,b.nama as nama_cust,
	   isnull(c.nilai,0) as nilai_kas,a.nilai-a.nilai_diskon+a.nilai_ppn+a.nilai_service-isnull(c.nilai,0) as saldo,a.jenis,a.kode_gudang
from fri_jual_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_jual,a.kode_lokasi,sum(a.nilai) as nilai
		   from fri_jualbayar_d a
		   group by a.no_jual,a.kode_lokasi
		  )c on a.no_jual=c.no_jual and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_jual";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No SPK</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Faktur</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Gudang</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Jenis</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode Cust</td>
     <td width='200' rowspan='2' align='center' class='header_laporan'>Customer</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td colspan='5'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='80'  align='center' class='header_laporan'>Biaya (I)</td>
	 <td width='80'  align='center' class='header_laporan'>Biaya (II)</td>
	 <td width='80'  align='center' class='header_laporan'>Disc</td>
	 <td width='80'  align='center' class='header_laporan'>Ppn</td>
	 <td width='80'  align='center' class='header_laporan'>total</td>
     </tr>  ";
		$nilai=0;$nilai_ppn=0;$nilai_service=0;$nilai_diskon=0;$total=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$nilai_service+=$row->nilai_service;
			$nilai_diskon+=$row->nilai_diskon;
			$total+=$row->total;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_jual','$row->kode_lokasi');\">$row->no_jual</a>";
		echo "</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpk('$row->no_dokumen','$row->kode_lokasi');\">$row->no_dokumen</a></td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenFaktur('$row->no_jual','$row->kode_lokasi');\">$row->no_faktur</a></td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan' align='center'>$row->kode_gudang</td>
	  <td class='isi_laporan' align='center'>$row->jenis</td>
	 <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 
	 <td align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_service,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_diskon,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->nilai_ppn,0,",",".")."</td>
	  <td align='right' class='isi_laporan'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_jual','$row->kode_lokasi');\">".number_format($row->nilai_kas,0,",",".")."</a></td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='10'>Total</td>
     <td align='right' class='isi_laporan'>".number_format($nilai,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_service,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_diskon,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($nilai_ppn,0,",",".")."</td>
	  <td align='right' class='isi_laporan'>".number_format($total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
