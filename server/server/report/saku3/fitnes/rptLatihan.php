<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fitnes_rptLatihan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
		$sql="select 1";
		
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
		
		
		$sql="select a.no_kunj,a.kode_lokasi,a.kode_agg,b.nama as nama_agg,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		dbo.fnHari(a.tanggal) as hari,(year(a.tanggal)-year(b.tgl_lahir)) as umur
from fi_kunj_m a
inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_kunj";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>KUNJUNGAN</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='108'>ID Peserta </td>
        <td width='288'>: $row->kode_agg</td>
        <td width='120'>No Kunjungan </td>
        <td width='266'>: $row->no_kunj</td>
      </tr>
      <tr>
        <td>Nama</td>
        <td>: $row->nama_agg</td>
        <td>Tanggal</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Umur</td>
        <td>: $row->umur</td>
        <td>No Loker </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Kategori MCU </td>
        <td>&nbsp;</td>
        <td>Handuk</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>LATIHAN</td>
  </tr>
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='34' align='center' class='header_laporan'>No</td>
        <td width='497' align='center' class='header_laporan'>Jenis Latihan </td>
        <td width='261' align='center' class='header_laporan'>Hasil</td>
      </tr>
      <tr>
        <td colspan='3' class='header_laporan'>Latihan Otot </td>
        </tr>";
	$sql="select a.kode_beban,a.nama,a.keterangan,b.hasil1
from fi_beban a left join fi_kunj_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi 
where b.no_kunj='$row->no_kunj' and b.kode_lokasi = '$row->kode_lokasi'  
order by a.kode_beban";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->hasil</td>
      </tr>";
		$i=$i+1;
	}
	echo "<tr>
        <td colspan='3' class='header_laporan'>Treadmill</td>
        </tr>
      </tr>";
	$sql="select a.model,a.waktu,a.speed,a.level,a.distance,a.detak,a.kalori 
from fi_kunj_beban_inti a 
where a.no_kunj='$row->no_kunj' and a.kode_lokasi = '$row->kode_lokasi' and a.jenis='TM'";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td colspan='3'><table width='600' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='136' class='isi_laporan'>Mode</td>
            <td width='454' class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Time (min)</td>
            <td class='isi_laporan'>: $row1->waktu </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Speed (km/h)</td>
            <td class='isi_laporan'>: $row1->speed </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Incline (deg)</td>
            <td class='isi_laporan'>: $row1->level </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Distance (mtr)</td>
            <td class='isi_laporan'>: $row1->distance </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Heart Rate(mnt)</td>
            <td class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Kalori Dibakar</td>
            <td class='isi_laporan'>: $row1->detak </td>
          </tr>
        </table></td>
        </tr>";
		$i=$i+1;
	}
	echo "<tr>
      <tr>
        <td colspan='3' class='header_laporan'>Ergo Cycle</td>
       </tr>";
	$sql="select a.model,a.waktu,a.speed,a.level,a.distance,a.detak,a.kalori 
from fi_kunj_beban_inti a 
where a.no_kunj='$row->no_kunj' and a.kode_lokasi = '$row->kode_lokasi' and a.jenis='EC'";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td colspan='3'><table width='600' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='136' class='isi_laporan'>Mode</td>
            <td width='454' class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Time (min)</td>
            <td class='isi_laporan'>: $row1->waktu </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Speed (km/h)</td>
            <td class='isi_laporan'>: $row1->speed </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Incline (deg)</td>
            <td class='isi_laporan'>: $row1->level </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Distance (mtr)</td>
            <td class='isi_laporan'>: $row1->distance </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Heart Rate(mnt)</td>
            <td class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Kalori Dibakar</td>
            <td class='isi_laporan'>: $row1->detak </td>
          </tr>
        </table></td>
        </tr>";
		$i=$i+1;
	}
	echo "<tr>
      <tr>
        <td colspan='3' class='header_laporan'>Cross Trainner</td>
        </tr>";
	$sql="select a.model,a.waktu,a.speed,a.level,a.distance,a.detak,a.kalori 
