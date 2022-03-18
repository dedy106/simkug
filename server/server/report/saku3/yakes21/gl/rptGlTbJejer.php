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
function fnTanggal($periode) {
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
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		return $totime;
}

class server_report_saku3_yakes21_gl_rptGlTbJejer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$trail=$tmp[4];
		$nama_lokasi=$this->lokasi;
		if ($kode_lokasi=="") {
			$kode_lokasi='00';
		}
		$sql="exec sp_glma_jejer_yk '$kode_lokasi','$periode','$nik_user' ";
		//echo $sql;
		$rs = $dbLib->execute($sql);	
		
		$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9
			from glma_jejer_tmp a 
			where a.kode_lokasi='$kode_lokasi' and a.nik_user='$nik_user' $mutasi
					order by a.kode_akun";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN NERACA LAJUR</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Periode ".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
		<td width='70'  class='header_laporan' align='center'>Kode Akun</td>
      <td width='300' height='25'  class='header_laporan' align='center'>Nama Akun</td>
     <td width='90' class='header_laporan' align='center'>PUSAT</td>
      <td width='90' class='header_laporan' align='center'>AREA 1</td>
      <td width='90' class='header_laporan' align='center'>AREA 2</td>
      <td width='90' class='header_laporan' align='center'>AREA 3</td>
	  <td width='90' class='header_laporan' align='center'>AREA 4</td>
	  <td width='90' class='header_laporan' align='center'>AREA 5</td>
	  <td width='90' class='header_laporan' align='center'>AREA 6</td>
	  <td width='90' class='header_laporan' align='center'>AREA 7</td>
	<td width='100' class='header_laporan' align='center'>TOTAL</td>
    </tr>";
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
			$n9+=$row->n9;
			echo "<tr>
    <td class='isi_laporan'>$row->kode_akun</td>";
			echo "<td class='isi_laporan'>";
			echo $row->nama;
			echo "</td>
    <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','99','$periode');\">".number_format($row->n8,0,",",".")."</a>";
			echo "</td>
    <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','01','$periode');\">".number_format($row->n1,0,",",".")."</a>";
			echo "</td>
   <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','02','$periode');\">".number_format($row->n2,0,",",".")."</a>";
			echo "</td>
    <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','03','$periode');\">".number_format($row->n3,0,",",".")."</a>";
			echo "</td>
	 <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','04','$periode');\">".number_format($row->n4,0,",",".")."</a>";
			echo "</td>
	 <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','05','$periode');\">".number_format($row->n5,0,",",".")."</a>";
			echo "</td>
	 <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','06','$periode');\">".number_format($row->n6,0,",",".")."</a>";
			echo "</td>
	 <td  class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','07','$periode');\">".number_format($row->n7,0,",",".")."</a>";
			echo "</td>
	  <td  class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
	<td class='header_laporan' align='right'>".number_format($n8,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n3,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n5,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n6,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n7,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n9,0,',','.')."</td>
  </tr></table>";
		
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
