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
class server_report_saku3_dash_rptDashUinDetailV3 extends server_report_basic
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
            if($kunci=="BBlj"){
                $judul="Budget Belanja";
                $form="b.form='BELANJA' or b.form='BLJABT' ";
            }else if($kunci=="RBlj"){
                $judul="Realisasi Belanja";
                $operator=" <> ";
            }else if($kunci=="BPdpt"){
                $judul="Budget Pendapatan";
                $form="b.form='PDPT' or b.form='PDPTABT'";
            }else if($kunci=="RPdpt"){
                $judul="Realisasi Pendapatan";
                $operator=" = ";
            }
        }


		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinV3','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
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
                                <table class='table no-margin' id='table-budget-realisasi'>
                                    <thead>
                                        <tr>
                                            <th>Kode PP</th>
                                            <th>Nama</th>
                                            <th>Kode Akun </th>
                                            <th>Nama Akun </th>";
                                        if ($kunci == "BBlj" OR $kunci == "BPdpt") {
                                        echo"
                                            <th>Budget</th>";
                                        }
                                        else 
                                        {
                                        echo"
                                            <th>Realisasi</th>";   
                                        }
                                        echo"
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    if ($jenis=="all")
									{
                                        if($kunci=="BBlj" OR $kunci == "BPdpt"){
                                            $sql = "select a.kode_pp, a.nama as nama_pp, b.kode_akun,c.nmakun as nama_akun,b.total 
                                            from pp a 
                                            inner join (select a.kode_pp, a.kode_akun, a.kode_lokasi,sum(a.total) as total 
                                                        from uin_usul_d a 
                                                        inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
                                                        where a.dc='D' and a.no_park='-' and a.kode_lokasi='$kode_lokasi' and ($form)
                                                        group by a.kode_pp,a.kode_akun,a.kode_lokasi) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                            inner join uin_akun c on b.kode_akun=c.kdakun
                                            where a.kode_lokasi='$kode_lokasi' and flag_aktif='1' ";
                                        }else if($kunci=="RBlj" OR $kunci == "RPdpt"){
                                            $sql = "select a.kode_pp, a.nama as nama_pp, b.kode_akun,c.nmakun as nama_akun,b.total 
                                            from pp a 
                                            inner join (select b.kode_pp, a.kode_akun, a.kode_lokasi,sum(a.total) as total 
                                                        from uin_aju_d a 
                                                        inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                                                        where a.dc='D' and a.kode_lokasi='$kode_lokasi' and b.jenis $operator 'PDPT'
                                                        group by b.kode_pp,a.kode_akun,a.kode_lokasi) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                                            inner join uin_akun c on b.kode_akun=c.kdakun
                                            where a.kode_lokasi='$kode_lokasi' and flag_aktif='1' ";
                                        }

                                    }
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                        
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->kode_pp</a></td>
                                            <td>$row->nama_pp</td>
                                            <td>$row->kode_akun</td>
                                            <td>$row->nama_akun</td>
                                            <td align='right'>".number_format($row->total,0,',','.')."</td> 
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
				var table2 = $('#table-budget-realisasi').DataTable({
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
