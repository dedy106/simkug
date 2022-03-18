<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptApproval extends server_report_basic
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
		$sql="select a.no_rab,convert(varchar(20),a.tanggal,103) as tgl_rab,a.nik_buat,a.kode_pp,b.nama as nama_pp,a.kode_jenis,d.nama as nama_jenis,a.kode_cust,c.nama as nama_cust,
		g.kode_proyek,isnull(g.nilai,0) as nilai_proyek,g.tgl_app as tgl_proyek,isnull(g.nilai_or,0) as or_proyek,a.nilai,a.nilai_or,a.p_or, a.nilai_or-a.nilai_or as shu,f.no_app as no_ver,convert(varchar(20),e.tanggal,103) as tgl_ver,e.status as status_ver,f.nik_app as nik_ver,
h.no_app,convert(varchar(20),h.tanggal,103) as tgl_app,h.status as status_app,h.nik_user as nik_app,a.keterangan,a.no_dok,i.nik_app as nik1,i.status as status_kug, j.nik_app as nik2,j.status as status_dir,k.status as status_ntf,l.nik_user as nik_ntf
from prb_rab_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
left join prb_rabapp_m f on a.no_rab=f.no_rab and a.kode_lokasi=f.kode_lokasi
left join prb_proyek_jenis d on d.kode_jenis=f.kode_jenis and d.kode_lokasi=f.kode_lokasi
left join prb_proyek_app e on f.no_app=e.no_app and f.kode_lokasi=e.kode_lokasi and e.no_appseb='-'
left join prb_proyek g on f.kode_proyek=g.kode_proyek and f.kode_lokasi=g.kode_lokasi
left join prb_proyek_app h on g.no_app=h.no_app and g.kode_lokasi=h.kode_lokasi and h.no_appseb='-'
left join prb_proyek_app i on g.kode_proyek=i.no_bukti and g.kode_lokasi=i.kode_lokasi and i.modul='AKTIF_PR' and i.no_appseb='-'
left join prb_proyek_app j on g.kode_proyek=j.no_bukti and g.kode_lokasi=j.kode_lokasi and j.modul='AKTIF_PR2' and j.no_appseb='-'
left join (SELECT no_bukti,kode_lokasi,modul,no_rab,status,MAX(no_app) as maxno
           FROM prb_proyek_app
           GROUP BY no_bukti,kode_lokasi,modul,no_rab,status
           ) k on g.kode_proyek=k.no_bukti and g.kode_lokasi=k.kode_lokasi and k.modul='NTF_RAB' and a.no_rab=k.no_rab
left join prb_proyek_app l on k.maxno=l.no_app and k.kode_lokasi=l.kode_lokasi
$this->filter order by a.no_rab";

