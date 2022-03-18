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
class server_report_saku3_dash_rptDashTelDetail2 extends server_report_basic
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
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $jenis=$tmp[5];
        $kunci=$tmp[6];
        $key=$tmp[7];

        // echo $key.$kode_lokasi;
        $AddOnLib=new server_util_AddOnLib();
        

        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelDetail','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$jenis|$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
               echo"<div class='row'>
                        <div class='col-md-12 sai-container-overflow'>";
                        switch($kunci){
                            case "Siswa" :
                            $sql= "select a.*,b.kode_jur,b.nama as nama_kelas,c.nama as nama_jur from sis_siswa a
                            inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi 
                            inner join sis_jur c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$key' ";
                            // echo $sql;

                            $rs=$dbLib->execute($sql);
                            $row = $rs->FetchNextObject($toupper=false);

                            echo "<div class='box box-primary'>
                                <div class='box-body box-profile'>
                                    <div>
                                        <img class='profile-user-img img-responsive img-circle' src='/image/user2.png' alt='User profile picture' style='width: 80px;margin: 10px;'>
                                        <h3 class='profile-username' style='margin-left: 105px;margin-bottom: 0px;margin-top: -80px;'>$row->nama</h3>
                                        <p class='text-muted' style='margin-left: 105px;margin-bottom: 40px;'>$row->nis</p>
                                    </div>
                
                                    <ul class='list-group list-group-unbordered'>
                                        <li class='list-group-item'>
                                        <b>Angkatan</b><br>
                                        <a>$row->kode_akt</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Kelas</b><br> <a>$row->kode_kelas - $row->nama_kelas</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Jurusan</b><br><a>$row->nama_jur</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Status</b><br> <a>$row->status</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Tempat Tgl Lahir</b><br> <a>$row->tempat $row->tgl_lahir</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Jenis Kelamin</b><br> <a>$row->jk</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Agama</b><br> <a>$row->agama</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Nama Ayah</b><br> <a>$row->nama_ayah</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Nama Ibu</b><br> <a>$row->nama_ibu</a>
                                        </li>
                                        <li class='list-group-item'>
                                        <b>Alamat</b><br> <a>$row->alamat_siswa</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>";
                            break;
                            case "Tagihan" :
                            echo"
                            <div class='col-md-12'>
                                <div class='box-header with-border'>
                                    <i class='fa fa-list-alt'></i>
                                    <h3 class='box-title'>Detail Tagihan</h3>
                                </div>
                                <div class='box-body'>";
                    
                                    $sql="select a.no_bill, a.periode,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.kode_lokasi,a.keterangan
                                    from sis_bill_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.no_bill='$key' and a.kode_pp='$kode_pp' ";

                                    // echo $sql;

                                    $nis=$tmp[8];
                                    // echo $nis;

                                    $rs=$dbLib->execute($sql);
                                    $row = $rs->FetchNextObject($toupper=false);
                                    echo"
                                    <div class='row invoice-info'>
                                        <div class='col-sm-2 invoice-col'>
                                        <address>
                                            <strong>
                                            No Bukti
                                            </strong>
                                            <br>
                                            NIS
                                            <br>
                                            Tanggal
                                            <br>
                                            Keterangan
                                        </address>
                                        </div>
                                        <div class='col-sm-4 invoice-col'>
                                            <address>
                                                <strong>
                                                $row->no_bill
                                                </strong>
                                                <br>
                                                $nis
                                                <br>
                                                ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                                <br>
                                                $row->keterangan
                                            </address>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <!-- Table row -->";
                                    echo"
                                    <div class='row'>
                                        <div class='col-xs-12 table-responsive'>
                                        <table class='table table-striped'>
                                            <thead>
                                            <tr>
                                                <th width='30' >No</th>
                                                <th width='100' >Kode Param </th>
                                                <th width='200' >Nama Param </th>
                                                <th width='100' >Nilai</th>
                                            </tr>
                                            </thead>
                                            <tbody>";
                                            $sql="select a.nis,a.kode_param,b.nama,a.akun_piutang,a.periode,a.nilai from sis_bill_d a
                                            inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                                            where a.kode_lokasi='$kode_lokasi' and a.no_bill='$row->no_bill' and a.kode_pp='$kode_pp' and a.nis='$nis'
                                            ";
                                            // echo $sql;

                                            $rs1 = $dbLib->execute($sql);
                                            $i=1;
                                            $tot=0;
                                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                            {
                                                
                                                $tot=$tot+$row1->nilai;
                                            echo "<tr>
                                                    <td>$i</td>
                                                    <td >$row1->kode_param</td>
                                                    <td >$row1->nama</td>
                                                    <td align='right'>".number_format($row1->nilai,0,',','.')."</td>
                                                </tr>";
                                                    $i=$i+1;
                                            }
                                           
                                            $total=number_format($tot,0,',','.');
                                            echo "<tr>
                                                    <td colspan='3'  align='right'><b>Total</b></td>
                                                    <td  align='right'><b>$total</b></td>
                                                </tr>";

                                            echo"
                                            </tbody>
                                        </table>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <div class='row'>
                                    
                                    </div>
                                    <!-- /.row -->"; 
                                echo"
                                </div>
                            </div>";
                            break;
                            case "Pbyr" :
                            echo"
                            <div class='col-md-12'>
                                <div class='box-header with-border'>
                                    <i class='fa fa-list-alt'></i>
                                    <h3 class='box-title'>Detail Pembayaran</h3>
                                </div>
                                <div class='box-body'>";
                    
                                    $sql="select a.no_kas, a.periode,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.kode_lokasi,a.keterangan
                                    from kas_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.no_kas='$key' and a.kode_pp='$kode_pp' ";

                                    // echo $sql;

                                    $nis=$tmp[8];
                                    // echo $nis;

                                    $rs=$dbLib->execute($sql);
                                    $row = $rs->FetchNextObject($toupper=false);
                                    echo"
                                    <div class='row invoice-info'>
                                        <div class='col-sm-2 invoice-col'>
                                        <address>
                                            <strong>
                                            No Bukti
                                            </strong>
                                            <br>
                                            NIS
                                            <br>
                                            Tanggal
                                            <br>
                                            Keterangan
                                        </address>
                                        </div>
                                        <div class='col-sm-4 invoice-col'>
                                            <address>
                                                <strong>
                                                $row->no_kas
                                                </strong>
                                                <br>
                                                $nis
                                                <br>
                                                ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                                <br>
                                                $row->keterangan
                                            </address>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <!-- Table row -->";
                                    echo"
                                    <div class='row'>
                                        <div class='col-xs-12 table-responsive'>
                                        <table class='table table-striped'>
                                            <thead>
                                            <tr>
                                                <th width='30' >No</th>
                                                <th width='100' >Kode Param </th>
                                                <th width='200' >Nama Param </th>
                                                <th width='100' >Nilai</th>
                                            </tr>
                                            </thead>
                                            <tbody>";
                                            $sql="select a.nis,a.kode_param,b.nama,a.akun_piutang,a.periode,a.nilai from sis_rekon_d a
                                            inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                                            where a.kode_lokasi='$kode_lokasi' and a.no_rekon='$row->no_kas' and a.kode_pp='$kode_pp' and a.nis='$nis'
                                            ";
                                            // echo $sql;

                                            $rs1 = $dbLib->execute($sql);
                                            $i=1;
                                            $tot=0;
                                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                            {
                                                
                                                $tot=$tot+$row1->nilai;
                                            echo "<tr>
                                                    <td>$i</td>
                                                    <td >$row1->kode_param</td>
                                                    <td >$row1->nama</td>
                                                    <td align='right'>".number_format($row1->nilai,0,',','.')."</td>
                                                </tr>";
                                                    $i=$i+1;
                                            }
                                           
                                            $total=number_format($tot,0,',','.');
                                            echo "<tr>
                                                    <td colspan='3'  align='right'><b>Total</b></td>
                                                    <td  align='right'><b>$total</b></td>
                                                </tr>";

                                            echo"
                                            </tbody>
                                        </table>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <div class='row'>
                                    
                                    </div>
                                    <!-- /.row -->"; 
                                echo"
                                </div>
                            </div>";
                            break;
                            case "Tunggak" :
                            echo"
                            <div class='col-md-12'>
                                <div class='box-header with-border'>
                                    <i class='fa fa-list-alt'></i>
                                    <h3 class='box-title'>Detail Tunggakan</h3>
                                </div>
                                <div class='box-body'>";
                    
                                    $sql="select a.nis,a.nama
                                    from sis_siswa a
                                    where a.kode_lokasi='$kode_lokasi' and a.nis='$key' and a.kode_pp='$kode_pp' ";

                                    // echo $sql;

                                    $nis=$tmp[8];
                                    // echo $nis;

                                    $rs=$dbLib->execute($sql);
                                    $row = $rs->FetchNextObject($toupper=false);
                                    echo"
                                    <div class='row invoice-info'>
                                        <div class='col-sm-2 invoice-col'>
                                        <address>
                                            <strong>
                                            NIS
                                            </strong>
                                            <br>
                                            Nama
                                            
                                        </address>
                                        </div>
                                        <div class='col-sm-4 invoice-col'>
                                            <address>
                                                <strong>
                                                $row->nis
                                                </strong>
                                                <br>
                                                $row->nama
                                            </address>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <!-- Table row -->";
                                    echo"
                                    <div class='row'>
                                        <div class='col-xs-12 table-responsive'>
                                        <table class='table table-striped'>
                                            <thead>
                                            <tr>
                                                <th width='30' >No</th>
                                                <th width='100' >Kode Param </th>
                                                <th width='200' >Nama Param </th>
                                                <th width='100' >Saldo Awal</th>
                                                <th width='100' >Debet</th>
                                                <th width='100' >Kredit</th>
                                                <th width='100' >Saldo Akhir</th>
                                            </tr>
                                            </thead>
                                            <tbody>";
                                            $sql="select a.kode_param,a.nama,a.kode_lokasi,
                                            isnull(b.total,0)-isnull(d.total,0) as saw_total,isnull(c.total,0) as debet_total,isnull(e.total,0) as kredit_total
                                            ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
                                            from sis_param a 
                                            left join (select x.kode_param,x.kode_lokasi,  
                                                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                        from sis_bill_d x 			
                                                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp' and x.nis='$key'			
                                                        group by x.kode_param,x.kode_lokasi 			
                                                        )b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                                            inner join (select x.kode_param,x.kode_lokasi,  
                                                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                        from sis_bill_d x 			
                                                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp' and x.nis='$key'		
                                                        group by x.kode_param,x.kode_lokasi			
                                                        )c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi
                                            left join (select x.kode_param,x.kode_lokasi,  
                                                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                        from sis_rekon_d x 			
                                                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'  and x.nis='$key'			
                                                        group by x.kode_param,x.kode_lokasi
                                                        )d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi
                                            left join (select x.kode_param,x.kode_lokasi,  
                                                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                        from sis_rekon_d x 			
                                                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'  and x.nis='$key'			
                                                        group by x.kode_param,x.kode_lokasi			
                                                        )e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi
                                            where a.kode_lokasi='$kode_lokasi'
                                            order by a.kode_param
                                            ";
                                            // echo $sql;

                                            $rs1 = $dbLib->execute($sql);
                                            $i=1;
                                            $sw=0;$db=0;$kd=0;$sk=0;
                                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                            {
                                                
                                                $sw=$sw+$row1->saw_total;
                                                $db=$db+$row1->debet_total;
                                                $kd=$kd+$row1->kredit_total;
                                                $sk=$sk+$row1->sak_total;
                                            echo "<tr>
                                                    <td>$i</td>
                                                    <td >$row1->kode_param</td>
                                                    <td >$row1->nama</td>
                                                    <td align='right'>".number_format($row1->saw_total,0,',','.')."</td>
                                                    <td align='right'>".number_format($row1->debet_total,0,',','.')."</td>
                                                    <td align='right'>".number_format($row1->kredit_total,0,',','.')."</td>
                                                    <td align='right'>".number_format($row1->sak_total,0,',','.')."</td>
                                                </tr>";
                                                    $i=$i+1;
                                            }
                                           
                                            
                                            echo "<tr>
                                                    <td colspan='3'  align='right'><b>Total</b></td>
                                                    <td  align='right'><b>".number_format($sw,0,",",".")."</b></td>
                                                    <td  align='right'><b>".number_format($db,0,",",".")."</b></td>
                                                    <td  align='right'><b>".number_format($kd,0,",",".")."</b></td>
                                                    <td  align='right'><b>".number_format($sk,0,",",".")."</b></td>
                                                </tr>";

                                            echo"
                                            </tbody>
                                        </table>
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                    <div class='row'>
                                    
                                    </div>
                                    <!-- /.row -->"; 
                                echo"
                                </div>
                            </div>";
                            break;
                        }
                    echo"</div>
                    </div>";             
        echo"   </div>
              </div>";
        
        
    
        echo "<script type='text/javascript'>
       
			</script>
 	    ";

        
		return "";
	}
	
}
?>
