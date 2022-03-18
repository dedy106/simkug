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
class server_report_saku3_dash_rptDashTelSisList extends server_report_basic
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
        $kunci=$tmp[4];
        $path=$tmp[5];

        

		    $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path . "image/invoice.png";

        $sql="select kode_ta from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1'";

        $rsTa = $dbLib->execute($sql);  
        $row = $rsTa->FetchNextObject($toupper=false);

        $kode_ta = $row->kode_ta;
        
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSis','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
                if ($kunci=="tagihan"){
                  echo "<div class='box box-widget'>
                  ";

                  $sql="select max(distinct kode_kelas+'-'+kode_sem) as kelas_sem from sis_bill_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and nis='$nik'";

                  $rsSem = $dbLib->execute($sql);  
                  $row2 = $rsSem->FetchNextObject($toupper=false);

                  $sem=$row2->kelas_sem;

                  $sql="select a.periode,substring(a.periode,5,2) as bulan,
                  isnull(a.tagihan,0) as tagihan,isnull(b.bayar,0) as bayar,isnull(a.tagihan,0)-isnull(b.bayar,0) as tunggakan,
                  case when isnull(a.tagihan,0)-isnull(b.bayar,0)=0 then 'Lunas' else 'Tunggakan' end as jenis
                  from (select x.periode,x.kode_lokasi,x.kode_pp,
                                      sum(case when x.dc='D' then x.nilai else -x.nilai end) as tagihan		
                              from sis_bill_d x 			
                              inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                              where(x.kode_lokasi = '$kode_lokasi')and(x.kode_ta='$kode_ta') and x.kode_pp='$kode_pp' and x.nis='$nik' and (x.kode_kelas+'-'+x.kode_sem ='$sem')		
                              group by x.periode,x.kode_lokasi,x.kode_pp
                      )a
                  left join (select x.periode,x.kode_lokasi,x.kode_pp,
                                  sum(case when x.dc='D' then x.nilai else -x.nilai end) as bayar		
                              from sis_rekon_d x 			
                              inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                              inner join sis_bill_d z on x.no_bill=z.no_bill and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
                              where(x.kode_lokasi = '$kode_lokasi')and(z.kode_ta='$kode_ta') and x.kode_pp='$kode_pp' and x.nis='$nik' and (z.kode_kelas+'-'+z.kode_sem ='$sem')		
                              group by x.periode,x.kode_lokasi,x.kode_pp
                              )b on a.periode=b.periode and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                  order by a.periode";

                  $rsDet = $dbLib->execute($sql);  
                  while($row = $rsDet->FetchNextObject($toupper=false)){

                echo"
                        <div class='box-footer box-comments' style='box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1);margin-top:10px; background:white;margin-top:10px'>
                          <div class='box-comment'>
                            <img class='img-circle img-sm' src='$path' alt='User Image' style='margin-top: 10px;width: 50px !important;height: 50px !important;'>
                            <div class='comment-text' style='margin-left:60px'>
                                  <span class='username'>
                                  Bulan $row->bulan &nbsp; 
                                  ";
                                  if($row->tunggakan <> 0){
                                    echo"
                                    <span class='label label-danger'>Tunggakan</span>";
                                  }else{
                                    echo"
                                    <span class='label label-success'>Lunas</span>";
                                  }
                              echo                    
                                  "
                                  </span>
                                  <span>Nilai Tagihan &nbsp; <b>".number_format($row->tagihan,0,",",".")."</b></span><br>
                                  <span>Nilai Bayar &nbsp; <b>".number_format($row->bayar,0,",",".")."</b></span><br>
                                  <span>Nilai Tunggakan &nbsp; <b>".number_format($row->tunggakan,0,",",".")."</b></span>
                            </div>
                          </div>
                        </div>";
                  }
                      echo"
                      </div>";  
                    
                }else if($kunci == "pbyr"){

                  $sql="select x.periode,  substring(x.periode,5,2) as bulan,
                  sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as dsp, 
                     sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as spp, 
                     sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as lain,
                     sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                  from sis_rekon_d x 	
                  inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                  inner join sis_bill_d z on x.no_bill=z.no_bill and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
                  where(x.kode_lokasi = '$kode_lokasi')and(z.kode_ta='$kode_ta') and x.kode_pp='$kode_pp' and x.nis='$nik'			
                  group by x.periode
                  order by x.periode";

                  echo "<div class='box box-widget'>";
                  $rsDet2 = $dbLib->execute($sql);  
                  while($row = $rsDet2->FetchNextObject(false)){

                  echo"
                      <div class='box-footer box-comments' style='box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1);margin-top:10px; background:white;margin-top:10px'>
                          <div class='box-comment'>
                            <img class='img-circle img-sm' src='$path' alt='User Image' style='margin-top: 10px;width: 50px !important;height: 50px !important;'>
                            <div class='comment-text' style='margin-left:60px'>
                                  <span class='username'>
                                  Periode $row->periode &nbsp; 
                                  ";
                                  
                              echo                    
                                  "
                                  </span>
                                  <span>DSP &nbsp; <b>".number_format($row->dsp,0,",",".")."</b></span><br>
                                  <span>SPP &nbsp; <b>".number_format($row->spp,0,",",".")."</b></span><br>
                                  <span>Lain lain &nbsp; <b>".number_format($row->lain,0,",",".")."</b></span><br>
                                  <span>Total &nbsp; <b>".number_format($row->total,0,",",".")."</b></span>
                            </div>
                          </div>
                      </div>";
                  }
                  echo "</div>";
                }
            
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>

			 </script>";

        
		return "";
	}
	
}
?>
