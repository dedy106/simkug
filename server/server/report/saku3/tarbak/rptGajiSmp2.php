<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptGajiSmp2 extends server_report_basic
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
		$sql=" select a.nik,a.nama as nip,b.periode,b.jam_lembur,b.jam_inval,b.jam_mantap,b.jam_remed,b.jam_ekskul,
		sum(case when c.kode_param in ('GHON','INS','TYTB','TABDI','TWALI','PSP','PUMK') then c.nilai else 0 end) as bruto,
		sum(case when c.kode_param='LBR' then c.nilai else 0 end) as lbr,
		sum(case when c.kode_param='INV' then c.nilai else 0 end) as inv,
		sum(case when c.kode_param='MTAP' then c.nilai else 0 end) as mtap,
		sum(case when c.kode_param='RMED' then c.nilai else 0 end) as rmed,
		sum(case when c.kode_param='EKS' then c.nilai else 0 end) as eks
		 from hr_karyawan a
		 inner join hr_gaji_input b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
		 inner join hr_gaji_nik c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
		 $this->filter and a.kode_unit='SMP' and a.kode_sdm<>'GH'
		group by a.nik,a.nama,b.periode,b.jam_lembur,b.jam_inval,b.jam_mantap,b.jam_remed,b.jam_ekskul
		order by a.nik";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Tambahan Gaji Guru & Karyawan Tetap SMP",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIP</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='100'  align='center' class='header_laporan'>Pendapatan Bruto</td>
     <td width='90'  align='center' class='header_laporan'>Jam Lembur</td>
     <td width='90'  align='center' class='header_laporan'>Pendapatan Lembur</td>
     <td width='90'  align='center' class='header_laporan'>Jam Inval</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Inval</td>
	 <td width='90'  align='center' class='header_laporan'>Jam Pemantapan</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Pemantapan</td>
	 <td width='90'  align='center' class='header_laporan'>Jam Remedial</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Remedial</td>
	 <td width='90'  align='center' class='header_laporan'>Jam Ekskul</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Ekskul</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->lbr+$row->inv+$row->mtap+$row->rmed+$row->eks;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bruto,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>$row->jam_lembur</td>
	 <td class='isi_laporan' align='right'>".number_format($row->lbr,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>$row->jam_inval</td>
	 <td class='isi_laporan' align='right'>".number_format($row->inv,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>$row->jam_mantap</td>
	 <td class='isi_laporan' align='right'>".number_format($row->mtap,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>$row->jam_remed</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rmed,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>$row->jam_ekskul</td>
	 <td class='isi_laporan' align='right'>".number_format($$row->eks,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
