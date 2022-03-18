<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnNol($nilai)
{
	$tmp="-";
	if ($nilai>0)
	{
		$tmp=number_format($nilai,0,",",".");
	}
	return $tmp;
}
function fnPersen($nilai)
{
	$tmp="-";
	if ($nilai>0)
	{
		$tmp=number_format($nilai,2,",",".")."%";
	}
	return $tmp;
}
class server_report_saku3_inves2_rptDepKomposisi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_plan,a.kode_lokasi,a.keterangan,a.nik_usul,a.nik_tahu1,a.nik_tahu2,
	   b.nama as nama_usul,c.nama as nama_tahu1,d.nama as nama_tahu2,a.tanggal,c.jabatan as jab_tahu1
from inv_depoplan_m a
inner join karyawan b on a.nik_usul=b.nik
inner join karyawan c on a.nik_tahu1=c.nik
inner join karyawan d on a.nik_tahu2=d.nik
$this->filter order by a.no_plan";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='1500' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>KOMPOSISI PENEMPATAN DANA JAMKESPEN DAN DANA SANTUNAN KEMATIAN PADA DEPOSITO</td>
  </tr>
 
  <tr >
    <td align='center'>Per ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." Dengan Nomor Bukti : $row->no_plan</td>
  </tr>
 
 
  <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td rowspan='3' align='center' class='header_laporan'>No</td>
        <td rowspan='3' align='center' class='header_laporan'>Nama bank </td>
        <td rowspan='3' align='center' class='header_laporan'>Kategori Bank</td>
		<td rowspan='3' align='center' class='header_laporan'>Rate DOC</td>
		<td rowspan='3' align='center' class='header_laporan'>Rate Deposito</td>
        <td colspan='4' align='center' class='header_laporan'>Nominal Deposito Eksisting (Rp) </td>
        
        <td colspan='8' align='center' class='header_laporan'>Perkiraan Mutasi Deposito </td>
        </tr>
      <tr>
        <td rowspan='2' align='center' class='header_laporan'>DOC</td>
        <td rowspan='2' align='center' class='header_laporan'>Berjangka</td>
        <td rowspan='2' align='center' class='header_laporan'>Jumlah</td>
        <td rowspan='2' align='center' class='header_laporan'>Komposisi</td>
        <td colspan='2' align='center' class='header_laporan'>Nominal Jatuh Tempo (Rp) </td>
        <td colspan='2' align='center' class='header_laporan'>Rencana Pencairan (Rp) </td>
        <td colspan='2' align='center' class='header_laporan'>Perpanjangan (Rp) </td>
        <td colspan='2' align='center' class='header_laporan'>Rencana Penempatan (Rp) </td>
        </tr>
      <tr>
        <td align='center' class='header_laporan'>DOC</td>
        <td align='center' class='header_laporan'>Berjangka</td>
        <td align='center' class='header_laporan'>DOC</td>
        <td align='center' class='header_laporan'>Berjangka</td>
        <td align='center' class='header_laporan'>DOC</td>
        <td align='center' class='header_laporan'>Berjangka</td>
        <td align='center' class='header_laporan'DOC</td>
        <td align='center' class='header_laporan'>Berjangka</td>
        </tr>
      <tr>
        <td width='30' align='center' class='header_laporan'>1</td>
        <td width='150' align='center' class='header_laporan'>2</td>
        <td width='100' align='center' class='header_laporan'>3</td>
		 <td width='60' align='center' class='header_laporan'>&nbsp;</td>
		  <td width='60' align='center' class='header_laporan'>&nbsp;</td>
        <td width='90' align='center' class='header_laporan'>4</td>
        <td width='90' align='center' class='header_laporan'>5</td>
        <td width='90' align='center' class='header_laporan'>6</td>
        <td width='60' align='center' class='header_laporan'>7</td>
        <td width='90' align='center' class='header_laporan'>8</td>
        <td width='90' align='center' class='header_laporan'>9</td>
        <td width='90' align='center' class='header_laporan'>10</td>
        <td width='90' align='center' class='header_laporan'>11</td>
        <td width='90' align='center' class='header_laporan'>12</td>
        <td width='90' align='center' class='header_laporan'>13</td>
        <td width='90' align='center' class='header_laporan'>14</td>
        <td width='90' align='center' class='header_laporan'>15</td>
        </tr>";
		$sql="select a.kode_bankklp, a.nilai_doc, a.nilai_depo, a.p_komp, a.doc_jt, b.nama as nama_klp,a.nilai_doc+a.nilai_depo as total,
				a.depo_jt, a.doc_cair, a.depo_cair, a.doc_panjang, a.depo_panjang, a.doc_baru, a.depo_baru,b.jenis,c.p_doc,c.p_depo
