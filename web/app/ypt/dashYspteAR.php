<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $logomain = $path.'/web/img/yspt2.png';
    $mainname = $_SESSION['namaPP'];

   
    $tmp=explode("/",$_GET['param']);
    // echo $kode_fs;

    $kode_fs="FS1";

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";
        $mobile=true;

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
        $mobile=false;
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $keu = $path . "image/keu.jpg";
    $pbh = $path . "image/Keuangan.png";
    $rra = $path . "image/agg2.png";
    $agg = $path . "image/pbh3.png";

    //SQL SALDO PIUTANG

    
    $sql="select a.kode_lokasi,a.kode_pp,a.nama,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
    from pp a 
    left join (select x.kode_pp,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                group by x.kode_pp,x.kode_lokasi 			
                )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
    left join (select x.kode_pp,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                group by x.kode_pp,x.kode_lokasi 				
                )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
    left join (select x.kode_pp,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'		
                group by x.kode_pp,x.kode_lokasi 			
                )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
    left join (select x.kode_pp,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                from sis_rekon_d x 		
                where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                group by x.kode_pp,x.kode_lokasi 			
                )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
    where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'	
";

    $rs4a=execute($sql);
    $nil4=round($rs4a->fields[3]/1000000);
    $nilai_saldo=$rs4a->fields[3];

    //SALDO PDD

    $sql3a = "select a.kode_pp,a.kode_lokasi,a.nama,
        isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
        from pp a 
        inner join (select a.kode_pp,a.kode_lokasi
                    from sis_cd_d a
                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                    group by a.kode_pp,a.kode_lokasi
        )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
        left join (select a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                    from sis_cd_d a	
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp	
                    where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                    group by a.kode_lokasi,a.kode_pp
        )c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
        left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp	
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                    group by a.kode_lokasi,a.kode_pp
        )d on a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
        left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                    group by a.kode_lokasi,a.kode_pp
        )e on a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'";

    $rs3a=execute($sql3a);
    $nil3a=round($rs3a->fields[3]/1000000);
    $nilai_saldo2=$rs3a->fields[3];

    //SISWA MENUNGGAK

    $sqljs = "select count(a.nis) as jum	from(
        select a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
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
            where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'
    ) a 
    where a.sak_total > 0";

    $sqljsb = "select count(a.nis) as jum	
    from sis_siswa a
    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' ";

    
    $sqlsiswa = "select count(a.nis) as jum	
    from sis_siswa a
    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' ";

    $rssisa =execute($sqljs); // jumlah menunggak
    $rssisb =execute($sqljsb); // jumlah siswa total
    $nilsis =round($rssisa->fields[0]/$rssisb->fields[0],2)*100; //persentase siswa menunggak

    //SISWA AKTIF
    $rstosis =execute($sqlsiswa); 
    
    //PEMBAYARAN PIUTANG

    if($tmp[0] == ""){
        $kode_per = $periode;
    }else{
        $kode_per = $tmp[0];
    }

    $sql2a="select a.total_bill, isnull(b.total_byr,0) as total_byr,isnull(b.total_byr,0)/a.total_bill as per
    from (select a.kode_pp,a.kode_lokasi,sum(a.nilai) as total_bill 
    from sis_bill_d a 
    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$kode_per'
    group by a.kode_pp, a.kode_lokasi ) a 
    left join (  select a.kode_pp , a.kode_lokasi,sum(a.nilai) as total_byr 
    from sis_rekon_d a 
    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode_bill='$kode_per'
    group by a.kode_pp, a.kode_lokasi ) b on a.kode_pp=a.kode_pp and a.kode_lokasi=b.kode_lokasi ";

    $res2a=execute($sql2a);
    $tobil=$res2a->fields[0];
    $tobyr=$res2a->fields[1];
    $persen=round($tobyr/$tobil,3)*100;

    //PIUTANG DAN TAGIHAN PER BULAN
    //GRAFIK KOMBINASI

    $fields = ['BILL', 'BYR'];

    for($s=0; $s<count($fields); $s++){
        $field = $fields[$s];

        $sql="
        select a.kode,
            sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) n1,
            sum(case when substring(a.periode,5,2)='02' then a.nilai  else 0 end) n2,   
            sum(case when substring(a.periode,5,2)='03' then a.nilai  else 0 end) n3,
            sum(case when substring(a.periode,5,2)='04' then a.nilai  else 0 end) n4,
            sum(case when substring(a.periode,5,2)='05' then a.nilai  else 0 end) n5,
            sum(case when substring(a.periode,5,2)='06' then a.nilai  else 0 end) n6,
            sum(case when substring(a.periode,5,2)='07' then a.nilai  else 0 end) n7,
            sum(case when substring(a.periode,5,2)='08' then a.nilai  else 0 end) n8,
            sum(case when substring(a.periode,5,2)='09' then a.nilai  else 0 end) n9,
            sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) n10,
            sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) n11,
            sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) n12	   
        from (
            select 'BILL' as kode, sum(nilai) as nilai, kode_lokasi, periode, kode_pp
            from sis_bill_d
            where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'
            group by kode_lokasi,periode,kode_pp
            union

            select 'BYR' as kode, sum(a.nilai) as nilai, a.kode_lokasi, a.periode, a.kode_pp
            from sis_rekon_d a
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
            group by a.kode_lokasi,a.periode,a.kode_pp
        ) a
        where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.kode='$field'
        group by a.kode
        ";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resPiu = execute($sql);
        while ($row = $resPiu->FetchNextObject(false)){
     
                         $n1=$row->n1/1000000;
                         $n2=$row->n2/1000000;
                         $n3=$row->n3/1000000;
                         $n4=$row->n4/1000000;
                         $n5=$row->n5/1000000;
                         $n6=$row->n6/1000000;
                         $n7=$row->n7/1000000;
                         $n8=$row->n8/1000000;
                         $n9=$row->n9/1000000;
                         $n10=$row->n10/1000000;
                         $n11=$row->n11/1000000;
                         $n12=$row->n12/1000000;
     
                         
        }
     
        $Piu[$s] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                         round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                         round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                         round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        
    }   
    
    
    $no=1;
    for($n=0;$n<=11;$n++){
        
        ${"nr" . $no}= ($Piu[1][$n]/$Piu[0][$n])*100;
        $no++;

    }

    $Piu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
    round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
    round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
    round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
    );

    //AGING PIUTANG

    $sql="select a.kode_pp,a.nama,a.kode_lokasi,
        b.n1,b.n2,b.n3,b.n4
        from pp a
        left join (select a.kode_lokasi,a.kode_pp,
        sum(case when a.umur<=6 then a.n1 else 0 end) as n1,
        sum(case when a.umur between 7 and 12 then a.n1 else 0 end) as n2,
        sum(case when a.umur between 13 and 24 then a.n1 else 0 end) as n3,
        sum(case when a.umur>24 then a.n1 else 0 end) as n4
        from (select a.no_bill,a.kode_lokasi,a.periode,a.kode_pp,
                datediff(month,convert(datetime, a.periode+'01'),convert(datetime, '$periode'+'01')) as umur,
                isnull(a.n1,0)-isnull(b.n1,0) as n1
                from (select x.no_bill,x.kode_lokasi,x.periode,x.kode_pp,
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                        from sis_bill_d x 	
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') and x.kode_pp='$kode_pp'			
                        group by x.no_bill,x.kode_lokasi,x.periode,x.kode_pp	
                        )a
                left join (select x.no_bill,x.kode_lokasi,x.kode_pp,
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                        from sis_rekon_d x 	
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') and x.kode_pp='$kode_pp'			
                        group by x.no_bill,x.kode_lokasi,x.kode_pp
                )b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                where a.kode_lokasi = '$kode_lokasi' 
            )a
            group by a.kode_lokasi,a.kode_pp
        )b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
        order by a.kode_pp ";

        $resUmur = execute($sql);
        $row = $resUmur->FetchNextObject(false);
        
        $n1=$row->n1/1000000;
        $n2=$row->n2/1000000;
        $n3=$row->n3/1000000;
        $n4=$row->n4/1000000;

        $Umur[0] = array(round(floatval($n1),2), round(floatval($n2),2), round(floatval($n3),2), 
                        round(floatval($n4),2));

        

	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>";
            echo "<div class='row'>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteARDet.php&param=piu|$nilai_saldo';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p> Saldo Piutang </p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nil4,0,",",".")." juta</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>&nbsp;</p>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteARDet.php&param=piu|$nilai_saldo';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p>Siswa Menunggak</p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nilsis,2,",",".")."%</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>".$rssisa->fields[0]." dari ".$rssisb->fields[0]." siswa</p>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteARDet.php&param=pdd|$nilai_saldo2';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p> Saldo PDD </p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nil3a,0,",",".")." juta</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>&nbsp;</p>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' >
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p>Siswa Aktif</p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($rstosis->fields[0],0,",",".")."</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>&nbsp;Total Siswa</p>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:1px solid #e8e8e8;border-radius:10px;'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart' style='vertical-align: top;'></i>
                            <h3 class='box-title' style='font-size:16px'>Pembayaran Piutang</h3>
                            <div class='col-xs-6 pull-right'>
                            <style>
                            .selectize-input{
                                border:none;
                                border-bottom:1px solid #8080806b;
                            }
                            </style>";
                            
                            if($mobile == true){

                                echo" <input type='text' value='".ubah_periode($kode_per)."' class='form-control' id='inp-per' placeholder='Pilih Periode' style='border:0;border-bottom:1px solid  #8080806b'>";
            
                            }else{

                                echo"
                                <select class='form-control input-sm selectize' id='dash-per' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                <option value=''>Pilih Periode</option> ";
                                echo " <option value=".$kode_per." selected>".ubah_periode($kode_per)."</option>";
                                
                                $res = execute("select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' order by periode desc");

                                
                                while ($row = $res->FetchNextObject(false)){
                                    echo " <option value=".$row->periode." >".ubah_periode($row->periode)."</option>";
                                }
                                
                                echo" </select>";
                            }
                                
                            echo"
                            </div>
                        </div>
                        <div class='box-body box-click'>
                            <div class='col-md-12'>
                                <div class='progress-group' style='position: relative;margin-top: 5px;'>
                                    <div class='progress sm' style='background-color: #beb3b3;'>
                                        <div class='progress-bar progress-bar-blue' style='width: $persen%'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-12'>
                                <span style='font-size:20px'>".number_format($persen,2,",",".")." %</span>
                                <span style='position: relative;' class=' pull-right'>".number_format($tobyr,0,",",".")."/".number_format($tobil,0,",",".")."</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Piutang Siswa</h3>
                        </div>
                        <div class='box-body box-click' id='box-piu'>
                            <div id='dash_chart_piu'></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Aging Piutang</h3>
                        </div>
                        <div class='box-body box-click' id='box-piu'>
                            <div id='dash_chart_umur'></div>
                        </div>
                    </div>
                </div>
            </div>
            ";
            echo"               
            </div>
       </div>";   
       
       echo"<div class='modal' id='modal-periode' tabindex='-1' role='dialog'>
                <div class=''>
                            <div class='modal-dialog modal-sm ' role='document'>
                                <div class='modal-content' style='border-radius:10px'>
                                
                                        <div class='modal-header' style='border-bottom:0'>
                                            <a type='button' data-dismiss='modal' id='close-list' style='color:black;cursor:pointer'><h5 class='modal-title'> <i class='fa fa-angle-left fa-lg'></i> &nbsp;Pilih Periode</h5></a>
                                            
                                        </div>
                                        <div class='modal-body' style='padding-left: 1px;
                                        padding-right: 1px;'>
                                            <ul class='list-group'>";
                                                $res = execute("select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by periode desc");
                                                
                                                while ($row = $res->FetchNextObject(false)){
                                                echo"
                                                <li class='list-group-item' style='border:0;border-top:0;    border-bottom: 1px solid #80808047;'>
                                                    <div hidden class='isi'>".ubah_periode($row->periode)."</div>
                                                    <span>".ubah_periode($row->periode)."</span>
                                                    <span class='pull-right'><i class='fa fa-angle-right fa-lg'></i></span>
                                                </li>";
                                                }
                                            
                                            
                                        echo"
                                            </ul>   
                                        </div>
                                </div>
                            </div>
                        </div>
        </diV>";


		echo "
        <script type='text/javascript'>
        
        function ubah_periode3(periode)
        {
            var tmpx=periode.split(' ');
            var bulan=tmpx[0];
            var tahun=tmpx[1];
            switch (bulan) 
            {
                case 'Januari':
                tmp='01';
                break;
                case 'Februari':
                tmp='02';
                break;
                case 'Maret':
                tmp='03';
                break;
                case 'April':
                tmp='04';
                break;
                case 'Mei':
                tmp='05';
                break;
                case 'Juni':
                tmp='06';
                break;
                case 'Juli':
                tmp='07';
                break;
                case 'Agustus':
                tmp='08';
                break;  
                case 'September':
                tmp='09';
                break;  
                case 'Oktober':
                tmp='10';
                break;  
                case 'November':
                tmp='11';
                break;  
                case 'Desember':
                tmp='12';
                break;  
                
            }
            return tahun+tmp;
        }
        
        $('#inp-per').focus(function(){
            $('#modal-periode').modal('show');
        });
        
        $('.list-group li').on('click', function(){
            $('.list-group li div.isi').removeClass('selected');
            $(this).find('div.isi').addClass('selected');
            var isi=$('.selected').text();
            $('#inp-per').val(isi);
            $('#modal-periode').modal('hide');
            var per = ubah_periode3(isi);
            window.location.href='$fmain?hal=app/ypt/dashYspteAR.php&param='+per+'/';
        });

        $('#dash-per').change(function(){
            var per = $(this).val();
            window.location.href='$fmain?hal=app/ypt/dashYspteAR.php&param='+per+'/';
        });

        $('#inp-per').focus(function(){
            $('#modal-periode').modal('show');
        });

        
        
        //UMUR PIUTANG
        Highcharts.chart('dash_chart_umur', {
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['< 6 bulan','< 12 bulan','< 24 bulan',' > 24 bulan']
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
    
                title: {
                    text: 'Nilai (dalam jutaan)',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }],
            labels: {
                items: [{
                    html: '',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            
            series: [{
                type: 'column',
                name: 'Piutang Siswa',
                data: ".json_encode($Umur[0]).",
                color:'#fa9c0a',
                tooltip: {
                    formatter: function() {
                        return Highcharts.numberFormat(this.value, 2, ',', '.')
                    },
                    shared: true
                },
                
            }]
        });

        Highcharts.chart('dash_chart_piu', {
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Nilai (dalam jutaan)',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Rasio',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            labels: {
                items: [{
                    html: '',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            tooltip: {
                shared: true
            },
            series: [{
                type: 'column',
                name: 'Tagihan',
                data: ".json_encode($Piu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valuePrefix: ' '
                }
            }, {
                type: 'column',
                name: 'Pembayaran',
                color:'#ff6f69',
                data: ".json_encode($Piu[1]).",
                tooltip: {
                    valuePrefix: ' '
                }
            },{
                type: 'spline',
                name: 'Collection Rasio',
                data: ".json_encode($Piu[2]).",
                yAxis:1,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                },
                tooltip: {
                    valueSuffix: ' %'
                }
            
            }]
        });


    
        </script>";

   
?>
