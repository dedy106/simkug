<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptFormRAB extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="rab_".$periode.".xls";
		$sql="select a.no_rab,convert(varchar(20),f.tanggal,103) as tgl_rab,f.nik_buat,a.kode_pp,b.nama as nama_pp,a.kode_jenis,d.nama as nama_jenis,a.kode_cust,c.nama as nama_cust,
		a.nilai,a.nilai_or,a.p_or,a.keterangan,a.no_dok,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,convert(varchar(20),a.tgl_admin,103) as tgl_admin, e.nama as nama_buat, e.jabatan as jab, a.sts_va
        from prb_rabapp_m a
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
        inner join prb_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
        inner join prb_rab_m f on a.no_rab=f.no_rab and a.kode_lokasi=f.kode_lokasi
        left join karyawan e on f.nik_buat=e.nik and f.kode_lokasi=e.kode_lokasi 
        $this->filter order by a.no_rab";

        //echo $sql;
		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        $i=1;

        while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Form RAB",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='0' cellspacing='0' cellpadding='0' class='kotak' width='700'>
    <tr>
        <td width='250' >Dengan hormat</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td></td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>";
    // echo"
    //     <td colspan='2' style='text-align:justify'>Menunjuk PKS/SPK/PO No. $row->no_dok bersama ini kami mengajukan persetujuan dan dukungan kelancaran kegiatan NTF, pengajuan RAB dan Permohonan Persetujuan Pelaksanaan NTF dengan data sebagai berikut : </td> ";
    if($row->sts_va == "YA"){
        echo" <td colspan='2' style='text-align:justify'>Menunjuk PKS/SPK/PO No. $row->no_dok bersama ini kami mengajukan persetujuan dan dukungan kelancaran kegiatan NTF, pengajuan RAB dan permintaan Virtual Account dengan data sebagai berikut : </td>";
    }else{
        echo" <td colspan='2' style='text-align:justify'>Menunjuk PKS/SPK/PO No. $row->no_dok bersama ini kami mengajukan persetujuan dan dukungan kelancaran kegiatan NTF dan pengajuan RAB dengan data sebagai berikut : </td>";
    }
    echo" 
    </tr>
    <tr>
        <td></td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>Nama Kegiatan</td>   
        <td>:&nbsp; $row->keterangan</td>  
    </tr>
    <tr>
        <td>Nilai Proyek</td>   
        <td>:&nbsp; ".number_format($row->nilai,0,",",".")."</td>  
    </tr>
    <tr>
        <td>Nilai Beban</td>   
        <td>:&nbsp; ".number_format($row->nilai_or,0,",",".")."</td>  
    </tr>
    <tr>
        <td>Prosentase OR</td>   
        <td>:&nbsp; ".number_format($row->p_or,2,",",".")." %</td>  
    </tr>
    <tr>
        <td>Jangka Waktu Kegiatan</td>   
        <td>:&nbsp; $row->tgl_mulai - $row->tgl_selesai</td>  
    </tr>
    <tr>
        <td>Jangka Waktu Penyelesaian Administrasi</td>   
        <td>:&nbsp; $row->tgl_mulai - $row->tgl_admin</td>  
    </tr>
    <tr>
        <td>&nbsp;</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td colspan='2' style='text-align:justify'>Berkaitan hal tersebut di atas pada prinsipnya kami bertanggung jawab atas kegiatan dan pengeluaran beban sesuai data yang kami ajukan.</td>   
    </tr>
    <tr>
        <td>&nbsp;</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td colspan='2'>Demikian kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima kasih.</td>   
    </tr>
    <tr>
        <td>&nbsp;</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>&nbsp;</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>Hormat kami, </td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>&nbsp;$row->jab</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td height='60'>&nbsp;</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>&nbsp;$row->nama_buat</td>   
        <td>&nbsp;</td>  
    </tr>
    <tr>
        <td>&nbsp;$row->nik_buat</td>   
        <td>&nbsp;</td>  
    </tr>
    ";
	echo "</table><br>";
    echo "</div>";
        }

		return "";
		
	}
	
}
?>
