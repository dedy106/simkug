<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptTeccAging extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(*)
from gr_tecc_m a
inner join gr_tecc_d b on a.no_tecc=b.no_tecc and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$jenis=$tmp[1];
		$nama_cab=$tmp[2];
		$nama_file="aging_tecc_$periode_$nama_cab.xls";
		$bulan=intval(substr($periode,4,2));
		$tahun=intval(substr($periode,0,4));
		$sql="select DATEADD(day,-1,DATEADD(month,$bulan,DATEADD(year,$tahun-1900,0))) as tgl_aging";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tgl_aging=substr($row->tgl_aging,0,10);
		$sql="select a.kode_lokasi,b.no_invoice,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.nama_cust,b.total as tagihan,
	   case when datediff(day,a.tanggal,'$tgl_aging')<=30 then b.total-isnull(c.nilai_kas,0) else 0 end as aging1,
	   case when datediff(day,a.tanggal,'$tgl_aging') between 31 and 60 then b.total-isnull(c.nilai_kas,0) else 0 end as aging2,
       case when datediff(day,a.tanggal,'$tgl_aging') between 61 and 90 then b.total-isnull(c.nilai_kas,0) else 0 end as aging3,
       case when datediff(day,a.tanggal,'$tgl_aging')>90 then b.total-isnull(c.nilai_kas,0) else 0 end as aging4,
	   isnull(c.nilai_kas,0) as nilai_kas,b.total-isnull(c.nilai_kas,0)  as saldo,
	   dbo.fnGetBuktiKasTecc(b.no_invoice,$periode) as ket_kas
from gr_tecc_m a
inner join gr_tecc_d b on a.no_tecc=b.no_tecc and a.kode_lokasi=b.kode_lokasi
left join (select a.no_invoice,a.kode_lokasi,sum(a.nilai_lain+a.nilai_kas) as nilai_kas
	       from gr_teccbayar_d a
		   inner join (
		   select no_kas,kode_lokasi from kas_m 
		   union 
		   select no_ju as no_kas,kode_lokasi from ju_m 
		   ) b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.periode<='$periode'
		   group by a.no_invoice,a.kode_lokasi
		   )c on b.no_invoice=c.no_invoice and b.kode_lokasi=b.kode_lokasi
$this->filter order by b.no_invoice";
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aging piutang tecc - cabang $nama_cab",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='100' rowspan='2'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200' rowspan='2'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td colspan='4'  align='center' class='header_laporan'>Aging</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Bayar</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
	 <td width='120' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
     </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>0 - 30 HARI</td>
     <td width='90'  align='center' class='header_laporan'>30-60 HARI </td>
     <td width='90'  align='center' class='header_laporan'>60-90 HARI</td>
     <td width='90'  align='center' class='header_laporan'>> 90 HARI</td>
   </tr>  ";
		$tagihan=0;$nilai_kas=0;$agingg1=0;$agingg2=0;$agingg3=0;$agingg4=0;$saldo1=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$agingg1=$agingg1+$row->aging1;
			$agingg2=$agingg2+$row->aging2;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$agingg3=$agingg3+$row->aging3;
			$agingg4=$agingg4+$row->aging4;
			$saldo1=$saldo1+$row->saldo;
			if ($row->saldo==0)
			{
				$aging1=0;$aging2=0;$aging3=0;$aging4=0;$saldo=0;
			}
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_invoice','$row->kode_lokasi');\">$row->no_invoice</a>";
		echo "</td>
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
	 echo "<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan' >$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='4'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($agingg1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($agingg2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($agingg3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($agingg4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo1,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
