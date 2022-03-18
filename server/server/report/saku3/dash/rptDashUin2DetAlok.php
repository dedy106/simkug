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
class server_report_saku3_dash_rptDashUin2DetAlok extends server_report_basic
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
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        
        if($jenis =="all"){
            if($kunci=="BELANJA"){
                $judul="Alokasi Belanja";
                $header="Belanja";
            }else if($kunci=="PDPT"){
                $judul="Alokasi Pendapatan";
                $header="Pendapatan";
            }
        }
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin2','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>".$judul."</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-panjar'>
                                    <thead>
                                        <tr>
                                            <th>Kode Unit</th>
                                            <th>Nama</th>
                                            <th>Alokasi ".$header."</th>
                                            <th>Usulan ".$header."</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    $sql = "select a.kode_pp,a.nama,isnull(b.belanja,0) as alok_blj,isnull(c.total,0) as usul_blj,isnull(b.pdpt,0) as alok_pdpt,isnull(d.total,0) as usul_pdpt 
                                    from pp a
                                    left join ( select kode_pp,kode_lokasi,belanja,pdpt 
                                                from uin_alokasi_m 
                                                where tahun='2019' and kode_lokasi='$kode_lokasi' 
                                                ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
                                    left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                                from uin_usul_m a 
                                                where  a.form='BELANJA' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.tahun='2019'
                                                group by a.kode_pp,a.kode_lokasi
                                            )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                                    left join (select a.kode_pp,a.kode_lokasi, sum(a.total) as total
                                            from uin_usul_m a 
                                            where  a.form='PDPT' and a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.tahun='2019'
                                            group by a.kode_pp,a.kode_lokasi
                                            )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                                    where a.kode_lokasi ='$kode_lokasi' and a.flag_aktif='1' and b.belanja != 0";
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        echo"
                                            <td><a href='#'>$row->kode_pp</a></td>
                                            <td>$row->nama</td>";
                                        if($kunci=="BELANJA"){
                                            echo"
                                            <td align='right'>".number_format($row->alok_blj,0,',','.')."</td>
                                            <td align='right'>".number_format($row->usul_blj,0,',','.')."</td>";
                                        }else{
                                            echo"
                                            <td align='right'>".number_format($row->alok_pdpt,0,',','.')."</td>
                                            <td align='right'>".number_format($row->usul_pdpt,0,',','.')."</td>";
                                        }
                                        
                                    echo"                                            
                                        </tr>";
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";
        echo "<script type='text/javascript'>
				var table2 = $('#table-progress-panjar').DataTable({
				// 'fixedHeader': true,
				'scrollY': '200px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
				table2.columns.adjust().draw();
			</script>
		";

        
		return "";
	}
	
}
?>
