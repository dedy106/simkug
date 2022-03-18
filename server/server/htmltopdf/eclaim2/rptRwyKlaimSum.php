<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptRwyKlaimSum extends server_report_basic
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
		h.no_dokumen as dok_ver,date_format(h.tanggal,'%d/%m/%Y') as tgl_ver,
		date_format(i.tanggal,'%d/%m/%Y') as tgl_bantek,j.nama as vendor_bantek,
		date_format(k.tanggal,'%d/%m/%Y') as tgl_survey,l.nama as la,
		case when k.status='1' then 'Liable' else 'Not Liable' end as sts_survey,
		date_format(m.tanggal,'%d/%m/%Y') as tgl_testing,
		date_format(n.tanggal,'%d/%m/%Y') as tgl_tuntutan,
		date_format(o.tanggal,'%d/%m/%Y') as tgl_adjust,o.nilai as nilai_adjust,o.nilai_ddct,
		date_format(p.tanggal,'%d/%m/%Y') as tgl_df,
		date_format(q.tanggal,'%d/%m/%Y') as tgl_dok,date_format(r.tgl_penunjukan,'%d/%m/%Y') as tgl_penunjukan,r.vendor_penunjukan,
		date_format(s.tanggal,'%d/%m/%Y') as tgl_pelaksanaan,date_format(w.tgl_progress,'%d/%m/%Y') as tgl_progress,
		date_format(t.tanggal,'%d/%m/%Y') as tgl_baut,date_format(u.tanggal,'%d/%m/%Y') as tgl_bastpar,date_format(v.tanggal,'%d/%m/%Y') as tgl_bastful,
		h.no_ver,i.no_bantek,k.no_survey,m.no_testing,n.no_tuntutan,o.no_adjust,q.no_dok,o.no_adjust,p.no_df,r.no_penunjukan,s.no_pelaksanaan,
		t.no_baut,u.no_bast as no_bastpar,v.no_bast,w.no_progress,
		case  when a.progress='0' then 'Laporan Awal' 
 when a.progress='1' then 'Verifikasi' 
 when a.progress='2' then 'Bantek'  
 when a.progress='3' then 'Survey' 
 when a.progress='4' then 'Pengetesan'  
 when a.progress='5' then 'Tuntutan Klaim'  
 when a.progress='6' then 'Negosiasi' 
 when a.progress='7' then 'Kelengkapan Dokumen'  
 when a.progress='8' then 'Penunjukan Mitra Kerja' 
 when a.progress='9' then 'Pelaksanaan Pekerjaan'  
 when a.progress='10' then 'Progress Pekerjaan'  
 when a.progress='11' then 'BAUT' 
 when a.progress='12' then 'BAST Parsial'  
 when a.progress='13' then 'BAST'  
 when a.progress='14' then 'Discharge Form' end as progress
from tlk_klaim a
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
inner join tlk_lokasi e on a.kode_lok=e.kode_lok 
inner join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi
inner join curr g on a.kode_curr=g.kode_curr
left join tlk_ver h on a.no_klaim=h.no_klaim
left join tlk_bantek i on a.no_klaim=i.no_klaim
left join tlk_vendor j on i.kode_vendor=j.kode_vendor
left join tlk_survey k on a.no_klaim=k.no_klaim
left join tlk_la l on k.kode_la=l.kode_la
left join tlk_testing m on a.no_klaim=m.no_klaim
left join tlk_tuntutan n on a.no_klaim=n.no_klaim
left join tlk_adjust o on a.no_klaim=o.no_klaim
left join tlk_df p on a.no_klaim=p.no_klaim
left join tlk_dok_m q on a.no_klaim=q.no_klaim 
left join (select a.no_klaim,a.tanggal as tgl_penunjukan,a.no_penunjukan,c.nama as vendor_penunjukan 
	   from tlk_penunjukan a
	   inner join tlk_penunjukan_d b on a.no_penunjukan=b.no_penunjukan
	   inner join tlk_vendor c on c.kode_vendor=b.kode_vendor
	   ) r on a.no_klaim=r.no_klaim 
left join tlk_pelaksanaan s on a.no_klaim=s.no_klaim	
left join tlk_baut t on a.no_klaim=t.no_klaim
left join tlk_bast u on a.no_klaim=u.no_klaim and u.jenis='PAR'
left join tlk_bast v on a.no_klaim=v.no_klaim and v.jenis='FUL'
left join (select no_klaim,no_klaim as no_progress,max(tanggal) as tgl_progress  from tlk_progresspk group by no_klaim) w on a.no_klaim=w.no_klaim
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
			if ($row->no_survey!="") {$img3="image/green.png";};
			if ($row->no_testing!="") {$img4="image/green.png";};
			if ($row->no_tuntutan!="") {$img5="image/green.png";};
			if ($row->no_dok!="") {$img6="image/green.png";};
			if ($row->no_adjust!="") {$img7="image/green.png";};
			if ($row->no_penunjukan!="") {$img8="image/green.png";};
			if ($row->no_pelaksanaan!="") {$img9="image/green.png";};
			if ($row->no_progress!="") {$img10="image/green.png";};
			if ($row->no_baut!="") {$img11="image/green.png";};
			if ($row->no_bastpar!="") {$img12="image/green.png";};
			if ($row->no_bast!="") {$img13="image/green.png";};
			if ($row->no_df!="") {$img14="image/green.png";};
			if ($row->progress=="15") {$img14="image/green.png";};
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
        <td width='508'>: $row->tgl_ver - $row->dok_ver </td>
      </tr>
      
      <tr>
        <td align='center'><img src='$img3' width='14' height='14'></td>
        <td>Survey</td>
        <td>: $row->tgl_survey - $row->la </td>
      </tr>
      <tr>
        <td align='center'><img src='$img4' width='14' height='14'></td>
        <td>Pengetesan</td>
        <td>: $row->tgl_testing </td>
      </tr>
      
      <tr>
        <td align='center'><img src='$img6' width='14' height='14'></td>
        <td>Kelengkapan Dokumen </td>
        <td>: $row->tgl_dok </td>
      </tr>
	  <tr>
        <td align='center'><img src='$img7' width='14' height='14'></td>
        <td>Negosiasi</td>
        <td>: $row->tgl_adjust </td>
      </tr>
      <tr>
        <td align='center'><img src='$img8' width='14' height='14'></td>
        <td>Progress Pekerjaan</td>
        <td>: $row->tgl_penunjukan $row->vendor_penunjukan</td>
      </tr>
     
      <tr>
        <td align='center'><img src='$img13' width='14' height='14'></td>
        <td>BAST </td>
        <td>: $row->tgl_bastful </td>
      </tr>
    ";
	   if ($row->sts_survey=="Not Liable")
	   {
	   echo "<tr>
        <td align='center'><img src='$img15' width='14' height='14'></td>
        <td>No Claim </td>
        <td>: $row->tgl_survey </td>
      </tr>";
	  }
    echo "</table></td>
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
  
