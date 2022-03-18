<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gaji_rptHRSlipPoltek
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "SELECT count(a.nik)
FROM gaji_m a 
INNER JOIN karyawan b ON a.nik=b.nik 
INNER JOIN hr_dinas2 c ON a.nik=c.nik 
left JOIN hr_jabatan d ON c.kode_jabs=d.kode_jab 
INNER JOIN hr_lokasi e ON  c.kode_lokasi=e.kode_lokasi 
INNER JOIN hr_loker f ON  c.kode_loker=f.kode_loker ".$this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "SELECT count(a.nik)
FROM gaji_m a 
INNER JOIN karyawan b ON a.nik=b.nik 
INNER JOIN hr_dinas2 c ON a.nik=c.nik 
left JOIN hr_jabatan d ON c.kode_jabs=d.kode_jab 
INNER JOIN hr_lokasi e ON  c.kode_lokasi=e.kode_lokasi 
INNER JOIN hr_loker f ON  c.kode_loker=f.kode_loker ".$this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
			$n6=$rs->fields[6];
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6;		
		return $result;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$status=$tmp[0];
		$periode=$tmp[1];
		$sql = "SELECT distinct a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.status,b.bank,b.cabang,b.no_rek,b.nama_rek,c.gadas,a.nik,b.nama,e.nama AS lokasi,f.nama AS loker,c.tingkat,m.jab_baru as jabatan,
		ifnull(h.pph_bln_lalu,0) as pph_bln_lalu,ifnull(i.pph_bln_sd,0) as pph_bln_sd,       
ifnull(j.pdpt_bln_lalu,0) as pdpt_bln_lalu,ifnull(k.pdpt_bln_sd,0) as pdpt_bln_sd,l.jml
FROM gaji_m a 
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join hr_jabs m on a.nik=m.nik and m.status_aktif='1'
inner join hr_dinas2 c on m.nik=c.nik and m.no_sk=c.no_sk
left join hr_jabatan d on c.kode_jabs=d.kode_jab 
inner join hr_lokasi e on  c.kode_lokasi=e.kode_lokasi 
inner join hr_loker f on  c.kode_loker=f.kode_loker
left join (select nik,count(nik) as jml 
           from hr_keluarga
           where status_tanggungan='Tanggungan'
           group by nik)l on a.nik=l.nik
left join (select a.nik,sum(nilai) as pph_bln_lalu
	    from gaji_d a
	    inner join gaji_m b on a.no_gaji=b.no_gaji
	    where a.kode_param='PH21' and b.periode<'$periode' and substring(b.periode,1,4)=substring('$periode',1,4)
	    group by a.nik)h on a.nik=h.nik
 left join (select a.nik,sum(nilai) as pph_bln_sd
	    from gaji_d a
	    inner join gaji_m b on a.no_gaji=b.no_gaji
	    where a.kode_param='PH21' and b.periode<='$periode' and substring(b.periode,1,4)=substring('$periode',1,4)
	    group by a.nik)i on a.nik=i.nik
 left join (select a.nik,sum(case dc when 'D' then nilai else -nilai end)  as pdpt_bln_lalu
	    from gaji_d a
	    inner join gaji_m b on a.no_gaji=b.no_gaji
	    inner join gaji_param_d c on a.kode_param=c.kode_param and b.no_dok=c.no_dok
	    where b.periode<'$periode' and substring(b.periode,1,4)=substring('$periode',1,4)
	    group by a.nik)j on a.nik=j.nik
 left join (select a.nik,sum(case dc when 'D' then nilai else -nilai end) as pdpt_bln_sd
	    from gaji_d a
	    inner join gaji_m b on a.no_gaji=b.no_gaji
	    inner join gaji_param_d c on a.kode_param=c.kode_param and b.no_dok=c.no_dok
	    where b.periode<='$periode' and substring(b.periode,1,4)=substring('$periode',1,4)
	    group by a.nik)k on a.nik=k.nik ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$status_nol="";
			if ($status=="Tidak")
			{
				$status_nol=" and nilai<>0 ";
			}
			
				
		$html.="<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='600'>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td colspan='4' align='center' class='header_laporan'><img src='image/poltek.jpg'/></td>
      </tr>
      <tr>
        <td colspan='4' align='center' class='isi_bukti'><strong>SLIP GAJI </strong></td>
      </tr>
      <tr>
        <td colspan='4' align='center' class='isi_bukti'>BULAN ".strtoupper($AddOnLib->ubah_periode($periode))." </td>
  </tr>
      <tr>
        <td width='10%' class='header_laporan'>NIP</td>
        <td width='35%' class='header_laporan'>:&nbsp;$row->nik</td>
        <td width='20%' class='header_laporan'>DEPARTEMEN</td>
        <td width='35%' class='header_laporan'>:&nbsp;$row->jabatan</td>
      </tr>
      <tr>
        <td class='header_laporan'>NAMA</td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>TINGKAT</td>
        <td class='header_laporan'>:&nbsp;$row->tingkat</td>
        <td class='header_laporan'>JENIS GAJI </td>
        <td class='header_laporan'>:&nbsp;Reguler</td>
      </tr>
	  <tr>
        <td class='header_laporan'>JABATAN</td>
        <td class='header_laporan'>:&nbsp;$row->jabatan</td>
        <td class='header_laporan'>SUSUNAN KELUARGA</td>
        <td class='header_laporan'>:&nbsp;$row->status</td>
      </tr>
