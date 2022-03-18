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
class server_report_saku3_dash_rptUploadExcel extends server_report_basic
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
             
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
      
		echo "
            <div id='nw_container'>
                <form id='nw_form_insert'>
                    <div class='row'>
                        <div class='col-xs-12'>
                            <div class='box'>
                                <div class='box-body'>
                                    <button type='submit' class='btn btn-success'><i class='fa fa-plus-circle'></i> Save</button>
                                </div>
                            </div>
                            <div class='box box-warning'>
                                <div class='box-body pad'>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>File</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input name='file_dok' type='file'>
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
             
                $('#nw_container').on('submit', '#nw_form_insert', function(e){
                    e.preventDefault();
                    // alert('test');
                    var formData = new FormData(this);

                    for(var pair of formData.entries()) {
                        console.log(pair[0]+ ', '+ pair[1]); 
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'UploadExcel.php?fx=simpan',
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
        ";
		return "";
	}
	
}
?>
