<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptDetCuti extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		
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
		$sts_cuti=$tmp[2];
		$periode_awal=substr($periode,0,4)."01";
		$type_periode = $tmp[3];
		if($type_periode == "<="){
			$filter_periode = " and periode between $periode_awal and $periode ";
		}else{
			$filter_periode = " and periode = '$periode' ";
		}
		$sql="select a.nik,a.nama,b.nama as jabatan,convert(varchar,a.tgl_masuk,103) as tgl_masuk,
				isnull(c.jumlah,0) as jumlah,isnull(c.tambah,0) as tambah,isnull(c.kurang,0) as kurang,
				isnull(d.pakai,0) as pakai,isnull(e.closing,0) as closing,
				isnull(c.jumlah,0)+isnull(c.tambah,0)-isnull(c.kurang,0)-isnull(d.pakai,0)-isnull(e.closing,0) as saldo
			from gr_karyawan a
			inner join gr_jab b on a.kode_jab=b.kode_jab
			inner join (select nik,sum(jumlah) as jumlah,sum(tambah) as tambah,sum(kurang) as kurang
						from gr_cuti_karyawan
						where kode_lokasi='$kode_lokasi' and periode='$periode_awal' and sts_cuti='$sts_cuti'
						group by nik
					)c on a.nik=c.nik
			left join (select nik_buat,sum(lama+lama_lalu) as pakai
						from gr_cuti
						where kode_lokasi='$kode_lokasi'  $filter_periode  and sts_cuti='$sts_cuti'
						group by nik_buat
					)d on a.nik=d.nik_buat
			left join (select nik_buat,sum(lama+lama_lalu) as closing
						from gr_cuti
						where kode_lokasi='$kode_lokasi'  $filter_periode  and no_cuti like '%CLS%' and sts_cuti='$sts_cuti'
						group by nik_buat
					)e on a.nik=e.nik_buat
			$this->filter
			order by a.nik";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("detail cuti",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total = $row->jumlah+$row->tambah;
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='1000'>
	
			<tr >
			<td height='23' colspan='10' ><table width='700' border='0' cellspacing='2' cellpadding='1'>
				<tr >
				<td width='200' class='isi_laporan'>NIK</td>
				<td width='600' class='isi_laporan'>: $row->nik</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Nama</td>
				<td class='isi_laporan'>: $row->nama</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Jabatan</td>
				<td class='isi_laporan'>: $row->jabatan</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Tanggal Masuk </td>
				<td class='isi_laporan'>: $row->tgl_masuk</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Hak Cuti Tahun Lalu </td>
				<td class='isi_laporan'>: $row->tambah</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Hak Cuti Tahun Ini </td>
				<td class='isi_laporan'>: $row->jumlah</td>
				</tr>
				<tr>
				<td class='isi_laporan'>Total Hak Cuti</td>
				<td class='isi_laporan'>: $total</td>
				</tr>
			</table></td>
			</tr>
			
			<tr bgcolor='#CCCCCC'>
			<td width='80' height='23' class='header_laporan' align='center'>No Cuti</td>
			<td width='60' class='header_laporan' align='center'>Tanggal</td>
			<td width='60' class='header_laporan' align='center'>Tgl Mulai</td>
			<td width='60' class='header_laporan' align='center'>Tgl Selesai</td>
			<td width='150' class='header_laporan' align='center'>Alasan</td>
			<td width='150' class='header_laporan' align='center'>Alamat</td>
			<td width='60' class='header_laporan' align='center'>Cuti Tahun Lalu</td>
			<td width='60' class='header_laporan' align='center'>Cuti Tahun Ini</td>
			<td width='60' class='header_laporan' align='center'>Jumlah Cuti</td>
			<td width='60' class='header_laporan' align='center'>Sisa Cuti</td>
			</tr>
			
		";
					
			$sql="select a.no_cuti,a.tanggal,a.tgl_mulai,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.alasan,
					a.lama,a.lama_lalu as lama1,a.alamat
				from gr_cuti a
				where a.nik_buat='$row->nik' and a.sts_cuti='$sts_cuti'  $filter_periode and a.kode_lokasi='$kode_lokasi'
				union all
				select a.no_cuti,a.tanggal,a.tgl_mulai,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.alasan,
					a.lama,0 as lama1,'-' as alamat
				from gr_cuti_d a
				where a.nik='$row->nik' and a.sts_cuti='$sts_cuti'  $filter_periode and a.kode_lokasi='$kode_lokasi'
				order by tanggal asc";
			
			$rs1 = $dbLib->execute($sql);
			$lama1=0;$lama=0;$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$lama1+=$row1->lama1;
				$lama+=$row1->lama;
				$saldo+=($row1->lama+$row1->lama1);
				$total-=($row1->lama+$row1->lama1);
				echo "<tr>
				<td class='isi_laporan'>".$row1->no_cuti."</td>
				<td height='23' class='isi_laporan'>".$row1->tgl."</td>
				<td class='isi_laporan'>".$row1->tgl_mulai."</td>
				<td class='isi_laporan'>".$row1->tgl_selesai."</td>
				<td class='isi_laporan'>".$row1->alasan."</td>
				<td class='isi_laporan'>".$row1->alamat."</td>
				<td class='isi_laporan' align='center'>".number_format($row1->lama1,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($row1->lama,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($row1->lama+$row1->lama1,0,',','.')."</td>
				<td class='isi_laporan' align='center'>".number_format($total,0,',','.')."</td>
				</tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='header_laporan' align='right' colspan='6'>Total</td>
				<td class='header_laporan' align='center'>".number_format($lama1,0,',','.')."</td>
				<td class='header_laporan' align='center'>".number_format($lama,0,',','.')."</td>
				<td class='header_laporan' align='center'>".number_format($saldo,0,',','.')."</td>
				<td class='header_laporan' align='center'>".number_format($total,0,',','.')."</td>
				</tr>";
			echo "</table><br>";
		}
	  return "";
	  
  	}
  
  
}
?>
