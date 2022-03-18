<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fa_rptFaSaldoBln extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql ="select 1 ";
		error_log($sql);
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
		$periode_susut=$tmp[2];
		$kode_pp=$tmp[3];
		$filterpp=$tmp[4];

		$sql = "select a.kode_klpakun,a.nama,
       isnull(b.so_awal,0)-isnull(dd.kredit,0) as so_awal,
	   isnull(c.debet,0) as debet,
	   isnull(d.kredit,0) as kredit,
       isnull(b.so_awal,0)-isnull(dd.kredit,0)+isnull(c.debet,0)-isnull(d.kredit,0) as so_akhir,
	   isnull(e.ap,0)-isnull(ee.ap_wo,0) as ap_awal,
	   isnull(f.ap,0)-isnull(ff.ap_wo,0) as ap_mutasi,
	   isnull(e.ap,0)+isnull(f.ap,0)-isnull(ee.ap_wo,0)-isnull(ff.ap_wo,0) as ap_akhir
from fa_klpakun a

left join (select a.kode_klpakun,a.kode_lokasi,sum(b.nilai) as so_awal
           from fa_asset a inner join fa_nilai b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
           group by a.kode_klpakun,a.kode_lokasi
          )b on a.kode_klpakun=b.kode_klpakun  and a.kode_lokasi=b.kode_lokasi

left join (select a.kode_klpakun,a.kode_lokasi,sum(b.nilai) as debet
           from fa_asset a inner join fa_nilai b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
           group by a.kode_klpakun,a.kode_lokasi
          ) c on a.kode_klpakun=c.kode_klpakun and a.kode_lokasi=c.kode_lokasi

left join (select a.kode_klpakun,a.kode_lokasi,sum(b.nilai) as kredit
		   from fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode<'$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
		   group by a.kode_klpakun,a.kode_lokasi
		   )dd on a.kode_klpakun=dd.kode_klpakun and a.kode_lokasi=dd.kode_lokasi
		   
left join (select a.kode_klpakun,a.kode_lokasi,sum(b.nilai) as kredit
		   from fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
		   group by a.kode_klpakun,a.kode_lokasi
		   )d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi
		   
left join (select a.kode_klpakun,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and b.periode<'$periode_susut' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
           group by a.kode_klpakun,a.kode_lokasi
          ) e on a.kode_klpakun=e.kode_klpakun and a.kode_lokasi=e.kode_lokasi
		  
left join (select a.kode_klpakun,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and b.periode='$periode_susut' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
           group by a.kode_klpakun,a.kode_lokasi
          ) f on a.kode_klpakun=f.kode_klpakun and a.kode_lokasi=f.kode_lokasi

left join (select a.kode_klpakun,a.kode_lokasi,sum(case when bb.dc='D' then bb.nilai else -bb.nilai end) as ap_wo
		   from fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fasusut_d bb on b.no_fa=bb.no_fa and b.kode_lokasi=bb.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode<'$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
		   group by a.kode_klpakun,a.kode_lokasi
		   )ee on a.kode_klpakun=ee.kode_klpakun and a.kode_lokasi=ee.kode_lokasi
		   
left join (select a.kode_klpakun,a.kode_lokasi,sum(case when bb.dc='D' then bb.nilai else -bb.nilai end) as ap_wo
		   from fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fasusut_d bb on b.no_fa=bb.no_fa and b.kode_lokasi=bb.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and a.progress not in ('K','P') and a.jenis<>'I' $filterpp
		   group by a.kode_klpakun,a.kode_lokasi
		   )ff on a.kode_klpakun=ff.kode_klpakun and a.kode_lokasi=ff.kode_lokasi	
$this->filter  
order by a.kode_klpakun ";
// echo $sql;
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan saldo asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='4' align='center' class='header_laporan'>No</td>
    <td rowspan='4' align='center' class='header_laporan'>Kode</td>
    <td rowspan='4' align='center' class='header_laporan'>Nama Asset </td>
    <td colspan='4' align='center' class='header_laporan'>Nilai Perolehan </td>
    <td colspan='3' rowspan='3' align='center' class='header_laporan'>Akumulasi Penyusutan </td>
    <td rowspan='4' align='center' class='header_laporan'>Nilai Buku </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='3' align='center' class='header_laporan'>Saldo Awal </td>
    <td colspan='2' align='center' class='header_laporan'>Transaksi</td>
    <td rowspan='3' align='center' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='2' align='center' class='header_laporan'>Penambahan</td>
    <td rowspan='2' align='center' class='header_laporan'>Write Off</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>Saldo Awal </td>
    <td align='center' class='header_laporan'>Mutasi</td>
    <td align='center' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>1</td>
    <td width='60' align='center' class='header_laporan'>2</td>
    <td width='200' align='center' class='header_laporan'>3</td>
    <td width='90' align='center' class='header_laporan'>4</td>
    <td width='90' align='center' class='header_laporan'>5</td>
    <td width='90' align='center' class='header_laporan'>6</td>
    <td width='90' align='center' class='header_laporan'>7=4+5-6</td>
    <td width='90' align='center' class='header_laporan'>8</td>
    <td width='90' align='center' class='header_laporan'>9</td>
    <td width='90' align='center' class='header_laporan'>10=8+9</td>
    <td width='90' align='center' class='header_laporan'>11=7-10</td>
  </tr>
  	";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;$ap_awal=0;$buku=0;$ap_mutasi=0;$ap_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=$so_awal+$row->so_awal;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir=$so_akhir+$row->so_akhir;
			$ap_awal=$ap_awal+$row->ap_awal;
			$ap_mutasi=$ap_mutasi+$row->ap_mutasi;
			$ap_akhir=$ap_akhir+$row->ap_akhir;
			$buku=$buku+$row->so_akhir-$row->ap_akhir;
		    echo "<tr>
				<td class='isi_laporan'>$i</td>
				  <td class='isi_laporan'>$row->kode_klpakun</td>
				  <td class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAsset('$row->kode_klpakun','$kode_lokasi','$periode','$kode_pp');\">$row->nama</a>";				  
				  echo "</td>
				  <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->ap_awal,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->ap_mutasi,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->ap_akhir,0,",",".")."</td>
				    <td class='isi_laporan' align='right'>".number_format($row->so_akhir-$row->ap_akhir,0,",",".")."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo " <tr>
    <td colspan='3' align='center' class='header_laporan'>Total</td>
    <td class='header_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($debet,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($ap_awal,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($ap_mutasi,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($ap_akhir,0,",",".")."</td>
				    <td class='header_laporan' align='right'>".number_format($buku,0,",",".")."</td>
  </tr></table></div>";
		return "";
	}
	
}
?>
