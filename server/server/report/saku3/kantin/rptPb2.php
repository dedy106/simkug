<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kantin_rptPb2 extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$sql="select a.no_aju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		a.kode_drk,e.nama as nama_drk,h.logo,h.alamat,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_aju";

$root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN KANTIN </td>
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
        <td>Proyek</td>
        <td>: $row->kode_proyek - $row->nama_proyek </td>
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
      </tr>";
      $sql="select a.kode_akun,b.nama as nama_akun
      from (select a.kode_akun,a.kode_lokasi 
      from it_aju_d a
      where a.no_aju='$row->no_aju' and a.kode_lokasi='$row->kode_lokasi'
      group by a.kode_akun,a.kode_lokasi
          )a 
      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
      $rs1 = $dbLib->execute($sql);
      while ($row1 = $rs1->FetchNextObject($toupper=false))
      {
          echo " <tr>
              <td>MTA</td>
              <td>: $row1->kode_akun - $row1->nama_akun </td>
            </tr>";
      }
      echo "<tr>
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
where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi'  and ((nilai+isnull(pajak,0)) <> 0 or isnull(pajak,0) <> 0 or nilai <> 0 )
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
		<td>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
	   <tr align='center'>
        <td width='200'>Mengetahui/Menyetujui :</td>
         <td width='200'>Fiat Bayar </td>
        <td width='200'>Verifikasi</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td >Ka .PP</td>
        <td >&nbsp;</td>
		<td >&nbsp;</td>
        <td >Dibuat Oleh,</td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>AGUS GOUSUR ALAM</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='garis_bawah'>GINA GONIAH</td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>NIP : 17730077-4</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>NIP : 15891754-1</td>
      </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table>
			<DIV style='page-break-after:always'></DIV>";
			echo "<b>RINCIAN PENDAPATAN KANTIN</b><br><br>";
			
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='100' align='center' class='header_laporan'>No Bukti </td>
        <td width='60' align='center' class='header_laporan'>Tanggal</td>
        <td width='150' align='center' class='header_laporan'>Kantin</td>
		<td width='150' align='center' class='header_laporan'>Keterangan</td>
		<td width='90' align='center' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql="select a.no_load,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama as nama_kantin,
	   (a.total_nota) as nilai
from kantin_load a
inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi
where a.no_bast='$row->no_aju'
order by a.tanggal";
		
	  $rs1 = $dbLib->execute($sql);
	  $j=1;$nilai=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
		  echo "<tr>
			<td class='isi_laporan' align='center'>$j</td>
			<td class='isi_laporan'>$row1->no_load</td>
			<td class='isi_laporan'>$row1->tgl</td>
			<td class='isi_laporan'>$row1->nama_kantin</td>
			<td class='isi_laporan'>$row1->keterangan</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		  </tr>";
			$j=$j+1;
		}
		echo "<tr>
			<td class='header_laporan' colspan='5' align='right'>Total</td>
			<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		  </tr>";
    echo "</table> <br>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
