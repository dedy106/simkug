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
class server_report_saku3_dash_rptDashTel extends server_report_basic
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

        $sqlBox = "select a.kode_neraca,a.kode_lokasi,b.nama,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
        from db_grafik_d a
        inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
        where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs' and a.kode_grafik='DB01'
        group by a.kode_neraca,a.kode_lokasi,b.nama
                  ";
        $rs = $dbLib->execute($sqlBox);
               
        
        $sqlBox2 = "select a.kode_grafik,a.nama,
        case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai,
        case format when 'Satuan' then isnull(b.gar,0) when 'Ribuan' then isnull(b.gar/1000,0) when 'Jutaan' then isnull(b.gar/1000000,0) end as gar  
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                        sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                            from db_grafik_d a
                            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs'
                            group by a.kode_grafik,a.kode_lokasi
                        )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
                  ";

        $rsb = $dbLib->execute($sqlBox2);


        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan      <div class='navbar-custom-menu pull-right padding:0px'>
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
        echo   "<div class='row'>";
        $i=1;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
    
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[0]."'>
                            <div class='inner'>
                                <center>
                                ";
                                while($rowkas = $rs->FetchNextObject($toupper=false)){
                                echo"
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($rowkas->nilai,0,",",".")."</h3>
                                    <p>$rowkas->nama</p>";
                                    
                                }
                                echo"
                                </center>
                            </div>
                            <div class='icon' style='padding-top:10px'><i class='fa ".$icon[0]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet','','$kode_lokasi|$periode|all|DB01|$kode_pp|$nik|Kas Bank|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";

        while ($row2 = $rsb->FetchNextObject($toupper=false)) {
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($row2->gar,0,",",".")."</h3>
                                    <p>Target</p>";
                                    if($row2->kode_grafik == "DB02"){
                                    echo"
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($row2->nilai,0,",",".")."</h3>
                                    <p>$row2->nama</p>
                                    ";
                                    }else if($row2->kode_grafik == "DB03"){
                                    echo"
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($row2->nilai,0,",",".")."</h3>
                                    <p>$row2->nama</p>
                                    ";
                                    }else if($row2->kode_grafik == "DB04"){
                                    echo"
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($row2->nilai,0,",",".")."</h3>
                                    <p>SHU</p>
                                    ";
                                    }
                                    echo"
                                </center>
                            </div>
                            <div class='icon' style='padding-top:10px'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet','','$kode_lokasi|$periode|all|$row2->kode_grafik|$kode_pp|$nik|$row2->nama|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }

        $sql = " select a.kode_rasio,a.kode_lokasi,a.kode_neraca,
        case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio,
        case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n2 else b.n2 end as gar
              from db_rasio_d a
              inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
              inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
              where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs' and c.kode_rasio='DB05'
              order by a.kode_rasio";

        $boxras = $dbLib->execute($sql);
        
        while ($row = $boxras->FetchNextObject(false)){
            $nil[] =(array)$row;
            $gar[] =(array)$row;
        }
        
        $dfr = array();
        $dfr2 = array();

        for($i=0; $i<count($nil); $i++){
            if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
                $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
            }

            $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
                'kode_neraca'=>$nil[$i]['kode_neraca'],
                'nilai2'=>$nil[$i]['nilai2']
            );
        }

        for($i=0; $i<count($gar); $i++){
            if(!ISSET($dfr2[$gar[$i]['kode_rasio']])){
                $dfr2[$gar[$i]['kode_rasio']] = array('nama_rasio' => $gar[$i]['nama_rasio'], 'rumus' => $gar[$i]['rumus'], 'par'=>array());
            }

            $dfr2[$gar[$i]['kode_rasio']]['par'][] = array(
                'kode_neraca'=>$gar[$i]['kode_neraca'],
                'gar'=>$gar[$i]['gar']
            );
        }

       
         echo  "<div class='col-md-15 col-md-3'>
                    <div class='small-box bg-aqua'>
                        <div class='inner'>
                            <center>";
                            
                            foreach($dfr2 as $d){
                                $p = '';
                                for($z=0; $z<count($d['par']); $z++){
                                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['gar']."<br>";
                
                                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['gar'];

                                   
                                }
                                $kode=$d['nama_rasio'];
                                echo"
                                
                                <h3 style='font-size:22px' id='home_kas_box'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                                <p>".$d['nama_rasio']." </p>";
                            }
                            foreach($dfr as $d){
                                $p = '';
                                for($z=0; $z<count($d['par']); $z++){
                                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";
                
                                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];

                                   
                                }
                                $kode=$d['nama_rasio'];
                                echo"
                                <h3 style='font-size:22px' id='home_kas_box'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                                <p>".$d['nama_rasio']." </p>";
                                
                            }
                            echo"
                            </center>
                        </div>
                        <div class='icon' style='padding-top:10px'><i class='fa fa-bank'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet','','$kode_lokasi|$periode|all|$kode|$kode_pp|$nik|OR');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                    </div>
                </div>";             
        

         echo"           
                </div>"; 

    echo   "<div class='row'>
                <div class='col-sm-12'><h4>Akademik</h4></div>
            </div>";
     
    echo   "<div class='row'>";
        
                $i=0;
                $icon = array('fa-user', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
                $sql = "select count(nis) as jumlah from sis_siswa where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
                $rs = $dbLib->execute($sql);
                $row = $rs->FetchNextObject(false);
                $jumlah=$row->jumlah;
                $sql2 = "select count(nis) as jumlah from sis_siswa where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1' ";
                $rs2 = $dbLib->execute($sql2);
                $row2 = $rs2->FetchNextObject(false);
                $jumlah2=$row2->jumlah;

                echo  "<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Total Siswa</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>".number_format($jumlah,0,",",".")."</h3>
                                    <p>Total Siswa Aktif</p>
                                    <h3 style='font-size:22px' id='home_kas_box'>".number_format($jumlah2,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-user' style='margin-top:10px'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTkDetail','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|all|Siswa');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";    
                    
                $sql = "select sum(nilai) as nilai from sis_bill_m where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."' ";
                $rs = $dbLib->execute($sql);
                $row = $rs->FetchNextObject(false);
                $nilai=$row->nilai;
                echo  "<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Tagihan</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>".number_format($nilai,0,",",".")."</h3>
                                    <p>&nbsp;</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>&nbsp;</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-calculator' style='margin-top:10px'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail1','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|all|Tagihan');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";  
        
                $sql = "select a.kode_lokasi,substring(a.periode,1,4) as periode,sum(a.nilai) as nilai 
                from sis_rekon_d a 
                where a.kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."' 
                group by a.kode_lokasi,substring(a.periode,1,4)";
        
                $rs = $dbLib->execute($sql);
                $row = $rs->FetchNextObject(false);
                $nilai=$row->nilai;
                echo  "<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-purple'>
                            <div class='inner'>
                                <center>
                                    <p>Pembayaran </p>
                                    <h3 id='home_kas_box' style='font-size:30px'>".number_format($nilai,0,",",".")."</h3>
                                    <p>&nbsp;tahun berjalan</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>&nbsp;</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card' style='margin-top:10px'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail1','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|all|Pbyr');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>"; 
                    
                $tahunLalu= intval(substr($periode,0,4))-1;
                $sql = "select a.kode_lokasi,substring(a.periode,1,4) as periode,sum(a.nilai) as nilai 
                from sis_rekon_d a 
                where a.kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".$tahunLalu."' 
                group by a.kode_lokasi,substring(a.periode,1,4)";
            
                $rs = $dbLib->execute($sql);
                $row = $rs->FetchNextObject(false);
                $nilai=$row->nilai;
                 echo  "<div class='col-md-15 col-md-3'>
                            <div class='small-box bg-purple'>
                                <div class='inner'>
                                    <center>
                                        <p>Pembayaran </p>
                                        <h3 id='home_kas_box' style='font-size:30px'>".number_format($nilai,0,",",".")."</h3>
                                        <p>&nbsp;tahun lalu</p>
                                        <h3 id='home_kas_box' style='font-size:30px'>&nbsp;</h3>
                                    </center>
                                </div>
                                <div class='icon'><i class='fa fa-credit-card' style='margin-top:10px'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail1','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|all|Pbyr2');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            </div>
                        </div>"; 
                
              
                $sql = "select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
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

                $rs = $dbLib->execute($sql);
                $row = $rs->FetchNextObject(false);
                $jumlah=$row->cr;
                echo  "<div class='col-md-15 col-md-3'>
                        <div class='small-box bg-aqua'>
                            <div class='inner'>
                                <center>
                                    <p>Collection rasio</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>".number_format($jumlah,2,",",".")."</h3>
                                    <p>&nbsp;</p>
                                    <h3 id='home_kas_box' style='font-size:30px'>&nbsp;</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-bank' style='margin-top:10px'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet','','$kode_lokasi|$periode|all|CR|$kode_pp|$nik|OR|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            </div>
                        </div>";
            echo"</div>";
        

         $sql = "select a.kode_grafik,a.nama,
         b.nilai as nilai,
         b.gar as gar,
         (b.nilai/b.gar)*100 as grow,
         (b.nilai/b.n5)*100 as youth
         from db_grafik_m a
         left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                         sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar,
                         sum(case when b.jenis_akun='Pendapatan' then -b.n5 else b.n5 end) as n5
                             from db_grafik_d a
                             inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                             where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs'
                             group by a.kode_grafik,a.kode_lokasi
                         )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
         where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'";
		$res = $dbLib->execute($sql);
				
		while ($row = $res->FetchNextObject(false)){
            // $series4[$row->nama] = floatval($row->nilai);
            ${"s4" . $row->nama} = round(floatval($row->grow),2);
            ${"s5" . $row->nama} = round(floatval($row->youth),2);
        }


        // GRAFIK PIE
        $sql= "select  case when substring(a.kode_tingkat,4,2) ='10' then 'a1'
        when substring(a.kode_tingkat,4,2) ='11' then 'a2' 
        when substring(a.kode_tingkat,4,2) ='12' then 'a3' 
        when substring(a.kode_tingkat,4,2) ='7' then 'a1' 
        when substring(a.kode_tingkat,4,2) ='8' then 'a2' 
        when substring(a.kode_tingkat,4,2) ='9' then 'a3'  
        end as kode_tingkat, a.total_bill, isnull(b.total_byr,0) as total_byr, a.total_bill-isnull(b.total_byr,0) as total_blm_byr 
        from (select b.kode_tingkat,a.kode_lokasi,sum(a.nilai) as total_bill 
              from sis_bill_d a 
              inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
              where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode' 
              group by b.kode_tingkat, a.kode_lokasi ) a 
        left join (  select c.kode_tingkat , a.kode_lokasi,sum(a.nilai) as total_byr 
                     from sis_rekon_d a 
                     inner join sis_siswa b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                     inner join sis_kelas c on b.kode_kelas=c.kode_kelas and b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi
                     where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.periode='$periode' 
        group by c.kode_tingkat, a.kode_lokasi ) b on a.kode_tingkat=b.kode_tingkat and a.kode_lokasi=b.kode_lokasi 
        order by substring(a.kode_tingkat,4,2) ";

        // echo $sql;

        $resByr = $dbLib->execute($sql);
        while ($row = $resByr->FetchNextObject(false)){
            $series[$row->kode_tingkat][] = array(
                                    "name"=>$row->kode_tingkat, 
                                    "data"=>array(
                                        array('Bayar',floatval($row->total_byr)),
                                        array('Belum Byr',floatval($row->total_blm_byr))
                                    )
                                );
            $categories = array ('Total Bayar', 'Total Belum Bayar') ;
        }             

        //GRAFIK KOMBINASI

        $fields = ['BILL', 'BYR'];

        for($s=0; $s<count($fields); $s++){
            $field = $fields[$s];

            $sql="
            select a.kode,
                sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.nilai  else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.nilai  else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.nilai  else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.nilai  else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.nilai  else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.nilai  else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.nilai  else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.nilai  else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) n11,
                sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) n12	   
            from (
                select 'BILL' as kode, sum(nilai) as nilai, kode_lokasi, periode, kode_pp
                from sis_bill_d
                where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'
				group by kode_lokasi,periode,kode_pp
                union

                select 'BYR' as kode, sum(nilai) as nilai, kode_lokasi, periode, kode_pp
                from sis_rekon_d
                where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' 
				group by kode_lokasi,periode,kode_pp
            ) a
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.kode='$field'
            group by a.kode
            ";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
   
            $resPiu = $dbLib->execute($sql);
            while ($row = $resPiu->FetchNextObject(false)){
         
                             $n1=$row->n1;
                             $n2=$row->n2;
                             $n3=$row->n3;
                             $n4=$row->n4;
                             $n5=$row->n5;
                             $n6=$row->n6;
                             $n7=$row->n7;
                             $n8=$row->n8;
                             $n9=$row->n9;
                             $n10=$row->n10;
                             $n11=$row->n11;
                             $n12=$row->n12;
         
                             
            }
         
            $Piu[$s] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                             round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                             round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                             round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            
        }   
        
        
        $no=1;
        for($n=0;$n<=11;$n++){
            
            ${"nr" . $no}= ($Piu[1][$n]/$Piu[0][$n])*100;
            $no++;

        }

        $Piu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
        round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
        round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
        round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
        );
            
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-4'>
                        <div class='box box-primary'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i> <h3 class='box-title'>Growth Pendapatan</h3>
                            </div>
                            <div class='box-body pad'>
                                <div id='home_rev_chart4'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-info'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'> </i>
                                <h3 class='box-title'>Growth Beban</h3>
                            </div>
                            <div class='box-body pad'>
                                <div id='home_rev_chart5'> </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'></i>
                                <h3 class='box-title'>Growth SHU</h3>
                            </div>
                            <div class='box-body pad'>
                                <div id='home_rev_chart6'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-4'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang Kelas 1</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-info'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang Kelas 2</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr2'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang Kelas 3</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr3'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang</h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_bill'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";

            echo "<aside class='control-sidebar control-sidebar-dark' style='margin-top:40px;padding-bottom:500px;padding-top:20px;background: #ccc;'>
            <div class='tab-content'>
                <div class='tab-pane active' id='control-sidebar-home-tab'>
                    <select class='form-control input-sm' id='dash_lok' style='margin-bottom:5px;'>
                        <option value=''>Pilih Sekolah</option>";
                        $resLok = $dbLib->execute("select a.kode_pp,a.nama
                        from pp a
                        inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and b.nik='$nik' ");

                        while ($row = $resLok->FetchNextObject(false)){
                            if($row->kode_pp == $kode_pp){
                                $selected = "selected";
                            }else{
                                $selected = "";
                            }
                            echo " <option value=".$row->kode_pp." $selected>".$row->kode_pp."-".$row->nama." </option>";
                        }
                        
                echo"
                    </select>
                    <select class='form-control input-sm' id='dash_periode' style='margin-bottom:5px;'>
                        <option value=''>Pilih Periode</option>";
                        $resPer = $dbLib->execute("select distinct periode from periode where kode_lokasi='$kode_lokasi' order by periode desc");

                        while ($row = $resPer->FetchNextObject(false)){
                            if($row->periode == $periode){
                                $selected = "selected";
                            }else{
                                $selected = "";
                            }
                            echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                        }
                        
                echo"
                    </select>
                    <a class='btn btn-sm btn-default pull-right' id='dash_refresh' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                </div>
            </div>
            </aside>";

        echo"</div>
            </div>
        </div>";

                		
		echo "
        <script type='text/javascript'>

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
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTel','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
            }else{
                if(kode_pp == '' && periode != '' ){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTel','','$kode_lokasi/'+periode+'/$kode_pp/$nik/$kode_fs');  
                }else if(kode_pp != '' && periode == ''){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTel','','$kode_lokasi/$periode/'+kode_pp+'/$nik/$kode_fs');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTel','','$kode_lokasi/'+periode+'/'+kode_pp+'/$nik/$kode_fs');
                }
            } 
           
        });

        Highcharts.chart('home_rev_chart4', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5Pendapatan)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#DF5353' // red
                },{
                    from: 80,
                    to: 100,
                    color: '#55BF3B' // green
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Pendapatan',
                data: [".json_encode($s4Pendapatan)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });

        Highcharts.chart('home_rev_chart5', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5Beban)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#55BF3B' // green
                },{
                    from: 80,
                    to: 100,
                    color: '#DF5353' // red
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Beban',
                data: [".json_encode($s4Beban)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });
        
        Highcharts.chart('home_rev_chart6', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: 60 + '%'
            },
            title:{
                text:''
            },
            subtitle: {
                text: 'YoY Growth : ".json_encode($s5SHU)."%',
                floating: true,
                align: 'center',
                verticalAlign: 'bottom',
                
            },
            exporting: { 
                enabled: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 79,
                    color: '#DF5353' // red
                },{
                    from: 80,
                    to: 100,
                    color: '#55BF3B' // green
                }]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'SHU',
                data: [".json_encode($s4SHU)."],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        
        });

        var options = {
            chart: {
                renderTo: 'dash_main_chart_billbyr',
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title:{
                text:''
            },
            colors:['#e15239','#f8c169','#185fad'],
            exporting: { 
                enabled: false
            },
            series: [],
            xAxis: {
                title: {
                    text: null
                },
                categories: [],
            },
            yAxis:{
                title: {
                    text:null
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

        options.series = ".json_encode($series["a1"]).";
        options.xAxis.categories =".json_encode($categories).";

        options.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true
                },
                size: 150,
                depth: 35,
                showInLegend: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/blj/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);

        var options2 = {
            chart: {
                renderTo: 'dash_main_chart_billbyr2',
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            colors:['#2b93e1','#264ca4','#92cfe2'],
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [],
            xAxis: {
                title: {
                    text: null
                },
                categories: [],
            },
            yAxis:{
                title: {
                    text:null
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

        options2.series = ".json_encode($series["a2"]).";
        options2.xAxis.categories =".json_encode($categories).";

        options2.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true
                },
                depth: 35,
                size: 150,
                showInLegend: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/blj/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options2);
        
        var options3 = {
            chart: {
                renderTo: 'dash_main_chart_billbyr3',
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            colors:['#94b7e7','#ff8585','#fff2a7'],
            series: [],
            xAxis: {
                title: {
                    text: null
                },
                categories: [],
            },
            yAxis:{
                title: {
                    text:null
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

        options3.series = ".json_encode($series["a3"]).";
        options3.xAxis.categories =".json_encode($categories).";

        options3.plotOptions = {
            pie: {
                dataLabels: {
                    enabled: true
                },
                depth: 35,
                size: 150,
                showInLegend: true,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/blj/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options3);


        Highcharts.chart('dash_main_chart_bill', {
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: 'Rp.{value}',
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
            }, { // Secondary yAxis
                title: {
                    text: 'Rasio',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
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
                type: 'column',
                name: 'Bill',
                data: ".json_encode($Piu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valuePrefix: 'Rp '
                }
            }, {
                type: 'column',
                name: 'Bayar',
                color:'#ff6f69',
                data: ".json_encode($Piu[1]).",
                tooltip: {
                    valuePrefix: 'Rp '
                }
            },{
                type: 'spline',
                name: 'Collection Rasio',
                data: ".json_encode($Piu[2]).",
                yAxis:1,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                },
                tooltip: {
                    valueSuffix: ' %'
                }
            
            }]
        });

        </script>";

		return "";
	}
	
}
?>
