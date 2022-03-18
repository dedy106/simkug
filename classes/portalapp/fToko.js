//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fToko = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fToko.prototype.parent.constructor.call(this, owner);
			window.portalapp_fToko.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fToko.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fToko";											
			this.initComponent();		
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fToko]::contruct:"+e,"");
	}
};
window.portalapp_fToko.extend(window.portalui_panel);
window.portalapp_fToko.implement({
	initComponent: function(){
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);		
		uses("portalui_imageslide;portalui_treeView;portalui_treeNode;portalui_pager;util_standar");
		this.standarLib = new util_standar();
		this.menu = new portalui_imageslide(this);
		this.menu.setBound(0,0,this.width, 100);		
		this.menu.setBackground("url(image/themes/"+system.getThemes()+"/headbg.gif) top left repeat-x");
		this.menu.onItemClick.set(this,"doSlideClick");
		this.tabLeft = new portalui_FEtabPanel(this);
		this.tabLeft.setBound(10,105,200,400);
		this.tabLeft.addPage(["Kategori","Pencarian"]);
		this.tabLeft.childPage[1].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";					
			this.treev = new portalui_treeView(this.tabLeft.childPage[0]);
			this.treev.setBound(0,0,this.tabLeft.width - (document.all ? 2 : 0), this.tabLeft.height-(document.all ? 22:20));
			this.treev.childLength = 200;
			this.treev.onDblClick.set(this,"doItemTreeClick");
			this.status = 0;
			this.dbLib.getDataProviderA("select * from portal_kategori where kode_lokasi = '"+this.app._lokasi+"' order by rowindex");
			
			this.cbKategori = new portalui_saiCB(this.tabLeft.childPage[1]);
			this.cbKategori.setLabelWidth(80);
			this.cbKategori.setBound(10,10,180,20);
			this.cbKategori.setCaption("Kateogri");
			
			this.esearch = new portalui_saiLabelEdit(this.tabLeft.childPage[1]);
			this.esearch.setLabelWidth(80);
			this.esearch.setBound(10,33,180,20);
			this.esearch.setCaption("Search");
			
			this.bSearch = new portalui_button(this.tabLeft.childPage[1]);
			this.bSearch.setBound(100,56,80,20);
			this.bSearch.setCaption("Search");
			this.bSearch.onClick.set(this,"doClick");
			
		this.tabCenter = new portalui_FEtabPanel(this);
		this.tabCenter.setBound(220,105,450,380);
		this.tabCenter.addPage(["New Item","Barang Terlaris","Promosi","Daftar Barang"]);		
		this.tabCenter.onTabChange.set(this,"doTabChange");
		
		this.childBlock = new portalui_panel(this);
		this.childBlock.setBound(220,105,443,380);		
		this.childBlock.setBorder(0);
		this.childBlock.setColor("#FFF");
		this.childBlock.getCanvas().style.zIndex = 999999;
		this.childBlock.hide();		
		
		this.pgr = new portalui_pager(this);
		this.pgr.setBound(220,this.tabCenter.height + this.tabCenter.top ,this.tabCenter.width,20);		
		this.pgr.onPager.set(this,"doPager");
		this.pgr.hide();		
		this.pgr2 = new portalui_pager(this);
		this.pgr2.setBound(220,this.tabCenter.height + this.tabCenter.top ,this.tabCenter.width,20);		
		this.pgr2.onPager.set(this,"doPager");
		this.pgr2.hide();		
		this.pgr0 = new portalui_pager(this);
		this.pgr0.setBound(220,this.tabCenter.height + this.tabCenter.top ,this.tabCenter.width,20);		
		this.pgr0.onPager.set(this,"doPager");
		this.pgr0.show();
		
		this.pLogin = new portalui_panel(this);
		this.pLogin.setBound(this.tabCenter.left + this.tabCenter.width + 10,105,200,130);
		this.pLogin.setCaption("Login");
			
			this.uid = new portalui_saiLabelEdit(this.pLogin);
			this.uid.setLabelWidth(80);
			this.uid.setBound(10,30,180,20);
			this.uid.setCaption("User Id");
			
			this.pwd = new portalui_saiLabelEdit(this.pLogin);
			this.pwd.setLabelWidth(80);
			this.pwd.setBound(10,53,180,20);
			this.pwd.setCaption("Password");
			this.pwd.setPassword(true);
			
			this.cbStatus = new portalui_saiCB(this.pLogin);
			this.cbStatus.setLabelWidth(80);
			this.cbStatus.setBound(10,76,180,20);
			this.cbStatus.setCaption("Status");
				this.cbStatus.addItem(0,"Customer");
				this.cbStatus.addItem(1,"Sales");				
			
			this.bLogin = new portalui_button(this.pLogin);
			this.bLogin.setBound(100,99,80,20);
			this.bLogin.setCaption("Login");
			this.bLogin.onClick.set(this,"doClick");
			this.tabCenter.childPage[0].isLoaded = true;
			this.doItemClick("","","",0);			
			
			this.bmyCart = new portalui_button(this);
			this.bmyCart.setBound(this.width - 120,this.pLogin.top + this.pLogin.height,80,20);
			this.bmyCart.setCaption("my Cart");
			this.bmyCart.hide();
			this.bmyCart.onClick.set(this,"doCheckOut");
	}, 
	doSizeChange : function(width, height){
		this.menu.setWidth(width);
		this.bmyCart.setBound(this.width - 115,this.pLogin.top + this.pLogin.height + 5,80,20);
	},
	doTabChange: function(sender, page){
		this.pgr.hide();
		this.pgr0.hide();		
		if (page == 0) this.pgr0.show();
		else if (page == 1) this.pgr.show();
		else if (page == 3) this.pgr2.show();
		if (page == 0 || page == 1 || page == 3) this.tabCenter.setHeight(380);
		else this.tabCenter.setHeight(400);
		this.tabCenter.childPage[page].setHeight(this.tabCenter.height - 20);
		if (this.tabCenter.childPage[page].isLoaded == undefined){
			this.doItemClick("","","",page);
			this.tabCenter.childPage[page].isLoaded = true;
		}
	},
	doClick: function(sender){
		if (sender === this.bLogin){
			if (sender.caption == "Login"){								
				if (this.app._mainForm.userLogin(this.uid.getText(), this.pwd.getText(), this.cbStatus.getText())){										
					this.app._mainForm.login(undefined, false);											
					this.login();					
					//tab Customer / Sales
				}else systemAPI.alert("User Id atau Password anda salah");
			}else{ //logout
				this.logout();	
				this.app._mainForm.logout(false);											
				this.data = undefined;				
			}			
			this.doItemClick("","","",0);			
		}else if (sender == this.bSearch){
			this.doItemClick(sender,"","",4);
		}		
	},
	doItemTreeClick: function(item){
		var kodeForm = item.getKode().toUpperCase();
		this.doItemClick(this.treev,kodeForm);		
	},
	doItemClick: function(sender, kode, caption, tabPage){
		this.childBlock.show();
		if (sender == this.treev)
		{
			this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,'undefined' as total "+
				"from portal_produk a inner join portal_kategori b on a.kode_kategori=b.kode_kategori "+
				"left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
				"left outer join portal_file d on c.no_file=d.no_file "+
				"where b.kode_kategori='"+kode+"'";
			var sqlcount="select count(*) "+
				"from portal_produk a inner join portal_kategori b on a.kode_kategori=b.kode_kategori "+
				"left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
				"left outer join portal_file d on c.no_file=d.no_file "+
				"where b.kode_kategori='"+kode+"' ";
			this.sql2=this.sql;			
		}else if (sender == this.search)
		{
			this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,'undefined' as total "+
					"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
					"left outer join portal_file d on c.no_file=d.no_file "+
					"where a.nama like '%"+this.search.getText()+"%' and a.kode_kategori like '%"+this.idKategori[this.cbKategori.getText()]+"' ";
			var sqlcount="select count(*) "+
				"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
				"left outer join portal_file d on c.no_file=d.no_file "+
				"where a.nama like '%"+this.search.getText()+"%' and a.kode_kategori like '%"+this.idKategori[this.cbKategori.getText()]+"' ";			
			this.sql3 = this.sql;
		}else {
			switch(tabPage){
				case 0 :
					this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,'undefined' as total "+
							"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
							"left outer join portal_file d on c.no_file=d.no_file "+
							"where a.status_front='1'";
					var sqlcount="select count(*) "+
						"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"left outer join portal_file d on c.no_file=d.no_file "+
						"where a.status_front='1' ";
					this.sql2=this.sql;				
					break;
				case 1 :
					this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,count(b.kode_produk) as total "+
							"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
							"left outer join portal_file d on c.no_file=d.no_file "+
							"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
							"group by a.kode_produk having count(b.kode_produk)<>0 order by total desc";
					var sqlcount="select count(distinct b.kode_produk) "+
						"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"left outer join portal_file d on c.no_file=d.no_file "+
						"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
						"having count(b.kode_produk)<>0 ";
					break;
				case 2 :
					this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,count(b.kode_produk) as total "+
							"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
							"left outer join portal_file d on c.no_file=d.no_file "+
							"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
							"where a.kode_kategori='"+kode+"' "+
							"group by a.kode_produk having count(b.kode_produk)<>0 order by total desc";
					var sqlcount="select count(distinct b.kode_produk) "+
						"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"left outer join portal_file d on c.no_file=d.no_file "+
						"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
						"where a.kode_kategori='"+kode+"' "+
						"having count(b.kode_produk)<>0 ";
					break;
				case 3 :
					this.sql = "select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,count(b.kode_produk) as total "+
							"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
							"left outer join portal_file d on c.no_file=d.no_file "+
							"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
							"where a.kode_kategori='"+kode+"' "+
							"group by a.kode_produk having count(b.kode_produk)<>0 order by total desc";
					var sqlcount="select count(distinct b.kode_produk) "+
						"from portal_produk a left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"left outer join portal_file d on c.no_file=d.no_file "+
						"left outer join portal_order_d b on a.kode_produk=b.kode_produk "+
						"where a.kode_kategori='"+kode+"' "+
						"having count(b.kode_produk)<>0 ";
					break;
			}		
		}			
		var temp = this.dbLib.getDataProvider(this.sql+" limit 0,10 ");		
		if (tabPage == 0)
			this.pgr0.setTotalPage(this.dbLib.getRowCount(sqlcount,10));
		if (tabPage == 1)
			this.pgr.setTotalPage(this.dbLib.getRowCount(sqlcount,10));
		if (tabPage == 4)
			this.pgr2.setTotalPage(this.dbLib.getRowCount(sqlcount,10));
		this.showProduk(temp,tabPage, caption);
		this.childBlock.hide();
	},
	doPager : function(sender, page){	
		if (sender == this.pgr0)
		{
			this.childBlock.show();
			var temp = this.dbLib.getDataProvider(this.sql2+" limit "+((page-1)*10)+",10");
			this.showProduk(temp,0);
			this.childBlock.hide();
		}
		if (sender == this.pgr)
		{
			this.childBlock.show();
			var temp = this.dbLib.getDataProvider(this.sql+" limit "+((page-1)*10)+",10");
			this.showProduk(temp,1);
			this.childBlock.hide();
		}				
	},
	showProduk: function(dataProvider, tabPage, caption){
		if (tabPage > this.tabCenter.childPage.length-1){
			this.tabCenter.addTab(caption);
		}
		this.tabCenter.childPage[tabPage].clearChild();		
		eval("var temp = " + dataProvider);	
		if (temp != undefined)
		{			
			temp = temp.rs.rows;	
			var top = 5;
			for (var j in temp)
			{
				var data=temp[j];
				var p_brg = new portalui_panel(this.tabCenter.childPage[tabPage]);
				p_brg.setBound(5,top,this.tabCenter.width - 10,60);				
				p_brg.setBorder(1);
				if (j%2 == 1)
					p_brg.setColor("#ecf3f7");
				else p_brg.setColor("#e1ebf2");
				p_brg.setTag(data.kode_produk);
				top += 60;
				var gb = new portalui_image(p_brg);
				gb.setBound(5,5,50,50);				
				gb.setImage("server/"+data.folder+"/"+data.nmfile);
				gb.setViewLup(true);
				gb.onClick.set(this,"doImgClick");
				var nmbrg = new portalui_label(p_brg);
				nmbrg.setBound(60,0,300,20);				
				if (data.total == "undefined")
					nmbrg.setCaption(data.kode_produk+" "+data.nmbrg+" ");
				else nmbrg.setCaption(data.kode_produk+" "+data.nmbrg+" ("+data.total+") ");
				nmbrg.setColor("#0066CC");
				nmbrg.setTag(data.kode_produk);
				nmbrg.setLineText();
				nmbrg.getCanvas().style.cursor="pointer";
				nmbrg.onClick.set(this,"doClickBrg");
				var desk = new portalui_label(p_brg);
				desk.setBound(60,20,400,20);				
				desk.setCaption(data.desk_pendek+" ");
				desk.setColor("#000000");
				desk.setTag(data.kode_produk);
				if (this.app.ceklogin)
				{
					if (this.app.userlog != "")
					{
						var hrg = new portalui_label(p_brg);
						hrg.setBound(60,38,200,20);						
						hrg.setCaption("Rp. "+floatToNilai(parseFloat(data.harga))+",- ");
						hrg.setColor("#000000");					
						var buy = new portalui_button(p_brg);
						buy.setBound(p_brg.width - 110,20,80,20);
						buy.setCaption("Pilih");
						buy.setIcon("url(icon/"+system.getThemes()+"/keranjang.png)");
						buy.onClick.set(this,"doBuy");
						buy.setTag(data.harga);
					}
				}
			}			
		}else systemAPI.alert("showProduk:"+temp);
	},
	doSlideClick : function(sender, kode){
		this.doClickBrg(sender, kode);
	},
	doClickBrg: function(sender, kode){
		if (kode == undefined) kode = sender.getTag();
		var temp = this.dbLib.getDataProvider("select d.folder,d.nama as nmfile,a.nama,a.model,b.nama as nmmerk, "+
					"a.warna,a.spesifikasi,a.harga,a.desk_panjang,a.no_dok_file, "+
					"a.angsuran,a.fitur,a.part_number "+
					"from portal_produk a left outer join portal_merk b on a.kode_merk=b.kode_merk "+
					"left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
					"left outer join portal_file d on c.no_file=d.no_file "+
					"where a.kode_produk='"+kode+"' ");
		eval("temp = "+temp+";");
		this.kode_produk = kode;
		if (temp.rs.rows[0] != undefined){
				if (this.app.info != undefined && this.app.info.free) this.app.info.free();
				var data = temp.rs.rows[0];
				this.app.info = new portalui_panel(this.getForm());
				this.app.info.setBound(300,50,500,430);
				this.app.info.setBorder(3);
				this.app.info.getCanvas().style.background="url(image/themes/dynpro/background2.gif) top left no-repeat";				
				var gbr = new portalui_image(this.app.info);
				gbr.setBound(355,48,95,95);
				gbr.setViewLup(true);
				gbr.setImage("server/"+data.folder+"/"+data.nmfile);
				gbr.onClick.set(this,"doImgClick");
				var prd = new portalui_label(this.app.info);
				prd.setBound(48,61,284,50);
				prd.setCaption(kode+" "+data.nama+" ");
				prd.fnt.setSize(13);
				prd.setColor("#0066CC");
				this.price=data.harga;
				var tbdetail = new portalui_FEtabPanel(this.app.info);
				tbdetail.setBound(25,146,447,230);				
				tbdetail.setBgColor("");	
				tbdetail.addPage(["Deskripsi","Spesifikasi","Fitur","Angsuran"]);				
				tbdetail.childPage[0].getCanvas().style.background="";
				tbdetail.childPage[1].getCanvas().style.background="";
				tbdetail.childPage[2].getCanvas().style.background="";
				tbdetail.childPage[3].getCanvas().style.background="";				
				var dat = new portalui_control(tbdetail.childPage[0]);
				dat.setBound(2,2,443,227);
				var canvas = dat.getCanvas();
				canvas.style.overflow="auto";				
				var html="<table border='0' cellpadding='0' cellspacing='0'>"+
					  "<tr style='font-size:12px;color:#000000;'>"+
					    "<td width='80'>Merk</td>"+
					    "<td width='10' align='center'>:</td>"+
					    "<td width='450'>"+data.nmmerk+"</td>"+
					  "</tr>"+
					  "<tr style='font-size:12px;color:#000000;'>"+
					    "<td>Warna</td>"+
					    "<td align='center'>:</td>"+
					    "<td>"+data.warna+"</td>"+
					  "</tr>";
					html+="<tr style='font-size:12px;color:#000000;'>"+
					    "<td>Harga</td>"+
					    "<td align='center'>:</td>"+
					    "<td>Rp. "+floatToNilai(parseFloat(data.harga))+",-</td>"+
					  "</tr>";
					html+="<tr style='font-size:12px;color:#000000;'>"+
					    "<td valign='top'>Deskripsi</td>"+
					    "<td valign='top' align='center'>:</td>"+
					    "<td>"+data.desk_panjang+"</td>"+
					  "</tr>"+
					"</table>";
				canvas.innerHTML=html;
				
				var dat2 = new portalui_control(tbdetail.childPage[1]);
				dat2.setBound(2,2,443,227);
				var canvas2 = dat2.getCanvas();
				canvas2.style.overflow="auto";
				var html2=data.spesifikasi;
				canvas2.innerHTML=html2;
				
				var dat3 = new portalui_control(tbdetail.childPage[2]);
				dat3.setBound(2,2,443,227);
				var canvas3 = dat3.getCanvas();
				canvas3.style.overflow="auto";
				var html3=data.fitur;
				canvas3.innerHTML=html3;
				
				var dat4 = new portalui_control(tbdetail.childPage[3]);
				dat4.setBound(2,2,443,227);
				var canvas4 = dat4.getCanvas();
				canvas4.style.overflow="auto";
				var html4=data.angsuran;
				canvas4.innerHTML=html4;
				
				if (this.app.ceklogin)
				{
					var beli = new portalui_button(this.app.info);
					beli.setBound(330,407,80,20);
					beli.setCaption("Pilih");
					beli.setIcon("url(icon/"+system.getThemes()+"/keranjang.png)");
					beli.onClick.set(this,"doBeli");
				}
				var exit = new portalui_button(this.app.info);
				exit.setBound(415,407,80,20);
				exit.setCaption("Tutup");
				exit.setIcon("url(icon/"+system.getThemes()+"/close.png)");
				exit.onClick.set(this,"doExit");
		}
	},
	doBuy: function(sender){
		try{
			this.cekload=false;		
			this.getForm().nourut++;
			if (sender == ""){
				var kode = this.kode_produk;
				var harga = this.price;
				this.getForm().tothrg += parseFloat(harga);
			}else{
				var kode = sender.owner.getTag();
				var harga = sender.getTag();
				this.getForm().tothrg += parseFloat(harga);
			}						
			var sql = "insert into portal_belanja (kode_produk,kode_cust,jumlah,harga,no_urut,tanggal,status, session) values  "+
					"('"+kode+"','"+this.app.userlog+"','"+this.getForm().jumlah+"',"+harga+","+this.getForm().nourut+
					",'"+(new Date).getDateStr()+"','0','"+this.getForm().session+"') ";
			this.execcek=false;
			this.dbLib.execQuery(sql);
			var temp = this.dbLib.getDataProvider("select d.folder,d.nama as nmfile,a.nama,a.model,b.nama as nmmerk, "+
						"a.warna,a.berat,a.harga,a.desk_pendek,a.no_dok_file "+
						"from portal_produk a inner join portal_merk b on a.kode_merk=b.kode_merk "+
						"inner join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"inner join portal_file d on c.no_file=d.no_file "+
						"where a.kode_produk='"+kode+"' ");			
			eval("temp = "+temp+";");
			if (temp.rs.rows[0]!=undefined)
			{
				this.getForm().tab.block();
				var data=temp.rs.rows[0];
				this.app.info = new portalui_panel(this.getForm());
				this.app.info.setBound(system.screenWidth / 2 - 250,system.screenHeight / 2 - 215,500,430);				
				this.app.info.setBorder(3);
				this.app.info.getCanvas().style.background="url(image/themes/dynpro/background.gif) top left no-repeat";				
				var gbr = new portalui_image(this.app.info);
				gbr.setBound(355,48,95,95);
				gbr.setViewLup(true);
				gbr.setImage("server/"+data.folder+"/"+data.nmfile);
				gbr.onClick.set(this,"doImgClick");
				var prd = new portalui_label(this.app.info);
				prd.setBound(48,61,200,50);
				prd.setCaption(data.nama+" ");
				prd.fnt.setSize(14);
				prd.setColor("#0066CC");
				var dat = new portalui_control(this.app.info);
				dat.setBound(81,152,295,95);
				var canvas = dat.getCanvas();
				canvas.style.overflow="auto";
				canvas.innerHTML="<div style='font-size:12px;color:#0066CC'>- Merk : "+data.nmmerk+"<br>"+
				"- Warna : "+data.warna+"<br>- Model : "+data.model+"<br>- Berat : "+data.berat+
				"<br>- Harga : Rp. "+floatToNilai(parseFloat(data.harga))+",-<br>"+
				"- Deskripsi Singkat : "+data.desk_pendek+"</div>";				
				var total = new portalui_label(this.app.info);
				total.setBound(20,280,240,20);
				total.setCaption("TOTAL NILAI BELANJA ANDA ["+this.getForm().nourut+" items]");
				total.fnt.setSize(10);
				total.setColor("#990000");
				var total2 = new portalui_label(this.app.info);
				total2.setBound(255,280,150,20);
				total2.setCaption("Rp. "+floatToNilai(this.getForm().tothrg)+",-");
				total2.fnt.setSize(10);
				total2.setColor("#009933");
				var klik = new portalui_label(this.app.info);
				klik.setBound(20,330,400,20);
				klik.setCaption("Tekan tombol \"Tutup\" di bawah ini untuk belanja barang lain");
				klik.fnt.setSize(10);
				klik.setColor("#000000");
				var prd2 = new portalui_label(this.app.info);
				prd2.setBound(20,407,200,20);
				prd2.setCaption("Beli "+data.nama+" ");
				prd2.fnt.setSize(10);
				prd2.setColor("#000000");
				var cekout = new portalui_button(this.app.info);
				cekout.setBound(405,280,80,20);
				cekout.setCaption("Order");
				cekout.setIcon("url(icon/"+system.getThemes()+"/cekout.png)");
				cekout.onClick.set(this,"doCheckOut");
				var exit = new portalui_button(this.app.info);
				exit.setBound(415,407,80,20);
				exit.setCaption("Tutup");
				exit.setIcon("url(icon/"+system.getThemes()+"/close.png)");
				exit.onClick.set(this,"doExit");				
			}
		}catch(e){
			systemAPI.alert("doBuy : "+e);
		}
	},
	doBeli : function(){
		this.app.info.free();
		this.doBuy("");	
	},
	doExit : function(){
		this.getForm().tab.unblock();
		this.app.info.hide();
		this.app.info.free();
		//this.app.info = undefined;
	},
	doCheckOut : function(sender){
		try{
			if (this.cekload){
				systemAPI.alert("Anda belum melakukan transaksi sama sekali!");
			}else
			{
				if (this.app.info !== undefined && this.app.info.free) this.app.info.free();
				var temp = this.dbLib.getDataProvider("select c.nama as nmcust,a.kode_produk,b.nama as nmbrg,a.jumlah,a.harga,date_format(a.tanggal,'%d-%m-%Y') as tgl,(a.jumlah*a.harga) as subtot, c.alamat,c.email,c.no_telp,b.satuan "+
							"from portal_belanja a inner join portal_produk b on a.kode_produk=b.kode_produk "+
							"inner join portal_cust c on a.kode_cust=c.kode_cust "+
							"where a.kode_cust='"+this.app.userlog+"' and a.session='"+this.getForm().session+"' and a.status='0' "+
							"order by a.no_urut ");							
				eval("temp = "+temp+";");				
				if (temp.rs.rows != undefined)
				{
					var tmp = temp.rs.rows;
					var list = temp.rs.rows;
					if (tmp[0]!=undefined)
					{
						this.getForm().tab.block();
						var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.getForm().getPeriodeNow()+"/","0000");
						this.noOrder=id;
						var data=tmp[0];
						this.app.info = new portalui_panel(this.getForm());
						this.app.info.setBound(system.screenWidth / 2 - 325,system.screenHeight / 2 - 230,650,465);
						this.app.info.setBorder(3);
						this.app.info.getCanvas().style.background="url(image/themes/dynpro/bgcekout.gif) top left no-repeat";
						var dat = new portalui_control(this.app.info);
						dat.setBound(55,30,530,240);
						var canvas = dat.getCanvas();
						canvas.style.overflow="auto";						
						canvas.innerHTML="<table border='0' cellpadding='2' cellspacing='2'>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td width='100'>No. Order</td>"+
							    "<td width='30' align='center'>:</td>"+
							    "<td width='330'>"+id+"</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td>Customer</td>"+
							    "<td align='center'>:</td>"+
							    "<td>"+data.nmcust+"</td>"+
							  "</tr>"+
							  "<tr style='font-size:12px;color:#000000;'>"+
							    "<td>Tanggal Belanja</td>"+
							    "<td align='center'>:</td>"+
							    "<td>"+data.tgl+"</td>"+
							  "</tr>"+
							"</table>";
						var nama = new portalui_saiLabelEdit(this.app.info);
						nama.setBound(60,98,500,20);
						nama.setCaption("Nama");
						nama.setText(data.nmcust);
						nama.setReadOnly(true);
						nama.setLength(100);
						this.name=nama;
						var almt = new portalui_saiLabelEdit(this.app.info);
						almt.setBound(60,121,500,20);
						almt.setCaption("Alamat");
						almt.setText(data.alamat);
						almt.setReadOnly(true);
						almt.setLength(100);
						this.alamat=almt;
						var imel = new portalui_saiLabelEdit(this.app.info);
						imel.setBound(60,144,500,20);
						imel.setCaption("Email");
						imel.setText(data.email);
						imel.setReadOnly(true);
						imel.setLength(100);
						var telp = new portalui_saiLabelEdit(this.app.info);
						telp.setBound(60,167,500,20);
						telp.setCaption("No. Telepon");
						telp.setText(data.no_telp);
						telp.setReadOnly(true);
						telp.setLength(100);
						var p1 = new portalui_panel(this.app.info);
					    p1.setBound(20,208,610,220);
					    p1.setName('p1');
					    p1.setCaption('Daftar Belanja');
						p1.setBorder(3);						
						uses("portalui_saiGrid");
						var sg1 = new portalui_saiGrid(p1);						
						sg1.setBound(1,20,606,175);															
						sg1.setColCount(7);						
						sg1.setTag("9");
						sg1.setReadOnly(false);
						sg1.setColTitle(["Kode Barang","Nama Barang","Satuan","Harga","Jumlah","Sub Total","Konfirmasi"]);
						sg1.columns.get(0).setReadOnly(true);
						sg1.columns.get(1).setReadOnly(true);
						sg1.columns.get(2).setReadOnly(true);
						sg1.columns.get(3).setReadOnly(true);
						sg1.columns.get(5).setReadOnly(true);
						sg1.columns.get(6).setReadOnly(true);
						sg1.columns.get(3).setColumnFormat(cfNilai);
						sg1.columns.get(4).setColumnFormat(cfNilai);
						sg1.columns.get(5).setColumnFormat(cfNilai);
						sg1.columns.get(6).setButtonStyle(bsAuto);
						sg1.columns.get(6).pickList.set(0,"BELI");
						sg1.columns.get(6).pickList.set(1,"BATAL");						
						sg1.setColWidth([6,5,4,3,2,1,0],[70,95,60,95,50,120,90]);
						sg1.onChange.set(this,"sg1onChange");												
						var dt = [];
						for (var j in list)
					    {											
							dt[0]=list[j].kode_produk;
							dt[1]=list[j].nmbrg;
							dt[2]=list[j].satuan;
							dt[3]=floatToNilai(parseFloat(list[j].harga));
							dt[4]=list[j].jumlah;
							dt[5]=list[j].subtot;
							dt[6]="BELI";							
							sg1.appendData(dt);
						}
						this.sg=sg1;
						var total = new portalui_saiLabelEdit(p1);
						total.setBound(408,197,200,20);
						total.setReadOnly(true);
						total.setTipeText(ttNilai);
						total.setAlignment(alRight);
						total.setCaption("Total");
						total.setText("");
						total.setLength(100);
						this.tot=total;
						var order = new portalui_button(this.app.info);
						order.setBound(480,441,80,20);
						order.setCaption("Beli");
						order.setIcon("url(icon/"+system.getThemes()+"/order.png)");
						order.onClick.set(this,"doOrder");
						var exit = new portalui_button(this.app.info);
						exit.setBound(565,441,80,20);
						exit.setCaption("Tutup");
						exit.setIcon("url(icon/"+system.getThemes()+"/close.png)");
						exit.onClick.set(this,"doExit");
						var tot=0;
						for (var k=0; k < sg1.rows.getLength(); k++)
						{
							tot+=parseFloat(strToFloat(sg1.getCell(4,k)));
						}
						total.setText(floatToNilai(tot));
						nama.setText(data.nmcust);
						almt.setText(data.alamat);
						imel.setText(data.email);
						telp.setText(data.no_telp);
						this.custNama=data.nmcust;
						this.custAlmt=data.alamat;
						this.tglOrder=data.tgl;
						this.custEmail=data.email;
						this.custTlpn=data.no_telp;
					}
				}
			}
		}catch(e){
			systemAPI.alert("app_kopeg_transaksi_fTabToko::doCheckOut "+e);
		}
	},
	doRequestReady : function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "getDataProvider" :					
					eval("result = " + result);				
					switch(this.status){
						case 0 : 
							this.loadMenu(result);
							this.status = 1;
							this.dbLib.getDataProviderA("select d.folder,c.nama as nmfile,a.nama as nmbrg,a.harga,a.desk_pendek,a.kode_produk,'undefined' "+
										"from portal_produk a inner join portal_kategori b on a.kode_kategori=b.kode_kategori "+
										"left outer join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
										"left outer join portal_file d on c.no_file=d.no_file ");
							break;
						case 1 :
							var img = [];
							var nama = [];
							var kode = [];
							for (var i in result.rs.rows){								
								img.push("server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].nmfile);
								kode.push(result.rs.rows[i].kode_produk);
								nama.push(result.rs.rows[i].nmbrg);
							}							
							this.menu.addItem(img, nama, kode );
							break;
					}
					break;
			}
		}
	},
	loadMenu : function(result){
		try{						
			var menu = result;
			var rowNo = 0;		
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();
			
			var kode = undefined;
			var nama = undefined;
			var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;					
			this.cbKategori.addItem("","All");				
			for (var r in menu.rs.rows)
			{
				itemValues = menu.rs.rows[r];					
				kode = itemValues.kode_kategori;				
				if (kode != "")
				{				
					nama = itemValues.nama;				
					level = itemValues.level_spasi;				
					level++;
					if (node == undefined)
						node = new portalui_treeNode(this.treev);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() == level - 1))
						node = new portalui_treeNode(node);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() == level))
						node = new portalui_treeNode(node.owner);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() > level)){	
						if (!(node.owner instanceof portalui_treeView)){
							node = node.owner;
							while (node.getLevel() > level)
								if (node.owner instanceof portalui_treeNode)
									node = node.owner;							
						}
						node = new portalui_treeNode(node.owner);				
					}		
					node.setKodeForm("");
					node.setKode(kode);
					node.setCaption(nama);
					node.setShowKode(false);
					node.data = itemValues;
				}	
				this.cbKategori.addItem(kode,nama);				
			}
		}catch(e){
			alert(e);
		}
	},
	login : function(){
		this.uid.setText(this.app.username);
		this.uid.setReadOnly(true);
		this.uid.setCaption("Nama");
		this.pwd.hide();
		this.cbStatus.hide();
		this.bLogin.setTop(53);
		this.pLogin.setHeight(80);
		this.bLogin.setCaption("Logout");
		this.pLogin.setCaption("Logout");							
		this.bmyCart.show();
		this.bmyCart.setBound(this.width - 115,this.pLogin.top + this.pLogin.height + 5,80,20);
	},
	logout : function(){
		this.uid.setReadOnly(false);
		this.uid.setText(this.app.userlog);
		this.uid.setCaption("User Id");
		this.pwd.show();
		this.cbStatus.show();
		this.bLogin.setTop(99);
		this.pLogin.setHeight(130);
		this.bLogin.setCaption("Login");
		this.pLogin.setCaption("Login");
		this.bmyCart.hide();
	},
	doImgClick: function (sender) {	
		sender.showActualSize();
	}
});