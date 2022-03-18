<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_ginas_rptRekapGj extends server_report_basic
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
		isnull(b.gadas,0) as gadas,isnull(b.jab,0) as jab,isnull(b.lbr,0) as lbr,isnull(b.kom,0) as kom,isnull(b.rpl,0) as rpl,
 isnull(b.ksum,0) as ksum,isnull(b.hdr,0) as hdr,isnull(b.koci,0) as koci,isnull(b.bpjs,0) as bpjs,isnull(b.kpt,0) as kpt,isnull(b.giat,0) as giat
 from hr_karyawan a
 inner join (select a.nik,a.kode_lokasi,b.periode,
				 sum(case b.kode_param when 'TGDAS' then abs(b.nilai) else 0 end) as gadas,
				 sum(case b.kode_param when 'TTJAB' then abs(b.nilai) else 0 end) as jab,
				 sum(case b.kode_param when 'TLBR' then abs(b.nilai) else 0 end) as lbr,
				 sum(case b.kode_param when 'TTKOM' then abs(b.nilai) else 0 end) as kom,
				 sum(case b.kode_param when 'TRPL' then abs(b.nilai) else 0 end) as rpl,
				 sum(case b.kode_param when 'TKSUM' then abs(b.nilai) else 0 end) as ksum,
				 sum(case b.kode_param when 'THDR' then abs(b.nilai) else 0 end) as hdr,
				 sum(case b.kode_param when 'TKOCI' then abs(b.nilai) else 0 end) as koci,
				 sum(case b.kode_param when 'TBPJS' then abs(b.nilai) else 0 end) as bpjs,
				 sum(case b.kode_param when 'TKKPT' then abs(b.nilai) else 0 end) as kpt,
				 sum(case b.kode_param when 'TGIAT' then abs(b.nilai) else 0 end) as giat
			 from hr_karyawan a 
			 inner join  hr_gaji_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			 $this->filter and b.periode='$periode' 	 
			 group by a.nik,a.kode_lokasi,b.periode
			 )b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi

		 inner join hr_gaji_loadtelu c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
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
		<td width='200' align='center' class='header_laporan'>NAMA</td>
		<td width='80' align='center' class='header_laporan'>NIK</td>
		<td width='100' align='center' class='header_laporan'>TGL MASUK KERJA</td>
		<td width='200' align='center' class='header_laporan'>JABATAN</td>
		<td width='200' align='center' class='header_laporan'>LOKASI KERJA</td>
		<td width='80' align='center' class='header_laporan'>GAJI DASAR</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN JABATAN</td>
	    <td width='80' align='center' class='header_laporan'>TUNJANGAN LEMBUR</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN TELEKOMUNIKASI</td>
		<td width='80' align='center' class='header_laporan'>RAPEL GAJI</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>SIMPANAN KOSUMBA</td>
		<td width='80' align='center' class='header_laporan'>KEHADIRAN</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN KOCITEL</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN BPJS</td>
		<td width='80' align='center' class='header_laporan'>KKPT</td>
		<td width='80' align='center' class='header_laporan'>GIAT</td>
	    <td width='80' align='center' class='header_laporan'>TOTAL POTONGAN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL TRANSFER</td>

   </tr>";
		$hna=0; $gadas=0; $jab=0;$lbr=0;$kom=0;$rpl=0;$ksum=0;$hdr=0;$koci=0;$bpjs=0;$kpt=0;$giat=0;
		$total2=0;$pdpt2=0;$pot2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gadas+=$row->gadas;
			$lbr+=$row->lbr;
			$jab+=$row->jab;
			$kom+=$row->kom;
			$rpl+=$row->rpl;
			$ksum+=$row->ksum;
			$hdr+=$row->hdr;
			$koci+=$row->koci;
			$bpjs+=$row->bpjs;
			$kpt+=$row->kpt;
			$giat+=$row->giat;
			$pdpt=$row->gadas + $row->lbr + $row->jab + $row->kom + $row->rpl;
			$pot=$row->ksum + $row->hdr + $row->koci + $row->bpjs + $row->kpt + $row->giat;

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
			<td class='isi_laporan' align='right'>".number_format($row->gadas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->jab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->lbr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->kom,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->rpl,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ksum,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->hdr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->koci,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bpjs,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->kpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->giat,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pot,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>

    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='isi_laporan' colspan='6'>&nbsp;</td>
			<td class='isi_laporan' align='right'>".number_format($gadas,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($jab,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($lbr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($kom,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($rpl,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($pdpt2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($ksum,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($hdr,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($koci,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($bpjs,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($kpt,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($giat,0,",",".")."</td>
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
  
  
