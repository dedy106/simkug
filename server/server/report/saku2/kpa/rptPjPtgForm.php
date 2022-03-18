<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kpa_rptPjPtgForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kpa)
from itt_panjarptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_ptg,a.no_panjar,a.kode_lokasi,a.tanggal,a.nik_buat,b.nama,a.kode_pp,c.nama as nama_pp,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.nilai,
		a.nik_buat,a.nik_app,d.nama as nama_buat,e.nama as nama_app,a.nilai_pj,a.nilai,a.nilai_pj-a.nilai as sisa	
from itt_panjarptg_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_ptg";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pengajuan kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'>
    <td height='30'>DAFTAR PERTANGGUNGAN PANJAR </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'>Nomor : $row->no_ptg</td>
      </tr>
      <tr>
        <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='142'>No Panjar </td>
            <td width='642'>: $row->no_panjar </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='30'>No</td>
            <td width='60'>Kode Akun </td>
            <td width='200'>Nama Akun </td>
            <td width='60'>Kode PP </td>
            <td width='60'>Kode DRK </td>
            <td width='250'>Keterangan</td>
            <td width='90'>Jumlah</td>
          </tr>";
          $sql="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan,a.nilai
from itt_panjarptg_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ptg='$row->no_ptg' and a.kode_lokasi='$row->kode_lokasi' ";
			$rs1 = $dbLib->execute($sql);
			$i=1;
			$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
              echo "<tr>
                <td align='center'>$i</td>
                <td>$row1->kode_akun</td>
                <td>$row1->nama_akun</td>
                <td>$row1->kode_pp</td>
                <td>$row1->kode_drk</td>
                <td>$row1->keterangan</td>
                <td align='right'>".number_format($row1->nilai,0,',','.')."</td>
              </tr>";
				$i=$i+1;
			}
          echo "<tr>
            <td colspan='6' align='right'>Total</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan='7' align='right'>&nbsp;</td>
          
          </tr>
          <tr>
            <td colspan='6' align='right'>Jumlah Panjar </td>
            <td align='right'>".number_format($row->nilai_pj,0,',','.')."</td>
          </tr>
          <tr>
            <td colspan='6' align='right'>Jumlah Realisasi</td>
            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
          </tr>
          <tr>
            <td colspan='6' align='right'>Sisa</td>
            <td align='right'>".number_format($row->sisa,0,',','.')."</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr align='center'>
            <td align='center'>&nbsp;</td>
            <td align='center'>&nbsp;</td>
            <td align='center'>Mengetahui</td>
            <td align='left'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."  </td>
          </tr>
          <tr align='center'>
            <td width='193'>Fiatur</td>
            <td width='168'>Verifikasi</td>
            <td width='203'>Pusat Pert.Jawaban </td>
            <td width='218'>Yang Mempertanggungkan </td>
          </tr>
          <tr>
            <td height='50'>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr align='center'>
            <td>nama</td>
            <td>nama</td>
            <td>$row->nama_app</td>
            <td>$row->nama_buat</td>
          </tr>
          <tr align='center'>
            <td>nik</td>
            <td>nik</td>
            <td>$row->nik_app</td>
            <td>$row->nik_buat</td>
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
