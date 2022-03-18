<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptBbKegiatan
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
		$sql = "select count(*) as jum 
from anggaran_d a
inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and(substring(b.tahun,1,4) = '$tahun')
inner join lokasi c on a.kode_lokasi=c.kode_lokasi 
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.jenis='$jenis' ".$this->filter." 
group by a.kode_drk,a.kode_lokasi,b.nama,c.nama ";
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
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$dbname=$tmp[5];
		$realisasi=$tmp[6];
		if ($jenis=="Investasi")
			{$jenis="Neraca"; }
		$sql = "select a.kode_drk,a.kode_lokasi,b.nama as nama_drk,c.nama as nama_lokasi,sum(ifnull(case when dc='D' then nilai else -nilai end,0)) as so_awal
from anggaran_d a
inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and(substring(b.tahun,1,4) = '$tahun')
inner join lokasi c on a.kode_lokasi=c.kode_lokasi 
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.jenis='$jenis' ".$this->filter." 
group by a.kode_drk,a.kode_lokasi,b.nama,c.nama
order by a.kode_drk";
		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan buku besar drk",$this->lokasi,$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' style='border-collapse: collapse' bordercolor='#111111'>
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Tahun</td>
    <td colspan='6' class='header_laporan'>$tahun</td>
  </tr>
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Kode RKM </td>
    <td colspan='6' class='header_laporan'>$row->kode_drk</td>
  </tr>
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Nama RKM </td>
    <td colspan='6' class='header_laporan'>$row->nama_drk</td>
  </tr>
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Kode Lokasi </td>
    <td colspan='6' class='header_laporan'>$row->kode_lokasi - $row->nama_lokasi</td>
  </tr>
  <tr>
    <td height='23' colspan='7' class='header_laporan'><div align='right'>Saldo Awal </div></td>
    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>
    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='70' class='header_laporan'><div align='center'>Kode Dept</div></td>
    <td width='70' class='header_laporan'><div align='center'>Kode AKun</div></td>
    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>
  </tr>
  
";
			if ($realisasi=="Anggaran")
			{
				$tabel ="(select * from angg_d where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_drk='$row->kode_drk' ".$kode_pp.$kode_drk.$periode." )";
			}
			else
			{
				$tabel ="(select * from gldt_h where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_drk='$row->kode_drk' ".$kode_pp.$kode_drk.$periode."
union all 
select * from gldt where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_drk='$row->kode_drk' ".$kode_pp.$kode_drk.$periode." ) ";
			}
			if ($dbname=="mysqlt")
			{
				$sql="select a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit from $tabel a order by a.tanggal ";
			}
			error_log($sql);
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_akun."</td>
    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row1->kredit,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		//$html = str_replace(chr(9),"",$html);
		//return $html;
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
