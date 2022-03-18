<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptSaldoHut extends server_report_basic
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
		$periode=$tmp[1];
		// $jenis=$tmp[3];
		// $nama_file="saldo.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_pesan,f.no_po,a.kode_lokasi,a.kode_pp,a.keterangan
		,isnull(b.total,0)-isnull(d.total,0) as saw_total,isnull(c.total,0) as debet_total
	   ,isnull(e.total,0) as kredit_total
	   ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
from mb_pesan_m a
inner join mb_po_m f on a.no_pesan=f.no_ref1 and a.kode_lokasi=f.kode_lokasi 
left join (select x.no_po,x.kode_lokasi, sum(x.nilai) as total		
			from mb_ba_m x 			
			where(x.kode_lokasi = '$kode_lokasi') and(x.periode < '$periode') 		
			group by x.no_po,x.kode_lokasi 			
			)b on f.no_po=b.no_po and f.kode_lokasi=b.kode_lokasi
left join (select x.no_po,x.kode_lokasi, sum(x.nilai) as total		
			from mb_ba_m x 			
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') 		
			group by x.no_po,x.kode_lokasi 						
			)c on f.no_po=c.no_po and f.kode_lokasi=c.kode_lokasi
left join (select x.no_beli,x.kode_lokasi,  
		   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
			from brg_belibayar_d x 	
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.modul='KBBELICCL'		
			group by x.no_beli,x.kode_lokasi 			
			)d on f.no_po=d.no_beli and f.kode_lokasi=d.kode_lokasi
left join (select x.no_beli,x.kode_lokasi,  
		   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
			from brg_belibayar_d x 	
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode')	and x.modul='KBBELICCL'		
			group by x.no_beli,x.kode_lokasi 		
			)e on f.no_po=e.no_beli and f.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_pesan
 ";
		
		// if ($jenis=="Excel")
		// {
			
		// 	header("Pragma: public");
		// 	header("Expires: 0");
		// 	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
		// 	header("Content-Type: application/force-download");
		// 	header("Content-Type: application/octet-stream");
		// 	header("Content-Type: application/download");;
		// 	header("Content-Disposition: attachment;filename=$nama_file"); 
		// 	header("Content-Transfer-Encoding: binary ");
			
        // }
        
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
        <tr align='center' bgcolor='#CCCCCC'>
            <td width='20'  class='header_laporan'>No</td>
            <td width='50'  class='header_laporan'>No PR</td>
            <td width='50' class='header_laporan'>No PO</td>
            <td width='200'  class='header_laporan'>Keterangan</td>
            <td width='90' class='header_laporan'>Saldo Awal </td>
            <td width='90' class='header_laporan'>Tagihan</td>
            <td width='90' class='header_laporan'>Pembayaran</td>
            <td width='90' class='header_laporan'>Saldo Akhir </td>
        </tr>
        ";
		$saw_total=0;
		$debet_total=0;
		$kredit_total=0;
		$sak_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_total+=$row->saw_total;
			$debet_total+=$row->debet_total;
            $kredit_total+=$row->kredit_total;
            $sak_total+=$row->sak_total;
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>$row->no_pesan</td>
                <td class='isi_laporan'>$row->no_po</td>
                <td class='isi_laporan'>$row->keterangan</td>
                <td class='isi_laporan' align='right'>".number_format($row->saw_total,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->sak_total,0,",",".")."</td>
            </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
            <td class='isi_laporan' align='center' colspan='4'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($saw_total,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
        </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
