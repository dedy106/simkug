<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_gaji_rptGajiSlipRsp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.nik)
from hr_karyawan a
left join (select distinct nik,no_gaji,kode_lokasi,periode
           from hr_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
inner join hr_gaji_m e on d.no_gaji=e.no_gaji and d.kode_lokasi=e.kode_lokasi
$this->filter ";
		
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
		$sql="select a.nik,a.nama,a.kode_lokasi,c.no_gaji,b.periode,c.tanggal,c.keterangan,
		      datepart(month,c.tanggal) as bulan,datepart(year,c.tanggal) as tahun,
			d.nama as nama_jab,a.kode_level,a.cabang,a.no_rek
from hr_karyawan a
left join (select distinct nik,no_gaji,kode_lokasi,periode
           from hr_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join hr_gaji_m c on b.no_gaji=c.no_gaji and b.kode_lokasi=c.kode_lokasi
inner join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi
 $this->filter order by a.nik";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/rasapala.jpg";
		$ttd = $path . "image/ttd.jpg";
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='700'  border='0' cellspacing='2' cellpadding='1'>
 <tr>
    <td align='center'><img src='$pathfoto' width='120' height='128'></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>SLIP GAJI</td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>PERIODE BULAN $bulan $row->tahun</td>
  </tr>
  <tr>
    <td align='center' class='istyle18'>NO GAJI : $row->no_gaji</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
      <tr>
        <td height='23' colspan='8' class='header_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
            <tr>
              <td width='10%' class='header_laporan'>NIK / NAMA </td>
              <td width='35%' class='header_laporan'>:&nbsp;$row->nik / $row->nama</td>
              <td width='10%' class='header_laporan'>JABATAN</td>
              <td width='45%' class='header_laporan'>:&nbsp;$row->nama_jab</td>
            </tr>
            <tr>
              <td class='header_laporan'>LEVEL POSISI</td>
              <td class='header_laporan'>:&nbsp;$row->kode_level</td>
              <td class='header_laporan'>DEPARTEMEN</td>
              <td class='header_laporan'>:&nbsp;$row->nama_dept</td>
            </tr>
           
        </table></td>
      </tr>
      <tr >
        <td height='23' align='center' class='header_laporan'>PENERIMAAN</td>
        <td align='center' class='header_laporan'> POTONGAN</td>
      </tr>
      <tr >
        <td height='23' align='center' valign='top' class='header_laporan'><table width='100%' border='0'>";
	    $sql1="select b.nama,a.nilai
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where b.jenis='T' and a.periode='$row->periode' and b.dc='D' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
where b.jenis='T' and a.periode='$row->periode' and b.dc='C' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
         <td height='23' align='center' class='header_laporan'><table width='100%' border='0' cellpadding='3' cellspacing='2'>
            <tr>
              <td width='270' class='isi_laporan'>TAKE HOME PAY  </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' align='right' class='isi_laporan'>$total</td>
            </tr>
        </table></td>
      </tr>
	  <tr>
        <td height='23' colspan='8' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='500'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='10%' class='header_laporan' colspan='2'>DITRANSFER KE : </td>
      </tr>
      <tr>
        <td width='10%' class='header_laporan'>Nama Bank</td>
        <td width='35%' class='header_laporan'>:&nbsp;$row->cabang</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Rekening</td>
        <td class='header_laporan'>:&nbsp;$row->no_rek</td>
      </tr>
    </table></td>
    <td width='300'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td><img src='$ttd' ></td>
      </tr>
      <tr>
        <td class='header_laporan'>Wiedya Agustianty E</td>
      </tr>
      <tr>
        <td class='header_laporan'>Asman HRD</td>
      </tr>
    </table></td>
  </tr>
</table></td>
      </tr>
    </table></td>
 ";
 

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
