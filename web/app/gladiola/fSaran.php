<link rel="stylesheet" href="css/AdminLTE.min.css">
<div class="panel">
    <div class="panel-body">
        <div id='saiweb_container'>
            <form id='web_form_insert' method="POST">
            <div class='row'>
                <div class='col-xs-12'>
                <div class='box box-warning'>
                    <div class='box-body'>
                        <div class='row'>
                            <div class='form-group'>
                            <label class='control-label col-sm-3'>Nama</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <input type='text' name='nama' maxlength='200' class='form-control' placeholder="Masukkan Nama">
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                            <label class='control-label col-sm-3'>Email</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='email' maxlength='150' class='form-control' placeholder="Masukkan Email">
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Saran</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <textarea placeholder="Masukkan Saran"
                                    style="width: 100%; height: 150px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;" name='keterangan'></textarea>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                            <button type='submit' class='btn btn-success' style='margin-left:10px'><i class='fa fa-save'></i> Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </form>
        </div>
        <div class='row'>
            <div class='col-sm-12'><h4>Latest</h4></div>
        </div>
        <div class='row'>
            <div class="col-md-12">
                <ul class="timeline">
                <?php 
                    $sql="select distinct convert(varchar,a.tgl_input,103) as tanggal 
                    from lab_saran a
                    where a.kode_lokasi='$kode_lokasi'
                    order by convert(varchar,a.tgl_input,103) desc";
                    $rs=execute($sql);
                if($rs->RecordCount()>0){
                    while($row=$rs->FetchNextObject($toupper=false)){
                ?>
                    <li class="time-label">
                        <span class="bg-red">
                            <?php echo $row->tanggal; ?>
                        </span>
                    </li>
                    <?php 
                        $sql2="select nama,email,convert(varchar,tgl_input,114) as jam,keterangan from lab_saran where kode_lokasi='$kode_lokasi' and convert(varchar,tgl_input,103)='$row->tanggal' 
                        order by convert(varchar,tgl_input,114) desc ";
                        $rs2=execute($sql2);
                        while($row2=$rs2->FetchNextObject($toupper=false)){
                    ?>
                    <li>
                        <i class="fa fa-envelope bg-blue"></i>
                        <div class="timeline-item">
                            <span class="time"><i class="fa fa-clock-o"></i> <?php echo $row2->jam; ?></span>      <h3 class="timeline-header"><?php echo $row2->nama."-".$row2->email; ?></h3>
                            <div class="timeline-body">
                                 <?php echo $row2->keterangan; ?>
                            </div>
                            <div class="timeline-footer">
                            </div>
                        </div>
                    </li>
                <?php
                        }
                    } 
                } ?>
                    <li>
                        <i class="fa fa-clock-o bg-gray"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<script>
  $('#saiweb_container').on('submit', '#web_form_insert', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    for(var pair of formData.entries()) {
         console.log(pair[0]+ ', '+ pair[1]); 
        }

    var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
    formData.append('kode_lokasi', kode_lokasi);
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/gladiola/Gladiola.php&fx=simpanSaran',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                location.reload();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:'+textStatus);
        }
    });
  });
		
</script>

