<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptKbRincianHutangPremi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
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
		$sql="select distinct a.no_bukti as no_bukti,a.keterangan,a.tanggal,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,c.nama as nama_lokasi
		from trans_m a 
		inner join lokasi c on a.kode_lokasi=c.kode_lokasi
		left join sju_polisbayar_d d on a.no_bukti=d.no_kashut and a.kode_lokasi=d.kode_lokasi
        $this->filter and a.form='BYR_PREMI'
		order by a.no_bukti ";
		
		$rs = $dbLib->execute($sql);
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			if (substr($row->no_bukti,0,2)=="BK") { $judul="BUKTI PEMBUKUAN BANK KELUAR";}
			if (substr($row->no_bukti,0,2)=="KK") { $judul="BUKTI PEMBUKUAN LAS KELUAR";}
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>PT Sarana Janesia Utama </td>
          </tr>
          <tr>
            <td class='style16'>$row->nama_lokasi</td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td align='center' class='istyle15'>KUG 303B</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>$row->no_bukti</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='100' class='header_laporan'>NO AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='80' class='header_laporan'>NO REGISTER</td>
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.kode_akun,b.nama as nama_akun,a.nilai,a.keterangan,case when a.dc='D' then isnull(a.nilai,0) else 0 end as debet,
				case when a.dc='C' then isnull(a.nilai,0) else 0 end as kredit,a.kode_curr,a.no_dokumen
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_bukti'
			order by a.dc desc";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,2,',','.');
			$kredit=number_format($row1->kredit,2,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>".$AddOnLib->fnAkun($row1->kode_akun)."</td>
				<td class='isi_laporan'>$row1->nama_akun</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan'>$row1->no_dokumen</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,2,',','.');
		$tot_kredit1=number_format($tot_kredit,2,',','.');
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
        <td width='200' align='center'>Diinput Oleh : </td>
        <td width='200' rowspan='3'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300'>Lembar ke 1 untuk Bag. Keuangan / Akuntansi</td>
        <td width='500'>Lembar ke 2 untuk Penerima </td>
      </tr>
    </table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			
			$n_premi=0; $n_biaya=0; $n_fee=0; $n_ppn=0; $n_pph=0; $n_hutang=0;
			$n_premi2=0; $n_biaya2=0; $n_fee2=0; $n_ppn2=0; $n_pph2=0; $n_hutang2=0;
			$kode_curr="";
			echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='50%' class='style16'>PT. Sarana Janesia Utama </td>
          <td width='50%' align='right' class='style16'>ISRCPR</td>
        </tr>
        <tr>
          <td class='style16'>$row->nama_lokasi</td>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
  
  <tr>
    <td align='center' class='istyle17'>RINCIAN HUTANG PREMI </td>
  </tr>
  <tr>
    <td class='istyle15' >No Bukti : $row->no_bukti</td>
  </tr>
  <tr>
    <td class='istyle15'>Tanggal  : $row->tgl</td>
  </tr>
  <tr>
    <td><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='20' align='center' class='header_laporan'>No</td>
        <td width='150' align='center' class='header_laporan'>Tertanggung</td>
        <td width='150' align='center' class='header_laporan'>No Polis | Sertifikat</td>
        <td width='150' align='center' class='header_laporan'>Asuradur</td>
        <td width='40' align='center' class='header_laporan'>Curr</td>
		<td width='60' align='center' class='header_laporan'>Kurs</td>
        <td width='80' align='center' class='header_laporan'>Premi Terima </td>
        <td width='80' align='center' class='header_laporan'>Biaya</td>
        <td width='80' align='center' class='header_laporan'>Premi</td>
        <td width='80' align='center' class='header_laporan'>Brokerage</td>
        <td width='80' align='center' class='header_laporan'>PPN</td>
        <td width='80' align='center' class='header_laporan'>PPH23</td>
        <td width='80' align='center' class='header_laporan'>Ht.Premi</td>
        <td width='80' align='center' class='header_laporan'>Ht.Premi + PPH </td>
      </tr>";
		$sql="select b.kode_tipe,c.nama 
from sju_polisbayar_d a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_tipe c on b.kode_tipe=c.kode_tipe and b.kode_lokasi=c.kode_lokasi
where a.no_kashut='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
group by b.kode_tipe,c.nama ";
		
		$premi3=0; $biaya3=0; $fee3=0; $ppn3=0; $pph3=0; $hutang3=0;
		$rs1 = $dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td colspan='13' class='header_laporan'>$row1->kode_tipe - $row1->nama</td>
        </tr>
      <tr>";
			$sql="select distinct c.nama as nama_ttg,b.no_dok,a.no_polis,e.nama as nama_vendor,d.premi+d.materai+d.p_cost as premi,d.materai+d.p_cost as biaya,d.fee,d.ppn,d.pph,
d.premi+d.p_cost+d.materai-d.fee-d.diskon-d.ppn as hutang,a.kode_curr,a.kurs,b.no_dok2,d.nu
from sju_polisbayar_d a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on b.kode_cust=c.kode_cust and b.kode_lokasi=c.kode_lokasi
inner join sju_polis_termin d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi and a.ke=d.ke and a.nu=d.nu
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi
where a.no_kashut='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi' and b.kode_tipe='$row1->kode_tipe'
";
			
			$rs2 = $dbLib->execute($sql);
			$j=1;
			$premi=0; $biaya=0; $fee=0; $ppn=0; $pph=0; $hutang=0;
			$premi2=0; $biaya2=0; $fee2=0; $ppn2=0; $pph2=0; $hutang2=0;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				$premi+=$row2->premi;
				$biaya+=$row2->biaya;
				$fee+=$row2->fee;
				$ppn+=$row2->ppn;
				$pph+=$row2->pph;
				$hutang+=$row2->hutang;
				
				$premi2+=$row2->kurs*$row2->premi;
				$biaya2+=$row2->kurs*$row2->biaya;
				$fee2+=$row2->kurs*$row2->fee;
				$ppn2+=$row2->kurs*$row2->ppn;
				$pph2+=$row2->kurs*$row2->pph;
				$hutang2+=$row2->kurs*$row2->hutang;
				
				$premi3+=$row2->kurs*$row2->premi;
				$biaya3+=$row2->kurs*$row2->biaya;
				$fee3+=$row2->kurs*$row2->fee;
				$ppn3+=$row2->kurs*$row2->ppn;
				$pph3+=$row2->kurs*$row2->pph;
				$hutang3+=$row2->kurs*$row2->hutang;
				
				echo "<td class='isi_laporan' align='center'>$j</td>
			<td class='isi_laporan'>$row2->nama_ttg</td>
			<td class='isi_laporan'>$row2->no_dok | $row2->no_dok2</td>
			<td class='isi_laporan'>$row2->nama_vendor</td>
			<td class='isi_laporan'>$row2->kode_curr</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan' align='right'>".number_format($row2->premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->premi-$row2->biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->hutang+$row2->pph,2,',','.')."</td>
		  </tr>";
			if ($row2->kode_curr!="IDR")
			{
				$kode_curr="1";
				echo "<td class='isi_laporan' colspan='4'>&nbsp;</td>
			<td class='isi_laporan'>IDR</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*($row2->premi-$row2->biaya),2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*$row2->hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->kurs*($row2->hutang+$row2->pph),2,',','.')."</td>
		  </tr>";
			}
				$j=$j+1;
			}
				$n_premi+=$premi;
				$n_biaya+=$biaya;
				$n_fee+=$fee;
				$n_ppn+=$ppn;
				$n_pph+=$pph;
				$n_hutang+=$hutang;
				
				$n_premi2+=$premi2;
				$n_biaya2+=$biaya2;
				$n_fee2+=$fee2;
				$n_ppn2+=$ppn2;
				$n_pph2+=$pph2;
				$n_hutang2+=$hutang2;
				
				
				
			if ($kode_curr=="1")
			{
			  echo "<tr>
        <td class='isi_laporan' colspan='6' class='header_laporan' align='right''>Sub Total (Curr) </td>
		 <td class='isi_laporan' align='right'>".number_format($premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($premi-$biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang+$pph,2,',','.')."</td>
      </tr>";
			}
      echo "<tr>
        <td class='isi_laporan' colspan='6' align='right'>Sub Total IDR </td>
		 <td class='isi_laporan' align='right'>".number_format($premi2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($biaya2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($premi2-$biaya2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($fee2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($ppn2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($pph2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang2+$pph2,2,',','.')."</td>
      </tr>";
		}
		  echo "<tr>
        <td class='isi_laporan' colspan='6' align='right'>Grand Total IDR </td>
		 <td class='isi_laporan' align='right'>".number_format($premi3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($biaya3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($premi3-$biaya3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($fee3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($ppn3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($pph3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang3+$pph3,2,',','.')."</td>
      </tr>";
      echo "
    </table></td>
  </tr>
 
</table>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
