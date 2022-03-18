<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptCv extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.nik)
 from gr_karyawan a 
inner join gr_prov b on a.kode_prov=b.kode_prov 
inner join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi 
inner join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi=d.kode_lokasi 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi 
inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi 
inner join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi 
inner join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi 
inner join gr_dept i on a.kode_dept=i.kode_dept and a.kode_lokasi = i.kode_lokasi 
inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi = j.kode_lokasi 
inner join gr_vendor k on a.kode_vendor=k.kode_vendor and a.kode_lokasi = k.kode_lokasi 
inner join gr_status_bank l on a.sts_bank=l.sts_bank and a.kode_lokasi = l.kode_lokasi
inner join gr_jur m on a.kode_jur=m.kode_jur and a.kode_lokasi=m.kode_lokasi $this->filter ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$status_sk=$tmp[0];
		
		$sql="select a.nik,a.kode_lokasi,a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat, date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.alamat,a.kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah, 
a.nik2,a.npwp,a.suku,a.sts_agama,c.nama as nama_agama,a.sts_didik,d.nama as nama_didik,m.nama as nama_jur,a.foto,a.sts_pajak, date_format(a.tgl_nikah,'%d/%m/%Y') as tgl_nikah, 
 date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,a.kode_jab,a.kode_grade,a.kode_loker,a.kode_dir,a.kode_dept,a.sts_sdm,a.kode_vendor,a.sts_bank,
e.nama as nama_jab,f.nama as nama_grade,g.nama as nama_loker,h.nama as nama_dir,i.nama as nama_dept,j.nama as nama_sdm,k.nama as nama_vendor,l.nama as nama_bank,
a.lembaga,a.asal_lamaran,a.cabang,a.no_rek,a.nama_rek,a.nip,a.flag_gaji 
 from gr_karyawan a 
