<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_if_rptIfForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$tahun=substr($periode,0,4);
		$nama_cab=$tmp[1];
		$sql="select a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,a.keterangan,
		a.kode_pp,b.nama as nama_pp,a.nilai,a.user_input,a.tanggal,c.kota,a.user_input,a.nik_app,d.nama as nama_buat,e.nama as nama_app
from if_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.user_input=d.nik 
inner join karyawan e on a.nik_app=e.nik 
$this->filter order by a.no_aju";
		
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pengajuan kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'>
    <td height='30' class='istyle17'>PENCATATAN KUITANSI</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td align='center'>Nomor : $row->no_aju</td>
        </tr>
		
        <tr>
          <td align='left'><table width='600' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='107'>PP</td>
              <td width='483'>: $row->kode_pp - $row->nama_pp </td>
            </tr>
            <tr>
              <td>Tanggal </td>
              <td>: $row->tgl </td>
            </tr>
			<tr>
              <td>Tanggal Kuitansi</td>
              <td>: $row->tgl_kuitansi </td>
            </tr>
          
            <tr>
              <td>Keterangan</td>
              <td>: $row->keterangan </td>
            </tr>
          </table></td>
        </tr>
		
        <tr>
          <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr align='center'>
                <td width='30' class='judul_laporan'>No</td>
                <td width='70' class='judul_laporan'>Kode Akun </td>
                <td width='200' class='judul_laporan'>Nama Akun </td>
                <td width='60' class='judul_laporan'>Kode PP </td>
                <td width='60' class='judul_laporan'>Kode DRK </td>
                <td width='270' class='judul_laporan'>Keterangan</td>
				<td width='40' class='judul_laporan'>DC</td>
                <td width='90' class='judul_laporan'>Nilai</td>
              </tr>'";
			 $sql="select a.kode_akun,b.nama as nama_akun,a.nilai,a.kode_pp,a.kode_drk,c.nama as nama_pp,d.nama as nama_drk,a.keterangan,a.dc
from if_aju_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun'
where a.no_aju='$row->no_aju' order by a.dc desc,a.kode_akun ";
			
			$rs1 = $dbLib->execute($sql);
			$i=1;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total=$total+$row1->total;
              echo "<tr>
                <td align='center' class='isi_laporan'>$i</td>
                <td class='isi_laporan'>$row1->kode_akun</td>
                <td class='isi_laporan'>$row1->nama_akun</td>
                <td class='isi_laporan'>$row1->kode_pp</td>
                <td class='isi_laporan'>$row1->kode_drk</td>
                <td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->dc</td>
                <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
              </tr>";
				$i=$i+1;
			}                                                       
			
              echo "<tr>
                <td colspan='7' align='right' class='isi_laporan'>Total</td>
                <td align='right' class='isi_laporan'>".number_format($total,0,',','.')."</td>
              </tr>
            
          </table></td>
        </tr>
		<tr>
          <td>&nbsp;</td>
     
		
        <tr>
          <td align='right'><table width='431' border='0' cellspacing='2' cellpadding='1'>
				<tr align='center'>
                <td align='center'>&nbsp;</td>
                <td align='left'>&nbsp; </td>
              </tr>
              <tr align='center'>
                <td colspan='2' align='center'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
              </tr>
              <tr align='center'>
                <td width='203'>Disetujui </td>
                <td width='218'>Dibuat </td>
              </tr>
              <tr>
                <td height='70'>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr align='center'>
                <td>$row->nama_app</td>
                <td>$row->nama_buat</td>
              </tr>
              <tr align='center'>
                <td>$row->nik_app</td>
                <td>$row->user_input</td>
              </tr>
          </table></td>
        </tr>
    </table></td>
  </tr>
</table><br>";
		
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
