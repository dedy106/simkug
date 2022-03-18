<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");


	
class server_report_saku3_sju16_rptPrTagihan extends server_report_basic
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
	function getAkru()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_bukti,a.tanggal,convert(varchar(20),a.tanggal,103) as tgl,a.periode,a.kode_lokasi,a.nik1,a.nik2,a.nik3,a.param1,
					b.nama as nama1,c.nama as nama2,d.nama as nama3,e.nama as nama4,a.periode,substring(a.periode,1,4) as tahun,
					substring(a.periode,5,2) as bulan,upper(left(datename(month,a.tanggal),3)) as bln,a.no_ref3,a.nik_user,f.nama as nama_user
		from trans_m a
		left join karyawan b on a.nik1=b.nik
		left join karyawan c on a.nik2=c.nik
		left join karyawan d on a.nik3=d.nik
		left join karyawan e on a.param1=e.nik
		left join karyawan f on a.nik_user=f.nik
        $this->filter and a.form in ('BILL','BTL_BILL') 
		order by a.no_bukti";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			$judul="BUKTI PEMBUKUAN MEMORIAL";
			$kode_cust=$row->param1;
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
            <td align='center' class='istyle15'>KUG-PS-0205.1</td>
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
        <td width='90' class='header_laporan'>NO AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
		<td width='60' class='header_laporan'>KODE PP </td>
        <td width='150' class='header_laporan'>NAMA PP </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='80' class='header_laporan'>NO REGISTER</td>
        <td width='90' class='header_laporan'>DEBET</td>
        <td width='90' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.kode_lokasi,a.no_dokumen,a.kode_akun,a.dc,a.nilai,a.keterangan,b.nama as nama_akun,
					case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_curr,
					a.kode_pp,d.nama as nama_pp
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
			where a.periode='$row->periode' and a.kode_lokasi='$row->kode_lokasi' and no_bukti='$row->no_bukti' $dokumen
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
				<td class='isi_laporan'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->nama_pp</td>
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
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
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
        <td width='200' align='center' height='23'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
        <td width='200' align='center'>Difiat Oleh : </td>
		<td width='200' align='center'>Otorisasi  Oleh : </td>
      </tr>
      <tr>
        <td align='center' height='23'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
		<td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
	   <tr>
        <td height='23' align='center'>$row->nama_user</td>
        <td align='center'>$row->nama1 </td>
        <td align='center'>$row->nama3 </td>
		<td align='center'>$row->nama4 </td>
        </tr>
    </table></td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
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
    <td align='center' class='istyle17'>RINCIAN AKRU PREMI </td>
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
from sju_polis_termin a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_tipe c on b.kode_tipe=c.kode_tipe and b.kode_lokasi=c.kode_lokasi
where a.no_bill='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
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
d.premi+d.p_cost+d.materai-d.fee-d.diskon-d.ppn as hutang,d.kode_curr,a.kurs,b.no_dok2
from sju_polis_termin a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on b.kode_cust=c.kode_cust and b.kode_lokasi=c.kode_lokasi
inner join sju_polis_termin d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi and a.ke=d.ke
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi
where a.no_bill='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi' and b.kode_tipe='$row1->kode_tipe'
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
		echo "<DIV style='page-break-after:always'></DIV>";
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/sju.jpg";
		
		$this->getAkru();
		$i=1;
		echo "<br><br><br><br><br><br><br><br>";
		echo "<div align='center'>"; 
		$sql="select a.no_bukti,a.kode_lokasi,a.keterangan,a.tanggal,b.kode_cust,b.nama as nama_cust,b.alamat,a.param1,
				f.nama as nama_app,f.jabatan,g.norek,g.bank,a.no_ref3,a.nilai1,dbo.fnGetPolis(a.no_bukti) as dok_polis
from trans_m a
inner join sju_cust b on a.param1=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join karyawan f on a.nik1=f.nik
inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi
$this->filter
 ";
		
		$rs=$dbLib->execute($sql);
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$dok_polis=substr($row->dok_polis,2,strlen($row->dok_polis));
			$kode_cust=$row->param1;
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>No : $row->no_bukti </td>
  </tr>
  <tr>
    <td>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada</td>
  </tr>
  <tr>
    <td>Yth. $row->pic </td>
  </tr>
  <tr>
    <td>$row->nama_cust</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
   <tr>
    <td>Up : $row->no_ref3</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='header_laporan4'>Tagihan Premi  </td>
  </tr>
  
  <tr>
    <td align='center' class='header_laporan3'>a/n. $row->nama_cust </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat,</td>
  </tr>
  <tr>
    <td>Bersama ini kami sampaikan  Polis dan Kuitansi (asli dan duplikat) atas tagihan premi asuransi 
