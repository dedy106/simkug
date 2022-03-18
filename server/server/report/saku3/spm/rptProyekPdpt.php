<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptProyekPdpt extends server_report_basic
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
		$nama_file="pendapatan_".$periode.".xls";
		
		if ($jsaldo=="LUNAS")
		{
			$tmp2=" and  a.nilai+a.nilai_ppn-isnull(d.bayar,0)-isnull(e.bayar_pph,0) = 0 ";
		}else
			{
				$tmp2=" and a.nilai+a.nilai_ppn-isnull(d.bayar,0)-isnull(e.bayar_pph,0) > 0 ";
			}

		$sql="select a.no_piutang,c.kode_cust,c.nama as nama_cust,
		b.kode_proyek, a.nilai+a.nilai_ppn as tagihan,isnull(d.bayar,0)+isnull(e.bayar_pph,0) as bayar,b.nama as proyek,CONVERT(varchar, b.tgl_mulai, 105) as mulai,CONVERT(varchar, b.tgl_selesai, 105) as selesai,
		a.nilai+a.nilai_ppn-isnull(e.bayar_pph,0)-isnull(d.bayar,0) as sisa
		from spm_piutang_m a 
		inner join spm_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
		inner join cust c on b.kode_cust=c.kode_cust and c.kode_lokasi=b.kode_lokasi
		
		left join ( 
		select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai_kas+nilai_lain else -(nilai_kas+nilai_lain) end) as bayar 
		from spm_billbayar_d
		where kode_lokasi='$kode_lokasi' and periode<='$periode'
		group by no_piutang,kode_lokasi
		) d on a.no_piutang=d.no_piutang and a.kode_lokasi=d.kode_lokasi

		left join ( 
		select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai else -(nilai) end) as bayar_pph 
		from spm_piutang_j where jenis='PPHM' and kode_lokasi='$kode_lokasi' and periode<='$periode'
		group by no_piutang,kode_lokasi
		) e on a.no_piutang=e.no_piutang and a.kode_lokasi=e.kode_lokasi
		$this->filter $tmp2 order by a.kode_proyek,a.kode_cust,a.no_piutang";

	
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		}
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Pendapatan Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='90' align='center' class='header_laporan'>Kode Customer</td>
	 <td width='150' align='center' class='header_laporan'>Nama Customer</td>
	 <td width='90' align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='150' align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='90' align='center' class='header_laporan'>No Tagihan</td>
	 <td width='90' align='center' class='header_laporan'>Tanggal Mulai</td>
	 <td width='90' align='center' class='header_laporan'>Tanggal Selesai</td>
	 <td width='90' align='center' class='header_laporan'>Tagihan</td>
     <td width='90' align='center' class='header_laporan'>Bayar</td>
     <td width='90' align='center' class='header_laporan'>Saldo</td>
   </tr> ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_pph=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$bayar=$bayar+$row->bayar;
			$sisa=$sisa+$row->sisa;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->proyek</td>
	 <td class='isi_laporan'>$row->no_piutang</td>
	 <td class='isi_laporan'>$row->mulai</td>
	 <td class='isi_laporan'>$row->selesai</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->sisa,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
