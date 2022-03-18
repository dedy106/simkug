//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_sai_fMain = function(owner){
	try
	{
		if (owner)
		{
			window.app_frontend_sai_fMain.prototype.parent.constructor.call(this, owner);
			this.className = "app_frontend_sai_fMain";
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.maximize();
			this.app._kodeLokasi="30";
			this.app._lokasi="30";
			this.app._isLog = false;
			this.initComponent();
			this.frame = new portalui_arrayMap();
			this.dataUser = {id:"",email:"",telp:"",alamat:"",nama:"",status:"",site:"",tgl:""};
		}
	}catch(e)
	{
		systemAPI.alert("Initialization object",e);
	}
};
window.app_frontend_sai_fMain.extend(window.portalui_commonForm);
window.app_frontend_sai_fMain.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();   
		canvas.style.background = "#eff7fb";
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
			uses("portalui_tabPage;portalui_FEtabChild;portalui_flashObj;portalui_button;portalui_timer;portalui_saiLabelEdit;portalui_FEslider;portalui_roundPanel");
			this.formWidth = this.width;
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.timer = new portalui_timer(this);
			this.timer.setInterval(2000);
			this.timer.setEnabled(false);
			this.timer.onTimer.set(this,"doTimer");
			
			this.tab = new portalui_tabPage(this,{bound:[0,30,this.formWidth -5, this.height - 80],borderColor:"#35aedb"});
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Home","Profil","Solusi Bisnis","Kerja Sama","Support"]);
			this.tab.childPage[1].frameClass = "app_frontend_sai_fProfil";
			this.tab.childPage[2].frameClass = "app_frontend_sai_fMember";
			this.tab.childPage[3].frameClass = "app_frontend_sai_fKarir";
			this.tab.childPage[4].frameClass = "app_frontend_sai_fSupport";
			this.tab.onTabChange.set(this, "doTabChange");
			this.tab.setBgColor("#d6e5eb");
			this.tab.roundedHeader(8);
    		this.swf1 = new portalui_flashObj(this.tab.childPage[0],{bound:[0,0,this.tab.width- 5,150],flashId:this.getFullId()+"_swf1",flashFile:"classes/app/frontend/sai/swf/banner.swf"});   					
            this.imgSlide = new portalui_FEslider(this.tab.childPage[0],{bound:[10,150,200,140],background:"image/themes/dynpro/bluegradient.png",color:"#edf5f8",viewType:1});
            this.imgSlide.addStyle("border-left:1px solid #cccccc;border-top:1px solid #cccccc;border-right:1px solid #999999;border-bottom:1px solid #999999;");
            this.imgSlide.makeRound(10, {tl:10,br:10});
            this.ktgr = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,300,200,this.tab.getClientHeight() - 315],background:"image/themes/dynpro/bluegradient.png",caption:"Demo Produk",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",view:0, itemClick:[this,"doItemsClick"]});			            
			this.ktgr.addItems(["","","","",""],["Keuangan","HRMIS","Pajak","Portal Backend","Dashboard"],["","",""],["","",""]);
            
            this.artikelView = new portalui_roundPanel(this.tab.childPage[0],{bound:[220,145,this.formWidth - 400,this.tab.getClientHeight() - 160],background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Berita",visible:false,interval:25,btnCloseVisible:true,close:[this,"doPanelClose"]});
            
            this.tabCenter = new portalui_tabPage(this.tab.childPage[0],{bound:[220,145,this.formWidth - 400,this.tab.getClientHeight() - 160],borderColor:"#35aedb",interval:25});
	        this.tabCenter.actClr = "#299fcb";this.tabCenter.deactClr = "#35aedb";	        
            this.tabCenter.setHeaderHeight(20);	            	
	        this.tabCenter.addPage(["Produk","Presentation","Framework"]);
	        this.tabCenter.setBgColor("#d6e5eb");
			this.tabCenter.roundedHeader(5);                              
			this.tabCenter.onTabChange.set(this, "doTabCenterChange");
            this.viewProduk = new portalui_roundPanel(this.tabCenter.childPage[0],{bound:[5,10,this.tabCenter.width - 20,this.tabCenter.getClientHeight() - 20],background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Kategori Produk",view:1,itemClick:[this,"doItemsClick"]});
            this.viewPresentation = new portalui_roundPanel(this.tabCenter.childPage[1],{bound:[5,10,this.tabCenter.width - 20,this.tabCenter.getClientHeight() - 20],icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Produk Terlaris",view:2,itemClick:[this,"doItemsClick"]});
            this.viewFramework = new portalui_roundPanel(this.tabCenter.childPage[2],{bound:[5,10,this.tabCenter.width - 20,this.tabCenter.getClientHeight() - 20],background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Promosi Produk",view:2,itemClick:[this,"doItemsClick"]});
            this.tabCenter.makeRound(8);         
            
            this.pLogin = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.tab.width - 170,150,150,180],background:"image/themes/dynpro/bluegradient.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Login Form"});
            this.uid = new portalui_saiLabelEdit(this.pLogin,{bound:[10,5,120,40],caption:"User Name",lblPosition:1});
            this.pwd = new portalui_saiLabelEdit(this.pLogin,{bound:[10,50,120,40],caption:"Password",password:true,lblPosition:1,keyDown:[this,"keyDown"]});                        
            this.bLogin = new portalui_button(this.pLogin,{bound:[10,95,80,20],caption:"Login",click:[this,"doClick"]});
            this.pArtikel = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.tab.width - 170,340,150,this.tab.getClientHeight() - 360],background:"image/themes/dynpro/bluegradient.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Berita",view:0,itemClick:[this,"doItemsClick"]});
            
            this.co = new portalui_control(this,{bound:[0,this.tab.top + this.tab.height + 10,this.formWidth - 5,25]});
			var cnv = this.co.getCanvas();
			this.co.addStyle("border:1px solid #35aedb;background-color:#d6e5eb;background-image:url(image/themes/dynpro/bluegradient.png);background-position:bottom left;background-repeat:repeat-x");
			cnv.align = "center";
			cnv.innerHTML = "<span style='position:absolute;top:5;left:"+(this.co.width / 2 - 120)+";width:auto;height:auto;text-align:middle'>&copy; 2009 SAI (roojax Framework). All rights reserved.</span>";							
			this.co.makeRound(3);			
            var sql = new server_util_arrayList();		
            //slider
            sql.add("select c.folder,b.nama as gambar,a.nama as judul,a.kode_produk "+
					"from portal_produk a inner join portal_dokumen b on a.no_dok_file=b.no_dok_file and b.kode_lokasi = a.kode_lokasi "+
					"inner join portal_file c on b.no_file=c.no_file and b.kode_lokasi = c.kode_lokasi "+
					"where a.status_slide='1' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_input desc limit 20 ");
			//info artikel
			sql.add("select date_format(tanggal,'%d/%m/%Y') as tgl,judul,kode_konten,keterangan from portal_konten where status_slide='0' and status_aktif='1' and status_front='1' and kode_klp='K01' and kode_lokasi='"+this.app._lokasi+"' order by tgl_input desc limit 20 ");
			//info Kategori
			sql.add("select a.kode_kategori, a.nama,c.folder, b.nama as nama_file, count(d.kode_produk) as tot from portal_kategori a "+
                    " inner join portal_dokumen b on a.no_dok_file=b.no_dok_file and b.kode_lokasi = a.kode_lokasi "+
					" inner join portal_file c on b.no_file=c.no_file and b.kode_lokasi = c.kode_lokasi "+
					" left outer join portal_produk d on d.kode_kategori = a.kode_kategori and d.kode_lokasi = a.kode_lokasi "+
                    "where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe = 'posting' "+
                    " group by a.kode_kategori, a.nama,c.folder, b.nama "+
                    " order by a.kode_kategori");			
            //promosi
            sql.add("select a.kode_produk, a.keterangan, a.tgl_mulai, a.tgl_akhir, a.diskon, b.nama as nmproduk, d.folder, c.nama as gambar, "+
                    "  b.harga, b.spesifikasi, b.jenis_motor, b.satuan, b.warna, e.nama as merk, f.nama as pabrik "+
                    "  from portal_promosi a "+
                    "  inner join portal_produk b on b.kode_produk = a.kode_produk and b.kode_lokasi = a.kode_lokasi "+
                    "  inner join portal_dokumen c on c.no_dok_file = b.no_dok_file and c.kode_lokasi = a.kode_lokasi "+
                    "  inner join portal_file d on d.no_file = c.no_file and d.kode_lokasi = a.kode_lokasi "+
                    "   left outer join portal_merk e on e.kode_merk = b.kode_merk "+
			         "   left outer join portal_pabrik f on f.kode_pabrik = b.kode_pabrik "+
                    "where a.kode_lokasi = '"+this.app._lokasi+"' and now() between a.tgl_mulai and a.tgl_akhir order by a.kode_produk");			
            //terlaris
            sql.add("select b.kode_produk, b.nama as nmproduk, d.folder, c.nama as gambar, "+
                    "  b.harga, b.spesifikasi, b.jenis_motor, b.satuan, b.warna, e.nama as merk, f.nama as pabrik, "+
                    "  count(g.kode_produk) as tot "+
                    "  from portal_produk b "+
                    "  inner join portal_dokumen c on c.no_dok_file = b.no_dok_file and c.kode_lokasi = b.kode_lokasi "+
                    "  inner join portal_file d on d.no_file = c.no_file and d.kode_lokasi = b.kode_lokasi "+
                    "  left outer join portal_merk e on e.kode_merk = b.kode_merk "+
                    "  left outer join portal_pabrik f on f.kode_pabrik = b.kode_pabrik "+
                    "  left outer join portal_order_d g on g.kode_produk = b.kode_produk and g.kode_lokasi = b.kode_lokasi "+
                    " where b.kode_lokasi = '"+this.app._lokasi+"' "+
                    " group by b.kode_produk, b.nama, d.folder, c.nama, "+
                    "  b.harga, b.spesifikasi, b.jenis_motor, b.satuan, b.warna, e.nama, f.nama "+
                    "  having tot > 0 "+
                    " order by tot desc limit 10 ");			            
            this.dbLib.getMultiDataProviderA(sql);				
	},
	doAfterResize:function(width, height){				
		this.setWidth(width);
		this.setHeight(height);
		if (this.tab !== undefined){
			this.tab.setHeight(system.screenHeight - 80);
			this.tab.setLeft(0);
			this.co.setLeft(0);
			this.co.setTop(this.tab.top + this.tab.height + 10);			
		}
	},
	userLogin : function(user, pwd, status){
		try{
			this.app.statuslog =  status;
			this.app.userlog = user;
			this.app._isLog = false;
			var data = this.dbLib.getDataProvider("select kode_cust,nama,email,no_telp,alamat, 'anggota' as status from portal_cust where kode_cust ='"+this.app.userlog+"' and paswd='"+pwd+"' and kode_lokasi='"+this.app._lokasi+"' "+
                            " union all "+
                            " select kode_sales,nama,email,no_telp,alamat, 'sales' as status from portal_sales where kode_sales ='"+this.app.userlog+"' and paswd='"+pwd+"' and kode_lokasi='"+this.app._lokasi+"'");							
			eval("data = "+data+";");
			this.dataUser = {id:"",email:"",telp:"",alamat:"",nama:"",status:"",site:"",tgl:""};
			if (data.rs.rows[0] !== undefined){
				this.app.userMail=data.rs.rows[0].email;
				this.app.userTelp=data.rs.rows[0].no_telp;
				this.app.userAlmt=data.rs.rows[0].alamat;
				this.app.statuslog = data.rs.rows[0].status; 
				if (data.rs.rows[0].status == 'anggota')
				    this.sqlUpdt = "update portal_cust set status_ol='1' "+
											"where kode_cust='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ";
			    else 
                    this.sqlUpdt = "update portal_sales set status_ol='1' "+
											"where kode_sales='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ";				
			     
				this.app._isLog = true;
                var site = this.app.userMail.split("@");
				if (site[1] === "roojax.com")
					this.app.site="gmail.com";
				else this.app.site=site[1];
				this.data = data;
				this.dataUser = {id:this.app.userlog,
                                email: data.rs.rows[0].email, 
                                 telp: data.rs.rows[0].no_telp,
                                 alamat: data.rs.rows[0].alamat, 
                                 nama: data.rs.rows[0].nama, 
                                 status: data.rs.rows[0].status,
                                 site: this.app.site,
                                 tgl: new Date().lclFormat()};
                this.viewProduk.showItemsMore();                                
                this.updateUserCart();
			}
			return (data.rs.rows[0] !== undefined);
		}catch(e){
			systemAPI.alert("Cek Login",e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){
		if (sender === this.pwd)
			if (keyCode === 13)
				this.doClick(this.bLogin);
	},
	doItemsClick: function(sender, id, item){
	    try{
    	    this.activeSender = {sender:sender, item:item};
    	    switch(sender){
                case this.ktgr: 
                    this.tabCenter.show();
                    if (curvyBrowser.isIE)
                        this.artikelView.hide();
                    else {
                        this.artikelView.fadeOut();
                        this.tabCenter.fade();    	           
            	        this.view2.fade();
           	        }
           	        this.tabCenter.doClick(undefined, 0);
            	    if (id != "Home")
                        this.dbLib.getDataProviderA("select a.kode_produk, a.nama,c.folder, b.nama as nama_file, a.spesifikasi,a.harga, a.satuan, "+
                            "   a.jenis_motor, a.kode_merk, ifnull(d.nama,'-') as merk, a.kode_pabrik, ifnull(e.nama,'-') as pabrik, a.warna "+
                            "   from portal_produk a inner join portal_dokumen b on a.no_dok_file=b.no_dok_file and b.kode_lokasi = a.kode_lokasi "+
           					"   inner join portal_file c on b.no_file=c.no_file and b.kode_lokasi = c.kode_lokasi "+
           					"   left outer join portal_merk d on d.kode_merk = a.kode_merk "+
           					"   left outer join portal_pabrik e on e.kode_pabrik = a.kode_pabrik "+
                            " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_kategori = '"+id+"' order by a.kode_produk");	   
                    else this.dbLib.getDataProviderA("select a.kode_kategori, a.nama,c.folder, b.nama as nama_file from portal_kategori a inner join portal_dokumen b on a.no_dok_file=b.no_dok_file and b.kode_lokasi = a.kode_lokasi "+
					       " inner join portal_file c on b.no_file=c.no_file and b.kode_lokasi = c.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe = 'posting' order by a.kode_kategori");
    	       break;
    	       case this.viewPresentation:   
    	       case this.viewFramework:    	           
	           break;
    	       case this.viewProduk:   
                   this.tabCenter.show();	                                                 
                   if (curvyBrowser.isIE)
                       this.artikelView.hide();	                              
                   else{
                        this.artikelView.fadeOut();
                        this.tabCenter.fade();    	           
                        this.view2.fade(); 
                   }
                   if (this.view2.view == 2){
        	           if (this.app._isLog) {
                        this.app._myCart.set(item.id,item.more);
                        this.updateUserCart();
                       } 
                       uses("app_frontend_sai_fBelanja",true);
        	           this.fBelanja = new app_frontend_sai_fBelanja(this.getApplication(),{bound:[system.screenWidth / 2 - 300,system.screenHeight / 2 - 250,600,500]},this);
        	           this.fBelanja.setCaption("Info Produk "+item.id+"("+item.title+")");
                       this.fBelanja.setInfo(item.more, this.dataUser);
        	           this.fBelanja.showModal();
        	           this.selectedItem = item;
       	           }else{
       	               this.dbLib.getDataProviderA("select a.kode_produk, a.nama,c.folder, b.nama as nama_file, a.spesifikasi,a.harga, a.satuan, "+
                            "   a.jenis_motor, a.kode_merk, ifnull(d.nama,'-') as merk, a.kode_pabrik, ifnull(e.nama,'-') as pabrik, a.warna "+
                            "   from portal_produk a inner join portal_dokumen b on a.no_dok_file=b.no_dok_file and b.kode_lokasi = a.kode_lokasi "+
           					"   inner join portal_file c on b.no_file=c.no_file and b.kode_lokasi = c.kode_lokasi "+
           					"   left outer join portal_merk d on d.kode_merk = a.kode_merk "+
           					"   left outer join portal_pabrik e on e.kode_pabrik = a.kode_pabrik "+
                            " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_kategori = '"+id+"' order by a.kode_produk");	   
                   }
    	       break;
    	       case this.pArtikel:
    	           this.artikelView.show();
                   if (curvyBrowser.isIE)
                       this.tabCenter.hide();
                   else {
                        this.tabCenter.fadeOut();
                        this.artikelView.fade();
                   }    	           
    	           this.dbLib.getDataProviderA("select c.folder,a.gambar,a.deskripsi,a.tanggal "+
								"from portal_konten a inner join portal_dokumen b on a.no_file_dok=b.no_dok_file "+
								"inner join portal_file c on b.no_file=c.no_file where a.kode_konten='"+id+"' and a.status_slide='0' and a.status_aktif='1' and a.status_front='1' and a.kode_klp='K01' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_input desc ");
    	       break;
    	    }
	    }catch(e){
	       systemAPI.alert("Permintaan data gagal",e);
        }
    },
    doModalResult: function(sender, modalResult){
        if (modalResult == mrOk){            
        }
    },
	doClick: function(sender){				
		try{
			if (sender.caption === "Login"){
				if (this.userLogin(this.uid.getText(), this.pwd.getText())){					
					this.uid.setCaption("Nama");					
					this.uid.setReadOnly(true);							
					this.pLogin.setCaption("Keranjang");
					this.bLogin.setCaption("Logout");
					this.pwd.hide();
					this.uid.hide();					
					this.pLogin.setHeight(180);					
					this.login(this.data, true);					
					this.uid.setText(this.app.username);
					//tab Customer / Sales
				}else throw ("User Id atau Password anda salah");
			}else{ //logout
				this.logout(true);					
			}
			if (this.tabToko !== undefined){
				this.tabToko.doItemClick("","","",0);
			}
		}catch(e){
			systemAPI.alert("Kesalahan Login",e);
		}
	},	
    createListData: function(){
		try{		
			uses("portalui_saiGrid;portalui_panel;portalui_imageButton;portalui_sgNavigator;app_frontend_sai_fListData");
			this.listDataForm = new app_frontend_sai_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert("Failed Create listData",e);
		}
	},
	doTimer : function(sender){
		this.t.setVisible(!this.t.visible);
	}, 
	createBlock : function(){
		//uses("portalui_panel;portalui_image");
		this.childBlock = new portalui_panel(this);
		this.childBlock.setBound(this.width / 2 - this.formWidth / 2,21,this.tab.getWidth()-2,this.tab.getHeight()-20);		
		this.childBlock.setBorder(0);
		this.childBlock.setColor("#FFF");
		this.childBlock.getCanvas().style.zIndex = 999999;
		this.childBlock.hide();			
		this.load = new portalui_image(this.childBlock);
		this.load.setBound(this.childBlock.getWidth() / 2 - 15,this.childBlock.getHeight() / 2 - 30,31,31);
		this.load.setImage("image/gridload.gif");
	},
	doRequestReady: function(sender, methodName, result){
		try{
			switch(methodName){
				case "getMultiDataProvider" : 										
					eval("var data = " + result+";");					
					var img = [],desc = [],id1 = [],kd=[];
					for (var i in data.result[0].rs.rows){						
						img[img.length] = "server/"+data.result[0].rs.rows[i].folder+"/"+data.result[0].rs.rows[i].gambar;
                        desc[desc.length] = data.result[0].rs.rows[i].judul;
                        id1[id1.length] = data.result[0].rs.rows[i].judul;
                        kd[kd.length] =data.result[0].rs.rows[i].kode_produk;
					}						
                    if (img.length > 0) this.imgSlide.addItems(img, desc, id1, kd);					
                    img = [],desc = [],id1 = [],kd=[];	
                    for (var i in data.result[2].rs.rows){								
						img[img.length] = "server/"+data.result[2].rs.rows[i].folder+"/"+data.result[2].rs.rows[i].nama_file;
                        desc[desc.length] = data.result[2].rs.rows[i].nama +"&nbsp;&nbsp;&nbsp;("+data.result[2].rs.rows[i].tot+")";
                        id1[id1.length] = data.result[2].rs.rows[i].nama;
                        kd[kd.length] =data.result[2].rs.rows[i].kode_kategori;                        
					}
					if (img.length > 0) {
                        this.ktgr.addItems(imgtmp, title, shortDesc, id);
                    }
                    img = [],desc = [],id1 = [],kd=[];
					for (var i in data.result[1].rs.rows){						   
					    img[img.length] = "";
                        desc[desc.length] = data.result[1].rs.rows[i].judul;
                        id1[id1.length] = data.result[1].rs.rows[i].keterangan;
                        kd[kd.length] =data.result[1].rs.rows[i].kode_konten;
					}		
                    this.pArtikel.addItems(img, desc, id1, kd);				
					img = [],desc = [],id1 = [],kd=[];
                    var more = [];                    
				break;
				case "getDataProvider":
				    switch(this.activeSender.sender){
				        case this.ktgr :				            
				        case this.viewProduk :
				            eval("result = "+result+";");
				            if (this.activeSender.item.id == "Home")
				                this.view2.setView(1);
                            else this.view2.setView(2);
				            img = [],desc = [],id1 = [],kd=[], more=[];	
				            this.view2.setCaption(this.activeSender.item.title);
                            for (var i in result.rs.rows){								
        						img[img.length] = "server/"+result.rs.rows[i].folder+"/"+result.rs.rows[i].nama_file;
                                desc[desc.length] = result.rs.rows[i].nama;
                                if (this.activeSender.item.id == "Home"){        
                                   id1[id1.length] = "";                                                          
                                   kd[kd.length] =result.rs.rows[i].kode_kategori; 
                                }else {
                                    kd[kd.length] =result.rs.rows[i].kode_produk;
                                    id1[id1.length] = result.rs.rows[i].spesifikasi;
                                }
                                more[more.length]= {price: result.rs.rows[i].harga,icon:"icon/dynpro/keranjang.png", btnCaption:"Beli",
                                    satuan:result.rs.rows[i].satuan,jenis_motor:result.rs.rows[i].jenis_motor, merk:result.rs.rows[i].merk,
                                    pabrik:result.rs.rows[i].pabrik,warna:result.rs.rows[i].warna,spesifikasi:result.rs.rows[i].spesifikasi,
                                    id:result.rs.rows[i].kode_produk,nama:result.rs.rows[i].nama};
        					}
        					if (img.length > 0) {
                                this.view2.addItems(img, desc, id1, kd, more);
                            }else this.view2.getClientCanvas().innerHTML = "";
                            if (this.app._isLog){
                                this.view2.showItemsMore("Beli");
                            }else this.view2.showItemsMore("Info...");
				        break;
				        case this.pArtikel:
				            eval("try {result = "+result+";}catch(e){throw (result);}");
				            if (typeof result !== "string"){
				                if (result.rs != undefined && result.rs.rows[0] !== undefined)
    				                this.artikelView.getClientCanvas().innerHTML = "<div  align='left' style='{float:left;overflow:auto;border:1px solid #4d7795;background:#ffffff;position:absolute; left:0; top:0; width:"+(this.artikelView.getClientWidth() - 10)+";height:"+(this.artikelView.getClientHeight() - 50)+"}'>"+										
                						"<div style='{height:100%;width;100%;float:left;padding-left:5px;padding-top:5px;margin-left:0px;margin-right:0px;padding-bottom:10px;}'>"+
                							"<div style='{display:inline; width:100%;height:28px;margin:5px 0px 5px 0px;font-style:normal;color:rgb(51,102,153);font-weight:bold;font-size:24px;font-family:arial}'>"+this.activeSender.item.title+"</div>"+
                							"<div style='{clear:both;display:block;width:100%}'></div>"+
                							"<div style='{clear:both;display:block;width:100%;margin-top:20px}'></div>"+										
                							"<div style='{clear:both;display:block;width:100%}'></div>"+
                							"<div align='center' style='{display:inline;float:left; width:140;height:120;margin-left:10px;margin-right:10px;}'>"+
                								"<div style='{display:block;height:100;width:140;margin-bottom:5px}'>"+						
                								"<img src='server/"+result.rs.rows[0].folder+"/"+result.rs.rows[0].gambar+"' width=140 height=100/>"+
                								"</div>"+
                								"<div align='left' style='{display:block;height:22;color:#333;width:100%;margin-bottom:0px;font-family:arial;font-size:10px;font-style: normal;font-variant: normal;font-weight: normal}'>"+						
                								"</div>"+
                							"</div>"+					
                							"<div style='{display:inline; width:400;height:13px;font-size:10px;margin:bottom:2px;text-transform:uppercase;margin-left:10px;color:rgb(51,153,504)}'>"+					
                							new Date().idFormat(result.rs.rows[0].tanggal)+
                							"</div>"+
                							"<div style='{display:inline; width:100%;height:auto;text-justify:inter-word;text-align:justify;font-family:arial;font-size:12px;font-style: normal;font-variant: normal;font-weight: normal}'>"+																
                							urldecode(result.rs.rows[0].deskripsi)+
                							"</div>"+										
                						"</div>"+
                					"</div>";
                            }else throw (result);
				        break;
                    }
				break;
			}
			
		}catch(e){
			systemAPI.alert("Request failed",e+"\n"+result);
		}
	},
	doTabChange: function(sender, id){        
		try{
			if (this.childBlock !== undefined) this.childBlock.show();
			var addClass = "";
			if (window.portalui_panel === undefined) {
               addClass += "portalui_panel;util_standar;";
            }   
			switch(id){
				case 0 : 					
					if (this.app._isLog){
					    this.uid.hide();
						this.uid.setText(this.dataUser.nama);
						this.uid.setCaption("Nama");					
						this.uid.setReadOnly(true);							
						this.pLogin.setCaption("Keranjang");
						this.bLogin.setCaption("Logout");
						this.pwd.hide();
						//this.cbStatus.hide();		
						this.pLogin.setHeight(180);											
					}else {							
						this.pLogin.setHeight(180);
						this.uid.setReadOnly(false);
						this.uid.setText(this.app.userlog);
						this.uid.setCaption("User Id");
						this.uid.show();
						this.pwd.show();
						//this.cbStatus.show();		
						this.bLogin.setCaption("Login");
						this.pLogin.setCaption("Login");						
					}
					break;
				default : 					
					if (this.frame.get(sender.childPage[id].frameClass) === undefined){
						if (sender.childPage[id].frameClass !== undefined){
							uses(addClass+sender.childPage[id].frameClass);
							var script = "var frame = new "+sender.childPage[id].frameClass+"(sender.childPage["+id+"],{bound:[0,0,this.tab.getClientWidth() - 5, this.tab.getClientHeight()- 5]});";
							eval(script);
							this.frame.set(sender.childPage[id].frameClass,frame);
						}
					}else {
                       if (sender.childPage[id].frameClass == "app_frontend_sai_fMember"){
					      var frame =  this.frame.get(sender.childPage[id].frameClass);
					      if (this.app._isLog && !frame.alreadyLoad) 
                            frame.initMenu(this.dataUser);
					      else if (!this.app._isLog && frame.deinit) frame.deinit();
                       }
                    }
					break;				
			}
			this.selectedTab = id;			
			if (this.childBlock !== undefined) this.childBlock.hide();
		}catch(e){		    
			if (this.childBlock !== undefined) this.childBlock.hide();
			systemAPI.alert("Failed",e);      
		}
	},
	doTimer: function(sender){
		try{
			this.timer.setEnabled(false);
			this.activeSender = {sender:this.timer,item:undefined};
			if (this.app.statuslog.toLowerCase() == "customer" || this.app.statuslog.toLowerCase() == "anggota")
				var data = this.dbLib.getDataProviderA("select nama from portal_cust where status_ol='0' "+
													"and kode_cust='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ");	
			else var data = this.dbLib.getDataProviderA("select nama from portal_sales where status_ol='0' "+
													"and kode_sales='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ");	
			//eval("data = "+data+";");			
		}catch(e){
			systemAPI.alert("checking failed",e);
		}
	},
	getPeriodeNow: function(){
		var bln=(new Date).getBln();
		if ((new Date).getBln()<10)
			bln="0"+(new Date).getBln();
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
			this.dbLib.execQuery("update portal_sales set status_ol='0' where kode_sales='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ");
		else this.dbLib.execQuery("update portal_cust set status_ol='0' where kode_cust='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"' ");
		this.cekload=false;
		this.nourut = 0;
		this.jumlah = 0;
		this.tothrg = 0;
		this.timer.setEnabled(false);
		this.data = undefined;
		this.pLogin.setHeight(180);
		this.uid.setReadOnly(false);
		this.uid.setText(this.app.userlog);
		this.uid.setCaption("User Id");
		this.pwd.show();
		this.uid.show();
		this.pwd.setText("");				
		this.bLogin.setCaption("Login");
		this.pLogin.setCaption("Login");						
		this.dataUser = {};		
	},
	doCheckOut: function(sender){	   
    },
    updateUserCart: function(){        
    },
    doPanelClose: function(sender){
        this.tabCenter.show();
        if (!document.all) this.tabCenter.fade();
    },
    doTabCenterChange: function(sender, id){
        try{
            switch(id){
                case 0 :                
                break;
                case 1:                    
                break;
                case 2:                    
                break;                
            }
        }catch(e){
            systemAPI.alert(this+"$tabChange",e);
        }
    }
    
});
