<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashRtRwDet extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
    }

    // function limit_words($string, $word_limit){
    //     $words = explode(" ",$string);
    //     return implode(" ",array_splice($words,0,$word_limit));
    // }
    
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];
        $blok=$tmp[6];
        $tahun= substr($periode,0,4);

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path2 = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path2 . "image/keubg.png";
        $foto = $path2 . "image/wallpaper/Forest.jpg";

        // echo $kunci;

        // $sql="select kode_ta from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1'";

        // $rsTa = $dbLib->execute($sql);  
        // $row = $rsTa->FetchNextObject($toupper=false);

        // $kode_ta = $row->kode_ta;
        
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRw','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
                    switch($kunci){
                        case "bp" :
                    echo "
                    <div class='row'>
                        <div class='col-md-12'>
                        <!-- The time line -->
                        <ul class='timeline'>
                            <!-- timeline time label -->
                        ";

                        $sql="select distinct convert(varchar,tanggal,103) as tgl from rt_buku_p where kode_lokasi='$kode_lokasi' order by convert(varchar,tanggal,103) desc  ";

                        $rs = $dbLib->execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){

                        echo"    
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    $row->tgl
                                </span>
                            </li>
                            <!-- /.timeline-label -->
                            ";

                            $sql2="select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from rt_buku_p 
                            where convert(varchar,tanggal,103) = '$row->tgl' 
                            order by convert(varchar(10), tgl_input, 108)  desc ";

                            $rs2 = $dbLib->execute($sql2);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){

                            $gambar= $path2."server/media/".$row2->file_gambar;
                            $pathdok= $path2."server/media/".$row2->file_dok;
                            

                            $keterangan= urldecode($row2->keterangan);
                            // $limited_string = limit_words($keterangan, 30);
                                
                        echo"
                            <!-- timeline item -->
                            <li>
                            <i class='fa fa-envelope bg-blue'></i>

                            <div class='timeline-item'>
                                <span class='time'><i class='fa fa-clock-o'></i> $row2->jam</span>

                                <h3 class='timeline-header'><a href='#'>$row2->no_bukti</a> $row2->jenis</h3>

                                <div class='timeline-body'>
                                <img src='$gambar' alt='...' class='margin' width='150px'>
                                ".$keterangan."
                                </div>
                                <div class='timeline-footer'>
                                <a class='btn btn-primary btn-xs' style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwNews','','$kode_lokasi/$periode/$kode_pp/$nik/$row2->no_bukti/bp/$blok');\" >Read More</a>
                                <a class='btn btn-success btn-xs' href='$pathdok' target='_blank'>Download Dokumen</a>
                                </div>
                            </div>
                            </li>
                            <!-- END timeline item -->
                        ";
                            }

                        }
                        echo"
                            <li>
                            <i class='fa fa-clock-o bg-gray'></i>
                            </li>
                        </ul>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    ";
                        break;
                        case "keu" :

                    $sql="select sum(nilai) as saldo from
                    (
                    select so_akhir as nilai from glma where kode_akun ='11115' and kode_lokasi='$kode_lokasi' 
                    union 
                    select sum(case dc when 'D' then nilai else -nilai end) as nilai 
                    from gldt where kode_akun ='11115' and kode_lokasi='$kode_lokasi' 
                    ) a
                    ";

                    $rs = $dbLib->execute($sql);  
                    $row = $rs->FetchNextObject($toupper=false);

                   
                echo"
                <div class='box box-widget'>
                        <div class='box-body'>
                            <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                <p>Saldo Kas</p>
                                <h4>Rp. ".number_format($row->saldo,0,",",".")."</h4>
                                <p>Untuk informasi lebih lanjut hubungi Bendahara </p>                              
                            </div>
                            <h4> Riwayat Transaksi </h4>
                        </div>";

                        $sql="select top 10 convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis
                        from gldt where kode_akun ='11115' and kode_pp ='05' and kode_lokasi='$kode_lokasi'
                        order by tanggal desc ";

                        $rs2 = $dbLib->execute($sql);  
                        while ($row2 = $rs2->FetchNextObject($toupper=false)){

                            $jenis = strtoupper($row2->jenis);

                            if ($jenis == "BK"){
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
                                            $row2->keterangan
                                            <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                            Tanggal $row2->tgl
                                    </div>
                                </div>
                            </div>";

                        }
                echo"
                </div>                   
                ";

                        break;
                        case "news" :

                        $sql="select no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

                        $rs = $dbLib->execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            $foto2 = $path2 . "server/media/".$row->file_dok;
                     echo "
                        <div class='col-md-12 col-md-12'>
                            <!-- Widget: user widget style 1 -->
                            <div class='box box-widget widget-user'>
                                <!-- Add the bg color to the header using any of the bg-* classes -->
                                <div class='widget-user-header bg-black' style='background: url($foto2) center center;'>
                                    <h3 class='widget-user-username'></h3>
                                    <h5 class='widget-user-desc'></h5>
                                </div>
                                
                                <div class='box-footer'>
                                    <h5 class='description-header'>$row->judul</h5>
                                    <span class='description-text'>$row->tgl</span>  
                                </div>
                                <!-- /.widget-user -->
                            </div>
                        </div> ";
            
                        }
                        break;
                        case "iuran" :

                        // $sql="select a.tahun, a.tot_bill, isnull(b.tot_byr,0) as tot_byr, a.tot_bill-isnull(b.tot_byr,0) as saldo
                        // from (
                        //     select substring(periode,1,4) as tahun, kode_lokasi,sum(nilai_rt+nilai_rw) as tot_bill 
                        //     from rt_bill_d where periode like '".substr($periode,0,4)."%' and kode_lokasi='$kode_lokasi' and kode_rumah='$nik'
                        //     group by substring(periode,1,4),kode_lokasi
                        // ) a
                        // left join (
                        //     select substring(b.periode_bill,1,4) as tahun, a.kode_lokasi,sum(b.nilai_rt+b.nilai_rw) as tot_byr 
                        //     from trans_m a
                        //     inner join rt_angs_d b on a.no_bukti=b.no_angs and a.kode_lokasi=b.kode_lokasi
                        //     where b.periode_bill like '".substr($periode,0,4)."%' and a.kode_lokasi='$kode_lokasi' and a.param1='$nik'
                        //     group by substring(b.periode_bill,1,4),a.kode_lokasi
                        // ) b on a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi";

                        $sql="select sum(nilai) as saldo from 
                        (
                        select sum(a.nilai_rt+a.nilai_rw) as nilai
                        from rt_bill_d a
                        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$nik' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                        union 
                        select -sum(a.nilai_rt+a.nilai_rw) as nilai
                        from rt_angs_d a
                        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$nik' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                        ) a ";


                        $rs = $dbLib->execute($sql);  
                        $row = $rs->FetchNextObject($toupper=false);
                        $saldo=$row->saldo;

                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                        <p>Saldo Tagihan</p>
                                        <h4>Rp. ".number_format($saldo,0,",",".")."</h4>
                                        <p>Untuk informasi lebih lanjut hubungi bendahara </p>               <a onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet2','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/detTagih/$tahun/$nik/$blok');\" style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right ' style='font-size:30px'></i></span></a>
                                        <br>               
                                    </div>
                                    <h4> Riwayat Pembayaran </h4>
                                </div>";
        
                                $sql="select a.no_bukti, a.keterangan, convert(varchar,a.tanggal,105) as tgl,a.nilai1 as nilai1 from trans_m a 
                                where a.periode <= '$periode' and a.kode_lokasi='$kode_lokasi' and a.param1='$nik' and a.param2='IWAJIB'
                                order by a.no_bukti desc";
        
                                $rs2 = $dbLib->execute($sql);  
                                while ($row2 = $rs2->FetchNextObject($toupper=false)){
        
                                    // if ($row2->modul == "bill"){
                                        $color="color:#01f400";
                                        // $total=$row2->tagihan;
                                        $gmbr=$path2."image/green2.png";
                                    // }else{
                                    //     $color="color:#1cbbff";
                                    //     $total=$row2->bayar;
                                    //     $gmbr=$path2."image/blue.png";
                                    // }
                                    echo"
                                    <div class='box-footer box-comments' style='background:white'>
                                        <div class='box-comment'>
                                            <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                            <div class='comment-text'>
                                                <span class='username'>
                                                    $row2->keterangan
                                                    <span class='text-muted pull-right' style='$color;font-size:14px'><b>".number_format($row2->nilai1,0,",",".")."</b></span>
                                                </span><!-- /.username -->
                                                    Tanggal $row2->tgl
                                            </div>
                                        </div>
                                    </div>";
        
                                }
                        echo"
                        </div>                   
                        ";
                        break;
                        case "list":

                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1'><label>Blok</label>
                                        </div>
                                        <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Blok</option>";
                                        $resLok = $dbLib->execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' order by blok ");
                                    
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
                                        <th width='50%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Saldo Tagihan</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    // $sql="
                                    // select a.kode_rumah, a.tot_bill, isnull(b.tot_byr,0) as tot_byr, a.tot_bill-isnull(b.tot_byr,0) as saldo 
                                    // from (
                                    // select a.kode_rumah, a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as tot_bill
                                    // from rt_bill_d a
                                    // inner join rt_rumah b on a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah
                                    // where a.periode like '".substr($periode,0,4)."%' and a.kode_lokasi='$kode_lokasi' and b.blok='B10' and a.kode_jenis='IWAJIB'
                                    // group by a.kode_rumah,a.kode_lokasi
                                    // ) a
                                    // left join (
                                    // select a.param1, a.kode_lokasi,sum(a.nilai1) as tot_byr
                                    // from trans_m a
                                    // inner join rt_rumah b on a.kode_lokasi=b.kode_lokasi and a.param1=b.kode_rumah
                                    // where a.periode like '".substr($periode,0,4)."%' and a.kode_lokasi='$kode_lokasi' and b.blok='B10' and a.param2='IWAJIB'
                                    // group by a.param1,a.kode_lokasi) b on a.kode_rumah=b.param1 and a.kode_lokasi=b.kode_lokasi ";

                                    $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo from 
                                    (
                                    select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_bill_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    union 
                                    select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_angs_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    ) a
                                    group by a.kode_rumah ";

                                    $x=0;
            
                                    $rs2 = $dbLib->execute($sql);  
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
                                            <td width='48%'style='text-align:right;color:".$clr."'><b>".number_format($row->saldo,0,",",".")."</b></td>
                                            <td width='2%'><a onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet2','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/detTagih/$tahun/$row->kode_rumah/$blok');\" style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
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
                                        $resLok = $dbLib->execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' order by blok ");

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
                                        <th width='50%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Saldo Tagihan</th>
                                    </tr>
                                    </thead>
                                    <tbody>";
                                    // $sql="
                                    // select a.kode_rumah, a.tot_bill, isnull(b.tot_byr,0) as tot_byr, a.tot_bill-isnull(b.tot_byr,0) as saldo 
                                    // from (
                                    // select a.kode_rumah, a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as tot_bill
                                    // from rt_bill_d a
                                    // inner join rt_rumah b on a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah
                                    // where a.periode like '".substr($periode,0,4)."%' and a.kode_lokasi='$kode_lokasi' and b.blok='B10' and a.kode_jenis='IWAJIB'
                                    // group by a.kode_rumah,a.kode_lokasi
                                    // ) a
                                    // left join (
                                    // select a.param1, a.kode_lokasi,sum(a.nilai1) as tot_byr
                                    // from trans_m a
                                    // inner join rt_rumah b on a.kode_lokasi=b.kode_lokasi and a.param1=b.kode_rumah
                                    // where a.periode like '".substr($periode,0,4)."%' and a.kode_lokasi='$kode_lokasi' and b.blok='B10' and a.param2='IWAJIB'
                                    // group by a.param1,a.kode_lokasi) b on a.kode_rumah=b.param1 and a.kode_lokasi=b.kode_lokasi ";

                                    $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo from 
                                    (
                                    select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_bill_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    union 
                                    select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_angs_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    ) a
                                    group by a.kode_rumah";

                                    $x=0;
            
                                    $rs2 = $dbLib->execute($sql);  
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
                                            <td width='48%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->saldo,0,",",".")."</b></td>
                                            <td width='2%'><a onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet2','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/detBayar/$tahun/$row->kode_rumah/$blok');\" style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
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
                        case "kas" :
                        echo"
                        <div class='row'>
                            <div class='col-md-6'>
                                <form class='kas_insert' method='POST'>
                                    <div class='box-body'>
                                        <div class='form-group'>
                                            <label>Jenis Kas</label>
                                            <select class='form-control' id='kas-jenis' name='kode_jenis'>
                                                <option value=''>--- Pilih Jenis ---</option>
                                                <option value='Masuk'>Masuk</option>
                                                <option value='keluar'>Keluar</option>
                                            </select>
                                        </div>
                                        <div class='form-group'>
                                            <label>Referensi</label>
                                            <select class='form-control' id='kas-ref' name='kode_ref'>
                                            <option value='' disabled>--- Pilih Ref ---</option>
                                            </select>
                                        </div>
                                        <div class='form-group'>
                                            <label for='InputKet'>Keterangan</label>
                                            <input type='text' class='form-control' id='InputKet' name='keterangan'>
                                        </div>
                                        <div class='form-group'>
                                            <label for='InputNil'>Nilai</label>
                                            <input type='number'  id='InputNil' class='form-control currency' name='nilai'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='kode_lokasi' value='$kode_lokasi'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='nik' value='$nik'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='kode_pp' value='05'>
                                        </div>
                                       
                                    </div>
                                    <!-- /.box-body -->

                                    <div class='box-footer'>
                                        <button id='btnSubmit' class='btn btn-primary'>Submit</button>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>";

                        // echo"
                        // <form id='kas_form_insert'>
                        //     <div class='row'>
                        //         <div class='col-xs-12'>
                        //             <div class='box'>
                        //                 <div class='box-body'>
                        //                     <button type='submit' class='btn btn-primary'><i class='fa fa-plus-circle'></i> Save</button>
                        //                 </div>
                        //             </div>
                        //             <div class='box'>
                        //                 <div class='box-body pad'>
                        //                     <div class='row'>
                        //                         <div class='form-group'>
                        //                             <label class='control-label col-sm-3'>Jenis Kas</label>
                        //                             <div class='col-sm-9' style='margin-bottom:5px;'>
                        //                                 <select class='form-control' id='kas-jenis' name='kode_jenis'>
                        //                                     <option value=''>--- Pilih Jenis ---</option>
                        //                                     <option value='Masuk'>Masuk</option>
                        //                                     <option value='keluar'>Keluar</option>
                        //                                 </select>
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                     <div class='row'>
                        //                         <div class='form-group'>
                        //                             <label class='control-label col-sm-3'>Referensi</label>
                        //                             <div class='col-sm-9' style='margin-bottom:5px;'>
                        //                                 <select class='form-control' id='kas-ref' name='kode_ref'>
                        //                                      <option value='' disabled>--- Pilih Ref ---</option>
                        //                                 </select>
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                     <div class='row'>
                        //                         <div class='form-group'>
                        //                             <label class='control-label col-sm-3'>Keterangan/Path</label>
                        //                             <div class='col-sm-9' style='margin-bottom:5px;'>
                        //                                  <input type='text' class='form-control' id='InputKet' name='keterangan'>
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                     <div class='row'>
                        //                         <div class='form-group'>
                        //                             <label class='control-label col-sm-3'>Test Select</label>
                        //                             <div class='col-sm-9' style='margin-bottom:5px;'>
                        //                                 <input type='number'  id='InputNil' class='form-control currency' name='nilai'>
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </form>
                        // ";

                        break;
                    }
               
            
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>
            $(document).ready(function(){                 
                  
                var select_kas_ref = $('#kas-ref').selectize();

                var select_kas_jenis = $('#kas-jenis').selectize({
                    onChange: function(value) { 
                        if(select_kas_jenis[0].selectize.getValue()!='undefined'){
                            select_kas_ref[0].selectize.clearOptions();
                        } 
                        var nik='$nik';

                        $.ajax({
                            type: 'POST',
                            url: 'rtrwKas.php?fx=getsel',
                            dataType: 'json',
                            data: {'kode_lokasi':18, 'jenis':value,'nik':nik},
                            success:function(result){    
                                if(result.status){
                                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                        for(i=0;i<result.daftar.length;i++){
                                            select_kas_ref[0].selectize.addOption([{text:result.daftar[i].kode_ref + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_ref}]);  
                                        }
                                    }
                                }
                            }
                        });
                      
                    }
                });  

                function formatRp(angka, prefix)
                {
                    var number_string = angka.replace(/[^,\d]/g, '').toString(),
                        split	= number_string.split(','),
                        sisa 	= split[0].length % 3,
                        rupiah 	= split[0].substr(0, sisa),
                        ribuan 	= split[0].substr(sisa).match(/\d{3}/gi);
                        
                    if (ribuan) {
                        separator = sisa ? '.' : '';
                        rupiah += separator + ribuan.join('.');
                    }
                    
                    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                    return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
                }

                $('#dash_blok').change(function(e) { 
                    e.preventDefault();
                    var blok = this.value;
      
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/'+blok);
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
                    myForm = $('.kas_insert').serialize();

                    // alert(myForm);
                   
                    $.ajax({
                        type: 'POST',
                        url: 'rtrwKas.php?fx=simpan',
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

                $('#InputNil').inputmask('numeric', {
                    radixPoint: ',',
                    groupSeparator: '.',
                    digits: 2,
                    autoGroup: true,
                    rightAlign: true,
                    oncleared: function () { self.Value(''); }
                });
                    


             })
			 </script>";

        
		return "";
	}
	
}
?>
