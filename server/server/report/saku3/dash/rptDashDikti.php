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
class server_report_saku3_dash_rptDashDikti extends server_report_basic
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
        
        $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB01','DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
                  ";

        $rs = $dbLib->execute($sqlBox);  

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' --and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' 
        --and kode_pp='$kode_pp'";

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
                        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        while ($row = $rs->FetchNextObject($toupper=false)) {
            $nilai=$row->nilai;

        echo"       <div class='col-md-15 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$row->nama."</p>
                                    <h3 id='home_kas_box'>".number_format($nilai,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet','','$kode_lokasi|$periode|all|$row->kode_grafik|$kode_pp|$nik|$row->nama|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }

        // $sql="select max(periode) as periode from dikti_bill_d where kode_lokasi='$kode_lokasi' ";
        // $rp=$dbLib->execute($sql);
        $per=$periode;

        $sql = "select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
        from (
        select kode_lokasi, sum(nilai) as tot_bill
        from dikti_bill_d
        where kode_lokasi='$kode_lokasi' and periode='$per' 
        group by kode_lokasi
        ) a
        inner join 
        (select kode_lokasi, sum(nilai) as tot_byr
        from dikti_bill_rekon
        where kode_lokasi='$kode_lokasi' and periode='$per'
        group by kode_lokasi) b on a.kode_lokasi=b.kode_lokasi ";

        // echo $sql;

        $boxras = $dbLib->execute($sql);
        
        while ($row = $boxras->FetchNextObject(false)){
            echo  "<div class='col-md-15 col-md-3'>
                <div class='small-box bg-aqua'>
                    <div class='inner'>
                        <center>
                            <p>Collection Ratio</p>
                            <h3 id='home_kas_box'>".number_format(round($row->cr,2),2,",",".")."</h3>
                            
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-bank'></i></div>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet','','$kode_lokasi|$periode|all|CR|$kode_pp|$nik|OR');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>";    
        }

         echo"           
                </div>"; 

        // GRAFIK PIE
        $sql= "select  case when a.kode_jur ='DKVS1' then 'a1'
        when a.kode_jur ='IFS1' then 'a2' 
        when a.kode_jur ='RPLS1' then 'a3' 
        when a.kode_jur ='SIS1' then 'a4'
        when a.kode_jur ='TES1' then 'a5' 
        when a.kode_jur ='TIS1' then 'a6' 
        when a.kode_jur ='TTD3' then 'a7' 
        when a.kode_jur ='TTS1' then 'a8' end as kode_jur, a.total_bill, isnull(b.total_byr,0) as total_byr, a.total_bill-isnull(b.total_byr,0) as total_blm_byr 
        from (select c.kode_jur,a.kode_lokasi,sum(a.nilai) as total_bill 
              from dikti_bill_d a
			  inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
              inner join dikti_kelas b on c.kode_kelas=b.kode_kelas and c.kode_lokasi=b.kode_lokasi
              where a.kode_lokasi='$kode_lokasi' and a.periode='$per' 
              group by c.kode_jur, a.kode_lokasi ) a 
        left join (  select b.kode_jur , a.kode_lokasi,sum(a.nilai) as total_byr 
                     from dikti_bill_rekon a 
                     inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
                     inner join dikti_kelas c on b.kode_kelas=c.kode_kelas and b.kode_lokasi=c.kode_lokasi
                     where a.kode_lokasi='$kode_lokasi' and a.periode='$per' 
        group by b.kode_jur, a.kode_lokasi ) b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi 
        order by a.kode_jur ";

        // echo $sql;

        $resByr = $dbLib->execute($sql);
        while ($row = $resByr->FetchNextObject(false)){
            $series[$row->kode_jur][] = array(
                                    "name"=>$row->kode_jur, 
                                    "data"=>array(
                                        array('Bayar',floatval($row->total_byr)),
                                        array('Belum Byr',floatval($row->total_blm_byr))
                                    )
                                );
            $categories = array ('Total Bayar', 'Total Belum Bayar') ;
        }     
        
        $color[0]=array('#94b7e7','#ff8585','#fff2a7');
        $color[1]=array('#2b93e1','#264ca4','#92cfe2');
        $color[2]=array('#3f2e27','#846a5b','#ccd0d2');
        $color[3]=array('#fdc9c9','#eae0e0','#bbbbbb');
        $color[4]=array('#ef591c','#97d588','#e7ea81');
        $color[5]=array('#244c66','#8aa0ae','#ccd0d2');
        $color[6]=array('#dd6342','#ffce8b','#fdff90');
        $color[7]=array('#fbedea','#ffabc0','#837260');

        // echo json_encode($series['a1']);

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
                select 'BILL' as kode, sum(nilai) as nilai, kode_lokasi, periode
                from dikti_bill_d
                where kode_lokasi='$kode_lokasi'
				group by kode_lokasi,periode
                union

                select 'BYR' as kode, sum(nilai) as nilai, kode_lokasi, periode
                from dikti_bill_rekon
                where kode_lokasi='$kode_lokasi' 
				group by kode_lokasi,periode
            ) a
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($per,0,4)."' and a.kode='$field'
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
            
        $sql="select kode_jur from dikti_jur where kode_lokasi='$kode_lokasi' ";
        $rsJur=$dbLib->execute($sql);
        while($row = $rsJur->FetchNextObject(false)){
            $jur[]=$row->kode_jur;
        }
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-3'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[0]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr1'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-info'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[1]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr2'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[2]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr3'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-success'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[3]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr4'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-3'>
                        <div class='box box-warning'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[4]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr5'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-info'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[5]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr6'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[6]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr7'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='box box-success'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang ".$jur[7]." <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_billbyr8'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box box-danger'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang <span style='font-size:9px'>($per)</span></h3>
                            </div>
                            <div class='box-body'>
                                <div id='dash_main_chart_bill'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";

           echo" <div id='container' style='height: 400px'></div>";

        echo"</div>
            </div>
        </div>";

                		
		echo "
        <script type='text/javascript'>

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

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

        ";

        $x=0;
    $count=count($jur)+1;
    for ($i=1;$i<=$count;$i++){
    echo"
        var options$i = {
            chart: {
                renderTo: 'dash_main_chart_billbyr$i',
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
            colors:".json_encode($color[$x]).",
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

        options$i.series = ".json_encode($series["a".$i]).";
        options$i.xAxis.categories =".json_encode($categories).";

        options$i.plotOptions = {
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

        new Highcharts.Chart(options$i);

        ";
        $x++;
    }
        echo"

        </script>";

		return "";
	}
	
}
?>
