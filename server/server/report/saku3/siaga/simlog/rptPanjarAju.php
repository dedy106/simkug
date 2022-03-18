<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPanjarAju extends server_report_basic
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.kode_lokasi,a.atensi,a.no_pb,a.tanggal,a.kode_pp,a.keterangan,b.nama as nama_pp,a.nik_buat,a.nik_tahu,c.nama as nama_buat,d.nama as nama_tahu ,a.nilai,a.keterangan,
		c.jabatan as jabatan_buat,d.jabatan as jabatan_app,convert(varchar(20),a.tanggal,103) as tgl,convert(varchar(20),a.due_date,103) as due_date,
    a.nik_sah,a.nik_ver,f.nama as nama_sah,g.nama as nama_ver,a.jenis,a.jab1,a.jab2,a.jab3,a.jab4
from gr_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_tahu=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan f on a.nik_sah=f.nik
left join karyawan g on a.nik_ver=g.nik
$this->filter order by a.no_pb";
	  $rs = $dbLib->execute($sql);
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
        <td align='center' class='istyle15'>Nomor : $row->no_pb</td>
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
          <tr>
            <td align='center'>5</td>
            <td>Purchase Request</td>
            <td>: $row->atensi</td>
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
            <td width='90' class='header_laporan'>Progress</td>

          </tr>";
          $sql="select f.ref1,c.no_bukti,c.kode_akun,b.nama as nama_akun,a.nilai,isnull(d.kode_flag,'-') as kode_flag, 
          case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-' then a.nilai else c.saldo end as saldo,
           case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-' then 0 else c.saldo-a.nilai end as sisa,f.progress
          from gr_pb_j a 
          inner join gr_pb_m f on a.no_pb=f.no_pb and a.kode_lokasi=f.kode_lokasi
           inner join angg_r c on f.no_pb=c.no_bukti
          inner join masakun b on c.kode_akun=b.kode_akun and c.kode_lokasi=b.kode_lokasi
          left join flag_relasi d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi and d.kode_flag='006'
        where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and a.modul='PJAJULOG' ";
		
		$i=1; 
		$rs1 = $dbLib->execute($sql); 
		$nilai=0;  $saldo=0; $sisa=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false)) 
		{ 
			$nilai+=$row1->nilai;
			$saldo+=$row1->saldo;
			$sisa+=$row1->sisa;
          echo "<tr>
            <td class='isi_laporan'>$row1->kode_akun</td>
            <td class='isi_laporan'>$row1->nama_akun</td>
            <td align='right' class='isi_laporan'>".number_format($row1->saldo,0,',','.')."</td>
            <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
            <td align='right' class='isi_laporan'>".number_format($row1->sisa,0,',','.')."</td>
            <td class='isi_laporan'>$row1->progress</td>
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
		$sql="select a.keterangan,a.nilai from gr_pb_j a where a.no_pb='$row->no_pb' order by a.dc desc"; 
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
        <td align='center'>$row->nama_tahu</td>
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
            <td width='719'>: $row->nama_tahu </td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>: $row->nik_tahu </td>
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
        <td>Yang akan diperhitungkan / dipertanggungjawabkan paling lambat tanggal : $row->due_date</td>
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
            <td>$row->nama_tahu</td>
          </tr>
          <tr>
            <td>$row->nik_buat</td>
            <td>$row->nik_tahu</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table><br>
<br>
			<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
    $sql = "select a.no_pb ,a.keterangan,a.nik_buat,b.nama as nama_buat,a.atensi as ref1,'Jakarta' as kota,tanggal,convert(varchar(20),a.tanggal,103) as tgl,
		a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,
    a.latar, a.strategis, a.bisnis, a.teknis, a.lain,a.nik_tahu,e.nama as nama_tahu,
    a.nik_sah,a.nik_ver,f.nama as nama_sah,g.nama as nama_ver,a.jenis,a.jab1,a.jab2,a.jab3,a.jab4
from gr_pb_m a
inner join karyawan b on a.nik_buat=b.nik
inner join pp c on a.kode_pp=c.kode_pp
inner join curr d on a.kode_curr=d.kode_curr
inner join karyawan e on a.nik_tahu=e.nik
left join karyawan f on a.nik_sah=f.nik
left join karyawan g on a.nik_ver=g.nik
$this->filter order by a.no_pb ";
		
		$rs = $dbLib->execute($sql);	
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
	
				echo	"<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='judul_bukti'>JUSTIFIKASI</td>
  </tr>
  <tr>
    <td align='center' class='judul_bukti'>KEBUTUHAN BARANG ATAU JASA</td>
  </tr>
  <tr>
    <td align='center'  class='judul_bukti'>$row->no_pb</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='29' align='center'>1</td>
        <td width='151'>Unit Kerja</td>
        <td width='606'>: $row->nama_pp </td>
      </tr>
      <tr>
        <td align='center'>2</td>
        <td>Jenis Anggaran</td>
        <td>: $row->jenis </td>
      </tr>
      <tr>
        <td align='center'>3</td>
        <td>Total Nilai</td>
        <td>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>Terbilang</td>
        <td>&nbsp;".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
	  <tr>
        <td align='center'>4</td>
        <td>Kebutuhan</td>
        <td>: $row->keterangan</td>
      </tr>
      <tr>
        <td align='center'>5</td>
        <td>Saat Penggunaan</td>
        <td>: </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='120' align='center' class='header_laporan'>No Akun </td>
        <td width='310' align='center' class='header_laporan'>Nama Akun </td>
        <td width='80' align='center' class='header_laporan'>Anggaran</td>
        <td width='80' align='center' class='header_laporan'>Nilai</td>
		<td width='80' align='center' class='header_laporan'>Saldo Anggaran</td>
      </tr>";
	$sql="select a.kode_akun,b.nama as nama_akun,a.nilai,isnull(d.kode_flag,'-') as kode_flag,
	case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-' then a.nilai else c.saldo end as saldo,
	case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-'  then 0 else c.saldo-a.nilai end as sisa
from gr_pb_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join angg_r c on a.no_pb=c.no_bukti and a.kode_akun=c.kode_akun and a.modul=c.modul
left join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag='006'
where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' 
order by a.no_urut ";
	
    $rs1 = $dbLib->execute($sql);
	$i=1; $nilai=0;  $saldo=0; $sisa=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$nilai+=$row1->nilai;
		$saldo+=$row1->saldo;
		$sisa+=$row1->sisa;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
        <td class='isi_laporan' align='right'>".number_format($row1->saldo,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->sisa,0,",",".")."</td>
      </tr>";
    }
	echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='29' align='center'>I</td>
        <td width='761'>LATAR BELAKANG</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>$row->latar</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>II</td>
        <td>ASPEK STRATEGIS</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>$row->strategis</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>III</td>
        <td>ASPEK BISNIS</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>$row->bisnis</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    
      <tr>
        <td align='center'>IV</td>
        <td>SPESIFIKASI TEKNIS</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>$row->teknis</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>V</td>
        <td>ASPEK LAIN</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>$row->lain</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>VI</td>
        <td>LAMPIRAN</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td>&nbsp;</td>
        <td width='150' align='center' class='header_laporan'>NAMA / NIK</td>
        <td width='150' align='center' class='header_laporan'>JABATAN</td>
        <td width='150' align='center' class='header_laporan'>TANGGAL</td>
        <td width='150' align='center' class='header_laporan'>TANDA TANGAN</td>
      </tr>
      <tr>
        <td height='40' class='header_laporan'>DIBUAT OLEH</td>
        <td align='center'>$row->nama_buat / $row->nik_buat</td>
        <td align='center'>$row->jab1</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='40' class='header_laporan'>DIPERIKSA OLEH</td>
        <td align='center'>$row->nama_tahu / $row->nik_tahu</td>
        <td align='center'>$row->jab2</td>
        <td>&nbsp;</td>
	  </tr>
	     <tr>
        <td height='40' class='header_laporan'>VERIFIKASI ANGGARAN</td>
        <td align='center'>$row->nama_ver / $row->nik_ver</td>
        <td align='center'>$row->jab4</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='40' class='header_laporan'>DISAHKAN OLEH</td>
        <td align='center'>$row->nama_sah / $row->nik_sah</td>
        <td align='center'>$row->jab3</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    
    </table></td>
  </tr>
