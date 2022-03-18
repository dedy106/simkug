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
class server_report_saku3_dash_rptDashTarbakDetail extends server_report_basic
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
        $kode_fs=$tmp[4];
        $jenis=$tmp[5];
        $kunci=$tmp[6];
        $tw=$tmp[7];
        $tahun=substr($periode,0,4);

        if ($tw=='tw1'){
            $filter=" a.periode in ('".$tahun."01','".$tahun."02','".$tahun."03') ";
        }else if ($tw=='tw2'){
            $filter=" a.periode in ('".$tahun."04','".$tahun."05','".$tahun."06') ";
        }else if ($tw=='tw3'){           
            $filter=" a.periode in ('".$tahun."07','".$tahun."08','".$tahun."09') ";
        }else if ($tw=='tw4'){  
            $filter=" a.periode in ('".$tahun."10','".$tahun."11','".$tahun."12') ";
        }

        // echo $kunci.$kode_lokasi;

        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail1','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
               echo"<div class='row'>
                        <div class='col-md-12 sai-container-overflow'>";
                        switch($kunci){
                            case "Tagihan" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-list-o'></i>
                                <h3 class='box-title'>Data $kunci</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-tag'>
                                    <thead>
                                        <tr>
                                            <th width='30' >No</th>
                                            <th width='100'>No Bukti</th>
                                            <th width='100'>NIS</th>
                                            <th width='100'>Nama</th>
                                            <th width='90' >Kelas</th>
                                            <th width='90' >Jurusan</th>
                                            <th width='300'>Keterangan</th>
                                            <th width='90' >Periode </th>
                                            <th width='90' >Nilai</th>
                                            <th width='90' >Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                                    $target=9;

                                    // $sql="select a.no_bill,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
                                    // isnull(b.total,0) as total
                                    // from sis_bill_m a
                                    // inner join (select a.nis,a.no_bill,a.kode_lokasi,
                                    //                 sum(a.nilai) as total
                                    //             from sis_bill_d a 
                                    //             where a.kode_lokasi='$kode_lokasi' and $filter
                                    //             group by a.nis,a.no_bill,a.kode_lokasi 
                                    //             )b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
                                    // inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                                    // inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
                                    // where a.kode_lokasi='$kode_lokasi' and $filter
                                    // order by c.kode_kelas,c.nis ";
                                    // echo $sql;

                                //     $rs = $dbLib->execute($sql);
                                //     $i=1;
                                //     while ($row = $rs->FetchNextObject($toupper=false))
                                //     {
                                        
                                // echo  "<tr>
                                //             <td >$i</td>
                                //             <td >";
                                //             echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|$row->no_bill|$row->nis');\">$row->no_bill</a>";
                                //     echo   "</td>      
                                //             <td >$row->nis</td> 
                                //             <td >$row->nama</td> 
                                //             <td >$row->kode_jur</td>
                                //             <td >$row->kode_kelas</td>                    
                                //             <td >$row->keterangan</td> 
                                //             <td >$row->periode</td> 
                                //             <td >".number_format($row->total,0,",",".")."</td> 
                                //         </tr>";
                                        
                                //         $i=$i+1;
                                //     }
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                            break;
                            case "Pbyr" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-list-o'></i>
                                <h3 class='box-title'>Data Pembayaran</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-pbyr'>
                                    <thead>
                                        <tr>
                                            <th width='30' >No</th>
                                            <th width='100'>No Bukti</th>
                                            <th width='100'>NIS</th>
                                            <th width='100'>Nama</th>
                                            <th width='90' >Kelas</th>
                                            <th width='90' >Jurusan</th>
                                            <th width='300'>Keterangan</th>
                                            <th width='90' >Periode </th>
                                            <th width='90' >Nilai</th>
                                            <th width='90' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                                    $target=9;

                                //     $sql="select a.no_kas as no_rekon,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
                                //     isnull(b.total,0) as total,a.kode_pp,isnull(b.pdd,0) as pdd
                                //     from kas_m a
                                //     inner join (select c.nis,a.no_rekon,c.kode_lokasi,
                                //                     sum(a.nilai) as total,0 as pdd
                                //                 from sis_rekon_d a 
                                //                 inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                                //                 where a.kode_lokasi='$kode_lokasi' and $filter
                                //                 group by c.nis,a.no_rekon,c.kode_lokasi
                                //                 union all
                                //                 select c.nis,a.no_bukti as no_rekon,c.kode_lokasi,
                                //                     sum(a.nilai) as total,sum(a.nilai) as pdd
                                //                 from sis_cd_d a 
                                //                 inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                                //                 where a.kode_lokasi='$kode_lokasi' and $filter  and a.dc='D'
                                //                 group by c.nis,a.no_bukti,c.kode_lokasi
                                //                 )b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                                //     inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi 
                                //     inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
                                //     where a.kode_lokasi='$kode_lokasi' and $filter
                                //     order by c.nis ";
                                //     // echo $sql;

                                //     $rs = $dbLib->execute($sql);
                                //     $i=1;
                                //     while ($row = $rs->FetchNextObject($toupper=false))
                                //     {
                                        
                                // echo  "<tr>
                                //             <td >$i</td>
                                //             <td >";
                                //             echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|$row->no_rekon|$row->nis');\">$row->no_rekon</a>";
                                //     echo   "</td> 
                                //             <th >$row->nis</th>       
                                //             <td >$row->nama</td> 
                                //             <td >$row->kode_jur</td>
                                //             <td >$row->kode_kelas</td>                    
                                //             <td >$row->keterangan</td> 
                                //             <td >$row->periode</td> 
                                //             <td >".number_format($row->total,0,",",".")."</td> 
                                //         </tr>";
                                        
                                //         $i=$i+1;
                                //     }
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                            break;
                            case "Pbyr2" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-list-o'></i>
                                <h3 class='box-title'>Data Pembayaran Tahun Lalu</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-pbyr'>
                                    <thead>
                                        <tr>
                                            <th width='30' >No</th>
                                            <th width='100'>No Bukti</th>
                                            <th width='100'>NIS</th>
                                            <th width='100'>Nama</th>
                                            <th width='90' >Kelas</th>
                                            <th width='90' >Jurusan</th>
                                            <th width='300'>Keterangan</th>
                                            <th width='90' >Periode </th>
                                            <th width='90' >Nilai</th>
                                            <th width='90' >Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                                    $target=9;
                                //     $tahunLalu= intval(substr($periode,0,4)-1);

                                //     if ($tw=='tw1'){
                                //         $filter=" a.periode in ('".$tahunLalu."01','".$tahunLalu."02','".$tahunLalu."03') ";
                                //     }else if ($tw=='tw2'){
                                //         $filter=" a.periode in ('".$tahunLalu."04','".$tahunLalu."05','".$tahunLalu."06') ";
                                //     }else if ($tw=='tw3'){           
                                //         $filter=" a.periode in ('".$tahunLalu."07','".$tahunLalu."08','".$tahunLalu."09') ";
                                //     }else if ($tw=='tw4'){  
                                //         $filter=" a.periode in ('".$tahunLalu."10','".$tahunLalu."11','".$tahunLalu."12') ";
                                //     }

                                //     $sql="select a.no_kas as no_rekon,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
                                //     isnull(b.total,0) as total,a.kode_pp,isnull(b.pdd,0) as pdd
                                //     from kas_m a
                                //     inner join (select c.nis,a.no_rekon,c.kode_lokasi,
                                //                     sum(a.nilai) as total,0 as pdd
                                //                 from sis_rekon_d a 
                                //                 inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                                //                 where a.kode_lokasi='$kode_lokasi' and $filter
                                //                 group by c.nis,a.no_rekon,c.kode_lokasi
                                //                 union all
                                //                 select c.nis,a.no_bukti as no_rekon,c.kode_lokasi,
                                //                     sum(a.nilai) as total,sum(a.nilai) as pdd
                                //                 from sis_cd_d a 
                                //                 inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                                //                 where a.kode_lokasi='$kode_lokasi' and $filter  and a.dc='D'
                                //                 group by c.nis,a.no_bukti,c.kode_lokasi
                                //                 )b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                                //     inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi 
                                //     inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
                                //     where a.kode_lokasi='$kode_lokasi' and $filter
                                //     order by c.nis ";
                                //     echo $sql;

                                //     $rs = $dbLib->execute($sql);
                                //     $i=1;
                                //     while ($row = $rs->FetchNextObject($toupper=false))
                                //     {
                                        
                                // echo  "<tr>
                                //             <td >$i</td>
                                //             <td >";
                                //             echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|$row->no_rekon|$row->nis');\">$row->no_rekon</a>";
                                //     echo   "</td> 
                                //             <th >$row->nis</th>       
                                //             <td >$row->nama</td> 
                                //             <td >$row->kode_jur</td>
                                //             <td >$row->kode_kelas</td>                    
                                //             <td >$row->keterangan</td> 
                                //             <td >$row->periode</td> 
                                //             <td >".number_format($row->total,0,",",".")."</td> 
                                //         </tr>";
                                        
                                //         $i=$i+1;
                                //     }
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                            break;
                            case "Tunggak" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-list-o'></i>
                                <h3 class='box-title'>Data Tunggakan</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='tableini4'>
                                    <thead>
                                        <tr>
                                            <th width='30' >No</th>
                                            <th width='100'>NIS</th>
                                            <th width='100'>Nama</th>
                                            <th width='90' >Kelas</th>
                                            <th width='90' >Jurusan</th>
                                            <th width='90' >Saldo Awal</th>
                                            <th width='90' >Debet</th>
                                            <th width='90' >Kredit</th>
                                            <th width='90' >Saldo Akhir</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                //     $sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,a.kode_akt
                                //     ,isnull(b.total,0)-isnull(d.total,0) as saw_total
                                //     ,isnull(c.total,0) as debet_total
                                //     ,isnull(e.total,0) as kredit_total
                                //     ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,
                                //     a.kode_kelas,f.kode_jur,f.nama as nama_jur
                                //     from sis_siswa a 
                                //     inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
                                //     inner join sis_jur g on f.kode_jur=g.kode_jur and f.kode_lokasi=g.kode_lokasi and f.kode_pp=g.kode_pp
                                //     left join (select y.nis,y.kode_lokasi,  
                                //                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total	
                                //                from sis_bill_d x
                                //                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                //                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 
                                //                group by y.nis,y.kode_lokasi 			
                                //                )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
                                //     left join (select y.nis,y.kode_lokasi, 
                                //                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                //                from sis_bill_d x 
                                //                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                //                where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') 
                                //                group by y.nis,y.kode_lokasi 			
                                //                 )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
                                //     left join (select y.nis,y.kode_lokasi,
                                //                 sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                                //                 from sis_rekon_d x 	
                                //                 inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                //                 where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')		
                                //                 group by y.nis,y.kode_lokasi 			
                                //                 )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
                                //     left join (select y.nis,y.kode_lokasi,
                                //                 sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                                //                 from sis_rekon_d x 			
                                //                 inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                //                 where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') 			
                                //                 group by y.nis,y.kode_lokasi 			
                                //                 )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
                                //     where a.kode_lokasi='$kode_lokasi'
                                //     order by a.kode_kelas,a.nis ";
                                //     // echo $sql;

                                //     $rs = $dbLib->execute($sql);
                                //     $i=1;
                                //     while ($row = $rs->FetchNextObject($toupper=false))
                                //     {
                                        
                                // echo  "<tr>
                                //             <td >$i</td>
                                //             <td >";
                                //             echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$nik|$kode_pp|$kode_fs|$jenis|$kunci|$row->nis');\">$row->nis</a>";
                                //     echo   "</td>        
                                //             <td >$row->nama</td> 
                                //             <td >$row->kode_jur</td>
                                //             <td >$row->kode_kelas</td>  
                                //             <td >".number_format($row->saw_total,0,",",".")."</td> 
                                //             <td >".number_format($row->debet_total,0,",",".")."</td> 
                                //             <td >".number_format($row->kredit_total,0,",",".")."</td> 
                                //             <td >".number_format($row->sak_total,0,",",".")."</td> 
                                //         </tr>";
                                        
                                //         $i=$i+1;
                                //     }
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                            break;
                        }
                    echo"</div>
                    </div>";             
        echo"   </div>
              </div>";
        
        
    
        echo "<script type='text/javascript'>
            
            var action_html = \"<a class='btn btn-primary btn-sm dt-view' type='button'><i class='fa fa-eye'></i></a>\";

            var table_ini = $('#table-tag').DataTable({
				    'scrollY': '260px',
                    'processing': true,
                    'serverSide': true,
                    'ajax': {
                        'url': 'dashTarbak.php?fx=dataTableServerSide3',
                        'data': {kunci:'".$kunci."', kode_lokasi:'".$kode_lokasi."',periode:'".$periode."',tw:'".$tw."'},
                        'type': 'POST',
                        'dataSrc' : function(json) {
                            return json.data;
                        }
                    },
                    'columnDefs': [
                        {'targets': 9, data: null, 'defaultContent': action_html }
                    ],
                    'iDisplayLength': 25,
                    'lengthChange': false
				});
            table_ini.columns.adjust().draw(); 
            
            $('#table-tag').on( 'click', \"a[class*='dt-view'],a[class*='delTableRow'],a[class*='viewTableRow']\", function (e) {
                e.preventDefault();
    
                var data =  table_ini.row(table_ini.row($(this).closest('tr')).index()).data();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$jenis|$kunci|'+data[0]);
                
            }); 

            var table_pb = $('#table-pbyr').DataTable({
                'scrollY': '260px',
                'processing': true,
                'serverSide': true,
                'ajax': {
                    'url': 'dashTarbak.php?fx=dataTableServerSide2',
                    'data': {kunci:'".$kunci."', kode_lokasi:'".$kode_lokasi."',periode:'".$periode."',tw:'".$tw."'},
                    'type': 'POST',
                    'dataSrc' : function(json) {
                        return json.data;
                    }
                },
                'columnDefs': [
                    {'targets': 9, data: null, 'defaultContent': action_html }
                ],
                'iDisplayLength': 25,
                'lengthChange': false
            });
            table_pb.columns.adjust().draw(); 
            
            $('#table-pbyr').on( 'click', \"a[class*='dt-view'],a[class*='delTableRow'],a[class*='viewTableRow']\", function (e) {
                e.preventDefault();

                var data =  table_pb.row(table_pb.row($(this).closest('tr')).index()).data();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$jenis|$kunci|'+data[0]);
                
            });       

			</script>
 	    ";

        
		return "";
	}
	
}
?>
