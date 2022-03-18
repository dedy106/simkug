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
class server_report_saku3_dash_rptDashService extends server_report_basic
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
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['userPwd'] = "saisai";
        $_SESSION['lokasi'] = "11";
        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/crm";
        echo "
        <h3>TESTING service</h3>
        <p id='testSer'></p>
        <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Kode Proses</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select name='kode_proses' id='web_form_edit_kode_proses' class='form-control selectize' >
                      <option value='' disabled>Pilih Kode Proses</option>
                      </select>
                     </div>
                </div>
              </div>
        <script>
        function getProses(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/Dok.php?fx=getProses',
                dataType: 'json',
                data: {},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#web_form_edit_kode_proses')[0].selectize.addOption([{text:result.daftar[i].kode_proses + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_proses}]); 
                            }
                        }                        
                    }
                }
            });
        }

        getProses();
        </script>
        ";
    
		return "";
	}
	
}
?>
