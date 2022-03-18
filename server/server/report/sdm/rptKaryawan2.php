<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptKaryawan2
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
		
		$sql = "select count(*) ".
			"from karyawan k inner join lokasi l on k.kode_lokasi=l.kode_lokasi ".
							"inner join pp p on k.kode_pp=p.kode_pp and k.kode_lokasi=p.kode_lokasi ".
							"inner join hr_loker h on k.kode_loker=h.kode_loker and k.kode_lokasi=h.kode_lokasi ".$this->filter;
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
		$sql = "select k.nik,k.kode_lokasi,k.kode_pp,k.kode_loker,k.nama,k.jabatan,k.alamat,k.kota,k.propinsi,k.kode_pos,k.no_telp, ".
			"k.no_ponsel,k.email,k.npwp,k.bank,k.cabang,k.no_rek,k.nama_rek,k.agama,date_format(k.tgl_lahir,'%d-%m-%Y') as tgllhr, ".
			"k.tempat_lahir,date_format(k.tgl_masuk,'%d-%m-%Y') as tglmsk,k.status,k.grade,k.golongan_darah,k.suku,k.asal_lamaran ".
			"from karyawan k inner join lokasi l on k.kode_lokasi=l.kode_lokasi ".
							"inner join pp p on k.kode_pp=p.kode_pp and k.kode_lokasi=p.kode_lokasi ".
							"inner join hr_loker h on k.kode_loker=h.kode_loker and k.kode_lokasi=h.kode_lokasi ".$this->filter.
				" order by k.kode_lokasi,k.nik ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Karyawan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<div align='center' >";
		$html.="<table width='2000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td height='23' class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NIK</div></td>				
				<td class='header_laporan'><div align='center'>Nama</div></td>
				<td class='header_laporan'><div align='center'>Jabatan</div></td>
				<td class='header_laporan'><div align='center'>Alamat</div></td>
				<td class='header_laporan'><div align='center'>Kota</div></td>
				<td class='header_laporan'><div align='center'>Provinsi</div></td>
				<td class='header_laporan'><div align='center'>Kode Pos</div></td>
				<td class='header_laporan'><div align='center'>Telepon</div></td>
				<td class='header_laporan'><div align='center'>No. Ponsel</div></td>
				<td class='header_laporan'><div align='center'>e-Mail</div></td>
				<td class='header_laporan'><div align='center'>NPWP</div></td>
				<td class='header_laporan'><div align='center'>Bank</div></td>
				<td class='header_laporan'><div align='center'>Cabang</div></td>
				<td class='header_laporan'><div align='center'>Rekening</div></td>
				<td class='header_laporan'><div align='center'>Atas Nama</div></td>
				<td class='header_laporan'><div align='center'>Agama</div></td>
				<td class='header_laporan'><div align='center'>Tgl Lahir</div></td>
				<td class='header_laporan'><div align='center'>Tempat Lahir</div></td>
				<td class='header_laporan'><div align='center'>Tgl Masuk</div></td>
				<td class='header_laporan'><div align='center'>Status</div></td>
				<td class='header_laporan'><div align='center'>Grade</div></td>
				<td class='header_laporan'><div align='center'>Gol. Darah</div></td>
				<td class='header_laporan'><div align='center'>Suku</div></td>
				<td class='header_laporan'><div align='center'>Asal Lamaran</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$i."</td>
					<td class='isi_laporan'>".$row->nik."</td>				    
					<td class='isi_laporan'>".$row->nama."</td>
					<td class='isi_laporan'>".$row->jabatan."</td>
					<td class='isi_laporan'>".$row->alamat."</td>
					<td class='isi_laporan'>".$row->kota."</td>
				    <td class='isi_laporan'>".$row->propinsi."</td>
					<td class='isi_laporan'>".$row->kode_pos."</td>
					<td class='isi_laporan'>".$row->no_telp."</td>
					<td class='isi_laporan'>".$row->no_ponsel."</td>
					<td class='isi_laporan'>".$row->email."</td>
					<td class='isi_laporan'>".$row->npwp."</td>
					<td class='isi_laporan'>".$row->bank."</td>
				    <td class='isi_laporan'>".$row->cabang."</td>
					<td class='isi_laporan'>".$row->no_rek."</td>
					<td class='isi_laporan'>".$row->nama_rek."</td>
					<td class='isi_laporan'>".$row->agama."</td>
					<td class='isi_laporan'>".$row->tgllhr."</td>
					<td class='isi_laporan'>".$row->tempat_lahir."</td>
					<td class='isi_laporan'>".$row->tglmsk."</td>
				    <td class='isi_laporan'>".$row->status."</td>
					<td class='isi_laporan'>".$row->grade."</td>
					<td class='isi_laporan'>".$row->golongan_darah."</td>
					<td class='isi_laporan'>".$row->suku."</td>
					<td class='isi_laporan'>".$row->asal_lamaran."</td>
				  </tr>";			
			$i++;
		}
		$html .= "</table>";
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
