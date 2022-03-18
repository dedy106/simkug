<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $kode_fs="FS1";
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
    
    $notifikasi= $path . "image/notif.png";
    $logomain = $path.'/web/img/yspt2.png';
    $mainname = $_SESSION['namaPP'];

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
           <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
           </a>
        </header>";
        $padding="padding-top:50px";
    }else{
        $width="25%";
        $header="";
        $padding="";
    }
    $sql = "select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,c.nama as nama_jur,a.kode_akt,a.id_bank,x.nama as nama_pp,x.alamat,x.alamat2
    from sis_siswa a
    inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
    inner join sis_jur c on b.kode_jur=c.kode_jur and 
    b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
    inner join sis_sekolah x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi
    inner join (select a.nis,a.kode_pp,a.kode_lokasi
                from sis_cd_d a
                where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                group by a.nis,a.kode_pp,a.kode_lokasi
                )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik'
    order by a.kode_kelas,a.nis";

    // echo $nik;

    $rs=execute($sql);
    $row = $rs->FetchNextObject($toupper=false);
    
    $sql="select case when sum(debet-kredit) < 0 then 0 else sum(debet-kredit) end as so_akhir
from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
           a.nilai as debet,0 as kredit,a.dc
    from sis_cd_d a
    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='D'
    union all
    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
           case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
    from sis_cd_d a
    inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' 
    union all
    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
           0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
    from sis_cd_d a
    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='C'
                
    )a";

    // echo $sql;
    $saldo= dbResultArray($sql);
    $so_akhir=$saldo[0]["so_akhir"];

    echo "
        $header
		<div class='panel' style='margin:0px;$padding'>
            <div class='panel-heading' style='font-size:25px;padding:10px 0px 10px 20px;color:#dd4b39'>Laporan Kartu PDD
            </div>
            
            <div class='panel-body' style='padding:0px'>
            <div class='row' style='padding-left:10px'>
                <div class='col-xs-12 table-responsive' style='border:none'>";
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
                    <td style='padding-bottom:0px;padding-top:0px'>".number_format($so_akhir,0,",",".")."</td>
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
                $sql2="select a.no_bukti,a.tgl,a.keterangan,a.modul,a.debet,a.kredit,a.dc
                from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                a.nilai as debet,0 as kredit,a.dc
                from sis_cd_d a
                inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='D'
                union all
                select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                from sis_cd_d a
                inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' 
                union all
                select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                from sis_cd_d a
                inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='C'
                
                )a
                order by a.tanggal,a.no_bukti ";
                
                $rs1=execute($sql2);
                $i=1;
                $total_d=0;
                $total_k=0;
                $total_saldo=0;
                $total_saldo2=0;
                while($row1 = $rs1->FetchNextObject($toupper=false)){
                    $total_d += +$row1->debet;
                    $total_k += +$row1->kredit;
                    $total_saldo += ($row1->debet - $row1->kredit);
                    
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
                    $total_saldo2 +=$total_saldo;
                }
                $total=$total_d-$total_k;
                // echo "<tr>
                // <td style='text-align:right;'><strong>Total</strong></td>
                // <td>".number_format($total,0,",",".")."</td>
                // <td></td>
                // </tr>";
                
                if($so_akhir > 0){
                    echo "<tr>
                    <td style='text-align:right;' colspan='2'><strong>Saldo</strong></td>
                    <td>".number_format($so_akhir)."</td>
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
            echo"               
            </div>
       </div>";    
       
       
                		
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
