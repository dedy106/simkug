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
class server_report_saku3_dash_rptDashYptV3 extends server_report_basic
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

        if($kode_fs == ""){
            $kode_fs="FS1";
        }

        // echo $kode_fs;
        // KEUANGAN
        $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi 
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
                  ";

     
        $rs = $dbLib->execute($sqlBox);  

        // PEMBENDAHARAAN
        $sqla1 = "select count(*) as jum,sum(a.nilai) as nilai
                from it_aju_m a
                where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode='$periode'  and a.progress in ('0','R')
                ";
        $sqla2 = "select count(*) as jum,sum(b.nilai) as nilai
                from ver_m a
                inner join it_aju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress='1'
                ";
        $sqla3 = "select count(*) as jum,sum(b.nilai) as nilai
                from fiat_m a
                inner join it_aju_m b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.periode='$periode' and b.progress='2'
                ";
        $sqla4 = "select count(a.no_spb) as jum,sum(a.nilai) as nilai from (select distinct a.*
                from it_spb_m a
                inner join it_aju_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' and b.progress='S'
                ) a ";
        $sqla5 = "select count(*) as jum,sum(a.nilai) as nilai from (select distinct a.*
                from kas_m a 
                inner join it_aju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_pp='$kode_pp' and b.progress='3'
                ) a
                ";
        $rsa0=$dbLib->execute($sqla1);
        $rsa1=$dbLib->execute($sqla2);
        $rsa2=$dbLib->execute($sqla3);
        $rsa3=$dbLib->execute($sqla4);
        $rsa4=$dbLib->execute($sqla5);
        
        // RRA ANGGARAN
        $sqlb1 = "select count(*) as jum,sum(a.nilai) as nilai
        from rra_pdrk_d a
        inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
        where b.modul='MULTI' and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and b.periode='$periode' and a.dc='D'
                ";
        $sqlb2 = "select count(*) as jum,sum(a.nilai) as nilai
        from rra_pdrk_d a
        inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
        where b.progress in ('1') and b.modul='MULTI' and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and b.periode='$periode' and a.dc='D' ";

        //ANGGARAN
                
        $sqlb4 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'
                ";
        $sqlb3 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'
                ";
        $sqlb5 = "select jum,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai2 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as nilai,count(*) as jum
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB12') and a.kode_lokasi='$kode_lokasi'
                ";
        $rsb0=$dbLib->execute($sqlb1);
        $rsb1=$dbLib->execute($sqlb2);
        $rsb2=$dbLib->execute($sqlb3);
        $rsb3=$dbLib->execute($sqlb4);
        $rsb4=$dbLib->execute($sqlb5);

        // PERJALANAN DINAS
        $sqlpd1 = "select count(*) as jum,sum(a.nilai) as nilai
        from tu_pdaju_m a
        where a.progress in ('R','0') and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode='$periode'
        ";

        $sqlpd2 = "select count(*) as jum,sum(b.nilai) as nilai
        from tu_pdapp_m a
        inner join tu_pdaju_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
        where b.progress in ('1') and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and b.periode='$periode' ";

        $rspd0=$dbLib->execute($sqlpd1);
        $rspd1=$dbLib->execute($sqlpd2);

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select top 5 * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' order by tgl_notif desc ";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Keuangan
            <div class='navbar-custom-menu pull-right padding:0px'>
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
                            <i class='fa fa-users text-aqua'></i> $row->title
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashNotifDet','','$kode_lokasi|$periode|$kode_pp|$nik|server_report_saku3_dash_rptDashYptV3');\">View all</a></li>
                    </ul>
                </li>
                <li>
                    <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </li>
                <li>
                    <a href='#' data-toggle='control-sidebar' id='open-sidebar' class='btn btn-info btn-sm' style='margin-right:0px;padding:2px 5px 0px 5px'><i class='fa fa-filter'></i><span style='font-family:sans-serif'> <b> Filter</b></span></a>
                </li>
                </ul>
                </div>
            </div>
            <div class='panel-body'>";
        //KEUANGAN
            echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->nama."</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($nilai,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|all|$row->kode_grafik|$kode_pp|$nik|$row->nama|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }

        
        $sql = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
        from db_rasio_d a
        inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
        inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1'  and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp' order by a.kode_rasio";

        $boxras = $dbLib->execute($sql);
        
        while ($row = $boxras->FetchNextObject(false)){
            $nil[] =(array)$row;
        }
        
        $dfr = array();

        for($i=0; $i<count($nil); $i++){
            if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
                $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
            }

            $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
                'kode_neraca'=>$nil[$i]['kode_neraca'],
                'nilai2'=>$nil[$i]['nilai2']
            );
        }

        foreach($dfr as $d){
                $p = '';
                for($z=0; $z<count($d['par']); $z++){
                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";

                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];
                }
                $kode=$d['nama_rasio'];
         echo  "<div class='col-md-12 col-md-3'>
                    <div class='small-box bg-aqua'>
                        <div class='inner'>
                            <center>
                                <p>".$d['nama_rasio']."</p>
                                <h3 id='home_kas_box' style='font-size: 25px;'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."</h3>
                            </center>
                        </div>
                        <div class='icon'><i class='fa fa-bank'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|all|$kode|$kode_pp|$nik|OR|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                    </div>
                </div>";             
        }

       
         echo"           
                </div>"; 
         
        echo"<div class='row'>
            <div class='col-sm-12'><h4>Pembendaharaan</h4></div>
        </div>";
        // PEMBENDAHARAAN
        echo   "<div class='row'>";
       
        $i=0;
        
        $color = array('yellow', 'blue', 'purple', 'red','green');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
        $judul =array('Pengajuan','Approval VP','Approval Dir Unit','Approval RRA Anggaran','Approval Direksi');
        // while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[0]."'>
                            <div class='inner'>
                                <center>
                                    <p>Pengajuan</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa0->fields[0],0,",",".")."</h3>
                                    <p>".number_format($rsa0->fields[1],0,",",".")."</p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[0]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pb|k1|$kode_pp|$nik|PB|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[1]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi Dokumen</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa1->fields[0],0,",",".")."</h3>
                                    <p>".number_format($rsa1->fields[1],0,",",".")."</p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[1]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pb|k2|$kode_pp|$nik|PB|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[2]."'>
                            <div class='inner'>
                                <center>
                                    <p>Verifikasi Akun</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa2->fields[0],0,",",".")."</h3>
                                    <p>".number_format($rsa2->fields[1],0,",",".")."</p>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[2]."'></i></div>
                                 <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pb|k3|$kode_pp|$nik|PB|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[3]."'>
                            <div class='inner'>
                                <center>
                                    <p>SPB</p>
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa3->fields[0],0,",",".")."</h3>
                                    <p>".number_format($rsa3->fields[1],0,",",".")."</p>

                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[3]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pb|k4|$kode_pp|$nik|SPB|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        echo"       <div class='col-md-15 col-md-3'>
                            <div class='small-box bg-".$color[4]."'>
                                <div class='inner'>
                                    <center>
                                        <p>Pembayaran</p>
                                        <h3 id='home_kas_box' style='font-size: 25px'>".number_format($rsa4->fields[0],0,",",".")."</h3>
                                        <p>".number_format($rsa4->fields[1],0,",",".")."</p>
                                    </center>
                                </div>
                                <div class='icon'><i class='fa ".$icon[4]."'></i></div>
                                    <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pb|k5|$kode_pp|$nik|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                            </div>
                    </div>";
            $i++;
        // }

         echo"           
                </div>"; 
        echo"<div class='row'>
                <div class='col-md-15 col-md-3'><h4>RRA Anggaran</h4></div>
                <div class='col-md-15 col-md-3'></div>
                <div class='col-md-15 col-md-3'><h4>Anggaran</h4></div>
                <div class='col-md-15 col-md-3'></div>
                <div class='col-md-15 col-md-3'></div>
            </div>";
        // RRA ANGGARAN
        echo   "<div class='row'>";
                $i=0;
                $judul =array('Pengajuan','Approval RRA','Pendapatan','Beban','Investasi');
                $color = array('yellow', 'blue', 'purple', 'red','green');
                $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
                // while ($row = $rsBox2->FetchNextObject($toupper=false)) {
                for ($i=0;$i<5;$i++){
                    // $nilai=$row->nilai;
        
                echo"       <div class='col-md-15 col-md-3'>
                                <div class='small-box bg-".$color[$i]."'>
                                    <div class='inner'>
                                        <center>
                                            <p>".$judul[$i]."</p>";
                                        if($i <= 1){

                                            echo"
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rsb" . $i}->fields[0],0,",",".")."</h3>
                                            <p>".number_format(${"rsb" . $i}->fields[1],0,",",".")."</p>";
                                        }else{
                                            echo"
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rsb" . $i}->fields[1],0,",",".")."</h3>
                                            <p>&nbsp;</p>";
                                        }
                                        echo"
                                        </center>
                                    </div>
                                    <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|rra|app$i|$kode_pp|$nik|RRA|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                </div>
                            </div>";
                
                    // $i++;
                }
        
                 echo"           
                        </div>"; 

              echo"<div class='row'>
                <div class='col-md-15 col-md-3'><h4>Perjalanan Dinas</h4></div>
                <div class='col-md-15 col-md-3'></div>
            </div>";
        // RRA ANGGARAN
        echo   "<div class='row'>";
                $i=0;
                $judul =array('Pengajuan','Surat Tugas');
                $color = array('yellow', 'blue', 'purple', 'red','green');
                $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart','fa-bar-chart');
                // while ($row = $rsBox2->FetchNextObject($toupper=false)) {
                for ($i=0;$i<count($judul);$i++){
                    // $nilai=$row->nilai;
        
                echo"       <div class='col-md-15 col-md-3'>
                                <div class='small-box bg-".$color[$i]."'>
                                    <div class='inner'>
                                        <center>
                                            <p>".$judul[$i]."</p>";
                                            echo"
                                            <h3 id='home_kas_box' style='font-size: 25px'>
                                            ".number_format(${"rspd" . $i}->fields[0],0,",",".")."</h3>
                                            <p>".number_format(${"rspd" . $i}->fields[1],0,",",".")."</p>";
                                       
                                        echo"
                                        </center>
                                    </div>
                                    <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3Det','','$kode_lokasi|$periode|pd|pd$i|$kode_pp|$nik|PD|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                                </div>
                            </div>";
                
                    // $i++;
                }
        
                 echo"           
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

        $('#dash_lokasi').hide();

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
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
            }else{
                if(kode_pp == '' && periode != '' ){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3','','$kode_lokasi/'+periode+'/$kode_pp/$nik/$kode_fs');  
                }else if(kode_pp != '' && periode == ''){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3','','$kode_lokasi/$periode/'+kode_pp+'/$nik/$kode_fs');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYptV3','','$kode_lokasi/'+periode+'/'+kode_pp+'/$nik/$kode_fs');
                }
            } 
           
        });
        </script>";
       
		return "";
	}
	
}
?>
