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
    $no_rumah=$tmp[4];
    $blok=$tmp[5];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";					
    $path2 = $path . "image/yspt2.png";
    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){

        $back1="";
        switch($param){
            case "detSetor":
                $judul = "Detail Setoran";
            break;
            case "detBayar" :
                $judul = "Detail Pembayaran";
            break;
            case "detWarga" :
                $judul = "Detail Warga";
            break;
            case "detRekap" :
                $judul = "Detail Rekap";
            break;
        }
        

        // if($tmp[6] == "" OR $tmp[6]==0){
            $backto="fMainMobile.php?hal=app/rtrw/dashRtRwSatDet.php&param=$jenis/$kunci/$blok/$no_rumah";
        // }else{
        //     $prev=intval($tmp[6])-1;
        //     // if($next == 1) $next = 0;
        //     $backto="fMainMobile.php?hal=app/rtrw/dashRtRwSatDet2.php&param=$jenis/$kunci/$blok/$no_rumah/$param/$tahun/$prev";
        // }

        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";
    }else{

        // if($tmp[3] == "" OR $tmp[3]==0){
            $back1="<div class='panel-heading'>
            <a href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet.php&param=$jenis/$kunci/$blok/$no_rumah' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
            </div>";
        // }else{
        //     $prev=intval($tmp[3])-1;
        //     // if($next == 1) $next = 0;
        //     $back1="<div class='panel-heading'>
        //     <a href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet2.php&param=$jenis/$kunci/$blok/$no_rumah/$param/$tahun/$prev' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
        //     </div>";
        // }

        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    
    echo "<div class='panel' style='$padding'>
            <div class='panel-body'>
            $back1";
                switch($param){
                    case "detWarga" :
                    echo"
                    <div class='box box-widget'>";    
                    
                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                    
                    echo"
                    <table class='table no-margin'>
                    <thead>
                    <tr>
                    
                    <th width='5%' style='border-bottom: 1px solid white;'>No</th>
                    <th width='75%' style='border-bottom: 1px solid white;'>Nama</th>
                    <th width='20%' style='border-bottom: 1px solid white;'>No Telp</th>
                    </tr>
                    </thead>
                    <tbody>";                                    
                    
                        $sql=" select * from rt_warga_d where no_rumah='$no_rumah' and kode_blok='$blok' ";
                        
                        $rs = execute($sql);  
                        $x=0;
                        $i=1;
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            
                            if($x % 2 == 1){
                                $clr=$colors[1];
                            }else{
                                $clr=$colors[2];
                            }
                            
                            echo"
                            <tr>
                            <td width='5%'>$i</td>
                            <td width='75%'>".$row->nama."</td>
                            <td width='20%'>".$row->no_hp."</td>
                            </tr>";
                            $i++;
                            $x++;
                        }
                        echo"
                        </tbody>
                        </table>
                        ";
                    echo"
                    </div>
                    ";              
                    break;
                    case "detBayar" :
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
                    case "detRekap":
                    if($tmp[6] == "" or $tmp[6] == "all"){
                        $filter = "";
                    }else{
                        $filter = " and no_setor='".$tmp[6]."' ";
                    }

                    $sql="
                    select kode_rumah,periode_bill,sum(nilai_rt)+sum(nilai_rw) as total
                    from rt_angs_d
                    where kode_lokasi ='$kode_lokasi' and kode_pp='$kode_pp' and kode_jenis='IWAJIB' $filter
                    group by kode_rumah,periode_bill order by kode_rumah,periode_bill ";

                    // echo $sql;
                    $total1 = 0;
                    $rs = execute($sql);  
                    echo"
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                        <div class='col-xs-4' style='padding-left:0px'>No Rumah</div>
                        <div class='col-xs-4' style='padding-left:0px'>Periode Bill</div>
                        <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                    </div>";
                    while ($row = $rs->FetchNextObject($toupper=false)){
                        $total1+=+$row->total;
                        echo"
                        <div class='row' style='margin-left:0px;margin-right:0px;font-size:12px'>
                            <div class='col-xs-4' style='padding-left:0px;'>$row->kode_rumah</div>
                            <div class='col-xs-4' style='padding-left:0px;'>$row->periode_bill</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px;' >".number_format($row->total,0,",",".")."</div>
                        </div>";
                    }
                    echo"
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px;font-size:12px'>
                        <div class='col-xs-8' style='padding-left:0px'>TOTAL</div>
                        <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1,0,",",".")."</div>
                    </div>";
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
                  url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanIuran',
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
