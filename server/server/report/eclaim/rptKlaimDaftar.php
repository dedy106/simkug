<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");
class server_report_eclaim_rptKlaimDaftar extends server_report_basic
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
		$sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, 
		d.nama as nama_sebab, a.nilai,a.alamat,
		ifnull(a.nilai,0) as nilai_est,ifnull(e.nilai_tuntutan,0) as nilai_tuntutan, 
		ifnull(e.nilai,0) as nilai_adjust,ifnull(f.nilai,0) as nilai_bayar 
 from eclaim_klaim a 
 inner join eclaim_lokasi b on b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg 
 inner join eclaim_obyek c on c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg and a.kode_asuransi=c.kode_asuransi
 inner join eclaim_sebab d on d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg and a.kode_asuransi=d.kode_asuransi
 left join eclaim_adjust e on a.no_klaim=e.no_klaim and a.kode_ttg=e.kode_ttg and a.kode_lokasi=e.kode_lokasi  and e.status='1' 
 left join eclaim_bayar f on a.no_klaim=f.no_klaim and a.kode_ttg=f.kode_ttg and a.kode_lokasi=f.kode_lokasi 
 $this->filter
 order by a.no_klaim desc";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN KLAIM",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>No Klaim</td>
	 <td width='80'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl DOL</td>
	 <td width='150'  align='center' class='header_laporan'>Lokasi</td>
	 <td width='150'  align='center' class='header_laporan'>Obyek</td>
	 <td width='150'  align='center' class='header_laporan'>Penyebab</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai Estimasi</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Tuntutan</td>
     <td width='90' align='center' class='header_laporan'>Nilai Adjust</td>
	 <td width='90' align='center' class='header_laporan'>Nilai Bayar</td>
   </tr>
     ";
		$jml=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml+=$row->jml;
			$nilai_est+=$row->nilai_est;
			$nilai_tuntutan+=$row->nilai_tuntutan;
			$nilai_adjust+=$row->nilai_adjust;
			$nilai_bayar+=$row->nilai_bayar;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doKlaim('$row->no_klaim');\">$row->no_klaim</a>";
		echo "</td>
	 <td class='isi_laporan' >$row->no_dokumen</td>
	 <td class='isi_laporan' >$row->tanggal</td>
	 <td class='isi_laporan' >$row->nama_lok</td>
	 <td class='isi_laporan' >$row->nama_obyek</td>
	 <td class='isi_laporan' >$row->nama_sebab</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_est,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_tuntutan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_adjust,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_est)."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_tuntutan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_adjust,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
     </tr>";
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
