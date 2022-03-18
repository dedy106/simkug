<?php   

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $sts_user=$_SESSION['userStatus'];

    $tmp=explode("/",$_GET['param']);
    if($tmp[0] != ''){
        $periode=$tmp[0];
    }

    if($sts_user == "A"){
        $filter="";
    }else{
        $filter=" and nik='$nik' ";
    }

    $sql0 = "select count(*) from hr_karyawan where kode_lokasi='$kode_lokasi' $filter ";
    $sql1 = "select count(*) from hr_absen where kode_lokasi='$kode_lokasi' $filter ";
    $sql2 = "select count(*) from hr_pelatihan where kode_lokasi='$kode_lokasi' $filter ";
    $sql3 = "select count(*) from hr_penghargaan where kode_lokasi='$kode_lokasi' $filter ";
    $sql4 = "select count(*) from hr_sanksi where kode_lokasi='$kode_lokasi' $filter ";

    $rsb0=execute($sql0);
    $rsb1=execute($sql1);
    $rsb2=execute($sql2);
    $rsb3=execute($sql3);
    $rsb4=execute($sql4);

    $resource = $_GET["resource"];
    $fullId = $_GET["fullId"];
    echo "
    <div class='panel'>
        <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard SDM
        </div>
        <div class='panel-body'>";
    echo   "<div class='row'>";
            $i=0;
            $color = array('yellow', 'blue', 'purple', 'red','green');
            $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
            $headbox = array('Profile', 'Absensi', 'Pelatihan', 'Penghargaan','Sanksi');

            for ($i=0;$i<5;$i++) {
                
                echo"<div class='col-md-15 col-md-3'>
                    <div class='small-box bg-".$color[$i]."'>
                        <div class='inner'>
                            <center>
                                <p>".$headbox[$i]."</p>
                                <h3 id='home_kas_box' style='font-size: 25px'>
                                ".number_format(${"rsb" . $i}->fields[0],0,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.location.href='fMain.php?hal=app/dash/dashTarbakDet.php&param=$periode|$kode_pp|box$i';\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            
                    </div>
                </div>";
            }
    echo "</div>";

    echo"<div id='sai_home_grafik'>
            <div class='row'>
                <div class='col-md-12'>
                    <div class='box box-warning'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Absensi</h3>
                        </div>
                        <div class='box-body'>
                            <div id='dash_main_chart_absen'></div>
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

    $sqlAbsen = "select a.kode_sts,a.nama,isnull(b.jumlah,0) as jum
    from hr_stsabsen a
    left join ( select status,kode_lokasi, count(*) as jumlah
    from hr_absen
    where kode_lokasi='$kode_lokasi' and nik='$nik' and substring(convert(varchar,tanggal,112),1,6) = '201906'
    group by status,kode_lokasi ) b on a.kode_sts=b.status and a.kode_lokasi=b.kode_lokasi ";

    $res = execute($sqlAbsen);
    while ($row = $res->FetchNextObject(false)){
        $Absen[]=array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->kode_sts);  
        $ctgAbsen[]=$row->nama;
    }

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
                    window.location.href='fMain.php?hal=app/dash/dashTarbak.php&param='+periode+'/';
                }
         // }    
    });

    var options3 = {
        chart: {
            renderTo: 'dash_main_chart_absen',
            type: 'column'
        },
        title:{
            text:''
        },
        exporting: { 
            enabled: false
        },
        series: [{ 
             name : 'Jumlah',
             data :".json_encode($Absen).",
             colorByPoint: true
        }],
        xAxis: {
            title: {
                text: null
            },
            categories: ".json_encode($ctgAbsen).",
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

    options3.plotOptions = {
        series: {
            dataLabels: {
                enabled: true
            },
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        // var id = this.name;    
                        var kd= this.options.key;
                        // alert(kd);                        
                        window.location.href='#';
                    }
                }
            }
        }
    };

    new Highcharts.Chart(options3);

    </script>";

?>