<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptApp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
    $sql="select h.nama as proyek,a.kode_lokasi,a.no_app,a.tanggal,a.no_pesan,convert(varchar,a.tanggal,103) as tgl,
    d.kode_pp,d.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik,c.nama as pembuat,a.nik_user,f.nama as tahu,e.status,g.catatan,a.maksud, a.aspek
    from log_pesan_m a 
    inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
    inner join pp  d on a.kode_ppaju=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
    inner join app_m  e on a.no_app=e.no_app and a.kode_lokasi=e.kode_lokasi 
    inner join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
    inner join app_d g on e.no_app=g.no_app and e.no_app=g.no_app
    left join log_proyek h on h.kode_proyek=a.kode_proyek and h.kode_lokasi=a.kode_lokasi
 $this->filter ";


		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/gratika2.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $logo="image/".$row->logo;
			$alamat=$row->alamat;
      $nama_lokasi=strtoupper($row->nama_lokasi);
      $maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='right'><img src='$logo' width='251' height='100'></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' class='istyle17'><u>APPROVAL REQUEST </td><u>
  </tr>
  <tr>
    <td align='center' class='istyle17'>NO : $row->no_app</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Status</td>
        <td class='isi_bukti'>: $row->status </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Catatan Approve</td>
        <td class='isi_bukti'>: $row->catatan </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>No. Request</td>
        <td class='isi_bukti'>: $row->no_pesan </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Tanggal Request</td>
        <td class='isi_bukti'>: $row->tgl  </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>PP</td>
        <td class='isi_bukti'>: $row->pp  </td>
      </tr>
      <tr>
      <td  height='20' class='isi_bukti'>Deskripsi</td>
      <td class='isi_bukti'>: $row->keterangan </td>
    </tr>      <tr>
    <td  height='20' class='isi_bukti'>No Dokumen</td>
    <td class='isi_bukti'>: $row->no_dokumen  </td>
  </tr>
  <tr>
  <td  height='20' class='isi_bukti'>Proyek</td>
  <td class='isi_bukti'>: $row->proyek  </td>
</tr>
  <tr>
  <td  height='20' class='isi_bukti'>Nilai Request</td>
  <td class='isi_bukti'>: ".number_format($row->nilai,0,",",".")." </td>
</tr>
    </table></td>
  </tr>
  <tr>
  <td  height='5' class='isi_bukti'><b>Data Budget</td></b>
</tr>

  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>No</td>
        <td width='80' align='center' class='isi_bukti'>Kode Akun</td>
        <td width='300' align='center' class='isi_bukti'>Nama Akun</td>
        <td width='80' align='center' class='isi_bukti'>Saldo Awal</td>
        <td width='80' align='center' class='isi_bukti'>Nilai</td>
        <td width='80' align='center' class='isi_bukti'>Saldo Akhir</td>
      </tr>";

    $sql1="select a.kode_akun,b.nama as nama_akun,a.saldo,a.nilai,a.saldo-a.nilai as sakhir 
    from angg_r a
    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 					
    where a.no_bukti ='$row->no_pesan' and a.kode_lokasi='$row->kode_lokasi' and a.modul='LOGREQ' 
    order by a.kode_akun ";
	
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$nilai=0;$npajak=0;$netto=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai+=$row1->sakhir;
			// $npajak+=$row1->npajak;
			// $netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
        <td class='isi_bukti'>$row1->kode_akun</td>
        <td class='isi_bukti'>$row1->nama_akun</td>     
        <td class='isi_bukti' align='right'>".number_format($row1->saldo,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row1->sakhir,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='5' align='center' class='isi_bukti'>JUMLAH</td>
        <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
      </tr>
	 
    </table></td>
  </tr>

  <tr>
  <td  height='5' class='isi_bukti'><b>Detail Request</td></b>
</tr>

  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>No</td>
        <td width='80' align='center' class='isi_bukti'>Item Barang</td>
        <td width='100' align='center' class='isi_bukti'>Merk</td>
        <td width='250' align='center' class='isi_bukti'>Tipe</td>
        <td width='100' align='center' class='isi_bukti'>Spesifikasi</td>
        <td width='100' align='center' class='isi_bukti'>Jumlah</td>
        <td width='100' align='center' class='isi_bukti'>Harga Estimasi</td>
        <td width='100' align='center' class='isi_bukti'>Total</td>
      </tr>";

    $sql2="select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total 
    from log_pesan_d
     where no_pesan='$row->no_pesan'  and kode_lokasi='$row->kode_lokasi'  
     order by no_urut ";

	
		$rs2 = $dbLib->execute($sql2);
		$i=1;
		$nilai=0;$npajak=0;$netto=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{	
			$nilai2+=$row2->total;
			// $npajak+=$row1->npajak;
			// $netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
        <td class='isi_bukti'>$row2->item</td>     
        <td class='isi_bukti'>$row2->merk</td>
        <td class='isi_bukti'>$row2->tipe</td> 
        <td class='isi_bukti'>$row2->catatan</td>
        <td class='isi_bukti'>$row2->jumlah</td>     
        <td class='isi_bukti' align='right'>".number_format($row2->nilai,0,",",".")."</td>
        <td class='isi_bukti' align='right'>".number_format($row2->total,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='7' align='center' class='isi_bukti'>JUMLAH</td>
        <td class='isi_bukti' align='right'>".number_format($nilai2,0,",",".")."</td>
      </tr>
	 
    </table></td>
  </tr>
 
  <tr>
  <td><table width='800' border='0' cellspacing='2' cellpadding='1'>

  <tr>
  <td class='header_laporan' >Maksud - Tujuan</td>
  <td class='header_laporan' >:</td>
  <td class='header_laporan' >$maksud</td>
</tr>
<tr>
<td class='header_laporan' >Aspek Strategis</td>
<td class='header_laporan' >:</td>
<td class='header_laporan' >$aspek</td>
</tr>

  </table></td>
</tr>

  <tr>
    <td>&nbsp;</td>

</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