dengan rincian sebagai berikut : </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='30' class='header_laporan3' height='23'>No</td>
        <td width='150' class='header_laporan3'>Nomor Polis</td>
        <td width='250' class='header_laporan3' >Object Pertanggungan </td>
		<td width='40' class='header_laporan3'>Curr</td>
		<td width='60' class='header_laporan3'>Kurs</td>
        <td width='100' class='header_laporan3'>Harga Pertanggungan</td>
		<td width='90' class='header_laporan3'>Jumlah Premi</td>
      </tr>";
	  
	    $sql="select b.kode_tipe,c.nama
from (select a.no_polis,a.kode_lokasi
from sju_polis_termin a
where a.no_bill='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
group by a.no_polis,a.kode_lokasi
	)a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_tipe c on b.kode_tipe=c.kode_tipe and b.kode_lokasi=c.kode_lokasi
group by b.kode_tipe,c.nama";
		
		$rs2=$dbLib->execute($sql);
		$n_premi2=0; $total2=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			 echo "<tr>
			<td class='isi_laporan3' colspan='5' class='isi_laporan3'>$row2->kode_tipe - $row2->nama</td>
		  </tr>";
			$sql="select a.no_polis,a.kode_lokasi,isnull(a.n_premi,0) as n_premi,isnull(a.n_premi2,0) as n_premi2,b.objek,b.total,b.no_dok,b.no_dok2,b.kode_curr,a.kurs
	from (select a.no_polis,a.kode_lokasi,sum((a.premi+a.materai+a.p_cost)*a.kurs) as n_premi,sum(a.premi+a.materai+a.p_cost) as n_premi2,sum(a.kurs) as kurs
	from sju_polis_termin a
	where a.no_bill='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
	group by a.no_polis,a.kode_lokasi
		)a
	inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
	
	where b.kode_tipe='$row2->kode_tipe' ";
			
			$rs1=$dbLib->execute($sql);
			$i=1; $n_premi=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$n_premi+=$row1->n_premi;
				$total+=$row1->total;
				$n_premi2+=$row1->n_premi2;
				$total2+=$row1->total;
				  echo "<tr>
					<td align='center' class='isi_laporan3' height='23'>$i</td>
					<td class='isi_laporan3'>$row1->no_dok | $row1->no_dok2 </td>
					<td class='isi_laporan3'>$row1->objek</td>
					<td class='isi_laporan3'>$row1->kode_curr</td>
					<td class='isi_laporan3'>&nbsp;</td>
					<td class='isi_laporan3' align='right'>".number_format($row1->total,2,',','.')."</td>
					<td class='isi_laporan3' align='right'>".number_format($row1->n_premi2,2,',','.')."</td>
				  </tr>";
				if ($row1->kode_curr<>'IDR')
				{
				  echo "<tr>
					<td align='center' class='isi_laporan3' height='23' colspan='3'>&nbsp;</td>
					<td class='isi_laporan3'>IDR</td>
					<td class='isi_laporan3' align='right'>".number_format($row1->kurs,2,',','.')."</td>
					<td class='isi_laporan3' align='right'>&nbsp;</td>
					<td class='isi_laporan3' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				  </tr>";
				}
				$i+=1;
			}
		  echo "<tr>
			<td colspan='5' align='right' class='isi_laporan3'>Jumlah Curr</td>
			<td align='right' class='isi_laporan3'>".number_format($total,2,',','.')."</td>
			<td align='right' class='isi_laporan3'>".number_format($n_premi2,2,',','.')."</td>
		  </tr>";
		}
		echo "<tr>
			<td colspan='5' align='right' class='isi_laporan3'>Jumlah IDR</td>
			<td align='right' class='isi_laporan3'>&nbsp;</td>
			<td align='right' class='isi_laporan3'>".number_format($n_premi,2,',','.')."</td>
		  </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Untuk menghindari ditolaknya klaim yang disebabkan premi belum dilunasi, maka mohon kiranya premi tersebut diatas dapat dibayarkan paling lambat 7 (tujuh) hari kalender sejak polis dan kuitansi ini diterima, ke rekening kami pada :</td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>$row->bank</td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>Rekening No : $row->norek </td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>atas nama PT. Sarana Janesia Utama </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  
 
  <tr>
    <td>Demikian disampaikan, atas perhatian dan kerjasama yang baik kami ucapkan terima kasih.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='364' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='358'>Hormat kami </td>
          </tr>
          <tr>
            <td>PT. Sarana Janesia Utama </td>
          </tr>
          <tr>
            <td height='100'>&nbsp;</td>
          </tr>
          <tr>
            <td>$row->nama_app</td>
          </tr>
          <tr>
            <td><b>$row->jabatan </b></td>
          </tr>
        </table></td>
        <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td align='center'><b>PENTING ! </b></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Guna mempermudah administrasi, mohon kiranya bukti Transfer disertai keterangan nomor polis yang dibayarkan dapat disampaikan kepada kami melalui email <b> billing@sju.co.id </b></td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
		echo "<DIV style='page-break-after:always'></DIV>";
		echo "<br><br><br>";
		for ($x = 1; $x <= 2; $x++) {
			$judul="ASLI";
			if ($x==2)
			{
				$judul="COPY";
			}
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
		<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
		  <tr>
			<td width='200' align='center'><table width='150' border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr>
                <td height='25' align='center'>$judul</td>
              </tr>
            </table></td>
			<td width='400'></td>
			<td width='200'></td>
		  </tr>
		</table></td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td><table width='800' border='0' cellspacing='0' cellpadding='0'>
		  <tr>
			<td width='205' height='30'>No. Invoice  </td>
			<td width='13'>:</td>
			<td width='568' style='border-bottom:thin solid'>$row->no_bukti</td>
		  </tr>
		  <tr>
			<td height='30'>Telah terima dari </td>
			<td>:</td>
			<td style='border-bottom:thin solid'><b>$row->nama_cust</b></td>
		  </tr>
		   <tr>
			<td height='5'></td>
			<td></td>
			<td></td>
		  </tr>
		  <tr>
			<td height='30'>Uang Sejumlah </td>
			<td>:</td>
			<td bgcolor='#CCCCCC'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>".$AddOnLib->terbilang($row->nilai1)." </b> </td>
		  </tr>
		  <tr>
			<td height='30'>Untuk Pembayaran </td>
			<td>:</td>
			<td style='border-bottom:thin solid'>Premi Asuransi </td>
		  </tr>
		  <tr>
			<td height='30' style='border-bottom:thin solid'>&nbsp;</td>
			<td style='border-bottom:thin solid'>&nbsp;</td>
			<td style='border-bottom:thin solid'>Nomor Polis Terlampir</td>
		  </tr>
		 
		 
		  
		</table></td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
		  <tr>
			<td width='500' align='left' valign='bottom'><table width='200' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td height='25' align='center' bgcolor='#CCCCCC' style='border-style:double none double none;'><b> Rp ".number_format($row->nilai1,2,",",".")." </b></td>
			  </tr>
			</table></td>
			<td width='300'><table width='300' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
				</tr>
			  <tr>
				<td height='100'>&nbsp;</td>
				</tr>
			  <tr>
				<td>$row->nama_app</td>
				</tr>
			  <tr>
				<td><b>$row->jabatan</b></td>
				</tr>
			</table></td>
		  </tr>
		</table></td>
	  </tr>
	   
	</table>
	
	";
	echo "<br><br><br><br><br><br><br><br>";
			}
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		
		// outstanding premi
		$sql="select a.no_bukti,a.kode_lokasi,a.kode_pp,c.objek,b.no_polis,c.no_dok,c.no_dok2,convert(varchar(20),a.tanggal,103) as tgl_tagih
	   ,(b.premi+b.materai+b.p_cost-b.diskon)*b.kurs as n_premi,isnull(d.nilai_kas,0)+isnull(d.nilai_lain,0) as bayar
