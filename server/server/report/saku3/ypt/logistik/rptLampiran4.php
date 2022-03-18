<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptLampiran4 extends server_report_basic
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
		$sql="select a.no_pesan,convert(varchar,a.tanggal,103) as tanggal,
    a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp, a.kode_akun,
    c.nama as nama_akun,e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek,h.jenis,
    a.kode_drk,a.saldo_gar,a.nilai 
    from log_pesan_m a 
    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    inner join lokasi e on a.lok_proses=e.kode_lokasi
     inner join log_justerima_m h on a.no_terima=h.no_terima and h.kode_lokasi=a.kode_lokasi

$this->filter
order by a.no_pesan";



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
			// $logo="image/".$row->logo;
			$alamat=$row->alamat;
      $nama_lokasi=strtoupper($row->nama_lokasi);
      $maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>

  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td  width='200' class='isi_bukti'>Lampiran IV</td>
        <td class='isi_bukti'>: Keputusan Dewan Pengurus Yayasan Pendidikan TELKOM  </td>
      </tr>
      <tr>
        <td  width='200' class='isi_bukti'>Nomor</td>
        <td class='isi_bukti'>: KEP.0808/00/DGS-HK01/YPT/2018 </td>
      </tr>
      <tr>
        <td  width='200' class='isi_bukti'>Tanggal</td>
        <td class='isi_bukti'>: $row->tanggal </td>
      </tr>
      <tr>
        <td  width='200' class='isi_bukti'>Perihal</td>
        <td class='isi_bukti'>: Pedoman Pengadaan Barang dan atau Jasa di Lingkungan Yayasan Pendidikan TELKOM </td>
      </tr>
      </table></td>
  </tr>
      <tr>
      <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <td><hr /></td>
  </tr>
  <tr>
  <td height='30' align='center' valign='middle' class='judul_bukti'>JUSTIFIKASI KEBUTUHAN BARANG DAN ATAU JASA</td>
</tr>
<tr>
<td><hr /></td>
</tr>
</table></td>
</tr>   
  <tr>
    <td>&nbsp;</td>
  </tr>

  
  <tr>
  <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    
    <tr>
      <td   width='300' class='isi_bukti'>1. Unit Kerja</td>
      <td class='isi_bukti'>: $row->nama_pp </td>
    </tr>
    <tr>
      <td  width='300' class='isi_bukti'>2. Nama Kegiatan</td>
      <td class='isi_bukti'>: $row->keterangan </td>
    </tr>
    <tr>
      <td  width='300' class='isi_bukti'>3. Jenis Anggaran / Tahun</td>
      <td class='isi_bukti'>: $row->jenis </td>
    </tr>
 
    <tr>
      <td  width='300' class='isi_bukti'>4. No. & NAMA AKUN</td>
      <td class='isi_bukti'>: $row->kode_akun-$row->nama_akun  </td>
    </tr>
    <tr>
    <td  width='300' class='isi_bukti'>5. Anggaran Dibutuhkan</td>
    <td class='isi_bukti'>: Rp ".number_format($row->saldo_gar,0,",",".")." </td>
  </tr>  
  
  
  </table></td>
</tr>

<tr>
      <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <td><hr /></td>
  </tr>

</table></td>
</tr>   

<tr>
<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
  
  <tr>
    <td   width='300' class='isi_bukti'>1.LATAR BELAKANG</td>
  </tr>
  <tr>
    <td class='isi_bukti'>:  </td>
  </tr>
  
<tr>
  <td  width='300' class='isi_bukti'>2. SPESIFIKASI TEKNIS</td>
</tr>
<tr>
<td class='isi_bukti'>:  </td>
</tr>
 <tr>
<td  width='300' class='isi_bukti'>3.  METODA PENGADAAN</td>
</tr> 
<tr>
<td class='isi_bukti'>:  </td>
</tr>
<tr>
<td  width='300' class='isi_bukti'>4.  WAKTU PENGADAAN</td>
</tr>
<tr>
<td class='isi_bukti'>:   </td>
</tr>
<tr>
<td  width='300' class='isi_bukti'>5.  LAMPIRAN-LAMPIRAN</td>
</tr>
<tr>
<td class='isi_bukti'>:   </td>
</tr>

  <tr>
<td  width='300' class='isi_bukti'>9.  PENUTUP</td>
</tr>

</table></td>
</tr>

<tr>
      <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      
      <td class='isi_bukti'>Demikian bahwa justifikasi ini dibuat dengan sebenarnya.</td>
      
  </tr>

</table></td>
</tr> 

  <tr>
    <td>&nbsp;</td>
    <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center' class='header_laporan'>URAIAN</td>
        <td width='150' align='center' class='header_laporan'>NAMA/NIK</td>
        <td width='150' align='center' class='header_laporan'>JABATAN</td>
        <td width='80' align='center' class='header_laporan'>TANGGAL</td>
		<td width='80' align='center' class='header_laporan'>TANDA TANGAN</td>
      </tr>
      <tr>
      <td class='header_laporan'  align='left'>Dibuat Oleh</td>
      <td class='header_laporan' align='center'>...</td>
      <td class='header_laporan' align='center'>...</td>
      <td class='header_laporan' align='center'>...</td>
      <td class='header_laporan' align='center'>...</td>
    </tr>
    <tr>
    <td class='header_laporan'  align='left'>Diperiksa Oleh</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
  </tr>
  <tr>
    <td class='header_laporan'  align='left'>Diketahui Oleh</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
  </tr>
  
  <tr>
    <td class='header_laporan'  align='left'>Disetujui Oleh</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
    <td class='header_laporan' align='center'>...</td>
  </tr>";

  echo "</table>";
  
  echo"<tr>
  <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    
    <tr>
    <td   width='300' class='isi_bukti' align='left' ><b>Catatan:</b></td>
    </tr>    
    <tr>
    <td class='isi_bukti'>&nbsp;-&nbsp;Sesuai dengan Nilai Kewenangan pada Lampiran-I</td>
    </tr>  
 
  </table></td>
</tr>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
