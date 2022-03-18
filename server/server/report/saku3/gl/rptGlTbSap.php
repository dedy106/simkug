<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlTbSap extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
       // ob_end_clean();
		$this->createCSV();
        return "";
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="ypt_sap_".$periode.".xls";
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
		};
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$bulan=intval(substr($periode,4,2));
		if($bulan>'12')
		{
			$bulan='12';
		}
		$tahun=substr($periode,0,4);
		$d=cal_days_in_month(CAL_GREGORIAN,$bulan,$tahun);
		
		$tgl=$d.".".$bulan.".".$tahun;
		$sql="select kode_lokasi from lokasi where kode_lokasi in ('03','07','08','11') ";
		$rs2 = $dbLib->execute($sql);
		$i=1;
        
		echo "<div align='center'>"; 
			echo "<table border='0' cellspacing='0' cellpadding='0' >
	  <tr >
		<td width='90'  align='center'>No Jurnal</td>
		<td width='90'  align='center'>Seq</td>
		<td width='90'  align='center'>CoCode</td>
		<td width='90'  align='center'>Doc Type</td>
		<td width='90'  align='center'>Period</td>
		<td width='90'  align='center'>Curr</td>
		<td width='90'  align='center'>Reference</td>
		<td width='90'  align='center'>Doc Head Text</td>
		<td width='90'  align='center'>Doc Date</td>
		<td width='90'  align='center'>Post Date</td>
		<td width='90'  align='center'>Pos Key</td>
		<td width='90'  align='center'>Account</td>
		<td width='90'  align='center'>BA</td>
		<td width='90'  align='center'>Cost Center</td>
		<td width='90'  align='center'>Profit Center</td>
		<td width='90'  align='center'>Activity Type</td>
		<td width='90'  align='center'>Assignment</td>
		<td width='90'  align='center'>Text</td>
		<td width='90'  align='center'>Amount Doc</td>
		<td width='90'  align='center'>Amount Local</td>
		<td width='90'  align='center'>Notes</td>
		<td width='90'  align='center'>Produk Layer</td>
		<td width='90'  align='center'>Layer n</td>
		<td width='90'  align='center'>Ledger Group</td>
		<td width='90'  align='center'>Asset num</td>
		<td width='90'  align='center'>Asset Sub num</td>
		<td width='90'  align='center'>transaction type</td>
		<td width='90'  align='center'>sp gl ind</td>
	  </tr>";
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$sql="exec sp_glma_dw_tmp '$row2->kode_lokasi','$periode','$nik_user' ";
			
			$rs = $dbLib->execute($sql);
			
			$sql="select a.kode_akun,b.nama,a.kode_lokasi,abs(a.so_akhir) as so_akhir,substring(a.periode,5,2) as bulan,
                a.periode,substring(a.periode,1,5) as tahun, case when a.so_akhir>0 then '40' else '50' end as dc,substring(a.kode_akun,1,1) as klp
                from glma_tmp a 
                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                where a.nik_user='$nik_user' and abs(a.so_akhir)<>0
                order by a.kode_akun";
			
			$rs = $dbLib->execute($sql);
			
			
			
			
			
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$kode_akun=$row->kode_akun."0";
				$tmp="";
				$ba="";
				$cc="YP03A02";
				$pc="YPT0A00";
				if ($row->kode_lokasi=="03") 
				{
					$ba="YPT0";
				}
				if ($row->kode_lokasi=="11") 
				{
					$ba="YPT1";
				}
				if ($row->kode_lokasi=="07") 
				{
					$ba="YPT2";
				}
				if ($row->kode_lokasi=="08") 
				{
					$ba="YPT3";
				}
				
				for ($x = 1; $x <= 2; $x++) 
				{
					if ($tmp=="")
					{
						$tmp=$row->dc;
					}
					else
					{
						if ($tmp=="40")
						{
							$tmp="50";
						}
						else
						{
							$tmp="40";
						}
					}
					$no_ref="SA".$row->kode_lokasi."-".$row->periode;
					if ($row->klp=="4")
					{
						$cc="";
					}
					if ($row->klp=="5")
					{
						$pc="";
					}
					echo "<tr>
					<td  align='center'>$i</td>
					<td  align='center'>$x</td>
					<td  align='center'>$ba</td>
					<td  align='center'>SA</td>
					<td >$row->bulan</td>
					<td >IDR</td>
					<td >$no_ref</td>
					<td >Saldo Akhir Periode $row->periode</td>
					
					<td >$tgl</td>
					<td >$tgl</td>
					<td >$tmp</td>
					<td >$kode_akun</td>
					<td >$ba</td>
					<td >$cc</td>
					<td >$pc</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >Saldo Akhir Periode $row->periode</td>
					<td >".number_format($row->so_akhir,0,'','')."</td>
					<td >".number_format($row->so_akhir,0,'','')."</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
				  </tr>";
					$i=$i+1;
				}
				
			}
		
			
			echo "</table></div>";
		}
		return "";
	}
    function createCSV(){
        global $dbLib;
        
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="ypt_sap_".$periode.".csv";
        $AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$bulan=intval(substr($periode,4,2));
		if($bulan>'12')
		{
			$bulan='12';
		}
		$tahun=substr($periode,0,4);
		$d=cal_days_in_month(CAL_GREGORIAN,$bulan,$tahun);
		    header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
        
		$tgl=$d.".".$bulan.".".$tahun;
		$sql="select kode_lokasi from lokasi where kode_lokasi in ('03','07','08','11') ";
		$rs2 = $dbLib->execute($sql);
        
        $headerField = "No Jurnal;Seq;CoCode;Doc Type;Period;Curr;Reference;Doc head;Doc Date;Post Date;Post key;Account;BA;Cost Center;Profit Center;Activity Type;Assignment;Text;Amount Doc;Amount Local;Notes;Produk Layer;Layer n;Ledger Group;Asset num;Asset Sub Num;Transaction type;Sp Gl Ind";
        $line = explode(",", $headerField);
        $rowFile = $headerField;
        $rowFile .= "\r\n";
        echo $rowFile;
		$i=1;
        //file_put_contents($file, $rowFile, FILE_APPEND);
        while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$sql="exec sp_glma_dw_tmp '$row2->kode_lokasi','$periode','$nik_user' ";
			
			$rs = $dbLib->execute($sql);
			
			$sql="select a.kode_akun,b.nama,a.kode_lokasi,abs(a.so_akhir) as so_akhir,substring(a.periode,5,2) as bulan,
                a.periode,substring(a.periode,1,5) as tahun, case when a.so_akhir>0 then '40' else '50' end as dc,substring(a.kode_akun,1,1) as klp
                from glma_tmp a 
                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                where a.nik_user='$nik_user' and abs(a.so_akhir)<>0
                order by a.kode_akun";
			
			$rs = $dbLib->execute($sql);
			
			
			
			
			
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$kode_akun=$row->kode_akun."0";
				$tmp="";
				$ba="";
				$cc="YP03A02";
				$pc="YPT0A00";
				if ($row->kode_lokasi=="03") 
				{
					$ba="YPT0";
				}
				if ($row->kode_lokasi=="11") 
				{
					$ba="YPT1";
				}
				if ($row->kode_lokasi=="07") 
				{
					$ba="YPT2";
				}
				if ($row->kode_lokasi=="08") 
				{
					$ba="YPT3";
				}
				
				for ($x = 1; $x <= 2; $x++) 
				{
					if ($tmp=="")
					{
						$tmp=$row->dc;
					}
					else
					{
						if ($tmp=="40")
						{
							$tmp="50";
						}
						else
						{
							$tmp="40";
						}
					}
					$no_ref="SA".$row->kode_lokasi."-".$row->periode;
					if ($row->klp=="4")
					{
						$cc="";
					}
					if ($row->klp=="5")
					{
						$pc="";
					}
					echo "$i;$x;$ba;SA;$row->bulan;IDR;$no_ref;Saldo Akhir Periode $row->periode;$tgl;$tgl;$tmp;$kode_akun;$ba;$cc;$pc;;;Saldo Akhir Periode $row->periode;$row->so_akhir;$row->so_akhir;;;;;;;;;";
                    echo "\r\n";
					$i=$i+1;
				}
				
			}
		}
		
    }
}
?>
