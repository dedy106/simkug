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
        case "keu" :
        $judul = "Keuangan";
        break;
        case "rra" :
        $judul = "RRA Anggaran";
        break;
        case "piu" :
        $judul = "Piutang";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYptPp2.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYptPp2.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";

    switch($box){
        case "keu" :
        echo"
                <div id='sai_home_grafik'>
                    <div class='row'>
                        <div class='col-md-8'>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Pendapatan - Beban</h3>
                                    </div>
                                    <div class='box-body box-click' id='box-keu'>
                                        <div id='dash_chart_keu'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Cash in - Cash out</h3>
                                    </div>
                                    <div class='box-body box-click' id='box-cash'>
                                        <div id='dash_chart_cash'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-line-chart'></i> <h3 class='box-title'>Growth Pendapatan</h3>
                                    </div>
                                    <div class='box-body pad'>
                                        <div id='home_rev_chart4'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-line-chart'> </i>
                                        <h3 class='box-title'>Growth Beban</h3>
                                    </div>
                                    <div class='box-body pad'>
                                        <div id='home_rev_chart5'> </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Beban</h3>
                                    </div>
                                    <div class='box-body box-click' id='box-pend'>
                                        <div id='dash_chart_pend'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Pendapatan</h3>
                                    </div>
                                    <div class='box-body box-click' id='box-beb'>
                                        <div id='dash_chart_beb'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-4 box-click' style=''>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-line-chart'> </i>
                                    <h3 class='box-title'>Cash & Bank Balance</h3>
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
                                            <td>".number_format($row->so_akhir,0,",",".")."</td>
                                        </tr>";
                                    }
                                    echo"
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
                
                $pembagi=1000000;
                //SQL PEND & BEBAN
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

                //SQL CASH IN OUT

                $sqlIn= "select	a.kode_lokasi,a.kode_pp,sum(case when substring(a.periode,5,2)='01' then a.debet else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.debet else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.debet else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.debet else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.debet else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.debet else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.debet else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.debet else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.debet else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.debet else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.debet else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.debet else 0 end) n12
                from (
                    select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_pp,c.kode_lokasi
                    from db_grafik_d a
                    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB10' and c.kode_pp='$kode_pp' and c.so_akhir<>0
                ) a
                where substring(a.periode,1,4) = '".substr($periode,0,4)."' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'
                group by a.kode_lokasi,a.kode_pp";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resIn = execute($sqlIn);
                while ($row = $resIn->FetchNextObject(false)){
                    
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
                
                $Cash[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                
                $sqlOut = "select	a.kode_lokasi,a.kode_pp,sum(case when substring(a.periode,5,2)='01' then a.kredit else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.kredit else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.kredit else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.kredit else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.kredit else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.kredit else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.kredit else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.kredit else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.kredit else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.kredit else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.kredit else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.kredit else 0 end) n12
                from (
                    select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_pp,c.kode_lokasi
                    from db_grafik_d a
                    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB10' and c.kode_pp='$kode_pp' and c.so_akhir<>0
                ) a
                where substring(a.periode,1,4) = '".substr($periode,0,4)."' 
                group by a.kode_lokasi,a.kode_pp";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resOut = execute($sqlOut);
                while ($row = $resOut->FetchNextObject(false)){
                    
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
                
                $Cash[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );


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
                        $pend[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun,'sliced'=>true,'selected'=>true);
                    }else{
                        $pend[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);
                    }
                    
                }                

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
                        $beb[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun,'sliced'=>true,'selected'=>true);
                    }else{
                        $beb[] = array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);
                    }
                }   
                
                //GROW
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
                where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'";
                $res = execute($sql);
                        
                while ($row = $res->FetchNextObject(false)){
                    // $series4[$row->nama] = floatval($row->nilai);
                    ${"s4" . $row->nama} = round(floatval($row->grow),2);
                    ${"s5" . $row->nama} = round(floatval($row->youth),2);
                }

        echo"
        <script>
        Highcharts.chart('dash_chart_keu', {
            title: {
                text: ''
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
                name: 'Pendapatan',
                data: ".json_encode($Keu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: ' jt'
                }
            }, {
                type: 'column',
                name: 'Beban',
                color:'#ff6f69',
                data: ".json_encode($Keu[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });

        Highcharts.chart('dash_chart_cash', {
            title: {
                text: ''
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
                name: 'Cash In',
                data: ".json_encode($Cash[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: '  jt'
                }
            }, {
                type: 'column',
                name: 'Cash Out',
                color:'#ff6f69',
                data: ".json_encode($Cash[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });

        Highcharts.chart('dash_chart_pend', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
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

        Highcharts.chart('home_rev_chart4', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5Pendapatan)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#DF5353' // red
                },{
                    from: 80,
                    to: 100,
                    color: '#55BF3B' // green
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Pendapatan',
                data: [".json_encode($s4Pendapatan)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });

        Highcharts.chart('home_rev_chart5', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5Beban)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#55BF3B' // green
                },{
                    from: 80,
                    to: 100,
                    color: '#DF5353' // red
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Beban',
                data: [".json_encode($s4Beban)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });
        
        Highcharts.chart('home_rev_chart6', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5SHU)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#DF5353' // red
                },{
                    from: 80,
                    to: 100,
                    color: '#55BF3B' // green
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'SHU',
                data: [".json_encode($s4SHU)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });
        </script>";

        break;
        
    }

        

        echo"
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>

      
        </script>";
       

?>