from inv_depoplan_komposisi a
inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
inner join inv_depoplan_rekap c on a.no_plan=c.no_plan and a.kode_bankklp=c.kode_bankklp
inner join inv_jenis d on b.jenis=d.jenis
where a.no_plan='$row->no_plan' 
order by d.nu ";
		
		$rs1=$dbLib->execute($sql);
		$i=1;
		$nilai_doc=0; $nilai_depo=0; $total=0; $doc_jt=0; $depo_jt=0; $doc_cair=0; $depo_cair=0; $doc_panjang=0; $depo_panjang=0; $doc_baru=0; $depo_baru=0; 
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai_doc+=$row1->nilai_doc;
			$nilai_depo+=$row1->nilai_depo;
			$total+=$row1->total;
			$doc_jt+=$row1->doc_jt;
			$depo_jt+=$row1->depo_jt;
			$doc_panjang+=$row1->doc_panjang;
			$depo_panjang+=$row1->depo_panjang;
			$depo_baru+=$row1->depo_baru;
			
			echo "<tr>
			<td class='isi_laporan' width='30' align='center'>$i</td>
			<td class='isi_laporan' width='150' >$row1->nama_klp</td>
			<td class='isi_laporan' width='100' align='center'>$row1->jenis</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_doc)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_depo)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_doc)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_depo)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->total)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_komp)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->doc_jt)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->depo_jt)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->doc_cair)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->depo_cair)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->doc_panjang)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->depo_panjang)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->doc_baru)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->depo_baru)."</td>
			</tr>";
			$i+=1;
		}
		echo "<tr>
			<td width='30' align='center' colspan='5'>Total</td>
			<td class='header_laporan' align='right'>".fnNol($nilai_doc)."</td>
			<td class='header_laporan' align='right'>".fnNol($nilai_depo)."</td>
			<td class='header_laporan' align='right'>".fnNol($total)."</td>
			<td class='header_laporan' align='center'>".number_format(100,2,",",".")."%</td>
			<td class='header_laporan' align='right'>".fnNol($depo_jt)."</td>
			<td class='header_laporan' align='right'>".fnNol($depo_jt)."</td>
			<td class='header_laporan' align='right'>".fnNol($depo_cair)."</td>
			<td class='header_laporan' align='right'>".fnNol($depo_cair)."</td>
			<td class='header_laporan' align='right'>".fnNol($doc_panjang)."</td>
			<td class='header_laporan' align='right'>".fnNol($depo_panjang)."</td>
			<td class='header_laporan' align='right'>".fnNol($doc_baru)."</td>
			<td class='header_laporan' align='right'>".fnNol($depo_baru)."</td>
			</tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1' >
      <tr>
        <td  valign='top'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td rowspan='2' align='center'>No</td>
            <td rowspan='2' align='center'>Kategori Bank </td>
            <td rowspan='2' align='center'>Kategori Bank </td>
            <td colspan='4' align='center'>Rencana Nominal Deposito Setelah Mutasi (Rp) </td>
          </tr>
          <tr>
            <td align='center'>DOC</td>
            <td align='center'>Berjangka</td>
            <td align='center'>Jumlah</td>
            <td align='center'>Komposisi</td>
          </tr>
          <tr>
            <td width='30' align='center'>1</td>
            <td width='150' align='center'>2</td>
            <td width='100' align='center'>3</td>
            <td width='90' align='center'>16</td>
            <td width='90' align='center'>17</td>
            <td width='90' align='center'>18</td>
            <td width='60' align='center'>19</td>
          </tr>";
			$sql="select sum(a.nilai_doc-a.doc_cair+a.doc_panjang+a.doc_baru + a.nilai_depo-a.depo_cair+a.depo_panjang+a.depo_baru) as so_akhir
from inv_depoplan_komposisi a
inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
where a.no_plan='$row->no_plan' ";
			
			$rs1=$dbLib->execute($sql);
			$row1 = $rs1->FetchNextObject($toupper=false);
			$so_akhir=$row1->so_akhir;
			
			$sql="select a.kode_bankklp, a.nilai_doc, a.nilai_depo, a.p_komp, a.doc_jt, b.nama as nama_klp,a.nilai_doc+a.nilai_depo as total,
				a.depo_jt, a.doc_cair, a.depo_cair, a.doc_panjang, a.depo_panjang, a.doc_baru, a.depo_baru,b.jenis,
				a.nilai_doc-a.doc_cair+a.doc_panjang+a.doc_baru as doc_akhir,a.nilai_depo-a.depo_cair+a.depo_panjang+a.depo_baru as depo_akhir
