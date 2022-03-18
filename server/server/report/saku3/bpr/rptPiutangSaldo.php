<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptPiutangSaldo extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_piutang,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.akun_piutang,a.kode_pp,
		a.nilai+a.nilai_ppn-a.nilai_pph as nilai,a.nilai_ppn,a.nilai_pph,a.nilai as tagihan,b.nama as nama_cust,
		(a.nilai+a.nilai_ppn-a.nilai_pph)-c.nilai1 as saldo,c.nilai1 as bayar
from pu_bill_d a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join trans_m c on a.no_piutang=c.no_bukti and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_piutang";

		
		$rs = $dbLib->execute($sql);
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
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
     <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Mtp</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
     <td colspan='4'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPh</td>
	 <td width='90'  align='center' class='header_laporan'>Total Piutang</td>
	
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$byr=$byr+$row->bayar;
			
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$nilai_pph=$nilai_pph+$row->nilai_pph;
			$tgl_kas="";$umur=0;
			if ($row->saldo==0)
			{
					
				$sql="select a.tanggal from (select MAX(b.tanggal) as tgl_kas
					from pu_bill_d a
					inner join trans_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
					where a.no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi'
					";
				
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row->no_piutang','$row->kode_lokasi');\">$row->no_dokumen</a>";
		echo "</td>	
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->akun_piutang</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
 	  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($byr,0,",",".")."</td>
 	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
