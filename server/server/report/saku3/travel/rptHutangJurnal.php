<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptHutangJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
		$sql="select 1";
		
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
		$sql="select e.nik1,a.no_hutang,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_lokasi,
		a.nik_user,b.nama as nama_buat,c.nama as nama_setuju, d.kota,a.keterangan,a.no_dokumen 
		from hutang_d a
		inner join lokasi d on d.kode_lokasi = a.kode_lokasi 
		left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
		inner join trans_m e on a.no_hutang=e.no_bukti and a.kode_lokasi=e.kode_lokasi 
		left join karyawan c on e.nik1=c.nik and e.kode_lokasi=c.kode_lokasi 
			$this->filter
			order by a.no_hutang";

			// echo $sql;
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>JURNAL HUTANG</td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_hutang</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>No Dokumen </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_dokumen</td>
					</tr>
				 
				  <tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row->tgl</td>
					</tr>
				 
				<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='60' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_bukti='$row->no_hutang' and a.kode_lokasi='$row->kode_lokasi'
			order by a.nu ";
		//error_log($sql1);
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='6' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
