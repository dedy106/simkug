<?php
$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_fs=$_SESSION['kode_fs'];
$res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
$periode = $res->fields[0];

$tahun = substr($periode,0,4);
$tahunSebelum = intval($tahun) - 1;
// $logomain = $path.'/web/img/yspt2.png';
// $mainname = $_SESSION['namaPP'];

$tmp=explode("/",$_GET['param']);

$kode_fs="FS1";

$sql1="select count(*) as jum from amu_lahan";
$resTanah = execute($sql1);
$sql2="select count(*) as jum from amu_gedung";
$resGedung = execute($sql2);
$sql3="select count(*) as jum from amu_gedung";
$resRecent = execute($sql3);

?>
<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
    body {
        font-family: 'Roboto', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: 'Roboto', sans-serif !important;
        font-weight: normal !important;
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
    .mar-more{
        margin-bottom:10px !important;
    }
</style>

<div class="row" style='padding-left:10px'>
    <div class="col-md-8" style='padding-left: 0px;padding-right: 0px;'>
        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick="window.location.href='fMain.php?hal=app/amu/dashAmuDet.php&param=tanah|';">
        <div class="col-md-4 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Total Tanah</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resTanah->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;</p></center>
                    </div>
                </div>
            </div>
        </div>
        </a>
        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick="window.location.href='fMain.php?hal=app/amu/dashAmuDet.php&param=gedung|';">
        <div class="col-md-4 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Total Bangunan</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resGedung->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;</p></center>
                    </div>
                </div>
            </div>
        </div>
        </a>
        <div class="col-md-4 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;">Recently Add</h3></center>
                        <center><h2 class="font-weight-bold"><?=number_format($resRecent->fields[0],0,",",".")?></h2></center>
                        <center><p style="color: #808080;">&nbsp;Asset</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 pad-more">
            <div class='box mar-more' style='box-shadow:none;border:0' id="map_dashboard">
                <a href='#' class='small-box-footer' >
                    <div class='box-header'>
                    <h3 class='box-title'>Maps</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id="map" style="width: 100%; height: 490px;"></div>
                </div>
            </div>
        </div>
        
        
    </div>
    <div class="col-md-4" style='padding-left: 0px;padding-right: 0px;'>
        <div class="col-md-12 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body" style="padding: 10px;">
                        <h3 class="font-weight-light" style="color: #000000;margin: 0px;margin-bottom:10px">Masa Berlaku Habis</h3>
                        <ul class='nav nav-custom' style='font-size:18px'>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                            <li>Nama Tanah <br><span style='color:grey;font-size:12px'> dd/mm/yy | PBB</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 pad-more">
            <div class="panel mar-more">
                <div class="card">
                    <div class="card-body" style="padding: 10px;">
                        <style>
                        .selectize-input{
                            border:none;
                            border-bottom:1px solid #8080806b;
                        }
                        </style>
                        <h3 class="font-weight-light" style="color: #000000;margin: 0px;margin-bottom:10px">Cari Data Tanah</h3>
                        <div class="row">
                            <div class="col-md-10">
                                <select class='form-control input-sm selectize' id='id_lahan' style='margin-bottom:5px;'>
                                <option value='' >Pilih Lahan</option>
                                <?php
                                    $resLok = execute("select id_lahan,nama_lahan from amu_lahan ");
                                
                                    while ($row = $resLok->FetchNextObject(false)){
                                        echo " <option value=".$row->id_lahan.">".$row->id_lahan." - ".$row->nama_lahan."</option>";
                                    }
                            
                                ?> 
                                </select>
                            </div>
                            <div class="col-md-2">
                                <span id='cari_maps' style='cursor:pointer'><i class='fa fa-search fa-lg'></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="informasi_lahan">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
            <div class="modal-header" id = "header_modal_informasi_lahan">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id = "header_modal_informasi_lahan">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#informasi_dasar" role="tab">Informasi Dasar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#pbb" role="tab">PBB</a>
                    </li>
                </ul>
                <!-- Tab panels -->
                <div class="tab-content card">
                    <!--Panel 1-->
                    <div class="tab-pane fade in active" id="informasi_dasar" role="tabpanel">
                        <br>
                        <div class="bs-example">
                            <div id="CarouselInformasi" class="carousel slide" data-ride="carousel">
                                <!-- Carousel indicators -->
                                <ol class="carousel-indicators" id = "carousel_indicators_informasi">
                                    <li data-target="#CarouselInformasi" data-slide-to="0" class="active"></li>
                                    <li data-target="#CarouselInformasi" data-slide-to="1"></li>
                                    <li data-target="#CarouselInformasi" data-slide-to="2"></li>
                                </ol>   
                                <!-- Wrapper for carousel items -->
                                <div class="carousel-inner" id = "carousel_inner_informasi">
                                    <div class="item active" style = "margin: 0 auto;">
                                        <img class="img-responsive center-block" src="http://<?php echo $_SERVER['SERVER_NAME'];?>/web/img/photo1.png">
                                    </div>
                                    <div class="item" style = "margin: 0 auto;">
                                        <img class="img-responsive center-block" src="http://<?php echo $_SERVER['SERVER_NAME'];?>/web/img/photo2.png">
                                    </div>
                                    <div class="item" style = "margin: 0 auto;">
                                        <img class="img-responsive center-block" src="http://<?php echo $_SERVER['SERVER_NAME'];?>/web/img/photo3.jpg">
                                    </div>
                                </div>
                                <!-- Carousel controls -->
                                <div id = "carousel_controls_informasi">
                                    
                                </div>
                            </div>
                        </div>
                        <br>

                        <table class="table table-bordered table-striped">
                            <thead id = 'thead_modal_informasi_lahan'>
                                
                            </thead>
                            <tbody id = 'tbody_modal_informasi_lahan'>
                                
                            </tbody>
                        </table>
                    </div>
                    <!--/.Panel 1-->
                    <!--Panel 3-->
                    <div class="tab-pane fade" id="pbb" role="tabpanel">
                        <br>
                        
                    </div>
                    <!--/.Panel 3-->
                   
                </div>
            <div class="modal-footer">
                
            </div>
            </div>
        </div>
    </div>

<script>
    function map_sebaran_aset_reg_gsd(data_filter, filter_dashboard){
        if(filter_dashboard == "nasional"){
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: -1.154499, lng: parseFloat(116.430086) },
                styles: [
                    {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }] 
                    }
                  ]
            });
        }else{
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: {lat: parseFloat(data_filter[0].COOR_Y), lng: parseFloat(data_filter[0].COOR_X) },
                styles: [
                    {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }] 
                    }
                  ]
            });
        }
        marker_coordinate = [];
        // console.log(data_filter);
        for(i=0;i<data_filter.length;i++){
            var marker = new google.maps.Marker({
                position: {lat: parseFloat(data_filter[i].COOR_Y), lng: parseFloat(data_filter[i].COOR_X) },
                icon: 'http://gis.simkug.com/assets/img/gis_img/locationIconRed.png',
                map: map
            });

            marker_coordinate.push(marker);                             

            var data_gsd = data_filter[i];

            (function (marker, data_gsd) {
                google.maps.event.addListener(marker, "click", function (e) {
                    modal_peta_nasional_data_gsd(data_gsd);
                    map.setZoom(12);
                    map.panTo(this.getPosition());
                });
            })(marker, data_gsd);
        }
    }

    function cari_lahan(param){
        $.ajax({
            url: 'include_lib.php?hal=server/amu/Aset.php&fx=getMapsCari',
            data: {'kode_lokasi':'','id_lahan':param},
            type: "post",
            dataType: "json",
            success: function (data) {
                var mapOptions = {
                center: new google.maps.LatLng(-2.2459632,116.2409634),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }; 
                var infoWindow = new google.maps.InfoWindow();
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
               
                var data2 = data.hasil[0];
                var latnya = data2.coor_x;
                var longnya = data2.coor_y;
                
                var myLatlng = new google.maps.LatLng(latnya, longnya);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: data2.alamat,
                    icon:'http://gis.simkug.com/assets/img/gis_img/locationIconRed.png'
                });

                map.setCenter(marker.getPosition());

                (function (marker, data2) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        // infoWindow.setContent('<div id=\'lokasi\'><b>Lokasi</b> :' + data2.alamat + '<br></div>');
                        modal_info_lahan(data2);
                        infoWindow.open(map, marker);
                    });
                })(marker, data2);
                
                
            }
        });
    }

    function init_map_sebaran_Aset() {
        window.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(-1.154499, 116.430086),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();
    }

    function modal_info_lahan(data){
        
        $('#header_modal_informasi_lahan').html(`<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">`+ data.nama_lahan +`<small> #`+ data.id_lahan +` `+ data.alamat +` </small></h4>`
        );
        
        $('#thead_modal_informasi_lahan').html(
            '<tr style="background-color: red;color:#ffffff;">'+
            '<th>ID AREAL</th>'+
            '<th>'+ data.id_lahan+'</th>'+
            '</tr>'
        );
        
        $('#tbody_modal_informasi_lahan').html(
            '<tr>'+
            '<td>Koordinat</td>'+
            '<td>'+ data.coor_y +', '+ data.coor_x +'</td>'+
            '</tr>'+	
            '<tr>'+
            '<td>Alamat</td>'+
            '<td>'+ data.alamat +'</td>'+
            '</tr>'+
            
            '<tr>'+
            '<td>Kelurahan</td>'+
            '<td>'+ data.desa +'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Kecamatan</td>'+
            '<td>'+ data.kecamatan +'</td>'+
            '</tr>'+
            
            '<tr>'+
            '<td>Kota</td>'+
            '<td>'+ data.kota +'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Provinsi</td>'+
            '<td>'+ data.provinsi+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Status Kepemilikan</td>'+
            '<td>'+ data.atas_nama +'</td>'+
            '</tr>'
        );
        
        // if(typeof data.img_lahan === 'undefined' || !data.img_lahan){
        //     var foto_aset = '/img/gis_img/telkom-gbr-tkd-sedia.png';
        // }else{
        //     var foto_aset = data.img_lahan[0].FILE_PATH;
        // }
        

        // $('#carousel_inner_informasi').html(''); 
        // $('#carousel_indicators_informasi').html('');
        // if (data.img_lahan != null){
        //     for(i=0; i<data.img_lahan.length; i++){
        //         if(i==0){
        //             $('#carousel_indicators_informasi').append(
        //                 '<li data-target="#CarouselInformasi" data-slide-to="'+ i +'" class="active"></li>'
        //             );
        //         }else{
        //             $('#carousel_indicators_informasi').append(
        //                 '<li data-target="#CarouselInformasi" data-slide-to="'+ i +'"></li>'
        //             );
        //         }
        //     }
            
        //     for(i=0; i<data.img_lahan.length; i++){
        //         if(i==0){
        //             $('#carousel_inner_informasi').append(
        //                 '<div class="item active" style = "height:401px;margin: 0 auto;">'+
        //                 '<img class="img-responsive center-block" src="http://gis.simkug.com/assets'+ data.img_lahan[i].FILE_PATH +'">'+
        //                 '</div>'
        //             );
        //         }else{
        //             $('#carousel_inner_informasi').append(
        //                 '<div class="item" style = "height:401px;margin: 0 auto;">'+
        //                 '<img class="img-responsive center-block" src="http://gis.simkug.com/assets'+ data.img_lahan[i].FILE_PATH +'">'+
        //                 '</div>'
        //             );
        //         }
        //     }
            
        //     $('#carousel_controls_informasi').html(
        //         '<a class="carousel-control left" href="#CarouselInformasi" data-slide="prev">'+
        //         '<span class="glyphicon glyphicon-chevron-left"></span>'+
        //         '</a>'+
        //         '<a class="carousel-control right" href="#CarouselInformasi" data-slide="next">'+
        //         '<span class="glyphicon glyphicon-chevron-right"></span>'+
        //         '</a>'
        //     );
        // }
        

        $('#pbb').html('');
        if (data.pbb != null){
            for(i=0; i<data.pbb.length; i++){
                $('#pbb').append(
                    '<table class="table table-bordered table-striped">'+
                    '<thead>'+
                    '<tr style="background-color: red;color:#ffffff;">'+
                    '<th>CFA NDP : </th>'+
                    '<th>'+ data.pbb[i].nop +'</th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    '<tr>'+
                    '<td>Tahun</td>'+
                    '<td>'+ data.pbb[i].tahun +'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Luas Bumi (m2) </td>'+
                    '<td>'+ sepNum(data.pbb[i].luas_lahan_bumi) +'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>NJOP Bumi (Rp/m2)</td>'+
                    '<td>'+ sepNum(data.pbb[i].njop_bumi) +'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Kelas Bumi</td>'+
                    '<td> '+ data.pbb[i].kelas_bumi +' </td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Total NJOP Bumi (Rp) </td>'+
                    '<td>'+ sepNum(data.pbb[i].total_njop_bumi) +'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Total NJOP (Rp) </td>'+
                    '<td>  </td>'+
                    '</tr>'+
                    '</tbody>'+
                    '</table>'
                );
            }
        }    
        $('#informasi_lahan').modal('show');
    }

    function tampil(){
        $.ajax({
            url: 'include_lib.php?hal=server/amu/Aset.php&fx=getMaps',
            data: {'kode_lokasi':''},
            type: "post",
            dataType: "json",
            success: function (data) {
                var mapOptions = {
                center: new google.maps.LatLng(-2.2459632,116.2409634),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }; 
                var infoWindow = new google.maps.InfoWindow();
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                for (i = 0; i < data.hasil.length; i++) {
                    var data2 = data.hasil[i];
                    var latnya = data2.coor_x;
                    var longnya = data2.coor_y;
                    
                    var myLatlng = new google.maps.LatLng(latnya, longnya);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: data2.alamat,
                        icon:'http://gis.simkug.com/assets/img/gis_img/locationIconRed.png'
                    });
                    (function (marker, data2) {
                        google.maps.event.addListener(marker, "click", function (e) {
                            modal_info_lahan(data2);
                            infoWindow.open(map, marker);
                        });
                    })(marker, data2);
                }
            }
        });
    }

    tampil();

    $('#cari_maps').click(function(){
        var id = $('#id_lahan').val();
        if(id == ""){
            tampil();
        }else{
            cari_lahan(id);
        }
        
    });


	</script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwdyiC2sZ3B1O2nMdhUy6Z0ljoK3gbA_U&callback=init_map_sebaran_Aset&libraries=places">
	</script>
