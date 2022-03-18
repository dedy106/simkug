<?php
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST' :
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function generateKode($tabel, $kolom_acuan, $prefix, $str_format){
        $query = execute("select right(max($kolom_acuan), ".strlen($str_format).")+1 as id from $tabel where $kolom_acuan like '$prefix%'");
        $kode = $query->fields[0];
        $id = $prefix.str_pad($kode, strlen($str_format), $str_format, STR_PAD_LEFT);
        return $id;
    }

    function cekAuth($user){
        getKoneksi();
        $user = qstr($user);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user ", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function simpanDokFisik() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){   
            $kode_lokasi= $data["kode_lokasi"];
            $periode = date('Y').date('m');
            $no_bukti = generateKode("pbh_ver_m", "no_ver", $kode_lokasi."-FIS".substr($periode,2,4).".", "0001");

            $exec= array();

            $sql = "insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat,ref1) values
            ('".$no_bukti."','".$kode_lokasi."','".$data['tanggal']."','".$periode."',getdate(),'".$data['nik_user']."','S','".$data['modul']."','VERFISIK','".$data['no_aju']."','".$data['catatan']."','-','".$data['nik_terima']."','X','".$data['nik_serah']."')";
            array_push($exec,$sql);
            
            $sql2 = "update pbh_pb_m set progress='S', no_fisik='".$no_bukti."' where no_pb='".$data['no_aju']."' and kode_lokasi='".$kode_lokasi."'";
            array_push($exec,$sql2);
            
            
            $rs=executeArray($exec,$err);
            if($err == null) {
                $response=array(
                    'status' => true,
                    'message' =>'sukses diproses',
                    'query' => $exec,
                    'no_aju'=>$data['no_aju'],
                    'periode'=>$periode
                );
            }
            else {
                $response=array(
                    'status' => false,
                    'message' =>'gagal diproses'.$rs,
                    'query' => $exec,
                    'no_aju'=>$data['no_aju'],
                    'periode'=>$periode
                );
                
            }

            $tahun = substr($periode,0,4);
			      $sql="select a.no_pb,a.kode_lokasi,convert(varchar(20),a.tanggal,105) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.no_ver,
            f.catatan,f.nik_bdh,g.nama as nama_terima,a.modul,f.nik_user,f.ref1 as user_input
            from pbh_pb_m a
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join pbh_ver_m f on a.no_fisik=f.no_ver and a.kode_lokasi=f.kode_lokasi
            left join karyawan g on f.nik_bdh=g.nik and a.kode_lokasi=g.kode_lokasi
            where a.no_pb='".$data['no_aju']."' and a.kode_lokasi='$kode_lokasi' order by a.no_pb";
            $rs2 = execute($sql);
            $response['sql']=$sql;
            $row = $rs2->FetchNextObject($toupper=false);

            $html = "<div align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
            <tr align='center'>
              <td colspan='2' ><b>TANDA TERIMA DOKUMEN</b></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td width='200'>No Verifikasi</td>
              <td width='600'>: $row->no_ver </td>
            </tr>
            <tr>
              <td width='200'>No Bukti</td>
              <td width='600'>: $row->no_pb </td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>: $row->tgl </td>
            </tr>
            <tr>
              <td>PP</td>
              <td>: $row->kode_pp - $row->nama_pp </td>
            </tr>
            <tr>
              <td>Modul</td>
              <td>: $row->modul</td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>: $row->keterangan </td>
            </tr>
            <tr>
              <td>Nilai</td>
              <td>: ".number_format($row->nilai,0,",",".")."</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
           
            <tr>
              <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
            </tr>
           
            <tr>
              <td>Dibuat Oleh : </td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                  <td width='400'>Yang Menerima </td>
                  <td width='400'>Yang Menyerahkan </td>
                </tr>
                <tr>
                  <td height='60'>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>$row->nama_terima</td>
                  <td>$row->user_input</td>
                </tr>
              </table></td>
            </tr>
          </table><br>
          </div>";
          $response['html']=$html;
            
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getNIKTerima() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data['kode_lokasi'];
            $kode_pp = $data['kode_pp'];
            $nik=$data['nik'];
			$sql="select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='$kode_lokasi' ";
            $response['daftar'] = dbResultArray($sql);
			// $sql2="select kode_spro,flag from spro where kode_spro = 'ITNIKVER' and kode_lokasi = '$kode_lokasi'";
			// $res = dbResultArray($sql2);			
			// if (count($res) > 0){
			// 	$nik_terima = $res[0]["flag"];							
            // }else{
            //     $nik_terima = "";
            // }
            // $sql3="select nik,nama from hakakses where nik = '$nik' and kode_lokasi = '$kode_lokasi'";
            // $res3 = dbResultArray($sql3);
            // if (count($res3) > 0){
			// 	$user_input = $res3[0]["nama"];							
            // }else{
            //     $user_input = "";
            // }
            // $response["user_input"] = $user_input;
            // $response['nik_terima'] = $nik_terima;            

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDok() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data['kode_lokasi'];
            $no_aju=$data['no_aju'];

            $sql = "select a.no_pb,a.nilai,a.modul,a.keterangan,convert(varchar,a.tanggal,103) as tgl 
                    from pbh_pb_m a 
                    where a.no_pb = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."' and a.progress='0' ";
            $res = dbResultArray($sql);

            if(count($res)>0){
                $response['daftar'] = $res;
                $response['message'] = "Dokumen sudah diproses";
                $sql2 = "select bank,nama,no_rek,nama_rek,bruto,pajak,'".$res[0]['keterangan']."' as keterangan 
                from pbh_rek 
                where no_bukti ='".$no_aju."' and kode_lokasi='".$kode_lokasi."'";
                $response['daftar2'] = dbResultArray($sql2);
    
                if ($res[0]['modul'] == "PBBAU") {			  
                    $sql3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk 
                            from pbh_pb_j a
                                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
                                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun 
                            where a.no_pb = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."'";		
                }
        
                if ($res[0]['modul'] == "IFREIM" || $res[0]['modul'] == "IFCLOSE") {			  
                   $sql3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk 
                            from hutang_j a 
                                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
                                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun 
                                where a.jenis = 'BEBAN' and a.no_hutang = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."'";		
                }
        
                if ($res[0]['modul'] == "PJAJU") {			  
                   $sql3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk
                            from panjar_j a
                                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
                                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun 
                            where a.jenis = 'BEBAN' and a.no_pj = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."'";		
                }
        
                if ($res[0]['modul'] == "PJPTG") {			  
                   $sql3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk
                                from ptg_j a 
                                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
                                      inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun 	
                                where a.jenis = 'BEBAN' and a.no_ptg = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."'";		
                }
                $response['daftar3'] = dbResultArray($sql3);
            }else{
                $response['daftar'] = array();
                $response['message'] = "No Bukti tidak ditemukan";
            }

                 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>