inner join gr_prov b on a.kode_prov=b.kode_prov 
inner join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi 
inner join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi=d.kode_lokasi 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi 
inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi 
inner join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi 
inner join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi 
inner join gr_dept i on a.kode_dept=i.kode_dept and a.kode_lokasi = i.kode_lokasi 
inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi = j.kode_lokasi 
inner join gr_vendor k on a.kode_vendor=k.kode_vendor and a.kode_lokasi = k.kode_lokasi 
inner join gr_status_bank l on a.sts_bank=l.sts_bank and a.kode_lokasi = l.kode_lokasi
inner join gr_jur m on a.kode_jur=m.kode_jur and a.kode_lokasi=m.kode_lokasi $this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"serverApp.php"));		
			$pathfoto = $path . "media/".$row->foto;
			echo "<table width='900'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='900' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center' class='lokasi_laporan2'>CURICULUM VITAE KARYAWAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='0' cellspacing='1' cellpadding='2'>
          <tr>
            <td width='154' class='isi_bukti'>Nama</td>
            <td width='374' class='isi_bukti'>: $row->nama </td>
            <td width='162' rowspan='10' align='left' valign='top' ><img src='$pathfoto' width='160' height='180' /></td>
          </tr>
          <tr>
            <td class='isi_bukti'>NIK</td>
            <td class='isi_bukti'>: $row->nik </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Gender</td>
            <td class='isi_bukti'>: $row->sex </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Agama</td>
            <td class='isi_bukti'>: $row->nama_agama </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Tempat , Tanggal Lahir</td>
            <td class='isi_bukti'>: $row->tempat , $row->tgl_lahir</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Pendidikan</td>
            <td class='isi_bukti'>: $row->nama_didik - $row->nama_jur </td>
            </tr>
          <tr>
            <td class='isi_bukti'>No KTP </td>
            <td class='isi_bukti'>: $row->no_ktp </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Status Pajak </td>
            <td class='isi_bukti'>: $row->sts_pajak </td>
            </tr>
          <tr>
            <td class='isi_bukti'>No NPWP </td>
            <td class='isi_bukti'>: $row->npwp </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Tanggal Nikah</td>
            <td class='isi_bukti'>: $row->tgl_nikah </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Alamat</td>
            <td class='isi_bukti'>: $row->alamat </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Kota</td>
            <td>: $row->kota </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Propinsi</td>
            <td class='isi_bukti'>: $row->nama_prov </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>No Telp </td>
            <td class='isi_bukti'>: $row->no_telp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>No HP </td>
            <td class='isi_bukti'>: $row->no_hp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Email</td>
            <td class='isi_bukti'>: $row->email </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Golongan Darah </td>
            <td class='isi_bukti'>: $row->gol_darah </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Suku</td>
            <td class='isi_bukti'>: $row->suku </td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
	<tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='lokasi_laporan'>POSISI SEKARANG </td>
      </tr>
      <tr>
        <td><table width='100%' border='0' cellspacing='1' cellpadding='2'>
          <tr>
            <td width='154' class='isi_bukti'>Tanggal Masuk </td>
            <td width='536' class='isi_bukti'>: $row->tgl_masuk</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Jabatan</td>
            <td class='isi_bukti'>: $row->nama_jab</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Grade</td>
            <td class='isi_bukti'>: $row->kode_grade </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Lokasi Kerja </td>
            <td class='isi_bukti'>: $row->nama_loker </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Direktorat</td>
            <td class='isi_bukti'>: $row->nama_dir </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Departemen</td>
            <td class='isi_bukti'>: $row->nama_dept </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Status SDM </td>
            <td class='isi_bukti'>: $row->nama_sdm</td>
            </tr>
          
        </table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='lokasi_laporan'>DATA KELUARGA </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td width='60' class='isi_bukti'>Status</td>
            <td width='165' class='isi_bukti'>Nama</td>
            <td width='49' class='isi_bukti'>Gender</td>
            <td width='121' class='isi_bukti'>Tempat</td>
            <td width='85' class='isi_bukti'>Tgl Lahir </td>
            <td width='142' class='isi_bukti'>Institusi</td>
            <td width='68' class='isi_bukti'>Status</td>
          </tr>";
		  $sql1="select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi,
			a.no_telp,a.nik2,a.alamat,a.kota,a.kodepos,a.kode_prov,a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak 
			from gr_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi 
			where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi'";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama_sts</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti' align='center' class='isi_bukti'>$row1->sex</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tempat</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl_lahir</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->institusi</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->flag_tanggung</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	  
	  <tr>
        <td class='lokasi_laporan'>RIWAYAT KEDINASAN </td>
      </tr>
	   <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		    <td width='40' class='isi_bukti'>Grade</td>
			<td width='100' class='isi_bukti'>Jabatan</td>
			<td width='100' class='isi_bukti'>Loker</td>
            <td width='100' class='isi_bukti'>Departemen</td>
            <td width='60' class='isi_bukti'>Tgl SK </td>
            <td width='80' class='isi_bukti'>No SK </td>
          	<td width='100' class='isi_bukti'>Keterangan</td>
          </tr>";
			$sts_sk=" and f.sts_sk<>'SK9' ";
			if ($status_sk=="Ya")
			{
				$sts_sk="";
			}
         $sql1="select a.kode_grade,b.nama as loker,c.nama as dept,d.nama as jabatan, date_format(e.tgl_masuk,'%d/%m/%Y') as tgl_sk,a.no_sk,e.nama as ket_sk
from gr_dinas a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_dept c on a.kode_dept=c.kode_dept and a.kode_lokasi=c.kode_lokasi 
inner join gr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi
inner join gr_sk e on a.no_sk=e.no_sk and a.nik=e.nik and a.kode_lokasi=e.kode_lokasi
inner join gr_sk_d f on e.no_sk=f.no_sk and e.nik=f.nik and e.kode_lokasi=f.kode_lokasi
			where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' $sts_sk order by e.tgl_masuk ";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr >
			<td align='center' class='isi_bukti'>$row1->kode_grade</td>
            <td class='isi_bukti'>$row1->jabatan</td>
			<td class='isi_bukti'>$row1->loker</td>
            <td class='isi_bukti'>$row1->dept</td>
            
            <td align='center' class='isi_bukti'>$row1->tgl_sk</td>
            <td class='isi_bukti'>$row1->no_sk</td>
            <td class='isi_bukti'>$row1->ket_sk</td>
          </tr>";
		} 
		  echo "</table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='lokasi_laporan'>RIWAYAT PELATIHAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td width='200' class='isi_bukti'>Nama Pelatihan</td>
			<td width='60' class='isi_bukti'>Status</td>
            <td width='150' class='isi_bukti'>Penyelenggara</td>
            <td width='100' class='isi_bukti'>Kota</td>
            <td width='100' class='isi_bukti'>Sertifikat</td>
            <td width='50' class='isi_bukti'>Lama</td>
            <td width='60' class='isi_bukti'>Tgl Mulai</td>
			<td width='60' class='isi_bukti'>Tgl Selesai</td>
          </tr>";
		  $sql1="select a.nik,b.nama,d.nama as sts_latih,a.nama,a.lama,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_awal,
       date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.panitia,f.nama as kota, 
       e.nama as sertifikat,a.masa_berlaku,g.nama as status_dana,a.jumlah,a.biaya 
