<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptPjPtg
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
		$sql="select count(a.no_ptg)
from ptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter;
		//error_log($sql);
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
		$sql="select a.no_ptg,a.no_dokumen,a.kode_pp,a.no_pj,a.keterangan,a.nik_buat,a.nik_setuju,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_lokasi,
		b.nama as nama_pp,d.nama as nama_pengaju,e.nama as nama_setuju,d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju, f.logo, a.nilai, a.nilai_kas, f.kota
from ptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi 
inner join lokasi f on f.kode_lokasi = a.kode_lokasi ".$this->filter." order by a.no_pj"; 
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='8' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
		<td><img src='server/media/$row->logo'/></td>
        <td class='judul_bukti' align='center'>PERTANGGUNGAN PANJAR</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		<tr>
        <td class='header_laporan'>Kode PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp;$row->nama_pp</td>
        </tr>
      <tr>
        <td width='120' class='header_laporan'>No Pertanggungan </td>
        <td width='476' class='header_laporan'>:&nbsp;$row->no_ptg</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
     <tr>
        <td class='header_laporan'>No Panjar </td>
        <td class='header_laporan'>:&nbsp;$row->no_pj</td>
        </tr>
        <tr>
        <td class='header_laporan'>Nilai Panjar </td>
        <td class='header_laporan'>:&nbsp;Rp.".number_format($row->nilai,0,",",".")."</td>
		</tr>
		<tr>
        <td class='header_laporan'>Nilai Kas</td>
        <td class='header_laporan'>:&nbsp;Rp.".number_format($row->nilai_kas,0,",",".")."</td>
		</tr>    
		<tr>
        <td class='header_laporan'>Diajukan Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp;$row->nama_pengaju</td>
        </tr>
		<tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp;$row->nama_setuju</td>
        </tr>

    </table></td>
  </tr>
  <tr>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='60' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='250' class='header_laporan'><div align='center'>Keterangan </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode PP </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode DRK </div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
from ptg_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ptg='$row->no_ptg'
order by a.dc desc ";
		//error_log($sql1);
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,",",".");
			$kredit=number_format($row1->kredit,0,",",".");
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			$html.="<tr>
			    <td class='isi_laporan' align='center'>$i</td>
			    <td class='isi_laporan'>$row1->kode_akun</td>
			    <td class='isi_laporan'>$row1->nama</td>
			    <td class='isi_laporan'>$row1->keterangan</td>
			    <td class='isi_laporan'>$row1->kode_pp</td>
			    <td class='isi_laporan'>$row1->kode_drk</td>
			    <td class='isi_laporan' align='right'>$debet</td>
			    <td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$html.="<tr>
			    <td class='isi_laporan' align='center'>$i</td>
			    <td class='isi_laporan'>&nbsp;</td>
			    <td class='isi_laporan'>Nilai Kas</td>
			    <td class='isi_laporan'>$row->keterangan</td>
			    <td class='isi_laporan'>$row->kode_pp</td>
			    <td class='isi_laporan'>-</td>
			    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas > 0 ? $row->nilai_kas : 0,0,",",".")."</td>
			    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas < 0 ? abs($row->nilai_kas) : 0,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
		$tot_debet1=number_format($tot_debet,0,",",".");
		$tot_kredit1=number_format($tot_debet,0,",",".");
		$html.="<tr>
		    	<td colspan='5'>&nbsp;</td>
			    <td class='header_laporan' align='center'>Total</td>
			    <td class='isi_laporan' align='right'>$tot_debet1</td>
			    <td class='isi_laporan' align='right'>$tot_kredit1</td>
			  	</tr>
			  
				</table><br>";
		$html .="<table width='830'>
				<tr><td align='left'>Nilai Pertanggungan:&nbsp;&nbsp;".$AddOnLib->terbilang($row->nilai)."</td></tr>
				<tr><td width='80%'>Mengetahui,</td><td>$row->kota,$row->tanggal</td>				
				</tr>
				<tr><td style='height:30'>$row->jabatan_setuju</td><td>Pengaju</td></tr>				
				<tr><td style='height:30'>&nbsp;</td><td>&nbsp;</td></tr>
				<tr><td style='height:30'>&nbsp;</td><td>&nbsp;</td></tr>
				<tr><td style='height:30'>&nbsp;</td><td>&nbsp;</td></tr>				
				<tr><td style='text-decoration:underline'>$row->nama_setuju</td><td style='text-decoration:underline'>$row->nama_pengaju</td></tr>				
				<tr><td>$row->nik_setuju</td><td>$row->nik_buat</td></tr>
				</table>";		
			
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
