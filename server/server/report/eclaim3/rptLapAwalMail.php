<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim3_rptLapAwalMail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(a.no_klaim) 
from tlk_klaim a
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
inner join tlk_lokasi e on a.kode_lok=e.kode_lok ".$this->filter;
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
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"))."media/";		
		$tmp=explode("/",$this->filter2);
		$email=$tmp[0];
		$emailadm=$tmp[1];
		$emailttg=$tmp[2];
		$sts_admin=$tmp[3];
		$fromadm=$tmp[4];
		$sql = "select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, 
       a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, date_format(a.tgl_input,'%d/%m/%Y %h:%m') as tgl_input,
       a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax,a.keterangan,a.host,a.ip,
       b.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,f.nama as nama_asuransi,g.nama as nama_curr 
from tlk_klaim a
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
inner join tlk_lokasi e on a.kode_lok=e.kode_lok 
inner join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi
inner join curr g on a.kode_curr=g.kode_curr ".$this->filter;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$mail=new server_util_mail();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			$nilai=number_format($row->nilai,0,',','.');
			$no_klaim=$row->no_klaim;
			echo "<table width='600' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'  class='lokasi_laporan'>LAPORAN AWAL KLAIM</td>
  </tr>
  <tr>
    <td align='center'  class='lokasi_laporan'>PT. SARANA JANESIA UTAMA </td>
  </tr>
  <tr>
    <td><table width='600' border='1' align='center' cellpadding='2' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Tertanggung </td>
        <td width='76%' class='laporan_isi' align='left'>$row->nama_ttg</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>No Berkas </td>
        <td class='laporan_isi' align='left'>$row->no_klaim</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Jenis Asuransi </td>
        <td class='laporan_isi' align='left'>$row->nama_asuransi</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>No Polis</td>
        <td class='laporan_isi' align='left'>$row->no_polis</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>No Dokumen</td>
        <td class='laporan_isi' align='left'>$row->no_klaim</td>
      </tr>
      <tr>
        <td height='26' valign='middle' class='laporan_isi' align='left'>Tanggal Kejadian </td>
        <td class='laporan_isi' align='left'>$row->tanggal</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Lokasi </td>
        <td width='76%' class='laporan_isi' align='left'>$row->nama_lok</td>
      </tr>
      <tr>
        <td height='25' valign='middle' class='laporan_isi' align='left'>Lokasi Kejadian </td>
        <td class='laporan_isi' align='left'>$row->alamat</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Obyek Kerugian </td>
        <td width='76%' class='laporan_isi' align='left'>$row->nama_obyek</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Ket. Kerusakan</td>
        <td width='76%' class='laporan_isi' align='left'>$row->keterangan</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Penyebab Kerugian</td>
        <td class='laporan_isi' align='left'>$row->nama_sebab</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Kronologi </td>
        <td class='laporan_isi' align='left'>$row->penyebab</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Tindakan </td>
        <td class='laporan_isi' align='left'>$row->tindakan</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Estimasi </td>
        <td class='laporan_isi' align='left'>$row->kode_curr $nilai ( $terbilang ) </td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>Kontak Person </td>
        <td class='laporan_isi' align='left'>$row->pic</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>No Telepon</td>
        <td class='laporan_isi' align='left'>$row->no_telp</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' align='left'>No Faximile </td>
        <td class='laporan_isi' align='left'>$row->no_fax</td>
      </tr>";
	  if ($sts_admin=="A")
	  {
	  echo "<tr>
        <td colspan='2' valign='middle' style='font:9px;color:grey' align='left'>* Host : $row->host &nbsp;|&nbsp;IP :$row->ip&nbsp;|&nbsp;$row->tgl_input</td>
        </tr>";
		}
    echo "</table></td>
  </tr>
  
  
 
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		$html=ob_get_contents();
		$numSent = $mail->sendMail($fromadm,$email,$emailadm,$emailttg,"laporan awal klaim $no_klaim", $html,null);
		return "";
	}
	
}
?>
  
