<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

	$server=$_SERVER['SERVER_NAME'];

    // echo $server;

    echo "
    <div id='dash_page_data_polis'>
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-header'>
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Polis</h3>
                    </div>
                    <div class='box-body'>
                        <div class='row'>
                            <div class='col-xs-12'>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-xs-12 table-responsive sai-container-overflow'>
                                <table class='table table-striped table-bordered' id='table-polis'>
                                    <thead>
                                        <tr>
                                            <th >No</th>
                                            <th >No Register</th>
                                            <th >No Polis</th>
                                            <th >COB</th>
                                            <th >Periode Polis</th>
                                            <th >Object Pertanggungan</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id='tgh-tbody'>";
                                    $sql="select a.no_polis,a.no_dok,a.kode_tipe,a.tgl_mulai,convert(varchar(10),a.tgl_mulai,103)+' - '+convert(varchar(10),a.tgl_selesai,103) as tgl,
                                            a.occup,a.objek,a.lokasi
                                            from sju_polis_m a
                                            inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
                                            where a.kode_cust='$nik'
                                            order by a.no_polis";
                                    $rs=execute($sql);
                                    $i=1;
                                    while($row = $rs->FetchNextObject($toupper=false)){
                                        
                                     echo"<tr>
                                            <td>$i</td>
                                            <td>$row->no_polis </td>
                                            <td>$row->no_dok </td>
                                            <td>$row->kode_tipe </td>
                                            <td>$row->tgl </td>
                                            <td>$row->objek </td>
                                            <td><a href='#' class='btn btn-success btn-sm'><i class='fa fa-eye'></i> Detail</a> &nbsp </td>
                                        </tr>";
                                        $i++;
                                    }
                                    echo"
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>
    </div>
       ";

    echo
    "<script text='javascript'>
    
    var table = $('#table-polis').DataTable({
        	// 'fixedHeader': true,
        	'scrollY': '280px',
        	// 'scrollX': '0px',
        	'scrollCollapse': true,
        	'order': [[ 0, 'asc' ]]
        	});
        table.columns.adjust().draw();
            
    </script>";
		
?>
