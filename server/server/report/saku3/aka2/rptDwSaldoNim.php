<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptDwSaldoNim extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$saldo=$tmp[2];
		$jenis=$tmp[3];
		
		$tmp="";
		if ($saldo=="Tidak")
		{
			$tmp=" and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 or a.n10<>0 or a.n11<>0 or a.n12<>0  
						or a.n13<>0 or a.n14<>0 or a.n15<>0 or a.n16<>0 or a.n17<>0 or a.n18<>0 or a.n19<>0 or a.n20<>0 or a.n21<>0 or a.n22<>0 or a.n23<>0 or a.n24<>0 )";
		}
		
		$sql="SELECT  count(a.nim) as jum
FROM  exs_aka_saldo_nim a
inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
inner join aka_jurusan c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi
$this->filter $tmp ";
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
		$saldo=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="saldo_".$periode.".xls";
		$tmp="";
		if ($saldo=="Tidak")
		{
			$tmp=" and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0 or a.n7<>0 or a.n8<>0 or a.n9<>0 or a.n10<>0 or a.n11<>0 or a.n12<>0  
						or a.n13<>0 or a.n14<>0 or a.n15<>0 or a.n16<>0 or a.n17<>0 or a.n18<>0 or a.n19<>0 or a.n20<>0 or a.n21<>0 or a.n22<>0 or a.n23<>0 or a.n24<>0 )";
		}
		$sql="select a.nim,a.nama,a.kode_jur,f.nama as nama_jur,
	   isnull(b.n1,0)-isnull(c.n1,0)-isnull(d.n1,0)+isnull(e.n1,0) as bpp,
	   isnull(b.n2,0)-isnull(c.n2,0)-isnull(d.n2,0)+isnull(e.n2,0) as bppnp,
	   isnull(b.n3,0)-isnull(c.n3,0)-isnull(d.n3,0)+isnull(e.n3,0) as sdp2,
	   isnull(b.n4,0)-isnull(c.n4,0)-isnull(d.n4,0)+isnull(e.n4,0) as up3,
	   isnull(b.n5,0)-isnull(c.n5,0)-isnull(d.n5,0)+isnull(e.n5,0) as sks,
	   isnull(b.n6,0)-isnull(c.n6,0)-isnull(d.n6,0)+isnull(e.n6,0) as perpus,
	   isnull(b.n7,0)-isnull(c.n7,0)-isnull(d.n7,0)+isnull(e.n7,0) as denda,
	   isnull(b.n8,0)-isnull(c.n8,0)-isnull(d.n8,0)+isnull(e.n8,0) as ustatus,
	   isnull(b.n9,0)-isnull(c.n9,0)-isnull(d.n9,0)+isnull(e.n9,0) as asur,
	   isnull(b.n10,0)-isnull(c.n10,0)-isnull(d.n10,0)+isnull(e.n10,0) as pddk_lain,
	   isnull(b.total,0)-isnull(c.total,0)-isnull(d.total,0)+isnull(e.total,0) as total
from aka_mahasiswa a
inner join aka_jurusan f on a.kode_jur=f.kode_jur and a.kode_lokasi=f.kode_lokasi
left join (select a.nim,a.kode_lokasi,
				  sum(a.n1) as n1,sum(a.n2) as n2, sum(a.n3) as n3, sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,
				  sum(a.n8) as n8,sum(a.n9) as n9,sum(a.n10) as n10,sum(a.total) as total
		   from exs_aka_bill a
		   where a.kode_lokasi='11' and a.periode<='202005' and a.nim='1101130007'
		   group by a.nim,a.kode_lokasi
		  )b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
left join (select a.nim,a.kode_lokasi,
				  sum(a.n1) as n1,sum(a.n2) as n2, sum(a.n3) as n3, sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,
				  sum(a.n8) as n8,sum(a.n9) as n9,sum(a.n10) as n10,sum(a.total) as total
		   from exs_aka_bill_batal a
		   where a.kode_lokasi='11' and a.periode<='202005' and a.nim='1101130007'
		   group by a.nim,a.kode_lokasi
		  )c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi
