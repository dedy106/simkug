<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdAppFormTu2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$tahun=substr($tmp[0],0,4);
	$sql="select a.no_app,a.kode_lokasi,a.nik_buat,a.nik_app,b.nama as nama_app,c.nama as nama_buat,a.keterangan,
convert(varchar,a.tanggal,103) as tgl,c.jabatan as jab_buat,b.jabatan as jab_app,a.tanggal,
a.jenis,a.lama,a.kota,a.sarana,a.catatan,a.no_aju
from tu_pdapp_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_app
";
		
        $rs = $dbLib->execute($sql);
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";

		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='judul_bukti'>SURAT PERMOHONAN MELAKSANAKAN PERJALANAN DINAS (SPMD)</td>
  </tr>
  <tr>
    <td align='center'>Nomor : $row->no_app </td>
  </tr>
  <tr>
    <td align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan ini kami mohon persetujuannya bagi pegawai yang namanya tersebut di bawah ini untuk diberika</td>
  </tr>
  <tr>
    <td>Surat Perintah Perjalanan Dinas (SPPD) sebagai berikut :</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='24' align='center' class='header_laporan'>NO</td>
        <td width='200' align='center' class='header_laporan'>NAMA/ NIP</td>
        <td width='121' align='center' class='header_laporan'>TINGKAT/ JABATAN</td>
        <td width='180' align='center' class='header_laporan'>LOKASI KERJA</td>
        <td width='120' align='center' class='header_laporan'>Paraf Atasan Langsung Khusus Bagi Pegawai dari Lokasi Kerja Lain</td>
        <td width='127' align='center' class='header_laporan'>KETERANGAN (Tarif SPPD) </td>
      </tr>";
	  $sql="select a.no_spj,a.kode_lokasi,a.nik_spj,a.kode_pp,a.nik_buat,b.nama as nama_pp,a.keterangan,
convert(varchar,a.tanggal,103) as tgl,c.jabatan,c.nama as nama_spj,d.nama as nama_buat,ISNULL(e.total,0) as total
from tu_pdaju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
left join (select a.no_spj,a.kode_lokasi,sum(a.total) as total 
		   from tu_pdaju_d a
		   where a.kode_lokasi='11'
		   group by a.no_spj,a.kode_lokasi
		   )e on a.no_spj=e.no_spj and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$row->kode_lokasi' and a.no_app='$row->no_app'
order by a.no_spj ";

      $rs1 = $dbLib->execute($sql);
	  $j=1; $total=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$total+=$row1->total;
      echo "<tr>
        <td class='isi_laporan' align='center'>$j</td>
        <td class='isi_laporan'>$row1->nik_spj / $row1->nama_spj</td>
        <td class='isi_laporan'>$row1->jabatan</td>
        <td class='isi_laporan'>$row1->kode_pp / $row1->nama_pp</td>
        <td class='isi_laporan'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='269'>Maksud Perjalanan Dinas</td>
        <td width='521'>: $row->keterangan </td>
      </tr>
      <tr>
        <td>Jenis Perjalanan Dinas</td>
        <td>: $row->jenis </td>
      </tr>
      <tr>
        <td>Lama Perjalanan Dinas</td>
        <td>: $row->lama </td>
      </tr>
      <tr>
        <td>Kota Tujuan</td>
        <td>: $row->kota </td>
      </tr>
      <tr>
        <td>Sarana Transportasi</td>
        <td>: $row->sarana </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Catatan</td>
        <td>: $row->catatan </td>
      </tr>
      <tr>
        <td>Saldo Akhir  Beban Bang Lembaga</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Biaya yang diperlukan</td>
        <td>: ".number_format($total,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>Demikian permohonan kami dan atas persetujuannya diucapkan terimakasih.</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='172' align='center'>&nbsp;</td>
        <td width='293' align='center'>Menyetujui/ Mengetahui</td>
        <td width='321'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>a.n Rektor</td>
        <td align='center'>Pemohon</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->nama_app</td>
        <td align='center'>$row->nama_buat</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->jab_app</td>
        <td align='center'>$row->jab_buat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>";
	echo "</table><br>";
			$i=$i+1;
			
	echo "<DIV style='page-break-after:always'></DIV>";
		
		$sql="select a.no_aju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		a.kode_drk,e.nama as nama_drk,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
