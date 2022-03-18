<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptBuktiJurnal2
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
		$sql="select count(*) ". 
		     "from ju_m a ".$this->filter2;
		
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
		$sql="select a.no_ju,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi,
       a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_setuju,c.nama as nama_setuju,c.jabatan as jabatan_setuju
from ju_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='9' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' align='center' class='header_laporan'>BUKTI JURNAL</td>
        </tr>
	  <tr>
        <td width='100' class='header_laporan'>No Bukti </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_ju</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Periode</td>
        <td class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal1</td>
        </tr>
     
	<tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='50' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='100' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='150' class='header_laporan'><div align='center'>Keterangan </div></td>
    <td width='40' class='header_laporan'><div align='center'>Kode PP </div></td>
    <td width='50' class='header_laporan'><div align='center'>Kode Cust </div></td>
	<td width='50' class='header_laporan'><div align='center'>Kode Vendor </div></td>
    <td width='70' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='70' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_cust,a.kode_vendor,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
from ju_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ju='$row->no_ju'
order by a.dc desc ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,",",".");
			$kredit=number_format($row1->kredit,0,",",".");
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan'>$row1->keterangan</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan'>$row1->kode_cust</td>
	<td class='isi_laporan'>$row1->kode_vendor</td>
    <td class='isi_laporan' align='right'>$debet</td>
    <td class='isi_laporan' align='right'>$kredit</td>
  </tr>";
		$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,",",".");
		$tot_kredit1=number_format($tot_debet,0,",",".");
	  $html.="<tr>
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
  <tr>
    <td colspan='9' align='right'><table width='714' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td width='334'>&nbsp;</td>
        <td width='185'>&nbsp;</td>
        <td width='195'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='header_laporan'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='header_laporan'>Diperiksa Oleh : </td>
        <td class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='header_laporan'>$row->nama_buat</td>
        <td class='header_laporan'>$row->nama_setuju</td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
        <td class='header_laporan'>$row->jabatan_buat</td>
        <td class='header_laporan'>$row->jabatan_setuju</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
			
			$i=$i+1;
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
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
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
