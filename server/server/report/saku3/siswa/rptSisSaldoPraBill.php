<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoPraBill extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
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
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="saldo.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,a.kode_akt,
	   a.kode_kelas,f.kode_jur,f.nama as nama_jur,
		case when h.kode_param='ASUR' then h.tarif else 0 end as asur,
		case when h.kode_param='DSP' then h.tarif else 0 end as dsp,
		case when h.kode_param='EKS' then h.tarif else 0 end as eks,
		case when h.kode_param='EVALUASI' then h.tarif else 0 end as evall,
		case when h.kode_param='JOB' then h.tarif else 0 end as job,
		case when h.kode_param='KARYA' then h.tarif else 0 end as kry,
		case when h.kode_param='LAIN' then h.tarif else 0 end as lain,
		case when h.kode_param='MOS' then h.tarif else 0 end as mos,
		case when h.kode_param='OSIS' then h.tarif else 0 end as os,
		case when h.kode_param='PAK' then h.tarif else 0 end as pak,
		case when h.kode_param='PERPUS' then h.tarif else 0 end as perpus,
		case when h.kode_param='PRAK' then h.tarif else 0 end as prak,
		case when h.kode_param='SPP' then h.tarif else 0 end as spp,
		case when h.kode_param='ULUM' then h.tarif else 0 end as ulum,
		case when h.kode_param='WIS' then h.tarif else 0 end as wis

from sis_siswa a 
inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
inner join sis_jur g on f.kode_jur=g.kode_jur and f.kode_lokasi=g.kode_lokasi and f.kode_pp=g.kode_pp
inner join sis_param_tarif h on f.kode_kelas=h.kode_kelas and f.kode_lokasi=h.kode_lokasi

left join (select y.nis,y.kode_lokasi,x.periode
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
			group by y.nis,y.kode_lokasi,x.periode 			
			)b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
left join (select y.nis,y.kode_lokasi,  
				sum(case when x.kode_param in ('USTK') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param in ('PRATK','UKGSTK','EVTK','KOMTK','BINGTK','ESTK','OUTTK','BPTK') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('DDTK') then x.nilai else 0 end) as n3,
				   sum(x.nilai) as total	
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode')			
			group by y.nis,y.kode_lokasi 			
			)c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
left join (select y.nis,y.kode_lokasi,  
				 sum(case when x.kode_param in ('USTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('PRATK','UKGSTK','EVTK','KOMTK','BINGTK','ESTK','OUTTK','BPTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
				   sum(case when x.kode_param in ('DDTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3,
				   sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')			
			group by y.nis,y.kode_lokasi 			
			)d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
left join (select y.nis,y.kode_lokasi, 
			     sum(case when x.kode_param in ('USTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('PRATK','UKGSTK','EVTK','KOMTK','BINGTK','ESTK','OUTTK','BPTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
				   sum(case when x.kode_param in ('DDTK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3,
				   sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode')			
			group by y.nis,y.kode_lokasi 			
			)e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
			
$this->filter
order by a.kode_kelas,a.nis
 ";
		
		if ($jenis=="Excel")
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
		echo $AddOnLib->judul_laporan("pra billing siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='50'  class='header_laporan'>NIS </td>
    <td width='200' class='header_laporan'>Nama</td>
	<td width='60'  class='header_laporan'>Kode PP</td>
	<td width='60'  class='header_laporan'>Kelas</td>
	<td width='60'  class='header_laporan'>Angkatan</td>
	<td width='60'  class='header_laporan'>Jurusan</td>
    <td width='60' class='header_laporan'>DSP</td>
    <td width='60' class='header_laporan'>SPP </td>
    <td width='60'  class='header_laporan'>Praktikum</td>
    <td width='60' class='header_laporan'>JobTraining</td>
    <td width='60' class='header_laporan'>Pakser</td>
    <td width='60' class='header_laporan'>Evaluasi</td>
    <td width='60' class='header_laporan'>Ulum</td>
    <td width='60' class='header_laporan'>Ekskul</td>
    <td width='60' class='header_laporan'>Perpustakaan</td>
    <td width='60' class='header_laporan'>Karyawisata</td>
    <td width='60' class='header_laporan'>Osis</td>
    <td width='60' class='header_laporan'>MOS</td>
    <td width='60' class='header_laporan'>Asuransi</td>
    <td width='60' class='header_laporan'>Wisuda</td>
    <td width='60'  class='header_laporan'>Lainnya</td>";
	
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_total=0;
		$kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_total=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->asur; $saw_n2+=$row->dsp; $saw_n3+=$row->eks; $saw_total+=$row->evall;
			$debet_n1+=$row->job; $debet_n2+=$row->kry; $debet_n2+=$row->lain; $debet_total+=$row->mos;
			$kredit_n1+=$row->os; $kredit_n2+=$row->pak; $kredit_n3+=$row->perpus; $kredit_total+=$row->prak;
			$sak_n1+=$row->spp; $sak_n2+=$row->ulum; $sak_n3+=$row->wis; $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->nis</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->kode_kelas</td>
	<td class='isi_laporan'>$row->kode_akt</td>
	<td class='isi_laporan'>$row->kode_jur</td>
    <td class='isi_laporan' align='right'>".number_format($row->asur,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->dsp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->eks,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->evall,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->job,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kry,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->lain,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->mos,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->os,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pak,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->perpus,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->prak,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->spp,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->ulum,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->wis,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='7'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
