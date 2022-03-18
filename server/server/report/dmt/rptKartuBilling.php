<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_dmt_rptKartuBilling extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$cust=$tmp[3];
		$sql = "select count(a.kode_cust)
from cust a $cust ";
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
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$sql = "select a.kode_cust,a.nama,isnull(b.so_awal,0) as so_awal
from cust a
left join (select c.kode_cust,sum(a.nilai) as so_awal 
		   from dmt_akru_m a
		   inner join dmt_bill_d b on a.no_akru=b.no_akru
		   inner join dmt_kontrak_m c on b.no_kontrak=c.no_kontrak
		   where a.periode<'$periode'
		   group by c.kode_cust
		   )b on a.kode_cust=b.kode_cust ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU PENGAWASAN BILLING ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=number_format($row->so_awal,0,",",".");
		echo "<table  width='1000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='11' class='header_laporan'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='80' class='header_laporan'>Kode Cust </td>
            <td width='500' class='header_laporan'>: $row->kode_cust</td>
            </tr>
          <tr>
            <td class='header_laporan'>Nama Cust </td>
            <td class='header_laporan'>: $row->nama</td>
            </tr>
        </table></td>
      </tr>
	   <tr>
        <td colspan='10' align='right' class='header_laporan'>Saldo Awal </td>
         <td width='90' class='header_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='20' class='header_laporan'>No</td>
        <td width='80' class='header_laporan'>No Bukti </td>
        <td width='60' class='header_laporan'>Tanggal</td>
		<td width='80' class='header_laporan'>Site</td>
		<td width='150' class='header_laporan'>Nama Site</td>
        <td width='150' class='header_laporan'>Keterangan</td>
       <td width='90' align='center' class='header_laporan'>Harga Sewa</td>
		<td width='90' align='center' class='header_laporan'>TARIF O &amp; M</td>
		<td width='90' align='center' class='header_laporan'>Fee O &amp; M (5%)</td>
		<td width='90' align='center' class='header_laporan'>Total</td>
		<td width='90' align='center' class='header_laporan'>Saldo</td>
      </tr>
     ";
	    $sql1="select c.no_akru,date_format(c.tanggal,'%d/%m/%Y') as tgl_bukti,c.tanggal,c.keterangan,a.no_site,b.nama as nama_site,a.rawat,a.sewa,a.fee,a.nilai_ar
from dmt_bill_d a
inner join dmt_site b on a.no_site=b.no_site
inner join dmt_akru_m c on a.no_akru=c.no_akru
inner join dmt_kontrak_m d on a.no_kontrak=d.no_kontrak
where d.kode_cust='$row->kode_cust' $periode2
order by c.tanggal ";
		$rs1 = $dbLib->execute($sql1);
		$rawat=0; $sewa=0; $fee=0; $nilai_ar=0; $saldo=$row->so_awal;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$rawat=$rawat+$row1->rawat;
			$sewa=$sewa+$row1->sewa;
			$fee=$fee+$row1->fee;
			$nilai_ar=$nilai_ar+$row1->nilai_ar;
			$saldo=$saldo+$row1->nilai_ar;
		echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->no_akru</td>
		<td class='isi_laporan'>$row1->tgl_bukti</td>
		<td class='isi_laporan'>$row1->no_site</td>
		<td class='isi_laporan'>$row1->nama_site</td>
		<td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan' align='right'>".number_format($row1->sewa,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->rawat,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->fee,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai_ar,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
		 </tr>";
			
	  }
      echo " <tr align='center'>
		<td colspan='6' align='right' class='header_laporan'>Mutasi</td>
        <td class='isi_laporan' align='right'>".number_format($sewa,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($rawat,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($fee,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nilai_ar,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
		
       </tr>";
		 echo " </table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
