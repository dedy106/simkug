<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_if_rptReimbForm extends server_report_basic
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
	   b.nama as nama_pp,c.kota,d.nama as nama_buat,a.nik_app,g.nama as nama_app,
	   e.nama as nama_bdh,f.nama as nama_manbdh,
	   e.flag as nik_bdh,f.flag as nik_manbdh,
	   e.keterangan as jab_bdh,f.keterangan as jab_manbdh 
from if_reim_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi 
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=b.kode_lokasi 
left join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='BDH1'
left join spro f on a.kode_lokasi=f.kode_lokasi and f.kode_spro='BDH2'
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi 
$this->filter 
order by a.no_reim";
    //echo $sql;
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
        <td width='40' class='header_laporan'>No </td>
        <td width='100' class='header_laporan'>No IF</td>
        <td width='60' class='header_laporan'>Tanggal</td>
        <td width='270' class='header_laporan'>Uraian Pegeluaran</td>
		<td width='80' class='header_laporan'>Akun </td>
        <td width='80' class='header_laporan'> DRK </td>
        
        <td width='120' class='header_laporan'>Bidang</td>
        <td width='40' class='header_laporan'>DC</td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql1="select date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,c.dc as dc,c.nilai,c.kode_pp,c.kode_akun,c.kode_drk,b.nama as bidang,a.no_aju
from if_aju_m a
inner join if_aju_j c on a.no_aju=c.no_aju
inner join pp b on c.kode_pp=b.kode_pp and c.kode_lokasi=b.kode_lokasi
where c.jenis<>'HUTIF' and a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi' 
order by a.tanggal ";

		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			
      if ($row1->dc == "D") $nilai=$nilai+$row1->nilai;
      else $nilai=$nilai-$row1->nilai;

      echo "<tr>
			<td align='center' class='isi_laporan'>$j</td>
      <td class='isi_laporan'>$row1->no_aju</td>
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
        <td colspan='8' align='right' class='isi_laporan'>Jumlah&nbsp;</td>
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
	  $sql1="select c.kode_akun,b.nama,sum(case c.dc when 'D' then c.nilai else -c.nilai end) as nilai 
from if_aju_m a
inner join if_aju_j c on a.no_aju=c.no_aju
inner join masakun b on c.kode_akun=b.kode_akun and c.kode_lokasi=b.kode_lokasi
where c.jenis<>'HUTIF' and a.no_reim='$row->no_reim' and a.kode_lokasi='$row->kode_lokasi' 
group by c.kode_akun,b.nama
order by c.kode_akun";
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
      
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
          <td align='right'><table width='431' border='0' cellspacing='2' cellpadding='1'>
				<tr align='center'>
                <td align='center'>&nbsp;</td>
                <td align='left'>&nbsp; </td>
              </tr>
              <tr align='center'>
                <td colspan='2' align='center'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
              </tr>
              <tr align='center'>
                <td width='203'>Disetujui </td>
                <td width='218'>Dibuat </td>
              </tr>
              <tr>
                <td height='50'>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr align='center'>
                <td></td>
                <td></td>
              </tr>
              <tr align='center'>
                <td></td>
                <td></td>
              </tr>
          </table></td>
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
