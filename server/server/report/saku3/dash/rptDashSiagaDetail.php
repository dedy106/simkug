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
class server_report_saku3_dash_rptDashSiagaDetail extends server_report_basic
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
        $tipe=$tmp[2];
        $modul=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];
        
        $tahun = substr($periode,0,4);
        $dept="";

        $color = array("#D32f2f","#2196F3","#FFC107","#388E3C","#00796B","#7B1FA2","#673AB7","#FFA000","#689F38");
        $body = '';
        $script = '';
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiaga','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";

        switch($modul){
            case 'REVENUE':
                $tahun = substr($periode, 0, 4);
                $modul = "'$modul'";
                $periode = "'$periode'";
                $dept = "'$dept%'";
                $field_arr = ['portofolio', 'produk'];

                for($i=0; $i<count($field_arr); $i++){
                    $field = $field_arr[$i];
                    $sql = "select a.".$field.",a.n1, b.n2, c.n2  as n3 from (
                        select $field, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) a 
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun 
                        and klp = $modul and dept like $dept
                        group by $field ) b on b.".$field." = a.".$field."
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) c on c.".$field." = a.".$field." ";
                    $res = $dbLib->execute($sql);
                    $result[$field] = array("summary" => array(),"categories" => array(), "trend" => array(),"series" => array(), "series2" => array(), "series3" => array() );
                    
                    $result[$field]["series"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series2"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series2"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series4"] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series5"] = array("name" => "RKAP", "color" => $color[1], "data" => array() );
                    
                    while ($row = $res->FetchNextObject(false)){
                        $tmp = (array)$row;
                        $result[$field]["summary"][] = $tmp;
                        $result[$field]["categories"][] = $tmp[$field];
                        $result[$field]["series"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series"][1]["data"][] = floatval($row->n2);

                        $result[$field]["series2"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series2"][1]["data"][] = floatval($row->n3);

                        $result[$field]["series4"]["data"][] = array( $tmp[$field], floatval($row->n1) );
                        $result[$field]["series5"]["data"][] = array( $tmp[$field], floatval($row->n3) );
                    }
                    $sql = "select $field
                                , sum(nilai) as total
                                , sum(case when bulan = 'Jan' then nilai else 0 end )as n1
                                , sum(case when bulan = 'Feb' then nilai else 0 end) as n2
                                , sum(case when bulan = 'Mar' then nilai else 0 end) as n3
                                , sum(case when bulan = 'Apr' then nilai else 0 end) as n4
                                , sum(case when bulan = 'May' then nilai else 0 end) as n5
                                , sum(case when bulan = 'Jun' then nilai else 0 end) as n6
                                , sum(case when bulan = 'Jul' then nilai else 0 end) as n7
                                , sum(case when bulan = 'Aug' then nilai else 0 end) as n8
                                , sum(case when bulan = 'Sep' then nilai else 0 end) as n9
                                , sum(case when bulan = 'Okt' then nilai else 0 end) as n10
                                , sum(case when bulan = 'Nop' then nilai else 0 end) as n11
                                , sum(case when bulan = 'Des' then nilai else 0 end) as n12
                            from exs_real 
                            where tahun = $tahun and klp = $modul and dept like $dept
                            group by $field";
                    $res = $dbLib->execute($sql);
                    $idx = 0;
                    while ($row = $res->FetchNextObject(false)){
                        if($idx >= count($color)){
                            $idx = 0;
                        }
                        $tmp = (array)$row;
                        $result[$field]["trend"][] = $tmp;
                        $result[$field]["series3"][] = array("name" => $tmp[$field], "color" => $color[$idx], "data" => array(
                                                        round(floatval($row->n1) )
                                                        , round(floatval($row->n2)), round(floatval($row->n3)), round(floatval($row->n4))
                                                        , round(floatval($row->n5)), round(floatval($row->n6)), round(floatval($row->n7)), round(floatval($row->n8))
                                                        , round(floatval($row->n9)), round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                        ));

                        $idx++;
                    }
                }

                // ================================ PORTOFOLIO ======================================

                //  By Portfolio (Achievement YTD)
                $tbl1 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl1 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio (Achievement Current Year)
                $tbl2 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl2 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Portfolio (Trend Monthly Actual)
                $tbl3 = '';
                foreach($result['portofolio']['trend'] as $rvp){
                    $tbl3 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio Actual
                $tbl4 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl4 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio RKAP
                $tbl5 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl5 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                // ================================ PRODUK ======================================

                //  By Produk (Achievement YTD)
                $tbl6 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl6 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk (Achievement Current Year)
                $tbl7 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl7 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Produk (Trend Monthly Actual)
                $tbl8 = '';
                foreach($result['produk']['trend'] as $rvp){
                    $tbl8 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk Actual
                $tbl9 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl9 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk RKAP
                $tbl10 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl10 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                $body = "
                
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='rev_port_chart1'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='rev_port_table1'>
                                        <table class='DataTable'>
                                            <thead>
                                                <tr>
                                                    <th>Uraian</th>
                                                    <th>Actual</th>
                                                    <th>RKAP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                $tbl1
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_3' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_4' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_3'>
                                    <div id='rev_port_chart2'></div>
                                </div>
                                <div class='tab-pane' id='tab_4'>
                                    <div id='rev_port_table2'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl2
                                        </tbody>
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
                                <li class='active'><a href='#tab_5' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_6' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_5'>
                                    <div id='rev_port_chart3'></div>
                                </div>
                                <div class='tab-pane' id='tab_6'>
                                    <div id='rev_port_table3'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl3
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_7' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_8' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_7'>
                                    <div id='rev_port_chart4'></div>
                                </div>
                                <div class='tab-pane' id='tab_8'>
                                    <div id='rev_port_table4'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>$tbl4</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_9' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_10' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_9'>
                                    <div id='rev_port_chart5'></div>
                                </div>
                                <div class='tab-pane' id='tab_10'>
                                    <div id='rev_port_table5'>
                                        <table class='DataTable'>
                                            <thead>
                                            <tr>
                                                <th>Uraian</th>
                                                <th>Actual</th>
                                            </tr></thead>
                                            <tbody>$tbl5</tbody>
                                            
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_11' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_12' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_11'>
                                    <div id='rev_port_chart6'></div>
                                </div>
                                <div class='tab-pane' id='tab_12'>
                                    <div id='rev_port_table6'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl6
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_13' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_14' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_13'>
                                    <div id='rev_port_chart7'></div>
                                </div>
                                <div class='tab-pane' id='tab_14'>
                                    <div id='rev_port_table7'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl7
                                        </tbody>
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
                                <li class='active'><a href='#tab_15' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_16' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_15'>
                                    <div id='rev_port_chart8'></div>
                                </div>
                                <div class='tab-pane' id='tab_16'>
                                    <div id='rev_port_table8'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl8
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_17' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_18' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_17'>
                                    <div id='rev_port_chart9'></div>
                                </div>
                                <div class='tab-pane' id='tab_18'>
                                    <div id='rev_port_table9'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl9
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_19' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_20' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_19'>
                                    <div id='rev_port_chart10'></div>
                                </div>
                                <div class='tab-pane' id='tab_20'>
                                    <div id='rev_port_table10'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl10
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
                // echo json_encode($result['portofolio']['series']);
                $script = "
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart1', ".json_encode($result['portofolio']['series']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('column', 'rev_port_chart2', ".json_encode($result['portofolio']['series2']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('line', 'rev_port_chart3', ".json_encode($result['portofolio']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart4', [".json_encode($result['portofolio']['series4'])."]); // with []
                    drawChart('pie', 'rev_port_chart5', [".json_encode($result['portofolio']['series5'])."]); // with []

                    
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart6', ".json_encode($result['produk']['series']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart7', ".json_encode($result['produk']['series2']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart8', ".json_encode($result['produk']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart9', [".json_encode($result['produk']['series4'])."]);
                    drawChart('pie', 'rev_port_chart10', [".json_encode($result['produk']['series5'])."]);
                ";
            break;
            case 'GP':
                $tahun = substr($periode, 0, 4);
                $modul = "'$modul'";
                $periode = "'$periode'";
                $dept = "'$dept%'";
                $field_arr = ['portofolio', 'produk'];

                for($i=0; $i<count($field_arr); $i++){
                    $field = $field_arr[$i];
                    $sql = "select a.".$field.",a.n1, b.n2, c.n2  as n3 from (
                        select $field, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) a 
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun 
                        and klp = $modul and dept like $dept
                        group by $field ) b on b.".$field." = a.".$field."
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) c on c.".$field." = a.".$field." ";
                    $res = $dbLib->execute($sql);
                    $result[$field] = array("summary" => array(),"categories" => array(), "trend" => array(),"series" => array(), "series2" => array(), "series3" => array() );
                    
                    $result[$field]["series"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series2"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series2"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series4"] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series5"] = array("name" => "RKAP", "color" => $color[1], "data" => array() );
                    
                    while ($row = $res->FetchNextObject(false)){
                        $tmp = (array)$row;
                        $result[$field]["summary"][] = $tmp;
                        $result[$field]["categories"][] = $tmp[$field];
                        $result[$field]["series"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series"][1]["data"][] = floatval($row->n2);

                        $result[$field]["series2"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series2"][1]["data"][] = floatval($row->n3);

                        $result[$field]["series4"]["data"][] = array( $tmp[$field], floatval($row->n1) );
                        $result[$field]["series5"]["data"][] = array( $tmp[$field], floatval($row->n3) );
                    }
                    $sql = "select $field
                                , sum(nilai) as total
                                , sum(case when bulan = 'Jan' then nilai else 0 end )as n1
                                , sum(case when bulan = 'Feb' then nilai else 0 end) as n2
                                , sum(case when bulan = 'Mar' then nilai else 0 end) as n3
                                , sum(case when bulan = 'Apr' then nilai else 0 end) as n4
                                , sum(case when bulan = 'May' then nilai else 0 end) as n5
                                , sum(case when bulan = 'Jun' then nilai else 0 end) as n6
                                , sum(case when bulan = 'Jul' then nilai else 0 end) as n7
                                , sum(case when bulan = 'Aug' then nilai else 0 end) as n8
                                , sum(case when bulan = 'Sep' then nilai else 0 end) as n9
                                , sum(case when bulan = 'Okt' then nilai else 0 end) as n10
                                , sum(case when bulan = 'Nop' then nilai else 0 end) as n11
                                , sum(case when bulan = 'Des' then nilai else 0 end) as n12
                            from exs_real 
                            where tahun = $tahun and klp = $modul and dept like $dept
                            group by $field";
                    $res = $dbLib->execute($sql);
                    $idx = 0;
                    while ($row = $res->FetchNextObject(false)){
                        if($idx >= count($color)){
                            $idx = 0;
                        }
                        $tmp = (array)$row;
                        $result[$field]["trend"][] = $tmp;
                        $result[$field]["series3"][] = array("name" => $tmp[$field], "color" => $color[$idx], "data" => array(
                                                        round(floatval($row->n1) )
                                                        , round(floatval($row->n2)), round(floatval($row->n3)), round(floatval($row->n4))
                                                        , round(floatval($row->n5)), round(floatval($row->n6)), round(floatval($row->n7)), round(floatval($row->n8))
                                                        , round(floatval($row->n9)), round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                        ));

                        $idx++;
                    }
                }

                // ================================ PORTOFOLIO ======================================

                //  By Portfolio (Achievement YTD)
                $tbl1 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl1 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio (Achievement Current Year)
                $tbl2 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl2 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Portfolio (Trend Monthly Actual)
                $tbl3 = '';
                foreach($result['portofolio']['trend'] as $rvp){
                    $tbl3 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio Actual
                $tbl4 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl4 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Portfolio RKAP
                $tbl5 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl5 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                // ================================ PRODUK ======================================

                //  By Produk (Achievement YTD)
                $tbl6 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl6 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk (Achievement Current Year)
                $tbl7 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl7 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Produk (Trend Monthly Actual)
                $tbl8 = '';
                foreach($result['produk']['trend'] as $rvp){
                    $tbl8 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk Actual
                $tbl9 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl9 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Produk RKAP
                $tbl10 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl10 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                $body = "
                
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='rev_port_chart1'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='rev_port_table1'>
                                        <table class='DataTable'>
                                            <thead>
                                                <tr>
                                                    <th>Uraian</th>
                                                    <th>Actual</th>
                                                    <th>RKAP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                $tbl1
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_3' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_4' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_3'>
                                    <div id='rev_port_chart2'></div>
                                </div>
                                <div class='tab-pane' id='tab_4'>
                                    <div id='rev_port_table2'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl2
                                        </tbody>
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
                                <li class='active'><a href='#tab_5' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_6' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_5'>
                                    <div id='rev_port_chart3'></div>
                                </div>
                                <div class='tab-pane' id='tab_6'>
                                    <div id='rev_port_table3'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl3
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_7' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_8' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_7'>
                                    <div id='rev_port_chart4'></div>
                                </div>
                                <div class='tab-pane' id='tab_8'>
                                    <div id='rev_port_table4'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>$tbl4</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_9' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_10' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Portfolio RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_9'>
                                    <div id='rev_port_chart5'></div>
                                </div>
                                <div class='tab-pane' id='tab_10'>
                                    <div id='rev_port_table5'>
                                        <table class='DataTable'>
                                            <thead>
                                            <tr>
                                                <th>Uraian</th>
                                                <th>Actual</th>
                                            </tr></thead>
                                            <tbody>$tbl5</tbody>
                                            
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_11' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_12' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_11'>
                                    <div id='rev_port_chart6'></div>
                                </div>
                                <div class='tab-pane' id='tab_12'>
                                    <div id='rev_port_table6'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl6
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_13' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_14' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_13'>
                                    <div id='rev_port_chart7'></div>
                                </div>
                                <div class='tab-pane' id='tab_14'>
                                    <div id='rev_port_table7'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl7
                                        </tbody>
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
                                <li class='active'><a href='#tab_15' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_16' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_15'>
                                    <div id='rev_port_chart8'></div>
                                </div>
                                <div class='tab-pane' id='tab_16'>
                                    <div id='rev_port_table8'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl8
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_17' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_18' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_17'>
                                    <div id='rev_port_chart9'></div>
                                </div>
                                <div class='tab-pane' id='tab_18'>
                                    <div id='rev_port_table9'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl9
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_19' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_20' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Produk RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_19'>
                                    <div id='rev_port_chart10'></div>
                                </div>
                                <div class='tab-pane' id='tab_20'>
                                    <div id='rev_port_table10'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl10
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
                // echo json_encode($result['portofolio']['series']);
                $script = "
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart1', ".json_encode($result['portofolio']['series']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('column', 'rev_port_chart2', ".json_encode($result['portofolio']['series2']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('line', 'rev_port_chart3', ".json_encode($result['portofolio']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart4', [".json_encode($result['portofolio']['series4'])."]); // with []
                    drawChart('pie', 'rev_port_chart5', [".json_encode($result['portofolio']['series5'])."]); // with []

                    
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart6', ".json_encode($result['produk']['series']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart7', ".json_encode($result['produk']['series2']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart8', ".json_encode($result['produk']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart9', [".json_encode($result['produk']['series4'])."]);
                    drawChart('pie', 'rev_port_chart10', [".json_encode($result['produk']['series5'])."]);
                ";
            break;
            case 'OPEX':
                $tahun = substr($periode, 0, 4);
                $modul = "'$modul'";
                $periode = "'$periode'";
                $dept = "'$dept%'";
                $field_arr = ['portofolio', 'produk'];

                for($i=0; $i<count($field_arr); $i++){
                    $field = $field_arr[$i];
                    $sql = "select a.".$field.",a.n1, b.n2, c.n2  as n3 from (
                        select $field, sum(nilai) as n1 from exs_real where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) a 
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun 
                        and klp = $modul and dept like $dept
                        group by $field ) b on b.".$field." = a.".$field."
                        left outer join (
                        select $field, sum(nilai) as n2  from exs_rkap where tahun = $tahun and periode <= $periode
                        and klp = $modul and dept like $dept
                        group by $field ) c on c.".$field." = a.".$field." ";
                    $res = $dbLib->execute($sql);
                    $result[$field] = array("summary" => array(),"categories" => array(), "trend" => array(),"series" => array(), "series2" => array(), "series3" => array() );
                    
                    $result[$field]["series"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series2"][] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series2"][] = array("name" => "RKAP", "color" => $color[1], "data" => array() );

                    $result[$field]["series4"] = array("name" => "Actual", "color" => $color[0], "data" => array() );
                    $result[$field]["series5"] = array("name" => "RKAP", "color" => $color[1], "data" => array() );
                    
                    while ($row = $res->FetchNextObject(false)){
                        $tmp = (array)$row;
                        $result[$field]["summary"][] = $tmp;
                        $result[$field]["categories"][] = $tmp[$field];
                        $result[$field]["series"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series"][1]["data"][] = floatval($row->n2);

                        $result[$field]["series2"][0]["data"][] = floatval($row->n1);
                        $result[$field]["series2"][1]["data"][] = floatval($row->n3);

                        $result[$field]["series4"]["data"][] = array( $tmp[$field], floatval($row->n1) );
                        $result[$field]["series5"]["data"][] = array( $tmp[$field], floatval($row->n3) );
                    }
                    $sql = "select $field
                                , sum(nilai) as total
                                , sum(case when bulan = 'Jan' then nilai else 0 end )as n1
                                , sum(case when bulan = 'Feb' then nilai else 0 end) as n2
                                , sum(case when bulan = 'Mar' then nilai else 0 end) as n3
                                , sum(case when bulan = 'Apr' then nilai else 0 end) as n4
                                , sum(case when bulan = 'May' then nilai else 0 end) as n5
                                , sum(case when bulan = 'Jun' then nilai else 0 end) as n6
                                , sum(case when bulan = 'Jul' then nilai else 0 end) as n7
                                , sum(case when bulan = 'Aug' then nilai else 0 end) as n8
                                , sum(case when bulan = 'Sep' then nilai else 0 end) as n9
                                , sum(case when bulan = 'Okt' then nilai else 0 end) as n10
                                , sum(case when bulan = 'Nop' then nilai else 0 end) as n11
                                , sum(case when bulan = 'Des' then nilai else 0 end) as n12
                            from exs_real 
                            where tahun = $tahun and klp = $modul and dept like $dept
                            group by $field";
                    $res = $dbLib->execute($sql);
                    $idx = 0;
                    while ($row = $res->FetchNextObject(false)){
                        if($idx >= count($color)){
                            $idx = 0;
                        }
                        $tmp = (array)$row;
                        $result[$field]["trend"][] = $tmp;
                        $result[$field]["series3"][] = array("name" => $tmp[$field], "color" => $color[$idx], "data" => array(
                                                        round(floatval($row->n1) )
                                                        , round(floatval($row->n2)), round(floatval($row->n3)), round(floatval($row->n4))
                                                        , round(floatval($row->n5)), round(floatval($row->n6)), round(floatval($row->n7)), round(floatval($row->n8))
                                                        , round(floatval($row->n9)), round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                        ));

                        $idx++;
                    }
                }

                // ================================ PORTOFOLIO ======================================

                //  By Akun (Achievement YTD)
                $tbl1 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl1 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Akun (Achievement Current Year)
                $tbl2 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl2 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Akun (Trend Monthly Actual)
                $tbl3 = '';
                foreach($result['portofolio']['trend'] as $rvp){
                    $tbl3 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Akun Actual
                $tbl4 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl4 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Akun RKAP
                $tbl5 = '';
                foreach($result['portofolio']['summary'] as $rvp){
                    $tbl5 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                // ================================ PRODUK ======================================

                //  By Sub Akun (Achievement YTD)
                $tbl6 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl6 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                        </tr>
                    ";
                }
                

                //  By Sub Akun (Achievement Current Year)
                $tbl7 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl7 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }
                

                // By Sub Akun (Trend Monthly Actual)
                $tbl8 = '';
                foreach($result['produk']['trend'] as $rvp){
                    $tbl8 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                            <td>".$rvp["n2"]."</td>
                            <td>".$rvp["n3"]."</td>
                            <td>".$rvp["n4"]."</td>
                            <td>".$rvp["n5"]."</td>
                            <td>".$rvp["n6"]."</td>
                            <td>".$rvp["n7"]."</td>
                            <td>".$rvp["n8"]."</td>
                            <td>".$rvp["n9"]."</td>
                            <td>".$rvp["n10"]."</td>
                            <td>".$rvp["n11"]."</td>
                            <td>".$rvp["n12"]."</td>
                        </tr>
                    ";
                }
                

                //  By Sub Akun Actual
                $tbl9 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl9 .= "
                        <tr>
                            <td>".$rvp["produk"]."</td>
                            <td>".$rvp["n1"]."</td>
                        </tr>
                    ";
                }
                

                //  By Sub Akun RKAP
                $tbl10 = '';
                foreach($result['produk']['summary'] as $rvp){
                    $tbl10 .= "
                        <tr>
                            <td>".$rvp["portofolio"]."</td>
                            <td>".$rvp["n3"]."</td>
                        </tr>
                    ";
                }

                $body = "
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Akun (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='rev_port_chart1'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='rev_port_table1'>
                                        <table class='DataTable'>
                                            <thead>
                                                <tr>
                                                    <th>Uraian</th>
                                                    <th>Actual</th>
                                                    <th>RKAP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                $tbl1
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_3' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_4' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Akun (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_3'>
                                    <div id='rev_port_chart2'></div>
                                </div>
                                <div class='tab-pane' id='tab_4'>
                                    <div id='rev_port_table2'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl2
                                        </tbody>
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
                                <li class='active'><a href='#tab_5' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_6' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Akun (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_5'>
                                    <div id='rev_port_chart3'></div>
                                </div>
                                <div class='tab-pane' id='tab_6'>
                                    <div id='rev_port_table3'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl3
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_7' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_8' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Akun Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_7'>
                                    <div id='rev_port_chart4'></div>
                                </div>
                                <div class='tab-pane' id='tab_8'>
                                    <div id='rev_port_table4'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>$tbl4</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_9' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_10' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Akun RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_9'>
                                    <div id='rev_port_chart5'></div>
                                </div>
                                <div class='tab-pane' id='tab_10'>
                                    <div id='rev_port_table5'>
                                        <table class='DataTable'>
                                            <thead>
                                            <tr>
                                                <th>Uraian</th>
                                                <th>Actual</th>
                                            </tr></thead>
                                            <tbody>$tbl5</tbody>
                                            
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_11' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_12' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Sub Akun (Achievement YTD)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_11'>
                                    <div id='rev_port_chart6'></div>
                                </div>
                                <div class='tab-pane' id='tab_12'>
                                    <div id='rev_port_table6'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl6
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_13' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_14' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Sub Akun (Achievement Current Year)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_13'>
                                    <div id='rev_port_chart7'></div>
                                </div>
                                <div class='tab-pane' id='tab_14'>
                                    <div id='rev_port_table7'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                            <th>RKAP</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl7
                                        </tbody>
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
                                <li class='active'><a href='#tab_15' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_16' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Sub Akun (Trend Monthly Actual)</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_15'>
                                    <div id='rev_port_chart8'></div>
                                </div>
                                <div class='tab-pane' id='tab_16'>
                                    <div id='rev_port_table8'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl8
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_17' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_18' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Sub Akun Actual</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_17'>
                                    <div id='rev_port_chart9'></div>
                                </div>
                                <div class='tab-pane' id='tab_18'>
                                    <div id='rev_port_table9'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl9
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_19' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_20' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> By Sub Akun RKAP</li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_19'>
                                    <div id='rev_port_chart10'></div>
                                </div>
                                <div class='tab-pane' id='tab_20'>
                                    <div id='rev_port_table10'>
                                        <table class='DataTable'>
                                        <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Actual</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl10
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
                // echo json_encode($result['portofolio']['series']);
                $script = "
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart1', ".json_encode($result['portofolio']['series']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('column', 'rev_port_chart2', ".json_encode($result['portofolio']['series2']).", ".json_encode($result['portofolio']['categories']).");
                    drawChart('line', 'rev_port_chart3', ".json_encode($result['portofolio']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart4', [".json_encode($result['portofolio']['series4'])."]); // with []
                    drawChart('pie', 'rev_port_chart5', [".json_encode($result['portofolio']['series5'])."]); // with []

                    
                    // =================== PORTOFOLIO ====================
                    drawChart('column', 'rev_port_chart6', ".json_encode($result['produk']['series']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart7', ".json_encode($result['produk']['series2']).", ".json_encode($result['produk']['categories']).");
                    drawChart('column', 'rev_port_chart8', ".json_encode($result['produk']['series3']).", ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nop','Des']);
                    drawChart('pie', 'rev_port_chart9', [".json_encode($result['produk']['series4'])."]);
                    drawChart('pie', 'rev_port_chart10', [".json_encode($result['produk']['series5'])."]);
                ";
            break;
            case 'Net Income':
                $field_arr = ['NRC', 'CF'];
                $result = array();
                for($i=0; $i<count($field_arr); $i++){

                    if($field_arr[$i] == "NRC"){
                        $color = array("#D32f2f");
                    }else{
                        $color = array("green");
                    }
                    
                    $klp = $field_arr[$i];
                    
                    $sql = "select tipe,sum(nilai) as n1
                            from exs_nrc
                            where tahun='$tahun' and klp='$klp'
                            group by tipe";
                    $res = $dbLib->execute($sql);
                    $result[$field_arr[$i]] = array("summary" => array(),"categories" => array(),"series" => array());
                    
                    $result[$field_arr[$i]]["series"][] = array("name" => "Tipe", "color" => $color[0], "data" => array() );

                    while ($row = $res->FetchNextObject(false)){
                        $tmp = (array)$row;
                        $result[$field_arr[$i]]["summary"][] = $tmp;
                        // if(ISSET($tmp[$row->tipe])){
                            $result[$field_arr[$i]]["categories"][] = $tmp['tipe'];
                        // }
                        $result[$field_arr[$i]]["series"][0]["data"][] = floatval($row->n1);
                    }

                    //  Neraca Tabel
                    $tbl1 = '';
                    foreach($result['NRC']['summary'] as $rvp){
                        $tbl1 .= "
                            <tr>
                                <td>".$rvp["tipe"]."</td>
                                <td>".$rvp["n1"]."</td>
                            </tr>
                        ";
                    }

                    //  Cash Flow Tabel
                    $tbl2 = '';
                    foreach($result['CF']['summary'] as $rvp){
                        $tbl2 .= "
                            <tr>
                                <td>".$rvp["tipe"]."</td>
                                <td>".$rvp["n1"]."</td>
                            </tr>
                        ";
                    }

                    $body = "
                    <div id='dash_page_financial'>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs pull-right'>
                                        <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                        <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                        <li class='pull-left header'><i class='fa fa-bar-chart'></i> Neraca</li>
                                    </ul>
                                    <div class='tab-content sai-container-overflow'>
                                        <div class='tab-pane active' id='tab_1'>
                                            <div id='financial_port_chart1'></div>
                                        </div>
                                        <div class='tab-pane' id='tab_2'>
                                            <div id='financial_port_table1'>
                                                <table class='DataTable'>
                                                <thead>
                                                <tr>
                                                    <th>Tipe</th>
                                                    <th>Nilai</th>
                                                </tr>
                                                </thead>
                                                <tbody>$tbl1</tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='nav-tabs-custom'>
                                    <ul class='nav nav-tabs pull-right'>
                                        <li class='active'><a href='#tab_3' data-toggle='tab'>Chart</a></li>
                                        <li><a href='#tab_4' data-toggle='tab'>Data</a></li>
                                        <li class='pull-left header'><i class='fa fa-bar-chart'></i> Cashflow</li>
                                    </ul>
                                    <div class='tab-content sai-container-overflow'>
                                        <div class='tab-pane active' id='tab_3'>
                                            <div id='financial_port_chart2'></div>
                                        </div>
                                        <div class='tab-pane' id='tab_4'>
                                            <div id='financial_port_table2'>
                                                <table class='DataTable'>
                                                <thead>
                                                <tr>
                                                    <th>Tipe</th>
                                                    <th>Nilai</th>
                                                </tr>
                                                </thead>
                                                <tbody>$tbl2</tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";

                    $script = "
                        drawChart('column', 'financial_port_chart1', ".json_encode($result['NRC']['series']).", ".json_encode($result['NRC']['categories']).");
                        drawChart('column', 'financial_port_chart2', ".json_encode($result['CF']['series']).", ".json_encode($result['CF']['categories']).");
                    ";
                }
            break;
            case 'COGS':

            break;
        }

        echo $body;
        echo "<script type='text/javascript'>
                $('.DataTable').DataTable();

                function drawChart(type, selector, series_array, categories, exporting, click_callback){
                    if (typeof categories === 'undefined') { categories = null; }
                    if (typeof exporting === 'undefined') { exporting = false; }
                    if (typeof click_callback === 'undefined') { click_callback = null; }
                    var options = {
                        chart: {
                            renderTo: selector,
                            type: type
                        },
                        title:{
                            text:''
                        },
                        exporting: { 
                            enabled: exporting
                        },
                        series: [],
                        xAxis: {
                            title: {
                                text: null
                            },
                            categories: []
                        },
                        yAxis:{
                            title: {
                                text: null
                            },
                        },
                        credits: {
                            enabled: false
                        },
                    };
                    
                    options.series = series_array;
                    options.xAxis.categories = categories;
                
                    if(click_callback !== null){
                        options.plotOptions = click_callback;
                    }
                
                    new Highcharts.Chart(options);
                }

                $script
            </script>";
	}
	
}
?>
