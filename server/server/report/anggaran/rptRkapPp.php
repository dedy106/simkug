<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_anggaran_rptRkapPp
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
		$sql = "select count(kode_lokfa) from fa_lokasi where nik_user='$nik_user'";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select kode_lokasi,kode_pp,fn_spasi(nama,level_spasi) as nama,n1,n2,n3,n4 from pp_tmp where nik_user='$nik_user'";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$bentuk=$tmp[2];
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Rekapitulasi Rencana Kerja dan Anggaran",$this->lokasi,$tahun);
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='400' rowspan='2'  class='header_laporan'><div align='center'>Nama PP</div></td>
    <td height='25' colspan='5' class='header_laporan'><div align='center'>Anggaran</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' height='25' class='header_laporan'><div align='center'>Triwulan I </div></td>
    <td width='100' class='header_laporan'><div align='center'>Triwulan II </div></td>
    <td width='100' class='header_laporan'><div align='center'>Triwulan III </div></td>
    <td width='100' class='header_laporan'><div align='center'>Triwulan IV </div></td>
    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$total=number_format($row->n1+$row->n2+$row->n3+$row->n4,0,",",".");
			}
			$html.="<tr >
    <td  class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
    <td height='23' class='isi_laporan' align='right'>$n1</td>
    <td class='isi_laporan' align='right'>$n2</td>
    <td class='isi_laporan' align='right'>$n3</td>
    <td class='isi_laporan' align='right'>$n4</td>
    <td class='isi_laporan' align='right'>$total</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama_akun,a.n1,a.n2,a.n3,a.n4
from glma_drk_tmp a
inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca'
order by a.kode_akun ";
				error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$n1=number_format($row1->n1,0,",",".");
					$n2=number_format($row1->n2,0,",",".");
					$n3=number_format($row1->n3,0,",",".");
					$n4=number_format($row1->n4,0,",",".");
					$total=number_format($row1->n1+$row1->n2+$row1->n3+$row1->n4,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama_akun;
					$html.="<tr>
    <td  class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
    <td height='23' class='detail_laporan' align='right'>$n1</td>
    <td class='detail_laporan' align='right'>$n2</td>
    <td class='detail_laporan' align='right'>$n3</td>
    <td class='detail_laporan' align='right'>$n4</td>
    <td class='detail_laporan' align='right'>$total</td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		$html.="</table>";
		
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
