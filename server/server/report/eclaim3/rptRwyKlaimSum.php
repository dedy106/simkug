<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim3_rptRwyKlaimSum extends server_report_basic
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
		$sql = "select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis,date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, 
       a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, 
       a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_tel, a.no_fax,
       b.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,f.nama as nama_asuransi,g.nama as nama_curr,
		case  when a.progress='0' then 'Laporan Awal' 
 when a.progress='1' then 'Verifikasi' 
 when a.progress='R' then 'Revisi'  
 when a.progress='2' then 'Survey'  
 when a.progress='3' then 'Final Survey' 
 when a.progress='4' then 'Testing'  
 when a.progress='5' then 'Final Testing'  
 when a.progress='6' then 'Negosiasi' 
 when a.progress='7' then 'Final Negosiasi'  
 when a.progress='8' then 'SPPH' 
 when a.progress='9' then 'SPH'  
 when a.progress='A' then 'PROGRESS PEKERJAAN'  
 when a.progress='B' then 'BAUT' 
 when a.progress='C' then 'BAST'  
 when a.progress='Z' then 'BAST' 
 when a.progress='X' then 'No Claim' end as progress,
	i.no_ver,date_format(i.tanggal,'%d/%m/%Y') as tgl_ver,i.no_dokumen as dok_ver,
	j.no_survey,date_format(j.tanggal,'%d/%m/%Y') as tgl_survey,k.nama as nama_la,j.catatan as cat_survey,
	l.no_survey as no_survey2,date_format(l.tanggal,'%d/%m/%Y') as tgl_survey2,l.catatan as cat_survey2,
	m.no_testing,date_format(m.tanggal,'%d/%m/%Y') as tgl_testing,m.catatan as cat_testing,
	n.no_testing as no_testing2,date_format(n.tanggal,'%d/%m/%Y') as tgl_testing2,n.catatan as cat_testing2,
	o.no_nego,date_format(o.tanggal,'%d/%m/%Y') as tgl_nego,o.catatan as cat_nego,o.nilai_deduc,o.nilai_nego,
	p.no_progress as no_spph,date_format(p.tanggal,'%d/%m/%Y') as tgl_spph,p.catatan as cat_spph,
	q.no_progress as no_sph,date_format(q.tanggal,'%d/%m/%Y') as tgl_sph,q.catatan as cat_sph,
	r.no_wip,date_format(r.tanggal,'%d/%m/%Y') as tgl_wip,r.catatan as cat_wip,
	s.no_ba as no_baut,date_format(s.tanggal,'%d/%m/%Y') as tgl_baut,s.catatan as cat_baut,
	t.no_ba as no_bast,date_format(t.tanggal,'%d/%m/%Y') as tgl_bast,t.catatan as cat_bast,
	v.nama as vendor_spph,x.nama as vendor_sph
