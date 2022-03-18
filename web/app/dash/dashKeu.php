<?php   

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $tmp=explode("/",$_GET['param']);
    if($tmp[0] != ''){
        $periode=$tmp[0];
    }

    $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
    from db_grafik_m a
    left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
    from db_grafik_d a
    inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
    where a.kode_lokasi='$kode_lokasi' and b.periode='$periode'
    group by a.kode_grafik,a.kode_lokasi
    )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
    where a.kode_grafik in ('DB01','DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
    ";

    $rs = execute($sqlBox);  

    $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

    $rs2=execute($jumNot);

    $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

    $rs3=execute($sqlNot);

    $resource = $_GET["resource"];
    $fullId = $_GET["fullId"];
    echo "
    <div class='panel'>
        <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan  
        <!--<a class='btn btn-sm btn-primary pull-right' href='fMain.php?hal=app/dash/fJurnal.php' style='margin-right: 16px;'><i class='fa fa-pencil'></i> Jurnal</a>--> 
        </div>
        <div class='panel-body'>";
    echo   "<div class='row'>";
            $i=0;
            $color = array('yellow', 'blue', 'purple', 'red');
            $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
            while ($row = $rs->FetchNextObject($toupper=false)) {
                $nilai=$row->nilai;
                
            echo"<div class='col-md-15 col-md-3'>
                    <div class='small-box bg-".$color[$i]."'>
                        <div class='inner'>
                            <center>
                            <p>".$row->nama."</p>
                            <h3 id='home_kas_box' style='font-size: 25px'>".number_format($nilai,0,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                        <a href='#' class='small-box-footer' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet.php&param=$kode_lokasi|$periode|all|$row->kode_grafik|$kode_pp|$nik|$row->nama';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                </div>";
                $i++;
            }


            $sql = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
            from db_rasio_d a
            inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
            inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1' order by a.kode_rasio";

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
                echo  "<div class='col-md-15 col-md-3'>
                <div class='small-box bg-aqua'>
                    <div class='inner'>
                        <center>
                        <p>".$d['nama_rasio']."</p>
                        <h3 id='home_kas_box' style='font-size: 25px;'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-bank'></i></div>
                        <a href='#' class='small-box-footer' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet.php&param=$kode_lokasi|$periode|all|$kode|$kode_pp|$nik|OR';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                    </div>
                </div>";             
            }
        echo"           
            </div>"; 

    echo"<div id='sai_home_grafik'>
            <div class='row'>
                <div class='col-md-12'>
                    <div class='box box-warning'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Laba Rugi</h3>
                        </div>
                        <div class='box-body'>
                            <div id='dash_main_chart_labarugi'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>";


    echo "<aside class='control-sidebar control-sidebar-dark' style='padding-bottom:500px;'>
                <div class='tab-content'>
                    <div class='tab-pane active' id='control-sidebar-home-tab'>
                        <select class='form-control input-sm' id='dash_lokasi' style='margin-bottom:5px;' hidden>
                            <option value=''>Pilih Lokasi</option>";
                            $resLok = execute("select distinct kode_lokasi from lokasi order by kode_lokasi");
                            while ($row = $resLok->FetchNextObject(false)){
                                echo " <option value=".$row->kode_lokasi.">".$row->kode_lokasi."</option>";
                            }
                        echo"  
                        </select>
                        <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
                            <option value=''>Pilih Periode</option>";
                            $resPer = execute("select distinct periode from gldt where kode_lokasi='$kode_lokasi' order by periode desc");

                            while ($row = $resPer->FetchNextObject(false)){
                                echo " <option value=".$row->periode.">".$row->periode."</option>";
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

    $sqlLB = "select a.kode_lokasi,
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
    where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik='DB04' --a.kode_neraca='10' 
    group by a.kode_lokasi";

    $res = execute($sqlLB);
    while ($row = $res->FetchNextObject(false)){
        $LB["series"][] = array("name" =>"Laba Rugi", "data" => array(
            round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
            round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
            round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
            round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
        ));
    }	

    echo "
    <script type='text/javascript'>

    $('#dash_lokasi').hide();

    var options = {
        chart: {
            renderTo: 'dash_main_chart_labarugi',
            type: 'line'
        },
        title:{
            text:''
        },
        exporting: { 
            enabled: false
        },
        series: ".json_encode($LB["series"]).",
        xAxis: {
            title: {
                text: null
            },
            categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
        },
        yAxis:{
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        credits: {
            enabled: false
        },
    };

    options.plotOptions = {
        series: {
            dataLabels: {
                enabled: true
            },
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        var id = this.name;    
                        var kd= this.options.key;
                        // alert(kd);                        
                        // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                    }
                }
            }
        }
    };

    new Highcharts.Chart(options);


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
        var lokasi = $('#dash_lokasi').val();
        var periode = $('#dash_periode').val();
        // alert(lokasi);
        // if (lokasi == '' && periode ==''){
            //     alert('Harap isi terlebih dahulu lokasi dan periode nya');
        // }else{
            //  if(lokasi == ''){
                //  alert('Harap isi terlebih dahulu lokasi nya');   
                //}else 
                if(periode == ''){
                    alert('Harap isi terlebih dahulu periode nya');
                }else{
                    window.location.href='fMain.php?hal=app/dash/dashKeu.php&param='+periode+'/';
                }
         // }    
    });
    </script>";

?>