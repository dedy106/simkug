<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $fmain=$_SESSION['fMain'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];

    $kode_fs="FS1";

    $tmp=explode("|",$_GET['param']);
    $box=$tmp[0];
    $nil=$tmp[1];

    switch($box){
        case "piu" :
        $judul = "Saldo Piutang";
        break;
        case "pdd" :
        $judul = "Saldo PDD";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYspteAR.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYspteAR.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";

    switch($box){
        case "piu" :
        echo"
        <div class='col-md-12' style='padding-left:0px;padding-right:0px'>
            <div class='box-header with-border'>
            <i class='fa fa-book'></i>
            <h3 class='box-title'>Saldo Piutang per Siswa
             </h3>
             <a class='btn btn-danger btn-sm pull-right' href='#' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|kartu_piu|||$nil';\" >Kartu Piutang</a>
             <br>
             <!--<span style='padding-top:10px'>".number_format($nil,0,",",".")."</span>-->
            </div>
            <div class='box-body'>";

        $sql = "select a.nis,substring(a.nama,1,CHARINDEX(' ', a.nama)  ) +' '+ substring(a.nama,CHARINDEX(' ', a.nama)+1,1) +'.' as nama,a.kode_lokasi,a.kode_pp
            ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,
            a.kode_kelas
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
                        sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                        sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                        sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
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
        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) > 0
        order by a.kode_kelas,a.nis ";

            echo"
            <div class='row'>
                <div class='col-xs-12 table-responsive' style='border:none'>
                    <table class='table table-striped' id='table-BB' style='font-size:11px'>
                        <thead>
                            <tr style='background:#dd4b39;color:white'>
                                <td width='20' style='vertical-align:middle;text-align:center' >No</td>
                                <td width='50' style='vertical-align:middle;text-align:center'>NIS </td>
                                <td width='200' style='vertical-align:middle;text-align:center' >Nama</td>
                                <td width='60' style='vertical-align:middle;text-align:center'>Kelas</td>
                                <td style='vertical-align:middle;text-align:center'>Saldo Akhir </td>
                            </tr>
                        </thead>
                    <tbody>";
                            $rs1 = execute($sql);
                            
                            $sak_total=0;$no=1;
                            while ($row = $rs1->FetchNextObject($toupper=false))
                            {
                            
                                $sak_total+=$row->sak_total;
                                echo "<tr>
                                <td class='isi_laporan' align='center'>$no</td>
                                <td class='isi_laporan'><a style='cursor:pointer;font-weight:100;color:#dd4b39' href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|kartu_piu|$row->nis'><b>$row->nis</b></a></td>
                                <td class='isi_laporan'>$row->nama</td>
                                <td class='isi_laporan'>$row->kode_kelas</td>
                                <td class='isi_laporan' align='right'>".number_format($row->sak_total,0,",",".")."</td>
                                </tr>";	 
                                $no++;
                            }
                    echo "<tr>
                                <td class='isi_laporan' align='center' colspan='4'>Total</td>
                                <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
                         </tr>";	 
                    echo "
                    </tbody>
                </table>";
            echo"</div>
            </div>";
        break;
        case "pdd" :
        echo"
        <div class='col-md-12' style='padding-left:0px;padding-right:0px'>
            <div class='box-header with-border'>
            <i class='fa fa-book'></i>
            <h3 class='box-title'>Saldo PDD per Siswa &nbsp; </h3>
            <a class='btn btn-danger btn-sm pull-right' href='#' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|kartu_pdd|||$nil';\" >Kartu PDD</a>
            <br>
            <!-- <span style='padding-top:10px'>".number_format($nil,0,",",".")."</span> -->
            </div>
            <div class='box-body'>";

        $sql = "select a.nis,a.kode_lokasi,substring(a.nama,1,CHARINDEX(' ', a.nama)  ) +' '+ substring(a.nama,CHARINDEX(' ', a.nama)+1,1) +'.' as nama
        ,a.kode_kelas,isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
                    from sis_siswa a 
                    inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp
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
                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) > 0 $filter
                    order by a.kode_kelas,a.nis ";

            echo"
            <div class='row'>
                <div class='col-xs-12 table-responsive' style='border:none'>
                    <table class='table table-striped' id='table-BB' style='font-size:11px'>
                        <thead>
                            <tr style='background:#dd4b39;color:white'>
                                <td width='20' style='vertical-align:middle;text-align:center' >No</td>
                                <td width='50' style='vertical-align:middle;text-align:center'>NIS </td>
                                <td width='200' style='vertical-align:middle;text-align:center' >Nama</td>
                                <td width='60' style='vertical-align:middle;text-align:center'>Kelas</td>
                                <td style='vertical-align:middle;text-align:center'>Saldo Akhir </td>
                            </tr>
                        </thead>
                    <tbody>";
                            $rs1 = execute($sql);
                            
                            $sak_total=0;$no=1;
                            while ($row = $rs1->FetchNextObject($toupper=false))
                            {
                            
                                $sak_total+=$row->so_akhir;
                                echo "<tr>
                                <td class='isi_laporan' align='center'>$no</td>
                                <td class='isi_laporan'><a style='cursor:pointer;font-weight:100;color:#dd4b39' href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|kartu_pdd|$row->nis'><b>$row->nis</b></a></td>
                                <td class='isi_laporan'>$row->nama</td>
                                <td class='isi_laporan'>$row->kode_kelas</td>
                                <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
                                </tr>";	 
                                $no++;
                            }
                    echo "<tr>
                                <td class='isi_laporan' align='center' colspan='4'>Total</td>
                                <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
                         </tr>";	 
                    echo "
                    </tbody>
                </table>";
            echo"</div>
            </div>";
        break;

        
    }

        

        echo"
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>
       
        </script>";
       

?>
