<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptSapJurnal extends server_report_basic
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
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
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
		if (strlen($d)==1)
		{
			$d="0".$d;
		}
		if (strlen($bulan)==1)
		{
			$bulan="0".$bulan;
		}
		$tgl_akhir=$d.".".$bulan.".".$tahun;
		
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
		$sql="select kode_lokasi from lokasi where kode_lokasi='$kode_lokasi' ";
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$sql="select a.no_bukti,a.kode_akun,b.nama,a.kode_lokasi,abs(a.nilai) as nilai,substring(a.periode,5,2) as bulan,a.kode_pp,a.kode_task as kode_pc,
       a.periode,substring(a.periode,1,5) as tahun, case when a.dc='D' then '40' else '50' end as dc,substring(a.kode_akun,1,1) as klp,a.kode_proyek as kode_ba,
	   a.keterangan,convert(varchar(10),a.tanggal,103) as tgl,a.no_urut
from glsap a 
inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='20'
$this->filter and a.nilai<>0 
order by a.no_bukti,a.no_urut ";
			
			$rs = $dbLib->execute($sql);

			$ket="";$i=1; $j=1;
			$first = true;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$beda = $ket!=$row->no_bukti; 
				
				if ($ket!=$row->no_bukti)
				{
					$ket=$row->no_bukti;
					$first = true;
					
					if ($i>1)
					{
						$i=1;
						$j=$j+1;
					}
					
				}
				
				$kode_akun=$row->kode_akun;
				$tmp="";
				$ba=$row->kode_ba;
				$cc=$row->kode_ba;
				if ($row->kode_lokasi=="12")
				{
					$cc=$row->kode_pc;
				}
				$pc=$row->kode_pc;
				$cocd="YPT0";
				
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
					
					if ($row->klp=="4")
					{
						$cc="";
					}
					if ($row->klp=="5")
					{
						$pc="";
					}
					$tgl=str_replace("/",".",$row->tgl);
					$no_ref=$row->no_bukti;
					if (substr($no_ref,5,3)=="YPT")
					{
						$tgl=$tgl_akhir;
					}
					echo "<tr>
					<td  align='center'>$j</td>
					<td  align='center'>$i</td>
					<td  align='center'>$cocd</td>
					<td  align='center'>SA</td>
					<td >".$row->bulan."&nbsp;</td>
					<td >IDR</td>
					<td >$no_ref</td>
					<td >$row->keterangan</td>
					
					<td >$tgl</td>
					<td >$tgl</td>
					<td >$tmp</td>
					<td >$kode_akun</td>
					<td >$ba</rtd>
					<td >$cc</td>
					<td >$pc</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >$row->keterangan</td>
					<td >$row->nilai</td>
					<td >$row->nilai</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
					<td >&nbsp;</td>
				  </tr>";
				$first = true;
				$i=$i+1;
				
				
			}
		
			
			echo "</table></div>";
		}
		return "";
	}
   
}
?>
