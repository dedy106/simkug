<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptKeluarga2
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
			"from hr_keluarga h inner join karyawan k on h.nik=k.nik ".$this->filter;
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
		$sql = "select h.nik,k.nama as nm1,h.nama as nm2,h.status_family,h.status,date_format(h.tgl_lahir,'%d-%m-%Y') as tgllhr, ".
			"date_format(h.tgl_nikah,'%d-%m-%Y') as tglnkh,h.alamat,h.kota,h.provinsi,h.kodepos,h.no_telp,h.sex,h.status_kerja, ".
			"h.institusi,h.status_tanggungan,h.status_anak ".
			"from hr_keluarga h inner join karyawan k on h.nik=k.nik ".$this->filter.
				" order by k.nik,h.no_urut ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Keluarga",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<div align='center' >";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td height='23' class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NIK</div></td>				
				<td class='header_laporan'><div align='center'>Nama</div></td>
				<td class='header_laporan'><div align='center'>Nama Anggota Keluarga</div></td>
				<td class='header_laporan'><div align='center'>Status</div></td>
				<td class='header_laporan'><div align='center'>Keterangan</div></td>
				<td class='header_laporan'><div align='center'>Tgl Lahir</div></td>
				<td class='header_laporan'><div align='center'>Tgl Nikah</div></td>
				<td class='header_laporan'><div align='center'>Alamat</div></td>
				<td class='header_laporan'><div align='center'>Kota</div></td>
				<td class='header_laporan'><div align='center'>Provinsi</div></td>
				<td class='header_laporan'><div align='center'>Kode Pos</div></td>
				<td class='header_laporan'><div align='center'>Telepon</div></td>
				<td class='header_laporan'><div align='center'>Jenis Kelamin</div></td>
				<td class='header_laporan'><div align='center'>Status Pekerjaan</div></td>
				<td class='header_laporan'><div align='center'>Institusi</div></td>
				<td class='header_laporan'><div align='center'>Status Tanggungan</div></td>
				<td class='header_laporan'><div align='center'>Status Anak</div></td>
				</tr>";
		$nik="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$i."</td>";
			if ($row->nik==$nik)
			{
				$html.="<td class='isi_laporan'>&nbsp</td>	
						<td class='isi_laporan'>&nbsp</td>";
				$nik=$row->nik;
			}else
			{
				$html.="<td class='isi_laporan'>".$row->nik."</td>	
						<td class='isi_laporan'>".$row->nm1."</td>";
				$nik=$row->nik;
			}
			$html.="<td class='isi_laporan'>".$row->nm2."</td>
					<td class='isi_laporan'>".$row->status_family."</td>
				    <td class='isi_laporan'>".$row->status."</td>
					<td class='isi_laporan'>".$row->tgllhr."</td>";
			if (substr($row->tglnkh,0,2)=='00')
			{
				$html.="<td class='isi_laporan'>-</td>";
			}else
			{
				$html.="<td class='isi_laporan'>".$row->tglnkh."</td>";
			}
			$html.="<td class='isi_laporan'>".$row->alamat."</td>
					<td class='isi_laporan'>".$row->kota."</td>
					<td class='isi_laporan'>".$row->provinsi."</td>
					<td class='isi_laporan'>".$row->kodepos."</td>
				    <td class='isi_laporan'>".$row->no_telp."</td>
					<td class='isi_laporan'>".$row->sex."</td>
					<td class='isi_laporan'>".$row->status_kerja."</td>
					<td class='isi_laporan'>".$row->institusi."</td>
					<td class='isi_laporan'>".$row->status_tanggungan."</td>
					<td class='isi_laporan'>".$row->status_anak."</td>
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
