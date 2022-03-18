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
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Dokumen Klaim</h3>
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
                                        $colum= array('No. Klaim', 'Tanggal', 'No. Polis','Keterangan','Jumlah','Action');
                                        for($i=0;$i<count($colum);$i++){
                                            echo"<th>".$colum[$i]."</th>";
                                        }
                                        echo"    
                                        </tr>
                                    </thead>
                                    <tbody id='tgh-tbody'>";

                                    $sql = "select a.no_klaim,a.tgl_dol,a.no_polis,a.keterangan,isnull(c.jumlah,0) as jumlah from sju_klaim a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                    left join (select no_klaim,kode_lokasi,count(no_klaim) as jumlah from sju_klaim_dok
                                    where kode_lokasi='$kode_lokasi' group by no_klaim,kode_lokasi
                                    )c on a.no_klaim=c.no_klaim and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and b.kode_cust='$nik' ";

                                    $rs=execute($sql);
                                    while ($row = $rs->FetchNextObject($toupper=false)) {
                                        echo"
                                        <tr>
                                            <td>$row->no_klaim</td>
                                            <td>$row->tgl_dol</td>
                                            <td>$row->no_polis</td>
                                            <td>$row->keterangan</td>
                                            <td>".number_format($row->jumlah,0,",",".")."</td>
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
