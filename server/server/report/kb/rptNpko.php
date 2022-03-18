<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptNpko
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $sql;
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
		$this->sql = "select a.no_npko,convert(varchar,a.tanggal,103) as tanggal,a.lokasi,a.sarana,a.sasaran,a.volume,a.lingkup,a.uraian,a.catatan,a.kode_akun,a.kode_drk,a.nilai,a.nik_setuju,a.nik_periksa,a.nik_rencana,
       b.nama as nama_pp,c.nama as nama_unit,
       d.nama as nama_setuju,e.nama as nama_periksa,f.nama as nama_rencana
from npko a 
inner join pp b on a.kode_pp=b.kode_pp
inner join unit c on a.kode_unit=c.kode_unit
inner join karyawan d on a.nik_setuju=d.nik
inner join karyawan e on a.nik_periksa=e.nik
inner join karyawan f on a.nik_rencana=f.nik ".$this->filter;
		error_log($this->sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($this->sql,$this->rows,$start);
		$i = 1;
		$html="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$html.="<table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td  height='110'><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='80' height='110'><div align='center'><img src='image/gratika.jpg' width='63' height='83' border='1' align='absmiddle' /></div></td>
        <td width='520' valign='top' style='padding:5px'><table width='520'  border='0' cellpadding='0' cellspacing='0'>
          <tr>
            <td width='320' height='30' class='isi_bukti'><div align='right'>Nomor : </div></td>
            <td width='150' ><table width='150' border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td class='isi_bukti'>$row->no_npko</td>
            </tr>
          </table>              </td>
          </tr>
          <tr>
            <td height='50' colspan='2'><div align='center' class='judul_bukti'>NOTA PROSES KEGIATAN OPERASIONAL </div></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
  <td style='padding:5px'><table width='600' border='0' cellspacing='0' cellpadding='0'>
    <tr>
      <td height='30' ><table width='600' border='1' cellpadding='0' cellspacing='0' class='kotak'>
        <tr>
          <td width='300' height='30'><table width='300' border='0' cellspacing='0' cellpadding='0'>
            <tr>
              <td width='100' class='isi_bukti'>Departemen</td>
              <td width='200'><table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                <tr>
                  <td class='isi_bukti'>$row->nama_pp</td>
                </tr>
              </table></td>
            </tr>
          </table></td>
          <td width='300'><table width='300' border='0' cellspacing='0' cellpadding='0'>
            <tr>
              <td width='100' class='isi_bukti'>Nomor Kegiatan </td>
              <td width='200'><table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$row->kode_drk</td>
                  </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td height='30'><table width='300' border='0' cellspacing='0' cellpadding='0'>
            <tr>
              <td width='100' class='isi_bukti'>Unit Kerja </td>
              <td width='200'><table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$row->nama_unit</td>
                  </tr>
              </table></td>
            </tr>
          </table></td>
          <td><table width='300' border='0' cellspacing='0' cellpadding='0'>
            <tr>
              <td width='100' class='isi_bukti'>Tanggal</td>
              <td width='200'><table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$row->tanggal</td>
                  </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
    
    
    <tr>
      <td height='10' ></td>
    </tr>
    <tr>
      <td height='30' ><table width='600' border='1' cellpadding='0' cellspacing='0' class='kotak'>
        <tr>
          <td colspan='2' class='isi_bukti'><div align='center'>INFO UMUM KEGIATAN </div></td>
          <td><div align='center' class='isi_bukti'>Lingkup Pekerjaan </div></td>
          <td><div align='center' class='isi_bukti'>Waktu</div></td>
        </tr>
        <tr>
          <td width='75' class='isi_bukti'><div align='center'>LOKASI</div></td>
          <td width='225' class='isi_bukti'>$row->lokasi</td>
          <td width='200'><div align='center'></div></td>
          <td width='100'><div align='center'></div></td>
        </tr>
        <tr>
          <td><div align='center' class='isi_bukti'>SARANA</div></td>
          <td class='isi_bukti' >$row->sarana</td>
          <td><div align='center'></div></td>
          <td><div align='center'></div></td>
        </tr>
        <tr>
          <td><div align='center' class='isi_bukti'>VOLUME</div></td>
          <td class='isi_bukti'>$row->volume</td>
          <td><div align='center'></div></td>
          <td><div align='center'></div></td>
        </tr>
        <tr>
          <td colspan='2' class='isi_bukti'><div align='center'>KONDISI SARANA / FASILITAS </div></td>
          <td colspan='2' class='isi_bukti'><div align='center'>SASARAN KEGIATAN </div></td>
        </tr>
        <tr>
          <td height='60' colspan='2' class='isi_bukti' valign='top'>$row->sarana</td>
          <td colspan='2' class='isi_bukti' valign='top'>$row->sasaran</td>
          </tr>
      </table></td>
    </tr>
    <tr>
      <td height='10' ></td>
    </tr>
    <tr>
      <td height='30' ><table width='600' border='1' cellpadding='0' cellspacing='0' class='kotak'>
        <tr>
          <td class='isi_bukti'><div align='center'>GAMBAR SITUASI / URAIAN PEKERJAAN / RINCIAN BIAYA </div></td>
        </tr>
        <tr>
          <td height='60' class='isi_bukti' valign='top'>$row->uraian</td>
        </tr>
      </table></td>
    </tr>
    <tr>
      <td height='10' ></td>
    </tr>
    <tr>
      <td height='30' ><table width='600' border='0' cellspacing='0' cellpadding='0'>
        <tr>
          <td width='300' valign='top'><table width='290' border='1' align='left' cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td height='100' valign='top' style='padding:5px' class='isi_bukti'>Catatan : $row->catatan</td>
            </tr>
          </table></td>
          <td width='300' valign='top'><table width='300' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='200' class='isi_bukti'>Nomor KPA </td>
              <td width='100'><table width='120' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$row->kode_akun</td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td class='isi_bukti'>Beban Anggaran Tahun </td>
              <td><table width='120' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td class='isi_bukti'>Anggaran</td>
              <td><table width='120' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td class='isi_bukti'>Sisa anggaran s.d saat ini </td>
              <td><table width='120' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
    <tr>
      <td height='10' ></td>
    </tr>
    <tr>
      <td height='30' ><table border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
        <tr>
          <td width='140' class='isi_bukti'><div align='center'>Direncanakan oleh </div></td>
          <td width='140' class='isi_bukti'><div align='center'>Diperiksa oleh </div></td>
          <td width='140' height='25' class='isi_bukti'><div align='center'>Disetujui oleh </div></td>
          </tr>
        <tr>
          <td class='isi_bukti' valign='bottom' align='center'>$row->nama_rencana</td>
          <td class='isi_bukti' valign='bottom' align='center'>$row->nama_periksa</td>
          <td class='isi_bukti' valign='bottom' align='center' height='60'>$row->nama_setuju</td>
          </tr>
        <tr>
          <td style='padding:5px' class='isi_bukti'><span class='isi_bukti' style='padding:5px'>Tanggal : </span></td>
          <td style='padding:5px' class='isi_bukti'><span class='isi_bukti' style='padding:5px'>Tanggal :</span></td>
          <td height='25' style='padding:5px' class='isi_bukti'>Tanggal : </td>
          </tr>
      </table></td>
    </tr>
  </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		
		$html.="</table>";
		
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
		global $dbLib;
		$rs = $dbLib->execute($this->sql);
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
