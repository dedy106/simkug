<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_hutang_rptPbPosisi extends server_report_basic
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
		
		$sql="select a.no_pb,a.kode_lokasi,a.tanggal,a.keterangan,a.nilai,a.tanggal,a.kode_pp,c.nama as nama_pp,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   a.no_app,a.no_spb,a.no_ver,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,date_format(g.tanggal,'%d/%m/%Y') as tgl_spb,i.no_app as no_fiat,
	   date_format(i.tanggal,'%d/%m/%Y') as tgl_fiat,j.no_kas,date_format(j.tanggal,'%d/%m/%Y') as tgl_kas,a.no_hutang
from yk_pb_m a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join app_d e on a.no_pb=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='PB_APP'
left join app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
left join spb_m g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
left join app_d h on g.no_spb=h.no_bukti and g.kode_lokasi=h.kode_lokasi
left join app_m i on h.no_app=i.no_app and h.kode_lokasi=i.kode_lokasi
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi
$this->filter
union
select a.no_pb,a.kode_lokasi,a.tanggal,a.keterangan,a.nilai,a.tanggal,a.kode_pp,c.nama as nama_pp,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   a.no_app,a.no_spb,a.no_ver,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,date_format(g.tanggal,'%d/%m/%Y') as tgl_spb,i.no_app as no_fiat,
	   date_format(i.tanggal,'%d/%m/%Y') as tgl_fiat,j.no_kas,date_format(j.tanggal,'%d/%m/%Y') as tgl_kas,a.no_hutang
from yk_pb_m a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join app_d e on a.no_pb=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='PB_APP'
left join app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
left join spb_m g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
left join app_d h on g.no_spb=h.no_bukti and g.kode_lokasi=h.kode_lokasi
left join app_m i on h.no_app=i.no_app and h.kode_lokasi=i.kode_lokasi
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi
$this->filter order by a.no_pb";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi permohonan pembayaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No PB</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No Hutang</td>
	  <td width='90'  align='center' class='header_laporan'>No App</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	  <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	
     </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_hutang</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	  <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='9'>&nbsp;</td>
	
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
