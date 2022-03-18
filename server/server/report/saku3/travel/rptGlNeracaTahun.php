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
class server_report_saku3_travel_rptGlNeracaTahun extends server_report_basic
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
		$tahun=$tmp[1];
		$kode_lokasi=$tmp[2];
		$lev=$tmp[3];
		
		
		$sql="call sp_neraca_tahun_dw 'FS1','N','S','$lev','$tahun','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.n1 as n01,a.n2 as n02,a.n3 as n03,a.n4 as n04,a.n5 as n05,a.n6 as n06,a.n7 as n07,a.n8 as n08,
		a.n9 as n09,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.level_spasi,a.tipe
				from neraca_tmp a where nik_user='$nik_user' and modul='A' order by rowindex";
		
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
    <td  class='lokasi_laporan2' align='center'>NERACA</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Tahun $tahun</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111' width='2000'>
  <tr bgcolor='#CCCCCC'>
    <td width='300' class='header_laporan'>Keterangan</td>
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
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;
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
			$n17+=$row->n17;
			$n18+=$row->n18;
			$v1="";$v2="";$v3="";$v4="";$v5="";$v6="";$v7="";$v8="";$v9="";$v10="";$v11="";$v12="";$v13="";$v14="";$v15="";$v16="";$v17="";;$v18="";
			if ($row->tipe!="Header") {$v1=number_format($row->n01,0,",",".");}
			if ($row->tipe!="Header") {$v2=number_format($row->n02,0,",",".");}
			if ($row->tipe!="Header") {$v3=number_format($row->n03,0,",",".");}
			if ($row->tipe!="Header") {$v4=number_format($row->n04,0,",",".");}
			if ($row->tipe!="Header") {$v5=number_format($row->n05,0,",",".");}
			if ($row->tipe!="Header") {$v6=number_format($row->n06,0,",",".");}
			if ($row->tipe!="Header") {$v7=number_format($row->n07,0,",",".");}
			if ($row->tipe!="Header") {$v8=number_format($row->n08,0,",",".");}
			if ($row->tipe!="Header") {$v9=number_format($row->n09,0,",",".");}
			if ($row->tipe!="Header") {$v10=number_format($row->n10,0,",",".");}
			if ($row->tipe!="Header") {$v11=number_format($row->n11,0,",",".");}
			if ($row->tipe!="Header") {$v12=number_format($row->n12,0,",",".");}
			if ($row->tipe!="Header") {$v13=number_format($row->n13,0,",",".");}
			if ($row->tipe!="Header") {$v14=number_format($row->n14,0,",",".");}
			if ($row->tipe!="Header") {$v15=number_format($row->n15,0,",",".");}
			if ($row->tipe!="Header") {$v16=number_format($row->n16,0,",",".");}
			if ($row->tipe!="Header") {$v17=number_format($row->n17,0,",",".");}
			if ($row->tipe!="Header") {$v18=number_format($row->n18,0,",",".");}
			echo "<tr>
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
	  echo "</td>";
    echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode01');\">".$v18."</a></td>";
    echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode01');\">".$v1."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode02');\">".$v2."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode03');\">".$v3."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode04');\">".$v4."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode05');\">".$v5."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode06');\">".$v6."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode07');\">".$v7."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode08');\">".$v8."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode09');\">".$v9."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode10');\">".$v10."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode11');\">".$v11."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode12');\">".$v12."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode13');\">".$v13."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode14');\">".$v14."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode15');\">".$v15."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode16');\">".$v16."</a></td>";
	echo "</tr>";
			
			$i=$i+1;
		}
	
		echo "<br>";
	  $sql = "select a.kode_lokasi,a.kode_neraca,a.nama,a.n1*-1 as n01,a.n2*-1 as n02,a.n3*-1 as n03,a.n4*-1 as n04,a.n5*-1 as n05 ,a.n6*-1 as n06,a.n7*-1 as n07,a.n8*-1 as n08,a.n9*-1 as n09,a.n10*-1 as n10,
					 a.n10*-1 as n10,a.n11*-1 as n11,a.n12*-1 as n12,a.n13*-1 as n13,a.n14*-1 as n14,a.n15*-1 as n15 ,a.n16*-1 as n16,a.n17*-1 as n17,a.n18*-1 as n18,a.level_spasi,a.tipe
			from neraca_tmp a where nik_user='$nik_user' and modul='P' order by rowindex";
		
		$rs = $dbLib->execute($sql);
		
		
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;
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
			$n17+=$row->n17;
			$n18+=$row->n18;
			$v1="";$v2="";$v3="";$v4="";$v5="";$v6="";$v7="";$v8="";$v9="";$v10="";$v11="";$v12="";$v13="";$v14="";$v15="";$v16="";$v17="";;$v18="";
			if ($row->tipe!="Header") {$v1=number_format($row->n01,0,",",".");}
			if ($row->tipe!="Header") {$v2=number_format($row->n02,0,",",".");}
			if ($row->tipe!="Header") {$v3=number_format($row->n03,0,",",".");}
			if ($row->tipe!="Header") {$v4=number_format($row->n04,0,",",".");}
			if ($row->tipe!="Header") {$v5=number_format($row->n05,0,",",".");}
			if ($row->tipe!="Header") {$v6=number_format($row->n06,0,",",".");}
			if ($row->tipe!="Header") {$v7=number_format($row->n07,0,",",".");}
			if ($row->tipe!="Header") {$v8=number_format($row->n08,0,",",".");}
			if ($row->tipe!="Header") {$v9=number_format($row->n09,0,",",".");}
			if ($row->tipe!="Header") {$v10=number_format($row->n10,0,",",".");}
			if ($row->tipe!="Header") {$v11=number_format($row->n11,0,",",".");}
			if ($row->tipe!="Header") {$v12=number_format($row->n12,0,",",".");}
			if ($row->tipe!="Header") {$v13=number_format($row->n13,0,",",".");}
			if ($row->tipe!="Header") {$v14=number_format($row->n14,0,",",".");}
			if ($row->tipe!="Header") {$v15=number_format($row->n15,0,",",".");}
			if ($row->tipe!="Header") {$v16=number_format($row->n16,0,",",".");}
			if ($row->tipe!="Header") {$v17=number_format($row->n17,0,",",".");}
			if ($row->tipe!="Header") {$v18=number_format($row->n18,0,",",".");}
			echo "<tr>
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
	  echo "</td>";
    echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode01');\">".$v18."</a></td>";
    echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode01');\">".$v1."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode02');\">".$v2."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode03');\">".$v3."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode04');\">".$v4."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode05');\">".$v5."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode06');\">".$v6."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode07');\">".$v7."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode08');\">".$v8."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode09');\">".$v9."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode10');\">".$v10."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode11');\">".$v11."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode12');\">".$v12."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode13');\">".$v13."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode14');\">".$v14."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode15');\">".$v15."</a></td>";
	echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi','$periode16');\">".$v16."</a></td>";
	echo "</tr>";
			
			$i=$i+1;
		}
		
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
