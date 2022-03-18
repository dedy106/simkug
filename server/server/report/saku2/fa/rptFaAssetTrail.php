<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_fa_rptFaAssetTrail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_klpakun=$tmp[3];
		
		$sql = "select 1";
		//error_log($sql);
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
		/*
		$sql = "select a.kode_klpakun,b.nama as nama_klpakun,a.kode_pp,c.nama as nama_pp,a.tgl_perolehan,a.no_fa,a.nama,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl,
       a.umur,a.persen,a.nilai,a.no_seri,a.merk,a.tipe,
       isnull(d.akumulasi_sd,0) as akumulasi_sd,isnull(e.akumulasi_bln,0) as akumulasi_bln,
	   isnull(d.akumulasi_sd,0)+isnull(e.akumulasi_bln,0) as akumulasi_total,
       a.nilai-isnull(d.akumulasi_sd,0)-isnull(e.akumulasi_bln,0) as nilai_buku
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select no_fa,kode_lokasi,sum(nilai) as akumulasi_sd
           from fasusut_d
	   where kode_lokasi='$kode_lokasi' and periode<'$periode'
           group by no_fa,kode_lokasi
           )d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi
left join (select no_fa,kode_lokasi,sum(nilai) as akumulasi_bln
           from fasusut_d
	   where kode_lokasi='$kode_lokasi' and periode='$periode'
           group by no_fa,kode_lokasi
           )e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi $this->filter
order by a.tgl_perolehan ";
			*/
		$sql = "select a.kode_klpakun,a.kode_lokasi,b.nama as nama_klpakun,a.kode_pp,c.nama as nama_pp,a.no_fa,a.nama,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl,
       a.umur,a.persen,a.nilai,a.no_seri,a.merk,a.tipe,h.nama as lokasi_fa,
      isnull(d.akumulasi_sd,0)-isnull(f.wo_ap_sd,0) as akumulasi_sd,isnull(e.akumulasi_bln,0)-isnull(g.wo_ap,0) as akumulasi_bln,
				   isnull(d.akumulasi_sd,0)+isnull(e.akumulasi_bln,0)-isnull(g.wo_ap,0)-isnull(f.wo_ap_sd,0) as akumulasi_total,isnull(f.wo_sd,0)+isnull(g.wo,0) as wo,
					case when isnull(g.wo,0)+isnull(f.wo_sd,0)=0 then a.nilai-isnull(d.akumulasi_sd,0)-isnull(e.akumulasi_bln,0) else 0 end as nilai_buku
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join  fa_lokasi h on a.kode_lokfa=h.kode_lokfa and a.kode_lokasi=h.kode_lokasi
left join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as akumulasi_sd
           from fasusut_d
	   where kode_lokasi='$kode_lokasi' and periode<'$periode'
           group by no_fa,kode_lokasi
           )d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi
left join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as akumulasi_bln
           from fasusut_d
	   where kode_lokasi='$kode_lokasi' and periode='$periode'
           group by no_fa,kode_lokasi
           )e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi
left join (select no_fa,kode_lokasi,sum(nilai) as wo_sd,sum(nilai_ap) as wo_ap_sd
					   from fawoapp_d
					   where kode_lokasi='$kode_lokasi' and periode<'$periode'
					   group by no_fa,kode_lokasi
					   )f on a.no_fa=f.no_fa and a.kode_lokasi=f.kode_lokasi
			left join (select no_fa,kode_lokasi,sum(nilai) as wo,sum(nilai_ap) as wo_ap
					   from fawoapp_d
					   where kode_lokasi='$kode_lokasi' and periode='$periode' 
					   group by no_fa,kode_lokasi
					   )g on a.no_fa=g.no_fa and a.kode_lokasi=g.kode_lokasi    
		 $this->filter
