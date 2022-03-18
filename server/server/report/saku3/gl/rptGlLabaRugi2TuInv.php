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
class server_report_saku3_gl_rptGlLabaRugi2TuInv extends server_report_basic
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$bentuk=$tmp[3];
		$bulan=substr($periode,4,2);
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		$periode2=$tahun_rev.$bulan;
		$sql="exec sp_neraca2_gar_dw 'FS3','N','S','1','$periode','$periode2','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,tipe,nama,tipe,level_spasi,n3,n4,n1,n2
			from neraca_tmp 
			where modul='A' and nik_user='$nik_user' 
			order by rowindex ";
		$rs = $dbLib->execute($sql);		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$tgl=$totime[0];
		$totime = $tgl . " ". $bln ." ". $totime[2];
		$totime2 = $tgl . " ". $bln ." ". $tahun_rev;
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan investasi",$this->lokasi,"Periode yang Berakhir $totime");
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
     <td width='400' height='25'  class='header_laporan' align='center'>Keterangan</td>
     <td width='90' class='header_laporan' align='center'>RKA $tahun</td>
      <td width='90' class='header_laporan' align='center'>RKA s.d Bulan Berjalan $tahun</td>
  	  <td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun</td>
	<td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan $tahun_rev</td>
	<td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA $tahun</td>
	<td width='90' class='header_laporan' align='center'>Realisasi s.d Bulan Berjalan thd RKA s.d Bulan Berjalan $tahun</td>
	<td width='90' class='header_laporan' align='center'>Growth Thd $tahun_rev</td>
    </tr>
	<tr bgcolor='#CCCCCC'>
      <td height='25'  class='header_laporan' align='center'>&nbsp;</td>
      <td class='header_laporan' align='center'>1</td>
      <td class='header_laporan' align='center'>2</td>
      <td class='header_laporan' align='center'>3</td>
      <td class='header_laporan' align='center'>4</td>
      <td class='header_laporan' align='center'>5=3/1</td>
      <td class='header_laporan' align='center'>6=3/2</td>
      <td class='header_laporan' align='center'>7=(3-4)/4</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$persen1=0;$persen2=0;$persen3=0;
			if ($row->n3!=0)
			{
				$persen1=($row->n1/$row->n3)*100;
			}
			if ($row->n4!=0)
			{
				$persen2=($row->n1/$row->n4)*100;
			}
			if ($row->n2!=0)
			{
				$persen3=($row->n1-$row->n2)/$row->n2*100;
			}
			echo "<tr>
    
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			if ($row->kode_neraca!="48" && $row->kode_fs="FS2")
			{
			echo "<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>";
			}
			else
			{
			echo "<td class='isi_laporan' align='center'>".number_format($row->n3,2,',','.')."%</td>
	    <td class='isi_laporan' align='center'>".number_format($row->n4,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($row->n1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($row->n2,2,',','.')."%</td>";
			}
		echo "<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."%</td>
		</tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="	select a.kode_akun,c.nama,n1,n2,n3,n4
						from glma_gar_tmp a
						inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
						where b.kode_fs='FS3' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user' and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0)
						order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$persen1=0;$persen2=0;$persen3=0;
					if ($row->n3!=0)
					{
						$persen1=($row->n1/$row->n3)*100;
					}
					if ($row->n4!=0)
					{
						$persen2=($row->n1/$row->n4)*100;
					}
					if ($row->n2!=0)
					{
						$persen3=($row->n1-$row->n2)/$row->n2*100;
					}
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n3,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
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
	
}
?>
