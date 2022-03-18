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
class server_report_saku3_dash_rptDashUin2DetUsul extends server_report_basic
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
                $judul="Usulan Belanja";
            }else if($kunci=="PDPT"){
                $judul="Usulan Pendapatan";
            }
        }else if($jenis == "Pendapatan"){
            $judul="Usulan Pendapatan ".$kunci;
            $sql = "select distinct kode_pp from pp where nama ='$kunci' and kode_lokasi='$kode_lokasi' ";
            $rs = $dbLib->execute($sql);	
        
            if ($rs) { 
                $pp = $rs->fields[0];
            }
        }else if($jenis == "Belanja"){
            $judul = "Usulan Belanja ".$kunci;
            $sql = "select distinct kode_pp from pp where nama ='$kunci' and kode_lokasi='$kode_lokasi' ";
            $rs = $dbLib->execute($sql);	
        
            if ($rs) { 
                $pp = $rs->fields[0];
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
                                        $sql = "select distinct a.nik_user,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,b.nama,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.form='$kunci' and b.flag_aktif='1'";
                                    }else if($jenis=="Belanja"){
                                        $sql = "select distinct a.nik_user,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,b.nama,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.form='BELANJA' and a.kode_pp='$pp' and b.flag_aktif='1'";
                                    }else if($jenis=="Pendapatan"){
                                        $sql = "select distinct a.nik_user,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,b.nama,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.form='PDPT' and a.kode_pp='$pp' and b.flag_aktif='1'";
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
