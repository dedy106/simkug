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
class server_report_saku3_dash_rptDashOtsDetail extends server_report_basic
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
        $prog=$tmp[2];
		
       
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTest','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Tagihan Outstanding</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-tagihan'>
                                    <thead>
                                        <tr>
                                            <th>No Bukti</th>
                                            <th>Tanggal</th>
                                            <th>Siswa</th>
                                            <th>Keterangan</th>
											<th>Periode</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                $sql = "select c.no_tagihan,c.periode,d.nama,convert(varchar,c.tanggal,103) as tanggal,c.keterangan,isnull(a.nilai,0) as nilai_t, isnull(b.nilai,0) as nilai_b ,isnull(a.nilai,0)-isnull(b.nilai,0) as saldo
                                from dev_tagihan_m c inner JOIN
                                (select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan 
                                left join 
                                (select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan 
                                inner join dev_siswa d on c.nim=d.nim
                                where isnull(a.nilai,0)-isnull(b.nilai,0)>0 and c.kode_lokasi='$kode_lokasi'";
								
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->no_tagihan</a></td>
                                            <td>$row->tanggal</td>
                                            <td>$row->nama</td>
                                            <td>$row->keterangan</td>
											<td>$row->periode</td>
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
				var table2 = $('#table-progress-tagihan').DataTable({
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
