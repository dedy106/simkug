<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_hutang_rptHutangSpb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_spb)
from spb_m a 
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_tahu=c.nik and a.kode_lokasi=c.kode_lokasi 
inner join karyawan d on a.nik_fiat=d.nik and a.kode_lokasi=d.kode_lokasi 
inner join karyawan e on a.nik_bdh=e.nik and a.kode_lokasi=e.kode_lokasi
inner join pb_m f on a.no_spb=f.no_spb and a.kode_lokasi=f.kode_lokasi 
inner join spb_d g on f.no_pb=g.no_bukti and f.kode_lokasi=g.kode_lokasi 
inner join hutang_m h on f.no_hutang=h.no_hutang and f.kode_lokasi=h.kode_lokasi 
inner join vendor i on h.kode_vendor=i.kode_vendor and h.kode_lokasi=i.kode_lokasi 
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
		$sql="select a.no_spb,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tanggal,date_format(a.due_date,'%d/%m/%Y') as due_date,a.keterangan,a.nik_buat,a.nik_tahu,a.nik_fiat,a.nik_bdh,a.nilai,
	   b.nama as nama_buat,c.nama as nama_tahu,d.nama as nama_fiat,e.nama as nama_bdh,date_format(h.tanggal,'%d/%m/%Y') as tgl_hutang,
	    h.no_hutang,h.keterangan,h.kode_vendor,i.nama as nama_vendor,i.nama,i.alamat,i.no_rek,i.nama_rek,i.bank,i.cabang,h.no_dokumen
from spb_m a 
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
left join karyawan c on a.nik_tahu=c.nik and a.kode_lokasi=c.kode_lokasi 
left join karyawan d on a.nik_fiat=d.nik and a.kode_lokasi=d.kode_lokasi 
left join karyawan e on a.nik_bdh=e.nik and a.kode_lokasi=e.kode_lokasi
inner join pb_m f on a.no_spb=f.no_spb and a.kode_lokasi=f.kode_lokasi 
inner join spb_d g on f.no_pb=g.no_bukti and f.kode_lokasi=g.kode_lokasi 
inner join hutang_m h on f.no_hutang=h.no_hutang and f.kode_lokasi=h.kode_lokasi 
inner join vendor i on h.kode_vendor=i.kode_vendor and h.kode_lokasi=i.kode_lokasi 
$this->filter order by a.no_spb";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/logo_cianjur.jpg";
		$kotak = $path . "image/kotak.png";
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='100%'  border='0' cellspacing='1' cellpadding='1'>
      <tr>
        <td width='16%' rowspan='2'><img src='$pathfoto ' width='100' height='100'></td>
        <td width='84%' align='center' class='istyle17' valign='bottom'>SURAT PERINTAH BAYAR </td>
      </tr>
      <tr>
        <td align='center' class='istyle15' valign='top'>$row->no_hutang </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>&nbsp;</td>
        </tr>
      <tr>
        <td width='64%'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='33%'>Terbilang</td>
            <td width='67%'>: ".$AddOnLib->terbilang($row->nilai)."</td>
          </tr>
          <tr>
            <td><strong>Kepada</strong></td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Nama</td>
            <td>: $row->nama_vendor</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>: $row->alamat</td>
          </tr>
          <tr>
            <td>No Rekening</td>
            <td>: $row->no_rek</td>
          </tr>
          <tr>
            <td>Nama Bank </td>
            <td>: $row->bank</td>
          </tr>
          <tr>
            <td>Alamat Bank </td>
            <td>: $row->cabang</td>
          </tr>
          <tr>
            <td>Nama Rekening </td>
            <td>: $row->nama_rek</td>
          </tr>
          <tr>
            <td>Untuk Pembayaran </td>
            <td>: $row->keterangan</td>
          </tr>
        </table></td>
        <td width='36%'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td width='50%'>Verifikasi</td>
            <td width='50%'>Due Date $row->due_date </td>
          </tr>
          <tr>
            <td>Anggaran tgl $row->tgl_hutang</td>
            <td align='center'>Pembayaran</td>
          </tr>
          <tr>
            <td rowspan='2'>&nbsp;</td>
            <td>Cash</td>
          </tr>
          <tr>
            <td>Transfer</td>
          </tr>
          <tr>
            <td height='30' colspan='2'>Catatan Verifikasi</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='30'>&nbsp;&nbsp;Pengawasan Anggaran (Terlampir)</td>
  </tr>
  <tr>
    <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='4%' class='header_laporan'>No</td>
        <td width='10%' class='header_laporan'>Kode Akun </td>
        <td width='35%' class='header_laporan'>Nama Akun </td>
        <td width='4%' class='header_laporan'>DC</td>
        <td width='12%' class='header_laporan'>Nilai</td>
        <td width='35%' class='header_laporan'>Keterangan</td>
      </tr>";
	  $j=1;
	  $sql="select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai 
from hutang_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$row->kode_lokasi' and a.no_hutang='$row->no_hutang' and a.dc='D'";
	  $rs1 = $dbLib->execute($sql);	
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
	    <td class='isi_laporan' align='center'>$j</td>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
        <td class='isi_laporan'>$row1->dc</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
        <td class='isi_laporan'>$row1->keterangan</td>     
      </tr>";
		$j=$j+1;
    }
	echo "</table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='3'>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td width='59%'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td colspan='3'>Perhitungan</td>
                </tr>
              <tr>
                <td width='33%'>Nilai Tagihan</td>
                <td width='13%'>: IDR </td>
                <td width='54%'>".number_format($row->nilai,0,",",".")."</td>
              </tr>
              <tr>
                <td>Nilai Potongan </td>
                <td>: IDR </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Nilai Ditransfer </td>
                <td>: IDR </td>
                <td>".number_format($row->nilai,0,",",".")."</td>
              </tr>
            </table></td>
            <td width='41%' valign='top'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td>Catatan </td>
              </tr>
              <tr>
                <td>$row->no_dokumen</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td colspan='2'>Fiatur</td>
            <td width='28%'>Mengetahui</td>
            <td width='31%'>Cianjur, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
          </tr>
          <tr>
            <td width='18%' align='center'>Ketua</td>
            <td width='23%' rowspan='2'>&nbsp;</td>
            <td align='center'>Manager Kopegtel </td>
            <td align='center'>Yang Mengajukan </td>
          </tr>
          <tr align='center' valign='bottom'>
            <td height='50'>$row->nama_fiat</td>
            <td>$row->nama_tahu</td>
            <td>$row->nama_buat</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td width='25%' rowspan='2' align='center' valign='top' height='60'>Kas &amp; Bank </td>
            <td width='30%' height='25'>Tanggal</td>
            <td width='45%' rowspan='2'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='10%' align='center'><img src='$kotak'></td>
                <td width='90%'>Kuitansi / Faktur </td>
              </tr>
              <tr>
                <td align='center'><img src='$kotak'></td>
                <td>SPK / PKS / ST / DO </td>
              </tr>
              <tr>
                <td align='center'><img src='$kotak'></td>
                <td>BAST</td>
              </tr>
              <tr >
                <td align='center'><img src='$kotak'></td>
                <td>Faktur Pajak / SSP </td>
              </tr>
              <tr >
                <td align='center'><img src='$kotak'></td>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td align='center' valign='top' >Penerima</td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td height='50' valign='top'>Disposisi Manajemen </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table><br><DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
