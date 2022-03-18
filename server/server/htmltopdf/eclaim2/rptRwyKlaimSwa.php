<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptRwyKlaimSwa extends server_report_basic
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
		$sql = "select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, 
       a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, 
       a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax,a.keterangan,
       b.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,f.nama as nama_asuransi,g.nama as nama_curr,
		h.no_ver,h.no_dokumen as dok_ver,date_format(h.tanggal,'%d/%m/%Y') as tgl_ver,h.keterangan as ket_ver,
		i.no_bantek,i.no_dokumen as dok_bantek,date_format(i.tanggal,'%d/%m/%Y') as tgl_bantek,i.keterangan as ket_bantek,m.nama as nama_vendor,
		l.no_adjust,l.no_dokumen as dok_adjust,date_format(l.tanggal,'%d/%m/%Y') as tgl_adjust,l.keterangan as ket_adjust,
		j.no_bast,j.no_dokumen as dok_bast,date_format(j.tanggal,'%d/%m/%Y') as tgl_bast,j.keterangan as ket_bast
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
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
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
        <td valign='middle' class='laporan_isi'><div align='left'>Ket. Kerusakan</div></td>
        <td width='76%' class='laporan_isi'>: $row->keterangan</td>
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
    <td>Data Verifikasi</td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='100' class='laporan_isi'>No Verifikasi </td>
        <td width='100' class='laporan_isi'>No Dokumen </td>
        <td width='60' class='laporan_isi'>Tanggal</td>
        <td width='300' class='laporan_isi'>Keterangan</td>
        </tr>
      <tr>
        <td class='laporan_isi'>$row->no_ver</td>
        <td class='laporan_isi'>$row->dok_ver</td>
        <td class='laporan_isi'>$row->tgl_ver</td>
        <td class='laporan_isi'>$row->ket_ver</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Data Pelaksanan Pekerjaan </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='100'>No Bantek </td>
        <td width='100'>No Dokumen </td>
        <td width='60'>Tanggal</td>
        <td width='200'>Vendor</td>
        <td width='200'>Keterangan</td>
      </tr>
      <tr>
	    <td class='laporan_isi'>$row->no_bantek</td>
        <td class='laporan_isi'>$row->dok_bantek</td>
        <td class='laporan_isi'>$row->tgl_bantek</td>
		<td class='laporan_isi'>$row->nama_vendor</td>
        <td class='laporan_isi'>$row->ket_bantek</td>
       </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Data BAST </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='100'>No Survey </td>
        <td width='100'>No Dokumen </td>
        <td width='60'>Tanggal</td>
         <td width='150'>Keterangan</td>
      </tr>
     <tr>
	    <td class='laporan_isi'>$row->no_bast</td>
        <td class='laporan_isi'>$row->dok_bast</td>
        <td class='laporan_isi'>$row->tgl_bast</td>
	    <td class='laporan_isi'>$row->ket_bast</td>
       </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td>Data Kelengkapan Dokumen </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='80'>No Dokumen </td>
        <td width='200'>Nama Dokumen </td>
        <td width='150'>Keterangan</td>
      </tr>";
	   $sql1="select a.no_dok,b.nama as nama_dok,a.no_file,a.ket_dok
from tlk_dok_d_swa a
inner join tlk_ref b on a.kode_ref=b.kode_ref
inner join tlk_dok_m_swa c on a.no_dok=c.no_dok 
where c.no_klaim = '$row->no_klaim' order by a.kode_ref ";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		$gambar=$path.$row1->no_file;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
      echo "<tr>
        <td class='laporan_isi'>$row1->no_dok</td>
        <td class='laporan_isi'><a href='$gambar' target='".$fullId."_viewer' onclick='window.parent.system.getResource(\"".$resource."\").doOpenDoc()' >$row1->nama_dok</a></td>
        <td class='laporan_isi'>$row1->ket_dok</td>
      </tr>";
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Data Adjustment </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='100'>No Survey </td>
        <td width='100'>No Dokumen </td>
        <td width='60'>Tanggal</td>
        <td width='80'>Nilai  Adjust</td>
        <td width='80'>Nilai Deductable</td>
        <td width='150'>Keterangan</td>
      </tr>
      <tr>
        <td class='laporan_isi'>$row->no_adjust</td>
        <td class='laporan_isi'>$row->dok_adjust</td>
        <td class='laporan_isi'>$row->tgl_adjust</td>
		<td class='laporan_isi' align='right'>".number_format($row->nilai_adjust,0,',','.')."</td>
		<td class='laporan_isi' align='right'>".number_format($row->nilai_ddct,0,',','.')."</td>
		<td class='laporan_isi'>$row->ket_adjust</td>
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
  
