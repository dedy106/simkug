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
class server_report_saku3_dash_rptDashTelSisDet extends server_report_basic
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
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];

        echo $kunci;
        echo "<br/>";
        echo $kode_lokasi;
       
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        

        // $path = $_SERVER["SCRIPT_NAME"];				
        // $path = substr($path,0,strpos($path,"server/serverApp.php"));		
    //     $path = "image/yspt.png";

    //     echo $path;
    //     echo "<br>";

	// 	echo "<div class='panel'>
	// 			<div class='panel-body'>
	// 			<div class='panel-heading'>
	// 				<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSis','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
	// 			</div>";
		
    //     echo"
    //             <div id='sai_home_grafik'>";
    //     if($kunci == "Receipt"){
    //         echo "
    //     <div class='row'>
    //         <div class='col-md-12'>
    //             <div class='box box-success box-solid'>
    //                 <div class='box-header with-border' style='height:60px;'>
    //                     <h3 class='box-title'>
    //                         Pembayaran Siswa
    //                     </h3>
    //                     <div class='box-tools pull-right' style='padding-top:10px;padding-right:10px;text-align:center'>
    //                         <img scr='$path' width='30' height='40'>
    //                     </div>
    //                 </div>
    //                 <div class='box-body'>
    //                 Nama <br>
    //                 <span style='font-size:25px'><b>RANGGA AZHAR FAUZAN</b></span>
    //                 <br/>
    //                 No. Virtual Account
    //                 <br/>
                   
    //                 <table border='0' width='100%' >
    //                     <tr>
    //                         <td colspan='3'> Rincian Alokasi Pembayaran</td>
    //                     </tr>
    //                     <tr>
    //                         <td align='right'><i>Deposit</i></td>
    //                         <td>&nbsp;</td>
    //                         <td>Rp. 0</td>
    //                     </tr>
    //                     <tr>
    //                         <th> Periode</th>
    //                         <th> Parameter</th>
    //                         <th> Nilai Bayar</th>
    //                     </tr>
    //                 </table>                    
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
            
            
            
            
    //         ";
    //     }else if($kunci == "Invoice"){
    //         echo "";
    //     }
        
    //   }                   
    //         echo"    </div>
    //             </div>
    //             </div>
    //         </div>";
    
    //     echo "<script type='text/javascript'>

	// 		 </script>";

        
		return "";
	}
	
}
?>