from fi_kunj_beban_inti a 
where a.no_kunj='$row->no_kunj' and a.kode_lokasi = '$row->kode_lokasi' and a.jenis='CT'";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td colspan='3'><table width='600' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='136' class='isi_laporan'>Mode</td>
            <td width='454' class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Time (min)</td>
            <td class='isi_laporan'>: $row1->waktu </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Speed (km/h)</td>
            <td class='isi_laporan'>: $row1->speed </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Incline (deg)</td>
            <td class='isi_laporan'>: $row1->level </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Distance (mtr)</td>
            <td class='isi_laporan'>: $row1->distance </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Heart Rate(mnt)</td>
            <td class='isi_laporan'>: $row1->model </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Kalori Dibakar</td>
            <td class='isi_laporan'>: $row1->detak </td>
          </tr>
        </table></td>
        </tr>";
		$i=$i+1;
	}
	echo "<tr>
      <tr>
      <tr>
        <td colspan='3 class='header_laporan'>Senam Aerobik</td>
        </tr>";
	$sql="select a.model,a.waktu,a.speed,a.level,a.distance,a.detak,a.kalori 
from fi_kunj_beban_inti a 
where a.no_kunj='$row->no_kunj' and a.kode_lokasi = '$row->kode_lokasi' and a.jenis='SN'";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td colspan='3'><table width='600' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='136' class='isi_laporan'>Time (min)</td>
            <td width='454' class='isi_laporan'>: $row1->waktu </td>
          </tr>
          <tr>
            <td class='isi_laporan'>Heart Rate(mnt)</td>
            <td class='isi_laporan'>: $row1->detak </td>
          </tr>
         
        </table></td>
        </tr>";
		$i=$i+1;
	}
	echo "<tr>
      <tr>
        <td colspan='3' class='header_laporan'>Evaluasi</td>
        </tr>
      ";
      echo "<tr>
        <td colspan='3'><table width='600' border='0' cellspacing='2' cellpadding='1'>";
        $sql="select a.kode_eval,a.nama,isnull(b.nilai,0) as nilai 
from fi_param_eval a 
left join fi_eval_d b on a.kode_eval=b.kode_eval 
where b.no_kunj='$row->no_kunj' 
order by a.kode_eval";
	
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		 echo "<tr>
            <td width='136' class='isi_laporan'>$row1->nama</td>
            <td width='454' class='isi_laporan'>: $row1->nilai </td>
          </tr>";
    }    
         
        echo "</table></td>
        </tr>";
	$sql="select catat_eval 
from fi_kunj_m 
where no_kunj = '$row1->no_kunj' ";
	$rs1 = $dbLib->execute($sql);
	$ket="&nbsp;";
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$ket=$row1->catat_eval;
	}
	echo "
      <tr>
        <td colspan='3'>$ket</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>BODY MEASUREMENT </td>
  </tr>
  <tr>
    <td><table width='657' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='25' align='center' class='header_laporan'>No</td>
        <td width='300' align='center' class='header_laporan'>Parameter</td>
        <td width='80' align='center' class='header_laporan'>Satuan</td>
        <td width='120' align='center' class='header_laporan'>Pengukuran Awal </td>
        <td width='120' align='center' class='header_laporan'>Pengukuran Akhir </td>
      </tr>";
	$sql="select a.kode_param,a.nama,a.satuan,b.hasil_bef,b.hasil_aft 
from fi_param a 
left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi 
where b.no_kunj='$row->no_kunj' and b.kode_lokasi = '$row->kode_lokasi'";
	$rs1 = $dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->satuan</td>
        <td class='isi_laporan'>$row1->hasil_bef</td>
        <td class='isi_laporan'>$row1->hasil_aft</td>
      </tr>";
		$i=$i+1;
    }
	echo "<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>KONSULTASI GIZI </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='124'>Usia</td>
        <td width='266'>: a </td>
        <td width='119'>Golonga Darah </td>
        <td width='273'>: a </td>
      </tr>
      <tr>
        <td>Tekanan Darah </td>
        <td>: a </td>
        <td>Riwayat Penyakit </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Tinggi Badan </td>
        <td>: a </td>
        <td>Berat Badan </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>BMI</td>
        <td>: a </td>
        <td>Status Gizi </td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Catatan</td>
        <td colspan='3'>: a </td>
        </tr>
    </table></td>
  </tr>
</table>";
			
			
		}
		echo "</div>";
	
		return "";
		
	}
	
}
?>
