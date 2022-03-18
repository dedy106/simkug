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
class server_report_saku3_dash_rptDashSppdM extends server_report_basic
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

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $app = $path . "image/approve.png";
        $his = $path . "image/his.png";
        $mon = $path . "image/monitor2.ico";
        $notifikasi= $path . "image/notif.png";
        $dok = $path . "image/dok.png";
        $user = $path . "image/user2.png";
        // $foto = $path . "image/wallpaper/Forest.jpg";

		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
                <div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'>
                    <li class='dropdown notifications-menu'>
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
                                <i class='fa fa-users text-aqua'></i> $row->pesan
                                </a>
                            </li>
                            </ul>
                        </li>
                        ";
                    }
                
                echo"
                        <li class='footer'><a href='#'>View all</a></li>
                        </ul>    
                    </li>
                    ";
        
                echo"
                        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </ul>
                </div>
            </div>
            <div class='panel-body'> 
                <div class='nav-tabs-custom'>
                    <ul class='nav nav-tabs'>
                        <li class='active'><a href='#tab_1' data-toggle='tab'>Home</a></li>
                        <li><a href='#tab_2' data-toggle='tab'>Notifikasi</a></li>
                        <li><a href='#tab_3' data-toggle='tab'>Dokumen</a></li>
                        <li><a href='#tab_4' data-toggle='tab'>Akun</a></li>
                    </ul>
                    <div class='tab-content'>
                        <div class='tab-pane active' id='tab_1'> "; 
                            echo"
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='box' style='border-top:white'>
                                        <div class='box-body no-padding'>
                                            <ul class='users-list clearfix'>
                                                <li width='120px'>
                                                    <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet','','$kode_lokasi/$periode/all/app/$kode_pp/$nik/');\" ><img src='$app' width='80px' alt='User Image'><br>
                                                    Approval</a>
                                                </li>
                                                <li width='120px'>
                                                    <a class='users-list-name' style='cursor:pointer;'  onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet','','$kode_lokasi/$periode/all/his/$kode_pp/$nik/');\"><img src='$his' width='80px'  alt='User Image'><br>
                                                    History Approval</a>
                                                </li>
                                                <li width='120px'>
                                                    <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet','','$kode_lokasi/$periode/all/mon/$kode_pp/$nik/');\"><img src='$mon' width='80px'  alt='User Image'><br>
                                                    Monitoring</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='box-header with-border'>
                                        <h3 class='box-title'>News</h3>                      
                                        <div class='box-tools pull-right'>
                                            <a type='button' class='btn btn-box-tool' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet','','$kode_lokasi/$periode/all/news/$kode_pp/$nik/');\" > See More
                                            </a>
                                        </div>
                                    </div>";

                                    // $sql="select top 6 no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from lab_konten  ";

                                    // $rs = $dbLib->execute($sql);  
                                    // while ($row = $rs->FetchNextObject($toupper=false))
                                    // {
                                    //     $foto= $path . "server/media/".$row->file_dok;
                                    // echo "
                                    //     <a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDetNews','','$kode_lokasi/$periode/$kode_pp/$nik/$row->no_konten/news');\" >
                                    //     <div class='col-md-12 col-md-2'>
                                    //         <div class='box box-widget widget-user'>
                                    //             <div class='widget-user-header bg-black' style='background: url($foto) center center;'>
                                    //                 <h3 class='widget-user-username'></h3>
                                    //                 <h5 class='widget-user-desc'></h5>
                                    //             </div>
                                    //             <div class='box-footer'>
                                    //                 <h5 class='description-header'>$row->judul</h5>
                                    //                 <span class='description-text'>$row->tgl</span>  
                                    //             </div>
                                    //         </div>
                                    //     </div> 
                                    //     </a>
                                    //     ";
                                    // }
                    echo"       </div>
                            </div>
                            ";
                    echo"</div>
                        <div class='tab-pane' id='tab_2'>                   
                            <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$notifikasi' alt='User Image'>
                                    <div class='comment-text' style='margin-left: 60px;'>
                                            <span class='username'>
                                            Judul Notifikasi
                                            <span class='text-muted pull-right'>12-02-2019<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                            </span><!-- /.username -->
                                            Notif (unread) ...
                                    </div>
                                </div>
                            </div>
                            <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$notifikasi' alt='User Image'>
                                    <div class='comment-text' style='margin-left: 60px;'>
                                            <span class='username'>
                                            Judul Notifikasi
                                            <span class='text-muted pull-right'>12-02-2019<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                            </span><!-- /.username -->
                                            Notif (unread) ...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='tab-pane' id='tab_3'>";

                        // $sql="select no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten_dok where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

                        // $rs2 = $dbLib->execute($sql); 
                       
                       
                            // while ($row2 = $rs2->FetchNextObject(false)){
                            //     echo"
                            //         <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                            //             <div class='box-comment'>
                            //             <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$dok' alt='User Image'>
                            //             <div class='comment-text' style='margin-left: 60px;'>
                            //                     <span class='username'>
                            //                     $row2->judul
                            //                     <span class='text-muted pull-right'>$row2->tgl<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                            //                     </span><!-- /.username -->
                                                
                            //             </div>
                            //             </div>
                            //         </div>
                            //         ";
                            // }
                    echo"
                        </div>
                        <div class='tab-pane' id='tab_4'>
                            <div class='box box-primary'>
                                <div class='box-body box-profile'>";
                                $sql="select*from karyawan where nik='$nik' and kode_lokasi='$kode_lokasi' ";
                                $rsp=$dbLib->execute($sql);
                                $rowp=$rsp->FetchNextObject(false);
                                echo"
                                    <div>
                                        <img class='profile-user-img img-responsive img-circle' src='$user' alt='User profile picture' style='width: 80px;margin: 10px;'>
                                        <h3 class='profile-username' style='margin-left: 105px;margin-bottom: 0px;margin-top: -80px;'>$rowp->nama</h3>
                                        <p class='text-muted' style='margin-left: 105px;margin-bottom: 40px;'>$rowp->nik</p>
                                    </div>
                                    <ul class='list-group list-group-unbordered'>
                                        <li class='list-group-item'>
                                        <b>Jabatan</b> <br>
                                        <a>$rowp->jabatan</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Kode PP</b><br> <a>$rowp->kode_pp</a>
                                        </li>
                                    </ul>
                                    <a href='#' class='btn btn-success '><b>Edit Profile</b></a>
                                    <a href='#' class='btn btn-danger  '><b>Logout</b></a>
                                </div>
                            </div>
                        </div>
                    </div>";
            echo"</div>
            </div>
        </div>";

		echo "
        <script type='text/javascript'>

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        </script>";

		return "";
	}
	
}
?>
