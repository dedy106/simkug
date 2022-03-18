<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptRiwayat
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(distinct a.nik) ".
			"from karyawan a  ".
			"left outer join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) ".
			"left outer join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) ".$this->filter;
		//error_log("testing");
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		return $totPage;
	}
	function getKaryawan()
	{
		global $dbdriver;		
		if ($dbdriver == "ado_mssql")
			return "select distinct a.nik,a.nama,a.sex,a.status,a.agama,a.tempat_lahir,a.alamat,a.kota, a.sts_dosen, a.kode_prodi, a.nidn, ".
				"a.propinsi,a.kode_pos,a.no_telp,a.no_ponsel,a.golongan_darah,a.email,c.jenjang,c.jurusan, ".
				"date_format(a.tgl_lahir,'%e %M %Y') as tgllhr,date_format(a.tgl_masuk,'%e %M %Y') as tglmsk, ".
				"d.tingkat2,date_format(d.tgl_skmulai,'%e %M %Y') as tglawl,floor(abs(datediff(now(),a.tgl_masuk)) / 360) as mk_tahun, floor((abs(datediff(now(),a.tgl_masuk)) % 360) / 30) as mk_bulan,a.foto,f.nama as nmstatus ".
				"from karyawan a ".
				"left outer join hr_angkat b on a.nik=b.nik and a.kode_lokasi = b.kode_lokasi and b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik)  ".
				"left outer join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) ".
				"left outer join hr_rwystatus e on a.nik=e.nik ".
				"left outer join hr_status2 f on e.kode_status2=f.kode_status and e.kode_lokkonsol=f.kode_lokkonsol ".
				"left outer join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) ".$this->filter;
		else 
			return "select distinct a.nik,a.nama,a.sex,a.status,a.agama,a.tempat_lahir,a.alamat,a.kota, a.sts_dosen, a.kode_prodi, a.nidn, ".
				"a.propinsi,a.kode_pos,a.no_telp,a.no_ponsel,a.golongan_darah,a.email,c.jenjang,c.jurusan, ".
				"date_format(a.tgl_lahir,'%e %M %Y') as tgllhr,date_format(a.tgl_masuk,'%e %M %Y') as tglmsk, ".
				"d.tingkat2,date_format(d.tgl_skmulai,'%e %M %Y') as tglawl,floor(abs(datediff(now(),a.tgl_masuk)) / 360) as mk_tahun, floor(mod(abs(datediff(now(),a.tgl_masuk)),360) / 30) as mk_bulan,a.foto,f.nama as nmstatus ".
				"from karyawan a ".
				"left outer join hr_angkat b on a.nik=b.nik and a.kode_lokasi = b.kode_lokasi and b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik)  ".
				"left outer join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) ".
				"left outer join hr_rwystatus e on a.nik=e.nik ".
				"left outer join hr_status2 f on e.kode_status2=f.kode_status and e.kode_lokkonsol=f.kode_lokkonsol ".
				"left outer join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) ".$this->filter;
	}
	function getKeluarga($nik,$status)
	{
		switch ($status)
		{
			case "ortu":
				return "select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Ayah','Ibu')";
			break;		
			case "mertua":
				return "select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Ayah Mertua','Ibu Mertua')";
			    
			break;
			case "pasangan":
				return "select nama,tempat_lahir,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(tgl_nikah,'%d/%m/%Y') as tglnkh, ".
					"status_kerja,institusi,nik2 ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Suami','Istri')";
			break;
			case "anak":
				return "select nama,status,sex,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,status_tanggungan,status_anak,tempat_lahir ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Anak')";	
			break;
		}
	}
	function getDinas($nik)
	{
		return "select a.nip,a.tingkat,a.loker,a.jabs,a.jabf,a.tglsk,a.nosk,a.tgl,a.jenis,a.ket ".
				"from ( ".
				"(select distinct a.nik as nip,a.tingkat as tingkat,b.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Peng. Peg. Tetap' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai 
                from hr_angkat a
                  inner join hr_loker b on a.kode_loker=b.kode_loker
                  left outer join hr_jabs c on c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                  left outer join hr_jabf d on d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik ) union ".
				"(select distinct a.nik as nip,a.tingkat as tingkat,b.initial as loker,a.kode_jabs as jabs,a.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Peng. Peg. Tetap' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_dinas2 a inner join hr_loker b on a.kode_loker=b.kode_loker) union ".
				"(select distinct a.nik as nip,a.tingkat as tingkat,b.initial as loker,a.kode_jabs as jabs,c.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Penetapan Jab. Struk' as jenis,a.jab_baru as ket,a.tgl_skmulai as mulai ".
				 "from hr_jabs a inner join hr_loker b on a.kode_loker=b.kode_loker 
                    left outer join hr_jabf c on c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik) union ".
				"(select distinct a.nik as nip,a.tingkat as tingkat,b.initial as loker,c.kode_jabs as jabs,a.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Penetapan Jab. Fung' as jenis,a.jab_baru as ket,a.tgl_skmulai as mulai ".
				 "from hr_jabf a inner join hr_loker b on a.kode_loker=b.kode_loker 
                 left outer join hr_jabs c on c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik) union ".
				"(select distinct a.nik as nip,a.tingkat as tingkat,e.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Kenaikan Gadas' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_gadas a left outer join hr_angkat b on b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and b.nik = a.nik
                      left outer join hr_loker e on e.kode_loker = b.kode_loker
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik) union ".
				"(select distinct a.nik as nip,b.tingkat as tingkat,e.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Perubahan Status' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_rwystatus a left outer join hr_angkat b on b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and b.nik = a.nik
                      left outer join hr_loker e on e.kode_loker = b.kode_loker
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik) union ".
				"(select distinct a.nik as nip,b.tingkat as tingkat,e.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Perubahan Profesi' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_rwyprofesi a left outer join hr_angkat b on b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and b.nik = a.nik
                      left outer join hr_loker e on e.kode_loker = b.kode_loker
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik) union ".
				"(select distinct a.nik as nip,a.tingkat2 as tingkat,e.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Kenaikan Tingkat' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_tingkat a left outer join hr_angkat b on b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and b.nik = a.nik
                      left outer join hr_loker e on e.kode_loker = b.kode_loker
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik) union ".
				"(select distinct a.nik as nip,a.tingkat2 as tingkat,e.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Kenaikan Pangkal Tingkat' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_pangkal a left outer join hr_angkat b on b.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and b.nik = a.nik
                      left outer join hr_loker e on e.kode_loker = b.kode_loker
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik) union ".
				"(select distinct a.nik as nip,e.tingkat as tingkat,b.initial as loker,c.kode_jabs as jabs,d.kode_jabf as jabf,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d-%m-%Y') as tgl,'Mutasi Loker' as jenis,a.keterangan as ket,a.tgl_skmulai as mulai ".
				 "from hr_rwymutasi a inner join hr_loker b on a.kode_loker2=b.kode_loker 
                        left outer join hr_angkat e on e.tgl_skmulai = (select max(z.tgl_skmulai) from hr_angkat z where z.nik = a.nik ) and e.nik = a.nik
                      left outer join hr_jabs c on  c.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and c.nik = a.nik
                      left outer join hr_jabf d on d.tgl_sk = (select max(z.tgl_sk) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.tgl_skmulai = (select min(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik and z.tgl_skmulai >= a.tgl_skmulai) and d.nik = a.nik ) ".
				") as a ".
				"where a.nip='".$nik."' ".
				"order by a.mulai desc,a.jabf";
	}
	function getDinas2($nik){
	   return "select a.nik,a.tingkat,b.initial as loker,a.kode_jabs as jabs,a.kode_jabf as jabf,date_format(a.tgl_sk,'%d/%m/%Y') as tgl_sk,a.no_sk as nosk,date_format(a.tgl_skmulai,'%d/%m/%Y') as tgl,c.jenis,a.keterangan as ket, a.sts_dosen, a.kode_prodi, a.nidn ".
	           "from hr_dinas2 a left outer join hr_loker b on b.kode_loker = a.kode_loker and b.kode_lokasi = a.kode_lokasi ".
               "    left outer join hr_sk_jenis c on c.no_sk = a.no_sk and c.kode_lokasi = a.kode_lokasi ".
               "where a.nik = '$nik' order by a.tgl_skmulai desc, a.kode_jabf";
    }
	function getPendidikan($nik)
	{
		return "select institusi,jurusan,jenjang,tahun,setara,keterangan ".
				"from hr_rwypddk ".
				"where nik='".$nik."' ".
				"order by tahun desc";
	}
	function getNKI($nik)
	{
		return "select tahun, nhasil,keterangan ".
				"from hr_nki ".
				"where nik='".$nik."' ".
				"order by tahun desc";
	}
	function getPelatihan($nik)
	{
		return "select latih,lama,date_format(tgl_mulai,'%d-%m-%Y') as tglawl, ".
				"date_format(tgl_selesai,'%d-%m-%Y') as tglend,panitia,kota ".
				"from hr_rwylatih ".
				"where nik='".$nik."' ".
				"order by tgl_mulai desc";
	}
	function getPenghargaan($nik)
	{
		return "select keterangan,date_format(tgl_skmulai,'%d-%m-%Y') as tglawl,no_sk, ".
				"date_format(tgl_sk,'%d-%m-%Y') as tglsk,nilai ".
				"from hr_rwyharga ".
				"where nik='".$nik."' ".
				"order by tgl_skmulai desc";
	}
	function getLokerNow($nik)
	{
		return "select a.saatini,a.tgl,min(a.mulai) as mulai ".
		"from (".
		"(select a.nik as nip,b.nama as saatini,date_format(a.tgl_skmulai,'%e %M %Y') as tgl,a.tgl_skmulai as mulai
		 from hr_angkat a inner join hr_loker b on a.kode_loker=b.kode_loker and b.kode_lokasi = a.kode_lokasi and a.status_aktif = '1') union ".
		"(select a.nik as nip,b.nama as saatini,date_format(a.tgl_skmulai,'%e %M %Y') as tgl,a.tgl_skmulai as mulai
		 from hr_rwymutasi a inner join hr_loker b on a.kode_loker2=b.kode_loker and a.status_aktif = '1') ".
		") as a ".
		"where a.nip='".$nik."' ".
		"group by a.saatini,a.tgl ";
	}
	function getJabSNow($nik)
	{
		return "select jab_baru,date_format(tgl_skmulai,'%e %M %Y') as tgl,min(tgl_skmulai) as tgl_mulai ".
				"from hr_jabs a ".
				"where nik='".$nik."' and tgl_skmulai = (select max(z.tgl_skmulai) from hr_jabs z where z.nik = a.nik) ".
				"group by jab_baru,tgl_skmulai ";
	}
	function getJabFNow($nik)
	{
		return "select jab_baru,date_format(tgl_skmulai,'%e %M %Y') as tgl,min(tgl_skmulai) as tgl_mulai ".
				"from hr_jabf a ".
				"where nik='".$nik."' and tgl_skmulai = (select max(z.tgl_skmulai) from hr_jabf z where z.nik = a.nik) ".
				"group by jab_baru,tgl_skmulai ";
	}
	function getTugas($nik)
	{
		return "select date_format(a.tgl_mulai,'%d-%m-%Y') as tglawl,date_format(a.tgl_selesai,'%d-%m-%Y') as tglend,a.jabs,a.jabf,a.keterangan ".
				"from hr_tugas a ".
				"where a.nik='".$nik.
				"' order by a.no_urut ";
	}
	function getSanksi($nik)
	{
		return "select b.nama,date_format(a.tgl_sk,'%d-%m-%Y') as tglsk,a.no_sk,a.lama,date_format(a.tgl_mulai,'%d-%m-%Y') as tglawl,date_format(a.tgl_selesai,'%d-%m-%Y') as tglend ".
				"from hr_rwysanksi a inner join hr_sanksi b on a.kode_sanksi=b.kode_sanksi ".
				"where a.nik='".$nik.
				"' order by a.tgl_sk desc";
	}
	function getCuti($nik)
	{
		return "select b.nama,date_format(a.tgl_mulai,'%d-%m-%Y') as tglawl,date_format(a.tgl_akhir,'%d-%m-%Y') as tglend,a.lama_ini,a.tambah_hari ".
				"from hr_rwycuti a inner join hr_mcuti b on a.kode_cuti=b.kode_cuti ".
				"where a.nik='".$nik.
				"' order by a.tgl_mulai desc";
	}
	function getTgsBljr($nik)
	{
		return "select date_format(a.tgl_masuk,'%d-%m-%Y') as tglin,date_format(a.tgl_lulus,'%d-%m-%Y') as tgllus,a.jenjang,a.jurusan,a.institusi,b.semester,b.ipk,b.keterangan,b.nilai ".
				"from hr_belajar_m a inner join hr_belajar_d b on a.nik=b.nik and a.no_pid=b.no_pid and a.kode_lokkonsol=b.kode_lokkonsol ".
				"where a.nik='".$nik."' order by b.no_urut";
	}
	function getHtml()
	{
		global $dbLib;
		$start = -1;	
		$rowPerPage = $this->rows;		
		if ($this->page > 0){		
			$start = (($this->page-1) * $this->rows);			
		}else $rowPerPage = -1;				
		$AddOnLib = new server_util_AddOnLib();		
		$getkar=$dbLib->LimitQuery($this->getKaryawan(), $rowPerPage, $start);
		$i = $start+1;
		$html = "<br>";
		while ($krywn = $getkar->FetchNextObject($toupper = false)) {	
			$nik = $krywn->nik;
			$getloker = $dbLib->execute($this->getLokerNow($nik)); 
			if (!$getloker->EOF) $loker = $getloker->FetchNextObject($toupper = false);
			$getjabs=$dbLib->execute($this->getJabSNow($nik)); 
			if (!$getjabs->EOF) $jabs = $getjabs->FetchNextObject($toupper = false);
			$getjabf = $dbLib->execute($this->getJabFNow($nik)); 
			if (!$getjabf->EOF) $jabf = $getjabf->FetchNextObject($toupper = false);
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"serverApp.php"));		
			$pathfoto = $path . "media/".$krywn->foto;				
			$html.=
			"<div align='center'><span class='nstyle16'><u>DATA KARYAWAN</u></span><br /><br />
			  <table width='800' border='0' cellspacing='1' cellpadding='1'>
				<tr>
				  <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
					<tr class='istyle15'>
					  <td width='20%'>Nama</td>
					  <td width='4%'><div align='center'>:</div></td>
					  <td width='54%' class='istyle18'>".$krywn->nama."</td>
					  <td width='22%' rowspan='15' valign='top' align='center'><img src='$pathfoto' width='113' height='170' /></td>
					</tr>
					<tr class='istyle15'>
					  <td>NIP</td>
					  <td><div align='center'>:</div></td>
					  <td>".$nik."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Jenis Kelamin </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->sex."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Status Pernikahan </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->status."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Agama</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->agama."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Tempat, Tanggal Lahir </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->tempat_lahir.", ".$krywn->tgllhr."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Tanggal Mulai kerja </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->tglmsk."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Pendidikan Tertinggi Diakui </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->jenjang."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Jurusan</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->jurusan."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Status Dosen</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->sts_dosen."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Program Studi</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->kode_prodi."</td
					  </tr>
					<tr class='istyle15'>
					  <td>NIDN</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->nidn."</td>
					  </tr>
					 <tr class='istyle15'>
					  <td valign='top'>Alamat Sekarang </td>
					  <td valign='top'><div align='center'>:</div></td>
					  <td>".$krywn->alamat.", ".$krywn->kota.", ".$krywn->propinsi." ".$krywn->kode_pos."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Telepon Rumah </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->no_telp."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Telepon Selular </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->no_ponsel."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Golongan Darah</td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->golongan_darah."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Alamat e-Mail </td>
					  <td><div align='center'>:</div></td>
					  <td>".$krywn->email."</td>
					  </tr>
				  </table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='3' class='nstyle16'>Posisi Sekarang </td>
					  </tr>
					<tr>
					  <td colspan='3'><hr></td>
					  </tr>
					<tr class='istyle18'>
					  <td width='33%'>Data</td>
					  <td width='33%'>Saat Ini </td>
					  <td width='34%'>Sejak Tanggal </td>
					  </tr>
					<tr class='istyle15'>
					  <td>Tingkat</td>
					  <td>".$krywn->tingkat2."</td>
					  <td>".$krywn->tglawl."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Lokasi Kerja </td>
					  <td>".($loker ? $loker->saatini:"")."</td>
					  <td>".($loker ? $loker->tgl :"")."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Jabatan Struktural </td>
					  <td>".($jabs ? $jabs->jab_baru :"")."</td>
					  <td>".($jabs ? $jabs->tgl :"")."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Jabatan Fungsional Akademik </td>
					  <td>".($jabf ? $jabf->jab_baru:"")."</td>
					  <td>".($jabf ? $jabf->tgl :"")."</td>
					  </tr>
					<tr class='istyle15'>
					  <td>Masa Kerja </td>
					  <td>".$krywn->mk_tahun." tahun, ".$krywn->mk_bulan." bulan</td>
					  <td>".$krywn->tglmsk."</td>
					  </tr>
				  </table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='3' class='nstyle16'>Orang Tua </td>
					</tr>
					<tr>
					  <td colspan='3'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='10%'>Data</td>
					  <td width='36%'>Nama</td>
					  <td width='54%'>Status</td>
					</tr>";
			$getortu=$dbLib->execute($this->getKeluarga($nik,"ortu"));
			while ($ortu = $getortu->FetchNextObject($toupper=false))
			{
				$html.= "<tr class='istyle15'>
						  <td>".$ortu->status_family."</td>
						  <td>".$ortu->nama."</td>
						  <td>".$ortu->status."</td>
						</tr>";
				$almt=$ortu->alamat;
				$kota=$ortu->kota;
				$kdpos=$ortu->kodepos;
				$prov=$ortu->provinsi;
				$tlpn=$ortu->no_telp;
			}
			$getpas=$dbLib->execute($this->getKeluarga($nik,"pasangan"));
			$pasangan = $getpas->FetchNextObject($toupper=false);
			$html.= "<tr class='istyle15'>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					</tr>
					<tr>
					  <td colspan='3'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						<tr class='istyle18'>
						  <td width='52%'>Alamat</td>
						  <td width='12%'>Kota</td>
						  <td width='12%'>Kode Pos </td>
						  <td width='12%'>Provinsi</td>
						  <td width='12%'>Telepon</td>
						</tr>
						<tr class='istyle15'>
						  <td>".$almt."</td>
						  <td>".$kota."</td>
						  <td>".$kdpos."</td>
						  <td>".$prov."</td>
						  <td>".$tlpn."</td>
						</tr>
					  </table></td>
					  </tr>
				  </table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='6' class='nstyle16'>Pasangan</td>
					</tr>
					<tr>
					  <td colspan='6'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='23%'>Nama</td>
					  <td width='15%'>Tempat Lahir </td>
					  <td width='12%'>Tgl Lahir </td>
					  <td width='12%'>Tgl Nikah </td>
					  <td width='19%'>Status Pekerjaan </td>
					  <td width='19%'>Instansi</td>
					</tr>
					<tr class='istyle15'>
					  <td>".$pasangan->nama."</td>
					  <td>".$pasangan->tempat_lahir."</td>
					  <td>".$pasangan->tgllhr."</td>
					  <td>".$pasangan->tglnkh."</td>
					  <td>".$pasangan->status_kerja."</td>
					  <td>".$pasangan->institusi."</td>
					</tr>

				  </table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='3' class='nstyle16'>Mertua</td>
					</tr>
					<tr>
					  <td colspan='3'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='11%'>Data</td>
					  <td width='39%'>Nama</td>
					  <td width='50%'>Status</td>
					</tr>";
			$getmertua=$dbLib->execute($this->getKeluarga($nik,"mertua"));
			$almt="";
			$kota="";
			$kdpos="";
			$prov="";
			$tlpn="";
			while ($mertua = $getmertua->FetchNextObject($toupper=false))
			{
				$html.= "<tr class='istyle15'>
						  <td>".$mertua->status_family."</td>
						  <td>".$mertua->nama."</td>
						  <td>".$mertua->status."</td>
						</tr>";
				$almt=$mertua->alamat;
				$kota=$mertua->kota;
				$kdpos=$mertua->kode_pos;
				$prov=$mertua->propinsi;
				$tlpn=$mertua->no_telp;
			}
			$html.= "<tr class='istyle15'>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					</tr>
					<tr>
					  <td colspan='3'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						  <tr class='istyle18'>
							<td width='52%'>Alamat</td>
							<td width='12%'>Kota</td>
							<td width='12%'>Kode Pos </td>
							<td width='12%'>Provinsi</td>
							<td width='12%'>Telepon</td>
						  </tr>
						  <tr class='istyle15'>
							<tr class='istyle15'>
						  <td>".$almt."</td>
						  <td>".$kota."</td>
						  <td>".$kdpos."</td>
						  <td>".$prov."</td>
						  <td>".$tlpn."</td>
						</tr>
					  </table></td>
					</tr>
				  </table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='7' class='nstyle16'>Anak</td>
					</tr>
					<tr>
					  <td colspan='7'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='28%' height='18'>Nama</td>
					  <td width='11%'>Status</td>
					  <td width='10%'>Jenis Kelamin </td>
					  <td width='11%'>Tempat Lahir </td>
					  <td width='9%'>Tgl Lahir </td>
					  <td width='19%'>Status Tanggungan</td>
					  <td width='12%'>Status Anak </td>
					</tr>";
			$getanak=$dbLib->execute($this->getKeluarga($nik,"anak"));
			while ($anak = $getanak->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$anak->nama."</td>
						  <td>".$anak->status."</td>
						  <td>".$anak->sex."</td>
						  <td>".$anak->tempat_lahir."</td>
						  <td>".$anak->tgllhr."</td>
						  <td>".$anak->status_tanggungan."</td>
						  <td>".$anak->status_anak."</td>
						</tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='9' class='nstyle16'>Riwayat Kedinasan </td>
					</tr>
					<tr>
					  <td colspan='9'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='5%'>Tingkat</td>
					  <td width='4%'>Loker</td>
					  <td width='11%' height='18'>Jab. Struk </td>
					  <td width='11%'>Jab. Fung </td>
					  <td width='8%'>Tgl. SK </td>
					  <td width='18%'>No. Sk </td>
					  <td width='8%'>Tgl Berlaku </td>
					  <td width='15%'>Jenis SK </td>
					  <td width='20%'>Keterangan</td>
					</tr>";
			$getdinas=$dbLib->execute($this->getDinas($nik));
			if ($getdinas){
				while ($dinas = $getdinas->FetchNextObject($toupper=false))
				{
					$html.="<tr class='istyle15'>
							  <td>".$dinas->tingkat."</td>
							  <td>".$dinas->loker."</td>
							  <td>".$dinas->jabs."</td>
							  <td>".$dinas->jabf."</td>
							  <td>".$dinas->tglsk."</td>
							  <td>".$dinas->nosk."</td>
							  <td>".$dinas->tgl."</td>
							  <td>".$dinas->jenis."</td>
							  <td>".$dinas->ket."</td>
							</tr>";
				}
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='5' class='nstyle16'>Riwayat Pengalaman Kerja </td>
					</tr>
					<tr>
					  <td colspan='5'><hr /></td>
					</tr>
					<tr class='istyle18'>
					  <td width='11%' height='18'>Tanggal Mulai</td>
					  <td width='13%'>Tanggal Selesai </td>
					  <td width='19%'>Jab. Struktural</td>
					  <td width='20%'>Jab. Fungsional</td>
					  <td width='37%'>Keterangan</td>
					  </tr>";
			$gettgs=$dbLib->execute($this->getTugas($nik));
			while ($tgs = $gettgs->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
					  <td>".$tgs->tglawl."</td>
					  <td>".$tgs->tglend."</td>
					  <td>".$tgs->jabs."</td>
					  <td>".$tgs->jabf."</td>
					  <td>".$tgs->keterangan."</td>
					  </tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='6' class='nstyle16'>Riwayat Pendidikan</td>
					</tr>
					<tr>
					  <td colspan='6'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='16%' height='18'>Nama Institusi </td>
					  <td width='18%'>Jur./Falkutas</td>
					  <td width='6%'>Gelar</td>
					  <td width='11%'>Tahun Selesai </td>
					  <td width='15%'>Setara</td>
					  <td width='34%'>Keterangan</td>
					  </tr>";
			$getpddk=$dbLib->execute($this->getPendidikan($nik));
			while ($pddk = $getpddk->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$pddk->institusi."</td>
						  <td>".$pddk->jurusan."</td>
						  <td>".$pddk->jenjang."</td>
						  <td>".$pddk->tahun."</td>
						  <td>".$pddk->setara."</td>
						  <td>".$pddk->keterangan."</td>
						  </tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='6' class='nstyle16'>Riwayat Pelatihan</td>
					</tr>
					<tr>
					  <td colspan='6'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='26%' height='18'>Nama Pelatihan </td>
					  <td width='11%'>Lama Kegiatan </td>
					  <td width='11%'>Tgl Mulai </td>
					  <td width='11%'>Tgl Selesai</td>
					  <td width='22%'>Penyelenggara</td>
					  <td width='19%'>Kota</td>
					</tr>";
			$getlatih=$dbLib->execute($this->getPelatihan($nik));
			while ($latih = $getlatih->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$latih->latih."</td>
						  <td>".$latih->lama."</td>
						  <td>".$latih->tglawl."</td>
						  <td>".$latih->tglend."</td>
						  <td>".$latih->panitia."</td>
						  <td>".$latih->kota."</td>
						</tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='3' class='nstyle16'>Riwayat NKI </td>
					</tr>
					<tr>
					  <td colspan='3'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='33%'>Tahun Penilaian </td>
					  <td width='33%'>Rata-rata NKI </td>
					  <td width='34%'>Kesimpulan</td>
					</tr>";
					$getnki=$dbLib->execute($this->getNKI($nik));
					while ($nki = $getnki->FetchNextObject($toupper=false))
					{
						$html.="<tr class='istyle15'>
								  <td>".$nki->tahun."</td>
								  <td>".$nki->nhasil."</td>
								  <td>".$nki->keterangan."</td>
								  </tr>";
					}		        
				  $html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
					<tr>
					  <td colspan='5' class='nstyle16'>Riwayat Penghargaan </td>
					</tr>
					<tr>
					  <td colspan='5'><hr></td>
					</tr>
					<tr class='istyle18'>
					  <td width='36%' height='18'>Nama Penghargaan </td>
					  <td width='10%'>Tgl. SK </td>
					  <td width='24%'>No. SK </td>
					  <td width='10%'>Tgl. Berlaku </td>
					  <td width='20%'>Uang Penyerta </td>
					  </tr>";
			$gethrg=$dbLib->execute($this->getPenghargaan($nik));
			while ($hrg = $gethrg->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$hrg->keterangan."</td>
						  <td>".$hrg->tglsk."</td>
						  <td>".$hrg->no_sk."</td>
						  <td>".$hrg->tglawl."</td>
						  <td>Rp ".number_format($hrg->nilai,0,",",".")."</td>
						  </tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						<tr>
						  <td colspan='6' class='nstyle16'>Riwayat Sanksi </td>
						</tr>
						<tr>
						  <td colspan='6'><hr /></td>
						</tr>
						<tr class='istyle18'>
						  <td width='21%' height='18'>Jenis Sanksi</td>
						  <td width='10%'>Tanggal SK </td>
						  <td width='35%'>No. SK </td>
						  <td width='9%'>Lama</td>
						  <td width='12%'>Tanggal Mulai </td>
						  <td width='13%'>Tanggal Selesai </td>
						</tr>";
			$getsanksi=$dbLib->execute($this->getSanksi($nik));
			while ($sanksi = $getsanksi->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$sanksi->nama."</td>
						  <td>".$sanksi->tglsk."</td>
						  <td>".$sanksi->no_sk."</td>
						  <td>".$sanksi->lama."</td>
						  <td>".$sanksi->tglawl."</td>
						  <td>".$sanksi->tglend."</td>
						</tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						<tr>
						  <td colspan='5' class='nstyle16'>Riwayat Cuti</td>
						</tr>
						<tr>
						  <td colspan='5'><hr /></td>
						</tr>
						<tr class='istyle18'>
						  <td width='26%' height='18'>Jenis Cuti</td>
						  <td width='12%'>Tanggal Mulai </td>
						  <td width='14%'>Tanggal Selesai </td>
						  <td width='10%'>Lama</td>
						  <td width='38%'>Tambah Hari</td>
						  </tr>";
			$getcuti=$dbLib->execute($this->getCuti($nik));
			while ($cuti = $getcuti->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$cuti->nama."</td>
						  <td>".$cuti->tglawl."</td>
						  <td>".$cuti->tglend."</td>
						  <td>".$cuti->lama_ini."</td>
						  <td>".$cuti->tambah_hari."</td>
						</tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						<tr>
						  <td colspan='9' class='nstyle16'>Riwayat Tugas Belajar</td>
						</tr>
						<tr>
						  <td colspan='9'><hr /></td>
						</tr>
						<tr class='istyle18'>
						  <td width='9%'>Tgl. Masuk </td>
						  <td width='10%'>Tgl. Lulus </td>
						  <td width='7%' height='18'>Jenjang</td>
						  <td width='12%'>Jurusan</td>
						  <td width='15%'>Institusi</td>
						  <td width='8%'>Semester</td>
						  <td width='6%'>IPS/IPK</td>
						  <td width='21%'>Ket. Biaya</td>
						  <td width='12%'>Biaya</td>
						</tr>";
			$getTB=$dbLib->execute($this->getTgsBljr($nik));
			while ($tgsBljr = $getTB->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
						  <td>".$tgsBljr->tglin."</td>
						  <td>".$tgsBljr->tgllus."</td>
						  <td>".$tgsBljr->jenjang."</td>
						  <td>".$tgsBljr->jurusan."</td>
						  <td>".$tgsBljr->institusi."</td>
						  <td>".$tgsBljr->semester."</td>
						  <td>".$tgsBljr->ipk."</td>
						  <td>".$tgsBljr->keterangan."</td>
						  <td align='right'>".number_format($tgsBljr->nilai,0,",",".")."</td>
						</tr>";
			}
			$html.="</table></td>
				</tr>
				<tr>
				  <td>&nbsp;</td>
				</tr>
				<tr>
				  <td><hr></td>
				</tr>
				<tr>
				  <td class='istyle15'>Dicetak pada tanggal : ".date("j-n-Y H:i:s")."</td>
				</tr>
			  </table>
			< / div ><br/> ";			
		}
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}	
}
?>
