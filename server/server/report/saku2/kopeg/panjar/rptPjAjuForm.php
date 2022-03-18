<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_panjar_rptPjAjuForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(no_panjar) from panjar2_m  $this->filter ";
		
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
		$sql="select a.no_panjar,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_lokasi,a.keterangan,a.nik_buat,a.nik_setuju,c.nama as nama_buat,d.nama as nama_setuju,
       a.kode_pp,a.nilai,a.akun_panjar as kode_akun,e.nama as nama_akun,date_format(a.due_date,'%d/%m/%Y') as due_date,c.jabatan as jab_buat,d.jabatan as jab_setuju,a.kode_pp
from panjar2_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join masakun e on a.akun_panjar=e.kode_akun and a.kode_lokasi=e.kode_lokasi $this->filter order by a.no_panjar";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/logo_cianjur.jpg";
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150' height='100' rowspan='2'><img src='$pathfoto ' width='100' height='100'></td>
        <td width='650' align='center' class='istyle17'>FORM PENGAJUAN PANJAR </td>
      </tr>
      <tr>
        <td align='center' valign='top' class='istyle15'>$row->no_panjar</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Mohon bantuan Saudara untuk membayarkan uang sejumlah Rp. ".number_format($row->nilai,0,',','.')." </td>
        </tr>
      <tr>
        <td width='150'>Terbilang</td>
        <td width='650'>: ".$AddOnLib->terbilang($row->nilai)." </td>
      </tr>
      <tr>
        <td>Kepada<br></td>
        <td>  </td>
      </tr>
      <tr>
        <td>Nama</td>
        <td>: $row->nama_buat </td>
      </tr>
      <tr>
        <td>Alamat<br></td>
        <td>:  </td>
      </tr>
      <tr>
        <td>No Rekening<br></td>
        <td>:  </td>
      </tr>
      <tr>
        <td>Nama Bank<br></td>
        <td>:  </td>
      </tr>
      <tr>
        <td>Alamat Bank<br></td>
        <td>:  </td>
      </tr>
      <tr>
        <td>Nama Rekening</td>
        <td>:  </td>
      </tr>
      <tr>
        <td>Untuk Pembayaran</td>
        <td>: $row->keterangan </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Yang akan dipertanggungkan sesuai dengan pernyataan dibawah ini :</td>
      </tr>
      <tr>
        <td>Bahwa Pemegang Panjar diatas, sangup menyelesaikan dan mempertanggungkannya paling lambat tanggal : $row->due_date <br>
          Dan apabila sampai batas waktunya belum dapat mempertanggungkan, baik sebagian maupun seluruhnya, maka berkesanggupan<br>
          untuk menggantinya dengan pemotongan gaji tanpa pemberitahuan terlebih dahulu</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td width='400' rowspan='6' valign='top'>Catatan :<br>
             $row->no_dokumen</td>
            <td colspan='2'>Verifikasi Anggaran</td>
            </tr>
          <tr>
            <td width='100'>Tanggal<br></td>
            <td width='300'> $row->tanggal </td>
          </tr>
          <tr>
            <td>              Anggaran</td>
            <td>  </td>
          </tr>
          <tr>
            <td>No Perkiraan</td>
            <td> $row->kode_akun - $row->nama_akun </td>
          </tr>
          <tr>
            <td>Cost Center</td>
            <td $row->kode_pp </td>
          </tr>
          <tr>
            <td>Saldo</td>
            <td>  </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td colspan='3'>&nbsp;</td>
            <td colspan='2'>Cianjur, $row->tanggal</td>
            </tr>
          <tr>
            <td colspan='2' rowspan='4' align='center'>&nbsp;</td>
            <td width='230' align='center'>Mengetahui,<br></td>
            <td width='155' rowspan='4'>&nbsp;</td>
            <td width='230' align='center'>Pemegang Panjar</td>
          </tr>
          <tr>
            <td align='center'>$row->jab_setuju<br></td>
            <td align='center'>$row->jab_buat</td>
          </tr>
          <tr>
            <td height='60' align='center'>&nbsp;</td>
            <td align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>$row->nama_setuju</td>
            <td align='center'>$row->nama_buat</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>Lembar 1 : Unit Kerja Kas dan Bank</td>
      </tr>
      <tr>
        <td>Lembar 2 : Unit Kerja yang bersangkutan [Arsip]</td>
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
