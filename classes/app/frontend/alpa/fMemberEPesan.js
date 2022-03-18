//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberEPesan = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberEPesan.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberEPesan";
			this.initComponent();		
			this.setCaption("Edit Pemesanan");
			
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberEPesan]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberEPesan.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberEPesan.implement({    
	initComponent: function(){		
		try{
			uses("portalui_datePicker;portalui_label;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator;server_util_mail;portalui_checkBox");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this,{bound:[10,10,182,20],caption:"Periode",readOnly:true,tag:"9"});
			this.lTgl = new portalui_label(this,{bound:[10,32,100,18],underline:true,caption:"Tanggal Order"});
			this.dp_orderip = new portalui_datePicker(this,{bound:[110,32,82,20],tag:"tglordersip",selectDate:[this,"doSelect"]});
			this.e0ip = new portalui_saiCBBL(this,{bound:[10,54,250,20],caption:"No. Order",rightLabelVisible:false,btnClick:[this,"FindBtnClick"],change:[this,"doEditChange"]});
			this.bGen = new portalui_button(this,{bound:[255,54,80,20],caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doBtnClick"],visible:false});			
			this.cab = new portalui_saiCBBL(this,{bound:[10,76,200,20],caption:"Cabang",btnClick:[this,"FindBtnClick"]});
			this.kotaip = new portalui_saiCBBL(this,{bound:[10,98,200,20],caption:"Kota",btnClick:[this,"FindBtnClick"]});
			this.ecustip = new portalui_saiCBBL(this,{bound:[10,120,200,20],caption:"Customer",readOnly:(this.app.statuslog == "sales" ? false:true),btnVisible:(this.app.statuslog == "sales" ? true:false),btnClick:[this,"FindBtnClick"], tag:(this.app.statuslog == "sales" ? 0:1)});
			this.salesip = new portalui_saiCBBL(this,{bound:[10,142,200,20],caption:"Sales",rightLabelVisible:true,readOnly:true,btnVisible:(this.app.statuslog == "sales" ? false:true),btnClick:[this,"FindBtnClick"], tag:(this.app.statuslog == "sales" ? 0:1)});
			this.e1ip = new portalui_saiLabelEdit(this,{bound:[10,164,400,20],caption:"Keterangan"});
            this.bCb = new portalui_checkBox(this,{bound:[420,164,100,20],caption:"Send Email"});
			var top = 164;
			if (this.app.statuslog == "sales"){
			     this.cbSk = new portalui_saiCBBL(this,{bound:[10,98,200,20],caption:"Jenis Harga",btnClick:[this,"FindBtnClick"]});
			     top = 98;
			}     
			this.bInput = new portalui_button(this,{bound:[this.width - 105,top,80,20],caption:"Simpan",icon:"url(icon/"+system.getThemes()+"/save.png)",click:[this,"doBtnClick"],tag:"inputip"});
			this.p1ip = new portalui_panel(this,{bound:[10,186,this.width - 35,550],border:3,name:"P1",caption:"Barang"});
			this.sg1ip = new portalui_saiGrid(this.p1ip,{bound:[1,20,this.p1ip.width - 4,503],name:"saiSG1",colCount:9,colTitle:["Kode Barang","Nama","Satuan","Harga","%Disc","Harga Disc","Jumlah","Bonus","Sub Total"],
                colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,76,100,76,100,100,100,100]],buttonStyle:[[0],[bsEllips]],colFormat:[[3,4,5,6,7,8],[cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai]],
                change:[this,"sg1onChange"],ellipsClick:[this,"doFindBtnClick"],colReadOnly:[true,[0,1,2,3,4,5,8],[]],rowCount:1});
			this.sgnip = new portalui_sgNavigator(this.p1ip,{bound:[1,525,this.p1ip.width-1,25],grid:this.sg1ip,buttonStyle:2,coAlign:[[0],[alCenter]]});
			this.totalip = new portalui_saiLabelEdit(this.sgnip,{bound:[this.sgnip.width - 352,2,250,20],tipeText:ttNilai, alignment:alRight, caption:"Total",readOnly:true});
			if (this.app.statuslog == "sales")
			     this.salesip.setText(this.app.userlog,this.app.username);
			else  this.ecustip.setText(this.app.userlog,this.app.username);
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
	    try{
    		if (sender == this.dbLib){
    			if (methodName == "getDataProvider"){
    				eval("result = "+result+";");
    				if (result.rs != undefined){
    					var data = result.rs.rows[0];								
    				}
    			}else if (methodName == "execArraySQL"){								
    				if (result.toLowerCase().search("error") != -1)
    					throw (result);
    				else{
    					if (this.bCb.isSelected()){
    					    this.app._mainForm.block();
    					    var subject="Pesanan "+this.id;
        					var pesan=this.getTextMessage(this.id);
        					this.mail.send("admin@klikalpa.com",this.app.userMail,subject,pesan);    					        					
        					//system.confirm(this, "Pemesanan","Transaksi sukses."," ");
                        }else system.info(this.app._mainForm,"Transaksi sukses.","");
    					this.standarLib.clearByTag(this, [0],this.e0ip);
    					this.sg1ip.clear(1);
    				}
    			}
    		}
    		if (sender === this.mail){
    			if (methodName === "sendMail"){
    			    this.app._mainForm.unblock(); 
    				system.info(this,"Transaksi sukses.","Konfirmasi dari kami akan dikirim ke e-mail Anda.");
    			}
    		}
		}catch(e){
		   this.app._mainForm.unblock();
		   systemAPI.alert(this+"$onRequest()",e);
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
	    if (sender == this.e0ip){
	        if (this.app.statuslog == "sales") var field = "sales"; else var field = "kode_cust";
			this.standarLib.showListData(this.getForm(), "Data Order",sender,undefined, 
										"select no_order,keterangan from portal_order_m where "+field+"='"+this.app.userlog+"' and status_bayar='0' and periode='"+this.ePrd.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",
										"select count(*) from portal_order_m where "+field+"='"+this.app.userlog+"' and status_bayar='0' and periode='"+this.ePrd.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",
										["no_order","keterangan"],"and",["No Order","Keterangan"]);		   
		}
		if (sender == this.cbSk)
			this.standarLib.showListData(this.getForm(), "Data Jenis Harga",sender,undefined, 
										  "select no_sk, keterangan from portal_sk_m where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_sk_m where kode_lokasi='"+this.app._lokasi+"' ",
										  ["no_sk","keterangan"],"and",["No Jenis Barang","Keterangan"]);
		        
        if (sender == this.ecustip)		
			this.standarLib.showListData(this.getForm(), "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from portal_klp_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_klp_cust","nama"],"and",["Kode Klp Cust","Nama"]);
		if (sender == this.cab)
			this.standarLib.showListData(this.getForm(), "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"and",["Kode Cabang","Nama"]);
		if (sender == this.kotaip)
			this.standarLib.showListData(this.getForm(), "Data Kota",sender,undefined,
										  "select kode_kota,nama from portal_kota where kode_cab='"+this.cab.getText()+"' ",
										  "select count(*) from portal_kota where kode_cab='"+this.cab.getText()+"' ",
										  ["kode_kota","nama"],"and",["Kode Kota","Nama"]);
		if (sender == this.salesip)
			this.standarLib.showListData(this.getForm(), "Data Sales",sender,undefined,
										  "select kode_sales,nama from portal_sales where kode_cab='"+this.cab.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from portal_sales where kode_cab='"+this.cab.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_sales","nama"],"and",["Kode Sales","Nama"]);
	},
	doBtnClick: function(sender){
		try{
			if (sender == this.bGen){
				this.e0ip.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.ePrd.getText()+"/","0000"));
			}else{
			    //this.bGen.click();
				if (this.sg1ip.getRowValidCount() > 0){				    
					var sql = new server_util_arrayList();
					sql.add("delete from portal_order_d where no_order = '"+this.e0ip.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");   
					sql.add("delete from portal_order_m where no_order = '"+this.e0ip.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang, kota,nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input,status_bayar,no_sk) values "+
							"('"+this.e0ip.getText()+"','"+this.ecustip.getText()+"','"+this.dp_orderip.getDate()+"','"+this.e1ip.getText()+"','0','"+this.cab.getText()+"','"+this.kotaip.getText()+"','-','-','"+this.salesip.getText()+"','"+this.getForm().getPeriodeNow()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date()).getDateStr()+"','0','"+this.cbSk.getText()+"') ");
					for (var k=0; k < this.sg1ip.rows.getLength(); k++){
					    if (this.sg1ip.rowValid(k))
			                 sql.add("insert into portal_order_d (no_order,kode_produk,harga,diskon,jumlah,bonus,kode_lokasi) values  "+
	   						  "('"+this.e0ip.getText()+"','"+this.sg1ip.getCell(0,k)+"',"+parseNilai(this.sg1ip.getCell(3,k))+","+parseNilai(this.sg1ip.getCell(4,k))+","+parseNilai(this.sg1ip.getCell(6,k))+","+parseNilai(this.sg1ip.getCell(7,k))+",'"+this.app._lokasi+"') ");
					}
					this.id = this.e0ip.getText();
					this.tglOrder = this.dp_orderip.getDate();
					this.dbLib.execArraySQL(sql);
				}else throw("Belum ada item barang yang dipilih. Cek Transaksi lagi");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	getTextMessage: function(id){
		var pesan="Kami menerima pemesanan atas nama Bapak/Ibu "+this.app.username+" dengan email <strong>"+
				this.app.userMail+"</strong> untuk pembelian sejumlah produk sesuai dengan data di bawah ini. "+
				"Silakan melakukan pembayaran via transfer ke rekening : <strong>(nama bank), atas "+
				"nama PT. ALPA SPARE PARTS # (no. rekenig). </strong><br><br>"+
				"Setelah selesai membayar, mohon konfirmasi pembayaran Anda dengan mengisi form "+
				"yang ada di website kami. Login dulu sebagai customer, kemudian masuk ke tab "+
				"Customer dan klik menu \"Input Pembayaran\" untuk mengisi form. Jika Anda "+
				"mengalami kesulitan atau membutuhkan informasi tambahan, silakan menghubungi "+
				"admin@roojax.com atau telepon 022-99xxxxx.<br><br><br><strong>"+
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
            for (var i=0;i < this.sg1ip.getRowCount();i++)
    		{
    			pesan+="<tr>"+
    					"<td>"+this.sg1ip.cells(0,i)+", "+this.sg1ip.cells(1,i)+"</td>"+
    					"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
    					"<tr>"+
    					  "<td width='21%'>Rp.</td>"+
    					  "<td width='79%' align='right'>"+this.sg1ip.cells(3,i)+",-</td>"+
    					"</tr>"+
    				  "</table></td>"+
    				                            "<td align='center'>"+this.sg1ip.cells(4,i)+"</td>"+
    											"<td align='center'>"+this.sg1ip.cells(5,i)+"</td>"+
    											"<td align='center'>"+this.sg1ip.cells(6,i)+"</td>"+
    											"<td align='center'>"+this.sg1ip.cells(7,i)+"</td>"+
    											"<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
    					"<tr>"+
    					  "<td width='21%'>Rp.</td>"+
    					  "<td width='79%' align='right'>"+this.sg1ip.cells(8,i)+",-</td>"+
    					"</tr>"+
    				  "</table></td>"+
    				  "</tr>";
    			total+=nilaiToFloat(this.sg1ip.cells(8,i));
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
								"<td colspan='3'><br><strong>Terima kasih telah berkunjung dan berbelanja di alp.com</strong></td>"+
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
    		if (col === 0){
    			try{
    				if (this.app.statuslog == "sales")
    			        var data = this.dbLib.getDataProvider("select a.nama,b.harga,b.diskon,b.harga * (100 - b.diskon)/100 as hargadisc,a.satuan "+
    											"from portal_produk a inner join portal_sk_d b on b.kode_produk = a.kode_produk and b.kode_lokasi = a.kode_lokasi "+
    											"where a.kode_produk = '"+sender.getCell(0,row)+"' and a.kode_lokasi ='"+this.app._lokasi+"' and b.no_sk = '"+this.cbSk.getText()+"'  ",true); 
    			    else 
    				    var data = this.dbLib.getDataProvider("select nama,harga,0,harga as hargadisc, satuan "+
    											"from portal_produk "+
    											"where kode_produk = '"+sender.getCell(0,row)+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);
    				if (typeof data != "string"){
    					if (data.rs.rows[0] != undefined){
    						data = data.rs.rows[0];
    						sender.setCell(1,row,data.nama);
    						sender.setCell(2,row,data.satuan);
    						sender.setCell(3,row,floatToNilai(data.harga));
    						sender.setCell(4,row,floatToNilai(data.diskon));
    						sender.setCell(5,row,floatToNilai(data.hargadisc));
    						sender.setCell(6,row,0);
    						sender.setCell(7,row,0);
    						sender.setCell(8,row,0);
    					}
    				}else throw(data);
    			}catch(e){
    				alert(e,"");
    			}
    		}
    		if (col === 6){
    			var subtotal=strToFloat(sender.getCell(5,row))*strToFloat(sender.getCell(6,row));
    			sender.setCell(8,row,floatToNilai(subtotal));
    			sender.setCell(1,row,sender.getCell(1,row));
    			var tot=0;
    			for (var k=0; k < sender.rows.getLength(); k++){
    				tot+=parseFloat(strToFloat(sender.getCell(8,k)));
    			}
    			this.totalip.setText(floatToNilai(tot));
    		}    
	   }catch(e){
	       alert(e);
        }
    },
    doEditChange: function(sender){
		try
		{
			var data = this.dbLib.getDataProvider("select a.*,b.nama as nmcust,c.nama as nmcbg,d.nama as nmkota,e.nama as nmsls, a.no_sk, ifnull(f.keterangan,'-') as desk "+
				"from portal_order_m a inner join portal_cust b on a.kode_cust=b.kode_cust and b.kode_lokasi = a.kode_lokasi "+
				"left outer join portal_cabang c on a.cabang=c.kode_cab and c.kode_lokasi = a.kode_lokasi "+
				"left outer join portal_kota d on a.kota=d.kode_kota  "+
				"left outer join portal_sales e on a.sales=e.kode_sales and e.kode_lokasi = a.kode_lokasi "+
				"left outer join portal_sk_m f on a.no_sk = f.no_sk and a.kode_lokasi = f.kode_lokasi "+
				"where a.no_order = '"+this.e0ip.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);			
			if (typeof data !== "string"){
				if (data.rs.rows[0] != undefined){
					data = data.rs.rows[0];
					this.cab.setText(data.cabang);
					this.cab.setRightLabelCaption(data.nmcbg);
					this.kotaip.setText(data.kota);
					this.kotaip.setRightLabelCaption(data.nmkota);
					this.ecustip.setText(data.kode_cust);
					this.ecustip.setRightLabelCaption(data.nmcust);
					this.salesip.setText(data.sales);
					this.salesip.setRightLabelCaption(data.nmsls);
					this.dp_orderip.setDateString(data.tanggal);					
					this.e1ip.setText(data.keterangan);			
                    this.cbSk.setText(data.no_sk, data.desk);
					var brg = this.dbLib.getDataProvider("select a.kode_produk,b.nama,b.satuan,a.harga,a.diskon,(a.harga * (100 - a.diskon) / 100) as hargadisc,a.jumlah,a.bonus,(a.jumlah*(a.harga * (100 - a.diskon) / 100)) as subtot "+
										"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk and b.kode_lokasi = a.kode_lokasi "+
										"where a.no_order = '"+this.e0ip.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ",true);					
					if (typeof brg !== "string"){
						if (brg.rs.rows !== undefined){
							this.sg1ip.clear();
							this.sg1ip.showLoading();							
							var line;
							for (var i in brg.rs.rows){
							     line = brg.rs.rows[i];
							     this.sg1ip.appendData([line.kode_produk, line.nama, line.satuan,floatToNilai(parseFloat(line.harga)),floatToNilai(parseFloat(line.diskon)),floatToNilai(parseFloat(line.hargadisc)), line.jumlah, line.bonus, floatToNilai(parseFloat(line.subtot))]);
                            }
                            this.sg1ip.hideLoading();
						}
					}
					var tot=0;
					for (var k=0; k < this.sg1ip.rows.getLength(); k++)			
						tot+=parseFloat(parseNilai(this.sg1ip.getCell(8,k)));					
					this.totalip.setText(floatToNilai(tot));
				}
			}else throw(data);
		}catch(e){
			alert(e,data);
		}
	}
});
