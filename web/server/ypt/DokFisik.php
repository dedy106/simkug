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
          
            // $cek1 = "SELECT cast (substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as int) as jam_now";	
            // $rscek = execute($cek1);
            // $rowcek = $rscek->FetchNextObject($toupper=false);
            date_default_timezone_set('Asia/Jakarta');
            $jam_now = date("Y-m-d H:i:s");
            $formLock = 0;

            

            $ceka= "select substring(flag,1,2) as jamawal,substring(flag,4,2) as minawal,  substring(keterangan,1,2) as jamakhir,substring(keterangan,4,2) as minakhir, substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as jamnow, substring(CONVERT(VARCHAR(8),GETDATE(),108) ,4,2) as minnow 
            from spro where kode_spro in ('OPEN_JAM') and kode_lokasi = '".$_SESSION['lokasi']."' ";	
            $rsceka = execute($ceka);
            $rowceka = $rsceka->FetchNextObject($toupper=false);		
            if(isset($rowceka->jamawal)){										
                $openAwal = date("Y-m-d ".$rowceka->jamawal.":".$rowceka->minawal.":00");								
                $openAkhir = date("Y-m-d ".$rowceka->jamakhir.":".$rowceka->minakhir.":00");							
            }

            if(isset($jam_now)){
              if ($jam_now < $openAwal || $jam_now > $openAkhir){
                  $formLock = 1;					
              }
            }
    
            $cek2 = "SELECT FORMAT(getdate(), 'dddd') AS hari";	
            $rscek2 = execute($cek2);
            $rowcek2 = $rscek2->FetchNextObject($toupper=false);
            if(isset($rowcek2->hari)){
              if ($rowcek2->hari == "Sunday" || $rowcek2->hari == "Saturday") {
                  $formLock = 1;	
              }
            }

            if($formLock == 0){

                
                $kode_lokasi= $data["kode_lokasi"];
                $periode = date('Y').date('m');

                $kode_pp = explode("-",$data['kode_pp']);
                $strSQL = "select count(*) as jml 
                from it_aju_m a 					 
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 					 					 
                inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app 					 					 
                left join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 							
                where a.kode_pp='".$kode_pp[0]."' and a.progress='3' and e.no_aju is null and a.periode<='".$periode."' and a.kode_lokasi='".$kode_lokasi."' ";

                $ck = execute($strSQL);
                $cek = $ck->FetchNextObject($toupper=false);	
                if(isset($cek->jml)){
                  if (intval($cek->jml) > 5) {
                      $response["message"] = "Form tidak bisa digunakan. Ditemukan lebih Dari 5 Agenda Online YG Dokumen Fisiknya Belum Diserahkan Ke Perbendaharaan,Silahkan cek Menu dilaporan Rekap Penyerahan Dokumen Fisik Online";	
                      $response["status"]=false; 
                  }	else{
                      $no_bukti = qstr(generateKode("it_ajuapp_m", "no_app", $kode_lokasi."-APP".substr($periode,2,2).".", "00001"));
          
                      $exec= array();
          
                      $sql= "insert into it_ajuapp_m(no_app,no_aju,kode_lokasi,periode,tgl_input,user_input,tgl_aju,nik_terima,jenis) values (".$no_bukti.",'".$data['no_aju']."','".$kode_lokasi."','".$periode."',getdate(),'".$data['user_input']."',getdate(),'".$data['nik_terima']."','OFFLINE')";
                      array_push($exec,$sql);
          
                      $sql2= "update it_aju_m set progress='0', tanggal=getdate(), no_app=".$no_bukti." where no_aju='".$data['no_aju']."' and kode_lokasi='".$kode_lokasi."'";
                      array_push($exec,$sql2);
                      
                      
                      $rs=executeArray($exec);
                      if($rs) {
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
                    $sql="select a.no_aju,a.kode_lokasi,convert(varchar(20),a.tanggal,105) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
                    a.kode_drk,e.nama as nama_drk,a.no_app,convert(varchar(20),a.tanggal,108) as tgl2,
                    f.user_input,f.nik_terima,g.nama as nama_terima
                    from it_aju_m a
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                    left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                    inner join it_ajuapp_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
                    left join karyawan g on f.nik_terima=g.nik and a.kode_lokasi=g.kode_lokasi
                    where a.no_aju='".$data['no_aju']."' and a.kode_lokasi='$kode_lokasi' order by a.no_aju";
                    $rs2 = execute($sql);
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
                        <td width='200'>No Bukti</td>
                        <td width='600'>: $row->no_app </td>
                      </tr>
                      <tr>
                        <td width='200'>No Agenda</td>
                        <td width='600'>: $row->no_aju </td>
                      </tr>
                      <tr>
                        <td>Tanggal</td>
                        <td>: $row->tgl  $row->tgl2  </td>
                      </tr>
                      <tr>
                        <td>PP</td>
                        <td>: $row->kode_pp - $row->nama_pp </td>
                      </tr>
                      <tr>
                        <td>MTA</td>
                        <td>: $row->kode_akun - $row->nama_akun </td>
                      </tr>
                      <tr>
                        <td>DRK</td>
                        <td>: $row->kode_drk - $row->nama_drk </td>
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
                  }								
                }else{
                  $response["message"] = "Form tidak bisa digunakan. Internal Server Error";	
                  $response["status"]=false; 
                }
            }else{
              $response["message"] = " gagal diproses. Form tidak bisa digunakan. Akses Form ini Berbatas Waktu. ";
              $response["status"]=false; 
            }
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
			$sql2="select kode_spro,flag from spro where kode_spro = 'ITNIKVER' and kode_lokasi = '$kode_lokasi'";
			$res = dbResultArray($sql2);			
			if (count($res) > 0){
				$nik_terima = $res[0]["flag"];							
            }else{
                $nik_terima = "";
            }
            $sql3="select nik,nama from hakakses where nik = '$nik' and kode_lokasi = '$kode_lokasi'";
            $res3 = dbResultArray($sql3);
            if (count($res3) > 0){
				$user_input = $res3[0]["nama"];							
            }else{
                $user_input = "";
            }
            $response["user_input"] = $user_input;
            $response['nik_terima'] = $nik_terima;            

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

            $sql=" select a.no_aju,a.nilai,a.kode_pp,a.keterangan,a.tanggal,a.kode_pp+' - '+b.nama as pp,a.kode_akun+' - '+c.nama as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk 
            from it_aju_m a 
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi 
            where a.no_aju = '$no_aju' and a.kode_lokasi='$kode_lokasi' and a.progress='A' ";
            $res = dbResultArray($sql);

            if(count($res)>0){
                $response['daftar'] = $res;
                $response['message'] = "Dokumen sudah diproses";
            }else{
                $response['daftar'] = array();
                $response['message'] = "No Agenda tidak ditemukan";
            }
                 
            $response['sql']=$sql;
        } else{
            $response["message"] = "Unauthorized Access, Login Required. User:".$data['nik']." Session:".$_SESSION['userLog'];
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>