<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $nik2=str_replace("a","",$nik);
	/*
    $sql="select kode_pp from karyawan where kode_lokasi = '$kode_lokasi' and nik ='$nik2' ";
    $rs = execute($sql);
    $kode_pp=$rs->fields[0];

	*/
    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $param=$tmp[2];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";					
    $path2 = $path . "image/yspt2.png";
    
    echo "<div class='panel'>
			<div class='panel-body'>
                <div class='panel-heading'>
                    <a href='fMain.php?hal=app/siswa/dashSiswaDet.php&param=$jenis/$kunci' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
                switch($param){
                    case "receipt" :
                echo"
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-success box-solid'>
                                <div class='box-header with-border'>
                                    <h3 class='box-title'>Pembayaran</h3>
                            
                                    <div class='box-tools pull-right'>
                                        <img width='20px' src='$path'><img>
                                    </div>
                                    <!-- /.box-tools -->
                                </div>
                                <!-- /.box-header -->
                                <div class='box-body' style='padding:2px'>
                                    <table class='table no-border' style='padding: 5px;'>
                                        <tbody>
                                            <tr>
                                                <td style='padding-bottom: 0px;' colspan='2'>Nama</td>
                                                <td style='text-align:right;padding-bottom: 0px;'>Nilai Bayar</td>
                                            </tr>
                                            <tr>
                                                <th style='padding-top: 0px;font-size: 20px;' colspan='2'>RANGGA AZHAR FAUZAN</th>
                                                <th style='text-align:right;padding-top: 0px;font-size: 20px;'>650.000</th>
                                            </tr>
                                            <tr>
                                                <td colspan='3' style='border-bottom: 2px dashed #a4f5a4;padding-top: 0px;'>No Virtual Account </td>
                                            </tr>
                                            <tr>
                                                <td style='text-align:center;padding: 2px;' colspan='3'>Rincian Alokasi Pembayaran</td>
                                            </tr>
                                            <tr>
                                                <td style='text-align: right;border-bottom: 2px solid #2791f9;padding-top: 0px;padding-bottom: 0px;' width='40%'><i>Deposit</i></td>
                                                <td style='border-bottom: 2px solid #2791f9;padding-bottom: 0px;' width='25%'>&nbsp;</td>
                                                <td style='border-bottom: 2px solid #2791f9;padding-top: 0px;padding-bottom: 0px;' width='35%'>0</td>
                                            </tr>
                                            <tr>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='40%'>Periode</th>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='25%'>Parameter</th>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='35%'>Nilai Bayar</th>
                                            </tr>
                                            <tr>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='40%'>Februari , 2019</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='25%'>SPP</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='35%'>650.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>
                    </div>
                ";
                        break;
                        case "invoice" :
                echo"
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-primary box-solid'>
                                <div class='box-header with-border'>
                                    <h3 class='box-title'>Tagihan Sekolah</h3>
                            
                                    <div class='box-tools pull-right'>
                                        <img width='20px' src='$path'><img>
                                    </div>
                                    <!-- /.box-tools -->
                                </div>
                                <!-- /.box-header -->
                                <div class='box-body' style='padding:2px'>
                                    <table class='table no-border' style='padding: 5px;'>
                                        <tbody>
                                            <tr>
                                                <td style='padding-bottom: 0px;' colspan='2'>Nama</td>
                                                <td style='text-align:right;padding-bottom: 0px;'>Nilai Tagihan</td>
                                            </tr>
                                            <tr>
                                                <th style='padding-top: 0px;font-size: 20px;' colspan='2'>RANGGA AZHAR FAUZAN</th>
                                                <th style='text-align:right;padding-top: 0px;font-size: 20px;'>650.000</th>
                                            </tr>
                                            <tr>
                                                <td colspan='3' style='border-bottom: 2px dashed #3c8dbc;padding-top: 0px;'>No Virtual Account </td>
                                            </tr>
                                            <tr>
                                                <td style='text-align:center;padding: 2px;' colspan='3'>Rincian Tagihan</td>
                                            </tr>
                                            <tr>
                                                <td style='text-align: right;border-bottom: 2px solid #2791f9;padding-top: 0px;padding-bottom: 0px;' width='40%'><i>Saldo Tunggakan Sebelumnya</i></td>
                                                <td style='border-bottom: 2px solid #2791f9;padding-bottom: 0px;' width='25%'>&nbsp;</td>
                                                <td style='border-bottom: 2px solid #2791f9;padding-top: 0px;padding-bottom: 0px;' width='35%'>0</td>
                                            </tr>
                                            <tr>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='40%'>No Tagihan</th>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='25%'>Parameter</th>
                                                <th style='padding-top: 2px;padding-bottom: 2px;' width='35%'>Nilai</th>
                                            </tr>
                                            <tr>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='40%'>12-BILL1707.0007</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='25%'>KOP</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='35%'>50.000</td>
                                            </tr>
                                            <tr>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='40%'>12-BILL1707.0007</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='25%'>LAIN</td>
                                                <td style='padding-top: 2px;padding-bottom: 2px;' width='35%'>600.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>
                    </div>
                ";
                
                        break;
                        case "tagihan" :
                        $sql=" select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and nis='$nik2' and periode like '".substr($periode,0,4)."%' order by periode desc";
                        $rs = execute($sql);
                        while ($row = $rs->FetchNextObject($toupper=false)){

                    echo"
                            <div class='box box-widget' style='border: 1px solid #f2efefa1;'>
                                <div class='box-body'>
                                    <div class='row' style='margin-bottom:10px'>
                                        <div class='col-md-1'>
                                            <span class='label label-primary' style='font-size:14px'>Bulan ".substr($row->periode,4,2)."</span>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='col-md-12'>";

                                        $sql1="select kode_ta, kode_sem, periode from sis_bill_d where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and nis='$nik2' and periode = '$row->periode' ";

                                        $rs1 = execute($sql1);
                                        $row1 = $rs1->FetchNextObject($toupper=false);
                                        echo"
                                            <table style='width: 100%;'>
                                                <tbody>
                                                <tr>
                                                    <td width='15%'>Tahun Ajaran</td>
                                                    <td style='text-align:center' width='15%'>Semester</td>
                                                    <td style='text-align:center' width='15%'>Periode</td>
                                                    <td style='text-align:right'>Saldo</td>
                                                </tr>
                                                <tr>
                                                    <th width='15%'>$row1->kode_ta</th>
                                                    <th style='text-align:center' width='15%'>$row1->kode_sem</th>
                                                    <th style='text-align:center' width='15%'>$row1->periode</th>
                                                    <th style='text-align:right'>Rp.0</th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </diV>
                                </div>";        
                                   
                                 $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                        <tr>
                                            <th width='25%' colspan='2' style='border-bottom: 1px solid white;'>Parameter Biaya</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Nilai</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Terbayar</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>";   
                                   
                                    $sql="
                                    select a.nis, a.nama, b.kode_param,isnull(b.total,0) as bill, isnull(c.total,0) as bayar , isnull(b.total,0)-isnull(c.total,0) as saldo
                                    from sis_siswa a 
                                    left join (
                                    select x.kode_param,x.nis,x.kode_lokasi,sum(case when x.dc='D' then x.nilai else -x.nilai end) as total
                                    from sis_bill_d x
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$row1->periode') and x.kode_pp='$kode_pp' 	
                                    group by x.kode_param,x.kode_lokasi,x.nis ) b on a.kode_lokasi=b.kode_lokasi and a.nis=b.nis
                                    left join (
                                    select x.kode_param,x.nis,x.kode_lokasi, sum(case when x.dc='D' then x.nilai else -x.nilai end) as total
                                    from sis_rekon_d x
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$row1->periode') and x.kode_pp='$kode_pp' 
                                    group by x.kode_param,x.nis,x.kode_lokasi
                                    ) c on a.kode_lokasi=c.kode_lokasi and a.nis=c.nis
                                    where(a.kode_lokasi = '$kode_lokasi')and a.kode_pp='$kode_pp' and a.nis='$nik2'";
                
                                    $rs2 = execute($sql);  
                                    $x=0;
                                    while ($row2 = $rs2->FetchNextObject($toupper=false)){

                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                 
                                        echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='23%'>$row2->kode_param</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->bill,0,",",".")."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->bayar,0,",",".")."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->saldo,0,",",".")."</td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";  
                        
                        }
                         
                        break;
                        case "detTagih" :
                
                        $kode_param=$tmp[7];
                        $per=$tmp[8];
                        $modul=$tmp[9];

                        if($modul == "bill"){

                    echo"
                            <div class='box box-widget' style='border: 1px solid #f2efefa1;'>
                                <div class='box-body'>
                                    <div class='row' style='margin-bottom:10px'>
                                        <div class='col-md-1'>
                                            <span class='label label-primary' style='font-size:14px'>Bulan ".substr($per,4,2)."</span>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='col-md-12'>";

                                        $sql1="select kode_ta, kode_sem, periode from sis_bill_d where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and nis='$nik2' and periode = '$per' ";

                                        $rs1 = execute($sql1);
                                        $row1 = $rs1->FetchNextObject($toupper=false);
                                        echo"
                                            <table style='width: 100%;'>
                                                <tbody>
                                                <tr>
                                                    <td width='15%'>Tahun Ajaran</td>
                                                    <td style='text-align:center' width='15%'>Semester</td>
                                                    <td style='text-align:center' width='15%'>Periode</td>
                                                    <td style='text-align:right'>Saldo</td>
                                                </tr>
                                                <tr>
                                                    <th width='15%'>$row1->kode_ta</th>
                                                    <th style='text-align:center' width='15%'>$row1->kode_sem</th>
                                                    <th style='text-align:center' width='15%'>$row1->periode</th>
                                                    <th style='text-align:right'>Rp.0</th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </diV>
                                </div>";        
                                   
                                 $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                        <tr>
                                            <th width='25%' colspan='2' style='border-bottom: 1px solid white;'>Parameter Biaya</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Nilai</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Terbayar</th>
                                            <th width='25%' style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>";   
                                   
                                    $sql="
                                    select a.nis, a.nama, b.kode_param,isnull(b.total,0) as bill, isnull(c.total,0) as bayar , isnull(b.total,0)-isnull(c.total,0) as saldo
                                    from sis_siswa a 
                                    left join (
                                    select x.kode_param,x.nis,x.kode_lokasi,sum(case when x.dc='D' then x.nilai else -x.nilai end) as total
                                    from sis_bill_d x
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$row1->periode') and x.kode_pp='$kode_pp' 	
                                    group by x.kode_param,x.kode_lokasi,x.nis ) b on a.kode_lokasi=b.kode_lokasi and a.nis=b.nis
                                    left join (
                                    select x.kode_param,x.nis,x.kode_lokasi, sum(case when x.dc='D' then x.nilai else -x.nilai end) as total
                                    from sis_rekon_d x
                                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$row1->periode') and x.kode_pp='$kode_pp' 
                                    group by x.kode_param,x.nis,x.kode_lokasi
                                    ) c on a.kode_lokasi=c.kode_lokasi and a.nis=c.nis
                                    where(a.kode_lokasi = '$kode_lokasi')and a.kode_pp='$kode_pp' and a.nis='$nik2' and b.kode_param='$kode_param' ";
                
                                    $rs2 = execute($sql);  
                                    $x=0;
                                    while ($row2 = $rs2->FetchNextObject($toupper=false)){

                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                 
                                        echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='23%'>$row2->kode_param</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->bill,0,",",".")."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->bayar,0,",",".")."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->saldo,0,",",".")."</td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";  
                        }else{
                        
                    
                    echo"
                    <div class='box box-widget' style='border: 1px solid #f2efefa1;'>
                        <div class='box-body'>
                            <div class='row' style='margin-bottom:10px'>
                                <div class='col-md-1'>
                                    <span class='label label-primary' style='font-size:14px'>Bulan ".substr($per,4,2)."</span>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <table style='width: 100%;'>
                                        <tbody>
                                        <tr>
                                            <th width='75%' colspan='2'>Deposit</th>
                                            <th width='25%' style='text-align:right'>&nbsp;</th>
                                        </tr>";
                                    
                                        $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                        $sql="
                                        select a.nis, a.nama, b.kode_param,isnull(b.total,0) as dep
                                        from sis_siswa a 
                                        left join (
                                        select x.kode_param,x.nis,x.kode_lokasi,sum(case when x.dc='D' then x.nilai else -x.nilai end) as total
                                        from sis_cd_d x
                                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$per') and x.kode_pp='$kode_pp' 	
                                        group by x.kode_param,x.kode_lokasi,x.nis ) b on a.kode_lokasi=b.kode_lokasi and a.nis=b.nis
                                        where(a.kode_lokasi = '$kode_lokasi')and a.kode_pp='$kode_pp' and a.nis='$nik2' and b.kode_param='$kode_param' ";
                    
                                        $rs2 = execute($sql);  
                                        $x=0;
                                        while ($row2 = $rs2->FetchNextObject($toupper=false)){

                                            if($x % 2 == 1){
                                                $clr=$colors[1];
                                            }else{
                                                $clr=$colors[2];
                                            }
                                    
                                            echo"
                                            <tr>
                                                <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                                <td width='73%' style='padding-left: 10px;'>$row2->kode_param</td>
                                                <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row2->dep,0,",",".")."</td>
                                            </tr>";
                                            $x++;
                                        }
                                        echo"
                                        </tbody>
                                        </table>
                                        ";


                                echo"
                                </div>
                            </diV>
                        </div>";        
                           
                    
                    echo"
                    </div>
                    ";       
                    
                    }
                        break;
                        case "deposit" :
                
                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <h4> Deposit </h4>
                                </div>";
        
                                $sql="
                                select a.* from (
                                    select a.no_bukti, a.kode_lokasi,a.nis, a.periode, a.nilai, b.keterangan, 
                                    convert(varchar,b.tanggal,103) as tgl, a.dc,a.kode_pp,a.kode_param,a.modul
                                    from sis_cd_d a 
                                    inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$nik2' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                                    union 
                                    select  a.no_bukti, a.kode_lokasi,a.nis, a.periode, a.nilai, b.keterangan, 
                                    convert(varchar,b.tanggal,103) as tgl, a.dc,a.kode_pp,a.kode_param,a.modul from sis_cd_d a 
                                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$nik2' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                                )  a
                                inner join (
                                select a.periode,a.kode_lokasi,a.nis,sum(case when a.dc = 'D' then a.nilai else -a.nilai end) as tot 
                                from sis_cd_d a
                                where a.nis='$nik2' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                                group by a.periode,a.kode_lokasi,a.nis
                                having sum(case when a.dc = 'D' then a.nilai else -a.nilai end) <> 0
                                ) b on a.kode_lokasi=b.kode_lokasi and a.periode=b.periode and a.nis=b.nis ";

                                // echo $sql;
        
                                $rs2 = execute($sql);  
                                while ($row2 = $rs2->FetchNextObject($toupper=false)){
        
                                    if ($row2->dc == "D"){
                                        $color="color:#01f400";
                                        // $total=$row2->tagihan;
                                        $gmbr=$path2."image/green2.png";
                                    }else{
                                        $color="color:#1cbbff";
                                        // $total=$row2->bayar;
                                        $gmbr=$path2."image/blue.png";
                                    }

                                    echo"
                                    <div class='box-footer box-comments' style='background:white'>
                                        <div class='box-comment'>
                                            <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                            <div class='comment-text'>
                                                <span class='username'>
                                                $row2->no_bukti $row2->keterangan
                                                    <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai,0,",",".")." ( ".$row2->dc." )</b></span>
                                                </span><!-- /.username -->
                                                $row2->tgl
                                                    
                                            </div>
                                        </div>
                                    </div>";
                                   
        
                                }
                        echo"
                        </div>                   
                        ";
        
                        break;

                    }
           
        
        echo"   
            </div>
        </div>";

    echo "<script type='text/javascript'>
          $(document).ready(function(){
                

            })
         </script>";

?>