</table>
<br>
			<DIV style='page-break-after:always'></DIV>";
		$sql = "select a.no_pb ,a.keterangan,a.nik_buat,b.nama as nama_buat,a.atensi as ref1,'Jakarta' as kota,tanggal,convert(varchar(20),a.tanggal,103) as tgl,
		a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,
    a.latar, a.strategis, a.bisnis, a.teknis, a.lain,a.nik_tahu,e.nama as nama_tahu,
    isnull(f.saldo,0) as saldo,isnull(f.nilai,0) as nilai_gar
from gr_pb_m a
inner join karyawan b on a.nik_buat=b.nik
inner join pp c on a.kode_pp=c.kode_pp
inner join curr d on a.kode_curr=d.kode_curr
inner join karyawan e on a.nik_tahu=e.nik
left join (select no_bukti,kode_lokasi,sum(saldo) as saldo,sum(nilai) as nilai
          from angg_r
          group by no_bukti,kode_lokasi
          )f on a.no_pb=f.no_bukti and a.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_pb ";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='judul_bukti'>FORM KEBUTUHAN BARANG / JASA</td>
  </tr>
  <tr>
    <td align='center' class='judul_bukti'>(Pembelian dengan Cash &amp; Carry)</td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='162'>Nomor Dokumen</td>
        <td width='628'>: $row->no_pb </td>
      </tr>
      <tr>
        <td>Unit Kerja</td>
        <td>: $row->nama_pp </td>
      </tr>
      <tr>
        <td>Nomor Akun</td>
        <td>: - </td>
      </tr>
       <tr>
        <td>Total Nilai Anggaran</td>
        <td>: ".number_format($saldo,0,",",".")." </td>
      </tr>
      <tr>
        <td>Saat Penggunaan</td>
        <td>: ".number_format($nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>Saldo Anggaran</td>
        <td>: ".number_format($sisa,0,",",".")." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='29' align='center' class='header_laporan'>No</td>
        <td width='340' align='center' class='header_laporan'>Nama Barang / Jasa</td>
        <td width='115' align='center' class='header_laporan'>Satuan</td>
        <td width='76' align='center' class='header_laporan'>Quantity</td>
        <td width='101' align='center' class='header_laporan'>Harga Satuan</td>
        <td width='125' align='center' class='header_laporan'>Jumlah Harga</td>
      </tr>";
	$sql="select a.no_pb,a.kode_lokasi,a.nama_brg,a.satuan,a.jumlah,a.harga from gr_pb_boq a
where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' 
order by a.nu ";
	
    $rs1 = $dbLib->execute($sql);
	$i=1; $nilai=0; 
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama_brg</td>
        <td class='isi_laporan'>$row1->satuan</td>
        <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->harga,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->jumlah*$row1->harga,0,",",".")."</td>
      </tr>";
		$i=$i+1;
	}  
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Terbilang : ".$AddOnLib->terbilang($row->nilai)."</td>
  </tr>
  <tr>
    <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Dibuat oleh,</td>
        <td>Disetujui oleh,</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_buat</td>
        <td>$row->nama_tahu</td>
      </tr>
      <tr>
        <td>$row->nik_buat</td>
        <td>$row->nik_tahu</td>
      </tr>
    </table></td>
  </tr>
</table>
<br>
			<DIV style='page-break-after:always'></DIV>";
			}
		
		}
		echo "</div>";
		return "";
		
	}
	
}
?>