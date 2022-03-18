<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptPtgPanjar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_aju)
from it_aju_m a
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
		$tahun=substr($tmp[0],0,4);
		$sql="select a.no_aju,a.tanggal as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		d.bank,d.no_rek,d.nama_rek,a.nilai,a.kode_drk,e.nama as nama_drk,a.no_aju,f.nilai as nilai_panjar,a.nilai-f.nilai as sisa
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join it_aju_rek d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi 
left join it_aju_m f on a.no_ptg=f.no_aju and a.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_aju";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN PANJAR</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='170' height='25'>Nomor  Pertanggungan</td>
        <td class='judul_bukti'> $row->no_aju</td>
      </tr>
      <tr>
        <td height='25'>Tanggal </td>
        <td class='istyle15'>: $row->tgl</td>
      </tr>
     
      <tr>
        <td height='25'>Nomor Panjar</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO.</td>
        <td width='100' align='center' class='isi_bukti'>MTP</td>
        <td width='80' align='center' class='isi_bukti'>KODE PP </td>
        <td width='100' align='center' class='isi_bukti'>KODE DRK </td>
        <td width='250' align='center' class='isi_bukti'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti'>JUMLAH (RP) </td>
      </tr>
      <tr>
        <td class='isi_bukti' align='center'>1</td>
        <td class='isi_bukti'>$row->kode_akun</td>
        <td class='isi_bukti'>$row->kode_pp</td>
        <td class='isi_bukti'>$row->kode_drk</td>
        <td class='isi_bukti'>$row->keterangan</td>
        <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
      </tr>";
	  for ($x = 0; $x <= 10; $x++) {
	 echo "<tr>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>&nbsp;</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='5' align='center' class='isi_bukti'>TOTAL</td>
        <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td valign='top'>REALISASI :</td>
		<td>&nbsp;</td>
        <td>REKAP : </td>
      </tr>
      <tr>
        <td width='400' valign='top'><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='isi_bukti'>NO</td>
            <td width='80' align='center' class='isi_bukti'>MTP</td>
            <td width='200' align='center' class='isi_bukti'>NAMA MTP </td>
            <td width='90' align='center' class='isi_bukti'>JUMLAH</td>
          </tr>
          <tr>
            <td class='isi_bukti' align='center'>1</td>
            <td class='isi_bukti'>$row->kode_akun</td>
           <td class='isi_bukti'>$row->nama_akun</td>
             <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
          </tr>";
		    for ($x = 2; $x <= 5; $x++) {
	 echo "<tr>
            <td class='isi_bukti' align='center'>$x</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>";
		}
          echo "<tr>
            <td colspan='3' align='center'>TOTAL REALISASI</td>
            <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
          </tr>
        </table></td>
		<td width='40'>&nbsp;</td>
        <td width='360' valign='top'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='150' height='20' class='isi_bukti'>JUMLAH PANJAR (+)</td>
            <td width='30'>Rp.</td>
            <td width='90' class='isi_bukti' align='right'>".number_format($row->nilai_panjar,0,",",".")."</td>
          </tr>
          <tr>
            <td height='20' class='isi_bukti'>JUMLAH REALISASI (-) </td>
            <td>Rp.</td>
            <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
          </tr>
          <tr>
            <td height='20' class='isi_bukti'>SISA PANJAR (-/+)</td>
            <td>Rp.</td>
            <td class='isi_bukti' align='right'>".number_format($row->sisa,0,",",".")."</td>
          </tr>
          <tr>
            <td height='20' class='isi_bukti'>TERBILANG :</td>
            <td>&nbsp;</td>
           <td>&nbsp;</td>
          </tr>
          <tr>
            <td height='20' colspan='3'>".$AddOnLib->terbilang($row->nilai)."</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
 <tr>
    <td class='isi_bukti' align='right'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>

      <tr>
        <td width='150' align='center'>Fiatur</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Verifikasi</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Mengetahui Ka. PP</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Yang Mempertanggungkan </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
		<td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='garis_bawah'>&nbsp;</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>&nbsp;</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>&nbsp;</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>&nbsp;</td>
      </tr>
      <tr>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP :</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='isi_laporan'>MODUL : KUG=06 </td>
        <td colspan='2' class='isi_laporan'>TELKOM UNIVERSITY </td>
        </tr>
      <tr>
        <td width='299' align='left' class='isi_laporan'>Lembar 1. Bendaharawan </td>
        <td width='225' align='center' class='isi_laporan'>Lembar 2. Akuntansi </td>
        <td width='262' align='right' class='isi_laporan'>Lembar 3. Pemegang Panjar </td>
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
