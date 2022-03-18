<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_hutang_rptSpbForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[1];
		$sql="select a.no_spb,a.no_ver,a.no_bukti,a.modul,a.tanggal,a.keterangan,a.nilai,a.tanggal,substring(periode,1,4) as tahun,
		a.nik_buat,a.nik_sah,a.nik_fiat,a.nik_bdh,f.kota,
		b.nama as nama_buat,c.nama as nama_sah,d.nama as nama_fiat,e.nama as nama_bdh,d.jabatan as jab_fiat,c.jabatan as jab_sah
from spb_m a
left join karyawan b on a.nik_buat=b.nik
left join karyawan c on a.nik_sah=c.nik
left join karyawan d on a.nik_fiat=d.nik
left join karyawan e on a.nik_bdh=e.nik
left join lokasi f on a.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_spb";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pengajuan kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center' class='istyle17'>SURAT PERINTAH BAYAR (SPB)</td>
      </tr>
      <tr>
        <td align='center'>/SPB-01/YAKES-22/1/2014</td>
      </tr>
	  <tr>
        <td align='center'>$row->no_spb</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td width='450'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='280'>1. No. /Tgl.PRPK</td>
        <td width='170'>:  </td>
      </tr>
      <tr>
        <td>2. No. DRK / TRW </td>
        <td>:  </td>
      </tr>
      <tr>
        <td>3. Kegiatan menurut DRK/DRP </td>
        <td>:  </td>
      </tr>
      <tr>
        <td>4. Beban Anggaran Tahun </td>
        <td>: $row->tahun </td>
      </tr>
      <tr>
        <td>5. No. Perkiraan </td>
        <td>:  </td>
      </tr>
      <tr>
        <td>6. Kode Lokasi PP </td>
        <td>:  </td>
      </tr>
      <tr>
        <td>7. No. Penunjukan Pesanan </td>
        <td>:  </td>
      </tr>
    </table></td>
    <td width='350'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>8.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>9.</td>
      </tr>
      <tr>
        <td>10.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>11.</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td valign='top'><table width='450' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>SPB berdasarkan :</td>
      </tr>
      <tr>
        <td>1. $row->keterangan</td>
      </tr>
    </table></td>
    <td><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='150'>Disahkan oleh :</td>
        <td width='200'>Off Verifikasi</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='60'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->nama_sah</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>NIK : $row->nik_sah</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='3'>Pemegang Kas Kantor Yayasan Kesehatan Pegawai Telkom Pusat diminta untuk membayarkan uang</td>
        </tr>
      <tr>
        <td width='147'>Sebesar</td>
        <td width='452'>: Rp ".number_format($row->nilai,0,',','.')."</td>
        <td width='187'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Kepada</td>
        <td>&nbsp;</td>
        <td>Fiatur,</td>
      </tr>
      <tr>
        <td>Nama</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$row->jab_fiat</td>
      </tr>
      <tr>
        <td>No.Rekening </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Pada Bank </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$row->nama_fiat</td>
      </tr>
      <tr>
        <td>Untuk Pembayaran </td>
        <td>: $row->keterangan</td>
        <td>NIK : $row->nik_fiat</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='450' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='23'>1.</td>
        <td width='244'>Cara Pembayaran</td>
        <td width='21'>&nbsp;</td>
        <td width='144'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Jumlah Tagihan</td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Potongan</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Uang Muka</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>PPN/PPn BM</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>PPH 21</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>PPH 23</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Denda</td>
        <td>Rp</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Jumlah yang dibayar</td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,',','.')."</td>
      </tr>
    </table></td>
    <td><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='20'>2.</td>
        <td width='200'>Perhitungan Uang Muka</td>
        <td width='20'>&nbsp;</td>
        <td width='110'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Besar Uang Muka</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Sudah dikembalikan</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Sisa yang belum dikembalikan</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Dikembalikan dengan SPB ini</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Sisa Uang Muka</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='450' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='23'>3.</td>
        <td width='244'>Catatan Penerimaan</td>
        <td width='21'>&nbsp;</td>
        <td width='144'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Telah diterima uang sejumlah</td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>( ".$AddOnLib->terbilang($row->nilai)." )</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp; </td>
        <td>&nbsp; </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->nama_buat</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>NIK : $row->nama_buat</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
    <td><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='19'>4.</td>
        <td width='120'>Catatan Transfer</td>
        <td width='20'>&nbsp;</td>
        <td width='173'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Transfer tanggal </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No. / Tgl. GB</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Rek. Bank No.</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>Bendaharawan YAKES Pegawai Telkom </td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td height='60' colspan='2'></td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>$row->nama_bdh</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan='2'>NIK : $row->nik_bdh</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>5. Catatan Pembukuan   :</td>
        <td>Dicatat dalam SIMAK :</td>
        <td>Tgl</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No.Bukti Pembukuan :</td>
        <td>Tgl.Entry.</td>
      </tr>
    </table></td>
  </tr>
</table><br><DIV style='page-break-after:always'></DIV>";
		
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
