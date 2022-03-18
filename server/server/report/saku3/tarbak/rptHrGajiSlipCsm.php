<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_rptHrGajiSlipCsm extends server_report_basic
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
		$sql="select nama,alamat,logo from lokasi where kode_lokasi='$kode_lokasi' ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_lokasi=$row->nama;
		$alamat=$row->alamat;
		$logo=$row->logo;
		$sql="select a.nik,a.nama,a.kode_lokasi,c.no_gaji,b.periode,c.tanggal,c.keterangan,
		      datepart(month,c.tanggal) as bulan,datepart(year,c.tanggal) as tahun,d.nama as nama_jab,e.nama as nama_loker
from hr_karyawan a
left join (select distinct nik,no_gaji,kode_lokasi,periode
           from hr_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join hr_gaji_m c on b.no_gaji=c.no_gaji and b.kode_lokasi=c.kode_lokasi
inner join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi
inner join hr_loker e on a.kode_loker=e.kode_loker and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.nik";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/csm.jpg";
		
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='700'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='700'  border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td><table width='700'  border='0'>
      <tr>
        <td width='120' rowspan='4'><span class='header_laporan'><img src='$pathfoto' width='180' height='80' /></span></td>
        <td width='580' class='header_laporan' align='center'>$nama_lokasi<br>$alamat<br><br>SLIP GAJI BULAN $bulan $row->tahun</td>
      </tr>
     
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='1' class='kotak' width='800'>
      <tr>
        <td height='23' colspan='8' class='header_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
            <tr>
              <td width='10%' class='header_laporan'>Nama</td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->nama</td>
              <td width='10%' class='header_laporan'>Jabatan</td>
              <td width='45%' class='header_laporan'>:&nbsp;$row->nama_jab</td>
            </tr>
            <tr>
              <td class='header_laporan'>NIK</td>
              <td class='header_laporan'>:&nbsp;$row->nik</td>
              <td class='header_laporan'>Lokasi Kerja</td>
              <td class='header_laporan'>:&nbsp;$row->nama_loker</td>
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
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where  a.periode='$row->periode' and b.dc='D' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where  a.periode='$row->periode' and b.dc='C' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
        <td height='23' colspan='2' align='left' class='header_laporan'><span class='isi_laporan'>Total pendapatan ditransfer sebesar : Rp $total</span></td>
      </tr>
    </table></td>
  </tr>";
 

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
