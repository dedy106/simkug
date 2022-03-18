<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_simlog_rptNego extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_pesan,i.tanggal,i.no_dokumen,i.keterangan,a.kode_pp,b.nama as nama_pp,
		a.kode_akun,c.nama as nama_akun,e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek,a.no_spph,
		h.kode_vendor,h.nama as nama_vendor,g.no_sph,i.no_nego,j.nama as proyek
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join lokasi e on a.lok_proses=e.kode_lokasi
inner join log_spph_m f on a.no_spph=f.no_spph and a.kode_lokasi=f.kode_lokasi
inner join log_sph_m g on f.no_spph=g.no_spph and f.kode_lokasi=g.kode_lokasi
inner join vendor h on g.kode_vendor=h.kode_vendor and g.kode_lokasi=h.kode_lokasi
inner join log_nego_m i on g.no_nego=i.no_nego and g.kode_lokasi=i.kode_lokasi
left join log_proyek j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
$this->filter
order by i.no_nego";
		
		$rs = $dbLib->execute($sql);		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("klarifikasi dan negosiasi harga",$this->lokasi," ");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_nego</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		 <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Vendor </td>
        <td class='header_laporan'>:&nbsp;$row->nama_vendor</td>
      </tr>
		 <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	    <tr>
        <td class='header_laporan' width='114'>No SPH </td>
        <td class='header_laporan'>:&nbsp;$row->no_sph</td>
        </tr>
		 <tr>
        <td class='header_laporan' width='114'>No SPPH </td>
        <td class='header_laporan'>:&nbsp;$row->no_spph</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>No Justifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
        </tr>
		<tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->nama_pp</td>
	  </tr>
	  <tr>
	  <td class='header_laporan'>Proyek</td>
	  <td class='header_laporan'>:&nbsp;$row->proyek</td>
	</tr>
      <tr>
        <td class='header_laporan'>Akun Anggaran </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>

	 
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Kode Barang</td>
	<td width='150' align='center' class='header_laporan'>Nama Barang</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='200' align='center' class='header_laporan'>Spesifikasi</td>
	 <td width='40' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
     <td width='90' align='center' class='header_laporan'>PPN</td>
	  <td width='90' align='center' class='header_laporan'>Total</td>
	<td width='90' align='center' class='header_laporan'>Nilai Nego</td>
     <td width='90' align='center' class='header_laporan'>PPN Nego</td>
	  <td width='90' align='center' class='header_laporan'>Total Nego</td>
  </tr>";
			$sql1="select b.kode_klpfa,d.nama as nama_klp,a.item,a.merk,a.tipe,a.catatan,a.nilai,a.jumlah,
			a.nilai_nego,a.ppn,a.ppn_nego,(a.nilai*a.jumlah)+a.ppn as total,(a.nilai_nego*a.jumlah)+a.ppn_nego as total_nego
from log_sph_d a
inner join log_spph_d b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.no_urut
inner join log_pesan_m c on b.no_spph=c.no_spph and b.kode_lokasi=c.kode_lokasi
inner join fa_klp d on b.kode_klpfa=d.kode_klpfa and b.kode_lokasi=d.kode_lokasi and c.kode_akun=d.kode_klpakun
where a.no_sph='$row->no_sph'
order by d.kode_klpfa ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $total=0; $total_nego=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$total=$total+$row1->total;
				$total_nego=$total_nego+$row1->total_nego;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td  class='isi_laporan'>$row1->kode_klpfa</td>
	<td  class='isi_laporan'>$row1->nama_klp</td>
    <td  class='isi_laporan'>$row1->item</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->catatan</td>
   <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row1->ppn,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->nilai_nego,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row1->ppn_nego,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total_nego,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='7' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
	 <td colspan='2' align='center'  class='header_laporan'>&nbsp;</td>
    <td  align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
	 <td colspan='2' align='center'  class='header_laporan'>&nbsp;</td>
    <td  align='right' class='header_laporan'>".number_format($total_nego,0,",",".")."</td>
  </tr>
  </table><br>
  ";
  

  echo"<br>
  <br>
  <table  align='left' border='1' cellpadding='0' cellspacing='0' class='kotak' width='800'>
  <tr bgcolor='#CCCCCC'>
  <td width='138' align='center' class='header_laporan'>Nama</td>
  <td width='198' align='center' class='header_laporan'>Jabatan</td>
  <td width='200' align='center' class='header_laporan'>Tanda Tangan</td>
</tr>";
		  $sql2="select a.nama,a.jabatan
from log_nego_ttd a
where a.no_nego='$row->no_nego'
order by a.nu ";

		  
		  $rs2 = $dbLib->execute($sql2);
		  while ($row2 = $rs2->FetchNextObject($toupper=false))
		  {
			  echo "<tr>
  <td  class='isi_laporan'>$row2->nama</td>
  <td  class='isi_laporan'>$row2->jabatan</td>
  <td height='50' class='isi_laporan'> </td>
</tr>";	

			  $k=$k+1;
		  }
echo"</table>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
