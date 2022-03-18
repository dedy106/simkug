<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptTagihan extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        // $sql=" select b.no_pks,a.no_bill,a.kode_proyek,a.keterangan,a.nilai as dpp, a.nilai_ppn as ppn, a.nilai+a.nilai_ppn as total,isnull(b.no_rek,'-')as no_va,isnull(pb.pbyr,0) as bayar  
		// from prb_prbill_m a
        // inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
        // left join prb_rabapp_m c on b.kode_proyek=c.kode_proyek and b.kode_lokasi=c.kode_lokasi
		// left join prb_rab_m d on c.no_rab=d.no_rab and c.kode_lokasi=d.kode_lokasi
		// left join (select substring(a.keterangan,23,14) as kode_proyek,a.kode_lokasi,sum(a.nilai) as pbyr 
		// 			from trans_j a 
		// 			where a.kode_lokasi='$kode_lokasi' and a.jenis='PIU' and a.modul='PIUPRO' 
		// 			group by substring(a.keterangan,23,14),a.kode_lokasi) pb on a.kode_proyek=pb.kode_proyek and a.kode_lokasi=pb.kode_lokasi 
        // $this->filter order by a.no_bill";
		$sql=" select b.no_pks,a.no_bill,a.kode_proyek,a.keterangan,a.nilai as dpp, a.nilai_ppn as ppn, a.nilai+a.nilai_ppn as total,isnull(b.no_rek,'-')as no_va,isnull(pb.bayar,0) as bayar  
		from prb_prbill_m a
        inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
        left join prb_rabapp_m c on b.kode_proyek=c.kode_proyek and b.kode_lokasi=c.kode_lokasi
		left join prb_rab_m d on c.no_rab=d.no_rab and c.kode_lokasi=d.kode_lokasi
        left join (select no_bill,kode_lokasi,sum(case when dc='D' then nilai else -nilai end) as bayar
					from prb_prbill_bayar 
					group by no_bill,kode_lokasi
					) pb on a.no_bill=pb.no_bill and a.kode_lokasi=pb.kode_lokasi 
		$this->filter
		order by a.no_bill";

// echo $sql;
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tagihan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
     <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>No Tagihan</td>
     <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='60'  align='center' class='header_laporan'>No VA</td>
	 <td width='60'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='80'  align='center' class='header_laporan'>DPP</td>
     <td width='80'  align='center' class='header_laporan'>PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td> 
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td> ";
		$nilai=0; $nilai_ppn=0;$tot=0;$bayar=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai+=$row->dpp;
            $nilai_ppn+=$row->ppn;
            $tot+=$row->dpp+$row->ppn;
            $bayar+=$row->bayar;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>$row->no_bill</td>
	 <td class='isi_laporan'>$row->no_pks</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->no_va</td>
	  <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->dpp,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ppn,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>";
    
			$i=$i+1;
	}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
      <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
      <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
      <td class='header_laporan' align='right'>".number_format($tot,0,",",".")."</td>
      <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
