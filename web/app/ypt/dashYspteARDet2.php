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
    $param=$tmp[1];
    $nil=$tmp[4];

    switch($param){
        case "kartu_piu" :
        $judul = "Kartu Piutang";
        break;
        case "kartu_pdd" :
        $judul = "Kartu PDD";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYspteARDet.php&param=$box|$nil";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYspteARDet.php&param=$box|$nil' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";

    switch($param){
        case "kartu_piu" :
        $nik2 = $tmp[2];
        if($tmp[2] == "Not Found"){
            $nik2= $tmp[3];
        }
        echo "  <div class='row' style='margin-left:0px;margin-right:0px'>";
            echo"
            <div class='box' style='box-shadow:none;border:none;'>
            <div class='box-header'>
                <i class='fa fa-bar-chart' style='vertical-align: top;'></i>
                <h3 class='box-title' style='font-size:16px'>Kartu Piutang</h3>                
            </div>
            <div class='box-body'>
                <div class='col-xs-12 pull-right'>
                <style>
                .selectize-input{
                    border:none;
                    border-bottom:1px solid #8080806b;
                }
                </style>";
                
                if($mobile ==true){
                    echo"
                    <div class='col-xs-9' style='padding-left:0px;padding-right:0px'>
                    <input type='text' value='".$nik2."' class='form-control' id='inp-sis' placeholder='Masukkan NIS Siswa' style='border:0;border-bottom:1px solid  #8080806b;margin-bottom: 20px;'>
                    </div>
                    <div class='col-xs-3' style=''>
                    <button class='btn btn-sm btn-danger' type='button' id='btn-sis'><i class='fa fa-search'></i> &nbsp;Cari</button>
                    </div>";

                }else{
                    echo"
                    <select class='form-control input-sm selectize' id='dash-sis' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                    <option value=''>Pilih Siswa</option> ";
                    echo " <option value=".$nik2." selected>".$nik2."</option>";
                    
                    $res = execute("select distinct nis,nama from sis_siswa where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by nis desc");

                    
                    while ($row = $res->FetchNextObject(false)){
                        echo " <option value=".$row->nis." >".$row->nis."</option>";
                    }
                    
                echo" </select>";
                
                }
                echo"
                </div>
            </div>
        </div>";

        if($tmp[2] == ""){
            echo "";
        }
        else if ($tmp[2] == "Not Found"){
            echo "<div class='alert alert-danger alert-dismissible'>
            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
            <h4><i class='icon fa fa-ban'></i> Alert!</h4>
            NIS Tidak Terdaftar 
            </div>";
        }
        else{
            $nik2 = $tmp[2];
            
            $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt, g.nama as nama_pp,g.alamat,g.alamat2,g.pic,g.bank,g.rek, isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir from sis_siswa a inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp inner join sis_sekolah g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where b.flag_aktif=1 and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode<'$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where b.flag_aktif=1 and a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where b.flag_aktif=1 and a.kode_lokasi='$kode_lokasi' and a.dc='C' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp where a.nis='$nik2' and a.flag_aktif=1 order by a.nis";

            $rs=execute($sql);
            $row = $rs->FetchNextObject($toupper=false);	

            echo"<table class='table no-border'>";
            echo"
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Nama</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->nama</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>NIS</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->nis</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Id Bank</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->id_bank</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Saldo Piutang</td>
                    <td style='padding-bottom:0px;padding-top:0px'>".number_format($row->so_akhir,0,",",".")."</td>
                </tr>
                </table>
                </div>
            </div>
            <div class='row' style='margin-right: -10px;margin-left: -10px;'>
            <div class='col-xs-12 table-responsive' style='border:none'>
                <table class='table no-border' style='font-size:12px;background: #dd4b39;border:1px solid #dd4b39;color: white;border-radius: 5px;'>
                <tr style=''>
                    <th width='50%'>Keterangan</th>
                    <th width='22%'>Transaksi</th>
                    <th width='28%' style=''>Saldo</th>
                </tr>
                </table>
                <table class='table no-border' style='font-size:12px;'>
                ";
                $sql2="select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar from sis_bill_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param )a inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(nilai) as bayar from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_rekon,x.nis,x.kode_param )a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,b.keterangan,'KB' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(nilai) as bayar from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik2' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_rekon,x.nis,x.kode_param )a inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi order by tanggal,modul";
                
                
                $tgh_tabel = "";
                $total_tgh= 0;
                $total_pmb = 0;
                $total_saldo = 0;
                $total_jml = 0;
                $rs1=execute($sql2);
                $i=1;
                while($row1 = $rs1->FetchNextObject($toupper=false)){
                    
                    $total_tgh += +$row1->tagihan;
                    $total_pmb += +$row1->bayar;
                    $total_saldo += +$row1->tagihan - $row1->bayar;
                    
                    echo "<tr>
                   ";
                    if($row1->tagihan > 0){
                        echo " <td width='50%'>$row1->tgl | $row1->no_bukti <br> Tagihan $row1->kode_param </td>
                        <td style='color:#dd4b39' width='22%'>".number_format($row1->tagihan,0,",",".")."</td>" ;
                    }else{
                        echo " <td width='50%'>$row1->tgl | $row1->no_bukti <br> Pembayaran $row1->kode_param </td>
                        <td style='color:green' width='22%'>".number_format($row1->bayar,0,",",".")."</td>";
                    }
                    echo"
                    <td width='28%'>".number_format($total_saldo,0,",",".")."</td>
                    </tr>";
                    $i++;
                }
                $total=$total_tgh-$total_pmb;
                echo "
                <tr>
                <td style='text-align:right;' colspan='2'><strong>Saldo</strong></td>
                <td>".number_format($total_saldo,0,",",".")."</td>
                </tr>";
                echo"
                </table>
            </div>
            </div>
            ";
        }
            
        break;
        case "kartu_pdd" :
        $nik2 = $tmp[2];
        if($tmp[2] == "Not Found"){
            $nik2= $tmp[3];
        }
        echo "  <div class='row' style='margin-left:0px;margin-right:0px'>";
        echo"
        <div class='box' style='box-shadow:none;border:none;'>
            <div class='box-header'>
                <i class='fa fa-bar-chart' style='vertical-align: top;'></i>
                <h3 class='box-title' style='font-size:16px'>Kartu PDD</h3>                
            </div>
            <div class='box-body'>
                <div class='col-xs-12 pull-right'>
                <style>
                .selectize-input{
                    border:none;
                    border-bottom:1px solid #8080806b;
                }
                </style>";
                
                if($mobile ==true){
                    echo"
                    <div class='col-xs-9' style='padding-left:0px;padding-right:0px'>
                    <input type='text' value='".$nik2."' class='form-control' id='inp-sis' placeholder='Masukkan NIS Siswa' style='border:0;border-bottom:1px solid  #8080806b;margin-bottom: 20px;'>
                    </div>
                    <div class='col-xs-3' style=''>
                    <button class='btn btn-sm btn-danger' type='button' id='btn-sis'><i class='fa fa-search'></i> &nbsp;Cari</button>
                    </div>";

                }else{

                    echo"
                    <select class='form-control input-sm selectize' id='dash-sis' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                    <option value=''>Pilih Siswa</option> ";
                    echo " <option value=".$nik2." selected>".$nik2."</option>";
                    
                    $res = execute("select distinct nis,nama from sis_siswa where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by nis desc");

                    
                    while ($row = $res->FetchNextObject(false)){
                        echo " <option value=".$row->nis." >".$row->nis."</option>";
                    }
                    
                    echo" </select>";
                }
                echo"
                </div>
            </div>
        </div>";

        if($tmp[2] == ""){
            echo "";
        }
        else if ($tmp[2] == "Not Found"){
            echo "<div class='alert alert-danger alert-dismissible'>
            <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
            <h4><i class='icon fa fa-ban'></i> Alert!</h4>
            NIS Tidak Terdaftar 
            </div>";
        }
        else{
            $nik2=$tmp[2];

            $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt, g.nama as nama_pp,g.alamat,g.alamat2,g.pic,g.bank,g.rek, isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir from sis_siswa a inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp inner join sis_sekolah g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode<'$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp where a.kode_lokasi='$kode_lokasi' and a.dc='C' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik2' group by a.nis,a.kode_lokasi,a.kode_pp )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp where a.nis='$nik2' order by a.nis ";

            $rs=execute($sql);
            $row = $rs->FetchNextObject($toupper=false);	

            echo"<table class='table no-border'>";
            echo"
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Nama</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->nama</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>NIS</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->nis</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Id Bank</td>
                    <td style='padding-bottom:0px;padding-top:0px'>$row->id_bank</td>
                </tr>
                <tr>
                    <td style='padding-bottom:0px;padding-top:0px'>Saldo PDD</td>
                    <td style='padding-bottom:0px;padding-top:0px'>".number_format($row->so_akhir,0,",",".")."</td>
                </tr>
                </table>
                </div>
            </div>
            <div class='row' style='margin-right: -10px;margin-left: -10px;'>
            <div class='col-xs-12 table-responsive' style='border:none'>
                <table class='table no-border' style='font-size:12px;background: #dd4b39;border:1px solid #dd4b39;color: white;border-radius: 5px;'>
                <tr style=''>
                    <th width='50%'>Keterangan</th>
                    <th width='22%'>Transaksi</th>
                    <th width='28%' style=''>Saldo</th>
                </tr>
                </table>
                <table class='table no-border' style='font-size:12px;'>
                ";
                $tgh_tabel = "";
                $total_d= 0;
                $total_k = 0;
                $total_saldo = 0;
                
                $sql2 = "select a.no_bukti,a.tgl,a.keterangan,a.modul,a.kode_param,a.debet,a.kredit 
                from (select a.no_bukti,a.nilai,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,a.kode_param,b.keterangan,b.modul,b.tanggal, a.nilai as debet,0 as kredit 
                    from sis_cd_d a 
                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi where a.nis='$nik2' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='D' union all 
                    select a.no_bukti,a.nilai,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,a.kode_param,b.keterangan,b.modul,b.tanggal, 0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit from sis_cd_d a inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi where a.nis='$nik2' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='C' 
                    union all 
                    select a.no_bukti,a.nilai,CONVERT(VARCHAR(8), b.tanggal, 3) as tgl,a.kode_param,b.keterangan,b.modul,b.tanggal, 0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi where a.nis='$nik2' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='C')a order by a.tanggal";
                
            
                $rs1=execute($sql2);
                $i=1;
                while($row1 = $rs1->FetchNextObject($toupper=false)){
                    $total_d += +$row1->debet;
                    $total_k += +$row1->kredit;
                    $total_saldo += +$total_d - $total_k;
                    
                    echo "<tr>";
                    if($row1->debet > 0){
                        echo"<td width='50%' style=''>$row1->tgl | $row1->no_bukti <br> Deposit $row1->kode_param  </td>
                        <td style='color:green' width='22%'>".number_format($row1->debet,0,",",".")."</td>";
                    }else{
                        echo"<td width='50%'>$row1->tgl | $row1->no_bukti <br> Pembayaran $row1->kode_param  </td>
                        <td style='color:#dd4b39' width='22%'>".number_format($row1->kredit,0,",",".")."</td>";
                    }
                    echo"
                    <td style='' width='28%'>".number_format($total_saldo,0,",",".")."</td>
                    </tr>";
                    $i++;
                }
                $total=$total_d-$total_k;
                // echo "<tr>
                // <td style='text-align:right;'><strong>Total</strong></td>
                // <td>".number_format($total,0,",",".")."</td>
                // <td></td>
                // </tr>";
                
                if($total_saldo > 0){
                    echo "<tr>
                    <td style='text-align:right;' colspan='2'><strong>Saldo</strong></td>
                    <td>".number_format($total_saldo)."</td>
                    </tr>";
                }else{
                    echo "<tr>
                    <td style='text-align:right;' colspan='2'><strong>Saldo</strong></td>
                    <td></td>
                    </tr>";
                }
                echo"
                </table>
            </div>
            </div>
            ";
            
        }

        break;

        
    }

        echo"
            </div>
        </div>";
                		
		echo "
        <script type='text/javascript'>

        $('#btn-sis').click(function(){

            var sis = $('#inp-sis').val();

            $.ajax({
                url: 'include_lib.php?hal=server/ypt/Siswa.php&fx=getSiswa',
                data: {'nis':sis,'kode_pp':'$kode_pp'},
                type: 'post',
                dataType: 'json',
                // contentType: false, 
                // cache: false, 
                // processData:false, 
                success: function (data) {

                    if(data.status == 1){
                        window.location.href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|$param|'+sis;
                    }else if (data.status == 3){
                        // alert('NIS tidak terdaftar');
                        window.location.href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|$param|Not Found|'+sis;
                    }
                }
            });

           
        });
       
        $('#dash-sis').change(function(){
            var sis = $(this).val();
            window.location.href='$fmain?hal=app/ypt/dashYspteARDet2.php&param=$box|$param|'+sis;
        });

        </script>";
       

?>
