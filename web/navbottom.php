<?php 
echo"
    <style>
    /* Place the navbar at the bottom of the page, and make it stick */
        .navbar_bottom {
        background-color: #dd4b39;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        width: 100%;
        }

        /* Style the links inside the navigation bar */
        .navbar_bottom a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        }

        /* Change the color of links on hover */
        .navbar_bottom a:hover {
        background-color: #d73925;
        color: black;
        }

        /* Add a color to the active/current link */
        .navbar_bottom a.active {
        background-color: #d73925;
        color: white;
        }
    </style>
    ";
       
    echo"<div class='navbar_bottom' style='margin-left:-15px'>
        <a href='#home' class='active' style='padding:5px 0px 0px 0px;width: 25%;'>
        <span><i class='fa fa-home fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Home</span></a>
        <a href='#notif' style='padding:5px 0px 0px 0px;width: 25%;'>
        <span><i class='fa fa-bell fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Notifikasi</span></a>
        <a href='#dokumen' style='padding:5px 0px 0px 0px;width: 25%;'>
        <span><i class='fa fa-file fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Dokumen</span></a>
        <a href='#dokumen' style='padding:5px 0px 0px 0px;width: 25%;'>
        <span><i class='fa fa-user fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Akun</span></a>
    </div>";
?>