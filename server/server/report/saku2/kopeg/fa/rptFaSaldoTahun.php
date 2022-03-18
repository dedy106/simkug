<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_fa_rptFaSaldoTahun extends server_report_basic
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
		
		$sql = "select a.kode_klpakun,a.nama,g.tahun,
       isnull(b.so_awal,0) as so_awal,
	   isnull(e.ap,0) as ap,isnull(b.so_awal,0)-isnull(e.ap,0) as nilai_buku
from fa_klpakun a
inner join (select a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4) as tahun
			from gl_fa_asset a
			where a.kode_lokasi='$kode_lokasi' 
			group by a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4)
			)g on a.kode_klpakun=g.kode_klpakun and a.kode_lokasi=g.kode_lokasi
left join (select a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4) as tahun,sum(a.nilai) as so_awal
           from gl_fa_asset a
           where a.kode_lokasi='$kode_lokasi'
           group by a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4)
          )b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi and g.tahun=b.tahun
left join (select a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4) as tahun,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from gl_fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode'
           group by a.kode_klpakun,a.kode_lokasi,substring(a.periode,1,4)
          ) e on a.kode_klpakun=e.kode_klpakun and a.kode_lokasi=e.kode_lokasi and g.tahun=e.tahun
$this->filter 
order by a.kode_klpakun,g.tahun ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan saldo asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode</td>
    <td width='250' align='center' class='header_laporan'>Nama Asset</td>
    <td width='50' align='center' class='header_laporan'>Tahun</td>
    <td width='100' align='center' class='header_laporan'>Nilai Perolehan</td>
   <td width='100' align='center' class='header_laporan'>Akum. Susut </td>
    <td width='100' align='center' class='header_laporan'>Nilai Buku</td>
   </tr>
  	";
		$so_awal=0;$nilai_buku=0;$ap=0;
		$first = true;
		$tmp = "";$nama="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->kode_klpakun; 
			$beda1 = $nama!=$row->kode_klpakun; 
			if ($tmp!=$row->kode_klpakun)
			{				
				$first = true;
				
				if ($tmp != "")
				{
					echo "<tr>
						<td colspan='4' align='center' class='header_laporan'>TOTAL $nama</td>
						<td class='header_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
						<td class='header_laporan' align='right'>".number_format($ap,0,",",".")."</td>
						<td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
					  </tr>";										
				}
				$tmp=$row->kode_klpakun;
				$nama=$row->nama;
				$i=1;
				$so_awal=0;$ap=0;$nilai_buku=0;
			}
			$so_awal=$so_awal+$row->so_awal;
			$ap=$ap+$row->ap;
			$nilai_buku=$nilai_buku+$row->nilai_buku;
		    echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				  <td class='isi_laporan'>$row->kode_klpakun</td>
				  <td class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAsset('$row->kode_klpakun','$kode_lokasi','$row->tahun');\">$row->nama</a>";				  
				  echo "</td>
				  <td class='isi_laporan' align='center'>$row->tahun</td>
				  <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->ap,0,",",".")."</td>
				   <td class='isi_laporan' align='right'>".number_format($row->nilai_buku,0,",",".")."</td>
			  </tr>";
			
			$i=$i+1;
		}
		echo " <tr>
						<td colspan='4' align='center' class='header_laporan'>TOTAL $nama</td>
						<td class='header_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
						<td class='header_laporan' align='right'>".number_format($ap,0,",",".")."</td>
						<td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
					  </tr></table></div>";
		return "";
	}
	
}
?>
