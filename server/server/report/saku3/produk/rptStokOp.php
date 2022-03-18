<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptStokOp extends server_report_basic
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
		$nik_user=$tmp[2];
		$tmp="";
		if ($jenis=="Tidak")
		{
			$tmp=" and a.stok<>0 ";
		}
		
		$sql= "exec sp_brg_stok_mutasi '$periode','$kode_lokasi','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql= "exec sp_brg_hpp '$periode','$kode_lokasi','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql="select a.kode_barang,a.kode_gudang,a.stok,a.kode_lokasi,a.so_awal,a.debet,a.kredit,d.h_avg,d.h_avg*a.stok as nilai,b.sat_kecil, 
	   b.nama as nama_barang,c.nama as nama_gudang
from brg_stok a
inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi 
inner join brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi 
inner join brg_hpp d on a.kode_lokasi=d.kode_lokasi and a.kode_barang=d.kode_barang and a.nik_user=d.nik_user
$this->filter and a.nik_user='$nik_user'
order by a.kode_barang,a.kode_gudang ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kartu stok barang",$this->lokasi," Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='11' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Barang</td>
        <td width='360' class='header_laporan'>: $row->kode_barang</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Nama Barang</td>
        <td width='360' class='header_laporan'>: $row->nama_barang</td>
      </tr>  
	   <tr>
        <td width='99' class='header_laporan'>Gudang</td>
        <td width='360' class='header_laporan'>: $row->nama_gudang</td>
      </tr>	 
	   <tr>
        <td width='99' class='header_laporan'>Stok Awal</td>
        <td width='360' class='header_laporan'>: $row->so_awal</td>
      </tr>	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='60' class='header_laporan' align='center'>Tanggal</td>
    <td  width='100' class='header_laporan' align='center'>No. Bukti</td>
    <td  width='200' class='header_laporan' align='center'>Keterangan</td>	
    <td  width='100' class='header_laporan' align='center'>Modul</td>
	<td  width='50'align='center' class='header_laporan'>Masuk</td>
	<td width='50' align='center' class='header_laporan'>Keluar</td>
	<td width='50' align='center' class='header_laporan'>Stok</td>
	
  </tr>

";
			
			$sql1="select convert(varchar(20),a.tgl_ed,103) as tgl , a.no_bukti, b.keterangan, a.modul, a.stok,a.harga,b.param2,
case when a.dc='D' then a.jumlah else 0 end as debet,	      
case when a.dc='C' then a.jumlah else 0 end as kredit
from brg_trans_d a
inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
inner join brg_barang c on a.kode_barang=c.kode_barang and a.kode_lokasi=c.kode_lokasi 
where a.kode_barang='$row->kode_barang' and a.kode_lokasi='$row->kode_lokasi' and a.kode_gudang='$row->kode_gudang' and a.periode='$periode'
order by a.tgl_ed ";

			
			$rs1 = $dbLib->execute($sql1);
			$debet=0;
			$kredit=0;
			$stok=$row->so_awal;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$kredit+=$row1->kredit;
				$debet+=$row1->debet;
				$stok+=$row1->debet-$row1->kredit;
				echo "<tr>
	 <td class='isi_laporan'>$row1->tgl</td>
     <td class='isi_laporan'>$row1->no_bukti</td>
     <td class='isi_laporan'>$row1->keterangan</td>	 
     <td class='isi_laporan'>$row1->modul</td>
     <td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($stok,0,',','.')."</td>
	 
  </tr>";
				
			}
			echo "<tr>
	 <td class='header_laporan' colspan='4' align='right'>Jumlah</td>
	 <td class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
     <td class='header_laporan' align='right'>".number_format($stok,0,',','.')."</td>";
			
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
