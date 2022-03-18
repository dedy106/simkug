<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlBukuBesar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$mutasi=$tmp[3];
		$var_periode=$tmp[4];
		$jenis=$tmp[5];
		$xperiode=$tmp[6];
		$periode2=$tmp[7];
		$nama_file="buku_besar.xls";
		
		$sql = "select a.kode_lokasi,a.kode_pp,e.nama as nama_pp,a.kode_akun,d.nama as nama_akun,a.so_awal,a.periode,
					case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,
					case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from exs_glma_pp a 
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
				$this->filter
				order by a.kode_akun";
		
			
		$tmp="";
		
		
		
		if ($jenis=="Excel")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		else
		{
			
		}
		$rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($xperiode=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($xperiode=="All")
		{
			$nama_periode="Semua Periode";
		}
		echo "<div class='container-fluid'>";
		echo "	<div class='row'>
					<div class='col-md-12 text-center'>$this->lokasi</div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'><h4>BUKU BESAR</h4></div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'>$nama_periode</div>
				</div>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "
				<div class='row'>
					<div class='col-md-1'>Kode Akun</div>
					<div class='col-md-11'>: $row->kode_akun - $row->nama_akun</div>
				 </div>
				";
			echo "<table class='table  table-hover'>
				<thead>
				  <tr>
					<th>No</th>
					<th>Tanggal</th>
					<th>Kode PP</th>
					<th>No Bukti</th>
					<th>Keterangan</th>
					<th>COB</th>
					<th>Insurer</th>
					<th>Insured</th>
					<th>Acc Exec</th>
					<th>Debet</th>
					<th>Kredit</th>
					<th>Saldo</th>
				  </tr>
				</thead>
				<tbody>
				
				";
			
			echo "<tr>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >Saldo Awal</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td class='text-right'>".number_format($row->so_debet,2,',','.')."</td>
						<td class='text-right'>".number_format($row->so_kredit,2,',','.')."</td>
						<td class='text-right'>&nbsp;</td>
					  </tr>";
			$sql1="select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.dc,a.nilai,a.keterangan,a.periode,a.kode_pp,
				  case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,
				  convert(varchar(20),a.tanggal,103) as tgl,a.kode_cust,a.kode_vendor,a.no_ref1,a.no_ref2,
				  b.nama as nama_cust,c.nama as nama_vendor,d.nama as nama_pic
			from gldt a
			left join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
			left join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
			left join sju_pic d on a.no_ref2=d.kode_pic and a.kode_lokasi=d.kode_lokasi
			where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp'
			order by a.tanggal
			";
		
			$rs1 = $dbLib->execute($sql1);
			$i=1;
			
			$saldo=$row->so_awal; $tot_debet=0;$tot_kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tot_debet=$tot_debet+$row1->debet;
				$tot_kredit=$tot_kredit+$row1->kredit;
				$saldo=$saldo + $row1->debet - $row1->kredit;
				echo "<tr>
						<td >$i</td>
						<td >$row1->tgl</td>
						<td >$row1->kode_pp</td>
						<td >$row1->no_bukti</td>
						<td >$row1->keterangan</td>
						<td >$row1->no_ref1</td>
						<td >$row1->nama_cust</td>
						<td >$row1->nama_vendor</td>
						<td >$row1->nama_pic</td>
						<td class='text-right'>".number_format($row1->debet,2,',','.')."</td>
						<td class='text-right'>".number_format($row1->kredit,2,',','.')."</td>
						<td class='text-right'>".number_format($saldo,2,',','.')."</td>
					  </tr>";
				$i=$i+1;
			}
			$saldo_debet=""; $saldo_kredit="";
			if ($saldo>=0)
			{
				$saldo_debet=$saldo;
			}
			else
			{
				$saldo_kredit=$saldo;
			}
			
			echo " <tr>
				<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td ><strong>Jumlah Transaksi</strong></td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
			  <td class='text-right'><strong>".number_format($tot_debet,2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format($tot_kredit,2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format($tot_debet-$tot_kredit,2,',','.')."</strong></td>
			  </tr>";
			echo " <tr>
				<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td ><strong>Saldo Akhir</strong></td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
			  <td class='text-right'><strong>".number_format(abs($saldo_debet),2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format(abs($saldo_kredit),2,',','.')."</strong></td>
				<td >&nbsp;</td>
			  </tr>";
			echo "</tbody>
				</table>  ";
		}
		echo "</div>";
		return "";
	}
	
}
?>