// echo $sql;
		
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
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Approval Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No RAB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl & Jam RAB</td>
	 <td width='60'  align='center' class='header_laporan'>NIK Pembuat RAB</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='150'  align='center' class='header_laporan'>Customer</td>
     <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai OR RAB</td>
     <td width='90'  align='center' class='header_laporan'>SHU Proyek RAB</td>
     <td width='100'  align='center' class='header_laporan'>No Ver RAB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl & Jam Ver RAB</td>
	 <td width='80'  align='center' class='header_laporan'>Status & NIK Ver RAB</td>
     <td width='100'  align='center' class='header_laporan'>No Data NTF</td>
     <td width='100'  align='center' class='header_laporan'>Tgl & Jam NTF</td>
	 <td width='100'  align='center' class='header_laporan'>Status & NIK Approve Data NTF</td>
	 <td width='60'  align='center' class='header_laporan'>No Approve  NTF < 50 juta</td>
	 <td width='80'  align='center' class='header_laporan'>Tgl & Jam Approved Data NTF
     < 50 juta</td>
	 <td width='90'  align='center' class='header_laporan'>Status & NIK Approve Data NTF < 50 juta</td>
	 <td width='90'  align='center' class='header_laporan'>No Approve  NTF > 50 juta </td>
	 <td width='90'  align='center' class='header_laporan'>Tgl & Jam Approved Data NTF
     > 50 juta</td>
     <td width='90'  align='center' class='header_laporan'>Tgl & Jam Approved Data NTF
     > Status & NIK Approve Data NTF > 50 juta</td>	 
	  </tr>  ";
		$nilai=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $shu+=$row->nilai-$row->nilai_or;
            $nilai+=$row->nilai;
            $nilai_or+=$row->nilai_or;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenRab('$row->no_rab','$row->kode_lokasi');\">$row->no_rab</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_rab</td>
	 <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai-$row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_ver</td>
     <td class='isi_laporan'>$row->tgl_ver</td>";
     if($row->no_ver == ""){
     echo"
        <td class='isi_laporan' align='center'>-</td>";
     }else{
     echo"
        <td class='isi_laporan' align='center'>$row->status_ver by $row->nik_ver</td>";
     }
     echo"
       <td class='isi_laporan'>$row->kode_proyek</td>
       <td class='isi_laporan'>$row->tgl_proyek</td>";
    if($row->kode_proyek == ""){
    echo"
       <td class='isi_laporan' align='center'>-</td>";
    }else{
    echo"
       <td class='isi_laporan'>$row->status_ntf by $row->nik_ntf</td>";
    }
    
       
      if($row->nilai < 50000000){
      echo"
	    <td class='isi_laporan'>$row->no_app</td>
        <td class='isi_laporan'>$row->tgl_app</td>";
        if($row->no_app ==""){
    echo"
        <td class='isi_laporan' align='center'>-</td>"; 
        }else{
    echo"
        <td class='isi_laporan'>$row->status_kug by $row->nik1</td>";
        }
      
        echo"
        <td class='isi_laporan'>-</td>
        <td class='isi_laporan'>-</td>
        <td class='isi_laporan'>-</td>";
      }else{
		// $sql1="select a.no_app,convert(varchar(20),a.tanggal,103) as tgl_app,a.status as status_kug,a.nik_app as nik1 from prb_proyek_app a where a.modul='AKTIF_PR' and no_bukti='$row->kode_proyek' ";
		$sql1="select a.no_app,convert(varchar(20),a.tanggal,103) as tgl_app,a.status as status_kug,a.nik_app as nik1 from prb_proyek_app a where a.modul='AKTIF_PR' and no_bukti='$row->kode_proyek' and a.no_app = (select max(a.no_app) from prb_proyek_app a where a.modul='AKTIF_PR' and no_bukti='$row->kode_proyek')";
        $rs1=$dbLib->execute($sql1);
        $row1 = $rs1->FetchNextObject($toupper=false);
        echo"
        <td class='isi_laporan'>$row1->no_app</td>
        <td class='isi_laporan'>$row1->tgl_app</td>";
        if($row1->no_app ==""){
        echo"<td class='isi_laporan' align='center'>-</td>"; 
        }else{
        echo"
        <td class='isi_laporan'>$row1->status_kug by $row1->nik1</td>";
        }
      
	//    $sql2="select a.no_app,convert(varchar(20),a.tanggal,103) as tgl_app,a.status as status_dir,a.nik_app as nik2 from prb_proyek_app a where a.modul='AKTIF_PR2' and no_bukti='$row->kode_proyek' ";
		$sql2 = "select a.no_app,convert(varchar(20),a.tanggal,103) as tgl_app,a.status as status_dir,a.nik_app as nik2 
		from prb_proyek_app a where a.modul='AKTIF_PR2' and no_bukti='$row->kode_proyek' and a.no_app = ( select max(a.no_app)
						   from prb_proyek_app a where a.modul='AKTIF_PR2' and no_bukti='$row->kode_proyek' 
						  )";
        $rs2=$dbLib->execute($sql2);
        $row2 = $rs2->FetchNextObject($toupper=false);
       echo"
       <td class='isi_laporan'>$row2->no_app</td>
       <td class='isi_laporan'>$row2->tgl_app</td>";

       if($row2->no_app ==""){
        echo"<td class='isi_laporan' align='center'>-</td>"; 
        }else{
        echo"
            <td class='isi_laporan'>$row2->status_dir by $row2->nik2</td>"; 
        }
       
      }

     echo"
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='8'>Total</td>
      <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
      <td class='header_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
      <td class='header_laporan' align='right'>".number_format($shu,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