from tlk_klaim a
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab
inner join tlk_lokasi e on a.kode_lok=e.kode_lok 
inner join tlk_asuransi f on a.kode_asuransi=f.kode_asuransi
inner join curr g on a.kode_curr=g.kode_curr
left join tlk_ver_d h on a.no_klaim=h.no_bukti
left join tlk_ver_m i on h.no_ver=i.no_ver
left join tlk_survey j on a.no_klaim=j.no_klaim and j.status='SURVEY'
left join tlk_la k on j.kode_la=k.kode_la
left join tlk_survey l on a.no_klaim=l.no_klaim and l.status='FINAL'
left join tlk_testing m on a.no_klaim=m.no_klaim and m.status='TESTING'
left join tlk_testing n on a.no_klaim=n.no_klaim and n.status='FINAL'
left join tlk_nego o on a.no_klaim=o.no_klaim and o.status='NEGO'
left join tlk_progress p on a.no_klaim=p.no_klaim and p.status='SPPH'
left join tlk_progress q on a.no_klaim=q.no_klaim and q.status='SPH'
left join tlk_wip r on a.no_klaim=r.no_klaim and r.status='FINAL'
left join tlk_ba s on a.no_klaim=s.no_klaim and s.status='BAUT'
left join tlk_ba t on a.no_klaim=t.no_klaim and t.status='BAST'
left join tlk_progress_dok u on p.no_progress=u.no_progress
left join tlk_vendor v on u.kode_vendor=v.kode_vendor
left join tlk_progress_dok w on q.no_progress=w.no_progress
left join tlk_vendor x on w.kode_vendor=x.kode_vendor

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
			$img6="image/green.png";$img7="image/red.png";$img8="image/red.png";$img9="image/red.png";$img10="image/red.png";
			$img11="image/red.png";$img12="image/red.png";$img13="image/red.png";$img14="image/red.png";$img15="image/red.png";
			if ($row->no_ver!="") {$img1="image/green.png";};
			if ($row->no_survey!="") {$img2="image/green.png";};
			if ($row->no_survey2!="") {$img3="image/green.png";};
			if ($row->no_testing!="") {$img4="image/green.png";};
			if ($row->no_testing2!="") {$img5="image/green.png";};
			//if ($row->no_dok!="") {$img6="image/green.png";};
			if ($row->no_nego!="") {$img7="image/green.png";};
			if ($row->no_spph!="") {$img8="image/green.png";};
			if ($row->no_wip!="") {$img9="image/green.png";};
			if ($row->no_spk!="") {$img10="image/green.png";};
			if ($row->no_baut!="") {$img11="image/green.png";};
			if ($row->no_bast!="") {$img12="image/green.png";};
			
			if ($row->progress=="15") {$img14="image/green.png";};
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='lokasi_laporan'>RIWAYAT DATA KLAIM </td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellpadding='2' cellspacing='1' bordercolor='#111111' style='border-collapse: collapse'>
      
      <tr>
        <td valign='middle' class='laporan_isi' width='150'><div align='left'>No Klaim </div></td>
        <td class='laporan_isi'>: $row->no_klaim</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi' ><div align='left'>No Dokumen</div></td>
        <td class='laporan_isi'>: $row->no_dokumen</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Tanggal DOL </div></td>
        <td class='laporan_isi'>: $row->tanggal</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Lokasi Kejadian </div></td>
        <td class='laporan_isi'>: $row->alamat</td>
      </tr>
      <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Nilai Estimasi </div></td>
        <td class='laporan_isi'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	  <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Nilai Deductible </div></td>
        <td class='laporan_isi'>:  ".number_format($row->nilai_deduc,0,',','.')."</td>
      </tr>
	  <tr>
        <td valign='middle' class='laporan_isi'><div align='left'>Nilai Adjust </div></td>
        <td class='laporan_isi'>:  ".number_format($row->nilai_nego,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><strong>Progress Klaim : $row->progress </strong></td>
  </tr>
  <tr>
    <td><table width='700' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
         <td colspan='3' ><strong>Verifikasi</strong></td>
       </tr>
      <tr>
        <td width='22' align='center'><img src='$img1' width='14' height='14'></td>
        <td width='156'>Verifikasi</td>
        <td width='508'>: $row->tgl_ver - $row->dok_ver </td>
      </tr>
      
      <tr>
        <td colspan='3'><strong>Survey</strong></td>
      </tr>
	  <tr>
        <td align='center'><img src='$img2' width='14' height='14'></td>
        <td>Loss Adjuster</td>
        <td>: $row->nama_la</td>
      </tr>
      <tr>
        <td align='center'><img src='$img2' width='14' height='14'></td>
        <td>Proses Survey</td>
        <td>: $row->tgl_survey - $row->cat_survey </td>
      </tr>
	   <tr>
        <td align='center'><img src='$img3' width='14' height='14'></td>
        <td>Final Survey</td>
        <td>: $row->tgl_survey2 - $row->cat_survey2 </td>
      </tr>
       <tr>
         <td colspan='3'><strong>Testing</strong></td>
       </tr>
     
      <tr>
        <td align='center'><img src='$img5' width='14' height='14'></td>
        <td>Final Testing</td>
        <td>: $row->tgl_testing2 - $row->cat_testing2 </td>
      </tr>
     
      <tr>
        <td colspan='3'><strong>Negosiasi </strong></td>
      </tr>
      <tr>
        <td align='center'><img src='$img8' width='14' height='14'></td>
        <td>Proses SPPH</td>
        <td>: $row->tgl_spph - $row->cat_spph - $row->vendor_spph</td>
      </tr>
      <tr>
        <td align='center'><img src='$img9' width='14' height='14'></td>
        <td>Proses SPH</td>
        <td>: $row->tgl_sph - $row->cat_sph - $row->vendor_sph</td>
       <tr>
        <td align='center'><img src='$img7' width='14' height='14'></td>
        <td>Negosiasi</td>
        <td>: $row->tgl_nego - $row->cat_nego </td>
      </tr>
	    <tr>
         <td colspan='3'><strong>Pekerjaan Vendor</strong></td>
       </tr>
      <tr>
        <td align='center'><img src='$img9' width='14' height='14'></td>
        <td>Pekerjaan Vendor</td>
        <td>: $row->tgl_wip - $row->cat_wip</td>
      </tr>
       <tr>
         <td colspan='3'><strong>BAST</strong></td>
       </tr>
      <tr>
        <td align='center'><img src='$img11' width='14' height='14'></td>
        <td>BAUT</td>
        <td>: $row->tgl_baut - $row->cat_baut </td>
      </tr>
	  <tr>
        <td align='center'><img src='$img12' width='14' height='14'></td>
        <td>BAST </td>
        <td>: $row->tgl_bast - $row->cat_bast </td>
      </tr>
	   <tr>
         <td colspan='3'><strong>Kelengkapan Dokumen</strong></td>
       </tr>";
	   $sql1="select a.no_dok,b.nama as nama_dok,a.no_file,a.ket_dok
from tlk_dok_d a
inner join tlk_ref b on a.kode_ref=b.kode_ref
inner join tlk_dok_m c on a.no_dok=c.no_dok 
where c.no_klaim = '$row->no_klaim' order by a.kode_ref ";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		$gambar=$path.$row1->no_file;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
	  echo "<tr>
        <td align='center'><img src='$img6' width='14' height='14'></td>
        <td colspan='2'>$row1->nama_dok - $row1->ket_dok</td>
       
      </tr>
	
    ";
		}
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
  
