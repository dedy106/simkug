<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptPdpt extends server_report_basic
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
		
		$sql="select a.no_load,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama as nama_kantin,c.nama as nama_kasir,
	   isnull(d.dbm,0) as dbm,isnull(d.link2,0) as link2,isnull(d.tunai,0) as tunai,isnull(d.ccn,0) as ccn,isnull(d.vfeb,0) as vfeb,
	   isnull(d.vfik,0) as vfik,isnull(d.vfit,0) as vfit,isnull(d.vfit,0) as vfit,isnull(d.vfkb,0) as vfkb,isnull(d.vlain,0) as vlain,
	   isnull(d.vsidang,0) as vsidang,isnull(d.vunit,0) as vunit,isnull(d.total,0) as total
from kantin_load a
inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi
inner join ktu_user c on a.nik_kasir=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select a.no_load,a.kode_lokasi,
			   sum(case when a.kode_bayar='DBM' then a.nilai else 0 end) as dbm,
			   sum(case when a.kode_bayar='LINK' then a.nilai else 0 end) as link2,
			   sum(case when a.kode_bayar='TUNAI' then a.nilai else 0 end) as tunai,
			   sum(case when a.kode_bayar='CCN' then a.nilai else 0 end) as ccn,
			   sum(case when a.kode_bayar='VFEB' then a.nilai else 0 end) as vfeb,
			   sum(case when a.kode_bayar='VFIK' then a.nilai else 0 end) as vfik,
			   sum(case when a.kode_bayar='VFIT' then a.nilai else 0 end) as vfit,
			   sum(case when a.kode_bayar='VFKB' then a.nilai else 0 end) as vfkb,
			   sum(case when a.kode_bayar='VLAIN' then a.nilai else 0 end) as vlain,
			   sum(case when a.kode_bayar='VSIDANG' then a.nilai else 0 end) as vsidang,
			   sum(case when a.kode_bayar='VUNIT' then a.nilai else 0 end) as vunit,
			   sum(a.nilai) as total
		from kantin_bayar a
		where a.kode_lokasi='$kode_lokasi'
		group by a.no_load,a.kode_lokasi
		)d on a.no_load=d.no_load and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_load
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pendapatan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Kantin</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Kasir</td>
	 <td width='90'  align='center' class='header_laporan'>DBM</td>
	 <td width='90'  align='center' class='header_laporan'>LINK</td>
	 <td width='90'  align='center' class='header_laporan'>TUNAI</td>
	 <td width='90'  align='center' class='header_laporan'>CCN</td>
	 <td width='90'  align='center' class='header_laporan'>VFEB</td>
	 <td width='90'  align='center' class='header_laporan'>VFIK</td>
	 <td width='90'  align='center' class='header_laporan'>VFIT</td>
	 <td width='90'  align='center' class='header_laporan'>VFKB</td>
	 <td width='90'  align='center' class='header_laporan'>VLAIN</td>
	 <td width='90'  align='center' class='header_laporan'>VSIDANG</td>
	 <td width='90'  align='center' class='header_laporan'>VUNIT</td>
	 <td width='90'  align='center' class='header_laporan'>TOTAL</td>
	  </tr>  ";
	    $i=1; $dbm=0; $link2=0; $tunai=0; $ccn=0; $vfeb=0; $vfik=0; $vfit=0; $vfkb=0; $vlain=0; $vsidang=0; $vunit=0; $total=0; $tnilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$dbm+=$row->dbm;
			$link2+=$row->link2;
			$tunai+=$row->tunai;
			$ccn+=$row->ccn;
			$vfeb+=$row->vfeb;
			$vfik+=$row->vfik;
			$vfit+=$row->vfit;
			$vfkb+=$row->vfkb;
			$vlain+=$row->vlain;
			$vsidang+=$row->vsidang;
			$vunit+=$row->vunit;
			$total+=$row->total;
			echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row->nama_kantin</td>
			<td class='isi_laporan'>$row->no_load</td>	 
			 <td class='isi_laporan'>$row->tgl</td>
			 <td class='isi_laporan'>$row->nama_kasir</td>
			<td class='isi_laporan' align='right'>".number_format($row->dbm,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->link2,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->tunai,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ccn,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vfeb,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vfik,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vfit,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vfkb,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vlain,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vsidang,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->vunit,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
	
		}
		echo "<tr>
			<td class='header_laporan' colspan='5' align='right'>TOTAL</td>
			<td class='header_laporan' align='right'>".number_format($dbm,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($link2,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($tunai,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($ccn,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vfeb,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vfik,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vfit,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vfkb,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vlain,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vsidang,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($vunit,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
		  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
