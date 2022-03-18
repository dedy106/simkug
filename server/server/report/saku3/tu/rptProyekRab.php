<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekRab extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$sql="select a.no_rab,a.kode_lokasi,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_cust,c.nama as nama_cust,a.nilai,a.tanggal,
	   a.kode_jenis,d.nama as nama_jenis,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
	   e.nama as nama_app, f.nama as nama_buat
from tu_rab_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join tu_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
inner join karyawan f on a.nik_buat=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan e on a.nik_app=e.nik
$this->filter 
order by a.no_rab";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("rencana anggaran biaya (rab)",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>
			<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='800'>
   <tr >
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>No Bukti  </td>
                    <td class='header_laporan' >:&nbsp;$row->no_rab </td>
                  </tr>
				  <tr>
                    <td class='header_laporan' width='100'>Kode PP  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_pp - $row->nama_pp </td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Jenis</td>
                    <td class='header_laporan'>:&nbsp;$row->nama_jenis</td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Keterangan </td>
                    <td class='header_laporan'>:&nbsp;$row->keterangan</td>
                  </tr>
				 
				    <tr>
                    <td class='header_laporan' width='100'>Jangka Waktu  </td>
                    <td class='header_laporan' >:&nbsp;$row->tgl_mulai - $row->tgl_selesai </td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Mitra </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_cust - $row->nama_cust</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nilai Proyek</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,',','.')."</td>
                  </tr>
				  
				 
                </table></td>
     </tr>
 

  <tr bgcolor='#CCCCCC'>
    <td width='30' height='23' class='header_laporan' align='center'>No</td>
    <td width='300' class='header_laporan' align='center'>Komponen Kegiatan</td>
	 <td width='60' class='header_laporan' align='center'>Volume</td>
	  <td width='90' class='header_laporan' align='center'>Harga Satuan</td>
	<td width='100' class='header_laporan' align='center'>Jumlah</td>
  </tr>
  <tr bgcolor='#CCCCCC'><td class='header_laporan' colspan='5'>Pendapatan</td>
  </tr>
  ";
			$sql="select a.nu,a.keterangan,a.jumlah,a.harga,a.total 
from tu_rab_d a
where a.no_rab='$row->no_rab' and a.kode_lokasi='$row->kode_lokasi' and jenis='PDPT'
order by a.nu
 ";
			
			$rs1 = $dbLib->execute($sql);
			
			$total=0; $j=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;	
			
				echo "<tr><td  class='isi_laporan' align='center'>$j </td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td  class='isi_laporan' align='center'>".number_format($row1->jumlah,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->harga,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->total,0,',','.')."</td>
			  </tr>";
				$j=$j+1;
			}
			echo "
  <tr bgcolor='#CCCCCC'>
	  <td class='header_laporan' colspan='4'>Total Pendapatan</td>
	  <td  class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	  <td class='header_laporan' colspan='5'>Beban</td>
  </tr>
  ";
			$sql="select a.nu,a.keterangan,a.jumlah,a.harga,a.total 
from tu_rab_d a
where a.no_rab='$row->no_rab' and a.kode_lokasi='$row->kode_lokasi' and jenis='BEBAN'
order by a.nu
 ";
			
			$rs1 = $dbLib->execute($sql);
			
			$total=0; $j=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;	
			
				echo "<tr><td  class='isi_laporan' align='center'>$j </td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td  class='isi_laporan' align='center'>".number_format($row1->jumlah,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->harga,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->total,0,',','.')."</td>
			  </tr>";
				$j=$j+1;
			}
			echo "
	<tr bgcolor='#CCCCCC'>
	  <td class='header_laporan' colspan='4'>Total Beban</td>
	  <td  class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>
	<tr bgcolor='#CCCCCC'>
	  <td class='header_laporan' colspan='4' class='isi_laporan'>SHARE TEL U</td>
	  <td  class='isi_laporan' align='right'>".number_format($row->nilai-$total,0,',','.')."</td>
  </tr>
 
 </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan' >Terbilang : <i>".$AddOnLib->terbilang($total)." </i></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='509'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        <td width='281'>&nbsp;</td>
      </tr>
      <tr>
        <td>Mengetahui</td>
        <td>Pembuat Rincian </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_app</td>
        <td>$row->nama_buat</td>
      </tr>
    </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
