<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_logistik_rptPesanPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$kode_lokasi=$tmp[1];
		$sql="select a.no_pesan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_dana,c.nama as nama_dana,
       d.no_po,date_format(e.tanggal,'%d/%m/%Y') as tgl_po,f.no_terima,date_format(g.tanggal,'%d/%m/%Y') as tgl_terima,h.no_ba,date_format(i.tanggal,'%d/%m/%Y') as tgl_ba,
	   isnull(j.nilai,0) as nilai,isnull(j.jumlah,0) as jumlah,
		l.no_spb,date_format(l.tanggal,'%d/%m/%Y') as tgl_spb,l.no_kas,date_format(m.tanggal,'%d/%m/%Y') as tgl_kas
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join log_dana c on a.kode_dana=c.kode_dana and a.kode_lokasi=c.kode_lokasi
left join  (select a.no_pesan,a.no_po,a.kode_lokasi
			from log_pesan_d a
			where kode_lokasi='$kode_lokasi'
			group by a.no_pesan,a.no_po,a.kode_lokasi
		   )d on a.no_pesan=d.no_pesan and a.kode_lokasi=d.kode_lokasi
left join log_po_m e on d.no_po=e.no_po and d.kode_lokasi=e.kode_lokasi
left join  (select a.no_po,a.kode_lokasi,a.no_terima
			from log_terima_m a
			where kode_lokasi='$kode_lokasi'
			group by a.no_po,a.kode_lokasi,a.no_terima
		   )f on d.no_po=f.no_po and d.kode_lokasi=f.kode_lokasi
left join log_terima_m g on f.no_terima=g.no_terima and f.kode_lokasi=g.kode_lokasi
left join  (select a.no_po,a.kode_lokasi,a.no_ba
			from log_ba_m a
			where kode_lokasi='$kode_lokasi'
			group by a.no_po,a.kode_lokasi,a.no_ba
		   )h on d.no_po=h.no_po and d.kode_lokasi=h.kode_lokasi
left join log_ba_m i on h.no_ba=i.no_ba and h.kode_lokasi=i.kode_lokasi
left join  (select no_pesan,kode_lokasi,sum(jumlah) as jumlah,sum(nilai) as nilai
			from log_pesan_d
			where kode_lokasi='$kode_lokasi'
		    group by no_pesan,kode_lokasi
			)j on a.no_pesan=j.no_pesan and a.kode_lokasi=j.kode_lokasi
left join  (select a.no_bukti,a.kode_lokasi,a.no_spb
			from spb_d a
			where kode_lokasi='$kode_lokasi'
			group by a.no_bukti,a.kode_lokasi,a.no_spb
		   )k on k.no_bukti=i.no_ba and k.kode_lokasi=i.kode_lokasi
left join spb_m l on l.no_spb=k.no_spb and k.kode_lokasi=l.kode_lokasi
left join kas_m m on l.no_kas=m.no_kas and l.kode_lokasi=m.kode_lokasi
$this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pemesanan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
 
  <tr bgcolor='#CCCCCC'>
   <td width='30' align='center' class='header_laporan'>No </td>
    <td width='100' align='center' class='header_laporan'>No Pesanan </td>
	<td width='50' align='center' class='header_laporan'>Tanggal</td>
	<td width='60'  align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
	<td width='50' align='center' class='header_laporan'>Jumlah</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
   <td width='100' align='center' class='header_laporan'>No Kontrak Kerja </td>
	<td width='60' align='center' class='header_laporan'>Tgl Kontrak Kerja </td>
	<td width='100' align='center' class='header_laporan'>No Penerimaan </td>
	<td width='60' align='center' class='header_laporan'>Tgl Penerimaan </td>
	<td width='100' align='center' class='header_laporan'>No BA</td>
	<td width='60' align='center' class='header_laporan'>Tgl BA</td>
	<td width='100' align='center' class='header_laporan'>No SPB</td>
	<td width='60' align='center' class='header_laporan'>Tgl SPB</td>
	<td width='100' align='center' class='header_laporan'>No KasBank</td>
	<td width='60' align='center' class='header_laporan'>Tgl KasBank</td>
    </tr>
	";
		$rs = $dbLib->execute($sql);
		$j=1;$jumlah=0; $nilai=0; 
		$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_pesan; 
			if ($tmp!=$row->no_pesan)
			{
				$tmp=$row->no_pesan;
				$first = true;
				
				if ($i>1)
				{
					$nilai=0;$rka=0;$tw1=0;$tw2=0;$tw3=0;$tw4=0;
					echo " <tr bgcolor='#CCCCCC'>
    <td colspan='12' align='center' class='isi_laporan'>SUB TOTAL KEGIATAN </td>
    <td class='isi_laporan' align='right'>$trka</td>
    <td class='isi_laporan' align='right'>$ttw1</td>
    <td class='isi_laporan' align='right'>$ttw2</td>
    <td class='isi_laporan' align='right'>$ttw3</td>
    <td class='isi_laporan' align='right'>$ttw4</td>
  </tr>";
				}
				
			}
			$jumlah=$jumlah+$row->jumlah;
			$nilai=$nilai+$row->nilai;
			$njumlah=number_format($row->jumlah,0,",",".");
			$nnilai=number_format($row->nilai,0,",",".");
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>".($beda && $first? $row->no_pesan:"")."</td>
	  <td class='isi_laporan'>".($beda && $first? $row->tanggal:"")."</td>
   <td class='isi_laporan'>".($beda && $first? $row->kode_pp:"")."</td>
	  <td class='isi_laporan'>".($beda && $first? $row->nama_pp:"")."</td>
   <td class='isi_laporan'>".($beda && $first? $row->keterangan:"")."</td>
    <td align='right' class='isi_laporan'>".($beda && $first? $njumlah:"")."</td>
    <td align='right' class='isi_laporan'>".($beda && $first? $nnilai:"")."</td>
	<td class='isi_laporan'>".($beda && $first? $row->no_po:"")."</td>
	<td class='isi_laporan'>".($beda && $first? $row->tgl_po:"")."</td>
	<td class='isi_laporan'>$row->no_terima</td>
	<td class='isi_laporan'>$row->tgl_terima</td>
	<td class='isi_laporan'>$row->no_ba</td>
	<td class='isi_laporan'>$row->tgl_ba</td>
	<td class='isi_laporan'>$row->no_spb</td>
	<td class='isi_laporan'>$row->tgl_spb</td>
	<td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
	  </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
