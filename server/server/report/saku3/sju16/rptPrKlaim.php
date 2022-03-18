<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrKlaim extends server_report_basic
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
		$sql="select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,b.no_dok,a.keterangan,a.nilai,j.nama as progress,a.no_berkas,
		f.nama as nama_cust,b.kode_curr,a.lokasi,i.nama as nama_sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,k.catat,h.tgl_bayar,
		DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
from sju_klaim a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status 
left join sju_sebab i on a.sebab=i.kode_sebab and a.kode_lokasi=i.kode_lokasi
left join sju_klaim_progres j on a.progress=j.kode_prog and a.kode_lokasi=j.kode_lokasi and a.status=j.status
inner join sju_quo_m k on a.no_polis=k.no_polis and a.kode_lokasi=k.kode_lokasi
$this->filter
order by a.no_klaim
";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data klaim",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Klaim</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Lapor</td>
     <td width='60'  align='center' class='header_laporan'>DOL</td>
     <td width='120'  align='center' class='header_laporan'>Policy No</td>
     <td width='150'  align='center' class='header_laporan'>Tertanggung</td>
	 <td width='150'  align='center' class='header_laporan'>Lokasi</td>
	 <td width='150'  align='center' class='header_laporan'>Penyebab Kerugian</td>
	  <td width='40'  align='center' class='header_laporan'>Curr</td>
	 <td width='90'  align='center' class='header_laporan'>Estimasi kerugian</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai Adjusment</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Persetujuan</td>
	 <td width='120'  align='center' class='header_laporan'>Dedutible</td>
	 <td width='90'  align='center' class='header_laporan'>Nett Settled Claim</td
	 <td width='60'  align='center' class='header_laporan'>Tanggal Adjusment</td>
	  <td width='60'  align='center' class='header_laporan'>Aging Klaim (DOL)</td>
	   <td width='60'  align='center' class='header_laporan'>Aging Klaim (Tanggal Lapor)</td>
	 <td width='130'  align='center' class='header_laporan'>Status Klaim</td>
	 <td width='150'  align='center' class='header_laporan'>Remark</td>
	 
	  </tr>  ";
		$nilai=0;$nilai_nego=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_nego+=$row->nilai_nego;
			$nilai_final+=$row->nilai_final;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_klaim</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->lokasi</td>
	  <td class='isi_laporan'>$row->nama_sebab</td>
	   <td class='isi_laporan'>$row->kode_curr</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_final,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_nego,0,',','.')."</td>
	 <td class='isi_laporan'>$row->tgl_bayar</td>
	 <td class='isi_laporan'>$row->catatan</td> 
	 <td class='isi_laporan'>$row->aging_dol</td>
	 <td class='isi_laporan'>$row->aging_cl</td>
	 <td class='isi_laporan'>$row->progress</td>
	 <td class='isi_laporan'>$row->catat</td> 
	     </tr>";
			$i=$i+1;
		}
			echo "<tr >
     <td class='isi_laporan' align='center' colspan='9'>Total</td>
    
     <td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_nego,0,',','.')."</td>
	<td class='isi_laporan' colspan='2'>&nbsp;</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_final,0,',','.')."</td>
	 <td class='isi_laporan' colspan='4'>&nbsp;</td>
	 </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
