<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptKbBt extends server_report_basic
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
		$sql="select a.no_kas,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,c.nama as lokasi 
		from kas_m a 
		inner join (select no_bukti,kode_lokasi 
from sju_polisbayar_d
where kode_lokasi='$kode_lokasi'
group by no_bukti,kode_lokasi) b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
        $this->filter ";
		 
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='50%'>PT. Sarana Janesia Utama </td>
          <td width='50%' align='right'>ISRCPR</td>
        </tr>
        <tr>
          <td>$row->lokasi</td>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
  
  <tr>
    <td align='center'>RINCIAN PENERIMAAN PREMI </td>
  </tr>
  <tr>
    <td class='header_laporan'>No Bukti : $row->no_kas</td>
  </tr>
  <tr>
    <td class='header_laporan'>Tanggal  : $row->tgl</td>
  </tr>
  <tr>
    <td><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='20' align='center' class='header_laporan'>No</td>
        <td width='150' align='center' class='header_laporan'>Tertanggung</td>
        <td width='150' align='center' class='header_laporan'>No Polis / Nota </td>
        <td width='150' align='center' class='header_laporan'>Asuradur</td>
        <td width='40' align='center' class='header_laporan'>Curr</td>
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
where a.no_bukti='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
group by b.kode_tipe,c.nama ";
		$rs1 = $dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td colspan='13' class='header_laporan'>$row1->kode_tipe - $row1->nama</td>
        </tr>
      <tr>";
			$sql="select c.nama as nama_ttg,b.no_dok,a.no_polis,e.nama as nama_vendor,d.premi+d.materai+d.p_cost as premi,d.materai+d.p_cost as biaya,d.fee,d.ppn,d.pph,
d.premi+d.p_cost+d.materai-d.fee-d.diskon-d.ppn as hutang,d.kode_curr 
from sju_polisbayar_d a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on b.kode_cust=c.kode_cust and b.kode_lokasi=c.kode_lokasi
inner join sju_polis_termin d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi and a.ke=d.ke
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi
where a.no_bukti='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
";
			$rs2 = $dbLib->execute($sql);
			$j=1;
			$premi=0; $biaya=0; $fee=0; $ppn=0; $pph=0; $hutang=0;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				$premi+=$row2->premi;
				$biaya+=$row2->biaya;
				$fee+=$row2->fee;
				$ppn+=$row2->ppn;
				$pph+=$row2->pph;
				$hutang+=$row2->hutang;
				
				
				echo "<td class='isi_laporan' align='center'>$j</td>
			<td class='isi_laporan'>$row2->nama_ttg</td>
			<td class='isi_laporan'>$row2->no_dok</td>
			<td class='isi_laporan'>$row2->nama_vendor</td>
			<td class='isi_laporan'>$row2->kode_curr</td>
			<td class='isi_laporan' align='right'>".number_format($row2->premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->premi-$row2->biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->hutang+$row2->pph,2,',','.')."</td>
		  </tr>";
				$j=$j+1;
			}
		}
      echo "<tr>
        <td class='isi_laporan' colspan='4' class='header_laporan' align='right''>Sub Total (Original) </td>
		<td class='isi_laporan'>$row2->kode_curr</td>
        <td class='isi_laporan' align='right'>".number_format($premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($premi-$biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang+$pph,2,',','.')."</td>
      </tr>
      <tr>
        <td class='isi_laporan' colspan='4' align='right'>Sub Total (Local) </td>
		<td class='isi_laporan'>$row2->kode_curr</td>
        <td class='isi_laporan' align='right'>".number_format($premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($premi-$biaya,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($hutang+$pph,2,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan' colspan='4' align='right'>Grand Total </td>
		<td class='isi_laporan'>$row2->kode_curr</td>
        <td class='header_laporan' align='right'>".number_format($premi,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($biaya,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($premi-$biaya,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($fee,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($pph,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($hutang,2,',','.')."</td>
			<td class='header_laporan' align='right'>".number_format($hutang+$pph,2,',','.')."</td>
      </tr>
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
