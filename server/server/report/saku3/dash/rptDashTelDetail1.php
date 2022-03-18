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
class server_report_saku3_dash_rptDashTelDetail1 extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $jenis=$tmp[5];
        $kunci=$tmp[6];

        // echo $kunci.$kode_lokasi;

        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTel','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
               echo"<div class='row'>
                        <div class='col-md-12'>";
                        switch($kunci){
                            case "Siswa" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-list-o'></i>
                                <h3 class='box-title'>Data $kunci</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='tableini'>
                                    <thead>
                                        <tr>
                                            <th width='30' >No</th>
                                            <th width='100'>NIS</th>
                                            <th width='300'>Nama</th>
                                            <th width='90' >Angkatan </th>
                                            <th width='90' >Kelas</th>
                                            <th width='90' >Jurusan</th>
                                            <th width='90' >ID Bank</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.kode_jur,c.nama as nama_jur,b.nama as nama_kelas,a.id_bank,a.kode_akt,a.flag_aktif,a.kode_pp 
                                    from sis_siswa a
                                    inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                    inner join sis_jur c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
                                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' ";
                                    // echo $sql;

                                    $rs = $dbLib->execute($sql);
                                    $i=1;
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        
                                echo  "<tr>
                                            <td >$i</td>
                                            <td >";
                                            echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail2','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|$row->nis');\">$row->nis</a>";
                                    echo   "</td>        
                                            <td >$row->nama</td> 
                                            <td >$row->kode_akt</td>  
                                            <td >$row->kode_jur - $row->nama_jur</td>
                                            <td >$row->kode_kelas - $row->nama_kelas</td>                    
                                            <td >$row->id_bank</td> 
                                        </tr>";
                                        
                                        $i=$i+1;
                                    }
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                            break;
                            case "Tagihan" :
                            echo
                            "
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Tagihan</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_tagihan'></div>
                                </div>
                            </div>
                           ";

                           $sql= "
                            select 'TW1' as kode,a.kode_lokasi,sum(case when substring(a.periode,5,2) in ('01','02','03') then a.nilai else 0 end) n1
                            from sis_bill_m a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW2' as kode,a.kode_lokasi,
                                    sum(case when substring(a.periode,5,2) in ('04','05','06') then a.nilai else 0 end) n1  
                            from sis_bill_m a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW3' as kode,a.kode_lokasi, 
                                    sum(case when substring(a.periode,5,2) in ('07','08','09') then a.nilai else 0 end) n1
                            from sis_bill_m a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW4' as kode, a.kode_lokasi,
                                    sum(case when substring(a.periode,5,2) in ('10','11','12') then a.nilai else 0 end) n1
                            from sis_bill_m a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            ";

                            $res = $dbLib->execute($sql);
                            while ($row = $res->FetchNextObject(false)){
                                $TghS[]=array('y'=>floatval($row->n1),'name'=>$row->kode,'key'=>$row->kode);        
                                $ctgTgh[]=$row->kode;
                            
                            }                     

                            break;
                            case "Pbyr" :
                            echo
                            "
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pembayaran Tahun Berjalan</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_tagihan'></div>
                                </div>
                            </div>
                           ";  

                            $sql= "
                            select 'TW1' as kode,a.kode_lokasi,sum(case when substring(a.periode,5,2) in ('01','02','03') then a.nilai else 0 end) n1
                            from sis_rekon_d a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW2' as kode,a.kode_lokasi,
                                    sum(case when substring(a.periode,5,2) in ('04','05','06') then a.nilai else 0 end) n1  
                            from sis_rekon_d a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW3' as kode,a.kode_lokasi, 
                                    sum(case when substring(a.periode,5,2) in ('07','08','09') then a.nilai else 0 end) n1
                            from sis_rekon_d a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            union all
                            select 'TW4' as kode, a.kode_lokasi,
                                    sum(case when substring(a.periode,5,2) in ('10','11','12') then a.nilai else 0 end) n1
                            from sis_rekon_d a 
                            where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='".substr($periode,0,4)."'
                            group by a.kode_lokasi 
                            ";

                            $res = $dbLib->execute($sql);
                            while ($row = $res->FetchNextObject(false)){
                                $TghS[]=array('y'=>floatval($row->n1),'name'=>$row->kode,'key'=>$row->kode);        
                                $ctgTgh[]=$row->kode;
                            
                            }
                           
                            break;
                            case "Pbyr2" :
                            echo
                            "
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pembayaran Tahun Lalu</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_tagihan'></div>
                                </div>
                            </div>
                           ";
                           $tahunLalu= intval(substr($periode,0,4))-1;
                           $sql= "
                           select 'TW1' as kode,a.kode_lokasi,sum(case when substring(a.periode,5,2) in ('01','02','03') then a.nilai else 0 end) n1
                           from sis_rekon_d a 
                           where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='$tahunLalu'
                           group by a.kode_lokasi 
                           union all
                           select 'TW2' as kode,a.kode_lokasi,
                                   sum(case when substring(a.periode,5,2) in ('04','05','06') then a.nilai else 0 end) n1  
                           from sis_rekon_d a 
                           where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='$tahunLalu'
                           group by a.kode_lokasi 
                           union all
                           select 'TW3' as kode,a.kode_lokasi, 
                                   sum(case when substring(a.periode,5,2) in ('07','08','09') then a.nilai else 0 end) n1
                           from sis_rekon_d a 
                           where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='$tahunLalu'
                           group by a.kode_lokasi 
                           union all
                           select 'TW4' as kode, a.kode_lokasi,
                                   sum(case when substring(a.periode,5,2) in ('10','11','12') then a.nilai else 0 end) n1
                           from sis_rekon_d a 
                           where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and substring(periode,1,4)='$tahunLalu'
                           group by a.kode_lokasi 
                           ";

                           $res = $dbLib->execute($sql);
                           while ($row = $res->FetchNextObject(false)){
                               $TghS[]=array('y'=>floatval($row->n1),'name'=>$row->kode,'key'=>$row->kode);        
                               $ctgTgh[]=$row->kode;
                           
                           }
                            break;
                          
                        }
                    echo"</div>
                    </div>";             
        echo"   </div>
              </div>";

        echo "<script type='text/javascript'>
                var options = {
                    chart: {
                        renderTo: 'dash_main_chart_tagihan',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{ 
                        name : 'Saldo Akhir',
                        data :".json_encode($TghS).",
                        colorByPoint: true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgTgh).",
                    },
                    yAxis:{
                        title: {
                            text: null
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

                options.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    // var id = this.name;    
                                    var kd= this.options.key;
                                    // alert(kd);                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options);
    
			</script>
 	    ";

        
		return "";
	}
	
}
?>
