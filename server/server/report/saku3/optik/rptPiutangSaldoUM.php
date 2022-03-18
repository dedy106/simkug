<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_optik_rptPiutangSaldoUM extends server_report_basic
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
		$jsaldo=$tmp[2];
		$jenis=$tmp[3];
		$tgl_aging=$tmp[4];
		$nama_file="buku_besar.xls";

		if ($jsaldo=="ALL")
		{
			$tmp="";

		}
		if ($jsaldo=="LUNAS")

		{
			$tmp=" and  a.nilai+a.nilai_ppn-a.nilai_pph-isnull(c.nilai_kas,0) = 0 ";
		}
		if ($jsaldo=="BELUM LUNAS")
		
			{
				$tmp=" and a.nilai+a.nilai_ppn-a.nilai_pph-isnull(c.nilai_kas,0) > 0 ";
			}
		
		$sql="select a.kode_lokasi,a.no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103)  as tgl,a.pasien,a.kode_pp,a.alamat,a.no_hp,e.nama as nama_pp,
		d.nilai as tagihan, isnull(c.nilai_kas,0) as nilai_kas,d.nilai-isnull(c.nilai_kas,0) as saldo 
		from optik_pesan_m a 
		inner join trans_j d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.jenis='PIUTANG' 
		left join (select a.no_resep,a.kode_lokasi,sum(a.nilai) as nilai_kas 
				   from optik_pesan_bayar a 
				   inner join (select no_bukti,kode_lokasi,tanggal from trans_m ) b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
				   where a.kode_lokasi<='$kode_lokasi' and b.tanggal <= '$tgl_aging'  
				   group by a.no_resep,a.kode_lokasi ) c on a.no_bukti=c.no_resep and a.kode_lokasi=c.kode_lokasi 
		inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi  
		$this->filter and (a.jenis ='UMUM') and a.tanggal <= '$tgl_aging' $tmp and d.nilai <> 0 order by a.no_bukti
		";
		
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo Nota pesanan umum",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Resep</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Nota</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Nama Pasien</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Alamat Pasien</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Hp</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Cabang</td>
     <td colspan='2'  align='center' class='header_laporan'>Tagihan</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Lunas</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Umur Lunas</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Total Piutang</td>
	
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$tgl_kas="";$umur=0;
			if (($row->saldo==0) AND ($row->tagihan <> 0))
			{
				$sql="select a.tgl_kas from (select MAX(b.tanggal) as tgl_kas
					from optik_pesan_bayar a
					inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
					where a.no_resep='$row->no_resep' and a.kode_lokasi='$row->kode_lokasi') a
					where a.tgl_kas is not null ";
				
				$rs1 = $dbLib->execute($sql);
				$row1 = $rs1->FetchNextObject($toupper=false);
				
				$tmp=$row1->tgl_kas;
				$tgl_kas=substr($tmp,8,2)."/".substr($tmp,5,2)."/".substr($tmp,0,4);
				$tgl_kas2=substr($tgl_kas,6,4)."/".substr($tgl_kas,3,2)."/".substr($tgl_kas,0,2);
				$tgl_tagih=substr($row->tgl,6,4)."/".substr($row->tgl,3,2)."/".substr($row->tgl,0,2);
				$umur=round((strtotime($tgl_kas2)-strtotime($tgl_tagih))/(24*60*60),0);
			}
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_bukti','$row->kode_lokasi');\">$row->no_bukti</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row->no_bukti','$row->kode_lokasi');\">$row->no_dokumen</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenProyek('$row->pasien','$row->kode_lokasi');\">$row->pasien</a>";
		echo "</td>	
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_hp</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_bukti','$row->kode_lokasi');\">".number_format($row->nilai_kas,0,",",".")."</a>";
		echo "</td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>$tgl_kas</td>
	 <td class='isi_laporan' align='center'>".number_format($umur,0,",",".")."</td>
	 </tr>";
			
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
	 <td class='isi_laporan' align='right'></td>
	 <td class='isi_laporan' align='right'></td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
