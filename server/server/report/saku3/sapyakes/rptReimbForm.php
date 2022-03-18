<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sapyakes_rptReimbForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_reim,a.tanggal,a.keterangan,a.nilai,a.kode_pp,a.nik_buat,a.kode_lokasi,
	   b.nama as nama_pp,c.kota,d.nama as nama_buat,
	   e.nama as nama_bdh,f.nama as nama_manbdh,
	   e.flag as nik_bdh,f.flag as nik_manbdh,
	   e.keterangan as jab_bdh,f.keterangan as jab_manbdh 
from if_reim_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi 
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=b.kode_lokasi 
left join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='BDH1'
left join spro f on a.kode_lokasi=f.kode_lokasi and f.kode_spro='BDH2'
$this->filter 
order by a.no_reim";
	
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
    <td colspan='2' align='center'><table width='100%' border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td align='center' class='lokasi_laporan2'><u>DAFTAR IMPREST FUND</u></td>
      </tr>
      <tr>
        <td align='center' class='istyle15'>$row->no_reim</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'>
	<table width='800' border='0' cellspacing='0' cellpadding='0'>
 
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>Imprest Fund</td>
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
		<td width='80' class='header_laporan'>Akun </td>
        <td width='80' class='header_laporan'> DRK </td>
        
        <td width='120' class='header_laporan'>Bidang</td>
        <td width='40' class='header_laporan'>DC</td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql1="select date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,'D' as dc,a.nilai,a.kode_pp,a.kode_akun,a.kode_drk,b.nama as bidang
from if_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi' 
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
from if_aju_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi' 
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
        <td colspan='2' align='right' class='isi_laporan'>Sisa&nbsp;</td>
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
        <td class='header_laporan'>$row->jab_tahu</td>
        <td class='header_laporan'>PEMEGANG</td>
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
        <td class='header_laporan'>NIK.$row->nik_setuju</td>
        <td class='header_laporan'>NIK.$row->nik_tahu</td>
        <td class='header_laporan'>NIK.$row->nik_buat</td>
      </tr>
      <tr>
        <td height='30'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>$row->jab_manbdh</td>
        <td class='header_laporan'>$row->jab_bdh</td>
        <td class='header_laporan'>PENERIMA REIMBURSE</td>
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
        <td class='header_laporan'>NIK.$row->nik_manbdh</td>
        <td class='header_laporan'>NIK.$row->nik_bdh</td>
        <td class='header_laporan'>NIK.$row->nik_buat</td>
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
