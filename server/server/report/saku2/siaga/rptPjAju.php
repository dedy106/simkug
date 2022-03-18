<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptPjAju extends server_report_basic
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
from gr_panjar_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter ";
		
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_panjar,a.tanggal,a.kode_pp,a.keterangan,b.nama as nama_pp,a.nik_buat,a.nik_app,c.nama as nama_buat,d.nama as nama_app ,a.nilai,a.keterangan,
		c.jabatan as jabatan_buat,d.jabatan as jabatan_app,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.due_date,'%d/%m/%Y') as due_date
from gr_panjar_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_panjar";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td style='padding:10px;'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='412'>PT GRAHA INFORMATIKA NUSANTARA</td>
              <td width='197' align='right'>Lampiran : </td>
              <td width='171'>&nbsp;</td>
            </tr>
            <tr>
              <td>JL S Parman Kavling 56 JAKARTA</td>
              <td align='right'>No : </td>
              <td>&nbsp;</td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30' align='center' class='istyle17'>PERMINTAAN PANJAR </td>
      </tr>
      <tr>
        <td align='center' class='istyle15'>Nomor : $row->no_panjar</td>
      </tr>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='40' align='center'>1</td>
            <td width='168'>Departemen</td>
            <td width='572'>: $row->nama_pp</td>
          </tr>
          <tr>
            <td align='center'>2</td>
            <td>Unit Kerja </td>
            <td>: $row->nama_pp</td>
          </tr>
          <tr>
            <td align='center'>3</td>
            <td>Nama Kegiatan DRK</td>
            <td>: $row->keterangan </td>
          </tr>
          <tr>
            <td align='center'>4</td>
            <td>Saat Penggunaan</td>
            <td>: $row->due_date</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:10px;'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='110' class='header_laporan'>No Perkiraan </td>
            <td width='270' class='header_laporan'>Nama Perkiraan </td>
            <td width='90' class='header_laporan'>Sisa Anggaran sd saat ini </td>
            <td width='90' class='header_laporan'>Nilai Panjar </td>
            <td width='90' class='header_laporan'>Saldo</td>
          </tr>";
		  $sql="select a.kode_akun,b.nama,a.nilai,a.saldo 
from angg_r a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='$row->no_panjar' 
order by a.kode_akun desc"; 
		
		$i=1; 
		$rs1 = $dbLib->execute($sql); 
		while ($row1 = $rs1->FetchNextObject($toupper=false)) 
		{ 
          echo "<tr>
            <td class='isi_laporan'>$row1->kode_akun</td>
            <td class='isi_laporan'>$row1->nama</td>
            <td align='right' class='isi_laporan'>".number_format($row1->saldo,0,',','.')."</td>
            <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
           <td align='right' class='isi_laporan'>".number_format($row1->saldo-$row1->nilai,0,',','.')."</td>
          </tr>";
		}
        echo "</table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='30' class='header_laporan'>No</td>
            <td width='670' class='header_laporan'>Uraian Kebutuhan</td>
            <td width='100' class='header_laporan'>Jumlah</td>
          </tr>
        "; 
		$sql="select a.keterangan,a.nilai from gr_panjar_j a where a.no_panjar='$row->no_panjar' order by a.dc desc"; 
		$i=1; 
		$rs1 = $dbLib->execute($sql); 
		while ($row1 = $rs1->FetchNextObject($toupper=false)) 
		{ 
		echo "
        <tr>
          <td align='center' class='isi_laporan'>$i</td>
          <td class='isi_laporan'>$row1->keterangan</td>
          <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
        </tr>
      "; 
		$i=$i+1; }
	  echo "
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='129'>Total</td>
            <td width='661'>: Rp ".number_format($row->nilai,0,',','.')."</td>
          </tr>
          <tr>
            <td>Dengan Huruf</td>
            <td>: ".$AddOnLib->terbilang($row->nilai)."</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:10px;'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>  
      <tr>
        <td width='130' height='25'>&nbsp;</td>
        <td width='201' align='center'>Nama / NIK </td>
        <td width='234' align='center'>Jabatan</td>
        <td width='100' align='center'>Tanggal </td>
        <td width='113' align='center'>Tanda Tangan </td>
      </tr>
      <tr>
        <td height='50' align='center'>Dibuat Oleh </td>
        <td align='center'>$row->nama_buat</td>
        <td align='center'>$row->jabatan_buat</td>
        <td align='center'>$row->tgl</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='50' align='center'>Disetujui Oleh </td>
        <td align='center'>$row->nama_app</td>
        <td align='center'>$row->jabatan_app</td>
        <td align='center'>$row->tgl</td>
         <td align='center'>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:10px;'><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td height='30' align='center'>SURAT KUASA PENERIMAAN UANG PANJAR </td>
      </tr>
      <tr>
        <td>Yang bertanda tangan dibawah ini : </td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td width='71'>Nama</td>
            <td width='719'>: $row->nama_app </td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>: $row->nik_app </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>Dan memberi kuasa kepada $row->nama_buat </td>
      </tr>
      <tr>
        <td>untuk menerima Uang Panjar Sebesar Rp ".number_format($row->nilai,0,',','.')." </td>
      </tr>
      <tr>
        <td><em> ".$AddOnLib->terbilang($row->nilai)."</em></td>
      </tr>
      <tr>
        <td>Yang akan diperhitungkan / dipertanggungjawabkan paling lambat tanggal : </td>
      </tr>
      <tr>
        <td><b><em>Dan apabila sampai dengan tanggal tersebut belum saya pertanggungjawabkan saya bersedia dipotong gaji </em><b></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td width='448'>&nbsp;</td>
            <td width='342'>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
          </tr>
          <tr>
            <td>Yang Menerima Panjar </td>
            <td>Pemberi Kuasa </td>
          </tr>
          <tr>
            <td height='50'>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>$row->nama_buat</td>
            <td>$row->nama_app</td>
          </tr>
          <tr>
            <td>$row->nik_buat</td>
            <td>$row->nik_app</td>
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
