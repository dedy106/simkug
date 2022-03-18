<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_kredit_rptKuitansi extends server_report_basic
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
		
		/*
		$sql="select a.no_ttb,a.kode_lokasi,a.tanggal,a.no_agg,b.nama,a.nilai,a.keterangan,a.lama_bayar,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   c.nama as nama_ss,d.nama as nama_survey,isnull(e.jum,0) as sisa,ISNULL(f.cicilan_ke,0) as cicilan_ke
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_ss=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_survey=d.nik and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,COUNT(no_ttb)-1 as jum
		   from kre_ttb2_sch
	       where no_bill='-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
left join (select no_ttb,kode_lokasi,cicilan_ke
		   from kre_ttb2_sch
	       where no_bill='-' and periode='201508'
		  )f on a.no_ttb=f.no_ttb and a.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_ttb
";
		*/
		$sql="select a.no_bill,a.kode_lokasi,b.no_ttb,b.cicilan_ke,c.lama_bayar,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   e.nama as nama_ss,f.nama as nama_survey,d.nama,isnull(g.jum,0) as sisa,b.npokok as nilai
from kre_bill_m a
inner join kre_ttb2_sch b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join kre_ttb2_m c on b.no_ttb=c.no_ttb and b.kode_lokasi=c.kode_lokasi
inner join kre_agg d on c.no_agg=d.no_agg and c.kode_lokasi=d.kode_lokasi
inner join karyawan e on c.nik_ss=e.nik and c.kode_lokasi=e.kode_lokasi
inner join karyawan f on c.nik_survey=f.nik and c.kode_lokasi=f.kode_lokasi
left join (select no_ttb,kode_lokasi,COUNT(no_ttb) as jum
		   from kre_ttb2_sch
	       where no_bill='-' 
		   group by no_ttb,kode_lokasi
		  )g on c.no_ttb=g.no_ttb and c.kode_lokasi=g.kode_lokasi
$this->filter
order by b.no_ttb";
		$rs = $dbLib->execute($sql);		
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		$logo="image/jawa_makmur.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("kuitansi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		//for ($i = 0; $i <= 4; $i++)
		{
			echo "<table width='900' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='250'><table width='250' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'><img src='$logo' width='200' height='64'></td>
        </tr>
      <tr>
        <td width='95'>No Kwitansi </td>
        <td width='145'>: $row->no_ttb</td>
      </tr>
      <tr>
        <td colspan='2'>Sudah terima dari : $row->nama</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>Untuk pembayaran </td>
        </tr>
      <tr>
        <td>Angsuran ke </td>
        <td>: $row->cicilan_ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sisa : $row->sisa</td>
      </tr>
      <tr>
        <td>Bukti Jual No </td>
        <td>: - </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl</td>
      </tr>
      <tr>
        <td>Jumlah Rp </td>
        <td>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
    </table></td>
    <td width='650' valign='top'><table width='650' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='250' rowspan='2'><img src='$logo' width='200' height='64'></td>
            <td width='70'>Sales</td>
            <td width='180'>: $row->nama_ss </td>
          </tr>
          <tr>
            <td>Surviyor</td>
            <td>: $row->nama_survey</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='150'>No Kwitansi </td>
            <td colspan='2'>: $row->no_ttb </td>
            </tr>
          <tr>
            <td>Sudah terima dari</td>
            <td colspan='2'>: $row->nama </td>
            </tr>
          <tr>
            <td>Uang sejumlah </td>
            <td colspan='2'><table width='500' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='350'>: ".$AddOnLib->terbilang($row->nilai)."</td>
                <td width='150'>Tasikmalaya, $row->tgl</td>
              </tr>
            </table></td>
            </tr>
          <tr>
            <td valign='top'>Untuk pembayaran </td>
            <td width='300'><table border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='108'>Angsuran ke</td>
                <td width='52'>: $row->cicilan_ke </td>
                <td width='114'>Sisa : $row->sisa </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='2'>Tanggal : $row->tgl</td>
                </tr>
              <tr>
                <td>Bukti Jual No </td>
                <td colspan='2'>: - </td>
                </tr>
            </table></td>
            <td width='100' rowspan='2' align='center' valign='bottom'>Sutiman</td>
          </tr>
          <tr>
            <td>Jumlah Rp </td>
            <td>: ".number_format($row->nilai,0,",",".")."</td>
            </tr>
        </table></td>
      </tr>

    </table></td>
  </tr>
</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
