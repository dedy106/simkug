<?php 

$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_fs=$_SESSION['kode_fs'];
$res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
$periode = $res->fields[0];
$tahun = substr($periode,0,4);
$bulan = substr($periode,5,2);

$sql2 = "SELECT DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,'$tahun-$bulan-01')+1,0))";

$rs=execute($sql2);
$temp = explode(" ",$rs->fields['0']);
$tgl_akhir=$temp[0];

$kode_fs="FS1";

$tmp=explode("|",$_GET['param']);
$box=$tmp[0];

$path = "http://".$_SERVER["SERVER_NAME"]."/";	
$icon_back = $path."image/icon_back.png";
$icon_close = $path."image/icon_close.png";

?>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');


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
</style>
<div class='panel'>
	<div class='panel-body'>
        <div class='panel-heading'>
            <div class="pull-right navigasi" style="margin-right: -1rem; margin-top: ; padding-bottom: 1rem;">
                <span id="back_btn" style='cursor:pointer'><img src="<?=$icon_back?>" width="25px"></span>
                <span id="close_btn"style='cursor:pointer'><img src="<?=$icon_close?>" width="25px"></span>
            </div>
        </div>
        <div class='col-md-12'>
            <div class='box-header with-border'>
            <i class='fa fa-book'></i>
            <h3 class='box-title'>Buku Besar</h3>
            </div>
            <div class='box-body'>
                <div class='row invoice-info' style='background:#f6f6f6;margin-left:0px;margin-right:0px'>
                    <div class='col-sm-2 invoice-col'>
                        <address>
                            <strong>
                            Periode
                            </strong>
                            <br>
                            <span id="per"></span>
                        </address>
                    </div>
                    <div class='col-sm-3 invoice-col'>
                        <address style='margin-bottom:0px'>
                            <strong>
                            Tgl Awal
                            </strong>
                            <br>
                            <div class='input-group date col-sm-9' style=''>
                                <div class='input-group-addon'>
                                <i class='fa fa-calendar'></i>
                                </div>
                                <input name='tgl_awal' class='form-control' value='' id='tgl-awal'>
                            </div>
                        </address>
                    </div>
                    <div class='col-sm-3 invoice-col'>
                        <address style='margin-bottom:0px'>
                            <strong>
                            Tgl Akhir
                            </strong>
                            <br>
                            <div class='input-group date col-sm-9' style=''>
                                <div class='input-group-addon'>
                                <i class='fa fa-calendar'></i>
                                </div>
                                <input name='tgl_akhir' class='form-control' id='tgl-akhir' value=''>
                            </div>
                        </address>
                    </div>
                    <div class='col-sm-2 invoice-col'>
                        <address>
                            <strong>
                            Kode Akun
                            </strong>
                            <br>
                            <style>
                            .selectize-input{
                                border:none;
                                border-bottom:1px solid #8080806b;
                            }
                            </style>
                            <select class='form-control input-sm selectize' id='kd_akun' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                            <option value=''>Pilih Akun</option>
                            </select>
                        </address>
                    </div>
                    <div class='col-sm-2 invoice-col'>
                        <strong>
                        &nbsp;
                        </strong>
                        <address>
                        <a class='btn btn-primary' style='cursor:pointer' id='bTampil'>Tampil</a>
                        </address>
                    </div>        
                </div>
                <br>
                <div id="isiBukuBesar">
                </div>
            </div>
        </div>
    </div>
</div>
<script>
function sepNum(x){
    var num = parseFloat(x).toFixed(2);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}
function sepNumPas(x){
    var num = parseInt(x);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function toJuta(x) {
    var nil = x / 1000000;
    return sepNum(nil) + " JT";
}

function getAkun(){
    $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/generalDash.php?fx=getAkun',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#kd_akun')[0].selectize.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun}]);  
                    }
                }
            }
        }
    });
}
getAkun();


