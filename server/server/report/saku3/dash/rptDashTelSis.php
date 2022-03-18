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
class server_report_saku3_dash_rptDashTelSis extends server_report_basic
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

        $sql="select kode_pp from sis_siswa where nis='$nik'";
        $rs = $dbLib->execute($sql);  
        $row = $rs->FetchNextObject($toupper=false);
        $kode_pp=$row->kode_pp;
        
        $sqlBox = "select a.nis , a.tot_bill, isnull(b.tot_byr,0) as tot_byr, a.tot_bill-isnull(b.tot_byr,0) as tot_piu 
        from ( select a.nis,sum(a.nilai) as tot_bill,a.periode,a.kode_lokasi,a.kode_pp
                from sis_bill_d a
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' and a.nis='$nik'
                group by a.nis,a.periode,a.kode_lokasi,a.kode_pp ) a
        left join (select a.nis,sum(a.nilai) as tot_byr,a.periode,a.kode_lokasi,a.kode_pp
                    from sis_rekon_d a
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_pp='$kode_pp' and a.nis='$nik'
                    group by a.nis,a.periode,a.kode_lokasi,a.kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp and a.nis=b.nis        
        ";

        $rs = $dbLib->execute($sqlBox);  
        $row = $rs->FetchNextObject($toupper=false);

        $nil= array($row->tot_bill,$row->tot_byr,$row->tot_piu,0);

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard <div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                        <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                        <i class='fa fa-bell-o'></i>
                        <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                        </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
               
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                    echo"
                        <li>
                            <ul class='menu'>
                            <li>
                                <a href='#'>
                                <i class='fa fa-users text-aqua'></i> $row->pesan
                                </a>
                            </li>
                            </ul>
                        </li>
                        ";
                    }
                
                echo"
                        <li class='footer'><a href='#'>View all</a></li>
                        </ul>    
                    </li>
                    ";
        
                echo"
                        <a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:20px;'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>";
        $i=0;
        $color = array('yellow', 'blue', 'purple', 'red');
        $icon = array('fa-money', 'fa-area-chart', 'fa-line-chart', 'fa-pie-chart');
        $boxlabel= array('Tagihan','Pembayaran','Piutang','Deposit');
        for ($i=0;$i<count($boxlabel);$i++) {
        $nilai=0;
        echo"       <div class='col-md-12 col-md-3'>
                        <div class='small-box bg-".$color[$i]."'>
                            <div class='inner'>
                                <center>
                                    <p>".$boxlabel[$i]."</p>
                                    <h3 id='home_kas_box'>".number_format($nil[$i],0,",",".")."</h3>
                                </center>
                            </div>
                            <div class='icon'><i class='fa ".$icon[$i]."'></i></div>
                                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisDet','','$kode_lokasi/$periode/all/DB01/$kode_pp/$nik/');\"> Detail <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>";
        }

         echo"           
                </div>"; 

        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path . "image/keubg.png";

        $sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
        from sis_siswa a 
        inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
        left join (select y.nis,y.kode_lokasi,  
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                    from sis_bill_d x 			
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                    group by y.nis,y.kode_lokasi 			
                    )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
        left join (select y.nis,y.kode_lokasi,  
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                    from sis_bill_d x 			
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                    group by y.nis,y.kode_lokasi 			
                    )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
        left join (select y.nis,y.kode_lokasi,  
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                    from sis_rekon_d x 	
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.kode_pp='$kode_pp'		
                    group by y.nis,y.kode_lokasi 			
                    )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
        left join (select y.nis,y.kode_lokasi, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                    from sis_rekon_d x 			
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                    where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
                    group by y.nis,y.kode_lokasi 			
                    )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
        where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'	and a.nis='$nik'
        order by a.kode_kelas,a.nis";

        $rsTung = $dbLib->execute($sql);  
        $row = $rsTung->FetchNextObject($toupper=false);

        $kelas = $row->kode_kelas;
        $tunggakan = $row->sak_total;
        $bayar = $row->bayar;


        $sql="select a.nis,a.kode_lokasi,a.nama,a.kode_kelas,
        isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
        from sis_siswa a 
        inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        inner join (select a.nis,a.kode_pp,a.kode_lokasi
                    from sis_cd_d a
                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_pp,a.kode_lokasi
                    )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                from sis_cd_d a			
                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                group by a.nis,a.kode_lokasi,a.kode_pp
                )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                from sis_cd_d a			
                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                group by a.nis,a.kode_lokasi,a.kode_pp
                )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
        left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                from sis_cd_d a			
                inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                group by a.nis,a.kode_lokasi,a.kode_pp
                )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik'
        order by a.kode_kelas,a.nis";

        $rsDep = $dbLib->execute($sql);  
        $row = $rsDep->FetchNextObject($toupper=false);

        $deposit =0;


        $sql="select kode_ta from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1'";

        $rsTa = $dbLib->execute($sql);  
        $row = $rsTa->FetchNextObject($toupper=false);

        $kode_ta = $row->kode_ta;
   
        echo"
        <div class='row'>
            <div class='col-md-12'>
            <div class='box box-danger box-solid'>
                <div class='box-header with-border' style='height:120px;background-image: url($path);'>
                <h3 class='box-title'>
                    <table border='0' width='100%'>
                        <tr style='font-size:15px'>
                            <td>Tunggakan</td>
                        </tr>
                        <tr style='font-size:25px'>
                            <td style='padding-bottom:10px;'>Rp. ".number_format($tunggakan,0,",",".")."</td>
                        </tr>
                        <tr style='font-size:15px'>
                            <td>Deposit</td>
                        </tr>
                        <tr style='font-size:25px'>
                            <td>Rp. ".number_format($deposit,0,",",".")."</td>
                        </tr>
                    </table>
                </h3>
                <div class='box-tools pull-right' style='padding-top:10px;padding-right:10px;text-align:center'>
                    
                    <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisDet','','$kode_lokasi/$periode/all/Receipt/$kode_pp/$nik/');\"><i class='fa fa-list'></i>
                    <br>Receipt
                    </a><br>
                    <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisDet','','$kode_lokasi/$periode/all/Invoice/$kode_pp/$nik/');\"><i class='fa fa-file-o'></i>
                    <br>
                    Invoice</a>
                </div>
                </div>
                <div class='box-body'>
                  <h3>Daftar Keuangan</h3>
                  <br/>
                  <h4><select class='form-control selectize input-sm ' id='dash_kls_sem' style='margin-bottom:5px;'>";
                
                  $resSem = $dbLib->execute("select distinct kode_kelas+'-'+kode_sem as kelas_sem 
                  from sis_bill_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and nis='$nik' and kode_sem is not null");
                 
                  while ($rowSem = $resSem->FetchNextObject(false)){
                      echo " <option value=".$rowSem->kelas_sem.">".$rowSem->kelas_sem."</option>";
                  }
          
                echo"  
                  </select></h4>
                  <br/>";

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
                  <div class='info-box' style='border-radius:20px;padding-top: 20px;padding-left: 20px;padding-bottom: 20px;box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);border: 1px solid rgba(0,0,0,0.2);'>
                    <table border='0' width='100%' id='table-det-tagihan'>
                            <tr>
                                <td width='50%'> Nilai Tagihan</td>
                                <td width='20%'>".number_format($row->tagihan,0,",",".")."</td>
                                <td width='30%' rowspan='3' style='text-align:center;border-left:1px solid rgba(0,0,0,0.1);'>Bulan <br/> <span style='font-size:50px'><b>$row->bulan</b></span><br/>";
                            if($row->tunggakan <> 0){
                                echo"
                                <a class='btn btn-sm btn-danger'>Tunggakan</a>";
                            }else{
                                echo"
                                <a class='btn btn-sm btn-success'>Lunas</a>";
                            }                          

                            echo" </td>
                            </tr>
                            <tr>
                                <td> Nilai Bayar</td>
                                <td> ".number_format($row->bayar,0,",",".")."</td>
                            </tr>
                            <tr>
                                <th> Tunggakan</th>
                                <th> ".number_format($row->tunggakan,0,",",".")."</th>
                            </tr>
                    </table>
                  </div>";
                        }
                echo"                  
                </div>
            </div>
            </div>
        </div>
           ";

           $path2 = $_SERVER["SCRIPT_NAME"];				
           $path2 = substr($path2,0,strpos($path2,"server/serverApp.php"));		
           $path2 = $path2 . "image/invoice.png";

        echo "<!-- Box Comment -->
        <div class='box box-widget'>
         ";
  echo"
          <a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisList','','$kode_lokasi/$periode/$kode_pp/$nik/tagihan/".$_SERVER["SCRIPT_NAME"]."');\"><div class='box-footer box-comments' style='box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1);height: 70px;margin-top:10px;background:white;'>
            <div class='box-comment'>
              <img class='img-circle img-sm' src='$path2' alt='User Image' style='width: 50px !important;height: 50px !important;'>
              <div class='comment-text' style='margin-left: 60px;'>
                    <span class='username' style='font-weight:unset;text-transform:uppercase'>
                      Tagihan
                    </span><!-- /.username -->
                    <span style='font-weight:bold;font-size:18px'>Rp. ".number_format($tunggakan,0,",",".")."</span>
              </div>
            </div>
          </div>
          </a>
          <a href='#'  onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisList','','$kode_lokasi/$periode/$kode_pp/$nik/pbyr/".$_SERVER["SCRIPT_NAME"]."');\">
          <div class='box-footer box-comments' style='box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1);height: 70px; margin-top:10px;background:white;'>
            <div class='box-comment' >
              <img class='img-circle img-sm' src='$path2' alt='User Image' style='width: 50px !important;height: 50px !important;'>
              <div class='comment-text' style='margin-left: 60px;'>
                    <span class='username' style='font-weight:unset;text-transform:uppercase'>
                      Pembayaran
                    </span><!-- /.username -->
                    <span style='font-weight:bold;font-size:18px'>Rp. ".number_format($bayar,0,",",".")." </span>
              </div>
            </div>
          </div>
          </a>
          <a href='#'>
          <div class='box-footer box-comments' style='box-shadow: 1px 2px 2px 2px rgba(0,0,0,0.1);margin-top:10px;height: 70px; background:white;'>
            <div class='box-comment'>
              <img class='img-circle img-sm' src='$path2' alt='User Image' style='width: 50px !important;height: 50px !important;'>
              <div class='comment-text'  style='margin-left: 60px;'>
                    <span class='username' style='font-weight:unset;text-transform:uppercase'>
                      Deposit
                    </span><!-- /.username -->
                    <span style='font-weight:bold;font-size:18px'>Rp. ".number_format($deposit,0,",",".")." </span>
              </div>
            </div>
          </div>
          </a>";
        echo"
        </div>
        <!-- /.box -->";    
        // echo "<hr>";
        // echo"
        // <div class='row'>
        // <a href='#' style='color:black' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelSisList','','$kode_lokasi/$periode/$kode_pp/$nik/tagihan2/".$_SERVER["SCRIPT_NAME"]."');\">
        //     <div class='col-md-12 col-sm-12 col-xs-12'>
        //         <div class='info-box' style='box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);'>
        //             <span class='info-box-icon' style='background:white'><img class='img-circle' src='$path2' style='width:70px;height:70px;margin-top:10px'alt='User Image'></span>
        //             <div class='info-box-content'>
        //             <span class='info-box-text'>Tagihan</span>
        //             <span class='info-box-number'>Rp. ".number_format($tunggakan,0,",",".")."</span>
        //             </div>
        //             <!-- /.info-box-content -->
        //         </div>
        //     <!-- /.info-box -->
        //     </div>
        // </a>
        //     <div class='col-md-12 col-sm-12 col-xs-12'>
        //         <div class='info-box' style='box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);'>
        //             <span class='info-box-icon' style='background:white;'><img class='img-circle' src='$path2' style='width:70px;height:70px;margin-top:10px'alt='User Image'></span>
        //             <div class='info-box-content'>
        //             <span class='info-box-text'>Pembayaran</span>
        //             <span class='info-box-number'>Rp. ".number_format($bayar,0,",",".")."</span>
        //             </div>
        //             <!-- /.info-box-content -->
        //         </div>
        //     <!-- /.info-box -->
        //     </div>
        //     <div class='col-md-12 col-sm-12 col-xs-12'>
        //         <div class='info-box' style='box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);'>
        //             <span class='info-box-icon' style='background:white;'><img class='img-circle' src='$path2' style='width:70px;height:70px;margin-top:10px'alt='User Image'></span>
        //             <div class='info-box-content'>
        //             <span class='info-box-text'>Deposit</span>
        //             <span class='info-box-number'>Rp. ".number_format($deposit,0,",",".")."</span>
        //             </div>
        //             <!-- /.info-box-content -->
        //         </div>
        //     <!-- /.info-box -->
        //     </div>
        // <div>
        // ";

        echo"</div>
            </div>
        </div>";

                		
		echo "
        <script type='text/javascript'>

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('change', '#dash_kls_sem', function(){
            alert(this.value);
        });

        </script>";

		return "";
	}
	
}
?>
