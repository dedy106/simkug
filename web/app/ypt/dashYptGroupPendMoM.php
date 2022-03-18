<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
    body {
        font-family: 'Roboto', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: 'Roboto', sans-serif !important;
        font-weight: normal !important;
    }
    .judul-box{
        font-weight:bold;
        font-size:18px !important;
    }
    .inner{
        padding:5px !important;
    }

    .box-nil{
        margin-bottom: 20px !important;
    }
    text {
        text-decoration: none !important;
    }
    .highcharts-button-box+text {
        fill: white !important;
    }
    
</style>
<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $fmain=$_SESSION['fMain'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];

    $kode_fs="FS1";
    $res = execute("select max(periode) as periode from periode");

    $periode = $res->fields[0];
    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;
    
    $bln=substr($periode,5,2);
    $bulan=getNamaBulan($bln);
    $bulan_rev=getNamaBulan($bln-1);

    $tmp=explode("|",$_GET['param']);
    if($tmp[0] != ''){
        $periode=$tmp[0];
        $param="&param=$periode";
    }

    // switch($box){
    //     case "pend" :
    //     $judul = "Pendapatan";
    //     break;
    // }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYptGroupMoM.php$param";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYptGroupMoM.php$param' class='small-box-footer btn btn-default btn-sm' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="background:#ecf0f5";
        $mobile=false;
    }

    //SQL Pendapatan
    $sqlbox1 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1,
    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
    from exs_neraca a
    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T'
    order by rowindex ";

    $rsAcvp = execute($sqlbox1);
    $rowAcvp = $rsAcvp->FetchNextObject($toupper);
    $persenAcvp = ($rowAcvp->n6/$rowAcvp->n7)*100;
    $persenMoMp = (($rowAcvp->n6/$rowAcvp->n9)-1)*100;
    
    // echo $sqlbox1;

    //MoM Growth List

    $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, ((a.n6/a.n9)-1)*100 as rasio
    from (select c.kode_bidang,c.nama, 
    sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
    sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
    sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
    from exs_neraca_pp a
    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
    inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T' and a.n9 <> 0
    group by c.kode_bidang,c.nama ) a
    union all
    select a.kode_lokasi,a.skode as nama, b.n7,b.n6,((b.n6/b.n9)-1)*100 as rasio 
    from lokasi a
    left join ( select a.kode_lokasi, 
    sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
    sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
    sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
    from exs_neraca a
    where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n9 <> 0
    group by a.kode_lokasi
    ) b on a.kode_lokasi=b.kode_lokasi
    where b.n9 <> 0";

    $rsMoM= execute($sql);


