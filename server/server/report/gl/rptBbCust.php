<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptBbCust
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_akun=$tmp[2];
		$kode_cust=$tmp[3];
		$sql="select count(a.kode_cust) from cust a 
						left join (select y.kode_akun,y.kode_cust,sum(case when y.dc='D' then y.nilai else -y.nilai end) so_awal 
					 			   from gldt_h y 
					 			   where y.periode<'$periode' and y.kode_lokasi ='$kode_lokasi' and y.kode_akun='$kode_akun' 
					 			   group by y.kode_cust 
					 			  ) b on a.kode_cust=b.kode_cust 
					 	left join (select x.kode_akun,x.kode_cust,sum(case when x.dc='D' then x.nilai else 0 end) as debet, 
					 					  sum(case when x.dc='C' then x.nilai else 0 end) as kredit 
					 			   from (select y.kode_akun,y.kode_cust,y.dc,y.nilai 
					 					 from gldt y 
					 			   		 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					 union all 
					 					 select y.kode_akun,y.kode_cust,y.dc,y.nilai 
					 					 from gldt_h y 
					 			   		 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					) x 
					 			   group by x.kode_cust 
					 			  ) c on a.kode_cust=c.kode_cust 
						left join masakun d on d.kode_akun='$kode_akun' and a.kode_lokasi=d.kode_lokasi
					 where a.kode_lokasi='$kode_lokasi' $kode_cust and (so_awal<>0 or debet<>0 or kredit <>0) 
					 	 ";		$sql = str_replace(chr(9),"",$sql);
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_akun=$tmp[2];
		$kode_cust=$tmp[3];
		$sql="select a.kode_cust,a.nama as nama_cust,d.kode_akun,d.nama as nama_akun,a.kode_lokasi,ifnull(b.so_awal,0) as so_awal,ifnull(c.debet,0) as debet,ifnull(c.kredit,0) as kredit, 
					 	   ifnull(b.so_awal,0)+ifnull(c.debet,0)-ifnull(c.kredit,0) as so_akhir 
					 	from cust a 
						
					 	left join (select y.kode_akun,y.kode_cust,sum(case when y.dc='D' then y.nilai else -y.nilai end) so_awal 
					 			   from gldt_h y 
					 			   where y.periode<'$periode' and y.kode_lokasi ='$kode_lokasi' and y.kode_akun='$kode_akun' 
					 			   group by y.kode_cust 
					 			  ) b on a.kode_cust=b.kode_cust 
					 	left join (select x.kode_akun,x.kode_cust,sum(case when x.dc='D' then x.nilai else 0 end) as debet, 
					 					  sum(case when x.dc='C' then x.nilai else 0 end) as kredit 
					 			   from (select y.kode_akun,y.kode_cust,y.dc,y.nilai 
					 					 from gldt y 
					 			   		 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					 union all 
					 					 select y.kode_akun,y.kode_cust,y.dc,y.nilai 
					 					 from gldt_h y 
					 			   		 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					) x 
					 			   group by x.kode_cust 
					 			  ) c on a.kode_cust=c.kode_cust 
						left join masakun d on d.kode_akun='$kode_akun' and a.kode_lokasi=d.kode_lokasi
					 where a.kode_lokasi='$kode_lokasi' $kode_cust and (so_awal<>0 or debet<>0 or kredit <>0) 
					 	group by a.kode_cust ";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan buku besar piutang" ,$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr>
    <td height='23' colspan='9' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>Periode </td>
        <td width='496' class='header_laporan'>:&nbsp;$periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Akun  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>:&nbsp;$row->nama_akun</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Kode Cust  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_cust</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Cust </td>
        <td class='header_laporan'>:&nbsp;$row->nama_cust</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Lokasi </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' class='header_laporan' align='center'>No Dokumen</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='70' class='header_laporan' align='center'>Kode PP</td>
    <td width='70' class='header_laporan' align='center'>Kode Cust</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";
			$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";
			
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_cust,a.keterangan,
       case when a.dc='D' then nilai else 0 end as debet,
       case when a.dc='C' then nilai else 0 end as kredit
from $tabel a
where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' and a.kode_cust='$row->kode_cust'
order by a.tanggal ";
			error_log($sql);
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='20' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_cust."</td>
    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row1->kredit,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
  </tr>";
			}
			echo "<tr>
    <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'></td>
  </tr>
  <tr>
    <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		//$html = str_replace(chr(9),"",$html);
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
