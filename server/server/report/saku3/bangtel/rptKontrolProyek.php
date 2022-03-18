<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptKontrolProyek extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select 
	a.kode_pp,c.nama as nama_pp,sum(a.nilai) as nilai,sum(a.nilai_or) as nilai_rab,sum(isnull(g.pdpt,0)) as pdpt,sum(isnull(f.beban,0)) as beban,sum(isnull(e.bdd,0))-sum(isnull(f.beban,0)) as so_bdd,count(a.kode_proyek) as jum_proyek
    from spm_proyek a
    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
    left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd 
               from spm_proyek_bdd 
               where kode_lokasi='$kode_lokasi' 
               group by kode_proyek,kode_lokasi
              ) e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
    left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as beban 
               from spm_proyek_reklas_d 
               where kode_lokasi='$kode_lokasi' 
               group by kode_proyek,kode_lokasi
              )f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi
    left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as pdpt 
               from spm_piutang_d 
               where kode_lokasi='$kode_lokasi' 
               group by kode_proyek,kode_lokasi
              )g on a.kode_proyek=g.kode_proyek and a.kode_lokasi=g.kode_lokasi
    $where
    group by a.kode_pp,c.nama
    order by a.kode_pp";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu proyek",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $or1 = ($row->nilai_rab/$row->nilai)*100;
            $or2 = ($row->beban/$row->pdpt)*100;
	echo "
    <style> .border { border:1px solid black !important} </style>
<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
    <tr>
        <td colspan='11' class='header_laporan' bgcolor='c00000'>
            <table  border='0' cellspacing='2' cellpadding='0' style='width:100%;'>
                <tr>
                    <td class='header_laporan' style='color:#00a8f3' >PT $this->lokasi</td>
                </tr>
                <tr>
                    <td class='header_laporan' style='color:yellow' align='center'>LOKASI PP: $row->kode_pp $row->nama_pp</td>
                </tr>
                <tr>
                    <td class='header_laporan' style='color:white' align='center'>Posisi: 7 Mei 2021</td>
                </tr>
            </tr>
            </table>
        </td>
    </tr>
    <tr >
        <td height='23' colspan='11' class='header_laporan' bgcolor='f2f2f2'>
            <table  border='0' cellspacing='2' cellpadding='1' style='width:100%'>
                <tr class='no-border'>
                    <td width='120' class='header_laporan' >JUMLAH PROYEK</td>
                    <td width='5' class='header_laporan' >:</td>
                    <td width='90' class='header_laporan'  align='right'>$row->jum_proyek</td>
                    <td width='5' class='header_laporan' >&nbsp;</td>
                    <td width='120' colspan='2' class='header_laporan' >TOTAL PEMDAPATAN</td>
                    <td width='60' class='header_laporan' >: </td>
                    <td width='180' colspan='3' class='header_laporan'  align='right'>".number_format($row->pdpt,0,",",".")."</td>
                    <td width='60' class='header_laporan' >&nbsp;</td>
                </tr>
                <tr class='no-border'>
                    <td width='120' class='header_laporan' >NILAI PROYEK</td>
                    <td width='5' class='header_laporan' >:</td>
                    <td width='90' class='header_laporan'  align='right'>".number_format($row->nilai,0,",",".")."</td>
                    <td width='5' class='header_laporan' >&nbsp;</td>
                    <td width='120' colspan='2' class='header_laporan' >TOTAL BIAYA</td>
                    <td width='60' class='header_laporan' >: </td>
                    <td width='180' colspan='3' class='header_laporan'  align='right'>".number_format($row->beban,0,",",".")."</td>
                    <td width='60' class='header_laporan' >&nbsp;</td>
                </tr>
                <tr class='no-border'>
                    <td width='120' class='header_laporan' >NILAI RAB</td>
                    <td width='5' class='header_laporan' >:</td>
                    <td width='90' class='header_laporan'  align='right'>".number_format($row->nilai_rab,0,",",".")."</td>
                    <td width='5' class='header_laporan' >&nbsp;</td>
                    <td width='120' colspan='2' class='header_laporan' >SO. BDD</td>
                    <td width='60' class='header_laporan' >: </td>
                    <td width='180' colspan='3' class='header_laporan'  align='right'>".number_format($row->so_bdd,0,",",".")."</td>
                    <td width='60' class='header_laporan' >&nbsp;</td>
                </tr>
                
                <tr class='no-border'>
                    <td width='120' class='header_laporan' >OR</td>
                    <td width='5' class='header_laporan' >:</td>
                    <td width='90' class='header_laporan'  align='right'>".number_format($or1,2,",",".")."%</td>
                    <td width='5' class='header_laporan' >&nbsp;</td>
                    <td width='120' colspan='2' class='header_laporan' ></td>
                    <td width='60' class='header_laporan' > </td>
                    <td width='180' colspan='3' class='header_laporan'  align='right'>".number_format($or2,2,",",".")."%</td>
                    <td width='60' class='header_laporan' >&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td height='23' colspan='11' class='header_laporan' align='center' bgcolor='c00000' style='color:white;font-weight:bold'>PORTOFOLIO BISNIS DAN STATUS</td>
    </tr>
    <tr>
        <td colspan='11' class='header_laporan' bgcolor='f2f2f2'>
            <table  border='0' cellspacing='2' cellpadding='1' style='width:100%;border-collapse:collapse'>
                <tr>
                    <td width='200' class='header_laporan' style='color:#00a8f3; align='center'>PORTOFOLIO BISNIS</td>
                    <td width='5' class='header_laporan' style='color:#00a8f3; align='center'>&nbsp;</td>
                    <td width='90' height='23' class='header_laporan' style='color:#00a8f3; align='center'>JLH. PROYEK</td>
                    <td width='5' class='header_laporan' style='color:#00a8f3; align='center'>&nbsp;</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>OGP</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>STAGN</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>REKON</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>BAUT</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>BAST</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>CLOSE</td>
                    <td width='60' class='header_laporan' style='color:#00a8f3; align='center'>BLANK</td>
                </tr>";
                $sql="select a.kode_jenis,a.nama,isnull(b.jml,0) as jml
                from spm_proyek_jenis a
                left join (select a.kode_jenis,a.kode_lokasi,count(a.kode_proyek) as jml
                        from spm_proyek a
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$row->kode_pp'
                        group by a.kode_jenis,a.kode_lokasi
                        )b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi
                order by a.kode_jenis";
                
                $rs1 = $dbLib->execute($sql);	
                $jml=0;
                while ($row1 = $rs1->FetchNextObject($toupper=false))
		        {
                    $jml+=$row1->jml;
                    echo "<tr bgcolor='white'>
                        <td class='border'>$row1->nama</td>
                        <td ></td>
                        <td class='border' align='center'>$row1->jml</td>
                        <td ></td>
                        <td class='border'>1</td>
                        <td class='border'></td>
                        <td class='border'></td>
                        <td class='border'></td>
                        <td class='border'>2</td>
                        <td class='border'></td>
                        <td class='border'>6</td>
                    </tr>";
                }
                echo "<tr bgcolor='90d151'>
                    <td class='border'>TOTAL</td>
                    <td bgcolor='f2f2f2'></td>
                    <td class='border' align='center'>$jml</td>
                    <td bgcolor='f2f2f2'></td>
                    <td class='border'>1</td>
                    <td class='border'></td>
                    <td class='border'></td>
                    <td class='border'></td>
                    <td class='border'>2</td>
                    <td class='border'></td>
                    <td class='border'>6</td>
                </tr>
            </table>
        </td>
    </tr>
";
			
			echo "</table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
