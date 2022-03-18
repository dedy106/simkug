<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamSaldoNilai extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_saham)
from inv_saham a
inner join (select a.kode_saham,a.kode_kelola 
			,isnull(z.sawal,0) + isnull(b.beli,0) - isnull(c.jual,0) as nilai
			,isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0) as stok
			,case when (isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0)) = 0 then 0 
			 else (isnull(z.sawal,0) + isnull(b.beli,0) - isnull(c.jual,0)) / (isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0)) 
			end as harga
			from inv_saham_d a 
			left join (
						select x.kode_saham,x.kode_kelola,sum(x.h_oleh*x.jumlah) as sawal,sum(x.jumlah) as jml_sawal
						from inv_shmbeli_d x inner join inv_shmbeli_m y on x.no_shmbeli=y.no_shmbeli 
						where y.periode ='201206' 
						group by x.kode_saham,x.kode_kelola
						) z on a.kode_saham=z.kode_saham and a.kode_kelola=z.kode_kelola
			left join (
						select x.kode_saham,x.kode_kelola,sum(x.harga*x.jumlah) as beli,sum(x.jumlah) as jml_beli
						from inv_shmbeli_d x inner join inv_shmbeli_m y on x.no_shmbeli=y.no_shmbeli 
						where y.periode>'201206' and y.periode <='$periode'
						group by x.kode_saham,x.kode_kelola
						) b on a.kode_saham=b.kode_saham and a.kode_kelola=b.kode_kelola
			left join (
						select x.kode_saham,x.kode_kelola,sum((x.h_jual*x.jumlah)-x.gainlos) as jual, sum(x.jumlah) as jml_jual
						from inv_shmjual_d x inner join inv_shmjual_m y on x.no_shmjual=y.no_shmjual 
						where y.periode<='$periode' 
						group by x.kode_saham,x.kode_kelola
						) c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
			) b on a.kode_saham=b.kode_saham
inner join inv_kelola c on b.kode_kelola=c.kode_kelola $this->filter  ";
		
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
		
		
		$sql="select a.kode_saham,a.nama as nama_saham,b.kode_kelola,c.nama as nama_kelola,
	   isnull(b.nilai,0) as nilai,isnull(b.stok,0) as stok,
	   isnull(b.harga,0) as harga
from inv_saham a
inner join (select a.kode_saham,a.kode_kelola 
			,isnull(z.sawal,0) + isnull(b.beli,0) - isnull(c.jual,0) as nilai
			,isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0) as stok
			,case when (isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0)) = 0 then 0 
			 else (isnull(z.sawal,0) + isnull(b.beli,0) - isnull(c.jual,0)) / (isnull(z.jml_sawal,0) + isnull(b.jml_beli,0) - isnull(c.jml_jual,0)) 
			end as harga
			from inv_saham_d a 
			left join (
						select x.kode_saham,x.kode_kelola,sum(x.h_oleh*x.jumlah) as sawal,sum(x.jumlah) as jml_sawal
						from inv_shmbeli_d x inner join inv_shmbeli_m y on x.no_shmbeli=y.no_shmbeli 
						where y.periode ='201206' 
						group by x.kode_saham,x.kode_kelola
						) z on a.kode_saham=z.kode_saham and a.kode_kelola=z.kode_kelola
			left join (
						select x.kode_saham,x.kode_kelola,sum(x.harga*x.jumlah) as beli,sum(x.jumlah) as jml_beli
						from inv_shmbeli_d x inner join inv_shmbeli_m y on x.no_shmbeli=y.no_shmbeli 
						where y.periode>'201206' and y.periode <='$periode'
						group by x.kode_saham,x.kode_kelola
						) b on a.kode_saham=b.kode_saham and a.kode_kelola=b.kode_kelola
			left join (
						select x.kode_saham,x.kode_kelola,sum((x.h_jual*x.jumlah)-x.gainlos) as jual, sum(x.jumlah) as jml_jual
						from inv_shmjual_d x inner join inv_shmjual_m y on x.no_shmjual=y.no_shmjual 
						where y.periode<='$periode' 
						group by x.kode_saham,x.kode_kelola
						) c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
			) b on a.kode_saham=b.kode_saham
inner join inv_kelola c on b.kode_kelola=c.kode_kelola $this->filter
order by b.kode_kelola,a.kode_saham";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='30'>No</td>
    <td align='center' class='header_laporan' width='60'>Kode Saham </td>
    <td align='center' class='header_laporan' width='200'>Nama Perusahaan</td>
	 <td align='center' class='header_laporan' width='60'>Kode Kelola </td>
    <td align='center' class='header_laporan' width='150'>Nama Nama Kelola</td>
	<td  align='center' class='header_laporan' width='90'>Jumlah Saham (Lbr)</td>
	 <td width='90' align='center' class='header_laporan'>Harga Rata-Rata Per Saham (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    </tr>
  
 ";
		$nilai=0;$stok=0;$harga=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$stok=$stok+$row->stok;
			$harga=$harga+$row->harga;
			
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_saham</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan' align='right'>".number_format($row->stok,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->harga,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='5'>Total</td>
      <td class='header_laporan' align='right'>".number_format($stok,0,",",".")."</td>
	  <td class='header_laporan' align='center' >&nbsp;</td>
	   <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
