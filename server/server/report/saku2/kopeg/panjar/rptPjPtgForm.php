<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_panjar_rptPjPtgForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(no_panjar) from panjar2_m  $this->filter ";
		
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
		$sql="select a.no_ptg,a.no_panjar,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl_ptg,a.tanggal,a.kode_lokasi,a.keterangan,a.nik_buat,a.nik_app,c.nama as nama_buat,d.nama as nama_app,
       a.kode_pp,a.nilai,c.jabatan as jab_buat,d.jabatan as jab_app,a.kode_pp,date_format(e.tanggal,'%d/%m/%Y') as tgl_panjar,a.nilai_pj,a.nilai as nilai_ptg,a.nilai_kas,
	   f.kota
from panjarptg2_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join panjar2_m e on a.no_panjar=e.no_panjar and a.kode_lokasi=e.kode_lokasi
inner join lokasi f on a.kode_lokasi=f.kode_lokasi $this->filter
order by a.no_ptg";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/logo_cianjur.jpg";
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='5'>
  <tr>
    <td align='center' class='istyle17'>PERTANGGUNGAN PANJAR </td>
  </tr>
  <tr>
    <td align='center'><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100'>Nomor</td>
        <td width='200'>: $row->no_ptg </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl_ptg </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='241'>Nama / NIK </td>
        <td width='549'>: $row->nama_buat / $row->nik_buat </td>
      </tr>
      <tr>
        <td>Jabatan</td>
        <td>: $row->jab_buat </td>
      </tr>
      <tr>
        <td>Nomor Permintaan Panjar </td>
        <td>: $row->no_panjar </td>
      </tr>
      <tr>
        <td>Tanggal Permintaan Panjar </td>
        <td>: $row->tgl_panjar </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='28'>A.</td>
        <td width='209'>Jumlah Permintaan Panjar</td>
        <td width='549'>: ".number_format($row->nilai_pj,0,',','.')." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Terbilang</td>
        <td>: ".$AddOnLib->terbilang($row->nilai_pj)." </td>
      </tr>
      <tr>
        <td>B.</td>
        <td>Jumlah Pertanggungan Panjar </td>
        <td>: ".number_format($row->nilai_ptg,0,',','.')." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='25' height='23'>No</td>
        <td width='80'>Kode Akun </td>
		<td width='200'>Nama Akun</td>
		<td width='80'>PP</td>
	    <td width='250'>Uraian</td>
        <td width='90'>Nilai</td>
      </tr>";
		$sql="select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,a.kode_pp 
from panjarptg2_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$row->kode_lokasi'  and a.no_ptg='$row->no_ptg' and a.dc='D' ";
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$total=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
		 <td align='center' height='23'>$i</td>
        <td>$row1->kode_akun</td>
        <td>$row1->nama_akun</td>
        <td>$row1->kode_pp</td>
        <td>$row1->keterangan</td>
         <td align='right'>".number_format($row1->nilai,0,',','.')." </td>
      </tr>";
		$i=$i+1;
		}
      echo "<tr>
        <td colspan='5' height='23'>Jumlah Pertanggungan Panjar </td>
        <td align='right'>".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td colspan='5' height='23'>Selisih Lebih (Kurag) A-B </td>
        <td align='right'>".number_format($row->nilai_kas,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td align='right'><table width='606' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='300'>Mengetahui</td>
        <td width='300'>Pengambil Panjar </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>$row->nama_app</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center'>
        <td>$row->nik_app</td>
        <td>$row->nik_buat</td>
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
