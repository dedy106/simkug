<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function view(){
               
        $sql="select * from sis_siswa where kode_pp='YSPTE05' and kode_kelas='XII-7TKJ' ";
        
        $rs=execute($sql);
        $html="";
        while($row=$rs->FetchNextObject($toupper = false)){
            $html.= $row->nis;
        }

        echo $html;
        
    }

    function ubahPassword(){
		session_start();

        $post = $_POST;
		$result["auth_status"] = 1;
		$error_input = array();
       
        $nik = $post['nik'];
		$pass = $post['password_lama'];
		
		$kode_lokasi = $post['kode_lokasi'];
        $kode_pp = $post['kode_pp'];
		
		$sql="select nik, pass from sis_hakakses where nik='$nik' and kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and pass='$pass'";
        $cek = execute($sql);

		if($cek->RecordCount() > 0){
			$up_data = $post["password_baru"];
			$konfir_data = $post["password_repeat"];
			if ($up_data == $konfir_data){

				$sql2= "update sis_hakakses set pass='$up_data' where nik='$nik' and kode_lokasi = '$kode_lokasi' and kode_pp='$kode_pp' and pass='$pass' ";
				$rs = execute($sql2);

				if($rs){
					$result['status'] = 1;
					$result['alert'] = 'Data berhasil disimpan';
					$result['edit'] = TRUE;
					$result['sql']=$sql;
				}else{
					$result['status'] = 2;
					$result['alert'] = "Data gagal disimpan ke database";
					$result['sql']=$sql;
				}
			}else{
				$result['status'] = 3;
				$result['alert'] = "error input";
				$result['error_input'][0] = "Password baru dan konfirmasi password tidak sama ! ";
				$result['sql']=$sql;
			}			
		}else{
			$result['status'] = 3;
			$result['alert'] = "error input";
			$result['error_input'][0] = "Password lama salah ! Harap input password yang benar. ";
			$result['sql']=$sql;
		}
		echo json_encode($result);
    }


	function ubahFoto(){

		$ekstensi_diperbolehkan	= array('png','jpg','jpeg');
		$nama = $_FILES['file']['name'];
		$x = explode('.', $nama);
		$ekstensi = strtolower(end($x));
		$ukuran	= $_FILES['file']['size'];
		$file_tmp = $_FILES['file']['tmp_name'];	
		$acak           = rand(1,99);
		$nama_file_unik = $acak.$nama;
		
		$path = "http://".$_SERVER["SERVER_NAME"]."/";
		$path_foto=$path."server/media/";

		if(in_array($ekstensi, $ekstensi_diperbolehkan) === true)
		{
			if($ukuran < 1044070)
			{			
				move_uploaded_file($file_tmp, $path_foto.$nama_file_unik);
				$query = "update sis_hakakses set
						foto = '$nama_file_unik'
						where nik='$nik' and kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";

				$rs=execute($query);
				
				if($rs){								
					$_SESSION['pesan'] = 'Foto berhasil di simpan';
					header('location:fMain.php?hal=app/ypt/dashProfile.php');
					$result['status'] = 1;
					$result['alert'] = 'Data berhasil disimpan';
					$result['edit'] = TRUE;
					$img = $path_foto.$nama_file_unik;
					$_SESSION['foto']= $img;
					$result['new_img'] = $img;
				}
				else
				{								
					$result['status'] = 2;
					$result['alert'] = "Data gagal disimpan ke database";
					$img = $path_foto.$nama_file_unik;
					unlink($img);
				}
			}
			else
			{		
				$result['alert'] = 'Ukuran file terlalu besar';
				
			}
		}
		else
		{		
				$result['alert'] = 'Ekstensi file tidak di perbolehkan '.$ekstensi;
				
		}

		echo json_encode($result);

	}

	function getEditTelp(){

          
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select hp_ayah,hp_ibu from sis_siswa where kode_lokasi='".$_POST['kode_lokasi']."' and nis='".$_POST['nik']."' and kode_pp='".$_POST['kode_pp']."' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
	}
	
	function getSiswa(){

		$nik = $_POST['nis'];
		$kode_pp = $_POST['kode_pp'];
		$sql = "SELECT a.nis,a.nama from sis_siswa a 
		where a.kode_lokasi = '12' and a.kode_pp = '$kode_pp' and a.nis='$nik' ";
        $rs = execute($sql);

        if($rs->RecordCount() > 0){
            $result['status'] = 1;
        }else{
            $result['status'] = 3;
        }
        
        echo json_encode($result);
	}

	function ubahNoTelp(){
		session_start();

        $post = $_POST;
		$result["auth_status"] = 1;
		$error_input = array();
       
        $nik = $post['nik'];
		$kode_lokasi = $post['kode_lokasi'];
        $kode_pp = $post['kode_pp'];
		
		$sql2= "update sis_siswa set hp_ayah='".$post['hp_ayah']."',hp_ibu='".$post['hp_ibu']."' where nis='$nik' and kode_lokasi = '$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = execute($sql2);
		
		if($rs){
			$result['status'] = 1;
			$result['alert'] = 'Data berhasil disimpan';
			$result['edit'] = TRUE;
			$result['sql']=$sql;
		}else{
			$result['status'] = 2;
			$result['alert'] = "Data gagal disimpan ke database";
			$result['sql']=$sql;
		}
					
		echo json_encode($result);
    }


    // function ubahFoto(){
    //     $post = $_POST;
	// 			// file upload validation
	// 			$upload_dir = '/assets/uploads/';
	// 			$upload_config = array(
	// 				'upload_path' => ".$upload_dir",
	// 				'allowed_types' => 'jpg|jpeg|png',
	// 				'max_size' => 2048,
	// 				// 'min_width' => 200,
	// 				// 'min_height' => 200,
	// 				// 'max_width' => 800,
	// 				// 'max_height' => 800,
	// 				'encrypt_name' => TRUE
	// 			);

	// 			// initialize config
	// 			$this->upload->initialize($upload_config);

	// 			if ($this->upload->do_upload('foto')){
	// 				$this->db->BeginTrans();

	// 				$nik = $this->db->qstr($post['username']);
	// 				$kode_lokasi = $this->db->qstr($post['kode_lokasi']);
	// 				$kode_pp = $this->db->qstr($post['kode_pp']);

	// 				$record["foto"] = $upload_dir.$this->upload->data('file_name');
	// 				$sql = $this->db->AutoExecute('sis_hakakses', $record, 'UPDATE', "nik = $nik AND kode_lokasi = $kode_lokasi AND kode_pp = $kode_pp");

	// 				if($sql){
	// 					$this->db->CommitTrans();
	// 					$result['status'] = 1;
	// 					$result['alert'] = 'Data berhasil disimpan';
	// 					$result['edit'] = TRUE;
	// 					$img = base_url('/assets/uploads/'.$this->upload->data('file_name'));
	// 					$this->session->set_userdata('foto', $img);
	// 					$result['new_img'] = $img;
	// 				}else{
	// 					$this->db->RollbackTrans();
	// 					$result['status'] = 2;
	// 					$result['alert'] = "Data gagal disimpan ke database";
	// 					unlink($this->upload->data('full_path'));
	// 				}
	// 			}else{
	// 				$err_upload = $this->upload->display_errors();
	// 				$result['status'] = 3;
	// 				$result['error_input'] = $this->form_validation->error_array();
	// 				$result['error_input'][count($result['error_input'])] = $err_upload;
	// 				$result['alert'] = 'Harap periksa inputan anda';
	// 			}
	// 		}else{
	// 			$result['alert'] = 'Akses tidak diketahui';
	// 			$result["auth_status"] = 0;
	// 		}
    //     }else{
	// 		$result['alert'] = 'Tidak ada data yang dikirimkan ke server';
	// 		$result["auth_status"] = 0;
    //     }

    //     echo json_encode($result);
    // }

?>
