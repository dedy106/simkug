<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptProyekAging extends server_report_basic
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
		$tgl_aging=$tmp[2];
		$jsaldo=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="buku_besar.xls";
		
		if ($jsaldo=="LUNAS")
		{
			$tmp=" and  a.nilai+a.nilai_ppn-a.nilai_pph-isnull(c.nilai_kas,0) = '0' ";
		}else
			{
				$tmp=" and a.nilai+a.nilai_ppn-a.nilai_pph-isnull(c.nilai_kas,0) > '0' ";
			}
			
		$sql="select a.kode_lokasi,a.no_dokumen,a.no_piutang,a.kode_proyek,a.status,date_format(a.tanggal,'%d/%m/%Y') as tgl, b.nama as nama_cust,a.keterangan, a.nilai+a.nilai_ppn-a.nilai_pph as tagihan,a.akun_piutang,d.nama as nama_akun,
	   case when datediff(day,a.tanggal,'$tgl_aging')<=30 then a.nilai+a.nilai_ppn-a.nilai_pph else 0 end as aging1,
	   case when datediff(day,a.tanggal,'$tgl_aging') between 31 and 60 then a.nilai+a.nilai_ppn-a.nilai_pph else 0 end as aging2,
       case when datediff(day,a.tanggal,'$tgl_aging') between 61 and 90 then a.nilai+a.nilai_ppn-a.nilai_pph else 0 end as aging3,
       case when datediff(day,a.tanggal,'$tgl_aging')>90 then a.nilai+a.nilai_ppn-a.nilai_pph else 0 end as aging4,
	   isnull(c.nilai_kas,0) as nilai_kas,a.nilai+a.nilai_ppn-a.nilai_pph-isnull(c.nilai_kas,0)   as saldo
from spm_piutang_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join masakun d on a.akun_piutang=d.kode_akun and a.kode_lokasi=d.kode_lokasi
left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai_kas+a.nilai_lain) as nilai_kas
	       from spm_billbayar_d a
		   inner join (select no_bukti,kode_lokasi,tanggal from trans_m 
		   union 
		   select no_ju as no_bukti,kode_lokasi,tanggal from ju_m) b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.tanggal<='$tgl_aging'  
		   group by a.no_piutang,a.kode_lokasi
		   )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
