<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptLeger extends server_report_basic
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
		$sql="";
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("BUKU LEGER",$this->lokasi,"");
		echo "<table width='870' height='1097' border='1'>
  <tr>
    <th height='27' colspan='7' scope='row'><div align='left'>Nama Siswa: </div></th>
    <td height='27' colspan='8'><strong>Program Studi Keahlian : </strong></td>
  </tr>
  <tr>
    <th height='27' colspan='7' scope='row'><div align='left'>NIS : </div></th>
    <td colspan='8' rowspan='2'><div align='left'><strong>Kompetensi Keahlian : </strong></div></td>
  </tr>
  <tr>
    <th height='27' colspan='7' scope='row'><div align='left'>NISN : </div></th>
  </tr>
  <tr>
    <th height='27' colspan='15' scope='row'><div align='left'></div></th>
  </tr>
  <tr>
    <th width='25' rowspan='4' scope='row'>No</th>
    <td width='107' rowspan='4'><div align='center'><strong>Mata Pelajaran </strong></div></td>
    <td width='38' rowspan='4'><div align='center'><strong>KKM</strong></div></td>
    <td height='27' colspan='12'><div align='center'><strong>NILAI RAPORT </strong></div></td>
  </tr>
  <tr>
    <td colspan='4'><div align='center'><strong>T.P 2016/2017 </strong></div></td>
    <td colspan='4'><div align='center'><strong>T.P 2017/2018</strong></div></td>
    <td colspan='4'><div align='center'><strong>T.P 2018/2019</strong></div></td>
  </tr>
  <tr>
    <td colspan='2'><div align='center'><strong>SM-1</strong></div></td>
    <td colspan='2'><div align='center'><strong>SM-2</strong></div></td>
    <td colspan='2'><div align='center'><strong>SM-3</strong></div></td>
    <td colspan='2'><div align='center'><strong>SM-4</strong></div></td>
    <td colspan='2'><div align='center'><strong>SM-5</strong></div></td>
    <td colspan='2'><div align='center'><strong>SM-6</strong></div></td>
  </tr>
  <tr>
    <td width='44'><div align='center'><strong>Angka</strong></div></td>
    <td width='52'><div align='center'><strong>Predikat</strong></div></td>
    <td width='45'><div align='center'><strong>Angka</strong></div></td>
    <td width='54'><div align='center'><strong>Predikat</strong></div></td>
    <td width='43'><div align='center'><strong>Angka</strong></div></td>
    <td width='51'><div align='center'><strong>Predikat</strong></div></td>
    <td width='52'><div align='center'><strong>Angka</strong></div></td>
    <td width='57'><div align='center'><strong>Predikat</strong></div></td>
    <td width='45'><div align='center'><strong>Angka</strong></div></td>
    <td width='55'><div align='center'><strong>Predikat</strong></div></td>
    <td width='46'><div align='center'><strong>Angka</strong></div></td>
    <td width='62'><div align='center'><strong>Predikat</strong></div></td>
  </tr>
  <tr>
    <th scope='row'>I</th>
    <td><strong>NORMATIF</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th scope='row'>II</th>
    <td><strong>ADAPTIF</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th scope='row'>III</th>
    <td colspan='14'><strong>PRODUKTIF ( Dasar Kompetensi dan Kompetensi Kejuruan ) </strong></td>
  </tr>
  <tr>
    <th colspan='15' scope='row'><div align='left'>A. Dasar Kompetensi Kejuruan </div></th>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'><div align='left'>B. Kompetensi Kejuruan </div></th>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'><div align='left'>C. Muatan Lokal </div></th>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th colspan='2' scope='row'><div align='left'><span class='style2'>Jumlah Nilai Prestasi Belajar </span></div></th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='2' scope='row'><div align='left'><span class='style2'>Nilai Rata - Rata </span></div></th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='2' scope='row'><div align='left'><span class='style2'>Rangking</span></div></th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='15' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th colspan='8' scope='row'><div align='left'>Kegiatan Belajar di Dunia Usaha /Industri dan Instansi Relevan </div></th>
    <th colspan='7' scope='row'>Ketidakhadiran</th>
  </tr>
  
  <tr>
    <th height='35' colspan='8' scope='row'><div align='left'>Nama DU / DI : </div></th>
    <th rowspan='2' scope='row'>Ket.</th>
    <th height='35' colspan='6' scope='row'>SEMESTER</th>
  </tr>
  <tr>
    <th height='35' colspan='8' scope='row'><div align='left'>Jenis Kegiatan : </div></th>
    <th height='35' scope='row'>I</th>
    <th height='35' scope='row'>II</th>
    <th height='35' scope='row'>III</th>
    <th height='35' scope='row'>IV</th>
    <th height='35' scope='row'>V</th>
    <th height='35' scope='row'>VI</th>
  </tr>
  <tr>
    <th height='35' colspan='8' scope='row'><div align='left'>Lama Pelaksanaan : </div></th>
    <th height='35' scope='row'>Sakit</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th colspan='8' rowspan='2' scope='row'><div align='left'>Alamat : </div>      <div align='left'></div></th>
    <th height='35' scope='row'>Izin</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th height='35' scope='row'>Alpa</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th rowspan='2' scope='row'>No</th>
    <th rowspan='2' scope='row'>Kepribadian</th>
    <th colspan='6' scope='row'>Semester</th>
    <th height='35' scope='row'>No</th>
    <th height='35' colspan='6' scope='row'>Ekstrakulikuler yang diikuti </th>
  </tr>
  <tr>
    <th height='35' scope='row'>I</th>
    <th height='35' scope='row'>II</th>
    <th height='35' scope='row'>III</th>
    <th height='35' scope='row'>IV</th>
    <th height='35' scope='row'>V</th>
    <th height='35' scope='row'>VI</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' colspan='6' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <th scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' scope='row'>&nbsp;</th>
    <th height='35' colspan='6' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th height='35' colspan='5' nowrap='nowrap' scope='row'><div align='left'>I. Medan, </div></th>
    <th height='35' colspan='5' nowrap='nowrap' scope='row'><div align='left'>I. Medan, </div></th>
    <th height='35' colspan='5' nowrap='nowrap' scope='row'><div align='left'>I. Medan, </div></th>
  </tr>
  <tr>
    <th height='35' colspan='5' scope='row'><div align='left'>Wali Kelas I </div></th>
    <th height='35' colspan='5' scope='row'><div align='left'>Wali Kelas II</div></th>
    <th height='35' colspan='5' scope='row'><div align='left'>Wali Kelas III</div></th>
  </tr>
  <tr>
    <th height='35' colspan='5' scope='row'>&nbsp;</th>
    <th height='35' colspan='5' scope='row'>&nbsp;</th>
    <th height='35' colspan='5' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th height='35' colspan='5' scope='row'>(...)</th>
    <th height='35' colspan='5' scope='row'>(...)</th>
    <th height='35' colspan='5' scope='row'>(...)</th>
  </tr>
  <tr>
    <th height='132' colspan='15' scope='row'><div align='left'><em>Catatan : </em></div></th>
  </tr>";


			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
