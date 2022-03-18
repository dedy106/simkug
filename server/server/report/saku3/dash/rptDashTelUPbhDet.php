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


function toJuta($x) {
    $nil = $x / 1000000;
    return number_format($nil,2,",",".") . " JT";
}
class server_report_saku3_dash_rptDashTelUPbhDet extends server_report_basic
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
        
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $box=$tmp[5];

        $kode_fs="FS1";

        $path = "http://".$_SERVER["SERVER_NAME"]."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

        
        $root_ser = $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        echo"
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
        .box-wh{
            box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
            border-radius: 15px;
        }
        .timeline2 {
            position: relative;
            margin: 0 0 30px 0;
            padding: 0;
            list-style: none;
        }
        .timeline2:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #ddd;
            left: 31px;
            margin: 0;
            border-radius: 2px;
        }
        .timeline2 > li {
            position: relative;
            margin-right: 10px;
            margin-bottom: 15px;
        }
        .timeline2 > li:after {
            clear: both;
        }
        .timeline2 > li > .timeline2-item {
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            margin-top: 0;
            background: #fff;
            color: #444;
            margin-left: 60px;
            margin-right: 15px;
            padding: 0;
            position: relative;
            box-shadow: none;
        }
        .timeline2 > li > .timeline2-item > .time {
            color: #999;
            float: right;
            padding: 10px;
            font-size: 12px;
        }
        .timeline2 > li > .timeline2-item > .timeline2-header {
            margin: 0;
            color: #555;
            border-bottom: 1px solid #f4f4f4;
            padding: 10px;
            font-size: 16px;
            line-height: 1.1;
        }
        .timeline2 > li > .timeline2-item > .timeline2-header > a {
            font-weight: 600;
        }
        .timeline2 > li > .timeline2-item > .timeline2-body,
        .timeline2 > li > .timeline2-item > .timeline2-footer {
            padding: 10px;
        }
        .timeline2 > li > .fa,
        .timeline2 > li > .glyphicon,
        .timeline2 > li > .ion {
            width: 30px;
            height: 30px;
            font-size: 15px;
            line-height: 30px;
            position: absolute;
            color: #666;
            background: #d2d6de;
            border-radius: 50%;
            text-align: center;
            left: 18px;
            top: 0;
        }
        .timeline2 > .time-label > span {
            font-weight: 600;
            padding: 5px;
            display: inline-block;
            background-color: #fff;
            border-radius: 4px;
        }
        .timeline2-inverse > li > .timeline2-item {
            background: #f0f0f0;
            border: 1px solid #ddd;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .timeline2-inverse > li > .timeline2-item > .timeline2-header {
            border-bottom-color: #ddd;
        }
        .timeline2-body{
            border: 1px solid #0073b7;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            border-top-right-radius: 20px;
        }

        </style>
        <div class='panel'>
            <div class='panel-body'>
                <div class='panel-heading'>
                    <div class='pull-right navigasi' style='margin-right: -1rem; margin-top: ; padding-bottom: 1rem;'>
                        <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                        <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                        <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                    </div>
                </div>";
        switch($box) {
            case 'piu' :
                echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <center>
                            <h3>Daftar Piutang Mahasiswa</h3>
                            <h4>Periode s/d tahun ajaran</h4>
                        </center>
                        <br>
                        <table class='table no-border table-striped' id='tablePiu'>
                            <thead class='bg-red'>
                                <tr>
                                    <th>NO</th>
                                    <th>NIM</th>
                                    <th>Nama</th>
                                    <th>Tahun Ajaran</th>
                                    <th>Jurusan</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                ";
            break;
            case 'aju' :
                echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <center>
                            <h3>Daftar Pengajuan Pembendaharaan</h3>
                        </center>
                        <br>
                        <table class='table no-border table-striped' id='tableAju'>
                            <thead class='bg-red'>
                                <tr>
                                    <th>NO</th>
                                    <th>Tanggal</th>
                                    <th>No Bukti</th>
                                    <th>Jenis</th>
                                    <th>Deskripsi</th>
                                    <th>Nilai</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                ";
            break;
            case 'detTrans' :
            echo "
            <div class='row'>
                <div class='col-md-12'>
                    <h3 style='padding-left:15px;margin-bottom:20px'>Rincian Transaksi Pembendaharaan</h3>
                    <div class='col-md-6 pad-more'>
                        <div class='panel mar-mor box-wh''>
                            <div class='card'>
                                <div class='card-body'>
                                <center>
                                <h3 class='font-weight-light' style='color: #000000;margin-bottom:10px'>BBN-0719-00005</h3>
                                </center>
                                <p style='padding-left:10px'>&nbsp;MTA</p>
                                <p style='padding-left:10px'>&nbsp;DRK</p>
                                <p style='padding-left:10px'>&nbsp;Nilai</p>
                                <p style='padding-left:10px'>&nbsp;Keterangan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 pad-more'>
                        <ul class='timeline2'>
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    10 Feb. 2014
                                </span>
                            </li>
                            <li>
                                <i class='fa fa-check bg-green'></i>
                                <div class='timeline2-item '>
                                    <span class='time'>Pembayaran</span>
                                    <h3 class='timeline2-header'>&nbsp;</h3>
                                    <div class='timeline2-body bg-blue'>
                                        ...
                                        Content goes here
                                    </div>
                                </div>
                            </li>
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    10 Feb. 2014
                                </span>
                            </li>
                            <li>
                                <i class='fa fa-close bg-red'></i>
                                <div class='timeline2-item '>
                                    <span class='time'>SPB</span>
                                    <h3 class='timeline2-header'>&nbsp;</h3>
                                    <div class='timeline2-body bg-blue'>
                                        ...
                                        Content goes here
                                    </div>
                                </div>
                            </li>
                            <li>
                                <i class='fa fa-clock-o bg-gray'></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>";

            break;
        }
        echo"
            </div>
        </div>
        <script>
            $('.navigasi').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbh','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
            });
            $('.navigasi').on('click','#back_btn',function(){
                // alert('test');
                window.history.go(-1); return false;
            });
            $('.navigasi').on('click','#refresh_btn',function(){
                location.reload();
            });
            $('.panel').on('click', '#btn-refresh', function(){
                location.reload();
            });


            function sepNum(x){
                var num = parseFloat(x).toFixed(2);
                var parts = num.toString().split('.');
                var len = num.toString().length;
                // parts[1] = parts[1]/(Math.pow(10, len));
                parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                return parts.join(',');
            }
            function sepNumPas(x){
                var num = parseInt(x);
                var parts = num.toString().split('.');
                var len = num.toString().length;
                // parts[1] = parts[1]/(Math.pow(10, len));
                parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                return parts.join(',');
            }

            function toJuta(x) {
                var nil = x / 1000000;
                return sepNum(nil) + ' JT';
            }

            function loadService(index,method,url,param=null){
                $.ajax({
                    type: method,
                    url: url,
                    dataType: 'json',
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'totPiu':
                                    $('#totPiu').text(toJuta(result.data.n4));
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('totPiu','GET','$root_ser/dashTelUPbh.php?fx=getTotalPiu');         
            }

            initDash();
        </script>";
		return "";
	}
	
}
?>
