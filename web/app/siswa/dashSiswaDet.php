<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
	
	
    $nik2=str_replace("a","",$nik);

	/*
    $sql="select kode_pp from karyawan where kode_lokasi = '$kode_lokasi' and nik ='$nik2' ";
    $rs = execute($sql);
    $kode_pp=$rs->fields[0];
	*/
	
    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $path2 = $path . "image/keubg.png";
    $foto = $path . "image/wallpaper/Forest.jpg";
    
    echo "<div class='panel'>
			<div class='panel-body'>
                <div class='panel-heading'>
                    <a href='fMain.php?hal=app/siswa/dashSiswa.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
                switch($kunci){
                    case "bp" :
                    echo "
                    <div class='row'>
                        <div class='col-md-12'>
                        <!-- The time line -->
                        <ul class='timeline'>
                            <!-- timeline time label -->
                        ";

                        $sql="select distinct convert(varchar,tanggal,103) as tgl from sis_bp where kode_lokasi='$kode_lokasi' and kode_pp ='$kode_pp' order by convert(varchar,tanggal,103) desc  ";

                        // echo $sql;
                        $rs = execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){

                        echo"    
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    $row->tgl
                                </span>
                            </li>
                            <!-- /.timeline-label -->
                            ";

                            $sql2="select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from sis_bp 
                            where convert(varchar,tanggal,103) = '$row->tgl' 
                            order by convert(varchar(10), tgl_input, 108)  desc ";

                            $rs2 = execute($sql2);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){

                            $gambar= $path."server/media/".$row2->file_gambar;
                            $pathdok= $path."server/media/".$row2->file_dok;
                            

                            $keterangan= urldecode($row2->keterangan);
                            // $limited_string = limit_words($keterangan, 30);
                                
                        echo"
                            <!-- timeline item -->
                            <li>
                            <i class='fa fa-envelope bg-blue'></i>

                            <div class='timeline-item'>
                                <span class='time'><i class='fa fa-clock-o'></i> $row2->jam</span>

                                <h3 class='timeline-header'><a href='#'>$row2->no_bukti</a> $row2->jenis</h3>

                                <div class='timeline-body'>
                                <img src='$gambar' alt='...' class='margin' width='150px'>
                                ".$keterangan."
                                </div>
                                <div class='timeline-footer'>
                                <a class='btn btn-primary btn-xs' style='cursor:pointer;' href='fMain.php?hal=app/siswa/dashSiswaNews.php&param=$row2->no_bukti/bp' >Read More</a>
                                <a class='btn btn-success btn-xs' href='$pathdok' target='_blank'>Download Dokumen</a>
                                </div>
                            </div>
                            </li>
                            <!-- END timeline item -->
                        ";
                            }

                        }
                        echo"
                            <li>
                            <i class='fa fa-clock-o bg-gray'></i>
                            </li>
                        </ul>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    ";
                        break;
                        case "keu" :
                    
                        $sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
                        from sis_siswa a 
                        inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
                        left join (select y.nis,y.kode_lokasi,  
                                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                    from sis_bill_d x 			
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                                    group by y.nis,y.kode_lokasi 			
                                    )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
                        left join (select y.nis,y.kode_lokasi,  
                                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                    from sis_bill_d x 			
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                                    group by y.nis,y.kode_lokasi 			
                                    )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
                        left join (select y.nis,y.kode_lokasi,  
                                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                                    from sis_rekon_d x 	
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.kode_pp='$kode_pp'		
                                    group by y.nis,y.kode_lokasi 			
                                    )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
                        left join (select y.nis,y.kode_lokasi, 
                                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                                    from sis_rekon_d x 			
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
                                    group by y.nis,y.kode_lokasi 			
                                    )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
                        where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'	and a.nis='$nik2'
                        order by a.kode_kelas,a.nis";

                        
                         
    
                        $rsTung = execute($sql);  
                        $row = $rsTung->FetchNextObject($toupper=false);
    
                        $tunggakan = $row->sak_total;
    
                        $sql="select a.nis,a.kode_lokasi,a.nama,a.kode_kelas,
                        isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
                        from sis_siswa a 
                        inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                        inner join (select a.nis,a.kode_pp,a.kode_lokasi
                                    from sis_cd_d a
                                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                                    group by a.nis,a.kode_pp,a.kode_lokasi
                                    )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
                        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                                from sis_cd_d a			
                                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                                group by a.nis,a.kode_lokasi,a.kode_pp
                                )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                                from sis_cd_d a			
                                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                                group by a.nis,a.kode_lokasi,a.kode_pp
                                )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
                        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                                from sis_cd_d a			
                                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                                group by a.nis,a.kode_lokasi,a.kode_pp
                                )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2'
                        order by a.kode_kelas,a.nis";

                        
                         
    
                        $rsDep = execute($sql);  
                        $row = $rsDep->FetchNextObject($toupper=false);
    
                        $deposit =$row->so_akhir;
    
    
                    echo"
                    <div class='box box-widget'>
                            <div class='box-body'>
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                    <p>Saldo Tagihan</p>
                                    <h4 style='padding-left: 20px;'><span>Rp. ".number_format($tunggakan,0,",",".")."</span> <a href='fMain.php?hal=app/siswa/dashSiswaDet2.php&param=all/$kunci/tagihan'  style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right' style='font-size:30px;'></i></span></a>
                                    </h4><p style='height: 5px;'></p>
                                    <p>Saldo Deposit<p>
                                    <h4 style='padding-left: 20px;'><span>Rp. ".number_format($deposit,0,",",".")."</span> <a href='fMain.php?hal=app/siswa/dashSiswaDet2.php&param=all/$kunci/deposit' style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right' style='font-size:30px;'></i></span></a></h4>
                                                         
                                </div>
                                <h4> Riwayat Transaksi </h4>
                            </div>";
    
                            $sql="select  a.* from (
                                select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.periode,
                                b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
                                from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,
                                        0 as bayar from sis_bill_d x 
                                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                        where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0 
                                        group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param )a 
                                inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
                                union all 
                                select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
                                convert(varchar(10),b.tanggal,103) as tgl,b.periode,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
                                from (select x.kode_lokasi,x.no_rekon,x.kode_param,
                                    case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
                                    from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                                    where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0
                                    )a 
                                inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
                                union all 
                                select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
                                convert(varchar(10),b.tanggal,103) as tgl,b.periode,b.keterangan,'KB' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param 
                                from (select x.kode_lokasi,x.no_rekon,x.kode_param,
                                    case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
                                    from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                                    where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0 
                                )a
                                inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi 
                            ) a
                            order by a.tanggal desc ";

                            
                      
                            $rs2 = execute($sql);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){
    
                                if ($row2->modul == "BILL"){
                                    $color="color:#01f400";
                                    $total=$row2->tagihan;
                                    $gmbr=$path."image/green2.png";
                                }else{
                                    $color="color:#1cbbff";
                                    $total=$row2->bayar;
                                    $gmbr=$path."image/blue.png";
                                }
                                echo"<a href='fMain.php?hal=app/siswa/dashSiswaDet2.php&param=all/$kunci/detTagih/$row2->kode_param/$row2->periode/$row2->modul'  style='cursor:pointer;'>
                                <div class='box-footer box-comments' style='background:white'>
                                    <div class='box-comment'>
                                        <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                        <div class='comment-text'>
                                            <span class='username'>
                                            $row2->keterangan - $row2->kode_param
                                                <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($total,0,",",".")."</b></span>
                                            </span><!-- /.username -->
                                                $row2->no_bukti - $row2->tgl
                                        </div>
                                    </div>
                                </div>
                                </a>";
    
                            }
                    echo"
                    </div>                   
                    ";

                        break;
                        
                        case "ka" :
    
                    echo"
                    <div class='box box-widget'>
                            <div class='box-body'>
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h4>Kalender Akademik</h4>
                                    <p> Tahun Ajaran </p>                 
                                </div>
                            </div>";
    
                            $sql="select a.*, convert(varchar,a.tanggal,103) as tgl from sis_kalender_akad a where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' ";

                            
                        // echo $sql;
    
                            $rs2 = execute($sql);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){
    
                                // if ($row2->modul == "bill"){
                                //     $color="color:#01f400";
                                //     $total=$row2->tagihan;
                                //     $gmbr=$path."image/green2.png";
                                // }else{
                                //     $color="color:#1cbbff";
                                //     $total=$row2->bayar;
                                //     $gmbr=$path."image/blue.png";
                                // }
                                echo"
                                <div class='box-footer box-comments' style='background:white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 10px;'>
                                            <span class='username'>
                                                $row2->agenda
                                                <span class='text-muted pull-right' style='font-size:14px'><b></b></span>
                                            </span><!-- /.username -->
                                                Tanggal $row2->tgl
                                        </div>
                                    </div>
                                </div>";
    
                            }
                    echo"
                    </div>                   
                    ";
                        break;
                        case "abs" :
                    
                    $sql ="select a.nis, a.nama , b.hadir,b.alpa,b.izin,b.sakit 
                    from sis_siswa a 
                    inner join (select a.nis,a.kode_lokasi,count(case when a.status ='hadir' then status end) hadir,
                               count(case when a.status ='alpa' then status end) alpa,
                               count(case when a.status ='izin' then status end) izin,
                               count(case when a.status ='sakit' then status end) sakit  
                                from sis_presensi a
                                inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_pp=b.kode_pp
                                inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp
                                inner join sis_siswa d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2' and substring(convert(varchar,a.tanggal,112),1,6)='$periode'
                    group by a.nis,a.kode_lokasi) b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi";
                    
                    
                    // echo $sql;

                    $rsPres = execute($sql);  
                    $rowP = $rsPres->FetchNextObject($toupper=false);

                echo"
                    <div class='row'>
                        <div class='col-md-12'>
                            <!-- Calendar -->
                            <style>
                            .datepicker-inline {
                                width: 100%;
                            }
                            </style>
                            <div class='box box-solid '>
                            <div class='box-header'>
                                <i class='fa fa-calendar'></i>
                
                                <h3 class='box-title'>Absensi</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class='box-body no-padding'>
                                <!--The calendar -->
                                <div id='calendar' style='width: 100%'></div>
                            </div>
                            <!-- /.box-body -->
                            <div class='box-footer text-black'>
                                <div class='row'>
                                <div class='col-sm-12 col-xs-12'>
                                <table class='table table-bordered'>
                                    <tr>
                                        <th style='text-align:center;background: rgb(236, 5, 5);color:white'>Alpa</th>
                                        <th style='text-align:center;background: green;color:white'>Hadir</th>
                                        <th style='text-align:center;background: gray;color:white'>Izin</th>
                                        <th style='text-align:center;background: blue;color:white'>Sakit</th>
                                    </tr>
                                    <tr>
                                        <th style='text-align:center;color: rgb(236, 5, 5);'>$rowP->alpa</th>
                                        <th style='text-align:center;color: green;'>$rowP->hadir</th>
                                        <th style='text-align:center;color: gray;'>$rowP->izin</th>
                                        <th style='text-align:center;color: blue;'>$rowP->sakit</th>
                                    </tr>
                                </table>
                                </div>
                                </div>
                                <!-- /.row -->
                            </div>
                            </div>
                            <!-- /.box -->
                        </div>
                    </div>
                ";
                        break;
                        case "nil" :
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h3>Penilaian Siswa</h3>
                                    Tahun Ajaran 2018/2019
                                </div>

                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                    ";
                                    $sqltab="select distinct kode_jenis from sis_jenisnilai where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    
                                    // echo $sqltab;

                                    $rstab = execute($sqltab); 
                                    $i=0; 
                                    while ($rowt = $rstab->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                            echo"
                                            <li class='active'><a href='#tab_$rowt->kode_jenis' data-toggle='tab'>$rowt->kode_jenis</a></li>";
                                        }else{
                                            echo"
                                            <li><a href='#tab_$rowt->kode_jenis' data-toggle='tab'>$rowt->kode_jenis</a></li>";
                                        }
                                   
                                        $i++;
                                    }
                                    echo"
                                    </ul>
                                    <div class='tab-content'>";

                                    $sqltabpane="select distinct kode_jenis from sis_jenisnilai where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    
                                    // echo $sqltabpane;

                                    $rstabpane = execute($sqltabpane); 
                                    $i=0; 
                                    while ($rowtp = $rstabpane->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                             $class="active";
                                        }else{
                                             $class=" ";
                                        }

                                        echo"
                                        <div class='tab-pane $class' id='tab_$rowtp->kode_jenis'>";

                                        $sql="select a.kode_ta,a.kode_kelas,a.kode_jenis,a.kode_matpel, b.nilai,c.nama as nama_matpel 
                                        from sis_nilai_m a
                                        inner join sis_nilai b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                        inner join sis_matpel c on a.kode_matpel=c.kode_matpel and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and b.nis='$nik2' and a.kode_jenis='$rowtp->kode_jenis'";

                                        
                                        // echo $sql;

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){

                                            if ($row->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 50px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color;font-size:20px'>
                                                        $row->nama_matpel
                                                        <span class='text-muted pull-right' style='font-size:20px'>$row->nilai</span>
                                                        </span><!-- /.username -->
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->";

                                        $i++;
                                    }
                                    
                                  echo"
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                        break;
                        case "kld" :
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h3>Jadwal Pelajaran</h3>
                                    Tahun Ajaran 2018/2019
                                </div>

                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                        <li class='active'><a href='#tab_1' data-toggle='tab'>Senin</a></li>
                                        <li><a href='#tab_2' data-toggle='tab'>Selasa</a></li>
                                        <li><a href='#tab_3' data-toggle='tab'>Rabu</a></li>
                                        <li><a href='#tab_4' data-toggle='tab'>Kamis</a></li>
                                        <li><a href='#tab_5' data-toggle='tab'>Jumat</a></li>
                                        <li><a href='#tab_6' data-toggle='tab'>Sabtu</a></li>
                                    </ul>
                                    <div class='tab-content'>
                                        <div class='tab-pane active' id='tab_1'>";

                                        $sql="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='1' order by kode_slot,kode_hari";

                                        
                                        // echo $sql;

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){

                                        if ($row->kode_matpel == "BIN"){
                                            $color = "#1aa1d9";
                                        } else if($row->kode_matpel == "ING") {
                                            $color = "#0add5e";
                                        } else {
                                            $color = "#9c9a97";
                                        }
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color'>
                                                        $row->nama_matpel
                                                        <span class='text-muted pull-right'>$row->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->";
                                    echo"
                                         <div class='tab-pane' id='tab_2'>";

                                        $sql2="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='2' order by kode_slot,kode_hari";

                                        $rs2 = execute($sql2);  
                                        while ($row2 = $rs2->FetchNextObject($toupper=false)){
                                        
                                            if ($row2->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row2->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }

                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color'>
                                                        $row2->nama_matpel
                                                        <span class='text-muted pull-right'>$row2->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row2->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }

                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class='tab-pane' id='tab_3'>";
                                        $sql3="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='3' order by kode_slot,kode_hari";

                                        $rs3 = execute($sql3);  
                                        while ($row3 = $rs3->FetchNextObject($toupper=false)){
                                            if ($row3->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row3->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }

                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color'>
                                                        $row3->nama_matpel
                                                        <span class='text-muted pull-right'>$row3->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row3->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class='tab-pane' id='tab_4'>";

                                        $sql4="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='4' order by kode_slot,kode_hari";

                                        $rs4 = execute($sql4);  
                                        while ($row4 = $rs4->FetchNextObject($toupper=false)){
                                            if ($row4->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row4->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color'>
                                                        $row4->nama_matpel
                                                        <span class='text-muted pull-right'>$row4->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row4->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class='tab-pane' id='tab_5'>";
                                        $sql5="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='5' order by kode_slot,kode_hari";

                                        $rs5 = execute($sql5);  
                                        while ($row5 = $rs5->FetchNextObject($toupper=false)){
                                            if ($row5->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row5->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color'>
                                                        $row5->nama_matpel
                                                        <span class='text-muted pull-right'>$row5->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row5->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class='tab-pane' id='tab_6'>";
                                        $sql6="select a.kode_slot, c.nama as nama_slot,a.kode_kelas, a.kode_hari, a.kode_matpel,d.nama as nama_matpel, b.nis,a.nik,e.nama as nama_guru from sis_jadwal a
                                        inner join sis_siswa b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                        inner join sis_slot c on a.kode_slot=c.kode_slot and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                        inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                        inner join karyawan e on a.nik=e.nik and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
                                        where b.nis='$nik2' and kode_hari='6' order by kode_slot,kode_hari";

                                        $rs6 = execute($sql6);  
                                        while ($row6 = $rs6->FetchNextObject($toupper=false)){

                                            if ($row6->kode_matpel == "BIN"){
                                                $color = "#1aa1d9";
                                            } else if($row6->kode_matpel == "ING") {
                                                $color = "#0add5e";
                                            } else {
                                                $color = "#9c9a97";
                                            }

                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$colorc'>
                                                        $row6->nama_matpel
                                                        <span class='text-muted pull-right'>$row6->nama_slot</span>
                                                        </span><!-- /.username -->
                                                        $row6->nama_guru
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"                                        
                                        </div>
                                        <!-- /.tab-pane -->
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                        break;
                        case "news" :

                        $sql="select no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

                        $rs = execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            $foto2 = $path . "server/media/".$row->file_dok;
                     echo "
                        <div class='col-md-12 col-md-12'>
                            <!-- Widget: user widget style 1 -->
                            <div class='box box-widget widget-user'>
                                <!-- Add the bg color to the header using any of the bg-* classes -->
                                <div class='widget-user-header bg-black' style='background: url($foto2) center center;'>
                                    <h3 class='widget-user-username'></h3>
                                    <h5 class='widget-user-desc'></h5>
                                </div>
                                
                                <div class='box-footer'>
                                    <h5 class='description-header'>$row->judul</h5>
                                    <span class='description-text'>$row->tgl</span>  
                                </div>
                                <!-- /.widget-user -->
                            </div>
                        </div> ";
            
                        }
                        break;
                        case "prestasi" :
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h3>Prestasi Siswa</h3>
                                    Tahun Ajaran 2018/2019
                                </div>

                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                    ";
                                    $sqltab="
                                    select kode_kategori,nama 
                                    from sis_prestasi_kategori
                                    where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    $rstab = execute($sqltab); 
                                    $i=0; 
                                    while ($rowt = $rstab->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                            echo"
                                            <li class='active'><a href='#tab_$rowt->kode_kategori' data-toggle='tab'>$rowt->nama</a></li>";
                                        }else{
                                            echo"
                                            <li><a href='#tab_$rowt->kode_kategori' data-toggle='tab'>$rowt->nama</a></li>";
                                        }
                                   
                                        $i++;
                                    }
                                    echo"
                                    </ul>
                                    <div class='tab-content'>";

                                    $sqltabpane="
                                    select kode_kategori,nama 
                                    from sis_prestasi_kategori
                                    where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    $rstabpane = execute($sqltabpane); 
                                    $i=0; 
                                    while ($rowtp = $rstabpane->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                             $class="active";
                                        }else{
                                             $class=" ";
                                        }

                                        echo"
                                        <div class='tab-pane $class' id='tab_$rowtp->kode_kategori'>";

                                        $sql="
                                        select a.no_bukti, convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.tempat,a.jenis from sis_prestasi a
                                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2' and a.kode_kategori='$rowtp->kode_kategori' ";

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){

                                            $color = "#1aa1d9";
                                           
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color;font-size:16px'>
                                                        PRESTASI $row->jenis ( $row->tempat )
                                                        <span class='text-muted pull-right' style='font-size:16px'>$row->tgl</span>
                                                        </span><!-- /.username -->
                                                        $row->keterangan
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->";

                                        $i++;
                                    }
                                    
                                  echo"
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                        break;
                        case "ekskul" :
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h3>Prestasi Siswa</h3>
                                    Tahun Ajaran 2018/2019
                                </div>

                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                    ";
                                    $sqltab="
                                    select kode_jenis, nama from sis_ekskul_jenis
                                    where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    $rstab = execute($sqltab); 
                                    $i=0; 
                                    while ($rowt = $rstab->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                            echo"
                                            <li class='active'><a href='#tab_$rowt->kode_jenis' data-toggle='tab'>$rowt->nama</a></li>";
                                        }else{
                                            echo"
                                            <li><a href='#tab_$rowt->kode_jenis' data-toggle='tab'>$rowt->nama</a></li>";
                                        }
                                   
                                        $i++;
                                    }
                                    echo"
                                    </ul>
                                    <div class='tab-content'>";

                                    $sqltabpane="
                                    select kode_jenis,nama 
                                    from sis_ekskul_jenis
                                    where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";

                                    $rstabpane = execute($sqltabpane); 
                                    $i=0; 
                                    while ($rowtp = $rstabpane->FetchNextObject($toupper=false)){
                                    
                                        if($i == 0){
                                             $class="active";
                                        }else{
                                             $class=" ";
                                        }

                                        echo"
                                        <div class='tab-pane $class' id='tab_$rowtp->kode_jenis'>";

                                        $sql=" select convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.keterangan,a.predikat from sis_ekskul a
                                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2' and a.kode_jenis='$rowtp->kode_jenis' ";

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){

                                            $color = "#1aa1d9";
                                           
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 70px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color;font-size:16px'>
                                                        $row->keterangan
                                                        <span class='text-muted pull-right' style='font-size:16px'>Predikat : $row->predikat</span>
                                                        </span><!-- /.username -->
                                                        $row->tgl_mulai s.d $row->tgl_selesai
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->";

                                        $i++;
                                    }
                                    
                                  echo"
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                        break;
                        case "raport" :
                        echo "
                        <div class='row'>
                            <div class='col-md-12'>
                                <!-- Custom Tabs -->
                                <div class='alert alert-danger alert-dismissible' style='text-align:center;margin-bottom:0px'>
                                    <h3>Raport Siswa</h3>
                                    Tahun Ajaran 2018/2019
                                </div>

                                <style>.nav-tabs-custom > .nav-tabs > li.active {
                                    border-top:0px;
                                   
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a {
                                    border:1px solid #dd4b39;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                }
                                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                                    border:1px solid grey;
                                    border-radius:35%;
                                    background : #dd4b39;
                                    color:white;
                                    margin:6px;
                                    padding: 7px;
                                
                                }
                                </style>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs'>
                                        <li class='active'><a href='#tab_GANJIL' data-toggle='tab'>GANJIL</a></li>
                                        <li><a href='#tab_GENAP' data-toggle='tab'>GENAP</a></li>
                                    </ul>
                                    <div class='tab-content'>";
                                        echo"
                                         <div class='tab-pane active' id='tab_GANJIL'>";

                                        $sql="select b.kode_matpel,c.nama, b.nilai from sis_raport_m a
                                        inner join sis_raport_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                        inner join sis_matpel c on b.kode_matpel=c.kode_matpel and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
                                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2' and a.kode_sem='GANJIL' ";

                                        $rs = execute($sql);  
                                        while ($row = $rs->FetchNextObject($toupper=false)){

                                            $color = "#1aa1d9";
                                           
                                        echo"
                                            <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 50px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 10px'>
                                                        <span class='username' style='color:$color;font-size:20px'>
                                                        $row->nama
                                                        <span class='text-muted pull-right' style='font-size:20px'>$row->nilai</span>
                                                        </span><!-- /.username -->
                                                    </div>
                                                </div>
                                            </div>
                                            ";
                                        }
                                       
                                        echo"
                                        </div>
                                        <!-- /.tab-pane -->";
                                        echo"
                                        <div class='tab-pane' id='tab_GENAP'>";

                                       $sql="select b.kode_matpel,c.nama, b.nilai from sis_raport_m a
                                       inner join sis_raport_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                       inner join sis_matpel c on b.kode_matpel=c.kode_matpel and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
                                       where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik2' and a.kode_sem='GENAP' ";

                                       $rs2 = execute($sql);  
                                       while ($row2 = $rs2->FetchNextObject($toupper=false)){

                                           $color = "#1aa1d9";
                                          
                                       echo"
                                           <div class='box-footer box-comments' style='box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height: 50px;margin-bottom: 10px;border-left: 7px solid $color;border-radius: 10px;'>
                                               <div class='box-comment'>
                                                   <div class='comment-text' style='margin-left: 10px'>
                                                       <span class='username' style='color:$color;font-size:20px'>
                                                       $row2->nama
                                                       <span class='text-muted pull-right' style='font-size:20px'>$row2->nilai</span>
                                                       </span><!-- /.username -->
                                                    </div>
                                                </div>
                                           </div>
                                           ";
                                       }
                                      
                                       echo"
                                       </div>
                                       <!-- /.tab-pane -->";
                                  echo"
                                    </div>
                                    <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        ";
                        break;
                    }
               
            
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>
                          
                $('.daterange').daterangepicker({
                    ranges   : {
                    'Today'       : [moment(), moment()],
                    'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month'  : [moment().startOf('month'), moment().endOf('month')],
                    'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: moment().subtract(29, 'days'),
                    endDate  : moment()
                }, function (start, end) {
                    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                });

                // The Calender
                $('#calendar').datepicker();
                $('.datepicker-inline').width('100%');
                $('.table-condensed').width('100%');

                $('#calendar').datepicker('setDate', new Date());
            
                
			 </script>";
?>
