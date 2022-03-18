<?php


    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];

    $sqlSis = "select isnull(count(distinct(nim)),0) as siswa from dev_siswa where kode_lokasi='$kode_lokasi'";
    $sqlTgh = "select isnull(count(distinct(no_tagihan)),0) as tgh from dev_tagihan_m where kode_lokasi='$kode_lokasi'";
    $sqlPbyr = "select isnull(count(distinct(no_bayar)),0) as pbyr from dev_bayar_m where kode_lokasi='$kode_lokasi'";
    $sqlOts = "select isnull(count(a.no_tagihan),0) as ots from (select c.no_tagihan,d.nama,c.tanggal,c.keterangan,isnull(a.nilai,0) as nilai_t, isnull(b.nilai,0) as nilai_b ,isnull(a.nilai,0)-isnull(b.nilai,0) as saldo
				from dev_tagihan_m c inner JOIN
				(select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan 
				left join 
				(select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan 
				inner join dev_siswa d on c.nim=d.nim
                where isnull(a.nilai,0)-isnull(b.nilai,0)>0 and c.kode_lokasi='$kode_lokasi') a ";
    
    $rs = execute($sqlSis);        
    $rs2 = execute($sqlTgh);
    $rs3 = execute($sqlPbyr);
    $rs4 = execute($sqlOts);

?>

<div class='panel'>
    <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> Dashboard 
        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px'><i class='fa fa-undo'> Refresh</i></a>
    </div>
    <div class='panel-body'>
        <div class='row'>
            <div class='col-md-12 col-md-3'>
                <div class='small-box bg-yellow'>
                    <div class='inner'>
                        <center>
                            <p>Siswa</p>
                            <h3 id='home_siswa_box'><?=$rs->fields[0]?></h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-line-chart'></i></div>
                    <a href='#' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>
            <div class='col-md-12 col-md-3'>
                <div class='small-box bg-blue'>
                    <div class='inner'>
                        <center>
                        <p>Tagihan</p>
                        <h3 id='home_tgh_box'><?=$rs2->fields[0]?></h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-money'></i></div>
                    <a href='#' class='small-box-footer'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>
            <div class='col-md-12 col-md-3'>
                <div class='small-box bg-purple'>
                    <div class='inner'>
                        <center>
                        <p>Pembayaran</p>
                        <h3 id='home_pbyr_box'><?=$rs3->fields[0]?></h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-pie-chart'></i></div>
                    <a href='#' class='small-box-footer' > Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>
            <div class='col-md-12 col-md-3'>
                <div class='small-box bg-red'>
                    <div class='inner'>
                        <center>
                        <p>Outstanding</p>
                        <h3 id='home_ots_box'><?=$rs4->fields[0]?></h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-credit-card'></i></div>
                    <a href='#' class='small-box-footer' style='cursor:pointer;color:white'> Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>
        </div>
        <div class='row'>
            <div id='sai_home_list'>
                <div class='box-header with-border'>
                    <h3 class='box-title'>Tagihan Per Jurusan</h3>                      
                    <div class='box-tools pull-right'>
                        <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                        </button>
                        <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                    </div>
                </div>
                <div class='box-body'>
                    <div class='table-responsive'>
                        <table width='100%' class='table table-bordered table-striped' id='table-progress-tagihan'>
                            <thead>
                                <tr>
                                    <th>Kode Jurusan</th>
                                    <th>Nama Jurusan</th>
                                    <th>Jumlah</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php
                            
                                $sqltagihan = "select a.kode_jur,a.nama,isnull(b.jumlah,0) as jumlah,isnull(b.nilai,0) as nilai
                                from dev_jur a
                                inner join (select b.kode_jur,a.kode_lokasi,count(b.kode_jur) as jumlah,sum(c.nilai) as nilai
                                from dev_tagihan_m a
                                inner join dev_siswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
                                inner join (select no_tagihan,kode_lokasi,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan,kode_lokasi) c on a.no_tagihan=c.no_tagihan and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='2018'
                                group by b.kode_jur,a.kode_lokasi
                                )b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
                                where a.kode_lokasi='$kode_lokasi'";
                                
                                $rs5 = execute($sqltagihan); 
                                while ($row = $rs5->FetchNextObject($toupper=false))
                                {
                                    echo" 
                                    <tr>
                                    <td><a style='cursor:pointer;color:blue'>$row->kode_jur</a></td>
                                    <td>$row->nama</td>
                                    <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                    <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                    </tr>";
                                }

                            ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id='sai_home_timeline' hidden>
            </div>
            <div id='sai_home_tracing' hidden>
            </div>
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Jumlah</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Nilai</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Tagihan</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='home_tgh_chartJum'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='home_tgh_chartNil'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_3' data-toggle='tab'>Jumlah</a></li>
                                <li><a href='#tab_4' data-toggle='tab'>Nilai</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Pembayaran</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_3'>
                                    <div id='home_pbyr_chartJum'></div>
                                </div>
                                <div class='tab-pane' id='tab_4'>
                                    <div id='home_pbyr_chartNil'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php

    $res = execute("select a.nim,b.nama,count(a.no_tagihan) as jumlah from dev_tagihan_m a 
    inner join dev_siswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' group by a.nim,b.nama");
    while ($row = $res->FetchNextObject(false)){
        $tghjs["series"][] =array($row->nim, floatval($row->jumlah));
        $tghju[] =array('y'=>floatval($row->jumlah),'name'=>$row->nama,'key'=>$row->nim);
        $tghjc[] = $row->nama;
    }

    $res = execute("select a.nim,count(a.no_bayar) as jumlah
    from dev_bayar_m a 
    where a.kode_lokasi='$kode_lokasi'
    group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $pbyrjs["series"][] = array($row->nim, floatval($row->jumlah));
        $pbyrjc[] = $row->nim;
    }

    $res = execute("select a.nim,sum(b.nilai) as nilai
    from dev_tagihan_m a 
    inner join dev_tagihan_d b on a.no_tagihan=b.no_tagihan
    where a.kode_lokasi='$kode_lokasi' group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $tghns["series"][] = array($row->nim, floatval($row->nilai));
        $tghnc[] = $row->nim;
    }

    $res = execute("select a.nim,sum(b.nilai) as nilai
    from dev_bayar_m a inner join dev_bayar_d b on a.no_bayar=b.no_bayar
    where a.kode_lokasi='$kode_lokasi'
    group by a.nim");

    while ($row = $res->FetchNextObject(false)){
        $pbyrns["series"][] = array($row->nim, floatval($row->nilai));
        $pbyrnc[] = $row->nim;
    }
        
?>

<script type='text/javascript'>

var table2 = $('#table-progress-tagihan').DataTable({
    // 'fixedHeader': true,
    'scrollY': '200px',
    // 'scrollX': '0px',
    'scrollCollapse': true,
    'order': [[ 2, 'asc' ]]
});
table2.columns.adjust().draw();

var options = {
    chart: {
        renderTo: 'home_tgh_chartJum',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Jumlah',
        data: <?php echo json_encode($tghju) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?php echo json_encode($tghjc) ?>,
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
                }
            }
        }
    }
};

new Highcharts.Chart(options);

var options2 = {
    chart: {
        renderTo: 'home_pbyr_chartJum',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Jumlah',
        data: <?= json_encode($pbyrjs["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($pbyrjc) ?>,
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

options2.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options2);

var options3 = {
    chart: {
        renderTo: 'home_pbyr_chartNil',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Nilai',
        data: <?= json_encode($pbyrns["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($pbyrnc) ?>,
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
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options3);

var options4 = {
    chart: {
        renderTo: 'home_tgh_chartNil',
        type: 'bar'
    },
    title:{
        text:''
    },
    exporting: { 
        enabled: false
    },
    series: [{
        name: 'Nilai',
        data: <?= json_encode($tghns["series"]) ?> ,
        colorByPoint: true,
    }],
    xAxis: {
        title: {
            text: null
        },
        categories: <?= json_encode($tghnc) ?>,
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

options4.plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        },
        cursor: 'pointer',
        point: {
            events: {
                click: function() {
                    var id = this.name;                            
                }
            }
        }
    }
};
new Highcharts.Chart(options4);

$('.panel').on('click', '#btn-refresh', function(){
    location.reload();
});

</script>