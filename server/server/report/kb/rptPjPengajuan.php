<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptPjPengajuan
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
		$sql="select count(a.no_pj)
from panjar_m a
inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter;
		error_log($sql);
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
		$sql="select a.no_pj,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,
       d.nama as nama_buat,e.nama as nama_setuju,d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju
from panjar_m a
inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter." order by a.no_pj";
		
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan purchase order",$this->lokasi,$AddOnLib->ubah_periode($periode));
	
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang($row->nilai);
			$html.="<br><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td height='40' class='judul_bukti' align='center'>YAYASAN PENDIDIKAN TELKOM</td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='780' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='isi_bukti'>&nbsp;</td>
        </tr>
      <tr>
        <td colspan='2' align='center' class='isi_bukti'><span class='judul_bukti'>PERMOHONAN PANJAR</span></td>
      </tr>
      <tr>
        <td colspan='2' align='center' class='isi_bukti'>No : $row->no_pj</td>
        </tr>
      <tr>
        <td width='200'>&nbsp;</td>
        <td width='580'>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Dibayarkan Kepada</td>
        <td class='isi_bukti'>:&nbsp;$row->nama_buat</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Uang Tunai Sebesar </td>
        <td class='isi_bukti'>:&nbsp;Rp ".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td class='isi_bukti'>&nbsp;</td>
        <td class='isi_bukti'>:&nbsp;($terbilang)</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Pengeluaran Untuk </td>
        <td class='isi_bukti'>:&nbsp;$row->keterangan</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Waktu Pertanggungan Panjar </td>
        <td class='isi_bukti'>:&nbsp;$row->alamat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='750' border='0' align='center' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='250' align='center' class='isi_bukti'>Disetujui</td>
        <td width='250' align='center' class='isi_bukti'>Diperiksa</td>
        <td width='250' align='center' class='isi_bukti'>Peminta</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center' class='isi_bukti'>$row->nama_buat</td>
        <td align='center' class='isi_bukti'>$row->nama_setuju</td>
        <td align='center' class='isi_bukti'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center' class='isi_bukti'>$row->jabatan_buat</td>
        <td align='center' class='isi_bukti'>$row->jabatan_setuju</td>
        <td align='center'>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='780' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' class='isi_bukti'>Dibayar / dikeluarkan tanggal </td>
        <td width='580' class='isi_bukti'>:</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Paraf Pembayar </td>
        <td class='isi_bukti'>:</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
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
