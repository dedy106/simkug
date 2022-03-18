<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $sts_user=$_SESSION['userStatus'];

?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' >
            <div class='box-header'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Jurnal</h3> 
              <button class='btn btn-primary btn-sm pull-right web_datatable_insert' title='Tambah'>
                <i class='fa fa-plus-circle'></i> Tambah
              </button>
              <a href='fMain.php?hal=app/dash/dashKeu.php' class='small-box-footer pull-right btn btn-default btn-sm' > Back <i class='fa fa-arrow-circle-left'></i></a>
               <div class='pull-right' style='margin-right:5px;'>
              </div>
            </div>
            <div class='box-body sai-container-overflow-x'>
              <table class='table table-bordered table-striped DataTable' id='table-jurnal'>
                <thead>
                  <tr>
                    <td>No Bukti</td>
                    <td>Periode</td>
                    <td>Tanggal</td>
                    <td>No Dokumen</td>
                    <td>Deskripsi</td>
                    <td>Posted</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FORM INSERT -->
    <form id='web-form-jurnal' hidden>
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-header'>
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Input Jurnal</h3>
                        <button type='submit' class='btn btn-success pull-right btn-sm'><i class='fa fa-floppy-o'></i> Save</button>
                        <a class='btn btn-default pull-right web_form_back btn-sm' style='margin-right: 5px;' ><i class='fa fa-ban'></i> Cancel</a>
                    </div>
                </div>
                <div class='box box-warning'>
                    <div class='box-body pad'>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class='row' hidden>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>No Bukti</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='no_bukti' class='form-control' id='dkm-jur-nobukti' >
                                        </div>
                                    </div>
                                </div>
                                <div class='row' >
                                    <div class='form-group' style='margin-bottom:5px;'>
                                        <label class='control-label col-sm-3'>Tanggal</label>
                                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                            <div class='input-group-addon'>
                                            <i class='fa fa-calendar'></i>
                                            </div>
                                            <input name='tanggal' class='form-control datepicker-dmy' id='dkm-jur-tgl' value='<?php echo date('d-m-Y'); ?>' required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class='row' >
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Periode</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='periode' class='form-control' value='<?php echo tglToPeriode(date('Y-m-d')); ?>'  id='dkm-jur-periode' required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-6'>
                                <div class='row' >
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>No Dokumen</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='no_dokumen' maxlength='50' class='form-control' value=''  id='dkm-jur-no_dok' required>
                                        </div>
                                    </div>
                                </div>
                                <div class='row' >
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Deskripsi</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='keterangan' maxlength='200' class='form-control' value=''  id='dkm-jur-ket' required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-6'>
                                <!--<?php  ?>-->
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Total Debit</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='total_d' class='form-control currency' id='dkm-jur-total-d' readonly required>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Total Kredit</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='total_c' class='form-control currency' id='dkm-jur-total-c' readonly required>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                        </div> 
                        <div class='row'>
                            <div class='form-group'>
                                <a href='#' class='btn btn-primary sai-btn pull-left btn-sm' id='sai-grid-add-jur' data-edit='0' style='margin-left: 15px;'><i class='fa fa-plus'> Tambah Detail </i></a>
                            </div>                                                
                        </div> 
                        <hr style='margin-bottom:10px;'>
                        <div class='row' style='margin-left:5px'><h4><i class='fa fa-inbox'></i> Detail Jurnal</h4></div>
                        <div class='row' style='margin-left:-10px;margin-right:-10px' id='sai-grid-table-jur'>
                            
                        </div>              
                        <div id='validation-box'></div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- Form Modal -->
    <div class='modal' id='sai-grid-modal-jur' tabindex='-1' role='dialog'>
        <div class='modal-dialog' role='document'>
            <div class='modal-content'>
                <form id='sai-grid-form-jur'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Input Detail Jurnal</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='row' >
                            <div class='form-group'>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='id_edit' class='form-control' id='modal-jur-id' maxlength='10'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Kode Akun</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select  class='form-control selectize' id='modal-jur-kode' required >
                                    <option value=''>--- Pilih Kode Akun ---</option>
                                    <?php
                                         $rs2 = execute("SELECT * from masakun where kode_lokasi = '".$kode_lokasi."'");
                                         while($row2 = $rs2->FetchNextObject($toupper = false)){
                                             echo "<option value='".$row2->kode_akun."'>".$row2->kode_akun."-".$row2->nama."</option>";
                                         }
                                    ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                            <label class='control-label col-sm-3'>DC</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <select class='form-control selectize'  id='modal-jur-dc' required>
                                    <option value='C'>C - Credit</option>
                                    <option value='D'>D - Debet</option>
                                </select>    
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Keterangan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' maxlength='200' class='form-control' value=''  id='modal-jur-ket' required>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Nilai</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' class='form-control currency' id='modal-jur-nil' required>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Kode PP</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select  class='form-control selectize' id='modal-jur-pp' required >
                                    <option value=''>--- Pilih Kode PP ---</option>
                                    <?php
                                         $rs2 = execute("SELECT * from pp where kode_lokasi = '".$kode_lokasi."'");
                                         while($row2 = $rs2->FetchNextObject($toupper = false)){
                                             echo "<option value='".$row2->kode_pp."'>".$row2->kode_pp."-".$row2->nama."</option>";
                                         }
                                    ?>
                                    </select>
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
<script>

    function sepNum(x){
        var num = parseFloat(x).toFixed(0);
        var parts = num.toString().split(".");
        var len = num.toString().length;
        // parts[1] = parts[1]/(Math.pow(10, len));
        parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
        return parts.join(",");
    }

    function toRp(num){
        if(num < 0){
            return "("+sepNum(num * -1)+")";
        }else{
            return sepNum(num);
        }
    }

    function toNilai(str_num){
        var parts = str_num.split('.');
        number = parts.join('');
        number = number.replace('Rp', '');
        // number = number.replace(',', '.');
        return +number;
    }

    function hitungTotal(){
        $('#dkm-jur-total-d').val(0);
        $('#dkm-jur-total-c').val(0);
        total_d = 0;
        total_c = 0;
        $('.sai-grid-input-row').each(function(){

            var pos = $(this).closest('div').find('.dkm-inp-dc').val();
            var this_val = $(this).closest('div').find('.dkm-inp-nil').val();

            if(pos == "D"){
                total_d += +this_val;
            }else if(pos == "C"){
                total_c += +this_val
            }
        });
        $('#dkm-jur-total-d').val(sepNum(total_d));
        $('#dkm-jur-total-c').val(sepNum(total_c));
    }

