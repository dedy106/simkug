
<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kantintu_rptKontrolTenan extends server_report_basic
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
	
		$sql="select a.no_ba, date_format(b.tanggal,'%d/%m/%Y') as tanggal, c.kode_kantin, c.nama as kantin,
		d.kode_tenan,d.nama as tenan,
		d.norek, d.bank, d.namarek,
		e.hasil_tenan, e.hasil_tel, e.persentase, e.no_kas as no_trf, e.nilai
		from ktu_ba a
		INNER JOIN ktu_closing_m b on a.no_ba=b.no_ba and a.kode_lokasi=b.kode_lokasi
		INNER JOIN ktu_kantin c on c.kode_kantin=b.kode_kantin and c.kode_lokasi=b.kode_lokasi
		INNER JOIN ktu_tenan d on d.kode_kantin=c.kode_kantin and d.kode_lokasi=c.kode_lokasi
		INNER JOIN ktu_rekon_d e on e.kode_tenan=d.kode_tenan and e.kode_lokasi=d.kode_lokasi
		$this->filter
		order by c.kode_kantin ";
		
		echo $sql;

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kontrol tenant",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));

   
   		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No BAST</td>
    <td width='80' align='center' class='header_laporan'>Tanggal</td>
	<td width='50' align='center' class='header_laporan'>Kantin</td>
	<td width='50' align='center' class='header_laporan'>No Tenan</td>
	<td width='80' align='center' class='header_laporan'>Tenan</td>
	<td width='80' align='center' class='header_laporan'>Total Pendapatan</td>
	<td width='50' align='center' class='header_laporan'>Presentase Sharing (%)</td>
	<td width='80' align='center' class='header_laporan'>Nilai Tenan</td>
	<td width='80' align='center' class='header_laporan'>Nilai Tel-U</td>
	<td width='80' align='center' class='header_laporan'>No Transferring</td>
	<td width='80' align='center' class='header_laporan'>No Rekening</td>
	<td width='80' align='center' class='header_laporan'>Bank</td>
	<td width='150' align='center' class='header_laporan'>Pemilik Rekening</td>
	
   </tr>";
		$tenan=0; $telu=0; $tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tenan+=$row->hasil_tenan;
			$telu+=$row->hasil_tel;
			$tot+=$row->nilai;
	
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_ba</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	  <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKantin('$row->kode_kantin','$row->kode_lokasi');\">$row->kode_kantin</a>";
	echo "</td>
	 <td class='isi_laporan'>$row->kode_tenan</td>
	 <td class='isi_laporan'>$row->tenan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->persentase,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->hasil_tenan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->hasil_tel,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_trf</td>
	 <td class='isi_laporan'>$row->norek</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->namarek</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tot,0,",",".")."</td>
     <td class='isi_laporan' align='right'></td>	  
     <td class='isi_laporan' align='right'>".number_format($tenan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($telu,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='4'></td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  



