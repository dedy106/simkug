<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptSPerintah extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		
		
		$sql="select a.no_dokumen,a.tempat,a.dasar, a.nik_user,a.no_perintah, a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl, 
		a.keterangan, a.nik_buat, a.nik_app ,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,
		a.kode_kategori,b.nama as kat,c.nama as perintah,d.nama as buat,a.jum_hari,e.nama as kota
		from sp_perintah_m a 
          inner join sp_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi
          inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
          inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=c.kode_lokasi
          inner join sp_kota e on a.tempat=e.kode_kota and a.kode_lokasi=c.kode_lokasi

  $this->filter
  order by a.no_perintah ";
  

		$rs = $dbLib->execute($sql);
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Surat Perintah Input SPPD",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='150'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_perintah</td>
        </tr>

       <tr>
        <td class='header_laporan'>Kota </td>
        <td class='header_laporan'>:&nbsp;$row->kota</td>
      </tr>
	    <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
   	  <tr>
        <td class='header_laporan'>Dasar Perjalanan Dinas   </td>
        <td class='header_laporan'>:&nbsp;$row->dasar</td>
      </tr>   	
	  <tr>
        <td class='header_laporan'>Tanggal Mulai   </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_mulai</td>
      </tr>	  <tr>
        <td class='header_laporan'>Tanggal Selesai   </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_selesai</td>
      </tr> 
	  <tr>
        <td class='header_laporan'>Jumlah Hari   </td>
        <td class='header_laporan'>:&nbsp;$row->jum_hari</td>
      </tr>
	     	  <tr>
        <td class='header_laporan'>Kategori   </td>
        <td class='header_laporan'>:&nbsp;$row->kat</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
      <td width='20' align='center' class='header_laporan'>No</td>
      <td width='70' align='center' class='header_laporan'>Unit</td>
      <td width='200' align='center' class='header_laporan'>Nama Unit</td>
      <td width='60' align='center' class='header_laporan'>Nik Petugas</td>
      <td width='200' align='center' class='header_laporan'>Nama</td>
      <td width='80' align='center' class='header_laporan'>Jumlah Pengajuan</td>
  </tr>";

$sql1="
select a.kode_unit, b.nama, a.nik, c.nama as karyawan, a.jumlah 
							 from sp_perintah_d a 
							 inner join sp_unit b on a.kode_unit=b.kode_unit and a.kode_lokasi=b.kode_lokasi 
							 inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
               where a.no_perintah='$row->no_perintah' and a.kode_lokasi ='$row->kode_lokasi'

";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0;$tot=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tot=+$row1->jumlah;
          echo "
          <tr>
            <td align='center' class='isi_laporan'>$j</td>
            <td  class='isi_laporan'>$row1->kode_unit</td>
            <td class='isi_laporan'>$row1->nama</td>
            <td class='isi_laporan'>$row1->nik</td>
            <td class='isi_laporan'>$row1->karyawan</td>
            <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
          </tr>";		
				$j=$j+1;
			}
			echo " ";				

		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right'><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan'>Nik Pembuat,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>$row->buat</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.$row->nik_buat</td>
          </tr>
        </table></td>
		
        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan' class='header_laporan'>Nik Perintah,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>$row->perintah</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.$row->nik_app</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
