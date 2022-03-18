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
class server_report_saku3_dash_rptDashUinUserDetUsul extends server_report_basic
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
        $kode_pp=$tmp[4];
        
        if($jenis =="all"){
            if($kunci=="BELANJA"){
                $judul="Usulan Belanja";
            }else if($kunci=="PDPT"){
                $judul="Usulan Pendapatan";
            }
        }else if($jenis == "chart"){
            $judul="Usulan ".$kunci." ".$kode_pp;
        }
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinUser','','$kode_lokasi/$periode/$kode_pp');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
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
                                            <th>No Bukti</th>
                                            <th>Keterangan</th>
                                            <th>Kode Unit</th>
                                            <th>Nama Unit</th>
                                            <th>Tanggal</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    if($jenis=="all"){
                                        $sql = "select distinct a.nik_user,a.kode_pp,a.no_usul as no_bukti,b.nama,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.form='$kunci' and b.flag_aktif='1' and a.kode_pp='$kode_pp'";
                                    }else if($jenis=="chart"){
                                        if($kunci=="Belanja"){
                                            $form="BELANJA";
                                        }else{
                                            $form="PDPT";
                                        }
                                        $sql = "select distinct a.nik_user,a.kode_pp,a.no_usul as no_bukti,b.nama,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.form='$form' and a.kode_pp='$kode_pp' and b.flag_aktif='1'";
                                    }
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        echo"
                                            <td><a href='#'>$row->no_bukti</a></td>
                                            <td>$row->keterangan</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->nama</td>
                                            <td>$row->tgl</td>
                                            <td align='right'>".number_format($row->total,0,',','.')."</td>";
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
