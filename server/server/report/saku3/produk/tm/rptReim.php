<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_tm_rptReim extends server_report_basic
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
		$sql="select a.no_reim,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,
		f.nama as nama_user
from if_reim_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_reim"; 

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tm.png";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>Jalan Cisanggarung No.2 Bandung 40115 Indonesia</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN KUITANSI</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='170' height='25'>Nomor  Reimburse</td>
        <td class='judul_bukti'> $row->no_reim</td>
      </tr>
      <tr>
        <td height='25'>Tanggal </td>
        <td class='istyle15'>: $row->tgl</td>
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
      </tr>";
	  $sql="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.nilai 
			from if_reim_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi'
			order by a.kode_akun ";
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td class='isi_bukti' align='center'>$j</td>
        <td class='isi_bukti'>$row1->kode_akun</td>
        <td class='isi_bukti'>$row1->kode_pp</td>
        <td class='isi_bukti'>$row1->kode_drk</td>
        <td class='isi_bukti'>$row1->keterangan</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
			$j+=1;
		}
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
        <td width='400' class='isi_bukti'>REALISASI :</td>
        <td width='400' class='isi_bukti'>TERBILANG :</td>
      </tr>
      <tr>
        <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='isi_bukti'>NO</td>
            <td width='80' align='center' class='isi_bukti'>MTP</td>
            <td width='200' align='center' class='isi_bukti'>NAMA MTP </td>
            <td width='90' align='center' class='isi_bukti'>JUMLAH</td>
          </tr>";
		  $sql="select a.kode_akun,b.nama,sum(a.nilai) as nilai 
			from if_reim_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi'
			group by a.kode_akun,b.nama ";
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
          echo "<tr>
            <td class='isi_bukti' align='center'>$j</td>
            <td class='isi_bukti'>$row1->kode_akun</td>
           <td class='isi_bukti'>$row1->nama</td>
             <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
          </tr>";
			$j+=1;
		}
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
        <td valign='top'>".$AddOnLib->terbilang($row->nilai)."</td>
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
        <td class='garis_bawah'>$row->nama_app</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>$row->nama_user</td>
      </tr>
      <tr>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP : $row->nik_app</td>
		<td>&nbsp;</td>
        <td >NIP : $row->nik_user</td>
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
