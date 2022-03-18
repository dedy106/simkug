<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggLembur extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_lembur)
from agg_lembur_m a $this->filter ";
		error_log($sql);
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		
		$sql="select a.no_lembur,a.tahun,a.nilai
from agg_lembur_m a $this->filter
order by a.no_lembur";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("lembur",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_lembur</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
    <td width='40' align='center' class='header_laporan'>Band</td>
	<td width='60' align='center' class='header_laporan'>Jumlah Lembur</td>
	<td width='80' align='center' class='header_laporan'>Nilai Uang Lembur</td>
	 <td width='60' align='center' class='header_laporan'>Jumlah Uang Makan</td>
    <td width='80' align='center' class='header_laporan'>Nilai Uang Makan</td>
    <td width='90' align='center' class='header_laporan'>Total </td>

  </tr>";
			$sql1="select a.nik,b.nama,a.band,sum(a.jumlah_jam) as jumlah_jam,sum(a.jml_umakan) as jml_umakan,
	   sum(a.nilai_ul) as nilai_ul,sum(a.nilai_uml) as nilai_uml,sum(a.total) as total
from agg_lembur_d a 
inner join agg_karyawan b on a.nik=b.nik and a.tahun=b.tahun
where a.no_lembur='$row->no_lembur' and a.total<>0
group by a.nik,b.nama,a.band
order by a.nik";

			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah_jam=0; $jml_umakan=0; $total=0;$nilai_ul=0; $nilai_uml=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah_jam=$jumlah_jam+$row1->jumlah_jam;
				$jml_umakan=$jml_umakan+$row1->jml_umakan;
				$total=$total+$row1->total;
				$nilai_ul=$nilai_ul+$row1->nilai_ul;
				$nilai_uml=$nilai_uml+$row1->nilai_uml;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->nik</td>
    <td class='isi_laporan'>$row1->nama</td>
	<td class='isi_laporan'>$row1->band</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->jumlah_jam,0,",",".")."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->nilai_ul,0,",",".")."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->jml_umakan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row1->nilai_uml,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' class='isi_laporan' align='right'>Total</td>
	<td  class='isi_laporan' align='right' >".number_format($jumlah_jam,0,",",".")."</td>
	<td  class='isi_laporan' align='right'>".number_format($nilai_ul,0,",",".")."</td>
    <td  class='isi_laporan' align='right'>".number_format($jml_umakan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_uml,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
  </tr>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
