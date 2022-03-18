<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kopeg_rptPinjSaldo extends server_report_basic
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
		$sql="select a.no_agg,a.kode_lokasi,b.nama,a.jenis_angs,a.no_pinj,c.nama as nama_param,
	   a.status_bayar,a.nilai,a.p_bunga,a.no_pinj,a.kode_lokasi,a.jenis_angs,a.kode_param,
	   a.lama_bayar,a.nilai_mat,a.nilai_prov,a.nilai_asur,a.nilai_bunga,a.nilai_pokok,a.nilai_tagihan,
	   isnull(d.npokok,0) as npokok,isnull(d.nbunga,0) as nbunga,case when isnull(e.tbunga,0) > isnull(d.nbunga,0) then isnull(d.nbunga,0) else isnull(e.tbunga,0) end as tbunga,
	   a.nilai+(case when isnull(e.tbunga,0) > isnull(d.nbunga,0) then isnull(d.nbunga,0) else isnull(e.tbunga,0) end)-isnull(d.npokok,0)-isnull(d.nbunga,0) as saldo,isnull(d.npokok,0)+isnull(d.nbunga,0) as bayar
from kop_pinj_m a
inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi
left join (select a.no_pinj,a.kode_lokasi,sum(a.npokok) as npokok,sum(a.nbunga) as nbunga
			from kop_pinjangs_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
			group by a.no_pinj,a.kode_lokasi
		   )d on a.no_pinj=d.no_pinj and a.kode_lokasi=d.kode_lokasi
left join (select a.no_pinj,a.kode_lokasi,sum(a.nbunga) as tbunga
			from kop_pinj_sch a
			where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
			group by a.no_pinj,a.kode_lokasi
		   )e on a.no_pinj=e.no_pinj and a.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_agg";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Anggota</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='120' align='center' class='header_laporan'>No Pinjaman</td>
	<td width='60' align='center' class='header_laporan'>Jenis Angsuran</td>
	<td width='60' align='center' class='header_laporan'>Status Bayar</td>
	<td width='60' align='center' class='header_laporan'>Jenis Param</td>
	<td width='60' align='center' class='header_laporan'>Lama Bayar</td>
	<td width='90' align='center' class='header_laporan'>Nilai Pinjaman</td>
	<td width='80' align='center' class='header_laporan'>Tunggakan Bunga</td>
    <td width='80' align='center' class='header_laporan'>Pembayaran Pokok</td>
	<td width='80' align='center' class='header_laporan'>Pembayaran Bunga</td>
	<td width='80' align='center' class='header_laporan'>Total Pembayaran</td>
	<td width='80' align='center' class='header_laporan'>Saldo</td>
  </tr>
    ";
		$nilai=0; $npokok=0; $nbunga=0; $jumlah=0; $bayar=0;  $saldo=0; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$npokok+=$row->npokok;
			$nbunga+=$row->nbunga;
			$tbunga+=$row->tbunga;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_agg</td>
	 <td class='isi_laporan'>$row->nama</td>";
	 echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_pinj','$row->kode_lokasi');\">$row->no_pinj</a></td>";
	 echo " <td class='isi_laporan'>$row->jenis_angs</td>
	  <td class='isi_laporan'>$row->status_bayar</td>
	  <td class='isi_laporan'>$row->kode_param</td>
	 <td class='isi_laporan' align='right'>".number_format($row->lama_bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tbunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->npokok,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nbunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='8' align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tbunga,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($npokok,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nbunga,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
