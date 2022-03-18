<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $sql="select kode_gudang from brg_gudang where kode_lokasi='$kode_lokasi' ";
    $rs=execute($sql);
    $gudang=$rs->fields[0];
?>
<div class="row">
    <div class="col-md-12">
        <div class="box box-default" id="sai-rpt-filter-box">
            <div class="box-header with-border">
                <h3 class="box-title"><i class="fa fa-file-text-o"></i> Laporan Penjualan</h3>
                <div class="box-tools pull-right">
                    <a class="sai-btn-circle" id="sai-rpt-prev-page" title="Back"><i class="fa fa-arrow-circle-left"></i> 
                    </a>
                    <a class="sai-btn-circle" id="sai-rpt-export-excel" title="Excel"><i class="fa fa-file-excel-o"></i>
                    </a>
                    <a class="sai-btn-circle" id="sai-rpt-print" title="Print"><i class="fa fa-print"></i>
                    </a>
                    <a class="sai-btn-circle" data-widget="collapse"><i class="fa fa-minus"></i>
                    </a>
                </div>
            </div>
            <div class="box-body" style="">
                <div class="row">
                    <div class="col-md-12">
                        <form id="web-LapPnj-form" class="">
                        <div class="row sai-rpt-filter-entry-row">
                            <div class="form-group">
                                <div class="col-xs-4">
                                    <p class="sai-rpt-filter-entry-row-par" hidden="">gudang</p>
                                    Gudang
                                </div>
                                <div class="col-xs-2">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <select name="gudang[]" class="form-control sai-rpt-filter-type" required="">
                                                <option value="exact" selected="">=</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-from">
                                        <div class="col-xs-12">
                                            <input type="text" name="gudang[]" class="form-control" id="gudang_from" value="<?php echo $gudang; ?>" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-to" hidden="">    
                                        <div class="col-xs-12">
                                            <input type="text" name="gudang[]" class="form-control" id="gudang_to" value="<?php echo $gudang; ?>" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sai-rpt-filter-entry-row">
                            <div class="form-group">
                                <div class="col-xs-4">
                                    <p class="sai-rpt-filter-entry-row-par" hidden="">kasir</p>
                                    Kasir
                                </div>
                                <div class="col-xs-2">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <select name="kasir[]" class="form-control sai-rpt-filter-type" required="">
                                                <option value="exact" selected="">=</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-from">
                                        <div class="col-xs-12">
                                            <input type="text" name="kasir[]" class="form-control" id="kasir_from" value="<?php echo $nik; ?>" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-to" hidden="">    
                                        <div class="col-xs-12">
                                            <input type="text" name="kasir[]" class="form-control" id="kasir_to" value="<?php echo $nik; ?>" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sai-rpt-filter-entry-row">
                            <div class="form-group">
                                <div class="col-xs-4">
                                    <p class="sai-rpt-filter-entry-row-par" hidden="">periode</p>
                                    Periode
                                </div>
                                <div class="col-xs-2">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <select name="periode[]" class="form-control sai-rpt-filter-type" required="">
                                                <option value="exact" selected="">=</option><option value="all">All</option><option value="range">Range</option><option value="none">none</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-from">  
                                        <div class="col-xs-12">
                                            <select name="periode[]" class="form-control sai-rpt-filter-selectize periode_from selectize" tabindex="-1" style="display: none;">
                                            <?php 
                                                $sql="select periode from trans_m where kode_lokasi='$kode_lokasi' and form='BRGJUAL' ";
                                                $rs1=execute($sql);
                                                while($row = $rs1->FetchNextObject($toupper)){
                                                    echo"<option value='$row->periode' >$row->periode</option>";
                                                }
                                            ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-to" hidden="">
                                        <div class="col-xs-12">
                                            <select name="periode[]" class="form-control sai-rpt-filter-selectize periode_to selectize" tabindex="-1" style="display: none;">
                                            <?php 
                                                $sql="select periode from trans_m where kode_lokasi='$kode_lokasi' and form='BRGJUAL' ";
                                                $rs1=execute($sql);
                                                while($row = $rs1->FetchNextObject($toupper)){
                                                    echo"<option value='$row->periode' >$row->periode</option>";
                                                }
                                            ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row sai-rpt-filter-entry-row">
                            <div class="form-group">
                                <div class="col-xs-4">
                                    <p class="sai-rpt-filter-entry-row-par" hidden="">no_bukti</p>
                                    No Bukti
                                </div>
                                <div class="col-xs-2">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <select name="no_bukti[]" class="form-control sai-rpt-filter-type" required="">
                                                <option value="all" selected="">All</option><option value="range">Range</option><option value="exact">=</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-from" hidden="">
                                        <div class="col-xs-10">
                                            <input type="text" name="no_bukti[]" class="form-control" id="no_bukti_from" value="">
                                        </div>
                                        <div class="col-xs-2">
                                            <a class="sai-btn-circle">
                                                <i class="fa fa-search sai-rpt-data-list-search"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="row sai-rpt-filter-to" hidden="">
                                        <div class="col-xs-10">
                                            <input type="text" name="no_bukti[]" class="form-control" id="no_bukti_to" value="">
                                        </div>
                                        <div class="col-xs-2">
                                            <a class="sai-btn-circle">
                                                <i class="fa fa-search sai-rpt-data-list-search"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-8">
                                <button type="submit" class="btn btn-primary" style="margin-left: 6px;"><i class="fa fa-search"></i> Preview</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class='row'>
            <div class="col-md-12 ">
            <p id="sai-rpt-active-page-number" hidden="">0</p>
            <p id="sai-rpt-number-of-page" hidden="">5</p>
            <div id="sai-rpt-filter-box-result-page-1"></div>
            <div id="sai-rpt-filter-box-result-page-2" hidden=""></div>
            <div id="sai-rpt-filter-box-result-page-3" hidden=""></div>
            <div id="sai-rpt-filter-box-result-page-4" hidden=""></div>
            <div id="sai-rpt-filter-box-result-page-5" hidden="">
            </div>
            </div>
        </div>
    </div>
