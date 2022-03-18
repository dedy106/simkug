<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $param=$tmp[2];
    $tahun=$tmp[3];
    $no_rumah=$tmp[4];
    $blok=$tmp[5];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";					
    $path2 = $path . "image/yspt2.png";
    
    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){

        $back1="";
        switch($param){
            case "detKeu" :
                $judul = "Riwayat Transaksi";
            break;
            case "detRekap" :
                $judul = "Detail Rekap";
            break;
            case "detRekap2" :
                $judul = "Detail Rekap Bulanan";
            break;
            case "detBayar":
                $judul = "Detail Bayar Iuran";
            break;
        }
        
        if($param == "detBayar"){
            $backto="fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///$blok";
        }else{
            if($tmp[7] == "" OR $tmp[7]==0){
                $backto="fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci/$blok/$no_rumah/$tahun/".$tmp[6];
            }else{
                $prev=intval($tmp[7])-1;
                // if($next == 1) $next = 0;
                $backto="fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/".$tmp[6]."/$prev";
            }
        }


        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";
    }else{

        if($param == "detBayar"){
            $back1="<div class='panel-heading'>
            <a href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///$blok' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
            </div>";
        }else{

            if($tmp[4] == "" OR $tmp[4]==0){
                $back1="<div class='panel-heading'>
                <a href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci/$blok/$no_rumah/$tahun/".$tmp[3]."' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
            }else{
                $prev=intval($tmp[4])-1;
                // if($next == 1) $next = 0;
                $back1="<div class='panel-heading'>
                <a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/".$tmp[3]."/$prev' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
            }
        }

        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1 ";
                switch($param){
                    
                    
                    case "detKeu" :
                   
                echo"
                <div class='box box-widget'>
                    <div class='box-body'>
                        <h4> Riwayat Transaksi </h4>
                    </div>";

                    
                    // $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                    // $kode_akun= $sqlakun->fields[0];
                     $kode_akun = $tmp[6];
                    
                     $sql2="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                          from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
                          order by tgl_input desc ";

                     $rs=execute($sql2);
                     $torecord =  $rs->RecordCount();
                     if($tmp[7] == ""){
                        $page = 0;
                        $nextpage = 0;
                     }else{
                        $page = $tmp[7];
                        $nextpage = ($page * 20) + 1;
                     }
                     $jumpage = ceil($torecord/20);
                    
                     $sql = $sql2." 
                     OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
                     $rs2 = execute($sql);  
                    while ($row2 = $rs2->FetchNextObject($toupper=false)){
                        $jenis2 = strtoupper($row2->jenis);

                            if ($jenis2 == "BK"){
                                $color="color:#dd4b39";//merah
                                // $total=$row2->tagihan;
                                $gmbr=$path."image/red4.png";
                            }else{
                                // $color="color:#1cbbff";
                                $color="color:#01f400"; //hijau
                                // $total=$row2->bayar;
                                $gmbr=$path."image/green4.png";
                            }
                            echo"
                            <div class='box-footer box-comments' style='background:white'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                    <div class='comment-text'>
                                        <span class='username'>
                                            $row2->keterangan
                                            <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                            Tanggal $row2->tgl
                                    </div>
                                </div>
                            </div>";

                        }
                        if($jumpage > 1 AND $page < ($jumpage-1) ){
                            $page++;
                            echo "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/$kode_akun/$page';\">Next Page
                            </a>";
                        }
                echo"
                </div>                   
                ";
                    break;
                    case "detRekap" :
                   
                    $kode_drk = $tmp[4];
                    echo"
                    <div class='box box-widget'>
                        <div class='box-body'>
                            <h4> Riwayat Transaksi </h4>
                        </div>";
    
                        
                        // $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                        // $kode_akun= $sqlakun->fields[0];
                        
                         $sql2="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                              from gldt where kode_akun in ('11101','11201') and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk' and periode like '$tahun%'
                              order by tgl_input desc ";
    
                         $rs=execute($sql2);
                         $torecord =  $rs->RecordCount();
                         if($tmp[6] == ""){
                            $page = 0;
                            $nextpage = 0;
                         }else{
                            $page = $tmp[6];
                            $nextpage = ($page * 20) + 1;
                         }
                         $jumpage = ceil($torecord/20);
                        
                        //  $sql = $sql2." 
                        // OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
                        $sql = $sql2;
                         $rs2 = execute($sql);  
                        while ($row2 = $rs2->FetchNextObject($toupper=false)){
                            $jenis2 = strtoupper($row2->jenis);
    
                                if ($jenis2 == "BK"){
                                    $color="color:#dd4b39";//merah
                                    // $total=$row2->tagihan;
                                    $gmbr=$path."image/red4.png";
                                }else{
                                    // $color="color:#1cbbff";
                                    $color="color:#01f400"; //hijau
                                    // $total=$row2->bayar;
                                    $gmbr=$path."image/green4.png";
                                }
                                echo"
                                <div class='box-footer box-comments' style='background:white'>
                                    <div class='box-comment'>
                                        <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                        <div class='comment-text'>
                                            <span class='username'>
                                                $row2->keterangan
                                                <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                            </span><!-- /.username -->
                                                Tanggal $row2->tgl
                                        </div>
                                    </div>
                                </div>";
    
                        }
                            // if($jumpage > 1 AND $page < ($jumpage-1) ){
                            //     $page++;
                            //     echo "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$kode_drk/$page';\">Next Page
                            //     </a>";
                            // }
                    echo"
                    </div>                   
                    ";
                        break;
                        case "detRekap2" :
                   
                            $kode_drk = $tmp[4];
                            $bulan = $tmp[5];
                            echo"
                            <div class='box box-widget'>
                                <div class='box-body'>
                                    <h4> Riwayat Transaksi </h4>
                                </div>";
            
                                
                                $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                                $kode_akun= $sqlakun->fields[0];
                                
                                 $sql2="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                                      from gldt where kode_akun in ('11101','11201') and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk' and substring(periode,1,4) = '$tahun' and substring(periode,5,2) = '$bulan'
                                      order by tgl_input desc ";
            
                                 $rs=execute($sql2);
                                 $torecord =  $rs->RecordCount();
                                 if($tmp[6] == ""){
                                    $page = 0;
                                    $nextpage = 0;
                                 }else{
                                    $page = $tmp[6];
                                    $nextpage = ($page * 20) + 1;
                                 }
                                 $jumpage = ceil($torecord/20);
                                
                                //  $sql = $sql2." 
                                // OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
                                $sql = $sql2;
                                 $rs2 = execute($sql);  
                                while ($row2 = $rs2->FetchNextObject($toupper=false)){
                                    $jenis2 = strtoupper($row2->jenis);
            
                                        if ($jenis2 == "BK"){
                                            $color="color:#dd4b39";//merah
                                            // $total=$row2->tagihan;
                                            $gmbr=$path."image/red4.png";
                                        }else{
                                            // $color="color:#1cbbff";
                                            $color="color:#01f400"; //hijau
                                            // $total=$row2->bayar;
                                            $gmbr=$path."image/green4.png";
                                        }
                                        echo"
                                        <div class='box-footer box-comments' style='background:white'>
                                            <div class='box-comment'>
                                                <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                                <div class='comment-text'>
                                                    <span class='username'>
                                                        $row2->keterangan
                                                        <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                                    </span><!-- /.username -->
                                                        Tanggal $row2->tgl
                                                </div>
                                            </div>
                                        </div>";
            
                                }
                                    // if($jumpage > 1 AND $page < ($jumpage-1) ){
                                    //     $page++;
                                    //     echo "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$kode_drk/$page';\">Next Page
                                    //     </a>";
                                    // }
                            echo"
                            </div>                   
                            ";
                                break;
                                case "detBayar" :
                                    // $sqlpp= execute("select kode_pp from rt_blok where blok='$blok' ");
                                    // $pp= $sqlpp->fields[0];
                                    echo"
                                    <div class='box box-widget'>
                                        <form class='form-iuran' method='POST' >
                                            <div class='row'>
                                                <div class='col-xs-12'>
                                                    <div class='box-header'>
                                                        <div class='col-md-3' style='padding-left: 0px;'>
                                                        <b>No Rumah :&nbsp;&nbsp;&nbsp; $no_rumah </b>
                                                        </div>
                                                        <button id='btnSubmit' class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                                    </div>
                                                    <div class='box-body'>
                                                        <div class='row'>
                                                            <div class='form-group'>
                                                                <label for='inputNilai' class='col-sm-2 control-label'>Nilai Bayar</label>
                                                                <div class='col-sm-3'>
                                                                    <input type='text' name='bayar' class='form-control' id='inputNilai' readonly value='0'>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class='form-group'>
                                                            <label>Akun Kas</label>
                                                            <select class='form-control' id='kode_akun' name='kode_akun'>
                                                                <option value=''>--- Pilih Akun ---</option>
                                                            </select>
                                                        </div>
                                                        <div class='row'>
                                                            <div class='form-group'>
                                                                <div class='col-sm-3'>
                                                                    <input type='hidden' name='nilRT' class='form-control' id='inputNilRT' readonly value='0'>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class='row'>
                                                            <div class='form-group'>
                                                                <div class='col-sm-3'>
                                                                    <input type='hidden' name='nilRW' class='form-control' id='inputNilRW' readonly value='0'>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class='row'>
                                                            <div class='form-group'>
                                                                <div class='col-sm-3'>
                                                                    <input type='hidden' name='stsByr' class='form-control' readonly value='tunai'>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input type='hidden' name='kode_lokasi' class='form-control' readonly value='$kode_lokasi'>
                                                               
                                                        <input type='hidden' name='nik' class='form-control' readonly value='$nik'>
                                                               
                                                        <input type='hidden' name='kode_pp' class='form-control' readonly value='$kode_pp' >
                                                               
                                                        <input type='hidden' name='no_rumah' class='form-control' readonly value='$no_rumah' >
                                                                
                                                    </div>
                                                ";
                                               
                                                $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                                               
                                                echo"
                                                <table class='table no-margin'>
                                                <thead>
                                                <tr>
                                                    
                                                    <th width='25%' style='border-bottom: 1px solid white;'>Tahun</th>
                                                    <th width='25%' style='border-bottom: 1px solid white;'>Bulan</th>
                                                    <th width='50%' style='text-align:right;border-bottom: 1px solid white;' colspan='3'>Nilai</th>
                                                    <th style='text-align:right;border-bottom: 1px solid white;'>&nbsp;</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <style>
                                                .toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
                                                .toggle.ios .toggle-handle { border-radius: 20px; }
                                                </style>
                                                ";
                
                                                $sql="
                                                select a.periode,a.nilai_rt,a.nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
                                                from rt_bill_d a 
                                                left join (
                                                select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
                                                from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$no_rumah' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
                                                ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
                                                where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$no_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0
                                                order by a.periode
                                                ";
                                                
                
                                                // echo $sql;
                        
                                                $rs = execute($sql);  
                                                $x=0;
                                                $total=0;
                                                while ($row = $rs->FetchNextObject($toupper=false)){
                                                    if($x % 2 == 1){
                                                        $clr=$colors[1];
                                                    }else{
                                                        $clr=$colors[2];
                                                    }
                                                    echo"
                                                    <tr class='sai-grid-row'>
                                                        <td width='25%'>".substr($row->periode,0,4)." </td>
                                                        <td width='25%'>".ToBulan(substr($row->periode,4,2))." <input name='periode[]' value='$row->periode' type='hidden'></input></td>
                                                        <td width='15%' style='text-align:right;color:".$clr."'>
                                                        <input name='nilai_rt[]' class='input-nilrt' value='$row->nilai_rt' type='hidden'></input>
                                                        <td width='15%' style='text-align:right;color:".$clr."'>
                                                        <input name='nilai_rw[]' class='input-nilrw' value='$row->nilai_rw' type='hidden'></input>
                                                        </td>
                                                        <td width='18%' style='text-align:right;color:".$clr."'>Rp.".number_format($row->bill,0,",",".")."
                                                        <input name='nilai_tot[]' class='input-nilai' value='$row->bill' type='hidden'></input>
                                                        </td>
                                                        <td width='2%'><input type='checkbox' name='toggle2[]' class='inputToggle' data-on=' ' data-off=' ' data-toggle='toggle' data-size='mini' data-style='ios'>
                                                        <input type='hidden' name='toggle[]' class='input-tog'><div id='console-event$x'></div></td>
                                                    </tr>";
                                                    $x++;
                                                    $total+=$row->bill;
                                                }
                                                echo"
                                                </tbody>
                                                </table>
                                                 ";
                                                
                                                
                                            // }
                                        echo"
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                    ";              
                                    break;
                            
          
                }
           
        
        echo"   
            </div>
        </div>";
        echo "<script type='text/javascript'>
        $(document).ready(function(){
    
              function sepNum(x){
                  if (typeof x === 'undefined' || !x) { 
                      return 0;
                  }else{
                      if(x < 0){
                          var x = parseFloat(x).toFixed(0);
                      }
                      
                      var parts = x.toString().split(',');
                      parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                      return parts.join('.');
                  }
              }

              
              function getAkun(){
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getAkun',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi'},
                    success:function(result){    
                        var select = $('#kode_akun').selectize();
                        select = select[0];
                        var control = select.selectize;
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                for(i=0;i<result.daftar.length;i++){
                                    control.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun}]);   
                                }
                            }
                        }
                    }
                });
             }
             getAkun();
            
             
    
              function hitungSaldo(){
    
                  totSal = 0;
                  $('.sai-grid-row').each(function(){
                      var nilai=$(this).closest('tr').find('.input-nilai').val();
                      
                      totSal+=+nilai;
    
                  });
                  
                  $('#inputSaldo').val(sepNum(totSal));
                 
    
              }
    
              hitungSaldo();
            
              $('.inputToggle').change(function() {  
              
                  
                  $('#inputNilai').val(0);
                  
                  total = 0;
                  totRT = 0;
                  totRW = 0;
                  $('.sai-grid-row').each(function(){
                      var cek=$(this).closest('tr').find('.inputToggle').prop('checked');
                      var tog=$(this).closest('tr').find('.inputToggle').val();
                      var nilai=$(this).closest('tr').find('.input-nilai').val();
                      var rt=$(this).closest('tr').find('.input-nilrt').val();
                      var rw=$(this).closest('tr').find('.input-nilrw').val();
    
                      if(cek == true){
                          total+=+nilai;
                          totRT+=+rt;
                          totRW+=+rw;
                          $(this).closest('tr').find('.input-tog').val('on');
                      }else{
                          $(this).closest('tr').find('.input-tog').val('off');
                      }
                      
                  });
                  $('#inputNilai').val(sepNum(total));
                  $('#inputNilRT').val(sepNum(totRT));
                  $('#inputNilRW').val(sepNum(totRW));
                   
                  
                  
              }); 
              
              $('input').on('keyup keypress', function(e) {
                  var keyCode = e.keyCode || e.which;
                  if (keyCode === 13) { 
                    e.preventDefault();
                    return false;
                  }
              });  
    
              $('#btnSubmit').click(function(e){
                  e.preventDefault();
                  // alert('test');
                  myForm = $('.form-iuran').serialize();
    
                  // alert(myForm);
                 
                  $.ajax({
                      type: 'POST',
                      url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanIuranRw',
                      dataType: 'json',
                      data: myForm,
                      cache: false,
                      success:function(result){
                          alert('Input data '+result.message);
    
                          if(result.status){
                              location.reload();
                          }
                      }
                  });
    
              });
          })
       </script>";
    

?>
