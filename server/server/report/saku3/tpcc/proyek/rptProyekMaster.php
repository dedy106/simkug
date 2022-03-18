<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_proyek_rptProyekMaster extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$sql="select a.kode_proyek,a.nama,a.kode_lokasi,a.no_pks,a.nama,a.kode_cust,b.nama as nama_cust,a.kode_cons,c.nama as nama_cons,a.kode_jenis,d.nama as nama_jenis,a.nilai,a.nilai_or,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai
		from pr_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join consumer c on a.kode_cons=c.kode_cons and a.kode_lokasi=c.kode_lokasi
inner join pr_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_proyek ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Master Project / RAB",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>No. Proyek</td>
        <td width='400' class='header_laporan'>: $row->kode_proyek</td>
      </tr>
      <tr>
        <td width='60' class='header_laporan'>Nama Proyek</td>
        <td width='400' class='header_laporan'>: $row->nama</td>
      </tr> 
      <tr>
        <td width='60' class='header_laporan'>Mitra</td>
        <td width='400' class='header_laporan'>: $row->kode_cust - $row->nama_cust </td>
      </tr>  
      <tr>
        <td width='60' class='header_laporan'>Consumer</td>
        <td width='400' class='header_laporan'>: $row->kode_cons - $row->nama_cons </td>
      </tr>  
      <tr>
        <td width='60' class='header_laporan'>Jenis Proyek</td> 
        <td width='400' class='header_laporan'>: $row->kode_jenis - $row->nama_jenis </td>
      </tr>  
      <tr>
        <td width='60' class='header_laporan'>Jangka Waktu</td> 
        <td width='400' class='header_laporan'>: $row->tgl_mulai - $row->tgl_selesai </td>
      </tr> 
      <tr>
        <td width='60' class='header_laporan'>Nilai Proyek</td> 
        <td width='400' class='header_laporan'>: &nbsp;".number_format($row->nilai,0,',','.')."</td>
      </tr>  
    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'><div align='center'>No</td>
    <td width='200' class='header_laporan'><div align='center'>URAIAN BIAYA </td>
    <td width='80' class='header_laporan'><div align='center'>SAT</td>
	<td width='60' class='header_laporan'><div align='center'>VOL</td>
	<td width='150' class='header_laporan'><div align='center'>HARGA SAT</td>
	<td width='150' class='header_laporan'><div align='center'>HARGA TOTAL</td>
	<td width='150' class='header_laporan'><div align='center'>TOTAL</td>
  </tr>
 ";
			$sql1="select a.keterangan,a.satuan,a.jumlah,a.harga, a.total,b.nilai,b.p_or
from pr_rab_d a
inner join pr_proyek b on a.kode_proyek = b.kode_proyek and a.kode_lokasi = b.kode_lokasi 
where a.kode_proyek='$row->kode_proyek'
order by a.kode_proyek
 ";
 	
			$rs1 = $dbLib->execute($sql1);
			$total=0;$nilai=0;$p_or=0;$nilai=0; $i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				
				$total+=$row1->total;
				$nilai=$row1->nilai;
				$or=$row1->p_or;
				$profit=$row1->nilai-$total;
				
				
				
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan'>$row1->satuan</td>
				<td class='isi_laporan'>$row1->jumlah</td>
				<td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
				
			  </tr>";
			  				$i=$i+1;

			}

			echo "<tr>
				<td align='right' class='header_laporan' colspan='5'>ESTIMASI TOTAL BIAYA</td>
				<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
			  </tr>";
			
			echo "<tr>
				<td align='right' class='header_laporan' colspan='5'>ESTIMASI PROFIT</td>
				<td align='right' class='header_laporan'>".number_format($profit,0,",",".")."</td>
			  </tr>";
			echo "<tr>
				<td align='right' class='header_laporan' colspan='6'>PENDAPATAN</td>
				<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
			  </tr>";	
			echo "<tr>
				<td align='right' class='header_laporan' colspan='6'>TOTAL PENGELUARAN</td>
				<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
			  </tr>";	
			echo "<tr>
				<td align='right' class='header_laporan' colspan='6'>OR</td>
				<td align='right' class='header_laporan'>".number_format($or,0,",",".")."%</td>
			  </tr>";	
			  
			echo "<br>"; 
								$i=$i+1;

		}
		echo "</table></div>";

		return "";
	}
	
}
?>
  
