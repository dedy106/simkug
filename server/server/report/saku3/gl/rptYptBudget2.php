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
class server_report_saku3_gl_rptYptBudget2 extends server_report_basic
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
		//$sql="call sp_ypt_budget_ba '$kode_lokasi','$periode','$nik_user' ";
		//$rs = $dbLib->execute($sql);		
		
		
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
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABARUGI ANGGARAN</td>
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
		/*
		$sql="select sum(a.n1*-1) as n1,sum(a.n2*-1) as n2,sum(a.n3*-1) as n3,sum(a.n4*-1) as n4,sum(a.n5*-1) as n5,sum(a.n6*-1) as n6,sum(a.n7*-1) as n7,sum(a.n8*-1) as n8,sum(a.n9*-1) as n9
			from exs_glma_gar_pp a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
			where b.jenis='Pendapatan' and a.periode='$periode' and (a.kode_akun+a.kode_lokasi) not in (select kode_akun+kode_lokasi from flag_relasi where kode_flag='057' and kode_lokasi='11') ";
		*/
			$sql="select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
			from exs_neraca a
			where modul='L' and kode_lokasi='20' and kode_fs='FS1' and periode='$periode'  and kode_neraca='57T'
			order by rowindex";
			$rs1 = $dbLib->execute($sql);
			$p1=0;$p2=0;$p3=0;$p4=0;$p5=0;$p6=0;$p7=0;$p8=0;$p9=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$p1=$row1->n1; $p2=$row1->n2; $p3=$row1->n3; $p4=$row1->n4; $p5=$row1->n5; $p6=$row1->n6;
				$p7=$row1->n7; $p8=$row1->n8; $p9=$row1->n9; 
				$persen1=0;$persen2=0;$persen3=0;$persen4=0;
				if ($row1->n7!=0)
				{
					$persen1=($row1->n6/$row1->n7)*100;
				}
				if ($row1->n9!=0)
				{
					$persen2=(($row1->n6/$row1->n9)-1)*100;
				}
				if ($row1->n2!=0)
				{
					$persen3=($row1->n4/$row1->n2)*100;
				}
				if ($row1->n5!=0)
				{
					$persen4=(($row1->n4/$row1->n5)-1)*100;
				}
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>PENDAPATAN OPERASIONAL</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
			}
			/*
			$sql="select a.kode_bidang,a.nama,a.kode_lokasi,isnull(b.n1*-1,0) as n1,isnull(b.n2*-1,0) as n2,isnull(b.n3*-1,0) as n3,isnull(b.n4*-1,0) as n4,
					   isnull(b.n5*-1,0) as n5,isnull(b.n6*-1,0) as n6,isnull(b.n7*-1,0) as n7,isnull(b.n8*-1,0) as n8,isnull(b.n9*-1,0) as n9 
				from bidang a
				left join (select c.kode_bidang,a.kode_lokasi,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,sum(a.n8) as n8,sum(a.n9) as n9
						   from exs_glma_gar_pp a
						   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
						   where a.kode_lokasi='12' and b.jenis='Pendapatan' and a.periode='$periode'
						   group by c.kode_bidang,a.kode_lokasi
						  )b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='12' and a.kode_bidang in ('1','2','3','4','5') 
				order by a.kode_bidang";
			*/
			$sql="select c.kode_bidang,c.nama,
					sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1, 
					sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
				    sum(case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end) as n3,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5') 
			group by c.kode_bidang,c.nama
			order by c.kode_bidang";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$persen1=0;$persen2=0;$persen3=0;$persen4=0;
				if ($row1->n7!=0)
				{
					$persen1=($row1->n6/$row1->n7)*100;
				}
				if ($row1->n9!=0)
				{
					$persen2=(($row1->n6/$row1->n9)-1)*100;
				}
				if ($row1->n2!=0)
				{
					$persen3=($row1->n4/$row1->n2)*100;
				}
				if ($row1->n5!=0)
				{
					$persen4=(($row1->n4/$row1->n5)-1)*100;
				}
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>Pendapatan $row1->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
				
				/*
				$sql="select a.kode_pp,c.nama,sum(a.n1)*-1 as n1,sum(a.n2)*-1 as n2,sum(a.n3)*-1 as n3,sum(a.n4)*-1 as n4,sum(a.n5)*-1 as n5,sum(a.n6)*-1 as n6,sum(a.n7)*-1 as n7,sum(a.n8)*-1 as n8,sum(a.n9)*-1 as n9
					from exs_glma_gar_pp a
					inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
					where a.kode_lokasi='$row1->kode_lokasi' and c.kode_bidang='$row1->kode_bidang' and b.jenis='Pendapatan' and a.periode='$periode'
					group by a.kode_pp,c.nama";
				*/
				$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang='$row1->kode_bidang'
			order by a.rowindex";
				
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					
					echo "<tr>
					<td class='isi_laporan'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					
				  </tr>";
				}
			}
		
		
		$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T'
			order by a.kode_lokasi desc";
		
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
			echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> Pendapatan $row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					
					
				 </tr>";
		}
		
		
			/*	  
			$sql="select sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,sum(a.n8) as n8,sum(a.n9) as n9
			from exs_glma_gar_pp a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
			where b.jenis='Beban' and a.periode='$periode' ";
			*/
			$sql="select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
			from exs_neraca a
			where modul='L' and kode_lokasi='20' and kode_fs='FS1' and periode='$periode'  and kode_neraca='58T'
			order by rowindex";
			$rs1 = $dbLib->execute($sql);
			$b1=0;$b2=0;$b3=0;$b4=0;$b5=0;$b6=0;$b7=0;$b8=0;$b9=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$b1=$row1->n1; $b2=$row1->n2; $b3=$row1->n3; $b4=$row1->n4; $b5=$row1->n5; $b6=$row1->n6;
				$b7=$row1->n7; $b8=$row1->n8; $b9=$row1->n9; 
				$persen1=0;$persen2=0;$persen3=0;$persen4=0;
				if ($row1->n7!=0)
				{
					$persen1=($row1->n6/$row1->n7)*100;
				}
				if ($row1->n9!=0)
				{
					$persen2=(($row1->n6/$row1->n9)-1)*100;
				}
				if ($row1->n2!=0)
				{
					$persen3=($row1->n4/$row1->n2)*100;
				}
				if ($row1->n5!=0)
				{
					$persen4=(($row1->n4/$row1->n5)-1)*100;
				}
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>BEBAN OPERASIONAL</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
			}
			/*
			$sql="select a.kode_bidang,a.nama,a.kode_lokasi,isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4,
					   isnull(b.n5,0) as n5,isnull(b.n6,0) as n6,isnull(b.n7,0) as n7,isnull(b.n8,0) as n8,isnull(b.n9,0) as n9 
				from bidang a
				left join (select c.kode_bidang,a.kode_lokasi,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,sum(a.n8) as n8,sum(a.n9) as n9
						   from exs_glma_gar_pp a
						   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
						   where a.kode_lokasi='12' and b.jenis='Beban' and a.periode='$periode'
						   group by c.kode_bidang,a.kode_lokasi
						  )b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='12' and a.kode_bidang in ('1','2','3','4','5') 
				order by a.kode_bidang";
			*/
			$sql="select c.kode_bidang,c.nama,
					sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1, 
					sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
				    sum(case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end) as n3,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T' and b.kode_bidang in ('0','1','2','3','4','5') 
			group by c.kode_bidang,c.nama
			order by c.kode_bidang";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$persen1=0;$persen2=0;$persen3=0;$persen4=0;
				if ($row1->n7!=0)
				{
					$persen1=($row1->n6/$row1->n7)*100;
				}
				if ($row1->n9!=0)
				{
					$persen2=(($row1->n6/$row1->n9)-1)*100;
				}
				if ($row1->n2!=0)
				{
					$persen3=($row1->n4/$row1->n2)*100;
				}
				if ($row1->n5!=0)
				{
					$persen4=(($row1->n4/$row1->n5)-1)*100;
				}
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>Beban $row1->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
				/*
				$sql="select a.kode_pp,c.nama,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,sum(a.n8) as n8,sum(a.n9) as n9
					from exs_glma_gar_pp a
					inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
					where a.kode_lokasi='$row1->kode_lokasi' and c.kode_bidang='$row1->kode_bidang' and b.jenis='Beban' and a.periode='$periode'
					group by a.kode_pp,c.nama";
				*/
				$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T' and b.kode_bidang='$row1->kode_bidang'
			order by a.rowindex";
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr>
					<td class='isi_laporan'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
			}
		
	
		$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T'
			order by a.kode_lokasi desc";	
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr bgcolor='#dbeef3'>
					<td class='isi_laporan'> Beban $row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
			
			$sql="select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
			from exs_neraca a
			where modul='L' and kode_lokasi='20' and kode_fs='FS1' and periode='$periode'  and kode_neraca='59T'
			order by rowindex";
			
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> SHU YPT</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
			
			$sql="select c.kode_bidang,c.nama,
					sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1, 
					sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
				    sum(case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end) as n3,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T' and b.kode_bidang in ('0','1','2','3','4','5') 
			group by c.kode_bidang,c.nama
			order by c.kode_bidang";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$persen1=0;$persen2=0;$persen3=0;$persen4=0;
				if ($row1->n7!=0)
				{
					$persen1=($row1->n6/$row1->n7)*100;
				}
				if ($row1->n9!=0)
				{
					$persen2=(($row1->n6/$row1->n9)-1)*100;
				}
				if ($row1->n2!=0)
				{
					$persen3=($row1->n4/$row1->n2)*100;
				}
				if ($row1->n5!=0)
				{
					$persen4=(($row1->n4/$row1->n5)-1)*100;
				}
				echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'>SHU $row1->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
				
				$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T' and b.kode_bidang='$row1->kode_bidang'
			order by a.rowindex";
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					
					echo "<tr>
					<td class='header_laporan'> &nbsp;&nbsp;&nbsp;SHU $row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
			}
			
			
		
			$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T'
			order by a.kode_lokasi desc";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> SHU $row2->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
					
					
				  
				  
				}
				
			
		$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi='20' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL'
			order by a.kode_lokasi desc";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr bgcolor='#dbeef3'>
					<td class='header_laporan'> OR YPT</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n1,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n9,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n7,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n6,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n5,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n2,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n4,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
					
					
				  
				  
				}
				
			
		
		$sql="select c.kode_bidang,c.nama,
					sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1, 
					sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
				    sum(case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end) as n3,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
					sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL' and b.kode_bidang in ('1','2','3','4','5') 
			group by c.kode_bidang,c.nama
			order by c.kode_bidang";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$or1=0;$or2=0;$or3=0;$or4=0;$or5=0;$or6=0;$or7=0;$or8=0;$or9=0;$or10=0;$or11=0;
					if ($p1!=0)
					{
						$or1=($b1/$p1)*100;
					}
					if ($p4!=0)
					{
						$or2=($b4/$p4)*100;
					}
					if ($p4!=0)
					{
						$or3=($bn3/$pn3)*100;
					}
					if ($p4!=0)
					{
						$or4=($b5/$p5)*100;
					}
					if ($p2!=0)
					{
						$or8=($b2/$p2)*100;
					}
					if ($p6!=0)
					{
						$or9=($b6/$p6)*100;
					}
					
				echo "<tr bgcolor='#dbeef3'>
						<td class='header_laporan'> OR $row1->nama</td>
						<td class='isi_laporan' align='center'>".number_format($row1->n1,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n9,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n7,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n6,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n5,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n2,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row1->n4,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
					</tr>";
				
				$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca_pp a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL' and b.kode_bidang='$row1->kode_bidang'
			order by a.rowindex";
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					
					echo "<tr>
					<td class='header_laporan'> &nbsp;&nbsp;&nbsp;OR $row2->nama</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n1,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n9,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n7,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n6,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n5,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n2,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n4,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
			}
			
			$sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
					case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
				    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
					case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
			from exs_neraca a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL'
			order by a.kode_lokasi desc";	
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row2->n7!=0)
					{
						$persen1=($row2->n6/$row2->n7)*100;
					}
					if ($row2->n9!=0)
					{
						$persen2=(($row2->n6/$row2->n9)-1)*100;
					}
					if ($row2->n2!=0)
					{
						$persen3=($row2->n4/$row2->n2)*100;
					}
					if ($row2->n5!=0)
					{
						$persen4=(($row2->n4/$row2->n5)-1)*100;
					}
					echo "<tr bgcolor='#dbeef3'>
					<td class='isi_laporan'> OR $row2->nama</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n1,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n9,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n7,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n6,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n5,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n2,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($row2->n4,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
				  </tr>";
				}
				
		
	  echo " </table>";
		
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