from inv_depoplan_komposisi a
inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
inner join inv_jenis d on b.jenis=d.jenis
where a.no_plan='$row->no_plan' 
order by d.nu ";
		
		$rs1=$dbLib->execute($sql);
		$i=1;
		$doc_akhir=0; $depo_akhir=0; $total=0; $jum=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$doc_akhir+=$row1->doc_akhir;
			$depo_akhir+=$row1->depo_akhir;
			$total+=$row1->doc_akhir+$row1->depo_akhir;
			$persen=0;
			if ($so_akhir!=0)
			{
				$persen=(($row1->doc_akhir+$row1->depo_akhir)/$so_akhir)*100;
			}
			
			$jum+=$persen;
			
          echo "<tr>
           <td width='30' align='center'>$i</td>
			<td width='150' >$row1->nama_klp</td>
			<td width='100' align='center'>$row1->jenis</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->vdoc_akhir)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->depo_akhir)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->doc_akhir+$row1->depo_akhir)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($persen)."</td>
          </tr>";
			$i+=1;
		}
		 echo "<tr>
           <td width='30' align='center' colspan='3'>Total</td>
			<td class='isi_laporan' align='right'>".fnNol($doc_akhir)."</td>
			<td class='isi_laporan' align='right'>".fnNol($depo_akhir)."</td>
			<td class='isi_laporan' align='right'>".fnNol($total)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($jum)."</td>
          </tr>";
        echo "</table></td>
        <td width='100' valign='top'>&nbsp;</td>
        <td width='645' valign='top'><table width='650' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td>KOMPOSISI BERDASARKAN KATEGORI BANK </td>
          </tr>
          <tr>
            <td><table width='500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                <tr>
                  <td width='250' rowspan='2' class='header_laporan'  align='center' >Kategori Bank </td>
                  <td colspan='2' align='center' class='header_laporan'>Komposisi</td>
                </tr>
                <tr>
                  <td width='100' align='center' class='header_laporan'>Awal (Sblm mutasi) </td>
                  <td width='100' align='center' class='header_laporan'>Akhir (stl mutasi) </td>
                </tr>";
				$sql="select a.jenis,ISNULL(b.awal,0) as awal,ISNULL(c.akhir,0) as akhir
from inv_jenis a
left join (select b.jenis,sum(a.nilai_doc+a.nilai_depo) as awal
		from inv_depoplan_komposisi a
		inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp 
		where a.no_plan='$row->no_plan' 
		group by b.jenis
		  )b on a.jenis=b.jenis
left join (select b.jenis,sum(a.nilai_doc-a.doc_cair+a.doc_panjang+a.doc_baru + a.nilai_depo-a.depo_cair+a.depo_panjang+a.depo_baru) as akhir
		from inv_depoplan_komposisi a
		inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp 
		where a.no_plan='$row->no_plan' 
		group by b.jenis
		  )c on a.jenis=c.jenis
order by a.nu ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$doc_akhir=0; $depo_akhir=0; $total=0; $jum=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$persen1=0; $persen2=0;
				if ($so_akhir!=0)
				{
					$persen1=($row1->awal/$so_akhir)*100;
					$persen2=($row1->akhir/$so_akhir)*100;
				}
			
                echo "<tr>
					<td class='header_laporan'>$row1->jenis</td>
					<td class='header_laporan' align='center'>".fnPersen($persen1)."</td>
					<td class='header_laporan' align='center'>".fnPersen($persen2)."</td>
                </tr> ";
			}   
			 echo "<tr>
					<td class='header_laporan'>&nbsp;</td>
					<td class='header_laporan' align='center'>".number_format(100,2,",",".")."%</td>
					<td class='header_laporan' align='center'>".number_format(100,2,",",".")."%</td>
                </tr> ";
            echo "</table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><table width='650' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='212'>&nbsp;</td>
                <td width='206'>&nbsp;</td>
                <td width='218'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
              </tr>
              <tr>
                <td>Catatan : </td>
                <td>Mengetahui / Menyetujui </td>
                <td>Mengusulkan</td>
              </tr>
              <tr>
                <td height='60'>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>$row->nama_tahu1</td>
                <td>$row->nama_usul</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>$row->jab_tahu1</td>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>";
			
			
		}
	
		echo "</div>";
		return "";
		
	}
	
}
?>
