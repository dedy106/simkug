<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptRekapAkun extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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

		$sql="select a.sts_sdm,a.nama
from gr_status_sdm a
inner join (select b.sts_sdm,a.kode_lokasi			
			from gr_gaji_d a 
			inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter
			group by b.sts_sdm,a.kode_lokasi
		    )b on a.sts_sdm=b.sts_sdm and a.kode_lokasi=b.kode_lokasi 
where a.kode_lokasi='$kode_lokasi' ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("RESUME PEMBAYARAN GAJI KARYAWAN",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>NO</td>
		<td width='300' align='center' class='header_laporan'>URAIAN</td>
		<td width='100' align='center' class='header_laporan'>AKUN</td>
		<td width='100' align='center' class='header_laporan'>Nilai</td>

   </tr>";
		$total=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			echo "<tr>
			<td class='header_laporan' align='center'>$i</td>
			<td class='header_laporan'>$row->nama</td>
			<td class='header_laporan'></td>
			<td class='header_laporan' align='right'></td>
			</tr>";	 
			
			$sql="select b.kode_akun,b.nama as nama_akun,isnull(a.nilai,0) as nilai
from (select c.akun_gaji,a.sts_sdm,a.kode_lokasi,sum(b.nilai) as nilai
from gr_karyawan a
inner join (select a.nik,a.kode_lokasi,sum(a.nilai) as nilai			
			from gr_gaji_d a 
			inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			$this->filter
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join gr_gaji_akun c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
group by c.akun_gaji,a.sts_sdm,a.kode_lokasi
	)a
inner join masakun b on a.akun_gaji=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.sts_sdm='$row->sts_sdm'
order by b.kode_akun
";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
				echo "<tr>
				<td class='isi_laporan' align='center'></td>
				<td class='isi_laporan'>$row1->nama_akun</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
				</tr>";	 
			}
			$total+=$nilai;
			echo "<tr>
				<td class='header_laporan' align='center' colspan='3'>Sub Total</td>
				<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				</tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center'  colspan='3'>Total</td>
			<td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
			</tr>
		</div>";
		return "";
	}
	
}
?>
  
