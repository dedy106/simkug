<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlJurnal extends server_report_basic
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_bukti,a.jenis,a.no_dokumen,c.nama,convert(varchar(20),a.tanggal,103) as tgl,a.nik_user,
			a.kode_akun,a.kode_pp,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,
			case when a.dc='C' then a.nilai else 0 end as kredit,
			a.kode_cust,a.kode_vendor,a.no_ref1,a.no_ref2,a.no_ref3
		from gldt a 
		inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
		$this->filter 
		order by a.no_bukti ";
		$rs = $dbLib->execute($sql);		
		
		$i=1;
		echo "<div class='container-fluid'>";
		echo "	<div class='row'>
					<div class='col-md-12 text-center'>$this->lokasi</div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'><h4>DAFTAR JURNAL</h4></div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'>$nama_periode</div>
				</div>";
		echo "<table class='table table-hover'>
				<thead>
				  <tr>
					<th>No</th>
					<th>Kode PP</th>
					<th>No Bukti</th>
					<th>Tanggal</th>
					<th>Akun</th>
					<th>Nama Akun</th>
					<th>COB</th>
					<th>Insurer</th>
					<th>Insured</th>
					<th>Acc</th>
					<th>No Register</th>
					<th>Keterangan</th>
					
					<th>Debet</th>
					<th>Kredit</th>
					<th>User Id</th>
					
				  </tr>
				</thead>
				<tbody>
				  
				";
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_bukti; 
			if ($tmp!=$row->no_bukti)
			{
				$tmp=$row->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td ><strong>Sub Total</strong></td>
						<td class='text-right'><strong>$ndebet</strong></td>
						<td class='text-right'><strong>$nkredit</strong></td>
					  </tr>";
				}
				
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,2,',','.');
			$nkredit=number_format($kredit,2,',','.');
			
			echo "<tr>
				<td >$i</td>
				<td >$row->kode_pp</td>
				<td >$row->no_bukti</td>
				<td >$row->tgl</td>
				<td >".$AddOnLib->fnAkun($row->kode_akun)."</td>
				<td >$row->nama</td>
				<td >$row->no_ref1</td>
				<td >$row->kode_cust</td>
				<td >$row->kode_vendor</td>
				<td >$row->no_ref2</td>
				<td >$row->no_dokumen</td>
				<td >$row->keterangan</td>
				
				<td class='text-right'>".number_format($row->debet,2,',','.')."</td>
				<td class='text-right'>".number_format($row->kredit,2,',','.')."</td>
				<td >$row->nik_user</td>
			  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,2,',','.');
		$nkredit=number_format($kredit,2,',','.');
		echo "<tr>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td >&nbsp;</td>
						<td ><strong>Sub Total</strong></td>
						<td class='text-right'><strong>$ndebet</strong></td>
						<td class='text-right'><strong>$nkredit</strong></td>
					  </tr>";
		echo "</tbody>
			</table>	
			</div>";
		return "";
		
	}
	
}
?>
