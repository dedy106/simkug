<?php   

    $tmp=explode("|",$_GET['param']);
    $kode_lokasi=$tmp[0];
    $periode=$tmp[1];
    $nik=$tmp[2];
    $kode_pp=$tmp[3];
    $jenis=$tmp[4];
    $kunci=$tmp[5];
    $nama=$tmp[6];
    $param=$tmp[7];
    $key=$tmp[8];
    
    // echo $param . " " .$key;
    
    if(!empty($tmp[9])){
        if($tmp[9] == "excel"){
            header("Pragma: public");
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
            header("Content-Type: application/force-download");
            header("Content-Type: application/octet-stream");
            header("Content-Type: application/download");;
            header("Content-Disposition: attachment;filename=doc1.xls"); 
            header("Content-Transfer-Encoding: binary ");
        }
    }

	echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading' id='panel-heading' style='padding-left: 0px;padding-top: 0px;'>
                        <a href='#' class='small-box-footer btn btn-default btn-sm' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet.php&param=$kode_lokasi|$periode|$jenis|$kunci|$kode_pp|$nik|$nama';\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
               echo"<div class='row' style='padding-left: 0px;padding-top: 0px;'>
                        <div class='col-md-12 sai-container-overflow'>";
                        switch($param){
                            case "NrcL" :
                            echo"
                            <div class='box-header with-border' id='batas_print'>
                                <i class='fa fa-balance-scale'></i>
                                <h3 class='box-title'>Neraca Lajur</h3>
                            </div>
                            <div class='box-body'>";

                            $sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik' ";
                            $rs = execute($sql);

                            $sql="select a.kode_akun,c.nama as nama_akun,a.so_awal,a.debet,a.kredit,case when c.jenis='Pendapatan' or modul = 'P' then -a.so_akhir else a.so_akhir end as so_akhir
                                    from exs_glma a
                                    inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_akun='$key' and a.periode='$periode' ";
    
                            $rs2 = execute($sql);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){
    
                                $color="color:black";
                                 
                                echo"
                                <a style='cursor:pointer;color:blue'   onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet3.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$row2->kode_akun';\">
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 0px;'>
                                            <span class='username'>
                                                $row2->kode_akun - $row2->nama_akun
                                                <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                Saldo Akhir
                                                <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row2->so_akhir,0,",",".")."</b></span>
                                            </span><!-- /.username -->
                                        </div>
                                    </div>
                                </div>
                                </a>";
    
                            }
                            echo"
                            </div>";
                        break;
                        case "NrcB" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-balance-scale'></i>
                                <h3 class='box-title' style='margin-left: 10px;'>Neraca Lajur</h3>
                                <!--<span class='pull-right'><a class='btn btn-primary' id='exs-to-xls'>
                                Export to Excel</a></span>-->
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-nrcB'>
                                    <thead>
                                        <tr>
                                            <th width='30'  style='text-align:center;vertical-align:middle'>No</th>
                                            <th width='100' style='text-align:center;vertical-align:middle'>Kode Akun</th>
                                            <th width='300' style='text-align:center;vertical-align:middle'>Nama Akun</th>
                                            <th width='90'  style='text-align:center;vertical-align:middle'>Saldo Awal </th>
                                            <th width='90' style='text-align:center;vertical-align:middle'>Debet</th>
                                            <th width='90' style='text-align:center;vertical-align:middle'>Kredit</th>
                                            <th width='90' style='text-align:center;vertical-align:middle'>Saldo Akhir </th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>";

                                    $sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik' ";
                                    echo "<br>";
 
                                    $rs = execute($sql);
                                  
                                    $sql="select a.kode_akun,c.nama as nama_akun,a.so_awal,a.debet,a.kredit,a.so_akhir
                                    from exs_glma a
                                    inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_akun='$key' and a.periode='$periode' ";

                                    // echo $sql;

                                    $rs2 = execute($sql);

                                    $so_awal=0;
                                    $debet=0;
                                    $kredit=0;
                                    $so_akhir=0;
                                    $i=1;
                                    while ($row = $rs2->FetchNextObject($toupper=false))
                                    {
                                        $so_awal=$so_awal+$row->so_awal;
                                        $debet=$debet+$row->debet;
                                        $kredit=$kredit+$row->kredit;
                                        $so_akhir=$so_akhir + $row->so_akhir;
                                 echo  "<tr>
                                            <td style='text-align:center;vertical-align:middle' >$i</td>
                                            <td style='text-align:center;vertical-align:middle'>$row->kode_akun</td>
                                            <td height='20' >";
                                            echo "<a style='cursor:pointer;color:blue'   onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet3.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$row->kode_akun';\">$row->nama_akun</a>";
                                    echo   "</td>                            
                                            <td  align='right'>".number_format($row->so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->so_akhir,0,',','.')."</td>
                                        </tr>";
                                        
                                        $i=$i+1;
                                    }
                                
                                    echo "<tr>
                                            <td height='20' colspan='3'  align='right'><b>Total</b></td>
                                            <td  align='right'>".number_format($so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format($so_akhir,0,',','.')."</td>
                                        </tr>";
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                        break;
                    }
                    echo"</div>
                    </div>";                
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>

            // $('#exs-to-xls').hide();
            $('#exs-to-xls').click(function(){
                // alert('hello');
                window.location.href='fMain.php?hal=app/dash/dashKeuDet3.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|excel';
               
            });
        </script>
        ";
?>