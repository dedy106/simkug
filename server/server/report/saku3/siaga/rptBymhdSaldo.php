<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBymhdSaldo extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$sql="select a.no_ju,a.kode_lokasi,a.no_dokumen,convert(varchar(10),a.tanggal,103) as tgl,
		a.keterangan, b.nilai,b.no_beban,e.no_pb ,c.nilai_bmhd
		from ju_m a 
		inner join gr_beban_m b on a.no_dokumen=b.no_beban and a.kode_lokasi=b.kode_lokasi 
		left join  (
					select sum(a.nilai) as nilai_bmhd,a.no_bmhd,a.kode_lokasi,a.jenis
					from gr_bmhd_d a
					left join gr_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi
					left join gr_spb2_m c on c.no_spb=b.no_spb and c.kode_lokasi=b.kode_lokasi
					where a.dc='c' and c.no_kas<>'-'
					GROUP BY  a.no_bmhd,a.kode_lokasi,a.jenis
					) 
					c on a.no_ju=c.no_bmhd and a.kode_lokasi=c.kode_lokasi and c.jenis<>'akru' 
		left join gr_pb_m e on b.no_beban=e.no_ver and b.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_ju ";
		

		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bymhd",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No BYMHD</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='100'  align='center' class='header_laporan'>No Pengajuan BMHD</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver</td>
	 <td width='250'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Penyelesaian</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 
	 
   </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false)){
			// $arr[] = (array)$row;
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo=$row->nilai - $row->nilai_bmhd;

			// $tmp=explode(";",$row->bmhd);
			// $bmhd="";
			// for ($j = 0; $j < count($tmp); $j++) {
			// 	$bmhd.=".$tmp[$j].";
			// }

		//  print_r($arr);
		// $bmhd = 0;
		// $keterangan = '';
		// for($i = 0; $i < count($arr); $i++){
		// 	if($i < count($arr)){
		// 		if($arr[$i+1]['no_ju'] == $arr[$i]['no_ju']){
		// 			// jumlah
		// 			$bmhd += $arr[$i]['nilai_bmhd'] + $arr[$i+1]['nilai_bmhd'];
		// 			$keterangan .= $arr[$i]['bmhd'].",".$arr[$i+1]['bmhd'];
		// 		}else{
		// 			// echo tr
		// 			// $keterangan .= $arr[$i]['bmhd']."<br>".$arr[$i+1]['bmhd'];
		// 			if(ISSET($arr[$i-1]['no_ju'])){
		// 				if(($arr[$i-1]['no_ju'] == $arr[$i]['no_ju'])){
		// 					// echo $arr[$i-1]['nilai_bmhd']." --- ";
		// 					$bmhd -= $arr[$i-1]['nilai_bmhd'];
		// 					$keterangan = implode('<br>', array_unique(explode(',', $keterangan)));
		// 				}
		// 			}

		// 			if($keterangan == ''){
		// 				$keterangan = $arr[$i]['bmhd'];
		// 			}
		// 			$saldo = $arr[$i]['nilai'] - $bmhd;
		// 			// echo $saldo.$bmhd.$keterangan;
		// 				echo "<tr >
		// 			 <td class='isi_laporan' align='center'>".($i+1)."</td>
		// 			   <td class='isi_laporan'>";
		// 				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu(".$arr[$i]['no_ju'].",".$arr[$i]['kode_lokasi'].");\">".$arr[$i]['no_ju']."</a></td>";
		// 				echo "<td class='isi_laporan'>".$arr[$i]['tgl']."</td>
		// 				<td class='isi_laporan'>".$arr[$i]['no_pb']."</td>
		// 				<td class='isi_laporan'>".$arr[$i]['no_beban']."</td>
		// 				<td class='isi_laporan' >$keterangan</td>
		// 				<td class='isi_laporan'>".$arr[$i]['keterangan']."</td>
		// 			 <td class='isi_laporan' align='right'>".number_format($arr[$i]['nilai'],0,",",".")."</td>
		// 			 <td class='isi_laporan' align='right'>".number_format($bmhd,0,",",".")."</td>
		// 			<td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>";
		// 			    	echo "</tr>";
		// 			$bmhd = 0;
		// 			$keterangan = '';
		// 		}
		// 	}
		// }
	// 	{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	   <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_ju','$row->kode_lokasi');\">$row->no_ju</a></td>";
		echo "<td class='isi_laporan'>$row->tgl</td>
		<td class='isi_laporan'>$row->no_pb</td>
		<td class='isi_laporan'>$row->no_beban</td>
		<td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_bmhd,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>";
	    	echo "</tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
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
