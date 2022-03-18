<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptRekapSimp
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
		
		$sql = "select 1 ";
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
		$sql = "select a.no_simp,d.nama as nsbh,e.nama as loker,a.kode_simp,b.nilai,c.akun_simp,c.jenis
			from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
			inner join kop_simp_jenis c on a.kode_simp=c.kode_simp and a.kode_lokasi=c.kode_lokasi
			inner join kop_agg d on a.kode_agg=d.kode_agg and a.kode_lokasi=d.kode_lokasi
			inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi
			inner join kop_simpangs_d f on b.no_simp=f.no_simp and b.kode_lokasi=f.kode_lokasi and f.dc='D' ".$this->filter.
			" order by c.jenis,a.no_simp ";
		$rs=$dbLib->execute($sql);
		$simp["SP"]="Simpanan Pokok";
		$simp["SS"]="Simpanan Sukarela";
		$simp["SW"]="Simpanan Wajib";
		$tmp=explode(";",$this->filter2);
		$periode=$tmp[0];
		$lokasi=$tmp[1];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan rekapitulasi saldo simpanan",$lokasi,$AddOnLib->ubah_periode($periode));
		$jenis = "";
		while ($row = $rs->FetchNextObject($toupper=false)){
			if ($row->jenis != $jenis){
				$i=1;
				if ($jenis != ""){
					$html.="<tr bgcolor='#F5F5F5'>
								<td class='sum_laporan' colspan='5' align='right'>Total Saldo</td>
								<td class='sum_laporan' align='right'>".number_format($tot,0,",",".")."</td>
							  </tr>
							</table>";
				}
				$html.="<br /><div align='center' class='header_laporan'>".$simp[$row->jenis]." / Akun [".$row->akun_simp."]</div>
						<table width='550' border='1' align='center' cellpadding='0' cellspacing='0' class='kotak'>
						  <tr align='center' bgcolor='#CCCCCC'>
						    <td class='header_laporan' width='5%'>No.</td>
						    <td class='header_laporan' width='18%'>No. Kartu </td>
						    <td class='header_laporan' width='33%'>Nasabah</td>
						    <td class='header_laporan' width='20%'>Lokasi Kerja </td>
						    <td class='header_laporan' width='8%'>Jenis</td>
						    <td class='header_laporan' width='16%'>Nilai</td>
						  </tr>
						  <tr>
							<td class='isi_laporan' align='center'>".$i.".</td>
							<td class='isi_laporan'>".$row->no_simp."</td>
							<td class='isi_laporan'>".$row->nsbh."</td>
							<td class='isi_laporan' align='center'>".$row->loker."</td>
							<td class='isi_laporan' align='center'>".$row->kode_simp."</td>
							<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
						  </tr>";
				$jenis = $row->jenis;
				$tot=$row->nilai;
				$i++;
			}else{
				$html .= "<tr class='isi_laporan'>
							<td class='isi_laporan' align='center'>".$i.".</td>
							<td class='isi_laporan'>".$row->no_simp."</td>
							<td class='isi_laporan'>".$row->nsbh."</td>
							<td class='isi_laporan' align='center'>".$row->loker."</td>
							<td class='isi_laporan' align='center'>".$row->kode_simp."</td>
							<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
						  </tr>";
				$jenis = $row->jenis;
				$tot+=$row->nilai;
				$i++;
			}
		}
		$html.="<tr bgcolor='#F5F5F5'>
					<td class='sum_laporan' colspan='5' align='right'>Total Saldo</td>
					<td class='sum_laporan' align='right'>".number_format($tot,0,",",".")."</td>
				  </tr>
				</table>";
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
