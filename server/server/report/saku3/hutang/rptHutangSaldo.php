<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_hutang_rptHutangSaldo extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		
		$sql="select a.kode_lokasi,a.no_hutang,a.kode_vendor,k.no_dokumen,k.tanggal,l.nama as nama_vendor,k.keterangan,date_format(k.tanggal,'%d/%m/%Y') as tgl,
	   isnull(b.hutang_sd,0)-isnull(c.rekon_sd,0)-isnull(d.kasres_sd,0)-isnull(e.rekon_tak_sd,0) as saldo_awal,
	   isnull(j.hutang,0) as hutang,isnull(g.rekon,0) as rekon,isnull(h.kasres,0) as kasres,isnull(i.rekon_tak,0) as rekon_tak,
	   isnull(b.hutang_sd,0)-isnull(c.rekon_sd,0)-isnull(d.kasres_sd,0)-isnull(e.rekon_tak_sd,0)+isnull(j.hutang,0)-isnull(g.rekon,0)-isnull(h.kasres,0)-isnull(i.rekon_tak,0) as so_akhir
from (select no_hutang,kode_lokasi,kode_vendor 
from yk_hutang_d 
where periode<='$periode' and kode_lokasi='$kode_lokasi'
group by no_hutang,kode_lokasi,kode_vendor
	) a
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as hutang_sd
		from yk_hutang_d a 
		where a.kode_lokasi='$kode_lokasi' and a.periode <'$periode' 
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
		)b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi and a.kode_vendor=b.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as rekon_sd
		from yk_hutang_d a 
		inner join yk_rekon_m c on a.no_rekon=c.no_rekon
		where a.kode_lokasi='$kode_lokasi' and c.periode <'$periode' and a.no_rekon<>'-' 
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
			)c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi and a.kode_vendor=c.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as kasres_sd
		from yk_hutang_d a 
		inner join kas_m c on a.no_kas=c.no_kas
		where a.kode_lokasi='$kode_lokasi' and c.periode <'$periode' and a.no_rekon='-' and a.no_hutang='04-PH1407.001'
		group by a.no_hutang,a.kode_lokasi ,a.kode_vendor
			)d on a.no_hutang=d.no_hutang and a.kode_lokasi=d.kode_lokasi and a.kode_vendor=d.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as rekon_tak_sd
		from yk_hutang_d a 
		where a.kode_lokasi='$kode_lokasi' and a.periode <'$periode' and (a.no_rekon=a.no_hutang or a.no_kas=a.no_hutang)
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
				)e on a.no_hutang=e.no_hutang and a.kode_lokasi=e.kode_lokasi and a.kode_vendor=e.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as rekon
		from yk_hutang_d a 
		inner join yk_rekon_m c on a.no_rekon=c.no_rekon
		where a.kode_lokasi='$kode_lokasi' and c.periode='$periode' and a.no_rekon<>'-'
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
			)g on a.no_hutang=g.no_hutang and a.kode_lokasi=g.kode_lokasi and a.kode_vendor=g.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as kasres
		from yk_hutang_d a 
		inner join kas_m c on a.no_kas=c.no_kas
		where a.kode_lokasi='$kode_lokasi' and c.periode ='$periode' and a.no_rekon='-'
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor 
			)h on a.no_hutang=h.no_hutang and a.kode_lokasi=h.kode_lokasi and a.kode_vendor=h.kode_vendor
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as rekon_tak
		from yk_hutang_d a 
		where a.kode_lokasi='$kode_lokasi' and a.periode <'$periode' and (a.no_rekon=a.no_hutang or a.no_kas=a.no_hutang)
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
				)i on a.no_hutang=i.no_hutang and a.kode_lokasi=i.kode_lokasi
left join (select a.no_hutang,a.kode_lokasi,a.kode_vendor,SUM(a.nilai_bp+a.nilai_cc) as hutang
		from yk_hutang_d a 
		where a.kode_lokasi='$kode_lokasi' and a.periode ='$periode'
		group by a.no_hutang,a.kode_lokasi,a.kode_vendor
			)j on a.no_hutang=j.no_hutang and a.kode_lokasi=j.kode_lokasi and a.kode_vendor=j.kode_vendor
inner join yk_hutang_m k on a.no_hutang=k.no_hutang and a.kode_lokasi=k.kode_lokasi
inner join vendor l on a.kode_vendor=l.kode_vendor and a.kode_lokasi=l.kode_lokasi
$this->filter and (so_awal<>0) order by a.no_hutang";
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Hutang</td>
	 <td width='120'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Vendor</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Awal</td>
	 <td width='90'  align='center' class='header_laporan'>Hutang</td>
	 <td width='90'  align='center' class='header_laporan'>Rekon</td>
	 <td width='90'  align='center' class='header_laporan'>Restitusi</td>
	 <td width='90'  align='center' class='header_laporan'>TAK</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Akhir</td>
     </tr>  ";
		$saldo_awal=0;$rekon=0;$kasres=0;$rekon_tak=0;$saldo_akhir=0;$hutang=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$saldo_awal+=$row->saldo_awal;
			$hutang+=$row->hutang;
			$rekon+=$row->rekon;
			$kasres+=$row->kasres;
			$rekon_tak+=$row->rekon_tak;
			$saldo_akhir+=$row->saldo_akhir;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_hutang','$row->kode_lokasi');\">$row->no_hutang</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan' align='right'>".number_format($row->saldo_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->hutang,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rekon,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kasres,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rekon_tak,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo_akhir,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($saldo_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($hutang,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($rekon,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($kasres,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($rekon_tak,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo_akhir,0,",",".")."</td>
     </tr>
	 ";
		
		echo "</table>";
		echo "</td>
  </tr>
 
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
