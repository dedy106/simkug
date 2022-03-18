<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptKuitansi2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
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
		$periode=$tmp[0];
		
		$sql="select a.no_bill,a.kode_lokasi,b.no_ttb,b.cicilan_ke,c.lama_bayar,a.tanggal,date_format(b.tgl_angs,'%d/%m/%Y') as tgl,
	   e.nama as nama_promo,f.nama as nama_survey,d.nama,isnull(g.jum,0) as sisa,b.npokok as nilai,CONVERT(varchar,GETDATE(),103) as tgl_cetak
from kre_bill_m a
inner join kre_ttb2_sch b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join kre_ttb2_m c on b.no_ttb=c.no_ttb and b.kode_lokasi=c.kode_lokasi
inner join kre_agg d on c.no_agg=d.no_agg and c.kode_lokasi=d.kode_lokasi
inner join karyawan e on c.nik_ss=e.nik and c.kode_lokasi=e.kode_lokasi
inner join karyawan f on c.nik_promo=f.nik and c.kode_lokasi=f.kode_lokasi
left join (select no_ttb,kode_lokasi,COUNT(no_ttb) as jum
		   from kre_ttb2_sch
	       where no_bill='-' 
		   group by no_ttb,kode_lokasi
		  )g on c.no_ttb=g.no_ttb and c.kode_lokasi=g.kode_lokasi
$this->filter
order by b.no_ttb";
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		$logo="image/jawa_makmur.jpg";
		echo "<div align='left'>"; 
		//echo $AddOnLib->judul_laporan("kuitansi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		
		{
			echo "<table width='800' border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td width='250' valign='top'><table width='250' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' height='40'>&nbsp;</td>
        </tr>
      <tr>
        <td width='80'>&nbsp;</td>
        <td >$row->no_ttb</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'></td>
        </tr>
      <tr>
      <td height='25'>&nbsp;</td>
        <td width='145'>$row->nama</td>
        </tr>
      <tr>
        <td height='35'>&nbsp;</td>
        <td>$row->cicilan_ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$row->sisa</td>
      </tr>
      <tr>
        <td height='15'>&nbsp;</td>
        <td>-</td>
      </tr>
      <tr>
        <td height='15'>&nbsp;</td>
        <td>$row->tgl</td>
      </tr>
      <tr>
        <td height='15'>&nbsp;</td>
        <td>".number_format($row->nilai,0,",",".")." </td>
      </tr>
	  <tr>
        <td height='30'>&nbsp;</td>
        <td>&nbsp</td>
      </tr>
    </table></td>
    <td width='550' valign='top'><table width='550' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='200' height='20'>&nbsp;</td>
            <td ><table border='0' cellspacing='0' cellpadding='0'>
              <tr>
                <td width='110'>&nbsp;</td>
                <td > $row->nama_promo </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td> $row->nama_survey </td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1' width='550'>
          <tr>
            <td width='120'  height='25'>&nbsp;</td>
            <td colspan='2' valign='top'> $row->no_ttb </td>
            </tr>
          <tr>
            <td  height='20'>&nbsp;</td>
            <td valign='top'> $row->nama</td>
            </tr>
          <tr>
            <td  height='25'>&nbsp;</td>
            <td colspan='2'> <table border='0' cellspacing='0' cellpadding='0'>
              <tr>
                <td width='350'>".$AddOnLib->terbilang($row->nilai)."</td>
                <td >$row->tgl_cetak</td>
              </tr>
            </table>  </td>
            </tr>
          <tr>
            <td></td>
            <td ><table border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='70'>&nbsp;</td>
                <td width='40'>$row->cicilan_ke</td>
                <td width='60'>$row->sisa</td>
				<td>$row->tgl</td>
              </tr>
              <tr>
                <td width='70' >&nbsp;</td>
                <td  colspan='3'>$row->no_ttb</td>
				
              </tr>
              
            </table></td>
            <td width='100' rowspan='2' align='center' valign='bottom'></td>
          </tr>
          <tr>
            <td height='30'>&nbsp;</td>
            <td>".number_format($row->nilai,0,",",".")."</td>
            </tr>
		  <tr>
        <td height='30'>&nbsp;</td>
        <td>&nbsp</td>
      </tr>
        </table></td>
      </tr>

    </table></td>
  </tr>
</table>";
			
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
