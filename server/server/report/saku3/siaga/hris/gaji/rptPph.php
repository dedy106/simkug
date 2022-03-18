<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptPph extends server_report_basic
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
		$bulan=substr($periode,5,2);
		$tahun=substr($periode,0,4);
		
		
		$sql="select a.nik,a.nama,convert(varchar(10),a.tgl_lahir,103) as tgl_lahir,convert(varchar(10),a.tgl_masuk,103) as tgl_masuk,
	   a.kode_grade,c.nama as nama_jab,d.nama as nama_loker,a.npwp,a.sts_pajak,
       isnull(b.gapok,0) as gapok,isnull(b.hontp,0) as hontp,isnull(b.konj,0) as konj,isnull(b.tgrd,0) as tgrd,isnull(b.tujab,0) as tujab,
	   isnull(b.tusus,0) as tusus,isnull(b.lbr,0) as lbr,isnull(b.rpl,0) as rpl,
	   isnull(b.ikop,0) as ikop,isnull(b.pkop,0) as pkop,isnull(b.pasu,0) as pasu,isnull(b.ppph,0) as ppph,isnull(b.tuhar,0) as tuhar,
	   e.nama as nama_dept,f.nama as nama_dir,datediff(year,a.tgl_masuk,getdate()) as mk,
	   g.nilai as ptkp,g.jab_max,g.biaya_jab,a.flag_gaji,h.pengali
