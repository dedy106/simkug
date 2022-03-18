<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_logistik_rptKma extends server_report_basic
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
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_reg,a.no_peserta,a.no_paket,a.tgl_input,d.nama,e.nama_agen,convert(varchar(20),a.tgl_input,103) as tgl,
	   a.harga+harga_room as paket,isnull(b.nilai,0) as tambahan,f.nama as nama_paket,a.no_agen
from dgw_reg a
inner join dgw_peserta d on a.no_peserta=d.no_peserta and a.kode_lokasi=d.kode_lokasi
inner join dgw_agent e on a.no_agen=e.no_agen and a.kode_lokasi=e.kode_lokasi
inner join dgw_paket f on a.no_paket=f.no_paket and a.kode_lokasi=f.kode_lokasi
left join (select a.no_reg,a.kode_lokasi,sum(a.nilai) as nilai
		   from dgw_reg_biaya a
		   where a.kode_lokasi='$kode_lokasi'
		   group by a.no_reg,a.kode_lokasi
		   )b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_reg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu monitoring aset",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Nomor Ruang</td>
        <td width='360' class='header_laporan'>: $row->no_reg</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Nama Ruang</td>
        <td width='360' class='header_laporan'>: $row->no_peserta</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Lokasi</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nama Gedung</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Periode Monitoring</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td rowspan='2' width='50' class='header_laporan' align='center'>No</td>
    <td rowspan='2' width='100' class='header_laporan' align='center'>Kode Barang</td>
    <td rowspan='2' width='250' class='header_laporan' align='center'>Nama Barang</td>
    <td rowspan='2' width='100' class='header_laporan' align='center'>Jumlah</td>
    <td rowspan='2' width='250' class='header_laporan' align='center'>Satuan</td>	
	<td colspan='2' align='center' class='header_laporan'>Keterangan</td>
 	<td rowspan='2' width='250' class='header_laporan' align='center'>Pegecekan Fisik</td> 
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' class='header_laporan' align='center'>Berfungsi</td>
	<td width='80' class='header_laporan' align='center'>Tidak Berfungsi</td>
  </tr>
  
";
			
			$sql="select a.no_kwitansi,a.kode_lokasi,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,a.nilai_p,a.nilai_t
from dgw_pembayaran a
inner join kas_m b on a.no_kwitansi=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_reg='$row->no_reg'
order by b.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo_paket=$row->paket;
			$saldo_tambahan=$row->tambahan;
			$nilai_p=0;
			$nilai_t=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$nilai_p+=$row1->nilai_p;
				$nilai_t+=$row1->nilai_t;
				echo "<tr>
	 <td class='isi_laporan'>$row1->tgl</td>
	 <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_kwitansi','$row1->kode_lokasi');\">$row1->no_kwitansi</a>";
	echo "</td>
     <td class='isi_laporan'>$row1->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row1->nilai_p,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->nilai_t,0,',','.')."</td>
     <td class='isi_laporan'>$row1->keterangan</td>
 
 </tr>";
				
			}
			echo "<tr>
   <td  colspan='3' valign='top' class='header_laporan' align='right'>Total Pembayaran&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($nilai_p,0,',','.')."</td>
  <td valign='top' class='header_laporan' align='right'>".number_format($nilai_t,0,',','.')."</td>
 </tr>
		<tr>
   <td  colspan='3' valign='top' class='header_laporan' align='right'>Saldo&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($row->paket-$nilai_p,0,',','.')."</td>
  <td valign='top' class='header_laporan' align='right'>".number_format($row->tambahan-$nilai_t,0,',','.')."</td>
 </tr>
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
