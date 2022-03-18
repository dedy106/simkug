<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptJualCust extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select * from 
        (
        select d.kode_cust,d.nama as cust,b.kode_brg, b.nama, sum(a.jumlah) as keluar
        from apo_brg_jual_d a 
        inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
        inner join apo_brg_jual_m c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi
        inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
        $this->filter
        group by b.kode_brg, b.nama,d.kode_cust,d.nama
        ) x 
        order by x.kode_cust,x.nama, x.keluar desc";

        // echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan per customer",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>Kode Customer</td>
	  <td width='170'  align='center' class='header_laporan'>Nama Customer</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Barang</td>
     <td width='200'  align='center' class='header_laporan'>Nama Barang</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->keluar;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->cust</td>
	 <td class='isi_laporan'>$row->kode_brg</td>
	 <td class='isi_laporan'>$row->nama</td>
     <td class='isi_laporan' align='right'>".number_format($row->keluar,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='5'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
