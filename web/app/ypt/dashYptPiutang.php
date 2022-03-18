<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $logomain = $path.'/image/ypt.jpeg';
    $mainname="Yayasan Pendidikan Telkom";

   
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
    
    //SQL BOX 1
    $sqlbox1a = "select count(a.nis) as jum	from(
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
            where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'	and a.flag_aktif = '1'
    ) a 
    where a.sak_total > 0";

    $sqlbox1b = "select count(a.nis) as jum	
    from sis_siswa a
    where a.flag_aktif = '1' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' ";

    $rs1a =execute($sqlbox1a); // jumlah menunggak
    $rs1b =execute($sqlbox1b); // jumlah siswa total
    $nil1 =round($rs1a->fields[0]/$rs1b->fields[0],2)*100; //persentase siswa menunggak

    //SQL BOX 2

    // $sqlbox2a = "select a.total_bill, isnull(b.total_byr,0) as total_byr,(isnull(b.total_byr,0)/a.total_bill)*100 as rasio
    // from (select a.kode_pp,a.kode_lokasi,sum(a.nilai) as total_bill 
    //       from sis_bill_d a 
    //       where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
    //       group by a.kode_pp, a.kode_lokasi ) a 
    // left join (  select a.kode_pp , a.kode_lokasi,sum(a.nilai) as total_byr 
    //              from sis_rekon_d a 
    //              where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
    // group by a.kode_pp, a.kode_lokasi ) b on a.kode_pp=a.kode_pp and a.kode_lokasi=b.kode_lokasi  ";
    

    $sqlbox2a ="select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
                    from (
                    select kode_lokasi, kode_pp,sum(nilai) as tot_bill
                    from sis_bill_d
                    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and substring(periode,1,4)='".substr($periode,0,4)."' 
                    group by kode_lokasi,kode_pp
                    ) a
                    inner join 
                    (select kode_lokasi, kode_pp,sum(nilai) as tot_byr
                    from sis_rekon_d
                    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and substring(periode,1,4)='".substr($periode,0,4)."' 
                    group by kode_lokasi,kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp";
                    
    $rs2a =execute($sqlbox2a); 
    $nil2 = $rs2a->fields[2]; //collection rasio

    //SQL BOX 4
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
    $nil4=$rs4a->fields[3];

    $sql3a="select a.kode_pp,a.kode_lokasi,a.nama,
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
    $nil3=$rs3a->fields[3];

	echo "$header
    <div class='panel' style='$padding'>
        <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
        </div>
        <div class='panel-body'>
            <div class='row'>";
            echo"<div class='col-md-12 col-md-3'>
                    <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                        <div class='inner'>
                            <center>
                            <p>Jumlah Siswa Menunggak</p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nil1,1,",",".")."%</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;'>".$rs1a->fields[0]." dari ".$rs1b->fields[0]." siswa</p>
                            </center>
                        </div>
                    </div>
                </div>
                <div class='col-md-12 col-md-3'>
                    <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                        <div class='inner'>
                            <center>
                            <p>Collection Ratio</p>
                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nil2,1,",",".")."%</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;'>&nbsp;</p>
                            </center>
                        </div>
                    </div>
                </div>
                <div class='col-md-12 col-md-3'>
                    <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                        <div class='inner'>
                            <center>
                            <p>Saldo PDD Siswa</p>
                            <h3 id='home_kas_box' style='font-size:25px' >Rp. ".number_format($nil3,0,",",".")."</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;'>&nbsp;</p>
                            </center>
                        </div>
                    </div>
                </div>
                <div class='col-md-12 col-md-3'>
                    <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                        <div class='inner'>
                            <center>
                            <p>Saldo Piutang</p>
                            <h3 id='home_kas_box' style='font-size:25px' >Rp. ".number_format($nil4,0,",",".")."</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;'>&nbsp;</p>
                            </center>
                        </div>
                    </div>
                </div>";
            echo"
            </div>";
             //SQL PIUTANG TERBANYAK
    $sql="select top 5 a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
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
    order by sak_total desc";

            if($tmp[2] == ""){
                $kode_per = $periode;
            }else{
                $kode_per = $tmp[2];
            }

            $sqlkbyr="select a.total_bill, isnull(b.total_byr,0) as total_byr,isnull(b.total_byr,0)/a.total_bill as per
            from (select a.kode_pp,a.kode_lokasi,sum(a.nilai) as total_bill 
                  from sis_bill_d a 
                  where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$kode_per'
                  group by a.kode_pp, a.kode_lokasi ) a 
            left join (  select a.kode_pp , a.kode_lokasi,sum(a.nilai) as total_byr 
                         from sis_rekon_d a 
                         where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode_bill='$kode_per'
            group by a.kode_pp, a.kode_lokasi ) b on a.kode_pp=a.kode_pp and a.kode_lokasi=b.kode_lokasi ";
            $res=execute($sqlkbyr);
            $tobil=$res->fields[0];
            $tobyr=$res->fields[1];
            $persen=round($res->fields[2],2)*100;

            echo"
            <div class='row'>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:1px solid #dd4b39;border-radius:10px'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart' style='vertical-align: top;'></i>
                            <h3 class='box-title'>Pembayaran <br> Piutang</h3>
                            <div class='col-xs-6 pull-right'>
                            <style>
                            .selectize-input{
                                border:none;
                                border-bottom:1px solid #8080806b;
                            }
                            </style>";
                        
                                if($mobile ==true){
                                    echo"
                                    <input type='text' value='".ubah_periode($kode_per)."' class='form-control' id='inp-per' placeholder='Pilih Periode' style='border:0;border-bottom:1px solid  #8080806b;margin-bottom: 20px;'>";
                                }else{
                                    echo"
                                    <select class='form-control input-sm selectize' id='dash-per' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                    <option value=''>Pilih Periode</option> ";

                                    echo " <option value=".$kode_per." selected>".ubah_periode($kode_per)."</option>";

                                    $res = execute("select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' order by periode desc");

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
                                <span style='position: relative;' class=' pull-right'>".number_format($tobyr,0,",",".")."/".number_format($tobil,0,",",".")."</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class='box' style='box-shadow:none;border:1px solid #dd4b39;border-radius:10px'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Tunggakan Terbanyak</h3>
                        </div>
                        <div class='box-body box-click'>
                            <div ><table class='table no-border'>";
                            $rster=execute($sql);
                            while($row=$rster->FetchNextObject($toupper=false)){
                            echo"
                                <tr>
                                    <td>$row->nama</td>
                                    <td>".number_format($row->sak_total,0,",",".")."</td>
                                </tr>";
                            }
                            echo "
                            </table></div>
                        </div>
                    </div>
                    ";

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
                                                $res = execute("select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' order by periode desc");
                                                
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
                        echo"<script>

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

                        $('#dash-per').change(function(){
                            var per = $(this).val();
                            window.location.href='$fmain?hal=app/ypt/dashYptPiutang.php&param=//'+per;
                        });

                        $('.list-group li').on('click', function(){
                            $('.list-group li div.isi').removeClass('selected');
                            $(this).find('div.isi').addClass('selected');
                            var isi=$('.selected').text();
                            $('#inp-per').val(isi);
                            $('#modal-periode').modal('hide');
                            var per = ubah_periode3(isi);
                            window.location.href='$fmain?hal=app/ypt/dashYptPiutang.php&param=//'+per;
                        });
                        
                        </script>
                    
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Piutang per paramater</h3>
                        </div>
                        <div class='box-body box-click' id='box-piu'>
                            <div id='dash_chart_piu'></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Umur Piutang</h3>
                        </div>
                        <div class='box-body box-click' id='box-umur'>
                            <div id='dash_chart_umur'></div>
                        </div>
                    </div>
                </div>
                
            </div>
            ";

    //SQL PIU PARAM
    // $sqlpiu="select a.kode_lokasi,a.kode_param,a.nama,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
    // from sis_param a 
    // left join (select x.kode_param,x.kode_lokasi,  
    //             sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
    //             from sis_bill_d x 			
    //             where(x.kode_lokasi='$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
    //             group by x.kode_param,x.kode_lokasi 			
    //             )b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
    // left join (select x.kode_param,x.kode_lokasi,  
    //             sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
    //             from sis_bill_d x 			
    //             where(x.kode_lokasi='$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
    //              group by x.kode_param,x.kode_lokasi 				
    //             )c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi
    // left join (select x.kode_param,x.kode_lokasi,  
    //             sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
    //             from sis_rekon_d x 	
    //             where(x.kode_lokasi='$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'		
    //             group by x.kode_param,x.kode_lokasi 			
    //             )d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi
    // left join (select x.kode_param,x.kode_lokasi,  
    //             sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
    //             from sis_rekon_d x 		
    //             where(x.kode_lokasi='$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
    //             group by x.kode_param,x.kode_lokasi 			
    //             )e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi
    // where(a.kode_lokasi = '$kode_lokasi') and isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) > 0
    // ";
    $sqlpiu = "select a.kode_lokasi,a.kode_param,a.nama,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
    from sis_param a 
    left join ( select 'SPP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp' and x.kode_param in ('SPP')	
                group by x.kode_lokasi 
				union all
				select 'DSP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp' and x.kode_param in ('DSP')		
                group by x.kode_lokasi 
				union all
				select 'LAIN' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp' and x.kode_param not in ('DSP','SPP')		
                group by x.kode_lokasi 			
                )b on a.kode_param=b.kode and a.kode_lokasi=b.kode_lokasi
    left join (select 'SPP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp' and x.kode_param in ('SPP')	
                group by x.kode_lokasi 
				union all
				select 'DSP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp' and x.kode_param in ('DSP')		
                group by x.kode_lokasi 
				union all
				select 'LAIN' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                from sis_bill_d x 			
                where(x.kode_lokasi='$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp' and x.kode_param not in ('DSP','SPP')		
                group by x.kode_lokasi				
                )c on a.kode_param=c.kode and a.kode_lokasi=c.kode_lokasi
    left join (select 'SPP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='$kode_lokasi')and(x.periode < '201905') and x.kode_pp='YSPTE05' and x.kode_param in ('SPP')	
                group by x.kode_lokasi 
				union all 
				select 'DSP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='12')and(x.periode < '201905') and x.kode_pp='YSPTE05' and x.kode_param in ('DSP')	
                group by x.kode_lokasi 	
				union all
				select 'LAIN' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='12')and(x.periode < '201905') and x.kode_pp='YSPTE05' and x.kode_param not in ('SPP','DSP')	
                group by x.kode_lokasi 		
                )d on a.kode_param=d.kode and a.kode_lokasi=d.kode_lokasi
    left join (select 'SPP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='12')and(x.periode = '201905') and x.kode_pp='YSPTE05' and x.kode_param in ('SPP')	
                group by x.kode_lokasi 
				union all 
				select 'DSP' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='12')and(x.periode = '201905') and x.kode_pp='YSPTE05' and x.kode_param in ('DSP')	
                group by x.kode_lokasi 	
				union all
				select 'LAIN' as kode,x.kode_lokasi,  
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                from sis_rekon_d x 	
                where(x.kode_lokasi='12')and(x.periode = '201905') and x.kode_pp='YSPTE05' and x.kode_param not in ('SPP','DSP')	
                group by x.kode_lokasi	
                )e on a.kode_param=e.kode and a.kode_lokasi=e.kode_lokasi
    where(a.kode_lokasi = '12') and isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) > 0
    ";
    $res = execute($sqlpiu);
    $sqlmaxpiu = "select max(a.sak_total) as max from ( ".$sqlpiu." ) a ";
    $resmax = execute($sqlmaxpiu);
    
    while($row = $res->FetchNextObject(false)){
        if($resmax->fields[0] == $row->sak_total){
            $piu[] = array('y'=>floatval($row->sak_total),'name'=>$row->nama,'key'=>$row->kode_param,'sliced'=>true,'selected'=>true);
        }else{
            $piu[] = array('y'=>floatval($row->sak_total),'name'=>$row->nama,'key'=>$row->kode_param);
        }
        
    }  
    
    //SQL UMUR
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

   
    echo"</div>
    </div>";


    echo"
    <script>

    //DRAW CHART PIU
    Highcharts.chart('dash_chart_piu', {
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
            name: 'Param',
            colorByPoint: true,
            data: ".json_encode($piu)."
        }]
    });

    //CHART UMUR

    Highcharts.chart('dash_chart_umur', {
        title: {
            text: ''
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

    </script>";

   
?>
