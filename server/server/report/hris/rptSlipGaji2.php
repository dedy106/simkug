<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptSlipGaji2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.nik)
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi
inner join gr_dept c on a.kode_dept=c.kode_dept and a.kode_lokasi=c.kode_lokasi
left join (select distinct nik,no_gaji,kode_lokasi,periode
           from gr_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_gaji_m e on d.no_gaji=e.no_gaji and d.kode_lokasi=e.kode_lokasi $this->filter ";
		
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
		$sql="select a.nik,a.nama,b.nama as jabatan,c.nama as dept,a.kode_lokasi,d.no_gaji,d.periode,e.tanggal,e.keterangan,
		      datepart(month,e.tanggal) as bulan,datepart(year,e.tanggal) as tahun
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi
inner join gr_dept c on a.kode_dept=c.kode_dept and a.kode_lokasi=c.kode_lokasi
left join (select distinct nik,no_gaji,kode_lokasi,periode
           from gr_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_gaji_m e on d.no_gaji=e.no_gaji and d.kode_lokasi=e.kode_lokasi $this->filter order by a.nik";

		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='600'  border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='13%' rowspan='4'><span class='header_laporan'><img src='../../logo.jpg' width='71' height='88'/></span></td>
        <td width='87%'>PT. GRAHA INFORMATIKA NUSANTARA</td>
      </tr>
      <tr>
        <td>Gedung Dana Pensiun Telkom Lt. 4</td>
      </tr>
      <tr>
        <td>Jl. Jend. S. Parman Kav. 56, Jakarta 11410</td>
      </tr>
      <tr>
        <td>Telp. 021-5325432, Fax 021-53673444</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>SLIP GAJI/ THR/ BONUS BULAN $bulan $row->tahun    </td>
  </tr>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='1' class='kotak' width='800'>
      <tr>
        <td height='23' colspan='8' class='header_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
            <tr>
              <td width='10%' class='header_laporan'>Nama</td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->nama</td>
              <td width='20%' class='header_laporan'>Jabatan</td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->jabatan</td>
            </tr>
            <tr>
              <td class='header_laporan'>NIK</td>
              <td class='header_laporan'>:&nbsp;$row->nik</td>
              <td class='header_laporan'>Departemen</td>
              <td class='header_laporan'>:&nbsp;$row->dept</td>
            </tr>
           
        </table></td>
      </tr>
      <tr >
        <td height='23' align='center' class='header_laporan'><strong>Pendapatan</strong></td>
        <td align='center' class='header_laporan'><strong> Potongan</strong></td>
      </tr>
      <tr >
        <td height='23' align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
	    $sql1="select b.nama,a.nilai
from gr_gaji_d a
inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.periode='$row->periode' and b.dc='D' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and b.jenis='T'
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
		$sql1="select b.nama,a.nilai
from gr_gaji_d a
inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.periode='$row->periode' and b.dc='C' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and b.jenis='T'
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
              <td width='50%' class='isi_laporan'>Total Penerimaan </td>
              <td width='10%' class='isi_laporan'>: Rp.</td>
              <td width='40%' align='right' class='isi_laporan'>$tot_pdpt1</td>
            </tr>
        </table></td>
        <td align='center' valign='top' class='header_laporan'><table width='100%' border='0'>
            <tr>
              <td width='50%' class='isi_laporan'>Total Potongan </td>
              <td width='15%' class='isi_laporan'>: Rp.</td>
              <td width='35%' class='isi_laporan' align='right'>$tot_pot1</td>
            </tr>
        </table></td>
      </tr>
      <tr >
        <td height='23' colspan='2' align='left' class='header_laporan'><span class='isi_laporan'>Total pendapatan ditransfer sebesar : Rp $total</span></td>
      </tr>
    </table></td>
  </tr>
   <tr>
    <td align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td align='left'><table width='100%'  border='0'>
      <tr>
        <td colspan='2'>Keterangan</td>
        </tr>
      <tr>
        <td width='20%'>Periode hari kerja</td>
        <td width='80%'>: a </td>
      </tr>
      <tr>
        <td>Jumlah hari kerja</td>
        <td>: a </td>
      </tr>
      <tr>
        <td>Uang harian</td>
        <td>: a </td>
      </tr>
    </table> </td>
  </tr>
</table><br><br>
";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
