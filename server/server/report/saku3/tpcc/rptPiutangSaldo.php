<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_rptPiutangSaldo extends server_report_basic
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
		$sql2="";
		if ($sts=="Lunas"){
			$sql2=" and (a.nilai+a.nilai_ppn-isnull(c.nilai,0)=0) ";
		}
		if ($sts=="OutStanding"){
			$sql2=" and (a.nilai+a.nilai_ppn-isnull(c.nilai,0)>0) ";
		}	
// 		$sql="select a.kode_lokasi,a.no_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as tagihan,b.nama as nama_cust,
// 	   isnull(c.nilai,0) as nilai_kas,a.nilai+a.nilai_ppn-isnull(c.nilai,0) as saldo,d.form,isnull(c.no_rekon,'') as no_rekon
// from piutang_d a
// inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
// inner join trans_m d on a.no_piutang=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
// left join (select a.no_piutang,a.kode_lokasi,a.no_bukti as no_rekon,sum(a.nilai) as nilai
// 		   from piubayar_d a
// 		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
// 		   group by a.no_piutang,a.kode_lokasi,a.no_bukti
// 		  )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
// $this->filter $sql2 
// order by a.tanggal,a.no_piutang";
		$sql = "select a.kode_lokasi,a.no_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as tagihan,b.nama as nama_cust,
		isnull(c.nilai,0) as nilai_kas,a.nilai+a.nilai_ppn-isnull(c.nilai,0) as saldo,d.form,dbo.fnGetBuktiBayarPiu(a.no_piutang,a.kode_lokasi) as no_rekon
 from piutang_d a
 inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
 inner join trans_m d on a.no_piutang=d.no_bukti and a.kode_lokasi=d.kode_lokasi 
 left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai) as nilai
			from piubayar_d a
			where a.kode_lokasi='$kode_lokasi' $periode_bayar
			group by a.no_piutang,a.kode_lokasi
		   )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
		   $this->filter $sql2 and d.modul='AR'
 order by a.tanggal,a.no_piutang ";
//  echo $sql;
		
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang bill",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' heigt='23' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Piutang</td>
	 <td width='100'  rowspan='2' align='center' class='header_laporan'>No Bill</td>
	 <td width='60'  rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='200' rowspan='2' align='center' class='header_laporan'>Customer</td>
	 <td width='120' rowspan='2' align='center' class='header_laporan'>Tgl Pelaksanaan</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
	 <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No KasBank</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;$totaltgh=0;$nilrev=0;$nilbyr=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			
				$totaltgh=$totaltgh+($row->nilai);
				$nilbyr=$nilbyr+$row->nilai_kas;
				$nilai_tgh=$row->nilai;
			echo "<tr >
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
				echo "</td>
			<td class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row->no_dokumen','$row->kode_lokasi');\">$row->no_dokumen</a>";
				echo "</td>	
		
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->nama_cust</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>$row->keterangan</td>
			
			<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($nilai_tgh,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
			<td class='isi_laporan'>";
			$tmp=explode(";",$row->no_rekon);
			$no_rekon="";
			for ($j = 0; $j < count($tmp); $j++) {
				if($tmp[$j] != ""){
					$no_rekon.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenRekon('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
				}
			}
				// echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenRekon('$row->no_rekon','$row->kode_lokasi');\">$row->no_rekon</a>";
				echo $no_rekon;
				echo "</td>	
			<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
			</tr>";
				$i=$i+1;
		}
		echo "<tr>
	  <td class='header_laporan' heigt='23' align='center' colspan='7'>Total</td>
     <td class='header_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($totaltgh,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilbyr,0,",",".")."</td>
	 <td class='header_laporan' heigt='23' align='center' >&nbsp;</td>
	 <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
