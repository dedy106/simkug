<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptCashFlow
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
		
		if ($this->filter2=='COA')
		{
			$sql = "select count(kode_neraca) from neraca ".$this->filter;
		}else
		{
			$sql = "select count(n.kode_neraca) ".
					"from neraca n left outer join relakun r on n.kode_neraca=r.kode_neraca and n.kode_fs=r.kode_fs and n.kode_lokasi=r.kode_lokasi ".
					"left outer join masakun m on r.kode_akun=m.kode_akun and r.kode_lokasi=m.kode_lokasi ".$this->filter;
		}
		$rs = $dbLib->execute($sql);		
		//error_log($this->filter2." ".$sql);
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
		if ($this->filter2=='COA')
		{
			$sql = "select kode_neraca,nama,jenis_akun,modul,level_spasi from neraca ".$this->filter." order by rowindex ";
		}else
		{
			$sql = "select n.kode_neraca,n.nama as nm,m.nama as nmakun,r.kode_akun,m.modul,m.jenis,m.kode_curr,m.block,level_spasi ".
					"from neraca n left outer join relakun r on n.kode_neraca=r.kode_neraca and n.kode_fs=r.kode_fs and n.kode_lokasi=r.kode_lokasi  ".
					"left outer join masakun m on r.kode_akun=m.kode_akun and r.kode_lokasi=m.kode_lokasi ".$this->filter." order by n.rowindex,r.kode_akun ";
		}			
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		//error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Struktur Arus Kas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		if ($this->filter2=='COA')
		{
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
					<tr bgcolor='#CCCCCC'>
					 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
					 <td width='400' class='header_laporan'><div align='center'>Nama</div></td>
					 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
					 <td width='60' class='header_laporan'><div align='center'>Modul</div></td>
					</tr>";		
			while ($row = $rs->FetchNextObject($toupper=false))
			{
			    $html.="<tr>
						 <td height='20' class='isi_laporan'>".$row->kode_neraca."</td>
						 <td class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
						 <td class='isi_laporan'>".$row->jenis_akun."</td>
						 <td class='isi_laporan'>".$row->modul."</td>
						</tr>";
			}
			$html.="</table>";
		}else
		{
			$html.="<table width='730' border='0' cellspacing='0' cellpadding='0' class='kotak'>
					<tr>
					 <td width='60' height='23' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='350' class='header_laporan'><div align='center'>&nbsp;</div></td>					 
					 <td width='60' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='50' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='100' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='60' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='50' class='header_laporan'><div align='center'>&nbsp;</div></td>
					</tr>";
			$length=0;
			$cek=false;
			$jumrow=1;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
			    if ($row->kode_akun=="")
				{
					if ($cek)
					{
						$html.="</table></td>";
						$html.="</tr>";
					}
					$html.="<tr>
							 <td height='20' class='isi_laporan'>".$row->kode_neraca."</td>
							 <td class='isi_laporan'>".$AddOnLib->spasi($row->nm,$row->level_spasi)."</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							</tr>";
					$length=strlen($row->kode_neraca);
					$kode=substr($row->kode_neraca,0,$length);
					$cek=false;
					$firstrow=true;
				}else
				{
					
					if (substr($row->kode_neraca,0,$length)==$kode)
					{						
						if ($firstrow)
						{
							$html.="<tr><td colspan='7'>";
							$html.="<table border='1' width='730' cellspacing='0' cellpadding='0' class='kotak'>
								<tr bgcolor='#CCCCCC'>
								 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
								 <td width='350' class='header_laporan'><div align='center'>Nama</div></td>
								 <td width='60' class='header_laporan'><div align='center'>Neraca</div></td>
								 <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
								 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
								 <td width='60' class='header_laporan'><div align='center'>Curr</div></td>
								 <td width='50' class='header_laporan'><div align='center'>Block</div></td>
								</tr>";
							$html.="<tr>
								 <td height='20' class='isi_laporan'>".$row->kode_akun."</td>
								 <td class='isi_laporan'>".$AddOnLib->spasi($row->nmakun,$row->level_spasi)."</td>
								 <td class='isi_laporan'>".$row->kode_neraca."</td>
								 <td class='isi_laporan'>".$row->modul."</td>
								 <td class='isi_laporan'>".$row->jenis."</td>
								 <td class='isi_laporan'>".$row->kode_curr."</td>
								 <td class='isi_laporan'>".$row->block."</td>
								</tr>";
								
						}else
						{
								
							if ($jumrow==1)
							{
								$html.="<tr><td colspan='7'>";
								$html.="<table border='1' width='730' cellspacing='0' cellpadding='0' class='kotak'>
									<tr bgcolor='#CCCCCC'>
									 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
									 <td width='350' class='header_laporan'><div align='center'>Nama</div></td>
									 <td width='60' class='header_laporan'><div align='center'>Neraca</div></td>
									 <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
									 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
									 <td width='60' class='header_laporan'><div align='center'>Curr</div></td>
									 <td width='50' class='header_laporan'><div align='center'>Block</div></td>
									</tr>";	
							}
							$html.="<tr>
								 <td height='20' class='isi_laporan'>".$row->kode_akun."</td>
								 <td class='isi_laporan'>".$AddOnLib->spasi($row->nmakun,$row->level_spasi)."</td>
								 <td class='isi_laporan'>".$row->kode_neraca."</td>
								 <td class='isi_laporan'>".$row->modul."</td>
								 <td class='isi_laporan'>".$row->jenis."</td>
								 <td class='isi_laporan'>".$row->kode_curr."</td>
								 <td class='isi_laporan'>".$row->block."</td>
								</tr>";
							if ($jumrow==50)
							{
								$html.="</table></td>";
								$html.="</tr>";
							}	
						}
					}
					$cek=true;					
					$firstrow=false;
					
				}
				$jumrow++;
			}
			$html.="</table>";
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