</table></td>
  </tr>
 
  
  <tr >
    <td height='23' align='center' class='header_laporan'><strong>Rincian Penerimaan</strong></td>
    <td align='center' class='header_laporan'><strong>Rincian Potongan</strong></td>
  </tr>
  <tr >
    <td height='23' align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
	$sql1="SELECT distinct b.nu,a.kode_param,b.nama,a.nilai
FROM gaji_d a
inner join gaji_m c on c.no_gaji = a.no_gaji and c.nik = a.nik and c.no_dok= a.no_dok and c.kode_lokkonsol = a.kode_lokkonsol and c.periode = '$periode'
INNER JOIN gaji_param_d b ON a.kode_param=b.kode_param AND a.no_dok=b.no_dok and a.kode_lokkonsol = b.kode_lokkonsol
WHERE b.jenis='PDPT' AND a.nik='$row->nik' $status_nol order by b.nu ";
	$rs1 = $dbLib->execute($sql1);
	$jum1=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$html.="<tr>
        <td width='50%' class='isi_laporan'>$row1->nama</td>
		<td width='10%' class='isi_laporan'>: Rp.</td>
        <td width='40%' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
		$jum1=$jum1+$row1->nilai;
	}
	$html.="</table></td>
    <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
    $sql2="SELECT distinct b.nu,a.kode_param,b.nama,a.nilai
FROM gaji_d a
inner join gaji_m c on c.no_gaji = a.no_gaji and c.nik = a.nik and c.no_dok= a.no_dok and c.kode_lokkonsol = a.kode_lokkonsol and c.periode = '$periode'
INNER JOIN gaji_param_d b ON a.kode_param=b.kode_param AND a.no_dok=b.no_dok and a.kode_lokkonsol = b.kode_lokkonsol
WHERE b.jenis='POT' AND a.nik='$row->nik' $status_nol order by b.nu";
	$rs2 = $dbLib->execute($sql2);
	$jum2=0;
	while ($row2 = $rs2->FetchNextObject($toupper=false))
	{
		$html.="<tr>
        <td width='50%' class='isi_laporan'>$row2->nama</td>
		<td width='15%' class='isi_laporan'>: Rp.</td>
        <td width='35%' class='isi_laporan' align='right'>".number_format($row2->nilai,0,',','.')."</td>
      </tr>";
		$jum2=$jum2+$row2->nilai;
    }
	$html.="</table></td>
  </tr>
  <tr >
    <td height='23' align='center' class='header_laporan'><table width='100%' border='0' cellpadding='3' cellspacing='2'>
      <tr>
        <td width='50%' class='isi_laporan'>Total Penerimaan </td>
        <td width='10%' class='isi_laporan'>: Rp.</td>
        <td width='40%' align='right' class='isi_laporan'>".number_format($jum1,0,',','.')."</td>
      </tr>
    </table>
    </td>

    <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>
      <tr>
        <td width='50%' class='isi_laporan'>Total Potongan </td>
        <td width='15%' class='isi_laporan'>: Rp.</td>
        <td width='35%' class='isi_laporan' align='right'>".number_format($jum2,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr >
    <td height='23' align='center' class='header_laporan'><table width='100%' border='0' cellpadding='3' cellspacing='2'>
      <tr>
        <td width='50%' class='isi_laporan' >Take Home Pay </td>
        <td width='10%' class='isi_laporan' >: Rp.</td>
        <td width='40%' align='right' class='isi_laporan'>".number_format($jum1-$jum2,0,',','.')."</td>
      </tr>
    </table></td>
    <td align='center' valign='top' class='header_laporan'>&nbsp;</td>
  </tr>
  <tr >
    <td height='23' colspan='2' align='left' class='header_laporan'><table width='100%' border='0'>
  <tr>
    <td width='25%' class='header_laporan'>Rekapitulasi :</td>
    <td width='25%'>&nbsp;</td>
    <td width='25%'>&nbsp;</td>
    <td width='25%'>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>Pph. 21 s/d Bln lalu </td>
    <td class='header_laporan'>Rp. ".number_format($row->pph_bln_lalu,0,',','.')."</td>
    <td class='header_laporan'>Pph. 21 s/d Bln ini </td>
    <td class='header_laporan'>Rp. ".number_format($row->pph_bln_sd,0,',','.')."</td>
  </tr>
  <tr>
    <td class='header_laporan'>Fas Kes s/d bln lalu </td>
    <td class='header_laporan'>Rp.</td>
    <td class='header_laporan'>Fas Kes s/d bln ini </td>
    <td class='header_laporan'>Rp.</td>
  </tr>
  <tr>
    <td class='header_laporan'>Penghasilan s/d bln lalu </td>
    <td class='header_laporan'>Rp. ".number_format($row->pdpt_bln_lalu,0,',','.')."</td>
    <td class='header_laporan'>Penghasilan s/d bln ini </td>
    <td class='header_laporan'>Rp. ".number_format($row->pdpt_bln_sd,0,',','.')."</td>
  </tr>
</table></td>
  </tr>
  <tr >
    <td height='23' colspan='2' align='left' class='header_laporan'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='isi_laporan'>Ditransfer ke : </td>
      </tr>
      <tr>
        <td class='isi_laporan'>Bank $row->bank &nbsp; $row->cabang </td>
      </tr>
      <tr>
        <td class='isi_laporan'>No. A/C $row->no_rek </td>
      </tr>
      <tr>
        <td class='isi_laporan'>a.n $row->nama_rek </td>
      </tr>
    </table></td>
  </tr>
  
  </table><br>";
		}
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_akun,nama,'*' as lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then so_akhir else 0 end as so_akhir_kredit
from glma_tmp ".$this->filter." order by kode_akun ";
		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
