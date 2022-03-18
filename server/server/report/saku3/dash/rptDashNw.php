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
class server_report_saku3_dash_rptDashNw extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        
        $sqlSis = "select * from lab_form";
        $rs = $dbLib->execute($sqlSis);        
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        // $daftar = array();
        $daftar_str = '';
        while($row = $rs->FetchNextObject($toupper = false)){
            // $daftar[] = (array)$row;
            $daftar_str .= "
                <tr>
                    <td>".$row->kode_form."</td>
                    <td>".$row->nama."</td>
                    <td>".$row->id_form."</td>
                    <td>
                        <a href='#' class='btn btn-warning btn-sm nw_datatable_edit'><i class='fa fa-pencil'></i> Edit</a> &nbsp;
                        <a href='#' class='btn btn-danger btn-sm nw_datatable_del'><i class='fa fa-trash'></i> Hapus</a>
                    </td>
                </tr>";
        }

		echo "
            <div id='nw_container'>
                <div id='nw_datatable'>
                    <div class='row'>
                        <div class='col-xs-12'>
                            <div class='box'>
                                <div class='box-header'>
                                    <a class='btn btn-success pull-right nw_datatable_insert'><i class='fa fa-plus-circle'></i> Insert</a>
                                </div>
                                <div class='box-body sai-container-overflow-x'>
                                    <table class='table table-bordered table-striped DataTable'>
                                        <thead>
                                            <tr>
                                                <th>Kode Form</th>
                                                <th>Nama</th>
                                                <th>ID / Path</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            $daftar_str
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form id='nw_form_insert' hidden>
                    <div class='row'>
                        <div class='col-xs-12'>
                            <div class='box'>
                                <div class='box-body'>
                                    <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                    <a class='btn btn-default pull-right btn-form-exit'><i class='fa fa-rotate-left'></i> Back</a>
                                </div>
                            </div>
                            <div class='box box-warning'>
                                <div class='box-body pad'>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Kode Form</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' name='kode_form' class='form-control'>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Nama</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' name='nama' class='form-control'>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>ID Form/Path</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' name='id_form' class='form-control'>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Test Select</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                
                                                <select class='form-control selectize'>";
        
        $rs2 = $dbLib->Execute("select kode_form, nama from lab_form");
        while($row = $rs2->FetchNextObject($toupper = false)){
            echo "<option value='".$row->kode_form."'>".$row->kode_form." - ".$row->nama."</option>";
        }
                            
                            echo "              </select>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form id='nw_form_edit' hidden>
                    <div class='row'>
                        <div class='col-xs-12'>
                            <div class='box'>
                                <div class='box-body'>
                                    <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                    <a class='btn btn-default pull-right btn-form-exit'><i class='fa fa-rotate-left'></i> Back</a>
                                </div>
                            </div>
                            <div class='box box-warning'>
                                <div class='box-body pad'>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Kode Form</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' id='nw_form_edit_kode_form' name='kode_form' class='form-control' readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Nama</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' id='nw_form_edit_nama' name='nama' class='form-control'>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>ID Form/Path</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                                <input type='text' id='nw_form_edit_id_form' name='id_form' class='form-control'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>";

        echo "
            <script type='text/javascript'>
                $('.DataTable').DataTable();

                $('#nw_container').on('click', '.nw_datatable_edit', function(){
                    // getset value
                    var kode = $(this).closest('tr').find('td:eq(0)').text();
                    var nama = $(this).closest('tr').find('td:eq(1)').text();
                    var id = $(this).closest('tr').find('td:eq(2)').text();

                    // alert(kode);

                    $('#nw_form_edit_kode_form').val(kode);
                    $('#nw_form_edit_nama').val(nama);
                    $('#nw_form_edit_id_form').val(id);

                    $('#nw_datatable').hide();
                    $('#nw_form_edit').show();
                });

                $('#nw_container').on('click', '.nw_datatable_insert', function(){
                    $('#nw_datatable').hide();
                    $('#nw_form_insert').show();
                });

                $('#nw_container').on('click', '.btn-form-exit', function(){
                    var id = $(this).closest('form').attr('id');
                    $('#'+id).hide();
                    $('#nw_datatable').show();
                });

                $('#nw_container').on('submit', '#nw_form_insert', function(e){
                    e.preventDefault();
                    // alert('test');
                    var formData = new FormData(this);

                    for(var pair of formData.entries()) {
                        console.log(pair[0]+ ', '+ pair[1]); 
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'CrudNw.php?fx=simpan',
                        dataType: 'json',
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false, 
                        success:function(result){
                            alert('Input data '+result.message);

                            if(result.status){
                                location.reload();
                                // window.parent.system.getResource(1118).doOpen('server_report_saku3_uin_vDetailDok','','23/2019/KUG/JD006/if(3).xml/23-19.00002/RAB/uin');
                            }
                        },
                        fail: function(xhr, textStatus, errorThrown){
                           alert('request failed:'+textStatus);
                        }
                    });
                });
                
                $('#nw_container').on('submit', '#nw_form_edit', function(e){
                    e.preventDefault();
                    // alert('test');
                    var formData = new FormData(this);

                    for(var pair of formData.entries()) {
                        console.log(pair[0]+ ', '+ pair[1]); 
                    }

                    
                    $.ajax({
                        type: 'POST',
                        url: 'CrudNw.php?fx=ubah',
                        dataType: 'json',
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false, 
                        success:function(result){
                            alert('Update data '+result.message);

                            if(result.status){
                                location.reload();
                                // window.parent.system.getResource(1118).doOpen('server_report_saku3_uin_vDetailDok','','23/2019/KUG/JD006/if(3).xml/23-19.00002/RAB/uin');
                            }
                        }
                    });
                });

                $('#nw_container').on('click', '.nw_datatable_del', function(){

                    if(confirm('Apakah anda ingin menghapus data ini?')){
                        var kode = $(this).closest('tr').find('td:eq(0)').text();
                        var nama = $(this).closest('tr').find('td:eq(1)').text();
                        var id = $(this).closest('tr').find('td:eq(2)').text();
                        
                        $.ajax({
                            type: 'POST',
                            url: 'CrudNw.php?fx=hapus',
                            dataType: 'json',
                            data: {'kode_form':kode, 'nama':nama, 'id_form':id},
                            success:function(result){
                                alert('Penghapusan data '+result.message);
    
                                if(result.status){
                                    location.reload();
                                    // window.parent.system.getResource(1118).doOpen('server_report_saku3_uin_vDetailDok','','23/2019/KUG/JD006/if(3).xml/23-19.00002/RAB/uin');
                                }
                            }
                        });
                    }else{
                        return false;
                    }
                    
                });
            </script>
        ";
		return "";
	}
	
}
?>
