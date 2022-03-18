<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");
class server_report_eclaim_rptKlaimRekap2 extends server_report_basic
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
		$sql="select a.kode_proses,a.nama,ifnull(b.jml,0) as jml,ifnull(b.nilai_est,0) as nilai_est,ifnull(b.nilai_tuntutan,0) as nilai_tuntutan, 
								ifnull(b.nilai_adjust,0) as nilai_adjust,ifnull(b.nilai_bayar,0) as nilai_bayar  
								from eclaim_proses a 
						left join (select 'P1' as kode_proses,a.kode_ttg,count(a.no_klaim) as jml, 
												 sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_tuntutan,0)) as nilai_tuntutan, 
												 sum(ifnull(b.nilai,0)) as nilai_adjust,sum(ifnull(c.nilai,0)) as nilai_bayar 
									from eclaim_klaim a 
									left join eclaim_adjust b on a.no_klaim=b.no_klaim and a.kode_ttg=b.kode_ttg and a.kode_lokasi=b.kode_lokasi  and b.status='1' 
									left join eclaim_bayar c on a.no_klaim=c.no_klaim and a.kode_ttg=c.kode_ttg and a.kode_lokasi=c.kode_lokasi 
									$this->filter and a.status_dok='0'  
									group by kode_proses,a.kode_ttg 
						union 
									select 'P2' as kode_proses,a.kode_ttg,count(a.no_klaim) as jml, 
												 sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_tuntutan,0)) as nilai_tuntutan, 
												 sum(ifnull(b.nilai,0)) as nilai_adjust,sum(ifnull(c.nilai,0)) as nilai_bayar 
									from eclaim_klaim a 
									left join eclaim_adjust b on a.no_klaim=b.no_klaim and a.kode_ttg=b.kode_ttg and a.kode_lokasi=b.kode_lokasi  and b.status='1' 
									left join eclaim_bayar c on a.no_klaim=c.no_klaim and a.kode_ttg=c.kode_ttg and a.kode_lokasi=c.kode_lokasi 
									$this->filter and a.status_dok='1'  
									group by kode_proses,a.kode_ttg 
						union 
									select 'P3' as kode_proses,a.kode_ttg,count(a.no_klaim) as jml, 
												 sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_tuntutan,0)) as nilai_tuntutan, 
												 sum(ifnull(b.nilai,0)) as nilai_adjust,sum(ifnull(c.nilai,0)) as nilai_bayar 
									from eclaim_klaim a 
									left join eclaim_adjust b on a.no_klaim=b.no_klaim and a.kode_ttg=b.kode_ttg and a.kode_lokasi=b.kode_lokasi  and b.status='1' 
									left join eclaim_bayar c on a.no_klaim=c.no_klaim and a.kode_ttg=c.kode_ttg and a.kode_lokasi=c.kode_lokasi 
									$this->filter and a.status='0' 
									group by kode_proses,a.kode_ttg 
						union 
									select 'P4' as kode_proses,a.kode_ttg,count(a.no_klaim) as jml, 
												 sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_tuntutan,0)) as nilai_tuntutan, 
												 sum(ifnull(b.nilai,0)) as nilai_adjust,sum(ifnull(c.nilai,0)) as nilai_bayar 
									from eclaim_klaim a 
									left join eclaim_adjust b on a.no_klaim=b.no_klaim and a.kode_ttg=b.kode_ttg and a.kode_lokasi=b.kode_lokasi  and b.status='1' 
									left join eclaim_bayar c on a.no_klaim=c.no_klaim and a.kode_ttg=c.kode_ttg and a.kode_lokasi=c.kode_lokasi 
									$this->filter and a.status='1' 
									group by kode_proses,a.kode_ttg 
						)b on a.kode_proses=b.kode_proses and a.kode_ttg=b.kode_ttg 
						$this->filter2
						order by a.kode_proses ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN REKAP PROGRES KLAIM",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='200'  align='center' class='header_laporan'>Proses</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Berkas</td>
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doKlaimDaftar('$row->kode_proses');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='center'>".number_format($row->jml,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_est,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_tuntutan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_adjust,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bayars,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		/*
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='center'>".number_format($jml,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_est)."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_tuntutan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_adjust,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
     </tr>";
		*/
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
