<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptKuitansi3 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
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
		
		$sql="select a.no_bill,a.kode_lokasi,b.no_ttb,b.cicilan_ke,c.lama_bayar,a.tanggal,date_format(c.tanggal,'%d/%m/%Y') as tgl,
	   e.nama as nama_promo,f.nama as nama_survey,d.nama,isnull(h.lama,0)-b.cicilan_ke as sisa,b.npokok as nilai,
	   date_format(b.tgl_angs,'%d/%m/%Y') as tgl_bill
from kre_bill_m a
inner join kre_ttb2_sch b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join kre_ttb2_m c on b.no_ttb=c.no_ttb and b.kode_lokasi=c.kode_lokasi
inner join kre_agg d on c.no_agg=d.no_agg and c.kode_lokasi=d.kode_lokasi
inner join karyawan e on c.nik_promo=e.nik and c.kode_lokasi=e.kode_lokasi
inner join karyawan f on c.nik_survey=f.nik and c.kode_lokasi=f.kode_lokasi
left join kre_angsur_d i on b.no_ttb=i.no_ttb and b.kode_lokasi=i.kode_lokasi and b.cicilan_ke=i.cicilan_ke
left join (select no_ttb,kode_lokasi,COUNT(no_ttb) as jum
		   from kre_ttb2_sch
	       where no_bill='-' 
		   group by no_ttb,kode_lokasi
		  )g on c.no_ttb=g.no_ttb and c.kode_lokasi=g.kode_lokasi
left join (select no_ttb,kode_lokasi,max(cicilan_ke) as lama
		   from kre_ttb2_sch
	       group by no_ttb,kode_lokasi
		  )h on c.no_ttb=h.no_ttb and c.kode_lokasi=h.kode_lokasi
		  
$this->filter and isnull(i.no_bukti,'-')='-'
order by b.no_ttb";
		
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo " <style>
        	body {
					font-family:'Arial',Arial,Helvetica Neueu,Helvetica,Arial,Sans-serif,serif;
					font-size: 10;
				}
        	.container {
        		position: relative;
        		height: 217px;
        		width : 100%;
        	}
        	.container1 {
        		position: relative;
        		height: 218px;
        		width : 100%;
        	}
        	.container2 {
        		position: relative;
        		height: 219px;
        		width : 100%;
        	}
        	.sales {
        		position:absolute;
        		top : 0px;
        		left : 490px;
        	}
        	.surveyor {
        		position: absolute;
        		top : 15px;
        		left : 490px;
        	}
        	.no {
        		position : absolute;
        		top : 45px;
        		left : 80px;
        	}
        	.dari {
        		position : absolute;
        		top : 80px;
        		left : 80px;
        	}
        	
        	.no2 {
        		position : absolute;
        		top : 37px;
        		left : 320px;
        	}
        	.dari2 {
        		position : absolute;
        		top : 60px;
        		left : 320px;
        	}
        	.jumlah {
        		position : absolute;
        		top : 85px;
        		left : 320px;
        		font-style: italic;
				font-weight: bold;
        	}
        	.tgl {
        		position : absolute;
        		left : 650px;
        		top : 90px 
        	}
            
            .ke {
        		position : absolute;
        		left : 80px;
        		top : 115px ;
        	}
    		.sisa {
        		position : absolute;
        		left : 120px;
        		top : 115PX ;
        	}
        	.ke2 {
        		position : absolute;
        		left : 400px;
        		top : 115px ;
        	}
    		.sisa2 {
        		position : absolute;
        		left : 440px;
        		top : 115px ;
        	}
        	.tgl2 {
        		position : absolute;
        		left : 500px;
        		top : 120px ;
        	}
        	.tgl3 {
        		position : absolute;
        		left : 80px;
        		top : 155px ;
        	}
    		.no3 {
        		position : absolute;
        		left : 400px;
        		top : 130px ;
        	}
        	.no4 {
        		position : absolute;
        		left : 80px;
        		top : 135px ;
        	}
	        .amount2 {
        		position : absolute;
        		left : 320px;
        		top : 160px ;
				font-style: italic;
				font-weight: bold;
        	}   
        	.amount {
        		position : absolute;
        		left : 80px;
        		top : 175px ;
				font-style: italic;
				font-weight: bold;
        	}    
        </style>";
		$logo="image/jawa_makmur.jpg";
		echo "<div align='left'>"; 
		//echo $AddOnLib->judul_laporan("kuitansi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$counter = 1;
		while ($row = $rs->FetchNextObject($toupper=false))
		
		{
			if ($counter == 1)
				$className = "container1";
			else if ($counter == 5){
				$className = "container2";
				$counter = 0;
			}else $className = "container";
			$counter ++;
			echo "<div class='$className' >
					<div class='sales'>$row->nama_promo</div>
					<div class='surveyor'>$row->nama_survey</div>
					<div class='no'>$row->no_ttb</div>
					<div class='no2'>$row->no_ttb</div>
					<div class='dari'>$row->nama</div>
					<div class='dari2'>$row->nama</div>
					<div class='jumlah'>".$AddOnLib->terbilang($row->nilai)."</div>
					<div class='tgl'>$row->tgl_bill</div>
					<div class='ke'>$row->cicilan_ke</div>
					<div class='sisa'>$row->sisa</div>
					<div class='ke2'>$row->cicilan_ke</div>
					<div class='sisa2'>$row->sisa</div>
					<div class='tgl2'>$row->tgl</div>
					<div class='no3'>$row->no_ttb</div>
					<div class='no4'>$row->no_ttb</div>
					<div class='tgl3'>$row->tgl</div>
					<div class='amount'>".number_format($row->nilai,0,",",".")."</div>
					<div class='amount2'>".number_format($row->nilai,0,",",".")."</div>
				</div>";
			
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
