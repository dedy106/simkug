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
class server_report_saku3_dash_rptDashRtRwDet2 extends server_report_basic
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
        $param=$tmp[6];
        $tahun=$tmp[7];
        $no_rumah=$tmp[8];
        $blok=$tmp[9];

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path2 = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path2 . "image/yspt2.png";

        // $sql="select kode_ta from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1'";

        // $rsTa = $dbLib->execute($sql);  
        // $row = $rsTa->FetchNextObject($toupper=false);

        // $kode_ta = $row->kode_ta;

        // echo $periode;
        
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/$blok');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
                    switch($param){
                        case "detTagih" :
                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1'><label>Tahun</label>
                                        </div>
                                        <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_tahun' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Tahun</option>";

                                        echo " <option value=".$tahun." selected >".$tahun."</option>";

                                        $resLok = $dbLib->execute("select distinct (substring(periode,1,4)) as periode from rt_bill_d where kode_lokasi='$kode_lokasi' and kode_jenis='IWAJIB' and kode_pp='05' order by substring(periode,1,4) desc ");
                                    
                                        while ($row = $resLok->FetchNextObject(false)){
                                            echo " <option value=".$row->periode.">".$row->periode."</option>";
                                        }
                                
                                    echo"  
                                        </select>
                                        </div>
                                    </diV>
                                </div>";        
                                   
                                    // $colors = array('#01f400','#00c0ef','#39CCCC','#605ca8','#f56954','#001F3F','#ff851b','#D81B60','#3c8dbc','#ffdddd','#4b4b4b','#744aab');

                                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                    <tr>
                                        
                                        <th width='32%' colspan='2' style='border-bottom: 1px solid white;'>Bulan</th>
                                        <th width='18%' style='text-align:right;border-bottom: 1px solid white;'>Tagihan</th>
                                        <th width='50%' style='text-align:right;border-bottom: 1px solid white;'>Terbayar</th>
                                    </tr>
                                    </thead>
                                    <tbody>";                                    
                                    // $sql="
                                    // select a.kode_jenis, a.kode_rumah, nilai_rt+nilai_rw as nilai_tagih, isnull(b.nilai,0) as nilai_byr ,
                                    // case when substring(a.periode,5,2) = '01' then 'JAN'
                                    //     when substring(a.periode,5,2) = '02' then 'FEB'
                                    //     when substring(a.periode,5,2) = '03' then 'MAR'
                                    //     when substring(a.periode,5,2) = '04' then 'APR'
                                    //     when substring(a.periode,5,2) = '05' then 'MEI'
                                    //     when substring(a.periode,5,2) = '06' then 'JUN'
                                    //     when substring(a.periode,5,2) = '07' then 'JUL'
                                    //     when substring(a.periode,5,2) = '08' then 'AGS'
                                    //     when substring(a.periode,5,2) = '09' then 'SEP'
                                    //     when substring(a.periode,5,2) = '10' then 'OKT'
                                    //     when substring(a.periode,5,2) = '11' then 'NOV'
                                    //     when substring(a.periode,5,2) = '12' then 'DES'
                                    //     end as periode
                                    // from rt_bill_d a
                                    // left join (select b.nilai_rt+b.nilai_rw as nilai,a.kode_lokasi,a.param1,a.param2,
									// b.periode_bill 
                                    // from trans_m a inner join rt_angs_d b on a.no_bukti=b.no_angs and a.kode_lokasi=b.kode_lokasi 
                                    // where a.periode like '$tahun%' and a.kode_lokasi='$kode_lokasi' and a.param1='$no_rumah'
                                    // ) b on a.periode=b.periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.param1 and a.kode_jenis=b.param2
                                    // where a.periode like '$tahun%' and a.kode_lokasi='$kode_lokasi' and a.kode_rumah='$no_rumah'";

                                    $sql="select  case when substring(a.periode,5,2) = '01' then 'JAN'
                                    when substring(a.periode,5,2) = '02' then 'FEB'
                                    when substring(a.periode,5,2) = '03' then 'MAR'
                                    when substring(a.periode,5,2) = '04' then 'APR'
                                    when substring(a.periode,5,2) = '05' then 'MEI'
                                    when substring(a.periode,5,2) = '06' then 'JUN'
                                    when substring(a.periode,5,2) = '07' then 'JUL'
                                    when substring(a.periode,5,2) = '08' then 'AGS'
                                    when substring(a.periode,5,2) = '09' then 'SEP'
                                    when substring(a.periode,5,2) = '10' then 'OKT'
                                    when substring(a.periode,5,2) = '11' then 'NOV'
                                    when substring(a.periode,5,2) = '12' then 'DES'
                                    end as periode,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
                                    from rt_bill_d a 
                                    left join (
                                    select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
                                    from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$no_rumah' and periode_bill like '$tahun%' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
                                    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
                                    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$no_rumah' and a.periode like '$tahun%' and a.kode_jenis='IWAJIB'
                                    order by a.periode";
                
                                    $rs = $dbLib->execute($sql);  
                                    $x=0;
                                    while ($row = $rs->FetchNextObject($toupper=false)){

                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                 
                                        echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='30%' style='text-transform:uppercase'>".$row->periode."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row->bill,0,",",".")."</td>
                                            <td style='text-align:right;color:".$clr."'>Rp. ".number_format($row->bayar,0,",",".")."</td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";              
                        break;
                        case "detBayar" :
                        echo"
                        <div class='box box-widget'>
                            <form class='form-iuran' method='POST' >
                                <div class='row'>
                                    <div class='col-xs-12'>
                                        <div class='box-header'>
                                            <button id='btnSubmit' class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                        </div>
                                        <div class='box-body'>
                                            <div class='row' style='margin-bottom:10px'>
                                                <div class='form-group'>
                                                    <label for='inputSaldo' class='col-sm-2 control-label'>Saldo Tagihan</label>
                                                    <div class='col-sm-3'>
                                                        <input type='text' name='saldo' class='form-control' id='inputSaldo' readonly value = '0'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group'>
                                                    <label for='inputNilai' class='col-sm-2 control-label'>Nilai Bayar</label>
                                                    <div class='col-sm-3'>
                                                        <input type='text' name='bayar' class='form-control' id='inputNilai' readonly value='0'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group'>
                                                    <div class='col-sm-3'>
                                                        <input type='hidden' name='nilRT' class='form-control' id='inputNilRT' readonly value='0'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group'>
                                                    <div class='col-sm-3'>
                                                        <input type='hidden' name='nilRW' class='form-control' id='inputNilRW' readonly value='0'>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <input type='hidden' name='kode_lokasi' class='form-control' readonly value='$kode_lokasi'>
                                                   
                                            <input type='hidden' name='nik' class='form-control' readonly value='$nik'>
                                                   
                                            <input type='hidden' name='kode_pp' class='form-control' readonly value='05' >
                                                   
                                            <input type='hidden' name='no_rumah' class='form-control' readonly value='$no_rumah' >
                                                    
                                        </div>
                                    ";
                                   
                                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                                   
                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                    <tr>
                                        
                                        <th width='50%' colspan='2' style='border-bottom: 1px solid white;'>Periode</th>
                                        <th width='50%' style='text-align:right;border-bottom: 1px solid white;' colspan='3'>Nilai</th>
                                        <th style='text-align:right;border-bottom: 1px solid white;'>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <style>
                                    .toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
                                    .toggle.ios .toggle-handle { border-radius: 20px; }
                                    </style>
                                    ";

                                    // $sql="
                                    // select a.kode_jenis, a.kode_rumah, a.nilai_rt+a.nilai_rw as nilai_tagih, isnull(b.nilai,0) as nilai_byr , a.periode
                                    // from rt_bill_d a
                                    // left join (select b.nilai_rt+b.nilai_rw as nilai,a.kode_lokasi,a.param1,a.param2,
									// b.periode_bill 
                                    // from trans_m a inner join rt_angs_d b on a.no_bukti=b.no_angs and a.kode_lokasi=b.kode_lokasi
                                    // where a.periode like '$tahun%' and a.kode_lokasi='$kode_lokasi' and a.param1='$no_rumah' ) b on a.periode=b.periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.param1 and a.kode_jenis=b.param2
                                    // where a.periode like '$tahun%' and a.kode_lokasi='$kode_lokasi' and a.kode_rumah='$no_rumah' and (a.nilai_rt+a.nilai_rw - isnull(b.nilai,0)) > 0 ";

                                    $sql="
                                    select a.periode,a.nilai_rt,a.nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
                                    from rt_bill_d a 
                                    left join (
                                    select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
                                    from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$no_rumah' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
                                    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
                                    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$no_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0
                                    order by a.periode
                                    ";
                                    

                                    // echo $sql;
            
                                    $rs = $dbLib->execute($sql);  
                                    $x=0;
                                    $total=0;
                                    while ($row = $rs->FetchNextObject($toupper=false)){
                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                        echo"
                                        <tr class='sai-grid-row'>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='48%'>".$row->periode." <input name='periode[]' value='$row->periode' type='hidden'></input></td>
                                            <td width='15%' style='text-align:right;color:".$clr."'>
                                            <input name='nilai_rt[]' class='input-nilrt' value='$row->nilai_rt' type='hidden'></input>
                                            <td width='15%' style='text-align:right;color:".$clr."'>
                                            <input name='nilai_rw[]' class='input-nilrw' value='$row->nilai_rw' type='hidden'></input>
                                            </td>
                                            <td width='18%' style='text-align:right;color:".$clr."'>Rp.".number_format($row->bill,0,",",".")."
                                            <input name='nilai_tot[]' class='input-nilai' value='$row->bill' type='hidden'></input>
                                            </td>
                                            <td width='2%'><input type='checkbox' name='toggle[]' class='inputToggle' data-on=' ' data-off=' ' data-toggle='toggle' data-size='mini' data-style='ios'><div id='console-event$x'></div></td>
                                        </tr>";
                                        $x++;
                                        $total+=$row->bill;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                            echo"
                                </div>
                            </div>
                        </form>
                    </div>
                        ";              
                        break;
              
                    }
               
            
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>
              $(document).ready(function(){

                    $('#dash_tahun').change(function() { 
                        // alert(this.value);
                        var tahun = this.value;
          
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet2','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/$param/'+tahun+'/$no_rumah/$blok');
                    });

                    function sepNum(x){
                        if (typeof x === 'undefined' || !x) { 
                            return 0;
                        }else{
                            if(x < 0){
                                var x = parseFloat(x).toFixed(0);
                            }
                            
                            var parts = x.toString().split(',');
                            parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                            return parts.join('.');
                        }
                    }

                    function hitungSaldo(){

                        totSal = 0;
                        $('.sai-grid-row').each(function(){
                            var nilai=$(this).closest('tr').find('.input-nilai').val();
                            
                            totSal+=+nilai;
        
                        });
                        
                        $('#inputSaldo').val(sepNum(totSal));
                       

                    }

                    hitungSaldo();
                  
                    $('.inputToggle').change(function() {  
                    
                        
                        $('#inputNilai').val(0);
                        
                        total = 0;
                        totRT = 0;
                        totRW = 0;
                        $('.sai-grid-row').each(function(){
                            var cek=$(this).closest('tr').find('.inputToggle').prop('checked');
                            var nilai=$(this).closest('tr').find('.input-nilai').val();
                            var rt=$(this).closest('tr').find('.input-nilrt').val();
                            var rw=$(this).closest('tr').find('.input-nilrw').val();

                            if(cek == true){
                                total+=+nilai;
                                totRT+=+rt;
                                totRW+=+rw;
                            }
                            
                        });
                        $('#inputNilai').val(sepNum(total));
                        $('#inputNilRT').val(sepNum(totRT));
                        $('#inputNilRW').val(sepNum(totRW));
                         
                        
                        
                    }); 
                    
                    $('input').on('keyup keypress', function(e) {
                        var keyCode = e.keyCode || e.which;
                        if (keyCode === 13) { 
                          e.preventDefault();
                          return false;
                        }
                    });  

                    $('#btnSubmit').click(function(e){
                        e.preventDefault();
                        // alert('test');
                        myForm = $('.form-iuran').serialize();
    
                        // alert(myForm);
                       
                        $.ajax({
                            type: 'POST',
                            url: 'rtrwKas.php?fx=simpanIuran',
                            dataType: 'json',
                            data: myForm,
                            cache: false,
                            success:function(result){
                                alert('Input data '+result.message);
    
                                // if(result.status){
                                    // location.reload();
                                // }
                            }
                        });
    
                    });
                    
                    

                })
			 </script>";

        
		return "";
	}
	
}
?>
