<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dw_rptDwInvestasi extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		$periode_rev=$tahun_rev.substr($periode,4,2);
		
		
		$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
					case a.jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
					case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7
			from exs_neraca a
			$this->filter 
			order by a.rowindex ";

		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan investasi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
    <td width='350' height='25'  class='header_laporan' align='center'>Keterangan</td>
    <td width='100' class='header_laporan' align='center'>RKA $tahun</td>
    <td width='100' class='header_laporan' align='center'>RKA s.d Bulan Berjalan $tahun</td>
	<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun</td>
	<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun_rev</td>
	<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA $tahun</td>
	<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA s.d Bulan Berjalan $tahun</td>
	<td width='80' class='header_laporan' align='center'>Growth Thd $tahun_rev</td>
    </tr>
	<tr bgcolor='#CCCCCC'>
      <td height='25'  class='header_laporan' align='center'>&nbsp;</td>
      <td class='header_laporan' align='center'>1</td>
      <td class='header_laporan' align='center'>2</td>
      <td class='header_laporan' align='center'>4</td>
      <td class='header_laporan' align='center'>5</td>
	  <td class='header_laporan' align='center'>6=4/1</td>
	  <td class='header_laporan' align='center'>7=4/3</td>
	  <td class='header_laporan' align='center'>8=(4-5)/5</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$persen1=0;$persen2=0;$persen3=0;
			if ($row->n1!=0)
			{
				$persen1=($row->n6/$row->n1)*100;
			}
			if ($row->n2!=0)
			{
				$persen2=($row->n6/$row->n2)*100;
			}
			if ($row->n7!=0)
			{
				$persen3=($row->n6-$row->n7)/$row->n7*100;
			}
			//echo $row->n4."-".$row->n1."-".$persen1;
			echo "<tr>
    
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			
			if ($row->kode_neraca!="OR")
			{
			echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_lokasi','$periode','$row->kode_neraca');\">".number_format($row->n1,0,',','.')."</a>";
			echo "</td>
	    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGarSd('$row->kode_lokasi','$periode','$row->kode_neraca');\">".number_format($row->n2,0,',','.')."</a>";
		echo "</td>
		<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode','$row->kode_neraca');\">".number_format($row->n6,0,',','.')."</a>";
			echo "</td>
		<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode_rev','$row->kode_neraca');\">".number_format($row->n7,0,',','.')."</a>";
			echo "</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>";
			}
			else
			{
			
			echo "<td class='isi_laporan' align='center'>".number_format($row->n1,2,',','.')."</td>
	    <td class='isi_laporan' align='center'>".number_format($row->n2,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->n6,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->n7,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>";
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="	select a.kode_akun,c.nama,
							case c.jenis when  'Pendapatan' then -n1 else n1 end as n1,
							case c.jenis when  'Pendapatan' then -n2 else n2 end as n2,
							case c.jenis when  'Pendapatan' then -n3 else n3 end as n3,
							case c.jenis when  'Pendapatan' then -n4 else n4 end as n4,
							case c.jenis when  'Pendapatan' then -n5 else n5 end as n5
						from exs_glma_gar a
						inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
						where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' 
						order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$persen1=0;$persen2=0;$persen3=0;
					if ($row1->n1!=0)
					{
						$persen1=($row1->n4/$row1->n1)*100;
					}
					if ($row1->n3!=0)
					{
						$persen2=($row1->n4/$row1->n2)*100;
					}
					if ($row1->n5!=0)
					{
						$persen3=($row1->n4-$row1->n5)/$row1->n5*100;
					}
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n5,0,",",".")."</td>
					<td class='detail_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='detail_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='detail_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>
				  </tr>";
				}
			}
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		
		
		
		$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
					case a.jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
					case a.jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
					case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
					case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
					case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
					case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
					case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7
			from exs_neraca a
			$this->filter and a.modul='L'
			order by a.rowindex ";
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$content="";
		$content = "<div align='center' style='width:100%;overflow:auto'>"; 
		$content .= $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		$content .= "<table  border='1' cellpadding='0' cellspacing='0' class='kotak table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
    <tr class='info'>
    <td width='350' height='25'  class='header_laporan' align='center'>Keterangan</td>
    <td width='100' class='header_laporan' align='center'>RKA $tahun</td>
    <td width='100' class='header_laporan' align='center'>RKA s.d Bulan Berjalan (ORGI) $tahun</td>
	<td width='100' class='header_laporan' align='center'>RKA s.d Bulan Berjalan (RRA) $tahun</td>
  	<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun</td>
	<td width='100' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun_rev</td>
	<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA $tahun</td>
	<td width='80' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA s.d Bulan Berjalan $tahun</td>
	<td width='80' class='header_laporan' align='center'>Growth Thd $tahun_rev</td>
    </tr>
	<tr class='info'>
      <td height='25'  class='header_laporan' align='center'>&nbsp;</td>
      <td class='header_laporan' align='center'>1</td>
      <td class='header_laporan' align='center'>2</td>
      <td class='header_laporan' align='center'>3</td>
      <td class='header_laporan' align='center'>4</td>
      <td class='header_laporan' align='center'>5</td>
	  <td class='header_laporan' align='center'>6=4/1</td>
	  <td class='header_laporan' align='center'>7=4/3</td>
	  <td class='header_laporan' align='center'>8=(4-5)/5</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$persen1=0;$persen2=0;$persen3=0;
			if ($row->n1!=0)
			{
				$persen1=($row->n4/$row->n1)*100;
			}
			if ($row->n3!=0)
			{
				$persen2=($row->n4/$row->n3)*100;
			}
			if ($row->n5!=0)
			{
				$persen3=($row->n4-$row->n5)/$row->n5*100;
			}
			$content .= "<tr>
    
      <td height='20' class='isi_laporan'>";
			$content .= fnSpasi($row->level_spasi);
			$content .= $row->nama;
			$content .= "</td>";
			
			if ($row->kode_neraca!="OR")
			{
			$content .= "<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>";
			}
			else
			{
			
			$content .= "<td class='isi_laporan' align='center'>".number_format($row->n1,2,',','.')."</td>
	    <td class='isi_laporan' align='center'>".number_format($row->n2,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->n3,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->n4,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($row->n5,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>";
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="	select a.kode_akun,c.nama,
							case c.jenis when  'Pendapatan' then -n1 else n1 end as n1,
							case c.jenis when  'Pendapatan' then -n2 else n2 end as n2,
							case c.jenis when  'Pendapatan' then -n3 else n3 end as n3,
							case c.jenis when  'Pendapatan' then -n4 else n4 end as n4,
							case c.jenis when  'Pendapatan' then -n5 else n5 end as n5
						from exs_glma_gar a
						inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
						where b.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' 
						order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$persen1=0;$persen2=0;$persen3=0;
					if ($row1->n1!=0)
					{
						$persen1=($row1->n4/$row1->n1)*100;
					}
					if ($row1->n3!=0)
					{
						$persen2=($row1->n4/$row1->n3)*100;
					}
					if ($row1->n5!=0)
					{
						$persen3=($row1->n4-$row1->n5)/$row1->n5*100;
					}
					$nama=$row1->kode_akun." - ".$row1->nama;
					$content .= "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n3,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n5,0,",",".")."</td>
					<td class='detail_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='detail_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='detail_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>
				  </tr>";
				}
			}
			$i=$i+1;
		}
		
		$content .= "</table></div>";
		return $content;
	}
	
}
?>
