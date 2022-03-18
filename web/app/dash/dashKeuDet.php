<?php 
        $tmp=explode("|",$_GET['param']);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];
        $nama=$tmp[6];

        // echo substr($nama,0,3);
        
        if($jenis =="all"){
            if(substr($nama,0,3) =="Kas"){
                $judul="Kas Bank";
                $sqlKas="select b.kode_grafik,b.kode_lokasi,b.kode_neraca,d.kode_akun, f.nama,e.so_akhir from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi 
                inner join exs_glma e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB05') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0 ";

                $res = execute($sqlKas);
                while ($row = $res->FetchNextObject(false)){
                    // $Kas["series"][] = array($row->nama,round(floatval($row->so_akhir)));   
                    $KasSr[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);            
                    $ctgkas[]=$row->nama;
                }	

                $sqlKasTot= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.n4 else 0 end) n12   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB01'
                group by a.kode_lokasi";

                $res = execute($sqlKasTot);
                while ($row = $res->FetchNextObject(false)){
                    $KasTot["series"][] = array("name" =>"Total Kas Bank", "data" => array(
                                                    round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                                    round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                                    round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                                    round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                ));
                }	

            }else if(substr($nama,0,3)=="Pen"){
                $judul="Pendapatan";
                $sqlPdptU = "select b.kode_grafik,b.kode_lokasi,b.kode_neraca,d.kode_akun, f.nama,-e.so_akhir as so_akhir from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi 
                inner join exs_glma e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB06','DB08') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0";

                $res = execute($sqlPdptU);
                while ($row = $res->FetchNextObject(false)){
                    $PdptUS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);  
                    $ctgPdptU[]=$row->nama;
                }
                

                $sqltotPU= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then -a.n4 else 0 end) n12	
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB06'
                group by a.kode_lokasi";

                $sqltotPL= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n4 else 0 end) n11, 
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then -a.n4 else 0 end) n12 
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB08'
                group by a.kode_lokasi";
                
                $res = execute($sqltotPU." union all ".$sqltotPL);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                while ($row = $res->FetchNextObject(false)){
                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $PdptTot["series"][] = array("name" =>"Pendapatan Total", "data" => array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                ));
            }else if(substr($nama,0,3)=="Beb"){
                $judul="Beban";
                $sqlBebanU = "select b.kode_grafik,b.kode_lokasi,b.kode_neraca,d.kode_akun, f.nama,e.so_akhir from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi 
                inner join exs_glma e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB07','DB09') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0";

                $res = execute($sqlBebanU);
                while ($row = $res->FetchNextObject(false)){
                    $BebanUS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);  
                    $ctgBebanU[]=$row->nama;
                }

                $sqltotBU= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.n4 else 0 end) n11,	
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.n4 else 0 end) n12   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB07'
                group by a.kode_lokasi";

                $sqltotBL= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.n4 else 0 end) n11,	
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.n4 else 0 end) n12   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB09'
                group by a.kode_lokasi";
                
                $res = execute($sqltotBU." union all ".$sqltotBL);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                while ($row = $res->FetchNextObject(false)){
                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $BebanTot["series"][] = array("name" =>"Beban Total", "data" => array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                ));

            }else if(substr($nama,0,3)=="Lab"){
                $judul="Laba Rugi";
            }else if(substr($nama,0,2)=="OR"){
                $judul="Rasio Profitabilitas";
                
                $sqlRasio = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
                from db_rasio_d a
                inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and a.kode_rasio in ('DB01','DB02','DB03','DB04') order by a.kode_rasio";

                $ini = execute($sqlRasio);
                
                while ($row = $ini->FetchNextObject(false)){
                    $nilai2[] =(array)$row;
                }
                

                $daftar = array();

                for($i=0; $i<count($nilai2); $i++){
                    if(!ISSET($daftar[$nilai2[$i]['kode_rasio']])){
                        $daftar[$nilai2[$i]['kode_rasio']] = array('nama_rasio' => $nilai2[$i]['nama_rasio'], 'rumus' => $nilai2[$i]['rumus'], 'par'=>array());
                    }

                    $daftar[$nilai2[$i]['kode_rasio']]['par'][] = array(
                        'kode_neraca'=>$nilai2[$i]['kode_neraca'],
                        'nilai2'=>$nilai2[$i]['nilai2']
                    );
                }

                $tbl = '';

                foreach($daftar as $data){
                        $par = '';
                        for($x=0; $x<count($data['par']); $x++){
                            $par .= $data['par'][$x]['kode_neraca']." = ".$data['par'][$x]['nilai2']."<br>";

                            ${"a" . $data['par'][$x]['kode_neraca']} = $data['par'][$x]['nilai2'];
                        }
            
                        $tbl .= "
                            <tr>
                                <td>".$data['nama_rasio']."</td>
                                <td>".$data['rumus']."</td>
                                <td>".$par."</td>
                                <td>".eval('return '.$data['rumus'].';')."</td>
                            </tr>
                        ";

                        $rasioGr["series"][] = array($data['nama_rasio'],round(eval('return'.$data['rumus'].';'),2));
                        $ctgRasio[]=$data['nama_rasio'];

                        // eval('return'.$data['rumus'].';');
                }
            }
        }


		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading' style='padding-left: 0px;padding-top: 0px;'>
					<a href='#' class='small-box-footer btn btn-default btn-sm' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeu.php&param=$periode/';\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		
        echo"
                <div id='sai_home_grafik'>";
        if(substr($nama,0,3) == "Kas"){
                    echo"
                        <div class='row'>
                            <div class='col-md-12'>
                                <div class='box box-primary'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Kas Bank perAkun</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_kas_bank'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-12'>
                                <div class='box box-success'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Total Kas Bank per Bulan</h3>
                                    </div>
                                    <div class='box-body'>
                                        <div id='dash_main_chart_kas_tot'></div>
                                    </div>
                                </div>
                            </div>
                        </div>";
        }
        if(substr($nama,0,3) == "Pen") {
              echo" <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pendapatan Usaha</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_pdpt_usaha'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-success'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pendapatan Total</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_pdpt_tot'></div>
                                </div>
                            </div>
                        </div>
                    </div>";

        } 
        if(substr($nama,0,3) == "Beb") {
            echo" <div class='row'>
                      <div class='col-md-12'>
                          <div class='box box-primary'>
                              <div class='box-header'>
                                  <i class='fa fa-bar-chart'></i>
                                  <h3 class='box-title'>Beban</h3>
                              </div>
                              <div class='box-body'>
                                  <div id='dash_main_chart_beban'></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class='row'>
                      <div class='col-md-12'>
                          <div class='box box-success'>
                              <div class='box-header'>
                                  <i class='fa fa-bar-chart'></i>
                                  <h3 class='box-title'>Beban Total</h3>
                              </div>
                              <div class='box-body'>
                                  <div id='dash_main_chart_beban_tot'></div>
                              </div>
                          </div>
                      </div>
                  </div>";

      }         
      if(substr($nama,0,2) == "OR") {
        echo"<div class='row'>
                <div class='col-md-12'>
                    <div class='box box-warning'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Rasio </h3>
                        </div>
                        <div class='box-body'>
                            <div id='dash_main_chart_rasio'></div>
                        </div>
                    </div>
                </div>
            </div>";
      }                   
            echo"    </div>
                </div>
                </div>
            </div>";
    
        echo "<script type='text/javascript'>";
        if(substr($nama,0,3) == "Kas"){
            echo "
                    var options6 = {
                        chart: {
                            renderTo: 'dash_main_chart_kas_bank',
                            type: 'column'
                        },
                        title:{
                            text:''
                        },
                        exporting: { 
                            enabled: false
                        },
                        series: [{
                            name : 'Saldo Akhir',
                            data : ".json_encode($KasSr).",
                            colorByPoint : true
                        }],
                        xAxis: {
                            title: {
                                text: null
                            },
                            categories: ".json_encode($ctgkas).",
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
    
                    options6.plotOptions = {
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
                                        window.location.href='fMain.php?hal=app/dash/dashKeuDet2.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcL|'+kd;
                                    }
                                }
                            }
                        }
                    };
    
                    new Highcharts.Chart(options6);

                    var options7 = {
                        chart: {
                            renderTo: 'dash_main_chart_kas_tot',
                            type: 'line'
                        },
                        title:{
                            text:''
                        },
                        exporting: { 
                            enabled: false
                        },
                        series: ".json_encode($KasTot["series"]).",
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
    
                    options7.plotOptions = {
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
    
                    new Highcharts.Chart(options7);
    
                    
                ";
        }
        if(substr($nama,0,3) == "Pen"){ 
        echo"
                var options3 = {
                    chart: {
                        renderTo: 'dash_main_chart_pdpt_usaha',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{ 
                         name : 'Saldo Akhir',
                         data :".json_encode($PdptUS).",
                         colorByPoint: true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgPdptU).",
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
                                    window.location.href='fMain.php?hal=app/dash/dashKeuDet2.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcL|'+kd;
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options3);

                var options5 = {
                    chart: {
                        renderTo: 'dash_main_chart_pdpt_tot',
                        type: 'line'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: ".json_encode($PdptTot["series"]).",
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

                options5.plotOptions = {
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

                new Highcharts.Chart(options5);
        ";
        }
        if(substr($nama,0,3) == "Beb"){
                echo"
                var options9 = {
                    chart: {
                        renderTo: 'dash_main_chart_beban',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{ 
                        name : 'Saldo Akhir',
                        data :".json_encode($BebanUS).",
                        colorByPoint: true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgBebanU).",
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

                options9.plotOptions = {
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
                                    window.location.href='fMain.php?hal=app/dash/dashKeuDet2.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcL|'+kd;
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options9);

                var options11 = {
                    chart: {
                        renderTo: 'dash_main_chart_beban_tot',
                        type: 'line'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: ".json_encode($BebanTot["series"]).",
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

                options11.plotOptions = {
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

                new Highcharts.Chart(options11);
        ";
        }

        if(substr($nama,0,2) == "OR"){
            echo"
            var options2 = {
                chart: {
                    renderTo: 'dash_main_chart_rasio',
                    type: 'column'
                },
                title:{
                    text:''
                },
                exporting: { 
                    enabled: false
                },
                series: [{
                    name : 'Rasio',
                    data : ".json_encode($rasioGr["series"]).",
                    colorByPoint : true
                }],
                xAxis: {
                    title: {
                        text: null
                    },
                    categories: ".json_encode($ctgRasio).",
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
    
            new Highcharts.Chart(options2);    
    ";
    }
        echo"
			</script>
        ";
        
?>