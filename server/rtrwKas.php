<?php
	
		global $dirSeparator;
		global $serverDir;
		if (!defined('NEW_LINE'))
		   define("NEW_LINE", "<br>\r\n");
		
		define("WIN", "win");
		define("LINUX", "linux");
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		{
			$platform = WIN;
			$dirSeparator = "\\";
			$separator = ";";
		}
		else
		{
			$platform = LINUX;
			$dirSeparator = "/";
			$separator = ":";
		}
		error_reporting (E_ALL & ~E_NOTICE );
		
		$serverDir = __FILE__;
		
		global $rootDir;

		$pos = strrpos($serverDir, $dirSeparator);
		$serverDir = substr($serverDir, 0, $pos);
		$pos = strrpos($serverDir, $dirSeparator);
		$rootDir = substr($serverDir, 0, $pos);
		$pos = strrpos($rootDir, $dirSeparator);
		$path = $rootDir;
		$rootDir = substr($rootDir,$pos);

		if(function_exists($_GET['fx'])) {
			$_GET['fx']();
		}

		function getsel(){

			include_once("library.php");
			uses("server_DBConnection_dbLib");
			$done = false;	
			$dbLib = new server_DBConnection_dbLib("mssql");	

			$kode_lokasi=$_POST['kode_lokasi'];

		
			$result = array("message" => "", "rows" => 0, "status" => "" );

			if($_POST['jenis'] == 'keluar'){
				$jenis="PENGELUARAN";
			}else{
				$jenis="PENERIMAAN";
			}
			$sql="select a.kode_ref, a.nama 
			from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='".$_POST['nik']."' 
			where a.jenis='$jenis' and a.kode_lokasi='$kode_lokasi'";
			
			$rs = $dbLib->execute($sql);					
			
            while ($row = $rs->FetchNextObject(false)){
                $result['daftar'][] = (array)$row;
			}
			$result['status']=TRUE;
			$result['sql']=$sql;
			echo json_encode($result);

		}

		function joinNum($num){
			// menggabungkan angka yang di-separate(10.000,75) menjadi 10000.00
			$num = str_replace(".", "", $num);
			$num = str_replace(",", ".", $num);
			return $num;
		}

		function simpan(){
			include_once("library.php");
			uses("server_DBConnection_dbLib");
			$done = false;	
			$dbLib = new server_DBConnection_dbLib("mssql");

			if($_POST['kode_jenis'] == 'keluar'){
				$jenis="BK";
			}else{
				$jenis="BM";
			}
			
			
			$str_format="0000";
			$periode=date('Y').date('m');
			$per=date('y').date('m');
			$prefix=$_POST['kode_lokasi']."-".$jenis.$per.".";
			$query = $dbLib->execute("select right(isnull(max(no_bukti),'".$prefix."0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ", 1);
			$id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

			$sql="select a.nama,a.akun_debet,a.akun_kredit,a.kode_pp, b.kode_gar as gar_debet,c.kode_gar as gar_kredit 
			from trans_ref a 
			inner join masakun b on a.akun_debet=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
			inner join masakun c on a.akun_kredit=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
			where a.kode_ref='".$_POST['kode_ref']."' and a.kode_lokasi='".$_POST['kode_lokasi']."'";

			$rs=$dbLib->execute($sql);
			$row = $rs->FetchNextObject(false);
			$akunDebet=$row->akun_debet;
			$akunKredit=$row->akun_kredit;

			// $dbLib->BeginTrans();

			$sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','KB','KBDUAL','T','-','-','".$_POST['kode_pp']."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".$_POST['nilai'].",0,0,'".$_POST['nik']."','-','-','-','-','-','".$_POST['kode_ref']."','TUNAI','".$jenis."')";
	
			$sql2 = "insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunDebet."','D',".$_POST['nilai'].",".$_POST['nilai'].",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";	

			$sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKredit."','C',".$_POST['nilai'].",".$_POST['nilai'].",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";		

			$sql4 = "insert into gldt (no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' from trans_j 
			where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id." '";

			$rs1=$dbLib->execute($sql1);
			$rs2=$dbLib->execute($sql2);
			$rs3=$dbLib->execute($sql3);
			$rs4=$dbLib->execute($sql4);
	
			$tmp=array();
			$kode = array();

			if ($rs1 AND $rs2 AND $rs3 AND $rs4)
			{	
				// $dbLib->CommitTrans();
				$tmp="Sukses disimpan";
				$sts=true;
			}else{
				// $dbLib->RollbackTrans();
				$tmp="Gagal disimpan";
				$sts=false;
			}		
			$result["message"] =$tmp;
			$result["status"] = $sts;
			$result["sql1"]=$sql1;

			echo json_encode($result);
		}

		function simpanIuran(){
			include_once("library.php");
			uses("server_DBConnection_dbLib");
			$done = false;	
			$dbLib = new server_DBConnection_dbLib("mssql");

			$jenis="BM";
						
			$str_format="0000";
			$periode=date('Y').date('m');
			$per=date('y').date('m');
			$prefix=$_POST['kode_lokasi']."-".$jenis.$per.".";
			
			$query = $dbLib->execute("select right(isnull(max(no_bukti),'".$prefix."0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ", 1);

			$id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

			$sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt 
			from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
			where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$_POST['kode_lokasi']."'";

			$rs=$dbLib->execute($sql);
			$row = $rs->FetchNextObject(false);
			$akunKas=$row->akun_kas;
			$akunPdpt=$row->akun_pdpt;
			$akunKasRW=$row->akun_kastitip;
			$akunTitip=$row->akun_titip;

			$_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;

			// // $dbLib->BeginTrans();

			$sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
							('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','RTRW','KBIUR','T','0','0','".$_POST['kode_pp']."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','-','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
											
			$sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
							('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKasRW."','D',".joinNum($_POST['nilRW']).",".joinNum($_POST['nilRW']).",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";				
			$sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
								('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKas."','D',".joinNum($_POST['nilRT']).",".joinNum($_POST['nilRT']).",'".$_POST['keterangan']."','RTRW','KBRT','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";			

			$sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
								('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),1,'".$akunPdpt."','C',".joinNum($_POST['nilRT']).",".joinNum($_POST['nilRT']).",'".$_POST['keterangan']."','RTRW','PDPT','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";
			$sql5="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
								('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),2,'".$akunTitip."','C',".joinNum($_POST['nilRW']).",".joinNum($_POST['nilRW']).",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";

			$rs1=$dbLib->execute($sql1);
			$rs2=$dbLib->execute($sql2);
			$rs3=$dbLib->execute($sql3);
			$rs4=$dbLib->execute($sql4);
			$rs5=$dbLib->execute($sql5);

			$detail=FALSE;
											
			for($a=0; $a<count($_POST['periode']);$a++){
				if ($_POST['toggle'][$a] == "on"){
					$sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
								('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$_POST['kode_lokasi']."','".$_POST['kode_pp']."','D','KBIUR','KAS','-')";
					$rs6=$dbLib->execute($sql6[$a]);		
					
					if($rs6){
						$detail=TRUE;
					}
				}
			}
			
			
			$sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
			select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
			from trans_j 
			where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id."' ";

			$rs7=$dbLib->execute($sql7);	
			
			$tmp=array();
			$kode = array();

			if ($rs1 AND $rs2 AND $rs3 AND $rs4 AND $rs5 AND $detail AND $rs7)
			{	
				// $dbLib->CommitTrans();
				$tmp="Sukses disimpan";
				$sts=true;
			}else{
				// $dbLib->RollbackTrans();
				$tmp="Gagal disimpan";
				$sts=false;
			}		
			$result["message"] =$tmp;
			$result["status"] = $sts;
			$result["prefix"]=$prefix;
			$result["id"]=$id;
			$result["sql"]=$sql;
			$result["sql1"]=$sql1;
			$result["sql2"]=$sql2;
			$result["sql3"]=$sql3;
			$result["sql4"]=$sql4;
			$result["sql5"]=$sql5;
			$result["sql6"]=$sql6;

			echo json_encode($result);
		}
		
	
?>
