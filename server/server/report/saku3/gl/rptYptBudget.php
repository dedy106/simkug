<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function getBulan($bln)
	{
		$tmp="";
		switch ($bln) 
		{
			case "01":
				$tmp="Januari";
				break;
			case "02":
				$tmp="Februari";
				break;
			case "03":
				$tmp="Maret";
				break;
			case "04":
				$tmp="April";
				break;
			case "05":
				$tmp="Mei";
				break;
			case "06":
				$tmp="Juni";
				break;
			case "07":
				$tmp="Juli";
				break;
			case "08":
				$tmp="Agustus";
				break;
			case "09":
				$tmp="September";
				break;
			case "10":
				$tmp="Oktober";
				break;
			case "11":
				$tmp="November";
				break;
			case "12":
				$tmp="Desember";
				break;
		} 
		return $tmp;
	}
class server_report_saku3_gl_rptYptBudget extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$tahun=substr($periode,0,4);
		$bln=substr($periode,5,2);
		$bulan=getBulan($bln);
		$tahun_rev=$tahun-1;
		$bulan_rev=getBulan($bln-1);
		$sql="call sp_ypt_budget_ba '$kode_lokasi','$periode','$nik_user' ";
		$rs = $dbLib->execute($sql);		
		
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("TRIAL BALANCE",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN BUDGET COMMITTEE</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Periode ".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table width='1300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#dbeef3'>
    <td width='200' rowspan='2' align='center' class='header_laporan'>P&amp;L ITEMS (in Rp.Bn)</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Budget $tahun</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Actual $bulan_rev $tahun</td>
    <td colspan='4' align='center' class='header_laporan'>$bulan $tahun</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Actual Ytd $bulan $tahun_rev</td>
    <td colspan='4' align='center' class='header_laporan'>Ytd $bulan $tahun</td>
  </tr>
  <tr bgcolor='#dbeef3'>
    <td width='90' align='center' class='header_laporan'>Budget</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>MoM Growth</td>
    <td width='90' align='center' class='header_laporan'>Budget</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>YoY Growth</td>
  </tr>";
		
		echo "<tr>
    <td class='header_laporan'>PENDAPATAN OPERASIONAL</td>
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
			$sql="select kode_bidang,nama,kode_lokasi from ypt_bidang where kode_lokasi='$kode_lokasi' and nu<=7 order by kode_bidang";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>Pendapatan $row1->nama</td>
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
				$sql="select a.kode_ba,b.nama,a.n1 as n1,a.n2 as n2,a.n3 as n3,a.n4*-1 as n4,a.n5*-1 as n5,a.n6*-1 as n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					where a.nik_user='$nik_user' and b.kode_bidang='$row1->kode_bidang' and a.jenis='P'
					order by a.kode_ba ";
				
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n3!=0)
					{
						$persen1=$row2->n5/$row2->n3;
					}
					if ($row2->n4!=0)
					{
						$persen2=$row2->n5/$row2->n4;
					}
					if ($row2->n2!=0)
					{
						$persen3=$row2->n6/$row2->n2;
					}
					echo "<tr>
					<td class='isi_laporan'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format(0,0,',','.')."</td>
				  </tr>";
				}
			}
		
		$sql="select a.kode_ba,b.nama,a.n1,a.n2,a.n3,a.n4*-1 as n4,a.n5*-1 as n5,a.n6*-1 as n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					inner join ypt_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and a.kode_ba in ('YPT1','YPT2','YPT3') and a.jenis='P'
					order by c.nu ";
			
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Pendapatan $row2->nama</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				 </tr>";
		}
		$sql="select a.kode_lokasi,'LAKHAR YPT ' as nama,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4*-1) as n4,sum(a.n5*-1) as n5,sum(a.n6*-1) as n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					inner join ypt_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and a.kode_ba in ('YPT0','YPT4') and a.jenis='P'
					group by a.kode_lokasi";
			
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Pendapatan ".strtoupper($row2->nama)."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				 </tr>";
		}
		$sql="select sum(n1) as n1, sum(n2) as n2, sum(n3) as n3, sum(n4*-1) as n4, sum(n5*-1) as n5, sum(n6*-1) as n6
			from ypt_budget_ba
			where nik_user='$nik_user' and jenis='P' ";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$pn1=$row2->n1;
			$pn2=$row2->n2;
			$pn3=$row2->n3;
			$pn4=$row2->n4;
			$pn5=$row2->n5;
			$pn6=$row2->n6;
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Sub Jumlah</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				  </tr>";
		}		  
		echo "<tr>
    <td class='header_laporan'>PENGELUARAN</td>
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
			$sql="select kode_bidang,nama,kode_lokasi from ypt_bidang where kode_lokasi='$kode_lokasi' and nu<=7 order by nu";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>Beban Operasional $row1->nama</td>
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
				$sql="select a.kode_ba,b.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					where a.nik_user='$nik_user' and b.kode_bidang='$row1->kode_bidang' and a.jenis='B'
					order by a.kode_ba ";
				
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n3!=0)
					{
						$persen1=$row2->n5/$row2->n3;
					}
					if ($row2->n4!=0)
					{
						$persen2=$row2->n5/$row2->n4;
					}
					if ($row2->n2!=0)
					{
						$persen3=$row2->n6/$row2->n2;
					}
					echo "<tr>
					<td class='isi_laporan'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format(0,0,',','.')."</td>
				  </tr>";
				}
			}
		
		$sql="select a.kode_ba,b.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					inner join ypt_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and a.kode_ba in ('YPT1','YPT2','YPT3') and a.jenis='B'
					order by c.nu ";
			
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Beban Operasional $row2->nama</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				 </tr>";
		}
		
		$sql="select a.kode_lokasi,'LAKHAR YPT' as nama,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6
					from ypt_budget_ba a 
					inner join ypt_ba b on a.kode_ba=b.kode_ba and a.kode_lokasi=b.kode_lokasi
					inner join ypt_bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
					where a.nik_user='$nik_user' and a.kode_ba in ('YPT0','YPT4') and a.jenis='B'
					group by a.kode_lokasi";
			
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Beban Operasional ".strtoupper($row2->nama)."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				 </tr>";
		}
		
		$sql="select sum(n1) as n1, sum(n2) as n2, sum(n3) as n3, sum(n4) as n4, sum(n5) as n5, sum(n6) as n6
			from ypt_budget_ba
			where nik_user='$nik_user' and jenis='B' ";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$bn1=$row2->n1;
			$bn2=$row2->n2;
			$bn3=$row2->n3;
			$bn4=$row2->n4;
			$bn5=$row2->n5;
			$bn6=$row2->n6;
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n3!=0)
			{
				$persen1=$row2->n5/$row2->n3;
			}
			if ($row2->n4!=0)
			{
				$persen2=$row2->n5/$row2->n4;
			}
			if ($row2->n2!=0)
			{
				$persen3=$row2->n6/$row2->n2;
			}
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Sub Jumlah</td>
					<td class='header_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				  </tr>";
		}	
		
		echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> SHU</td>
					<td class='header_laporan' align='right'>".number_format($pn1-$bn1,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($pn4-$bn4,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($pn3-$bn3,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($pn5-$bn5,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='header_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='header_laporan' align='right'>".number_format(0,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($pn2-$bn2,0,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($pn6-$bn6,0,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='header_laporan' align='center'>".number_format(0,0,',','.')."</td>
				  </tr>";
		
		$or1=0;$or2=0;$or3=0;$or4=0;$or5=0;$or6=0;$or7=0;$or8=0;$or9=0;$or10=0;$or11=0;
		if ($pn1!=0)
		{
			$or1=($bn1/$pn1)*100;
		}
		if ($pn4!=0)
		{
			$or2=($bn4/$pn4)*100;
		}
		if ($pn4!=0)
		{
			$or3=($bn3/$pn3)*100;
		}
		if ($pn4!=0)
		{
			$or4=($bn5/$pn5)*100;
		}
		if ($pn2!=0)
		{
			$or8=($bn2/$pn2)*100;
		}
		if ($pn6!=0)
		{
			$or9=($bn6/$pn6)*100;
		}
		echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> OR</td>
					<td class='isi_laporan' align='center'>".number_format($or1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or3,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or4,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or5,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or6,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or7,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or8,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or9,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or10,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($or11,2,',','.')."%</td>
				  </tr>";
	  echo " </table>";
		
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
