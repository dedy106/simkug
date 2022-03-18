<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlTbPpJejerYspt extends server_report_basic
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
		$sql="exec sp_glma_jejer_dw '$kode_lokasi','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.n19,a.n20,a.n21,a.n22
				from glma_jejer_tmp a $this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 )
				order by a.kode_akun";
		
		if ($trail=="1")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.n19,a.n20,a.n21,a.n22
				from glma_jejer_tmp a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 )
				order by a.kode_akun";
		}
		if ($trail=="2")
		{
			$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.kode_lokasi,a.kode_akun,a.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.n19,a.n20,a.n21,a.n22
				from glma_jejer_tmp a
				inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and nik_user='$nik_user'
				and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 )
				order by a.kode_akun";
		}
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("TRIAL BALANCE",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
		<td width='70'  class='header_laporan' align='center'>Kode Akun</td>
      <td width='300' height='25'  class='header_laporan' align='center'>Nama Akun</td>
	   <td width='90' class='header_laporan' align='center'>JAKARTA</td>
      <td width='90' class='header_laporan' align='center'>SURABAYA</td>
      <td width='90' class='header_laporan' align='center'>BALIKPAPAN</td>
      <td width='90' class='header_laporan' align='center'>MAKASAR</td>
	  <td width='90' class='header_laporan' align='center'>MEDAN</td>
	  <td width='90' class='header_laporan' align='center'>BATAM</td>
	  <td width='90' class='header_laporan' align='center'>PKU</td>
	  <td width='90' class='header_laporan' align='center'>PADANG</td>
      <td width='90' class='header_laporan' align='center'>PALEMBANG</td>
	  <td width='90' class='header_laporan' align='center'>LAMPUNG</td>
      <td width='90' class='header_laporan' align='center'>BANDUNG</td>
	  <td width='90' class='header_laporan' align='center'>SEMARANG</td>
	  <td width='90' class='header_laporan' align='center'>DENPASAR</td>
	  <td width='90' class='header_laporan' align='center'>MANADO</td>
      <td width='90' class='header_laporan' align='center'>AMBON</td>
	  <td width='90' class='header_laporan' align='center'>BJM</td>	  
	  <td width='90' class='header_laporan' align='center'>SDM</td>
	  <td width='90' class='header_laporan' align='center'>PTK</td>
	   <td width='90' class='header_laporan' align='center'>PLT</td>
	   <td width='90' class='header_laporan' align='center'>TRK</td>
	   <td width='90' class='header_laporan' align='center'>PUSAT</td>
	<td width='100' class='header_laporan' align='center'>NASIONAL</td>
    </tr>";
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0; $n13=0; $n14=0;
		$n15=0; $n16=0; $n17=0; $n18=0; $n19=0; $n20=0; $n21=0; $n22=0; 
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
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$n14+=$row->n14;
			$n15+=$row->n15;
			$n16+=$row->n16;
			$n17+=$row->n17;
			$n18+=$row->n18;
			$n19+=$row->n19;
			$n20+=$row->n20;
			$n21+=$row->n21;
			$n22+=$row->n22;
			echo "<tr>
    <td class='isi_laporan'>$row->kode_akun</td>";
			echo "<td class='isi_laporan'>$row->nama</td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','01','$periode');\">".number_format($row->n1,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','02','$periode');\">".number_format($row->n2,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','03','$periode');\">".number_format($row->n3,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','04','$periode');\">".number_format($row->n4,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','05','$periode');\">".number_format($row->n5,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','06','$periode');\">".number_format($row->n6,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','07','$periode');\">".number_format($row->n7,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','08','$periode');\">".number_format($row->n8,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','09','$periode');\">".number_format($row->n9,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','10','$periode');\">".number_format($row->n10,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','11','$periode');\">".number_format($row->n11,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','12','$periode');\">".number_format($row->n12,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','13','$periode');\">".number_format($row->n13,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','14','$periode');\">".number_format($row->n14,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','15','$periode');\">".number_format($row->n15,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','16','$periode');\">".number_format($row->n16,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','17','$periode');\">".number_format($row->n17,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','18','$periode');\">".number_format($row->n18,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','19','$periode');\">".number_format($row->n19,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','20','$periode');\">".number_format($row->n20,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','21','$periode');\">".number_format($row->n21,0,",",".")."</a></td>";
			echo "<td  class='isi_laporan' align='right'>".number_format($row->n22,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
	
	  echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
	<td class='header_laporan' align='right'>".number_format($n1,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n2,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n3,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n4,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n5,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n6,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n7,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n8,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n9,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n10,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n11,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n12,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n13,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n14,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n15,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n16,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n17,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n18,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n19,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n20,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n21,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n22,2,',','.')."</td>
  </tr></table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
