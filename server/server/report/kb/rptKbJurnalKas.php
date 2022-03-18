<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptKbJurnalKas
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
		$sql="select count(a.no_kas) from kas_j a ".$this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$modul=$tmp[1];
		$sql="select a.no_kas as no_bukti,a.no_dokumen,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,c.posted 
		      from kas_j a 
			  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			  inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi ".$this->filter."
		      order by a.no_kas,a.dc desc ";
		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan jurnal transaksi kasbank",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan'><div align='center'>No</div></td>
    <td width='80' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='80' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='60' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='60' height='25' class='header_laporan'><div align='center'>Kode </div></td>
    <td width='170' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode PP</div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode DRK</div></td>
	<td width='25' class='header_laporan'><div align='center'>Posted</div></td>
    <td width='200' class='header_laporan'><div align='center'>Keterangan</div></td>
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
    <td height='20' colspan='9' valign='middle' class='isi_laporan'><div align='right'><strong>Total</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($debet,0,',','.')."</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($kredit,0,',','.')."</strong></div></td>
  </tr>
</table>";
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
