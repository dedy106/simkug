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

    switch($box){
        case "cbb" :
        $judul = "Cash - Bank";
        break;
        case "opr" :
        $judul = "Operating Ratio";
        break;
        case "clr" :
        $judul = "Collection Ratio";
        break;
        case "agg" :
        $judul = "Budget and Actual";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYspte.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYspte.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";

    switch($box){
        case "cbb" :
 echo "<div class='row' >";
        echo "<div class='box' style='box-shadow:none;border:0;border-radius:10px'>
                <div class='box-header'>
                    <i class='fa fa-balance-scale'> </i>
                    <h3 class='box-title'>Today's Cash & Bank Balance</h3>
                </div>
                <div class='box-body pad'>
                    <table class='table no-border'>";
                    
                    $res = execute("select c.kode_akun,d.nama,so_akhir,e.format
                    from db_grafik_d a
                    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0
                    order by c.kode_akun
                    ");
                    while($row=$res->FetchNextObject($toupper)){
                        echo"
                        <tr>
                            <td>$row->nama</td>
                            <td style='text-align:right'>".number_format($row->so_akhir,0,",",".")."</td>
                        </tr>";
                    }
                    echo"
                    </table>
                </div>
            </div>
        </div>";
        
        break;
        case "opr" :

        $sqlPend = "select 
        case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                        sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                            from db_grafik_d a
                            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs'
                            group by a.kode_grafik,a.kode_lokasi
                        )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'
                  ";

        $rsp = execute($sqlPend);
        $pend =$rsp->fields[0];

        $sqlBeb = "select 
        case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                        sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                            from db_grafik_d a
                            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs'
                            group by a.kode_grafik,a.kode_lokasi
                        )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'
                  ";
        $rsb = execute($sqlBeb);
        $beb = $rsb->fields[0];

        $or = round($beb/$pend,2)*100;
    
        echo "<div class='row' >";
            echo "<div class='col-md-6 col-xs-12'>
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 140px;'>
                        <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                            <span>
                                <p style='text-align:left'>Beban</p>
                                <h3 style='text-align:right;font-size:25px;' id='home_kas_box' style=''>".number_format($beb,0,",",".")."</h3>
                            </span>
                            <span>
                                <p style='text-align:left'>Pendapatan</p>
                                <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='home_kas_box' style=''>".number_format($pend,0,",",".")."</h3>
                            </span>
                            
                        </div>
                        <div class='inner col-xs-4'>
                            <center style='margin: 30% auto;'>
                                <h3 id='home_kas_box' style='font-size:30px'>".number_format($or,1,",",".")."%</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>Current Year</p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>";

        break;
        case "clr" :

        $sqlcol="select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
        from (
        select kode_lokasi, kode_pp,sum(nilai) as tot_bill
        from sis_bill_d
        where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$periode."' 
        group by kode_lokasi,kode_pp
        ) a
        inner join 
        (select kode_lokasi, kode_pp,sum(nilai) as tot_byr
        from sis_rekon_d
        where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$periode."' 
        group by kode_lokasi,kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        ";
        $rscol =execute($sqlcol); 
        $bill = $rscol->fields[0];
        $byr = $rscol->fields[1];
        $nilcol = $rscol->fields[2];
    echo "<div class='row' >";
        echo "<div class='col-md-6 col-xs-12'>
                <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 140px;'>
                    <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                        <span>
                            <p style='text-align:left'>Piutang</p>
                            <h3 style='text-align:right;font-size:25px;' id='home_kas_box' style=''>".number_format($bill,0,",",".")."</h3>
                        </span>
                        <span>
                            <p style='text-align:left'>Kas</p>
                            <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='home_kas_box' style=''>".number_format($byr,0,",",".")."</h3>
                        </span>
                    </div>
                    <div class='inner col-xs-4'>
                        <center style='margin: 30% auto;'>
                            <h3 id='home_kas_box' style='font-size:30px'>".number_format($nilcol,1,",",".")."%</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                        </center>
                    </div>
                </div>
            </div>
        </div>";
        break;
        case "agg" :

  echo "<div class='row' >";
        echo "<div class='col-md-6 col-xs-12'>
                <style>.nav-tabs-custom > .nav-tabs > li {
                                            
                    width: 25%;
                    max-width:90px;
                    text-align: center;

                }

                .nav-tabs-custom > .nav-tabs > li.active {
                    border-top:3px solid white;
                
                }
                .nav-tabs-custom > .nav-tabs > li.active > a {
                    border:0px solid white;
                    border-bottom:3px solid #dd4b39;
                }
                .nav-tabs-custom > .nav-tabs > li.active > a:hover {
                    border:0px solid white;
                    border-bottom:3px solid #dd4b39;
                
                }
                </style>
                <div class='nav-tabs-custom' style='box-shadow: 0 0 0 white;'>
                    <ul class='nav nav-tabs'>
                        <li class='active'><a href='#tab_pen' data-toggle='tab'>Pendapatan</a></li>
                        <li><a href='#tab_beb' data-toggle='tab'>Beban</a></li>
                        <li><a href='#tab_shu' data-toggle='tab'>SHU</a></li>
                    </ul>
                    <div class='tab-content'>";
                        echo "
                        <div class='tab-pane active' id='tab_pen'>";

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
                
                        echo "<div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 140px;'>
                                <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                    <span>
                                        <p style='text-align:left'>Budget</p>
                                        <h3 style='text-align:right;font-size:25px;' id='home_kas_box' style=''>".number_format($agg->fields[3],0,",",".")."</h3>
                                    </span>
                                    <span>
                                        <p style='text-align:left'>Actual</p>
                                        <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='home_kas_box' style=''>".number_format($agg->fields[2],0,",",".")."</h3>
                                    </span>
                                </div>
                                <div class='inner col-xs-4'>
                                    <center style='margin: 30% auto;'>
                                        <h3 id='home_kas_box' style='font-size:30px'>".number_format($agg->fields[4],1,",",".")."%</h3>
                                        <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                    </center>
                                </div>
                            </div>";
                        echo "
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                    <div id='dash_chart_pend'></div>
                                </div>
                            </div>";
                    echo"</div>
                    <!-- /.tab-pane -->";
                    echo "
                         <div class='tab-pane' id='tab_beb'>";
                         
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
                
                        echo "<div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 140px;'>
                                <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                    <span>
                                        <p style='text-align:left'>Budget</p>
                                        <h3 style='text-align:right;font-size:25px;' id='home_kas_box' style=''>".number_format($agg2->fields[3],0,",",".")."</h3>
                                    </span>
                                    <span>
                                        <p style='text-align:left'>Actual</p>
                                        <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='home_kas_box' style=''>".number_format($agg2->fields[2],0,",",".")."</h3>
                                    </span>
                                </div>
                                <div class='inner col-xs-4'>
                                    <center style='margin: 30% auto;'>
                                        <h3 id='home_kas_box' style='font-size:30px'>".number_format($agg2->fields[4],1,",",".")."%</h3>
                                        <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                    </center>
                                </div>
                            </div>";
                        echo "
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                    <div id='dash_chart_beb'></div>
                                </div>
                            </div>
                         </div>";
                    echo "
                         <div class='tab-pane' id='tab_shu'>";
                        $sqlagg3= "select a.kode_grafik,a.nama,
                        isnull(b.nilai,0) as nilai,
                        isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
                        from db_grafik_m a
                        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                                        sum(b.n2) as gar
                                            from db_grafik_d a
                                            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                            group by a.kode_grafik,a.kode_lokasi
                                        )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
                        where a.kode_grafik in ('DB04') and a.kode_lokasi='$kode_lokasi'";

                        $agg3 = execute($sqlagg3);
                
                        echo "<div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 140px;'>
                                <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                    <span>
                                        <p style='text-align:left'>Budget</p>
                                        <h3 style='text-align:right;font-size:25px;' id='home_kas_box' style=''>".number_format($agg3->fields[3],0,",",".")."</h3>
                                    </span>
                                    <span>
                                        <p style='text-align:left'>Actual</p>
                                        <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='home_kas_box' style=''>".number_format($agg3->fields[2],0,",",".")."</h3>
                                    </span>
                                </div>
                                <div class='inner col-xs-4'>
                                    <center style='margin: 30% auto;'>
                                        <h3 id='home_kas_box' style='font-size:30px'>".number_format($agg3->fields[4],1,",",".")."%</h3>
                                        <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                    </center>
                                </div>
                            </div>";
                        echo "
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                    <div id='dash_chart_shu'></div>
                                </div>
                            </div>
                         </div>";
                echo"
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
            </div>
        </div>";

        $pembagi=1000000;
        $sqlPB = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12   
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB02'
        group by a.kode_lokasi";
            
        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
        $resPB = execute($sqlPB);
        while ($row = $resPB->FetchNextObject(false)){
            
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
            
        $Pdpt[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );
        
        $sqlPA = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB02'
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resPA = execute($sqlPA);
        while ($row = $resPA->FetchNextObject(false)){
            
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

        $Pdpt[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
        round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
        round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
        round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        //BEBAN
        
        $pembagi=1000000;
        $sqlBB = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12   
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB03'
        group by a.kode_lokasi";
            
        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
        $resBB = execute($sqlBB);
        while ($row = $resBB->FetchNextObject(false)){
            
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
            
        $Beban[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );
        
        $sqlBA = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB03'
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resBA = execute($sqlBA);
        while ($row = $resBA->FetchNextObject(false)){
            
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

        $Beban[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
        round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
        round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
        round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );
        //SHU
        
        $pembagi=1000000;
        $sqlSHUB = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then a.n2 else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then a.n2 else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then a.n2 else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then a.n2 else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then a.n2 else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then a.n2 else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then a.n2 else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then a.n2 else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then a.n2 else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then a.n2 else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then a.n2 else 0 end) n11,
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.n2 else 0 end) n12   
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB04'
        group by a.kode_lokasi";
            
        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
        $resSHUB = execute($sqlSHUB);
        while ($row = $resSHUB->FetchNextObject(false)){
            
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
            
        $SHU[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );
        
        $sqlSHU = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB04'
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resSHU = execute($sqlSHU);
        while ($row = $resSHU->FetchNextObject(false)){
            
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

        $SHU[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
        round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
        round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
        round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        break;

        
    }

        

        echo"
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>
        Highcharts.chart('dash_chart_pend', {
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
                type: 'column',
                name: 'Budget',
                data: ".json_encode($Pdpt[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: '  jt'
                }
            }, {
                type: 'column',
                name: 'Actual',
                color:'#ff6f69',
                data: ".json_encode($Pdpt[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });


        Highcharts.chart('dash_chart_beb', {
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
                type: 'column',
                name: 'Budget',
                data: ".json_encode($Beban[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: '  jt'
                }
            }, {
                type: 'column',
                name: 'Actual',
                color:'#ff6f69',
                data: ".json_encode($Beban[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });

        Highcharts.chart('dash_chart_shu', {
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
                type: 'column',
                name: 'Budget',
                data: ".json_encode($SHU[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: '  jt'
                }
            }, {
                type: 'column',
                name: 'Actual',
                color:'#ff6f69',
                data: ".json_encode($SHU[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });
      
        </script>";
       

?>
