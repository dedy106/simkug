<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlTb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis_pp=$tmp[2];
		$kode_pp=$tmp[3];
		$jenis_mutasi=$tmp[4];
		$jenis_lap=$tmp[5];
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		
		
		$mutasi="";
		if ($jenis_mutasi=="Tidak")
		{
			$mutasi="and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		if ($jenis_pp=="All")
		{
			$sql = "select a.kode_akun,d.nama,a.kode_lokasi,sum(a.debet) as debet,sum(a.kredit) as kredit,sum(a.so_awal) as so_awal,sum(so_akhir) as so_akhir,'*' as kode_pp
				from exs_glma_pp a 
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				$this->filter 
				group by a.kode_akun,d.nama,a.kode_lokasi
				order by a.kode_akun";
		}
		else
		{
			$sql = "select a.kode_akun,d.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir,a.kode_pp
				from exs_glma_pp a 
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				$this->filter $kode_pp $mutasi
				order by a.kode_akun,a.kode_pp";
		}
		
		
		if ($trail=="1")
		{
			$sql = "select a.kode_akun,a.kode_pp,d.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir,a.kode_pp
		from exs_glma_pp a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
				$this->filter $mutasi
				order by a.kode_akun";
		}
		
		
		
		$rs = $dbLib->execute($sql);		
		
		$i=1;
		echo "<div class='container-fluid'>";
		echo "	<div class='row'>
					<div class='col-md-12 text-center'>$this->lokasi</div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'><h4>TRIAL BALANCE</h4></div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'>$nama_periode</div>
				</div>";
		echo "<table class='table table-hover'>
				<thead>
				  <tr>
					<th>No</th>
					<th>Kode Akun</th>
					<th>Nama Akun</th>
					<th>Kode PP</th>
					<th>Saldo Awal</th>
					<th>Debet</th>
					<th>Kredit</th>
					<th>Saldo Akhir</th>
					
				  </tr>
				</thead>
				<tbody>
				  
				";
		
		$debet=0; $kredit=0; $so_awal=0; $so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_awal=$so_awal+$row->so_awal;
			$so_akhir=$so_akhir+$row->so_akhir;
			
			echo "<tr>
				<td >$i</td>
				<td >".$AddOnLib->fnAkun($row->kode_akun)."</td>
				<td >$row->nama</td>
				<td >$row->kode_pp</td>
				<td class='text-right'>".number_format($row->so_awal,2,',','.')."</td>
				<td class='text-right'>".number_format($row->debet,2,',','.')."</td>
				<td class='text-right'>".number_format($row->kredit,2,',','.')."</td>
				<td class='text-right'>".number_format($row->so_akhir,2,',','.')."</td>
				<td >$row->nik_user</td>
			  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
				<td >&nbsp;</td>
				<td >&nbsp;</td>
				<td >&nbsp;</td>
				<td ><strong>Total</strong></td>
				<td class='text-right'><strong>".number_format($so_awal,2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format($debet,2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format($kredit,2,',','.')."</strong></td>
				<td class='text-right'><strong>".number_format($so_akhir,2,',','.')."</strong></td>
			</tr>";
		echo "</tbody>
			</table>	
			</div>";
		return "";
		
	}
	
}
?>
