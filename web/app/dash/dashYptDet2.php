<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $kode_fs="FS1";

    $tmp=explode("|",$_GET['param']);
    $periode=$tmp[0];
    $kode_pp=$tmp[1];
    $box=$tmp[2];
    $jenis=$tmp[3];
    $kunci=$tmp[4];
    $nama=$tmp[5];

    switch($kunci){
        case "DB01" :
        $judul = "Kas Bank";
        break;
        case "DB02" :
        $judul = "Pendapatan";
        break;
        case "DB03" :
        $judul = "Beban";
        break;
        case "DB04" :
        $judul = "Laba Rugi";
        break;
        case "DB01" :
        $judul = "Kas Bank";
        break;
        case "OR" :
        $judul = "Operating Ratio";
        break;
        case "k1" :
        $judul = "Pengajuan PB";
        break;
        case "k2" :
        $judul = "Verifikasi Dokumen";
        break;
        case "k3" :
        $judul = "Verifikasi Akun";
        break;
        case "k4" :
        $judul = "SPB";
        break;
        case "k5" :
        $judul = "Pembayaran";
        break;
        case "app0" :
        $judul = "Pengajuan RRA";
        break;
        case "app1" :
        $judul = "Approval RRA";
        break;
        case "app2" :
        $judul = "Pendapatan Anggaran";
        break;
        case "app3" :
        $judul = "Beban Anggaran";
        break;
        case "app4" :
        $judul = "Investasi";
        break;
    }

    $back1="";

    if($tmp[6] == "" OR $tmp[6]==0){
        $backto="$fmain?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|$box";
    }else{
        $next=intval($tmp[6])-1;
        // if($next == 1) $next = 0;
        $backto="$fmain?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$next";
    }

    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";
        if($jenis =="all"){
            if(substr($nama,0,3) =="Kas"){
                $judul="Kas Bank";
                $sqlKas="select c.kode_akun,d.nama,so_akhir,e.format
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where b.kode_grafik in ('DB10') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0 and b.kode_fs='$kode_fs' ";

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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB01' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi and b.kode_fs=d.kode_fs
                inner join exs_glma_pp e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi 
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB05','DB09') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0 and b.kode_fs='$kode_fs' and e.kode_pp='$kode_pp' ";

                $res = execute($sqlPdptU);
                while ($row = $res->FetchNextObject(false)){
                    // $PdptU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB05' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB09' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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
                $sqlBebanU = "select b.kode_grafik,b.kode_lokasi,b.kode_neraca,d.kode_akun, f.nama,e.so_akhir as so_akhir from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi and b.kode_fs=d.kode_fs
                inner join exs_glma_pp e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi 
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB06','DB07') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.so_akhir <> 0 and b.kode_fs='$kode_fs' and e.kode_pp='$kode_pp'";

                $res = execute($sqlBebanU);
                while ($row = $res->FetchNextObject(false)){
                    // $BebanU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB06' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB07' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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

                $sqlLR= "select a.kode_lokasi,
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB04' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
                group by a.kode_lokasi";

                $res = execute($sqlLR);
                while ($row = $res->FetchNextObject(false)){
                    $LR["series"][] = array("name" =>"Total Laba Rugi", "data" => array(
                                                    round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                                    round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                                    round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                                    round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                ));
                }	

            }else if(substr($nama,0,2)=="OR"){
                $judul="Rasio Profitabilitas";
                
                $sqlRasio = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
                from db_rasio_d a
                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and a.kode_rasio in ('DB01','DB02','DB03','DB04')  and b.kode_fs='$kode_fs' and b.kode_pp ='$kode_pp' order by a.kode_rasio";

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
            if(substr($nama,0,3) == "Lab"){
                echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-success'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Laba Rugi</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_laba'></div>
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
                                            window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|NrcL|'+kd;
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
            if(substr($nama,0,3) == "Lab"){
                echo "
                        var optionsLR = {
                            chart: {
                                renderTo: 'dash_main_chart_laba',
                                type: 'line'
                            },
                            title:{
                                text:''
                            },
                            exporting: { 
                                enabled: false
                            },
                            series: ".json_encode($LR["series"]).",
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

                        optionsLR.plotOptions = {
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

                        new Highcharts.Chart(optionsLR);

                        
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
                                        window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|NrcL|'+kd;
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
                                        window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|NrcL|'+kd;
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
        }else{

            switch($kunci){
                case "k1" :
                    $title= "Data Pengajuan";
                    $column_array = array('No Aju','Modul','Tanggal','Keterangan','Nilai');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    $sql = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai, a.modul
                            from it_aju_m a
                            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.progress in ('0','R') ";
                    $rs=execute($sql);
                    $torecord =  $rs->RecordCount();
                    if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                    }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 10) + 1;
                    }
                    $jumpage = ceil($torecord/10);

                    $sql2 = $sql." order by a.no_aju
                    OFFSET ".$nextpage." ROWS FETCH NEXT 10 ROWS ONLY";

                    $rs2 = execute($sql2);                              
                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|PB|$row->no_aju';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_aju - $row->tgl - $row->modul
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                    if($jumpage > 1 AND $page < ($jumpage-1) ){
                        $page++;
                        $tbody.= "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$page';\">More Detail
                        </a>";
                    }
                    
                break;
                case "k2" :
                    $title= "Data Verifikasi Dokumen";
                    $column_array = array('No Ver','Modul','Tanggal','Keterangan','Nilai');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    $sql = "select a.no_ver,convert(varchar,a.tanggal,103) as tgl,b.keterangan,b.nilai, a.modul
                    from ver_m a
                    inner join it_aju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress in ('1') ";
                    $rs=execute($sql);

                    $torecord =  $rs->RecordCount();
                    if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                    }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 10) + 1;
                    }
                    $jumpage = ceil($torecord/10);
                    
                    $sql2 = $sql." order by a.no_ver 
                    OFFSET ".$nextpage." ROWS FETCH NEXT 10 ROWS ONLY";

                    $rs2 = execute($sql2);                              
                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|VER|$row->no_ver';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_ver - $row->tgl - $row->modul
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                    if($jumpage > 1 AND $page < ($jumpage-1) ){
                        $page++;
                        $tbody.= "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$page';\">More Detail
                        </a>";
                    }
                break;
                case "k3" :
                    $title= "Data Verifikasi Akun";
                    $column_array = array('No Fiat','Modul','Tanggal','Keterangan','Nilai');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    $sql = "select a.no_fiat,convert(varchar,a.tanggal,103) as tgl,a.modul,b.keterangan,b.nilai,b.kode_pp
                    from fiat_m a
                    inner join it_aju_m b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress in ('2') ";
                    $rs=execute($sql);
                    $torecord =  $rs->RecordCount();
                    if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                    }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 10) + 1;
                    }
                    $jumpage = ceil($torecord/10);
                    
                    $sql2 = $sql." order by a.no_fiat 
                    OFFSET ".$nextpage." ROWS FETCH NEXT 10 ROWS ONLY";

                    $rs2 = execute($sql2);                              
                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|FIAT|$row->no_fiat';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_fiat - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                    if($jumpage > 1 AND $page < ($jumpage-1) ){
                        $page++;
                        $tbody.= "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$page';\">More Detail
                        </a>";
                    }
                break;
                case "k4" :
                    
                    $title= "Data SPB";
                    $column_array = array('No SPB','Periode','Tanggal','Keterangan','Nilai');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    $sql = "select distinct a.no_spb,a.periode,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,b.kode_pp
                    from it_spb_m a
                    inner join it_aju_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' and b.progress in ('S') ";
                    $rs=execute($sql);
                    $torecord =  $rs->RecordCount();
                    if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                    }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 10) + 1;
                    }
                    $jumpage = ceil($torecord/10);
                    
                    $sql2 = $sql." order by a.no_spb
                    OFFSET ".$nextpage." ROWS FETCH NEXT 10 ROWS ONLY";

                    $rs2 = execute($sql2);                              
                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|SPB|$row->no_spb';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_spb - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                    if($jumpage > 1 AND $page < ($jumpage-1) ){
                        $page++;
                        $tbody.= "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$page';\">More Detail
                        </a>";
                    }
                break;
                case "k5" :
                    
                    $title= "Data Pembayaran";
                    $column_array = array('No Aju','Modul','Tanggal','Keterangan','Nilai');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    
                    $sql2 = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.modul,a.keterangan,a.nilai
                            from kas_m a
                            inner join it_aju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'  and b.kode_pp='$kode_pp' and b.progress in ('3') ";
                    $rs3 = execute($sql2);
                    $torecord =  $rs3->RecordCount();
                    if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                    }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 10) + 1;
                    }
                    $jumpage = ceil($torecord/10);

                    $sql = $sql2." order by a.no_kas 
                    OFFSET ".$nextpage." ROWS FETCH NEXT 10 ROWS ONLY";

                    $rs2 = execute($sql);   

                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|KAS|$row->no_kas';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_kas - $row->tgl - $row->modul
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                    if($jumpage > 1 AND $page < ($jumpage-1) ){
                        $page++;
                        $tbody.= "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$page';\">More Detail
                        </a>";
                    }
                break;
                case "app0" :
                    
                    $title= "Data Pengajuan";
                    $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                    $thead="";
                    for ($i=0;$i<count($column_array);$i++){
                        $thead.="
                        <th style='text-align:center;'>".$column_array[$i]."</th>
                        ";
                    }
                    $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                    from rra_pdrk_m a 
                    left join (select no_pdrk,sum(nilai) as nilai 
                               from rra_pdrk_d 
                               where kode_lokasi='$kode_lokasi' and dc='D'
                               group by no_pdrk
                               )b on a.no_pdrk=b.no_pdrk 
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' ";

                    $rs2 = execute($sql);                              
                    $tbody="";  
                    while ($row = $rs2->FetchNextObject(false)){
                        $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|RRA|$row->no_pdrk';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_pdrk - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                    }
                break;
                case "app1" :
                    
                $title= "Data Approval RRA";
                $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                $thead="";
                for ($i=0;$i<count($column_array);$i++){
                    $thead.="
                    <th style='text-align:center;'>".$column_array[$i]."</th>
                    ";
                }
                $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                from rra_pdrk_m a 
                left join (select no_pdrk,sum(nilai) as nilai 
                           from rra_pdrk_d 
                           where kode_lokasi='$kode_lokasi' and dc='D'
                           group by no_pdrk
                           )b on a.no_pdrk=b.no_pdrk 
                where a.kode_lokasi='$kode_lokasi' and a.progress in ('1') and a.periode='$periode' and a.kode_pp='$kode_pp' ";

                

                $rs2 = execute($sql);                              
                $tbody="";  
                while ($row = $rs2->FetchNextObject(false)){
                    $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|RRA|$row->no_pdrk';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_pdrk - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                }

                break;
                case "app3" :

                $judul="Beban";
                $sqlBebanU = "select a.kode_akun,a.nama,sum(a.so_akhir) as so_akhir from (select b.kode_grafik,b.kode_lokasi,b.kode_neraca
                ,d.kode_akun
                , f.nama
                ,e.nilai as so_akhir 
                from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi and b.kode_fs=d.kode_fs
                inner join anggaran_d e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi and e.kode_pp='$kode_pp'
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB06','DB07') and b.kode_lokasi='$kode_lokasi' 
                and e.periode='$periode' and e.nilai <> 0 
                and b.kode_fs='$kode_fs' 
                and e.kode_pp='$kode_pp') a
                group by a.kode_akun,a.nama";

                $res = execute($sqlBebanU);
                while ($row = $res->FetchNextObject(false)){
                    // $BebanU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
                    $AppUS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);  
                    $ctgAppU[]=$row->nama;
                }

                $sqltotBU= "select a.kode_lokasi,
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB06' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
                group by a.kode_lokasi";

                $sqltotBL= "select a.kode_lokasi,
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB07' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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

                $AppTot["series"][] = array("name" =>"Beban Total", "data" => array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                ));   
                
                break;
                case "app2" :
                $judul="Pendapatan";
                $sqlPdptU = "select a.kode_akun,a.nama,sum(a.so_akhir) as so_akhir from (select b.kode_grafik,b.kode_lokasi,b.kode_neraca
                ,d.kode_akun
                , f.nama
                ,e.nilai as so_akhir 
                from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi and b.kode_fs=d.kode_fs
                inner join anggaran_d e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi and e.kode_pp='$kode_pp'
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB05','DB09') and b.kode_lokasi='$kode_lokasi' 
                and e.periode='$periode' and e.nilai <> 0 and b.kode_fs='$kode_fs' and e.kode_pp='$kode_pp') a
                group by a.kode_akun,a.nama";

                $res = execute($sqlPdptU);
                while ($row = $res->FetchNextObject(false)){
                    // $PdptU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
                    $AppUS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);  
                    $ctgAppU[]=$row->nama;
                }
                

                $sqltotPU= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n2 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n2 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n2 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n2 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n2 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n2 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n2 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n2 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n2 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n2 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n2 else 0 end) n11,
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then -a.n2 else 0 end) n12	
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB05' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
                group by a.kode_lokasi";

                $sqltotPL= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n2 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n2 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n2 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n2 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n2 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n2 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n2 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n2 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n2 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n2 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n2 else 0 end) n11, 
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then -a.n2 else 0 end) n12 
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB09' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
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

                $AppTot["series"][] = array("name" =>"Pendapatan Total", "data" => array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                ));
                break;
                case "app4" :
                    
                $judul="Investasi";
                $sqlBebanU = "select a.kode_akun,a.nama,sum(a.so_akhir) as so_akhir from (select b.kode_grafik,b.kode_lokasi,b.kode_neraca
                ,d.kode_akun
                , f.nama
                ,e.nilai as so_akhir 
                from db_grafik_d b
                inner join relakun d on b.kode_neraca=d.kode_neraca and b.kode_lokasi=d.kode_lokasi and b.kode_fs=d.kode_fs
                inner join anggaran_d e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi and e.kode_pp='$kode_pp'
                inner join masakun f on e.kode_akun=f.kode_akun and e.kode_lokasi=f.kode_lokasi
                where b.kode_grafik in ('DB12') and b.kode_lokasi='$kode_lokasi' 
                and e.periode='$periode' and e.nilai <> 0 
                and b.kode_fs='$kode_fs' 
                and e.kode_pp='$kode_pp') a
                group by a.kode_akun,a.nama";

                $res = execute($sqlBebanU);
                while ($row = $res->FetchNextObject(false)){
                    // $BebanU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
                    $AppUS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);  
                    $ctgAppU[]=$row->nama;
                }

                $sqltotBU= "select a.kode_lokasi,
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
                from exs_neraca_pp a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB12' and a.kode_fs='$kode_fs' and a.kode_pp='$kode_pp'
                group by a.kode_lokasi";

                
                $res = execute($sqltotBU);
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

                $AppTot["series"][] = array("name" =>"Investasi Total", "data" => array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                ));
                break;
                case "pd0" :
                    
                $title= "Data Pengajuan";
                $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai');
                $thead="";
                for ($i=0;$i<count($column_array);$i++){
                    $thead.="
                    <th style='text-align:center;'>".$column_array[$i]."</th>
                    ";
                }
                $sql = "
                select a.no_spj,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,a.nilai
                from tu_pdaju_m a
                where a.progress='0' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' ";

                $rs2 = execute($sql);                              
                $tbody="";  
                while ($row = $rs2->FetchNextObject(false)){
                    $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|SPJ|$row->no_spj';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_spj - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                }

                break;
                case "pd1" :
                    
                $title= "Data Pengajuan";
                $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai');
                $thead="";
                for ($i=0;$i<count($column_array);$i++){
                    $thead.="
                    <th style='text-align:center;'>".$column_array[$i]."</th>
                    ";
                }
                $sql = "
                select a.no_app,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nilai,b.kode_pp
                from tu_pdapp_m a
                inner join tu_pdaju_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
                where b.progress = '1' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' ";

                $rs2 = execute($sql);                              
                $tbody="";  
                while ($row = $rs2->FetchNextObject(false)){
                    $tbody.="
                        <a style='cursor:pointer;color:blue'  onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|APD|$row->no_app';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row->no_app - $row->tgl - $row->kode_pp
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        $row->keterangan
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row->nilai,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                }

                break;
            }
          
            if(substr($kunci,0,1) == "a"){
                switch($kunci){
                    case "app0" :
                    case "app1" :
                    echo"
                    <div class='box-header with-border'>
                        <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                    </div>
                    <div class='box-body'>
                        $tbody
                    </div>";
                    break;
                    case "app2" :
                    case "app3" :
                    case "app4" :
                    echo" <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>$title</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_app'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-success'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>$title Total</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_app_tot'></div>
                                </div>
                            </div>
                        </div>
                    </div>";

                    echo"
                    <script type='text/javascript'>
                    var options3 = {
                        chart: {
                            renderTo: 'dash_main_chart_app',
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
                            data :".json_encode($AppUS).",
                            colorByPoint: true
                        }],
                        xAxis: {
                            title: {
                                text: null
                            },
                            categories: ".json_encode($ctgAppU).",
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
                                        window.location.href='fMainMobile.php?hal=app/dash/dashYptDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|GAR|'+kd;
                                    }
                                }
                            }
                        }
                    };

                    new Highcharts.Chart(options3);

                    var options5 = {
                        chart: {
                            renderTo: 'dash_main_chart_app_tot',
                            type: 'line'
                        },
                        title:{
                            text:''
                        },
                        exporting: { 
                            enabled: false
                        },
                        series: ".json_encode($AppTot["series"]).",
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
                    </script>";
                    break;
                }
                
            }else{
                echo"
                <div class='box-header with-border'>
                    <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                </div>
                <div class='box-body'>
                    $tbody
                </div>";
            }
            echo"
            </div>
            <div id='sai_home_timeline' hidden>
            </div>
            <div id='sai_home_tracing' hidden>
            </div>
        </div>";

        echo "<script type='text/javascript'>
			var table2 = $('#table-pengajuan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
				});
            table2.columns.adjust().draw();

            var table2 = $('#table-app').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
                'order': [[ 6, 'desc' ]]
                // 'columnDefs': [
                //     {
                //         'targets': [ 6 ],
                //         'visible': false,
                //         'searchable': false
                //     }
                // ]
				});
            table2.columns.adjust().draw();

             
			
			</script>
        ";
        
        }
		
?>