where a.no_aju='$row->no_aju' 
order by a.no_aju";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN SPPD</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='200'>No Pertanggungan</td>
        <td width='600' class='judul_bukti'>$row->no_aju </td>
        <td rowspan='8' style='vertical-align:top'><img alt='$row->no_aju' src='$root_app/barcode.php?size=30&amp;text=$row->no_aju'></td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl </td>
      </tr>
	   <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td width='200'>PP</td>
        <td width='600'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
      <tr>
        <td>MTA</td>
        <td>: $row->kode_akun - $row->nama_akun </td>
      </tr>
      <tr>
        <td>DRK</td>
        <td>: $row->kode_drk - $row->nama_drk </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Keterangan</td>
        <td>: $row->keterangan </td>
      </tr>
      <tr>
        <td>Nilai</td>
        <td>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>Terbilang</td>
        <td>: ".$AddOnLib->terbilang($row->nilai)." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
   <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
        <td width='150' align='center' class='header_laporan'>No Rekening</td>
        <td width='150' align='center' class='header_laporan'>Bank</td>
        <td width='80' align='center' class='header_laporan'>Bruto</td>
		<td width='80' align='center' class='header_laporan'>Pajak</td>
		<td width='80' align='center' class='header_laporan'>Netto</td>
      </tr>";
	  $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
from it_aju_rek
where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
order by no_rek";
      $rs1 = $dbLib->execute($sql);
	  $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td class='isi_laporan'>$row1->bank</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
		}
		 echo "<tr>
        <td class='header_laporan' colspan='3' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td colspan='2'>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
	   <tr align='center'>
        <td width='200'>Mengetahui/Menyetujui :</td>
        <td width='200'>&nbsp;Fiatur</td>
        <td width='200'>&nbsp;Verifikasi</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td >Ka .PP</td>
        <td colspan='2' >&nbsp;</td>
        <td >Dibuat Oleh,</td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>$row->nama_app</td>
        <td>&nbsp;Nurlaela</td>
        <td>&nbsp;Tiene Yaniwati</td>
        <td class='garis_bawah'>$row->nama_user </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>NIP : $row->nik_app</td>
        <td colspan='2'>&nbsp;</td>
        <td>NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "<div style='page-break-after:always;'>";
		$sql="select a.no_aju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		a.kode_drk,e.nama as nama_drk,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
where a.no_aju='$no_aju' and a.kode_lokasi='$kode_lokasi'
order by a.no_aju";
		
		$rs2 = $dbLib->execute($sql);
		
		$i=1;
	
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row2->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN BEBAN</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='200'>No Pertanggungan</td>
        <td width='600' class='judul_bukti'>$row2->no_aju </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row2->tgl </td>
      </tr>
	   <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td width='200'>PP</td>
        <td width='600'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
      <tr>
        <td>MTA</td>
        <td>: $row->kode_akun - $row->nama_akun </td>
      </tr>
      <tr>
        <td>DRK</td>
        <td>: $row->kode_drk - $row->nama_drk </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Keterangan</td>
        <td>: $row->keterangan </td>
      </tr>
      <tr>
        <td>Nilai</td>
        <td>: ".number_format($row2->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>Terbilang</td>
        <td>: ".$AddOnLib->terbilang($row2->nilai)." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
   <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
        <td width='150' align='center' class='header_laporan'>No Rekening</td>
        <td width='150' align='center' class='header_laporan'>Bank</td>
        <td width='80' align='center' class='header_laporan'>Bruto</td>
		<td width='80' align='center' class='header_laporan'>Pajak</td>
		<td width='80' align='center' class='header_laporan'>Netto</td>
      </tr>";
	  $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
from it_aju_rek
where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
order by no_rek";
      $rs1 = $dbLib->execute($sql);
	  $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td class='isi_laporan'>$row1->bank</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
		}
		 echo "<tr>
        <td class='header_laporan' colspan='3' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row2->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row2->tanggal),0,6))."</td>
      </tr>
	   <tr align='center'>
        <td width='200'>Mengetahui/Menyetujui :</td>
        <td width='400'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td >Ka .PP</td>
        <td >&nbsp;</td>
        <td >Dibuat Oleh,</td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>$row->nama_app</td>
        <td>&nbsp;</td>
        <td class='garis_bawah'>$row->nama_user </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>NIP : $row->nik_app</td>
        <td>&nbsp;</td>
        <td>NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
	
	}
		
		
		
		
		
		echo "</div>";
		return "";
		
	}
	
}
?>