</div>
<div class='modal fade' id='sai-rpt-data-list-modal' tabindex='-1' role='dialog' aria-hidden='true'>
    <div class='modal-dialog' role='document' style='min-width:700px;'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span></button>
                <h4 class='modal-title'>Report Data List</h4>
            </div>
            <div class='modal-body'>
                <div style='overflow-y: auto; max-height: 600px; overflow-x:hidden; padding-right:10px;' id='sai-rpt-data-list-modal-body'>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">

    function sepNum(x){
        if (typeof x === 'undefined' || !x) { 
            return 0;
        }else{
            if(x < 0){
                var x = parseFloat(x).toFixed(0);
            }
            
            var parts = x.toString().split(",");
            parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,"$1.");
            return parts.join(".");
        }
    }

    function saiPost(post_url, cancel_url, formData, table_refresh_target_id, success_callback, failed_callback, clear){
    if (typeof clear === 'undefined') { clear = true; }
    if (typeof table_refresh_target_id === 'undefined') { table_refresh_target_id = null; }
    if (typeof success_callback === 'undefined') { success_callback = null; }
    if (typeof failed_callback === 'undefined') { failed_callback = null; }
    var status = true;
    $.ajax({
        url: post_url,
        data: formData,
        type: "post",
        dataType: "json",
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false, 
        success: function (data) {
            if(data.auth_status == 1){
                if(typeof data.alert !== 'undefined'){
                    alert("Auth success : "+data.alert);
                }
                
                if(success_callback != null){
                    success_callback(data);
                }else{
                    if(data.status == 1){
                        // clear input dan validation box jika berhasil
                        if(table_refresh_target_id != null){
                            $(table_refresh_target_id).DataTable().ajax.reload();
                        }
                        
                        if(clear){
                            // if(confirm('Bersihkan input?')){
                            clearInput();
                            // }
                        }
    
                        if(data.edit){
                            if(cancel_url == null){
                                location.reload();
                            }else{
                                window.location = cancel_url;
                            }
                            // for(i = 0; i < $('.selectize').length; i++){
                            //     $('.selectize')[i].selectize.setValue('');
                            //     alert($('.selectize')[i].selectize.getValue());
                            //     if selectize.length == null ?
                            // }
                        }else{
                            $('.nav-tabs a[href="#sai-container-daftar"]').tab('show');
                        }
                    }
                }

                if(failed_callback != null){
                    failed_callback(data);
                }else{
                    if (data.status == 3){
                        // https://stackoverflow.com/a/26166303
                        var error_array = Object.keys(data.error_input).map(function (key) { return data.error_input[key]; });
    
                        // append input element error
                        var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                        for(i = 0; i<error_array.length; i++){
                            error_list += '<li>'+error_array[i]+'</li>';
                        }
                        error_list += "</ul></div>";
                        $('#validation-box').html(error_list);
                    }
                }
            }else{
                alert("Auth Failed : "+data.error);
            }
        }
    });
}

    $('#sai-rpt-prev-page').click(function(){
        var active_page = $('#sai-rpt-active-page-number').text();

        if(+active_page > 1){
            // show hide
            $('#sai-rpt-filter-box-result-page-'+ active_page).hide();
            $('#sai-rpt-filter-box-result-page-'+ (+active_page  - 1) ).show();
            $('#sai-rpt-active-page-number').text((+active_page - 1));
        }else{
            return false;
        }
    })

    $('#ajax-content-section').on('click','.web-print-nota',function(){
        // $('#sai-rpt-table-export').printThis();
        // alert('test');
        var kode = $(this).closest('tr').find('td:eq(1)').text();
        window.location.href='fMain.php?hal=app/kasir/fNota.php&param='+kode;
    });
    
    $('#sai-rpt-filter-box').boxWidget({
        animationSpeed: 500,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus'
    });
    
    $('#ajax-content-section').on('click', '.sai-rpt-data-list-modal-body-jsonTable-action', function(){
        var val = $(this).closest('tr').find('td:nth-child(1)').text();
        $('#'+target).val(val);
        $('#sai-rpt-data-list-modal').modal('hide');
    });

    $('#ajax-content-section').on('change', '.sai-rpt-filter-type', function(){
        var val = $(this).val();
        if(val == 'all'){
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-from').hide();
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-to').hide();
        }else if(val == 'exact'){
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-from').show();
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-to').hide();
        }else{
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-from').show();
            $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-to').show();
        }
        // alert(val);
    });

    function resetRptPage(){
        var active_page = $('#sai-rpt-active-page-number').text();
        var number_of_page = $('#sai-rpt-number-of-page').text();

        for(i=number_of_page; i>1; i--){
            $('#sai-rpt-filter-box-result-page-' + i).hide();
        }

        $('#sai-rpt-active-page-number').text(0);
    }

