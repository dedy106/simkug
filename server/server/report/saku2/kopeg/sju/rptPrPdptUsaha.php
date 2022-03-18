<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrPdptUsaha extends server_report_basic
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
		$tahun=substr($periode,0,4);
		$bulan=substr($periode,4,2);
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
		$sql="exec sp_sju_pdpt_net '$kode_lokasi','$periode','$nik_user';";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo "<table width='1000' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='1000' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>ISPRD</td>
      </tr>
      <tr>
        <td class='style16'>$this->lokasi</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>LAPORAN PENDAPATAN USAHA </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>PERIODE : $bulan $tahun </td>
        <td>&nbsp;</td>
      </tr>
    
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='3' class='header_laporan'>No</td>
        <td width='250' rowspan='3' class='header_laporan'>Jenis Asuransi </td>
        <td colspan='2' class='header_laporan'>Anggaran</td>
        <td colspan='4' class='header_laporan'>Realisasi SD $bulan $tahun </td>
        <td colspan='3' rowspan='2' class='header_laporan'>Prosentase</td>
        </tr>
      <tr bgcolor='#dbeef3'>
        <td align='center' class='header_laporan'>RKAP $tahun </td>
        <td align='center' class='header_laporan'>S/D $tw </td>
        <td align='center' class='header_laporan'>Brok Bruto </td>
        <td align='center' class='header_laporan'>Pemasaran</td>
        <td align='center' class='header_laporan'>Underwriting</td>
        <td align='center' class='header_laporan'>Brok Nett </td>
        </tr>
      <tr bgcolor='#dbeef3'>
        <td width='100' align='center' class='header_laporan'>(1)</td>
        <td width='100' align='center' class='header_laporan'>(2)</td>
        <td width='100' align='center' class='header_laporan'>(3)</td>
        <td width='100' align='center' class='header_laporan'>(4)</td>
        <td width='100' align='center' class='header_laporan'>(5)</td>
        <td width='100' align='center' class='header_laporan'>(6)</td>
        <td width='50' align='center' class='header_laporan'>4+5 / 3 </td>
        <td width='50' align='center' class='header_laporan'>3/1</td>
        <td width='50' align='center' class='header_laporan'>3/2</td>
      </tr>";
		$sql="select a.kode_klp,a.nama,a.kode_lokasi
from sju_tipe_klp a
inner join (select a.kode_lokasi,a.kode_klp
			from sju_pdpt_net a
			where a.nik_user='$nik_user'
			group by a.kode_lokasi,a.kode_klp
			)b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'";
		
		$rs=$dbLib->execute($sql);
		$sum_n5=0; $sum_tot_nilai_tw=0; $sum_n6=0; $sum_net=0; $sum_n7=0; $sum_n8=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
        <td>&nbsp;</td>
        <td colspan='10' class='header_laporan'>$row->kode_klp - $row->nama</td>
        </tr>";
			$sql="select a.kode_lokasi,a.kode_cust,b.nama as nama_cust,n1,n2,n3,n4,n5,n6,n7,n8,n6-n7-n8 as net
from sju_pdpt_net a
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' and a.kode_klp='$row->kode_klp' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_cust
 ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$n5=0; $tot_nilai_tw=0; $n6=0; $net=0; $n7=0; $n8=0;
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$n5+=$row1->n5;
				$tot_nilai_tw+=$row1->nilai_tw;
				$n6+=$row1->n6;
				$net+=$row1->net;
				$n7+=$row1->n7;
				$n8+=$row1->n8;
				
				$sum_n5+=$row1->n5;
				$sum_tot_nilai_tw+=$row1->nilai_tw;
				$sum_n6+=$row1->n6;
				$sum_net+=$row1->net;
				$sum_n7+=$row1->n7;
				$sum_n8+=$row1->n8;
				if ($tw=="TW I")
				{
					$nilai_tw=$row1->n1;
				}
				if ($tw=="TW II")
				{
					$nilai_tw=$row1->n2;
				}
				if ($tw=="TW III")
				{
					$nilai_tw=$row1->n3;
				}
				if ($tw=="TW IV")
				{
					$nilai_tw=$row1->n4;
				}
				$persen1="";$persen2="";$persen3="";
				if ($row1->n6>0)
				{
					$persen1=(($row1->n7+$row1->n8)/$row1->n6)*100;
				}
				if ($row1->n5>0)
				{
					$persen2=($row1->n6/$row1->n5)*100;
				}
				if ($nilai_tw>0)
				{
					$persen3=($row1->n6/$nilai_tw)*100;
				}
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($nilai_tw,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->net,2,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
			
			 }
			
      echo "<tr>
        <td colspan='2' align='center' class='header_laporan'>Jumlah</td>
        <td class='isi_laporan' align='right'>".number_format($n5,2,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($tot_nilai_tw,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n6,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n7,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n8,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($net,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
      </tr>";
				$tot_total+=$total;
				$tot_n_premi+=$n_premi;
				$tot_n_fee+=$n_fee;
				$tot_ppn+=$ppn;
				$tot_pph+=$pph;
		}
		
      echo "<tr>
         <td colspan='2' align='center' class='header_laporan'>Jumlah</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n5,2,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($sum_tot_nilai_tw,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n6,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n7,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_n8,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($sum_net,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."</td>
		<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
