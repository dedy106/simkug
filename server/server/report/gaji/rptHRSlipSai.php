<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gaji_rptHRSlip
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
		$sql = "select count(kode_akun) as jum from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
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
INNER JOIN hr_jabatan d ON c.kode_jabs=d.kode_jab 
INNER JOIN hr_lokasi e ON  c.kode_lokasi=e.kode_lokasi 
INNER JOIN hr_loker f ON  c.kode_loker=f.kode_loker ";
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
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "SELECT a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.bank,b.cabang,b.no_rek,b.nama_rek,g.gadas,a.nik,b.nama,e.nama AS lokasi,f.nama AS loker,c.tingkat,d.nama AS jabatan
FROM gaji_m a 
INNER JOIN karyawan b ON a.nik=b.nik 
INNER JOIN hr_dinas2 c ON a.nik=c.nik 
INNER JOIN hr_jabatan d ON c.kode_jabs=d.kode_jab 
INNER JOIN hr_lokasi e ON  c.kode_lokasi=e.kode_lokasi 
INNER JOIN hr_loker f ON  c.kode_loker=f.kode_loker
inner join hr_dinas2 g on a.nik=g.nik ";
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		$html.="<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td height='34' colspan='2' align='center' class='header_laporan'><strong>SLIP GAJI </strong></td>
        </tr>
      <tr>
        <td width='133' class='header_laporan'>Tanggal </td>
        <td width='479' class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
      <tr>
        <td class='header_laporan'>Periode  </td>
        <td class='header_laporan'>:&nbsp;$row->periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>NIK </td>
        <td class='header_laporan'>:&nbsp;$row->nik</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tingkat</td>
        <td class='header_laporan'>:&nbsp;$row->tingkat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jabatan Struktural </td>
        <td class='header_laporan'>:&nbsp;$row->jabatan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Gaji Dasar </td>
        <td class='header_laporan'>:&nbsp;".number_format($row->gadas,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi Kerja </td>
        <td class='header_laporan'>:&nbsp;$row->lokasi</td>
      </tr>
      <tr>
        <td class='header_laporan'>Unit Kerja </td>
        <td class='header_laporan'>:&nbsp;$row->loker</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='23' colspan='2' align='center' class='header_laporan'><strong>Perincian Gaji </strong></td>
  </tr>
  
  <tr >
    <td height='23' align='center' class='header_laporan'><strong>Pendapatan</strong></td>
    <td align='center' class='header_laporan'><strong>Potongan</strong></td>
  </tr>
  <tr >
    <td height='23' align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
	$sql1="SELECT a.kode_param,b.nama,a.nilai
FROM gaji_d a
INNER JOIN gaji_param_d b ON a.kode_param=b.kode_param AND a.no_dok=b.no_dok
WHERE b.jenis='PDPT' AND a.nik='96720140'";
	$rs1 = $dbLib->execute($sql1);
	$jum1=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$html.="<tr>
        <td width='69%' class='isi_laporan'>$row1->nama</td>
        <td width='31%' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
		$jum1=$jum1+$row1->nilai;
	}
	$html.="</table></td>
    <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
    $sql2="SELECT a.kode_param,b.nama,a.nilai
FROM gaji_d a
INNER JOIN gaji_param_d b ON a.kode_param=b.kode_param AND a.no_dok=b.no_dok
WHERE b.jenis='POT' AND a.nik='96720140'";
	$rs2 = $dbLib->execute($sql2);
	$jum2=0;
	while ($row2 = $rs2->FetchNextObject($toupper=false))
	{
		$html.="<tr>
        <td width='69%' class='isi_laporan'>$row2->nama</td>
        <td width='31%' class='isi_laporan' align='right'>".number_format($row2->nilai,0,',','.')."</td>
      </tr>";
		$jum2=$jum2+$row2->nilai;
    }
	$html.="</table></td>
  </tr>
  <tr >
    <td  align='center' valign='top' class='header_laporan'><table width='100%' border='0'>
      <tr>
        <td width='69%' class='header_laporan'>Total Pendapatan</td>
        <td width='31%' class='header_laporan' align='right'>".number_format($jum1,0,',','.')."</td>
      </tr>
    </table></td>
    <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>
      <tr>
        <td width='69%' class='header_laporan'>Total Potongan</td>
        <td width='31%' class='header_laporan' align='right'>".number_format($jum2,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>";
  $terbilang=$AddOnLib->terbilang($jum1-$jum2);
  $html.="<tr >
    <td height='23' colspan='2' align='left' class='header_laporan'><table width='100%' border='0'>
      <tr>
        <td width='16%' class='header_laporan'>Gaji Netto </td>
        <td width='84%' class='header_laporan'>Rp ".number_format($jum1-$jum2,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Terbilang</td>
        <td class='header_laporan'>$terbilang</td>
      </tr>
    </table></td>
  </tr>
  <tr >
    <td height='23' colspan='2' align='left' class='header_laporan'><table width='100%' border='0'>
	<tr>
        <td valign='top'>&nbsp;</td>
        <td colspan='2' valign='top' class='header_laporan' align='center'>Bandung, $row->tanggal</td>
        </tr>
      <tr>
        <td width='50%' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td colspan='2' class='header_laporan'>Telah ditransfer ke :</td>
          </tr>
          <tr>
            <td width='31%' class='header_laporan'>Bank</td>
            <td width='69%' class='header_laporan'>$row->bank Cab. $row->cabang</td>
          </tr>
          <tr>
            <td class='header_laporan'>No Rekening </td>
            <td class='header_laporan'>$row->no_rek</td>
          </tr>
		  <tr>
            <td class='header_laporan'>Atas Nama</td>
            <td class='header_laporan'>$row->nama_rek</td>
          </tr>
        </table></td>
        <td width='25%' valign='top'><table width='100%' border='0'>
          <tr>
            <td align='center' class='header_laporan' align='center'>Disetujui</td>
          </tr>
          <tr>
            <td height='40' class='header_laporan'>&nbsp;</td>
          </tr>
          <tr>
            <td class='header_laporan' align='center'>nik</td>
          </tr>
          <tr>
            <td class='header_laporan' align='center'>jabatan</td>
          </tr>
        </table></td>
        <td width='25%' valign='top'><table width='100%' border='0'>
          <tr>
            <td align='center' class='header_laporan' align='center'>Diterima</td>
          </tr>
          <tr>
            <td height='40' class='header_laporan'>&nbsp;</td>
          </tr>
          <tr>
            <td class='header_laporan' align='center'>$row->nama</td>
          </tr>
          <tr>
            <td class='header_laporan' align='center'>$row->jabatan</td>
          </tr>
        </table></td>
      </tr>

    </table></td>
  </tr></table>";
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
