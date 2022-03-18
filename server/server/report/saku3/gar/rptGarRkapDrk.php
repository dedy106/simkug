<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptGarRkapDrk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$AddOnLib=new server_util_AddOnLib();
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		
		$bulan=substr($periode,4,2);
		$tahun=substr($periode,0,4);
		
		switch ($bulan) 
		{
			case "01":
			case "02":
			case "03":
				$tw="TW I";
				break;
			case "04":
			case "05":
			case "06":
				$tw="TW II";
			case "07":
			case "08":
			case "09":
				$tw="TW III";
				break;
			case "10":
			case "11":
			case "12":
				$tw="TW IV";
				break;
		}
		switch ($bulan) 
		{
			case "01":
				$bln="JANUARI";
				break;
			case "02":
				$bln="FEBRUARI";
				break;
			case "03":
				$bln="MARET";
				break;
			case "04":
				$bln="APRIL";
				break;
			case "05":
				$bln="MEI";
				break;
			case "06":
				$bln="JUNI";
				break;
			case "07":
				$bln="JULI";
				break;
			case "08":
				$bln="AGUSTUS";
				break;
			case "09":
				$bln="SEPTEMBER";
				break;
			case "10":
				$bln="OKTOBER";
				break;
			case "11":
				$bln="NOVEMBER";
				break;
			case "12":
				$bln="DESEMBER";
				break;
		}
		$sql="exec sp_exs_glma_pp_drk '$kode_lokasi','$tahun','$nik_user'";
		
		$rs = $dbLib->execute($sql);
		
		
		
		 
		echo $AddOnLib->judul_laporan("laporan rekapitulasi rkap per drk",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		//$nama_periode="PERIODE ".strtoupper($AddOnLib->ubah_periode($periode));
		//$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN REKAPITULASI RKAP<br>$bidang<br>$nama_periode <br></div>$tanggal";
		echo "<div align='center'>";
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE PP </td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>NAMA PP </td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>KODE DRK </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>NAMA DRK </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>RKA $tahun </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>RKA $tw </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>RKA SD $bln </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>RKA SD $bln ORIGINAL </td>
    <td colspan='3' align='center' class='header_laporan'>$bln</td>
    <td colspan='3' align='center' class='header_laporan'>REALISASI $tw </td>
    <td colspan='3' align='center' class='header_laporan'>REALISASI</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>ANGGARAN</td>
    <td width='100' align='center' class='header_laporan'>REALISASI</td>
    <td width='100' align='center' class='header_laporan'>% REAL </td>
    <td width='100' align='center' class='header_laporan'>REAL SD $tw </td>
    <td width='100' align='center' class='header_laporan'>SALDO $tw </td>
    <td width='100' align='center' class='header_laporan'>% REAL $tw </td>
    <td width='100' align='center' class='header_laporan'>YTD $tahun </td>
    <td width='100' align='center' class='header_laporan'>% REAL (RKA) </td>
    <td width='100' align='center' class='header_laporan'>% REAL ORIGINAL </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center'>&nbsp;</td>
    <td align='center'>&nbsp;</td>
    <td align='center'>&nbsp;</td>
    <td align='center'>&nbsp;</td>
    <td align='center' class='header_laporan'>1</td>
    <td align='center' class='header_laporan'>2</td>
    <td align='center' class='header_laporan'>2a</td>
    <td align='center' class='header_laporan'>2b</td>
    <td align='center' class='header_laporan'>3</td>
    <td align='center' class='header_laporan'>4</td>
    <td align='center' class='header_laporan'>5=4/3</td>
    <td align='center' class='header_laporan'>6</td>
    <td align='center' class='header_laporan'>7=2-6</td>
    <td align='center' class='header_laporan'>8=6/2</td>
    <td align='center' class='header_laporan'>10</td>
    <td align='center' class='header_laporan'>11=10/2a</td>
    <td align='center' class='header_laporan'>12=10/2b</td>
  </tr>";
		$sql = "select kode_bidang,nama from bidang order by kode_bidang ";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$i = 1;
		
			echo "<tr>
    <td class='isi_laporan'>$row->kode_bidang</td>
    <td class='isi_laporan'>$row->nama</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>";
			$sql = "select a.kode_pp,a.kode_drk,b.nama as nama_pp,c.nama as nama_drk,
						   isnull(a.n2_thn,0) as n2_thn,isnull(a.n2_tw,0) as n2_tw,isnull(a.n2_tw_sd,0) as n2_tw_sd,
						   isnull(a.n1_sd,0) as n1_sd,isnull(a.n2_bln,0) as n2_bln,isnull(a.n3_bln,0) as n3_bln,
						   isnull(a.n3_tw,0) as n3_tw,isnull(a.n3_sd,0) as n3_sd
			from (select kode_pp,kode_drk,kode_lokasi,
				   SUM(n2) as n2_thn,
				   sum(case when substring(periode,5,2) between '01' and '03' then n2 else 0 end) as n2_tw,
				   sum(case when substring(periode,5,2) between '01' and '$bulan' then n2 else 0 end) as n2_tw_sd,
				   sum(case when substring(periode,5,2) between '01' and '$bulan' then n1 else 0 end) as n1_sd,
				   sum(case when substring(periode,5,2) between '$bulan' and '$bulan' then n2 else 0 end) as n2_bln,
				   sum(case when substring(periode,5,2) between '$bulan' and '$bulan' then n3 else 0 end) as n3_bln,
				   sum(case when substring(periode,5,2) between '01' and '03' then n3 else 0 end) as n3_tw,
				   sum(case when substring(periode,5,2) between '01' and '$bulan' then n3 else 0 end) as n3_sd
			from exs_glma_pp_drk
			where nik_user='$nik_user'
			group by kode_pp,kode_drk,kode_lokasi
				)a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun='2015'
			where b.kode_bidang='$row->kode_bidang'
			order by a.kode_pp,a.kode_drk ";
			
			$rs1 = $dbLib->execute($sql);
			$first = true; 
			$n1=0;$n2=0;$n2a=0;$n2b=0;$n3=0;$n4=0;$n6=0;$n6=0;$n10=0;
			$np1=0;$np2=0;$np3=0;$np4=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beda = $tmp!=$row1->kode_pp; 
				if ($tmp!=$row1->kode_pp)
				{
					$tmp=$row1->kode_pp;
					$first = true;
					
					if ($i>1)
					{
						if ($n3!=0)
						{
							$np1=($n4/$n3)*100;
						}
						if ($n2!=0)
						{
							$np2=($n6/$n2)*100;
						}
						if ($n2a!=0)
						{
							$np3=($n10/$n2a)*100;
						}
						if ($n2b!=0)
						{
							$np4=($n10/$n2b)*100;
						}
						echo "<tr bgcolor='#CCCCCC'>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>SUB TOTAL</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2a,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2b,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
						<td class='isi_laporan' align='center'>".number_format($np1,2,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($np2,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
						<td class='isi_laporan' align='center'>".number_format($np3,2,',','.')."</td>
						<td class='isi_laporan' align='center'>".number_format($np4,2,',','.')."</td>
					  </tr>";
					}
					
				}
				$p1=0;
				if ($row1->n2_bln!=0)
				{
					$p1=($row1->n3_bln/$row1->n2_bln)*100;
				}
				$p2=0;
				if ($row1->n2_tw!=0)
				{
					$p2=($row1->n3_tw/$row1->n2_tw)*100;
				}
				$p3=0;
				if ($row1->n2_tw_sd!=0)
				{
					$p3=($row1->n3_sd/$row1->n2_tw_sd)*100;
				}
				$p4=0;
				if ($row1->n1_sd!=0)
				{
					$p4=($row1->n3_sd/$row1->n1_sd)*100;
				}
				$n1+=$row1->n2_thn;
				$n2+=$row1->n2_tw;
				$n2a+=$row1->n2_tw_sd;
				$n2b+=$row1->n1_sd;
				$n3+=$row1->n2_bln;
				$n4+=$row1->n3_bln;
				
				$n6+=$row1->n3_tw;
				$n7+=$row1->n2_tw-$row1->n3_tw;
				$np2+=$p2;
				$n10+=$row1->n3_sd;
				echo "<tr>
				<td class='isi_laporan'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->nama_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan'>$row1->nama_drk</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2_thn,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2_tw,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2_tw_sd,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n1_sd,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2_bln,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n3_bln,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($p1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n3_tw,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2_tw-$row1->n3_tw,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($p2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n3_sd,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($p3,2,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($p4,2,',','.')."</td>
			  </tr>";
				$first = true;
				$i=$i+1;
			}
			echo "<tr bgcolor='#CCCCCC'>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>SUB TOTAL</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2a,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n2b,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
						<td class='isi_laporan' align='center'>".number_format($np1,2,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($np2,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($np3,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($np4,0,',','.')."</td>
					  </tr>";
		}
		
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
