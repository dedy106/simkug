<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptAbsenBulan extends server_report_basic
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);
		
		$sql="select a.nik,a.nama,b.nama as loker,c.nama as jab,d.nama as dept,e.nama as dir
from gr_karyawan a
inner join (select distinct nik from gr_absen_harian_d) f on a.nik=f.nik
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi
inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi $this->filter
order by a.nik";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$jum=$rs->recordcount();
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sql2="exec sp_gr_absen '$row->nik','$periode','$nik_user' ";
			$rs2 = $dbLib->execute($sql2);
			$sql3="select count(nik) as jumlah from gr_absen_tmp where nik='$row->nik' and nik_user='$nik_user'";
			
			$rs3 = $dbLib->execute($sql3);
			$row3=$rs3->FetchNextObject($toupper=false);
			$jumlah=$row3->jumlah;
			$sql3="select count(a.nik) as libur
from gr_absen_tmp a
left join gr_libur b on a.tanggal between b.tgl_mulai and b.tgl_akhir
where dbo.fnperiode(a.tanggal)='$periode' and b.kode_libur is not null and a.nik='$row->nik' and a.nik_user='$nik_user'";
		
			$rs3 = $dbLib->execute($sql3);
			$row3=$rs3->FetchNextObject($toupper=false);
			$libur=$row3->libur;
			$jml_kerja=$jumlah-$libur;
			$bulan=strtoupper($AddOnLib->ubah_bulan(substr($periode,4,2)));
		echo "<table width='1000'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='1000' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
	<tr align='center'>
        <td colspan=4' class='istyle17'>RINCIAN DATA ABSENSI KARYAWAN </td>
        </tr>
      <tr>
        <td width='100' class='header_laporan'>NIK</td>
        <td width='300' class='header_laporan'>: $row->nik </td>
        <td width='100' class='header_laporan'>DIREKTORAT</td>
        <td width='300' class='header_laporan'>: $row->dir </td>
      </tr>
      <tr>
        <td class='header_laporan'>NAMA</td>
        <td class='header_laporan'>: $row->nama </td>
        <td class='header_laporan'>DEPARTEMEN</td>
        <td class='header_laporan'>: $row->dept </td>
      </tr>
      <tr>
        <td class='header_laporan'>JABATAN</td>
        <td class='header_laporan'>: $row->jab </td>
        <td class='header_laporan'>LOKER</td>
        <td class='header_laporan'>: $row->loker </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150' class='header_laporan'>ABSENSI BULAN </td>
        <td width='1600' class='header_laporan'>: $bulan $tahun</td>
      </tr>
      <tr>
        <td class='header_laporan'>JML HARI KERJA </td>
        <td class='header_laporan'>: $jml_kerja </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' rowspan='2' align='center' class='header_laporan'>NO</td>
        <td colspan='5' align='center' class='header_laporan'>DATANG</td>
        <td width='250' rowspan='2' align='center' class='header_laporan'>KETERANGAN</td>
		<td colspan='5' align='center' class='header_laporan'>PULANG</td>
        <td width='250' rowspan='2' align='center' class='header_laporan'>KETERANGAN </td>
        </tr>
      <tr bgcolor='#CCCCCC'>
        <td width='50' align='center' class='header_laporan'>HARI</td>
		<td width='30' align='center' class='header_laporan'>TGL</td>
        <td width='50' align='center' class='header_laporan'>JAM KERJA </td>
        <td width='50' align='center' class='header_laporan'>JAM SWAP</td>
        <td width='50' align='center' class='header_laporan'>SELISIH (MNT)</td>
        <td width='50' align='center' class='header_laporan'>HARI</td>
		<td width='30' align='center' class='header_laporan'>TGL</td>
        <td width='50' align='center' class='header_laporan'>JAM KERJA </td>
        <td width='50' align='center' class='header_laporan'>JAM SWAP</td>
        <td width='50' align='center' class='header_laporan'>SELISIH (MNT)</td>
        </tr>";
		$sql1="select a.nik,a.tanggal,datepart(day,a.tanggal) as tgl,hari,substring(convert(varchar, a.jam_kerja1, 8),1,5)  as jamk1,
		substring(convert(varchar, a.jam_absen1, 8),1,5)  as jam1,isnull(a.modul,'-') as modul,
       a.keterangan1,substring(convert(varchar, a.jam_kerja2, 8),1,5)  as jamk2,substring(convert(varchar, a.jam_absen2, 8),1,5)  as jam2,a.keterangan2,
	   datediff (mi,a.jam_kerja1,jam_absen1) as selisih1,datediff (mi,a.jam_kerja2,jam_absen2) as selisih2,case when b.kode_libur is not null then 'LIBUR' else '-' end as libur 
