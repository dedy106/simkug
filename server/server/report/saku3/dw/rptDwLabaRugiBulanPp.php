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
class server_report_saku3_dw_rptDwLabaRugiBulanPp extends server_report_basic
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
		$tahun=$tmp[1];
		$bentuk=$tmp[2];
		$jenis=$tmp[3];
		$kode_pp=$tmp[4];
		$periode1=$tahun."01";
		$periode2=$tahun."02";
		$periode3=$tahun."03";
		$periode4=$tahun."04";
		$periode5=$tahun."05";
		$periode6=$tahun."06";
		$periode7=$tahun."07";
		$periode8=$tahun."08";
		$periode9=$tahun."09";
		$periode10=$tahun."10";
		$periode11=$tahun."11";
		$periode12=$tahun."12";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$judul1=$AddOnLib->ubah_periode($periode1);
		$judul2=$AddOnLib->ubah_periode($periode2);
		$judul3=$AddOnLib->ubah_periode($periode3);
		$judul4=$AddOnLib->ubah_periode($periode4);
		$judul5=$AddOnLib->ubah_periode($periode5);
		$judul6=$AddOnLib->ubah_periode($periode6);
		$judul7=$AddOnLib->ubah_periode($periode7);
		$judul8=$AddOnLib->ubah_periode($periode8);
		$judul9=$AddOnLib->ubah_periode($periode9);
		$judul10=$AddOnLib->ubah_periode($periode10);
		$judul11=$AddOnLib->ubah_periode($periode11);
		$judul12=$AddOnLib->ubah_periode($periode12);
		$sql="select a.kode_pp,a.nama from pp a $kode_pp order by a.kode_pp";
		
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			echo "<div align='center'>"; 
			echo $AddOnLib->judul_laporan("laporan laba rugi pp"."<br>".$row2->nama,$this->lokasi,"Tahun $tahun");
			echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak' >
		<tr bgcolor='#CCCCCC'>
		<td width='250' height='25'  class='header_laporan' align='center'>Keterangan</td>
		<td width='80' class='header_laporan' align='center'>$judul1</td>
		<td width='80' class='header_laporan' align='center'>$judul2</td>
		<td width='80' class='header_laporan' align='center'>$judul3</td>
		<td width='80' class='header_laporan' align='center'>$judul4</td>
		<td width='80' class='header_laporan' align='center'>$judul5</td>
		<td width='80' class='header_laporan' align='center'>$judul6</td>
		<td width='80' class='header_laporan' align='center'>$judul7</td>
		<td width='80' class='header_laporan' align='center'>$judul8</td>
		<td width='80' class='header_laporan' align='center'>$judul9</td>
		<td width='80' class='header_laporan' align='center'>$judul10</td>
		<td width='80' class='header_laporan' align='center'>$judul11</td>
		<td width='80' class='header_laporan' align='center'>$judul12</td>
		</tr>
		";
			$sql = "select a.kode_neraca,a.nama,a.level_spasi,a.tipe,a.kode_lokasi,a.tipe,a.kode_fs,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -b.n6 else b.n6 end,0) as n1,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -c.n6 else c.n6 end,0) as n2,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -d.n6 else d.n6 end,0) as n3,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -e.n6 else e.n6 end,0) as n4,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -f.n6 else f.n6 end,0) as n5,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -g.n6 else g.n6 end,0) as n6,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -h.n6 else h.n6 end,0) as n7,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -i.n6 else i.n6 end,0) as n8,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -j.n6 else j.n6 end,0) as n9,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -k.n6 else k.n6 end,0) as n10,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -l.n6 else l.n6 end,0) as n11,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -m.n6 else m.n6 end,0) as n12
	from neraca a
	left join exs_neraca_pp b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs and b.periode='$periode1' and b.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi and a.kode_fs=c.kode_fs and c.periode='$periode2' and c.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs and d.periode='$periode3' and d.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp e on a.kode_neraca=e.kode_neraca and a.kode_lokasi=e.kode_lokasi and a.kode_fs=e.kode_fs and e.periode='$periode4' and e.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp f on a.kode_neraca=f.kode_neraca and a.kode_lokasi=f.kode_lokasi and a.kode_fs=f.kode_fs and f.periode='$periode5' and f.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp g on a.kode_neraca=g.kode_neraca and a.kode_lokasi=g.kode_lokasi and a.kode_fs=g.kode_fs and g.periode='$periode6' and g.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp h on a.kode_neraca=h.kode_neraca and a.kode_lokasi=h.kode_lokasi and a.kode_fs=h.kode_fs and h.periode='$periode7' and h.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp i on a.kode_neraca=i.kode_neraca and a.kode_lokasi=i.kode_lokasi and a.kode_fs=i.kode_fs and i.periode='$periode8' and i.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp j on a.kode_neraca=j.kode_neraca and a.kode_lokasi=j.kode_lokasi and a.kode_fs=j.kode_fs and j.periode='$periode9' and j.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp k on a.kode_neraca=k.kode_neraca and a.kode_lokasi=k.kode_lokasi and a.kode_fs=k.kode_fs and k.periode='$periode10' and k.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp l on a.kode_neraca=l.kode_neraca and a.kode_lokasi=l.kode_lokasi and a.kode_fs=l.kode_fs and l.periode='$periode11' and l.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp m on a.kode_neraca=m.kode_neraca and a.kode_lokasi=m.kode_lokasi and a.kode_fs=m.kode_fs and m.periode='$periode12' and m.kode_pp='$row2->kode_pp'

	$this->filter and a.modul='L' 
	order by a.rowindex ";
			if ($jenis=="Saldo Akhir")
			{
				$sql = "select a.kode_neraca,a.nama,a.level_spasi,a.tipe,a.kode_lokasi,a.tipe,a.kode_fs,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -b.n4 else b.n4 end,0) as n1,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -c.n4 else c.n4 end,0) as n2,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -d.n4 else d.n4 end,0) as n3,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -e.n4 else e.n4 end,0) as n4,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -f.n4 else f.n4 end,0) as n5,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -g.n4 else g.n4 end,0) as n6,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -h.n4 else h.n4 end,0) as n7,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -i.n4 else i.n4 end,0) as n8,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -j.n4 else j.n4 end,0) as n9,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -k.n4 else k.n4 end,0) as n10,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -l.n4 else l.n4 end,0) as n11,
			ISNULL(case a.jenis_akun when  'Pendapatan' then -m.n4 else m.n4 end,0) as n12
	from neraca a
	left join exs_neraca_pp b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs and b.periode='$periode1' and b.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi and a.kode_fs=c.kode_fs and c.periode='$periode2' and c.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs and d.periode='$periode3' and d.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp e on a.kode_neraca=e.kode_neraca and a.kode_lokasi=e.kode_lokasi and a.kode_fs=e.kode_fs and e.periode='$periode4' and e.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp f on a.kode_neraca=f.kode_neraca and a.kode_lokasi=f.kode_lokasi and a.kode_fs=f.kode_fs and f.periode='$periode5' and f.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp g on a.kode_neraca=g.kode_neraca and a.kode_lokasi=g.kode_lokasi and a.kode_fs=g.kode_fs and g.periode='$periode6' and g.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp h on a.kode_neraca=h.kode_neraca and a.kode_lokasi=h.kode_lokasi and a.kode_fs=h.kode_fs and h.periode='$periode7' and h.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp i on a.kode_neraca=i.kode_neraca and a.kode_lokasi=i.kode_lokasi and a.kode_fs=i.kode_fs and i.periode='$periode8' and i.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp j on a.kode_neraca=j.kode_neraca and a.kode_lokasi=j.kode_lokasi and a.kode_fs=j.kode_fs and j.periode='$periode9' and j.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp k on a.kode_neraca=k.kode_neraca and a.kode_lokasi=k.kode_lokasi and a.kode_fs=k.kode_fs and k.periode='$periode10' and k.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp l on a.kode_neraca=l.kode_neraca and a.kode_lokasi=l.kode_lokasi and a.kode_fs=l.kode_fs and l.periode='$periode11' and l.kode_pp='$row2->kode_pp'
	left join exs_neraca_pp m on a.kode_neraca=m.kode_neraca and a.kode_lokasi=m.kode_lokasi and a.kode_fs=m.kode_fs and m.periode='$periode12' and m.kode_pp='$row2->kode_pp'


	$this->filter and a.modul='L' 
	order by a.rowindex ";
			}
			
			$rs = $dbLib->execute($sql);	
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";$n10="";$n11="";$n12="";
				if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
				{
					$n1=number_format($row->n1,0,",",".");
					$n2=number_format($row->n2,0,",",".");
					$n3=number_format($row->n3,0,",",".");
					$n4=number_format($row->n4,0,",",".");
					$n5=number_format($row->n5,0,",",".");
					$n6=number_format($row->n6,0,",",".");
					$n7=number_format($row->n7,0,",",".");
					$n8=number_format($row->n8,0,",",".");
					$n9=number_format($row->n9,0,",",".");
					$n10=number_format($row->n10,0,",",".");
					$n11=number_format($row->n11,0,",",".");
					$n12=number_format($row->n12,0,",",".");
				}
				echo "<tr>
		
		  <td height='20' class='isi_laporan'>";
				echo fnSpasi($row->level_spasi);
				echo $row->nama;
				echo "</td>";
				
				if ($row->tipe=="Posting")
				{
			
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode1','$row->kode_neraca','$row2->kode_pp');\">$n1</a>";
				echo "</td>
			<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode2','$row->kode_neraca','$row2->kode_pp');\">$n2</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode3','$row->kode_neraca','$row2->kode_pp');\">$n3</a>";
				echo "</td>
			<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode4','$row->kode_neraca','$row2->kode_pp');\">$n4</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode5','$row->kode_neraca','$row2->kode_pp');\">$n5</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode6','$row->kode_neraca','$row2->kode_pp');\">$n6</a>";
				echo "</td>
			<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode7','$row->kode_neraca','$row2->kode_pp');\">$n7</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode8','$row->kode_neraca','$row2->kode_pp');\">$n8</a>";
				echo "</td>
			<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode9','$row->kode_neraca','$row2->kode_pp');\">$n9</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode10','$row->kode_neraca','$row2->kode_pp');\">$n10</a>";
				echo "</td>";
				echo "<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode11','$row->kode_neraca','$row2->kode_pp');\">$n11</a>";
				echo "</td>
			<td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode12','$row->kode_neraca','$row2->kode_pp');\">$n12</a>";
				echo "</td>";
				}
				else
				{
				
				echo "<td class='isi_laporan' align='right'>$n1</td>
				<td class='isi_laporan' align='right'>$n2</td>
				<td class='isi_laporan' align='right'>$n3</td>
				<td class='isi_laporan' align='right'>$n4</td>
				<td class='isi_laporan' align='right'>$n5</td>
				<td class='isi_laporan' align='right'>$n6</td>
				<td class='isi_laporan' align='right'>$n7</td>
				<td class='isi_laporan' align='right'>$n8</td>
				<td class='isi_laporan' align='right'>$n9</td>
				<td class='isi_laporan' align='right'>$n10</td>
				<td class='isi_laporan' align='right'>$n11</td>
				<td class='isi_laporan' align='right'>$n12</td>";
				}
				if ($bentuk=="Detail" && $row->tipe=="Posting")
				{
					$kode_neraca=$row->kode_neraca;
					$kode_fs=$row->kode_fs;
					$kode_lokasi=$row->kode_lokasi;
					$sql1="select a.kode_akun,n.nama,
						ISNULL(case n.jenis when  'Pendapatan' then -b.so_akhir else b.so_akhir end,0) as n1,
						ISNULL(case n.jenis when  'Pendapatan' then -c.so_akhir else c.so_akhir end,0) as n2,
						ISNULL(case n.jenis when  'Pendapatan' then -d.so_akhir else d.so_akhir end,0) as n3,
						ISNULL(case n.jenis when  'Pendapatan' then -e.so_akhir else e.so_akhir end,0) as n4,
						ISNULL(case n.jenis when  'Pendapatan' then -f.so_akhir else f.so_akhir end,0) as n5,
						ISNULL(case n.jenis when  'Pendapatan' then -g.so_akhir else g.so_akhir end,0) as n6,
						ISNULL(case n.jenis when  'Pendapatan' then -h.so_akhir else h.so_akhir end,0) as n7,
						ISNULL(case n.jenis when  'Pendapatan' then -i.so_akhir else i.so_akhir end,0) as n8,
						ISNULL(case n.jenis when  'Pendapatan' then -j.so_akhir else j.so_akhir end,0) as n9,
						ISNULL(case n.jenis when  'Pendapatan' then -k.so_akhir else k.so_akhir end,0) as n10,
						ISNULL(case n.jenis when  'Pendapatan' then -l.so_akhir else l.so_akhir end,0) as n11,
						ISNULL(case n.jenis when  'Pendapatan' then -m.so_akhir else m.so_akhir end,0) as n12
						from relakun a
						left join exs_glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.periode='$periode1'
						left join exs_glma c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode='$periode2'  
						left join exs_glma d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.periode='$periode3'
						left join exs_glma e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and e.periode='$periode4'
						left join exs_glma f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and f.periode='$periode5'
						left join exs_glma g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi and g.periode='$periode6'
						left join exs_glma h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi and h.periode='$periode7'  
						left join exs_glma i on a.kode_akun=i.kode_akun and a.kode_lokasi=i.kode_lokasi and i.periode='$periode8'
						left join exs_glma j on a.kode_akun=j.kode_akun and a.kode_lokasi=j.kode_lokasi and j.periode='$periode9'
						left join exs_glma k on a.kode_akun=k.kode_akun and a.kode_lokasi=k.kode_lokasi and k.periode='$periode10'
						left join exs_glma l on a.kode_akun=l.kode_akun and a.kode_lokasi=l.kode_lokasi and l.periode='$periode11'
						left join exs_glma m on a.kode_akun=m.kode_akun and a.kode_lokasi=m.kode_lokasi and m.periode='$periode12'
						inner join masakun n on a.kode_akun=n.kode_akun and a.kode_lokasi=n.kode_lokasi
						where a.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and a.kode_neraca='$kode_neraca'
						order by a.kode_akun";
					$rs1 = $dbLib->execute($sql1);
					
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{	
						
						$nama=$row1->kode_akun." - ".$row1->nama;
						echo "<tr>
						<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n3,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n5,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n6,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n7,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n8,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n9,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n10,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n11,0,",",".")."</td>
						<td class='detail_laporan' align='right'>".number_format($row1->n12,0,",",".")."</td>
					  </tr>";
					}
				}
				$i=$i+1;
			}
		}
		echo "</table></div>";
		return "";
	}
	
	
}
?>
