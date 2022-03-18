<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $path = "http://".$_SERVER["SERVER_NAME"]."/";
    $pathimg = $path."image/user2.png";

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRA".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$kode_lokasi."' ";
    
    $query = execute($sql2);

    $no_app = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

?>
<div id='saiweb_container'>
    <div id='web_datatable'>
        <div class="box box-widget">
            <div class="box-header">                    
                <a href="fMain.php?hal=app/siaga/dashSiaga.php" style='position:relative' class="small-box-footer btn btn-default pull-left" style="margin-right: 5px;"> Back <i class="fa fa-arrow-circle-left"></i></a>
                <div class="col-sm-10 pull-center" style=""><h4> Approve Dir Unit </h4>
                </div>
            </div>                                
            <div class="box-body">
            </div>
            <?php 
                $sql="select a.kode_lokasi,a.kode_pp+' - '+c.nama as pp,a.no_pdrk as no_bukti,b.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.sts_pdrk as jenis
                from rra_pdrk_m a 
                inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi 
                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                where a.modul = 'MULTI' and a.progress in ('9') and a.periode<='$periode' ";
                $rs1=execute($sql);

                if($rs1->RecordCount() > 0){
                    while ($row1 = $rs1->FetchNextObject($toupper=false)){
                        echo"
                        <a class = 'web_datatable_edit' href='#' role='button'>
                        <div class='box-footer box-comments' style='background:white'>
                            <div class='box-comment'>
                            <img alt='User Image' src='$pathimg' style='border: 1px solid #d5cdcd;padding: 2px;width: 30px;' class='img-circle'>
                            <div class='comment-text'>
                                <span class='username'><p class='li-kode' hidden>$row1->no_bukti</p>$row1->no_bukti <span class='text-muted pull-right' style='font-size:14px'>$row1->jenis</span>
                                
                                </span><!-- /.username -->
                                <span><p class='li-ket' hidden>$row1->keterangan</p>$row1->keterangan <span class='text-muted pull-right' style='font-size:14px'><i style='font-size: 25px;' class='fa fa-angle-right '></i></span></span>
                                </div>
                                <span style='margin-left: 40px;font-size:11px;color:black'><p class='li-lokasi' hidden>$row1->kode_lokasi</p>$row1->tanggal</span>
                            </div>
                        </div>
                        </a>
                        ";
                    }
                }
             ?>
        </div>
    </div>
    <form id='web_form_edit' hidden>
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-header'>
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Approval</h3>
                        <button type='submit' class='btn btn-success pull-right'><i class='fa fa-floppy-o'></i> Save</button>
                        <a class='btn btn-default pull-right web_form_back' style='margin-right: 5px;' ><i class='fa fa-ban'></i> Cancel</a>
                    </div>
                </div>
                <div class='box box-warning'>
                    <div class='box-body pad'>
                        <div class='row'>
                            <div class='form-group' >
                                <label class='control-label col-sm-3'>Status</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select name='status' class='form-control selectize' id='siaga-app-sts' required  >
                                        <option value='APPROVE' selected>APPROVE</option>
                                        <option value='NONAPP'>NONAPP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Approval</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <input type='text' name='no_app' class='form-control' id='siaga-app-no_app' value='<?php echo $no_app; ?>' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Deskripsi</label>
                                <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                    <input type='text' name='keterangan' class='form-control' id='siaga-app-ket'>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Usulan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <input type='text' name='no_bukti' class='form-control' id='siaga-app-no_usulan' readonly>
                                </div>
                            </div>
                        </div>
                        <hr style='margin-bottom:10px;'>
                        <div class='row'>
                            <div class='col-md-12 sai-container-overflow'>
                                <table class='table table-striped table-bordered' id='sai-grid-table-app'>
                                    <tr>
                                        <th>Bulan</th>
                                        <th>Kode Akun</th>
                                        <th>Nama Akun</th>
                                        <th>Jenis</th>
                                        <th>Nilai</th>
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

  var table2 = $('#table-approve').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
            });
  table2.columns.adjust().draw();

  $('#saiweb_container').on('click', '.web_form_back', function(){
     var id = $(this).closest('form').attr('id');
     $('#'+id).hide();
     $('#web_datatable').show();
  });

  $('.web_datatable_edit').click(function(){
                    // getset value
     var kode =$(this).find('.li-kode').text();
     var keterangan =$(this).find('.li-ket').text();
     var lokasi=$(this).find('.li-lokasi').text();

     $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/siaga/Siaga.php&fx=getEditApproval2',
        dataType: 'json',
        data: {'lokasi':lokasi, 'kode':kode},
        success:function(res){
            // alert('id ='+res.daftar[0].id);

            if(res.status){

                $('#siaga-app-ket').val(keterangan);
                $('#siaga-app-no_usulan').val(kode);
                
                var row = "";
                var no=1;
                if(res.rows > 0){
                    for(var i=0;i<res.daftar.length;i++){
                        var line=res.daftar[i];
                        
                        row += "<tr class='sai-grid-input-row'>"+
                            "<td>"+line.bulan
                                +
                                "<input type='hidden' name='bulan[]' value='"+line.bulan+"' readonly class='form-control set-bulan'>"+
                            "</td>"+
                            "<td>"+
                                line.kode_akun+
                                "<input type='hidden' name='kode_akun[]' value='"+line.kode_akun+"' required readonly class='form-control set-kode_akun'>"+
                            "</td>"+
                            "<td>"+
                                line.nama_akun+
                                "<input type='hidden' name='nama_akun[]' value='"+line.nama_akun+"' readonly class='form-control set-nama'>"+
                            "</td>"+
                            "<td>"+
                                line.dc+
                                "<input type='hidden' name='dc[]' value='"+line.dc+"' required readonly class='form-control set-dc'>"+
                            "</td>"+
                            "<td>"+
                                toRp(line.nilai)+
                                "<input type='hidden' name='kode_jk[]' value='"+line.nilai+"' required readonly class='form-control set-kode_jk'>"+
                            "</td>"+
                        "</tr>";
                        no++;
                    }
                    $('#sai-grid-table-app').append(row);
                }
                
                $('#web_datatable').hide();
                $('#web_form_edit').show();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:');
        }
    });
     
  });

  $('#saiweb_container').on('submit', '#web_form_edit', function(e){
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
    
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/siaga/Siaga.php&fx=simpanApproval3',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Data '+result.message);
            if(result.status){
                location.reload();
            }
        }
    });
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

		
</script>

