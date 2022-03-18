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
class server_report_saku3_dash_rptDashUinDetail extends server_report_basic
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
                $judul="Belanja";
            }else if($kunci=="PDPT"){
                $judul="Pendapatan";
            }else if($kunci=="RB"){
                $judul="Realisasi Belanja";
            }else if($kunci=="RP"){
                $judul="Realisasi Pendapatan";
            }
        }else if($jenis == "pp"){
            $judul = "Usulan Anggaran Unit ".$kunci;
        }else if($jenis == "blj"){
            $judul = "Belanja Unit ".$kunci;
            $sql = "select distinct kode_pp from pp where nama ='$kunci' and kode_lokasi='$kode_lokasi' ";
            $rs = $dbLib->execute($sql);	
        
            if ($rs) { 
                $pp = $rs->fields[0];
            }
        }else if($jenis == "pdpt"){
            $judul = "Pendapatan Unit ".$kunci;
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
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUin','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
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
                                            <th>Tahun</th>
                                            <th>Tanggal</th>
                                            <th>Keterangan</th>
                                            <th>Nilai</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    if ($jenis=="all")
									{
                                        if($kunci=="BELANJA" OR $kunci == "PDPT"){
                                            $sql = "select a.nik_user,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,a.tahun,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a where kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.form='$kunci' ";
                                        }else if($kunci=="RB"){
                                            $sql = "select a.nik_user,a.kdsatker,a.kode_pp,a.no_aju as no_bukti,substring(a.periode,1,4) as tahun,convert(varchar,a.tanggal,103) as tgl,a.nilai as total,a.keterangan from uin_aju_m a where kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.no_rekap <> 'PDPT' ";
                                        }else if($kunci=="RP"){
                                            $sql = "select a.nik_user,a.kdsatker,a.kode_pp,a.no_aju as no_bukti,substring(a.periode,1,4) as tahun,convert(varchar,a.tanggal,103) as tgl,a.nilai as total,a.keterangan from uin_aju_m a where kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.no_rekap = 'PDPT' ";
                                        }
                                    }
                                    else if ($jenis=="pp")
									{
                        
                                        $sql = "select a.nik_user,a.form,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,a.tahun,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a where kode_lokasi='$kode_lokasi' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.kode_pp='$kunci'
                                        ";
                                    }
                                    else if ($jenis=="blj")
									{
                                        $sql = "select a.nik_user,a.form,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,a.tahun,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a 
                                        where a.kode_lokasi='$kode_lokasi' and a.form='BELANJA' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.kode_pp='$pp'
                                        ";
                                    }else if($jenis=="pdpt"){
                                        $sql = "select a.nik_user,a.form,a.kdsatker,a.kode_pp,a.no_usul as no_bukti,a.tahun,convert(varchar,a.tanggal,103) as tgl,a.total,a.keterangan from uin_usul_m a 
                                        where a.kode_lokasi='$kode_lokasi' and a.form='PDPT' and a.kdsatker='424188' and a.kddept='025' and a.kdunit='04' and a.kode_pp='$pp'
                                        ";
                                    }
                                    
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        
                                    echo" 
                                        <tr>";
                                    if($jenis=="all") {
                                        if($kunci == "PDPT"){
                                            $report="server_report_saku3_dash_rptDashUinBuktiPdpt";
                                        }else if($kunci == "BELANJA"){
                                            $report="server_report_saku3_dash_rptDashUinBukti";
                                        }else if($kunci == "RB"){
                                            $report="server_report_saku3_dash_rptDashUinRBDet";
                                        }else if($kunci == "RP"){
                                            $report="server_report_saku3_dash_rptDashUinRPDet";
                                        }
                                    }
                                    else if($jenis == "pp"){
                                        if($row->form == "BELANJA"){
                                            $report="server_report_saku3_dash_rptDashUinBukti";
                                        }else{
                                            $report="server_report_saku3_dash_rptDashUinBuktiPdpt";
                                        }                                            
                                    } else if($jenis == "blj"){
                                        $report="server_report_saku3_dash_rptDashUinBukti";
                                    } else if($jenis == "pdpt"){
                                        $report="server_report_saku3_dash_rptDashUinBuktiPdpt";
                                    }

                                        echo"
                                            <td><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('$report','$row->no_bukti','$row->nik_user/$kode_lokasi/$kunci/$periode/$jenis');\">$row->no_bukti</a></td>
                                            <td>$row->tahun</td>
                                            <td>$row->tgl</td>
                                            <td>$row->keterangan</td>
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
