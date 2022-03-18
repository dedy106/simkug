<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_yspt_rptUploadGjPP extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;				
        $_SESSION['kodePP'] = $kode_pp;
        $_SESSION['lokasi'] = $kode_lokasi;

        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/yspt";
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
      
    echo "
      <div id='loading-overlay' style='background: rgba(233, 233, 233, 0.34) none repeat scroll 0% 0%; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;'>
          <center>
              <img src='$link/image/stackspinner.gif' style='position:fixed; top: 50%; transform: translateY(-50%);'>
          </center>
      </div>";
      echo"
        <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        body,label {
          font-family: 'Roboto', sans-serif !important;
          font-size:12px !important;
        }
        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
          font-family: 'Roboto', sans-serif !important;
          font-weight: normal !important;
        }
        h3{
          margin-bottom: 5px;
          font-size:18px !important
        }
        h2{
          margin-bottom: 5px;
          margin-top:5px;
        }
        .judul-box{
          font-weight:bold;
          font-size:18px !important;
        }
        .inner{
          padding:5px !important;
        }
        
        .box-nil{
          margin-bottom: 20px !important;
        }
        
        .pad-more{
          padding-left:0px !important;
          padding-right:10px !important;
        }
        .mar-mor{
          margin-bottom:10px !important;
        }
        .box-wh{
          box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
        }
        #ajax-content-section{
          background: white !important;
        }
        th{
          vertical-align: middle !important; 
        }
        .badge-success{
            background:#00a65a;
        }
        .badge-danger{
            background:#dd4b39;
        }
        .form-control{
            font-size:12px !important;
            height:30px !important;
        }
        label{
            font-size:12px !important;
            font-weight:unset;
        }
        .selectize-dropdown-content{
            background:white;
        }
        #search-kirim {
           cursor:pointer;
        }
        </style>
          <div id='nw_container'>
            <form id='nw_form_insert'>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12' style='margin-bottom: 10px;box-shadow: 0px 0px 1px white;border-bottom: 1px solid #ece7e7;'>
                      <button class='btn btn-success disabled pull-right btn-sm' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' disabled=''><i class='fa fa-plus-circle'></i> Save</button>
                      <button type='button' class='btn btn-primary disabled pull-right btn-sm' style='margin-bottom: 10px;' id='validate' disabled=''><i class='fa fa-plus-circle'></i> Validate</button>
                    </div>
                    <div class='col-md-12'>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Tanggal</label>
                                <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <div class='input-group date'>
                                        <div class='input-group-addon'>
                                        <i class='fa fa-calendar'></i>
                                        </div>
                                        <input name='tanggal' class='form-control datepicker-dmy' id='tanggal' value='".date('d-m-Y')."'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label for='no_bukti' class='control-label col-sm-3'>No Bukti</label>
                                <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <input type='text' class='form-control' id='no_bukti' name='no_bukti' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row' style='margin-bottom: 5px;'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Tak Kirim</label>
                                <div class='col-sm-3'> 
                                  <div class='input-group' style=''>
                                      <input type='text' placeholder='No Kirim' aria-describedby='search-kirim' name='no_kirim' id='no_kirim' class='form-control '>
                                      <span class='input-group-addon' id='search-kirim'><i class='fa fa-search'></i></span>
                                  </div>
                              </div>
                              <div class='col-sm-6' style='padding: 0;'>
                                <label id='label_no_kirim' style='margin-top: 5px;' class='control-label'></label>
                              </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label for='no_bukti' class='control-label col-sm-3'>Deskripsi</label>
                                <div class='col-sm-5' style='margin-bottom:5px;'>
                                    <input type='text' class='form-control' id='deskripsi' name='deskripsi'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>File</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input name='file_dok' type='file' id='file_dok'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- Datatable -->
            <div id='nw_datatable'>
                <div class='row'>
                    <div class='col-xs-12'>
                    <style>/* NAV TABS */
                    .nav-tabs-custom2 {
                      margin-bottom: 20px;
                      background: #fff;
                      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                      border-radius: 3px;
                    }
                    .nav-tabs-custom2 > .nav-tabs {
                      margin: 0;
                      border-bottom-color: #f4f4f4;
                      border-top-right-radius: 3px;
                      border-top-left-radius: 3px;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li {
                      border-top: 3px solid transparent;
                      margin-bottom: -2px;
                      margin-right: 1px;
                      background:#cdcdcd
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.disabled > a {
                      color: #777;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li > a {
                      color: #444;
                      border-radius: 0;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li > a.text-muted {
                      color: #999;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li > a,
                    .nav-tabs-custom2 > .nav-tabs > li > a:hover {
                      background: transparent;
                      margin: 0;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li > a:hover {
                      color: #999;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:hover,
                    .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:focus,
                    .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:active {
                      border-color: transparent;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.active {
                      border-top-color: #3c8dbc;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.active > a,
                    .nav-tabs-custom2 > .nav-tabs > li.active:hover > a {
                      background-color: #fff;
                      color: #444;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.active > a {
                      border-top-color: transparent;
                      border-left-color: #f4f4f4;
                      border-right-color: #f4f4f4;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li:first-of-type {
                      margin-left: 0;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li:first-of-type.active > a {
                      border-left-color: transparent;
                    }
                    .nav-tabs-custom2 > .nav-tabs.pull-right {
                      float: none !important;
                    }
                    .nav-tabs-custom2 > .nav-tabs.pull-right > li {
                      float: right;
                    }
                    .nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type {
                      margin-right: 0;
                    }
                    .nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type > a {
                      border-left-width: 1px;
                    }
                    .nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type.active > a {
                      border-left-color: #f4f4f4;
                      border-right-color: transparent;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.header {
                      line-height: 35px;
                      padding: 0 10px;
                      font-size: 20px;
                      color: #444;
                    }
                    .nav-tabs-custom2 > .nav-tabs > li.header > .fa,
                    .nav-tabs-custom2 > .nav-tabs > li.header > .glyphicon,
                    .nav-tabs-custom2 > .nav-tabs > li.header > .ion {
                      margin-right: 5px;
                    }
                    .nav-tabs-custom2 > .tab-content {
                      background: #fff;
                      padding: 10px;
                      border-bottom-right-radius: 3px;
                      border-bottom-left-radius: 3px;
                    }
                    .nav-tabs-custom2 .dropdown.open > a:active,
                    .nav-tabs-custom2 .dropdown.open > a:focus {
                      background: transparent;
                      color: #999;
                    }
                    .nav-tabs-custom2.tab-primary > .nav-tabs > li.active {
                      border-top-color: #3c8dbc;
                    }
                    .nav-tabs-custom2.tab-info > .nav-tabs > li.active {
                      border-top-color: #00c0ef;
                    }
                    .nav-tabs-custom2.tab-danger > .nav-tabs > li.active {
                      border-top-color: #dd4b39;
                    }
                    .nav-tabs-custom2.tab-warning > .nav-tabs > li.active {
                      border-top-color: #f39c12;
                    }
                    .nav-tabs-custom2.tab-success > .nav-tabs > li.active {
                      border-top-color: #00a65a;
                    }
                    .nav-tabs-custom2.tab-default > .nav-tabs > li.active {
                      border-top-color: #d2d6de;
                    }</style>
                      <div class='nav-tabs-custom2'>
                          <ul class='nav nav-tabs'>
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data Gaji</a></li>
                            <li class=''><a href='#tab_3' data-toggle='tab' aria-expanded='false'>Controlling</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Error Msg</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x' style='width=75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-data' style='font-size: 12px;width:100%'>
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Kode PP</th>
                                      <th>GADAS</th>
                                      <th>TUDAS</th>
                                      <th>TUPOS</th>
                                      <th>TUHAL</th>
                                      <th>LMBR</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_3'>
                              <div class='sai-container-overflow-x' style='width=75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-agg' style='font-size: 12px;width:100%'>
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th width='15%' >Kode Akun</th>
                                      <th width='15%'>Kode PP</th>
                                      <th width='15%'>Kode DRK</th>
                                      <th width='15%'>Saldo Awal</th>
                                      <th width='15%'>Nilai</th>
                                      <th width='15%'>Saldo Akhir</th>
                                      <th width='10%'>Status</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_2'>
                            <div class='sai-container-overflow-x'>
                                <table class='table table-bordered table-striped Datatable' id='table-error' style='font-size:12px' style='width:100%'>
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th width='120px'>ID Invalid</th>
                                      <th width='400px'>Pesan</th>
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
                </div>
            </div>
            <div class='modal fade' tabindex='-1' role='dialog' id='modal-search'>
              <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                  <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                    <h4 class='modal-title'></h4>
                  </div>
                  <div class='modal-body'>
                  </div>
                </div><!-- /.modal-content -->
              </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
          </div>
          <script type='text/javascript'>

            function showFilter(param,target1,target2){
                var par = param;
                var modul = '';
                var header = [];
                var target1 = target1;
                var target2 = target2;
                var target3 = '';
                var target4 = '';
                var parameter = {};
                switch(par){
                    case 'no_kirim': 
                        header = ['No Tak Kirim', 'Keterangan'];
                        width = ['30%', '60%'];
                    var toUrl = '$root_ser/UploadGjPP.php?fx=getTakKirim';
                        var columns = [
                            { data: 'no_kirim' },
                            { data: 'keterangan' }
                        ];

                        var judul = 'Daftar Tak Kirim';
                        var jTarget1 = 'val';
                        var jTarget2 = 'text';
                        target1 = '#'+target1;
                        target2 = '#'+target2;
                    break;
                }
        
                var header_html = '';
                for(i=0; i<header.length; i++){
                    header_html +=  '<th style=\"width:'+width[i]+'\">'+header[i]+'</th>';
                }
                header_html +=  '<th style=\"width:10%\"></th>';
        
                var table = '<table class=\"table table-bordered table-striped\" width=\"100%\" id=\"table-search\"><thead><tr>'+header_html+'</tr></thead>';
                table += '<tbody></tbody></table>';
        
                $('#modal-search .modal-body').html(table);
        
                var searchTable = $('#table-search').DataTable({
                    'ajax': {
                        'url': toUrl,
                        'data': parameter,
                        'type': 'GET',
                        'async': false,
                        'dataSrc' : function(json) {
                            return json.daftar;
                        }
                    },
                    'columnDefs': [{
                        'targets': header.length, 'data': null, 'defaultContent': '<a class=\"check-item\"><i class=\"fa fa-check\"></i></a>','width':'10%'
                    },{
                      'width': '30%', 'targets': 0 
                    },{
                      'width': '60%', 'targets': 1
                    }],
                    'columns': columns
                });
        
                // searchTable.$('tr.selected').removeClass('selected');
                $('#table-search tbody').find('tr:first').addClass('selected');
                $('#modal-search .modal-title').html(judul);
                $('#modal-search').modal('show');
                searchTable.columns.adjust().draw();
        
                $('#table-search').on('click','.check-item',function(){
                    var kode = $(this).closest('tr').find('td:nth-child(1)').text();
                    var nama = $(this).closest('tr').find('td:nth-child(2)').text();
                    if(jTarget1 == 'val'){
                        $(target1).val(kode);
                        $(target1).trigger('change');
                    }else{
                        $(target1).text(kode);
                    }
        
                    if(jTarget2 == 'val'){
                        $(target2).val(nama);
                        $(target2).trigger('change');
                    }else{
                        $(target2).text(nama);
                    }
        
                    if(target3 != ''){
                        var value = $(this).closest('tr').find('td:nth-child(3)').text();
                        if(jTarget3 == 'val'){
                            $(target3).val(value);
                            $(target3).trigger('change');
                        }else{
                            $(target3).text(value);
                        }
                    }
                    if(target4 != ''){
                        
                        var value = $(this).closest('tr').find('td:nth-child(4)').text();
                        if(jTarget4 == 'val'){
                            $(target4).val(value);
                            $(target4).trigger('change');
                        }else{
                            $(target4).text(value);
                        }
                    }
                    $('#modal-search').modal('hide');
                });
        
                $('#table-search tbody').on('dblclick','tr',function(){
                    console.log('dblclick');
                    var kode = $(this).closest('tr').find('td:nth-child(1)').text();
                    var nama = $(this).closest('tr').find('td:nth-child(2)').text();
                    if(jTarget1 == 'val'){
                        $(target1).val(kode);
                        $(target1).trigger('change');
                    }else{
                        $(target1).text(kode);
                    }

                    if(jTarget2 == 'val'){
                        $(target2).val(nama);
                        $(target2).trigger('change');
                    }else{
                        $(target2).text(nama);
                    }
        
                    if(target3 != ''){
                        
                        var value = $(this).closest('tr').find('td:nth-child(3)').text();
                        if(jTarget3 == 'val'){
                            $(target3).val(value);
                            $(target3).trigger('change');
                        }else{
                            $(target3).text(value);
                        }
                    }
                    if(target4 != ''){
                        
                        var value = $(this).closest('tr').find('td:nth-child(4)').text();
                        if(jTarget4 == 'val'){
                            $(target4).val(value);
                            $(target4).trigger('change');
                        }else{
                            $(target4).text(value);
                        }
                    }
                    $('#modal-search').modal('hide');
                });
        
                $('#table-search tbody').on('click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        searchTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
        
                $(document).keydown(function(e) {
                    if (e.keyCode == 40){ //arrow down
                        var tr = searchTable.$('tr.selected');
                        tr.removeClass('selected');
                        tr.next().addClass('selected');
                        // tr = searchTable.$('tr.selected');
        
                    }
                    if (e.keyCode == 38){ //arrow up
                        
                        var tr = searchTable.$('tr.selected');
                        searchTable.$('tr.selected').removeClass('selected');
                        tr.prev().addClass('selected');
                        // tr = searchTable.$('tr.selected');
        
                    }
        
                    if (e.keyCode == 13){
                        var kode = $(this).closest('tr').find('td:nth-child(1)').text();
                        var nama = $(this).closest('tr').find('td:nth-child(2)').text();
                        if(jTarget1 == 'val'){
                            $(target1).val(kode);
                            $(target1).trigger('change');
                        }else{
                            $(target1).text(kode);
                        }
        
                        if(jTarget2 == 'val'){
                            $(target2).val(nama);
                            $(target2).trigger('change');
                        }else{
                            $(target2).text(nama);
                        }
        
                        if(target3 != ''){
                        
                            var value = $(this).closest('tr').find('td:nth-child(3)').text();
                            if(jTarget3 == 'val'){
                                $(target3).val(value);
                                $(target3).trigger('change');
                            }else{
                                $(target3).text(value);
                            }
                        }
                        if(target4 != ''){
                            
                            var value = $(this).closest('tr').find('td:nth-child(4)').text();
                            if(jTarget4 == 'val'){
                                $(target4).val(value);
                                $(target4).trigger('change');
                            }else{
                                $(target4).text(value);
                            }
                        }
                        $('#modal-search').modal('hide');
                    }
                })
            }
    

            function clearTmp(){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/UploadGjPP.php?fx=clearTmp',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi'},
                    success:function(result){  
                        if(result.status){
                            console.log('clear tmp '+result.status);
                        }
                    }
                });
            }

            function generateNoBukti(tanggal = null){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/UploadGjPP.php?fx=generateNoBukti',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi','tanggal':tanggal},
                    success:function(result){  
                        if(result.status){
                            $('#no_bukti').val(result.no_bukti);
                        }
                    }
                });
            }
        
            generateNoBukti();
            clearTmp();

            var dataTable = $('#table-data').DataTable({
            // 'processing': true,
            // 'serverSide': true,
            'ajax': {
                'url': '$root_ser/UploadGjPP.php?fx=getDataTmp',
                'data': {'kode_lokasi':'$kode_lokasi'},
                'type': 'GET',
                'dataSrc' : function(json) {
                    return json.data;   
                }
            },
            'columnDefs': [
                {
                    'targets': [1,2,3,4,5],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 0, '' )
                }
            ],
            columns: [
                { data: 'kode_pp' },
                { data: 'gadas' },
                { data: 'tudas' },
                { data: 'tupos' },
                { data: 'tuhal' },
                { data: 'lmbr' }
            ]
        });
    
        var table_agg = $('#table-agg').DataTable({
            data : [],
            columns: [
                { data: 'kode_akun' },
                { data: 'kode_pp' },
                { data: 'kode_drk' },
                { data: 'so_awal' },
                { data: 'nilai' },
                { data: 'so_akhir' }
            ],
            'columnDefs': [
                {
                    'targets': [3,4,5],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 0, '' )
                },
                {
                    'targets': 6,
                    'data': null,
                    'className': 'text-center',
                    'render': function ( data, type, row, meta ) {
                      if(row.status == '1'){
                        return \"<a href='#' title='Not OK' class='badge badge-danger'><i class='fa fa-times'></i></a>\";
                          
                      }else{
                        return \"<a href='#' title='OK' class='badge badge-success'><i class='fa fa-check'></i></a>\";
                      }
                    }
                }
            ]
        });
        $('#table-error').DataTable();

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

        var iconloading = $('#loading-overlay');

          $('#nw_container').on('submit', '#nw_form_insert', function(e){
            e.preventDefault();
            iconloading.show();
            var formData = new FormData(this);
            
            for(var pair of formData.entries()) {
              console.log(pair[0]+ ', '+ pair[1]); 
            }
            var kode_lokasi = '$kode_lokasi';
            formData.append('kode_lokasi',kode_lokasi);
            
            $.ajax({
              type: 'POST',
              url: '$root_ser/UploadGjPP.php?fx=simpanDataTmp',
              dataType: 'json',
              data: formData,
              contentType: false,
              cache: false,
              processData: false, 
              success:function(result){
                alert('Input data '+result.message);
                if(result.status){
                  dataTable.ajax.reload();
                  $('#table-error tbody').html('');
                  $('#validate').removeClass('disabled');
                  $('#validate').prop('disabled', false);
                  iconloading.hide();
                }else{
                    var html ='';
                    for(var i=0;i< result.error_ins.length;i++){
                        html +=`<tr>
                          <td>`+result.error_ins[i].no_invoice+`</td>
                          <td>`+result.error_ins[i].err_msg+`</td>
                        </tr>`;
                    }
                    console.log(html);
                    $('#table-error tbody').html(html);
                    $('.nav-tabs a[href=\"#tab_2\"]').tab('show');
                    iconloading.hide();
                }
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            });
          });

          $('#tanggal').on('change', function() {
              var tanggal = $('#tanggal').val();
              generateNoBukti(tanggal);
          });

          $('#nw_container').on('click', '#saveBtn', function(e){
            e.preventDefault();
            var tanggal = $('#tanggal').val();
            var deskripsi = $('#deskripsi').val();
            var no_bukti = $('#no_bukti').val();
            var no_kirim = $('#no_kirim').val();
            var data = table_agg.data();
            var status = true;            
            // $.each( data, function( key, value ) {
            //     if(value.so_akhir < 0){
            //         status = false;
            //     }
            // });

            // if(!status){
            //     alert('Data saldo akhir anggaran tidak boleh minus!');
            //     $('.nav-tabs a[href=\"#tab_3\"]').tab('show');
            //     return false;
            // }

            iconloading.show();
            $.ajax({
                type: 'POST',
                url: '$root_ser/UploadGjPP.php?fx=simpanData',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','tanggal':tanggal,'deskripsi':deskripsi,'no_bukti':no_bukti,'no_kirim':no_kirim},
                success:function(result){
                    alert('Input data '+result.message);
                    if(result.status){
                        dataTable.ajax.reload();
                        table_agg.clear().draw();
                        $('#table-error tbody').html('');
                        $('#saveBtn').addClass('disabled');
                        $('#saveBtn').prop('disabled', true);
                        $('#validate').addClass('disabled');
                        $('#validate').prop('disabled', true);
                        
                        $('.nav-tabs a[href=\"#tab_1\"]').tab('show');
                    }
                },
                fail: function(xhr, textStatus, errorThrown){
                    alert('request failed:'+textStatus);
                }
            });
            iconloading.hide();
          });

          $('#nw_container').on('click', '#validate', function(e){
            e.preventDefault();
            var tanggal = $('#tanggal').val();
            var deskripsi = $('#deskripsi').val();
            var no_bukti = $('#no_bukti').val();
            iconloading.show();
                $.ajax({
                    type: 'POST',
                    url: '$root_ser/UploadGjPP.php?fx=validasi',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi','tanggal':tanggal,'deskripsi':deskripsi,'no_bukti':no_bukti},
                    success:function(result){
                        alert('Validasi '+result.message);
                        if(result.status){
                            table_agg.clear().draw();
                            table_agg.rows.add(result.data).draw(false);
                            $('#saveBtn').removeClass('disabled');
                            $('#saveBtn').prop('disabled', false);
                            $('.nav-tabs a[href=\"#tab_3\"]').tab('show');
                        }
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
            iconloading.hide();
          });

          $('#file_dok').change(function(e){
              $('#nw_form_insert').submit();
          });

          $('#search-kirim').on('click', function() {
              var par = $(this).closest('.row').find('input').attr('name');
              var par2 = 'label_'+par;
              showFilter(par,par,par2);
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
