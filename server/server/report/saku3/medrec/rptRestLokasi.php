<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_medrec_rptRestLokasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="SELECT     a.kode_lokasi, e.nama,
		sum(a.n1) as n1, sum(a.n2) as n2, sum(a.n3) as n3, sum(a.n4) as n4, sum(a.n5) as n5, sum(a.n6) as n6,
		sum(a.n7) as n7, sum(a.n8) as n8, sum(a.n9) as n9, sum(a.n10) as n10, sum(a.n11) as n11, sum(a.n12) as n12,
		sum(a.n13) as n13, sum(a.n14) as n14, sum(a.n15) as n15, sum(a.n16) as n16, sum(a.n17) as n17, sum(a.n18) as n18,
		sum(a.n19) as n19, sum(a.n20) as n20, sum(a.n21) as n21, sum(a.n22) as n22, sum(a.n23) as n23, sum(a.n24) as n24
FROM dbexs.dbo.exs_harian a
inner join lokasi e on a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,e.nama 
order by a.kode_lokasi ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("biaya pengobatan restitusi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#B9FFCF'>
    <td class='header_laporan' rowspan='2'>No</td>
    <td class='header_laporan' width='120' rowspan='2'>AREA</td>
    <td class='header_laporan' colspan='20'>BIAYA PENGOBATAN</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>TOTAL</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>NILAI KUNJUNGAN</td>
    
  </tr>
  <tr bgcolor='#B9FFCF'>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER UMUM</td>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER GIGI</td>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER SPESIALIS</td>
    <td class='header_laporan' width='80' align='center'>KB-KIA</td>
    <td class='header_laporan' width='80' align='center'>UGD</td>
    <td class='header_laporan' width='80' align='center'>TINDAKAN MEDIS (FISIOTERAPI)</td>
	 <td class='header_laporan' width='80' align='center'>HEMODIALISA</td>
	  <td class='header_laporan' width='80' align='center'>KEMOTERAPI</td>
    <td class='header_laporan' width='80' align='center'>OBAT / BAHAN OBAT</td>
    <td class='header_laporan' width='80' align='center'>ALAT KESEHATAN/ MATERIAL KESEHATAN</td>
    <td class='header_laporan' width='80' align='center'>PEMERIKSAAN PENUNJANG </td>
    <td class='header_laporan' width='80' align='center'>KAMAR PERAWATAN</td>
    <td class='header_laporan' width='80' align='center'>KAMAR BEDAH</td>
    <td class='header_laporan' width='80' align='center'>RUANG PERAWATAN KHUSUS </td>
    <td class='header_laporan' width='80' align='center'>KACA MATA</td>
    <td class='header_laporan' width='80' align='center'>HEARING AID</td>
    <td class='header_laporan' width='80' align='center'>PROTESA</td>
    <td class='header_laporan' width='80' align='center'>LAIN2</td>
    <td class='header_laporan' width='80' align='center'>KACA MATA DAN ALAT REHABILITASI LAINNYA</td>
    <td class='header_laporan' width='80' align='center'>ADM &amp; BEBAN LAINNYA</td>
  </tr> ";
		$i=1; $nilai=0;
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; 
		$n12=0; $n13=0; $n14=0; $n15=0; $n16=0; $n17=0; $n18=0; $n19=0; $n20=0; $n21=0;$n22=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$n1+=$row->n1; $n2+=$row->n2; $n3+=$row->n3; $n4+=$row->n4; $n5+=$row->n5; $n6+=$row->n6;
			$n7+=$row->n7; $n8+=$row->n8; $n9+=$row->n9; $n10+=$row->n10; $n11+=$row->n11; $n12+=$row->n12;
			$n13+=$row->n13; $n14+=$row->n14; $n15+=$row->n15; $n16+=$row->n16; $n17+=$row->n17; $n18+=$row->n18;
			$n19+=$row->n19; $n20+=$row->n20; $n21+=$row->n21; $n22+=$row->n22;
			$persen=0;
			if ($row->nilai!=0)
			{	
				$persen=($row->nilai/$row->n22)*100;
			}
			
		echo "<tr>
    <td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n14,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n15,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n16,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n17,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n18,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n19,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n20,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n21,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n22,0,',','.')."</td>
    
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' colspan='2' align='center'>Total</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n4,0,',','.')."</td>
     <td class='header_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n12,0,',','.')."</td>
     <td class='header_laporan' align='right'>".number_format($n13,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n14,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n15,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n16,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n17,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n18,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($n19,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n20,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n21,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n22,0,',','.')."</td>
   
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
