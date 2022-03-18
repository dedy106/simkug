<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptRBAblj extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		
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
		$tahun=$tmp[1];
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan RBA Belanja",$this->lokasi,$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
    <tr bgcolor='#CCCCCC'>
        <td width='30'  align='center' class='header_laporan' rowspan='2' >No</td>
        <td width='200'  align='center' class='header_laporan' rowspan='2'>Kegiatan</td>
        <td width='200'  align='center' class='header_laporan' rowspan='2'>Output</td>
		<td width='150'  align='center' class='header_laporan' rowspan='2'>Unit</td>
        <td width='200'  align='center' class='header_laporan' colspan='5'>Alokasi</td>
    </tr>
    <tr bgcolor='#CCCCCC'>
        <td width='100'  align='center' class='header_laporan'>Belanja Pegawai</td>
        <td width='100'  align='center' class='header_laporan'>Belanja Barang</td>
        <td width='100'  align='center' class='header_laporan'>Belanja Modal</td>
        <td width='100'  align='center' class='header_laporan'>Belanja Sosial</td>
        <td width='100'  align='center' class='header_laporan'>Pengeluaran Pembiayaan</td>
    </tr> 
";
		$sql="select a.kdgiat,a.kdoutput,a.kode_pp,b.nmgiat,c.nmoutput,isnull(e.n51,0) as n51,isnull(f.n52,0) as n52,
	  isnull(g.n53,0) as n53,isnull(h.n57,0) as n57,d.nama as nama_pp
from (select b.kdgiat,b.kdoutput,a.kode_pp,a.kode_lokasi
from uin_usul_m a
inner join uin_usul_d b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
group by b.kdgiat,b.kdoutput,a.kode_pp,a.kode_lokasi
	)a
inner join uin_giat b on a.kdgiat=b.kdgiat
inner join uin_output c on a.kdgiat=c.kdgiat and a.kdoutput=c.kdoutput
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp,sum(a.total) as n51
			from uin_usul_d a
			inner join uin_akun b on a.kode_akun=b.kdakun
			inner join uin_usul_m c on a.no_usul=c.no_usul and a.kode_lokasi=c.kode_lokasi
			where a.tahun='2019' and b.kdgbkpk='51'
			group by a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp
		 )e on a.kode_lokasi=e.kode_lokasi and a.kdgiat=e.kdgiat and a.kdoutput=e.kdoutput and a.kode_pp=e.kode_pp
left join (select a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp,sum(a.total) as n52
			from uin_usul_d a
			inner join uin_akun b on a.kode_akun=b.kdakun
			inner join uin_usul_m c on a.no_usul=c.no_usul and a.kode_lokasi=c.kode_lokasi
			where a.tahun='2019' and b.kdgbkpk='52'
			group by a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp
		 )f on a.kode_lokasi=f.kode_lokasi and a.kdgiat=f.kdgiat and a.kdoutput=f.kdoutput and a.kode_pp=f.kode_pp
left join (select a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp,sum(a.total) as n53
			from uin_usul_d a
			inner join uin_akun b on a.kode_akun=b.kdakun
			inner join uin_usul_m c on a.no_usul=c.no_usul and a.kode_lokasi=c.kode_lokasi
			where a.tahun='2019' and b.kdgbkpk='53'
			group by a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp
		 )g on a.kode_lokasi=g.kode_lokasi and a.kdgiat=g.kdgiat and a.kdoutput=g.kdoutput and a.kode_pp=g.kode_pp
left join (select a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp,sum(a.total) as n57
			from uin_usul_d a
			inner join uin_akun b on a.kode_akun=b.kdakun
			inner join uin_usul_m c on a.no_usul=c.no_usul and a.kode_lokasi=c.kode_lokasi
			where a.tahun='2019' and b.kdgbkpk='57'
			group by a.kode_lokasi,a.kdgiat,a.kdoutput,c.kode_pp
		 )h on a.kode_lokasi=h.kode_lokasi and a.kdgiat=h.kdgiat and a.kdoutput=h.kdoutput and a.kode_pp=h.kode_pp
 ";
		$rs = $dbLib->execute($sql);
		$i=1;
		$n51=0;$n52=0;$n53=0;$n57=0;$tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n51+=$row->n51;
			$n52+=$row->n52;
			$n53+=$row->n53;
			$n57+=$row->n57;
			$tot+=$row->n51+$row->n52+$row->n53+$row->n57;
			echo " <tr>
     <td  class='isi_laporan'>$i</td>
	 <td  class='isi_laporan'>$row->kdgiat - $row->nmgiat</td>
     <td class='isi_laporan'>$row->kdoutput - $row->nmoutput</td>
	 <td class='isi_laporan'>$row->kode_pp - $row->nama_pp</td>
	 <td  align='right' class='isi_laporan'>".number_format($row->n51,0,",",".")."</td>
	 <td  align='right' class='isi_laporan'>".number_format($row->n52,0,",",".")."</td>
	 <td  align='right' class='isi_laporan'>".number_format($row->n53,0,",",".")."</td>
     <td   align='right' class='isi_laporan'>".number_format($row->n57,0,",",".")."</td>
     <td   align='right' class='isi_laporan'>".number_format($row->n51+$row->n52+$row->n53+$row->n57,0,",",".")."</td>
	 </tr> ";
			$i=$i+1;
		}
		echo " <tr>
			<td  class='header_laporan' colspan='4' align='center'>JUMLAH</td>
			<td  align='right' class='header_laporan'>".number_format($n51,0,",",".")."</td>
			<td  align='right' class='header_laporan'>".number_format($n52,0,",",".")."</td>
			<td  align='right' class='header_laporan'>".number_format($n53,0,",",".")."</td>
			<td   align='right' class='header_laporan'>".number_format($n57,0,",",".")."</td>
			<td   align='right' class='header_laporan'>".number_format($tot,0,",",".")."</td>
		</tr> ";
		return "";
	}
	
}

?>
