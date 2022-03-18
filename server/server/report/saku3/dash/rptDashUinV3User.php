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
class server_report_saku3_dash_rptDashUinV3User extends server_report_basic
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

        $sql1 = "select isnull(sum(a.total)/1000000,0) as total
        from uin_usul_m a 
        where (a.form='BELANJA' or a.form='BLJABT') and a.kode_lokasi='$kode_lokasi' and a.tahun='$periode' and a.kode_pp='$kode_pp' ";

        $sql2 = "select isnull(sum(a.total)/1000000,0) as total
        from uin_usul_m a 
        where (a.form='PDPT' or a.form='PDPTABT') and a.kode_lokasi='$kode_lokasi' and a.tahun='$periode' and a.kode_pp='$kode_pp' ";

        $sql3 = "select isnull(sum(a.nilai/1000000),0) as total
                from uin_aju_m a 
                where a.jenis <> 'PDPT' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' ";

        $sql4 = "select isnull(sum(a.nilai/1000000),0) as total
        from uin_aju_m a 
        where a.jenis = 'PDPT' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' ";
        
        $rs = $dbLib->execute($sql1);        
        $rs2 = $dbLib->execute($sql2);
        $rs3 = $dbLib->execute($sql3);
        $rs4 = $dbLib->execute($sql4);

		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Realisasi Anggaran</div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-yellow'>
                            <div class='inner'>
                                <center>
                                    <p>Budget Belanja</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs->fields[0],2,',','.')."</b></h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetailV3User','','$kode_lokasi/$periode/all/BBlj/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-blue'>
                            <div class='inner'>
                                <center>
                                    <p>Realisasi Belanja</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs3->fields[0],2,',','.')."</b></h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-money'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetailV3User','','$kode_lokasi/$periode/all/RBlj/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-aqua'>
                            <div class='inner'>
                                <center>
                                    <p>Budget Pendapatan</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs2->fields[0],2,',','.')."</b></h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-line-chart'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetailV3User','','$kode_lokasi/$periode/all/BPdpt/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-red'>
                            <div class='inner'>
                                <center>
                                    <p>Realisasi Pendapatan</p>
                                    <h3 style='margin:2px 0px;'><b>".number_format($rs4->fields[0],2,',','.')."</b></h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa fa-credit-card'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetailV3User','','$kode_lokasi/$periode/all/RPdpt/$kode_pp');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                </div>"; 
            
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Belanja per Kelompok Biaya</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_belanja'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Pendapatan per Akun</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_pdpt'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Belanja per Unit/Fakultas</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_belanja2'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Pendapatan per Unit/Fakultas</h3>
                            </div>
                            <div class='box-body'>
                                <div id='uin_dash_main_chart_pdpt2'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

        $blj = $dbLib->execute("
        select a.kdgbkpk,a.nmgbkpk,isnull(c.total/1000000,0) as budget,isnull(d.total/1000000,0) as realisasi
        from uin_gbkpk a
        inner join (select c.kdgbkpk,a.kode_lokasi, sum(a.total) as total
                    from uin_usul_d a 
                    inner join uin_akun b on a.kode_akun=b.kdakun 
                    inner join uin_gbkpk c on b.kdgbkpk=c.kdgbkpk
                    inner join uin_usul_m e on a.no_usul=e.no_usul and a.kode_lokasi=e.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and e.kode_pp='$kode_pp' and a.no_park='-' and a.tahun='$periode' and (e.form='BELANJA' or e.form='BLJABT')
                    group by c.kdgbkpk,a.kode_lokasi
                        )c on a.kdgbkpk=c.kdgbkpk 
        inner join (select c.kdgbkpk,a.kode_lokasi, sum(a.total) as total
                    from uin_aju_d a 
                    inner join uin_akun b on a.kode_akun=b.kdakun 
                    inner join uin_gbkpk c on b.kdgbkpk=c.kdgbkpk
                    inner join uin_aju_m e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and e.kode_pp='$kode_pp' and a.tahun='$periode' and e.jenis <> 'PDPT' 
                    group by c.kdgbkpk,a.kode_lokasi
                    )d on a.kdgbkpk=d.kdgbkpk
        ");

        while ($row = $blj->FetchNextObject(false)){
            // $series["blj"][] = array("name"=>$row->nama, "data"=>array(floatval($row->usul_blj),floatval($row->usul_pdpt)));
            // $bljcategories[] = $row->nama;
            $budgets[]=floatval($row->budget);
            $reals[]=floatval($row->realisasi);

        }

        $res = $dbLib->execute("select distinct a.nmgbkpk from uin_gbkpk a 
        inner join uin_akun b on a.kdgbkpk=b.kdgbkpk 
        inner join uin_usul_d c on b.kdakun=c.kode_akun
        inner join uin_aju_d d on b.kdakun=d.kode_akun and c.kode_lokasi=d.kode_lokasi 
        inner join uin_usul_m e on c.no_usul=e.no_usul where c.kode_lokasi='$kode_lokasi' and e.kode_pp='$kode_pp' and (e.form='BELANJA'  or e.form='BLJABT') ");


        while ($row2 = $res->FetchNextObject(false)){
            $categories[] = $row2->nmgbkpk;
        }


        $pdpt = $dbLib->execute("
        select a.kdakun,a.nmakun,isnull(c.total/1000000,0) as budget,isnull(d.total/1000000,0) as realisasi
        from uin_akun a
        inner join (select b.kdakun,a.kode_lokasi, sum(a.total) as total
                    from uin_usul_d a 
                    inner join uin_akun b on a.kode_akun=b.kdakun 
                    inner join uin_usul_m e on a.no_usul=e.no_usul and a.kode_lokasi=e.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.no_park='-' and e.kode_pp='$kode_pp' and a.tahun='$periode' and (e.form='PDPT' or e.form ='PDPTABT') 
                    group by b.kdakun,a.kode_lokasi
                        )c on a.kdakun=c.kdakun
       left join (select b.kdakun,a.kode_lokasi, sum(a.total) as total
                    from uin_aju_d a 
                    inner join uin_akun b on a.kode_akun=b.kdakun 
                    inner join uin_aju_m e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and e.kode_pp='$kode_pp' and a.tahun='$periode' and e.jenis = 'PDPT' 
                    group by b.kdakun,a.kode_lokasi
                    )d on a.kdakun=d.kdakun
        ");

        while ($row = $pdpt->FetchNextObject(false)){
            // $series["blj"][] = array("name"=>$row->nama, "data"=>array(floatval($row->usul_blj),floatval($row->usul_pdpt)));
            // $bljcategories[] = $row->nama;
            $budgets2[]=floatval($row->budget);
            $reals2[]=floatval($row->realisasi);

        }

        $res3 = $dbLib->execute("select distinct b.nmakun from uin_akun b
        inner join uin_usul_d c on b.kdakun=c.kode_akun
        inner join uin_usul_m e on c.no_usul=e.no_usul where c.kode_lokasi='$kode_lokasi' and e.kode_pp='$kode_pp' and (e.form='PDPT' or e.form='PDPTABT') ");

        while ($row3 = $res3->FetchNextObject(false)){
            $categories2[] = $row3->nmakun;
        }


        $bljpp = $dbLib->execute(" select a.kode_pp,a.nama,isnull(c.total/1000000,0) as budget,isnull(d.total/1000000,0) as realisasi
        from pp a
        inner join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                    from uin_usul_m a 
                    where a.kode_lokasi='$kode_lokasi' and a.tahun='$periode' and (a.form='BELANJA' or a.form='BLJABT')
                    group by a.kode_pp,a.kode_lokasi
                        )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
        inner join (select a.kode_pp,a.kode_lokasi, sum(a.nilai) as total
                    from uin_aju_m a 
                    where a.kode_lokasi='$kode_lokasi' and a.periode LIKE '".$periode."%' and a.jenis <> 'PDPT'
                    group by a.kode_pp,a.kode_lokasi
                    )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' and a.kode_pp='$kode_pp'
        ");

        while ($row = $bljpp->FetchNextObject(false)){
            $budgetspp[]=floatval($row->budget);
            $realspp[]=floatval($row->realisasi);
        }

        $res = $dbLib->execute("select distinct a.kode_pp,a.nama from pp a 
        inner join uin_aju_m d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
        inner join uin_usul_m e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi where d.kode_lokasi='$kode_lokasi' and  e.kode_pp='$kode_pp' and (e.form='BELANJA' or e.form='BLJABT') ");

        while ($row = $res->FetchNextObject(false)){
            $categoriespp[] = $row->kode_pp;
        }

        
        $pdptpp = $dbLib->execute("
        select a.kode_pp,a.nama,isnull(c.total/1000000,0) as budget,isnull(d.total/1000000,0) as realisasi
        from pp a
        inner join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                    from uin_usul_m a 
                    where a.kode_lokasi='$kode_lokasi' and a.tahun='$periode' and (a.form='PDPT' or a.form='PDPTABT')
                    group by a.kode_pp,a.kode_lokasi
                        )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
        inner join (select a.kode_pp,a.kode_lokasi, sum(a.nilai) as total
                    from uin_aju_m a 
                    where a.kode_lokasi='$kode_lokasi' and a.periode LIKE '".$periode."%' and a.jenis = 'PDPT'
                    group by a.kode_pp,a.kode_lokasi
                    )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' and a.kode_pp='$kode_pp'
        ");

        while ($row = $pdptpp->FetchNextObject(false)){
            // $series["blj"][] = array("name"=>$row->nama, "data"=>array(floatval($row->usul_blj),floatval($row->usul_pdpt)));
            // $bljcategories[] = $row->nama;
            $budgetspp2[]=floatval($row->budget);
            $realspp2[]=floatval($row->realisasi);
        }

        $res = $dbLib->execute("select distinct a.kode_pp,a.nama from pp a 
        inner join uin_aju_m d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
        inner join uin_usul_m e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi where d.kode_lokasi='$kode_lokasi' and e.kode_pp='$kode_pp' and (e.form='PDPT' or e.form='PDPTABT') ");

        while ($row = $res->FetchNextObject(false)){
            $categoriespp2[] = $row->kode_pp;
        }

        echo "<script type='text/javascript'>
                
                var options = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_belanja',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Budget',
                        data: ".json_encode($budgets)."
                    }, {
                        name: 'Realisasi',
                        data: ".json_encode($reals)."
            
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($categories).",
                    },
                    yAxis:{
                        title: {
                            text: 'Dalam Jutaan',

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
                    colors: ['#058DC7', '#6AF9C4']
                };
        
                options.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name; 
                                    var kd = this.category;    
                                    // alert('Category: ' + kd + ', name: ' + id);

                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2DetUsul','','$kode_lokasi/$periode/'+id+'/'+kd);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options);

                var options2 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_pdpt',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Budget',
                        data: ".json_encode($budgets2)."
                    }, {
                        name: 'Realisasi',
                        data: ".json_encode($reals2)."
            
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($categories2).",
                    },
                    yAxis:{
                        title: {
                            text: 'Dalam Jutaan',
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
                    colors: ['#f39c12', '#24CBE5']
                };
        
                options2.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name; 
                                    var kd = this.category;    
                                    // alert('Category: ' + kd + ', name: ' + id);
        
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2DetUsul','','$kode_lokasi/$periode/'+id+'/'+kd);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options2);

                var options3 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_belanja2',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Budget',
                        data: ".json_encode($budgetspp)."
                    }, {
                        name: 'Realisasi',
                        data: ".json_encode($realspp)."
            
                    }],
                    xAxis: {
                        title: {
                            text: null,
                        },
                        categories: ".json_encode($categoriespp).",
                    },
                    yAxis:{
                        title: {
                            text: 'Dalam Jutaan'
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
                    colors: ['#8085e9', '#f15c80']
                };
        
                options3.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name; 
                                    var kd = this.category;    
                                    // alert('Category: ' + kd + ', name: ' + id);
        
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2DetUsul','','$kode_lokasi/$periode/'+id+'/'+kd);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options3);

                var options4 = {
                    chart: {
                        renderTo: 'uin_dash_main_chart_pdpt2',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Budget',
                        data: ".json_encode($budgetspp2)."
                    }, {
                        name: 'Realisasi',
                        data: ".json_encode($realspp2)."
            
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($categoriespp2).",
                    },
                    yAxis:{
                        title: {
                            text: 'Dalam Jutaan',
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
                    colors:['#2b908f','#f45b5b']
                };
        
                options4.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.series.name; 
                                    var kd = this.category;    
                                    // alert('Category: ' + kd + ', name: ' + id);
        
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2DetUsul','','$kode_lokasi/$periode/'+id+'/'+kd);
                                }
                            }
                        }
                    }
                };
        
                new Highcharts.Chart(options4);
			</script>
		";
        
		return "";
	}
	
}
?>
