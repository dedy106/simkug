<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptSlipGajiHarian extends server_report_basic
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
		$sql="select a.no_gaji,a.periode,b.nik,c.nama,a.periode,a.tanggal,a.keterangan,d.nama as nama_jab,e.nama as nama_dept,
	   datepart(month,a.tanggal) as bulan,datepart(year,a.tanggal) as tahun,c.flag_gaji
from gr_gaji_m a
inner join (select distinct a.nik,a.no_gaji,a.kode_lokasi
           from gr_gaji_d a 
		   inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.flag_gaji='HARIAN' 
		   group by a.nik,a.no_gaji,a.kode_lokasi
           )b on a.no_gaji=b.no_gaji and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
left join gr_jab d on c.kode_jab=d.kode_jab and c.kode_lokasi=d.kode_lokasi
left join gr_dept e on c.kode_dept=e.kode_dept and c.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_gaji,b.nik";
		
		
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = "/server/image/siaga.png";
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
        <td width='70%' rowspan='4'><span class='header_laporan'><img src='$pathfoto' width='213' height='80'/></span></td>
        <td width='30%' class='header_laporan'>PT. GRAHA INFORMATIKA NUSANTARA</td>
      </tr>
      <tr>
        <td class='header_laporan'>Gedung Dana Pensiun Telkom Lt. 4</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jl. Jend. S. Parman Kav. 56, Jakarta 11410</td>
      </tr>
      <tr>
        <td class='header_laporan'>Telp. 021-5325432, Fax 021-53673444</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle15'><b>SLIP GAJI BULAN $bulan $row->tahun </b>   </td>
  </tr>
  <tr>
    <td align='center' class='istyle15'>$row->no_gaji</td>
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
              <td width='35%' class='header_laporan'>:&nbsp;$row->nama</td>
              <td width='10%' class='header_laporan'>Jabatan</td>
              <td width='45%' class='header_laporan'>:&nbsp;$row->nama_jab</td>
            </tr>
            <tr>
              <td class='header_laporan'>NIK</td>
              <td class='header_laporan'>:&nbsp;$row->nik</td>
              <td class='header_laporan'>Departemen</td>
              <td class='header_laporan'>:&nbsp;$row->nama_dept</td>
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
where  a.no_gaji='$row->no_gaji'  and a.nik='$row->nik' and a.nilai>0  and a.kode_param='HONTP'
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
from gr_gaji_d a
inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.no_gaji='$row->no_gaji'  and a.nik='$row->nik' and a.nilai<0 
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
 
  if ($row->flag_gaji=="HARIAN")
  {
	$sql="select a.nilai,convert(varchar,a.tgl_awal,103) as tgl_awal,convert(varchar,a.tgl_akhir,103) as tgl_akhir,c.tarif_uhar
from gr_gajiload_d a
inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_lokkantor c on b.lok_kantor=c.kode_lokkantor and b.kode_lokasi=c.kode_lokasi
where a.periode='$row->periode' and a.nik='$row->nik'";
	
	$rs2 = $dbLib->execute($sql);
	while ($row2 = $rs2->FetchNextObject($toupper=false))
	{
		
	
	echo "<tr>
    <td align='left'><table width='100%'  border='0'>
      
      <tr>
        <td width='20%' class='header_laporan'>Periode hari kerja</td>
        <td width='80%' class='header_laporan'>: $row2->tgl_awal sd $row2->tgl_akhir </td>
      </tr>
      <tr>
        <td class='header_laporan'>Jumlah hari kerja</td>
        <td class='header_laporan'>: ".number_format($row2->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td class='header_laporan'>Uang harian</td>
        <td class='header_laporan'>: ".number_format($row2->tarif_uhar,0,",",".")." </td>
      </tr>
    </table> </td>
  </tr>";
	}
  }
echo "</table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br><br>";

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
