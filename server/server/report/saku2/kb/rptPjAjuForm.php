<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptPjAjuForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(no_ifptg) from yk_ifptg_m  $this->filter ";
		
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
		$sql="select a.no_ifptg,a.tanggal,a.kode_lokasi,b.kota,a.tanggal,h.nilai,h.nilai-a.nilai as saldo,
       a.nik_buat,a.nik_tahu,a.nik_setuju,a.nik_bdh,a.nik_manbdh,
       upper(c.nama) as nama_buat,upper(d.nama) as nama_tahu,upper(e.nama) as nama_setuju,upper(f.nama) as nama_bdh,upper(g.nama) as nama_manbdh,
       c.jabatan as jab_buat,d.jabatan as jab_tahu,e.jabatan as jab_setuju,f.jabatan as jab_bdh,g.jabatan as jab_manbdh
from yk_ifptg_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_tahu=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
inner join karyawan f on a.nik_bdh=f.nik and a.kode_lokasi=f.kode_lokasi
inner join karyawan g on a.nik_manbdh=g.nik and a.kode_lokasi=g.kode_lokasi
inner join yk_if_m h on a.nik_buat=h.nik and a.kode_lokasi=h.kode_lokasi $this->filter order by a.no_ifptg";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2' align='center'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td align='center' class='header_laporan'>DAFTAR PERTANGGUNGAN PANJAR INSIDENTIL</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>$row->no_ifptg</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'>
	<table width='800' border='0' cellspacing='0' cellpadding='0'>
 
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>Panjar</td>
        <td width='870' class='header_laporan'>: Rp ".number_format($row->nilai,0,',','.')." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='left'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='40' class='header_laporan'>No SB </td>
        <td width='60' class='header_laporan'>Tanggal</td>
        <td width='270' class='header_laporan'>Uraian Pegeluaran</td>
        <td width='80' class='header_laporan'> DRK </td>
        <td width='80' class='header_laporan'>Akun </td>
        <td width='120' class='header_laporan'>Bidang</td>
        <td width='40' class='header_laporan'>DC</td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql1="select date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.dc,a.nilai,a.kode_pp,a.kode_akun,a.kode_drk,b.nama as bidang
from yk_ifptg_j a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.no_ifptg='$row->no_ifptg' and a.kode_lokasi='$row->kode_lokasi'
order by a.tanggal ";
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
			<td align='center' class='isi_laporan'>$j</td>
			<td class='isi_laporan'>$row1->tanggal</td>
			<td class='isi_laporan'>$row1->keterangan</td>
			<td class='isi_laporan'>$row1->kode_akun</td>
			<td class='isi_laporan'>$row1->kode_drk</td>
			<td class='isi_laporan'>$row1->bidang</td>
			<td class='isi_laporan' align='center'>$row1->dc</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
			$j=$j+1;	
		}
      echo "<tr>
        <td colspan='7' align='right' class='isi_laporan'>Jumlah&nbsp;</td>
        <td align='right' class='isi_laporan'> ".number_format($nilai,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC' >
        <td width='80' class='header_laporan'>Kode Akun </td>
        <td width='300' class='header_laporan'>Nama Akun </td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql1="select a.kode_akun,b.nama,sum(a.nilai) as nilai 
from yk_ifptg_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ifptg='$row->no_ifptg' and a.kode_lokasi='$row->kode_lokasi'
group by a.kode_akun,b.nama
order by a.kode_akun";
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='2' align='right' class='isi_laporan'>Jumlah&nbsp;</td>
        <td align='right' class='isi_laporan'>".number_format($nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td colspan='2' align='right' class='isi_laporan'>Sisa Panjar&nbsp;</td>
        <td align='right' class='isi_laporan'>".number_format($row->saldo,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table border='0' cellspacing='0' cellpadding='0'>
      <tr align='right'>
        <td colspan='3' class='header_laporan'>".$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='250' align='center' class='header_laporan'>Menyetujui,</td>
        <td width='250' align='center' class='header_laporan'>Mengetahui,</td>
        <td width='250'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>KABIDUM</td>
        <td class='header_laporan'>MANAGER SDM</td>
        <td class='header_laporan'>PEMEGANG PANJAR</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$row->nama_setuju</u></td>
        <td class='header_laporan'><u>$row->nama_tahu</u></td>
        <td class='header_laporan'><u>$row->nama_buat</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>$row->nik_setuju</td>
        <td class='header_laporan'>$row->nik_tahu</td>
        <td class='header_laporan'>$row->nik_buat</td>
      </tr>
      <tr>
        <td height='30'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>MGR.PERBENDAHARAWAN</td>
        <td class='header_laporan'>BENDAHARAWAN</td>
        <td class='header_laporan'>PEMEGANG PANJAR</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$row->nama_manbdh</u></td>
        <td class='header_laporan'><u>$row->nama_bdh</u></td>
        <td class='header_laporan'><u>$row->nama_buat</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>$row->nik_manbdh</td>
        <td class='header_laporan'>$row->nik_bdh</td>
        <td class='header_laporan'>$row->nik_buat</td>
      </tr>
    </table></td>
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