order by a.kode_akun,a.tgl_perolehan ";

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar aktiva operasional dan beban penyusutan asset",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>No Asset </td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Klp Asset </td>
				<td width='150' rowspan='2' align='center' class='header_laporan'>Nama Klp Asset </td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP </td>
				<td width='150' rowspan='2' align='center' class='header_laporan'>Nama PP </td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>No Seri</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Merk</td>
				<td width='150' rowspan='2' align='center' class='header_laporan'>Tipe</td>
				<td colspan='2' align='center' class='header_laporan'>Umur</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Perolehan </td>
				<td colspan='3' align='center' class='header_laporan'>Nilai Depresiasi </td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Buku </td>				
				</tr>
				<tr bgcolor='#CCCCCC'>
				  <td width='40' align='center' class='header_laporan'>Bulan</td>
				  <td width='40' align='center' class='header_laporan'>%</td>
				  <td width='100' align='center' class='header_laporan'>S/D Bulan Lalu </td>
				  <td width='100' align='center' class='header_laporan'>Bulan Ini </td>
				  <td width='100' align='center' class='header_laporan'>S/D Bulan Ini </td>
  </tr>";
		$nilai = 0; $nilai_buku = 0; $nilai_akm_sd = 0; $nilai_akm_bln = 0; $nilai_akm_total = 0;
		$nilai2= 0 ; $nilai_buku2 = 0 ; $nilai_akm_sd2 = 0; $nilai_akm_bln2 = 0;$nilai_akm_total2 = 0;
		$first = true;
		$ix=1;
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->kode_klpakun; 
			if ($tmp!=$row->kode_klpakun)
			{				
				$first = true;
				
				if ($tmp != "")
				{
					echo "<tr bgcolor='#eeeeee'>
								  <td colspan='13' align='right' class='header_laporan'>Sub Total</td>
								  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>								  
				  </tr>";										
				}
				$tmp=$row->kode_klpakun;
				$i=1;
				$nilai=0;$nilai_buku=0;$nilai_akm_sd=0;$nilai_akm_bln=0;$nilai_akm_total=0;
			}
		    $nilai += $row->nilai;
			$nilai_akm_sd += $row->akumulasi_sd;
			$nilai_akm_bln += $row->akumulasi_bln;
			$nilai_akm_total += $row->akumulasi_total;
			$nilai_buku += $row->nilai-$row->akumulasi_total;
			
			$nilai2 += $row->nilai;
			$nilai_akm_sd2 += $row->akumulasi_sd;
			$nilai_akm_bln2 += $row->akumulasi_bln;
			$nilai_akm_total2 += $row->akumulasi_total;
			$nilai_buku2 += $row->nilai-$row->akumulasi_total;
			
			echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				  <td  class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbAsset('$row->no_fa','$kode_lokasi','$periode');\">$row->no_fa</a>";				  
			echo "</td>
				  <td  class='isi_laporan' align='center'>$row->kode_klpakun</td>
				  <td  class='isi_laporan'>$row->nama_klpakun</td>
				  <td  class='isi_laporan'>$row->kode_pp</td>
				  <td  class='isi_laporan'>$row->nama_pp</td>
				  <td  class='isi_laporan'>$row->tgl</td>
				  <td  class='isi_laporan'>$row->nama</td>
				  <td  class='isi_laporan'>$row->no_seri</td>
				  <td  class='isi_laporan'>$row->merk</td>
				  <td  class='isi_laporan'>$row->tipe</td>
				  <td  class='isi_laporan' align='center'>$row->umur</td>
				  <td  class='isi_laporan' align='center'>$row->persen</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_sd,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_total,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai_buku,0,",",".")."</td>
  </tr>";
			
			$i++;
			$ix++;
		}
		/*$nilai=$nilai+$row->nilai;
		$nilai_akm_sd=$nilai_akm_sd+$row->akumulasi_sd;
		$nilai_akm_bln=$nilai_akm_bln+$row->akumulasi_bln;
		$nilai_akm_total=$nilai_akm_total+$row->akumulasi_total;
		$nilai_buku=$nilai_buku+$row->nilai_buku;
		*/
		echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='13' align='right' class='header_laporan'>Sub Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
		</tr>";
		  $sql = "select count(a.no_fa)
		from fa_asset a
		inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter";
		//error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			
			if ($ix-1 == $count)		
				echo "<tr bgcolor='#CCCCCC'>
					  <td colspan='13' align='right' class='header_laporan'>Total</td>
					  <td class='header_laporan' align='right'>".number_format($nilai2,0,",",".")."</td>
					  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd2,0,",",".")."</td>
					  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln2,0,",",".")."</td>
					  <td class='header_laporan' align='right'>".number_format($nilai_akm_total2,0,",",".")."</td>
					  <td class='header_laporan' align='right'>".number_format($nilai_buku2,0,",",".")."</td>
					</tr></table>";
		}
			
		echo "</div>";
		return "";
	}
	
}
?>