from gr_karyawan a
inner join (select a.nik,a.kode_lokasi,
				sum(case b.kode_param when 'GAPOK' then abs(b.nilai) else 0 end) as gapok,
				sum(case b.kode_param when 'HONTP' then abs(b.nilai) else 0 end) as hontp,
				sum(case b.kode_param when 'IKOP' then abs(b.nilai) else 0 end) as ikop,
				sum(case b.kode_param when 'KONJ' then abs(b.nilai) else 0 end) as konj,
				sum(case b.kode_param when 'LBR' then abs(b.nilai) else 0 end) as lbr,
				sum(case b.kode_param when 'PASU' then abs(b.nilai) else 0 end) as pasu,
				sum(case b.kode_param when 'PKOP' then abs(b.nilai) else 0 end) as pkop,
				sum(case b.kode_param when 'PPPH' then abs(b.nilai) else 0 end) as ppph,
				sum(case b.kode_param when 'RPL' then abs(b.nilai) else 0 end) as rpl,
				sum(case b.kode_param when 'TGRD' then abs(b.nilai) else 0 end) as tgrd,
				sum(case b.kode_param when 'TUHAR' then abs(b.nilai) else 0 end) as tuhar,
				sum(case b.kode_param when 'TUJAB' then abs(b.nilai) else 0 end) as tujab,
				sum(case b.kode_param when 'TUSUS' then abs(b.nilai) else 0 end) as tusus
			from gr_karyawan a 
			inner join  gr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode='$periode'
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
left join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi
left join gr_dept e on a.kode_dept=e.kode_dept and a.kode_lokasi=e.kode_lokasi
left join gr_dir f on a.kode_dir=f.kode_dir and a.kode_lokasi=f.kode_lokasi
left join gr_status_pajak g on a.sts_pajak=g.sts_pajak and a.kode_lokasi=g.kode_lokasi
inner join gr_status_sdm h on a.sts_sdm=h.sts_sdm and a.kode_lokasi=h.kode_lokasi
$this->filter
order by a.nik
 ";
	
	
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$nama_bulan=strtoupper($AddOnLib->ubah_bulan($bulan));
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("PERHITUNGAN PPH 21 GAJI $nama_bulan $tahun",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='80' align='center' class='header_laporan'>NIK</td>
		<td width='150' align='center' class='header_laporan'>NAMA</td>
		<td width='100' align='center' class='header_laporan'>NPWP</td>
		<td width='60' align='center' class='header_laporan'>STATUS</td>
		<td width='80' align='center' class='header_laporan'>GAJI</td>
	    
		<td width='80' align='center' class='header_laporan'>POTONGAN</td>
		<td width='80' align='center' class='header_laporan'>PENGHASILAN SEBULAN</td>
		<td width='80' align='center' class='header_laporan'>PENGHASILAN SETAHUN</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN KHUSUS</td>
		<td width='80' align='center' class='header_laporan'>LEMBUR</td>
		<td width='80' align='center' class='header_laporan'>RAPEL GAJI</td>
	    <td width='80' align='center' class='header_laporan'>UANG CUTI</td>
		<td width='80' align='center' class='header_laporan'>UBAS</td>
		<td width='80' align='center' class='header_laporan'>THR</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENGHASILAN BRUTO SETAHUN</td>
		<td width='80' align='center' class='header_laporan'>5% BY JBTN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENGHASILAN NETTO SETAHUN</td>
		<td width='80' align='center' class='header_laporan'>P.T.K.P</td>
		<td width='80' align='center' class='header_laporan'>P.K.P</td>
		<td width='80' align='center' class='header_laporan'>PPH 21 YANG HARUS DIBAYAR</td>
   </tr>";
		$rem2=0;$pot2=0;$total2=0;$bruto2=0;$bjab2=0;$netto2=0;$pkp2=0;$pph2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$gapok+=$row->gapok;
			$konj+=$row->konj;
			$tgrd+=$row->tgrd;
			$tujab+=$row->tujab;
			$tusus+=$row->tusus;
			$lbr+=$row->lbr;
			$rem+=$row->rem;
			$rpl+=$row->rpl;
			$ikop+=$row->ikop;
			$pkop+=$row->pkop;
			$pasu+=$row->pasu;
			$ptkp+=$row->ptkp;
			$rem=$row->gapok+$row->konj+$row->tgrd+$row->tujab;
			$pot=$row->pasu;
			
			$pdpt=$rem;
			$total=$pdpt-$pot ;
			$jum=$row->pengali;
			
			$bruto=($total*$jum)+$row->rpl+$row->cuti+$row->ubas+$row->thr+$row->tusus+$row->lbr;
			
			if (($row->biaya_jab/100)*$bruto>$row->jab_max)
			{
				$bjab=$row->jab_max;
			}
			else
			{
				$bjab=($row->biaya_jab/100)*$bruto;
			}
			$netto=$bruto-$bjab;
			$pkp=$netto-$row->ptkp;
			$pkp=1000 * floor($pkp/1000);
			
			$sql="select bawah, atas, persen, kurang_seb, nilai_seb from gr_pph21 where $pkp between bawah and atas ";
			$rs2 = $dbLib->execute($sql);
			$row2 = $rs2->FetchNextObject($toupper=false);
			
			$pph= ($row2->nilai_seb+(($pkp - $row2->kurang_seb) * $row2->persen/100)) / 12;
			
			$rem2+=$rem;
			$pot2+=$pot;
			$total2+=$total;
			$bruto2+=$bruto;
			$bjab2+=$bjab;
			$netto2+=$netto;
			$pkp2+=$pkp;
			$pph2+=$pph;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nik</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->npwp</td>
			<td class='isi_laporan'>$row->sts_pajak</td>
			<td class='isi_laporan' align='right'>".number_format($rem,0,",",".")."</td>
			
			<td class='isi_laporan' align='right'>".number_format($pot,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total*15,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tusus,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lbr,0,",",".")."</td>
			
			<td class='isi_laporan' align='right'>".number_format($row->rpl,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->cuti,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ubas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->thr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bjab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($netto,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ptkp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pkp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pph,0,",",".")."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='isi_laporan' align='center' colspan='5'>Total</td>
			<td class='isi_laporan' align='right'>".number_format($rem2,0,",",".")."</td>
			
			<td class='isi_laporan' align='right'>".number_format($pot2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total2*15,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($tusus,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($lbr,0,",",".")."</td>
			
			<td class='isi_laporan' align='right'>".number_format($rpl,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($cuti,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($ubas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($thr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bruto2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bjab2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($netto2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($ptkp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pkp2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pph2,0,",",".")."</td>";
		echo "</div>";
		return "";
	}
	
}
?>
  
