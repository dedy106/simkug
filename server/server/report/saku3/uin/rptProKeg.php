<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptProKeg extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$nik=$tmp[0];
		$kode_lokasi=$tmp[1];
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql="select a.kdsatker,a.kdprogram,b.kddept,b.kdunit 
			from uin_user a inner join uin_satker b on a.kdsatker=b.kdsatker 
			where a.nik ='$nik' and a.kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdprogram=$row->kdprogram;
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Program Kegiatan",$this->lokasi,$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='900'>
   <tr bgcolor='#CCCCCC'>
     <td width='40'  align='center' class='header_laporan'>#</td>
	 <td width='80'  align='center' class='header_laporan'>Kode</td>
     <td width='300'  align='center' class='header_laporan'>Uraian</td>
     </tr> 
";
		$sql="select kddept,kdunit,kddept+'.'+kdunit+'.'+kdprogram as kode_program, nmprogram from uin_program where kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram'  ";
		$rs = $dbLib->execute($sql);
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo " <tr>
     <td  class='header_laporan'>Prog</td>
	 <td  class='header_laporan'>$row->kode_program</td>
     <td class='header_laporan'>$row->nmprogram</td>
     </tr> ";
			$sql="select kdgiat,nmgiat from uin_giat where kddept='$kddept' and kdunit='$kdunit' ";
			$rs1 = $dbLib->execute($sql);
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo " <tr>
     <td  class='header_laporan'>Giat</td>
	 <td  class='header_laporan'>$row1->kdgiat</td>
     <td class='header_laporan'>$row1->nmgiat</td>
     </tr> ";
				$sql="select  a.kdoutput,a.kdgiat,a.kdgiat+'.'+a.kdoutput as kode_output,a.nmoutput,a.sat,1 as vol
					from uin_output a
					where  a.kdgiat='$row1->kdgiat'   ";
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					echo " <tr>
		 <td  class='header_laporan'>Out</td>
		 <td  class='header_laporan'>$row2->kode_output</td>
		 <td class='header_laporan'>$row2->nmoutput</td>
		 </tr> ";
					$sql="select  a.kdsoutput,a.nmsoutput,a.kdoutput,a.kdgiat+'.'+a.kdoutput+'.'+a.kdsoutput as kode_soutput
						from uin_soutput a
						where a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' ";
					
					$rs3 = $dbLib->execute($sql);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
						echo " <tr>
			 <td  class='header_laporan'>sOut</td>
			 <td  class='header_laporan'>$row3->kode_soutput</td>
			 <td class='header_laporan'>$row3->nmsoutput</td>
			 </tr> ";
						$sql="select a.kdkmpnen,a.nmkmpnen
							from uin_kmpnen a
							where a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput'";
						
						$rs4 = $dbLib->execute($sql);
						while ($row4 = $rs4->FetchNextObject($toupper=false))
						{
							echo " <tr>
				 <td  class='header_laporan'>Kmp</td>
				 <td  class='header_laporan'>$row4->kdkmpnen</td>
				 <td class='header_laporan'>$row4->nmkmpnen</td>
				 </tr> ";
							$sql="select  a.kdskmpnen,a.urskmpnen
							from uin_d_skmpnen a
							where a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' ";
							
							$rs5 = $dbLib->execute($sql);
							while ($row5 = $rs5->FetchNextObject($toupper=false))
							{
								echo " <tr>
					 <td  class='header_laporan'>sKmp</td>
					 <td  class='header_laporan'>$row5->kdskmpnen</td>
					 <td class='header_laporan'>$row5->urskmpnen</td>
					 </tr> ";
								$sql="select a.kode_akun,b.nmakun 
									from uin_usul_m a 
									inner join uin_akun b on a.kode_akun=b.kdakun 
									where a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen'";
								
								
								$rs6 = $dbLib->execute($sql);
								while ($row6 = $rs6->FetchNextObject($toupper=false))
								{
									echo " <tr>
						 <td  class='header_laporan'>Akun</td>
						 <td  class='header_laporan'>$row6->kode_akun</td>
						 <td class='header_laporan'>$row6->nmakun</td>
						 </tr> ";
									$sql="select b.keterangan as nmitem,b.vol as volkeg,b.satuan as satkeg,b.tarif as hargasat,b.total as jumlah 
									from uin_usul_m a 
									inner join uin_usul_d b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
									where a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen' and a.kode_akun='$row6->kode_akun'";
									
									
									$rs7 = $dbLib->execute($sql);
									while ($row7 = $rs7->FetchNextObject($toupper=false))
									{
										echo " <tr>
							 <td  class='isi_laporan'>&nbsp;</td>
							 <td  class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'> - $row7->nmitem</td>
							 </tr> ";
										
									}
									
								}
								
							}
						}
					}
				
				}
			}
			$i=$i+1;
		}
		return "";
	}
	
}

?>
