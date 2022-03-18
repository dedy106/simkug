<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rtrw_rptKartuRutin extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$kode_lokasi=$tmp[3];
		$sql = "select 1 ";
		
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$kode_rumah=$tmp[3];
		$jenis=$tmp[4];
		
		$sql = "select a.kode_rumah,b.nama,a.rt,c.nama as nama_rt,a.kode_lokasi
				from rt_rumah a 
				inner join rt_warga b on a.kode_penghuni=b.nik
				inner join pp c on a.rt=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
				$this->filter order by a.kode_rumah ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";

			echo $AddOnLib->judul_laporan("kartu iurang rutin",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$sql2=" and a.periode='$periode' ";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='8' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Rumah  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_rumah</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Penghuni </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>RT </td>
                    <td class='header_laporan'>:&nbsp;$row->nama_rt</td>
                  </tr>
                </table></td>
     </tr>
 
 
  <tr bgcolor='#CCCCCC'>
	<td width='30' class='header_laporan' align='center'>No</td>
    <td width='60' class='header_laporan' align='center'>Periode</td>
    <td width='100' class='header_laporan' align='center'>Jenis</td>
    <td width='90' class='header_laporan' align='center'>Iuran RT</td>
    <td width='90' class='header_laporan' align='center'>Iurang RW</td>
		<td width='90' class='header_laporan' align='center'>Bayar RT</td>
		<td width='90' class='header_laporan' align='center'>Bayar RW</td>
		<td width='100' class='header_laporan' align='center'>No Bukti</td>
  </tr>";
			$sql="select a.kode_rumah,a.periode,a.kode_lokasi,a.nilai_rt,a.nilai_rw,b.no_angs,b.kode_jenis,'-' as tgl,
									 isnull(b.nilai_rt,0) as bayar_rt,isnull(b.nilai_rw,0) as bayar_rw
from rt_bill_d a
left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi and a.periode=b.periode_bill and a.kode_jenis=b.kode_jenis
left join trans_m c on b.no_angs=c.no_bukti and b.kode_lokasi=c.kode_lokasi 
where a.kode_lokasi='$row->kode_lokasi' and a.kode_rumah='$row->kode_rumah'  
order by a.periode ";
		
			$rs1 = $dbLib->execute($sql);
			
			$nilai_rt=0; $bayar_rt=0;
			$nilai_rw=0; $bayar_rw=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_rt+=$row1->nilai_rt;
				$nilai_rw+=$row1->nilai_rw;	
				$bayar_rt+=$row1->bayar_rt;	
				$bayar_rw+=$row1->bayar_rw;	
				echo "<tr>
					<td  class='isi_laporan' align='center'>$i</td>
					<td  class='isi_laporan'>$row1->periode</td>		
    <td  class='isi_laporan'>$row1->kode_jenis</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai_rt,0,',','.')."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai_rw,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->bayar_rt,0,',','.')."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->bayar_rw,0,',','.')."</td>
			<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_angs','$row->kode_lokasi');\">$row1->no_angs</a>";
				echo "</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td  colspan='3'  class='header_laporan' align='right'>Jumlah&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_rt,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_rw,0,',','.')."</td>
	 <td  class='header_laporan' align='right'>".number_format($bayar_rt,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($bayar_rw,0,',','.')."</td>
 </tr>
 		<tr>
   <td  colspan='7'  class='header_laporan' align='right'>Saldo Iuran RT&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_rt-$bayar_rt,0,',','.')."</td>
 </tr>
 		<tr>
    <td  colspan='7'  class='header_laporan' align='right'>Saldo Iuran Rw&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_rw-$bayar_rw,0,',','.')."</td>
 </tr>
 </table><br>";
			
		}
		echo "</center>";
		return "";
	}
	
}
?>
