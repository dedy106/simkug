<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sju16_rptEmail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"))."media/";		
		$tmp=explode("/",$this->filter2);
		$kode_pic=$tmp[0];
		$mail = new server_util_mail();
		$AddOnLib=new server_util_AddOnLib();
			
		$sql="select b.email,a.kode_pic,b.nama
from (select a.kode_pic,a.kode_lokasi
from sju_polis_m a 					 
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
$this->filter
group by a.kode_pic,a.kode_lokasi
	)a
inner join sju_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi
order by a.kode_pic";
		
		$rs1 = $dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			
			$sql="select 'INPROG' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.kode_cust+' - '+b.nama as cust,c.kode_vendor+' - '+c.nama as vendor,a.kode_curr,a.total, 
	a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr 
	from sju_polis_m a 					 
	inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
	inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
	left join sju_renew_d d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
	$this->filter and a.kode_pic='$row1->kode_pic'
	order by a.no_polis ";
			
			$rs = $dbLib->execute($sql);	
			$i = 1;
			$konten="";
			$konten= $konten."<div align='center'>"; 
			$konten= $konten."<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
	   <tr bgcolor='#CCCCCC'>
		 <td width='30'  align='center' class='header_laporan'>No</td>
		 <td width='100'  align='center' class='header_laporan'>No Polis</td>
		  <td width='150'  align='center' class='header_laporan'>No Dokumen</td>
		  <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
		  <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
		  <td width='150'  align='center' class='header_laporan'>Tertanggung</td>
		 <td width='150'  align='center' class='header_laporan'>Penanggung</td>
		 <td width='50'  align='center' class='header_laporan'>Curr</td>
		  <td width='100'  align='center' class='header_laporan'>Sum Insured</td>
		 <td width='90'  align='center' class='header_laporan'>NIlai Premi</td>
		 <td width='150'  align='center' class='header_laporan'>Occup. of Risk</td>
		 <td width='150'  align='center' class='header_laporan'>Object of Risk</td>
		 <td width='150'  align='center' class='header_laporan'>Loc. of Risk</td>
		 
		 
		 
		 </tr>  ";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				$konten= $konten."<tr >
		 <td class='isi_laporan' align='center'>$i</td>
		 <td class='isi_laporan'>$row->no_polis</td>
		 <td class='isi_laporan'>$row->no_dok</td>
		 <td class='isi_laporan'>$row->tgl_mulai</td>
		 <td class='isi_laporan'>$row->tgl_selesai</td>
		 <td class='isi_laporan'>$row->cust</td>
		 <td class='isi_laporan'>$row->vendor</td>
		 <td class='isi_laporan'>$row->kode_curr</td>
		 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->n_premi,0,",",".")."</td>
		 <td class='isi_laporan'>$row->occup</td>
		 <td class='isi_laporan'>$row->objek</td>
		 <td class='isi_laporan'>$row->lokasi</td>
		 </tr>";
			 
				$i=$i+1;
			}
			$konten= $konten."</table><br>";
			$konten= $konten."</div>";
			
			if ($row1->email!="-")
			{
				$numSent = $mail->sendMail("no-reply@sju.co.id", $row1->email,"laporan renewal notice", $konten,null);
				echo $numSent;
			}
			else
			{
				echo "Data email $row1->kode_pic - $row1->nama belum di setting <br>";
			}
			
		}
		return "";
	}
	
}
?>
  
