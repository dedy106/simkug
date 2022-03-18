<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_ginas_rptSlipGajiT extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select 1 ";
		
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
    $sql="select c.no_gaji,b.kode_lokasi,b.nik,b.nama as kryn,b.jabatan,b.loker,
    datepart(month,d.tanggal) as bulan,datepart(year,d.tanggal) as tahun
    from hr_karyawan b
     inner join hr_gaji_loadtelu c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
    inner join hr_gaji_m d on c.no_gaji=d.no_gaji and c.kode_lokasi=d.kode_lokasi
$this->filter
order by b.nik";

		
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = "/image/terginas.png";
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='700'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='700'  border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='70%' rowspan='4'><span class='header_laporan'><img src='$pathfoto' width='120' height='110'/></span></td>
        <td width='30%' class='header_laporan'>PT. TRENGGINAS JAYA</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jl. Sumur Bandung, Lebak Siliwangi, Coblong, Bandung City, West Java 40132</td>
      </tr>
      <tr>
        <td class='header_laporan'>Telp. 022-2532053</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td align='center' class='header_laporan'>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='1' class='kotak' width='800'>
      <tr>
        <td height='23' colspan='8' class='header_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
            <tr>
              <td width='10%' class='header_laporan'>Nama</td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->kryn</td>
              <td width='10%' class='header_laporan'>Bulan Gaji</td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->bulan</td>             
            </tr>
            <tr>
              <td class='header_laporan'>NIK</td>
              <td class='header_laporan'>:&nbsp;$row->nik</td>
              <td class='header_laporan'>Lokasi Kerja</td>
              <td class='header_laporan'>:&nbsp;$row->loker</td>
            </tr>
            <tr>
            <td width='10%' class='header_laporan'>Jabatan</td>
            <td width='45%' class='header_laporan'>:&nbsp;$row->jabatan</td>
        </tr>     
        </table></td>
      </tr>
      <tr >
        <td height='23' align='center' class='header_laporan'><strong>Penerimaan</strong></td>
        <td align='center' class='header_laporan'><strong> Pemotongan</strong></td>
      </tr>
      <tr >
        <td height='23' align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
	    $sql1="select b.nama,a.nilai
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where  a.no_gaji='$row->no_gaji'  and a.nik='$row->nik' and a.kode_param in ('TGDAS','TTJAB','TLBR','TTKOM','TRPL')
order by b.no_urut";
		
$rs1 = $dbLib->execute($sql1);
$tot_pdpt=0;
while ($row1 = $rs1->FetchNextObject($toupper=false))
{
    $nilai=number_format($row1->nilai,0,',','.');
    $tot_pdpt=$tot_pdpt+$row1->nilai;
echo "<tr>
      <td width='270' class='isi_laporan'>$row1->nama</td>
      <td width='30' class='isi_laporan'>: Rp.</td>
      <td width='100' class='isi_laporan' align='right'>$nilai</td>
    </tr>";
		}
        echo "</table></td>
        <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
		 $sql1="select b.nama,abs(a.nilai) as nilai
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.no_gaji='$row->no_gaji'  and a.nik='$row->nik' and a.kode_param in ('TKSUM','THDR','TKOCI','TBPJS','TKKPT','TGIAT')
order by b.no_urut";

		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
				$nilai=number_format($row1->nilai,0,',','.');
				$tot_pot=$tot_pot+$row1->nilai;
        echo "<tr>
          <td width='270' class='isi_laporan'>$row1->nama</td>
          <td width='30' class='isi_laporan'>: Rp.</td>
          <td width='100' class='isi_laporan' align='right'>$nilai</td>
        </tr>";
		}
		$tot_pot1=number_format($tot_pot,0,',','.');
		$tot_pdpt1=number_format($tot_pdpt,0,',','.');
		$total=number_format($tot_pdpt-$tot_pot,0,',','.');
        echo "</table></td>
      </tr>
      <tr >
        <td height='23' align='center' class='header_laporan'><table width='100%' border='0' cellpadding='3' cellspacing='2'>
            <tr>
              <td width='270' class='isi_laporan'>Total Penerimaan </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' align='right' class='isi_laporan'>$tot_pdpt1</td>
            </tr>
        </table></td>
        <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>
            <tr>
              <td width='270' class='isi_laporan'>Total Potongan </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' class='isi_laporan' align='right'>$tot_pot1</td>
            </tr>
        </table></td>
      </tr>
      <tr >
        <td height='23' colspan='2' align='left' class='header_laporan'><span class='isi_laporan'>Gaji dibayar : $total</span></td>
      </tr>
    </table></td>
  </tr>

  <tr>
    <td align='left' class='isi_laporan'> </td>
  </tr>
</table><br><br>";

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
