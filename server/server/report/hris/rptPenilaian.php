<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptPenilaian extends server_report_basic
{	
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$sql="select a.kode_lokasi,a.nik_buat,b.nama as nama_buat,a.periode,a.nik_app,c.nama as nama_app,a.no_penilaian,date_format(a.tanggal,'%d/%m/%Y') as tanggal,
				     date_format(a.periode_awal,'%d/%m/%Y') as periode_awal, date_format(a.periode_akhir,'%d/%m/%Y') as periode_akhir,a.keterangan,b.tgl_masuk,
					 d.nama as jab_buat,e.nama as jab_app,f.nama as dept_buat,g.nama as dept_app
			from gr_penilaian_m a
			inner join gr_karyawan b on b.nik=a.nik_buat and a.kode_lokasi=b.kode_lokasi
			inner join gr_karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi
			inner join gr_jab d on b.kode_jab=d.kode_jab and b.kode_lokasi=d.kode_lokasi
			inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi
			inner join gr_dept f on b.kode_dept=f.kode_dept and b.kode_lokasi=f.kode_lokasi
		    inner join gr_dept g on c.kode_dept=g.kode_dept and c.kode_lokasi=g.kode_lokasi
			order by a.no_penilaian ; ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>BAGIAN I : DATA KARYAWAN &amp; JABATAN </td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td width='47%'>Nama Karyawan : $row->nama_buat </td>
        <td width='53%'>Nama Atasan Langsung : $row->nama_app </td>
      </tr>
      <tr>
        <td>Jabatan / Posisi : $row->jab_buat </td>
        <td>Jabatan / Posisi : $row->jab_app </td>
      </tr>
      <tr>
        <td>Departemen : $row->dept_buat </td>
        <td>Departemen : $row->dept_app </td>
      </tr>
      <tr>
        <td>Periode Penilaian : $row->periode </td>
        <td>Tanggal : $row->tanggal </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>FUNGSI /PERANAN JABATAN &amp; TUGAS-TUGAS POKOK </td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td><table width='100%'  border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td colspan='2'>Fungsi/Peranan Jabatan : </td>
            </tr>";
			$sql1="select nama from gr_karyawan_fungsi where nik='$row->nik_buat' and kode_lokasi='$row->kode_lokasi' order by kode_fungsi";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		error_log($sql1);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
          echo "<tr>
            <td width='6%' align='center'>$j.</td>
            <td width='94%'>$row1->nama</td>
          </tr>";
		} 
          echo "<tr>
            <td colspan='2'>&nbsp;</td>
          </tr>
          <tr>
            <td colspan='2'>Tugas - tugas Pokok : </td>
            </tr>";
			$sql1="select nama from gr_karyawan_tugas where nik='$row->nik_buat' and kode_lokasi='$row->kode_lokasi' order by kode_tugas";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		error_log($sql1);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
          echo "<tr>
            <td align='center'>$j.</td>
            <td>$row1->nama</td>
          </tr>";
		}
          echo "<tr>
            <td align='center'>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr align='left'>
            <td colspan='2'>*** Ybs bergabung di PT. Gratika per tanggal 1 maret 2007 </td>
            </tr>
          <tr align='left'>
            <td colspan='2'>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>BAGIAN II : PENILAIAN HASIL KERJA </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr align='center'>
        <td width='4%'>No</td>
        <td width='48%'>TUGAS POKOK </td>
        <td width='7%'>RANGKING</td>
        <td width='7%'>BOBOT</td>
        <td width='7%'>HASIL PENILAIAN </td>
        <td width='7%'>NILAI</td>
        <td width='20%'>JUSTIFIKASI</td>
      </tr>";
	   $sql1="select b.nama,a.rangking,a.bobot,a.kode_skala,a.nilai,a.justifikasi
