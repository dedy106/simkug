<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptGajiSd1 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$sql=" select a.nik,a.nama as nip,b.periode,a.kode_sdm,b.prestasi,a.kode_gol,a.mk_gol,a.mk_ytb,a.kode_pajak,
		a.kode_unit,a.ijht,a.jp,
		sum(case when c.kode_param='GHON' then c.nilai else 0 end) as gaji,
		sum(case when c.kode_param='INS' then c.nilai else 0 end) as ins,
		sum(case when c.kode_param='TYTB' then c.nilai else 0 end) as tytb,
		sum(case when c.kode_param='TABDI' then c.nilai else 0 end) as tabdi,
		sum(case when c.kode_param='TWALI' then c.nilai else 0 end) as twali,
		sum(case when c.kode_param='PSP' then c.nilai else 0 end) as psp,
		sum(case when c.kode_param='PUMK' then c.nilai else 0 end) as pumk,
		sum(case when c.kode_param='TRANS' then c.nilai else 0 end) as trans,
		sum(case when c.kode_param='ABSEN' then c.nilai else 0 end) as absen,
		sum(case when c.kode_param='BPJS' then c.nilai else 0 end) as bpjs,
		sum(case when c.kode_param='POT' then c.nilai else 0 end) as pot,
		sum(case when c.kode_param='BANK' then c.nilai else 0 end) as bank
		 from hr_karyawan a
		 inner join hr_gaji_input b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
		 inner join hr_gaji_nik c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
		 $this->filter and a.kode_unit='SD' and a.kode_sdm<>'GH'
		group by a.nik,a.nama,b.periode,a.kode_sdm,b.prestasi,a.kode_gol,a.mk_gol,a.mk_ytb,a.kode_pajak,
		a.kode_unit,a.ijht,a.jp
		 order by a.nik";
		
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Gaji Guru & Karyawan Tetap SD",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>NIP</td>
	  <td width='300'  rowspan='2' align='center' class='header_laporan'>Nama</td>
	  <td width='90' rowspan='2'  align='center' class='header_laporan'>Periode</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Kd.</td>
	  <td width='90'  rowspan='2' align='center' class='header_laporan'>Pres.</td>
	  <td width='90'  rowspan='2' align='center' class='header_laporan'>Gol</td>
	  <td width='90'  colspan='2' align='center' class='header_laporan'>MK</td>
	  <td width='90'  rowspan='2' align='center' class='header_laporan'>K/TK</td>
	  <td width='90'  rowspan='2' align='center' class='header_laporan'>Gaji Pokok</td>
	  <td width='90'   rowspan='2' align='center' class='header_laporan'>Insentif</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Tunjangan MK YTB</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Tunjangan Pengabdian</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Tunjangan Jabatan Wali Kelas</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Peny.  10% Psp</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>UMK</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Pendapatan Bruto</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Transport&Konsumsi</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Jumlah</td>
	  <td width='200' colspan='2'  align='center' class='header_laporan'>Pot. Tidak Hadir</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>IJHT</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>JP</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>BPJS Kesehatan</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Penerimaan Netto</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Pajak</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Potongan</td>
	  <td width='90' rowspan='2' align='center' class='header_laporan'>Biaya Bank</td>
	  <td width='90' rowspan='2'  align='center' class='header_laporan'>Pendapatan Netto</td>
	  </tr>
	  <tr bgcolor='#CCCCCC'>
		<td width='90'  align='center' class='header_laporan'>Gol</td>
		<td width='90'  align='center' class='header_laporan'>YTB</td>
		<td width='90'  align='center' class='header_laporan'>Hari</td>
		<td width='90'  align='center' class='header_laporan'>Pot.</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto=$row->gaji+$row->ins+$row->tytb+$row->tabdi+$row->twali+$row->psp+$row->pumk;
			$netto=$row->gaji+$row->ins+$row->tytb+$row->tabdi+$row->twali+$row->psp+$row->pumk;
			$gaji1=$gaji+$row->gaji;
			$ins1=$ins+$row->ins;
			$tytb1=$tytb+$row->tytb;
			$tabdi1=$tabdi+$row->tabdi;
			$twali1=$twali+$row->twali;
			$psp1=$psp+$row->psp;
			$pumk1=$pumk+$row->pumk;
			$bruto1=$bruto+$bruto;
			$trans1=$trans+$row->trans;
			$absen1=$absen+$row->absen;
			$ijht=$ijht+$row->ijht;
			$jp=$jp+$row->jp;
			$pot1=$pot+$row->pot;
			$bank1=$bank+$row->bank;
			$netto1=$gaji+$row->gaji;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan'>$row->periode</td>
	 <td class='isi_laporan'>$row->kode_sdm</td>
	 <td class='isi_laporan'>$row->prestasi</td>
	 <td class='isi_laporan'>$row->kode_gol</td>
	 <td class='isi_laporan'>$row->mk_gol</td>
     <td class='isi_laporan'>$row->mk_ytb</td>
	 <td class='isi_laporan'>$row->kode_pajak</td>
	 <td class='isi_laporan' align='right'>".number_format($row->gaji,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ins,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tytb,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tabdi,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->twali,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->psp,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pumk,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($bruto,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->trans,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->trans,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->absen,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->absen,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ijht,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jp,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bpjs,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bpjs,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bpjs,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pot,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bank,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($netto,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
		<td class='header_laporan' align='center' colspan='10' ></td>
		<td class='header_laporan' align='right'>".number_format($gaji1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($ins1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($tytb1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($tabdi1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($twali1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($psp1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pumk1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($bruto1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($trans1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($trans1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($absen1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($absen1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($ijht1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($jp1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($bpjs1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($bpjs1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($bpjs1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pot1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($bank1,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($netto1,0,',','.')."</td>
		   </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