from gr_rwylatih a 
inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join gr_status_latih d on a.sts_latih=d.sts_latih and a.kode_lokasi=d.kode_lokasi 
inner join gr_status_sertifikat e on a.sts_sertifikat=e.sts_sertifikat and a.kode_lokasi=e.kode_lokasi 
inner join gr_kota f on a.kode_kota=f.kode_kota and a.kode_lokasi=f.kode_lokasi 
inner join gr_status_dana g on a.sts_dana=g.sts_dana and a.kode_lokasi=g.kode_lokasi
			where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tgl_mulai desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti'>$row1->sts_latih</td>
			<td class='isi_bukti'>$row1->panitia</td>
            <td class='isi_bukti'>$row1->kota</td>
            <td class='isi_bukti'>$row1->sertifikat</td>
            <td class='isi_bukti'>$row1->lama</td>
            <td class='isi_bukti'>$row1->tgl_awal</td>
			<td class='isi_bukti'>$row1->tgl_selesai</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
	  <tr>
        <td class='lokasi_laporan'>RIWAYAT PENDIDIKAN </td>
      </tr>
       <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td width='150' class='isi_bukti'>Strata</td>
			<td width='150' class='isi_bukti'>Jurusan</td>
            <td width='200' class='isi_bukti'>Institusi</td>
            <td width='50' class='isi_bukti'>Tahun</td>
          </tr>";
		  $sql1="select b.nama,c.nama as strata,d.nama as jur,a.institusi,a.tahun,a.keterangan,a.dana 
from gr_rwypddk a 
inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join gr_strata c on a.kode_strata=c.kode_strata and a.kode_lokasi=c.kode_lokasi 
inner join gr_jur d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi
where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tahun desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td class='isi_bukti'>$row1->strata</td>
            <td class='isi_bukti'>$row1->jur</td>
			<td class='isi_bukti'>$row1->institusi</td>
		    <td class='isi_bukti'>$row1->tahun</td>
           
          </tr>";
		}  
        echo "</table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
	   <tr>
        <td class='lokasi_laporan'>RIWAYAT PENGHARGAAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td width='150' class='isi_bukti'>No SK</td>
			<td width='60' class='isi_bukti'>Tanggal</td>
            <td width='300' class='isi_bukti'>Keterangan</td>
            </tr>";
		  $sql1="select a.nik,b.nama,a.no_sk,date_format(c.tgl_masuk,'%d/%m/%Y') as tgl_awal_sk,a.keterangan,a.nilai 
from gr_rwyharga a 
inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi 
where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by c.tgl_masuk desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td class='isi_bukti'>$row1->no_sk</td>
            <td class='isi_bukti'>$row1->tgl_awal_sk</td>
			<td class='isi_bukti'>$row1->keterangan</td>
			
          </tr>";
		}  
        echo "</table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
	   <tr>
        <td class='lokasi_laporan'>RIWAYAT SANKSI </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td width='150' class='isi_bukti'>No SK</td>
			<td width='60' class='isi_bukti'>Tanggal</td>
            <td width='250' class='isi_bukti'>Sanksi</td>
			<td width='40' class='isi_bukti'>Lama</td>
			<td width='60' class='isi_bukti'>Tgl Berlaku</td>
			<td width='60' class='isi_bukti'>Tgl Berakhir</td>
            </tr>";
		  $sql1="select a.nik,b.nama,a.no_sk,date_format(c.tgl_masuk,'%d/%m/%Y') as tgl_awal_sk,a.lama,d.nama as sanksi,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai
from gr_rwysanksi a 
inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join gr_sk c on a.no_sk=c.no_sk and a.kode_lokasi=c.kode_lokasi 
inner join gr_status_sanksi d on a.sts_sanksi=d.sts_sanksi and a.kode_lokasi=d.kode_lokasi
where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by c.tgl_masuk desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td class='isi_bukti'>$row1->no_sk</td>
            <td class='isi_bukti'>$row1->tgl_awal_sk</td>
			<td class='isi_bukti'>$row1->sanksi</td>
			<td class='isi_bukti' align='center'>$row1->lama</td>
			<td class='isi_bukti'>$row1->tgl_mulai</td>
			<td class='isi_bukti'>$row1->tgl_selesai</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
    </table></td>
  </tr>
    
   
</table></td>
  </tr>
  <tr>
    <td align='left' style='{font-size:9;}'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
