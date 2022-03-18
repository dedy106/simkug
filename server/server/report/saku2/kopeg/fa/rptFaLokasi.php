<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_fa_rptFaLokasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql ="select 1 ";
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
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan lokasi asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='50'>Kode</td>
    <td align='center' class='header_laporan' width='250'>Nama Lokasi </td>
    <td  align='center' class='header_laporan' width='100'>Nilai Perolehan </td>
    <td align='center' class='header_laporan' width='100'>Akumulasi Penyusutan </td>
    <td align='center' class='header_laporan' width='100'>Nilai Buku </td>
  </tr>
   	";
		$sql="select kode_klp,nama from fa_lok_klp where kode_lokasi='$kode_lokasi'";
		$rs1 = $dbLib->execute($sql);
		$so_akhir_tot=0; $ap_akhir_tot=0; $buku_tot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		echo "<tr>
    <td align='center' class='header_laporan'>$row1->kode_klp</td>
    <td colspan='4'  class='header_laporan'>$row1->nama</td>
  </tr>";
		$sql = "select a.kode_lokfa,a.nama,
       isnull(b.so_awal,0) as so_awal,isnull(c.debet,0) as debet,isnull(d.kredit,0) as kredit,
       isnull(b.so_awal,0)+isnull(c.debet,0)-isnull(d.kredit,0) as so_akhir,
	   isnull(e.ap,0) as ap_awal,isnull(f.ap,0) as ap_mutasi,isnull(e.ap,0)+isnull(f.ap,0) as ap_akhir
from fa_lok a
left join (select b.kode_lokfa,a.kode_lokasi,sum(a.nilai) as so_awal
           from gl_fa_asset a
		   inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode'
           group by b.kode_lokfa,a.kode_lokasi
          )b on a.kode_lokfa=b.kode_lokfa and a.kode_lokasi=b.kode_lokasi
left join (select b.kode_lokfa,a.kode_lokasi,sum(a.nilai) as debet
           from gl_fa_asset a
		   inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
           group by b.kode_lokfa,a.kode_lokasi
          ) c on a.kode_lokfa=c.kode_lokfa and a.kode_lokasi=c.kode_lokasi
left join (select c.kode_lokfa,a.kode_lokasi,sum(b.nilai) as kredit
		   from gl_fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' 
		   group by c.kode_lokfa,a.kode_lokasi
		   )d on a.kode_lokfa=d.kode_lokfa and a.kode_lokasi=d.kode_lokasi 
left join (select c.kode_lokfa,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from gl_fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and b.periode<'$periode_susut'
           group by c.kode_lokfa,a.kode_lokasi
          ) e on a.kode_lokfa=e.kode_lokfa and a.kode_lokasi=e.kode_lokasi  
left join (select c.kode_lokfa,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from gl_fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and b.periode='$periode_susut'
           group by c.kode_lokfa,a.kode_lokasi
          ) f on a.kode_lokfa=f.kode_lokfa and a.kode_lokasi=f.kode_lokasi 
where a.kode_lokasi='$kode_lokasi' and a.kode_klp='$row1->kode_klp'
order by a.kode_lokfa ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;$ap_awal=0;$buku=0;$ap_mutasi=0;$ap_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_akhir+=$row->so_akhir;
			$ap_akhir+=$row->ap_akhir;
			$buku+=$row->so_akhir-$row->ap_akhir;
			$so_akhir_tot+=$so_akhir;
			$ap_akhir_tot+=$ap_akhir;
			$buku_tot+=$buku;
		    echo "<tr>
				  <td class='isi_laporan' align='center'>$row->kode_lokfa</td>
				  <td class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAsset('$row->kode_lokfa','$kode_lokasi');\">$row->nama</a>";				  
				  echo "</td>
				<td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->ap_akhir,0,",",".")."</td>
				    <td class='isi_laporan' align='right'>".number_format($row->so_akhir-$row->ap_akhir,0,",",".")."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>Total</td>
   			  <td class='header_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($ap_akhir,0,",",".")."</td>
				    <td class='header_laporan' align='right'>".number_format($buku,0,",",".")."</td>
  </tr>";
		}
		echo " <tr>
    <td colspan='2' align='center' class='header_laporan'>&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($so_akhir_tot,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($ap_akhir_tot,0,",",".")."</td>
				    <td class='header_laporan' align='right'>".number_format($buku_tot,0,",",".")."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
