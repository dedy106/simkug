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
class server_report_saku3_dash_rptDashSis extends server_report_basic
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

        // $sql="select kode_pp from sis_siswa where nis='$nik'";
        // $rs = $dbLib->execute($sql);  
        // $row = $rs->FetchNextObject($toupper=false);
        // $kode_pp=$row->kode_pp;
        
        // $sqlBox = "select a.nis , a.tot_bill, isnull(b.tot_byr,0) as tot_byr, a.tot_bill-isnull(b.tot_byr,0) as tot_piu 
        // from ( select a.nis,sum(a.nilai) as tot_bill,a.periode,a.kode_lokasi,a.kode_pp
        //         from sis_bill_d a
        //         where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' and a.nis='$nik'
        //         group by a.nis,a.periode,a.kode_lokasi,a.kode_pp ) a
        // left join (select a.nis,sum(a.nilai) as tot_byr,a.periode,a.kode_lokasi,a.kode_pp
        //             from sis_rekon_d a
        //             where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' and a.nis='$nik'
        //             group by a.nis,a.periode,a.kode_lokasi,a.kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp and a.nis=b.nis        
        // ";

        // $rs = $dbLib->execute($sqlBox);  
        // $row = $rs->FetchNextObject($toupper=false);

        $nil= array($row->tot_bill,$row->tot_byr,$row->tot_piu,0);

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $bp = $path . "image/inv2.png";
        $keu = $path . "image/keu.jpg";
        $kldr = $path . "image/kldr.png";
        $kldr2 = $path . "image/kldr2.jpg";
        $absen = $path . "image/absen.png";
        $nil = $path . "image/nilai.png";
        $notifikasi= $path . "image/notif.png";
        $dok = $path . "image/dok.png";
        $user = $path . "image/user2.png";
        $pres = $path . "image/prestasi.png";
        $raport = $path . "image/raport.png";

        $eskul = $path . "image/eskul.png";
        // $foto = $path . "image/wallpaper/Forest.jpg";

		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
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
            <!-- USERS LIST -->
                <div class='box' style='border-top:white'>
                    <div class='box-body no-padding'>
                    <ul class='users-list clearfix'>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/bp/$kode_pp/$nik/');\" ><img src='$bp' width='80px' alt='User Image'><br>
                            Buku Penghubung</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;'  onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/keu/$kode_pp/$nik/');\"><img src='$keu' width='80px'  alt='User Image'><br>
                            Keuangan</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/ka/$kode_pp/$nik/');\"><img src='$kldr' width='80px'  alt='User Image'><br>
                            Kalender Akademik</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/abs/$kode_pp/$nik/');\"><img src='$absen' width='80px' alt='User Image'><br>
                            Absensi</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/nil/$kode_pp/$nik/');\"><img src='$nil' width='80px' alt='User Image'><br>
                            Nilai</a>
                        </li> 
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/kld/$kode_pp/$nik/');\"><img src='$kldr2' width='80px' alt='User Image'><br>
                            Kalender</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/prestasi/$kode_pp/$nik/');\"><img src='$pres' width='80px' alt='User Image'><br>
                            Prestasi</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/raport/$kode_pp/$nik/');\"><img src='$raport' width='80px' alt='User Image'><br>
                            Raport</a>
                        </li>
                        <li width='120px'>
                            <a class='users-list-name' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/ekskul/$kode_pp/$nik/');\"><img src='$eskul' width='80px' alt='User Image'><br>
                            Ekstrakulikuler</a>
                        </li>
                    
                    </ul>
                    <!-- /.users-list -->
                    </div>
                </div>
                <!--/.box -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
        <div class='row'>
            <!-- /.col -->
         <div class='col-md-12'>
            <div class='box-header with-border'>
                <h3 class='box-title'>News</h3>                      
                <div class='box-tools pull-right'>
                    <a type='button' class='btn btn-box-tool' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDet','','$kode_lokasi/$periode/all/news/$kode_pp/$nik/');\" > See More
                    </a>
                </div>
            </div>";

            $sql="select top 6 no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

            $rs = $dbLib->execute($sql);  
            while ($row = $rs->FetchNextObject($toupper=false)){
                $foto= $path . "server/media/".$row->file_dok;
         echo "
            <a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSisDetNews','','$kode_lokasi/$periode/$kode_pp/$nik/$row->no_konten/news');\" >
            <div class='col-md-12 col-md-2'>
                <!-- Widget: user widget style 1 -->
                <div class='box box-widget widget-user'>
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    
                        <div class='widget-user-header bg-black' style='background: url($foto) center center;'>
                            <h3 class='widget-user-username'></h3>
                            <h5 class='widget-user-desc'></h5>
                        </div>
                        
                        <div class='box-footer'>
                            
                            <h5 class='description-header'>$row->judul</h5>
                            
                            <span class='description-text'>$row->tgl</span>  
                        
                        </div>
                    
                    <!-- /.widget-user -->
                </div>
            </div> 
            </a>
            ";

            }
            
   echo"     </div>
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

                $sql="select no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten_dok where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

                $rs2 = $dbLib->execute($sql); 
                // $row2 = $rs2->FetchNextObject($toupper=false);
                // $konten= $row2->no_konten;

                // if(empty($konten)){
                //     $cek=FALSE;
                // }else{
                //     $cek=TRUE;
                // }

                // if ($cek){
                    while ($row2 = $rs2->FetchNextObject(false)){
                        echo"
                            <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                                <div class='box-comment'>
                                <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$dok' alt='User Image'>
                                <div class='comment-text' style='margin-left: 60px;'>
                                        <span class='username'>
                                        $row2->judul
                                        <span class='text-muted pull-right'>$row2->tgl<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                        </span><!-- /.username -->
                                        
                                </div>
                                </div>
                            </div>
                            ";
                    }
                // }

            
            echo"
                </div>
                <div class='tab-pane' id='tab_4'>
                    <div class='box box-primary'>
                        <div class='box-body box-profile'>
                            <div>
                                <img class='profile-user-img img-responsive img-circle' src='$user' alt='User profile picture' style='width: 80px;margin: 10px;'>
                                <h3 class='profile-username' style='margin-left: 105px;margin-bottom: 0px;margin-top: -80px;'>RANGGA AZHAR FAUZAN</h3>
                                <p class='text-muted' style='margin-left: 105px;margin-bottom: 40px;'>20177687</p>
                            </div>
        
                            <ul class='list-group list-group-unbordered'>
                                <li class='list-group-item'>
                                <b>Angkatan</b> <br>
                                <a>2017/2018</a>
                                </li>
                                <li class='list-group-item'>
                                <b>Kelas</b><br> <a>XI 9 TKJ</a>
                                </li>
                                <li class='list-group-item'>
                                <b>Jurusan</b><br><a>Teknik Komputer Jaringan</a>
                                </li>
                                <li class='list-group-item'>
                                <b>Tingkat</b><br> <a>SMK Tingkat 02</a>
                                </li>
                                <li class='list-group-item'>
                                <b>Status</b><br> <a>Aktif dalam kegiatan belajar mengajar</a>
                                </li>
                                <li class='list-group-item'>
                                <b>Tanggal Lulus</b><br> <a>-</a>
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
