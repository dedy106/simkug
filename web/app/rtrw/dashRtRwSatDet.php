<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $blok=$tmp[2];
    $kode_rumah=$tmp[3];
    $tahun=substr($periode,0,4);
    // echo $kode_rumah;
    
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
    switch($kunci){
        case "bayar" :
        $judul = "Bayar Iuran";
        break;
        case "setor" :
        if($tmp[4] != ""){
            $per = $tmp[4];
        }
    
        if($tmp[5] != ""){
            $rt = $tmp[5];
        }
        $judul = "Setoran";
        break;
        case "rekap" :
        $judul = "Rekap";
        if($tmp[4] != ""){
            $per = $tmp[4];
        }else{
            $per = $periode;
        }
        break;
        case "warga" :
        $judul = "Warga";
        break;
        
    }	

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashRtRwSat.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwSat.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    echo "<div class='panel' style='$padding'>
            <div class='panel-body'>
                $back1";
                switch($kunci){
                    case "warga":

                        echo"
                        <div class='box box-widget'>
                            <div class='box-body'>
                                <div class='row'>
                                    <div class='col-md-1'><label>Blok</label>
                                    </div>
                                    <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Blok</option>";

                                        $resLok = execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by blok ");
                                        
                                        echo " <option value=".$blok." selected>".$blok."</option>";
                                        
                                        while ($row = $resLok->FetchNextObject(false)){
                                            echo " <option value=".$row->blok.">".$row->blok."</option>";
                                        }
                                        
                                        echo"  
                                        </select>
                                    </div>
                                </diV>
                            </div>";
                            
                            $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                            
                            echo"
                            <table class='table no-margin'>
                                <thead>
                                <tr>
                                    <th width='50%' colspan='2' style='border-bottom: 1px solid white;'>No Rumah</th>
                                    <th width='50%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Jumlah Warga</th>
                                </tr>
                                </thead>
                            <tbody>";
                                
                            $sql="select a.kode_rumah, isnull(b.jumlah,0) as jumlah
                                from rt_rumah a 
                                left join (	select a.no_rumah,count(*) as jumlah
                                from rt_warga_d a where kode_lokasi='$kode_lokasi' and a.kode_blok='$blok'
                                group by a.no_rumah
                                ) b on a.kode_rumah=b.no_rumah 
                                where a.blok='$blok' 
                                order by a.nu ";
                                
                            $x=0;
                            $rs2 = execute($sql);  
                            while ($row = $rs2->FetchNextObject($toupper=false)){
                                if($x % 2 == 1){
                                    $clr=$colors[1];
                                }else{
                                    $clr=$colors[2];
                                }
                                echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='48%'><b>$row->kode_rumah</b></td>
                                            <td width='48%'style='text-align:right;color:".$clr."'><b>".number_format($row->jumlah,0,",",".")."</b></td>
                                            <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet2.php&param=$jenis/$kunci/detWarga/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
                                        </tr>";
                                        $x++;
                            }
                            echo"
                                </tbody>
                            </table>
                                     ";
                        echo"
                        </div>
                        ";
                    break;
                    case "bayar" :
                    echo"
                    <div class='box box-widget'>
                            <div class='box-body'>
                                <div class='row'>
                                    <div class='col-md-1'><label>Blok</label>
                                    </div>
                                    <div class='col-md-3'>
                                    <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                    <option value=''>Pilih Blok</option>";
                                    $resLok = execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by blok ");

                                    echo " <option value=".$blok." selected>".$blok."</option>";
                                
                                    while ($row = $resLok->FetchNextObject(false)){
                                        echo " <option value=".$row->blok.">".$row->blok."</option>";
                                    }
                            
                                echo"  
                                    </select>
                                    </div>
                                </diV>
                            </div>";

                                $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                echo"
                                <table class='table no-margin'>
                                <thead>
                                <tr>
                                    
                                    <th width='20%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                                    <th width='40%'  style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                    <th width='40%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Total Bayar</th>
                                    </tr>
                                </thead>
                                <tbody>";
                               
                                // $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo,0 as bayar from 
                                // (
                                // select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                // from rt_bill_d a
                                // inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                // where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                // group by a.kode_rumah
                                // union 
                                // select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                // from rt_angs_d a
                                // inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                // where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                // group by a.kode_rumah
                                // ) a
                                // group by a.kode_rumah";
                                $sql = "select a.kode_rumah,isnull(b.saldo,0) as saldo,isnull(c.nilai,0) as bayar 
                                from rt_rumah a
								left join
								(
                                    select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
                                    from 
                                    (
                                        select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                        from rt_bill_d a
                                        inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                        where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                        group by a.kode_rumah,a.kode_lokasi
                                        union all
                                        select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                        from rt_angs_d a
                                        inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                        where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                        group by a.kode_rumah,a.kode_lokasi
                                    ) a
                                    group by a.kode_rumah,a.kode_lokasi
                                ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                            from rt_angs_d a
                                            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                            where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok'
                                            and a.kode_jenis='IWAJIB' and a.no_setor='-'
                                            group by a.kode_rumah,a.kode_lokasi
                                ) c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi
								where a.kode_lokasi='$kode_lokasi' and a.blok='$blok'
                                order by a.nu ";

                                $x=0;
        
                                $rs2 = execute($sql);  
                                while ($row = $rs2->FetchNextObject($toupper=false)){
                                    if($x % 2 == 1){
                                        $clr=$colors[1];
                                    }else{
                                        $clr=$colors[2];
                                    }
                                    echo"
                                    <tr>
                                        <td width='20%'><b>$row->kode_rumah</b></td>
                                        <td width='40%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->saldo,0,",",".")."</b></td>
                                        <td width='38%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->bayar,0,",",".")."</b></td>
                                        <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet2.php&param=$jenis/$kunci/detBayar/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
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
                    break;
                    case "setor" :
                    echo"
                    <div class='box box-widget'>
                        <form class='form-setor' method='POST' >
                            <div class='row'>
                                <div class='col-xs-12'>
                                    <div class='box-header'>
                                        <button id='btnSubmit' class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                    </div>
                                    <div class='box-body'>
                                        <div class='row'>
                                            <div class='form-group'>
                                                <label for='inputTgl' class='col-sm-2 control-label'>Tanggal</label>
                                                <div class='input-group date col-sm-4' style='padding-right:15px; padding-left:15px;'>
                                                <div class='input-group-addon'>
                                                <i class='fa fa-calendar'></i>
                                                </div>
                                                <input name='tanggal' class='form-control datepicker-dmy' id='tanggal' required value=".date('d-m-Y').">
                                                </div>
                                            </div>
                                        </div>
                                        <div class='row'>
                                            <div class='form-group'>
                                                <label for='inputNilai' class='col-sm-2 control-label'>Total</label>
                                                <div class='col-sm-4'>
                                                    <input type='text' name='bayar' class='form-control' id='inputNilai' readonly value='0'>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='row'>
                                            <div class='form-group'>
                                                <div class='col-sm-3'>
                                                    <input type='hidden' name='nilRT' class='form-control' id='inputNilRT' readonly value='0'>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='row'>
                                            <div class='form-group'>
                                                <div class='col-sm-3'>
                                                    <input type='hidden' name='nilRW' class='form-control' id='inputNilRW' readonly value='0'>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <input type='hidden' name='kode_lokasi' class='form-control' readonly value='$kode_lokasi'>
                                               
                                        <input type='hidden' name='nik' class='form-control' readonly value='$nik'>
                                               
                                        <input type='hidden' name='kode_pp' class='form-control' readonly value='$kode_pp' >
                                               
                                        <input type='hidden' name='no_rumah' class='form-control' readonly value='$no_rumah' >
                                                
                                    </div>
                                ";
                               
                                $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                               
                                echo"
                                <table class='table no-margin'>
                                <thead>
                                <tr>
                                    
                                    <th width='50%' style='border-bottom: 1px solid white;'>No Rumah</th>
                                    <th width='50%' style='text-align:right;border-bottom: 1px solid white;' colspan='3'>Nilai</th>
                                    <th style='text-align:right;border-bottom: 1px solid white;'>&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody>
                                <style>
                                .toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
                                .toggle.ios .toggle-handle { border-radius: 20px; }
                                </style>
                                ";

                                $sql=" select kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
                                from rt_angs_d where kode_lokasi ='$kode_lokasi' and no_setor='-' and kode_jenis='IWAJIB' and kode_pp='$kode_pp' group by kode_lokasi,kode_rumah
                                order by kode_rumah ";

                                // echo $sql;
        
                                $rs = execute($sql);  
                                $x=0;
                                $total=0;
                                while ($row = $rs->FetchNextObject($toupper=false)){
                                    if($x % 2 == 1){
                                        $clr=$colors[1];
                                    }else{
                                        $clr=$colors[2];
                                    }
                                    echo"
                                    <tr class='sai-grid-row'>
                                        <td width='25%'>".$row->kode_rumah." <input name='kode_rumah[]' value='$row->kode_rumah' type='hidden'></input></td>
                                        <td width='15%' style='text-align:right;color:".$clr."'>
                                        <input name='nilai_rt[]' class='input-nilrt' value='$row->nilai_rt' type='hidden'></input>
                                        <td width='15%' style='text-align:right;color:".$clr."'>
                                        <input name='nilai_rw[]' class='input-nilrw' value='$row->nilai_rw' type='hidden'></input>
                                        </td>
                                        <td width='18%' style='text-align:right;color:".$clr."'>Rp.".number_format($row->bayar,0,",",".")."
                                        <input name='nilai_tot[]' class='input-nilai' value='$row->bayar' type='hidden'></input>
                                        </td>
                                        <td width='2%'><input type='checkbox' checked name='toggle2[]' class='inputToggle' data-on=' ' data-off=' ' data-toggle='toggle' data-size='mini' data-style='ios'>
                                        <input type='hidden' name='toggle[]' class='input-tog'><div id='console-event$x'></div></td>
                                    </tr>";
                                    $x++;
                                    $total+=$row->bill;
                                }
                                echo"
                                </tbody>
                                </table>
                                 ";
                                
                                
                            // }
                        echo"
                            </div>
                        </div>
                    </form>
                </div>
                    ";              
                    break;
                    case "rekap" :
                        echo" <div class='box' style='border: none;box-shadow: none;'>
                        <div class='box-body'>
                            <div class='row'>
                                <div class='col-md-1' style='padding-left: 5px;
                                padding-right: 5px;'><label>Periode</label>
                                </div>
                                <div class='col-md-3'  style='padding-left: 5px;
                                padding-right: 5px;'>
                                    <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                                    <option value=''>Pilih Periode</option>";
                                    $resLok = execute("select 'all' as periode union all select distinct periode from rt_setor_m where kode_lokasi='$kode_lokasi' order by periode desc ");

                                    echo " <option value=".$per." selected>".$per."</option>";
                                
                                    while ($row = $resLok->FetchNextObject(false)){
                                        echo " <option value=".$row->periode.">".$row->periode."</option>";
                                    }
                            
                                echo"  
                                    </select>
                                </div>
                            </div>
                        </div>
                        </div>";
                        if($per == "" or $per == "all"){
                            $filter = "";
                        }else{
                            $filter = " and periode='$per' ";
                        }

                        $sql="select no_setor,convert(varchar,tanggal,103) as tanggal,isnull(sum(nilai),0)+isnull(sum(kas_rt),0)+isnull(sum(sumbangan),0) as total from rt_setor_m where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and modul='IWAJIB' $filter  group by no_setor,tanggal order by no_setor desc ";

                        // echo $sql;
                        $total1 = 0;
                        $rs = execute($sql);  
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-5' style='padding-left:0px'>No Setor</div>
                            <div class='col-xs-3' style='padding-left:0px'>Tanggal</div>
                            <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                        </div>";
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            $total1+=+$row->total;
                            echo"
                            <div class='row' style='margin-left:0px;margin-right:0px;font-size:12px'>
                                <div class='col-xs-5' style='padding-left:0px;'>$row->no_setor</div>
                                <div class='col-xs-3' style='padding-left:0px;'>$row->tanggal</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px;' ><a href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet2.php&param=$jenis/$kunci/detRekap/$tahun/$kode_rumah/$blok/$row->no_setor' style='cursor:pointer;color:blue' >".number_format($row->total,0,",",".")."</a></div>
                            </div>";
                        }
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px;font-size:12px'>
                            <div class='col-xs-8' style='padding-left:0px'>TOTAL</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1,0,",",".")."</div>
                        </div>";

                        break;
                        
                }
    
        echo"</div>
        </div>";
        echo "<script type='text/javascript'>
            $(document).ready(function(){                 

                $('#dash_blok').change(function(e) { 
                    e.preventDefault();
                    var blok = this.value;
      
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet.php&param=$jenis/$kunci/'+blok;
                });

                $('#dash_periode').change(function(e) { 
                    e.preventDefault();
                    var periode = this.value;
      
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwSatDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode;
                });

                function sepNum(x){
                    if (typeof x === 'undefined' || !x) { 
                        return 0;
                    }else{
                        if(x < 0){
                            var x = parseFloat(x).toFixed(0);
                        }
                        
                        var parts = x.toString().split(',');
                        parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                        return parts.join('.');
                    }
                }
                function hitungSaldo(){

                    totSal = 0;totRT = 0;totRW = 0;
                    $('.sai-grid-row').each(function(){
                        var nilai=$(this).closest('tr').find('.input-nilai').val();
                        var rt=$(this).closest('tr').find('.input-nilrt').val();
                        var rw=$(this).closest('tr').find('.input-nilrw').val();
                        $(this).closest('tr').find('.input-tog').val('on');
                        
                        totSal+=+nilai;
                        totRT+=+rt;
                        totRW+=+rw;
      
                    });
                    
                    $('#inputNilai').val(sepNum(totSal));
                    $('#inputNilRT').val(sepNum(totRT));
                    $('#inputNilRW').val(sepNum(totRW));
                   
      
                }
      
                hitungSaldo();
                $('.inputToggle').prop('checked');

                $('.inputToggle').change(function() {  
                
                    
                    $('#inputNilai').val(0);
                    
                    total = 0;
                    totRT = 0;
                    totRW = 0;
                    $('.sai-grid-row').each(function(){
                        var cek=$(this).closest('tr').find('.inputToggle').prop('checked');
                        var tog=$(this).closest('tr').find('.inputToggle').val();
                        var nilai=$(this).closest('tr').find('.input-nilai').val();
                        var rt=$(this).closest('tr').find('.input-nilrt').val();
                        var rw=$(this).closest('tr').find('.input-nilrw').val();
      
                        if(cek == true){
                            total+=+nilai;
                            totRT+=+rt;
                            totRW+=+rw;
                            $(this).closest('tr').find('.input-tog').val('on');
                        }else{
                            $(this).closest('tr').find('.input-tog').val('off');
                        }
                        
                    });
                    $('#inputNilai').val(sepNum(total));
                    $('#inputNilRT').val(sepNum(totRT));
                    $('#inputNilRW').val(sepNum(totRW));
                     
                    
                    
                }); 
                
                $('input').on('keyup keypress', function(e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 13) { 
                      e.preventDefault();
                      return false;
                    }
                });  
      
                $('#btnSubmit').click(function(e){
                    e.preventDefault();
                    // alert('test');
                    myForm = $('.form-setor').serialize();
      
                    // alert(myForm);
                   
                    $.ajax({
                        type: 'POST',
                        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanSetoran',
                        dataType: 'json',
                        data: myForm,
                        cache: false,
                        success:function(result){
                            alert('Input data '+result.message);
      
                            if(result.status){
                                location.reload();
                            }
                        }
                    });
      
                });

             })        
          
			 </script>";
?>
