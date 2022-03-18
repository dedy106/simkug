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

class server_report_saku3_dash_rptDashYakes2 extends server_report_basic
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
    function getDataBunga($modul, $periode, $pembagi){
        global $dbLib;
        $sql = 
            "select case modul when '$modul' then 'Bunga Net' else '1' end as modul
                , sum(bunga_net) as total
                , sum(case when day(tanggal) = '01' then bunga_net else 0 end )as n1
                , sum(case when day(tanggal) = '02' then bunga_net else 0 end) as n2
                , sum(case when day(tanggal) = '03' then bunga_net else 0 end) as n3
                , sum(case when day(tanggal) = '04' then bunga_net else 0 end) as n4
                , sum(case when day(tanggal) = '05' then bunga_net else 0 end) as n5
                , sum(case when day(tanggal) = '06' then bunga_net else 0 end) as n6
                , sum(case when day(tanggal) = '07' then bunga_net else 0 end) as n7
                , sum(case when day(tanggal) = '08' then bunga_net else 0 end) as n8
                , sum(case when day(tanggal) = '09' then bunga_net else 0 end) as n9
                , sum(case when day(tanggal) = '10' then bunga_net else 0 end) as n10
                , sum(case when day(tanggal) = '11' then bunga_net else 0 end) as n11 
                , sum(case when day(tanggal) = '12' then bunga_net else 0 end) as n12
                , sum(case when day(tanggal) = '13' then bunga_net else 0 end) as n13
                , sum(case when day(tanggal) = '14' then bunga_net else 0 end) as n14
                , sum(case when day(tanggal) = '15' then bunga_net else 0 end) as n15
                , sum(case when day(tanggal) = '16' then bunga_net else 0 end) as n16
                , sum(case when day(tanggal) = '17' then bunga_net else 0 end) as n17
                , sum(case when day(tanggal) = '18' then bunga_net else 0 end) as n18
                , sum(case when day(tanggal) = '19' then bunga_net else 0 end) as n19
                , sum(case when day(tanggal) = '20' then bunga_net else 0 end) as n20
                , sum(case when day(tanggal) = '21' then bunga_net else 0 end) as n21
                , sum(case when day(tanggal) = '22' then bunga_net else 0 end) as n22
                , sum(case when day(tanggal) = '23' then bunga_net else 0 end) as n23
                , sum(case when day(tanggal) = '24' then bunga_net else 0 end) as n24
                , sum(case when day(tanggal) = '25' then bunga_net else 0 end) as n25
                , sum(case when day(tanggal) = '26' then bunga_net else 0 end) as n26
                , sum(case when day(tanggal) = '27' then bunga_net else 0 end) as n27
                , sum(case when day(tanggal) = '28' then bunga_net else 0 end) as n28
                , sum(case when day(tanggal) = '29' then bunga_net else 0 end) as n29
                , sum(case when day(tanggal) = '30' then bunga_net else 0 end) as n30
                , sum(case when day(tanggal) = '31' then bunga_net else 0 end) as n31
            from inv_roi_global 
            where periode = '$periode' and modul = '$modul'
            group by modul
            ";
        $res = $dbLib->execute($sql);
        while ($row = $res->FetchNextObject(false)){
            $result["trend1"][] = (array)$row;
            $result["series3"][] = array("name" =>$row->modul, "data" => array(
                                            round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                            round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                            round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                            round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12)),
                                            round(floatval($row->n13)), round(floatval($row->n14)), round(floatval($row->n15)),
                                            round(floatval($row->n16)), round(floatval($row->n17)), round(floatval($row->n18)),
                                            round(floatval($row->n19)), round(floatval($row->n20)), round(floatval($row->n21)),
                                            round(floatval($row->n22)), round(floatval($row->n23)), round(floatval($row->n24)),
                                            round(floatval($row->n25)), round(floatval($row->n26)), round(floatval($row->n27)),
                                            round(floatval($row->n28)), round(floatval($row->n29)), round(floatval($row->n30)),
                                            round(floatval($row->n31)),
                                        ));
            
        }
        return $result;
    }
    function getDataNil($modul, $periode, $pembagi){
        global $dbLib;
        $sql = 
			"select case modul when '$modul' then 'Nilai Penempatan' else '1' end as modul
				, sum(sakhir)/$pembagi as total
				, sum(case when day(tanggal) = '01' then sakhir else 0 end )/$pembagi as n1
				, sum(case when day(tanggal) = '02' then sakhir else 0 end)/$pembagi as n2
				, sum(case when day(tanggal) = '03' then sakhir else 0 end)/$pembagi as n3
				, sum(case when day(tanggal) = '04' then sakhir else 0 end)/$pembagi as n4
				, sum(case when day(tanggal) = '05' then sakhir else 0 end)/$pembagi as n5
				, sum(case when day(tanggal) = '06' then sakhir else 0 end)/$pembagi as n6
				, sum(case when day(tanggal) = '07' then sakhir else 0 end)/$pembagi as n7
				, sum(case when day(tanggal) = '08' then sakhir else 0 end)/$pembagi as n8
				, sum(case when day(tanggal) = '09' then sakhir else 0 end)/$pembagi as n9
				, sum(case when day(tanggal) = '10' then sakhir else 0 end)/$pembagi as n10
				, sum(case when day(tanggal) = '11' then sakhir else 0 end)/$pembagi as n11 
				, sum(case when day(tanggal) = '12' then sakhir else 0 end)/$pembagi as n12
				, sum(case when day(tanggal) = '13' then sakhir else 0 end)/$pembagi as n13
				, sum(case when day(tanggal) = '14' then sakhir else 0 end)/$pembagi as n14
				, sum(case when day(tanggal) = '15' then sakhir else 0 end)/$pembagi as n15
				, sum(case when day(tanggal) = '16' then sakhir else 0 end)/$pembagi as n16
				, sum(case when day(tanggal) = '17' then sakhir else 0 end)/$pembagi as n17
				, sum(case when day(tanggal) = '18' then sakhir else 0 end)/$pembagi as n18
				, sum(case when day(tanggal) = '19' then sakhir else 0 end)/$pembagi as n19
				, sum(case when day(tanggal) = '20' then sakhir else 0 end)/$pembagi as n20
				, sum(case when day(tanggal) = '21' then sakhir else 0 end)/$pembagi as n21
				, sum(case when day(tanggal) = '22' then sakhir else 0 end)/$pembagi as n22
				, sum(case when day(tanggal) = '23' then sakhir else 0 end)/$pembagi as n23
				, sum(case when day(tanggal) = '24' then sakhir else 0 end)/$pembagi as n24
				, sum(case when day(tanggal) = '25' then sakhir else 0 end)/$pembagi as n25
				, sum(case when day(tanggal) = '26' then sakhir else 0 end)/$pembagi as n26
				, sum(case when day(tanggal) = '27' then sakhir else 0 end)/$pembagi as n27
				, sum(case when day(tanggal) = '28' then sakhir else 0 end)/$pembagi as n28
				, sum(case when day(tanggal) = '29' then sakhir else 0 end)/$pembagi as n29
				, sum(case when day(tanggal) = '30' then sakhir else 0 end)/$pembagi as n30
				, sum(case when day(tanggal) = '31' then sakhir else 0 end)/$pembagi as n31
			from inv_roi_global 
			where periode = '$periode' and modul = '$modul'
			group by modul
			";
		$res = $dbLib->execute($sql);
		while ($row = $res->FetchNextObject(false)){
			$result["trend2"][] = (array)$row;
			$result["series4"][] = array("name" =>$row->modul, "data" => array(
											round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
											round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
											round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
											round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12)),
											round(floatval($row->n13)), round(floatval($row->n14)), round(floatval($row->n15)),
											round(floatval($row->n16)), round(floatval($row->n17)), round(floatval($row->n18)),
											round(floatval($row->n19)), round(floatval($row->n20)), round(floatval($row->n21)),
											round(floatval($row->n22)), round(floatval($row->n23)), round(floatval($row->n24)),
											round(floatval($row->n25)), round(floatval($row->n26)), round(floatval($row->n27)),
											round(floatval($row->n28)), round(floatval($row->n29)), round(floatval($row->n30)),
											round(floatval($row->n31)),
										));
			
		}
		return $result;
    }

	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];

        $sql="select kode_fs from fs where kode_lokasi='$kode_lokasi' ";
        $rsx = $dbLib->execute($sql);		

        if($rs){
            $kode_fs=$rsx->fields[0];
        }
        
        $periode2="201702";
        $pembagi=1000000000;
        $tahun = substr($periode2, 0, 4);
        $bln = substr($periode2, 4, 6);
        
        $tgl_awal =  substr($periode2, 0, 4)."-".substr($periode2, 4, 6)."-01";
        $tgl_akhir = date("Y-m-t", strtotime($tgl_awal));

		$res = $dbLib->execute("select max(tanggal) as tgl from inv_roi_global where month(tanggal) = '$bln'");
		$result = array();
		while ($row = $res->FetchNextObject(false)){
			$tgl = $row->tgl;
		}

        $rs = $dbLib->execute("select modul, round(sum(sakhir)/$pembagi, 2) as n1 from inv_roi_global where tanggal='$tgl' group by modul");
        
        $penem2data=$this->getDataNil("CASH",$periode2,$pembagi);
        $return2data=$this->getDataBunga("CASH",$periode2,$pembagi);

        $efekp=$this->getDataNil("EFEK",$periode2,$pembagi);
        $efekr=$this->getDataBunga("EFEK",$periode2,$pembagi);

        $sahamp=$this->getDataNil("SHM",$periode2,$pembagi);
        $sahamr=$this->getDataBunga("SHM",$periode2,$pembagi);

        $prop=$this->getDataNil("PROPENSA",$periode2,$pembagi);
        $pror=$this->getDataBunga("PROPENSA",$periode2,$pembagi);

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
			<div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Modul Investasi</div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
                $i=0;
                $color = array('yellow', 'blue', 'purple', 'red','aqua');
                $icon = array('fa-money', 'fa-line-chart', 'fa-credit-card', 'fa-usd','fa-university');
                while ($row = $rs->FetchNextObject($toupper=false)) {
                    echo"<div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                <p style='margin:2px 0px;'>".$row->modul."</p>
                                <h3 style='margin:2px 0px;'><b>".number_format($row->n1,0,',','.')."</b></h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakes2Detail','','$kode_lokasi/$periode/all/$row->modul');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
                    $i++;
                }
                    
           echo"</div>"; 
           echo"<div class='row'>
                    <div id='sai_home_list'>
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            <div id='sai_home_grafik'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Instrumen Investasi</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='yakes_chart_instrumen'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='yakes_data_instrumen'>
                                        <table class='table no-margin table-striped' id='table-instrumen-investasi'>
                                            <thead>
                                                <tr>
                                                    <th>Modul</th>
                                                    <th>Nilai</th>
                                                </tr>
                                            </thead>
                                            <tbody>";
                                            
                                            $instru = $dbLib->execute("select top 4 sakhir as n1,modul from inv_roi_global
                                            where periode = '201702' and modul in ('CASH','SHM','PROPENSA','EFEK') order by tanggal desc");

                                            while ($row = $instru->FetchNextObject(false))
                                            {
                                            echo" 
                                                <tr>
                                                    <td>$row->modul</td>
                                                    <td align='right'>".number_format($row->n1,0,',','.')."</td>
                                                </tr>";
                                            }

                                    echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

                // <div class='row'>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_3' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_4' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Cash</li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_3'>
                //                     <div id='yakes_chart_cash_penem'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_4'>
                //                     <div id='yakes_data_cash_penem'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_5' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_6' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Cash </li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_5'>
                //                     <div id='yakes_chart_cash_return'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_6'>
                //                     <div id='yakes_data_cash_return'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
            echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_7' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_8' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Cash Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_7'>
                                    <div id='yakes_chart_cash_penem2'></div>
                                </div>
                                <div class='tab-pane' id='tab_8'>
                                    <div id='yakes_data_cash_penem2'>
                                        <table class='table no-margin table-striped' id='table-cash-penem2'>
                                            <thead>
                                                <tr>";
                                        $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                        for($k=0;$k<count($kolom);$k++){

                                            echo"<th>".$kolom[$k]."</th>";
                                        }                                                       
                                        echo"   </tr>
                                            </thead>
                                            <tbody>";
                                       
                                       foreach($penem2data["trend2"] as $row){
                                            echo"<td>".$row['modul']."</td>
                                                 <td>".round($row['n1'])."</td>
                                                 <td>".round($row['n2'])."</td>
                                                 <td>".round($row['n3'])."</td>
                                                 <td>".round($row['n4'])."</td>
                                                 <td>".round($row['n5'])."</td>
                                                 <td>".round($row['n6'])."</td>
                                                 <td>".round($row['n7'])."</td>
                                                 <td>".round($row['n8'])."</td>
                                                 <td>".round($row['n9'])."</td>
                                                 <td>".round($row['n10'])."</td>
                                                 <td>".round($row['n11'])."</td>
                                                 <td>".round($row['n12'])."</td>
                                                 <td>".round($row['n13'])."</td>
                                                 <td>".round($row['n14'])."</td>
                                                 <td>".round($row['n15'])."</td>
                                                 <td>".round($row['n16'])."</td>
                                                 <td>".round($row['n17'])."</td>
                                                 <td>".round($row['n18'])."</td>
                                                 <td>".round($row['n19'])."</td>
                                                 <td>".round($row['n20'])."</td>
                                                 <td>".round($row['n21'])."</td>
                                                 <td>".round($row['n22'])."</td>
                                                 <td>".round($row['n23'])."</td>
                                                 <td>".round($row['n24'])."</td>
                                                 <td>".round($row['n25'])."</td>
                                                 <td>".round($row['n26'])."</td>
                                                 <td>".round($row['n27'])."</td>
                                                 <td>".round($row['n28'])."</td>
                                                 <td>".round($row['n29'])."</td>
                                                 <td>".round($row['n30'])."</td>
                                                 <td>".round($row['n31'])."</td>";
                                        }
                                    echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_9' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_10' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Cash Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_9'>
                                    <div id='yakes_chart_cash_return2'></div>
                                </div>
                                <div class='tab-pane' id='tab_10'>
                                    <div id='yakes_data_cash_penem2'>
                                        <table class='table no-margin table-striped' id='table-cash-return2'>
                                            <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($return2data["trend1"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
            
                // <div class='row'>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_11' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_12' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Efek</li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_11'>
                //                     <div id='yakes_chart_efek_penem'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_12'>
                //                     <div id='yakes_data_efek_penem'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_13' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_14' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Efek </li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_13'>
                //                     <div id='yakes_chart_efek_return'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_14'>
                //                     <div id='yakes_data_efek_return'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                echo"<div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_15' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_16' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Efek Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_15'>
                                    <div id='yakes_chart_efek_penem2'></div>
                                </div>
                                <div class='tab-pane' id='tab_16'>
                                    <div id='yakes_data_efek_penem2'>
                                        <table class='table no-margin table-striped' id='table-efek-penem2'>
                                            <thead>
                                                <tr>";
                                        $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                        for($k=0;$k<count($kolom);$k++){

                                            echo"<th>".$kolom[$k]."</th>";
                                        }                                                       
                                        echo"   </tr>
                                            </thead>
                                            <tbody>";
                                       
                                       foreach($efekp["trend2"] as $row){
                                            echo"<td>".$row['modul']."</td>
                                                 <td>".round($row['n1'])."</td>
                                                 <td>".round($row['n2'])."</td>
                                                 <td>".round($row['n3'])."</td>
                                                 <td>".round($row['n4'])."</td>
                                                 <td>".round($row['n5'])."</td>
                                                 <td>".round($row['n6'])."</td>
                                                 <td>".round($row['n7'])."</td>
                                                 <td>".round($row['n8'])."</td>
                                                 <td>".round($row['n9'])."</td>
                                                 <td>".round($row['n10'])."</td>
                                                 <td>".round($row['n11'])."</td>
                                                 <td>".round($row['n12'])."</td>
                                                 <td>".round($row['n13'])."</td>
                                                 <td>".round($row['n14'])."</td>
                                                 <td>".round($row['n15'])."</td>
                                                 <td>".round($row['n16'])."</td>
                                                 <td>".round($row['n17'])."</td>
                                                 <td>".round($row['n18'])."</td>
                                                 <td>".round($row['n19'])."</td>
                                                 <td>".round($row['n20'])."</td>
                                                 <td>".round($row['n21'])."</td>
                                                 <td>".round($row['n22'])."</td>
                                                 <td>".round($row['n23'])."</td>
                                                 <td>".round($row['n24'])."</td>
                                                 <td>".round($row['n25'])."</td>
                                                 <td>".round($row['n26'])."</td>
                                                 <td>".round($row['n27'])."</td>
                                                 <td>".round($row['n28'])."</td>
                                                 <td>".round($row['n29'])."</td>
                                                 <td>".round($row['n30'])."</td>
                                                 <td>".round($row['n31'])."</td>";
                                        }
                                    echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_17' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_18' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Efek Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_17'>
                                    <div id='yakes_chart_efek_return2'></div>
                                </div>
                                <div class='tab-pane' id='tab_18'>
                                    <div id='yakes_data_efek_return2'>
                                        <table class='table no-margin table-striped' id='table-efek-return2'>
                                            <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($efekr["trend1"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

                // <div class='row'>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_19' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_20' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Saham</li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_19'>
                //                     <div id='yakes_chart_saham_penem'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_20'>
                //                     <div id='yakes_data_saham_penem'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_21' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_22' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Saham </li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_21'>
                //                     <div id='yakes_chart_saham_return'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_22'>
                //                     <div id='yakes_data_saham_return'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
               echo" <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_23' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_24' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Saham Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_23'>
                                    <div id='yakes_chart_saham_penem2'></div>
                                </div>
                                <div class='tab-pane' id='tab_24'>
                                    <div id='yakes_data_saham_penem2'>
                                        <table class='table no-margin table-striped' id='table-saham-penem2'>
                                        <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($sahamp["trend2"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>                                               
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_25' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_26' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Saham Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_25'>
                                    <div id='yakes_chart_saham_return2'></div>
                                </div>
                                <div class='tab-pane' id='tab_26'>
                                    <div id='yakes_data_saham_return2'>
                                        <table class='table no-margin table-striped' id='table-saham-return2'>
                                        <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($sahamr["trend1"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

                // <div class='row'>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_27' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_28' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Nilai Penempatan Propensa</li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_27'>
                //                     <div id='yakes_chart_propensa_penem'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_28'>
                //                     <div id='yakes_data_propensa_penem'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     <div class='col-md-6'>
                //         <div class='nav-tabs-custom'>
                //             <ul class='nav nav-tabs pull-right'>
                //                 <li class='active'><a href='#tab_29' data-toggle='tab'>Chart</a></li>
                //                 <li><a href='#tab_30' data-toggle='tab'>Data</a></li>
                //                 <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Saham </li>
                //             </ul>
                //             <div class='tab-content sai-container-overflow'>
                //                 <div class='tab-pane active' id='tab_29'>
                //                     <div id='yakes_chart_propensa_return'></div>
                //                 </div>
                //                 <div class='tab-pane' id='tab_30'>
                //                     <div id='yakes_data_propensa_return'></div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                echo" <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_33' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_34' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Niali Penempatan Propensa Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_33'>
                                    <div id='yakes_chart_propensa_penem2'></div>
                                </div>
                                <div class='tab-pane' id='tab_34'>
                                    <div id='yakes_data_propensa_penem2'>
                                        <table class='table no-margin table-striped' id='table-propensa-penem2'>
                                        <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($prop["trend2"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_31' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_32' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Return Investasi Propensa Harian</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_31'>
                                    <div id='yakes_chart_propensa_return2'></div>
                                </div>
                                <div class='tab-pane' id='tab_32'>
                                    <div id='yakes_data_propensa_return2'>
                                        <table class='table no-margin table-striped' id='table-propensa-return2'>
                                        <thead>
                                            <tr>";
                                            $kolom=array('Modul','n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21','22','23','n24','n25','n26','n27','n28','n29','n30','n31');
                                            for($k=0;$k<count($kolom);$k++){
    
                                                echo"<th>".$kolom[$k]."</th>";
                                            }                                                       
                                            echo"   </tr>
                                                </thead>
                                                <tbody>";

                                            
                                            foreach($pror["trend1"] as $row){
                                                echo"<td>".$row['modul']."</td>
                                                     <td>".round($row['n1'])."</td>
                                                     <td>".round($row['n2'])."</td>
                                                     <td>".round($row['n3'])."</td>
                                                     <td>".round($row['n4'])."</td>
                                                     <td>".round($row['n5'])."</td>
                                                     <td>".round($row['n6'])."</td>
                                                     <td>".round($row['n7'])."</td>
                                                     <td>".round($row['n8'])."</td>
                                                     <td>".round($row['n9'])."</td>
                                                     <td>".round($row['n10'])."</td>
                                                     <td>".round($row['n11'])."</td>
                                                     <td>".round($row['n12'])."</td>
                                                     <td>".round($row['n13'])."</td>
                                                     <td>".round($row['n14'])."</td>
                                                     <td>".round($row['n15'])."</td>
                                                     <td>".round($row['n16'])."</td>
                                                     <td>".round($row['n17'])."</td>
                                                     <td>".round($row['n18'])."</td>
                                                     <td>".round($row['n19'])."</td>
                                                     <td>".round($row['n20'])."</td>
                                                     <td>".round($row['n21'])."</td>
                                                     <td>".round($row['n22'])."</td>
                                                     <td>".round($row['n23'])."</td>
                                                     <td>".round($row['n24'])."</td>
                                                     <td>".round($row['n25'])."</td>
                                                     <td>".round($row['n26'])."</td>
                                                     <td>".round($row['n27'])."</td>
                                                     <td>".round($row['n28'])."</td>
                                                     <td>".round($row['n29'])."</td>
                                                     <td>".round($row['n30'])."</td>
                                                     <td>".round($row['n31'])."</td>";
                                            }
                                        echo    "</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>";
        echo"</div>
            </div>
        </div>";

        $color = array("#D32f2f","#2196F3","#FFC107","#388E3C","#00796B","#7B1FA2","#673AB7","#FFA000","#689F38");
		
        // INSTRUMEN INVESTASI 
        
        $instru = $dbLib->execute("select top 4 sakhir as n1,modul from inv_roi_global
                                    where periode = '201702' and modul in ('CASH','SHM','PROPENSA','EFEK') order by tanggal desc");

        while ($row = $instru->FetchNextObject(false)){
            // $series["instru"][] = array("name" => $row->modul,"data" => array($row->modul,floatval($row->n1)) );
            $instrudata[]=array($row->modul,floatval($row->n1));
            $instrucategories[] = $row->modul;
        } 
        
        // CASH
		//  Nilai Penempatan        
        // $nilpem = $dbLib->execute("select jenis, sakhir/$pembagi as n1 from inv_roi_detail where modul='CASH' and tanggal='$tgl_akhir'");
		
		// while ($row = $nilpem->FetchNextObject(false)){
		// 	$nilpemdata[] = floatval($row->n1);
		// }
		
		// Bunga Net
		
        // $bunga = $dbLib->execute("select jenis, sum(bunga_net)/$pembagi as n1 from inv_roi_detail 
        // where modul='CASH' and tanggal between '$tgl_awal' and '$tgl_akhir' group by jenis");
		
        // while ($row = $bunga->FetchNextObject(false)){
        //     $bungadata[] = floatval($row->n1);
        // }
        
                        		
		echo "<div id='container' style='min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto'></div>

        <script type='text/javascript'>

        var options = {
            chart: {
                renderTo: 'yakes_chart_instrumen',
                type: 'pie'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series:[{
                name : 'Actual',
                data : ".json_encode($instrudata)."

            }] ,
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($instrucategories).",
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
            pie: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options);  

        var options2 = {
            chart: {
                renderTo: 'yakes_chart_cash_penem2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series:".json_encode($penem2data["series4"]).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options2.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options2);  

        var options3 = {
            chart: {
                renderTo: 'yakes_chart_cash_return2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($return2data['series3']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options3.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options3);  

        var options4 = {
            chart: {
                renderTo: 'yakes_chart_efek_penem2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($efekp['series4']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options4.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options4);  

        var options5 = {
            chart: {
                renderTo: 'yakes_chart_efek_return2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($efekr['series3']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options5.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options5); 
        
        var options6 = {
            chart: {
                renderTo: 'yakes_chart_saham_penem2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($sahamp['series4']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options6.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options6);  

        var options7 = {
            chart: {
                renderTo: 'yakes_chart_saham_return2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($sahamr['series3']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options7.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options7);  

        var options8 = {
            chart: {
                renderTo: 'yakes_chart_propensa_penem2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($prop['series4']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options8.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options8);  

        var options9 = {
            chart: {
                renderTo: 'yakes_chart_propensa_return2',
                type: 'line'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: ".json_encode($pror['series3']).",
            xAxis: {
                title: {
                    text: null
                },
                categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
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

        options9.plotOptions = {
            line: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.series.name;      
                            // alert(id); 

                            // window.parent.system.getResource(".$resource.").doOpenTagihan(id);
                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesChartDetail','','$kode_lokasi/$periode/bidang/'+id);
                        }
                    }
                }
            }
        };

        new Highcharts.Chart(options9); 

        var tablecp2 = $('#table-cash-penem2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablecp2.columns.adjust().draw();
        
        var tablecr2 = $('#table-cash-return2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablecr2.columns.adjust().draw();

        var tableep2 = $('#table-efek-penem2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tableep2.columns.adjust().draw();
        
        var tablesr2 = $('#table-efek-return2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tableep2.columns.adjust().draw();


        var tablesp2 = $('#table-saham-penem2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablesp2.columns.adjust().draw();
        
        var tablesr2 = $('#table-saham-return2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablesr2.columns.adjust().draw();

        var tablepp2 = $('#table-propensa-penem2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablepp2.columns.adjust().draw();

        var tablepp2 = $('#table-propensa-return2').DataTable({
            // 'fixedHeader': true,
            'scrollY': '200px',
            // 'scrollX': '0px',
            'scrollCollapse': true,
            'order': [[ 2, 'asc' ]]
        });
        tablepr2.columns.adjust().draw();

        </script>";
        

		return "";
	}
	
}
?>
