<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptPendDepo extends server_report_basic
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
        $kode_plan=$tmp[1];
        $filter3 =$tmp[2];

        if($kode_plan == ""){
            $nama_plan= "";
        }else{
            $sql = "select nama from inv_plan where kode_plan='$kode_plan' ";
            $res=$dbLib->execute($sql);
            $nama_plan = $res->fields[0];
        }


        $sql = "select x.nama_plan,x.jenis,x.no_depo, x.keterangan,x.bank,sum(x.bunga) as tot_bunga
        from 
        (
        select b.no_depo,b.keterangan,c.nama as bank,d.nama as nama_plan,b.jenis,        
        sum(case dc when 'D' then (a.nilai-a.pajak_akru) else -(a.nilai-a.pajak_akru) end) as bunga
        from inv_depoakru_d a 
        inner join inv_depo2_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi
        inner join inv_bank c on b.bdepo=c.kode_bank
        inner join inv_plan d on b.kode_plan=d.kode_plan
        $this->filter
        group by b.no_depo,c.nama,d.nama,b.keterangan,b.jenis
        union all
        select b.no_depo,b.keterangan,c.nama as bank,d.nama as nama_plan,b.jenis,        
        sum(a.nilai_cair)-sum(a.nilai-a.pajak_akru) as bunga
        from inv_depoakru_d a 
        inner join inv_depo2_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi
        inner join inv_depocair_m f on a.no_cair=f.no_cair and a.kode_lokasi=f.kode_lokasi and f.periode='$periode'
        inner join inv_bank c on b.bdepo=c.kode_bank
        inner join inv_plan d on b.kode_plan=d.kode_plan
        $filter3
        group by b.no_depo,c.nama,d.nama,b.keterangan,b.jenis
        ) x
        where x.bunga <>0
        group by x.no_depo, x.keterangan,x.bank,x.nama_plan,x.jenis
        order by x.nama_plan desc,x.jenis,x.no_depo ";
        $rs=$dbLib->execute($sql);

        // echo $filter3;

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='920'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px'>LAPORAN PENDAPATAN BUNGA DEPOSITO ".strtoupper($nama_plan)." YAKES TELKOM </th>
                    </tr>
                    <tr >
                        <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : DEPOSITO (BERJANGKA DAN DOC) 
                        </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Periode</th>
                        <th style='' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:13px'>
                    <tr style=''>
                        <td style='text-align:center' width='5'>No</td>
                        <td style='text-align:center' width='100' >Nama Plan</td>
                        <td style='text-align:center' width='95'>Jenis Deposito</td>
                        <td style='text-align:center' width='120'>No Deposito</td>
                        <td style='text-align:center' width='300'>Keterangan</td>
                        <td style='text-align:center' width='200'>Bank</td>
                        <td style='text-align:center' width='100'>Total Bunga</td>
                    </tr>";
                    $no=1;
                    $rs1 = $dbLib->execute($sql);
                    $tobunga= 0;
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
		            {
                        $tobunga+=$row1->tot_bunga;
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:left'>$no</td>
                        <td style='border-top: medium none;text-align:left'>$row1->nama_plan</td>
                        <td style='border-top: medium none;text-align:left'>$row1->jenis</td>
                        <td style='border-top: medium none;text-align:right'>$row1->no_depo</td>
                        <td style='border-top: medium none;'>$row1->keterangan</td>
                        <td style='border-top: medium none;'>$row1->bank</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row1->tot_bunga,2,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='6'>TOTAL</td>
                        <td style='text-align:right' >".number_format($tobunga,2,",",".")."</td>
                    </tr>";
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        // }
		return "";
		
	}
	
}
?>
