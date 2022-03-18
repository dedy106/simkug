<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptRwyKlaimSumSwa extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$sql = "select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, 
       a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, 
       a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax,a.keterangan,
       b.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,f.nama as nama_asuransi,g.nama as nama_curr,
	   case  when a.progress='0' then 'Laporan Awal' 
 when a.progress='1' then 'Verifikasi' 
 when a.progress='2' then 'Pelaksanaan Pekerjaan'  
 when a.progress='3' then 'BAST' 
 when a.progress='4' then 'Kelengkapan Dokumen'  
 when a.progress='5' then 'Konfirmasi'  
 end as progress,
      date_format(h.tanggal,'%d/%m/%Y') as tgl_ver,
      date_format(i.tanggal,'%d/%m/%Y') as tgl_pelaksanaan,
      date_format(j.tanggal,'%d/%m/%Y') as tgl_bast,
      date_format(k.tanggal,'%d/%m/%Y') as tgl_dok,
      date_format(l.tanggal,'%d/%m/%Y') as tgl_konfirmasi,
      m.nama as nama_vendor,
	  h.no_ver,i.no_bantek,j.no_bast,k.no_dok,l.no_adjust
from tlk_klaim a
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
inner join tlk_lokasi e on a.kode_lok=e.kode_lok 
inner join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi
inner join curr g on a.kode_curr=g.kode_curr
left join tlk_ver_swa h on a.no_klaim=h.no_klaim
left join tlk_bantek_swa i on a.no_klaim=i.no_klaim
left join tlk_bast_swa j on a.no_klaim=j.no_klaim
left join tlk_dok_m_swa k on a.no_klaim=k.no_klaim
left join tlk_adjust_swa l on a.no_klaim=l.no_klaim
left join tlk_vendor m on i.kode_vendor=m.kode_vendor
 ".$this->filter;
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			$nilai=number_format($row->nilai,0,',','.');
			$img1="image/red.png";$img2="image/red.png";$img3="image/red.png";$img4="image/red.png";$img5="image/red.png";
			$img6="image/red.png";$img7="image/red.png";$img8="image/red.png";$img9="image/red.png";$img10="image/red.png";
			$img11="image/red.png";$img12="image/red.png";$img13="image/red.png";$img14="image/red.png";$img15="image/red.png";
			if ($row->no_ver!="") {$img1="image/green.png";};
			if ($row->no_bantek!="") {$img2="image/green.png";};
			if ($row->no_bast!="") {$img3="image/green.png";};
			if ($row->no_dok!="") {$img4="image/green.png";};
			if ($row->no_adjust!="") {$img5="image/green.png";};
			
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>DATA KLAIM </td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellpadding='2' cellspacing='1' bordercolor='#111111' style='border-collapse: collapse'>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Tertanggung </div></td>
        <td width='76%' class='laporan_isi'>: $row->nama_ttg</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Berkas </div></td>
        <td class='laporan_isi'>: $row->no_klaim</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>Jenis Asuransi </div></td>
        <td class='laporan_isi'>: $row->nama_asuransi</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Polis</div></td>
        <td class='laporan_isi'>: $row->no_polis</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Dokumen</div></td>
        <td class='laporan_isi'>: $row->no_dokumen</td>
      </tr>
      <tr>
        <td height='26' valign='middle' class='laporan_isi'><div align='left'>Tanggal Kejadian </div></td>
        <td class='laporan_isi'>: $row->tanggal</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>Lokasi </div></td>
        <td width='76%' class='laporan_isi'>: $row->nama_lok</td>
      </tr>
      <tr>
        <td height='25' valign='middle' class='laporan_isi'><div align='left'>Lokasi Kejadian </div></td>
        <td class='laporan_isi'>: $row->alamat</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Obyek Kerugian </div></td>
        <td width='76%' class='laporan_isi'>: $row->nama_obyek</td>
      </tr>
     
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Penyebab Kerugian</div></td>
        <td class='laporan_isi'>: $row->nama_sebab</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Kronologi </div></td>
        <td class='laporan_isi'>: $row->penyebab</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Tindakan </div></td>
        <td class='laporan_isi'>: $row->tindakan</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Estimasi </div></td>
        <td class='laporan_isi'>: $row->kode_curr $nilai ( $terbilang ) </td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>Kontak Person </div></td>
        <td class='laporan_isi'>: $row->pic</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Telepon</div></td>
        <td class='laporan_isi'>: $row->no_telp</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Faximile </div></td>
        <td class='laporan_isi'>: $row->no_fax</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Progress Klaim : $row->progress </td>
  </tr>
  <tr>
    <td><table width='700' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='22' align='center'><img src='$img1' width='14' height='14'></td>
        <td width='156'>Verifikasi</td>
        <td width='508'>: $row->tgl_ver  </td>
      </tr>
      <tr>
        <td align='center'><img src='$img2' width='14' height='14'></td>
        <td>Pelaksanaan Pekerjaan</td>
        <td>: $row->tgl_pelaksanaan - $row->nama_vendor </td>
      </tr>
      <tr>
        <td align='center'><img src='$img3' width='14' height='14'></td>
        <td>BAST</td>
        <td>: $row->tgl_bast </td>
      </tr>
      <tr>
        <td align='center'><img src='$img4' width='14' height='14'></td>
        <td>Kelengkapan Dokumen</td>
        <td>: $row->tgl_dok </td>
      </tr>
      <tr>
        <td align='center'><img src='$img5' width='14' height='14'></td>
        <td>Konfirmasi </td>
        <td>: $row->tgl_konfirmasi </td>
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
  
