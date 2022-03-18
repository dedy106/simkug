<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_fa_rptFaAssetAkun extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_klpakun=$tmp[3];
		
		$sql = "select count(a.no_fa)
			from fa_asset a
			inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
			inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter and a.nilai<>0 ";
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
		$sql = "select a.kode_akun,a.no_fa,a.kode_lokasi,a.kode_klpakun,b.nama as nama_klpakun,a.kode_pp,c.nama as nama_pp,a.no_fa,a.nama,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl,
				   a.umur/12 as umur,a.persen,a.nilai,a.no_seri,a.merk,a.tipe,
				   isnull(d.akumulasi_sd,0)-isnull(f.wo_ap_sd,0) as akumulasi_sd,isnull(e.akumulasi_bln,0)-isnull(g.wo_ap,0) as akumulasi_bln,
				   isnull(d.akumulasi_sd,0)+isnull(e.akumulasi_bln,0)-isnull(g.wo_ap,0)-isnull(f.wo_ap_sd,0) as akumulasi_total,isnull(f.wo_sd,0)+isnull(g.wo,0) as wo,
					case when isnull(g.wo,0)+isnull(f.wo_sd,0)=0 then a.nilai-isnull(d.akumulasi_sd,0)-isnull(e.akumulasi_bln,0) else 0 end as nilai_buku
			from fa_asset a
			inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
			inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
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
					   )g on a.no_fa=g.no_fa and a.kode_lokasi=g.kode_lokasi $this->filter and a.nilai<>0
			order by a.kode_klpakun,a.kode_pp,a.tgl_perolehan ";
		
		//error_log($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = $start+1;
		if ($i<0) {$i=1;};
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar aktiva operasional dan beban penyusutan asset",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='100'  align='center' class='header_laporan'>Kode Akun </td>
				<td width='150'  align='center' class='header_laporan'>Barang </td>
				<td width='120' align='center' class='header_laporan'>Jenis</td>
				<td width='80' align='center' class='header_laporan'>Merk</td>
				<td width='100' align='center' class='header_laporan'>Tipe</td>
				<td width='50' align='center' class='header_laporan'>Tahun</td>
				<td width='50' align='center' class='header_laporan'>% Tahun </td>
				<td width='60'  align='center' class='header_laporan'>Tanggal</td>
				<td width='90'  align='center' class='header_laporan'>Nilai Perolehan </td>
			    <td width='90' align='center' class='header_laporan'>AP S/D Bulan Lalu </td>
				<td width='90' align='center' class='header_laporan'>AP Bulan Ini </td>
				<td width='90' align='center' class='header_laporan'>AP S/D Bulan Ini </td>
				<td width='90' align='center' class='header_laporan'>Write Off</td>
				<td width='90' align='center' class='header_laporan'>Nilai Buku </td>
  </tr>";		
		$nilai = 0; $nilai_buku = 0; $nilai_akm_sd = 0; $nilai_akm_bln = 0; $nilai_akm_total = 0;
		$nilai2= 0 ; $nilai_buku2 = 0 ; $nilai_akm_sd2 = 0; $nilai_akm_bln2 = 0;$nilai_akm_total2 = 0;$wo=0;
		$first = true;
		$ix=1;
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->kode_akun; 
			if ($tmp!=$row->kode_akun)
			{				
				$first = true;			
				if ($tmp != "")
				{
					echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='8' align='right' class='header_laporan'>Sub Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($wo,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
  </tr>";
					$nilai=0;$nilai_buku=0;$nilai_akm_sd=0;$nilai_akm_bln=0;$nilai_akm_total=0;
					$i=1;
				}
				$tmp=$row->kode_akun;
				
			}
		    $nilai += $row->nilai;
			$nilai_akm_sd += $row->akumulasi_sd;
			$nilai_akm_bln += $row->akumulasi_bln;
			$nilai_akm_total += $row->akumulasi_total;
			$nilai_buku += $row->nilai-$row->akumulasi_total-$row->wo;
			$wo=$wo+$row->wo;
			$nilai2 += $row->nilai;
			$nilai_akm_sd2 += $row->akumulasi_sd;
			$nilai_akm_bln2 += $row->akumulasi_bln;
			$nilai_akm_total2 += $row->akumulasi_total;
			$nilai_buku2 += $row->nilai-$row->akumulasi_total-$row->wo;
			echo "<tr>
				  <td  class='isi_laporan'>$row->kode_akun</td>
				   <td  class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbAsset('$row->no_fa','$row->kode_lokasi');\">$row->nama</a>";				  
			echo "</td>
				  <td  class='isi_laporan'>$row->nama_klpakun</td>
				  <td  class='isi_laporan'>$row->merk</td>
				  <td  class='isi_laporan'>$row->tipe</td>
				  <td  class='isi_laporan'>$row->umur</td>
				  <td  class='isi_laporan'>$row->persen</td>
				  <td  class='isi_laporan'>$row->tgl</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_sd,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_total,0,",",".")."</td>
				   <td  class='isi_laporan' align='right'>".number_format($row->wo,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai_buku,0,",",".")."</td>
  </tr>";
			
			$i=$i+1;
			$ix++;
		}
		echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='8' align='right' class='header_laporan'>Sub Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($wo,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
		</tr>";
		echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='8' align='right' class='header_laporan'>Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total2,0,",",".")."</td>
				   <td class='header_laporan' align='right'>".number_format($wo,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku2,0,",",".")."</td>
		</tr>";
			
		echo "</div>";
		return "";
	}
	
}
?>
