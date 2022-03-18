<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_budget_rptAggEvalAbau
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
		$sql="select count(no_app) as jum from agg_abauapp_m $this->filter";

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
		$sql="select a.no_app,a.kode_lokasi,a.tanggal,a.keterangan,a.tahun
from agg_abauapp_m a $this->filter order by a.no_app ";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan evaluasi biaya norma variabel",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='800'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='17' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_app</td>
        </tr>
	  <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>No Bukti</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' align='center' class='header_laporan'>Keterangan  </td>
    <td width='50' align='center' class='header_laporan'>Kode BU </td>
    <td width='150' align='center' class='header_laporan'>Bisnis Unit</td>
    <td width='60' align='center' class='header_laporan'>Jenis </td>
    <td width='40' align='center' class='header_laporan'>Tahun</td>
    <td width='80' align='center' class='header_laporan'>Total </td>
  </tr>
";
  
	  $sql1="select a.no_abau,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.keterangan,b.kode_pp,c.nama as nama_pp,case when b.jenis='R' then 'RECURRING' else 'TAMBAHAN' end as jenis,b.tahun,d.total
from agg_abauapp_d a
inner join agg_abau_m b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi
inner join agg_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi
left join (select no_abau,sum(jumlah*volume*tarif)as total
           from agg_abau_d
           where kode_lokasi='03'
           group by no_abau)d on a.no_abau=b.no_abau
where a.no_app='$row->no_app' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_app ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$tot=0;
		$vol=0;
		$jum=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$total=number_format($row1->total,0,",",".");
			$tot=$tot+$row1->total;
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->no_abau</td>
    <td align='left' class='isi_laporan'>$row1->tanggal</td>
    <td align='left' class='isi_laporan'>$row1->keterangan</td>
    <td align='left' class='isi_laporan'>$row1->kode_pp</td>
    <td align='left' class='isi_laporan'>$row1->nama_pp</td>
    <td align='left' class='isi_laporan'>$row1->jenis</td>
	<td align='left' class='isi_laporan'>$row1->tahun</td>
    <td align='right' class='isi_laporan'>$total </td>
  </tr>";
		$j=$j+1;
		}
		$tot=number_format($tot,0,",",".");
	  echo " <tr bgcolor='#CCCCCC'>
    <td colspan='8' align='right' class='header_laporan'>Total&nbsp;</td>
    <td align='right' class='header_laporan'>$tot</td>
  </tr> </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
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
