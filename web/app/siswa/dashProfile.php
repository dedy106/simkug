<?php
$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];

$path = "http://".$_SERVER["SERVER_NAME"]."/";		

// echo $_SESSION["userStatus"];
?>
<div id='dash_page_profile'>
    <div class='row'>
        <div class='col-md-12'>
            <div class='box box-warning'>
                <div class='box-header'>
                    <i class='fa fa-user'></i> Profile
                    <a href='#' class='btn btn-primary pull-right' id='btn-ubtelp'>
                        <i class='fa fa-pencil'></i> Ubah No Hp
                    </a>
                    <a href='#' class='btn btn-primary pull-right' data-toggle="modal" data-target="#modalPass">
                        <i class='fa fa-pencil'></i> Ubah Password
                    </a>
                </div>
                <div class='box-body pad sai-container-overflow'>
                    <div id='akademik-profile-content'>
                        <table class='table table-striped table-bordered'>
                            <?php
                                if($_SESSION['userStatus'] == "A"){
                                    
                                    $rs = execute("select a.nik, a.kode_lokasi, a.kode_pp, a.foto, b.nama, b.kode_tingkat, b.kode_jur, c.nama as nama_jur from sis_hakakses a left join sis_kelas b on a.nik=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp left join sis_jur c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp where a.nik='$nik' AND a.kode_lokasi ='$kode_lokasi' AND a.kode_pp = '$kode_pp'");

                                    $row_name=array("NIK", "Nama", "Jurusan", "Tingkat");

                                    $row = $rs->FetchNextObject($toupper=false);
                                
                                echo "<tr><td>".$row_name[0]."</td><td>".$row->nik."</td></tr>
                                      <tr><td>".$row_name[1]."</td><td>".$row->nama."</td></tr>
                                      <tr><td>".$row_name[2]."</td><td>".$row->nama_jur."</td></tr>
                                      <tr><td>".$row_name[3]."</td><td>".$row->kode_tingkat."</td></tr>"; 
                                }else{

                                    $row_name = array("NIS", "ID Bank", "Nama", "Angkatan", "Kelas", "Jurusan", "Tingkat", "Status", "Tanggal Lulus","No Hp Ayah","No Hp Ibu");
                                    
                                    if($_SESSION['kodeMenu'] == 'SISWA'){
                                        $rs = execute("select a.nis, a.id_bank, a.nama, b.nama as nama_akt, c.nama as nama_kls, d.nama as nama_jur, e.nama as nama_tingkat, a.flag_aktif, f.foto,a.hp_ayah,a.hp_ibu from sis_siswa a left join sis_angkat b on a.kode_akt=b.kode_akt left join sis_kelas c on a.kode_kelas=c.kode_kelas left join sis_jur d on c.kode_jur = d.kode_jur left join sis_tingkat e on c.kode_tingkat=e.kode_tingkat left join sis_hakakses f on a.nis=f.nik and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp where a.nis='$nik' AND a.kode_lokasi ='$kode_lokasi' AND a.kode_pp = '$kode_pp'");

                                        $row = $rs->FetchNextObject($toupper=false);
                                    
                                        echo "<tr><td>".$row_name[0]."</td><td>".$row->nis."</td></tr>
                                            <tr><td>".$row_name[1]."</td><td>".$row->id_bank."</td></tr>
                                            <tr><td>".$row_name[2]."</td><td>".$row->nama."</td></tr>
                                            <tr><td>".$row_name[3]."</td><td>".$row->nama_akt."</td></tr>
                                            <tr><td>".$row_name[4]."</td><td>".$row->nama_kls."</td></tr>
                                            <tr><td>".$row_name[5]."</td><td>".$row->nama_jur."</td></tr>
                                            <tr><td>".$row_name[6]."</td><td>".$row->nama_tingkat."</td></tr>
                                            <tr><td>".$row_name[7]."</td><td>".$row->flag_aktif."</td></tr>
                                            <tr><td>".$row_name[8]."</td><td>".$row->tgl_lulus."</td></tr>
                                            <tr><td>".$row_name[9]."</td><td>".$row->hp_ayah."</td></tr>
                                            <tr><td>".$row_name[10]."</td><td>".$row->hp_ibu."</td></tr>";  
        
                                    }else if($_SESSION['kodeMenu'] == 'SISWA_REG'){
                                        $rs = execute("select a.no_reg as nis, a.id_bank, a.nama, a.kode_ta as nama_akt, 'REG' as nama_kls, '-' as nama_jur, '-' as nama_tingkat, 'Registrasi' as flag_aktif, f.foto from sis_siswareg a left join sis_hakakses f on a.no_reg=f.nik and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp where a.no_reg='$nik' AND a.kode_lokasi ='$kode_lokasi' AND a.kode_pp = '$kode_pp'");

                                        $row = $rs->FetchNextObject($toupper=false);
                                    
                                        echo "<tr><td>".$row_name[0]."</td><td>".$row->nis."</td></tr>
                                            <tr><td>".$row_name[1]."</td><td>".$row->id_bank."</td></tr>
                                            <tr><td>".$row_name[2]."</td><td>".$row->nama."</td></tr>
                                            <tr><td>".$row_name[3]."</td><td>".$row->nama_akt."</td></tr> ";
        
                                    } 
                                }
                            ?>
                        
                        </table>
                    </div>
                </div>
                <div class='box-footer'>
                    <div class='row'>
                        <form enctype='multipart/form-data' id='form-sis-foto'>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <center>
                                        <div id='foto-siswa'>
                                        <?php
                                            if($row->foto == null){
                                                $img = $path. 'image/user2.png';
                                            }else{
                                                $img = $path. 'image/'.$row->foto;
                                            }
                                        ?>
                                            <img src='<?php echo $img; ?>' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'>
                                            <br><br>
                                        </div>
                                        <input name='file' type='file' accept='image/jpg, image/jpeg, image/png' required> <br>
                                        <button type='submit' class='btn btn-success'><i class='fa fa-pencil'></i> Simpan Foto</button>
                                    </center>
                                </div>
                            </div>
                            <br>
                            <div class='col-md-12'>
                                <div class='alert' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #31708f; border-color: #bce8f1; background-color: #d9edf7;'>
                                    <center>
                                        Ukuran file maksimum 1MB <br>
                                        Ukuran foto minimum 200x200px dan maksimum 800x800px
                                    </center>
                                </div><br>
                                <div id='validation-box'></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalPass" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Ubah Password</h4>
            </div>
            
            <form id="form-sis-ubpass">
                <div class="modal-body">
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Password Lama</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='password' name='password_lama' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Password Baru</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='password' name='password_baru' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Ulangi Password</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='password' name='password_repeat' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='nik' class='form-control' value='<?php echo $nik; ?>'>
                            </div>
                        </div>
                        <div class='form-group'>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='kode_lokasi' class='form-control' value='<?php echo $kode_lokasi; ?>'>
                            </div>
                        </div>
                        <div class='form-group'>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='kode_pp' class='form-control' maxlength='10' value='<?php echo $kode_pp; ?>'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-sm-12' style='margin-bottom:5px;'>
                            <div id='validation-box2'></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal"> Tutup</a>
                    <button type="submit" class="btn btn-success">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modalTlp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Ubah No HP</h4>
            </div>
            
            <form id="form-sis-ubtelp">
                <div class="modal-body">
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>No Hp Ayah</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='hp_ayah' class='form-control' id='#form-edit-hp-ayah' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>No Hp Ibu</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='hp_ibu' class='form-control' id='#form-edit-hp-ibu' required>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-sm-12' style='margin-bottom:5px;'>
                            <div id='validation-box3'></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal"> Tutup</a>
                    <button type="submit" class="btn btn-success">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
 $('#ajax-content-section').on('submit', '#form-sis-foto', function(event){
        event.preventDefault();
        var formData = new FormData(this);
        
        $.ajax({
            url: "include_lib.php?hal=server/siswa/Siswa.php&fx=ubahFoto",
            data: formData,
            type: "post",
            dataType: "json",
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false, 
            success: function (data) {
                // console.log(data);
                alert(data.alert);

                if(data.status == 1){
                    $('.foto-ui-ajax').attr('src', data.new_img);
                    // window.localStorage.setItem("foto", data.new_img);
                    $('#foto-siswa').html("<img src='"+data.new_img+"' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'> <br><br>");
                }else if (data.status == 3){
                    // https://stackoverflow.com/a/26166303
                    var error_array = Object.keys(data.error_input).map(function (key) { return data.error_input[key]; });

                    // append input element error
                    var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                    for(i = 0; i<error_array.length; i++){
                        error_list += '<li>'+error_array[i]+'</li>';
                    }
                    error_list += "</ul></div>";
                    status = false;
                    $('#validation-box').html(error_list);
                }
            }
        });
    });

    function clearInput(){
        $("input:not([type='radio'],[type='checkbox'],[type='submit'])").val('');
        $('textarea').val('');
        $("select:not('.selectize')").val('');
        $('#validation-box2').text('');
    }
    
    $('#ajax-content-section').on('submit', '#form-sis-ubpass', function(event){
        event.preventDefault();
        var formData = new FormData(this);
        
        $.ajax({
            url: 'include_lib.php?hal=server/siswa/Siswa.php&fx=ubahPassword',
            data: formData,
            type: "post",
            dataType: "json",
            contentType: false, 
            cache: false, 
            processData:false, 
            success: function (data) {
                alert(data.alert);

                if(data.status == 1){
                    $('#modalPass').modal('hide');
                    $('#validation-box2').html("");
                    clearInput();
                }else if (data.status == 3){
                    // var error_array = Object.keys(data.error_input).map(function (key) { return data.error_input[key]; });

                    // append input element error
                    var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                    for(i = 0; i<data.error_input.length; i++){
                        error_list += '<li>'+data.error_input[i]+'</li>';
                    }
                    error_list += "</ul></div>";
                    status = false;
                    $('#modalPass').find('#validation-box2').html(error_list);
                    // $('#validation-box').append(error_list);
                }
            }
        });
    });

    
    $('#btn-ubtelp').click(function(){
        
        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
        var kode_pp='<?php echo $kode_pp; ?>' ;

        $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/siswa/Siswa.php&fx=getEditTelp',
        dataType: 'json',
        data: {'nik':nik,'kode_lokasi':kode_lokasi,'kode_pp':kode_pp},
        success:function(res){
            // alert('id ='+res.daftar[0].hp_ayah);

            if(res.status){
                
                $('#form-edit-hp-ayah').val(res.daftar[0].hp_ayah);
                $('#form-edit-hp-ibu').val(res.daftar[0].hp_ibu);
                $('#modalTlp').modal('show');
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:');
        }
    });

    });

    $('#ajax-content-section').on('submit', '#form-sis-ubtelp', function(event){
        event.preventDefault();
        var formData = new FormData(this);

        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
        var kode_pp='<?php echo $kode_pp; ?>' ;

        formData.append('nik', nik);
        formData.append('kode_lokasi', kode_lokasi);
        formData.append('kode_pp', kode_pp);
        
        $.ajax({
            url: 'include_lib.php?hal=server/siswa/Siswa.php&fx=ubahNoTelp',
            data: formData,
            type: "post",
            dataType: "json",
            contentType: false, 
            cache: false, 
            processData:false, 
            success: function (data) {
                alert(data.alert);

                if(data.status == 1){
                    $('#modalTlp').modal('hide');
                    $('#validation-box3').html("");
                    clearInput();
                    location.reload();
                }else if (data.status == 3){
                    // var error_array = Object.keys(data.error_input).map(function (key) { return data.error_input[key]; });

                    // append input element error
                    var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                    for(i = 0; i<data.error_input.length; i++){
                        error_list += '<li>'+data.error_input[i]+'</li>';
                    }
                    error_list += "</ul></div>";
                    status = false;
                    $('#modalTlp').find('#validation-box3').html(error_list);
                    // $('#validation-box').append(error_list);
                }
            }
        });
    });
</script>