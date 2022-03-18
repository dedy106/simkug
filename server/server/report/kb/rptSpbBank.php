<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptSpbBank
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
		$this->sql = "select a.no_spb,substring(a.periode,1,4) as tahun,convert(varchar,a.tanggal,103) as tanggal,a.nilai,a.keterangan, 
       b.nama as nama_pp,c.nama as nama_terima,d.nama as nama_setuju,e.nama as nama_buat
from spb_m a
inner join pp b on a.kode_pp=b.kode_pp
inner join (select nik as kode_terima,nama from karyawan
            union 
            select kode_cust as kode_terima,nama from cust)c on a.kode_terima=c.kode_terima
inner join karyawan d on a.nik_setuju=d.nik
inner join karyawan e on a.nik_buat=e.nik ".$this->filter;
		error_log($this->sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($this->sql,$this->rows,$start);
		$i = 1;
		$html="";
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang($row->nilai);
			$html.="<table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td  height='110'><table width='100%' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='80' height='110'><div align='center'><img src='image/gratika.jpg' width='63' height='83' border='1' align='absmiddle' /></div></td>
        <td width='520' valign='top' style='padding:5px'><table width='520'  border='0' cellpadding='0' cellspacing='0'>
          <tr>
            <td width='320' height='30' class='isi_bukti'><div align='right'>Nomor : </div></td>
            <td width='120' ><table width='130' border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td class='isi_bukti'>$row->no_spb</td>
            </tr>
          </table>              </td>
          </tr>
          <tr>
            <td height='50' colspan='2'><div align='center' class='judul_bukti'>SURAT PERINTAH BAYAR  </div></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table  border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td width='125' height='30'  class='isi_bukti'><div align='left'>Kode Lokasi PP </div></td>
        <td width='185' ><table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td class='isi_bukti'>$row->nama_pp</td>
            </tr>
        </table></td>
        <td width='140' ><div align='left' class='isi_bukti'>Beban Anggaran Tahun  </div></td>
        <td width='150' ><div align='left'>
          <table width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
              <tr>
                <td class='isi_bukti'>$row->tahun</td>
              </tr>
            </table>
        </div></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table width='600' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td height='30' class='isi_bukti'>Mohon dibayarkan uang </td>
      </tr>
      <tr>
        <td height='30'><table  border='0' cellpadding='0' cellspacing='0'>
          <tr>
            <td width='125' height='30'  class='isi_bukti'><div align='left'>Sebesar</div></td>
            <td width='470' ><table align='left' width='150' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                <tr>
                  <td class='isi_bukti'>".number_format($row->nilai,0,',','.')."</td>
                </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30'><table  border='0' cellpadding='0' cellspacing='0'>
            <tr>
              <td width='125' height='30'  class='isi_bukti'><div align='left'>Terbilang</div></td>
              <td width='470' ><table align='left' width='470' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$terbilang</td>
                  </tr>
              </table></td>
            </tr>
        </table></td>
      </tr>

      <tr>
        <td height='30' ><table  border='0' cellpadding='0' cellspacing='0'>
            <tr>
              <td width='125' height='30'  class='isi_bukti'><div align='left'>Kepada</div></td>
              <td width='470' ><table align='left' width='470' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                  <tr>
                    <td class='isi_bukti'>$row->nama_terima</td>
                  </tr>
              </table></td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30' ><table  border='0' cellpadding='0' cellspacing='0'>
            <tr>
              <td width='125' height='30'  class='isi_bukti'><div align='left'>Untuk Pembayaran </div></td>
              <td width='470' ><div align='left'>
                <table width='470' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                    <tr>
                      <td class='isi_bukti'>$row->keterangan</td>
                    </tr>
                  </table>
              </div></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table border='1' align='center' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td class='isi_bukti'><div align='center'>No</div></td>
        <td width='130' height='30' class='isi_bukti'><div align='center'>Nomor Akun </div></td>
        <td width='320'  class='isi_bukti'><div align='center'>Nama Akun </div></td>
        <td width='130' class='isi_bukti'><div align='center'>Jumlah</div></td>
      </tr>";
	   $sql1="select a.kode_akun,b.nama,a.nilai 
from spb_j a
inner join masakun b on a.kode_akun=b.kode_akun
where a.no_spb='$row->no_spb' order by a.dc";
		error_log($sql1);
	   $rs1 = $dbLib->execute($sql1);
	   $j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      $html.="<tr>
        <td class='isi_bukti'>$j</td>
        <td class='isi_bukti'>$row1->kode_akun</td>
        <td height='23' class='isi_bukti'>$row1->nama</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
    $html.="</table></td>
  </tr>
  <tr>
    <td><table width='600' border='0' align='center' cellpadding='5' cellspacing='0'>
      <tr>
        <td width='300' valign='top'><table border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='25' colspan='2' class='isi_bukti'><div align='center'>PENGAJUAN</div></td>
          </tr>
          <tr>
            <td width='145' class='isi_bukti'><div align='center'>Dibuat oleh </div></td>
            <td width='145' height='25' class='isi_bukti'><div align='center'>Disetujui oleh </div></td>
          </tr>
          <tr>
            <td class='isi_bukti' align='center' valign='bottom'>$row->nama_buat</td>
            <td class='isi_bukti' align='center' valign='bottom' height='100'>$row->nama_setuju</td>
          </tr>
          <tr>
            <td style='padding:5px' class='isi_bukti'><span class='isi_bukti' style='padding:5px'>Tanggal :</span></td>
            <td height='25' style='padding:5px' class='isi_bukti'>Tanggal : </td>
          </tr>
        </table></td>
        <td width='160' valign='top'><table width='170' border='1' align='left' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='140' valign='top' style='padding:5px' class='isi_bukti'><table width='170' border='0' cellspacing='0' cellpadding='0'>
                <tr>
                  <td colspan='3' class='isi_bukti'>Dokumen Pendukung </td>
                  <td width='20' height='23' class='isi_bukti'><div align='center'>OK</div></td>
                </tr>
                <tr>
                  <td width='20' class='isi_bukti'><div align='center'>1</div></td>
                  <td width='100' valign='bottom' class='isi_bukti'><hr /></td>
                  <td width='20' class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox222' value='checkbox' />
                  </div></td>
                  <td width='20' height='23' class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox22' value='checkbox' />
                  </div></td>
                </tr>
                <tr>
                  <td><div align='center' class='isi_bukti'>2</div></td>
                  <td valign='bottom' class='isi_bukti'><hr /></td>
                  <td class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox2222' value='checkbox' />
                  </div></td>
                  <td height='23' class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox2223' value='checkbox' />
                  </div></td>
                </tr>
                <tr>
                  <td><div align='center' class='isi_bukti'>3</div></td>
                  <td valign='bottom' class='isi_bukti'><hr /></td>
                  <td class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox22211' value='checkbox' />
                  </div></td>
                  <td height='23' class='isi_bukti'><div align='center'>
                      <input type='checkbox' name='checkbox2224' value='checkbox' />
                  </div></td>
                </tr>
                <tr>
                  <td><div align='center' class='isi_bukti'>4</div></td>
                  <td valign='bottom'><hr /></td>
                  <td><div align='center'>
                      <input type='checkbox' name='checkbox22210' value='checkbox' />
                  </div></td>
                  <td height='23'><div align='center'>
                      <input type='checkbox' name='checkbox2225' value='checkbox' />
                  </div></td>
                </tr>
                <tr>
                  <td><div align='center' class='isi_bukti'>5</div></td>
                  <td valign='bottom'><hr /></td>
                  <td><div align='center'>
                      <input type='checkbox' name='checkbox2229' value='checkbox' />
                  </div></td>
                  <td height='23'><div align='center'>
                      <input type='checkbox' name='checkbox2226' value='checkbox' />
                  </div></td>
                </tr>
                <tr>
                  <td><div align='center' class='isi_bukti'>6</div></td>
                  <td valign='bottom'><hr /></td>
                  <td><div align='center'>
                      <input type='checkbox' name='checkbox2228' value='checkbox' />
                  </div></td>
                  <td height='23'><div align='center'>
                      <input type='checkbox' name='checkbox2227' value='checkbox' />
                  </div></td>
                </tr>
            </table></td>
          </tr>
        </table></td>
        <td width='130' valign='top'><table width='130' border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='20' valign='top' style='padding:5px' class='isi_bukti'><div align='center'>VERIFIKASI</div></td>
          </tr>
          <tr>
            <td height='20' valign='top' style='padding:5px' class='isi_bukti'><div align='center'>Anggaran</div></td>
          </tr>
          <tr>
            <td height='75' valign='top' style='padding:5px' class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td height='20' valign='top' style='padding:5px' class='isi_bukti'>Tanggal : </td>
          </tr>
          <tr>
            <td height='20' valign='top' style='padding:5px' class='isi_bukti'><div align='center'>Keuangan</div></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='10'></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td valign='top'><table border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='25' colspan='2' class='isi_bukti'><div align='center'>PEMBAYARAN</div></td>
          </tr>
          <tr>
            <td width='145' rowspan='2'><table width='145' border='0' cellspacing='0' cellpadding='0'>
                <tr>
                  <td width='25'><div align='center'>
                      <input type='checkbox' name='checkbox' value='checkbox' />
                  </div></td>
                  <td width='120' height='23' class='isi_bukti'>Kas</td>
                </tr>
                <tr>
                  <td><div align='center'>
                      <input type='checkbox' name='checkbox2' value='checkbox' />
                  </div></td>
                  <td height='23' class='isi_bukti'>Bank</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td height='23' class='isi_bukti'>Nomor Akun Bank </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td height='23'><table align='left' width='100' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                  </table></td>
                </tr>
            </table></td>
            <td width='145' height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td height='23' style='padding:5px' class='isi_bukti'>Tanggal : </td>
          </tr>
        </table></td>
        <td valign='top'><table width='170' border='1' align='left' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='120' valign='top' style='padding:5px' class='isi_bukti'>Catatan : </td>
          </tr>
        </table></td>
        <td valign='top'><table width='130' border='1' align='left' cellpadding='0' cellspacing='0' class='kotak'>
          <tr>
            <td height='95' valign='top' style='padding:5px' class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td height='20' valign='top' style='padding:5px' class='isi_bukti'>Tanggal : </td>
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
