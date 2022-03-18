<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptPenawaranSukuBunga extends server_report_basic
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

    function getTglKe5($tgl)
	{
		global $dbLib;
		
		$rs = $dbLib->execute("select DATEADD(DD,4,'".$tgl."') as tgl");		
		$tgl5 = "";
		if ($rs)
		{
			$tgl5 = substr($rs->fields[0],8,2);		
		}		
		return $tgl5;
	}

    function namaBulan($bulan)
	{
	  switch ($bulan) 
	  {
	    case "01":
	      $tmp="Jan";
	      break;
		case "02":
		  $tmp="Feb";
	      break;
		case "03":
	      $tmp="Mar";
	      break;
		case "04":
	      $tmp="Apr";
	      break;
		case "05":
	      $tmp="Mei";
	      break;
		case "06":
	      $tmp="Jun";
	      break;
		case "07":
	      $tmp="Jul";
	      break;
		case "08":
	      $tmp="Agu";
	      break;  
		case "09":
	      $tmp="Sep";
	      break;  
		case "10":
	      $tmp="Okt";
	      break;  
		case "11":
	      $tmp="Nov";
	      break;  
		case "12":
	      $tmp="Des";
	      break;   
	  }
	  return $tmp;
	}

	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
        $periode=$tmp[0];
        $tgl = $tmp[1];
        $nik = $tmp[2];

        $sql = "SELECT substring(convert(varchar,DATEADD(DD, 2 - DATEPART(DW, '".$tgl."'), '".$tgl."'),120),1,10) ";
        $rs = $dbLib->execute($sql);

        $sql = "select DATEADD(DD,0,'".$rs->fields[0]."') as tgl
        union all
        select DATEADD(DD,1,'".$rs->fields[0]."') as tgl
        union all
        select DATEADD(DD,2,'".$rs->fields[0]."') as tgl
        union all
        select DATEADD(DD,3,'".$rs->fields[0]."') as tgl
        union all
        select DATEADD(DD,4,'".$rs->fields[0]."') as tgl";
        $rs2 = $dbLib->execute($sql);

        $kolom = "";
        while ($row = $rs2->FetchNextObject($toupper=false))
		{
            $kolom .= "<td style='text-align:center' width='50' >".substr($row->tgl,8,2).'-'.$this->namaBulan(substr($row->tgl,5,2))."</td>";
        }

        $sql = "exec dbo.sp_shop_rate '".$tgl."', '".$nik."';";
        // echo $sql;
        $rs3=$dbLib->execute($sql);

        $sql = "select a.kode_bankklp,b.nama,a.h1,a.h2,a.h3,a.h4,a.h5,a.b1,a.b2,a.b3,a.b4,a.b5,a.t1,a.t2,a.t3,a.t4,a.t5 
        from inv_shop_rate_tmp a
        inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp 
        where a.nik_user='$nik' ";
        $rs4=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px;border: 1px solid black;' cellspacing='2' cellpadding='1' width='1000'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='17' style='font-size:14px;text-align:center'>PENAWARAN SUKU BUNGA DEPOSITO / DOC YAKES TELKOM</th>
                    </tr>
                    <tr >
                        <th style='font-size:14px;text-align:center' colspan='17'>Tanggal ".substr($rs->fields[0],8,2)." - ".$this->getTglKe5($rs->fields[0])." ".$this->namaBulan(substr($rs->fields[0],5,2))." ".substr($rs->fields[0],0,4)."
                        </th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='17'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:13px'>
                    <tr style=''>
                        <td style='text-align:center' width='10' rowspan='3'>No</td>
                        <td style='text-align:center' width='190' rowspan='3'>Nama Bank</td>
                        <td style='text-align:center' width='250' colspan='5' rowspan='2'>DOC</td>
                        <td style='text-align:center' width='500' colspan='10' >Deposito</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='250' colspan='5'>1 Bulan</td>
                        <td style='text-align:center' width='250' colspan='5'>3 Bulan</td>
                    </tr>
                    <tr style=''>
                        ".$kolom."
                        ".$kolom."
                        ".$kolom."
                    </tr>
                    ";
                    $no=1;
                    while ($row1 = $rs4->FetchNextObject($toupper=false))
                    {
                        echo "<tr>
                            <td>$no</td>
                            <td>".$row1->nama."</td>
                            <td>".number_format($row1->h1,3,",",".")."</td>
                            <td>".number_format($row1->h2,3,",",".")."</td>
                            <td>".number_format($row1->h3,3,",",".")."</td>
                            <td>".number_format($row1->h4,3,",",".")."</td>
                            <td>".number_format($row1->h5,3,",",".")."</td>
                            <td>".number_format($row1->b1,3,",",".")."</td>
                            <td>".number_format($row1->b2,3,",",".")."</td>
                            <td>".number_format($row1->b3,3,",",".")."</td>
                            <td>".number_format($row1->b4,3,",",".")."</td>
                            <td>".number_format($row1->b5,3,",",".")."</td>
                            <td>".number_format($row1->t1,3,",",".")."</td>
                            <td>".number_format($row1->t2,3,",",".")."</td>
                            <td>".number_format($row1->t3,3,",",".")."</td>
                            <td>".number_format($row1->t4,3,",",".")."</td>
                            <td>".number_format($row1->t5,3,",",".")."</td>
                        </tr>";
                        $no++;
                    }
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
		return "";
		
	}
	
}
?>
