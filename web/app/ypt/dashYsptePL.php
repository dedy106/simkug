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

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $keu = $path . "image/keu.jpg";
    $pbh = $path . "image/Keuangan.png";
    $rra = $path . "image/agg2.png";
    $agg = $path . "image/pbh3.png";

    //SQL BEBAN

    $sqlagg2= "select a.kode_grafik,a.nama,
    isnull(b.nilai,0) as nilai,
    isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
    from db_grafik_m a
    left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                from db_grafik_d a
                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                group by a.kode_grafik,a.kode_lokasi
    )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
    where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'";

    $agg2 = execute($sqlagg2);

    //SQL PENDAPATAN

    $sqlagg= "select a.kode_grafik,a.nama,
    isnull(b.nilai,0) as nilai,
    isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
    from db_grafik_m a
    left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                from db_grafik_d a
                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                group by a.kode_grafik,a.kode_lokasi
    )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
    where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'";

    $agg = execute($sqlagg);
    //BEBAN YOY & PENDAPATAN YOY

    $sql = "select a.kode_grafik,a.nama,
    b.nilai as nilai,
    b.gar as gar,
    (b.nilai/b.gar)*100 as grow,
    (b.nilai/b.n5)*100 as youth
    from db_grafik_m a
    left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                    sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar,
                    sum(case when b.jenis_akun='Pendapatan' then -b.n5 else b.n5 end) as n5
                        from db_grafik_d a
                        inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                        where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs'
                        group by a.kode_grafik,a.kode_lokasi
                    )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
    where a.kode_grafik in ('DB02','DB03') and a.kode_lokasi='$kode_lokasi'";
    $res = execute($sql);
            
    while ($row = $res->FetchNextObject(false)){
        // $series4[$row->nama] = floatval($row->nilai);
        ${"s4" . $row->nama} = round(floatval($row->grow),2);
        ${"s5" . $row->nama} = round(floatval($row->youth),2);
    }

    //GROS PROFIT

    $sql = " select a.kode_rasio,a.kode_lokasi,a.kode_neraca,
    case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
    from db_rasio_d a
    inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
    inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs' and c.kode_rasio='DB01'
    order by a.kode_rasio";

    // echo $sql;

    $boxras = execute($sql);

    while ($row = $boxras->FetchNextObject(false)){
        $nil[] =(array)$row;
    }

    $dfr = array();

    for($i=0; $i<count($nil); $i++){
        if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
            $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
        }
        
        $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
            'kode_neraca'=>$nil[$i]['kode_neraca'],
            'nilai2'=>$nil[$i]['nilai2']
        );
    }

    //PROFIT AND LOSS

    $sqlPen = "select a.kode_lokasi,
    sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
    sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
    sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
    sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
    sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
    sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
    sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
    sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
    sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
    sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
    sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
    sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
    from exs_neraca a
    inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
    group by a.kode_lokasi";

    $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
    $pembagi=1000000;

    $resPen = execute($sqlPen);
    while ($row = $resPen->FetchNextObject(false)){
        
        $n1=$row->n1/$pembagi;
        $n2=$row->n2/$pembagi;
        $n3=$row->n3/$pembagi;
        $n4=$row->n4/$pembagi;
        $n5=$row->n5/$pembagi;
        $n6=$row->n6/$pembagi;
        $n7=$row->n7/$pembagi;
        $n8=$row->n8/$pembagi;
        $n9=$row->n9/$pembagi;
        $n10=$row->n10/$pembagi;
        $n11=$row->n11/$pembagi;
        $n12=$row->n12/$pembagi;
        
        
    }

    $Keu[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
    );

    $sqlBeb = "select a.kode_lokasi,
    sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
    sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
    sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
    sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
    sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
    sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
    sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
    sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
    sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
    sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
    sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
    sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
    from exs_neraca a
    inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
    group by a.kode_lokasi";

    $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

    $resBeb = execute($sqlBeb);
    while ($row = $resBeb->FetchNextObject(false)){
        
        $n1=$row->n1/$pembagi;
        $n2=$row->n2/$pembagi;
        $n3=$row->n3/$pembagi;
        $n4=$row->n4/$pembagi;
        $n5=$row->n5/$pembagi;
        $n6=$row->n6/$pembagi;
        $n7=$row->n7/$pembagi;
        $n8=$row->n8/$pembagi;
        $n9=$row->n9/$pembagi;
        $n10=$row->n10/$pembagi;
        $n11=$row->n11/$pembagi;
        $n12=$row->n12/$pembagi;
    }

    $Keu[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
    );

    $no=1;
    for($n=0;$n<=11;$n++){
        
        ${"nr" . $no}= $Keu[0][$n]-$Keu[1][$n];
        $no++;
        
    }

    $Keu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
    round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
    round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
    round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
    );

    //BEBAN PER JENIS NERACA

    $res = execute("select c.kode_akun,d.nama,so_akhir,e.format
    from db_grafik_d a
    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB06','DB07') and c.kode_pp='$kode_pp' and c.so_akhir<>0
    order by c.kode_akun
    ");

    $resmax = execute("select max(a.so_akhir) as so_akhir from (select c.kode_akun,d.nama,so_akhir,e.format
    from db_grafik_d a
    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB06','DB07') and c.kode_pp='$kode_pp' and c.so_akhir<>0
    ) a
    ");

    while($row = $res->FetchNextObject(false)){
        if($resmax->fields[0] == $row->so_akhir){
            $beb[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun,'sliced'=>true,'selected'=>true);
        }else{
            $beb[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);
        }
        
    }                
    //PENDAPATAN PER JENIS NERACA

    $res = execute("select c.kode_akun,d.nama,-c.so_akhir as so_akhir,e.format
    from db_grafik_d a
    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB09') and c.kode_pp='$kode_pp' and c.so_akhir<>0
    order by c.kode_akun
    ");
    
    $resmax2 = execute("select max(a.so_akhir) as so_akhir from (select c.kode_akun,d.nama,-so_akhir as so_akhir,e.format
    from db_grafik_d a
    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB09') and c.kode_pp='$kode_pp' and c.so_akhir<>0
    ) a
    ");
    
    while($row = $res->FetchNextObject(false)){
        
        if($resmax2->fields[0] == $row->so_akhir){
            $pend[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun,'sliced'=>true,'selected'=>true);
        }else{
            $pend[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);
        }
    }   
    
	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>";
            echo "<div class='row'>
                <div class='inner col-xs-12' style='padding-bottom:5px;padding-top:0px'>Beban
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 125px;'>
                        <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8;padding-bottom:0px;'>
                            <span>
                                <p style='text-align:left;margin-bottom:0px !important'>Actual</p>
                                <h3 style='text-align:left;font-size:20px;' id='home_kas_box' style=''>".number_format($agg2->fields[2],0,",",".")."</h3>
                            </span>
                            <span>
                                <p style='text-align:left;margin-bottom:0px !important''>Target</p>
                                <h3 style='text-align:left;font-size:20px;' id='home_kas_box' style=''>".number_format($agg2->fields[3],0,",",".")."</h3>
                            </span>
                        </div>
                        <div class='inner col-xs-4' style='padding-bottom:0px;padding-top:0px;'>
                            <center style='margin: 34px auto;'>
                                <h3 id='home_kas_box' style='font-size:32px;margin-bottom:0px'>".number_format($agg2->fields[4],1,",",".")."%</h3>
                                <span style='font-size: 11px;color:#bab0b0'>This Month</span>
                            </center>
                        </div>
                    </div>
                </div>
                <div class='inner col-xs-12' style='padding-bottom:5px;padding-top:0px'>Pendapatan
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 125px;'>
                        <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8;padding-bottom:0px;'>
                            <span>
                                <p style='text-align:left;margin-bottom:0px !important'>Actual</p>
                                <h3 style='text-align:left;font-size:20px;' id='home_kas_box' style=''>".number_format($agg->fields[2],0,",",".")."</h3>
                            </span>
                            <span>
                                <p style='text-align:left;margin-bottom:0px !important'>Target</p>
                                <h3 style='text-align:left;font-size:20px;' id='home_kas_box' style=''>".number_format($agg->fields[3],0,",",".")."</h3>
                            </span>
                        </div>
                        <div class='inner col-xs-4' style='padding-bottom:0px;padding-top:0px'>
                            <center style='margin: 34px auto;'>
                                <h3 id='home_kas_box' style='font-size:32px;margin-bottom:0px'>".number_format($agg->fields[4],1,",",".")."%</h3>
                                <span style='font-size: 11px;color:#bab0b0'>This Month</span>
                            </center>
                        </div>
                       
                    </div>
                </div>
                <div class='col-md-3 col-xs-4' style='padding-right:5px'>
                    <a href='#' class='small-box-footer'  >
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p style='margin-bottom: 0px;'>YoY</p>
                            <p style='margin-bottom: 0px;font-size: 11px;color:#bab0b0'>Beban</p>
                            <h3 id='home_kas_box' style='margin-bottom: 0px;font-size:20px'>".number_format($s5Beban,2,",",".")."%</h3>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-4' style='padding-right:5px;padding-left:5px'>
                    <a href='#' class='small-box-footer' >
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>";
                            foreach($dfr as $d){
                                $p = '';
                                for($z=0; $z<count($d['par']); $z++){
                                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";
                
                                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];

                                   
                                }
                                $kode=$d['nama_rasio'];
                                echo"
                                <p style='margin-bottom: 0px;'>Gross Profit</p>
                                <p style='margin-bottom: 0px;font-size: 11px;color:#bab0b0'>Ratio</p>
                                <h3 id='home_kas_box' style='margin-bottom: 0px;font-size:20px'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."%</h3>";
                                
                            }
                            echo"
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-4' style='padding-left:5px'>
                    <a href='#' class='small-box-footer' >
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                            <p style='margin-bottom: 0px;'>YoY</p>
                            <p style='margin-bottom: 0px;font-size: 11px;color:#bab0b0'>Pendapatan</p>
                            <h3 id='home_kas_box' style='margin-bottom: 0px;font-size:20px'>".number_format($s5Pendapatan,2,",",".")."%</h3>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Profit and Loss</h3>
                        </div>
                        <div class='box-body box-click' id='box-keu'>
                            <div id='dash_chart_keu'></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Pendapatan</h3>
                        </div>
                        <div class='box-body box-click' id='box-pend'>
                            <div id='dash_chart_pend'></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Beban</h3>
                        </div>
                        <div class='box-body box-click' id='box-beb'>
                            <div id='dash_chart_beb'></div>
                        </div>
                    </div>
                </div>
            </div>";

            

            echo"               
            </div>
       </div>";    

		echo "
        <script type='text/javascript'>
        
        // //PROFIT && LOSS
        Highcharts.chart('dash_chart_keu', {
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
                    format: '{value} jt',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Nilai',
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
            tooltip: {
                shared: true
            },
            series: [{
                type: 'line',
                name: 'Income',
                data: ".json_encode($Keu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: ' jt'
                }
            }, {
                type: 'line',
                name: 'Expense',
                color:'#ff6f69',
                data: ".json_encode($Keu[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            },{
                type: 'line',
                name: 'Net Income',
                color:'#fa9c0a',
                data: ".json_encode($Keu[2]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });


        //PENDAPATAN

        Highcharts.chart('dash_chart_pend', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: ".json_encode($pend)."
            }]
        });

        Highcharts.chart('dash_chart_beb', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: ".json_encode($beb)."
            }]
        });
       
        </script>";

   
?>
