<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptPbAsur extends server_report_basic
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
    $kode_lokasi = $tmp[1];
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,i.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,i.kode_akun,c.nama as nama_akun,
		i.kode_drk,e.nama as nama_drk,h.logo,h.alamat,h.kota,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
from pbh_pb_m a
inner join pbh_pb_j i on a.no_pb=i.no_pb and a.kode_lokasi=i.kode_lokasi
inner join pp b on i.kode_pp=b.kode_pp and i.kode_lokasi=b.kode_lokasi
inner join masakun c on i.kode_akun=c.kode_akun and i.kode_lokasi=c.kode_lokasi
left join drk e on i.kode_drk=e.kode_drk and i.kode_lokasi=e.kode_lokasi and e.tahun='2020'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_pb";
		
$root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat</td>
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
        <td width='600' class='judul_bukti'>$row->no_pb </td>
        <td rowspan='8' style='vertical-align:top'><img alt='$row->no_pb' src='$root_app/barcode.php?size=30&amp;text=$row->no_pb'></td>
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
from pbh_rek
where no_bukti='$row->no_pb' and kode_lokasi='$row->kode_lokasi' 
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
        <td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
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
        <td height='70' class='garis_bawah'>$row->nama_app</td>";
        if($kode_lokasi == "11"){

          echo"
          <td>Nurlaela</td>
          <td> Tiene Yaniwati</td>";
        }else{
          
          echo"
          <td>&nbsp;</td>
          <td>&nbsp;</td>";
        }
        echo"
        <td class='garis_bawah'>$row->nama_user </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>NIP : $row->nik_app</td>
        <td>&nbsp;</td>
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
		echo "</div>";
		return "";
		
	}
	
}
?>