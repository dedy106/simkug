<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapDepo extends server_report_basic
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

        $sql = "select distinct a.kode_kelola,a.kode_plan,a.kode_lokasi,b.nama as nama_kelola,c.nama as nama_plan 
        from inv_depo2_m a
        left join inv_kelola b on a.kode_kelola=b.kode_kelola
        left join inv_plan c on a.kode_plan=c.kode_plan
        $this->filter and a.tgl_mulai <= '".$tmp[1]."'
        order by a.kode_kelola,a.kode_plan ";
        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        while ($row = $rs->FetchNextObject($toupper=false))
		{
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1000'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px'>DAFTAR PENEMPATAN DANA ".strtoupper($row->nama_plan)." YAKES TELKOM </th>
                    </tr>
                    <tr >
                        <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : DEPOSITO (BERJANGKA DAN DOC) (".strtoupper($row->nama_kelola).")
                        </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Per</th>
                        <th style='' colspan='13'>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:13px'>
                    <tr style=''>
                        <td style='text-align:center' width='10'>No</td>
                        <td style='text-align:center' width='190' >Nama Bank</td>
                        <td style='text-align:center' width='270'>Cabang</td>
                        <td style='text-align:center' width='90'>Nominal</td>
                        <td style='text-align:center' width='90'>Jenis Deposito</td>
                        <td style='text-align:center' width='100'>Tgl Mulai</td>
                        <td style='text-align:center' width='100'>Tgl Jatuh Tempo</td>
                        <td style='text-align:center' width='50'>Durasi (Hari)</td>
                        <td style='text-align:center' width='50'>Durasi (Bulan)</td>
                        <td style='text-align:center' width='50'>Tingkat Suku Bunga</td>
                    </tr>";
                    $no=1;
                    $sql1="select 
                    bb.nama,b.nama as cabang,a.nilai,case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end as jenis,    
                    convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_hari
                    ,datediff(month,a.tgl_mulai,a.tgl_selesai) as jml_bln,a.p_bunga,
                    a.no_depo	   
                    from inv_depo2_m a
                    inner join inv_bank b on a.bdepo=b.kode_bank
                    inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
                    left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '".$tmp[1]."'
                    where a.kode_lokasi='$row->kode_lokasi' and a.kode_plan='$row->kode_plan' and a.kode_kelola='$row->kode_kelola'
                    and a.tgl_mulai <= '".$tmp[1]."' 
                    and c.no_depo is null order by  case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end, b.nama ";

                    // echo $sql1;

                    $rs1 = $dbLib->execute($sql1);
                    $jangka= 0;$doc=0;
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
		            {
                        if($row1->jenis == "berjangka"){
                            $jangka+=$row1->nilai;
                        }else{
                            $doc+=$row1->nilai;
                        }
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:left'>$no</td>
                        <td style='border-top: medium none;text-align:left'>$row1->nama</td>
                        <td style='border-top: medium none;text-align:left'>$row1->cabang</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nilai,0,",",".")."</td>
                        <td style='border-top: medium none;'>".strtoupper($row1->jenis)."</td>
                        <td style='border-top: medium none;'>$row1->tgl_mulai</td>
                        <td style='border-top: medium none;'>$row1->tgl_selesai</td>
                        <td style='border-top: medium none;text-align:right'>$row1->jml_hari</td>
                        <td style='border-top: medium none;text-align:right'>$row1->jml_bln</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row1->p_bunga,2,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='3'>TOTAL BERJANGKA</td>
                        <td style='text-align:right' >".number_format($jangka,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                    </tr>";
                    echo"
                    <tr style=''>
                        <td style='' colspan='3'>TOTAL DOC</td>
                        <td style='text-align:right' >".number_format($doc,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                    </tr>";
                    $total = $jangka+$doc;
                    echo"
                    <tr style=''>
                        <td style='' colspan='3'>TOTAL</td>
                        <td style='text-align:right' >".number_format($total,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                    </tr>";
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        }
		return "";
		
	}
	
}
?>
