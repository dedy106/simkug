<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrProduksi extends server_report_basic
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
		$klp=$tmp[2];
		$koma=$tmp[3];
		$jenis=$tmp[4];
		$tipe=$tmp[5];
		$periode2=$tmp[6];
		$nama_file="produksi_".$periode.".xls";
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
		}
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($tipe=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($tipe=="All")
		{
			$nama_periode="Semua Periode";
		}
		$i=1;
		echo "<div align='center'>"; 
		echo "<table  border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>ISPRD</td>
      </tr>
      <tr>
        <td class='style16'>$this->lokasi</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>LAPORAN DATA PRODUKSI </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>$nama_periode</td>
        <td>&nbsp;</td>
      </tr>
    
    </table></td>
  </tr>
  <tr>
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='2000'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
        <td width='200' rowspan='2' class='header_laporan'>Tertanggung</td>
        <td width='150' rowspan='2' class='header_laporan'>Asuradur</td>
		<td width='150' rowspan='2' class='header_laporan'>No Register</td>
        <td width='150' rowspan='2' class='header_laporan'>No Polis / Nota </td>
		<td width='80' rowspan='2' class='header_laporan'>Tanggal Polis </td>
        <td width='130' rowspan='2' class='header_laporan'>Periode Polis </td>
		 <td width='80' rowspan='2' class='header_laporan'>Acc Exec </td>
		 <td width='50' rowspan='2' class='header_laporan'>COB </td>
		<td width='130' rowspan='2' class='header_laporan'>Object of Loss </td>
        <td width='40' rowspan='2' class='header_laporan'>Curr</td>
        <td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='90' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='90' rowspan='2' class='header_laporan'>Komisi</td>
		<td width='90' rowspan='2' class='header_laporan'>Biaya Adm & Materai</td>
        <td width='80' rowspan='2' class='header_laporan'>PPN</td>
        <td width='80' rowspan='2' class='header_laporan'>PPh</td>
		<td width='100' rowspan='2' class='header_laporan'>No Akru</td>
		<td width='100' rowspan='2' class='header_laporan'>No Pelunasan</td>
		<td width='100' rowspan='2' class='header_laporan'>No Pembayaran</td>
		<td width='60' rowspan='2' class='header_laporan'>Jumlah Dok</td>
      </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
		$sql="select a.kode_klp,a.nama,a.kode_lokasi 
from sju_tipe_klp a
inner join (select b.kode_klp,a.kode_lokasi
from sju_polis_m a
inner join sju_tipe b on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
group by b.kode_klp,a.kode_lokasi
			)b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
$klp order by a.kode_klp";
	
		$rs=$dbLib->execute($sql);
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
		$tot_total2=0; $tot_n_premi2=0; $tot_n_fee2=0; $tot_ppn2=0; $tot_pph2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td colspan='14' class='header_laporan'>&nbsp;&nbsp;&nbsp;Categori : $row->kode_klp - $row->nama</td>
		  </tr>";
			$sql="select a.no_polis,a.kode_lokasi,c.nama as nama_cust,d.nama as nama_vendor,e.nama as nama_pic,1 as kurs,a.no_dok,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.kode_curr,
	   b.total,a.p_premi,b.n_premi,a.p_fee,b.n_fee,g.ppn,g.pph,date_format(a.tanggal,'%d/%m/%Y') as tgl_polis,a.objek,
	   a.kode_tipe,a.p_cost+a.materai as biaya_adm,g.no_bill,isnull(h.no_bukti,'-') as no_kas,isnull(h.no_kashut,'-') as no_kashut,
	   isnull(i.jum,0) as jum
from sju_polis_m a
inner join sju_polis_termin g on a.no_polis=g.no_polis and a.kode_lokasi=g.kode_lokasi
inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor d on b.kode_vendor=d.kode_vendor and b.kode_lokasi=d.kode_lokasi
inner join sju_pic e on a.kode_pic=e.kode_pic and a.kode_lokasi=e.kode_lokasi
inner join sju_tipe f on a.kode_tipe=f.kode_tipe and a.kode_lokasi=f.kode_lokasi
left join sju_polisbayar_d h on g.no_polis=h.no_polis and g.no_bill=h.no_bill and g.kode_lokasi=h.kode_lokasi and g.ke=h.ke and g.kode_vendor=h.kode_vendor
left join (select a.no_polis,a.kode_lokasi,count(a.no_polis) as jum 
		   from sju_polis_dok a
		   where a.kode_lokasi='$kode_lokasi'
		   group by a.no_polis,a.kode_lokasi
		   )i on a.no_polis=i.no_polis and a.kode_lokasi=i.kode_lokasi
$this->filter and f.kode_klp='$row->kode_klp'
order by a.kode_curr,a.kode_cust ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $ppn=0; $pph=0; $biaya_adm=0;
			$total2=0; $n_premi2=0; $n_fee2=0; $ppn2=0; $pph2=0; $biaya_adm2=0;
			$kode_curr=="";
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				if ($row1->kode_curr=="IDR")
				{
					$total+=$row1->total;
					$n_premi+=$row1->n_premi;
					$n_fee+=$row1->n_fee;
					$ppn+=$row1->ppn;
					$pph+=$row1->pph;
					$biaya_adm+=$row1->biaya_adm;
				}
				else
				{
					
					$total2+=$row1->total;
					$n_premi2+=$row1->n_premi;
					$n_fee2+=$row1->n_fee;
					$ppn2+=$row1->ppn;
					$pph2+=$row1->pph;
					$biaya_adm2+=$row1->biaya_adm;
				}
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->tgl_polis</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->objek</td>
				<td class='isi_laporan'>$row1->kode_curr</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->biaya_adm,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->ppn,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->pph,2,',','.')."</td>
				<td class='isi_laporan'>$row1->no_bill</td>
				<td class='isi_laporan'>$row1->no_kas</td>
				<td class='isi_laporan'>$row1->no_kashut</td>";
				echo "<td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row1->no_polis','$row1->kode_lokasi');\">$row1->jum</a></td>";

			  echo "</tr>";
				$i=$i+1;
			 }
			$tot_total+=$total;
			$tot_n_premi+=$n_premi;
			$tot_n_fee+=$n_fee;
			$tot_ppn+=$ppn;
			$tot_pph+=$pph;
			
			$tot_total2+=$total2;
			$tot_n_premi2+=$n_premi2;
			$tot_n_fee2+=$n_fee2;
			$tot_ppn2+=$ppn2;
			$tot_pph2+=$pph2;
			
		if ($total2>0)
		{	
		echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Jumlah (USD)</td>
        <td class='isi_laporan' align='right'>".number_format($total2,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph2,2,',','.')."</td>
		<td colspan='3'>&nbsp;</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Jumlah (IDR)</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
		<td colspan='3'>&nbsp;</td>
		<td colspan='3'>&nbsp;</td>
      </tr>";
	  
	  
		
		
		}
		if ($tot_total2>0)
		{
		echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Total (USD)</td>
        <td class='isi_laporan' align='right'>".number_format($tot_total2,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($tot_n_premi2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_n_fee2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_biaya_adm2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_ppn2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_pph2,2,',','.')."</td>
		<td colspan='3'>&nbsp;</td>
		<td colspan='3'>&nbsp;</td>
      </tr>";
	    }
      echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Total (IDR)</td>
        <td class='isi_laporan' align='right'>".number_format($tot_total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($tot_n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_n_fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_biaya_adm,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_ppn,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($tot_pph,2,',','.')."</td>
		<td colspan='3'>&nbsp;</td>
		<td colspan='3'>&nbsp;</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
