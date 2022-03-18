<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    
    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $app1 = $path . "image/approve.png";
    $app2 = $path . "image/approve.png";
    $app3 = $path . "image/approve.png";
    $app4 = $path . "image/approve.png";

    $sql3="select top 6 a.id, convert(varchar,tanggal,103) as tgl, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar , c.file_type 
    from lab_konten a 
    left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
    left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
    where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' 
    order by tanggal desc ";
    $rs3 = execute($sql3);
 
	echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                                <ul class='users-list clearfix'>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApproval2.php' ><img src='$app1' width='80px' alt='User Image'><br>
                                        Approval VP</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;'  href='fMain.php?hal=app/siaga/fApproval3.php'><img src='$app2' width='80px'  alt='User Image'><br>
                                        Approve Dir Unit</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApproval.php'><img src='$app3' width='80px'  alt='User Image'><br>
                                        Approve RRA Anggaran</a>
                                    </li>
                                    <li style='width:50%'>
                                        <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/siaga/fApprovalDir.php' ><img src='$app4' width='80px' alt='User Image'><br>
                                        Approve RRA Direksi</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>";
                echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Info</h3>                      
                            <div class='box-tools pull-right'>
                                <a type='button' class='btn btn-box-tool' style='cursor:pointer;' href='fMain.php?hal=app/rtrw/dashSiswaDet.php&param=all/news'> See More
                                </a>
                            </div>
                        </div>
                        <div class='box-body'>";

                        while ($row = $rs3->FetchNextObject($toupper=false)){
                            $foto= $path."server/media/".$row->file_dok;
                        echo "
                            <a style='cursor:pointer;' href='fMain.php?hal=app/siaga/dashSiagaNews.php&param=$row->id/news'>
                            <div class='col-md-12 col-md-2'>
                                <div class='box box-widget widget-user'>
                                    <div class='widget-user-header bg-black' style='background: url($foto) center center;'>
                                        <h3 class='widget-user-username'></h3>
                                        <h5 class='widget-user-desc'></h5>
                                    </div>
                                    <div class='box-footer'>
                                        <h5 class='description-header'>$row->judul</h5>
                                        <span class='description-text'>$row->tgl</span>
                                    </div>
                                </div>
                            </div> 
                            </a>
                            ";
                        }

                        echo"
                        </div>";            
        echo"       </div> 
                </div> ";
                echo"               
            </div>
       </div>";     
                		
		

   
?>
