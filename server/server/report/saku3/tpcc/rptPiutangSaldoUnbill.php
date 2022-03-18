<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_rptPiutangSaldoUnbill extends server_report_basic
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
		$sts=$tmp[2];
		$periode_bayar=$tmp[3];
		//$tgl=$tmp[3];
		$sql2="";
		if ($sts=="Lunas"){
			$sql2=" and (a.nilai+a.nilai_ppn-isnull(c.nilai,0)=0) ";
		}
		if ($sts=="OutStanding"){
			$sql2=" and (a.nilai+a.nilai_ppn-isnull(c.nilai,0)>0) ";
		}	
// 		$sql="select a.kode_lokasi,a.no_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai as tagihan,b.nama as nama_cust,
// 	   isnull(c.nilai,0) as nilai_kas,a.nilai-isnull(c.nilai,0) as saldo,d.form,isnull(c.no_rekon,'') as no_rekon
// from piutang_d a
// inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
// inner join trans_m d on a.no_piutang=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
// left join (select a.no_dokumen as no_piutang,a.kode_lokasi,a.no_piutang as no_rekon,sum(a.nilai*-1) as nilai
// 		   from piutang_d a
// 		   where a.kode_lokasi='$kode_lokasi' and a.modul='REVUBILL'
// 		   group by a.no_dokumen,a.kode_lokasi,a.no_piutang
// 		  )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
// $this->filter $sql2 
// order by a.tanggal,a.no_piutang";
		$sql = "select a.kode_lokasi,a.no_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai ,b.nama as nama_cust,
	   isnull(c.nilai,0) as nilai_kas,a.nilai+a.nilai_ppn-isnull(c.nilai,0) as saldo,d.form,a.nilai_ppn,a.nilai+a.nilai_ppn as total
	   from piutang_d a
	   inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join trans_m d on a.no_piutang=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
	   left join (select a.no_dokumen as no_piutang,a.kode_lokasi,sum((a.nilai+a.nilai_ppn)*-1) as nilai
				  from piutang_d a
				  where a.kode_lokasi='$kode_lokasi' and a.modul='REVUBILL' and a.periode<='$periode_bayar'
				  group by a.no_dokumen,a.kode_lokasi
				 )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
		$this->filter $sql2 
		order by a.tanggal,a.no_piutang";
		//cho $sql;

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang unbill",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' heigt='23'   align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Piutang</td>
	 <td width='60'   align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Customer</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90' align='center' class='header_laporan'>Tagihan</td>
	 <td width='90' align='center' class='header_laporan'>PPN</td>
	 <td width='90' align='center' class='header_laporan'>Total</td>
	 <td width='90'   align='center' class='header_laporan'>Reverse</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
   ";
		$nilai=0;$nilai_kas=0;$saldo=0;$nilai_ppn=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
			$nilai_ppn+=$row->nilai_ppn;
			$total+=$row->total;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	
	  
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' heigt='23' align='center' colspan='5'>Total</td>
     <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
