<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPemenang extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
    $sql="select h.nama as pp,g.no_pesan,a.no_spph,a.no_tap,e.id_sph,e.item,e.catatan,a.periode,a.nik_ttd2,d.nama as nama_ttd2,
    a.nik_buat,c.nama as nama_buat,a.kode_lokasi,
    convert(varchar,a.tanggal,103) as tgl,a.alasan
    from log_tap_m a
    inner join log_nego_m b on a.kode_lokasi=b.kode_lokasi and a.no_tap=b.no_tap
    inner join log_sph_d e on a.kode_lokasi=e.kode_lokasi and b.no_sph=e.no_sph
	inner join log_sph_m f on e.kode_lokasi=f.kode_lokasi and f.no_sph=e.no_sph
	inner join log_pesan_m g on f.no_spph=g.no_spph and f.kode_lokasi=g.kode_lokasi
    inner join karyawan c on a.kode_lokasi=c.kode_lokasi and a.nik_buat=c.nik
    inner join karyawan d on a.kode_lokasi=d.kode_lokasi and a.nik_ttd2=d.nik
	inner join pp h on g.kode_lokasi=h.kode_lokasi and g.kode_pp=h.kode_pp
     $this->filter ";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/gratika2.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$alasan=urldecode($row->alasan);

			// $logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nama_lokasi=strtoupper($row->nama_lokasi);
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='left'><img src='$logo' width='251' height='100'></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>KERTAS KERJA ANALISIS HARGA </td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>NO : $row->no_tap</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
		<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
		 
		  <tr>
		  <td width='200'  height='20' class='isi_bukti'>Nomor Bukti</td>
		  <td width='600' class='isi_bukti'>: $row->no_pesan </td>
  </tr>
		<tr>
		<td  height='20' class='isi_bukti'>Pengguna</td>
		<td class='isi_bukti'>: $row->pp </td>
	  </tr>
	  <tr>
	  <td  height='20' class='isi_bukti'>Nama Barang</td>
	  <td class='isi_bukti'>: $row->item </td>
	</tr>
	<tr>
	<td  height='20' class='isi_bukti'>Spesifikasi</td>
	<td class='isi_bukti'>: $row->catatan </td>
	</tr>
	<tr>
	<td  height='20' class='isi_bukti'>Tanggal Penggunaan</td>
	<td class='isi_bukti'>: $row->tgl </td>
	</tr>
	<tr>
	<td height='20' class='isi_bukti' valign='top'>Justifikasi </td>
	<td class='isi_bukti' valign='top'>$alasan</td>

	</tr>
	
	 
</table></td>
  </tr>

  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO</td>
        <td width='300' align='center' class='isi_bukti'>NAMA</td>
        <td width='250' align='center' class='isi_bukti'>NO. NEGO</td>
        <td width='90' align='center' class='isi_bukti'>NILAI TAWAR</td>
        <td width='90' align='center' class='isi_bukti'>NILAI FINAL</td>
        <td width='90' align='center' class='isi_bukti'>PPN FINAL</td>
        <td width='90' align='center' class='isi_bukti'>TOTAL FINAL</td>
        <td width='100' align='center' class='isi_bukti'>STATUS</td>

      </tr>";
    $sql1="select d.no_pesan,date_format(d.tanggal,'%d/%m/%Y') as tgl,a.no_spph,c.kode_vendor,c.nama,b.no_nego,b.keterangan,a.nilai as nilai_tawar,b.nilai as nilai_final,
    b.ppn as ppn_final, b.nilai + b.ppn as total_final,  a.modul,a.kode_curr ,CASE WHEN b.no_tap<>'-' THEN c.nama END as menang,
    CASE WHEN b.no_tap='-' THEN '-' else 'PEMENANG' END as status
        from log_sph_m a 
        inner join log_nego_m b on a.no_nego=b.no_nego and a.kode_lokasi=b.kode_lokasi 
        inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi  
        inner join log_pesan_m d on a.no_spph=d.no_spph and a.kode_lokasi=d.kode_lokasi  
    where a.no_spph='$row->no_spph' and a.kode_lokasi='$row->kode_lokasi' ";

	
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$nilai=0;$npajak=0;$netto=0; $vendor="";
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			if ($row1->status=="PEMENANG"){
				$vendor=$row1->menang;
			}
			
			// $npajak+=$row1->npajak;
			// $netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
        <td class='isi_bukti'>$row1->nama</td>     
        <td class='isi_bukti'>$row1->no_nego</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai_tawar,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai_final,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->ppn_final,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->total_final,0,",",".")."</td>
        <td class='isi_bukti'>$row1->status</td>

      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='9' align='left' class='isi_bukti'>Catatan / Kesimpulan : Dengan ini maka dinyatakan bahwa yang terpilih sebagai Mitra dalam pengadaan ini adalah : <b> $vendor </b> </td>
      </tr>
  
</td>
</tr>
</table>

  <tr>
<td>
<tr ><table align='center' width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
<td>Jakarta, ".$row->tgl."</td>
</tr>
  <tr>
    <td width='200'  align='left' class='isi_bukti'>Dibuat oleh,</td>
    <td width='200'  class='isi_bukti'>Disetujui oleh,  </td>
  </tr>

  <tr>
    <td height='60'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>

  </tr>
  <tr>
    <td class='isi_bukti'  align='left'><u>$row->nama_buat</u></td>
    <td class='isi_bukti' ><u>$row->nama_ttd2</u></td>
  </tr>
  <tr>
    <td class='isi_bukti'  align='left'>NIP : $row->nik_buat</td>
    <td class='isi_bukti' >NIP : $row->nik_ttd2</td>
  </tr>


 <br>

 <tr>
 <td>
   <tr>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
   </tr>
   </td>
   </tr>
   </table>

   <tr><table align='center' width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
   <td  align='left'  height='20' class='isi_bukti'><b>Keterangan : </b> </td>
 </tr>
 <tr>
 <td  height='20' class='isi_bukti'> - Dokumen ini dibuat sebagai kertas kerja oleh Bagian Procurement</td>
</tr>
<tr>
<td  height='20' class='isi_bukti'>- Spesifikasi Barang : diisi dengan kecocokan antara spesifikasi barang yang diajukan dengan yang diminta, jadi misalnya diisi dengan OK</td>
</tr>
<tr>
<td  height='20' class='isi_bukti'>- Tanggal Kirim : diisi dengan tanggal kesediaan supplier mengirim atau menyediakan barang.</td>
</tr>

<tr>
<td  height='20' class='isi_bukti'> - Dokumen ini dibuat sebanyak 1 (satu) lembar dan diarsip di Bagian Procurement.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>

<br>

  <tr>
    <td>&nbsp;</td>

</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
