<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPdptGrossPic extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$kode_pic=$tmp[3];
		$tahun=substr($periode,0,4);
		$bulan=substr($periode,4,2);
		$tahun_rev=$tahun-1;
		if ($bulan=="01" || $bulan=="02" || $bulan=="03")
		{
			$tw="TW I";
		}
		if ($bulan=="04" || $bulan=="05" || $bulan=="06")
		{
			$tw="TW II";
		}
		if ($bulan=="07" || $bulan=="08" || $bulan=="09")
		{
			$tw="TW III";
		}
		if ($bulan=="10" || $bulan=="11" || $bulan=="12")
		{
			$tw="TW IV";
		}
		if ($bulan=="01") {$bulan="JANUARI";};
		if ($bulan=="02") {$bulan="FEBRUARI";};
		if ($bulan=="03") {$bulan="MARET";};
		if ($bulan=="04") {$bulan="APRIL";};
		if ($bulan=="05") {$bulan="MEI";};
		if ($bulan=="06") {$bulan="JUNI";};
		if ($bulan=="07") {$bulan="JULI";};
		if ($bulan=="08") {$bulan="AGUSTUS";};
		if ($bulan=="09") {$bulan="SEPTEMBER";};
		if ($bulan=="10") {$bulan="OKTOBER";};
		if ($bulan=="11") {$bulan="NOVEMBER";};
		if ($bulan=="12") {$bulan="DESEMBER";};
		if ($bulan=="13") {$bulan="DESEMBER";};
		if ($kode_lokasi=="00") {$cabang="KANTOR PUSAT";};
		if ($kode_lokasi=="01") {$cabang="KANTOR JAKARTA";};
		if ($kode_lokasi=="02") {$cabang="KANTOR BANDUNG";};
		if ($kode_lokasi=="03") {$cabang="KANTOR SEMARANG";};
		if ($kode_lokasi=="04") {$cabang="KANTOR SURABAYA";};
		
		$sql="exec sp_dw_produksi_pic '$kode_lokasi','$periode','$nik_user';";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo "<table width='1000' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='1100' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'><span class='style16'>PT. Sarana Janesia Utama </span></td>
      </tr>
      <tr>
        <td align='center' class='lokasi_laporan2'>PENDAPATAN USAHA S/D BULAN $bulan $tahun (GROSS)</td>
      </tr>
      <tr>
        <td align='center' class='style16'>$cabang </td>
      </tr>
    
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='3' class='header_laporan'>No</td>
        <td width='350' colspan='4' rowspan='3' class='header_laporan'>JENIS ASURANSI</td>
        <td colspan='3' class='header_laporan'>Anggaran</td>
        <td  rowspan='2' class='header_laporan'>REALISASI SD $bulan $tahun </td>
		<td width='100' rowspan='2' class='header_laporan'>REALISASI SD $bulan $tahun_rev</td>
        <td colspan='4' class='header_laporan'>PROSENTASE</td>
        </tr>
      <tr bgcolor='#dbeef3'>
        <td align='center' class='header_laporan'>RKAP $tahun </td>
		<td align='center' class='header_laporan'>RKAP $tw </td>
        <td align='center' class='header_laporan'>S/D $tw </td>
		<td colspan='2' align='center' class='header_laporan'>PENCAPAIAN </td>
		<td align='center' class='header_laporan'>GROWTH</td>
        </tr>
      <tr bgcolor='#dbeef3'>
        <td width='100' align='center' class='header_laporan'>(1)</td>
        <td width='100' align='center' class='header_laporan'>()</td>
		 <td width='100' align='center' class='header_laporan'>(2)</td>
        <td width='100' align='center' class='header_laporan'>(3)</td>
        <td width='100' align='center' class='header_laporan'>(4)</td>
		<td width='50'  align='center' class='header_laporan'>(3)/(1)</td>
        <td width='50' align='center' class='header_laporan'>(3)/(2)</td>
        <td width='50' align='center' class='header_laporan'>(3)/(4)</td>
      </tr>
    
	  ";
		$sql="select a.kode_klp,a.nama,a.kode_lokasi
from sju_tipe_klp a
inner join (select a.kode_lokasi,a.kode_klp
			from dw_produksi_pic a
			$this->filter and a.nik_user='$nik_user'
			group by a.kode_lokasi,a.kode_klp
			)b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' ";
		
		$rs=$dbLib->execute($sql);
		$sum_n1=0; $sum_n2=0; $sum_n3=0; $sum_n4=0; $sum_n5=0;  $sum_n7=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
        <td>&nbsp;</td>
        <td colspan='11' class='header_laporan'>$row->kode_klp - $row->nama</td>
        </tr>";
			$sql="select a.kode_lokasi,a.kode_cust,a.kode_pic,b.nama as nama_cust,c.nama as nama_pic,
			a.n1 as n1,a.n2 as n2,a.n3*-1 as n3,a.n4 as n4,a.n5*-1 as n5,a.n6 as n6,a.n7
from dw_produksi_pic a
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi
$this->filter and  a.nik_user='$nik_user' and a.kode_klp='$row->kode_klp' and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0 or a.n5<>0 or a.n6<>0)
order by a.kode_cust,a.kode_pic
 ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$n1=0; $n2=0; $n3=0; $n4=0; $n5=0;  $n7=0;  
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$n1+=$row1->n1;
				$n2+=$row1->n2;
				$n3+=$row1->n3;
				$n4+=$row1->n4;
				$n5+=$row1->n5;
				$n7+=$row1->n7;
				
				
				$persen1="";$persen2="";$persen3="";$persen4="";
				if ($row1->n1>0)
				{
					$persen1=($row1->n3/$row1->n1)*100;
				}
				if ($row1->n2>0)
				{
					$persen2=($row1->n3/$row1->n2)*100;
				}
				if ($row1->n5>0)
				{
					$persen3=(($row1->n3/$row1->n5)*100)-100;
				}
			
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->kode_cust</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->kode_pic</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."</td>
			  </tr>";
				$i=$i+1;
			
			 }
				$persen1="";$persen2="";$persen3="";$persen4="";
				if ($n1>0)
				{
					$persen1=($n3/$n1)*100;
				}
				if ($n2>0)
				{
					$persen2=($n3/$n2)*100;
				}
				if ($n5>0)
				{
					$persen3=(($n3/$n5)*100)-100;
				}
				
      echo "<tr>
        <td colspan='5' align='center' class='header_laporan'>Sub Total</td>
        <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."</td>
      </tr>";
				$sum_n1+=$n1;
				$sum_n2+=$n2;
				$sum_n3+=$n3;
				$sum_n4+=$n4;
				$sum_n5+=$n5;
				$sum_n7+=$n7;
		}
		$persen1="";$persen2="";$persen3="";$persen4="";
		if ($sum_n3>0)
		{
			$persen1=($sum_n3/$sum_n1)*100;
		}
		if ($sum_n2>0)
		{
			$persen2=($sum_n3/$sum_n2)*100;
		}
		if ($sum_n5>0)
		{
			$persen3=(($sum_n3/$sum_n5)*100)-100;
		}
		
      echo "<tr>
         <td colspan='5' align='center' class='header_laporan'>TOTAL</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n1,0,',','.')."</td>
		 <td class='isi_laporan' align='right'>".number_format($sum_n7,0,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($sum_n2,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n3,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n5,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