from trans_m a
inner join sju_polis_termin b on a.no_bukti=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and b.kode_lokasi=c.kode_lokasi
left join sju_polisbayar_d d on b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi and b.no_polis=d.no_polis
where c.kode_cust='$kode_cust' and a.form in ('BILL','BTL_BILL') and isnull(d.no_bukti,'-')='-' 
order by a.no_bukti

 ";
		
		echo "<table border='0' cellspacing='2' cellpadding='1' width='800'>
  <tr>
    <td ><table width='100%' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='50%' class='style16' align='center'>TAGIHAN OUTSTANDING </td>
        </tr>
       
      </table></td>
  </tr>
   <tr>
   <td>
  <table border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='20' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>No Tagihan</td>
        <td width='200' align='center' class='header_laporan'>No Polis | Sertifikat</td>
        <td width='60' align='center' class='header_laporan'>Tgl Tagihan</td>
        <td width='300' align='center' class='header_laporan'>Objek Pertanggungan</td>
		<td width='100' align='center' class='header_laporan'>Tagihan Premi (IDR)</td>
      </tr>
	    ";
		$rs=$dbLib->execute($sql);
		$n_premi=0; $j=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n_premi+=$row->n_premi;
			echo "<tr><td class='isi_laporan' align='center'>$j</td>
			<td class='isi_laporan'>$row->no_dok</td>
			<td class='isi_laporan'>$row->no_dok / $row->no_dok2</td>
			<td class='isi_laporan'>$row->tgl_tagih</td>
			<td class='isi_laporan'>$row->objek</td>
			<td class='isi_laporan' align='right'>".number_format($row->n_premi,2,',','.')."</td>
		  </tr>";
			$j=$j+1;
		}
		echo "<tr><td class='header_laporan' align='center' colspan='5'>Total</td>
			<td class='header_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		  </tr>
		
		</td>
		</tr>
		
		</table>";
		echo "</div>";
		echo "<br><br>";
		
		
		
		
		return "";
		
	}
	
}
?>
