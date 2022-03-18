<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kpa_rptPjAjuForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_panjar)
from itt_panjar_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_panjar,a.tanggal,a.nik_buat,b.nama,a.kode_pp,c.nama as nama_pp,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.nilai,
		a.nik_buat,a.nik_setuju,d.nama as nama_buat,e.nama as nama_app	
from itt_panjar_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_panjar";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pengajuan kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'>
    <td height='30' colspan='2'>PERMOHONAN PANJAR </td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr align='center'>
        <td colspan='4'>Nomor : $row->no_panjar</td>
        </tr>
      <tr>
        <td width='200'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='4'>Mohon dibayarkan uang sebesar : Rp ".number_format($row->nilai,0,",",".")."</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='3'>&nbsp;( ".$AddOnLib->terbilang($row->nilai)." )</td>
        </tr>
      <tr>
        <td>Untuk Keperluan </td>
        <td colspan='3'>: $row->keterangan </td>
        </tr>
      <tr>
        <td>Dasar Permintaan </td>
        <td colspan='3'>: a </td>
        </tr>
      <tr>
        <td>Akan diselesaikan *) </td>
        <td colspan='3'>: a </td>
        </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
        </tr>
      <tr align='center'>
        <td>Fiatur</td>
        <td>Verifikasi</td>
        <td>Pusat Pert.Jawaban </td>
        <td>Pemohon Panjar</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>nama</td>
        <td>nama</td>
        <td>$row->nama_app</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center'>
        <td>nik</td>
        <td>nik</td>
        <td>$row->nik_setuju</td>
        <td>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
      <tr align='center'>
        <td colspan='2'>TANDA TERIMA</td>
      </tr>
      <tr>
        <td colspan='2'>Telah ditransfer uang sebesar Rp ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2'>( ".$AddOnLib->terbilang($row->nilai)." ) </td>
      </tr>
      <tr>
        <td width='102'>&nbsp;</td>
        <td width='288'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>Bandung, tanggal </td>
      </tr>
      <tr>
        <td colspan='2'>Penerima</td>
      </tr>
      <tr>
        <td height='50' colspan='2'>&nbsp;</td>
      </tr>
    </table></td>
    <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
      <tr align='center'>
        <td colspan='2'>PEMBAYARAN VIA TRANSFER </td>
        </tr>
      <tr>
        <td colspan='2'>Telah ditransfer uang sebesar Rp ".number_format($row->nilai,0,",",".")."</td>
        </tr>
      <tr>
        <td colspan='2'>( ".$AddOnLib->terbilang($row->nilai)." ) </td>
        </tr>
      <tr>
        <td width='102'>&nbsp;</td>
        <td width='288'>&nbsp;</td>
      </tr>
      <tr>
        <td>Kepada</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>No Rekening </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Bank</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>Bandung, tanggal </td>
        </tr>
      <tr>
        <td colspan='2'>Bendaharawan</td>
        </tr>
      <tr>
        <td height='50' colspan='2'>&nbsp;</td>
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
