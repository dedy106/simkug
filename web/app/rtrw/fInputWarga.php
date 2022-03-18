<?php
    
    $judul = "Input Warga";
    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/fHome.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fHome.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

?>
<div class='panel' style='<?= $padding; ?>'>
    <div class='panel-body'>
        <?=$back1?>
        <div class='saku-data row'>
            <div class="col-md-12" style="margin-bottom:40px">
            <button class='btn btn-primary pull-right' id='btn-tambah' title='Tambah'>
            <i class='fa fa-plus-circle'></i> Tambah
            </button>
            </div>
            <div class="col-md-12">
                <div class='list-warga'>    
                </div>
            </div>
        </div>
        <div class='saku-form row' hidden>
            <div class='col-md-6'>
                <form class='form-tambah' method='POST'>
                    <div class='box-body'>
                        <div class='form-group'>
                            <label for='input_nama'>Nama</label>
                            <input type='hidden' class='form-control' id='id_edit' name='id_edit' required value="0">
                            <input type='hidden' class='form-control' id='input_no_bukti' name='input_no_bukti' required>
                            <input type='hidden' class='form-control' id='input_no_urut' name='input_no_urut' required>
                            <input type='text' class='form-control' id='input_nama' name='input_nama' required placeholder="Nama Lengkap">
                        </div>
                        <div class='form-group'>
                            <label for='input_alias'>Alias</label>
                            <input type='text' class='form-control' id='input_alias' name='input_alias' placeholder="Nama Alias">
                        </div>
                        <div class='form-group'>
                            <label for='input_no_hp'>No Handphone</label>
                            <input type='text'  id='input_no_hp' class='form-control' name='input_no_hp' placeholder="08xxxxxxxxxx" required>
                        </div>
                        <div class='form-group'>
                            <label class='control-label'>Tanggal Lahir</label>
                            <div class='input-group date' >
                                <div class='input-group-addon'>
                                <i class='fa fa-calendar'></i>
                                </div>
                                <input name='input_tgl_lahir' class='form-control datepicker-dmy' id='input_tgl_lahir'>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label>Jenis Kelamin</label>
                            <select class='form-control selectize' id='input_kode_jk' name='input_kode_jk' required>
                                <option value=''>--- Pilih Jenis Kelamin ---</option>
                                <option value="L">Laki Laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label>Agama</label>
                            <select class='form-control selectize' id='input_kode_agama' name='input_kode_agama' required>
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
                    <div class='box-footer'>
                        <button id='btnSubmit' class='btn btn-primary'>Submit</button>
                        <button id='btn-back' class='btn btn-default'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>

    function getWarga(){
        $.ajax({
            type: 'GET',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getWargaList',
            dataType: 'json',
            data:{ 'kode_rumah': '<?=$_SESSION['userLog']?>'},
            success:function(result){    
                var html=``;
                $('.list-warga').html('');
                if(result.status){
                    for(var i=0; i<result.daftar.length;i++){
                        var line = result.daftar[i];
                        if(line.foto == "-" || line.foto == "" ){
                            var gmbr = "https://api.simkug.com/api/rtrw/storage/user3.png";
                        }else{
                            var gmbr = "https://api.simkug.com/api/rtrw/storage/"+line.foto;
                        }
                        // var gmbr = "https://api.simkug.com/api/rtrw/storage/user3.png";
                        html+=`
                            <div class='box-footer box-comments' style='background:white'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' src='`+gmbr+`' alt='User Image'>
                                    <div class='comment-text edit'>
                                        <p class='inp-nama' hidden>`+line.nama+`</p>
                                        <p class='inp-no_bukti' hidden>`+line.no_bukti+`</p>
                                        <p class='inp-no_urut' hidden>`+line.no_urut+`</p>
                                        <span class='username'>
                                            `+line.nama+` 
                                        </span>
                                            Tgl Lahir: `+line.tgl_lahir+`
                                            <br/>
                                            No Hp: `+line.no_hp+`
                                    </div>
                                </div>
                            </div>`;

                    }
                }
                $('.list-warga').html(html);
            }
        });
    }

    getWarga();

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

    // Simpan Warga
    $('#btnSubmit').click(function(e){
        e.preventDefault();
        $(this).text("Please Wait...").attr('disabled', 'disabled');
        // alert('test');
        myForm = $('.form-tambah').serialize();
        if($('#id_edit').val() == "0"){
            var url = 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=tambahWarga';
        }else{
            var url = 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=ubahWarga';
        }
        
        $.ajax({
            type: 'POST',
            url: url,
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
        
        $(this).html("Submit").removeAttr('disabled');
        
    });  

    $('.saku-data').on('click', '#btn-tambah', function(){
     
        $('.form-tambah')[0].reset();
        $('#id_edit').val("0");
        $('.saku-form').show();
        $('.saku-data').hide();
        // alert("hello");
    });

    $('.saku-form').on('click', '#btn-back', function(){
        $('.saku-form').hide();
        $('.saku-data').show();
    });

    $('.saku-data').on('click', '.edit',function(e){
        e.preventDefault();
        var no_bukti = $(this).closest('div').find('.inp-no_bukti').text();
        var nama = $(this).closest('div').find('.inp-nama').text();
        var no_urut = $(this).closest('div').find('.inp-no_urut').text();
        $.ajax({
            type: 'GET',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getEditWarga',
            dataType: 'json',
            data: {'no_bukti':no_bukti,'nama':nama,'no_urut':no_urut},
            cache: false,
            success:function(result){
                if(result.status){
                    var line = result.daftar[0];
                    $('#id_edit').val("1");
                    $('#input_no_bukti').val(line.no_bukti);
                    $('#input_no_urut').val(line.no_urut);
                    $('#input_nama').val(line.nama);
                    $('#input_alias').val(line.alias);
                    $('#input_no_hp').val(line.no_hp);
                    $('#input_tgl_lahir').val(line.tgl_lahir);
                    $('#input_kode_jk')[0].selectize.setValue(line.kode_jk);
                    $('#input_kode_agama')[0].selectize.setValue(line.kode_agama);
                    $('.saku-form').show();
                    $('.saku-data').hide();
                }
            }
        });
        
    });  

 
</script>

