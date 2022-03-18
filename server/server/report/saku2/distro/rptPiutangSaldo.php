<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_distro_rptPiutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_do)
from ds_do_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
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
		$nama_cab=$tmp[1];
		$sql="select a.kode_lokasi,a.no_do,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.total,b.nama as nama_cust,
	   isnull(c.nilai_lain,0) as nilai_lain,isnull(c.nilai_kas,0) as nilai_kas,
	   a.total-isnull(c.nilai_lain,0)-isnull(c.nilai_kas,0) as saldo,c.ket_kas
from ds_do_m a
inner join ds_po_m d on a.no_po=d.no_po and a.kode_lokasi=d.kode_lokasi
inner join cust b on d.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi 
left join (select a.no_do,a.kode_lokasi,sum(a.nilai_lain) as nilai_lain,sum(a.nilai_kas) as nilai_kas,
				  dbo.fnGetBuktiKas(no_do) as ket_kas
		   from ds_dobayar_d a
		   group by a.no_do,a.kode_lokasi
		  )c on a.no_do=c.no_do and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_do";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No DO</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td  width='90' rowspan='2'  align='center' class='header_laporan'>Tagihan</td>
     <td colspan='2'  align='center' class='header_laporan'>Pembayaran</td>
	  <td  width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
	 <td width='120' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
	
   </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90'  align='center' class='header_laporan'>Bayar Kas</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Lain</td>
	  </tr>  ";
		$total=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$total+$row->total;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$nilai_lain=$nilai_lain+$row->nilai_lain;
			$saldo=$saldo+$row->saldo;
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_do','$row->kode_lokasi');\">$row->no_do</a>";
		echo "</td>
	<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_lain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_lain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
