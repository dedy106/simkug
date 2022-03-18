
<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];

    $kode_klp=$_SESSION['kodeMenu'];
    
    $path = "http://".$_SERVER["SERVER_NAME"]."/";

    $sql="select * from lab_konten_menu where kode_lokasi='".$kode_lokasi."' order by nu";
    $rs =  execute($sql);

    if($rs->RecordCount()){

        while ($row = $rs->FetchNextObject($toupper=false)){
            $daftar[] = (array)$row;
        }
    }else{
        $daftar[]=array();
    }

    if($daftar != null){
        echo "
                                
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-header pull-right'>
                        <a href='#' class='sai-treegrid-btn-root btn btn-default btn-sm' ><i class='fa fa-anchor'></i> Root</a>
                        <a href='#' class='sai-treegrid-btn-tb btn btn-success btn-sm' ><i class='fa fa-plus'></i> Tambah</a>
                        <a href='#' class='sai-treegrid-btn-ub btn btn-primary btn-sm' ><i class='fa fa-pencil'></i> Ubah</a>
                        <a href='#' class='sai-treegrid-btn-del btn btn-danger btn-sm'><i class='fa fa-times'></i> Hapus</a>
                    </div>
                    <div class='box-body'>
                        <table class='treegrid table' id='sai-treegrid'>
                            <tbody>
                                ";
                                    $pre_prt = 0;
                                    $parent_array = array();
                                    // node == i
                                    for($i=0; $i<count($daftar); $i++){
                                        if(!ISSET($daftar[$i-1]['level_menu'])){
                                            $prev_lv = 0;
                                        }else{
                                            $prev_lv = $daftar[$i-1]['level_menu'];
                                        }

                                        if($daftar[$i]['level_menu'] == 0){
                                            $parent_to_prt = "";
                                            $prev_prt = $i;
                                            $parent_array[$daftar[$i]['level_menu']] = $i;
                                        }else if($daftar[$i]['level_menu'] > $prev_lv){
                                            $parent_to_prt = "treegrid-parent-".($i-1);
                                            $prev_prt = $i-1;
                                            $parent_array[$daftar[$i]['level_menu']] = $i - 1;
                                        }else if($daftar[$i]['level_menu'] == $prev_lv){
                                            $parent_to_prt = "treegrid-parent-".($prev_prt);
                                        }else if($daftar[$i]['level_menu'] < $prev_lv){
                                            $parent_to_prt = "treegrid-parent-".$parent_array[$daftar[$i]['level_menu']];
                                        }

                                        echo "
                                            <tr class='treegrid-$i $parent_to_prt'>
                                                <td class='set_kd_mn'>".$daftar[$i]['kode_menu']."</td>
                                                <td class='set_nama'>".$daftar[$i]['nama']."</td>
                                                <td class='set_link'>".$daftar[$i]['link']."</td>
                                                <td class='set_jenis'>".$daftar[$i]['jenis']."</td>
                                            </tr>
                                        ";
                                    }
        echo "
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        ";
    }

?>
    <!-- <div class='row'>
        <div class='col-xs-12'>
            <div class='box'>
                <div class='box-header pull-right'>
                    <a href='#' class='sai-treegrid-btn-root btn btn-default btn-sm'><i class='fa fa-anchor'></i> Root</a>
                    <a href='#' class='sai-treegrid-btn-tb btn btn-success btn-sm' ><i class='fa fa-plus'></i> Tambah</a>
                    <a href='#' class='sai-treegrid-btn-ub btn btn-primary btn-sm' ><i class='fa fa-pencil'></i> Ubah</a>
                    <a href='#' class='sai-treegrid-btn-del btn btn-danger btn-sm'><i class='fa fa-times'></i> Hapus</a>
                </div>
                <div class='box-body'>
                    <table class='treegrid table' id='sai-treegrid'>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> -->

