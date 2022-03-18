<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptRwyNilai extends server_report_basic
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
		$sql="select a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app,a.no_penilaian,date_format(a.tanggal,'%d/%m/%Y') as tanggal, 
								   date_format(a.periode_awal,'%d/%m/%Y') as periode_awal, date_format(a.periode_akhir,'%d/%m/%Y') as periode_akhir,a.keterangan, 
								   isnull(d.nilai,0) as nilai,isnull(e.nilai1,0) as nilai1,isnull(e.nilai2,0) as nilai2, 
								   isnull(e.nilai3,0) as nilai3,isnull(d.nilai,0)+ isnull(e.nilai4,0) as total,a.kode_kategori,h.nama as nama_kategori 
							from gr_penilaian_m a 
							inner join gr_karyawan b on b.nik=a.nik_buat and a.kode_lokasi=b.kode_lokasi 
							inner join gr_karyawan c on c.nik=a.nik_app and a.kode_lokasi=c.kode_lokasi 
							left join (select no_penilaian,sum(nilai) as nilai  
									   from gr_penilaian_d 
									   group by no_penilaian)d on a.no_penilaian=d.no_penilaian 
							left join (select a.no_penilaian, 
										  sum(case b.kode_klp when '1' then a.nilai else 0 end) as nilai1, 
									  sum(case b.kode_klp when '2' then a.nilai else 0 end) as nilai2, 
									  sum(case b.kode_klp when '3' then a.nilai else 0 end) as nilai3, 
											  sum(a.nilai) as nilai4 
									   from gr_penilaian_dkriteria a 
									   inner join gr_penilaian_kriteria b on a.kode_kriteria=b.kode_kriteria 
									   group by a.no_penilaian)e on a.no_penilaian=e.no_penilaian 
							left join gr_kategori h on a.kode_kategori=h.kode_kategori and a.kode_lokasi=h.kode_lokasi 
							$this->filter
						order by a.no_penilaian ";
						
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data penilaian karyawan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
     <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>NIK Atasan</td>
     <td width='150'  align='center' class='header_laporan'>Nama Atasan</td>
	 <td width='150'  align='center' class='header_laporan'>No Penilaian</td>
     <td width='150'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Periode Awal</td>
     <td width='150'  align='center' class='header_laporan'>Periode Akhir</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='150'  align='center' class='header_laporan'>Hasil Kerja</td>
	 <td width='150'  align='center' class='header_laporan'>Keterampilan Teknis</td>
	 <td width='150'  align='center' class='header_laporan'>Sikap Th Pekerjaan</td>
	 <td width='150'  align='center' class='header_laporan'>Kemampuan Manajerial</td>
	 <td width='150'  align='center' class='header_laporan'>Total</td>
	 <td width='150'  align='center' class='header_laporan'>Kategori</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Kategori</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->nama_buat</td>
	 <td class='isi_laporan'>$row->nik_app</td>
	 <td class='isi_laporan'>$row->nama_app</td>
	 <td class='isi_laporan'>$row->no_penilaian</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->periode_awal</td>
	 <td class='isi_laporan'>$row->periode_akhir</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->nilai</td>
	 <td class='isi_laporan'>$row->nilai1</td>
	 <td class='isi_laporan'>$row->nilai2</td>
	 <td class='isi_laporan'>$row->nilai3</td>
	 <td class='isi_laporan'>$row->total</td>
 	 <td class='isi_laporan'>$row->kode_kategori</td>
	 <td class='isi_laporan'>$row->nama_kategori</td>
    </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
