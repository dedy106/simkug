<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptKbKeluar
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
		$sql="select count(distinct a.no_kas)
			from kas_m a
			left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi
			".$this->filter+" and a.modul='KBO_NP'";
		//error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		
			$sql="select a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nilai,a.no_kas,a.akun_kb,
				c.nama as nama_bank,a.kode_lokasi,a.no_dokumen,a.keterangan,a.nik_buat,b.nama as nama_buat,d.nama as nama_rek
				from kas_m a
				inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
				inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi
				inner join bank2 d on a.kode_bank=d.kode_bank and a.kode_lokasi=d.kode_lokasi 
				".$this->filter." and a.modul='KBO_NP' order by a.no_kas ";
			//error_log($sql);
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
			
			$i = 1;
			$jum=$rs->recordcount();
			$AddOnLib=new server_util_AddOnLib();
			$html="<br>";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$nilai=number_format($row->nilai,0,",",".");
				$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
	    <td colspan='8' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	      <tr>
	        <td colspan='2' class='judul_bukti' align='center'>Bukti Transaksi Kas/Bank Keluar</td>
	        </tr>
		  <tr>
	        <td width='100' class='header_laporan'>No Bukti </td>
	        <td width='496' class='header_laporan'>:&nbsp;$row->no_kas</td>
	        </tr>
	      <tr>
	        <td class='header_laporan'>No Dokumen </td>
	        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
	        </tr>
	      <tr>
	        <td class='header_laporan'>Periode</td>
	        <td class='header_laporan'>:&nbsp;$row->periode</td>
	        </tr>
	      <tr>
	        <td class='header_laporan'>Tanggal</td>
	        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
	        </tr>
	      <tr>
	        <td class='header_laporan'>Kode Lokasi </td>
	        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
	      </tr>
	      <tr>
	        <td class='header_laporan'>Keterangan</td>
	        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
	      </tr>
		  <tr>
	        <td class='header_laporan'>Rek KasBank</td>
	        <td class='header_laporan'>:&nbsp;$row->nama_rek</td>
	      </tr>
	      <tr>
	        <td class='header_laporan'>Dibuat Oleh </td>
	        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat</td>
	      </tr>
	      <tr>
	        <td class='header_laporan'>Disetujui Oleh </td>
	        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp; $row->nama_setuju</td>
	      </tr>

	    </table></td>
	  </tr>
	  <tr>
	    <td width='20' class='header_laporan'><div align='center'>No</div></td>
	    <td width='60' class='header_laporan'><div align='center'>Akun</div></td>
	    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
	    <td width='250' class='header_laporan'><div align='center'>Keterangan </div></td>
	    <td width='50' class='header_laporan'><div align='center'>Kode PP </div></td>
	    <td width='60' class='header_laporan'><div align='center'>Kode DRK </div></td>
	    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
	    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
	  </tr>";
		  $sql1="select a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
	       b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit
from kas_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi' and a.modul='KBO_NP'
order by a.kode_akun ";
			//error_log($sql1);
			$rs1 = $dbLib->execute($sql1);
			$i=1;
			$debet=0;
		$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;
				$html.="<tr>
				    <td class='isi_laporan' align='center'>$i</td>
				    <td class='isi_laporan'>$row1->kode_akun</td>
				    <td class='isi_laporan'>$row1->nama_akun</td>
				    <td class='isi_laporan'>$row1->keterangan</td>
				    <td class='isi_laporan'>$row1->kode_pp</td>
				    <td class='isi_laporan'>$row1->kode_drk</td>
					<td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
					</tr>";
				$i=$i+1;
			}
			$tot=number_format($tot,0,",",".");

		  
			$html.="<tr>
    <td height='20' colspan='6' valign='middle' class='isi_laporan'><div align='right'><strong>Total</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($debet,0,',','.')."</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($kredit,0,',','.')."</strong></div></td>
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