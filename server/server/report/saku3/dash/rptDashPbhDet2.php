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
class server_report_saku3_dash_rptDashPbhDet2 extends server_report_basic
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
        $jenis=$tmp[4];
        $box=$tmp[5];
        $key=$tmp[6];
        
        $AddOnLib=new server_util_AddOnLib();
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$jenis|$box|$key');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                    <div class='col-md-12'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail Pengajuan</h3>
                        </div>
                        <div class='box-body'>";
                    switch($box){
                        case "k1" :
                        case "k2" :
                        case "k3" :
                        case "k4" :
                            
                        $sql="select a.periode,convert(varchar,a.tanggal,103) as tgl,a.no_pb,a.kode_lokasi,a.keterangan,a.nik_tahu,b.nama as nama_tahu,
                                a.nik_app,c.nama as nama_setuju,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email
                        from pbh_pb_m a
                        inner join karyawan b on a.nik_tahu=b.nik and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_pb='$key'
                        order by a.no_pb";

                        $rs2 = $dbLib->execute($sql);
                        $row = $rs2->FetchNextObject(false);

                        echo"
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong><br>
                                    <strong>
                                    Tanggal
                                    </strong><br>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Keterangan
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->periode
                                        </strong><br>
                                        <strong>
                                        ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                        </strong><br>
                                        <strong>
                                        $row->no_pb
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th width='30' >NO</th>
                                        <th width='100' >KODE AKUN </th>
                                        <th width='200' >NAMA AKUN </th>
                                        <th width='60' >PERIODE</th>
                                        <th width='100' >DEBET</th>
                                        <th width='100' >KREDIT</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
                                        b.nama as nama_akun,
                                        case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
                                    from pbh_pb_j a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi'
                                    order by a.dc desc ";
                                     
                                    $rs1 = $dbLib->execute($sql1);
                                    $i=1;
                                    $tot_debet=0;
                                    $tot_kredit=0;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        $debet=number_format($row1->debet,0,',','.');
                                        $kredit=number_format($row1->kredit,0,',','.');
                                        $tot_debet=$tot_debet+$row1->debet;
                                        $tot_kredit=$tot_kredit+$row1->kredit;
                                    echo "<tr>
                                            <td>$i</td>
                                            <td >$row1->kode_akun</td>
                                            <td >$row1->nama_akun</td>
                                            <td >$row1->periode</td>
                                            <td align='right'>$debet</td>
                                            <td align='right'>$kredit</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                    $tot_debet1=number_format($tot_debet,0,',','.');
                                    $tot_kredit1=number_format($tot_debet,0,',','.');
                                    echo "<tr>
                                            <td colspan='4'  align='right'><b>Total</b></td>
                                            <td  align='right'><b>$tot_debet1</b></td>
                                            <td  align='right'><b>$tot_kredit1</b></td>
                                        </tr>";

                                    echo"
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->";
                        break;
                       
                    }
                  
                    echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                $thead
                                </tr>
                                </thead>
                                <tbody>
                                $tbody
                                </tbody>
                            </table>
                            </div>
                        </div>";

                    echo"
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
			var table2 = $('#table-pengajuan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 0, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
			
			</script>
		";
        
		return "";
	}
	
}
?>
