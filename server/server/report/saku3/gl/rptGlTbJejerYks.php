<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlTbJejerYks extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$trail=$tmp[4];
		$sql="call sp_glma_jejer_dw '$kode_lokasi','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n1+a.n2+a.n3+a.n4+a.n5+a.n6+a.n7+a.n8 as n9
				from glma_jejer_tmp a 
				$this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 )
				order by a.kode_akun";
		
		if ($trail=="1")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n1+a.n2+a.n3+a.n4+a.n5+a.n6+a.n7+a.n8 as n9
				from glma_jejer_tmp a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 )
				order by a.kode_akun";
		}
		if ($trail=="2")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n1+a.n2+a.n3+a.n4+a.n5+a.n6+a.n7+a.n8 as n9
				from glma_jejer_tmp a
				inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 )
				order by a.kode_akun";
		}
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
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