function drawRptPage(html, table_id){
    if(typeof table_id == 'undefined'){table_id = null}
    // console.log(table_id);

    var active_page = $('#sai-rpt-active-page-number').text();
    var number_of_page = $('#sai-rpt-number-of-page').text();

    // console.log('active : ' + active_page);
    if(+active_page == 0){
        // $('#sai-rpt-filter-box-result-page-2').hide();
        $('#sai-rpt-filter-box-result-page-1').html(html);
        $('#sai-rpt-filter-box-result-page-1').show();
        $('#sai-rpt-active-page-number').text(1);
        // console.log('target : 0');
    }else if((+active_page + 1) <= +number_of_page){
        $('#sai-rpt-filter-box-result-page-' + active_page).hide();
        $('#sai-rpt-filter-box-result-page-' + (+active_page + 1)).html(html);
        $('#sai-rpt-filter-box-result-page-' + (+active_page + 1)).show();
        $('#sai-rpt-active-page-number').text((+active_page + 1));
        // console.log('target : ' + (+active_page + 1));
    }else{
        // $('#sai-rpt-filter-box-result-page-2').hide();
        $('#sai-rpt-filter-box-result-page-1').html(html);
        $('#sai-rpt-filter-box-result-page-1').show();
        $('#sai-rpt-active-page-number').text(1);
        // console.log('target : 1');
    }
    
    // if(table_id != null){
    //     exportable(table_id, 'documents', ['xlsx'], {'xlsx':'#sai-rpt-export-excel'});
    //     $('#sai-rpt-print').click(function(){
    //         $('#'+table_id).printThis();
    //     });
    // }
}

