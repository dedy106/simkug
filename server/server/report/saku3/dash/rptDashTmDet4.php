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
class server_report_saku3_dash_rptDashTmDet4 extends server_report_basic
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
        $nik=$tmp[2];
        $kode_pp=$tmp[3];
        $jenis=$tmp[4];
        $kunci=$tmp[5];
        $nama=$tmp[6];
        $param=$tmp[7];
        $key=$tmp[8];
        $key2=$tmp[9];
        $key3=$tmp[10]; 

        $AddOnLib=new server_util_AddOnLib();
        
        // echo $key3;

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTmDet3','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$key2');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>
                    <div class='col-md-12'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Jurnal</h3>
                        </div>
                        <div class='box-body'>";
              
                            $sql="select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
                            from gldt_h a
                            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key3'
                            union
                            select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
                            from gldt a
                            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key3'
                            order by a.no_bukti ";

                            // echo $sql;

                            $rs=$dbLib->execute($sql);
                            $row = $rs->FetchNextObject($toupper=false);
                            echo"
                            <div class='row invoice-info' style='margin-bottom:30px'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Tanggal
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->no_bukti
                                        </strong>
                                        <br>
                                        ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                    </address>
                                </div>
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
                                        <th width='270' >KETERANGAN</th>
                                        <th width='60' >PP</th>
                                        <th width='100' >DEBET</th>
                                        <th width='100' >KREDIT</th>
                                    </tr>
                                    </thead>
                                    <tbody>";
                                    $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from gldt a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$row->no_bukti'
                                    union all
									select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from gldt_h a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$row->no_bukti'
                                    order by a.dc desc ";
                                    // echo $sql;

                                    $rs1 = $dbLib->execute($sql);
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
                                            <td >$row1->keterangan</td>
                                            <td >$row1->kode_pp</td>
                                            <td align='right'>$debet</td>
                                            <td align='right'>$kredit</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                    $tot_debet1=number_format($tot_debet,0,',','.');
                                    $tot_kredit1=number_format($tot_debet,0,',','.');
                                    echo "<tr>
                                            <td colspan='5'  align='right'><b>Total</b></td>
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
                               
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->"; 
                        echo"
                        </div>
                    </div>";               
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>
       
        </script>
        ";
        
		return "";
	}
	
}
?>
