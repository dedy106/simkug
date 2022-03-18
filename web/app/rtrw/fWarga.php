<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $sts_user=$_SESSION['userStatus'];

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $blok=$tmp[2];
    $kode_rumah=$tmp[3];
    $tahun=substr($periode,0,4);

// if($sts_user=="U"){
    $sqlU="select * from rt_rumah where kode_rumah='$kode_rumah' ";
    $rsU=execute($sqlU);
    $rowU=$rsU->FetchNextObject($toupper=false);
    $kode_blok=$rowU->blok;
    $kode_rt=$rowU->rt;
    $kode_pp=$kode_rt;
    // }

    $judul="Kas Masuk/Keluar";

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        if ($sts_user == "A") { 
            $backto="fMainMobile.php?hal=app/rtrw/dashRtRw.php";
        }else{
            $backto="fMainMobile.php?hal=app/rtrw/dashRtRwU.php";
        }
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        if ($sts_user == "A") { 
            $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRw.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
         } else {
            $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwU.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
         } 

        
        $padding="";
        $mobile=false;
    }
?>
<div class='panel' style='<?= $padding; ?>'>
    <div class='panel-body'>
        <?=$back1?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' style='border-top: none;'>
            <div class='box-header' style='border-top: none;'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Info Warga</h3> 
              <button class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                <i class='fa fa-plus-circle'></i> Tambah
              </button>
              <div class='pull-right' style='margin-right:5px;'>
                
              </div>
            </div>
            <div class='box-body sai-container-overflow-x'>
              <table class='table table-bordered table-striped DataTable' id='table-konten'>
                <thead>
                  <tr>
                    <td>No Bukti</td>
                    <td>Tanggal Masuk</td>
                    <td>Status Masuk</td>
                    <td>Kode Blok</td>
                    <td>No Rumah</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <?php 
                    if($_SESSION['userStatus'] == "A"){
                        $sql="SELECT distinct no_bukti,tgl_masuk,sts_masuk,kode_blok,no_rumah FROM rt_warga_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
                    }else{
                        $sql="SELECT distinct no_bukti,tgl_masuk,sts_masuk,kode_blok,no_rumah FROM rt_warga_d where kode_lokasi='$kode_lokasi' and no_rumah='$kode_rumah' ";
                    }
                    // echo $sql;
                    $rs1=execute($sql);
                    while($row1 = $rs1->FetchNextObject($toupper=false)){
                    echo"
                    <tr>
                      <td>$row1->no_bukti</td>
                      <td>$row1->tgl_masuk</td>
                      <td>$row1->sts_masuk</td>
                      <td>$row1->kode_blok</td>
                      <td>$row1->no_rumah</td>
                      <td>
                      <a href='#' title='Edit' class='sai-btn-circle web_datatable_edit '><i class='fa fa-pencil'></i></a> &nbsp;
                      <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a> &nbsp;</td>
                    </tr>
                    ";
                      }
                  ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FORM INSERT -->
    <form id='rt-form-warga' hidden>
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box' style='border-top: none;'> 
                    <div class='box-header' style='border-top: none;'>
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Input Data Warga</h3>
                        <button type='submit' class='btn btn-success pull-right'><i class='fa fa-floppy-o'></i> Save</button>
                        <a class='btn btn-default pull-right web_form_back' style='margin-right: 5px;' ><i class='fa fa-ban'></i> Cancel</a>
                    </div>
                </div>
                <div class='box box-warning'>
                    <div class='box-body pad'>
                        <div class='row' hidden>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Bukti</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <input type='text' name='no_bukti' class='form-control' id='warga-nobukti' >
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Nama RT</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='kode_rt' class='form-control' id='warga-kode-rt' required  >
                                        <option value=''>--- Pilih RT ---</option>
                                        <?php 

                                            $sql="select a.kode_pp,a.nama from pp a inner join rt_rumah b on a.kode_pp=b.rt where b.kode_rumah='$kode_rumah'
                                            ";
                                            $resRT = execute($sql);
                                         
                                            while ($row = $resRT->FetchNextObject(false)){
                                                echo " <option value=".$row->kode_pp.">".$row->kode_pp."-".$row->nama."</option>";
                                            }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Nama Blok</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='kode_blok' class='form-control' id='warga-kode-blok' required >
                                    <option value=''>--- Pilih Blok ---</option>
                                    <?php 
                                        if($sts_user == "A"){
                                            $sql="select a.blok from rt_blok a where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'
                                        ";
                                        }else{
                                            $sql="select a.blok from rt_rumah a where a.rt='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.kode_rumah='$kode_rumah'
                                        ";
                                        }                                        
                                        $resBlok = execute($sql);

                                        while ($row = $resBlok->FetchNextObject(false)){
                                            echo " <option value=".$row->blok.">".$row->blok."</option>";
                                        }
                                    ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>No Rumah</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='no_rumah' class='form-control' id='warga-no-rumah' required >
                                    <option value=''>--- Pilih No Rumah ---</option>
                                    <?php 
                                        if($sts_user == "A"){
                                            $sql="select a.kode_rumah from rt_rumah a where a.rt='$kode_pp' and a.kode_lokasi='$kode_lokasi'
                                            
                                        ";
                                        }else{
                                            $sql="select a.kode_rumah from rt_rumah a where a.rt='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.kode_rumah='$kode_rumah'
                                            ";
                                        }     
                                       
                                        $resR = execute($sql);

                                        while ($row = $resR->FetchNextObject(false)){
                                            echo " <option value=".$row->kode_rumah.">".$row->kode_rumah."</option>";
                                        }
                                    ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Tgl Masuk</label>
                                <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                    <div class='input-group-addon'>
                                    <i class='fa fa-calendar'></i>
                                    </div>
                                    <input name='tgl_masuk' class='form-control datepicker' id='warga-tgl-masuk'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Status Masuk</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <input type='text' name='sts_masuk' class='form-control' value='Pindah' maxlength='10' id='warga-sts-masuk'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <a href='#' class='btn btn-primary sai-btn pull-left' id='sai-grid-add-warga' data-edit='0' style='margin-left: 15px;'><i class='fa fa-plus'> Tambah Warga </i></a>
                            </div>                                                
                        </div>
                        <hr style='margin-bottom:10px;'>
                        <div class='row'>
                            <div class='col-md-12 sai-container-overflow'>
                                <table class='table table-striped table-bordered' id='sai-grid-table-warga'>
                                    <tr>
                                        <th>No Urut</th>
                                        <th>NIK</th>
                                        <th>Nama</th>
                                        <th>Alias</th>
                                        <th>Jenis Kelamin</th>
                                        <th>Tempat Lahir</th>
                                        <th>Tanggal Lahir</th>
                                        <th>Agama</th>
                                        <th>Golongan Darah</th>
                                        <th>Pendidikan</th>
                                        <th>Pekerjaan</th>
                                        <th>Status Pernikahan</th>
                                        <th>KB</th>
                                        <th>Status Hubungan</th>
                                        <th>Status WNI</th>
                                        <th>No HP</th>
                                        <th>No Tlp Emergency</th>
                                        <th>Ket Emergency</th>
                                        <th>Detail</th>
                                    </tr>
                                </table>
                            </div>
                        </div>              
                        <div id='validation-box'></div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- Form Modal -->
    <div class='modal' id='sai-grid-table-modal-warga' tabindex='-1' role='dialog'>
        <div class='modal-dialog' role='document'>
            <div class='modal-content'>
                <form id='sai-grid-table-form-warga'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Input Data Warga</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='row' >
                            <div class='form-group'>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='id_edit' class='form-control' id='modal-warga-id' maxlength='10'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>NIK</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='nik' class='form-control ' maxlength='100' id='modal-warga-nik'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Nama Lengkap</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='nama' class='form-control ' maxlength='100' id='modal-warga-nama'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Alias</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='alias' class='form-control ' maxlength='100' id='modal-warga-alias'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Jenis Kelamin</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='kode_jk' class='form-control selectize' id='modal-warga-kode_jk' required >
                                    <option value=''>--- Pilih Jenis Kelamin ---</option>
                                    <option value='L'>L-Laki-laki</option><option value='P'>P-Perempuan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Tempat Lahir</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='tempat_lahir' class='form-control ' maxlength='100' id='modal-warga-tempat_lahir'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Tanggal Lahir</label>
                                <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                    <div class='input-group-addon'>
                                    <i class='fa fa-calendar'></i>
                                    </div>
                                    <input name='tgl_lahir' class='form-control datepicker' id='modal-warga-tgl_lahir'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Agama</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='kode_agama' class='form-control selectize' id='modal-warga-kode_agama' required >
                                    <option value=''>--- Pilih Agama ---</option>
                                    <option value='Islam'>Islam</option>
                                    <option value='Katolik'>Katolik</option>
                                    <option value='Protestan'>Protestan</option>
                                    <option value='Hindu'>Hindu</option>
                                    <option value='Budha'>Budha</option>
                                    <option value='Lainnya'>Lainnya</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Golongan Darah</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='kode_goldar' class='form-control selectize' id='modal-warga-kode_goldar' required >
                                <option value=''>--- Pilih Golongan Darah ---</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                                <option value='AB'>AB</option>
                                <option value='O'>O</option>
                                <option value='-'>-</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Pendidikan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='kode_didik' class='form-control selectize' id='modal-warga-kode_didik' required >
                                    <option value=''>--- Pilih Pendidikan ---</option>
                                    <option value='SD'>SD</option>
                                    <option value='SMP'>SMP</option>
                                    <option value='SMA'>SMA</option>
                                    <option value='D1'>D1</option>
                                    <option value='D2'>D2</option>
                                    <option value='D3'>D3</option>
                                    <option value='D4'>D4</option>
                                    <option value='S1'>S1</option>
                                    <option value='S2'>S2</option>
                                    <option value='S3'>S3</option>
                                    <option value='Non'>Non</option>
                                    <option value='-'>-</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Pekerjaan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='kode_kerja' class='form-control selectize' id='modal-warga-kode_kerja' required >
                                <option value=''>--- Pilih Pekerjaan ---</option>
                                <option value='IRT'>IRT</option>
                                <option value='PNS'>PNS</option>
                                <option value='SWASTA'>SWASTA</option>
                                <option value='PELAJAR'>PELAJAR</option>
                                <option value='PENSIUN'>PENSIUN</option>
                                <option value='MAHASISWA'>MAHASISWA</option>
                                <option value='TNI'>TNI</option>
                                <option value='POLRI'>POLRI</option>
                                <option value='TENAGA MEDIS'>D4</option>
                                <option value='S1'>S1</option>
                                <option value='S2'>S2</option>
                                <option value='S3'>S3</option>
                                <option value='Non'>Non</option>
                                <option value='-'>-</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Status Pernikahan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='sts_nikah' class='form-control selectize' id='modal-warga-sts_nikah' required >
                                <option value=''>--- Pilih Status Pernikahan ---</option>
                                <option value='KAWIN'>KAWIN</option>
                                <option value='BELUM'>BELUM</option>
                                <option value='DUDA'>DUDA</option>
                                <option value='JANDA'>JANDA</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>KB</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='kb' class='form-control selectize' id='modal-warga-kb' required >
                                <option value=''>--- Pilih Jenis KB ---</option>
                                <option value='-'>-</option>
                                <option value='Implant KB'>Implant KB</option>
                                <option value='Pil KB'>Pil KB</option>
                                <option value='Suntik KB'>Suntik KB</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Status Hubungan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='sts_keluarga' class='form-control selectize' id='modal-warga-sts_hub' required >
                                <option value=''>--- Pilih Status Hubungan ---</option>
                                <option value='Anak'>Anak</option>
                                <option value='Istri'>Istri</option>
                                <option value='Kepala Keluarga'>Kepala Keluarga</option>
                                <option value='ART'>ART</option>
                                <option value='Teman'>Teman</option>
                                <option value='Saudara'>Saudara</option>
                                <option value='Orangtua'>Orangtua</option>
                                </select>
                                </div>
                            </div>
                        </div> 
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Status WNI</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select name='sts_wni' class='form-control selectize' id='modal-warga-sts_wni' required >
                                <option value=''>--- Pilih Status WNI ---</option>
                                <option value='WNI'>WNI</option>
                                <option value='WNA'>WNA</option>
                                </select>
                                </div>
                            </div>
                        </div> 
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No HP</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='no_hp' class='form-control ' maxlength='100' id='modal-warga-no_hp'>
                                </div>
                            </div>
                        </div>    
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Emergency</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='no_emergency' class='form-control ' maxlength='100' id='modal-warga-no_emergency'>
                                </div>
                            </div>
                        </div>  
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Status Keluarga</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='ket_emergency' class='form-control ' maxlength='100' id='modal-warga-ket_emergency'>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div class='modal-footer'>
                        <button type='submit' class='btn btn-primary'>Simpan</button> 
                        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                    </div>
            </form>
        </div>
    </div>