$this->filter and (a.no_piutang NOT LIKE '%RVB%') and a.tanggal<='$tgl_aging' order by a.no_piutang";
		
	
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
		echo $AddOnLib->judul_laporan("aging piutang proyek",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='100' rowspan='2'  align='center' class='header_laporan'>No Piutang</td>
	 <td width='100' rowspan='2'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='40' rowspan='2'  align='center' class='header_laporan'>Status</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='80' rowspan='2'  align='center' class='header_laporan'>Akun Piutang</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama Akun</td>
     <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td colspan='4'  align='center' class='header_laporan'>Aging</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Bayar</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tgl Lunas</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Umur Lunas</td>
     </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>0 - 30 HARI</td>
     <td width='90'  align='center' class='header_laporan'>30-60 HARI </td>
     <td width='90'  align='center' class='header_laporan'>60-90 HARI</td>
     <td width='90'  align='center' class='header_laporan'>> 90 HARI</td>
   </tr>  ";
		$tagihan=0;$nilai_kas=0;$aging1=0;$aging2=0;$aging3=0;$aging4=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if($jsaldo == 'LUNAS') {
				if($row->saldo == 0 ) {
					$tagihan=$tagihan+$row->tagihan;
					$aging1=$aging1+$row->aging1;
					$aging2=$aging2+$row->aging2;
					$nilai_kas=$nilai_kas+$row->nilai_kas;
					$aging3=$aging3+$row->aging3;
					$aging4=$aging4+$row->aging4;
					$saldo=$saldo+$row->saldo;
					$sql="select a.tgl_kas from (select MAX(b.tanggal) as tgl_kas
					from spm_billbayar_d a
					inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
					where no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi'
					union
					select MAX(b.tanggal) as tgl_kas
					from spm_billbayar_d a
					inner join ju_m b on a.no_bukti=b.no_ju and a.kode_lokasi=b.kode_lokasi
					where a.no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi') a
					where a.tgl_kas is not null ";
				
					$rs1 = $dbLib->execute($sql);
					$row1 = $rs1->FetchNextObject($toupper=false);
					
					$tmp=$row1->tgl_kas;
					$tgl_kas=substr($tmp,8,2)."/".substr($tmp,5,2)."/".substr($tmp,0,4);
					$tgl_kas2=substr($tgl_kas,6,4)."/".substr($tgl_kas,3,2)."/".substr($tgl_kas,0,2);
					$tgl_tagih=substr($row->tgl,6,4)."/".substr($row->tgl,3,2)."/".substr($row->tgl,0,2);
					$umur=round((strtotime($tgl_kas2)-strtotime($tgl_tagih))/(24*60*60),0);

					echo "<tr >
					<td class='isi_laporan' align='center'>$i</td>
					<td class='isi_laporan'>";
						echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
						echo "</td>
							<td class='isi_laporan'>$row->no_dokumen</td>
							<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartuProyek('$row->kode_proyek','$row->kode_lokasi');\">$row->kode_proyek</a></td>
							<td class='isi_laporan'>$row->status</td>
							<td class='isi_laporan'>$row->tgl</td>
							<td class='isi_laporan'>$row->akun_piutang</td>
							<td class='isi_laporan'>$row->nama_akun</td>
							<td class='isi_laporan'>$row->nama_cust</td>
							<td class='isi_laporan'>$row->keterangan</td>
							<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging1,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging2,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging3,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging4,0,",",".")."</td>";
					echo "<td class='isi_laporan' align='right'>";
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_piutang','$row->kode_lokasi');\">".number_format($row->nilai_kas,0,",",".")."</a>";
						echo "</td>
					<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
					<td class='isi_laporan' align='right'>$tgl_kas</td>
					<td class='isi_laporan' align='center'>".number_format($umur,0,",",".")."</td>
					</tr>";
					$i=$i+1;
				} else {
					continue;
				}
			} else {
				if($row->saldo > 0) {
					$tagihan=$tagihan+$row->tagihan;
					$aging1=$aging1+$row->aging1;
					$aging2=$aging2+$row->aging2;
					$nilai_kas=$nilai_kas+$row->nilai_kas;
					$aging3=$aging3+$row->aging3;
					$aging4=$aging4+$row->aging4;
					$saldo=$saldo+$row->saldo;
					$sql="select a.tgl_kas from (select MAX(b.tanggal) as tgl_kas
					from spm_billbayar_d a
					inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
					where no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi'
					union
					select MAX(b.tanggal) as tgl_kas
					from spm_billbayar_d a
					inner join ju_m b on a.no_bukti=b.no_ju and a.kode_lokasi=b.kode_lokasi
					where a.no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi') a
					where a.tgl_kas is not null ";
				
					$rs1 = $dbLib->execute($sql);
					$row1 = $rs1->FetchNextObject($toupper=false);
					
					$tmp=$row1->tgl_kas;
					$tgl_kas=substr($tmp,8,2)."/".substr($tmp,5,2)."/".substr($tmp,0,4);
					$tgl_kas2=substr($tgl_kas,6,4)."/".substr($tgl_kas,3,2)."/".substr($tgl_kas,0,2);
					$tgl_tagih=substr($row->tgl,6,4)."/".substr($row->tgl,3,2)."/".substr($row->tgl,0,2);
					$umur=round((strtotime($tgl_kas2)-strtotime($tgl_tagih))/(24*60*60),0);

					echo "<tr >
					<td class='isi_laporan' align='center'>$i</td>
					<td class='isi_laporan'>";
						echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
						echo "</td>
							<td class='isi_laporan'>$row->no_dokumen</td>
							<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartuProyek('$row->kode_proyek','$row->kode_lokasi');\">$row->kode_proyek</a></td>
							<td class='isi_laporan'>$row->status</td>
							<td class='isi_laporan'>$row->tgl</td>
							<td class='isi_laporan'>$row->akun_piutang</td>
							<td class='isi_laporan'>$row->nama_akun</td>
							<td class='isi_laporan'>$row->nama_cust</td>
							<td class='isi_laporan'>$row->keterangan</td>
							<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging1,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging2,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging3,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row->aging4,0,",",".")."</td>";
					echo "<td class='isi_laporan' align='right'>";
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_piutang','$row->kode_lokasi');\">".number_format($row->nilai_kas,0,",",".")."</a>";
						echo "</td>
					<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
					<td class='isi_laporan' align='right'>$tgl_kas</td>
					<td class='isi_laporan' align='center'>".number_format($umur,0,",",".")."</td>
					</tr>";
					$i=$i+1;
				} else {
					continue;
				}
			}			
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='10'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
