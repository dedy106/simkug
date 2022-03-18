<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisDetSaldoCd extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$nama_file="saldo.xls";
        
		
		$sql="select distinct a.no_bukti,b.keterangan,a.kode_lokasi
             from aka_cd_d a
             inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
             $this->filter
             and b.form in ('CDMUTMULTI')
        ";

		
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("detail saldo pdd siswa",$this->lokasi);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        while ($row = $rs->FetchNextObject($toupper=false))
		{
            echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
            <tr>
              <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
                <tr>
                  <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                      <td class='style16'></td>
                    </tr>
                    <tr>
                      <td class='style16'></td>
                    </tr>
                  </table></td>
                  <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                  
                    <tr>
                      <td align='center' class='istyle15'>$row->no_bukti</td>
                    </tr>
                    <tr>
                      <td align='center' class='istyle15'>$row->keterangan</td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td>
                <table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                    <tr align='center' bgcolor='#CCCCCC'>
                    <td width='30' class='header_laporan'>NO</td>
                    <td width='100' class='header_laporan'>NO TES</td>
                    <td width='200' class='header_laporan'>NAMA </td>
                    <td width='100' class='header_laporan'>DEBET</td>
                    <td width='100' class='header_laporan'>KREDIT</td>
                    </tr>
            ";
            $sql="select a.nim,a.kode_lokasi,a.nama,
           isnull(d.nilai,0) as debet,isnull(e.nilai,0) as kredit
     from (
        select a.nim,a.nama,a.kode_lokasi 
        from aka_mahasiswa a 
        union all 
        select a.no_tes,a.nama,a.kode_lokasi 
        from aka_maba a
     ) a 
     inner join (select a.nim,a.kode_lokasi
                 from aka_cd_d a
                 inner join ( 
                     select a.no_bukti,a.kode_lokasi 
                     from trans_m a where a.form in ('CDMUTMULTI')
                     ) b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
                 where a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_bukti'
                 group by a.nim,a.kode_lokasi
                 )g on a.nim=g.nim and a.kode_lokasi=g.kode_lokasi 
     left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
             from aka_cd_d a			
             inner join (
        select a.nim,a.nama,a.kode_lokasi         
        from aka_mahasiswa a 
        union all 
        select a.no_tes,a.nama,a.kode_lokasi         
        from aka_maba a
     ) b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
             inner join ( 
                select a.no_bukti,a.kode_lokasi 
                from trans_m a where a.form in ('CDMUTMULTI')
                ) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
             where a.kode_lokasi='$row->kode_lokasi' and a.dc='D' and a.no_bukti='$row->no_bukti'
             group by a.nim,a.kode_lokasi
             )d on a.nim=d.nim and a.kode_lokasi=d.kode_lokasi 
     left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
             from aka_cd_d a			
             inner join (
        select a.nim,a.nama,a.kode_lokasi         
        from aka_mahasiswa a 
        union all 
        select a.no_tes,a.nama,a.kode_lokasi         
        from aka_maba a
     ) b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
             inner join ( 
                select a.no_bukti,a.kode_lokasi 
                from trans_m a where a.form in ('CDMUTMULTI')
                ) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
             where a.kode_lokasi='$row->kode_lokasi' and a.dc='C' and a.no_bukti='$row->no_bukti'
             group by a.nim,a.kode_lokasi
             )e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi 
     where a.kode_lokasi='$row->kode_lokasi' 
     order by a.nim
            ";
            $rs1 = $dbLib->execute($sql);
            
            while ($row1 = $rs1->FetchNextObject($toupper=false))
            {
                // $so_awal+=$row->so_awal;
                // $debet+=$row->debet;
                // $kredit+=$row->kredit;
                // $so_akhir+=$row->so_akhir;
                echo "<tr>
                <td class='isi_laporan' align='center'>$i</td>
                    <td class='isi_laporan'>$row1->nim</td>
                    <td class='isi_laporan'>$row1->nama</td>
                    <td class='isi_laporan' align='right'>".number_format($row1->debet,0,",",".")."</td>
                    <td class='isi_laporan' align='right'>".number_format($row1->kredit,0,",",".")."</td>
                </tr>";	 
                $i=$i+1;
            }
    // 		echo "<tr>
    //    <td class='isi_laporan' align='center' colspan='5'>Total</td>
    //     <td class='isi_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
    //   </tr>";	 
                echo"
                        </table></td>
                </tr>";
        }
        echo"
</table><br>
</div>
<DIV style='page-break-after:always'></DIV>
        ";
		return "";
	}
	
}
?>
  
