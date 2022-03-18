<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptKbBb
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
		$sql = "select count(a.kode_akun) as jum from glma_tmp a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ".$this->filter." and (b.kode_flag='001' or b.kode_flag='009') ";
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
		$sql = "select * from glma_tmp a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ".$this->filter." and (b.kode_flag='001' or b.kode_flag='009') and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) order by a.kode_akun ";
		/*error_log($sql);*/
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan buku besar kasbank",$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
					  <tr>
					    <td height='23' colspan='8' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
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
					    <td height='23' colspan='6' class='header_laporan'><div align='right'>Saldo Awal </div></td>
					    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
					  </tr>
					  <tr bgcolor='#CCCCCC'>
					    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>
					    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>
					    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>
					    <td width='70' class='header_laporan'><div align='center'>Kode PP</div></td>
					    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
					    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
					    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>
					  </tr>";
			$sql="select a.no_kas as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.keterangan,
				       case when a.dc='D' then nilai else 0 end as debet,
				       case when a.dc='C' then nilai else 0 end as kredit
					from kas_j a
					where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi'
					order by a.tanggal ";
			/*error_log($sql);*/
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$html.="<tr>
					    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
					    <td height='20' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
					    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
					    <td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
					    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</div></td>
					    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row1->kredit,0,',','.')."</div></td>
					    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
					  </tr>";
			}
			$html.="<tr>
					    <td height='20' colspan='4' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
					    <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
					    <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
					    <td valign='top' class='sum_laporan'></td>
					  </tr>
					  <tr>
					    <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
					    <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
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