$(document).ready(function(){
    // function init(){
    //   $.ajax({
    //         type: 'POST',
    //         url: 'include_lib.php?hal=server/dash/Keuangan.php&fx=getJurnal',
    //         dataType: 'json',
    //         data: {'lokasi':<?php //echo $kode_lokasi ?>},
    //         success:function(result){
                
    //             var html = '';
    //             for(i=0; i<result.daftar.length; i++){
    //                 var line=result.daftar;
    //                 html += "<tr>"+
    //                             "<td>"+line[i].no_bukti+"</td>"+
    //                             "<td>"+line[i].periode+"</td>"+
    //                             "<td>"+line[i].tgl+"</td>"+
    //                             "<td>"+line[i].no_dokumen+"</td>"+
    //                             "<td>"+line[i].keterangan+"</td>"+
    //                             "<td>"+line[i].posted+"</td>"+
    //                             "<td><a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a> &nbsp;</td>"+
    //                         "</tr>";
    //             }
                
    //             $('#table-jurnal tbody').html(html);
    //         },
    //     })
    // }

    // init();

    // var table2 = $('#table-jurnal').DataTable({
    //                 // 'fixedHeader': true,
    //                 'scrollY': '300px',
    //                 // 'scrollX': '0px',
    //                 'scrollCollapse': true,
    //                 'order': [[ 0, 'asc' ]]
    //             });
    // table2.columns.adjust().draw();

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var table_ju = $('#table-jurnal').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/dash/Keuangan.php&fx=getJurnal3',
            'data': {'kode_lokasi':kode_lokasi},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 6, data: null, 'defaultContent': action_html }
        ]
    });
    //table_ju.columns.adjust().draw();

    $('#saiweb_container').on('click', '.web_datatable_insert', function(){
        $('#web_datatable').hide();

        $('#dkm-jur-nobukti').val('');
        $('#dkm-jur-no_dok').val('');
        $('#dkm-jur-ket').val('');
        $('#dkm-jur-total-d').val(0);
        $('#dkm-jur-total-c').val(0);
        
        $('#web-form-jurnal').show();
        $('#sai-grid-table-jur .sai-grid-input-row').remove();
    });

    $('#saiweb_container').on('click', '.web_form_back', function(){
        var id = $(this).closest('form').attr('id');
        $('#'+id).hide();
        $('#web_datatable').show();
    });

    $('#saiweb_container').on('keydown','#modal-jur-kode-selectized', function(e){
        if (e.which == 13) {
          e.preventDefault();
            if($.trim($('#modal-jur-kode')[0].selectize.getValue()).length){
                $('#modal-jur-dc')[0].selectize.focus();
            }else{
                alert('Akun yang dimasukkan tidak valid');
                return false;
            }
        }
    });

    $('#saiweb_container').on('keydown','#modal-jur-dc-selectized', function(e){
        if (e.which == 13) {
          e.preventDefault();
            if($.trim($('#modal-jur-dc')[0].selectize.getValue()).length){
                $('#modal-jur-ket').focus();
            }else{
                alert('Posisi yang dimasukkan tidak valid');
                return false;
            }
        }
    });

    $('#saiweb_container').on('keydown','#modal-jur-ket',function(e){
        if (e.which == 13) {
          e.preventDefault();
           $('#modal-jur-nil').focus();
        }
    });

    // $('#saiweb_container').on('focus', '#modal-jur-ket', function(e){
    //     var this_index = $('#sai-grid-table-jur .sai-grid-input-row:last').index();
        
    //     if($("#sai-grid-table-jur .sai-grid-input-row:eq("+(this_index)+")").find('.dkm-inp-ket').val() != undefined){
    //         $(this).val($("#sai-grid-table-jur .sai-grid-input-row:eq("+(this_index)+")").find('.dkm-inputjur-ket').val());
    //     }else{
    //         $(this).val('');
    //     }
    // });

    $('#saiweb_container').on('focus', '#modal-jur-nil', function(e){
        var dc = $('#modal-jur-dc')[0].selectize.getValue();
        var parts = $('#dkm-jur-total-d').val().split('.');
        total_d = parts.join('');
        total_d = total_d.replace('Rp', '');

        var parts2 = $('#dkm-jur-total-c').val().split('.');
        total_c = parts2.join('');
        total_c = total_c.replace('Rp', '');

        if(dc == 'D' || dc == 'C'){
            var selisih = Math.abs(total_d - total_c);
            $(this).val(sepNum(selisih));
            // $('#tb-ju-nil').focus();
        }else{
            alert('Posisi tidak valid, harap pilih posisi akun');
            $('#modal-jur-dc')[0].selectize.focus();
        }
    });

    $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                        // getset value
        var kode = $(this).closest('tr').find('td:eq(0)').text();
        var lokasi = '<?php echo $kode_lokasi; ?>';

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/dash/Keuangan.php&fx=getEditJurnal',
            dataType: 'json',
            data: {'lokasi':lokasi, 'kode':kode},
            success:function(res){
                // alert('id ='+res.daftar[0].id);

                if(res.status){        

                    $('#dkm-jur-nobukti').val(res.daftar[0].no_bukti);
                    $('#dkm-jur-tgl').val(res.daftar[0].tgl);
                    $('#dkm-jur-periode').val(res.daftar[0].periode);
                    $('#dkm-jur-no_dok').val(res.daftar[0].no_dokumen);
                    $('#dkm-jur-ket').val(res.daftar[0].keterangan);
                    $('#dkm-jur-total-d').val(toRp(res.daftar[0].nilai));
                    $('#dkm-jur-total-c').val(toRp(res.daftar[0].nilai));
                    
                    $('#web_datatable').hide();
                    $('#web-form-jurnal').show();
                    $('#sai-grid-table-warga .sai-grid-input-row').remove();

                    var row = "";
                    var no=1;
                    for(var i=0;i<res.daftar2.length;i++){
                        var line=res.daftar2[i];
                        row += "<div class='box-footer box-comments sai-grid-input-row' style='background:white;border-top:0px solid white'>"+
                            "<div class='box-comment'>"+
                            "<div class='comment-text' style='margin-left: 5px;'>"+
                                "<span class='username'><input type='hidden' name='kode_akun[]' value='"+line.kode_akun+"' class='dkm-inp-kode'>"+line.kode_akun+" - "+line.nama_akun+"<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='dc[]' value='"+line.dc+"' class='dkm-inp-dc'>"+line.dc+"</span>"+
                                "</span><!-- /.username -->"+
                                "<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='nilai[]' value='"+line.nilai+"' class='dkm-inp-nil'><b>"+sepNum(line.nilai)+"</b></span><input type='hidden' name='ket[]' value='"+line.ket+"' class='dkm-inp-ket'>"+line.ket+"<span class='username'><input type='hidden' name='pp[]' value='"+line.kode_pp+"' class='dkm-inp-pp' >"+line.kode_pp+"-"+line.nama_pp+" <span class='text-muted pull-right' style='font-size:14px'><a class='sai-btn-circle' id='sai-grid-add-jur' data-edit='1'><i class='fa fa-pencil'></i></a><a class='sai-btn-circle sai-grid-del-jur'><i class='fa fa-times'></i></a></span></span>"+
                                
                                "</div>"+
                            "</div>"+
                        "</div>";
                        no++;
                    }
                    $('#sai-grid-table-jur').append(row);
                        
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
    });

    $('#saiweb_container').on('submit', '#web-form-jurnal', function(e){
    e.preventDefault();
        var formData = new FormData(this);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
            }

        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
        var kode_pp='<?php echo $kode_pp; ?>' ;

        formData.append('nik', nik);
        formData.append('kode_lokasi', kode_lokasi);
        formData.append('kode_pp', kode_pp);

        if($('#dkm-jur-total-d').val() != $('#dkm-jur-total-c').val()){
            alert('Data Jurnal Umum yang dimasukkan tidak balance');
        }else if($('#dkm-jur-total-d') <= 0 || $('#dkm-jur-total-c').val() <= 0){
            alert('Total Debet atau Total Kredit tidak boleh 0 ');
        }else{
            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/dash/Keuangan.php&fx=simpanJurnal',
                dataType: 'json',
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(result){
                    alert('Input data '+result.message);
                    if(result.status){
                        //location.reload();
                        table_ju.ajax.reload();
                        $('#web-form-jurnal').hide();
                        $('#web_datatable').show();
                        
                    }
                },
                fail: function(xhr, textStatus, errorThrown){
                    alert('request failed:'+textStatus);
                }
            });
        }
    });
  
   $('#saiweb_container').on('click', '.web_datatable_del', function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(0)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/dash/Keuangan.php&fx=hapusJurnal',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        table_ju.ajax.reload();
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

    $('#saiweb_container').on('click', '#sai-grid-add-jur', function(){
        if($(this).data('edit')=='1'){
            $('.sai-grid-input-row').removeClass('set-selected');
            $(this).closest('div').addClass('set-selected');
            
            var kd= $(this).closest('div').find('.dkm-inp-kode').val();
            var dc= $(this).closest('div').find('.dkm-inp-dc').val();
            var nilai= $(this).closest('div').find('.dkm-inp-nil').val();
            var ket= $(this).closest('div').find('.dkm-inp-ket').val();
            var pp= $(this).closest('div').find('.dkm-inp-pp').val();

            $('#modal-jur-id').val('1');
            $('#modal-jur-kode')[0].selectize.setValue(kd);
            $('#modal-jur-dc')[0].selectize.setValue(dc);
            $('#modal-jur-ket').val(ket);
            $('#modal-jur-nil').val(nilai);
            $('#modal-jur-pp')[0].selectize.setValue(pp);
            $('#sai-grid-modal-jur').modal('show');
        }else{
            $('#modal-jur-id').val('0');
            $('#modal-jur-kode')[0].selectize.setValue('');
            $('#modal-jur-dc')[0].selectize.setValue('');
            $('#modal-jur-ket').val('');
            $('#modal-jur-nil').val(0);
            $('#modal-jur-pp')[0].selectize.setValue('');
            $('#sai-grid-modal-jur').modal('show');
        }
    });
    
    $('#saiweb_container').on('click', '.sai-grid-del-jur', function(){
        $(this).closest('.sai-grid-input-row').remove();
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);
        hitungTotal();
    });
    
    $('#sai-grid-form-jur').submit(function(e){
        e.preventDefault();
        
        var kode = $('#modal-jur-kode')[0].selectize.getValue();
        var dc = $('#modal-jur-dc')[0].selectize.getValue();
        var nilai = $('#modal-jur-nil').val();
        var ket = $('#modal-jur-ket').val();
        var id = $('#modal-jur-id').val();
        var kode_pp = $('#modal-jur-pp')[0].selectize.getValue();
        nilai=toNilai(nilai);

        if(id == 1){
            var no=$(".set-selected").closest('div').index();
        }else{
            var no=$('#sai-grid-table-jur .sai-grid-input-row:last').index();
            no++;
        }

        var item = $('#modal-jur-kode')[0];
        var data = $(item.selectize.getItem(kode)[0]).text();
        var nama = data.split('-')[1];

        var item2 = $('#modal-jur-pp')[0];
        var data = $(item2.selectize.getItem(kode_pp)[0]).text();
        var nama_pp = data.split('-')[1];        
        var row = "<div class='box-footer box-comments sai-grid-input-row' style='background:white;border-top:0px solid white'>"+
            "<div class='box-comment'>"+
            "<div class='comment-text' style='margin-left: 5px;'>"+
                "<span class='username'><input type='hidden' name='kode_akun[]' value='"+kode+"' class='dkm-inp-kode'>"+kode+" - "+nama+"<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='dc[]' value='"+dc+"' class='dkm-inp-dc'>"+dc+"</span>"+
                "</span><!-- /.username -->"+
                "<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='nilai[]' value='"+nilai+"' class='dkm-inp-nil'><b>"+sepNum(nilai)+"</b></span><input type='hidden' name='ket[]' value='"+ket+"' class='dkm-inp-ket'>"+ket+"<span class='username'><input type='hidden' name='pp[]' value='"+kode_pp+"' class='dkm-inp-pp' >"+kode_pp+"-"+nama_pp+" <span class='text-muted pull-right' style='font-size:14px'><a class='sai-btn-circle' id='sai-grid-add-jur' data-edit='1'><i class='fa fa-pencil'></i></a><a class='sai-btn-circle sai-grid-del-jur'><i class='fa fa-times'></i></a></span></span>"+
                
                "</div>"+
            "</div>"+
        "</div>";


        var row2 = 
            // "<div class='box-comment'>"+
            // "<div class='comment-text' style='margin-left: 5px;'>"+
                "<span class='username'><input type='hidden' name='kode_akun[]' value='"+kode+"' class='dkm-inp-kode'>"+kode+" - "+nama+"<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='dc[]' value='"+dc+"' class='dkm-inp-dc'>"+dc+"</span>"+
                "</span><!-- /.username -->"+
                "<span class='text-muted pull-right' style='font-size:14px'><input type='hidden' name='nilai[]' value='"+nilai+"' class='dkm-inp-nil'><b>"+sepNum(nilai)+"</b></span><input type='hidden' name='ket[]' value='"+ket+"' class='dkm-inp-ket'>"+ket+"<span class='username'><input type='hidden' name='pp[]' value='"+kode_pp+"' class='dkm-inp-pp' >"+kode_pp+"-"+nama_pp+" <span class='text-muted pull-right' style='font-size:14px'><a class='sai-btn-circle' id='sai-grid-add-jur' data-edit='1'><i class='fa fa-pencil'></i></a><a class='sai-btn-circle sai-grid-del-jur'><i class='fa fa-times'></i></a></span></span>";
                
            //     "</div>"+
            // "</div>";
        
        if(id=='1'){
            $('.set-selected').closest('div').text('');
            $('.set-selected').closest('div').append(row2);
        }else{
            $('#sai-grid-table-jur').append(row);
        }
        
        $('#sai-grid-modal-jur').modal('hide');
        hitungTotal();
    });

    $(':input[type="number"], .currency').on('keydown', function (e){
        var value = String.fromCharCode(e.which) || e.key;

        if (    !/[0-9\.]/.test(value) //angka dan titik
                && e.which != 190 // .
                && e.which != 116 // F5
                && e.which != 8   // backspace
                && e.which != 9   // tab
                && e.which != 13   // enter
                && e.which != 46  // delete
                && (e.which < 37 || e.which > 40) // arah 
                && (e.keyCode < 96 || e.keyCode > 105) // dan angka dari numpad
            ){
                e.preventDefault();
                return false;
        }
    });

    $('.currency').inputmask("numeric", {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        autoGroup: true,
        rightAlign: true,
        oncleared: function () { self.Value(''); }
    });

});
</script>

