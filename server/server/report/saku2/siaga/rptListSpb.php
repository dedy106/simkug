<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptListSpb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_spb)
from gr_spb_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi $this->filter ";
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
		$sql = "select a.no_kaslist,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nik_buat,a.nik_man,a.nik_tahu,a.nik_setuju,
       b.nama as nama_buat,c.nama as nama_man,d.nama as nama_setuju,e.nama as nama_tahu,f.nilai
from gr_kaslist_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_man=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_tahu=e.nik and a.kode_lokasi=e.kode_lokasi
inner join gr_spb_m f on a.no_kaslist=f.no_kaslist and a.kode_lokasi=f.kode_lokasi $this->filter order by a.no_kaslist ";
		
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
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'>DEPARTEMEN KEUANGAN</td>
      </tr>
      <tr>
        <td align='center'>SURAT PERINTAH BAYAR</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Catatan di Perbendaharaan</td>
        </tr>
      <tr>
        <td width='20%'>SPB Nomor </td>
        <td width='80%'>: $row->no_kaslist </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='4'>Kasir PT GRATIKA diminta untuk membayarkan :</td>
        </tr>
      <tr>
        <td width='18%'>Uang Sebesar </td>
        <td width='5%'>Rp.</td>
        <td width='14%' align='right'>".number_format($row->nilai,0,",",".")."</td>
        <td width='63%'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>USD</td>
        <td align='right'></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>(diulang dengan sebutan) </td>
        <td colspan='2' align='left'>".$AddOnLib->terbilang($row->nilai)."</td>
        </tr>
	   <tr>
        <td colspan='4'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td height='23'>Tgl</td>
        <td>Nama</td>
        <td>Jumlah Valas</td>
        <td>Jumlah Rp </td>
        <td>Uraian Pembayaran </td>
        <td>Register</td>
        <td>COA</td>
        <td>Via Bayar </td>
      </tr>";
		$sql1="select a.no_bukti,c.nama as nama_vendor,b.keterangan,b.no_ver,a.nilai,a.kode_curr,date_format(b.tanggal,'%d/%m/%Y') as tanggal
from gr_kaslist_d a
inner join gr_spb_m b on a.no_bukti=b.no_spb and a.kode_lokasi=b.kode_lokasi
inner join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
where a.no_kaslist='$row->no_kaslist'";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;$debet=0;$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			
      echo "<tr>
        <td>$row1->tanggal</td>
        <td>$row1->nama_vendor</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>".number_format($row1->nilai,0,",",".")."</td>
        <td>$row1->keterangan</td>
        <td>$row1->no_ver</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='2'>Total</td>
        <td align='right'>&nbsp;</td>
        <td align='right'>&nbsp;</td>
        <td colspan='4'>&nbsp;</td>
        </tr>
    </table></td>
        </tr>
		<tr>
        <td colspan='4'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='33%'>&nbsp;</td>
        <td width='34%'>&nbsp;</td>
        <td width='33%'>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td>Menyetujui</td>
        <td>Mengetahui</td>
        <td>Verifikasi</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_setuju</td>
        <td>$row->nama_tahu</td>
        <td>$row->nama_man</td>
      </tr>
      <tr>
        <td>$row->nik_setuju</td>
        <td>$row->nik_tahu</td>
        <td>$row->nik_man</td>
      </tr>
    </table></td>
        </tr>
    </table></td>
  </tr>
 
  
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='20%'>Catatan Pembayaran</td>
        <td width='10%'>&nbsp;</td>
        <td width='14%'>&nbsp;</td>
        <td width='13%'>&nbsp;</td>
        <td width='4%'>&nbsp;</td>
        <td width='14%'>&nbsp;</td>
        <td width='25%'>&nbsp;</td>
      </tr>
      <tr>
        <td>Via Kas </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Rp</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Via BG/Cek </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Bank</td>
        <td>Nomor</td>
        <td>BG</td>
        <td>Cek</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>- Bank BII </td>
        <td>-</td>
        <td>Rp.</td>
        <td>Rp.</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Total BG/Cek </td>
        <td>&nbsp;</td>
        <td>Rp.</td>
        <td>Rp.</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td>Total Pembayaran </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Rp</td>
        <td>&nbsp;</td>
        <td>Off.Man Kas </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td height='50'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$row->nama_buat / $row->nik_buat </td>
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