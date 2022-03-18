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
class server_report_saku3_dash_rptDashDiktiDet2 extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $nik=$tmp[2];
        $kode_pp=$tmp[3];
        $jenis=$tmp[4];
        $kunci=$tmp[5];
        $nama=$tmp[6];
        $param=$tmp[7];
        $key=$tmp[8];
        $kode_fs=$tmp[9];

        // echo $param . " " .$key;

        if(!empty($tmp[9])){
            if($tmp[9] == "excel"){
                header("Pragma: public");
                header("Expires: 0");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
                header("Content-Type: application/force-download");
                header("Content-Type: application/octet-stream");
                header("Content-Type: application/download");;
                header("Content-Disposition: attachment;filename=doc1.xls"); 
                header("Content-Transfer-Encoding: binary ");
            }
        }
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading' id='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet','','$kode_lokasi|$periode|$jenis|$kunci|$kode_pp|$nik|$nama|$kode_fs');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
               echo"<div class='row'>
                        <div class='col-md-12 sai-container-overflow'>";
                        switch($param){
                            case "NrcKas" :
                            echo"
                            <div class='box-header with-border' id='batas_print'>
                                <i class='fa fa-balance-scale'></i>
                                <h3 class='box-title'>Neraca Lajur</h3>
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-nrcL'>
                                    <thead>
                                        <tr>
                                            <th width='30'  >No</th>
                                            <th width='100'   >Kode Akun</th>
                                            <th width='300'   >Nama Akun</th>
                                            <th width='90'  >Saldo Awal </th>
                                            <th width='90' >Debet</th>
                                            <th width='90' >Kredit</th>
                                            <th width='90' >Saldo Akhir </th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                                    
                                    // echo $sql;
                                    echo "<br>";
 
                                    // $rs = $dbLib->execute($sql);
                                    // $sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
                                    // case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
                                    // case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
                                    // case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
                                    // case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
                                    // from glma_tmp a where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_akun='$key' and a.nik_user='$nik' 
                                    // order by a.kode_akun";

                                    $sql="select a.kode_akun,c.nama as nama_akun,a.so_awal,a.debet,a.kredit,a.so_akhir
                                    from exs_glma a
                                    inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs' and a.kode_akun='$key' and a.periode='$periode'  ";
                                    
                                    $rs2 = $dbLib->execute($sql);

                                    $so_awal=0;
                                    $debet=0;
                                    $kredit=0;
                                    $so_akhir=0;
                                    $i=1;
                                    while ($row = $rs2->FetchNextObject($toupper=false))
                                    {
                                        $so_awal=$so_awal+$row->so_awal;
                                        $debet=$debet+$row->debet;
                                        $kredit=$kredit+$row->kredit;
                                        $so_akhir=$so_akhir + $row->so_akhir;
                                 echo  "<tr>
                                            <td  >$i</td>
                                            <td  >$row->kode_akun</td>
                                            <td height='20' >";
                                            echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet3','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$row->kode_akun|$kode_fs');\">$row->nama_akun</a>";
                                    echo   "</td>                            
                                            <td  align='right'>".number_format($row->so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->so_akhir,0,',','.')."</td>
                                        </tr>";
                                        
                                        $i=$i+1;
                                    }
                                
                                    echo "<tr>
                                            <td height='20' colspan='3'  align='right'><b>Total</b></td>
                                            <td  align='right'>".number_format($so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format(abs($so_akhir),0,',','.')."</td>
                                        </tr>";
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                        break;
                        case "NrcL" :
                            echo"
                            <div class='box-header with-border'>
                                <i class='fa fa-balance-scale'></i>
                                <h3 class='box-title' style='margin-left: 10px;'>Neraca Lajur</h3>
                                <!-- <span class='pull-right'><a class='btn btn-primary' id='exs-to-xls'>
                                Export to Excel</a></span> -->
                            </div>
                            <div class='box-body'>
                                <div>
                                <table class='table table-striped' id='table-nrcB'>
                                    <thead>
                                        <tr>
                                            <th width='30'>No</th>
                                            <th width='100'>Kode Akun</th>
                                            <th width='300'>Nama Akun</th>
                                            <th width='90' >Saldo Awal </th>
                                            <th width='90' >Debet</th>
                                            <th width='90' >Kredit</th>
                                            <th width='90' >Saldo Akhir </th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>";

                                    $sql="select tipe from exs_neraca_pp where kode_lokasi='$kode_lokasi'  and kode_neraca='$key' and kode_fs='$kode_fs' ";

                                    $rs = $dbLib->execute($sql);

                                    $row1 = $rs->FetchNextObject($toupper=false);

                                    if($row1->tipe == 'Posting'){
                                        $sql="select a.kode_akun,c.nama as nama_akun,a.so_awal,a.debet,a.kredit,a.so_akhir
                                        from exs_glma a
                                        inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                        inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                        where a.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs' and b.kode_neraca='$key' and a.periode='$periode'  ";
                                        
                                    }else{
                                        $sql="select a.kode_akun,b.nama as nama_akun,a.so_awal,a.debet,a.kredit,a.so_akhir
                                        from exs_glma a
                                        inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                        where a.kode_akun in (
                                                        select distinct b.kode_akun
                                                        from exs_neraca_pp a 
                                                        inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
                                                        where a.periode='$periode' and a.kode_lokasi='$kode_lokasi'  and a.kode_induk='$key' and a.tipe='Posting' 
                                                        and b.kode_fs='$kode_fs')
                                        and a.periode='$periode' and a.kode_lokasi='$kode_lokasi'  ";
                                    }

                                    $rs2 = $dbLib->execute($sql);

                                    $so_awal=0;
                                    $debet=0;
                                    $kredit=0;
                                    $so_akhir=0;
                                    $i=1;
                                    while ($row = $rs2->FetchNextObject($toupper=false))
                                    {
                                        $so_awal=$so_awal+$row->so_awal;
                                        $debet=$debet+$row->debet;
                                        $kredit=$kredit+$row->kredit;
                                        $so_akhir=$so_akhir + $row->so_akhir;
                                 echo  "<tr>
                                            <td  >$i</td>
                                            <td >$row->kode_akun</td>
                                            <td height='20' >";
                                            echo "<a style='cursor:pointer;color:blue'   onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet3','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$row->kode_akun|$kode_fs');\">$row->nama_akun</a>";
                                    echo   "</td>                            
                                            <td  align='right'>".number_format($row->so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format($row->so_akhir,0,',','.')."</td>
                                        </tr>";
                                        
                                        $i=$i+1;
                                    }
                                
                                    echo "<tr>
                                            <td height='20' colspan='3'  align='right'><b>Total</b></td>
                                            <td  align='right'>".number_format($so_awal,0,',','.')."</td>
                                            <td  align='right'>".number_format($debet,0,',','.')."</td>
                                            <td  align='right'>".number_format($kredit,0,',','.')."</td>
                                            <td  align='right'>".number_format($so_akhir,0,',','.')."</td>
                                        </tr>";
                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                        break;
                    }
                    echo"</div>
                    </div>";                
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>

            $('#exs-to-xls').hide();
            $('#exs-to-xls').click(function(){
                // alert('hello');
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashBangDiktiDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|excel');

               
            });
        </script>
        ";
        
		return "";
	}
	
}
?>
