<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptPiutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_piutang)
from gr_piutang_m a
inner join gr_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
$this->filter";
		
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
		$jenis=$tmp[1];
		$nama_file="saldo_piutang.xls";
		$sql="select a.kode_lokasi,a.no_piutang,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,sum(a.nilai) as nilai,sum(a.nilai_ppn*a.kurs) as nilai_ppn,a.nilai-a.nilai_ppn as tagihan,b.nama as nama_cust,
	   sum(isnull(c.nilai_lain,0)) as nilai_lain,sum(isnull(c.nilai_kas,0)) as nilai_kas,
	   sum(a.nilai-isnull(c.nilai_lain,0)-isnull(c.nilai_kas,0)) as saldo,dbo.fnGetBuktiKas(a.no_piutang,'$periode') as ket_kas,
	   a.akun_piutang,d.nama as nama_akun
from gr_piutang_m a
inner join gr_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join masakun d on a.akun_piutang=d.kode_akun  and a.kode_lokasi=d.kode_lokasi
left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai_lain*a.kurs) as nilai_lain,sum(a.nilai_kas*a.kurs) as nilai_kas
		   from gr_piutangbayar_d a
		   where a.periode<='$periode'
		   group by a.no_piutang,a.kode_lokasi
		  )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
$this->filter
group by a.kode_lokasi,a.no_piutang,a.no_dokumen, a.tanggal,a.keterangan,b.nama, a.akun_piutang,d.nama,a.nilai,a.nilai_ppn
order by a.no_piutang";
	

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
		
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Piutang</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Invoice</td>
	 <td width='80' rowspan='2'  align='center' class='header_laporan'>Akun Piutang</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
     <td colspan='3'  align='center' class='header_laporan'>Tagihan</td>
     <td colspan='3'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='120' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Kas</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Lain</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$nilai_lain=$nilai_lain+$row->nilai_lain;
			$saldo=$saldo+$row->saldo;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
		echo "</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_piutang','$row->kode_lokasi');\">$row->no_dokumen</a>";
		echo "</td>
		<td class='isi_laporan'>$row->akun_piutang</td>
		<td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_lain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_lain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
