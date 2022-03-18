<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptRekapGjHarian extends server_report_basic
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

		$sql="select a.nik,a.nama,convert(varchar(10),a.tgl_lahir,103) as tgl_lahir,convert(varchar(10),a.tgl_masuk,103) as tgl_masuk,
	   a.kode_grade,c.nama as nama_jab,d.nama as nama_loker,
       isnull(b.gapok,0) as gapok,isnull(b.hontp,0) as hontp,isnull(b.konj,0) as konj,isnull(b.tgrd,0) as tgrd,isnull(b.tujab,0) as tujab,
	   isnull(b.tusus,0) as tusus,isnull(b.lbr,0) as lbr,isnull(b.rpl,0) as rpl,
	   isnull(b.ikop,0) as ikop,isnull(b.pkop,0) as pkop,isnull(b.pasu,0) as pasu,isnull(b.ppph,0) as ppph,isnull(b.tuhar,0) as tuhar,
	   e.nama as nama_dept,f.nama as nama_dir,datediff(year,a.tgl_masuk,getdate()) as mk,g.nilai as jml,h.nama as nama_level
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
			$this->filter and b.periode='$periode' and a.flag_gaji='HARIAN' 
			group by a.nik,a.kode_lokasi
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
left join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi
left join gr_dept e on a.kode_dept=e.kode_dept and a.kode_lokasi=e.kode_lokasi
left join gr_dir f on a.kode_dir=f.kode_dir and a.kode_lokasi=f.kode_lokasi
left join gr_gajiload_d g on a.nik=g.nik and a.kode_lokasi=g.kode_lokasi
left join gr_kelas h on a.kode_grade=h.kode_grade and a.kode_kelas=h.kode_kelas
$this->filter and a.flag_gaji='HARIAN' and g.periode='$periode'
 ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap gaji harian",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='150' align='center' class='header_laporan'>NAMA</td>
		<td width='100' align='center' class='header_laporan'>NIK</td>
	
		<td width='60' align='center' class='header_laporan'>GRADE</td>
		<td width='60' align='center' class='header_laporan'>LEVEL</td>
		<td width='100' align='center' class='header_laporan'>JABATAN/ POSISI</td>
		<td width='100' align='center' class='header_laporan'>UNIT KERJA</td>
		<td width='100' align='center' class='header_laporan'>SUB DIREKTORAT</td>
		<td width='100' align='center' class='header_laporan'>DIREKTORAT</td>
		<td width='80' align='center' class='header_laporan'>MASA KERJA </td>
		<td width='80' align='center' class='header_laporan'>GAJI POKOK</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN KONJUNGTUR</td>
	    <td width='80' align='center' class='header_laporan'>TUNJANGAN GRADE</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN JABATAN</td>
	    <td width='80' align='center' class='header_laporan'>REMUNERASI</td>
	    <td width='80' align='center' class='header_laporan'>HONOR TETAP</td>
		<td width='80' align='center' class='header_laporan'>JUMLAH HARI KERJA</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN UANG HARIAN</td>
		<td width='80' align='center' class='header_laporan'>PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN KHUSUS</td>
	    <td width='80' align='center' class='header_laporan'>LEMBUR</td>
		<td width='80' align='center' class='header_laporan'>RAPEL</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>IURAN  KOPERASI</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN KOPERASI</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN ASURANSI</td>
		<td width='80' align='center' class='header_laporan'>TOTAL POTONGAN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL TRANSFER</td>
   </tr>";
		$hna=0; $gapok=0; $konj=0;$tgrd=0;$tujab=0;$tusus=0;$lbr=0;$rem=0;$rpl=0;$ikop=0;$pkop=0;$pasu=0;$jum=0;$hontp=0;$pdpt2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gapok+=$row->gapok;
			$konj+=$row->konj;
			$tgrd+=$row->tgrd;
			$tujab+=$row->tujab;
			$tusus+=$row->tusus;
			$hontp+=$row->hontp;
			$lbr+=$row->lbr;
			$rem+=$row->rem;
			$rpl+=$row->rpl;
			$ikop+=$row->ikop;
			$pkop+=$row->pkop;
			$pasu+=$row->pasu;
			$rem=$row->gapok+$row->konj+$row->tgrd+$row->tujab;
			$pdpt=$row->hontp+$row->tuhar;
			$tot_pdpt=$pdpt+$row->tsus+$row->lbr+$row->rapel;
			$pot=$row->ikop + $row->pkop + $row->pasu;
			$total=$tot_pdpt - $pot;
			$jum+=$total;
			$pdpt2+=$pdpt;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->nik</td>
			
			<td class='isi_laporan'>$row->kode_grade</td>
			<td class='isi_laporan'>$row->nama_level</td>
			<td class='isi_laporan'>$row->nama_jab</td>
			<td class='isi_laporan'>$row->nama_loker</td>
			<td class='isi_laporan'>$row->nama_dept</td>
			<td class='isi_laporan'>$row->nama_dir</td>
			<td class='isi_laporan' align='right'>$row->mk</td>
			<td class='isi_laporan' align='right'>".number_format($row->gapok,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->konj,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tgrd,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tujab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($rem,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->hontp,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->jml,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tuhar,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tsus,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lbr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->rapel,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($tot_pdpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ikop,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->pkop,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->pas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pot,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='right' colspan='10'>Total</td>
			<td class='header_laporan' align='right'>".number_format($gapok,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($konj,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tgrd,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tujab,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($gapok+$konj+$tgrd+$tujab,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($hontp,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($jml,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tuhar,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($pdpt2,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tsus,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($lbr,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($rapel,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tot_pdpt,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($ikop,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($pkop,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($pas,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($pot,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($jum,0,",",".")."</td>
			</tr>
		</div>";
		return "";
	}
	
}
?>
  
