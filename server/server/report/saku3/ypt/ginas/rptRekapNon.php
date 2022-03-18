<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_ginas_rptRekapNon extends server_report_basic
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

		$sql="select a.nik,a.nama,convert(varchar(10),a.tgl_masuk,103) as tgl_masuk,
		a.jabatan,a.loker,d.periode,
		isnull(b.gapok,0) as gapok,isnull(b.tmk,0) as tmk,isnull(b.jab,0) as jab,isnull(b.lbr,0) as lbr,isnull(b.lain,0) as lain,
 isnull(b.ins,0) as ins,isnull(b.rol,0) as rol,isnull(b.bpjs,0) as bpjs
 from hr_karyawan a
 inner join (select a.nik,a.kode_lokasi,
				 sum(case b.kode_param when 'NGPOK' then abs(b.nilai) else 0 end) as gapok,
				 sum(case b.kode_param when 'NTMK' then abs(b.nilai) else 0 end) as tmk,
				 sum(case b.kode_param when 'NTJAB' then abs(b.nilai) else 0 end) as jab,
				 sum(case b.kode_param when 'NLBR' then abs(b.nilai) else 0 end) as lbr,
				 sum(case b.kode_param when 'NLAIN' then abs(b.nilai) else 0 end) as lain,
				 sum(case b.kode_param when 'NGINS' then abs(b.nilai) else 0 end) as ins,
				 sum(case b.kode_param when 'NPYROL' then abs(b.nilai) else 0 end) as rol,
				 sum(case b.kode_param when 'NBPJS' then abs(b.nilai) else 0 end) as bpjs
			 from hr_karyawan a 
			 inner join  hr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			 $this->filter and b.periode='$periode' 	 			 
			 group by a.nik,a.kode_lokasi
			 )b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
		 inner join hr_gaji_loadumum c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
	 inner join hr_gaji_m d on c.no_gaji=d.no_gaji and c.kode_lokasi=d.kode_lokasi
		$this->filter ";

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap gaji",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='150' align='center' class='header_laporan'>NAMA</td>
		<td width='150' align='center' class='header_laporan'>NIK</td>
		<td width='80' align='center' class='header_laporan'>TGL MASUK KERJA</td>
		<td width='100' align='center' class='header_laporan'>JABATAN</td>
		<td width='200' align='center' class='header_laporan'>LOKASI KERJA</td>
		<td width='80' align='center' class='header_laporan'>GAJI POKOK</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN MASA KERJA</td>
	    <td width='80' align='center' class='header_laporan'>TUNJANGAN JABATAN</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN LEMBUR</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN LAIN-LAIN</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN TRENGGINAS JAYA</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN PAYROLL</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN BPJS</td>
	    <td width='80' align='center' class='header_laporan'>TOTAL POTONGAN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL TRANSFER</td>

   </tr>";
		$hna=0; $gapok=0; $tmk=0;$jab=0;$lbr=0;$lain=0;$ins=0;$rol=0;$bpjs=0;
		$total2=0;$pdpt2=0;$pot2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gapok+=$row->gapok;
			$tmk+=$row->tmk;
			$jab+=$row->jab;
			$lbr+=$row->lbr;
			$lain+=$row->lain;
			$ins+=$row->ins;
			$rol+=$row->rol; 
			$bpjs+=$row->bpjs;
			$pdpt=$row->gapok + $row->tmk + $row->jab + $row->lbr;
			$pot=$row->lain + $row->ins + $row->rol + $row->bpjs;

			$total=$pdpt - $pot;
			$total2+=$total;
			$pdpt2+=$pdpt;
			$pot2+=$pot;

			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->nik</td>
			<td class='isi_laporan'>$row->tgl_masuk</td>
			<td class='isi_laporan'>$row->jabatan</td>
			<td class='isi_laporan'>$row->loker</td>
			<td class='isi_laporan' align='right'>".number_format($row->gapok,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tmk,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->jab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lbr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ins,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->rol,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bpjs,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pot,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>

    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='isi_laporan' colspan='6'>&nbsp;</td>
			<td class='isi_laporan' align='right'>".number_format($gapok,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($tmk,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($jab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($lbr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pdpt2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($lain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($ins,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($rol,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bpjs,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pot2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
			</tr>

			</table>
		</div>";
		echo"</table>";

		return "";
	}
	
}
?>
  
