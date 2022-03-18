//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fMain = function(owner){
	try
	{
		if (owner)
		{
			window.portalapp_fMain.prototype.parent.constructor.call(this, owner);
			this.className = "portalapp_fMain";
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.maximize();
			this.tabToko = undefined;
			this.app._kodeLokasi="31";
			this.app._lokasi="31";
			this.initComponent();
			this.frame = new portalui_arrayMap();
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fMain]::contruct:"+e,"");
	}
};
window.portalapp_fMain.extend(window.portalui_commonForm);
window.portalapp_fMain.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();   
		canvas.style.background = "#4d7795";
		canvas.style.overflow = "auto";
	    var html =  "<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +                    									
	                    "<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' ></div>" +                    
	                "</div>"+
					"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>"+
					"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; zindex:1000000;display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
		this.setInnerHTML(html, canvas);
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");
	},
	initComponent:function(){
	    try{
			uses("portalui_FEtabPanel;portalui_FEdataContent;portalui_image;portalui_FEslider");
			uses("portalui_FEnews;util_dbLib;portalui_childForm;portalui_imageButton");
			uses("portalui_saiLabelEdit;portalui_button;portalui_saiCB;portalui_label");			
			uses("portalui_timer");
			this.formWidth = 900;
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.timer = new portalui_timer(this);
			this.timer.setInterval(2000);
			this.timer.setEnabled(false);
			this.timer.onTimer.set(this,"doTimer");
			
			this.tab = new portalui_FEtabPanel(this);
			this.tab.setBound(this.width / 2 - this.formWidth / 2,0,this.formWidth, system.screenHeight-52);
			this.tab.addPage(["Home","Profil","Toko","Member","Unit Usaha","Pinjaman","UPKP","Wisma Asri","Karir","Forum","Download"]);
			this.tab.childPage[1].frameClass = "portalapp_fProfil";	
			this.tab.childPage[2].frameClass = "portalapp_fToko";						
			this.tab.childPage[4].frameClass = "portalapp_fUsaha";			
			this.tab.childPage[5].frameClass = "portalapp_fPinjaman";			
			this.tab.childPage[6].frameClass = "portalapp_fUpkp";			
			this.tab.childPage[7].frameClass = "portalapp_fWisma";			
			this.tab.childPage[8].frameClass = "portalapp_fKarir";			
			this.tab.childPage[9].frameClass = "portalapp_fForum";										
			this.tab.childPage[10].frameClass = "portalapp_fDownload";					
			this.tab.onTabChange.set(this, "doTabChange");			
			this.tab.setBgColor("#ffffff");
			this.createBlock();			
			this.co = new portalui_control(this);
			this.co.setBound(this.width / 2 - this.formWidth /2,this.tab.height,this.formWidth,50);
			var cnv = this.co.getCanvas();
			cnv.style.borderLeft = "1px solid #4d7795";
			cnv.style.borderRight = "1px solid #4d7795";
			cnv.style.borderBottom = "1px solid #4d7795";
			cnv.style.background = "#7faac8";
			cnv.align = "center";
			cnv.innerHTML = "<br>Copyright &copy; 2009 KOPEGTEL PUSAT. All rights reserved."+
				"<br>Develop with jambooAPI (PT Samudra Aplikasi Indonesia)";							
							
			this.previewer = new portalui_FEdataContent(this.tab.childPage[0]);
			this.previewer.setBound(0,0,this.tab.width-2, this.tab.height-25);			
			this.previewer.hide();
			
			this.img = new portalui_image(this.tab.childPage[0]);
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			this.img.setBound(0,0,document.all ? this.tab.width - 2 : this.tab.width, 100);			
						
			this.slider = new portalui_FEslider(this.tab.childPage[0]);
			this.slider.setBound(10,this.img.height + 10, 300,380);
			this.slider.onItemsClick.set(this,"doItemsClick");
			
			this.pLogin = new portalui_panel(this.tab.childPage[0]);
			this.pLogin.setBound(this.formWidth - 210,this.img.height + 10,200,130);
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
				
			this.tabCenter = new portalui_FEtabPanel(this.tab.childPage[0]);	
			this.tabCenter.setBound(320,this.img.height + 10,this.tab.width - 540, 380);
			this.tabCenter.addPage(["News","Event","Product Promotion"]);
			this.tabCenter.onChildItemsClick.set(this, "doItemsClick");			
			for (var i in this.tabCenter.childPage) this.tabCenter.childPage[i].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";
			
			this.news = new portalui_FEnews(this.tabCenter.childPage[2]);
			this.news.setBound(0,0,this.tabCenter.width-(document.all ? 2:0),this.tabCenter.height - (document.all ? 22: 20));
			this.news.setBgColor("");			
			this.news.onItemsClick.set(this,"doItemsClick");
			this.status = 0;
			this.dbLib.getDataProviderA("select c.folder,a.gambar,a.judul,a.keterangan,a.no_file_dok "+
					"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
					"inner join portal_file c on b.no_file=c.no_file "+
					"where a.status_aktif='1' and a.kode_klp='K12' and a.kode_lokasi='"+this.app._kodeLokasi+"' order by a.tgl_input desc ");
			this.app.ceklogin = false;
			this.app.idsales = "";
			this.app.userforum = "";
			this.app.username = "";	
			this.app.userlog = "";			
			this.app.statuslog = "";
			
			uses("portalui_rssReader",true);
			//this.rss1 = new portalui_rssReader(this.tab.childPage[0]);
			//this.rss1.setBound(10,this.slider.top + this.slider.height + 10,this.slider.width, this.tab.height - (this.slider.top + this.slider.height + 50));
			//this.rss1.setSite(unescape("http://www.kompas.com/getrss/bisniskeuangan"),5,"Kompas Bisnis");
			//this.rss11 = new portalui_rssReader(this.tab.childPage[0]);
			//this.rss11.setBound(this.rss1.left + this.rss1.width + 10,this.slider.top + this.slider.height + 10,this.slider.width, this.tab.height - (this.slider.top + this.slider.height + 50));
			//this.rss11.setSite(unescape("http://www.kompas.com/getrss/olahraga"),5,"Kompas Olah Raga");
			this.rss2 = new portalui_rssReader(this.tab.childPage[0]);
			this.rss2.setBound(this.pLogin.left,this.pLogin.top + this.pLogin.height + 10,this.pLogin.width, this.tabCenter.height - (this.pLogin.height + 10));
			this.rss2.setSite(unescape("http://www.kompas.com/getrss/all"),5,"Kompas");
		}catch(e){
			systemAPI.alert(e,"");
		}		
	},
	doAfterResize:function(width, height){				
		this.setWidth(width);
		this.setHeight(height);
		if (this.tab !== undefined){
			this.tab.setHeight(system.screenHeight - 52);
			this.tab.setLeft(this.width / 2 - this.formWidth / 2);
			this.co.setLeft(this.width / 2 - this.formWidth / 2);
			this.co.setTop(this.tab.height);
			//this.rss1.setHeight(this.tab.height - (this.slider.top + this.slider.height + 50));
			//this.rss11.setHeight(this.tab.height - (this.slider.top + this.slider.height + 50));
		}
	},
	doItemsClick : function(sender, kode, caption){			
		try{
			if (sender instanceof portalui_FEslider){
				var temp = this.dbLib.getDataProvider("select c.folder,a.gambar,a.judul,b.keterangan,a.no_file_dok, a.deskripsi,d.nama,date_format(a.tgl_input,'%d-%m-%Y')as tgl "+
												"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
												"inner join portal_file c on b.no_file=c.no_file "+
												"inner join karyawan d on a.nik_buat=d.nik "+
												"where a.no_file_dok='"+kode+"' and a.kode_lokasi='"+this.app._kodeLokasi+"' ");							
			}else if (sender instanceof portalui_FEnews)
				var temp = this.dbLib.getDataProvider("select d.folder,d.nama as nmfile,b.nama as nmbrg,a.keterangan,date_format(a.tanggal,'%d-%m-%Y') as tgl, "+
						"date_format(a.tgl_mulai,'%d-%m-%Y') as tglawl,date_format(a.tgl_akhir,'%d-%m-%Y') as tglakhr,a.diskon, "+
						"b.model,m.nama as nmmerk,b.warna,b.berat,b.harga,b.desk_panjang "+
						"from portal_promosi a inner join portal_produk b on a.kode_produk=b.kode_produk "+
						"inner join portal_dokumen c on a.no_dok_file=c.no_dok_file "+
						"inner join portal_file d on c.no_file=d.no_file "+
						"inner join portal_merk m on b.kode_merk=m.kode_merk "+
						"where a.kode_promosi='"+kode+"' and a.kode_lokasi='"+this.app._kodeLokasi+"' ");
			else{
				
				var temp = this.dbLib.getDataProvider("select c.folder,a.gambar,a.judul,b.keterangan,a.no_file_dok, a.deskripsi,d.nama,date_format(a.tgl_input,'%d-%m-%Y')as tgl "+
											"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
											"inner join portal_file c on b.no_file=c.no_file "+
											"inner join karyawan d on a.nik_buat=d.nik "+
											"where a.kode_konten='"+kode+"' and a.kode_lokasi='"+this.app._kodeLokasi+"' ");
										
			}			
			eval("temp="+temp);		
			var data = temp.rs.rows[0];
			if (data != undefined){
				var img = "<img width='298' height='225' src='server/"+data.folder+"/"+data.gambar+"'/>";	
				this.previewData(data.judul,"<p>"+data.nama+"<br><br>"+data.deskripsi+"</p>",img,data.keterangan,data.tgl);		
			}else systemAPI.alert("link ini tidak tersedia");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	userLogin : function(user, pwd, status){
		try{
			this.app.statuslog =  status;
			this.app.userlog = user;
			var pwd = pwd;		
			if (this.app.statuslog == "Anggota" || this.app.statuslog == "Customer"){			
				var data = this.dbLib.getDataProvider("select kode_cust,nama,paswd from portal_cust where kode_cust ='"+this.app.userlog+"' and paswd='"+pwd+"'");
				this.sqlUpdt = "update portal_cust set status_ol='1' "+
											"where kode_cust='"+this.app.userlog+"' ";
			}else if (this.app.statuslog == "Sales" || this.app.statuslog == "Admin"){
				var data = this.dbLib.getDataProvider("select kode_sales,nama,paswd from portal_sales where kode_sales ='"+this.app.userlog+"' and paswd='"+pwd+"'");
				this.sqlUpdt = "update portal_sales set status_ol='1' "+
											"where kode_sales='"+this.app.userlog+"' ";				
			}				
			eval("data = "+data+";");
			this.data = data;
			return (data.rs.rows[0] != undefined);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick: function(sender){				
		try{
			if (sender.caption == "Login"){								
				if (this.userLogin(this.uid.getText(), this.pwd.getText(), this.cbStatus.getText())){					
					this.uid.setCaption("Nama");					
					this.uid.setReadOnly(true);							
					this.pLogin.setCaption("Logout");
					this.bLogin.setCaption("Logout");
					this.pwd.hide();
					this.cbStatus.hide();		
					this.bLogin.setTop(53);
					this.pLogin.setHeight(80);					
					this.login(this.data, true);
					this.uid.setText(this.app.username);	
					//tab Customer / Sales
				}else systemAPI.alert("User Id atau Password anda salah");
			}else{ //logout
				this.logout(true);	
				this.data = undefined;		
				this.bLogin.setTop(99);		
				this.pLogin.setHeight(130);
				this.uid.setReadOnly(false);
				this.uid.setText(this.app.userlog);
				this.uid.setCaption("User Id");
				this.pwd.show();
				this.cbStatus.show();		
				this.bLogin.setCaption("Login");
				this.pLogin.setCaption("Login");						
			}
			if (this.tabToko !== undefined){
				this.tabToko.doItemClick("","","",0);
			}
		}catch(e){
			systemAPI.alert(e,data);
		}
	},	
	findClick: function(sender){		
		this.standar.showListData(this, "test ListData",sender, undefined, 
			"select nik, nama, no_telp, alamat from karyawan","select count(*)as tot from karyawan",
			["nik","nama","no_telp","alamat"],"where",["NIK","Nama","No Telepon","Alamat"]);
	},
	createListData: function(){
		try{		
			uses("portalapp_fListData");
			this.listDataForm = new portalapp_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTimer : function(sender){
		this.t.setVisible(!this.t.visible);
	}, 
	createBlock : function(){
		uses("portalui_panel;portalui_image");
		this.childBlock = new portalui_panel(this);
		this.childBlock.setBound(11,21,this.tab.getWidth()-2,this.tab.getHeight()-20);		
		this.childBlock.setBorder(0);
		this.childBlock.setColor("#FFF");
		this.childBlock.getCanvas().style.zIndex = 999999;
		this.childBlock.hide();			
		this.load = new portalui_image(this.childBlock);
		this.load.setBound(this.childBlock.getWidth() / 2 - 15,this.childBlock.getHeight() / 2 - 30,31,31);
		this.load.setImage("image/gridload.gif");
	},
	previewData:function(header, data, img, imgTitle, tgl){
		try{			
			this.previewer.setData(header, data, img, imgTitle, tgl);
		}catch(e){
			systemAPI.alert(e);
		}
	}, 
	doRequestReady: function(sender, methodName, result){
		try{
			switch(methodName){
				case "getDataProvider" : 										
					eval("result = " + result+";");					
					switch(this.status){
					case 0 :
						for (var i in result.rs.rows){						
							this.slider.addItem("server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].gambar,result.rs.rows[i].judul,result.rs.rows[i].keterangan,result.rs.rows[i].no_file_dok);
						}
						this.dbLib.getDataProviderA("select date_format(tanggal,'%d/%m/%Y') as tgl,judul,kode_konten,keterangan from portal_konten where status_slide='0' and status_aktif='1' and status_front='1' and kode_klp='K01' and kode_lokasi='"+this.app._kodeLokasi+"' order by tgl_input desc ");		
						this.status = 1;
						break;
					case 1 :
						for (var i in result.rs.rows){						
							this.tabCenter.addChildItems(0,"<table width='100%'><tr align='justify'><td width='10%' style='font-size:12px;color:#777777' valign='top'>"+result.rs.rows[i].tgl+"</td><td width='90%' style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,result.rs.rows[i].keterangan);
						}
						this.dbLib.getDataProviderA("select date_format(tanggal,'%d/%m/%y') as tgl,judul,kode_konten,keterangan from portal_konten where status_slide='0' and status_aktif='1' and status_front='1' and kode_klp='K03' and kode_lokasi='"+this.app._kodeLokasi+"' order by tgl_input desc ");
						this.status = 2;
						break;
					case 2 :
						for (var i in result.rs.rows){						
							this.tabCenter.addChildItems(1,"<table width='100%'><tr align='justify'><td width='10%' style='font-size:12px;color:#777777' valign='top'>"+result.rs.rows[i].tgl+"</td><td width='90%' style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,result.rs.rows[i].keterangan);
						}
						this.status = 3;
						this.dbLib.getDataProviderA("select c.folder,a.gambar,a.judul,a.keterangan,a.no_file_dok "+
								"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
								"inner join portal_file c on b.no_file=c.no_file "+
								"where a.status_aktif='1' and a.kode_klp='K08' and a.kode_lokasi='"+this.app._kodeLokasi+"' order by a.tgl_input desc ");
						break;
					case 3:
						for (var i in result.rs.rows){								
							this.news.addNews("server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].gambar,result.rs.rows[i].judul,result.rs.rows[i].keterangan,result.rs.rows[i].kode_konten);
						}
						this.status = 4;
						break;
					case 99 :												
						if (result.rs.rows[0] != undefined && this.app.ceklogin){
							systemAPI.alert("Anda akan di log off...");
							this.bLogin.click();
						}else this.timer.setEnabled(true);
						break;
					};
				break;
			}
		}catch(e){
			systemAPI.alert(e,result);
		}
	},
	doTabChange: function(sender, id){	
		try{
			this.childBlock.show();
			switch(id){
				case 0 : 					
					if (this.app.ceklogin){
						this.uid.setText(this.app.username);
						this.uid.setCaption("Nama");					
						this.uid.setReadOnly(true);							
						this.pLogin.setCaption("Logout");
						this.bLogin.setCaption("Logout");
						this.pwd.hide();
						this.cbStatus.hide();		
						this.bLogin.setTop(53);
						this.pLogin.setHeight(80);											
					}else {						
						this.bLogin.setTop(99);		
						this.pLogin.setHeight(130);
						this.uid.setReadOnly(false);
						this.uid.setText(this.app.userlog);
						this.uid.setCaption("User Id");
						this.pwd.show();
						this.cbStatus.show();		
						this.bLogin.setCaption("Login");
						this.pLogin.setCaption("Login");						
					}
					break;
				case 2 : 
					if (this.tabToko === undefined){						
						uses(sender.childPage[id].frameClass,true);
						eval("this.tabToko = new "+sender.childPage[id].frameClass+"(this.tab.childPage["+id+"]);");						
						this.tabToko.setBound(0,0,this.tab.width - (document.all ? 2 : 0), this.tab.height - (document.all ? 22: 20));						
						if (this.app.ceklogin){	
							this.tabToko.login();							
						}
					}else {
						if (this.app.ceklogin)
							this.tabToko.login();
						else this.tabToko.logout();
					}
					var frame = this.tabToko;
					this.frame.set(sender.childPage[id].frameClass,true);					
					break;
				case 3 :																	
					if (this.frame.get(sender.childPage[id].frameClass) === undefined || !this.app.ceklogin){						
						if (this.app.ceklogin){
							if (this.app.statuslog == "Customer")
								sender.childPage[id].frameClass = "portalapp_fCustMenu";
							else sender.childPage[id].frameClass = "portalapp_fSalesMenu";
							this.frame.set(sender.childPage[id].frameClass,true);			
						}else{
							this.frame.set("portalapp_fCustMenu",undefined);			
							this.frame.set("portalapp_fSalesMenu",undefined);			
							sender.childPage[id].frameClass = "portalapp_fLogin";							
						}							
						if (sender.childPage[id].childs.getLength() > 0) {
							for (var i in sender.childPage[id].childs.objList)
								system.getResource(i).free();
						}
						uses(sender.childPage[id].frameClass);
						var script = "var frame = new "+sender.childPage[id].frameClass+"(sender.childPage["+id+"]);";
						script += "frame.setBound(0,0,this.tab.width - (document.all ? 2 : 0), this.tab.height - (document.all ? 22: 20));";
						eval(script);																		
						sender.childPage[id].frameClass = "portalapp_fCustMenu";												
					}
					break;
				default : 					
					if (this.frame.get(sender.childPage[id].frameClass) === undefined){
						if (sender.childPage[id].frameClass !== undefined){
							uses(sender.childPage[id].frameClass);
							var script = "var frame = new "+sender.childPage[id].frameClass+"(sender.childPage["+id+"]);";
							script += "frame.setBound(0,0,this.tab.width - (document.all ? 2 : 0), this.tab.height - (document.all ? 22: 20));";
							eval(script);
							this.frame.set(sender.childPage[id].frameClass,true);
						}
					}
					break;				
			}
			this.selectedTab = id;			
			this.childBlock.hide();
			this.frameAktif = frame;
		}catch(e){
			this.childBlock.hide();
			systemAPI.alert(e);
		}
	},
	doTimer: function(sender){
		try{
			this.timer.setEnabled(false);
			this.status = 99;
			if (this.app.statuslog == "Customer" || this.app.statuslog == "Anggota")
				var data = this.dbLib.getDataProviderA("select nama from portal_cust where status_ol='0' "+
													"and kode_cust='"+this.app.userlog+"' ");	
			else var data = this.dbLib.getDataProviderA("select nama from portal_sales where status_ol='0' "+
													"and kode_sales='"+this.app.userlog+"' ");	
			//eval("data = "+data+";");			
		}catch(e){
			systemAPI.alert(e,data);
		}
	},
	getPeriodeNow: function(){
		if ((new Date).getBln()<10)
			var bln="0"+(new Date).getBln();
		return ((new Date).getFullYear().toString()+bln);
	},
	login : function(data, childCall){
		if (data == undefined) data = this.data;		
		this.app.ceklogin = true;
		this.dbLib.execQuery(this.sqlUpdt);
		this.app.idsales = this.app.userlog;
		this.app.userforum = this.app.userlog;
		this.app.username = data.rs.rows[0].nama;							
		this.cekload=true;
		this.nourut = 0;
		this.jumlah = 0;
		this.tothrg = 0;
		this.session = (new Date()).valueOf();
		this.timer.setEnabled(true);		
	},
	logout : function(childCall){		
		this.app.ceklogin = false;
		this.app.idsales = "";
		this.app.userforum = "";
		this.app.username = "";			
		this.app.statuslog = "";
		if (this.app.statuslog == "Sales" || this.app.statuslog == "Admin")
			this.dbLib.execQuery("update portal_sales set status_ol='0' where kode_sales='"+this.app.userlog+"' ");
		else this.dbLib.execQuery("update portal_cust set status_ol='0' where kode_cust='"+this.app.userlog+"' ");
		this.cekload=false;
		this.nourut = 0;
		this.jumlah = 0;
		this.tothrg = 0;
		this.timer.setEnabled(false);
	}
});