left join (select a.nim,a.kode_lokasi,
				  sum(a.n1) as n1,sum(a.n2) as n2, sum(a.n3) as n3, sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,
				  sum(a.n8) as n8,sum(a.n9) as n9,sum(a.n10) as n10,sum(a.total) as total
		   from exs_aka_rekon a
		   where a.kode_lokasi='11' and a.periode<='202005' and a.nim='1101130007'
		   group by a.nim,a.kode_lokasi
		  )d on a.nim=d.nim and a.kode_lokasi=d.kode_lokasi
left join (select a.nim,a.kode_lokasi,
				  sum(a.n1) as n1,sum(a.n2) as n2, sum(a.n3) as n3, sum(a.n4) as n4,sum(a.n5) as n5,sum(a.n6) as n6,sum(a.n7) as n7,
				  sum(a.n8) as n8,sum(a.n9) as n9,sum(a.n10) as n10,sum(a.total) as total
		   from exs_aka_rekon_batal a
		   where a.kode_lokasi='11' and a.periode<='202005' and a.nim='1101130007'
		   group by a.nim,a.kode_lokasi
		  )e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi
where a.nim='1101130007'";
		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			if ($start<0) 
			{
				$start=1;
			}
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
			$i = $start+1;
			$jum=$rs->recordcount();
		}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
	<td width='60'  class='header_laporan'>NPM</td>
    <td width='200'  class='header_laporan'>Nama </td>
    <td width='50'  class='header_laporan'>Kode</td>
    <td width='200'  class='header_laporan'>Nama Jurusan </td>
	<td width='75' align='center' class='header_laporan'>BPP</td>
	<td width='75' align='center' class='header_laporan'>BPPNP</td>
    <td width='75' align='center' class='header_laporan'>SDP2</td>
    <td width='75' align='center' class='header_laporan'>UP3</td>
	<td width='75' align='center' class='header_laporan'>SKS</td>
	<td width='75' align='center' class='header_laporan'>PERPUS</td>
	<td width='75' align='center' class='header_laporan'>DENDA</td>
	<td width='75' align='center' class='header_laporan'>USTATUS</td>
	<td width='75' align='center' class='header_laporan'>ASUR</td>
	<td width='75' align='center' class='header_laporan'>PDDK LAINNYA</td>
	<td width='90' align='center' class='header_laporan'>Total</td>
  </tr>
 ";
		$bpp=0;$bppnp=0;$sdp2=0;$up3=0;$sks=0;$total=0;$perpus=0;$denda=0;$ustatus=0;$asur=0;$pddk_lain=0;$bea=0;
		$bayar=0;$bayar_total=0;$selisih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$bpp+=$row->bpp;
			$bppnp+=$row->bppnp;
			$sdp2+=+$row->sdp2;
			$up3+=$row->up3;
			$sks+=$row->sks;
			$perpus+=$row->perpus;
			$denda+=$row->denda;
			$ustatus+=$row->ustatus;
			$asur+=$row->asur;
			$pddk_lain+=$row->pddk_lain;
			$total+=$row->total;
			$bea+=$row->bea;
			$sisa+=$row->total_bea;
			$bayar+=$row->bayar;
			$selisih+=$row->selisih;
			$bayar_total+=$row->bayar_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_jur</td>
	<td class='isi_laporan'>$row->nama_jur</td>
	<td class='isi_laporan'>$row->nim</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoJur('$row->nimultas','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bppnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->denda,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ustatus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->asur,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pddk_lain,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "</td>
		<td class='isi_laporan' align='center' colspan='5'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($bpp,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($bppnp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($up3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($sks,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($perpus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($denda,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($ustatus,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($asur,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($pddk_lain,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
