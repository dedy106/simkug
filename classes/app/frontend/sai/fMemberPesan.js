//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberPesan = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberPesan.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberPesan";
			this.initComponent();		
			this.setCaption("Input Pemesanan");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberPesan]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberPesan.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberPesan.implement({
	initComponent: function(){		
		try{
			uses("portalui_datePicker;portalui_label;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator;server_util_mail");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this,{bound:[10,10,182,20],caption:"Periode",readOnly:true,tag:"9"});
			this.lTgl = new portalui_label(this,{bound:[10,32,100,18],underline:true,caption:"Tanggal Order"});
			this.dp_orderip = new portalui_datePicker(this,{bound:[110,32,82,20],tag:"tglordersip",selectDate:[this,"doSelect"]});
			this.e0ip = new portalui_saiCBBL(this,{bound:[10,54,250,20],caption:"No. Order",btnVisible:false, rightLabelVisible:false});
			this.bGen = new portalui_button(this,{bound:[255,54,80,20],caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doBtnClick"]});			
			this.cab = new portalui_saiCBBL(this,{bound:[10,76,200,20],caption:"Cabang",btnClick:[this,"FindBtnClick"]});
			this.kotaip = new portalui_saiCBBL(this,{bound:[10,98,200,20],caption:"Kota",btnClick:[this,"FindBtnClick"]});
			this.ecustip = new portalui_saiCBBL(this,{bound:[10,120,200,20],caption:"Customer",readOnly:true,btnVisible:false,btnClick:[this,"FindBtnClick"]});
			this.salesip = new portalui_saiCBBL(this,{bound:[10,142,200,20],caption:"Sales",rightLabelVisible:true,btnClick:[this,"FindBtnClick"]});
			this.e1ip = new portalui_saiLabelEdit(this,{bound:[10,164,400,20],caption:"Keterangan"});
			this.p1ip = new portalui_panel(this,{bound:[10,186,this.width - 35,175],border:3,name:"P1",caption:"Barang"});
			this.sg1ip = new portalui_saiGrid(this.p1ip,{bound:[1,20,this.p1ip.width - 4,128],name:"saiSG1",colCount:6,colTitle:["Kode Barang","Nama","Satuan","Jumlah","Harga per Item","Sub Total"],
                colWidth:[[5,4,3,2,1,0],[100,100,76,100,100,100]],buttonStyle:[[0],[bsEllips]],colFormat:[[3,4,5],[cfNilai, cfNilai, cfNilai]],
                change:[this,"sg1onChange"],ellipsClick:[this,"doFindBtnClick"],colReadOnly:[true,[0,1,2,4,5],[]]});
			this.sgnip = new portalui_sgNavigator(this.p1ip,{bound:[1,148,this.p1ip.width - 4,25],grid:this.sg1ip,buttonStyle:2});
			this.totalip = new portalui_saiLabelEdit(this.sgnip,{bound:[this.sgnip.width - 300,2,250,20],tipeText:ttNilai, alignment:alRight, caption:"Total",readOnly:true});
			this.bInput = new portalui_button(this,{bound:[10,368,80,20],caption:"Simpan",icon:"url(icon/"+system.getThemes()+"/save.png)",click:[this,"doBtnClick"],tag:"inputip"});
			this.ecustip.setText(this.app.userlog,this.app.username);
			this.dp_orderip.setDateString(new Date().getDateStr());
			this.rearrangeChild(5,23);
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}
			this.mail = new server_util_mail();
			this.mail.addListener(this);
			this.mail.setUser("admin@klikalpa.com","saisai","tls");
			this.mail.configSmtp("smtp.gmail.com","465");
			this.mail.configPop3("pop.gmail.com","995");
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if (methodName == "getDataProvider"){
				eval("result = "+result+";");
				if (result.rs != undefined){
					var data = result.rs.rows[0];								
				}
			}else if (methodName == "execArraySQL"){								
				if (result.toLowerCase().search("error") != -1)
					alert(result);
				else{
					//system.info(this.app._mainForm,result,"");
					var subject="Pesanan "+this.id;
					var pesan=this.getTextMessage(this.id);
					this.mail.send("admin@klikalpa.com",this.app.userMail,subject,pesan);
					this.standarLib.clearByTag(this, [0],this.e0ip);
					this.sg1ip.clear();
				}
			}
		}
		if (sender === this.mail){
			if (methodName === "sendMail"){
				system.confirm(this, "Pemesanan","Transaksi sukses.","Konfirmasi dari kami akan dikirim ke e-mail Anda.");
			}
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
		}catch(e){
			alert("::doChildItemsClick : "+e);
		}
	},
	doSelect: function(sender, y, m, d){
		var prd = y +""+ (m < 10 ? '0' + m: m);
		this.ePrd.setText(prd);
	},
	FindBtnClick : function(sender){
		if (sender == this.ecustip)
			this.standarLib.showListData(this.getForm(), "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust",
										  "select count(*) from portal_klp_cust",
										  ["kode_klp_cust","nama"],"where",["Kode Klp Cust","Nama"]);
		if (sender == this.cab)
			this.standarLib.showListData(this.getForm(), "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"and",["Kode Cabang","Nama"]);
		if (sender == this.kotaip)
			this.standarLib.showListData(this.getForm(), "Data Kota",sender,undefined,
										  "select kode_kota,nama from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  "select count(*) from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  ["kode_kota","nama"],"and",["Kode Kota","Nama"]);
		if (sender == this.salesip)
			this.standarLib.showListData(this.getForm(), "Data Sales",sender,undefined,
										  "select kode_sales,nama from portal_sales where kode_cab='"+this.cab.getText()+"'",
										  "select count(*) from portal_sales where kode_cab='"+this.cab.getText()+"'",
										  ["kode_sales","nama"],"and",["Kode Sales","Nama"]);
	},
	doBtnClick: function(sender){
		try{
			if (sender == this.bGen){
				this.e0ip.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.ePrd.getText()+"/","0000"));
			}else{
				if (this.sg1ip.allRowValid){
					var sql = new server_util_arrayList();
					sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang, kota,nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input,status_bayar) values "+
							"('"+this.e0ip.getText()+"','"+this.ecustip.getText()+"','"+this.dp_orderip.getDate()+"','"+this.e1ip.getText()+"','C','"+this.cab.getText()+"','"+this.kotaip.getText()+"','-','-','"+this.salesip.getText()+"','"+this.getForm().getPeriodeNow()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date()).getDateStr()+"','0') ");
					for (var k=0; k < this.sg1ip.rows.getLength(); k++)
					{
						sql.add("insert into portal_order_d (no_order,kode_produk,jumlah,harga,kode_lokasi) values  "+
							"('"+this.e0ip.getText()+"','"+this.sg1ip.getCell(0,k)+"',"+parseNilai(this.sg1ip.getCell(3,k))+","+parseNilai(this.sg1ip.getCell(4,k))+",'"+this.app._lokasi+"') ");
					}
					this.id = this.e0ip.getText();
					this.tglOrder = this.dp_orderip.getDate();
					this.dbLib.execArraySQL(sql);
				}else alert("Belum ada item barang yang dipilih","Cek Transaksi lagi");
			}
		}catch(e){
			alert(e);
		}
	},
	getTextMessage: function(id){
		var data = this.dbLib.loadQuery("select a.kode_produk,b.nama as nmbrg,a.harga,a.jumlah,(a.harga*a.jumlah) as subtot "+
					"from portal_order_d a left outer join portal_produk b on a.kode_produk=b.kode_produk "+
					"where a.no_order='"+id+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
		var pesan="Kami menerima pemesanan atas nama Bapak/Ibu "+this.app.username+" dengan email <strong>"+
				this.app.userMail+"</strong> untuk pembelian sejumlah produk sesuai dengan data di bawah ini. "+
				"Silakan melakukan pembayaran via transfer ke rekening : <strong>(nama bank), atas "+
				"nama PT. ALPA SPARE PARTS # (no. rekenig). </strong><br><br>"+
				"Setelah selesai membayar, mohon konfirmasi pembayaran Anda dengan mengisi form "+
				"yang ada di website kami. Login dulu sebagai customer, kemudian masuk ke tab "+
				"Customer dan klik menu \"Input Pembayaran\" untuk mengisi form. Jika Anda "+
				"mengalami kesulitan atau membutuhkan informasi tambahan, silakan menghubungi "+
				"admin@klikalpa.com atau telepon 022-99xxxxx.<br><br><br><strong>"+
				"Data pesanan produk yang kami terima adalah sebagai berikut :</strong><br><br>"+
				"<table width='100%' border='0' cellpadding='0' cellspacing='0'>"+
				  "<tr>"+
					"<td width='19%' ><strong>Tanggal Transaksi</strong></td>"+
					"<td width='4%' align='center'>:</td>"+
					"<td width='28%' >"+this.tglOrder+"</td>"+
					"<td width='49%' >&nbsp;</td>"+
				  "</tr>"+
				  "<tr>"+
					"<td><strong>Dipesan oleh</strong> </td>"+
					"<td align='center'>:</td>"+
					"<td>"+this.app.username+"</td>"+
					"<td><strong>Email :</strong> "+this.app.userMail+"</td>"+
				  "</tr>"+
				  "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
				  "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"+
				  "<tr>"+
					"<td><strong>Nomor ID Pesanan</strong></td>"+
					"<td align='center'>:</td>"+
					"<td>"+id+"</td>"+
					"<td>&nbsp;</td>"+
				  "</tr>"+
				"</table>"+
				"<table width='100%' border='1' cellspacing='0' cellpadding='0' bordercolor='#111111'>"+
				  "<tr>"+
					"<td width='40%' align='center'>NAMA PRODUK </td>"+
					"<td width='20%' align='center'>HARGA</td>"+
					"<td width='20%' align='center'>JUMLAH</td>"+
					"<td width='20%' align='center'>SUB TOTAL</td>"+
				  "</tr>";
		var total=0;
		if (data!==undefined)
		{
			list=data.split("\r\n");
			if (list[1]!=undefined)
			{
				for (var i in list)
				{
					if (i>0)
					{
						isi=list[i].split(";");
						pesan+="<tr>"+
								"<td>"+isi[0]+", "+isi[1]+"</td>"+
								"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
								"<tr>"+
								  "<td width='21%'>Rp.</td>"+
								  "<td width='79%' align='right'>"+floatToNilai(isi[2])+",-</td>"+
								"</tr>"+
							  "</table></td>"+
														"<td align='center'>"+floatToNilai(isi[3])+"</td>"+
														"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
								"<tr>"+
								  "<td width='21%'>Rp.</td>"+
								  "<td width='79%' align='right'>"+floatToNilai(isi[4])+",-</td>"+
								"</tr>"+
							  "</table></td>"+
							  "</tr>";
						total+=parseFloat(isi[4]);
					}
				}
			}
		}
			pesan+="<tr>"+
					"<td colspan='3'>Biaya pengiriman : </td>"+
					"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>0,-</td>"+
					"</tr>"+
				  "</table></td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3' align='right'>TOTAL</td>"+
								"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					"<tr>"+
					  "<td width='21%'>Rp.</td>"+
					  "<td width='79%' align='right'>"+floatToNilai(total)+",-</td>"+
					"</tr>"+
				  "</table></td>"+
							  "</tr>"+
							"</table><br>"+
							"<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
							  "<tr>"+
								"<td width='15%'><strong>Nama Penerima </strong></td>"+
								"<td width='6%' align='center' valign='top'>:</td>"+
								"<td width='79%'>"+this.app.username+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td valign='top'><strong>Alamat</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.app.userAlmt+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td><strong>Email</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.app.userMail+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td><strong>Telepon</strong></td>"+
								"<td align='center' valign='top'>:</td>"+
								"<td>"+this.app.userTelp+"</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'>&nbsp;</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>Syarat dan kondisi</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>1. Hanya pesanan yang telah melakukan pembayaran yang akan diproses untuk pengiriman.</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>2. Pesanan belum termasuk PPn 10%.</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;'>"+
								"<td colspan='3'>3. Harga dan stok dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'><br><strong>Terima kasih telah berkunjung dan berbelanja di klikalpa.com</strong></td>"+
							  "</tr>"+
							  "<tr>"+
								"<td colspan='3'><br>Salam<br><br><br><br>alp.com</td>"+
							"</table>";
		return pesan;
	},
	doFindBtnClick: function(sender, col, row){
		try{
			switch(col)
			{
			    case 0:
					if (sender == this.sg1ip){
						this.standarLib.ListDataSGFilter(this.getForm(),"Data Barang",sender, 
							  sender.row, sender.col,
							  "select kode_produk,nama from portal_produk ",
							  "select count(*) from portal_produk ",
							  ["kode_produk","nama"],"where",["Kode","Nama"]);
					}
				break;
			}
		}catch(e){
			alert("doFindBtnClick : " + e);
		}
	},
	sg1onChange: function(sender,col,row){
	    try{   
    		if (col == 0){
    			try{
    				var data = this.dbLib.getDataProvider("select nama,harga,satuan "+
    											"from portal_produk "+
    											"where kode_produk = '"+sender.getCell(0,row)+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);
    				if (typeof data != "string"){
    					if (data.rs.rows[0] != undefined){
    						data = data.rs.rows[0];
    						sender.setCell(1,row,data.nama);
    						sender.setCell(2,row,data.satuan);
    						sender.setCell(3,row,0);
    						sender.setCell(4,row,floatToNilai(data.harga));
    						sender.setCell(5,row,0);
    					}
    				}else throw(data);
    			}catch(e){
    				alert(e,"");
    			}
    		}
    		if (col == 3){
    			var subtotal=strToFloat(sender.getCell(3,row))*strToFloat(sender.getCell(4,row));
    			sender.setCell(5,row,floatToNilai(subtotal));
    			sender.setCell(1,row,sender.getCell(1,row));
    			var tot=0;
    			for (var k=0; k < sender.rows.getLength(); k++){
    				tot+=parseFloat(strToFloat(sender.getCell(5,k)));
    			}
    			this.totalip.setText(floatToNilai(tot));
    		}    	
	   }catch(e){
	       alert(e);
        }
    }
});
