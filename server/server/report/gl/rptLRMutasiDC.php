<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptLRMutasiDC
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
		$sql = "select 1 ";
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
		$periode=$tmp[1];
		$bentuk=$tmp[4];
		$level_lap=$tmp[5];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
       case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,n2,n3,
       case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4
from neraca_tmp 
where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
order by rowindex";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan laba rugi mutasi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='400' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>So Awal</div></td>
<td width='100' class='header_laporan'><div align='center'>Debet</div></td>
<td width='100' class='header_laporan'><div align='center'>Kredit</div></td>
<td width='100' class='header_laporan'><div align='center'>So Akhir</div></td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			$n1="";$n2="";$n3="";$n4="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
			}
			
			$html.="<tr>
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
    <td class='isi_laporan'><div align='right'>$n1</div></td>
<td class='isi_laporan'><div align='right'>$n2</div></td>
<td class='isi_laporan'><div align='right'>$n3</div></td>
<td class='isi_laporan'><div align='right'>$n4</div></td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama,case c.jenis_akun when  'Pendapatan' then -a.so_awal else a.so_awal end as so_awal,a.debet,a.kredit,
       case c.jenis_akun when  'Pendapatan' then -a.so_akhir else a.so_akhir end as so_akhir
from glma_tmp a
inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join neraca c on b.kode_neraca=c.kode_neraca and b.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi
where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user' and a.so_akhir<>0
order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_awal=number_format($row1->so_awal,0,",",".");
					$debet=number_format($row1->debet,0,",",".");
					$kredit=number_format($row1->kredit,0,",",".");
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					$html.="<tr>
<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
<td class='detail_laporan'><div align='right'>$so_awal</div></td>
<td class='detail_laporan'><div align='right'>$debet</div></td>
<td class='detail_laporan'><div align='right'>$kredit</div></td>
<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
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
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1,n2,n3,n4,level_spasi from neraca_tmp where modul='A' order by rowindex ";
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
