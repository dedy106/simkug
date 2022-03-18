<?php
$tahun=2010;
$bulan=5;
$j=0;
for ($i=1; $i<=26; $i++)
{
	$tmp=$bulan+$j;
	if ($tmp>=12)
	{
		$bulan=1;
		$tahun=$tahun+1;
		$j=0;
	}
	else
	{
		$j=$j+1;
	}
	$periode=$tahun.str_pad(strval($tmp),2, "0", STR_PAD_LEFT);
	echo $periode."<br>";
}
?>