?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
    <?=$back1?>
        <div class="col-md-6">
            <h3 style="font-size: 30px;margin-top: 0px;margin-bottom: 0px;">KOMPOSISI PENDAPATAN</h3>
            <h4 style="font-size: 30px;margin-top: 0px;">Periode <?= $bulan." ".$tahun ?></h4>
        </div>
        <div class="col-md-3">
            <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius: 10px;">
                <div class="inner" style="padding-top: 0px;padding: 0px 10px 10px 10px !important;">
                    <p class="judul-box" style="text-align:left;font-size: 25px !important;margin-top: 0px;font-weight: normal;margin-bottom: 0px;"> Achivement </p>
                    <h3 id="home_kas_box" style="font-size:35px;margin-bottom:0px"><?= number_format($persenAcvp,2,",",".") ?> %</h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Pendapatan</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius: 10px;">
                <div class="inner" style="padding-top: 0px;padding: 0px 10px 10px 10px !important;">
                    <p class="judul-box" style="text-align:left;font-size: 25px !important;margin-top: 0px;font-weight: normal;margin-bottom: 0px;"> MoM Growth </p>
                    <h3 id="home_kas_box" style="font-size:35px;margin-bottom:0px"><?= number_format($persenMoMp,2,",",".") ?> %</h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Pendapatan</p>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="box" style="box-shadow:none;border:0">
                <div class="box-header">
                    
                    <h3 class="box-title" style="font-weight: bold !important;">Achivement (%)</h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:left">Unit Bisnis</p>
                </div>
                <div class="box-body box-click">
                    <div id="dash_chart_acv"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                <div class="inner" style="padding: 10px !important;">
                    <h3 style="text-align:left;font-weight: bold !important;font-size: 18px;margin-bottom: 0px;"> MoM Growth (%) </h3>
                    <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:left">Unit Bisnis</p>
                    <div class='table-responsive'>
                        <table class='table no-border'>
                            <?php while($row = $rsMoM->FetchNextObject(false)) : ?>
                                <tr>
                                    <td><?= $row->nama; ?></td>
                                    <td class='text-right'><?= number_format($row->rasio,2,",","."); ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div align='center'>
		    <table class='table no-border'>
            <tr>
                <td align='center'  > 
                    <table class='table no-border' >
                    <style>
                        /* .isi-td{
                            border:1px solid black !important
                        } */
                    </style>
                        <tr bgcolor='#dd4b39' style='color:white'>
                            <td width='400' rowspan='2' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;vertical-align:middle'>P&amp;L ITEMS (in Rp.Bn)</td>
                            <td width='90' rowspan='2' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;vertical-align:middle'>Actual <?= $bulan." ".$tahun ?> </td>
                            <td colspan='4' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'><?= $bulan." ".$tahun ?></td>
                        </tr>
                        <tr bgcolor='#dd4b39' style='color:white'>
                            <td width='90' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Budget</td>
                            <td width='90' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Actual</td>
                            <td width='60' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white;border-right:1px solid white;'>Ach.</td>
                            <td width='60' align='center' class='header_laporan isi-td' style='border-bottom:1px solid white'>MoM Growth</td>
                        </tr>
        <?php
                        $sql="select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
                                case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
                                case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
                                case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
                                case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
                        from exs_neraca a
                        where modul='L' and kode_lokasi='20' and kode_fs='FS1' and periode='$periode'  and kode_neraca='57T'
                        order by rowindex";
                        $rs1 = execute($sql);
                        $p1=0;$p2=0;$p3=0;$p4=0;$p5=0;$p6=0;$p7=0;$p8=0;$p9=0; 
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $p1=$row1->n1; $p2=$row1->n7; $p3=$row1->n3; $p4=$row1->n6; $p5=$row1->n9; $p6=$row1->n6;
                            $p7=$row1->n7; $p8=$row1->n8; $p9=$row1->n9; 
                            $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                            if ($row1->n7!=0)
                            {
                                $persen1=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen7=(($row1->n6/$row1->n9)-1)*100;
                            }
                            if ($row1->n7!=0)
                            {
                                $persen3=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen6=(($row1->n6/$row1->n9)-1)*100;
                            }
                            echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'>PENDAPATAN OPERASIONAL</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                </tr>";
                        }
                        $sql="select c.kode_bidang,c.nama,
                                sum(case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end) as n1,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end) as n7,
                                sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
                        from exs_neraca_pp a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
                        where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5') 
                        group by c.kode_bidang,c.nama
                        order by c.kode_bidang";
                        $rs1 = execute($sql);
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                            if ($row1->n7!=0)
                            {
                                $persen1=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen7=(($row1->n6/$row1->n9)-1)*100;
                            }
                            if ($row1->n7!=0)
                            {
                                $persen3=($row1->n6/$row1->n7)*100;
                            }
                            if ($row1->n9!=0)
                            {
                                $persen6=(($row1->n6/$row1->n9)-1)*100;
                            }
                            echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'>Pendapatan $row1->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row1->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                </tr>";
                          
                            $sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
                                case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1,
                                case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                                case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                                case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                        from exs_neraca_pp a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang='$row1->kode_bidang'
                        order by a.rowindex";
                            
                            $rs2 = execute($sql);
                            while ($row2 = $rs2->FetchNextObject($toupper=false))
                            {
                                $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                                if ($row2->n7!=0)
                                {
                                    $persen1=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen7=(($row2->n6/$row2->n9)-1)*100;
                                }
                                if ($row2->n7!=0)
                                {
                                    $persen3=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen6=(($row2->n6/$row2->n9)-1)*100;
                                }
                                
                                echo "<tr>
                                <td class='isi_laporan isi-td'> &nbsp;&nbsp;&nbsp;$row2->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                
                            </tr>";
                            }
                        }
                    
                    
                    $sql="select a.kode_neraca,a.kode_fs,a.kode_lokasi,b.nama,a.tipe,a.level_spasi,
                                case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                                case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                                case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                                case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
                        from exs_neraca a
                        inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi in ('03','08','11','13','14','15') and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T'
                        order by a.kode_lokasi desc";
                    
                    $rs2 = execute($sql);
                    while ($row2 = $rs2->FetchNextObject($toupper=false))
                    {
                        $persen1=0;$persen7=0;$persen3=0;$persen6=0;
                        if ($row2->n7!=0)
                                {
                                    $persen1=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen7=(($row2->n6/$row2->n9)-1)*100;
                                }
                                if ($row2->n7!=0)
                                {
                                    $persen3=($row2->n6/$row2->n7)*100;
                                }
                                if ($row2->n9!=0)
                                {
                                    $persen6=(($row2->n6/$row2->n9)-1)*100;
                                }
                        echo "<tr bgcolor='#dd4b39' style='color:white'>
                                <td class='header_laporan isi-td'> Pendapatan $row2->nama</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n9,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n7,0,',','.')."</td>
                                <td class='isi_laporan isi-td' align='right'>".number_format($row2->n6,0,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen3,2,',','.')."</td>
                                <td class='isi_laporan isi-td' class='text-center'>".number_format($persen6,2,',','.')."</td>
                                
                                
                            </tr>";
                    }
                    echo " </table>";
		echo "</td></tr>";
		echo "</table>";
        ?>
        </div>
        <aside class='control-sidebar control-sidebar-dark' style='padding-bottom:500px;'>
            <div class='tab-content'>
                <div class='tab-pane active' id='control-sidebar-home-tab'>
                    <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                    <option value=''>Pilih Periode</option>
                    <?php
                    $resPer = execute("select distinct periode from exs_neraca where kode_lokasi='$kode_lokasi' order by periode desc");
                    
                    while ($row = $resPer->FetchNextObject(false)){
                        if($row->periode==$periode){
                            $selected="selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                    }
                    ?>
                    </select>
                    <a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                </div>
            </div>
        </aside>
    </div>
</div> 
 
<?php

			

//SQL Acv 
$sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
from (select c.kode_bidang,c.nama, 
sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
from exs_neraca_pp a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T'
group by c.kode_bidang,c.nama ) a
union all
select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
from lokasi a
left join ( select a.kode_lokasi, 
sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
sum(case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end) as n9
from exs_neraca a
where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15')
group by a.kode_lokasi
) b on a.kode_lokasi=b.kode_lokasi
where b.n7 > 0";

$rsPend = execute($sql);

while($row = $rsPend->FetchNextObject(false)){
    
    $pend[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
    
}  

$sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end as n7, 
case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
from exs_neraca_pp a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5')
) a
where a.n7 <> 0
order by a.kode_lokasi
";
$rsDrilP = execute($sql);

$grouping = array();
while($row = $rsDrilP->FetchNextObject(false)){
    
    if (!isset($grouping[$row->kode_lokasi])){
        $tmp["data"][]="";
        $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
    }
    $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
    $grouping[$row->kode_lokasi] = $tmp;
}  
$result["series"] = $grouping;

$result["grouping"] = array($result["series"]["1"],$result["series"]["2"],$result["series"]["3"],$result["series"]["4"],$result["series"]["5"]);


?>
<script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>
    <script type='text/javascript'>
    $('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
        var per = $('#dash_periode').val();
        
        window.location.href='<?=$fmain?>?hal=app/ypt/dashYptGroupPendMoM.php&param='+per;
        
        
    });
       
    // Create the chart
    Highcharts.chart('dash_chart_acv', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Click the slices to view detail.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Pendapatan",
                colorByPoint: true,
                data: <?php echo json_encode($pend); ?>
                
            }
        ],
        drilldown: {
            series: <?php echo json_encode($result["grouping"])?>,
            drillUpButton :{
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: '#dd4b39',
                    'stroke-width': 1,
                    stroke: '#dd4b39',
                    r: 3,
                    states: {
                        hover: {
                            fill: '#dd4b39e8'
                        },
                        select: {
                            stroke: '#dd4b39',
                            fill: '#dd4b39e8'
                        }
                    }
                }
            }

        }
    });
</script>
