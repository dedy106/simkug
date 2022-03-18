<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sapyakes_rptSmsDet extends server_report_basic
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
		$sql="select a.no_reg,a.no_peserta,a.kode_lokasi,a.no_paket,a.tgl_input,d.nama,e.nama_agen,convert(varchar(20),a.tgl_input,103) as tgl,g.no_closing,
	   a.harga+harga_room as paket,isnull(b.nilai,0) as tambahan,
	   isnull(c.bayar_paket,0) as bayar_paket,isnull(c.bayar_tambahan,0) as bayar_tambahan,
	   a.harga+harga_room-isnull(c.bayar_paket,0) as saldo_paket,
	   isnull(b.nilai,0)-isnull(c.bayar_tambahan,0) as saldo_tambahan,f.nama as nama_paket
from dgw_reg a
inner join dgw_peserta d on a.no_peserta=d.no_peserta and a.kode_lokasi=d.kode_lokasi
inner join dgw_agent e on a.no_agen=e.no_agen and a.kode_lokasi=e.kode_lokasi
inner join dgw_paket f on a.no_paket=f.no_paket and a.kode_lokasi=f.kode_lokasi
inner join dgw_jadwal g on a.no_jadwal=g.no_jadwal and a.kode_lokasi=g.kode_lokasi and a.no_paket=g.no_paket
left join (select a.no_reg,a.kode_lokasi,sum(a.nilai) as nilai
		   from dgw_reg_biaya a
		   where a.kode_lokasi='$kode_lokasi'
		   group by a.no_reg,a.kode_lokasi
		   )b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi
left join (select a.no_reg,a.kode_lokasi,sum(nilai_p) as bayar_paket,sum(nilai_t) as bayar_tambahan
		   from dgw_pembayaran a
		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
		   group by a.no_reg,a.kode_lokasi
		   )c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_paket,a.no_reg ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan sms restitusi",$this->lokasi," ");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Periode</td>
     <td colspan='2' align='center' class='header_laporan'>Pengajuan</td>
     <td colspan='2' align='center' class='header_laporan'>Sms Restitusi</td>
	 <td colspan='3' align='center' class='header_laporan'>Pengajuan Tanpa Sms Restitusi</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
   <td width='90'  align='center' class='header_laporan'>Rp</td>
   <td width='90'  align='center' class='header_laporan'>Jiwa</td>
   <td width='90'  align='center' class='header_laporan'>Rp</td>
   <td width='90'  align='center' class='header_laporan'>Jiwa</td>
   <td width='90'  align='center' class='header_laporan'>Rp</td>
   <td width='90'  align='center' class='header_laporan'>Jiwa</td>
	<td width='90'  align='center' class='header_laporan'>Keterangan</td>
     </tr>  ";
		$paket=0;$tambahan=0;$bayar_paket=0;$bayar_tambahan=0;$saldo_paket=0;$saldo_tambahan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$paket+=$row->paket;
			$tambahan+=$row->tambahan;
			$bayar_paket+=$row->bayar_paket;
			$bayar_tambahan+=$row->bayar_tambahan;
			$saldo_paket+=$row->saldo_paket;
			$saldo_tambahan+=$row->saldo_tambahan;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_reg','$row->kode_lokasi');\">$row->no_reg</a>";
	echo "</td>
	 <td class='isi_laporan'>$row->no_peserta</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_paket</td>
	 <td class='isi_laporan'>$row->nama_agen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	  <td class='isi_laporan'>$row->no_closing</td>
	 <td class='isi_laporan' align='right'>".number_format($row->paket,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tambahan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar_paket,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar_tambahan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo_paket,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo_tambahan,0,",",".")."</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='8'>Total</td>
     <td class='header_laporan' align='right'>".number_format($paket,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tambahan,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($bayar_paket,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bayar_tambahan,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($saldo_paket,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($saldo_tambahan,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