from gr_penilaian_d a
inner join gr_karyawan_tugas b on a.nik=b.nik and a.kode_tugas=b.kode_tugas and a.kode_lokasi=b.kode_lokasi 
where a.nik='$row->nik_buat' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_tugas";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		$bobot=0;$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
			$bobot=$bobot+$row1->bobot;
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
        <td align='center'>$j</td>
        <td>$row1->nama</td>
        <td align='center'>$row1->rangking</td>
        <td align='center'>$row1->bobot</td>
        <td align='center'>$row1->kode_skala</td>
        <td align='center'>$row1->nilai</td>
        <td>$row1->justifikasi</td>
      </tr>";
	  }
	echo "<tr>
        <td colspan='3' align='center'>&nbsp;</td>
        <td align='center'>".number_format($bobot,0,',','.')."</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>".number_format($nilai,0,',','.')."</td>
        <td>&nbsp;</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>KETRAMPILAN TEKNIS </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr align='center'>
        <td width='5%'>B</td>
        <td width='5%'>PP</td>
        <td width='5%'>MS</td>
        <td width='5%'>DS</td>
        <td width='5%'>LB</td>
        <td width='41%'>SUB KRITERIA </td>
        <td width='34%'>KETERANGAN </td>
      </tr>";
       $sql1="select case when  a.kode_skala='B' then 'X' else '' end as b, 
       case when  a.kode_skala='PP' then 'X' else '' end as pp, 
       case when  a.kode_skala='MS' then 'X' else '' end as ms, 
       case when  a.kode_skala='DS' then 'X' else '' end as ds, 
       case when  a.kode_skala='LB' then 'X' else '' end as lb, 
       b.nama,a.keterangan 
from gr_penilaian_dkriteria a
inner join gr_penilaian_kriteria b on a.kode_kriteria=b.kode_kriteria and a.kode_lokasi=b.kode_lokasi
where b.kode_klp='1' and a.nik='$row->nik_buat' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_kriteria";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
	  echo "<tr>
        <td align='center'>$row1->b</td>
        <td align='center'>$row1->pp</td>
        <td align='center'>$row1->ms</td>
        <td align='center'>$row1->ds</td>
        <td align='center'>$row1->lb</td>
        <td>$row1->nama</td>
        <td>$row1->keterangan</td>
      </tr>";
	  }
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>SIKAP TERHADAP PEKERJAAN </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr align='center'>
        <td width='5%'>B</td>
        <td width='5%'>PP</td>
        <td width='5%'>MS</td>
        <td width='5%'>DS</td>
        <td width='5%'>LB</td>
        <td width='41%'>SUB KRITERIA </td>
        <td width='34%'>KETERANGAN </td>
      </tr>";
     $sql1="select case when  a.kode_skala='B' then 'X' else '' end as b, 
       case when  a.kode_skala='PP' then 'X' else '' end as pp, 
       case when  a.kode_skala='MS' then 'X' else '' end as ms, 
       case when  a.kode_skala='DS' then 'X' else '' end as ds, 
       case when  a.kode_skala='LB' then 'X' else '' end as lb, 
       b.nama,a.keterangan 
from gr_penilaian_dkriteria a
inner join gr_penilaian_kriteria b on a.kode_kriteria=b.kode_kriteria and a.kode_lokasi=b.kode_lokasi
where b.kode_klp='2' and a.nik='$row->nik_buat' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_kriteria";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
	  echo "<tr>
        <td align='center'>$row1->b</td>
        <td align='center'>$row1->pp</td>
        <td align='center'>$row1->ms</td>
        <td align='center'>$row1->ds</td>
        <td align='center'>$row1->lb</td>
        <td >$row1->nama</td>
        <td >$row1->keterangan</td>
      </tr>";
	  }
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>KEMAMPUAN MANAJERIAL </td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr align='center'>
        <td width='5%'>B</td>
        <td width='5%'>PP</td>
        <td width='5%'>MS</td>
        <td width='5%'>DS</td>
        <td width='5%'>LB</td>
        <td width='41%'>SUB KRITERIA </td>
        <td width='34%'>KETERANGAN </td>
      </tr>";
      $sql1="select case when  a.kode_skala='B' then 'X' else '' end as b, 
       case when  a.kode_skala='PP' then 'X' else '' end as pp, 
       case when  a.kode_skala='MS' then 'X' else '' end as ms, 
       case when  a.kode_skala='DS' then 'X' else '' end as ds, 
       case when  a.kode_skala='LB' then 'X' else '' end as lb, 
       b.nama,a.keterangan 
from gr_penilaian_dkriteria a
inner join gr_penilaian_kriteria b on a.kode_kriteria=b.kode_kriteria and a.kode_lokasi=b.kode_lokasi
where b.kode_klp='3' and a.nik='$row->nik_buat' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_kriteria";
		$rs1 = $dbLib->execute($sql1);
		$j=0;
		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$j=$j+1;
	  echo "<tr>
        <td align='center'>$row1->b</td>
        <td align='center'>$row1->pp</td>
        <td align='center'>$row1->ms</td>
        <td align='center'>$row1->ds</td>
        <td align='center'>$row1->lb</td>
        <td>$row1->nama</td>
        <td >$row1->keterangan</td>
      </tr>";
	  }
    echo "</table></td>
  </tr>
</table>
";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
