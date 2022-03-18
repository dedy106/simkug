<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptTotalValue extends server_report_basic
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
        $tgl = $tmp[1];
        $mi = $tmp[2];
        $seri = $tmp[3];
        $ktg = $tmp[4];
        $tahun = substr($tgl,0,4);
        $tglawal = $tahun."-01-01";
        if($mi != "" ){
            $sqlmi = "select nama from inv_rdkelola where flag_aktif='2' and kode_rdkelola ='$mi' ";
            $rsmi = $dbLib->execute($sqlmi);
            $labelmi ="<tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>MI : ".$rsmi->fields[0]."</th>
                    </tr>";
        }else{
            $labelmi ="";
        }

        if($seri != "" ){
            // $sqlseri = "select nama from inv_rdkelola where flag_aktif='2' and kode_rdkelola ='$seri' ";
            // $rsseri = $dbLib->execute($sqlseri);
            $labelseri ="<tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>No Seri : ".$seri."</th>
                    </tr>";
        }else{
            $labelseri ="";
        }

        if($ktg != "" ){
            // $sqlktg = "select nama from inv_rdkelola where flag_aktif='2' and kode_rdkelola ='$ktg' ";
            // $rsktg = $dbLib->execute($sqlktg);
            $labelktg ="<tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>Kategori Rating : ".$ktg."</th>
                    </tr>";
        }else{
            $labelktg ="";
        }
        
        $sql="select a.kode_rdkelola,d.nama as portfolio,c.isin as ticker,c.kode_jenis as ibpa,a.sum_transaction,
        c.nama as nama_obligasi,c.persen as kupon,c.tgl_selesai as maturity_date,     
        cast (datediff(day,'$tgl',c.tgl_selesai) as float) / 360 as tenor,
        round(cast (datediff(day,'$tgl',c.tgl_selesai) as float) / 360,2) as tenor_group,
        f.kode_tenor as tenor_class,
        case when cast(datediff(day,'$tgl',c.tgl_selesai) as float) <= 360 then 'MM' else '-' end as umur,
        c.kode_rating,e.kategori as kategori_rating,
        isnull(g.h_wajar,100) as h_awal,
        isnull(h.h_wajar,100) as h_akhir,
        (isnull(h.h_wajar,100)/100) * a.sum_transaction as fair_sum,
        
        
        ((isnull(h.h_wajar,100)-isnull(g.h_wajar,100)) *  ((isnull(h.h_wajar,100) * a.sum_transaction) / (sum(isnull(h.h_wajar,100) * a.sum_transaction /100) over (partition by '$tgl')))) / 100 as kinerja_harga,
        
        ((c.persen/12) * (month('$tgl') * ((isnull(h.h_wajar,100) * a.sum_transaction) / (sum(isnull(h.h_wajar,100) * a.sum_transaction /100) over (partition by '$tgl')))))/100    as kupon_yield,
        
        (((isnull(h.h_wajar,100)-isnull(g.h_wajar,100)) *  ((isnull(h.h_wajar,100) * sum_transaction) / (sum(isnull(h.h_wajar,100) * sum_transaction /100) over (partition by '$tgl')))) / 100) + (((c.persen/12) * (month('$tgl') * ((isnull(h.h_wajar,100) * sum_transaction) / (sum(isnull(h.h_wajar,100) * sum_transaction /100) over (partition by '$tgl')))))/100) as total
        
        
        
        from
        (
        select a.kode_rdkelola,a.kode_jenis,sum(a.nilai-isnull(b.jual,0))  as sum_transaction
        from 
            (	
                select a.kode_rdkelola,a.kode_jenis,sum(a.nilai)  as nilai 
                from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
                where b.tanggal<='$tgl'
                group by a.kode_rdkelola,a.kode_jenis 
            ) a 
                
            left join 
            (
                select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
                from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
                where b.tanggal<='$tgl'
                group by b.kode_rdkelola,a.kode_jenis 
            ) b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
        
        where a.kode_rdkelola like '%' 
        group by a.kode_rdkelola,a.kode_jenis
        having sum(a.nilai-isnull(b.jual,0)) > 0
        ) a 
        
        inner join inv_oblijenis c on a.kode_jenis=c.kode_jenis
        inner join inv_rdkelola d on a.kode_rdkelola=d.kode_rdkelola
        inner join inv_obli_rating e on c.kode_rating=e.kode_rating
        -- inner join inv_obli_tenor f on round(cast (datediff(day,'$tgl',c.tgl_selesai) as float) / 360,2) between f.bawah and f.atas
        inner join inv_obli_tenor f on round(cast (datediff(day,'$tgl',c.tgl_selesai) as float) / 360,2) > f.bawah and round(cast (datediff(day,'$tgl',c.tgl_selesai) as float) / 360,2) <= f.atas
        
        left join (select kode_jenis,h_wajar,yield from inv_obli_harga where tanggal='$tglawal') g on c.kode_jenis=g.kode_jenis
        left join (select kode_jenis,h_wajar,yield from inv_obli_harga where tanggal='$tgl') h on c.kode_jenis=h.kode_jenis
        $this->filter
        order by d.nama,c.isin ";

        // echo $sql;
                
        $rs = $dbLib->execute($sql);

        $thn = substr($tgl,0,4);
		$date = substr($tgl,8,2);
		$AddOnLib=new server_util_AddOnLib();	
		$bln = $AddOnLib->ubah_bulan(substr($tgl,5,2));
		$filtgl = $date." ".$bln." ".$thn;

        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
        echo "<div align='center' style='padding-right:20px;width:1950px'>";
        echo"<table style='border-collapse: collapse;margin:10px;' cellspacing='2' cellpadding='1' width='1920' >
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>LAPORAN TOTAL VALUE YAKES-TELKOM</th>
                    </tr>
                    $labelmi
                    $labelseri
                    $labelktg
                    <tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>Per $filtgl</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:12px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='10' >No</td>
                        <td style='text-align:center' width='60' >Kode MI</td> 
                        <td style='text-align:center' width='200' >Portofolio</td>
                        <td style='text-align:center' width='100' >Ticker</td>
                        <td style='text-align:center' width='100' >IBPA</td>
                        <td style='text-align:center' width='120' >Sum Transaction</td>
                        <td style='text-align:center' width='200' >Nama Obligasi</td>
                        <td style='text-align:center' width='50' >Kupon</td>
                        <td style='text-align:center' width='90' >Maturity Date</td>
                        <td style='text-align:center' width='60' >Tenor</td>
                        <td style='text-align:center' width='60' >Tenor Group</td>
                        <td style='text-align:center' width='60' >Tenor Class</td>
                        <td style='text-align:center' width='50' >Umur</td>
                        <td style='text-align:center' width='50' >Kode Rating</td>
                        <td style='text-align:center' width='50' >Kategori Rating</td>
                        <td style='text-align:center' width='100' >Price 1 Jan</td>
                        <td style='text-align:center' width='100' >Fair Price Current</td>
                        <td style='text-align:center' width='100' >Fair Sum</td>
                        <td style='text-align:center' width='100' >Kinerja Harga</td>
                        <td style='text-align:center' width='100' >Kupon Yield</td>
                        <td style='text-align:center' width='100' >Total</td>
                    </tr>";
                    
                    $rs = $dbLib->execute($sql);
                    $sum_transaction= 0;$no=1; $fair_sum=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $sum_transaction+=$row->sum_transaction;
                        $fair_sum+=$row->fair_sum;
                      
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;'>$row->kode_rdkelola</td>
                        <td style='border-top: medium none;'>$row->portfolio</td>
                        <td style='border-top: medium none;'>$row->ticker</td>
                        <td style='border-top: medium none;'>$row->ibpa</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->sum_transaction,0,",",".")."</td>
                        <td style='border-top: medium none;'>$row->nama_obligasi</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->kupon,4,",",".")."</td>
                        <td style='border-top: medium none;'>$row->maturity_date</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->tenor,4,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->tenor_group,4,",",".")."</td>
                        <td style='border-top: medium none;'>$row->tenor_class</td>
                        <td style='border-top: medium none;'>".strtoupper($row->umur)."</td>
                        <td style='border-top: medium none;'>$row->kode_rating</td>
                        <td style='border-top: medium none;'>$row->kategori_rating</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_awal,4,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_akhir,4,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->fair_sum,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->kinerja_harga,4,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->kupon_yield,4,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->total,4,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='5'>TOTAL</td>
                        <td style='text-align:right' >".number_format($sum_transaction,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($fair_sum,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
        // }
		return "";
		
	}
	
}
?>
