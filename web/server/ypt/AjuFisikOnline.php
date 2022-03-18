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

    function simpanAjuFisikOnline() {
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

            $response['jam_now'] = $jam_now;
            $response['openAwal'] = $openAwal;
            $response['openAkhir'] = $openAkhir;
            $response['rowceka'] = $rowceka;
            $response['lokasi'] = $_SESSION['lokasi'];
    
            $cek2 = "SELECT FORMAT(getdate(), 'dddd') AS hari";	
            $rscek2 = execute($cek2);
            $rowcek2 = $rscek2->FetchNextObject($toupper=false);
            if(isset($rowcek2->hari)){
              if ($rowcek2->hari == "Sunday" || $rowcek2->hari == "Saturday") {
                  $formLock = 1;	
              }
            }

            
            $response['formLock'] = $formLock;
            if($formLock == 0){
              
                $kode_lokasi= $data["kode_lokasi"];
                $nik = $data["nik"];
                $periode = date('Y').date('m');
                $no_bukti = qstr(generateKode("it_aju_fisik", "no_bukti", $kode_lokasi."-FOL".substr($periode,2,2).".", "00001"));
    
                $exec= array();
    
                $sql= "insert into it_aju_fisik(no_bukti,no_aju,kode_lokasi,tgl_input,nik_user) values (".$no_bukti.",'".$data['no_aju']."','".$kode_lokasi."',getdate(),'$nik')";
                array_push($exec,$sql);
                
                
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
                a.kode_drk,e.nama as nama_drk,f.no_bukti as no_app,convert(varchar(20),a.tanggal,108) as tgl2
                from it_aju_m a
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                inner join it_aju_fisik f on a.no_aju=f.no_aju and a.kode_lokasi=f.kode_lokasi
                left join karyawan g on f.nik_user=g.nik and a.kode_lokasi=g.kode_lokasi
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
                        <td width='400'></td>
                      </tr>
                      <tr>
                        <td height='60'>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td>$row->nama_terima</td>
                        <td></td>
                      </tr>
                    </table></td>
                  </tr>
                </table><br>
                </div>";
                $response['html']=$html;
            }else{
              $response["message"] = " gagal diproses. Form tidak bisa digunakan. Akses Form ini Berbatas Waktu. ".$jam_now." | ".$openAwal." | ".$openAkhir;
              $response["status"]=false; 
            }
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
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

            $sql="select a.no_aju,a.form,a.nilai,a.kode_pp,a.keterangan,a.tanggal,a.kode_pp+' - '+b.nama as pp,a.kode_akun+' - '+c.nama as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk 
			from it_aju_m a 
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi 
                left join it_ajuapp_m e on a.no_app=e.no_app and a.kode_lokasi=e.kode_lokasi
			where a.no_aju = '".$no_aju."' and a.kode_lokasi='".$kode_lokasi."' and a.progress='3' and e.jenis='ONLINE' ";
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
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>