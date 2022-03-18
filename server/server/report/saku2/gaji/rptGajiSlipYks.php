<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_gaji_rptGajiSlipYks extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$no_gaji=$tmp[2];
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
		$no_gaji=$tmp[2];
		$sql="select a.nik,a.nama,a.kode_lokasi,b.nama as nama_loker,c.nama as sts_sdm,d.nama as nama_grade,a.nik2,
			f.no_gaji,f.tanggal,f.keterangan,a.no_rek,a.nama_rek,a.bank,a.cabang,f.pesan,f.nik_app,g.nama as nama_app,
		    datepart(month,f.tanggal) as bulan,datepart(year,f.tanggal) as tahun,f.tgl_transfer,
			datepart(month,f.tanggal) as bulan,datepart(year,f.tanggal) as tahun,f.pesan,h.nama as nama_jab
from hr_karyawan a
inner join hr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join hr_status_sdm c on a.sts_sdm=c.sts_sdm and a.kode_lokasi=c.kode_lokasi
inner join hr_grade d on a.kode_grade=d.kode_grade and a.kode_lokasi=d.kode_lokasi
left join hr_jab h on a.kode_jab=h.kode_jab and a.kode_lokasi=h.kode_lokasi
left join (select distinct a.nik,a.no_gaji,a.kode_lokasi
           from hr_gaji_d a 
           where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.no_gaji='$no_gaji'
           )e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi
left join hr_gaji_m f on e.no_gaji=f.no_gaji and e.kode_lokasi=f.kode_lokasi
left join hr_karyawan g on f.nik_app=g.nik and f.kode_lokasi=g.kode_lokasi
$this->filter order by a.nama";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/yakes.png";
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><img src='$pathfoto' width='368' height='110'></td>
  </tr>
  <tr>
    <td align='center'>SLIP PENGHASILAN PEGAWAI YAKES TELKOM</td>
  </tr>
  <tr>
    <td align='center'>PERIODE BULAN $bulan $row->tahun</td>
  </tr>
  <tr>
    <td align='center'>NO GAJI : $row->no_gaji</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='98'>Nama</td>
        <td width='281'>: $row->nama </td>
        <td width='97'>NIP</td>
        <td width='306'>: $row->nik </td>
      </tr>
      <tr>
        <td>Band</td>
        <td>: $row->nama_grade </td>
        <td>Jabatan</td>
        <td>: $row->nama_jab </td>
      </tr>
      <tr>
        <td>Loker</td>
        <td>: $row->nama_loker </td>
        <td>Status</td>
        <td>: $row->sts_sdm </td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td colspan='2' height='25'>PENERIMAAN</td>
        <td colspan='2'>POTONGAN</td>
        </tr>
    
		<tr>
        <td colspan='2' valign='top'><table width='100%' border='0'>";
	    $sql1="select b.nama,a.nilai
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where b.dc='D' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
        <td colspan='2'><table width='100%' border='0'>";
	    $sql1="select b.nama,a.nilai
from hr_gaji_d a
inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where b.dc='C' and a.no_gaji='$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and a.nik='$row->nik' and a.nilai<>0
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
        echo "</table></td>
        </tr>
		
       <tr>
        <td colspan='2' valign='top'><table width='400' border='0' cellpadding='3' cellspacing='2'>
            <tr>
              <td width='270' class='isi_laporan'>Total Penerimaan </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' align='right' class='isi_laporan'>".number_format($tot_pdpt,0,',','.')."</td>
            </tr>
        </table></td>
        <td colspan='2'><table width='400' border='0'>
            <tr>
              <td width='270' class='isi_laporan'>Total Potongan </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' class='isi_laporan' align='right'>".number_format($tot_pot,0,',','.')."</td>
            </tr>
        </table> </td>
        </tr>";
     
      echo "  
      <tr>
        <td colspan='4'><table width='400' border='0' cellpadding='3' cellspacing='2'>
            <tr>
              <td width='270' class='isi_laporan'>Total Penerimaan </td>
              <td width='30' class='isi_laporan'>: Rp.</td>
              <td width='100' align='right' class='isi_laporan'>".number_format($tot_pdpt-$tot_pot,0,',','.')."</td>
            </tr>
        </table></td>
        </tr>
      <tr>
        <td colspan='4'><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td>Telah ditransfer Tanggal ".substr($row->tgl_transfer,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_transfer),0,6))." melalui :</td>
          </tr>
          <tr>
            <td>Nomor Rekening $row->no_rek an. $row->nama_rek pada $row->bank $row->cabang </td>
          </tr>
        </table></td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&ldquo; $row->pesan &rdquo;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_app</td>
      </tr>
      <tr>
        <td>$row->jab_app</td>
      </tr>
    </table></td>
  </tr>
</table><DIV style='page-break-after:always'></DIV>";
 

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
