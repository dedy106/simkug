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
class server_report_saku3_dash_rptDashSiagaApp extends server_report_basic
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
        // echo $nik;

        $sqla1 = "select count(*) as jum
                from gr_pb_m 
                where progress in ('0') and kode_lokasi='$kode_lokasi'
                ";
        $sqla2 = "select count(*) as jum
                from gr_pb_m 
                where progress in ('1') and kode_lokasi='$kode_lokasi'
                ";
        $sqla3 = "select count(*) as jum
                from gr_pb_m 
                where progress in ('2') and kode_lokasi='$kode_lokasi'
                ";
        $sqla4 = "select count(*) as jum
                from gr_spb2_m 
                where kode_lokasi='$kode_lokasi'
                ";
        $sqla5 = "select count(*) as jum
                from gr_spb2_m
                where no_kas <> '-' and kode_lokasi='$kode_lokasi'
                ";
        $rsa0=$dbLib->execute($sqla1);
        $rsa1=$dbLib->execute($sqla2);
        $rsa2=$dbLib->execute($sqla3);
        $rsa3=$dbLib->execute($sqla4);
        $rsa4=$dbLib->execute($sqla5);
        
        $sqlb1 = "select count(*) as jum
                from rra_pdrk_m 
                where progress in ('8','V','D','X') and kode_lokasi='$kode_lokasi'
                ";
        $sqlb2 = "select count(*) as jum
                from rra_pdrk_m 
                where progress in ('9') and kode_lokasi='$kode_lokasi'
                ";
        $sqlb3 = "select count(*) as jum
                from rra_pdrk_m 
                where progress in ('0') and kode_lokasi='$kode_lokasi'
                ";
        $sqlb4 = "select count(*) as jum
                from rra_pdrk_m 
                where progress in ('1') and kode_lokasi='$kode_lokasi'
                ";
        $sqlb5 = "select count(*) as jum
                from rra_pdrk_m 
                where progress in ('2') and kode_lokasi='$kode_lokasi'
                ";
        $rsb0=$dbLib->execute($sqlb1);
        $rsb1=$dbLib->execute($sqlb2);
        $rsb2=$dbLib->execute($sqlb3);
        $rsb3=$dbLib->execute($sqlb4);
        $rsb4=$dbLib->execute($sqlb5);

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select top 5 * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' order by tgl_notif desc ";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Pembendaharaan 
            <div class='navbar-custom-menu pull-right padding:0px'>
            <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                    <i class='fa fa-bell-o'></i>
                    <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                    </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                echo"
                    <li>
                        <ul class='menu'>
                        <li>
                            <a href='#'>
                            <i class='fa fa-users text-aqua'></i> $row->title
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashNotifDet','','$kode_lokasi|$periode|$kode_pp|$nik|server_report_saku3_dash_rptDashSiagaApp');\">View all</a></li>
                    </ul>
                </li>
                <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:0px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </li>
                <li>
                    <a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:0px 15px 10px 10px'><i class='fa fa-gears'></i></a>
                </li>
                </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        
        $color = array('yellow', 'blue', 'purple', 'red','green');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
        $judul =array('Pengajuan','Approval VP','Approval Dir Unit','Approval RRA Anggaran','Approval Direksi');
        // while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[0]."'>
                            <div class='inner'>
                                <center>
                                    <p>Pengajuan</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa0->fields[0])."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[0]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k1');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[1]."'>
                            <div class='inner'>
                                <center>
                                    <p>Approve Anggaran</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa1->fields[0])."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[1]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[2]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi Akunting</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa2->fields[0])."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[2]."'></i></div>
                                 <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k3');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[3]."'>
                            <div class='inner'>
                                <center>
                                    <p>SPB</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa3->fields[0])."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[3]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k4');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                            <div class='small-box bg-".$color[4]."'>
                                <div class='inner'>
                                    <center>
                                        <p>Pembayaran</p>
                                        <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa4->fields[0])."</h3>
                                    </center>
                                </div>
                                <div class='icon'><i class='fa ".$icon[4]."'></i></div>
                                    <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|k5');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            </div>
                    </div>";
            $i++;
        // }

         echo"           
                </div>"; 
        echo"<div class='row'>
                <div class='col-sm-12'><h4>RRA Anggaran</h4></div>
            </div>";
        echo   "<div class='row'>";
                $i=0;
                $judul =array('Pengajuan','Approval VP','Approval Dir Unit','Approval RRA Anggaran','Approval Direksi');
                $color = array('yellow', 'blue', 'purple', 'red','green');
                $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
                // while ($row = $rsBox2->FetchNextObject($toupper=false)) {
                for ($i=0;$i<5;$i++){
                    // $nilai=$row->nilai;
        
                echo"       <div class='col-md-15 col-md-3'>
                                <div class='small-box bg-".$color[$i]."'>
                                    <div class='inner'>
                                        <center>
                                            <p>".$judul[$i]."</p>
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rsb" . $i}->fields[0],0,",",".")."</h3>
                                        </center>
                                    </div>
                                    <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|all|app$i');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                </div>
                            </div>";
                
                    // $i++;
                }
        
                 echo"           
                        </div>"; 


            echo "<aside class='control-sidebar control-sidebar-dark' style='margin-top:40px;padding-bottom:500px;padding-top:20px'>
            <div class='tab-content'>
                <div class='tab-pane active' id='control-sidebar-home-tab'>
                    <select class='form-control input-sm' id='dash_lokasi' style='margin-bottom:5px;' hidden>
                        <option value=''>Pilih Lokasi</option>";

                        $resLok = $dbLib->execute("select distinct kode_lokasi from lokasi order by kode_lokasi");
                       
                        while ($row = $resLok->FetchNextObject(false)){
                            echo " <option value=".$row->kode_lokasi.">".$row->kode_lokasi."</option>";
                        }
				
                echo"  
                    </select>
                    <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
                        <option value=''>Pilih Periode</option>";
                        $resPer = $dbLib->execute("select distinct periode from gldt where kode_lokasi='$kode_lokasi' order by periode desc");

                        while ($row = $resPer->FetchNextObject(false)){
                            echo " <option value=".$row->periode.">".$row->periode."</option>";
                        }
                        
                echo"
                    </select>
                    <a class='btn btn-sm btn-default pull-right' id='dash_refresh' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                </div>
            </div>
            </aside>";

        echo"</div>
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>

        $('#dash_lokasi').hide();

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('click', '#open-sidebar', function(){
            
            if($('aside').hasClass('control-sidebar-open')){
                 $('aside').removeClass('control-sidebar-open');
            }else{
                 $('aside').addClass('control-sidebar-open');
            }
        });


        $('#control-sidebar-home-tab').on('click','#dash_refresh', function(){
            var lokasi = $('#dash_lokasi').val();
            var periode = $('#dash_periode').val();
            // alert(lokasi);
            // if (lokasi == '' && periode ==''){
            //     alert('Harap isi terlebih dahulu lokasi dan periode nya');
            // }else{
            //     if(lokasi == ''){
            //         alert('Harap isi terlebih dahulu lokasi nya');   
            //     }else 
                if(periode == ''){
                    alert('Harap isi terlebih dahulu periode nya');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaApp','','$kode_lokasi/'+periode+'/all/$row->kode_grafik/$kode_pp/$nik/$row->nama');
                }
            // } 
           
        });
        </script>";
        echo"
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        <script>

            var OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
                OneSignal.init({
                    appId: '1ca967ab-9375-4edf-abfd-12a22fc073a5',
                });

                // OneSignal.getUserId().then(function(userId) {
                //     alert('Your OneSignal ID: '+userId);
                // });
                
                OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
                    if (isEnabled){
                        // console.log('Push notifications are enabled!');
                        // alert('enabled');
                         
                        OneSignal.getUserId().then(function(userId) {
                            // alert('OneSignal User ID:', userId);   
                            // AJAX REGISTER
                            
                            $.ajax({
                                type: 'POST',
                                url: 'dashSiaga.php?fx=saveid',
                                dataType: 'json',
                                data: {nik:'".$nik."', kode_lokasi:'".$kode_lokasi."', token:userId},
                                // contentType: false,
                                // cache: false,
                                // processData: false, 
                                success:function(result){
                                    console.log(result.msg);
                                },
                                fail: function(xhr, textStatus, errorThrown){
                                    alert('request failed:'+textStatus);
                                }
                            });
                        });
                    }
                    else{
                        console.log('Push notifications are not enabled');    
                    }  
                });
            });
        </script>";

		return "";
	}
	
}
?>
