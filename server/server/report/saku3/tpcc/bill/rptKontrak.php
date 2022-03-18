<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_bill_rptKontrak extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_kontrak,a.kode_lokasi,a.no_dok,convert(varchar,tgl_awal,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir,a.keterangan,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as kontrak,b.nama as nama_cust,b.divisi,
		isnull(c.nilai,0) as tagihan,(a.nilai+a.nilai_ppn)-isnull(c.nilai,0) as saldo
from kontrak_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
left join (select a.no_kontrak,a.kode_lokasi,sum(a.nilai+a.nilai_ppn) as nilai 
		from bill_m a
		where a.kode_lokasi='08'
		group by a.no_kontrak,a.kode_lokasi 
		  )c on a.no_kontrak=c.no_kontrak and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_kontrak";


		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kontrak",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Awal</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Akhir</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
     <td width='200'  align='center' class='header_laporan'>Divisi</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Kontrak</td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total Kontrak</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Billing</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Kontrak</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$kontrak=0;$tagihan=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$kontrak+=$row->kontrak;
			$tagihan+=$row->tagihan;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKontrak('$row->no_kontrak','$row->kode_lokasi');\">$row->no_kontrak</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan'>$row->tgl_awal</td>
	 <td class='isi_laporan'>$row->tgl_akhir</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->divisi</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kontrak,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($kontrak,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
