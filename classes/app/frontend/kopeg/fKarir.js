//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fKarir = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fKarir.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fKarir.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fKarir.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fKarir";											
			this.initComponent();		
			this.title = "Unit Karir";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fKarir]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fKarir.extend(window.portalui_panel);
window.app_frontend_kopeg_fKarir.implement({
	initComponent: function(){
		try{			
			uses("util_standar;portalui_saiLabelEdit;util_file;portalui_saiLabelEdit;portalui_uploader");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.img = new portalui_image(this);													
			this.img.setBound(0,0,this.app._mainForm.tab.width-2,100);					
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			this.app._lokasi="03";
						
			this.karirMenu = new portalui_FEtabPanel(this);
			this.karirMenu.setBound(10,(document.all ? 104:102),260,410);					
			this.karirMenu.setBgColor("");	
			this.karirMenu.addPage(["Karir Menu","Login"]);						
			this.karirMenu.setBackground("#ffffff");
			this.karirMenu.onTabChange.set(this,"doTabChange");
			this.karirMenu.childPage[0].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";
			this.karirMenu.childPage[1].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";
			this.karirMenu.onChildItemsClick.set(this,"doChildItemsClick");
			this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Lowongan</td></tr></table>","Lowongan","Daftar lowongan yang ada");
			this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Registrasi</td></tr></table>","Registrasi","Form daftar/registrasi sebelum melamar");
			
			this.detail = new portalui_FEtabPanel(this);
			this.detail.setBound(300,(document.all ? 104:102),this.app._mainForm.tab.width - 350,410);					
			this.detail.setBgColor("");			
			this.detail.addPage([""]);
			this.detail.onTabChange.set(this,"doTabChange");
			this.detail.childPage[0].getCanvas().style.background="url(image/themes/dynpro/back_tab.gif) ";
			this.detail.childPage[0].getCanvas().style.overflow="auto";
			this.detail.onChildItemsClick.set(this,"doChildItemsClick");
			
			this.user = new portalui_saiLabelEdit(this.karirMenu.childPage[1]);
			this.user.setBound(10,10,220,20);
			this.user.setCaption("User Name");
			this.user.setTag("9");
			
			this.ePwd = new portalui_saiLabelEdit(this.karirMenu.childPage[1]);
			this.ePwd.setBound(10,33,220,20);
			this.ePwd.setCaption("Password");		
			this.ePwd.setPassword(true);
			this.ePwd.onKeyDown.set(this, "keyDown");
			this.ePwd.setTag("9");
			
			this.blogin = new portalui_button(this.karirMenu.childPage[1]);
			this.blogin.setBound(156,65,80,18);
			this.blogin.setIcon("url(icon/"+system.getThemes()+"/login.png)");
			this.blogin.setCaption("Login");
			this.blogin.onClick.set(this,"doLogin");
			this.blogin.setTag("login");			
			this.file = new util_file();
			this.file.addListener(this);					
			this.file2 = new util_file();
			this.file2.addListener(this);
			this.tmpFile2 = "";
			this.tmpFile = "";
			this.cekapply=false;						
			this.saveData = false;
			this.edtProfil=false;
			this.doChildItemsClick(this.karirMenu,"Lowongan");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{						
			if (sender == this.karirMenu){
				switch(id){
					case "Lowongan" :
						this.delTmpFile();
						if (this.p_tmp != undefined){
							this.p_tmp.free();						
						}else {
							this.detail.childPage[0].getCanvas().innerHTML="";
						}
						this.p_tmp=undefined;
						this.detail.setChildCaption(0,"Lowongan");
						var rs = this.dbLib.getDataProvider("select date_format(tanggal,'%d/%m/%y') as tgl,judul,kode_konten,keterangan "+
									"from portal_konten "+
									"where status_aktif='1' and status_front='1' and kode_klp='K05' and kode_lokasi='"+this.app._kodeLokasi+"' "+
									"order by tanggal desc ");
						eval("data="+rs+";");
						if (typeof(data) == "object"){
							for (var i in data.rs.rows){
								var row = data.rs.rows[i];
								this.detail.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>"+row.tgl+"</td><td style='font-size:12px;color:#0066CC'>"+row.judul+"</td></tr></table>",row.kode_konten,row.keterangan);
							}
						}
						break;
					case "Registrasi" :
						this.delTmpFile();
						if (this.p_tmp != undefined)
							this.p_tmp.free();
						else this.detail.childPage[0].getCanvas().innerHTML="";
						this.detail.setChildCaption(0," Registrasi ");
						this.p_tmp = new portalui_panel(this.detail);
						this.p_tmp.setBound(1,1,this.detail.width,this.detail.height - 20);
						this.p_tmp.setBorder(3);
						this.p_tmp.getCanvas().style.background="url(image/themes/dynpro/back_tab.png)";												
						uses("portalui_saiCBBL");
						this.nip = new portalui_saiCBBL(this.p_tmp);
						this.nip.setBound(20,10,250,20);
						this.nip.setCaption("User ID");		
						this.nip.setReadOnly(false);
						this.nip.setBtnVisible(false);
						this.nip.setRightLabelVisible(false);
						this.nama = new portalui_saiLabelEdit(this.p_tmp);
						this.nama.setBound(20,32,350,20);
						this.nama.setCaption("Nama");
						this.Pwd = new portalui_saiLabelEdit(this.p_tmp);
						this.Pwd.setBound(20,54,350,20);
						this.Pwd.setCaption("Password");
						this.Pwd.setPassword(true);
						this.RPwd = new portalui_saiLabelEdit(this.p_tmp);
						this.RPwd.setBound(20,76,350,20);
						this.RPwd.setCaption("Retype Password");		
						this.RPwd.setPassword(true);
						this.email = new portalui_saiLabelEdit(this.p_tmp);
						this.email.setBound(20,98,350,20);
						this.email.setCaption("Email");
						var bInput = new portalui_button(this.p_tmp);
						bInput.setBound(290,130,80,18);
						bInput.setIcon("url(icon/"+system.getThemes()+"/save.png)");
						bInput.setCaption("Daftar");
						bInput.onClick.set(this,"doBtnClick");
						bInput.setTag("daftar");
						break;
					case "MNTLMRN" :
						this.delTmpFile();
						if (this.p_tmp != undefined)
							this.p_tmp.free();
						else this.detail.childPage[0].getCanvas().innerHTML="";
						this.detail.setChildCaption(0," Monitoring Lamaran ");
						this.p_tmp = new portalui_panel(this.detail);
						this.p_tmp.setBound(1,1,this.detail.width, this.detail.height - 20);						
						this.p_tmp.setBorder(3);
						this.p_tmp.getCanvas().style.background="url(image/themes/dynpro/back_tab.png)";												
						this.p1ml = new portalui_panel(this.p_tmp);
						this.p1ml.setBound(10,10,this.p_tmp.width-20,this.p_tmp.height-20);
						this.p1ml.setName("p1");
						this.p1ml.setBorder(3);
						this.p1ml.setCaption('Daftar Lamaran');
						uses("portalui_saiGrid");
						this.sg1ml = new portalui_saiGrid(this.p1ml);
						this.sg1ml.setBound(1,20,this.p1ml.width-4,this.p1ml.height-24);
						this.sg1ml.setName('sg1mp');
						this.sg1ml.setColCount(5);
						this.sg1ml.setReadOnly(true);
						this.sg1ml.setColTitle(["Lowongan","Tanggal Akhir","Tanggal Lamaran","Status","Keterangan"]);
						this.sg1ml.setColWidth([4,3,2,1,0], [160,100,80,80,201]);
						var brg = this.dbLib.getDataProvider("select b.judul,date_format(b.tanggal,'%d-%m-%Y') as tglend,date_format(a.tanggal,'%d-%m-%Y') as tgllmrn,a.status,a.keterangan "+
							"from portal_pelamar_konten a inner join portal_konten b on a.kode_konten=b.kode_konten "+
							"where a.tanggal<=b.tanggal and b.kode_klp='K05' and a.nip='"+this.app.idplmr+"' ");
						eval("brg = "+brg+";");
						if (typeof(brg)== "object"){
							this.sg1ml.clear();
							this.sg1ml.showLoading();
							this.sg1ml.setData(brg);
							this.sg1ml.setColWidth([4,3,2,1,0], [160,100,80,80,201]);
						}
						for (var k=0; k < this.sg1ml.rows.getLength(); k++){
							if (this.sg1ml.getCell(3,k)=="P")
								this.sg1ml.setCell(3,k,"Progress");
							if (this.sg1ml.getCell(3,k)=="A")
								this.sg1ml.setCell(3,k,"Diterima");
							if (this.sg1ml.getCell(3,k)=="R")
								this.sg1ml.setCell(3,k,"Ditolak");
						}
						break;
					case "EProfil" :
						if (this.app.karirlogin){
							this.delTmpFile();
							if (this.p_tmp != undefined)
								this.p_tmp.free();
							else this.detail.childPage[0].getCanvas().innerHTML="";
							this.detail.setChildCaption(0," Edit Profil ");
							this.p_tmp = new portalui_panel(this.detail);
							this.p_tmp.setBound(1,1,this.detail.width,this.detail.height - 20);
							this.p_tmp.setBorder(3);
							this.p_tmp.getCanvas().style.background="url(image/themes/dynpro/back_tab.png)";														
							uses("portalui_saiCBBL");
							this.nip2 = new portalui_saiCBBL(this.p_tmp);
							this.nip2.setBound(20,10,250,20);
							this.nip2.setCaption("User ID");		
							this.nip2.setReadOnly(false);
							this.nip2.setBtnVisible(false);
							this.nip2.setRightLabelVisible(false);
							this.nama2 = new portalui_saiLabelEdit(this.p_tmp);
							this.nama2.setBound(20,32,350,20);
							this.nama2.setCaption("Nama");
							this.Pwd2 = new portalui_saiLabelEdit(this.p_tmp);
							this.Pwd2.setBound(20,54,350,20);
							this.Pwd2.setCaption("Password");
							this.Pwd2.setPassword(true);
							this.RPwd2 = new portalui_saiLabelEdit(this.p_tmp);
							this.RPwd2.setBound(20,76,350,20);
							this.RPwd2.setCaption("Retype Password");		
							this.RPwd2.setPassword(true);
							this.almt2 = new portalui_saiLabelEdit(this.p_tmp);
							this.almt2.setBound(20,98,350,20);
							this.almt2.setCaption("Alamat");
							this.kota2 = new portalui_saiLabelEdit(this.p_tmp);
							this.kota2.setBound(20,120,350,20);
							this.kota2.setCaption("Kota");
							this.kodepos = new portalui_saiLabelEdit(this.p_tmp);
							this.kodepos.setBound(20,142,350,20);
							this.kodepos.setCaption("Kode Pos");
							this.ktp2 = new portalui_saiLabelEdit(this.p_tmp);
							this.ktp2.setBound(20,164,350,20);
							this.ktp2.setCaption("No. KTP/SIM");
							this.tlp2 = new portalui_saiLabelEdit(this.p_tmp);
							this.tlp2.setBound(20,186,350,20);
							this.tlp2.setCaption("Telepon Rumah");
							this.ponsel = new portalui_saiLabelEdit(this.p_tmp);
							this.ponsel.setBound(20,208,350,20);
							this.ponsel.setCaption("No. Ponsel");
							this.email2 = new portalui_saiLabelEdit(this.p_tmp);
							this.email2.setBound(20,230,350,20);
							this.email2.setCaption("Email");
							this.poto2 = new portalui_saiLabelEdit(this.p_tmp);
							this.poto2.setBound(20,252,250,20);
							this.poto2.setCaption("File Foto");
							this.poto2.setReadOnly(false);
							this.uploader = new portalui_uploader(this.p_tmp);
							this.uploader.setBound(280,252,60,20);		
							this.uploader.onAfterUpload.set(this,"doAfterLoad");
							this.uploader.setParam4("data");
							this.uploader.setParam1(this.app.idplmr);
							this.uploader.setAutoSubmit(true);
							this.uploader.onChange.set(this,"doFileChange");
							this.cv2 = new portalui_saiLabelEdit(this.p_tmp);
							this.cv2.setBound(20,274,250,20);
							this.cv2.setCaption("File CV");
							this.cv2.setReadOnly(false);
							this.uploader2 = new portalui_uploader(this.p_tmp);
							this.uploader2.setBound(280,274,60,20);							
							this.uploader2.onAfterUpload.set(this,"doAfterLoad");
							this.uploader2.setParam4("data");
							this.uploader2.setParam1(this.app.idplmr);
							this.uploader2.setAutoSubmit(true);
							this.uploader2.onChange.set(this,"doFileChange");
							var bInput = new portalui_button(this.p_tmp);
							bInput.setBound(20,310,80,20);
							bInput.setIcon("url(icon/"+system.getThemes()+"/edit.png)");
							bInput.setCaption("Simpan");
							bInput.onClick.set(this,"doBtnClick");
							bInput.setTag("eprofil");
							var rs = this.dbLib.getDataProvider("select * "+
										"from portal_pelamar "+
										"where nip='"+this.app.idplmr+"' ");
							eval("rs= "+rs+";");
							if (typeof(rs)== "object")
							{
								if (rs.rs.rows[0]!=undefined)
								{
									var row = rs.rs.rows[0];
									this.nip2.setText(row.nip);
									this.nama2.setText(row.nama);
									this.Pwd2.setText(row.paswd);
									this.almt2.setText(row.alamat);
									this.kota2.setText(row.kota);
									this.kodepos.setText(row.kodepos);
									this.ktp2.setText(row.no_ktp);
									this.tlp2.setText(row.no_telp);
									this.ponsel.setText(row.ponsel);
									this.email2.setText(row.email);
									this.poto2.setText(row.foto);
									this.cv2.setText(row.dokumen);
								}
							}
						}else system.alert(this, "Silakan login dulu!","");
						break;
				}
			}
			if (sender == this.detail){
				this.idlwgn=id;
				this.detail.childPage[0].getCanvas().innerHTML="";
				this.detail.setChildCaption(0," Detail Lowongan ");
				this.p_tmp = new portalui_panel(this.detail);
				this.p_tmp.setBound(1,1,this.detail.width,this.detail.height - 20);
				this.p_tmp.setBorder(3);
				this.p_tmp.getCanvas().style.background="url(image/themes/dynpro/back_tab.png) center no-repeat";								
				var desk = new portalui_panel(this.p_tmp);
				desk.setBound(20,10,500,270);
				desk.setBorder(0);
				desk.getCanvas().style.background="";
				desk.getCanvas().style.overflow="auto";
				var bInput = new portalui_button(this.p_tmp);
				bInput.setBound(20,300,80,18);
				bInput.onClick.set(this,"doBtnClick");
				if (this.app.karirlogin){					
					bInput.setIcon("url(icon/"+system.getThemes()+"/apply.png)");
					bInput.setCaption("Apply");					
					bInput.setTag("apply");
				}else{
					bInput.setIcon("url(icon/"+system.getThemes()+"/edit.png)");
					bInput.setCaption("Registrasi");					
					bInput.setTag("reg");
				}
				var data = this.dbLib.getDataProvider("select deskripsi from portal_konten where kode_konten='"+id+"' and kode_klp='K05' ");
				eval("data = "+data+";");
				if (typeof(data) == "object"){
					if (data.rs.rows[0] != undefined){
						var data = data.rs.rows[0];
						desk.getCanvas().innerHTML="<div style='font-size:12px;color:#000000;'>"+data.deskripsi+"</div>";
					}
				}
			}
		}catch(e){
			systemAPI.alert("fUsaha::doChildItemsClick : "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){			
			if (methodName == "getDataProvider"){
				eval("result= "+result+";");
				for (var i in result.rs.rows){				
					this.profile.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>"+result.rs.rows[i].judul+"</td></tr></table>",result.rs.rows[i].kode_konten,"");
				}
				if (result.rs.rows[0] != undefined)
					this.doChildItemsClick(this.profile,result.rs.rows[0].kode_konten);
			}else if (methodName == "execArraySQL"){
				if (result.toLowerCase().search("error") == -1){
					if (this.action == "eprofil") {						
						this.uploadFile(this.uploader);
						this.uploadFile(this.uploader2);
						this.app.idplmr=this.nip2.getText();				
						this.standarLib.clearByTag(this, [0],this.nip2);
					}else if (this.action == "apply"){
							system.info(this,"Terima kasih atas partisipasi anda.<br>Lamaran Anda sudah masuk basis data kami","");
							this.inputlmrn=false;
							this.cekapply=false;							
					}else if (this.action == "daftar"){
						this.app.idplmr=this.nip.getText();
						this.app.karirlogin=true;
						this.app.userplmr=this.nama.getText();
						this.user.setText(this.nip.getText());
						this.user.setReadOnly(true);
						this.ePwd.setCaption("Status Login");
						//this.ePwd.setPassword(false);
						//this.ePwd.setText("Pelamar");
						this.ePwd.setReadOnly(true);
						this.ePwd.hide();
						this.blogin.setCaption("Logout");
						this.blogin.setTag("logout");
						this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Edit Profil</td></tr></table>","EProfil","");
						this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Monitoring Lamaran</td></tr></table>","MNTLMRN","");				
						this.standarLib.clearByTag(this, [0],this.nip);
					}					
					this.action = "";
				}else systemAPI.alert(result,"");
			}
		}
		if (sender == this.file || sender == this.file2){
			if (methodName == "copyFileTo"){
				if (result.toLowerCase().search("fail") == -1)
					system.info(this,"Proccess Complete....","");
				else if (result == undefined) 
					systemAPI.alert("Proccess Complete....","");
			}
		}
	},
	doLogin : function(sender){
		try{
			if (sender == this.blogin){
				if (sender.getTag()=="login")
				{
					var data = this.dbLib.getDataProvider("select nip,nama,paswd from portal_pelamar where nip='"+this.user.getText()+"' and paswd='"+this.ePwd.getText()+"' ");					
					eval("data = "+data+";");					
					if (typeof(data) == "object"){
						if (data.rs.rows[0] != undefined){
							data = data.rs.rows[0];
							if ((this.user.getText()==data.nip) && (this.ePwd.getText()==data.paswd)){
								this.karirMenu.setChildCaption(1,"Logout");
								this.app.karirlogin=true;
								this.app.idplmr=data.nip;
								this.app.userplmr=data.nama;
								this.user.setReadOnly(true);
								this.ePwd.setCaption("Status Login");
								//this.ePwd.setPassword(false);
								//this.ePwd.setText("Pelamar");
								this.ePwd.setReadOnly(true);
								this.ePwd.hide();
								this.blogin.setCaption("Logout");
								this.blogin.setTag("logout");
								this.karirMenu.childPage[0].getCanvas().innerHTML="";
								this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Lowongan</td></tr></table>","Lowongan","Daftar lowongan yang ada");
								this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Edit Profil</td></tr></table>","EProfil","Form untuk mengedit biodata/profil");
								this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Monitoring Lamaran</td></tr></table>","MNTLMRN","Form untuk memantau progres lamaran yang sudah Anda masukan");
								this.doChildItemsClick(this.karirMenu,"Lowongan");
							}else systemAPI.alert("Username or password is not correct");
						}else systemAPI.alert("Username or password is not correct");
					}else throw(data);
				}else{
					this.karirMenu.setChildCaption(1,"Login");
					this.app.karirlogin=false;
					this.app.idplmr="";
					this.app.userplmr="";
					this.user.setReadOnly(false);
					this.ePwd.setCaption("Password");
					//this.ePwd.setPassword(true);
					this.ePwd.setText("");
					this.ePwd.setReadOnly(false);
					this.ePwd.show();
					this.blogin.setCaption("Login");
					this.blogin.setTag("login");
					if (this.p_tmp != undefined)
						this.p_tmp.free();
					else this.detail.childPage[0].getCanvas().innerHTML="";
					this.detail.setChildCaption(0,"");
					this.karirMenu.childPage[0].getCanvas().innerHTML="";
					this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Lowongan</td></tr></table>","Lowongan","Daftar lowongan yang ada");
					this.karirMenu.addChildItems(0,"<table><tr><td style='font-size:12px;color:#999999'>- </td><td style='font-size:12px;color:#0066CC'>Registrasi</td></tr></table>","Registrasi","Form daftar/registrasi sebelum melamar");
					this.doChildItemsClick(this.karirMenu,"Lowongan");
					this.cekapply=false;
				}
			}
		}catch(e){
			systemAPI.alert("app_frontend_kopeg_transaksi_fTabToko::doLogin "+e);
		}
	},
	delTmpFile : function(){
		if (this.tmpFile != ""){
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
		if (this.tmpFile2 != ""){
			this.file2.deleteFile(this.tmpFile2);
			this.tmpFile2 = "";
		}
	},
	uploadFile: function(sender){
		if (sender==this.uploader2){
			if (this.tmpFile != ""){
				var rootDir = this.file.getRootDir();										
				var separator = rootDir.charAt(rootDir.length-1);						
				this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
				this.file.deleteFile(this.tmpFile);
				this.tmpFile = "";
			}
		}
		if (sender==this.uploader){
			if (this.tmpFile2 != ""){
				var rootDir = this.file.getRootDir();										
				var separator = rootDir.charAt(rootDir.length-1);						
				this.file2.copyFileTo(this.tmpFile2,rootDir+this.Folder2+separator+this.namaFile2,true);
				this.file2.deleteFile(this.tmpFile2);
				this.tmpFile2 = "";
			}
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{
			if (sender == this.uploader2){
				if (this.tmpFile != ""){										
					this.file.deleteFile(this.tmpFile);			
				}
				this.uploader2.setParam2("");
				if (data instanceof portalui_arrayMap){
					this.cv2.setText(data.filename);
					this.namaFile=data.filename;
					this.Folder=data.folder;
					this.tmpFile = data.tmpfile;
				}else throw(data);
			}
			if (sender == this.uploader){
				if (this.tmpFile2 != ""){			
					this.file2.deleteFile(this.tmpFile2);			
				}
				this.uploader.setParam2("");
				if (data instanceof portalui_arrayMap){
					this.poto2.setText(data.filename);
					this.namaFile2=data.filename;
					this.Folder2=data.folder;
					this.tmpFile2 = data.tmpfile;
				}else throw(data);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13)
			this.doLogin(this.blogin);
	},
	doBtnClick: function(sender){
		this.action == sender.getTag();
		if (sender.getTag() == "apply"){			
			uses("server_util_arrayList");
			var data = this.dbLib.getDataProvider("select * from portal_pelamar where nip='"+this.app.idplmr+"' ");
			eval("data = "+data+";");
			if (typeof(data)== "object"){
				if (data.rs.rows[0] != undefined){
					var data = data.rs.rows[0];
					if ((data.alamat !="-" && data.alamat!=undefined && data.alamat!="") &&
						(data.kota!="-" && data.kota!=undefined && data.kota!="") &&
						(data.kodepos!="-" && data.kodepos!=undefined && data.kodepos!="") &&
						(data.no_ktp!="-" && data.no_ktp!=undefined && data.no_ktp!="") &&
						(data.no_telp!="-" && data.no_telp!=undefined && data.no_telp!="") &&
						(data.ponsel!="-" && data.ponsel!=undefined && data.ponsel!="") &&
						(data.email!="-" && data.email!=undefined && data.email!="") &&
						(data.foto!="-" && data.foto!=undefined && data.foto!="") &&
						(data.dokumen!="-" && data.dokumen!=undefined && data.dokumen!=""))
					{						
						var sql = new server_util_arrayList();
						sql.add("insert into portal_pelamar_konten (nip,kode_konten,status,tanggal) values "+
							"('"+this.app.idplmr+"','"+this.idlwgn+"','P','"+(new Date()).getDateStr()+"') ");
						this.dbLib.execArraySQL(sql);
						this.doChildItemsClick(this.karirMenu,"Lowongan");
					}else
					{
						system.alert(this,"Data Anda belum lengkap, silakan lengkapi dulu sebelum melamar!","");
						this.doChildItemsClick(this.karirMenu,"EProfil");						
					}
				}
			}
		}else if (sender.getTag() == "eprofil"){
			if (this.Pwd2.getText()==this.RPwd2.getText())
			{
				this.edtProfil=true;
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("update portal_pelamar set nip='"+this.nip2.getText()+
				"',paswd='"+this.Pwd2.getText()+"',nama='"+this.nama2.getText()+
				"',alamat='"+this.almt2.getText()+"',no_ktp='"+this.ktp2.getText()+
				"',no_telp='"+this.tlp2.getText()+"',email='"+this.email2.getText()+
				"',kota='"+this.kota2.getText()+"',kodepos='"+this.kodepos.getText()+
				"',status='-',foto='"+this.poto2.getText()+"',dokumen='"+this.cv2.getText()+
				"',ponsel='"+this.ponsel.getText()+
				"' where nip='"+this.app.idplmr+"' ");
				this.dbLib.execArraySQL(sql);				
				this.saveData = true;
			}else system.alert(this, "Password tidak sama dengan Retype Password","");
		}else if (sender.getTag() == "daftar"){
			if (this.Pwd.getText()==this.RPwd.getText())
			{
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("insert into portal_pelamar (nip,paswd,nama,alamat,no_ktp, no_telp,email,status,tgl_input,foto,dokumen,kode_lokasi,kota,kodepos,ponsel) values  "+
						"('"+this.nip.getText()+"','"+this.Pwd.getText()+"','"+this.nama.getText()+"','-','-','-','"+this.email.getText()+"','-','"+(new Date()).getDateStr()+"','-','-','"+this.app._lokasi+"','-','-','-') ");
				this.dbLib.execArraySQL(sql);				
			}else system.alert(this,"Password tidak sama dengan Retype Password","");
		}else if (sender.getTag() == "genidp")
			this.nip.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pelamar", "nip", "PLM/"+this.getForm().getPeriodeNow()+"/","00000"));	
		else if (sender.getTag() == "reg")
			this.doChildItemsClick(this.karirMenu,"Registrasi");		
	}
});