<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptBuktiJurnal
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
		$sql = "select 1 ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";
		$sql="select distinct a.no_bukti from $tabel a ";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
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
            <td width='120' ><table width='130' border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td class='isi_bukti' align='center'>$row->no_bukti</td>
            </tr>
          </table>
              </td>
          </tr>
          <tr>
            <td height='50' colspan='2'><div align='center' class='judul_bukti'>BUKTI JURNAL MEMORIAL </div></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table border='1' align='center' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
        <td width='270' height='25' class='isi_bukti'><div align='center'>Nama Akun </div></td>
        <td width='100' class='isi_bukti'><div align='center'>Debet</div></td>
        <td width='100' class='isi_bukti'><div align='center'>Kredit</div></td>
        <td width='130' class='isi_bukti'><div align='center'>Nomor Akun </div></td>
      </tr>";
	  $sql1="select a.kode_akun,b.nama,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
from ju_j a
inner join masakun b on a.kode_akun=b.kode_akun
where a.no_ju='$row->no_bukti'
order by a.dc desc ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,",",".");
			$kredit=number_format($row1->kredit,0,",",".");
			$html.="<tr>
        <td height='23' class='isi_bukti'>$row1->nama</td>
        <td class='isi_bukti'><div align='right'>$debet</div></td>
        <td class='isi_bukti'><div align='right'>$kredit</div></td>
        <td class='isi_bukti'><div align='center'>$row1->kode_akun</div></td>
      </tr>";
		}
	  $html.="
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table  border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td width='450' height='30' class='isi_bukti'><div align='right'>No. Jurnal </div></td>
        <td width='150' ><table align='right' width='140' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
            <tr>
              <td>&nbsp;</td>
            </tr>
        </table>
          
      </tr>
      
    </table></td>
  </tr>
  <tr>
    <td style='padding:5px'><table width='600' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td height='30'><table  border='0' cellpadding='0' cellspacing='0'>
          <tr>
            <td width='130' height='30'  class='isi_bukti'><div align='left'>Sesuai Dokumen </div></td>
            <td width='470' ><table align='right' width='470' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
                <tr>
                  <td>&nbsp;</td>
                </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30'><table  border='0' cellpadding='0' cellspacing='0'>
          <tr>
            <td width='125' height='30' class='isi_bukti'><div align='left'>Nomor</div></td>
            <td width='470' ><table align='left' width='140' border='1'  cellpadding='0' cellspacing='0' class='kotak'>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30' ><table width='600' border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='270' valign='top'><table width='270' border='1' align='left' cellpadding='0' cellspacing='0' class='kotak'>
              <tr>
                <td height='100' valign='top' style='padding:5px' class='isi_bukti'>CATATAN</td>
              </tr>
            </table></td>
            <td width='330' valign='top'><table width='320' border='1' align='right' cellpadding='0' cellspacing='0' class='kotak'>
              <tr>
                <td width='160' height='25' class='isi_bukti'><div align='center'>Dibuat oleh </div></td>
                <td width='160' class='isi_bukti'><div align='center'>Disetujui Oleh </div></td>
              </tr>
              <tr>
                <td height='50'>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td height='25' style='padding:5px' class='isi_bukti'>Tanggal : </td>
                <td style='padding:5px' class='isi_bukti'>Tanggal : </td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			
			$i=$i+1;
		}
		
		
		
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
