<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptAlt2 extends server_report_basic
{	
	var $tblHeader;
	var $dbField;
	var $dbSQL;
	var $dbSQLField;
	
	function getTotalPage()
	{
		global $dbLib;
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$jns_proc = $jns_proc[0];
		
		$sql = "select count(*) from (select distinct bb.nama as nmarea, c.nama as nmubis, 			
			date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, i.kode_klpfa, i.nama as nmklp, b.kode_lokfa			
				from amu_asset b 
				inner join amu_lokasi bb on b.kode_lokfa = bb.kode_lokfa and b.kode_lokasi = bb.kode_lokasi
				inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi
				inner join amu_klp i on i.kode_klpfa = b.kode_klpfa and i.kode_lokasi = b.kode_lokasi 
				left join amu_alt_konv_d k on k.no_fa = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode'  ".  $this->filter ." ) a ";
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
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$jns_proc = $jns_proc[0];
		
		$this->initColumn($jns_proc);
		$sql1 = "select distinct bb.nama as nmarea, c.nama as nmubis, 			
			date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, i.kode_klpfa, i.nama as nmklp, b.kode_lokfa, 
			e.nik1,f.nama as nama1,e.nik2,g.nama as nama2,e.nik3,h.nama as nama3  
				from amu_asset b 
				inner join amu_lokasi bb on b.kode_lokfa = bb.kode_lokfa and b.kode_lokasi = bb.kode_lokasi
				inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi
				inner join amu_klp i on i.kode_klpfa = b.kode_klpfa and i.kode_lokasi = b.kode_lokasi
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				
				left join amu_ttd e on b.kode_lokfa=e.kode_lokfa
				left join amu_karyawan f on e.nik1=f.nik
				left join amu_karyawan g on e.nik1=g.nik
				left join amu_karyawan h on e.nik1=h.nik ".  $this->filter ;			
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);
		while ($row1 = $rs1->FetchNextObject(true))
		{
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='10%'><img src='../image/telkomindonesia.png' width='170' height='100'/></td>
        <td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>KERTAS KERJA KONVERSI DATA ASET MODUL SAP </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='9%' class='header_laporan'>Divisi / Ubis </td>
        <td width='91%' class='header_laporan'>: $row1->NMUBIS</td>
      </tr>
      <tr>
        <td class='header_laporan'>Area Bisnis </td>
        <td class='header_laporan'>: $row1->NMAREA</td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi</td>
        <td class='header_laporan'>: $row1->TEMPAT</td>
      </tr>
      <tr>
        <td class='header_laporan'>Group Asset </td>
        <td class='header_laporan'>: $row1->NMKLP</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    
  </tr>";
	    $sql = "select distinct b.no_fa, b.no_sn,  b.nama,d.nama as jenis, b.alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku,k.jns_proc 
					from amu_asset b					
					inner join amu_klp d on b.kode_klpfa=d.kode_klpfa 
					inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
					left join amu_alt_konv_d k on k.no_fa = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' ". $this->dbSQL . " 
					where b.kode_klpfa = '$row1->KODE_KLPFA' and b.kode_lokfa = '$row1->KODE_LOKFA' ". $this->filter ."
					order by b.no_fa ";		
		//$rs = $dbLib->execute($sql);		
		$sql=  str_replace("\t","",$sql);
		//$sql=  str_replace("\n","",$sql);
		
		$rs=$dbLib->execute($sql);
		$i = 1;
		
		//$html=$AddOnLib->judul_laporan("laporan neraca",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<tr>
				<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
				 <tr align='center' bgcolor='#CCCCCC'>
					<td colspan='9' bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
					<td colspan='5' bgcolor='#00FF00' class='header_laporan'>DATA HASIL KONVERSI </td>
					</tr>
				  <tr align='center' bgcolor='#CCCCCC'>
					<td class='header_laporan'>No Kartu </td>
					<td class='header_laporan'>SN</td>
					<td class='header_laporan'>Jenis</td>
					<td class='header_laporan'>Deskripsi Asset</td>
					<td class='header_laporan'>Deskripsi Alamat</td>
					<td class='header_laporan'>Cap Date </td>
					<td class='header_laporan'>Harga Perolehan </td>
					<td class='header_laporan'>Akumulasi Penyusutan </td>
					<td class='header_laporan'>Nilai Buku </td>". $this->tblHeader ."
				  </tr>
				  <tr align='center'>
					<td class='header_laporan'>1</td>
					<td class='header_laporan'>2</td>
					<td class='header_laporan'>3</td>
					<td class='header_laporan'>4</td>
					<td class='header_laporan'>5</td>
					<td class='header_laporan'>6</td>
					<td class='header_laporan'>7</td>
					<td class='header_laporan'>8</td>
					<td class='header_laporan'>9</td>";
				foreach ($this->dbField as $k => $value) echo "<td class='header_laporan'>".($k + 10)."</td>";
					/*<td class='header_laporan'>10</td>
					<td class='header_laporan'>11</td>
					<td class='header_laporan'>12</td>
					<td class='header_laporan'>13</td>
					<td class='header_laporan'>14</td> */       
				  "</tr>";
					$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$first = true;
		
		while (!$rs->EOF && $row = $rs->FetchNextObject(true))
		{
			$tmp = (array) $row;			
			$nilai=number_format($row->NILAI,0,",",".");
			$nilai_ap=number_format($row->NILAI_AP,0,",",".");
			$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");
			echo "<tr>
				<td class='isi_laporan'>$row->NO_FA</td>
				<td align='center' class='isi_laporan'>$row->NO_SN</td>
				<td class='isi_laporan'>$row->JENIS</td>
				<td class='isi_laporan'>$row->NAMA</td>
				<td class='isi_laporan'>$row->ALAMAT</td>
				<td class='isi_laporan'>$row->CAP_DATE</td>
				<td align='right' class='isi_laporan'>$nilai</td>
				<td align='right' class='isi_laporan'>$nilai_ap</td>
				<td align='right' class='isi_laporan'>$nilai_buku</td>";
			foreach ($this->dbField as $k => $value) {				
				echo "<td class='isi_laporan'>".$tmp[$value]."</td>";	
			}
				/*<td class='isi_laporan'>$row->NMLOK</td>
				<td class='isi_laporan'>$row->NMTIPE</td>
				<td class='isi_laporan'>$row->NMKOMP</td>
				<td class='isi_laporan'>$row->NMPROYEK</td>        
				<td class='isi_laporan'>$row->NMLINK</td> */
			  echo "</tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td align='right'><table width='400' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td colspan='3' align='center' class='header_laporan'>$row1->TEMPAT , ".$AddOnLib->ubah_tanggal($row1->tgl)."</td>
        </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
	  <tr>
        <td align='center' class='header_laporan'><p>Ketua Tim INV UBIS</p>
              <p>&nbsp;</p>
          <p>$row1->NAMA1</p></td>
        <td align='center' class='header_laporan'><p>Manager / Asman </p>
              <p>&nbsp;</p>
          <p>$row1->NAMA2</p></td>
        <td align='center' class='header_laporan'><p>Officer</p>
              <p>&nbsp;</p>
          <p>$row1->NAMA3</p></td>
        </tr>
      <tr>
        <td align='center' class='header_laporan'>NIK : $row1->NIK1</td>
        <td align='center' class='header_laporan'>NIK : $row1->NIK2</td>
        <td align='center' class='header_laporan'>NIK : $row1->NIK3</td>
        </tr>
    </table></td>
  </tr>
</table>";
  }
 		//$html = str_replace(chr(9),"",$html);
		return "";
	}
	function initColumn($jnsProc){
		switch (strtolower($jnsProc)){
			case "sentral":
				$this->tblHeader = "<td class='header_laporan'>Lokasi/Netre</td>
								<td class='header_laporan'>ARNET</td>
								<td class='header_laporan'>SENTRAL</td>
								<td class='header_laporan'>Lokasi</td>
								<td class='header_laporan'>Area Code</td>
								<td class='header_laporan'>FKN</td>
								<td class='header_laporan'>Fungsi</td>
								<td class='header_laporan'>Host</td>
								<td class='header_laporan'>Tipe Sentral</td>";
				$this->dbField = "NMLOK,NMARNET,NMSENTRAL,LOKASI,KODE_AREA,FKN,FUNGSI,HOST,TIPE";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lokasi
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";
				$this->dbSQLField = "";
				
			break;
			case "rce & mux":
			case "rms":
			case "SKKL / SKSO":
				$this->tblHeader = "<td class='header_laporan'>Lokasi/Netre</td>
								<td class='header_laporan'>Tipe</td>
								<td class='header_laporan'>Komponen</td>
								<td class='header_laporan'>Sistra/Proyek </td>
								<td class='header_laporan'>Link/Point/Lokasi</td>";
				$this->dbField = "NMLOK,NMTIPE,NMKOMP,NMPROYEK,NMLINK";
				$this->dbSQLField = "l.nama as nmlok, t.nama as nmtipe, p.nama as nmproyek, ll.nama as nmlink, kk.nama as nmkomp";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lok
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";				
			break;
			case "modem data & imux":
				//No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri
				$this->tblHeader = "<td class='header_laporan'>No Kontrak</td>
								<td class='header_laporan'>Vendor</td>
								<td class='header_laporan'>Crosscheck Kontrak</td>
								<td class='header_laporan'>Nomor Seri</td>";
				$this->dbField = "KODE_KONTRAK,KODE_VENDOR,KODE_KONTRAK2,STATUS_SN";
			break;
			case "satelit":
				$this->tblHeader = "<td class='header_laporan'>Satelit</td>";
				$this->dbField = "NMSATELIT";
			break;
			case "server":
				$this->tblHeader = "<td class='header_laporan'>UBIS</td>
								<td class='header_laporan'>Sub UBIS</td>
								<td class='header_laporan'>Aplikasi/Tools</td>
								<td class='header_laporan'>Jenis</td>
								<td class='header_laporan'>Lokasi</td>";
				$this->dbField = "NMUBIS,NMSBIS,NMAPLIKASI,JENIS,NMLOKASI";
			break;
			case "rbs":
				$this->tblHeader = "<td class='header_laporan'>Level 1</td>
								<td class='header_laporan'>Level 2</td>
								<td class='header_laporan'>Lokasi BTS/BSC</td>
								<td class='header_laporan'>Area Operasional</td>
								<td class='header_laporan'>Vendor</td>
								<td class='header_laporan'>Alat Monitoring</td>
								<td class='header_laporan'>Status BTS / BSC</td>";
				$this->dbField = "LEVEL1,LEVEL2,LOKASI,AREAOP,VENDOR,STATUS";
			break;
			case "stm & ims":
				$this->tblHeader = "<td class='header_laporan'>Group</td>
								<td class='header_laporan'>Kategori</td>
								<td class='header_laporan'>Kelompok Aset</td>
								<td class='header_laporan'>Merk</td>
								<td class='header_laporan'>Vendor</td>								
								<td class='header_laporan'>Lokasi STO</td>
								<td class='header_laporan'>Komponen</td>
								<td class='header_laporan'>Peruntukan</td>
								<td class='header_laporan'>Daerah</td>
								<td class='header_laporan'>Nama</td>
								<td class='header_laporan'>Jumlah</td>
								<td class='header_laporan'>Satuan</td>
								<td class='header_laporan'>Keterangan</td>";
				$this->dbField = "GROUP,KATEGORI,KLPFA,VENDOR,LOKASI,KOMPONEN,PERUNTUKAN,DAERAH,NAMA,JUMLAH,SATUAN,KETERANGAN";
			break;
			case "jaringan":
				$this->tblHeader = "<td class='header_laporan'>DIV. REGIONAL</td>
								<td class='header_laporan'>AREA</td>
								<td class='header_laporan'>STO</td>";
				$this->dbField = "SBIS,BA,STO";
			break;
			case "tanah & bangunan":				
				$this->tblHeader = "<td class='header_laporan'>No Sertifikat</td>
								<td class='header_laporan'>Lokasi</td>
								<td class='header_laporan'>Luas Tanah</td>
								<td class='header_laporan'>Luas Bangunan</td>
								<td class='header_laporan'>Status Dokumen</td>								
								<td class='header_laporan'>No SPPT (NOP)</td>
								<td class='header_laporan'>Lokasi PBB</td>
								<td class='header_laporan'>Luas Tanah</td>
								<td class='header_laporan'>Luas Bangunan</td>
								<td class='header_laporan'>NKA Terkait Bangunan</td>
								<td class='header_laporan'>Status Dokumen</td>
								<td class='header_laporan'>Jenis Dokumen</td>
								<td class='header_laporan'>No Lainnya</td>
								<td class='header_laporan'>Lokasi Dgn Dokumen</td>
								<td class='header_laporan'>ID Pelanggan</td>
								<td class='header_laporan'>Nama Pelanggan</td>
								<td class='header_laporan'>NKA Terkait Tanah</td>
								<td class='header_laporan'>Status Dokumen</td>";
				$this->dbField = "";
			break;			
		}
		$this->dbField = explode(",",$this->dbField);
	}
		
}
?>
