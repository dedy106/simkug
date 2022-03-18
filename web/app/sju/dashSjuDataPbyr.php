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
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Pembayaran</h3>
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
                                            <th >No.</th>
                                            <th >No Bukti</th>
                                            <th >Tanggal</th>
                                            <th >No Bill</th>
                                            <th >No Register</th>
                                            <th >No Polis</th>
                                            <th >Nilai</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id='tgh-tbody'>";
                                    $sql="select l.no_bukti,convert(varchar(20),l.tanggal,103) as tgl,a.no_bill,b.no_polis,b.no_dok,l.nilai1
                                    from dbnewsju.dbo.sju_polis_termin a
                                    inner join dbnewsju.dbo.sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                    inner join dbnewsju.dbo.sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
                                    inner join dbnewsju.dbo.trans_m l on g.no_bukti=l.no_bukti and g.kode_lokasi=l.kode_lokasi
                                    where b.kode_cust='$nik'
                                    order by l.no_bukti";
                                    $rs=execute($sql);
                                    $i=1;
                                    while($row = $rs->FetchNextObject($toupper=false)){
                                        
                                     echo"<tr>
                                            <td>$i</td>
                                            <td>$row->no_bukti</td>
                                            <td>$row->tgl</td>
                                            <td>$row->no_bill</td>
                                            <td>$row->no_polis</td>
                                            <td>$row->no_dok</td>
                                            <td>".number_format($row->nilai1,0,",",".")."</td>
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
