<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptDftrMhs
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(*) from mhs m inner join angkatan a on m.kode_ang=a.kode_ang and m.kode_lokasi=a.kode_lokasi ".
				"inner join jurusan j on m.kode_jur=j.kode_jur and a.kode_jur=j.kode_jur and a.kode_lokasi=j.kode_lokasi ".
				"inner join lokasi l on m.kode_lokasi=l.kode_lokasi ".$this->filter;
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
		$sql = "select m.npm,m.nama_mhs,m.no_ujian,a.nama_ang,m.semester,m.status,m.status_baru,j.nama_jur,m.keterangan,l.nama as nmlokasi ".
				"from mhs m inner join angkatan a on m.kode_ang=a.kode_ang and m.kode_lokasi=a.kode_lokasi ".
				"inner join jurusan j on m.kode_jur=j.kode_jur and a.kode_jur=j.kode_jur and a.kode_lokasi=j.kode_lokasi ".
				"inner join lokasi l on m.kode_lokasi=l.kode_lokasi ".$this->filter.
				" order by m.npm ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Daftar Mahasiswa",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NIM</div></td>
				<td class='header_laporan'><div align='center'>Nama</div></td>
				<td class='header_laporan'><div align='center'>No. Ujian</div></td>
				<td class='header_laporan'><div align='center'>Angkatan</div></td>
				<td class='header_laporan'><div align='center'>Semester</div></td>
				<td class='header_laporan'><div align='center'>Status</div></td>
				<td class='header_laporan'><div align='center'>Status Baru</div></td>
				<td class='header_laporan'><div align='center'>Jurusan</div></td>
				<td class='header_laporan'><div align='center'>Lokasi</div></td>
				<td class='header_laporan'><div align='center'>Keterangan</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$i."</td>
					<td class='isi_laporan'>".$row->npm."</td>
				    <td class='isi_laporan'>".$row->nama_mhs."</td>
					<td class='isi_laporan'>".$row->no_ujian."</td>
					<td class='isi_laporan'>".$row->nama_ang."</td>
					<td class='isi_laporan'>".$row->semester."</td>
					<td class='isi_laporan'>".$row->status."</td>
					<td class='isi_laporan'>".$row->status_baru."</td>
					<td class='isi_laporan'>".$row->nama_jur."</td>
					<td class='isi_laporan'>".$row->nmlokasi."</td>
					<td class='isi_laporan'>".$row->keterangan."</td>
				  </tr>";
			
			$i=$i+1;
		}
		$html.="</table>";
		$html .= "</div>";
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
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
