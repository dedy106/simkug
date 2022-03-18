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
class server_report_saku3_dash_rptDashSjuProdDet extends server_report_basic
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
        $box=$tmp[2];
		$kunci=$tmp[3];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProd','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "pesan" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Pesanan</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>Order ID </th>
                                    <th style='text-align:center;'>Pemesan </th>
                                    <th style='text-align:center;'>Tgl Order</th>
                                    <th style='text-align:center;'>Tertanggung</th>
                                    <th style='text-align:center;'>Pekerjaan </th>
                                   <th style='text-align:center;'>Nilai Jaminan</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select isnull(c.nama,'-') as nama_am, a.no_bukti as order_id, convert(varchar,a.tgl_input,103) as tgl_order, a.obligee as nama_ttg,
                                isnull(g.nama,'-') as nama_vendor,isnull(b.kode_tipe,'-') as cob,a.nilai_j, a.pekerjaan, convert(varchar,a.tgl_input,103) as tanggal,
                                isnull(datediff(d,a.tgl_input,e.tanggal),0) as lama,isnull(c.nama,'-') as nama_pic,b.no_quo,isnull(d.no_placing,'-') as no_placing,
                                isnull(e.no_polis,'-') as no_polis,isnull(e.no_dok2,'-') as no_dok2, isnull(convert(varchar,b.tanggal,103),'-') as tgl_quo,
                                isnull(convert(varchar,d.tanggal,103),'-') as tgl_placing,isnull(convert(varchar,e.tanggal,103),'-') as tgl_polis,isnull(g.nama,'-') as nama_vendor,h.nama as nama_pemesan,i.nama as nama_pic, 
                                case when a.progress='PS01' then 'Pengajuan' 
                                     when a.progress='PS02' and a.no_quo='-' then 'Verifikasi' 
                                     when a.progress='PS02' and a.no_quo<>'-' then 'Selesai' 
                                     when a.progress='PS04' then 'Polis Terbit' end as status, 
                                     a.kode_cust,j.nama as nama_ttg2 from sju_pesanan_m a 
                                left join sju_quo_m b on a.no_quo=b.no_quo and a.kode_lokasi=b.kode_lokasi 
                                left join sju_pic c on b.kode_pic=c.kode_pic and b.kode_lokasi=c.kode_lokasi 
                                left join sju_placing_m d on b.no_placing=d.no_placing and b.kode_lokasi=d.kode_lokasi 
                                left join sju_polis_m e on d.no_placing=e.no_placing and d.kode_lokasi=e.kode_lokasi 
                                left join sju_polis_termin f on e.no_polis=f.no_polis and e.kode_lokasi=f.kode_lokasi 
                                left join sju_vendor g on f.kode_vendor=g.kode_vendor and f.kode_lokasi=g.kode_lokasi 
                                left join karyawan h on a.nik_user=h.nik and a.kode_lokasi=h.kode_lokasi 
                                left join karyawan i on b.nik_user=i.nik and b.kode_lokasi=i.kode_lokasi 
                                inner join sju_cust j on a.kode_cust=j.kode_cust and a.kode_lokasi=j.kode_lokasi 
                                where a.kode_lokasi='11' and a.progress='PS01'  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->order_id/null/null/null');\" >$row->order_id</a></td>
                                        <td>$row->nama_pemesan</td>
                                        <td>$row->tgl_order</td>
                                        <td>$row->nama_ttg2</td>
                                        <td>$row->pekerjaan</td>
                                        <td>".number_format($row->nilai_j,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "quo" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Quotation</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Quo </th>
                                    <th style='text-align:center;'>Customer </th>
                                    <th style='text-align:center;'>PIC</th>
                                    <th style='text-align:center;'>Tgl</th>
									<th style='text-align:center;'>Tipe</th>
									<th style='text-align:center;'>Objek</th>
									<th style='text-align:center;'>Asuransi</th>
                                    <th style='text-align:center;'>Premi </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_quo,a.kode_cust,b.nama as nama_cust,d.nama as nama_pic,convert(varchar(20),a.tanggal,103) as tgl_quo,a.kode_pic,
                                convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,
                                a.occup,a.lokasi,a.objek,a.catat,a.kode_tipe,
                                dbo.fnGetQuoVendor(a.no_quo,a.kode_lokasi) as nama_vendor 
                                from sju_quo_m a 
                                inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
                                inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
                                inner join sju_tipe h on a.kode_tipe=h.kode_tipe and a.kode_lokasi=h.kode_lokasi
                                where a.kode_lokasi='11' and a.progress in ('0','R','B','1')  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a>$row->no_quo</a></td>
                                        <td>$row->nama_cust</td>
                                        <td>$row->nama_pic</td>
                                        <td>$row->tgl_quo</td>
                                        <td>$row->kode_tipe</td>
										<td>$row->objek</td>
										<td>$row->nama_vendor</td>
                                        <td>$row->n_premi</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "nota" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Nota Konformasi</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-nota'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Quo </th>
                                    <th style='text-align:center;'>Customer </th>
                                    <th style='text-align:center;'>PIC</th>
                                    <th style='text-align:center;'>Tgl</th>
									<th style='text-align:center;'>Tipe</th>
									<th style='text-align:center;'>Objek</th>
									<th style='text-align:center;'>Asuransi</th>
                                    <th style='text-align:center;'>Premi </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_quo,a.kode_cust,b.nama as nama_cust,d.nama as nama_pic,convert(varchar(20),a.tanggal,103) as tgl_quo,a.kode_pic,
                                convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,
                                a.occup,a.lokasi,a.objek,a.catat,a.kode_tipe,
                                dbo.fnGetQuoVendor(a.no_quo,a.kode_lokasi) as nama_vendor 
                                from sju_quo_m a 
                                inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
                                inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
                                inner join sju_tipe h on a.kode_tipe=h.kode_tipe and a.kode_lokasi=h.kode_lokasi
                                where a.kode_lokasi='11' and a.progress in ('1')  ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a>$row->no_quo</a></td>
                                        <td>$row->nama_cust</td>
                                        <td>$row->nama_pic</td>
                                        <td>$row->tgl_quo</td>
                                        <td>$row->kode_tipe</td>
										<td>$row->objek</td>
										<td>$row->nama_vendor</td>
                                        <td>$row->n_premi</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "pla" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Placing</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-placing'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Placing </th>
                                    <th style='text-align:center;'>Customer </th>
                                    <th style='text-align:center;'>PIC</th>
                                    <th style='text-align:center;'>Tgl</th>
									<th style='text-align:center;'>Tipe</th>
									<th style='text-align:center;'>Objek</th>
									<th style='text-align:center;'>Asuransi</th>
                                    <th style='text-align:center;'>Premi </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_placing,b.nama as nama_cust,d.nama as nama_pic,date_format(a.tanggal,'%d/%m/%Y') as tgl_placing,a.kode_pic,
									   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,
									   a.occup,a.lokasi,a.objek,a.kode_tipe,a.lokasi,a.kode_cust,i.no_polis as noreg,j.no_bill as bill,i.no_dok as nodok,
									   dbo.fnGetPlacingVendor(a.no_placing,a.kode_lokasi) as nama_vendor 
								from sju_placing_m a 
								inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
								inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
								inner join sju_tipe h on a.kode_tipe=h.kode_tipe and a.kode_lokasi=h.kode_lokasi
								left join sju_polis_m i on a.no_placing=i.no_placing and a.kode_lokasi=i.kode_lokasi
								left join sju_polis_termin j on i.no_polis=j.no_polis and i.kode_lokasi=j.kode_lokasi 
								where a.kode_lokasi='11' and a.progress in ('0','1')";
								
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a>$row->no_placing</a></td>
                                        <td>$row->nama_cust</td>
                                        <td>$row->nama_pic</td>
                                        <td>$row->tgl_placing</td>
                                        <td>$row->kode_tipe</td>
										<td>$row->objek</td>
										<td>$row->nama_vendor</td>
                                        <td>$row->n_premi</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "pol" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Polis</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-polis'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Register </th>
									<th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Customer </th>
                                    <th style='text-align:center;'>PIC</th>
                                    <th style='text-align:center;'>Tgl</th>
									<th style='text-align:center;'>Tipe</th>
									<th style='text-align:center;'>Objek</th>
									<th style='text-align:center;'>Asuransi</th>
                                    <th style='text-align:center;'>Premi </th>
                                </tr>
                                </thead>
                                <tbody>";

                               $sql="select  a.no_bill,d.kode_pp,a.kode_lokasi,a.diskon*a.kurs as diskon,a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
											date_format(d.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(d.tgl_selesai,'%d/%m/%Y') as tgl_selesai,date_format(d.tanggal,'%d/%m/%Y') as tgl_polis,
										case when a.no_bill='-' then a.fee else (a.fee*a.kurs) end as fee,
										case when a.no_bill='-' then a.premi else (a.premi*a.kurs) end as premi,
										case when a.no_bill='-' then a.ppn else (a.ppn*a.kurs) end as ppn,
										case when a.no_bill='-' then a.pph else (a.pph*a.kurs) end as pph,
										case when a.no_bill='-' then d.total else a.kurs*d.total end as total,
										case when a.no_bill='-' then (a.p_cost+a.materai) else a.kurs*(a.p_cost+a.materai) end as biaya_adm,
										d.p_premi,d.p_fee,isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,i.nama as nama_klp,
										d.no_placing,convert(varchar,d.tanggal,103) as tgl_placing,convert(varchar,j.tanggal,103) as tgl_quo,date_format(a.due_date,'%d/%m/%Y') as due_date,h.kode_klp,j.no_quo, d.no_polisseb,a.ke,
										date_format(k.tanggal,'%d/%m/%Y') as tgl_bill,date_format(l.tanggal,'%d/%m/%Y') as tgl_kas,date_format(m.tanggal,'%d/%m/%Y') as tgl_kashut
								from sju_polis_termin a
								inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
								left join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
								inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
								inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
								inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
								inner join sju_tipe_klp i on h.kode_klp=i.kode_klp and h.kode_lokasi=i.kode_lokasi
								left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
								left join sju_quo_m j on d.no_polis=j.no_polis and d.kode_lokasi=j.kode_lokasi
								left join trans_m k on a.no_bill=k.no_bukti and a.kode_lokasi=b.kode_lokasi
								left join trans_m l on g.no_bukti=l.no_bukti and g.kode_lokasi=l.kode_lokasi
								left join trans_m m on g.no_kashut=m.no_bukti and g.kode_lokasi=m.kode_lokasi
								where a.kode_lokasi='11' and g.no_bukti is null
								order by d.kode_tipe,a.no_polis";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a>$row->no_polis</a></td>
                                        <td>$row->no_dok</td>
										<td>$row->nama_cust</td>
                                        <td>$row->nama_pic</td>
                                        <td>$row->tgl_polis</td>
                                        <td>$row->kode_tipe</td>
										<td>$row->objek</td>
										<td>$row->nama_vendor</td>
                                        <td>$row->premi</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "jt" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Polis Jatuh Tempo</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-jt'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Register </th>
                                    <th style='text-align:center;'>No Polis </th>
									<th style='text-align:center;'>Customer </th>
                                    <th style='text-align:center;'>PIC</th>
                                    <th style='text-align:center;'>Tgl</th>
									<th style='text-align:center;'>Objek</th>
									<th style='text-align:center;'>Asuransi</th>
                                    <th style='text-align:center;'>Premi </th>
                                </tr>
                                </thead>
                                <tbody>";

                              $sql="select 'INPROG' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.nama as nama_cust,c.nama as nama_vendor,a.kode_curr,a.total, 
								a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr,convert(varchar,getdate(),103) as tgl1,convert(varchar,getdate()+30,103) as tgl2,d.nama as nama_pic
								from sju_polis_m a 					 
								inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
								inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
								inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
								inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
								where a.kode_lokasi='11' and (a.tgl_selesai between '2019-03-01' and '2019-04-01') and a.kode_cust='$kunci'
								order by a.tgl_selesai ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a>$row->no_polis</a></td>
										<td>$row->no_dok</td>
                                        <td>$row->nama_cust</td>
                                        <td>$row->nama_pic</td>
                                        <td>$row->tgl_selesai</td>
										<td>$row->objek</td>
										<td>$row->nama_vendor</td>
                                        <td>$row->n_premi</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                    }
                  
                    echo"
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

		echo "<script type='text/javascript'>
			var table2 = $('#table-pemesanan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
            var table = $('#table-quo').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-nota').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-placing').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-polis').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-jt').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
                
			</script>
		";
        
		return "";
	}
	
}
?>
