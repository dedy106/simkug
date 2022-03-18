<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptNpp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_npp)
from gr_npp_m a
inner join gr_npp_j b on a.no_npp=b.no_npp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik
inner join karyawan d on a.nik_setuju=d.nik $this->filter ";
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
		$sql = "select a.no_npp,a.kode_lokasi,a.no_dokumen,a.tanggal,a.keterangan,a.nilai-a.nilai_ppn as tagihan,a.kode_curr,
	   b.kode_akun,a.nik_buat,a.nik_setuju,a.nik_gar,c.nama as nama_buat,d.nama as nama_setuju,e.nama as nama_gar,a.nilai_ppn,a.nilai
from gr_npp_m a
inner join gr_npp_j b on a.no_npp=b.no_npp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik
inner join karyawan d on a.nik_setuju=d.nik
inner join karyawan e on a.nik_gar=e.nik
 $this->filter order by a.no_npp ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='103'><img src=$pathfoto width='80' height='99' /></td>
            <td width='687' align='center' class='istyle17'>NOTA PERMOHONAN PEMBAYARAN</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;&nbsp;Dimohon untuk melaksanakan pembayaran atas transaksi sbb :</td>
      </tr>
      <tr>
        <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='30' class='header_laporan'>NO.</td>
            <td width='130' class='header_laporan'>TRANSAKSI </td>
            <td width='220' class='header_laporan'>KONTRAK/ SPK/ SP </td>
            <td width='110' class='header_laporan'>NOMOR AKUN </td>
			<td width='40' class='header_laporan'>CURR</td>
            <td width='100' class='header_laporan'>HARGA </td>
            <td width='90' class='header_laporan'>PPN </td>
            <td width='100' class='header_laporan'>JUMLAH</td>
          </tr>
          <tr>
            <td align='center' height='60' valign='top' class='isi_laporan'>1</td>
            <td valign='top' class='isi_laporan'>$row->no_npp</td>
            <td valign='top' class='isi_laporan'>$row->no_dokumen</td>
            <td valign='top' class='isi_laporan'>$row->kode_akun</td>
			<td valign='top' class='isi_laporan' align='center'>$row->kode_curr</td>
            <td valign='top' align='right' class='isi_laporan'>".number_format($row->tagihan,0,",",".")."</td>
            <td valign='top' align='right' class='isi_laporan'>".number_format($row->nilai_ppn,0,",",".")."</td>
            <td valign='top' align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
          </tr>
          <tr>
           <td colspan='7' class='header_laporan' align='center'>TOTAL</td>
              <td class='header_laporan' align='right' >".number_format($row->nilai,0,",",".")."</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='236'>&nbsp;</td>
            <td width='300'>&nbsp;</td>
            <td width='250'>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td class='header_laporan'>MANAGER/ COORDINATOR/GENERAL MANAGER </td>
            <td class='header_laporan'>GENEREAL MANAGER/ DIREKTUR</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td height='80'>( $row->nama_setuju )</td>
            <td>( $row->nama_gar )</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td colspan='4'>Kelengkapan Dokumen:</td>
            </tr>
          <tr>
            <td width='29'>&nbsp;</td>
            <td width='227'>1. Kontrak/ SPK/ SP </td>
            <td width='175'>ADA / TIDAK ADA </td>
            <td width='351'>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>2. Kuitansi ADA</td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>3. Invoice ADA</td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>4. Berita Acara Serah Terima </td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>5. Kalkulasi </td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>6. &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; </td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>7. &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; </td>
            <td>ADA / TIDAK ADA </td>
            <td>SAH / TIDAK SAH</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		
		
		}
		echo "</div>";
		return "";
	}
}
?>