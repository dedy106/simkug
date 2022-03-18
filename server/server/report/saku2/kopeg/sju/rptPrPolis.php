<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrPolis extends server_report_basic
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$sql="select  a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
		a.fee,a.premi,a.ppn,a.pph,d.total,d.p_premi,d.p_fee,a.p_cost,a.materai,d.cover,d.occup,d.objek,d.tanggal,
		(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn+a.pph) as hutang,a.kode_curr,h.nama as nama_tipe,
		c.alamat as alamat_cust,d.lokasi,i.kota,
		date_format(d.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(d.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
		j.no_quo,d.no_placing,d.no_polis,
		isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,o.nama as nama_polis,p.nama as nama_quo
from sju_polis_termin a
inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
inner join lokasi i on a.kode_lokasi=i.kode_lokasi
left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
left join sju_quo_m j on d.no_polis=j.no_polis and d.kode_lokasi=j.kode_lokasi
left join sju_app_m l on j.no_app=l.no_app and j.kode_lokasi=l.kode_lokasi

left join karyawan o on d.nik_user=o.nik and a.kode_lokasi=o.kode_lokasi
left join karyawan p on l.nik_user=p.nik and l.kode_lokasi=p.kode_lokasi
$this->filter  order by a.no_polis ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		if ($jenis=="Word")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Transfer-Encoding: binary ");
			header("Content-type: application/vnd.ms-word");
			header("Content-Disposition: attachment;Filename=polis.doc");
		}
		echo "<div align='center'>";
		
		
	$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='600' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='judul_bukti'>IKHTISAR POLIS</td>
  </tr>
  <tr>
    <td align='center' class='isi_bukti' >$row->nama_tipe</td>
  </tr> 
  <tr>
    <td>&nbsp;</td>
  </tr>
  
 
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='196' class='isi_bukti'>Nomor Quotation</td>
        <td width='494' class='isi_bukti'>: $row->no_quo </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Nomor Placing</td>
        <td class='isi_bukti'>: $row->no_placing </td>
      </tr>
      <tr>
        <td class='isi_bukti'>No Register</td>
        <td class='isi_bukti'>: $row->no_polis</td>
      </tr>
      <tr>
        <td class='isi_bukti'>AM</td>
        <td class='isi_bukti'>: $row->nama_pic </td>
      </tr>
      <tr>
        <td  class='isi_bukti'>Nomor Polis</td>
        <td  class='isi_bukti'>: $row->no_dok </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Nama Tertanggung</td>
        <td class='isi_bukti'>: $row->nama_cust </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Alamat Tertanggung</td>
        <td class='isi_bukti'>: $row->alamat_cust</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Nama Penanggung</td>
        <td class='isi_bukti'>: $row->nama_vendor </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Jangka Waktu Pertanggungan</td>
        <td class='isi_bukti'>: $row->tgl_mulai sd $row->tgl_selesai </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Object Pertanggungan</td>
        <td class='isi_bukti'>: $row->objek </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Occupation Of Risk</td>
        <td class='isi_bukti'>: $row->occup </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Location of Risk</td>
        <td class='isi_bukti'>: $row->lokasi  </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Coverage</td>
        <td class='isi_bukti'>: $row->cover </td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='5' class='style16' height='23'>&nbsp;NOTA PERHITUNGAN</td>
        </tr>
      <tr>
        <td colspan='3' class='isi_bukti' >Nilai Pertanggungan</td>
        <td width='37' align='center' class='isi_bukti'>$row->kode_curr</td>
        <td width='140' align='right' class='isi_bukti'>".number_format($row->total,2,',','.')."</td>
      </tr>
      <tr>
        <td width='269' class='isi_bukti' >Premi</td>
        <td width='80' class='isi_bukti' align='center'>".number_format($row->p_premi,2,',','.')." %</td>
        <td width='162'>&nbsp;</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->premi,2,',','.')."</td>
      </tr>
      <tr>
        <td class='isi_bukti' >Brokerage</td>
        <td class='isi_bukti' align='center'>".number_format($row->p_fee,2,',','.')." %</td>
        <td>&nbsp;</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->fee,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' >PPN</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->ppn,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' >Pph</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->pph,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' >Biaya Polis</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->p_cost,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' >Biaya Materai</td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->materai,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti'><b>Piutang Premi</b></td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->premi+$row->p_cost+$row->materai,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' ><b>Untuk PT. SJU</b></td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->fee+$row->ppn-$row->pph,2,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' class='isi_bukti' ><b>Untuk PENANGGUNG</b></td>
        <td align='center' class='isi_bukti'>$row->kode_curr</td>
        <td class='isi_bukti' align='right'>".number_format($row->hutang,2,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='160' class='isi_bukti'>No Bukti Akru</td>
    <td width='200' class='isi_bukti'> $row->no_bill </td>
    <td width='100' class='isi_bukti'>User Input</td>
    <td width='140' class='isi_bukti'> $row->nama_polis </td>
  </tr>
  <tr>
    <td class='isi_bukti'>No Bukti Terima Premi/Brok</td>
    <td class='isi_bukti'> $row->no_kas </td>
    <td class='isi_bukti'>Approval Quot</td>
    <td class='isi_bukti'> $row->nama_quo </td>
  </tr>
  <tr>
    <td class='isi_bukti'>No Bukti Bayar Ht Premi</td>
    <td class='isi_bukti'> $row->no_kashut </td>
    <td class='isi_bukti'>Approval Placing</td>
    <td class='isi_bukti'>  </td>
  </tr>
</table></td>
  </tr>
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak' >
      <tr>
        <td colspan='5' class='style16' height=23>&nbsp;CHECKLIST FISIK POLIS</td>
      </tr>
      <tr>
        <td width='95' align='center' class='isi_bukti'>Tanggal</td>
        <td width='126' align='center' class='isi_bukti'>T/C</td>
        <td width='108' align='center' class='isi_bukti'>Brokerage</td>
        <td width='287' align='center' class='isi_bukti'>Keterangan</td>
        <td width='62' align='center' class='isi_bukti'>Paraf</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>Ok   /   Revisi</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>$row->kota , ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>

 
 
  <tr>
    <td class='isi_laporan' align='right'><i>(Report ini hanya dipergunakan untuk Internal PT. SJU)</i></td>
  </tr>
  
</table>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}
		return "</div>";
		
	}
	
}
?>
