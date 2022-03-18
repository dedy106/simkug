<?php
include "phpqrcode/qrlib.php"; //<-- LOKASI FILE UTAMA PLUGINNYA
 
$tempdir = $_SERVER["DOCUMENT_ROOT"]."/web/app/belajar/qrcode/temp/"; //<-- Nama Folder file QR Code kita nantinya akan disimpan
if (!file_exists($tempdir))#kalau folder belum ada, maka buat.
    mkdir($tempdir);

#parameter inputan
$isi_teks = "11-77777";
$namafile = "11-77777.png";
$quality = 'H'; //ada 4 pilihan, L (Low), M(Medium), Q(Good), H(High)
$ukuran = 5; //batasan 1 paling kecil, 10 paling besar
$padding = 0;
 
QRCode::png($isi_teks,$tempdir.$namafile,$quality,$ukuran,$padding);

 
?>

<html><img src='http://ypt.simkug.com/web/app/belajar/qrcode/temp/11-77777.png' /></html>