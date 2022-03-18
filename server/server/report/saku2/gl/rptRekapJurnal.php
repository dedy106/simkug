<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptRekapJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$toleran=$tmp[0];
		$modul = array("ju_m","kas_m","ptg_m","fasusut_m","fawoapp_m","aka_bill_m","aka_amor_m","aka_rekon_m","aka_batal_m","aka_sisih_m","yk_valid_m","yk_hutang_m","yk_rekon_m","spb_m","ras_ppn_m","takkirim_m","takterima_m");
		$nobukti = array("no_ju","no_kas","no_ptg","no_fasusut","no_woapp","no_bill","no_amor","no_rekon","no_batal","no_sisih","no_valid","no_hutang","no_rekon","no_spb","no_ppn","no_kirim","no_terima");
		$sql = "";
		foreach ($modul as $i=>$value){
			if ($i > 0) $sql .= " union all ";
			$sql .= "select convert(varchar,tanggal,103)+'/'+ 
				 (case datename(weekday,tanggal) when 'Monday' then 'Senin'  
					when 'Tuesday' then 'Selasa' when 'Wednesday' then 'Rabu' when 'Thursday' then 'Kamis' 
					when 'Friday' then 'Jum''at' when 'Saturday' then 'Sabtu' when 'Sunday'  then 'Minggu' end ) as tanggal 
				 , convert(varchar,tgl_input,103) as tgl, 
				 case datename(weekday,tanggal) when  'Friday' then ". $toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal as maxtgl , 
				 datediff (day,case datename(weekday,tanggal) when  'Friday' then ".$toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal, tgl_input) as terlambat, ".$nobukti[$i]." 
				from ".$value." a ". $this->filter;
		}
		$sql = "select distinct a.tanggal,c.total as tot, b.tgl,b.total, case when b.terlambat < 0 then 0 else b.terlambat end as terlambat 
						 from (".$sql.") a 
						 inner join (select tanggal, tgl, terlambat,count(*) as total  
									from (". $sql.") a group by tanggal , tgl,terlambat) b on b.tanggal = a.tanggal 
						 inner join (select tanggal as tanggal, count(*) as total 
									from (". $sql .") a  group by tanggal ) c on c.tanggal = a.tanggal ";
		$sql = "select count(*) as jum
						from (". $sql.") a ";		
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
		$toleran=$tmp[0];		
		$modul = array("ju_m","kas_m","ptg_m","fasusut_m","fawoapp_m","aka_bill_m","aka_amor_m","aka_rekon_m","aka_batal_m","aka_sisih_m","yk_valid_m","yk_hutang_m","yk_rekon_m","spb_m","ras_ppn_m","takkirim_m","takterima_m");
		$nobukti = array("no_ju","no_kas","no_ptg","no_fasusut","no_woapp","no_bill","no_amor","no_rekon","no_batal","no_sisih","no_valid","no_hutang","no_rekon","no_spb","no_ppn","no_kirim","no_terima");
		$sql = "";
		foreach ($modul as $i=>$value){
			if ($i > 0) $sql .= " union all ";
			$sql .= "select convert(varchar,tanggal,103)+'/'+ 
				 (case datename(weekday,tanggal) when 'Monday' then 'Senin'  
					when 'Tuesday' then 'Selasa' when 'Wednesday' then 'Rabu' when 'Thursday' then 'Kamis' 
					when 'Friday' then 'Jum''at' when 'Saturday' then 'Sabtu' when 'Sunday'  then 'Minggu' end ) as tanggal 
				 , convert(varchar,tgl_input,103) as tgl, 
				 case datename(weekday,tanggal) when  'Friday' then ". $toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal as maxtgl , 
				 datediff (day,case datename(weekday,tanggal) when  'Friday' then ".$toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal, tgl_input) as terlambat, ".$nobukti[$i]." 
				from ".$value." a ". $this->filter;
		}
		$sql = "select distinct a.tanggal,c.total as tot, b.tgl,b.total, case when b.terlambat < 0 then 0 else b.terlambat end as terlambat 
						 from (".$sql.") a 
						 inner join (select tanggal, tgl, terlambat,count(*) as total  
									from (". $sql.") a group by tanggal , tgl,terlambat) b on b.tanggal = a.tanggal 
						 inner join (select tanggal as tanggal, count(*) as total 
									from (". $sql .") a  group by tanggal ) c on c.tanggal = a.tanggal ";
		
		$sql .= " order by a.tanggal, b.tgl ";
				
		$start = (($this->page-1) * $this->rows);
		if ($start<0) 
		{
			$start=1;
		}
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan Rekapitulasi Data Inputan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
			  <tr bgcolor='#CCCCCC'>
				<td width='30' class='header_laporan' align='center'>No</td>
				<td width='100' class='header_laporan' align='center'>Tanggal Dokumen/Hari</td>
				<td width='100' class='header_laporan' align='center'>Jumlah Transaksi</td>
				<td width='100' class='header_laporan' align='center'>Tangggal Input</td>
				<td width='100' class='header_laporan' align='center'>Jumlah</td>
				<td width='100' class='header_laporan' align='center'>Keterlambatan</td>				
			  </tr>";
		$total = 0;
		$tot1 = 0;
		$tot2 = 0;
		$rc = 0;
		$tgl = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total += $row->terlambat;
			$tot2 += $row->total;
			$tanggal = $row->tanggal;
			if ($tgl != $row->tanggal){				
				$tgl = $row->tanggal;
				$tanggal = $tgl;
				$tmp = number_format($row->tot,0,',','.');
				$tot1 += $row->tot;
			}else {
				$tanggal = "";
				$tmp = "";
			}
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$tanggal</td>
				<td class='isi_laporan'>".$tmp."</td>
				<td class='isi_laporan' align='center'>$row->tgl</td>
				<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->terlambat,0,',','.')."</td>				
			  </tr>";
			
			$i++;
			$rc++;
		}				
		echo "<tr>
			<td colspan='2' class='sum_laporan' align='right'>Total</td>
			<td class='sum_laporan' align='right'>".number_format($tot1,0,',','.')."</td>
			<td class='sum_laporan' align='right'>&nbsp; </td>
			<td class='sum_laporan' align='right'>".number_format($tot2,0,',','.')."</td>
			<td class='sum_laporan' align='right'>".number_format($total,0,',','.')." <br>(rata-rata : ".(number_format($total / $rc,2,',','.')).")</td>			
		</tr>";
		echo "</table></div>";
		return "";
	}	
	function createPdf()
	{		
		global $dbLib;
		$AddOnLib=new server_util_AddOnLib();
		$tmp=explode("/",$this->filter2);		
		$toleran=$tmp[0];		
		$modul = array("ju_m","kas_m","ptg_m","fasusut_m","fawoapp_m","aka_bill_m","aka_amor_m","aka_rekon_m","aka_batal_m","aka_sisih_m","yk_valid_m","yk_hutang_m","yk_rekon_m","spb_m","ras_ppn_m","takkirim_m","takterima_m");
		$nobukti = array("no_ju","no_kas","no_ptg","no_fasusut","no_woapp","no_bill","no_amor","no_rekon","no_batal","no_sisih","no_valid","no_hutang","no_rekon","no_spb","no_ppn","no_kirim","no_terima");
		$sql = "";
		foreach ($modul as $i=>$value){
			if ($i > 0) $sql .= " union all ";
			$sql .= "select convert(varchar,tanggal,103)+'/'+ 
				 (case datename(weekday,tanggal) when 'Monday' then 'Senin'  
					when 'Tuesday' then 'Selasa' when 'Wednesday' then 'Rabu' when 'Thursday' then 'Kamis' 
					when 'Friday' then 'Jum''at' when 'Saturday' then 'Sabtu' when 'Sunday'  then 'Minggu' end ) as tanggal 
				 , convert(varchar,tgl_input,103) as tgl, 
				 case datename(weekday,tanggal) when  'Friday' then ". $toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal as maxtgl , 
				 datediff (day,case datename(weekday,tanggal) when  'Friday' then ".$toleran."+2 when 'Thursday' then ".$toleran."+2 else ".$toleran." end + a.tanggal, tgl_input) as terlambat, ".$nobukti[$i]." 
				from ".$value." a ". $this->filter;
		}
		$sql = "select distinct a.tanggal,c.total as tot, b.tgl,b.total, case when b.terlambat < 0 then 0 else b.terlambat end as terlambat 
						 from (".$sql.") a 
						 inner join (select tanggal, tgl, terlambat,count(*) as total  
									from (". $sql.") a group by tanggal , tgl,terlambat) b on b.tanggal = a.tanggal 
						 inner join (select tanggal as tanggal, count(*) as total 
									from (". $sql .") a  group by tanggal ) c on c.tanggal = a.tanggal ";
		$scriptSqlCount = "select count(*) as tot
						from (". $sql.") a ";
		$sql .= " order by a.tanggal, b.tgl ";
		//error_log($sql);		
		uses("server_util_PdfLib");			
		$title = array($this->lokasi,"Laporan Rekapitulasi Inputan","Periode " . $AddOnLib->ubah_periode($periode));
		$titleHeight= array(5,8,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14,8);//fontSize judul
		$header = array("No","Tgl. Dok/Hari","Jumlah","Tgl. Input","Jumlah","Keterlambatan");
		
		$headerWidth = array(10,30,20,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 6, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();
		//$pdf->onPrintHeader->set($this, "doPrintHeader");
		$pdf->AddPage();
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$namafile = "data-rekap-inputan.pdf";		
		$w = $pdf->headerWidth;
		$fill = false;
		$pdf->SetFillColor(224,235,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('','', 6);
		$ix = $start+1;						
		$total = 0;
		$tot1 = 0;
		$tot2 = 0;
		$rc = 0;
		$rowHeight = 5;
		$defHeight = 5;
		$tgl = "";
		$w = array(10,30,20,20,20,20);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total += $row->terlambat;
			$tot2 += $row->total;
			$tanggal = $row->tanggal;
			if ($tgl != $row->tanggal){				
				$tgl = $row->tanggal;
				$tanggal = $tgl;
				$tmp = number_format($row->tot,0,',','.');
				$tot1 += $row->tot;
			}else {
				$tanggal = "";
				$tmp = "";
			}
			$y1 = $pdf->GetY();											
			$numrow = $pdf->WordWrap($row->tanggal,$w[1] - 2);			
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;
			
			$pdf->row = $row;			
			$pdf->SetX(10);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'C',false);
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();					
			$pdf->MultiCell($w[1],$defHeight,$tanggal,1);														
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(10 + $w[0] + $w[1],  $pdf->GetY() - $y);											
						
			$pdf->Cell($w[2],$rowHeight,$tmp,1,0,'R',$fill);														
			$pdf->Cell($w[3],$rowHeight,$row->tgl,1,0,'R',$fill);														
			$pdf->Cell($w[4],$rowHeight,number_format($row->tot,0,',','.'),1,0,'R',$fill);																	
			$pdf->Cell($w[5],$rowHeight,number_format($row->terlambat,0,',','.'),1,0,'R',$fill);																	
			$ix++;
			$rc++;
			$pdf->Ln();
			$fill= false;
		}			
		$t = number_format($total,0,',','.')."\n rata-rata:(".number_format(($total / $tot1),2,',','.').")";
		$numrow = $pdf->WordWrap($t,$w[1] - 2);
		if ($numrow <= 0) $numrow = 1;
		$rowHeight = $numrow * $defHeight;
		$pdf->SetX(10);
		$pdf->SetFillColor(224,235,255);
		$pdf->Cell($w[0]+$w[1],$rowHeight,"Total",1,0,'R',false);																	
		$pdf->Cell($w[2],$rowHeight,number_format($tot1,0,',','.'),1,0,'R',false);
		$pdf->Cell($w[3],$rowHeight,"",1,0,'R',false);
		$pdf->Cell($w[4],$rowHeight,number_format($tot2,0,',','.'),1,0,'R',false);
		$pdf->MultiCell($w[5],$defHeight,number_format($total,0,',','.')."\n rata-rata:(".number_format(($total / $tot1),2,',','.').")",1,0,'R',false);

		$ret = $pdf->Output($namafile,'I',false);
		return $ret;		
	}
}
?>
