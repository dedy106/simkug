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
class server_report_saku3_dash_rptDashTarbak2 extends server_report_basic
{
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);

        
        $sql1="select count(*) as jum from amu_lahan";
        $resTanah = $dbLib->execute($sql1);
        $sql2="select count(*) as jum from amu_gedung";
        $resGedung = $dbLib->execute($sql1);
        $sql3="select count(*) as jum from amu_gedung";
        $resRecent = $dbLib->execute($sql3);
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        echo "
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

        
            body {
                font-family: 'Roboto', sans-serif !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
                font-weight: normal !important;
            }
            .judul-box{
                font-weight:bold;
                font-size:18px !important;
            }
            .inner{
                padding:5px !important;
            }

            .box-nil{
                margin-bottom: 20px !important;
            }
        </style>
		<div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            <div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'>";
                                
                echo"
                    <li>
                    <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'>
                    <i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-4' style='padding-left: 0px;padding-right: 0px;'>";
                                                
                                            
            echo"
                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
            
                $('.panel').on('click', '#btn-refresh', function(){
                    location.reload();
                });
            
                </script>
                ";
    
		return "";
	}
	
}
?>