function drawLapPNJ(formData){
       
       saiPost('include_lib.php?hal=server/kasir/POS.php&fx=getLapPNJ', null, formData, null, function(data){
           if(data.result.length > 0){
            //    $('#sai-rpt-filter-box').boxWidget('toggle');

               var mon_html = "<div align='center'>";
               var arr_tl = [0,0,0,0,0,0,0,0,0];
               var x=1;
                   mon_html +=
                       "<table width='800' border='0' cellspacing='2' cellpadding='1' id='sai-rpt-table-export-tbl-daftar-pnj'>"+ 
                       "<tr>"+
                           "<td align='center' class='style16'><b>DKM</b></td>"+
                       "</tr>"+
                       "<tr>"+
                           "<td align='center' class='style16'><b>LAPORAN PENJUALAN</b></td>"+
                       "</tr>"+
                       "<tr>"+
                           "<td align='center' class='style16'>"+data.periode+" </td>"+
                       "</tr>"+
                       "<tr>"+
                           "<td>&nbsp;</td>"+
                       "</tr>"+
                       "<tr>"+
                           "<td align='center'>";
                   mon_html+="<table width='800' border='0' cellspacing='2' cellpadding='1'>"+
                           "<tr>"+
                           "<td>"+
                      "<table class='table table-bordered table-striped'>"+
                      "<tr bgcolor='#CCCCCC'>"+
                       "<thead>"+
                        "<th width='20'  class='header_laporan' align='center'>No</th>"+
                        "<th width='80' class='header_laporan' align='center'>No Bukti</th>"+
                        "<th width='50' class='header_laporan' align='center'>Tanggal</th>"+
                        "<th width='70' class='header_laporan' align='center'>Periode </th>"+
                        "<th width='40' class='header_laporan' align='center'>Kasir</th>"+
                        "<th width='250' class='header_laporan' align='center'>Keterangan</th>"+
                        "<th width='80' class='header_laporan' align='center'>Nilai</th>"+
                        "<th width='80' class='header_laporan' align='center'>Cetak Nota</th>"+
                        "</thead>"+
                       "</tr>";
                       var arr_tl2 = [0,0,0,0,0,0,0,0,0,0,0,0,0];
                       var no=1;
                       var detail='';
                       var nilai=0;
                       tmp="";
                       first = true;
                       for(a=0; a<data.result.length; a++){

                               nilai+= +data.result[a].nilai;
                               nNilai=sepNum(nilai);

                               detail+="<tr>"+
                               "<td valign='middle' class='isi_laporan' align='center'>"+x+"</td>"+
                               "<td valign='middle' class='isi_laporan'>"+data.result[a].no_bukti+"</td>"
                               +
                               "<td valign='middle' class='isi_laporan'>"+data.result[a].tanggal+"</td>"+
                               "<td height='20' valign='middle' class='isi_laporan'>"+data.result[a].periode+"</td>"+
                               "<td valign='middle' class='isi_laporan'>"+data.result[a].nik_user+"</td>"+
                               "<td valign='middle' class='isi_laporan'>"+data.result[a].keterangan+"</td>"+
                               "<td valign='middle' class='isi_laporan'><div align='right' >"+sepNum(data.result[a].nilai)+"</td>"+
                               "<td valign='middle' class='isi_laporan'><a role='button' class='sai-btn-circle web-print-nota'><i class='fa fa-print'></i></a></td>"+
                           "</tr>"; 
                               
                               first=true;
                               x++;

                           
                       } 
                       mon_html+=detail+"<tr>"+
                           "<td height='25' colspan='6' align='right'  class='header_laporan'><b>Sub Total</b></td>"+
                           "<td class='header_laporan' class='header_laporan' align='right'><b>"+nNilai+"</b></td>"+
                       "</tr>";
                       mon_html+="</table>"+
                       " </td>"+
                    "</tr>"+
                    "</table>"; 
               
               mon_html+="</div>"; 
               
               drawRptPage(mon_html, 'sai-rpt-table-export-tbl-daftar-pnj');  
           }
  
       });
   }

    $('#ajax-content-section').on('submit', '#web-LapPnj-form', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        // formData.append('api_key', localStorage.api_key);
        var kode_lokasi='<?php echo $kode_lokasi; ?>';
        var nik='<?php echo $nik; ?>';
        formData.append('kode_lokasi', kode_lokasi);
        formData.append('nik', nik);
        resetRptPage();
        drawLapPNJ(formData);
        $('#sai-rpt-filter-box').boxWidget('toggle');
    });

    $('#ajax-content-section').on('click', '.sai-rpt-data-list-search', function(){
        var par = $(this).closest('.sai-rpt-filter-entry-row').find('.sai-rpt-filter-entry-row-par').text();
        target = $(this).closest('.row').find('input').attr('id');

        var kode_lokasi='<?php echo $kode_lokasi; ?>';
        var nik='<?php echo $nik; ?>';
       
        var post_data = {'username':nik, 'kode_lokasi':kode_lokasi}
        var modul = '';
        var header = [];

        switch(par){
            case 'no_bukti': 
                header = ['No Bukti','Keterangan']
            break;
        }

        var header_html = '';
        for(i=0; i<header.length; i++){
            header_html +=  "<th>"+header[i]+"</th>";
        }
        header_html +=  "<th></th>";

        var table = "<table class='table table-bordered table-striped' id='sai-rpt-data-list-modal-body-jsonTable'><thead><tr>"+header_html+"</tr></thead>";
        table += "<tbody></tbody></table>";

        post_data.parameter = par;
        post_data.periode=$('.periode_from').val();

        $('#sai-rpt-data-list-modal-body').html(table);

        var datatable = $("#sai-rpt-data-list-modal-body-jsonTable").DataTable({
            // fixedHeader: true,
            "scrollY": "300px",
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": 'include_lib.php?hal=server/kasir/POS.php&fx=getDataList',
                "data": post_data,
                "type": "POST",
                "dataSrc" : function(json) {
                    return json.data_list;
                }
            },
            "columnDefs": [{"targets": -1, "data": null, "defaultContent": "<a class='sai-btn-circle sai-rpt-data-list-modal-body-jsonTable-action'><i class='fa fa-check'></i></a>", "orderable": false}],
            "iDisplayLength": 25,
        });

        $('#sai-rpt-data-list-modal').modal('show');
        
        datatable.columns.adjust().draw();
    });
</script>
   