from gr_absen_tmp a
left join gr_libur b on a.tanggal between b.tgl_mulai and b.tgl_akhir
where a.nik='$row->nik' and a.nik_user='$nik_user' order by a.tanggal ";
		
		$rs1 = $dbLib->execute($sql1);
		$tot_pdpt=0;
		$i = 1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		
		if ($row1->libur=="libur")
		{
			$selisih1=$row1->selisih1;
			$keterangan1=$row1->keterangan1;
			$selisih2=$row1->selisih2;
			$keterangan2=$row1->keterangan2;
			$selisih2=$row1->selisih2;
			$keterangan2=$row1->keterangan2;
			$jam1=$row1->jam1;
			$jam2=$row1->jam2;
			
			$selisih1="";$selisih2="";
			$jam1="";$jam2="";
			if ($keterangan1!="SPJ")
			{
				$keterangan1="Libur";
				$keterangan2="Libur";
			}
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td align='center' class='isi_laporan'><span style='color:red'>$row1->hari</span></td>
        <td class='isi_laporan' align='center'><span style='color:red'>$row1->tgl</span></td>
        <td class='isi_laporan' align='center'>$row1->jamk1</td>
        <td class='isi_laporan' align='center'>$jam1</td>
        <td class='isi_laporan' align='center'>$selisih1</td>
        <td class='isi_laporan'>$keterangan1</td>
       <td class='isi_laporan' align='center'><span style='color:red'>$row1->hari</span></td>
        <td class='isi_laporan' align='center'><span style='color:red'>$row1->tgl</span></td>
        <td class='isi_laporan' align='center'>$row1->jamk2</td>
        <td class='isi_laporan' align='center'>$jam2</td>
		<td class='isi_laporan' align='center'>$selisih2</td>
        <td class='isi_laporan'>$keterangan2</td>
        </tr>";
		}
		else
		{
			$selisih1=$row1->selisih1;
			$keterangan1=$row1->keterangan1;
			$selisih2=$row1->selisih2;
			$keterangan2=$row1->keterangan2;
			$selisih2=$row1->selisih2;
			$keterangan2=$row1->keterangan2;
			$jam1=$row1->jam1;
			$jam2=$row1->jam2;
			if ($row1->jam1=="00:00")
			{
				$selisih1="";
				$keterangan1="Tidak Absen Datang";
				$jam1="";
			}
			if ($row1->jam2=="00:00")
			{
				$selisih2="";
				$keterangan2="Tidak Absen Pulang";
				$jam2="";
			}
			
			if ($row1->modul=="SPJ" || $row1->modul=="CUTI" || $row1->modul=="IJIN")
			{
				$selisih1="";$jam1="";$selisih2="";$jam2="";
			}
			if ($row1->modul=="-")
			{
				$keterangan1="Alpha";$keterangan2="Alpha";
			}
			
			 echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan' align='center'>$row1->hari</td>
        <td class='isi_laporan' align='center'>$row1->tgl</td>
        <td class='isi_laporan' align='center'>$row1->jamk1</td>
        <td class='isi_laporan' align='center'>$jam1</td>
        <td class='isi_laporan' align='center'>$selisih1</td>
        <td class='isi_laporan'>$keterangan1</td>
       <td class='isi_laporan' align='center'>$row1->hari</td>
        <td class='isi_laporan' align='center'>$row1->tgl</td>
        <td class='isi_laporan' align='center'>$row1->jamk2</td>
        <td class='isi_laporan' align='center'>$jam2</td>
		<td class='isi_laporan' align='center'>$selisih2</td>
        <td class='isi_laporan'>$keterangan2</td>
        </tr>";
		}
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
 
</table></td>
  </tr>
  <tr>
    <td align='left' style='{font-size:9;}'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
      	
		}
		
		echo "</div>";
			
		return "";
	}
	
}
?>
  