<div class="modal fade" id="sai-treegrid-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Setting Struktur</h4>
            </div>
            <form id="sai-treegrid-modal-form">
                <div class="modal-body">
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Kode</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='number' name='kode_menu' maxlength='5' class='form-control' readonly required id='kode-set'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Nama</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='nama' maxlength='100' class='form-control' required id='nama-set'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                        <label class='control-label col-sm-3'>Jenis</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <select class='form-control selectize' name='jenis' id='jenis-set'>
                                <option value='Fix'>Fix</option>
                                <option value='Dinamis'>Dinamis</option>
                                <option value='Induk'>Induk</option>
                            </select>    
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                        <label class='control-label col-sm-3'>Link</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <select class='form-control selectize' name='link' id='link-set'>
                                <option value='' disabled>Pilih Link</option>
                            </select>    
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Level</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='number' name='level_menu' maxlength='5' class='form-control' readonly required id='lv-set'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Urutan</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='number' name='nu' class='form-control' readonly required id='nu-set'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Kode Induk</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='number' name='kode_induk' class='form-control' readonly id='induk-set'>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Kode Klp Menu</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='kode_klp' class='form-control' readonly id='klp-set' value="<?php echo $kode_klp; ?>">
                            </div>
                        </div>
                    </div>
                    <div id='validation-box'></div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" id="tb-set-index" style='margin-right:15px;'>Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>

    function init(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/SettingMenu.php&fx=getMenu',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>','kode_klp':'<?php echo $kode_klp; ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.html !== 'undefined'){
                        $('#sai-treegrid tbody').html(result.html)
                    }
                }
            }
        });
    }

    function getLink(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/SettingMenu.php&fx=getLink',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            $('#link-set')[0].selectize.addOption([{text:result.daftar[i].id + ' - ' + result.daftar[i].nama, value:result.daftar[i].id}]);  
                           
                        }
                    }
                }
            }
        });
    }

    $(document).ready(function(){
    
        // init();
        // getLink();

        $(".treegrid, .treegrid-menu").treegrid(
            // {enableMove: true}
        );

        $('#sai-treegrid').on('click', 'tr', function(){
            $('#sai-treegrid tr').removeClass('ui-selected');
            $(this).addClass('ui-selected');

            var this_index = $(this).index();
            var this_class = $("#sai-treegrid tr:eq("+this_index+")").attr('class');
            var node_class = this_class.match(/^treegrid-[0-9]+/gm);

            var this_node = $("."+node_class).treegrid('getId');
            var this_parent = $("."+node_class).treegrid('getParent');
            var this_kode = $("."+node_class).find('.set_kd_mn').text();
            var this_lv = $("."+node_class).treegrid('getDepth');
            var this_child_amount = $("."+node_class).treegrid('getChildNodes').length;
            var this_child_branch = $("."+node_class).treegrid('getBranch').length;

            $('#kode-set').val(this_kode.concat(+this_child_amount + 1));
            $('#lv-set').val(this_lv);
            $('#nu-set').val(this_index + this_child_branch + 1);
            $('#induk-set').val(this_kode);

        });

        $('.sai-treegrid-btn-root').click(function(){
            // clear
            $('#kode-set').val('');
            $('#nama-set').val('');
            $('#link-set')[0].selectize.setValue('');
            $('#jenis-set')[0].selectize.setValue('');
            $('#induk-set').val('');

            $('#sai-treegrid tr').removeClass('ui-selected');
            var root = $('#sai-treegrid').treegrid('getRoots').length;
            // if (root == 1){
            //     var kode=root;
            // }else{
                var kode=root+1;
            // }
            // alert(root);
            $('#kode-set').val(kode);
            $('#lv-set').val(0);
            $('#nu-set').val($("#sai-treegrid tr:last").index() + 2);
            $('.del-gl-index').attr('href', '#');
            getLink();
            $('#sai-treegrid-modal').modal('show');
        });

        $('.sai-treegrid-btn-tb').click(function(){
            
            if($(".ui-selected").length != 1){
                // clear
                $('#kode-set').val('');
                $('#nama-set').val('');
                $('#link-set')[0].selectize.setValue('');
                $('#jenis-set')[0].selectize.setValue('');
                $('#induk-set').val('');
                $('#sai-treegrid tr').removeClass('ui-selected');

                // get prev code

                var root = $('#sai-treegrid').treegrid('getRoots').length;
                if (root == 1){
                    var kode=root;
                }else{
                    var kode=root+1;
                }
                $('#kode-set').val(kode);
                $('#lv-set').val(0);
                $('#nu-set').val($("#sai-treegrid tr:last").index() + 2);
                $('.del-gl-index').attr('href', '#');
            }
            getLink();
            $('#sai-treegrid-modal').modal('show');
        });

        $('.sai-treegrid-btn-del').click(function(){
            if($(".ui-selected").length != 1){
                alert('Harap pilih struktur yang akan dihapus terlebih dahulu');
                return false;
            }else{
                var sts = confirm("Apakah anda yakin ingin menghapus item ini?");
                if(sts){
                    var selected_id = $(".ui-selected").closest('tr').find('.set_kd_mn').text();
                    service_domain = '<?php echo $path; ?>';
                    lokasi = '<?php echo $kode_lokasi; ?>';
                    window.location = service_domain+"web/include_lib.php?hal=server/cms/SettingMenu.php&fx=delMenu&param="+selected_id+"&lok="+lokasi;

                }else{
                    return false;
                }
            }
        });

        $('.sai-treegrid-btn-ub').click(function(){
            if($(".ui-selected").length == 1){
                var sel_index = $(".ui-selected").closest('tr').index();
                var sel_node = $(".treegrid-"+sel_index).treegrid('getId');
                var sel_depth = $(".treegrid-"+sel_index).treegrid('getDepth');
                // alert(sel_index);
                
                var sel_class = $("#sai-treegrid tr:eq("+sel_index+")").attr('class');
                var node_class = sel_class.match(/^treegrid-[0-9]+/gm);

                var this_node = $("."+node_class).treegrid('getId');
                var this_parent = $("."+node_class).treegrid('getParent');
                var this_kode = $("."+node_class).find('.set_kd_mn').text();
                var this_nama = $("."+node_class).find('.set_nama').text();
                var this_jenis = $("."+node_class).find('.set_jenis').text();
                var this_link = $("."+node_class).find('.set_link').text();
                var this_lv = $("."+node_class).treegrid('getDepth');
                var this_child_amount = $("."+node_class).treegrid('getChildNodes').length;
                var this_child_branch = $("."+node_class).treegrid('getBranch').length;
                var this_induk = $("."+node_class).treegrid('getParent').find('.set_kd_mn').text();
            
                $('#kode-set').val(this_kode);
                $('#nama-set').val(this_nama);
                $('#link-set')[0].selectize.setValue(this_link);
                $('#jenis-set')[0].selectize.setValue(this_jenis);
                $('#lv-set').val(this_lv-1);
                $('#nu-set').val(+sel_index+1);
                $('#induk-set').val(this_induk);
                getLink();
                $('#sai-treegrid-modal').modal('show');

            }else{
                alert('Harap pilih struktur yang akan diubah terlebih dahulu');
                return false;
            }
        });
        
        $("#sai-treegrid-modal-form").on("submit", function(event){
            event.preventDefault();
            var sel_index = $(".ui-selected").closest('tr').index();
            var sel_node = $(".treegrid-"+sel_index).treegrid('getId');
            var sel_depth = $(".treegrid-"+sel_index).treegrid('getDepth');
            
            var sel_class = $("#sai-treegrid tr:eq("+sel_index+")").attr('class');
            var node_class = sel_class.match(/^treegrid-[0-9]+/gm);

            var new_node = $("#sai-treegrid tr:last").index() + 1;
            var kode_str = $('#kode-set').val();
            var nama_str = $('#nama-set').val();
            var link_str = $('#link-set')[0].selectize.getValue();
            var jenis_str = $('#jenis-set')[0].selectize.getValue();

            var nik='<?php echo $nik; ?>';
            var lokasi='<?php echo $kode_lokasi; ?>';
            var formData = new FormData(this);
            formData.append('username', nik);
            formData.append('kode_lokasi', lokasi);

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/cms/SettingMenu.php&fx=simpanMenu',
                dataType: 'json',
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(res){
                    var trow = "<tr class='treegrid-"+new_node+"'>";
                    trow += "<td class='set_kd_mn'>"+kode_str+"</td>";
                    trow += "<td class='set_nama'>"+nama_str+"</td>";
                    trow += "<td class='set_link'>"+link_str+"</td>";
                    trow += "<td class='set_jenis'>"+jenis_str+"</td>";
                    trow += "</tr>";

                    // if edit :
                    // set sel_class closest kd_mn, nama, link, jenis
                    if(!res.edit){
                        // normal insert:
                        if($('#lv-set').val() == 0){
                            $('#sai-treegrid').treegrid('add', [trow]);
                        }else{
                            $('.'+node_class).treegrid('add', [trow]);
                        }
                    }else{
                        $('.'+node_class).find('.set_kd_mn .treegrid-container').text(kode_str);
                        $('.'+node_class).find('.set_nama').text(nama_str);
                        $('.'+node_class).find('.set_link').text(link_str);
                        $('.'+node_class).find('.set_jenis').text(jenis_str);
                    }

                    $('#sai-treegrid-modal').modal('hide');
                    $('#sai-treegrid tr').removeClass('ui-selected');
                    $('#validation-box').text('');
                }
            });

        });
    
    });

</script>