</div>
</div>
</div>
<script>
  var table2 = $('#table-konten').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
            });
  table2.columns.adjust().draw();

  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
      var sts='<?php echo $sts_user; ?>';
      var kode_rt='<?php echo $kode_rt; ?>';
      var kode_blok='<?php echo $kode_blok; ?>';
      var no_rumah='<?php echo $kode_rumah; ?>';

    $('#web_datatable').hide();
    $('#warga-nobukti').val('');

    if(sts=="A"){
        $('#warga-kode-rt')[0].selectize.setValue('');
        $('#warga-kode-blok')[0].selectize.setValue('');
        $('#warga-no-rumah')[0].selectize.setValue('');
    }else{
        $('#warga-kode-rt')[0].selectize.setValue(kode_rt);
        $('#warga-kode-blok')[0].selectize.setValue(kode_blok);
        $('#warga-no-rumah')[0].selectize.setValue(no_rumah);
        $('#warga-kode-rt').prop('readonly', true);
        $('#warga-kode-blok').prop('readonly', true);
        $('#warga-no-rumah').prop('readonly', true);
    }   
    $('#warga-tgl-masuk').val('');
    $('#warga-sts-masuk').val('Pindah');
    $('table#sai-grid-table-warga tr.sai-grid-input-row').remove();
    $('#rt-form-warga').show();
    // alert("hello");
  });

  $('#saiweb_container').on('click', '.web_form_back', function(){
     var id = $(this).closest('form').attr('id');
     $('#'+id).hide();
     $('#web_datatable').show();
  });

  $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                    // getset value
     var kode = $(this).closest('tr').find('td:eq(0)').text();
     var lokasi = '<?php echo $kode_lokasi; ?>';
     var paths='<?php echo $path."/web/upload/"; ?>';

     $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getEditWarga',
        dataType: 'json',
        data: {'lokasi':lokasi, 'kode':kode},
        success:function(res){
            // alert('id ='+res.daftar[0].id);

            if(res.status){        

                $('#warga-nobukti').val(res.daftar[0].no_bukti);
                $('#warga-kode-rt')[0].selectize.setValue(res.daftar[0].rt);
                $('#warga-kode-blok')[0].selectize.setValue("B10");
                $('#warga-no-rumah')[0].selectize.setValue(res.daftar[0].no_rumah);
                $('#warga-tgl-masuk').val(res.daftar[0].tgl_masuk);
                $('#warga-sts-masuk').val(res.daftar[0].sts_masuk);
                
                $('#web_datatable').hide();
                $('#rt-form-warga').show();
                $('table#sai-grid-table-warga tr.sai-grid-input-row').remove();

                var row = "";
                var no=1;
                for(var i=0;i<res.daftar2.length;i++){
                    var line=res.daftar2[i];
                    row += "<tr class='sai-grid-input-row'>"+
                        "<td>"+
                            no+
                            "<input type='hidden' name='no_urut[]' value='"+no+"' readonly class='form-control set-no_urut'>"+
                        "</td>"+
                        "<td>"+
                            line.nik+
                            "<input type='hidden' name='nik[]' value='"+line.nik+"' required readonly class='form-control set-nik'>"+
                        "</td>"+
                        "<td>"+
                            line.nama+
                            "<input type='hidden' name='nama[]' value='"+line.nama+"' readonly class='form-control set-nama'>"+
                        "</td>"+
                        "<td>"+
                            line.alias+
                            "<input type='hidden' name='alias[]' value='"+line.alias+"' required readonly class='form-control set-alias'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_jk+
                            "<input type='hidden' name='kode_jk[]' value='"+line.kode_jk+"' required readonly class='form-control set-kode_jk'>"+
                        "</td>"+
                        "<td>"+
                            line.tempat_lahir+
                            "<input type='hidden' name='tempat_lahir[]' value='"+line.tempat_lahir+"' readonly class='form-control set-tempat_lahir'>"+
                        "</td>"+
                        "<td>"+
                            line.tgl_lahir+
                            "<input type='hidden' name='tgl_lahir[]' value='"+line.tgl_lahir+"' required readonly class='form-control set-tgl_lahir'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_agama+
                            "<input type='hidden' name='kode_agama[]' value='"+line.kode_agama+"' readonly class='form-control set-kode_agama'>"+
                        "</td>"+ "<td>"+
                            line.kode_goldar+
                            "<input type='hidden' name='kode_goldar[]' value='"+line.kode_goldar+"' required readonly class='form-control set-kode_goldar'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_didik+
                            "<input type='hidden' name='kode_didik[]' value='"+line.kode_didik+"' readonly class='form-control set-kode_didik'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_kerja+
                            "<input type='hidden' name='kode_kerja[]' value='"+line.kode_kerja+"' readonly class='form-control set-kode_kerja'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_sts_nikah+
                            "<input type='hidden' name='kode_sts_nikah[]' value='"+line.kode_sts_nikah+"' readonly class='form-control set-kode_sts_nikah'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_kb+
                            "<input type='hidden' name='kb[]' value='"+line.kode_kb+"' required readonly class='form-control set-kb'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_sts_hub+
                        "<input type='hidden' name='kode_sts_hub[]' value='"+line.kode_sts_hub+"' readonly class='form-control set-kode_sts_hub'>"+
                        "</td>"+
                        "<td>"+
                            line.kode_sts_wni+
                            "<input type='hidden' name='kode_sts_wni[]' value='"+line.kode_sts_wni+"' required readonly class='form-control set-kode_sts_wni'>"+
                        "</td>"+
                        "<td>"+
                            line.no_hp+
                            "<input type='hidden' name='no_hp[]' value='"+line.no_hp+"' readonly class='form-control set-no_hp'>"+
                        "</td>"+ 
                        "<td>"+
                            line.no_telp_emergency+
                            "<input type='hidden' name='no_emergency[]' value='"+line.no_telp_emergency+"' readonly class='form-control set-no_emergency'>"+
                        "</td>"+ 
                        "<td>"+
                            line.ket_emergency+
                            "<input type='hidden' name='ket_emergency[]' value='"+line.ket_emergency+"' readonly class='form-control set-ket_emergency'>"+
                        "</td>"+ 
                        "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-warga' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-warga'><i class='fa fa-times'></i></a></td>"+
                    "</tr>";
                    no++;
                }
                $('#sai-grid-table-warga').append(row);
                    
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:');
        }
    });
     
  });

  $('#saiweb_container').on('submit', '#rt-form-warga', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    for(var pair of formData.entries()) {
         console.log(pair[0]+ ', '+ pair[1]); 
        }

    var nik='<?php echo $nik; ?>' ;
    var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
    var kode_pp='<?php echo $kode_pp; ?>' ;

    formData.append('nik_user', nik);
    formData.append('kode_lokasi', kode_lokasi);
    formData.append('kode_pp', kode_pp);
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanWarga',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                location.reload();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:'+textStatus);
        }
    });
  });
  
   $('#saiweb_container').on('click', '.web_datatable_del', function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(0)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=hapusWarga',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        location.reload();
                    }
                }
            });
        }else{
            return false;
        }
                    
   });

   $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
   });
   
   $('.datepicker-dmy').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy'
   });
   
   $('.datepicker-yyyy').datepicker({
        autoclose: true,
        viewMode: 'years', 
        minViewMode: 'years',
        format: 'yyyy'
    });
    
    $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
        e.preventDefault();
            return false;
        });
            
    $('.daterangepicker').daterangepicker();
    $('.textarea-ini').wysihtml5();

    $('#web_input_jenis').change(function(e){
       e.preventDefault();
       var jenis= $('#web_input_jenis').val();

       if(jenis == "RW"){
          $('#form_input_rw').show();
          $('#form_input_rt').hide();
          $('#form_input_no_rumah').hide();
       }
       else if(jenis == "RT"){
          $('#form_input_rw').hide();
          $('#form_input_rt').show();
          $('#form_input_no_rumah').hide();
       }else if(jenis == "No Rumah"){
          $('#form_input_rw').hide();
          $('#form_input_rt').hide();
          $('#form_input_no_rumah').show();
       }
    });
    
   

    var select_rumah = $('#warga-no-rumah').selectize();

    var select_blok = $('#warga-kode-blok').selectize({

        onChange: function(value) { 
            var idw=$('#warga-nobukti').val();
            var sts_user='<?php echo $sts_user; ?>';
            if (idw == "" && sts_user == "A"){
                if(select_blok[0].selectize.getValue()!='undefined'){
                    select_rumah[0].selectize.clearOptions();
                } 
                
                var kode_lokasi='<?php echo $kode_lokasi; ?>';
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getRumah',
                    dataType: 'json',
                    data: {'kode_lokasi':kode_lokasi, 'blok':value},
                    success:function(result){    
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                for(i=0;i<result.daftar.length;i++){
                                    select_rumah[0].selectize.addOption([{text:result.daftar[i].kode_rumah, value:result.daftar[i].kode_rumah}]);  
                                }
                            }
                        }
                    }
                });
            }
            
        }
    });  

    var select_rt = $('#warga-kode-rt').selectize({

        onChange: function(value) { 
            var idw=$('#warga-nobukti').val();
            var sts_user='<?php echo $sts_user; ?>';
            if (idw == "" && sts_user == "A"){

                if(select_rt[0].selectize.getValue()!='undefined'){
                    select_blok[0].selectize.clearOptions();
                } 

                var kode_lokasi='<?php echo $kode_lokasi; ?>';
                
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getBlok',
                    dataType: 'json',
                    data: {'kode_lokasi':kode_lokasi, 'rt':value},
                    success:function(result){    
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                for(i=0;i<result.daftar.length;i++){
                                    select_blok[0].selectize.addOption([{text:result.daftar[i].blok, value:result.daftar[i].blok}]);  
                                }
                            }
                        }
                    }
                });
            }
            
        }
    });  


    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });

    $('.datepicker-dmy').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy'
    });

    $('.datepicker-yyyy').datepicker({
        autoclose: true,
        viewMode: 'years', 
        minViewMode: 'years',
        format: 'yyyy'
    });

    $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
        e.preventDefault();
        return false;
    });

    $('.daterangepicker').daterangepicker();


    // $('#ajax-content-section').on('submit', '#rt-form-warga', function(e){
    //     e.preventDefault();
    //     var myForm =$('#rt-form-warga').serialize();
    //     $.ajax({
    //         type: 'POST',
    //         url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanWarga',
    //         dataType: 'json',
    //         data: myForm,
    //         cache: false,
    //         success:function(result){
    //             alert('Input data '+result.message);
                
    //             if(result.status){
    //                 location.reload();
    //             }
    //         }
    //     });
    // });
    
     //-----Data Warga------
                
    $('#ajax-content-section').on('click', '#sai-grid-add-warga', function(){
        if($(this).data('edit')=='1'){
            $('.sai-grid-input-row').removeClass('set-selected');
            $(this).closest('tr').addClass('set-selected');
            
            var nama= $(this).closest('tr').find('.set-nama').val();
            var nik= $(this).closest('tr').find('.set-nik').val();
            var alias= $(this).closest('tr').find('.set-alias').val();
            var tempat_lahir= $(this).closest('tr').find('.set-tempat_lahir').val();
            var tgl_lahir= $(this).closest('tr').find('.set-tgl_lahir').val();
            var kode_jk= $(this).closest('tr').find('.set-kode_jk').val();
            var kode_agama= $(this).closest('tr').find('.set-kode_agama').val();
            var kode_goldar= $(this).closest('tr').find('.set-kode_goldar').val();
            var kode_didik= $(this).closest('tr').find('.set-kode_didik').val();
            var kode_kerja= $(this).closest('tr').find('.set-kode_kerja').val();
            var kode_sts_nikah= $(this).closest('tr').find('.set-kode_sts_nikah').val();
            var kb= $(this).closest('tr').find('.set-kb').val();
            var kode_sts_hub= $(this).closest('tr').find('.set-kode_sts_hub').val();
            var kode_sts_wni= $(this).closest('tr').find('.set-kode_sts_wni').val();
            var no_emergency= $(this).closest('tr').find('.set-no_emergency').val();
            var no_hp= $(this).closest('tr').find('.set-no_hp').val();
            var ket_emergency= $(this).closest('tr').find('.set-ket_emergency').val();
            
            $('#modal-warga-id').val('1');
            $('#modal-warga-nama').val(nama);
            $('#modal-warga-alias').val(alias);
            $('#modal-warga-nik').val(nik);
            $('#modal-warga-tempat_lahir').val(tempat_lahir);
            $('#modal-warga-tgl_lahir').val(tgl_lahir);
            $('#modal-warga-no_hp').val(no_hp);
            $('#modal-warga-kode_jk')[0].selectize.setValue(kode_jk);
            $('#modal-warga-kode_agama')[0].selectize.setValue(kode_agama);
            $('#modal-warga-kode_goldar')[0].selectize.setValue(kode_goldar);
            $('#modal-warga-kb')[0].selectize.setValue(kb);
            $('#modal-warga-kode_didik')[0].selectize.setValue(kode_didik);
            $('#modal-warga-kode_kerja')[0].selectize.setValue(kode_kerja);
            $('#modal-warga-sts_nikah')[0].selectize.setValue(kode_sts_nikah);
            $('#modal-warga-sts_wni')[0].selectize.setValue(kode_sts_wni);
            $('#modal-warga-sts_hub')[0].selectize.setValue(kode_sts_hub);
            $('#modal-warga-no_emergency').val(no_emergency);
            $('#modal-warga-ket_emergency').val(ket_emergency);
            
            $('#sai-grid-table-modal-warga').modal('show');
        }else{
            $('#modal-warga-id').val('0');
            $('#sai-grid-table-modal-warga').modal('show');
        }
    });
    
    $('#ajax-content-section').on('click', '.sai-grid-del-warga', function(){
        $(this).closest('tr').remove();
        $('html, body').anisate({ scrollTop: $(document).height() }, 1000);
    });
    
    $('#sai-grid-table-form-warga').submit(function(e){
        e.preventDefault();
        
        var nama = $('#modal-warga-nama').val();
        var nik = $('#modal-warga-nik').val();
        var alias = $('#modal-warga-alias').val();
        var kode_jk = $('#modal-warga-kode_jk')[0].selectize.getValue();
        var tempat_lahir = $('#modal-warga-tempat_lahir').val();
        var tgl_lahir = $('#modal-warga-tgl_lahir').val();
        var kode_agama = $('#modal-warga-kode_agama')[0].selectize.getValue();
        var kode_goldar = $('#modal-warga-kode_goldar')[0].selectize.getValue();
        var kb = $('#modal-warga-kb')[0].selectize.getValue();
        var kode_didik = $('#modal-warga-kode_didik')[0].selectize.getValue();
        var kode_kerja = $('#modal-warga-kode_kerja')[0].selectize.getValue();
        var kode_sts_nikah = $('#modal-warga-sts_nikah')[0].selectize.getValue();
        var kode_sts_hub = $('#modal-warga-sts_hub')[0].selectize.getValue();
        var kode_sts_wni = $('#modal-warga-sts_wni')[0].selectize.getValue();
        var ket_emergency = $('#modal-warga-ket_emergency').val();
        var no_hp = $('#modal-warga-no_hp').val();
        var no_emergency = $('#modal-warga-no_emergency').val();
        
        var id = $('#modal-warga-id').val();
        
        if(id == 1){
            var no=$('.set-selected').closest('tr').index();
        }else{
            var no=$('#sai-grid-table-warga tbody tr:last').index();
            no++;
        }
        // var no_urut = no_urut.split(' - ')[0];
        // var nama = no_urut.split(' - ')[1];
        
        //var item = $('#sai-grid-table-modal-warga-no_urut')[0];
        //var data = $(item.selectize.getItem(no_urut)[0]).text();
        //var nama = data.split(' - ')[1];
        
        var row = 
        "<tr class='sai-grid-input-row'>"+
        "<td>"+
        no+
        "<input type='hidden' name='no_urut[]' value='"+no+"' readonly class='form-control set-no_urut'>"+
        "</td>"+
        "<td>"+
        nik+
        "<input type='hidden' name='nik[]' value='"+nik+"' required readonly class='form-control set-nik'>"+
        "</td>"+
        "<td>"+
        nama+
        "<input type='hidden' name='nama[]' value='"+nama+"' readonly class='form-control set-nama'>"+
        "</td>"+
        "<td>"+
        alias+
        "<input type='hidden' name='alias[]' value='"+alias+"' required readonly class='form-control set-alias'>"+
        "</td>"+
        "<td>"+
        kode_jk+
        "<input type='hidden' name='kode_jk[]' value='"+kode_jk+"' required readonly class='form-control set-kode_jk'>"+
        "</td>"+
        "<td>"+
        tempat_lahir+
        "<input type='hidden' name='tempat_lahir[]' value='"+tempat_lahir+"' readonly class='form-control set-tempat_lahir'>"+
        "</td>"+
        "<td>"+
        tgl_lahir+
        "<input type='hidden' name='tgl_lahir[]' value='"+tgl_lahir+"' required readonly class='form-control set-tgl_lahir'>"+
        "</td>"+
        "<td>"+
        kode_agama+
        "<input type='hidden' name='kode_agama[]' value='"+kode_agama+"' readonly class='form-control set-kode_agama'>"+
        "</td>"+ "<td>"+
        kode_goldar+
        "<input type='hidden' name='kode_goldar[]' value='"+kode_goldar+"' required readonly class='form-control set-kode_goldar'>"+
        "</td>"+
        "<td>"+
        kode_didik+
        "<input type='hidden' name='kode_didik[]' value='"+kode_didik+"' readonly class='form-control set-kode_didik'>"+
        "</td>"+
        "<td>"+
        kode_kerja+
        "<input type='hidden' name='kode_kerja[]' value='"+kode_kerja+"' readonly class='form-control set-kode_kerja'>"+
        "</td>"+
        "<td>"+
        kode_sts_nikah+
        "<input type='hidden' name='kode_sts_nikah[]' value='"+kode_sts_nikah+"' readonly class='form-control set-kode_sts_nikah'>"+
        "</td>"+
        "<td>"+
        kb+
        "<input type='hidden' name='kb[]' value='"+kb+"' required readonly class='form-control set-kb'>"+
        "</td>"+
        "<td>"+
        kode_sts_hub+
        "<input type='hidden' name='kode_sts_hub[]' value='"+kode_sts_hub+"' readonly class='form-control set-kode_sts_hub'>"+
        "</td>"+
        "<td>"+
        kode_sts_wni+
        "<input type='hidden' name='kode_sts_wni[]' value='"+kode_sts_wni+"' required readonly class='form-control set-kode_sts_wni'>"+
        "</td>"+
        "<td>"+
        no_hp+
        "<input type='hidden' name='no_hp[]' value='"+no_hp+"' readonly class='form-control set-no_hp'>"+
        "</td>"+ 
        "<td>"+
        no_emergency+
        "<input type='hidden' name='no_emergency[]' value='"+no_emergency+"' readonly class='form-control set-no_emergency'>"+
        "</td>"+ 
        "<td>"+
        ket_emergency+
        "<input type='hidden' name='ket_emergency[]' value='"+ket_emergency+"' readonly class='form-control set-ket_emergency'>"+
        "</td>"+ 
        "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-warga' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-warga'><i class='fa fa-times'></i></a></td>"+
        "</tr>";
        
        var row2="<td>"+
        no+
        "<input type='hidden' name='no_urut[]' value='"+no+"'  readonly class='form-control set-no_urut'>"+
        "</td>"+
        "<td>"+
        nik+
        "<input type='hidden' name='nik[]' value='"+nik+"' required readonly class='form-control set-nik'>"+
        "</td>"+
        "<td>"+
        nama+
        "<input type='hidden' name='nama[]' value='"+nama+"' readonly class='form-control set-nama'>"+
        "</td>"+                        
        "<td>"+
        alias+
        "<input type='hidden' name='alias[]' value='"+alias+"' required readonly class='form-control set-alias'>"+
        "</td>"+
        "<td>"+
        kode_jk+
        "<input type='hidden' name='kode_jk[]' value='"+kode_jk+"' required readonly class='form-control set-kode_jk'>"+
        "</td>"+
        "<td>"+
        tempat_lahir+
        "<input type='hidden' name='tempat_lahir[]' value='"+tempat_lahir+"' readonly class='form-control set-tempat_lahir'>"+
        "</td>"+
        "<td>"+
        tgl_lahir+
        "<input type='hidden' name='tgl_lahir[]' value='"+tgl_lahir+"' required readonly class='form-control set-tgl_lahir'>"+
        "</td>"+
        "<td>"+
        kode_agama+
        "<input type='hidden' name='kode_agama[]' value='"+kode_agama+"' readonly class='form-control set-kode_agama'>"+
        "</td>"+ 
        "<td>"+
        kode_goldar+
        "<input type='hidden' name='kode_goldar[]' value='"+kode_goldar+"' required readonly class='form-control set-kode_goldar'>"+
        "</td>"+
        "<td>"+
        kode_didik+
        "<input type='hidden' name='kode_didik[]' value='"+kode_didik+"' readonly class='form-control set-kode_didik'>"+
        "</td>"+
        "<td>"+
        kode_kerja+
        "<input type='hidden' name='kode_kerja[]' value='"+kode_kerja+"' readonly class='form-control set-kode_kerja'>"+
        "</td>"+
        "<td>"+
        kode_sts_nikah+
        "<input type='hidden' name='kode_sts_nikah[]' value='"+kode_sts_nikah+"' readonly class='form-control set-kode_sts_nikah'>"+
        "</td>"+
        "<td>"+
        kb+
        "<input type='hidden' name='kb[]' value='"+kb+"' required readonly class='form-control set-kb'>"+
        "</td>"+
        "<td>"+
        kode_sts_hub+
        "<input type='hidden' name='kode_sts_hub[]' value='"+kode_sts_hub+"' readonly class='form-control set-kode_sts_hub'>"+
        "</td>"+
        "<td>"+
        kode_sts_wni+
        "<input type='hidden' name='kode_sts_wni[]' value='"+kode_sts_wni+"' required readonly class='form-control set-kode_sts_wni'>"+
        "</td>"+
        "<td>"+
        no_hp+
        "<input type='hidden' name='no_hp[]' value='"+no_hp+"' readonly class='form-control set-no_hp'>"+
        "</td>"+ 
        "<td>"+
        no_emergency+
        "<input type='hidden' name='no_emergency[]' value='"+no_emergency+"' required readonly class='form-control set-no_emergency'>"+
        "</td>"+
        "<td>"+
        ket_emergency+
        "<input type='hidden' name='ket_emergency[]' value='"+ket_emergency+"' required readonly class='form-control set-ket_emergency'>"+
        "</td>"+
        "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-warga' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-warga'><i class='fa fa-times'></i></td>";
        
       
        if(id=='1'){
            $('.set-selected').closest('tr').text('');
            $('.set-selected').closest('tr').append(row2);
        }else{
            $('#sai-grid-table-warga').append(row);
        }
        
        $('#sai-grid-table-modal-warga').modal('hide');
        
    });

 
</script>

