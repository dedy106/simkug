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
class server_report_saku3_dash_rptDashSjuProdDet2 extends server_report_basic
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
        $no_bukti=$tmp[4];
        $key=$tmp[5];
        $param=$tmp[6];
        $print=$tmp[7];

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path . "image/yspt2.png";

        $sql = " select a.*, b.nama as nama_jsb, c.nama as nama_cust, c.alamat as alamat_cust,c.nama_ttd,c.jab_ttd  from sju_pesanan_m a inner join sju_jenis_sb b on a.id_jsb=b.id_jsb inner join sju_cust c on a.kode_cust=c.kode_cust where a.no_bukti='$no_bukti' and a.kode_lokasi='$kode_lokasi' ";

        $rs = $dbLib->execute($sql);  
        $detail = $rs->FetchNextObject($toupper=false);         

        $sts_print = ($print == 'print' ? TRUE : FALSE);
           
        if(!$sts_print){
            $sbmt=" ";
            if($detail->status == 0){
                $sbmt = "<a class='btn btn-primary btn-sm pull-right' href='/dbsju/Index/updProgSPP/$no_bukti'><i class='fa fa-floppy-o'></i> Submit</a>";
            }
            echo "
            <div class='row'>
                <div class='col-xs-12'>
                    <div class='box'>
                        <div class='box-header'>
                            <a class='btn btn-default pull-right' id='sju-to-monitor-back' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet','','$kode_lokasi/$periode/$jenis/$kunci');\"><i class='fa fa-ban'></i><p hidden>$key-$param</p>Back</a>
                            <a class='btn btn-primary btn-sm pull-right' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$jenis/$kunci/$no_bukti/all/1/print');\"><i class='fa fa-print'></i> Print</a>
                            
                            </div>
                        <div class='box-body'>";
            
        }

        echo"
        <div class='row'>
            <div class='col-xs-12'>
                <center>
                    <img src='/image/sju.jpg' style='height:200px; width:auto;'>
                    <h2>SURAT PERMOHONAN PENERBITAN JAMINAN</h2>
                </center>
            </div>
        </div>
        <div style='margin-left:40px;'>
            <div class='row'>
                <div class='col-xs-4'>
                    Jenis Surety Bond yang diminta oleh Prinsipal
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->nama_jsb
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Nilai Jaminan
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    <b>".number_format($detail->nilai_j,0,",",".")."</b>
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Nama Principal Kontraktor
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->nama_cust
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Nama PIC
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->nama_pic
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Email PIC
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->email_pic
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Alamat
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->alamat_cust
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Obligee
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->obligee
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Alamat Obligee
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->alamat_o
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Jenis Pekerjaan
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->pekerjaan
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Nilai Kontrak
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    ".number_format($detail->nilai_k,0,",",".")."
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Jangka Waktu Jaminan
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->jam_awal s.d $detail->jam_akhir
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Data Pendukung yang diserahkan
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>";

                $sql2 =" select a.*, b.nama as nama_dok from sju_pesanan_d a inner join sju_pekerjaan b on a.data_pendukung=b.id_pekerjaan where no_bukti='$no_bukti' and kode_lokasi='$kode_lokasi' ";

                $rs2 = $dbLib->execute($sql2);  
                $i=0;
                while ($row = $rs2->FetchNextObject(false)){
                    echo ($i == (count($row) - 1) ? $row->nama_dok : $row->nama_dok.", ");
                    $i++;
                }
               echo "
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    No. Surat Data Pendukung
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>";

                $sql3 =" select a.*, b.nama as nama_dok from sju_pesanan_d a inner join sju_pekerjaan b on a.data_pendukung=b.id_pekerjaan where no_bukti='$no_bukti' and kode_lokasi='$kode_lokasi' ";

                $rs3 = $dbLib->execute($sql3);  
                $x=0;
                while ($row = $rs3->FetchNextObject(false)){
                    echo ($x == (count($row) - 1) ? $row->no_data : $row->no_data."<br></br> ");
                    $x++;
                }
               echo "
                </div>
            </div>
            <div class='row'>
                <div class='col-xs-4'>
                    Catatan
                </div>
                <div class='col-xs-1'>
                    :
                </div>
                <div class='col-xs-7'>
                    $detail->catatan
                </div>
            </div>


            <div class='row'>
                <div class='col-xs-8'>
                </div>
                <div class='col-xs-4'>
                    <center>
                        Kontraktor / Principal
                        <br><br><br>
                        $detail->nama_ttd / $detail->jab_ttd
                    </center>
                </div>
            </div>
        </div>";

    if(!$sts_print){
        echo   "
        </div></div></div></div>
        ";
    }      

		return "";
	}
	
}
?>
