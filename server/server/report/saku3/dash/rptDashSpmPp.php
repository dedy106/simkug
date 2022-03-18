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
class server_report_saku3_dash_rptDashSpmPp extends server_report_basic
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

        if(!empty($tmp[5])){
            if($tmp[5] == "excel"){
                header("Pragma: public");
                header("Expires: 0");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
                header("Content-Type: application/force-download");
                header("Content-Type: application/octet-stream");
                header("Content-Type: application/download");;
                header("Content-Disposition: attachment;filename=doc1.xls"); 
                header("Content-Transfer-Encoding: binary ");
            }
        }

        $sqlBox = "select a.kode_grafik,a.nama,isnull(b.nilai,0) as nilai,case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai 
        from db_grafik_m a
        left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai
                   from db_grafik_d a
                   inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' and b.kode_pp='$kode_pp'
                   group by a.kode_grafik,a.kode_lokasi
                  )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
        where a.kode_grafik in ('DB01','DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'
                  ";
		echo $sql;
        // echo $kode_pp;

        $rs = $dbLib->execute($sqlBox);  

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' ";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' ";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan      <div class='navbar-custom-menu pull-right padding:0px'>";
            echo"
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
                                    <h3 id='home_kas_box' style='font-size: 25px'>".number_format($nilai,0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpmDetPp','','$kode_lokasi|$periode|all|$row->kode_grafik|$kode_pp|$nik|$row->nama|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
            $i++;
        }

      
            echo  "<div class='col-md-15 col-md-3'>
                <div class='small-box bg-aqua'>
                    <div class='inner'>
                        <center>
                            <p>Collection Ratio</p>
                            <h3 id='home_kas_box' style='font-size: 25px'>".number_format(round($row->cr,2),2,",",".")."</h3>
                        </center>
                    </div>
                    <div class='icon'><i class='fa fa-bank'></i></div>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpmDetPp','','$kode_lokasi|$periode|all|CR|$kode_pp|$nik|OR|$kode_fs');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                </div>
            </div>";    
        // }

         echo"           
                </div>"; 

                
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div >
                            <div class='box-header ui-sortable-handle' style='cursor: move;'>
                                <h3 class='box-title'>Summary</h3>
                                <div class='box-tools pull-right' data-toggle='tooltip' title=''>
                                    <div class='btn-group' data-toggle='btn-toggle'>
                                    <!--<button type='button' id='exs-to-xls' class='btn btn-success'><i class='fa fa-download '> Excel</i>
                                    </button>-->
                                    </div>                                
                                </div>
                            </div>
                            <div ><div class='box-body'>
                            <div class='table-responsive'>
                            <table id='table-spm' width='100%' class='display' >
                                <thead>
                                    <th>No</th>
                                    <th>Uraian</th>
                                    <th>Januari</th>
                                    <th>Februari</th>
                                    <th>Maret</th>
                                    <th>April</th>
                                    <th>Mei</th>
                                    <th>Juni</th>
                                    <th>Juli</th>
                                    <th>Agustus</th>
                                    <th>September</th>
                                    <th>Oktober</th>
                                    <th>November</th>
                                    <th>Desember</th>
                                </thead>
                                <tbody>";
                                $sql="select b.kode_neraca,a.nama,b.nu,
                                sum(case when substring(a.periode,5,2)='01' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                                sum(case when substring(a.periode,5,2)='02' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                                sum(case when substring(a.periode,5,2)='03' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                                sum(case when substring(a.periode,5,2)='04' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                                sum(case when substring(a.periode,5,2)='05' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                                sum(case when substring(a.periode,5,2)='06' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                                sum(case when substring(a.periode,5,2)='07' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                                sum(case when substring(a.periode,5,2)='08' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                                sum(case when substring(a.periode,5,2)='09' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                                sum(case when substring(a.periode,5,2)='10' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                                sum(case when substring(a.periode,5,2)='11' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,
                                sum(case when substring(a.periode,5,2)='12' then (case when a.modul='P' or a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12	   
                                from exs_neraca_pp a
                                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                                inner join db_grafik_m c on b.kode_grafik=c.kode_grafik and b.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.kode_pp='$kode_pp' and b.kode_grafik in ('DB12') and a.kode_fs='$kode_fs'
                                group by b.kode_neraca,a.nama,b.nu
                                order by b.nu ";

                                // 

                                $sum=$dbLib->execute($sql);
                                while($row=$sum->FetchNextObject(false)){
                                    echo"
                                    <tr>
                                        <td>".$row->nu."</td>
                                        <td>".$row->nama."</td>
                                        <td style='text-align:right'>".number_format($row->n1,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n2,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n3,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n4,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n5,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n6,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n7,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n8,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n9,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n10,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n11,0,",",".")."</td>
                                        <td style='text-align:right'>".number_format($row->n12,0,",",".")."</td>
                                    </tr>
                                    ";
                                }

                                echo"
                                <tbody>
                            </table>
                            </div>
                            </div></div>
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

        // $('#exs-to-xls').click(function(){
        //     // alert('hello');
        //     window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSpmPp','','$kode_lokasi/$periode/$nik/$kode_pp/$kode_fs/excel');
           
        // });

        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function ( data, row, column, node ) {
                       
                        if(column == 2 || column == 3 || column == 4 || column == 5 || column == 6 || column == 7 || column == 8 || column == 9 || column == 10 || column == 11 || column == 12 || column == 13  ){
                            return data.replace( /[.,]/g, '' );
                        }else{
                            return data;
                        }

                    }
                }
            }
        };
     
        $('#table-spm').DataTable( {
           
            dom: 'Bfrtip',
            buttons: [
                $.extend( true, {}, buttonCommon, {
                    extend: 'excelHtml5'
                } )
            ],
            columnDefs: [
                {
                    'targets': [ 0 ],
                    'visible': false,
                    'searchable': false
                }
            ]
        } );
        
        $('#table-spm').addClass('table table-bordered table-striped table-condensed');
        
        $('.dt-button').addClass('btn btn-success');
        $('.dt-buttons').addClass('pull-left');

      
        </script>";

		return "";
	}
	
}
?>
