<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gaji_rptSppGaji
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
		$sql="select count(a.no_spb) from spb_m a ".$this->filter;		
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
		$sql="select a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.akun_hutang,a.kode_terima,a.nik_buat,a.nik_setuju,a.nilai,c.alamat,c.bank,c.no_rek,
       b.nama as nama_akun,c.nama as nama_vendor,d.nama as nama_buat,e.nama as nama_setuju,d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju
from spb_m a
left join masakun b on a.akun_hutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join vendor c on a.kode_terima=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter." order by a.no_spb";		
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
    <td style='padding:5px;'><table width='780' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><img src='image/ypt.jpg' width='273' height='98' /></td>
        <td width='280' valign='top'><table width='280' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='120' class='isi_bukti'>Nomor Referensi </td>
            <td width='160' class='isi_bukti'>: FM/A2/02 </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Status Revisi </td>
            <td class='isi_bukti'>: 01 </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='780' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='isi_bukti'>Catatan Administrasi Keuangan </td>
        </tr>
      <tr>
        <td width='160' class='isi_bukti'>SPB Nomor </td>
        <td width='620' class='isi_bukti'>:&nbsp;$row->no_spb</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Tanggal</td>
        <td class='isi_bukti'>:&nbsp;$row->tanggal</td>
      </tr>
      <tr>
        <td class='isi_bukti'>MTP / MTA </td>
        <td class='isi_bukti'>:&nbsp;$row->akun_hutang -&nbsp;$row->nama_akun</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Beban Anggaran  </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Tahun</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='40' class='judul_bukti' align='center'>YAYASAN PENDIDIKAN TELKOM</td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='780' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='isi_bukti'>Bendaharawan Lokasi di Bandung diminta untuk membayarkan uang sebesar : </td>
        </tr>
      <tr>
        <td colspan='2' class='isi_bukti'>Rp. ".number_format($row->nilai,0,',','.')." ( ".$terbilang." ) </td>
        </tr>
      <tr>
        <td width='160'>&nbsp;</td>
        <td width='620'>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Kepada</td>
        <td class='isi_bukti'>:&nbsp;$row->nama_vendor</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Nama</td>
        <td class='isi_bukti'>:&nbsp;$row->nama_vendor</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Rekening Giro Nomor </td>
        <td class='isi_bukti'>:&nbsp;$row->no_rek</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Pada Bank </td>
        <td class='isi_bukti'>:&nbsp;$row->bank</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Alamat</td>
        <td class='isi_bukti'>:&nbsp;$row->alamat</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Untuk Pembayaran </td>
        <td class='isi_bukti'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px;'><table width='750' border='0' align='center' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='250'>&nbsp;</td>
        <td width='250'>&nbsp;</td>
        <td width='250' class='isi_bukti'>Bandung, $row->tanggal </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center' class='isi_bukti'>Yang Mengajukan </td>
        <td align='center' class='isi_bukti'>Menyetujui</td>
        <td align='center' class='isi_bukti'>Fiatur</td>
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
        <td width='390' class='isi_bukti'>Tanda Terima </td>
        <td width='390' class='isi_bukti'>Untuk Ditransfer </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Telah diterima uang sejumlah Rp. ".number_format($row->nilai,0,',','.')."</td>
        <td class='isi_bukti'>Transfer tanggal $row->tanggal</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='isi_bukti'>No GB </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='isi_bukti'>Besar Uang Rp. ".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Bandung,</td>
        <td class='isi_bukti'>Bandung,</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Penerima</td>
        <td class='isi_bukti'>Bendahara YPT </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti'>$row->nama_vendor</td>
        <td class='isi_bukti'>-</td>
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
