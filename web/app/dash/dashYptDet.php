<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $kode_fs="FS1";

    $tmp=explode("|",$_GET['param']);
    $periode=$tmp[0];
    $kode_pp=$tmp[1];
    $box=$tmp[2];

    switch($box){
        case "keu" :
        $judul = "Keuangan";
        break;
        case "pbh" :
        $judul = "Pembendaharaan";
        break;
        case "rra" :
        $judul = "RRA Anggaran";
        break;
        case "agg" :
        $judul = "Anggaran";
        break;
    }

    $back1="";
    $backto="$fmain?hal=app/dash/dashYpt.php";

    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";

    switch($box){
        case "keu" :
         // KEUANGAN
        $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
            from db_grafik_d a
            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
            group by a.kode_grafik,a.kode_lokasi 
            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
        ";

        $rs = execute($sqlBox); 

        //KEUANGAN
        echo"<div class='row'>
            <div class='col-sm-12'><h4>Keuangan</h4></div>
        </div>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->nama."</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($nilai,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|all|$row->kode_grafik|$row->nama';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                               
                        </div>
                    </div>";
            $i++;
        }

        
        $sql = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
        from db_rasio_d a
        inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
        inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1'  and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp' order by a.kode_rasio";

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

        foreach($dfr as $d){
                $p = '';
                for($z=0; $z<count($d['par']); $z++){
                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";

                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];
                }
                $kode=$d['nama_rasio'];
         echo  "<div class='col-md-12 col-md-3'>
                    <div class='small-box bg-aqua'>
                        <div class='inner'>
                            <center>
                                <p>".$d['nama_rasio']."</p>
                                <h3 id='home_kas_box' style='font-size: 25px;'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa fa-bank'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|all|OR|OR';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            
                    </div>
                </div>";             
        }

       
         echo"           
                </div>"; 
        break;
        case "pbh" :
        // PEMBENDAHARAAN
        $sqla1 = "select count(*) as jum,sum(a.nilai) as nilai
                from it_aju_m a
                where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode='$periode'  and a.progress in ('0','R')
                ";
        $sqla2 = "select count(*) as jum,sum(b.nilai) as nilai
                from ver_m a
                inner join it_aju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress='1'
                ";
        $sqla3 = "select count(*) as jum,sum(b.nilai) as nilai
                from fiat_m a
                inner join it_aju_m b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress='2'
                ";
        $sqla4 = "select count(a.no_spb) as jum,sum(a.nilai) as nilai from (select distinct a.*
                from it_spb_m a
                inner join it_aju_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' and b.progress='S'
                ) a ";
        $sqla5 = "select count(*) as jum,sum(a.nilai) as nilai from (select distinct a.*
                from kas_m a 
                inner join it_aju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' and b.progress='3'
                ) a
                ";
        $rsa0=execute($sqla1);
        $rsa1=execute($sqla2);
        $rsa2=execute($sqla3);
        $rsa3=execute($sqla4);
        $rsa4=execute($sqla5);

        echo"<div class='row'>
            <div class='col-sm-12'><h4>Pembendaharaan</h4></div>
        </div>";
        // PEMBENDAHARAAN
        echo   "<div class='row'>";
       
        $i=0;
        
        $color = array('yellow', 'blue', 'purple', 'red','green');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
        $judul =array('Pengajuan','Approval VP','Approval Dir Unit','Approval RRA Anggaran','Approval Direksi');
        // while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[0]."'>
                            <div class='inner'>
                                <center>
                                    <p>Pengajuan</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa0->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[0]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|pb|k1|PB';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[1]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi Dokumen</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa1->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[1]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|pb|k2|PB';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[2]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi Akun</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa2->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[2]."'></i></div>
                                 <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|pb|k3|PB';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[3]."'>
                            <div class='inner'>
                                <center>
                                    <p>SPB</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa3->fields[0],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[3]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|pb|k4|PB';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                            <div class='small-box bg-".$color[4]."'>
                                <div class='inner'>
                                    <center>
                                        <p>Pembayaran</p>
                                        <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa4->fields[0],0,",",".")."</h3>
                                    </center>
                                </div>
                                <div class='icon'><i class='fa ".$icon[4]."'></i></div>
                                    <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|pb|k5|PB';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            </div>
                    </div>";
            $i++;
        // }

         echo"           
                </div>";
        
        break;
        case "rra" :
        // RRA ANGGARAN
         $sqlb1 = "select count(*) as jum,sum(a.nilai) as nilai
         from rra_pdrk_d a
         inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
         where b.modul='MULTI' and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and b.periode='$periode' and a.dc='D'
                 ";
         $sqlb2 = "select count(*) as jum,sum(a.nilai) as nilai
         from rra_pdrk_d a
         inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
         where b.progress in ('1') and b.modul='MULTI' and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and b.periode='$periode' and a.dc='D' ";
       
        $rsb0=execute($sqlb1);
        $rsb1=execute($sqlb2);

        echo"<div class='row'>
            <div class='col-sm-12'><h4>RRA Anggaran</h4></div>
        </div>";

        // RRA ANGGARAN
        echo   "<div class='row'>";
                $i=0;
                $judul =array('Pengajuan','Approval RRA');
                $color = array('yellow', 'blue');
                $icon = array('fa-money', 'fa-area-chart');
                // while ($row = $rsBox2->FetchNextObject($toupper=false)) {
                for ($i=0;$i<2;$i++){
                    // $nilai=$row->nilai;
        
                echo"       <div class='col-md-15 col-md-3'>
                                <div class='small-box bg-".$color[$i]."'>
                                    <div class='inner'>
                                        <center>
                                            <p>".$judul[$i]."</p>
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rsb" . $i}->fields[0],0,",",".")."</h3>
                                        </center>
                                    </div>
                                    <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                        <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|rra|app$i|RRA';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                        
                                </div>
                            </div>";
                
                    // $i++;
                }
        
                 echo"           
                        </div>"; 
        
        break;
        case "agg" :
        //ANGGARAN
                 
        $sqlb4 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'
                ";
        $sqlb3 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'
                ";
        $sqlb5 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB12') and a.kode_lokasi='$kode_lokasi'
                ";

        $rsb2=execute($sqlb3);
        $rsb3=execute($sqlb4);
        $rsb4=execute($sqlb5);
        echo"<div class='row'>
            <div class='col-sm-12'><h4>Anggaran</h4></div>
        </div>";

        echo   "<div class='row'>";
                $i=0;
                $judul =array('Pengajuan','Approval RRA','Pendapatan','Beban','Investasi');
                $color = array('yellow', 'blue', 'purple', 'red','green');
                $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
                // while ($row = $rsBox2->FetchNextObject($toupper=false)) {
                for ($i=2;$i<5;$i++){
                    // $nilai=$row->nilai;
        
                echo"       <div class='col-md-15 col-md-3'>
                                <div class='small-box bg-".$color[$i]."'>
                                    <div class='inner'>
                                        <center>
                                            <p>".$judul[$i]."</p>
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rsb" . $i}->fields[1],0,",",".")."</h3>
                                        </center>
                                    </div>
                                    <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                        <a href='#' class='small-box-footer' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|rra|app$i|RRA';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                </div>
                            </div>";
                
                    // $i++;
                }
        
                 echo"           
                        </div>"; 
        
        break;
    }

        echo "<aside class='control-sidebar control-sidebar-dark' style='padding-bottom:500px;background: #ccc;'>
        <div class='tab-content'>
        <div class='tab-pane active' id='control-sidebar-home-tab'>
        <select class='form-control input-sm' id='dash_lok' style='margin-bottom:5px;'>
        <option value=''>Pilih Sekolah</option>";
        $resLok = execute("select a.kode_pp,a.nama
        from pp a
        inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and b.nik='$nik' ");

        while ($row = $resLok->FetchNextObject(false)){
            if($row->kode_pp == $kode_pp){
                $selected = "selected";
            }else{
                $selected = "";
            }
            echo " <option value=".$row->kode_pp." $selected>".$row->kode_pp."-".$row->nama." </option>";
        }

        echo"
        </select>
        <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
        <option value=''>Pilih Periode</option>";
        $resPer = execute("select distinct periode from periode where kode_lokasi='$kode_lokasi' order by periode desc");

        while ($row = $resPer->FetchNextObject(false)){
            if($row->periode == $periode){
                $selected = "selected";
            }else{
                $selected = "";
            }
            echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
        }

        echo"
        </select>
        <a class='btn btn-sm btn-default pull-right' id='dash_refresh' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
        </div>
        </div>
        </aside>";

        echo"</div>
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>

        $('#dash_lokasi').hide();

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('click', '#open-sidebar', function(){
            
            if($('aside').hasClass('control-sidebar-open')){
                 $('aside').removeClass('control-sidebar-open');
            }else{
                 $('aside').addClass('control-sidebar-open');
            }
        });


        $('#control-sidebar-home-tab').on('click','#dash_refresh', function(){
            var kode_pp = $('#dash_lok').val();
            var periode = $('#dash_periode').val();
            // alert(lokasi);
            if (kode_pp == '' && periode ==''){
                window.location.href='fMainMobile.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|$box';
            }else{
                if(kode_pp == '' && periode != '' ){
                    window.location.href='fMainMobile.php?hal=app/dash/dashYptDet.php&param='+periode+'|$kode_pp|$box';
                }else if(kode_pp != '' && periode == ''){
                    window.location.href='fMainMobile.php?hal=app/dash/dashYptDet.php&param=$periode|'+kode_pp+'|$box';
                }else{
                    window.location.href='fMainMobile.php?hal=app/dash/dashYptDet.php&param='+periode+'|'+kode_pp+'|$box';
                }
            } 
           
        });
        </script>";
       

?>