function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>','param':param},
        success:function(result){    
            if(result.status){
                switch(index){
                    case "getBukuBesar" :
                        var html="";
                        for(var i=0;i<result.daftar.length;i++){
                            var line=result.daftar[i];
                            html += `<div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                    <table class='table table-striped' id='table-BB'>
                                        <thead>
                                            <tr style='background:#247ed5;color:white'>
                                            <th width='100' height='23' >No Bukti</th>
                                            <th width='80' height='23' >No Dokumen</th>
                                            <th width='60' >Tanggal</th>
                                            <th width='250' >Keterangan</th>
                                            <th width='60' >Kode PP</th>
                                            <th width='90' >Debet</th>
                                            <th width='90' >Kredit</th>
                                            <th width='90' >Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colspan='6'>Kode Akun : `+line.kode_akun+` | `+line.nama+`</td>
                                            <td height='23' class='header_laporan' align='right'><b>Saldo Awal<b> </td>
                                            <td class='header_laporan' align='right'>`+sepNumPas(line.so_awal)+`</td>
                                        </tr>`;
                                        var detHtml ="";
                                        var saldo=line.so_awal;
                                        var debet=0;
                                        var kredit=0;
                                        for(var j=0;j<result.daftar2.length;j++){
                                            var line2 = result.daftar2[j];
                                            if(line2.kode_akun == line.kode_akun){

                                                saldo = parseInt(saldo) + parseInt(line2.debet) - parseInt(line2.kredit);	
                                                debet=debet + parseInt(line2.debet);
                                                kredit=kredit + parseInt(line2.kredit);	
                                                detHtml +=`<tr><td valign='top' >`+line2.no_bukti+`</td>
                                                <td valign='top' >`+line2.no_dokumen+`</td>
                                                <td height='23' valign='top' >`+line2.tgl+`</td>
                                                <td valign='top' >`+line2.keterangan+`</td>
                                                <td valign='top'  >`+line2.kode_pp+`</td>
                                                <td valign='top'  align='right'>`+sepNumPas(line2.debet)+`</td>
                                                <td valign='top'  align='right'>`+sepNumPas(line2.kredit)+`</td>
                                                <td valign='top'  align='right'>`+sepNumPas(saldo)+`</td>
                                                </tr>`;
                                            }
                                        }
                                        detHtml +=`
                                        <tr>
                                            <td height='23' colspan='5' valign='top'  align='right'><b>Total<b>&nbsp;</td>
                                            <td valign='top'  align='right'><b>`+sepNumPas(debet)+`</b></td>
                                            <td valign='top'  align='right'><b>`+sepNumPas(kredit)+`</b></td>
                                            <td valign='top'  align='right'><b>`+sepNumPas(saldo)+`</b></td>
                                        </tr>`;
                                        
                                    html+=detHtml+`
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;
                        }
                        $('#isiBukuBesar').html(html);
                    break;
                }
            }
        }
    });
}

function initDash(){
    loadService('getBukuBesar','GET','<?=$root_ser?>/generalDash.php?fx=getBukuBesar');
}

initDash();

$('.navigasi').on('click','#close_btn',function(){
    window.location.href='fMain.php?hal=app/testAPI/fGeneralDashboard2.php';
});
$('.navigasi').on('click','#back_btn',function(){
    window.history.go(-1); return false;
});

var from = $('#tgl-awal').datepicker({ autoclose: true,format:'yyyy-mm-dd',startDate: new Date('<?=$tahun?>-<?=$bulan?>-01'),endDate: new Date('<?=$tgl_akhir?>') }).on('changeDate', function(e){
    $('#tgl-akhir').datepicker({ autoclose: true,format:'yyyy-mm-dd'}).datepicker('setStartDate', e.date).datepicker('setEndDate',new Date('<?=$tgl_akhir?>')).focus();
});

$('.datepicker, .daterangepicker,.tgl-awal').on('keydown keyup keypress', function(e){
    e.preventDefault();
    return false;
});

$('#bTampil').click(function(){
    var akun = $('#kd_akun')[0].selectize.getValue();
    var tgl1 = $('#tgl-awal').val();
    var tgl2 = $('#tgl-akhir').val();
    
    // window.location.href='fMain.php?hal=app/testAPI/fGeneralDashboard2Det.php&param=|'+akun+'|'+tgl1+'|'+tgl2;
    loadService('getBukuBesar','GET','<?=$root_ser?>/generalDash.php?fx=getBukuBesar',akun+'|'+tgl1+'|'+tgl2);

});

$('#per').text('<?=$periode?>');

</script>