<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tu_kantin_rptNota extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bukti)
from ktu_nota_m a
 $this->filter ";
 
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_bukti,a.tanggal,a.ket,a.kode_kantin,sum(d.total) + a.nilai as tot ,b.nama as kantin,e.nama as loc,e.alamat 
from ktu_nota_m a 
 inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi 
left join brg_trans_d d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
inner join lokasi e on e.kode_lokasi=a.kode_lokasi 
$this->filter 
group by a.no_bukti,a.tanggal,a.ket,a.kode_kantin,a.nilai, b.nama,e.nama,e.alamat 
order by a.no_bukti ";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table    cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='20%' cellspacing='2' >
      
	  <tr>
        <td class='header_laporan' align='center'>$row->kode_kantin -  $row->kantin</td>
        </tr>
		  <tr>
		  <tr>
        <td class='header_laporan' align='center'>$row->loc-$row->alamat</td>
        </tr>
		  <tr>
	  
        <td class='header_laporan'>--------------------------------------------------------------------------------------------------------------------------------------------</td>
      </tr>
	    <tr>
        <td class='header_laporan' align='center'>$row->no_bukti - $row->tanggal </td>
      </tr>
     
	   <tr>
        <td class='header_laporan'>--------------------------------------------------------------------------------------------------------------------------------------------</td>
      </tr>

    </table></td>
  </tr>
  ";
			$sql1="select a.harga,a.kode_barang,c.nama as brg,a.jumlah,a.total
from brg_trans_d a 
inner join ktu_barang c on a.kode_barang=c.kode_barang
where a.no_bukti='$row->no_bukti' 
order by a.no_bukti  ";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0;$tot=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tot+=$row1->total;
				
				echo "<tr border='0'>
    <td  class='isi_laporan'>$row1->brg</td>	
<td  class='isi_laporan'>$row1->harga</td>	
    <td  class='isi_laporan'>$row1->jumlah</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='right'  class='header_laporan'>---------</td>
  </tr>";			
			echo "<tr>
    <td colspan='3' align='right'  class='header_laporan'>Total Nilai Barang</td>
	<td align='right' class='header_laporan'>".number_format($tot,0,",",".")."</td>
  </tr>";	

  $sql2="select f.nama as tenan,e.nilai as ten
from ktu_nota_m a
inner join ktu_nota_d e on a.no_bukti=e.no_bukti 
inner join ktu_tenan f on e.kode_tenan=f.kode_tenan
where a.no_bukti='$row->no_bukti' 
order by a.no_bukti";

 			$rs3 = $dbLib->execute($sql2);
						$j=1;$nilai=0;$tota=0;
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
 				$tota+=$row3->ten;

  				echo "<tr>
	<td colspan='3' class='isi_laporan' align='left'>$row3->tenan</td>
    <td colspan='3' align='right' class='isi_laporan'>".number_format($row3->ten,0,",",".")."</td>
 </tr>";
							$j=$j+1;
			}
			
			echo "<tr>
    <td colspan='4' align='right'  class='header_laporan'>---------</td>
  </tr>";			
  			echo "<tr>
    <td colspan='3' align='right'  class='header_laporan'>Total Nilai Transaksi</td>
	<td align='right' class='header_laporan'>".number_format($tota+$tot,0,",",".")."</td>
  </tr>";	
  
  $sql3="select a.kode_bayar,a.nilai,case a.kode_bayar when 'tunai' then b.nilai_bayar else 0 end as kembali
from ktu_nota_bayar a
inner join ktu_nota_m b on a.no_bukti=b.no_bukti 
where a.no_bukti='$row->no_bukti' 
order by a.no_bukti ";

 			$rs4 = $dbLib->execute($sql3);
						$j=1;$nilai=0;$tota1=0;
			while ($row4 = $rs4->FetchNextObject($toupper=false))
			{
 				$tota1+=$row4->kembali;
 				$tota11=$row4->kembali-$row4->nilai;

  				echo "<tr>
	<td colspan='3' class='isi_laporan' align='left'>$row4->kode_bayar</td>
    <td colspan='3' align='right' class='isi_laporan'>".number_format($row4->nilai,0,",",".")."</td>
 </tr>";
 							$j=$j+1;
			}
						echo "<tr>
    <td colspan='4' align='right'  class='header_laporan'>---------</td>
  </tr>";
			  			echo "<tr>
    <td colspan='3' align='right'  class='header_laporan'>Total Nilai Pembayaran</td>
	<td align='right' class='header_laporan'>".number_format($tota1,0,",",".")."</td>
  </tr>";			  			echo "<tr>
    <td colspan='3' align='right'  class='header_laporan'>Total Nilai Kembali</td>
	<td align='right' class='header_laporan'>".number_format($tota11,0,",",".")."</td>
  </tr>";

		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right'><table width='100' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
