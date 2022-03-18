<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_rptHrKaryawanCv extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$sql="select a.nik, a.kode_lokasi, a.nama, a.alamat, a.no_telp, a.email, a.kode_pp, a.npwp, a.bank, a.cabang, a.no_rek, a.nama_rek, a.grade, 
				a.kota, a.kode_pos, a.no_hp, a.flag_aktif, a.foto,g.nama as nama_agama,h.nama as nama_unit,i.nama as nama_profesi,kode_pajak
				,b.nama as nama_pp,c.nama as nama_gol,d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,
				a.tempat, date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.tahun_masuk,
				a.npwp, a.bank, a.cabang, a.no_rek, a.nama_rek,
				case when a.jk='L' then 'Laki-Laki' else 'Perempuan' end as jk,
				a.no_sk,date_format(a.tgl_sk,'%d/%m/%Y') as tgl_sk,a.gelar_depan,a.gelar_belakang,
				date_format(a.tgl_nikah,'%d/%m/%Y') as tgl_nikah,a.gol_darah,a.no_kk,a.kelurahan,a.kecamatan,a.ibu_kandung,
				a.tempat,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir ,
				case when a.status_nikah='0' then 'Tidak' else 'Ya' end as status_nikah
		        from hr_karyawan a 
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  
				inner join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi 
				inner join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi 
				inner join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi 
				inner join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi 
				inner join hr_agama g on a.kode_agama=g.kode_agama and a.kode_lokasi=g.kode_lokasi
				inner join hr_unit h on a.kode_unit=h.kode_unit and a.kode_lokasi=h.kode_lokasi
				inner join hr_profesi i on a.kode_profesi=i.kode_profesi and a.kode_lokasi=i.kode_lokasi
				$this->filter
			order by a.nik ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("daftar karyawan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
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
            <td width='154' class='isi_bukti'>NIK</td>
            <td width='374' class='isi_bukti'>: $row->nik </td>
            <td width='162' rowspan='13' align='left' valign='top'><img src='$pathfoto' width='160' height='180' /></td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nama</td>
            <td class='isi_bukti'>: $row->gelar_depan $row->nama $row->gelar_belakang</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Jenis Kelamin </td>
            <td class='isi_bukti'>: $row->jk </td>
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
            <td class='isi_bukti'>Status Pajak </td>
            <td class='isi_bukti'>: $row->kode_pajak </td>
            </tr>
          <tr>
            <td class='isi_bukti'>No NPWP </td>
            <td class='isi_bukti'>: $row->npwp </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Alamat</td>
            <td class='isi_bukti'>: $row->alamat </td>
            </tr>
          <tr>
            <td>Kota</td>
            <td>: $row->kota </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Kode Pos </td>
            <td class='isi_bukti'>: $row->kode_pos </td>
            </tr>
          <tr>
            <td class='isi_bukti'>No Telp </td>
            <td class='isi_bukti'>: $row->no_telp </td>
           
          </tr>
          <tr>
            <td class='isi_bukti'>No HP </td>
            <td class='isi_bukti'>: $row->no_hp </td>
            
          </tr>
          <tr>
            <td class='isi_bukti'>Email</td>
            <td class='isi_bukti'>: $row->email </td>
           
          </tr>
		  <tr>
            <td class='isi_bukti'>NPWP</td>
            <td class='isi_bukti'>: $row->npwp </td>
           
          </tr>
		  <tr>
            <td class='isi_bukti'>Bank</td>
            <td class='isi_bukti'>: $row->bank </td>
           
          </tr>
		  <tr>
            <td class='isi_bukti'>Cabang</td>
            <td class='isi_bukti'>: $row->cabang </td>
           
          </tr>
		  <tr>
            <td class='isi_bukti'>No Rekening</td>
            <td class='isi_bukti'>: $row->no_rek </td>
           
          </tr>
		    <tr>
            <td class='isi_bukti'>Nama Rekening</td>
            <td class='isi_bukti'>: $row->nama_rek </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>No SK</td>
            <td class='isi_bukti'>: $row->no_sk </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Tanggal SK</td>
            <td class='isi_bukti'>: $row->tgl_sk </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Status Nikah</td>
            <td class='isi_bukti'>: $row->status_nikah </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Tanggal Nikah</td>
            <td class='isi_bukti'>: $row->tgl_nikah </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Golongan Darah</td>
            <td class='isi_bukti'>: $row->gol_darah </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Ibu Kandung </td>
            <td class='isi_bukti'>: $row->ibu_kandung </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Nomor KK </td>
            <td class='isi_bukti'>: $row->no_kk </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Kelurahan </td>
            <td class='isi_bukti'>: $row->kelurahan </td>
		    </tr>
			 <tr>
            <td class='isi_bukti'>Kecamatan </td>
            <td class='isi_bukti'>: $row->kecamatan </td>
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
            <td width='154' class='isi_bukti'>Status Karyawan </td>
            <td width='536' class='isi_bukti'>: $row->nama_sdm</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Jabatan</td>
            <td class='isi_bukti'>: $row->nama_jab</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Golongan</td>
            <td class='isi_bukti'>: $row->nama_gol</td>
            </tr>
          <tr>
            <td class='isi_bukti'>Lokasi Kerja </td>
            <td class='isi_bukti'>: $row->nama_loker </td>
            </tr>
          <tr>
            <td class='isi_bukti'>PP</td>
            <td class='isi_bukti'>: $row->nama_pp </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Unit</td>
            <td class='isi_bukti'>: $row->nama_unit </td>
            </tr>
          <tr>
            <td class='isi_bukti'>Profesi</td>
            <td class='isi_bukti'>: $row->nama_profesi</td>
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
		   <td width='200' class='isi_bukti'>Nama</td>
            <td width='60' class='isi_bukti'>Status</td>
            <td width='60' class='isi_bukti'>Jenis Kelamin</td>
            <td width='60' class='isi_bukti'>Tanggungan</td>
            <td width='150' class='isi_bukti'>Tempat Lahir </td>
            <td width='60' class='isi_bukti'>Tgl Lahir</td>
		    
          </tr>";
		  $sql1="select  nik, kode_lokasi, nu, jenis, nama, jk, tempat, date_format(tgl_lahir,'%d/%m/%Y') as tgl_lahir	, status_kes, foto
			from hr_keluarga 
			where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi'";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
        echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->jenis</td>
            <td class='isi_bukti' align='center' class='isi_bukti'>$row1->jk</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->status_kes</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tempat</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl_lahir</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	 
      <tr>
        <td class='lokasi_laporan'>DATA KEDINASAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		      <td width='150' class='isi_bukti'>No SK</td>
            <td width='60' class='isi_bukti'>Tanggal</td>
            <td width='300' class='isi_bukti'>Keterangan</td>
          </tr>";
		 
		 $sql1="select  no_sk,nama, date_format(tgl_sk,'%d/%m/%Y') as tgl	
			from hr_sk
			where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tgl_sk desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         
		   echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->no_sk</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	   <tr>
        <td class='lokasi_laporan'>DATA PENDIDIKAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		    <td width='200' class='isi_bukti'>Nama</td>
            <td width='60' class='isi_bukti'>Tahun</td>
			<td width='150' class='isi_bukti'>Strata</td>
            <td width='150' class='isi_bukti'>Jurusan</td>
			
          </tr>";
		 
		 $sql1="select a.nama, a.tahun, a.setifikat, a.kode_jurusan,a.kode_strata,b.nama as nama_jur,c.nama as nama_strata
from hr_pendidikan a
inner join hr_jur b on a.kode_jurusan=b.kode_jur and a.kode_lokasi=b.kode_lokasi
inner join hr_strata c on a.kode_strata=c.kode_strata and a.kode_lokasi=c.kode_lokasi
where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by tahun desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         
		   echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tahun</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama_strata</td>
			<td class='isi_bukti' class='isi_bukti'>$row1->nama_jur</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	   <tr>
        <td class='lokasi_laporan'>DATA PELATIHAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		    <td width='200' class='isi_bukti'>Nama</td>
			<td width='200' class='isi_bukti'>Penyelenggara</td>
            <td width='60' class='isi_bukti'>Tgl Mulai</td>
            <td width='60' class='isi_bukti'>Tgl Selesai</td>
			
          </tr>";
		 
		 $sql1="select nama, panitia, date_format(tgl_mulai,'%d/%m/%Y') as tgl, date_format(tgl_selesai,'%d/%m/%Y') as tgl_selesai
from hr_pelatihan
where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tgl_mulai desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         
		   echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->panitia</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
			<td class='isi_bukti' class='isi_bukti'>$row1->tgl_selesai</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	  <tr>
        <td class='lokasi_laporan'>DATA PENGHARGAAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		    <td width='200' class='isi_bukti'>Nama</td>
			<td width='200' class='isi_bukti'>Penyelenggara</td>
            <td width='60' class='isi_bukti'>Tgl Mulai</td>
            <td width='60' class='isi_bukti'>Tgl Selesai</td>
			
          </tr>";
		 
		 $sql1="select nama, date_format(tanggal,'%d/%m/%Y') as tgl
from hr_penghargaan
where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tanggal desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         
		   echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	  <tr>
        <td class='lokasi_laporan'>DATA SANKSI </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
		    <td width='150' class='isi_bukti'>Jenis</td>
			<td width='60' class='isi_bukti'>Tanggal</td>
			<td width='200' class='isi_bukti'>Keterangan</td>
			
          </tr>";
		 
		 $sql1="select nama, jenis,date_format(tanggal,'%d/%m/%Y') as tgl
from hr_sanksi
where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tanggal desc";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         
		   echo "<tr>
            <td class='isi_bukti' class='isi_bukti'>$row1->jenis</td>
            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
			<td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	 
        <td>&nbsp;</td>
      </tr>
	  </table><br>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
