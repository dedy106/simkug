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
class server_report_saku3_dash_rptDashSiagaAppDet extends server_report_basic
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaApp','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "k1" :
                            $title= "Data Pengajuan";
                            $column_array = array('No PB','No Dokumen','Atensi','Tanggal','Due Date','Keterangan','Nilai');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.atensi,a.keterangan,a.nilai
                                    from gr_pb_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.progress='0'  ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                            <td>$row->no_dokumen</td>
                                            <td>$row->atensi</td>
                                            <td>$row->tgl</td>
                                            <td>$row->tgl2</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                        </tr>";
                            }
                            
                        break;
                        case "k2" :
                            $title= "Data Approval Anggaran";
                            $column_array = array('No PB','No Dokumen','Atensi','Tanggal','Due Date','Keterangan','Nilai');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.atensi,a.keterangan,a.nilai
                                    from gr_pb_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.progress='1'  ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                            <td>$row->no_dokumen</td>
                                            <td>$row->atensi</td>
                                            <td>$row->tgl</td>
                                            <td>$row->tgl2</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                        </tr>";
                            }
                        break;
						case "k3" :
                            $title= "Data Verifikasi Akunting";
                            $column_array = array('No PB','No Dokumen','Atensi','Tanggal','Due Date','Keterangan','Nilai');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pb,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.atensi,a.keterangan,a.nilai
                                    from gr_pb_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.progress='2'  ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pb</a></td>
                                            <td>$row->no_dokumen</td>
                                            <td>$row->atensi</td>
                                            <td>$row->tgl</td>
                                            <td>$row->tgl2</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                        </tr>";
                            }
                        break;
                        case "k4" :
                            
                            $title= "Data SPB";
                            $column_array = array('No SPB','Periode','Tanggal','Nama','Alamat','Keterangan','Nilai');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_spb,a.periode,convert(varchar,a.tanggal,103) as tgl,nama,a.alamat,a.keterangan,a.nilai
                                    from gr_spb2_m a
                                    where a.kode_lokasi='$kode_lokasi' ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_spb');\" >$row->no_spb</a></td>
                                            <td>$row->periode</td>
                                            <td>$row->tgl</td>
                                            <td>$row->nama</td>
                                            <td>$row->alamat</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                        </tr>";
                            }
                        break;
                        case "k5" :
                            
                            $title= "Data Pembayaran";
                            $column_array = array('No SPB','Periode','Tanggal','Nama','Alamat','Keterangan','Nilai');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_spb,a.periode,convert(varchar,a.tanggal,103) as tgl,nama,a.alamat,a.keterangan,a.nilai
                                    from gr_spb2_m a
                                    where a.kode_lokasi='$kode_lokasi' and no_kas <> '-' ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_spb');\" >$row->no_spb</a></td>
                                            <td>$row->periode</td>
                                            <td>$row->tgl</td>
                                            <td>$row->nama</td>
                                            <td>$row->alamat</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                        </tr>";
                            }
                        break;
                        case "app0" :
                            
                            $title= "Data Pengajuan";
                            $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                            from rra_pdrk_m a 
                            left join (select no_pdrk,sum(nilai) as nilai 
                                       from rra_pdrk_d 
                                       where kode_lokasi='$kode_lokasi' and dc='D'
                                       group by no_pdrk
                                       )b on a.no_pdrk=b.no_pdrk 
                            where a.kode_lokasi='$kode_lokasi' and a.progress in ('8','V','D','X') ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pdrk');\" >$row->no_pdrk</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->periode</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->tgl_input</td>
                                        </tr>";
                            }
                        break;
                        case "app1" :
                            
                            $title= "Data Approval VP";
                            $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                            from rra_pdrk_m a 
                            left join (select no_pdrk,sum(nilai) as nilai 
                                       from rra_pdrk_d 
                                       where kode_lokasi='$kode_lokasi' and dc='D'
                                       group by no_pdrk
                                       )b on a.no_pdrk=b.no_pdrk 
                            where a.kode_lokasi='$kode_lokasi' and a.progress='9'";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pdrk');\" >$row->no_pdrk</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->periode</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->tgl_input</td>
                                        </tr>";
                            }
                        break;
                        case "app2" :
                            
                            $title= "Data Approval Dir Unit";
                            $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                            from rra_pdrk_m a 
                            left join (select no_pdrk,sum(nilai) as nilai 
                                       from rra_pdrk_d 
                                       where kode_lokasi='$kode_lokasi' and dc='D'
                                       group by no_pdrk
                                       )b on a.no_pdrk=b.no_pdrk 
                            where a.kode_lokasi='$kode_lokasi' and a.progress='0' ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pdrk');\" >$row->no_pdrk</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->periode</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->tgl_input</td>
                                        </tr>";
                            }
                        break;
                        case "app3" :
                            
                            $title= "Data Approval RRA Anggaran";
                            $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                            from rra_pdrk_m a 
                            left join (select no_pdrk,sum(nilai) as nilai 
                                       from rra_pdrk_d 
                                       where kode_lokasi='$kode_lokasi' and dc='D'
                                       group by no_pdrk
                                       )b on a.no_pdrk=b.no_pdrk 
                            where a.kode_lokasi='$kode_lokasi' and a.progress='1' ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pb');\" >$row->no_pdrk</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->periode</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->tgl_input</td>
                                        </tr>";
                            }
                        break;
                        case "app4" :
                            
                            $title= "Data Approval Direksi";
                            $column_array = array('No Bukti','Tanggal','Periode','Kode PP','Keterangan','Nilai','Tgl Input');
                            $thead="";
                            for ($i=0;$i<count($column_array);$i++){
                                $thead.="
                                <th style='text-align:center;'>".$column_array[$i]."</th>
                                ";
                            }
                            $sql = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,a.periode,a.kode_pp,a.keterangan,isnull(b.nilai,0) as nilai,a.tgl_input
                            from rra_pdrk_m a 
                            left join (select no_pdrk,sum(nilai) as nilai 
                                       from rra_pdrk_d 
                                       where kode_lokasi='$kode_lokasi' and dc='D'
                                       group by no_pdrk
                                       )b on a.no_pdrk=b.no_pdrk 
                            where a.kode_lokasi='$kode_lokasi' and a.progress='2' ";

                            $rs2 = $dbLib->execute($sql);                              
                            $tbody="";  
                            while ($row = $rs2->FetchNextObject(false)){
                                $tbody.="<tr>
                                            <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$box|$row->no_pdrk');\" >$row->no_pdrk</a></td>
                                            <td>$row->tgl</td>
                                            <td>$row->periode</td>
                                            <td>$row->kode_pp</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->tgl_input</td>
                                        </tr>";
                            }
                        break;
                    }
                  
                    if(substr($box,0,1) == "a"){
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-app'>
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
                    }else{
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
                    }
                   

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

            var table2 = $('#table-app').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
                'order': [[ 6, 'desc' ]]
                // 'columnDefs': [
                //     {
                //         'targets': [ 6 ],
                //         'visible': false,
                //         'searchable': false
                //     }
                // ]
				});
            table2.columns.adjust().draw();

             
			
			</script>
		";
        
		return "";
	}
	
}
?>
