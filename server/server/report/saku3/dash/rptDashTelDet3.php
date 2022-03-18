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
class server_report_saku3_dash_rptDashTelDet3 extends server_report_basic
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
        $key2=$tmp[9]; 
        $kode_fs=$tmp[10];
        
        // echo $key." ".$key2;

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$kode_fs');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>
                    <div class='col-md-12'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Buku Besar</h3>
                        </div>
                        <div class='box-body'>";
                        echo"<div class='row invoice-info'>";

                                if($tmp[11] == "semua"){
                                    $sql="select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit from exs_glma_pp a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi  where a.kode_lokasi='$kode_lokasi' and a.periode='".substr($periode,0,4)."01' and a.kode_akun='$key2' and a.kode_pp='$kode_pp' order by a.kode_akun";
                                    $per= substr($periode,0,4)."01 s.d ".$periode;
                                }else{

                                    $sql="select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit from exs_glma_pp a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi  where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_akun='$key2' and a.kode_pp='$kode_pp' order by a.kode_akun";
                                    $per=$periode;
                                }
                                // scecho $sql;

                                $rs=$dbLib->execute($sql);
                                $row = $rs->FetchNextObject($toupper=false);
                                echo"
                                    <div class='col-sm-2 invoice-col'>
                                        <address>
                                            <strong>
                                            Kode Akun
                                            </strong>
                                            <br>
                                            Nama Akun
                                            <br>
                                            Periode
                                        </address>
                                    </div>
                                    <div class='col-sm-4 invoice-col'>
                                        <address>
                                            <strong>
                                            $row->kode_akun 
                                            </strong>
                                            <br>
                                            $row->nama
                                            <br>
                                            $per
                                        </address>
                                    </div>
                            </div> 
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                    <table class='table table-striped' id='table-BB'>
                                        <thead>
                                            <tr>
                                                <td><a class='btn btn-primary' id='btnTampil' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet3','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$key2|$kode_fs|semua');\">Tampil Semua</a></td>
                                                <td height='23' colspan='6' class='header_laporan' align='right'><b>Saldo Awal<b> </td>
                                                <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
                                            </tr>
                                            <tr>
                                                <th width='100' height='23' >No Bukti</th>
                                                <th width='80' height='23' >No Dokumen</th>
                                                <th width='60' >Tanggal</th>
                                                <th width='250' >Keterangan</th>
                                                <th width='60' >Kode PP</th>
                                                <th width='90' >Debet</th>
                                                <th width='90' >Kredit</th>
                                                <th width='90' >Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>";

                                        if($tmp[11] == "semua"){
                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode' and a.kode_pp='$kode_pp'
                                            union all 
                                            select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen
                                            from gldt_h a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode between '".substr($periode,0,4)."01' and '$periode' and a.kode_pp='$kode_pp' ";
                                        }else{

                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode' and a.kode_pp='$kode_pp'
                                            order by a.tanggal,a.no_bukti,a.dc";

                                        }


                                        $rs1 = $dbLib->execute($sql);

                                        $saldo=$row->so_awal;
                                        $debet=0;
                                        $kredit=0;

                                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                                        {
                                            $saldo=$saldo + $row1->debet - $row1->kredit;	
                                            $debet=$debet+$row1->debet;
                                            $kredit=$kredit+$row1->kredit;	
                                            echo "<tr><td valign='top' >";
                                            echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDet4','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$key2|$row1->no_bukti|$kode_fs');\">$row1->no_bukti</a>";
                                            echo "</td>
                                                <td valign='top' >".$row1->no_dokumen."</td>
                                                <td height='23' valign='top' >".$row1->tgl."</td>
                                                <td valign='top' >".$row1->keterangan."</td>
                                                <td valign='top'  >".$row1->kode_pp."</td>
                                                <td valign='top'  align='right'>".number_format($row1->debet,0,',','.')."</td>
                                                <td valign='top'  align='right'>".number_format($row1->kredit,0,',','.')."</td>
                                                <td valign='top'  align='right'>".number_format($saldo,0,',','.')."</td>
                                            </tr>";
                                                
                                        }
                                            echo "<tr>
                                                <td height='23' colspan='5' valign='top'  align='right'><b>Total<b>&nbsp;</td>
                                                <td valign='top'  align='right'><b>".number_format($debet,0,',','.')."</b></td>
                                                <td valign='top'  align='right'><b>".number_format($kredit,0,',','.')."</b></td>
                                                <td valign='top'  align='right'><b>".number_format($saldo,0,',','.')."</b></td>
                                                </tr></table><br>";
                                        echo
                                        "</tbody>
                                    </table>";
                            echo"</div>
                            </div>";    
                    echo"</div>
                    </div>";                
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>
                                        
        </script>
        ";
        
		return "";
	}
	
}
?>
