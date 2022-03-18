<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggRkapReal extends server_report_basic
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
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$kode_lokasi1=$tmp[3];
		$kode_lokasi2=$tmp[4];
				
		$bulan=substr($periode,4,2);
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
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
				$tw="TW II";
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
		$sql = "select kode_neraca,kode_fs,nama,level_spasi,tipe,abs(n1) as n1,abs(n2) as n2,abs(n3) as n3,abs(n4) as n4,
		case jenis_akun when  'PDPT' then -n5 else n5 end as n5,case jenis_akun when  'PDPT' then -n6 else n6 end as n6,
		case jenis_akun when  'PDPT' then -n7 else n7 end as n7,case jenis_akun when  'PDPT' then -n8 else n8 end as n8
from neraca_tmp 
where nik_user='$nik_user' 
order by rowindex ";
		
		//error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		 
		echo $AddOnLib->judul_laporan("laporan rkap ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>$judul";
		echo "<table width='1440' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='2' align='center' class='header_laporan'>KODE</td>
    <td rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td rowspan='2' align='center' class='header_laporan'>RKA</td>
    <td rowspan='2' align='center' class='header_laporan'>RKA $tw</td>
    <td rowspan='2' align='center' class='header_laporan'>RKA S.D $bln</td>
    <td colspan='3' align='center' class='header_laporan'>$bln </td>
    <td colspan='3' align='center' class='header_laporan'>REALISASI $tw</td>
    <td colspan='4' align='center' class='header_laporan'>REALISASI</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='93' align='center' class='header_laporan'>ANGGARAN </td>
    <td align='center' class='header_laporan'>REALISASI</td>
    <td align='center' class='header_laporan'>% REAL</td>
    <td align='center' class='header_laporan'>REAL. SD $tw</td>
    <td align='center' class='header_laporan'>SALDO $tw</td>
    <td align='center' class='header_laporan'>%REAL $tw</td>
    <td align='center' class='header_laporan'>YTD $tahun_rev</td>
    <td align='center' class='header_laporan'>YTD $tahun</td>
    <td align='center' class='header_laporan'>%REAL (RKA)</td>
    <td width='81' align='center' class='header_laporan'>%GROWTH</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='40'>&nbsp;</td>
    <td width='350'>&nbsp;</td>
    <td width='90' align='center' class='header_laporan'>1</td>
    <td width='90' align='center' class='header_laporan'>2</td>
    <td width='90' align='center' class='header_laporan'>2a</td>
    <td width='90' align='center' class='header_laporan'>3</td>
    <td width='90' align='center' class='header_laporan'>4</td>
    <td width='60' align='center' class='header_laporan'>5=4/3</td>
    <td width='90' align='center' class='header_laporan'>6</td>
    <td width='90' align='center' class='header_laporan'>7=2-6</td>
    <td width='60' align='center' class='header_laporan'>8=6/2</td>
    <td width='90' align='center' class='header_laporan'>9</td>
    <td width='90' align='center' class='header_laporan'>10</td>
    <td width='60' align='center' class='header_laporan'>11=10/2a</td>
    <td width='60' align='center' class='header_laporan'>12=(10-9)/9</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$real=0;$realtw=0;$grow=0;$realrka=0;
			echo "<tr>
				<td class='isi_laporan'>$row->kode_neraca</td>
				<td class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				
				if ($row->n4!=0)
				{
					$real=($row->n5/$row->n4)*100;
				}
				if ($row->n2!=0)
				{
					$realtw=($row->n6/$row->n2)*100;
				}
				if ($row->n3!=0)
				{
					$realrka=($row->n7/$row->n3)*100;
				}
				if ($row->n8!=0)
				{
					$grow=(($row->n7-$row->n8)/$row->n8)*100;
				}
				echo "<td align='right' class='isi_laporan'>".number_format($row->n1,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n2,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n3,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n4,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n5,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($real,2,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n6,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n2-$row->n6,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($realtw,2,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n8,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($row->n7,0,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($realrka,2,",",".")."</td>
					<td align='right' class='isi_laporan'>".number_format($grow,2,",",".")."</td>
				  </tr>";
			}
			else
			{
				echo "<td align='center'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
					<td align='right'>&nbsp;</td>
				  </tr>";
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				
				$sql1="select kode_akun,nama,n1,n2,n3,n4,
		case jenis_akun when  'PDPT' then -n5 else n5 end as n5,
		case jenis_akun when  'PDPT' then -n6 else n6 end as n6,
		case jenis_akun when  'PDPT' then -n7 else n7 end as n7,
		case jenis_akun when  'PDPT' then -n8 else n8 end as n8
from neracagar_tmp
where nik_user='$nik_user' and kode_neraca='$row->kode_neraca' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0)
order by kode_akun ";
				
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$real=0;$realtw=0;$grow=0;$realrka=0;
					if ($row1->n4!=0)
					{
						$real=($row1->n5/$row1->n4)*100;
					}
					if ($row->n2!=0)
					{
						$realtw=($row1->n6/$row1->n2)*100;
					}
					if ($row->n3!=0)
					{
						$realrka=($row1->n7/$row1->n3)*100;
					}
					if ($row->n8!=0)
					{
						$grow=(($row1->n7-$row1->n8)/$row1->n8)*100;
					}
					echo "<tr>
				<td class='detail_laporan'>$row1->kode_akun</td>
				<td class='detail_laporan'>$row1->nama</td>";
					echo "<td align='right' class='detail_laporan'>".number_format($row1->n1,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n2,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n3,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n4,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n5,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($real,2,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n6,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n2-$row1->n6,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($realtw,2,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n8,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n7,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($realrka,2,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($grow,2,",",".")."</td>
				  </tr>";
				
				}
			}
			if ($bentuk=="Akun Lokasi" && $row->tipe=="Posting")
			{
				
				$sql1="select z.kode_akun,z.kode_neraca,z.kode_lokasi,y.nama
       	    , sum(case when substring(x.periode,5,2) between '01' and '12' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end ) as n5
       	     	     , sum(case when substring(x.periode,5,2) between '01' and '03' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end ) as n1
       		     , sum(case when substring(x.periode,5,2) between '04' and '06' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end ) as n2
       		     , sum(case when substring(x.periode,5,2) between '07' and '09' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end ) as n3
		     , sum(case when substring(x.periode,5,2) between '10' and '12' then (case x.dc when 'D' then x.nilai else -x.nilai end) else 0 end ) as n4
from anggaran_d x
inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
inner join relakungar z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
inner join pp p on x.kode_pp=p.kode_pp and x.kode_lokasi=p.kode_lokasi
where (x.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2')  and substring(x.periode,1,4)=substring('$periode',1,4) 
and p.kode_bidang between '$kode_bidang1' and '$kode_bidang2' and z.kode_neraca='$row->kode_neraca' 
group by z.kode_akun,z.kode_neraca,z.kode_lokasi,y.nama ";
				$rs1 = $dbLib->execute($sql1);
				error_log($sql1);
				$real=0;$realtw=0;$grow=0;$realrka=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					
					echo "<tr>
				<td class='detail_laporan'>$row1->kode_lokasi - $row1->kode_akun</td>
				<td class='detail_laporan'>$row1->nama</td>";
					echo "<td align='right' class='detail_laporan'>".number_format($row1->n5,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n1,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n2,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n3,0,",",".")."</td>
					<td align='right' class='detail_laporan'>".number_format($row1->n4,0,",",".")."</td>
				
				  </tr>";
				
				}
			}
			$i=$i+1;
		}
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
