<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptHutangAging extends server_report_basic
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
		$tgl_aging=$tmp[2];
		$sql="select a.kode_lokasi,a.no_dokumen,a.no_hutang,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.nama as nama_cust,a.nilai+a.nilai_ppn as tagihan,
	   case when datediff(day,a.tanggal,'$tgl_aging')<=30 then a.nilai+a.nilai_ppn else 0 end as aging1,
	   case when datediff(day,a.tanggal,'$tgl_aging') between 31 and 60 then a.nilai+a.nilai_ppn else 0 end as aging2,
       case when datediff(day,a.tanggal,'$tgl_aging') between 61 and 90 then a.nilai+a.nilai_ppn else 0 end as aging3,
       case when datediff(day,a.tanggal,'$tgl_aging')>90 then a.nilai+a.nilai_ppn else 0 end as aging4,
	   isnull(c.nilai_kas,0) as nilai_kas,a.nilai+a.nilai_ppn-isnull(c.nilai_kas,0)  as saldo
from hutang_d a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_hutang,a.kode_lokasi,sum(a.nilai) as nilai_kas
	       from hutbayar_d a
		   inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.tanggal<='$tgl_aging'  
		   group by a.no_hutang,a.kode_lokasi
		   )c on a.no_hutang=c.no_hutang and a.kode_lokasi=b.kode_lokasi
$this->filter  order by a.no_hutang";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aging hutang",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='100' rowspan='2'  align='center' class='header_laporan'>No Hutang</td>
	 <td width='100' rowspan='2'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200' rowspan='2'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td colspan='4'  align='center' class='header_laporan'>Aging</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Bayar</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
     </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>0 - 30 HARI</td>
     <td width='90'  align='center' class='header_laporan'>30-60 HARI </td>
     <td width='90'  align='center' class='header_laporan'>60-90 HARI</td>
     <td width='90'  align='center' class='header_laporan'>> 90 HARI</td>
   </tr>  ";
		$tagihan=0;$nilai_kas=0;$aging1=0;$aging2=0;$aging3=0;$aging4=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$aging1=$aging1+$row->aging1;
			$aging2=$aging2+$row->aging2;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$aging3=$aging3+$row->aging3;
			$aging4=$aging4+$row->aging4;
			$saldo=$saldo+$row->saldo;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_hutang','$row->kode_lokasi');\">$row->no_hutang</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>";
     if ($row->saldo!=0)
			{
				echo "<td class='isi_laporan' align='right'>".number_format($row->aging1,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->aging2,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->aging3,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->aging4,0,",",".")."</td>";
			}
			else
			{
				echo "<td class='isi_laporan' align='right'>0</td>
		 <td class='isi_laporan' align='right'>0</td>
		 <td class='isi_laporan' align='right'>0</td>
		 <td class='isi_laporan' align='right'>0</td>";
			}
	 echo "<td class='isi_laporan' align='right'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_hutang','$row->kode_lokasi');\">".number_format($row->nilai_kas,0,",",".")."</a>";
		echo "</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
