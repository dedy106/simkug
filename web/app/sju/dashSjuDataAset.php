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
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Aset</h3>
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
                                            <th >Lokasi</th>
                                            <th >COB</th>
                                            <th >ASET</th>
                                            <th >Keterangan</th>
                                            <th >Tahun Buku</th>
                                            <th >Nilai Pertanggungan</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id='tgh-tbody'>";
                                    $sql="select lokasi,cob,aset,keterangan,lokasi2,nilai,tahun from sju_aset where kode_cust='$nik' 
                                          order by lokasi";
                                    $rs=execute($sql);
                                    $i=1;
                                    while($row = $rs->FetchNextObject($toupper=false)){
                                        
                                     echo"<tr>
                                            <td>$row->lokasi</td>
                                            <td>$row->cob</td>
                                            <td>$row->aset</td>
                                            <td>$row->keterangan</td>
                                            <td>$row->tahun</td>
                                            <td>".number_format($row->nilai,0,",",".")."</td>
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
