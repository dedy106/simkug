<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptPph extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select x.nik,b.nama,b.sts_pajak,x.total_bln,x.total,x.b_jab,x.ptkp,x.pkp,x.npwp,x.pdpt,x.lmbr,x.pdptlain,
					case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 
  from (select a.nik,a.kode_lokasi,c.sts_pajak, c.npwp, 
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, 
		 sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, 
		 d.nilai as ptkp,d.biaya_jab,d.jab_max, 
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max 
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, 
		 (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - 
		 case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max 
		 else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp ,
		sum(e.tsus+e.rem+e.trans) as pdpt,e.lmbr,sum(e.bas+e.cuti+e.thr) as pdptlain
	  from gr_gaji_d a  
	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi 
	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi
		inner join gr_gaji_load e on c.nik=e.nik and c.kode_lokasi=e.kode_lokasi
 
		$this->filter and b.jenis='T' and b.dc='D'  
		group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max,c.npwp,e.lmbr
	 ) x 
	inner join gr_karyawan b on b.nik=x.nik and b.kode_lokasi=x.kode_lokasi
  inner join gr_gaji_param c on c.kode_param='TPPH' and c.kode_lokasi=x.kode_lokasi 
  left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi";


		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("perhitungan pph21",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='150' align='center' class='header_laporan'>NAMA</td>
		<td width='100' align='center' class='header_laporan'>No. NPWP</td>
		<td width='80' align='center' class='header_laporan'>STATUS PAJAK</td>
		<td width='50' align='center' class='header_laporan'>PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>GAJI SETAHUN</td>
	    <td width='100' align='center' class='header_laporan'>LEMBUR</td>
		<td width='80' align='center' class='header_laporan'>PENDAPATAN LAIN(THR,UBAS,UANG CUTI)</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN BRUTO</td>
		<td width='80' align='center' class='header_laporan'>5% BY JBTN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN NETTO</td>
		<td width='80' align='center' class='header_laporan'>P.T.K.P</td>
	    <td width='100' align='center' class='header_laporan'>P.K.P</td>
		<td width='80' align='center' class='header_laporan'>PPH 21</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto=$row->pdpt + $row->pdptlain + $row->lmbr + $row->total;
			$netto=$bruto - $row->b_jab;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->npwp</td>
			<td class='isi_laporan'>$row->sts_pajak</td>
			<td class='isi_laporan'>".number_format($row->pdpt,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->total,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->lmbr,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pdptlain,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($bruto,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->b_jab,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($netto,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->ptkp,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pkp,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pph21,0,",",".")."</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
