<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptJurnal3
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$sql="select count(a.no_ju) as jum ". 
		         "from ju_m a ".
				 "inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi ".
			     "inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi ".$filter;
		error_log($sql);	
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$sql="select a.no_ju as no_bukti,a.no_dokumen,c.nama,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.kode_akun,b.kode_pp,b.kode_drk,a.posted,b.keterangan,case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit ". 
		         "from ju_m a ".
				 "inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi ".
			     "inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi ".$filter.
				 "order by $urut ";
			
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		//$i = $start+1;
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan jurnal transaksi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'><div align='center'>No</div></td>
    <td width='70' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='70' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='50' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='50' height='25' class='header_laporan'><div align='center'>Kode </div></td>
    <td width='150' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='30' class='header_laporan'><div align='center'>Kode PP</div></td>
	<td width='40' class='header_laporan'><div align='center'>Kode RKM</div></td>
  <td width='30' class='header_laporan'><div align='center'>Posted</div></td>
    <td width='150' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$debet=0;
		$kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama))."</td>
    <td valign='middle' class='isi_laporan'>$row->kode_pp</td>
	<td valign='middle' class='isi_laporan'>$row->kode_drk</td>
	  <td valign='middle' class='isi_laporan' align='center'>$row->posted</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='10' valign='middle' class='isi_laporan'><div align='right'><strong>Total</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($debet,0,',','.')."</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($kredit,0,',','.')."</strong></div></td>
  </tr>
</table>";
		//$html = str_replace(chr(9),"",$html);
		return "";
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
