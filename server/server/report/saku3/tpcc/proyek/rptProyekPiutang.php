<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptProyekPiutang extends server_report_basic
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
		$sql="select a.no_bukti,a.kode_lokasi,a.no_dokumen,a.keterangan,
		a.nilai1,a.nilai2, a.nilai1+a.nilai2 as nilai,a.nilai1 as tagihan,b.nama as nama_cust,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.modul,c.kode_cust,d.kode_cons,e.nama as nama_cons,f.nama as nama_group,g.status
from trans_m a
inner join trans_j c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi 
inner join cust b on c.kode_cust=b.kode_cust and c.kode_lokasi=b.kode_lokasi 
inner join pr_proyek d on a.no_dokumen=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
inner join consumer e on d.kode_cons=e.kode_cons and d.kode_lokasi=e.kode_lokasi 
inner join cust_klp f on b.kode_klpcust=f.kode_klpcust  and b.kode_lokasi=f.kode_lokasi
left join (select a.no_piutang,a.kode_lokasi,a.status 
			from pr_monitor a
			inner join 
				(select a.no_piutang,a.kode_lokasi, max(a.no_bukti) as no_max
				from pr_monitor a
				group by a.no_piutang,a.kode_lokasi
				) b on a.no_bukti=b.no_max and a.kode_lokasi=b.kode_lokasi and a.no_piutang=b.no_piutang
			) g on a.no_bukti=g.no_piutang and a.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_bukti";
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pengakuan piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Piutang</td>
	 <td width='100'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='80'  align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='80'  align='center' class='header_laporan'>Modul</td>
	 <td width='80'  align='center' class='header_laporan'>Status</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='100'  align='center' class='header_laporan'>Customer</td>
	 <td width='80'  align='center' class='header_laporan'>Group</td>
	 <td width='80'  align='center' class='header_laporan'>Consumer</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1=$nilai1+$row->nilai1;
			$nilai2=$nilai2+$row->nilai2;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_bukti','$row->kode_lokasi');\">$row->no_bukti</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->modul</td>
	 <td class='isi_laporan'>$row->status</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->nama_group</td>
	 <td class='isi_laporan'>$row->nama_cons</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai2,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai1,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='11'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai2,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai1,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
