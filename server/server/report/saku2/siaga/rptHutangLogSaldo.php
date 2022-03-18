<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptHutangLogSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kontrak)
from gr_kontrak a
inner join gr_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
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
		$sql="select a.kode_lokasi,a.no_kontrak,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,b.nama as nama_vendor,
	   isnull(c.nilai_tagihan,0) as nilai_tagihan,c.ket_tagihan,
	   isnull(d.nilai_kas,0) as nilai_kas,a.nilai-isnull(d.nilai_kas,0) as saldo,d.ket_kas
from gr_kontrak a
inner join gr_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
left join (select no_kontrak,kode_lokasi,sum(nilai) as nilai_tagihan,
				  dbo.fnGetBuktiHutangLog(no_kontrak) as ket_tagihan
	       from gr_kontrak_d
		   group by no_kontrak,kode_lokasi
		   )c on a.no_kontrak=c.no_kontrak and a.kode_lokasi=c.kode_lokasi
left join (select a.no_kontrak,a.kode_lokasi,sum(a.nilai) as nilai_kas,
				  dbo.fnGetBuktiKasHutangLog(a.no_kontrak) as ket_kas
	       from gr_kontrak_d a
		   inner join gr_beban_m b on a.no_beban=b.no_beban and a.kode_lokasi=b.kode_lokasi
		   where b.no_kas<>'-'
		   group by a.no_kontrak,a.kode_lokasi
		   )d on a.no_kontrak=d.no_kontrak and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_kontrak";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Kontrak</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan Tagihan</td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan KasBank</td>
     </tr>  ";
		$nilai=0;$nilai_tagihan=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_tagihan=$nilai_tagihan+$row->nilai_tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$nilai_lain=$nilai_lain+$row->nilai_lain;
			$saldo=$saldo+$row->saldo;
			
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
			$tmp=explode(";",$row->ket_tagihan);
			$ket_tagihan="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_tagihan.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_kontrak','$row->kode_lokasi');\">$row->no_kontrak</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_tagihan</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
