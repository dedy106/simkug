<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $tmp=explode("/",$_GET['param']);
    $no_bukti=$tmp[0];
    // $total_trans=$tmp[1];
    // $total_disk=$tmp[2];
    // $total_stlh=$tmp[3];
    // $total_byr=$tmp[4];
    // $kembalian=$tmp[5];

?><div class="box">
<div class="box-body">
                  <div class="row">
  <div class="col-xs-12">
      <h2 class="page-header">
        XXX, Inc
      </h2>
  </div>
<!-- /.col -->
</div>
    <!-- info row -->
    <div class="row invoice-info">
      <?php 
            $sql="select * from trans_m where no_bukti='$no_bukti' ";
            $rs=execute($sql);
            $row=$rs->FetchNextObject($toupper=false);
            $total_trans=$row->nilai1+$row->nilai3;
            $total_disk=$row->nilai3;
            $total_stlh=$row->nilai1;
            $total_byr=$row->nilai2;
            $kembalian=$row->nilai2-$row->nilai1;
      ?>
      <div class="col-sm-4 invoice-col pull-right">
        <b>No Register :</b><?php echo $row->no_bukti; ?><br>
        <b>User :</b> <?php echo $nik; ?><br>
        <b>Tanggal : </b> <?php echo date('Y-m-d H:i:s');?><br>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- Table row -->
    <div class="row">
      <div class="col-xs-12 table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Barang</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Disc</th>
            <th>Subtotal</th>
          </tr>
          </thead>
          <tbody>
          <?php 
            $sql="select a.kode_barang,a.harga,a.jumlah,a.diskon,b.nama from brg_trans_d a inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi where a.no_bukti='$no_bukti' and a.kode_lokasi='$kode_lokasi' ";
            $rs1=execute($sql);
            while($row1=$rs1->FetchNextObject($toupper=false)){
                $sub=($row1->harga*$row1->jumlah)-$row1->diskon;
            echo"<tr>
                    <td>".$row1->kode_barang." - ".$row1->nama."</td>
                    <td>".number_format($row1->harga,0,",",".")."</td>
                    <td>".number_format($row1->jumlah,0,",",".")."</td>
                    <td>".number_format($row1->diskon,0,",",".")."</td>
                    <td>".number_format($sub,0,",",".")."</td>
                </tr>";

            }            
          ?>          
          </tbody>
        </table>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="row">
      <!-- accepted payments column -->
      
      <!-- /.col -->
      <div class="col-xs-6 pull-right">
        <!-- <p class="lead">Tanggal <?php// echo date('Y-m-d'); ?></p> -->

        <div class="table-responsive">
          <table class="table">
            <tbody><tr>
              <th style="width:50%">Total Trans :</th>
              <td><?php echo number_format($total_trans,0,",","."); ?></td>
            </tr>
            <tr>
              <th>Total Diskon :</th>
              <td><?php echo number_format($total_disk,0,",","."); ?></td>
            </tr>
            <tr>
              <th>Total Set. Disc. :</th>
              <td><?php echo number_format($total_stlh,0,",","."); ?></td>
            </tr>
            <tr>
              <th>Total Bayar :</th>
              <td><?php echo number_format($total_byr,0,",","."); ?></td>
            </tr>
            <tr>
              <th>Kembalian :</th>
              <td><?php echo number_format($kembalian,0,",","."); ?></td>
            </tr>
          </tbody></table>
        </div>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- this row will not appear when printing -->
    <!-- <div class="row no-print">
      <div class="col-xs-12">
        <a href="printPreview.php?hal=app/kasir/fNota.php" target="_blank" class="btn btn-primary"><i class="fa fa-print"></i> Print</a>
        <a href="fMain.php?hal=app/kasir/fPos.php" class="btn btn-default"><i class="fa fa-arrow-left"></i> Close </a>
      </div>
    </div>  -->
    <?php
        if(ISSET($_GET['print']) OR ISSET($_GET['download'])){
          echo"";
        } else{
            echo "
                <div class='row'>
                    <div class='col-xs-12'>
                        <div class='box'>
                            <div class='box-body'>
                                <a href='printPreview.php?hal=app/kasir/fNota.php&param=$no_bukti&print=1' target='_blank' class='btn btn-primary pull-right'>
                                    <i class='fa fa-print'></i> Print
                                </a>";
                                if(ISSET($_GET['pnj'])){
                                  echo"<a href='fMain.php?hal=app/kasir/fPos.php' class='btn btn-default'><i class='fa fa-arrow-left'></i> Close </a>";
                                }
                                echo"
                            </div>
                        </div>
                    </div>
                </div>";
        }
    ?>
</div>
</div>