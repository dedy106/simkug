<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptHonorTransferDetailCek extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$jenis=$tmp[2];
		
		$nama_file="tranfer_".$periode.".xls";
		
		$sql="select value1 from spro where kode_lokasi='$kode_lokasi' and kode_spro='MAXFIAT'";
		
		$rs = $dbLib->execute($sql);		
		$row = $rs->FetchNextObject($toupper=false);
		$value1=$row->value1;
		
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,
	   CONVERT(varchar, a.tanggal, 103) as tgl_spb,f.logo,f.nama as nama_lokasi,
       a.nik_buat,b.nama as nama_buat,b.jabatan as jab_buat,
	   a.nik_fiat,c.nama as nama_fiat,c.jabatan as jab_fiat,
	   a.nik_bdh,d.nama as nama_bdh,d.jabatan as jab_bdh
from spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_fiat=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_bdh=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_spb ";
		
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
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo $AddOnLib->judul_laporan("YAYASAN PENDIDIKAN TELKOM","PEMBAYARAN TRANSFER","Nomor Bilyet : ".strtoupper($row->no_cek));
			
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
	   <tr bgcolor='#CCCCCC'>
		 <td width='100'  align='center' class='header_laporan'>REKENING</td>
		 <td width='30'  align='center' class='header_laporan'>PLUS</td>
		 <td width='90'  align='center' class='header_laporan'>NOMINAL</td>
		 <td width='30'  align='center' class='header_laporan'>CD</td>
		 <td width='30'  align='center' class='header_laporan'>NO</td>
		 <td width='150'  align='center' class='header_laporan'>NAMA</td>
		 <td width='100'  align='center' class='header_laporan'>BANK</td>
		 <td width='150'  align='center' class='header_laporan'>KET</td>
		 <td width='80'  align='center' class='header_laporan'>NO AGENDA</td>
		 <td width='100'  align='center' class='header_laporan'>NO SPB</td>
		 </tr>  ";
			$nilai=0;$nilai_ppn=0;$tagihan=0;
			$sql="select a.no_spb,a.no_pb,a.kode_lokasi,
	   case when substring(b.no_rek,1,1)='0' then ''''+b.no_rek else ''''+b.no_rek end as no_rek,
	   b.nilai,b.nama_rek,b.bank,b.nama as berita
from pbh_pb_m a
inner join pbh_rek b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.no_spb='$row->no_spb' 
order by b.bank,b.nama_rek";
			
			$rs1 = $dbLib->execute($sql);	
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
			echo "<tr>
				<td class='isi_laporan' >$row1->no_rek</td>
				<td class='isi_laporan' align='center' >+</td>
				<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>C</td>
				<td class='isi_laporan' align='center' >$i</td>
				<td class='isi_laporan' >$row1->nama_rek</td>
				<td class='isi_laporan' >$row1->bank</td>
				<td class='isi_laporan' >$row1->berita</td>
				<td class='isi_laporan' >$row1->no_aju</td>
				<td class='isi_laporan' >$row1->no_spb</td>
				</tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				</tr> </table>";
			echo "
				<br>
	
	<table width='800'>
  <tr>
    <td>";
	
		
	if ($row->nilai<$value1)
	{
	echo "<table  border='0' cellspacing='2' cellpadding='1'>
    <tr align='center'>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
      <tr>
      <td>&nbsp;</td>
        <td width='250' align='center' class='isi_bukti'>Yang Membuat</td>
        <td width='250' align='center' class='isi_bukti'>Yang Mengajukan</td>
        <td width='300' align='center' class='isi_bukti'>Fiatur</td>
      </tr>
          <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>

      </tr>
      <tr>
      <td>&nbsp;</td>
      <td class='isi_bukti' align='center'><u>$row->nama_buat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_buat)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_bdh)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_fiat)."</td>
      </tr>
    </table>";
	}
	else
	{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr align='center'>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
      <tr>
      <td>&nbsp;</td>
        <td width='200' align='center' class='isi_bukti'>Yang Membuat</td>
        <td width='200' align='center' class='isi_bukti'>Yang Mengajukan</td>
        <td width='200' align='center' class='isi_bukti'>Fiatur</td>
		<td width='200' align='center' class='isi_bukti'>Menyetujui</td>
      </tr>
          <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>

      </tr>
      <tr>
      <td>&nbsp;</td>
      <td class='isi_bukti' align='center'><u>$row->nama_buat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
		<td class='isi_bukti' align='center'><u>$row->nama_app2</u></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_buat)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_bdh)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_fiat)."</td>
		<td class='isi_bukti' align='center'>".strtoupper($row->jab_app2)."</td>
      </tr>
    </table>";
	}
	
	
	echo "</td></tr></table>";
  
			echo "<br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
