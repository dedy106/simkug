<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim_rptLapAwal extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(a.no_klaim) 
from eclaim_klaim a
inner join eclaim_ttg b on a.kode_ttg=b.kode_ttg
inner join eclaim_obyek c on a.kode_obyek=c.kode_obyek
inner join eclaim_sebab d on a.kode_sebab=d.kode_sebab
inner join eclaim_lokasi e on a.kode_lok=e.kode_lok ".$this->filter;
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$sql = "select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, 
       a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, 
       a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax,a.keterangan,
       b.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,f.nama as nama_asuransi,g.nama as nama_curr,a.nik_user 
from eclaim_klaim a
inner join eclaim_ttg b on a.kode_ttg=b.kode_ttg
inner join eclaim_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=b.kode_ttg
inner join eclaim_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=b.kode_ttg
inner join eclaim_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=b.kode_ttg
inner join eclaim_asuransi f on a.kode_asuransi=f.kode_asuransi 
inner join eclaim_curr g on a.kode_curr=g.kode_curr ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan klaim awal",$this->lokasi,"");
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			$nilai=number_format($row->nilai,0,',','.');
			echo "<table width='600' border='1' align='center' cellpadding='2' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
  <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Tertanggung </div></td>

    <td width='76%' class='laporan_isi'>$row->nama_ttg</td>
  </tr>
  <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>No Berkas </div></td>
    <td class='laporan_isi'>$row->no_klaim</td>
  </tr>
  <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>Jenis Asuransi </div></td>
    <td class='laporan_isi'>$row->nama_asuransi</td>
  </tr>
  <tr>

    <td valign='middle' class='laporan_isi' ><div align='left'>No Polis</div></td>
    <td class='laporan_isi'>$row->no_polis</td>
  </tr>
  <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>No Dokumen</div></td>
    <td class='laporan_isi'>$row->no_klaim</td>
  </tr>
  <tr>
    <td height='26' valign='middle' class='laporan_isi'><div align='left'>Tanggal 
      Kejadian </div></td>
    <td class='laporan_isi'>$row->tanggal</td>
  </tr>
<tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>Lokasi </div></td>
    <td width='76%' class='laporan_isi'>$row->nama_lok</td>
  </tr>
  <tr>
    <td height='25' valign='middle' class='laporan_isi'><div align='left'>Lokasi 
      Kejadian </div></td>
    <td class='laporan_isi'>$row->alamat</td>
  </tr>
 <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Obyek Kerugian </div></td>
    <td width='76%' class='laporan_isi'>$row->nama_obyek</td>
  </tr>
  <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Ket. Kerusakan</div></td>
    <td width='76%' class='laporan_isi'>$row->keterangan</td>
  </tr>
  
 <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Penyebab Kerugian</div></td>
    <td class='laporan_isi'>$row->nama_sebab</td>
  </tr>
   <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Kronologi </div></td>
    <td class='laporan_isi'>$row->penyebab</td>

  </tr>
  <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Tindakan </div></td>
    <td class='laporan_isi'>$row->tindakan</td>
  </tr>
  
  <tr>
    <td valign='middle' class='laporan_isi'><div align='left'>Estimasi </div></td>
    <td class='laporan_isi'>$row->kode_curr $nilai ( $terbilang ) </td>
  </tr>
  <tr>

    <td valign='middle' class='laporan_isi' ><div align='left'>Kontak Person </div></td>
    <td class='laporan_isi'>$row->pic</td>
  </tr>
  <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>No Telepon</div></td>
    <td class='laporan_isi'>$row->no_telp</td>
  </tr>

  <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>No Faximile </div></td>
    <td class='laporan_isi'>$row->no_fax</td>
  </tr>
   <tr>
    <td valign='middle' class='laporan_isi' ><div align='left'>NIK user</div></td>
    <td class='laporan_isi'>$row->nik_user</td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
	
		echo "</div>";
			
		return "";
	}
	
}
?>
  
