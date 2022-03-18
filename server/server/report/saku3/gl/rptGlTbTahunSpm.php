<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlTbTahunSpm extends server_report_basic
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
		$tahun=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$trail=$tmp[4];
		$sql="exec sp_glma_tahun_dw_tmp '$kode_lokasi','$tahun','$nik_user' ";
		
		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (a.so_awal<>0 or a.n01<>0 or a.n02<>0 or a.n03<>0 or a.n04<>0 or a.n05<>0 or a.n06<>0 or a.n07<>0 or a.n08<>0 or a.n09<>0 or a.n10<>0 or a.n11<>0 or a.n12<>0 or a.n13<>0 or a.n14<>0 or a.n15<>0 or a.n16<>0 or a.total<>0) ";
		}
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.so_awal,a.n01,a.n02,a.n03,a.n04,a.n05,a.n06,a.n07,a.n08,a.n09,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.total
		from glma12_tmp a $this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("NERACA LAJUR",$this->lokasi,"Tahun ".$tahun);
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>NERACA LAJUR</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Tahun $tahun</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='70' class='header_laporan' align='center'>Kode Akun</td>
    <td width='300' class='header_laporan' align='center'>Nama Akun</td>
	<td width='90' class='header_laporan' align='center'>Saldo Awal</td>
     <td width='90' class='header_laporan' align='center'>Januari</td>
    <td width='90' class='header_laporan' align='center'>Februari</td>
    <td width='90' class='header_laporan' align='center'>Maret</td>
    <td width='90' class='header_laporan' align='center'>April</td>
	<td width='90' class='header_laporan' align='center'>Mei</td>
    <td width='90' class='header_laporan' align='center'>Juni</td>
    <td width='90' class='header_laporan' align='center'>Juli</td>
    <td width='90' class='header_laporan' align='center'>Agustus</td>
	<td width='90' class='header_laporan' align='center'>September</td>
    <td width='90' class='header_laporan' align='center'>Oktober</td>
    <td width='90' class='header_laporan' align='center'>November</td>
    <td width='90' class='header_laporan' align='center'>Desember 1</td>
	<td width='90' class='header_laporan' align='center'>Desember 2</td>
	<td width='90' class='header_laporan' align='center'>Desember 3</td>
	<td width='90' class='header_laporan' align='center'>Desember 4</td>
	<td width='90' class='header_laporan' align='center'>Desember 5</td>
  </tr>
";
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;
		$periode01=$tahun."01"; $periode02=$tahun."02"; $periode03=$tahun."03"; $periode04=$tahun."04"; $periode05=$tahun."05"; $periode06=$tahun."06";
		$periode07=$tahun."07"; $periode08=$tahun."08"; $periode09=$tahun."09"; $periode10=$tahun."10"; $periode11=$tahun."11"; $periode12=$tahun."12";
		$periode13=$tahun."13"; $periode14=$tahun."14"; $periode15=$tahun."15"; $periode16=$tahun."16";
		$so_awal=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$total+=$row->total;
			$n01+=$row->n01;
			$n02+=$row->n02;
			$n03+=$row->n03;
			$n04+=$row->n04;
			$n05+=$row->n05;
			$n06+=$row->n06;
			$n07+=$row->n07;
			$n08+=$row->n08;
			$n09+=$row->n09;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$n14+=$row->n14;
			$n15+=$row->n15;
			$n16+=$row->n16;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>$row->nama</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>";
    echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode01');\">".number_format($row->n01,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode02');\">".number_format($row->n02,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode03');\">".number_format($row->n03,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode04');\">".number_format($row->n04,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode05');\">".number_format($row->n05,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode06');\">".number_format($row->n06,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode07');\">".number_format($row->n07,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode08');\">".number_format($row->n08,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode09');\">".number_format($row->n09,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode10');\">".number_format($row->n10,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode11');\">".number_format($row->n11,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode12');\">".number_format($row->n12,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode13');\">".number_format($row->n13,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode14');\">".number_format($row->n14,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode15');\">".number_format($row->n15,0,",",".")."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode16');\">".number_format($row->n16,0,",",".")."</a></td>";
echo "</tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
	<td height='23' colspan='3' align='right' class='isi_laporan'>Total&nbsp;</td>
	 <td class='header_laporan' align='right'>".number_format($so_awal,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n01,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n02,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n03,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n04,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n05,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n06,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n07,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n08,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n09,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n12,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n13,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n14,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n15,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n16,0,',','.')."</td>
</tr>";
		
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
