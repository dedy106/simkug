<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_apparindo_rptAnggota2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.kode_cust,a.nama,a.alamat,a.no_telp,a.npwp,a.tgl_berdiri,
		case b.kode_jab when 'DIR1' then b.kode_jab end as dir1,
		case b.kode_jab when 'DU' then b.kode_jab end as dirut,
		case b.kode_jab when 'KOM1' then b.kode_jab end as kom1,
		case b.kode_jab when 'KOMU' then b.kode_jab end as komut,
		case b.kode_jab when 'DIR1' then b.no_hp end as hp1,
		case b.kode_jab when 'DU' then b.no_hp end as hp2,
		case b.kode_jab when 'KOM1' then b.no_hp end as hp3,
		case b.kode_jab when 'KOMU' then b.no_hp end as hp4
		from cust2 a
		left join ape_rel_jab b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.kode_cust";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data anggota",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Nomor Anggota</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Tanggal Pendirian</td>
     <td width='90'  align='center' class='header_laporan'>Direktur 1</td>
     <td width='90'  align='center' class='header_laporan'>No. HP</td>
     <td width='90'  align='center' class='header_laporan'>Direktur Utama</td>
	 <td width='90'  align='center' class='header_laporan'>No. HP</td>
     <td width='90'  align='center' class='header_laporan'>Komisaris 1</td>
     <td width='90'  align='center' class='header_laporan'>No. HP</td>
     <td width='90'  align='center' class='header_laporan'>Komisaris Utama</td>
	 <td width='90'  align='center' class='header_laporan'>No. HP</td>
     <td width='350'  align='center' class='header_laporan'>Alamat</td>
     <td width='90'  align='center' class='header_laporan'>E-mail</td>
     <td width='90'  align='center' class='header_laporan'>NPWP</td>
	 <td width='90'  align='center' class='header_laporan'>No. Telepon</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tgl_berdiri</td>
	 <td class='isi_laporan'>$row->dir1</td>
	 <td class='isi_laporan'>$row->hp1</td>
	 <td class='isi_laporan'>$row->dirut</td>
	 <td class='isi_laporan'>$row->hp2</td>
	 <td class='isi_laporan'>$row->kom1</td>
	 <td class='isi_laporan'>$row->hp3</td>
	 <td class='isi_laporan'>$row->komut</td>
	 <td class='isi_laporan'>$row->hp4</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->email</td>
	 <td class='isi_laporan'>$row->npwp</td>
	 <td class='isi_laporan'>$row->no_telp</td>

     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
