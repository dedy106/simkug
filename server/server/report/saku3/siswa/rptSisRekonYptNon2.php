<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisRekonYptNon2 extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter2=$tmp[0];
		$kode_lokasi=$tmp[1];
		$kode_pp=$tmp[2];
		$periode=$tmp[3];
		$jenis=$tmp[4];
		
		$nama_file="rekon.xls";
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_kas as no_rekon,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,substring(a.periode,5,2) as bulan,c.kode_akt,
	    isnull(b.n1,0) as n1,isnull(b.n2,0) as n2, isnull(b.n3,0) as n3, isnull(b.n4,0) as n4, isnull(b.n5,0) as n5,
		isnull(b.n6,0) as n6, isnull(b.n7,0) as n7, isnull(b.n8,0) as n8, isnull(b.n9,0) as n9, isnull(b.n10,0) as n10,
		isnull(b.n11,0) as n11,isnull(b.n12,0) as n12, isnull(b.n13,0) as n13, isnull(b.n14,0) as n14,isnull(b.n15,0) as n15,isnull(b.n16,0) as n16,
		isnull(b.n17,0) as n17,isnull(b.n18,0) as n18,
		isnull(b.total,0) as total,a.kode_pp,isnull(b.pdd,0) as pdd
from kas_m a
inner join (select c.nis,a.no_rekon,c.kode_lokasi,a.kode_pp,
			       sum(case when a.kode_param in ('DSP') then a.nilai else 0 end) as n1, 
				   sum(case when a.kode_param in ('SPP') then a.nilai else 0 end) as n2, 
				   sum(case when a.kode_param in ('PRAK') then a.nilai else 0 end) as n3,
				   sum(case when a.kode_param in ('JOB') then a.nilai else 0 end) as n4,
				   sum(case when a.kode_param in ('PAK') then a.nilai else 0 end) as n5, 
				   sum(case when a.kode_param in ('EVALUASI') then a.nilai else 0 end) as n6, 
				   sum(case when a.kode_param in ('ULUM') then a.nilai else 0 end) as n7,
				   sum(case when a.kode_param in ('EKS') then a.nilai else 0 end) as n8,
				   sum(case when a.kode_param in ('PERPUS') then a.nilai else 0 end) as n9,
				   sum(case when a.kode_param in ('KARYA') then a.nilai else 0 end) as n10,
				   sum(case when a.kode_param in ('OSIS') then a.nilai else 0 end) as n11,
				   sum(case when a.kode_param in ('MOS') then a.nilai else 0 end) as n12,
				   sum(case when a.kode_param in ('ASUR') then a.nilai else 0 end) as n13,
				   sum(case when a.kode_param in ('WIS') then a.nilai else 0 end) as n14,
				   sum(case when a.kode_param in ('LAIN') then a.nilai else 0 end) as n15,
				   sum(case when a.kode_param in ('LAIN2') then a.nilai else 0 end) as n16,
				   sum(case when a.kode_param in ('DAFTULANG') then a.nilai else 0 end) as n17,
				   sum(case when a.kode_param in ('KOP') then a.nilai else 0 end) as n18,
				   sum(case when a.kode_param in ('FOODING') then a.nilai else 0 end) as n19,
				   sum(a.nilai) as total,0 as pdd
			from sis_rekon_d a 
			inner join (select a.nis,a.kode_lokasi,a.kode_pp 
            from sis_siswa a
            union all 
            select a.no_reg,a.kode_lokasi,a.kode_pp 
            from sis_siswareg a
            ) c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
			$this->filter
			group by c.nis,a.no_rekon,c.kode_lokasi,a.kode_pp
			union all
			select c.nis,a.no_bukti as no_rekon,c.kode_lokasi,a.kode_pp,0 as n1,0 as n2,0 as n3,0 as n4,0 as n5, 0 as n6, 
				   0 as n7,0 as n8,0 as n9,0 as n10,0 as n11,0 as n12,0 as n13,0 as n14,0 as n15,0 as n16,0 as n17,0 as n18,0 as n19,
				   sum(a.nilai) as total,sum(a.nilai) as pdd
			from sis_cd_d a 
			inner join (select a.nis,a.kode_lokasi,a.kode_pp 
            from sis_siswa a
            union all 
            select a.no_reg,a.kode_lokasi,a.kode_pp 
            from sis_siswareg a
            ) c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
			$this->filter and a.dc='D'
			group by c.nis,a.no_bukti,c.kode_lokasi,a.kode_pp
			)b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
            inner join (select a.nis,a.kode_lokasi,a.kode_pp,a.kode_kelas,a.kode_akt,a.nama 
            from sis_siswa a
            union all 
            select a.no_reg,a.kode_lokasi,a.kode_pp,'NON' as kode_kelas,'NON' as kode_akt,a.nama 
            from sis_siswareg a
            ) c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
left join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
$filter2 
order by c.nis

 ";
// echo $sql;
 if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file");
			header("Content-Transfer-Encoding: binary ");
		}
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembayaran siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Bukti</td>
	 <td width='30' align='center' class='header_laporan'>Kode PP</td>	 
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='60' align='center' class='header_laporan'>Jurusan</td>
	<td width='60' align='center' class='header_laporan'>Kelas</td>
	<td width='60' align='center' class='header_laporan'>Tahun Ajaran</td>
	<td width='60' align='center' class='header_laporan'>Bulan</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>DSP</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Praktikum</td>
	<td width='80' align='center' class='header_laporan'>JobTraining</td>
	<td width='90' align='center' class='header_laporan'>Pakser</td>
    <td width='80' align='center' class='header_laporan'>Evaluasi</td>
    <td width='80' align='center' class='header_laporan'>Ulum</td>
    <td width='80' align='center' class='header_laporan'>Ekskul</td>
	<td width='80' align='center' class='header_laporan'>Perpustakaan</td>
	<td width='80' align='center' class='header_laporan'>Karyawisata</td>
	<td width='90' align='center' class='header_laporan'>Osis</td>
	<td width='90' align='center' class='header_laporan'>Mos</td>
	<td width='90' align='center' class='header_laporan'>Asuransi</td>
	<td width='90' align='center' class='header_laporan'>Wisuda</td>
	<td width='90' align='center' class='header_laporan'>Lainnya</td>
	<td width='90' align='center' class='header_laporan'>Lain-lain</td>
    <td width='90' align='center' class='header_laporan'>Daftar Ulang</td>
    <td width='90' align='center' class='header_laporan'>Iuran Koperasi</td>
    <td width='90' align='center' class='header_laporan'>Ekstra Fooding</td>
	<td width='90' align='center' class='header_laporan'>PDD</td>
	<td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$total=0;$n10=0;$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;$n19=0;$pdd=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
			$n9+=$row->n9;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$n14+=$row->n14;
			$n15+=$row->n15;
			$n16+=$row->n16;
			$n17+=$row->n17;
			$n18+=$row->n18;
			$n19+=$row->n19;
			$total=$total+$row->total;
			$pdd+=$row->pdd;
		
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
  		<td class='isi_laporan'>$row->no_rekon</td>
					<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->nis</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->kode_kelas</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->bulan</td>
			<td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n13,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n14,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n15,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n16,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n17,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n18,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n19,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pdd,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
  
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='10'>Total</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n5,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n6,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n7,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n8,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n9,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n11,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n12,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n13,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n14,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n15,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n16,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n17,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n18,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($n19,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($pdd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
 
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
