<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

	$server=$_SERVER['SERVER_NAME'];

    echo "
    <div id='dash_page_data_klaim'>
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-header'>
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Klaim</h3>
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
                                        <tr>";
                                        $colum= array('No. Klaim', 'Tanggal', 'No. Polis','Keterangan','Lokasi','Nilai','Progress','Action');
                                        for($i=0;$i<count($colum);$i++){
                                            echo"<th>".$colum[$i]."</th>";
                                        }
                                        echo"    
                                        </tr>
                                    </thead>
                                    <tbody id='tgh-tbody'>";
                                    $sql="select a.no_klaim,a.tgl_dol,a.no_polis,a.keterangan,a.lokasi,a.nilai,a.progress 
                                    from dbnewsju.dbo.sju_klaim a 
                                    inner join dbnewsju.dbo.sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and b.kode_cust='$nik' ";
                                    $rs=execute($sql);
                                    while ($row = $rs->FetchNextObject($toupper=false)) {
                                        echo"
                                        <tr>
                                            <td>$row->no_klaim</td>
                                            <td>$row->tgl_dol</td>
                                            <td>$row->no_polis</td>
                                            <td>$row->keterangan</td>
                                            <td>$row->lokasi</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
                                            <td>$row->progress</td>
                                            <td><a href='#' class='btn btn-success btn-sm'><i class='fa fa-eye'></i> Detail</a> &nbsp </td>
                                        </tr>
                                        ";
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
