<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptWriteOff
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
		
		$sql =  "select count(*) ".
				"from mhs m inner join armhs_m b on m.npm=b.ref1 and m.kode_lokasi=b.kode_lokasi ".
						   "inner join armhs_d d on b.no_invoice=d.no_invoice and b.kode_lokasi=d.kode_lokasi ".
						   "inner join ar_wo s on b.no_invoice=s.ref1 and b.kode_lokasi=s.kode_lokasi ".
						   "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".$this->filter;
		
		$rs = $dbLib->execute($sql);		
		//error_log($sql);
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
		$sql =  "select m.npm,m.nama_mhs,c.kode_ang,c.nama_ang,d.semester,m.kode_jur,s.ref1,s.p_bd,s.nilai ".
				"from mhs m inner join armhs_m b on m.npm=b.ref1 and m.kode_lokasi=b.kode_lokasi ".
						   "inner join armhs_d d on b.no_invoice=d.no_invoice and b.kode_lokasi=d.kode_lokasi ".
						   "inner join ar_wo s on b.no_invoice=s.ref1 and b.kode_lokasi=s.kode_lokasi ".
						   "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".$this->filter.
				" order by m.npm,s.no_wo ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		//error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Write Off Piutang",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NPM</div></td>
				<td class='header_laporan'><div align='center'>Nama Mahasiswa</div></td>
				<td class='header_laporan'><div align='center'>Angkatan</div></td>
				<td class='header_laporan'><div align='center'>Semester</div></td>
				<td class='header_laporan'><div align='center'>Jurusan</div></td>
				<td class='header_laporan'><div align='center'>No Invoice/KTS</div></td>			
				<td class='header_laporan'><div align='center'>Prosentase Susut</div></td>
				<td class='header_laporan'><div align='center'>Nilai</div></td>
				</tr>";		
		$i = $start+1;	
		$invoice="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($invoice=="")
			{
				$invoice=$row->ref1;
				$npm=$row->npm;
				$mhs=$row->nama_mhs;
				$kode_ang=$row->kode_ang;
				$nm_ang=$row->nama_ang;
				$smtr=$row->semester;
				$jur=$row->kode_jur;
				$psusut=$row->p_bd;
				$nilai=$row->nilai;
			}else
			{
				if ($row->ref1==$invoice)
				{
					$invoice=$row->ref1;
					$npm=$row->npm;
					$mhs=$row->nama_mhs;
					$kode_ang=$row->kode_ang;
					$nm_ang=$row->nama_ang;
					$smtr=$row->semester;
					$jur=$row->kode_jur;
					$psusut=$row->p_bd;
					$nilai=$row->nilai;
				}else
				{
					$html.="<tr>
							<td height='20' class='isi_laporan'>".$i."</td>
							 <td class='isi_laporan'>".$npm."</td>
							 <td class='isi_laporan'>".$mhs."</td>
							 <td class='isi_laporan'>".$kode_ang." ".$nm_ang."</td>
							 <td class='isi_laporan'>".$smtr."</td>			 
							 <td class='isi_laporan'>".$jur."</td>
							 <td class='isi_laporan'>".$invoice."</td>
							 <td class='isi_laporan'>".$psusut."</td>
							 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
							</tr>";
					$invoice=$row->ref1;
					$npm=$row->npm;
					$mhs=$row->nama_mhs;
					$kode_ang=$row->kode_ang;
					$nm_ang=$row->nama_ang;
					$smtr=$row->semester;
					$jur=$row->kode_jur;
					$psusut=$row->p_bd;
					$nilai=$row->nilai;		
					$i++;
				}				
			}
		}
		$html.="<tr>
				<td height='20' class='isi_laporan'>".$i."</td>
				 <td class='isi_laporan'>".$npm."</td>
				 <td class='isi_laporan'>".$mhs."</td>
				 <td class='isi_laporan'>".$kode_ang." ".$nm_ang."</td>
				 <td class='isi_laporan'>".$smtr."</td>			 
				 <td class='isi_laporan'>".$jur."</td>
				 <td class='isi_laporan'>".$invoice."</td>
				 <td class='isi_laporan'>".$psusut."</td>
				 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				</tr>";
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
