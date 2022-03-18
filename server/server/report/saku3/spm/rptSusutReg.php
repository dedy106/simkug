<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSusutReg extends server_report_basic
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
		$sql="select b.kode_pp,d.nama as pp,a.no_fasusut, a.keterangan, CONVERT(varchar, a.tanggal, 105) as tgl, b.no_fa, b.umur, b.kode_akun, c.nama as akun,
		b.nilai_aset,b.nilai as susut
	   from fasusut_m a
	   inner join fasusut_d b on a.no_fasusut=b.no_fasusut and a.kode_lokasi=b.kode_lokasi 
	   inner join masakun c on b.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
	   inner join pp d on b.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
$this->filter order by a.no_fasusut";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data penyusutan reguler",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>No Susut</td>
	  <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Tanggal Susut</td>
     <td width='150'  align='center' class='header_laporan'>No FA</td>
     <td width='90'  align='center' class='header_laporan'>Umur</td>
     <td width='90'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
     <td width='90'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Perolehan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Susut</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_aset=$nilai_aset+$row->nilai_aset;
			$susut=$susut+$row->susut;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_fasusut</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_fa</td>
	 <td class='isi_laporan'>$row->umur</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->pp</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_aset,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->susut,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
		<td class='header_laporan' align='center' colspan='10'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_aset,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($susut,0,",",".")."</td>
	 
	   </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
