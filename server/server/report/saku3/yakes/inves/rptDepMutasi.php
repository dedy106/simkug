<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDepMutasi extends server_report_basic
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
        $kode_kelola=$tmp[1];
        $filter2 =$tmp[2];
        $filter3 =$tmp[3];
        $sql = "select distinct a.kode_kelola,b.nama as nama_kelola 
                from inv_depo2_m a
                inner join inv_kelola b on a.kode_kelola=b.kode_kelola
                $this->filter
                order by a.kode_kelola ";

        
		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1300'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px'>LAPORAN MUTASI DEPOSITO YAKES TELKOM </th>
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
                        <td style='text-align:center' width='100'>Tgl Transaksi</td>
                        <td style='text-align:center' width='90'>Jenis </td>
                        <td style='text-align:center' width='120'>No Deposito</td>
                        <td style='text-align:center' width='200'>Nama Bank</td>
                        <td style='text-align:center' width='100'>Tgl Mulai</td>
                        <td style='text-align:center' width='100'>Tgl Selesai</td>
                        <td style='text-align:center' width='100'>Penempatan</td>
                        <td style='text-align:center' width='100'>Pencairan</td>
                        <td style='text-align:center' width='100'>Status</td>
                    </tr>";
                    $tutup1=0;$penempatan1=0;
                    $rs=$dbLib->execute($sql);
                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                    echo" <tr style=''>
                        <td style=' border-top: medium none;font-weight:bold' colspan='11'>$row->nama_kelola</td>
                    </tr>";

                    $no=1;
                    $sql = "select x.nama_plan,x.nama_kelola,convert(varchar,x.tanggal,103) as tgl_trans,case x.jenis when 'DEPOSITO' then 'Berjangka' else 'DOC' end as jenis,x.no_depo,x.nama_bank, convert(varchar,x.tgl_mulai,103) as tgl_mulai,convert(varchar,x.tgl_selesai,103) as tgl_selesai, x.penempatan,x.tutup,x.status 
                    from ( select c.nama as nama_plan,b.nama as nama_kelola, a.tgl_mulai as tanggal,a.jenis,a.no_depo,e.nama as nama_bank, a.tgl_mulai,
                            a.tgl_selesai, a.nilai as penempatan, 0 as tutup, case when d.no_tutup is null then 'Penempatan Baru' else 'Perpanjangan' end as status 
                            from inv_depo2_m a 
                            inner join inv_kelola b on a.kode_kelola=b.kode_kelola 
                            inner join inv_plan c on a.kode_plan=c.kode_plan 
                            inner join inv_bank e on a.bdepo=e.kode_bank 
                            left join inv_depotutup_m d on a.no_shop=d.no_tutup 
                            $filter2 and(a.kode_kelola = '$row->kode_kelola') 
                            union all
                            select cc.nama as nama_plan,bb.nama as nama_kelola, c.tanggal,b.jenis,b.no_depo,ee.nama as nama_bank, b.tgl_mulai,b.tgl_selesai, 0 as tempat, b.nilai as tutup, 'Pencairan' as status 
                            from inv_depotutup_m a 
                            inner join inv_depo2_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi 
                            inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi 
                            inner join inv_kelola bb on b.kode_kelola=bb.kode_kelola 
                            inner join inv_plan cc on b.kode_plan=cc.kode_plan 
                            inner join inv_bank ee on b.bdepo=ee.kode_bank 
                            $filter3 and(b.kode_kelola = '$row->kode_kelola') and a.jenis in ('TUTUP','SEBAGIAN') 
                            union all 
                            select cc.nama as nama_plan,bb.nama as nama_kelola, a.tanggal,b.jenis,b.no_depo,ee.nama as nama_bank, b.tgl_mulai,
                            b.tgl_selesai, 0 as tempat, b.nilai as tutup,'Pencairan' as status 
                            from inv_depotutup_m a 
                            inner join inv_depo2_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi 
                            inner join inv_kelola bb on b.kode_kelola=bb.kode_kelola 
                            inner join inv_plan cc on b.kode_plan=cc.kode_plan 
                            inner join inv_bank ee on b.bdepo=ee.kode_bank 
                            $filter2 and(b.kode_kelola = '$row->kode_kelola') and a.jenis in ('TTPPECAH','PERPANJANG','PINDAHJNS') 
                    )x order by x.nama_plan,x.nama_kelola,x.tanggal ";

                        $rs1 = $dbLib->execute($sql);
                        $tutup=0;$penempatan=0;
                        $doctutup=0;$docpen=0;$depotutup=0;$depopen=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $tutup+=$row1->tutup;
                            $penempatan+=$row1->penempatan;
                            if(strtoupper($row1->jenis) == "DOC"){
                                $doctutup+=$row1->tutup;
                                $docpen+=$row1->penempatan;
                            }else{
                                $depotutup+=$row1->tutup;
                                $depopen+=$row1->penempatan;
                            }
                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row1->nama_plan</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_trans</td>
                            <td style='border-top: medium none;text-align:left'>".strtoupper($row1->jenis)."</td>
                            <td style='border-top: medium none;text-align:left'>$row1->no_depo</td>
                            <td style='border-top: medium none;text-align:left'>$row1->nama_bank</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_mulai</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_selesai</td>
                            <td style='border-top: medium none;text-align:right'>".number_format($row1->penempatan,0,",",".")."</td>
                            <td style='border-top: medium none;text-align:right'>".number_format($row1->tutup,0,",",".")."</td>";
                            if($row1->tgl_trans != $row1->tgl_selesai){
                                $ket = "(breakable)";
                            }else{
                                $ket = "";
                            }
                            echo"
                            <td style='border-top: medium none;text-align:left'>".ucwords($row1->status)." $ket </td>";
                            echo"
                        </tr>";
                        $no++;

                        }
                        echo"
                        <tr style=''>
                            <td style='font-weight:bold' colspan='8'>TOTAL DOC</td>
                            <td style='text-align:right' >".number_format($docpen,0,",",".")."</td>
                            <td style='text-align:right' >".number_format($doctutup,0,",",".")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                        echo"
                        <tr style=''>
                            <td style='font-weight:bold' colspan='8'>TOTAL BERJANGKA</td>
                            <td style='text-align:right' >".number_format($depopen,0,",",".")."</td>
                            <td style='text-align:right' >".number_format($depotutup,0,",",".")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                        echo"
                        <tr style=''>
                            <td style='font-weight:bold' colspan='8'>TOTAL $row->nama_kelola</td>
                            <td style='text-align:right' >".number_format($penempatan,0,",",".")."</td>
                            <td style='text-align:right' >".number_format($tutup,0,",",".")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                        $tutup1+=$tutup;
                        $penempatan1+=$penempatan;
                    }
                    echo"
                        <tr style=''>
                            <td style='font-weight:bold' colspan='8'>TOTAL</td>
                            <td style='text-align:right' >".number_format($penempatan1,0,",",".")."</td>
                            <td style='text-align:right' >".number_format($tutup1,0,",",".")."</td>
                            <td style='text-align:right' >&nbsp;</td>
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
