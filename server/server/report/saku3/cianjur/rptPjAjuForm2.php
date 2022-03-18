<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_cianjur_rptPjAjuForm2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_panjar)
from panjar2_m a $this->filter ";
		error_log($sql);
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
		$pathfoto = $path . "";
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
        <td width='650' align='center' class='istyle17'>FORM PENGAJUAN PANJAR 2</td>
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
        echo" <DIV style='page-break-after:always'></DIV>";
    
        $sql="select a.no_panjar,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_setuju,c.nama as nama_buat,d.nama as nama_setuju, c.jabatan as jab_buat,d.jabatan as jab_setuju
from panjar2_m a
inner join pp b on a.kode_pp=b.kode_pp and 
a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_panjar";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pengajuan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_panjar</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
     
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>Kode Akun</td>
    <td width='200' align='center' class='header_laporan'>Nama Akun</td>
    <td width='80' align='center' class='header_laporan'>PP</td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
	 <td width='60' align='center' class='header_laporan'>DRK</td>
    <td width='90' align='center' class='header_laporan'>Debet</td>
    <td width='90' align='center' class='header_laporan'>Kredit</td>

  </tr>";
			$sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan, 
	   case a.dc when 'D' then nilai else 0 end as debet,case a.dc when 'C' then nilai else 0 end as kredit    
from panjar2_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_panjar='$row->no_panjar' 
order by a.kode_akun ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$debet=0; $kredit=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	<td class='isi_laporan'>$row1->kode_drk</td>
    <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
	
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
	
   <td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
  </tr><br>
  </table></td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td><table width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='200' align='center'>&nbsp; </td>
    <td width='200' align='center'>&nbsp; </td>
    <td width='200' align='center'>&nbsp; </td>
    <td width='200' class='header_laporan' align='left'>Cianjur, $row->tanggal </td>
  </tr>
  <tr>
  <td width='200' align='center'>&nbsp; </td>
  <td width='200' align='center'>&nbsp; </td>
  <td width='200' align='center'>&nbsp; </td>
    <td align='left' class='header_laporan' >Mengetahui, </td>
    </tr>
    <tr>
    <td height='80'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td >&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td width='200' class='header_laporan' align='left'> $row->nama_setuju </td>
    </tr>
    <tr>
    <td >&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td width='200' class='header_laporan' align='left'> $row->jab_setuju </td>
    </tr>
</table></td>
</tr>

</table><br>
  <DIV style='page-break-after:always'></DIV>";
		}
        echo "</div>";
        return "";
	}
	
}
?>
  
