<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptTiketSaldo extends server_report_basic
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
		$sql="select b.periode,b.no_bukti,a.jumlah,a.harga as tagihan,a.nilai as nilai,a.kode_tiket,a.nama,a.no_closing,a.kode_curr,a.kurs,
		convert(varchar,a.tgl_berangkat,103) as tgl, case when a.no_closing='-' then c.akun_bdd else c.akun_hutang end as kode_akun,
		 isnull(b.bayar,0) as bayar,a.nilai - isnull(b.bayar,0) as saldo,d.nama as nama_ven 
		from dgw_tiket a 
		inner join dgw_jenis_tiket c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi 
		left join ( select kode_lokasi,periode,no_bukti,kode_tiket,
		sum(case dc when 'D' then nilai else -nilai end) as bayar 
		from dgw_tiket_bayar 
		where kode_lokasi='$kode_lokasi' and periode<='$periode'
		group by kode_tiket,no_bukti,periode,kode_lokasi ) b on a.kode_tiket=b.kode_tiket
		 inner join vendor d on d.kode_vendor=a.kode_vendor and d.kode_lokasi=a.kode_lokasi 
		$this->filter order by b.no_bukti";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo tiket bdd",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Closing</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Jumlah</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->bayar;
			$saldo=$saldo+$row->saldo;
			$nilai_ppn=$nilai_ppn+$row->jumlah;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->no_closing</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_ven</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
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
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
