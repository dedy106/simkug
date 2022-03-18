<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_ShareObject");
uses("server_util_Map");
uses("server_util_arrayList");
uses("server_DBConnection_dbLib");
class server_app_hris_dataProvider  extends server_ShareObject
{
	var $dbLib;
	var $config;
	function __construct($config = null)
	{
		parent::__construct();					
		$this->config = $config;		
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("config", "string",$this->config);		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}	
	
	function alert($filter, $info = null){	
		sleep(3);
		$this->dbLib = new server_DBConnection_dbLib($this->config);
		
		$tmp=explode("/",$filter);
		$lokasi="01";
		$periode=$tmp[1];
		$nik=$tmp[2];
		$status=$tmp[3];
		$sql = new server_util_arrayList();
		$state = "NEXT";
		if ($status!="U")
		{
			switch($info){
				case "01" :
					$sql->add("select count(no_absen) as tot from gr_absen where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_absen as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
						from gr_absen where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2' order by tanggal desc ");
					$title = "Pengajuan Absen";
				break;
				case "02" :
					$sql->add("select count(no_lembur) as tot from gr_lembur where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_lembur as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
						from gr_lembur where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
					$title = "Pengajuan Lembur";
				break;
				case "03" :
					$sql->add("select count(no_spj) as tot from gr_spj_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_spj as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_spj_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
					$title = "Pengajuan Perjalanan Dinas";
				break;
				case "04" :
					$sql->add("select count(no_surat) as tot from gr_surat where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_surat as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_surat where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
					$title = "Pengajuan Surat Keterangan";
				break;
				case "05" :
					$sql->add("select count(no_cuti) as tot from gr_cuti where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_cuti as no_bukti,alasan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_cuti where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
					$title = "Pengajuan Cuti";
				break;
				case "06" :
					$sql->add("select count(no_kes) as tot from gr_kes_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_kes as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_kes_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
					$title = "Pengajuan Reimburse Kesehatan & Bantuan";
				break;
				case "07" :
					$sql->add("select count(no_klaim) as tot from gr_klaim_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_klaim as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_klaim_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
					$title = "Pengajuan Klaim Asuransi";
				break;
				case "08" :
					$sql->add("select count(no_pesan) as tot from off_pesan where penerima='$nik' and kode_lokasi='$lokasi' and flag_read='0'");
					$sql->add("select pengirim as no_bukti,judul as keterangan from off_pesan where penerima='$nik' and kode_lokasi='$lokasi' and flag_read='0' ");
					$title = "Pesan baru";
				break;
				case "09" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_absen as no_bukti,a.keterangan
						from gr_absen a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_cuti as no_bukti,a.alasan as keterangan
						from gr_cuti a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_lembur as no_bukti,a.keterangan
						from gr_lembur a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_spj as no_bukti,a.keterangan
						from gr_spj_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_surat as no_bukti,a.keterangan
						from gr_surat a
						where a.kode_lokasi='$lokasi' and a.progress='0'  
						union all
						select a.no_ijin as no_bukti,a.keterangan
						from gr_ijin_m a
						where a.kode_lokasi='$lokasi' and a.progress='0'  
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VER' and b.nik='$nik'  " );
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_absen as no_bukti,a.keterangan,a.tanggal
						from gr_absen a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_cuti as no_bukti,a.alasan as keterangan,a.tanggal
						from gr_cuti a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_lembur as no_bukti,a.keterangan,a.tanggal
						from gr_lembur a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_spj as no_bukti,a.keterangan,a.tanggal
						from gr_spj_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_surat as no_bukti,a.keterangan,a.tanggal
						from gr_surat a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						union all
						select a.no_ijin as no_bukti,a.keterangan,a.tanggal
						from gr_ijin_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VER' and b.nik='$nik' order by a.tanggal desc ");
					$title = "Verifikasi Administrasi Personalia / Self Service";
				break;
				case "10" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_absen as no_bukti,a.keterangan
						from gr_absen a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_cuti as no_bukti,a.alasan as keterangan
						from gr_cuti a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_lembur as no_bukti,a.keterangan
						from gr_lembur a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_spj as no_bukti,a.keterangan
						from gr_spj_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_surat as no_bukti,a.keterangan
						from gr_surat a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_ijin as no_bukti,a.keterangan
						from gr_ijin_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APP' and b.nik='$nik'  ");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_absen as no_bukti,a.keterangan,a.tanggal
						from gr_absen a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_cuti as no_bukti,a.alasan as keterangan,a.tanggal
						from gr_cuti a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_lembur as no_bukti,a.keterangan,a.tanggal
						from gr_lembur a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_spj as no_bukti,a.keterangan,a.tanggal
						from gr_spj_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_surat as no_bukti,a.keterangan,a.tanggal
						from gr_surat a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						union all
						select a.no_ijin as no_bukti,a.keterangan,a.tanggal
						from gr_ijin_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APP' and b.nik='$nik' order by a.tanggal desc");
					$title = "Approval Administrasi Personalia / Self Service";
					
				break;
				case "11" :
					$sql->add("select count(no_ijin) as tot from gr_ijin_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
					$sql->add("select no_ijin as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_ijin_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
					$title = "Pengajuan Ijin";
				break;
				case "12" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_kes as no_bukti,a.keterangan
						from gr_kes_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VERREIMB' and b.nik='$nik'");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_kes as no_bukti,a.keterangan,a.tanggal
						from gr_kes_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VERREIMB' and b.nik='$nik' order by a.tanggal desc ");
					$title = "Verifikasi Reimburse";
				break;
				case "13" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_klaim as no_bukti,a.keterangan
						from gr_klaim_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VERKLAIM' and b.nik='$nik'");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_klaim as no_bukti,a.keterangan,a.tanggal
						from gr_klaim_m a
						where a.kode_lokasi='$lokasi' and a.progress='0' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='VERKLAIM' and b.nik='$nik' order by a.tanggal desc");
					$title = "Verifikasi Klaim";
				break;
				case "14" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_kes as no_bukti,a.keterangan
						from gr_kes_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APPREIMB' and b.nik='$nik'");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_kes as no_bukti,a.keterangan,a.tanggal
						from gr_kes_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APPREIMB' and b.nik='$nik' order by a.tanggal desc");
					$title = "Approval Reimburse";
				break;
				case "15" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.no_klaim as no_bukti,a.keterangan
						from gr_klaim_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APPKLAIM' and b.nik='$nik'");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.no_klaim as no_bukti,a.keterangan,a.tanggal
						from gr_klaim_m a
						where a.kode_lokasi='$lokasi' and a.progress='1' 
						 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='APPKLAIM' and b.nik='$nik' order by a.tanggal desc");
					$title = "Approval Klaim";
				break;
				case "16" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.nik as no_bukti
	from gr_sk a 
	inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
	inner join gr_sk_d h on a.no_sk=h.no_sk and a.kode_lokasi=h.kode_lokasi 
	inner join gr_status_sk c on h.sts_sk=c.sts_sk and h.kode_lokasi=c.kode_lokasi 
	 where  b.sts_sdm in ('4','9','6') and h.sts_sk='SK5' and (datediff (day,getdate(),a.tgl_akhir_sk) between 0 and 30) 
	 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='REKRUT' and b.nik='$nik' ");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.nik as no_bukti,b.nama+' SK '+a.no_sk+ ' Kurang '+cast(datediff (day,getdate(),a.tgl_akhir_sk) as varchar(10))+' Hari'  as keterangan 
	from gr_sk a 
	inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
	inner join gr_sk_d h on a.no_sk=h.no_sk and a.kode_lokasi=h.kode_lokasi 
	inner join gr_status_sk c on h.sts_sk=c.sts_sk and h.kode_lokasi=c.kode_lokasi 
	 where b.sts_sdm in ('4','9','6') and h.sts_sk='SK5' and (datediff (day,getdate(),a.tgl_akhir_sk) between 0 and 30)  
	)a 
					cross join gr_otorisasi b 
					where b.sts_oto='REKRUT' and b.nik='$nik' ");
					$title = "Berakhir Masa Kontrak";
					
				break;
				case "17" :
					$sql->add("select count(a.no_bukti) as tot
					from (select a.nik as no_bukti
	from gr_sk a 
	inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
	inner join gr_sk_d h on a.no_sk=h.no_sk and a.kode_lokasi=h.kode_lokasi 
	inner join gr_status_sk c on h.sts_sk=c.sts_sk and h.kode_lokasi=c.kode_lokasi 
	 where  b.sts_sdm in ('1','4','9','6') and h.sts_sk in ('SK5','SK1') and (datediff (day,a.tgl_masuk,getdate()) between 0 and 30) 
	 )a 
					cross join gr_otorisasi b 
					where b.sts_oto='REKRUT' and b.nik='$nik' ");
					$sql->add("select a.no_bukti,a.keterangan
					from (select a.nik as no_bukti,b.nama+' SK '+a.no_sk+ ' Berjalan '+cast(datediff (day,a.tgl_masuk,getdate()) as varchar(10))+' Hari'  as keterangan 
	from gr_sk a 
	inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
	inner join gr_sk_d h on a.no_sk=h.no_sk and a.kode_lokasi=h.kode_lokasi 
	inner join gr_status_sk c on h.sts_sk=c.sts_sk and h.kode_lokasi=c.kode_lokasi 
	 where  b.sts_sdm in ('1','4','9','6') and h.sts_sk in ('SK5','SK1') and (datediff (day,a.tgl_masuk,getdate()) between 0 and 30)  
	)a 
					cross join gr_otorisasi b 
					where b.sts_oto='REKRUT' and b.nik='$nik' ");

					$title = "Karyawan Baru";
					$state = "DONE";
				break;
			}
		}
		else
		{
			switch($info){
			case "01" :
				$sql->add("select count(no_absen) as tot from gr_absen where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_absen as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_absen where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2' order by tanggal desc ");
				$title = "Pengajuan Absen";
			break;
			case "02" :
				$sql->add("select count(no_lembur) as tot from gr_lembur where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_lembur as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
					from gr_lembur where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
				$title = "Pengajuan Lembur";
			break;
			case "03" :
				$sql->add("select count(no_spj) as tot from gr_spj_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_spj as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_spj_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
				$title = "Pengajuan Perjalanan Dinas";
			break;
			case "04" :
				$sql->add("select count(no_surat) as tot from gr_surat where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_surat as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_surat where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
				$title = "Pengajuan Surat Keterangan";
			break;
			case "05" :
				$sql->add("select count(no_cuti) as tot from gr_cuti where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_cuti as no_bukti,alasan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_cuti where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
				$title = "Pengajuan Cuti";
			break;
			case "06" :
				$sql->add("select count(no_kes) as tot from gr_kes_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_kes as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_kes_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
				$title = "Pengajuan Reimburse Kesehatan & Bantuan";
			break;
			case "07" :
				$sql->add("select count(no_klaim) as tot from gr_klaim_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_klaim as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_klaim_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc");
				$title = "Pengajuan Klaim Asuransi";
			break;
			case "08" :
				$sql->add("select count(no_pesan) as tot from off_pesan where penerima='$nik' and kode_lokasi='$lokasi' and flag_read='0'");
				$sql->add("select pengirim as no_bukti,judul as keterangan from off_pesan where penerima='$nik' and kode_lokasi='$lokasi' and flag_read='0' ");
				$title = "Pesan baru";
			break;
			
			case "11" :
				$sql->add("select count(no_ijin) as tot from gr_ijin_m where nik_buat='$nik' and kode_lokasi='$lokasi' and progress<>'2'");
				$sql->add("select no_ijin as no_bukti,keterangan+' - Proses '+case progress when '0' then 'Verifikasi' when '1' then 'Approval'  end as keterangan
				from gr_ijin_m where nik_buat='$nik' and kode_lokasi='$lokasi'  and progress<>'2' order by tanggal desc ");
				$title = "Pengajuan Ijin";
				$state = "DONE";
			break;
			
			}
		}
		$result = new server_util_Map();
		$result->set("info", $info);
		$result->set("title", $title);
		$result->set("state", $state);
		$result->set("data",  $this->dbLib->getMultiDataProvider($sql));
		return $result;
	}	
}
?>
