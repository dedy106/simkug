<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_budget_rptBB
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
		$sql = "select count(kode_akun) as jum from glma_tmp ".$this->filter;
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
		$sql = "select * from glma_tmp ".$this->filter." and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";	
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$filter2 = explode(";",$this->filter2);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan buku besar",$this->lokasi,$periode);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<center><table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr>
    <td height='23' colspan='9' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>Periode </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Akun  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Lokasi </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
    <td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>
  </tr>";
			$tabel ="(select * from agg_gldt $filter2[0])";
			
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
       case when a.dc='D' then nilai else 0 end as debet,
       case when a.dc='C' then nilai else 0 end as kredit
from $tabel a
where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' ";
			if ($filter[1] == "Tanggal, No. Bukti")
				$sql.="order by a.tanggal,a.no_bukti";
			else $sql.="order by a.tanggal,a.no_dokumen";
			error_log($sql);
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='20' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row1->kredit,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
  </tr>";
			}
			echo "<tr>
    <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'></td>
  </tr>
  <tr>
    <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
  </tr>
</table><br></center>";
			
			$i=$i+1;
		}
		
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
