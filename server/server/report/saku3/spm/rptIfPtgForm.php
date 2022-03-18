<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptIfPtgForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
	$sql="select a.no_reim,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi,
       a.nik,b.nama as nama_buat,b.jabatan as jabatan_buat,d.kota,a.nilai,
	    c.no_rek,c.nama_rek,c.bank,c.cabang
from spm_ifreim_m a
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
left join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join spm_rek c on a.no_reim=c.no_bukti and a.kode_lokasi=c.kode_lokasi  $this->filter";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/spm_new.png";
		$logo2="image/ypt.jpeg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' align='center'><img src='$logo' width='200' height='70'></td>
        <td width='400' valign='middle'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'><b>PT. SANDHY PUTRA MAKMUR</b></td>
          </tr>
          <tr>
            <td align='center'>Jl. Sisingamangaraja Kav 4 - 6 Kebayoran Baru Jakarta Selatan</td>
          </tr>
          <tr>
            <td align='center'>Tlp. (021) 725 7368</td>
          </tr>
        </table></td>
        <td width='200' align='center'><img src='$logo2' width='160' height='70'></td>
      </tr>
    </table></td>
  </tr>
 
   <tr>
    <td height='60'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center' class='istyle17'>BUKTI PERTANGGUNGAN IMPREST FUND</td>
      </tr>
      <tr>
        <td align='center' class='istyle17'>Nomor : $row->no_reim</td>
      </tr>
    </table></td>
  </tr>
 
 
  <tr>
    <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td height='40' class='isi_bukti'>Yang bertanda tangan dibawah ini memerintahkan kepada Bendahara untuk membayarkan sejumlah uang kepada yang namanya tercantum dibawah ini :</td>
      </tr>
      <tr>
        <td><table width='750' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='200' class='isi_bukti'>Nilai</td>
            <td width='550' class='isi_bukti'>: RP : ".number_format($row->nilai,0,",",".")."  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Terbilang</td>
            <td class='isi_bukti'>: ".$AddOnLib->terbilang($row->nilai)." </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Untuk pembayaran</td>
            <td class='isi_bukti'>: $row->keterangan </td>
          </tr>
          <tr>
            <td class='isi_bukti'>&nbsp;</td>
            <td class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Kepada</td>
            <td class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nama</td>
            <td class='isi_bukti'>: $row->nama_rek </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Alamat</td>
            <td class='isi_bukti'>:  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Cara Pembayaran</td>
            <td class='isi_bukti'>:  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nomor Rekening</td>
            <td class='isi_bukti'>: $row->no_rek </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nama Bank</td>
            <td class='isi_bukti'>: $row->bank </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Cabang</td>
            <td class='isi_bukti'>: $row->cabang </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Atas dasar surat bukti </td>
            <td class='isi_bukti'>:  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Dibebankan pada anggaran </td>
            <td class='isi_bukti'>:  </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td align='center' height='30'>a</td>
  </tr>
 
  <tr>
    <td ><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Yang mengajukan</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>a</td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Mengetahui/ menyetujui</td>
          </tr>
          <tr>
            <td align='center'>GM/ Kepala/ Manajer/</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>a</td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Verifikator</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>a</td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Fiatur/ Appropal</td>
          </tr>
          <tr>
            <td align='center'>Direktur</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>a</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  
 
</table><br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
