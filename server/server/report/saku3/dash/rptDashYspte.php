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
class server_report_saku3_dash_rptDashYspte extends server_report_basic
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
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);

        //SQL TOTAL BALANCE
        $sql1a = "select sum(so_akhir) as nilai
        from db_grafik_d a
        inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
        inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
        inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
        inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
        where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0
        ";
        $rs1a=$dbLib->execute($sql1a);
        $nil1a=$rs1a->fields[0];

        //SQL PBYR PIUTANG

        if($tmp[5] == ""){
            $kode_per = $periode;
        }else{
            $kode_per = $tmp[5];
        }

        
        $sql2a="select a.total_bill, isnull(b.total_byr,0) as total_byr,isnull(b.total_byr,0)/a.total_bill as per
        from (select a.kode_pp,a.kode_lokasi,sum(a.nilai) as total_bill 
              from sis_bill_d a 
              where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$kode_per'
              group by a.kode_pp, a.kode_lokasi ) a 
        left join (  select a.kode_pp , a.kode_lokasi,sum(a.nilai) as total_byr 
                     from sis_rekon_d a 
                     where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$kode_per'
        group by a.kode_pp, a.kode_lokasi ) b on a.kode_pp=a.kode_pp and a.kode_lokasi=b.kode_lokasi ";

        $res2a=$dbLib->execute($sql2a);
        $tobil=$res2a->fields[0];
        $tobyr=$res2a->fields[1];
        $persen=round($res2a->fields[2],2)*100;


        //SQL RRA

        $sql3a = "select count(*) as jum,sum(a.nilai) as nilai
        from rra_pdrk_d a
        inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
        where b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.dc='D'
        --and b.periode='$periode' and b.modul='MULTI' 
                ";
        $sql3b = "select count(*) as jum,sum(a.nilai) as nilai
        from rra_pdrk_d a
        inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
        where b.progress in ('1')  and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.dc='D' --and b.periode='$periode' and b.modul='MULTI' ";

        $resb1=$dbLib->execute($sql3a);
        $resb2=$dbLib->execute($sql3b);
        $aju=$resb1->fields[0];
        $app=$resb2->fields[0];
        $blapp=$resb1->fields[0]-$resb2->fields[0];
        $persen1=100;
        $persen2=round($app/$aju)*100;
        $persen3=round($blapp/$aju)*100;

        //SQL TUNGGAKAN TERBANYAK

        $sql4a="select top 5 a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
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


        //SQL JUMLAH SISWA NUNGGAK

        $sqljs = "select count(a.nis) as jum	from(
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
    
        $sqljsb = "select count(a.nis) as jum	
        from sis_siswa a
        where a.flag_aktif = '1' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' ";
    
        $rssisa =$dbLib->execute($sqljs); // jumlah menunggak
        $rssisb =$dbLib->execute($sqljsb); // jumlah siswa total
        $nilsis =round($rssisa->fields[0]/$rssisb->fields[0],2)*100; //persentase siswa menunggak
    
        //SQL COLLECTION 
    
        // $sqlcol = "select a.total_bill, isnull(b.total_byr,0) as total_byr,(isnull(b.total_byr,0)/a.total_bill)*100 as rasio
        // from (select a.kode_pp,a.kode_lokasi,sum(a.nilai) as total_bill 
        //       from sis_bill_d a 
        //       where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
        //       group by a.kode_pp, a.kode_lokasi ) a 
        // left join (  select a.kode_pp , a.kode_lokasi,sum(a.nilai) as total_byr 
        //              from sis_rekon_d a 
        //              where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'
        // group by a.kode_pp, a.kode_lokasi ) b on a.kode_pp=a.kode_pp and a.kode_lokasi=b.kode_lokasi  ";
        $sqlcol="select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
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
        group by kode_lokasi,kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        ";
        $rscol =$dbLib->execute($sqlcol); 
    
        $nilcol = $rscol->fields[2]; //collection rasio
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard<div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                        <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                        <i class='fa fa-bell-o'></i>
                        <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                        </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
               
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                    echo"
                        <li>
                            <ul class='menu'>
                            <li>
                                <a href='#'>
                                <i class='fa fa-users text-aqua'></i> $row->pesan
                                </a>
                            </li>
                            </ul>
                        </li>
                        ";
                    }
                
                echo"
                        <li class='footer'><a href='#'>View all</a></li>
                        </ul>    
                    </li>
                    ";
        
                echo"
                    <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </li>
                    <li>
                        <a href='#' data-toggle='control-sidebar' id='open-sidebar' class='btn btn-info btn-sm' style='margin-right:0px;padding:2px 5px 0px 5px'><i class='fa fa-filter'></i><span style='font-family:sans-serif'> <b> Filter</b></span></a>
                    </li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-8'>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:0'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Profit and Loss</h3>
                                    </div>
                                    <div class='box-body box-click' id='box-keu'>
                                        <div id='dash_chart_keu'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px;'>
                                    <div class='inner'>
                                        <center>
                                        <p>Today's Bank Balance</p>
                                        <h3 id='home_kas_box' style='font-size:25px'>".number_format($nil1a,0,",",".")."</h3>
                                        <p style='font-size: 11px;margin-bottom: 0px;'>Closing Balance</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:1px solid #dd4b39;border-radius:10px;'>
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
                                        
                                        echo"
                                        <select class='form-control input-sm selectize' id='dash-per' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                        <option value=''>Pilih Periode</option> ";
                                        $AddOnLib=new server_util_AddOnLib();
                                        echo " <option value=".$kode_per." selected>".$AddOnLib->ubah_periode($kode_per)."</option>";
                                        
                                        $res = $dbLib->execute("select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' order by periode desc");

                                        
                                        while ($row = $res->FetchNextObject(false)){
                                            echo " <option value=".$row->periode." >".$AddOnLib->ubah_periode($row->periode)."</option>";
                                        }
                                        
                                        echo" </select>";
                                        
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
                            </div>
                            <div class='col-md-3'>
                                <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                                    <div class='inner'>
                                        <center>
                                            <p>Jumlah Siswa <br>Menunggak</p>
                                            <h3 id='home_kas_box' style='font-size:25px'>".number_format($nilsis,2,",",".")."%</h3>
                                            <p style='font-size: 11px;margin-bottom: 0px;'>".$rssisa->fields[0]." dari ".$rssisb->fields[0]." siswa</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-3'>
                                <div class='small-box bg-red' style='border:1px solid #dd4b39;color:black !important;background-color:white !important;border-radius:10px'>
                                    <div class='inner'>
                                        <center>
                                        <p>Collection<br>Ratio</p>
                                        <h3 id='home_kas_box' style='font-size:25px'>".number_format($nilcol,1,",",".")."%</h3>
                                        <p style='font-size: 11px;margin-bottom: 0px;'>&nbsp;</p>
                                        </center>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div class='row'>
                            <div class='col-md-6'>
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
                            <div class='col-md-6'>
                                <div class='box' style='box-shadow:none;border:1px solid #dd4b39;border-radius:10px'>
                                    <div class='box-header'>
                                        <i class='fa fa-bar-chart'></i>
                                        <h3 class='box-title'>Tunggakan Terbanyak</h3>
                                    </div>
                                    <div class='box-body box-click'>
                                        <div ><table class='table no-border'>";
                                        $rster = $dbLib->execute($sql4a);
                                        while($row = $rster->FetchNextObject($toupper=false)){
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
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'> </i>
                                <h3 class='box-title'>Today's Cash & Bank Balance</h3>
                            </div>
                            <div class='box-body pad'>
                                <table class='table no-border'>";
                                
                                $res = $dbLib->execute("select c.kode_akun,d.nama,so_akhir,e.format
                                from db_grafik_d a
                                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                                inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0
                                order by c.kode_akun
                                ");
                                while($row=$res->FetchNextObject($toupper)){
                                    echo"
                                    <tr>
                                        <td>$row->nama</td>
                                        <td>".number_format($row->so_akhir,0,",",".")."</td>
                                    </tr>";
                                }
                                echo"
                                </table>
                            </div>
                        </div>
                        <br>
                        ";
                        echo"
                        <div class='box' style='box-shadow:none;border: 1px solid #dd4b39;
                            border-radius: 10px;'>
                                <div class='box-header'>
                                    <i class='fa fa-line-chart'> </i>
                                    <h3 class='box-title'>RRA</h3>
                                </div>
                                <div class='box-body pad'>";
                                    
                                    $res = $dbLib->execute("select a.no_pdrk,a.keterangan,a.progress, case a.progress when '0' then 'Pengajua' when '1' then 'Approve' when 'X' then 'Reject' end as status from rra_pdrk_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.progress in ('0','1','X')
                                    order by a.no_pdrk desc
                                    ");
                                    while($row=$res->FetchNextObject($toupper)){
                                        if($row->progress == '0'){
                                            $color="color:blue";
                                        }else if($row->progress == '1'){
                                            $color="color:green";
                                        }else{
                                            $color="color:red";
                                        }
                                        echo"
                                        <div class='box-footer box-comments' style='background:white'>
                                            <div class='box-comment'>
                                                <div class='comment-text' style='margin-left: 0px;padding-left: 0px;'>
                                                    <div class='col-xs-9' style='padding-left: 0px;padding-right:0px'>
                                                        $row->no_pdrk | $row->keterangan
                                                    </div>
                                                    <div class='col-xs-3' style='padding-right: 0px;text-align:center'>
                                                        <span style='$color'>$row->status</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>";
                                    }
                                    echo"
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>";

        //SQL PROFIT & LOSS

        $sqlPen = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
        $pembagi=1000000;

        $resPen = $dbLib->execute($sqlPen);
        while ($row = $resPen->FetchNextObject(false)){
            
            $n1=$row->n1/$pembagi;
            $n2=$row->n2/$pembagi;
            $n3=$row->n3/$pembagi;
            $n4=$row->n4/$pembagi;
            $n5=$row->n5/$pembagi;
            $n6=$row->n6/$pembagi;
            $n7=$row->n7/$pembagi;
            $n8=$row->n8/$pembagi;
            $n9=$row->n9/$pembagi;
            $n10=$row->n10/$pembagi;
            $n11=$row->n11/$pembagi;
            $n12=$row->n12/$pembagi;
            
            
        }

        $Keu[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
        round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
        round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
        round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        $sqlBeb = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resBeb = $dbLib->execute($sqlBeb);
        while ($row = $resBeb->FetchNextObject(false)){
            
            $n1=$row->n1/$pembagi;
            $n2=$row->n2/$pembagi;
            $n3=$row->n3/$pembagi;
            $n4=$row->n4/$pembagi;
            $n5=$row->n5/$pembagi;
            $n6=$row->n6/$pembagi;
            $n7=$row->n7/$pembagi;
            $n8=$row->n8/$pembagi;
            $n9=$row->n9/$pembagi;
            $n10=$row->n10/$pembagi;
            $n11=$row->n11/$pembagi;
            $n12=$row->n12/$pembagi;
        }

        $Keu[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
        round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
        round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
        round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        $no=1;
        for($n=0;$n<=11;$n++){
            
            ${"nr" . $no}= $Keu[0][$n]-$Keu[1][$n];
            $no++;
            
        }

        $Keu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
        round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
        round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
        round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
        );

        //SQL UMUR PIUTANG
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

        $resUmur = $dbLib->execute($sql);
        $row = $resUmur->FetchNextObject(false);
        
        $n1=$row->n1/1000000;
        $n2=$row->n2/1000000;
        $n3=$row->n3/1000000;
        $n4=$row->n4/1000000;

        $Umur[0] = array(round(floatval($n1),2), round(floatval($n2),2), round(floatval($n3),2), 
                        round(floatval($n4),2));

        echo 
        "<script>

        // //PROFIT && LOSS
        Highcharts.chart('dash_chart_keu', {
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} jt',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Nilai',
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
            tooltip: {
                shared: true
            },
            series: [{
                type: 'line',
                name: 'Income',
                data: ".json_encode($Keu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: ' jt'
                }
            }, {
                type: 'line',
                name: 'Expense',
                color:'#ff6f69',
                data: ".json_encode($Keu[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            },{
                type: 'line',
                name: 'Net Income',
                color:'#fa9c0a',
                data: ".json_encode($Keu[2]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });

        //UMUR PIUTANG
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

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('click', '#open-sidebar', function(){
            
            if($('aside').hasClass('control-sidebar-open')){
                 $('aside').removeClass('control-sidebar-open');
            }else{
                 $('aside').addClass('control-sidebar-open');
            }
        });


        $('#control-sidebar-home-tab').on('click','#dash_refresh', function(){
            var kode_pp = $('#dash_lok').val();
            var periode = $('#dash_periode').val();
            // alert(lokasi);
            if (kode_pp == '' && periode ==''){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
            }else{
                if(kode_pp == '' && periode != '' ){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/'+periode+'/$kode_pp/$nik/$kode_fs');  
                }else if(kode_pp != '' && periode == ''){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/$periode/'+kode_pp+'/$nik/$kode_fs');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/'+periode+'/'+kode_pp+'/$nik/$kode_fs');
                }
            } 
           
        });

        $('#dash-per').change(function(){
            var per =$('#dash-per').val();
            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/'+per);
        });

        </script>";
    
		return "";
	}
	
}
?>
