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
                        <h3 class='box-title'><i class='fa fa-inbox'></i> Data Tagihan</h3>
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
                                        <th >No Bill</th>
                                        <th >Jatuh Tempo</th>
                                        <th >No Register</th>
                                        <th >No Polis</th>
                                        <th >COB</th>
                                        <th >Nilai</th>
                                        <th >Status</th>
                                    </tr>
                                </thead>
                                    <tbody id='tgh-tbody'>";
                                    $sql="select a.no_bill,b.no_polis,b.no_dok,(a.premi*a.kurs)+a.kurs*(a.p_cost+a.materai-a.diskon) as nilai,
                                    convert(varchar(20),c.tanggal,103) as tgl_akru,convert(varchar(20),a.due_date,103) as due_date,
                                    b.kode_tipe,case when isnull(g.no_bukti,'-')<>'-' then 'Paid' else 'UnPaid' end as bayar
                                    from dbnewsju.dbo.sju_polis_termin a
                                    inner join dbnewsju.dbo.sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                    inner join dbnewsju.dbo.trans_m c on a.no_bill=c.no_bukti and a.kode_lokasi=c.kode_lokasi
                                    left join dbnewsju.dbo.sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
                                    where b.kode_cust='$nik'
                                    order by a.no_bill";
                                    $rs=execute($sql);
                                    $i=1;
                                    while($row = $rs->FetchNextObject($toupper=false)){
                                        
                                     echo"<tr>
                                            <td>$i</td>
                                            <td>$row->no_bill</td>
                                            <td>$row->due_date</td>
                                            <td>$row->no_dok</td>
                                            <td>$row->no_polis</td>
                                            <td>$row->kode_tipe</td>
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
