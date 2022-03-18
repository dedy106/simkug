//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fKarir = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fKarir.prototype.parent.constructor.call(this, owner,options);			
			this.setBorder(0);		
			this.setColor("");		
			this.className = "app_frontend_alpa_fKarir";											
			this.initComponent();		
			this.title = "Unit Karir";
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fKarir]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fKarir.extend(window.portalui_panel);
window.app_frontend_alpa_fKarir.implement({
	initComponent: function(){
		try{			
			uses("util_standar;util_file;portalui_uploader");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.swf1 = new portalui_flashObj(this,{bound:[0,0,this.width,150],flashId:this.getFullId()+"_swf1",flashFile:"classes/app/frontend/alpa/swf/karir.swf"});   								                        
			this.detail = new portalui_roundPanel(this,{bound:[300,155,this.width - 330,this.height - 165],background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",caption:"Info Karir",view:0,itemClick:[this,"doChildItemsClick"]});
			this.pLogin = new portalui_roundPanel(this,{bound:[10,155,260,150],caption:"Login",background:"image/themes/dynpro/greygradient.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",view:1,itemClick:[this,"doChildItemsClick"]});                        
			this.user = new portalui_saiLabelEdit(this.pLogin,{bound:[10,10,220,20],caption:"User Name"});
			this.ePwd = new portalui_saiLabelEdit(this.pLogin,{bound:[10,33,220,20],caption:"Password",password:true,keyDown:[this,"keyDown"],tag:9});
			this.blogin = new portalui_button(this.pLogin,{bound:[156,65,80,18],icon:"url(icon/"+system.getThemes()+"/login.png)",click:[this,"doLogin"],caption:"Login"});
			
			this.karirMenu = new portalui_roundPanel(this,{bound:[10,315,260,this.height - 325],caption:"Menu",background:"image/themes/dynpro/greygradient.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8",view:0,itemClick:[this,"doChildItemsClick"]});			
            this.karirMenu.addItems(["",""],["Lowongan","Registrasi"],["Daftar lowongan yang ada","Form daftar/registrasi sebelum melamar"],["Lowongan","Registrasi"]);			
            this.file = new util_file();
			this.file.addListener(this);					
			this.file2 = new util_file();
			this.file2.addListener(this);
			this.tmpFile2 = "";
			this.tmpFile = "";
			this.cekapply=false;						
			this.saveData = false;
			this.edtProfil=false;
			this.doChildItemsClick(this.karirMenu,'Lowongan');
		}catch(e){
			alert(e);
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
                        }
						this.p_tmp=undefined;
						this.detail.setCaption("Lowongan");
						var data = this.dbLib.getDataProvider("select date_format(tanggal,'%d/%m/%y') as tgl,judul,kode_konten,keterangan "+
									"from portal_konten "+
									"where status_aktif='1' and status_front='1' and kode_klp='K05' and kode_lokasi='"+this.app._kodeLokasi+"' "+
									"order by tanggal desc ",true);
						if (typeof(data) != "string"){
							var img=[],title=[],shortDesc=[],id=[];
                            for (var i in data.rs.rows){
								var row = data.rs.rows[i];
								img[img.length] = "";shortDesc[img.length] = "";
								title[title.length] = row.tgl+"-"+row.judul;
                                id[id.length]= row.kode_konten;
                                shortDesc[shortDesc.length] = row.keterangan;                
							}
							this.detail.addItems(img, title, shortDesc, id);
						}
						break;
					case "Registrasi" :
						this.delTmpFile();
						if (this.p_tmp != undefined)
							this.p_tmp.free();						
						this.detail.setCaption(" Registrasi ");
						this.p_tmp = new portalui_panel(this.detail,{bound:[1,1,this.detail.width-10,this.detail.height - 65]});
						this.p_tmp.setBorder(0);
						uses("portalui_saiCBBL");
						this.nip = new portalui_saiCBBL(this.p_tmp,{bound:[20,10,250,20],caption:"User Id",btnVisible:false,rightLabelVisible:false});
						this.nama = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,32,350,20],caption:"Nama"});
						this.Pwd = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,54,350,20],caption:"Password",password:true});
						this.RPwd = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,76,350,20],caption:"Retype Password",password:true});
						this.email = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,98,350,20],caption:"Email"});
						var bInput = new portalui_button(this.p_tmp,{bound:[290,130,80,18],icon:"url(icon/"+system.getThemes()+"/save.png)",caption:"Daftar",click:"doBtnClick",tag:"daftar"});						
						break;
					case "MNTLMRN" :
						this.delTmpFile();
						if (this.p_tmp != undefined)
							this.p_tmp.free();						
						this.detail.setCaption(" Monitoring Lamaran ");
						this.p_tmp = new portalui_panel(this.detail,{bound:[1,1,this.detail.width-10, this.detail.height - 65],border:0});					
						this.p1ml = new portalui_panel(this.p_tmp,{bound:[10,10,this.p_tmp.width-20,this.p_tmp.height-20],border:3,caption:"Daftar Lamaran"});
						uses("portalui_saiGrid");
						this.sg1ml = new portalui_saiGrid(this.p1ml,{bound:[1,20,this.p1ml.width-4,this.p1ml.height-24],colCount:5,readOnly:true,
                            colTitle:["Lowongan","Tanggal Akhir","Tanggal Lamaran","Status","Keterangan"],
                            colWidth:[[4,3,2,1,0], [160,100,80,80,201]]});
						var brg = this.dbLib.getDataProvider("select b.judul,date_format(b.tanggal,'%d-%m-%Y') as tglend,date_format(a.tanggal,'%d-%m-%Y') as tgllmrn,a.status,a.keterangan "+
							"from portal_pelamar_konten a inner join portal_konten b on a.kode_konten=b.kode_konten and a.kode_lokasi=b.kode_lokasi "+
							"where a.tanggal<=b.tanggal and b.kode_klp='K05' and a.nip='"+this.app.idplmr+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
						if (typeof(brg)!= "string"){
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
							this.detail.setCaption(" Edit Profil ");
							this.p_tmp = new portalui_panel(this.detail,{bound:[1,1,this.detail.width-10,this.detail.height - 65],border:3});
							uses("portalui_saiCBBL");
							this.nip2 = new portalui_saiCBBL(this.p_tmp,{bound:[20,10,250,20],caption:"User Id",btnVisible:false,rightLabelVisible:false});
							this.nama2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,32,350,20],caption:"Nama"});
							this.Pwd2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,54,350,20],caption:"Password",password:true});
							this.RPwd2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,76,350,20],caption:"Retype Password",password:true});
							this.almt2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,98,350,20],caption:"Alamat"});
							this.kota2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,120,350,20],caption:"Kota"});
							this.kodepos = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,142,350,20],caption:"Kode Pos"});
							this.ktp2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,164,350,20],caption:"No. KTP/SIM"});
							this.tlp2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,186,350,20],caption:"Telepon Rumah"});
							this.ponsel = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,208,350,20],caption:"No. Ponsel"});
							this.email2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,230,350,20],caption:"Email"});
							this.poto2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,252,250,20],caption:"File Foto"});
							this.uploader = new portalui_uploader(this.p_tmp,{bound:[280,252,60,20],afterUpload:[this,"doAfterLoad"], param4:"data",param1:this.app.idplmr,autoSubmit:true,change:[this,"doFileChange"]});
							this.cv2 = new portalui_saiLabelEdit(this.p_tmp,{bound:[20,274,250,20],caption:"File CV"});
							this.uploader2 = new portalui_uploader(this.p_tmp,{bound:[280,274,60,20],afterUpload:[this,"doAfterLoad"],param4:"data",param1:"this.app.idplmr",autoSubmit:true,change:[this,"doFileChange"]});	
							var bInput = new portalui_button(this.p_tmp,{bound:[20,310,80,20],icon:"url(icon/"+system.getThemes()+"/edit.png)",caption:"Simpan",click:[this,"doBtnClick"],tag:"eprofil"});
							var rs = this.dbLib.getDataProvider("select * "+
										"from portal_pelamar "+
										"where nip='"+this.app.idplmr+"' ",true);
							if (typeof(rs)!= "string")
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
				this.detail.setCaption(" Detail Lowongan ");
				this.p_tmp = new portalui_panel(this.detail,{bound:[1,1,this.detail.width-10,this.detail.height - 65],border:3});
				var desk = new portalui_panel(this.p_tmp,{bound:[20,10,500,270],border:0,color:""});
				var bInput = new portalui_button(this.p_tmp,{bound:[20,300,80,18],click:[this,"doBtnClick"]});
				if (this.app.karirlogin){					
					bInput.setIcon("url(icon/"+system.getThemes()+"/apply.png)");
					bInput.setCaption("Apply");					
					bInput.setTag("apply");
				}else{
					bInput.setIcon("url(icon/"+system.getThemes()+"/edit.png)");
					bInput.setCaption("Registrasi");					
					bInput.setTag("reg");
				}
				var data = this.dbLib.getDataProvider("select deskripsi from portal_konten where kode_konten='"+id+"' and kode_klp='K05' and kode_lokasi='"+this.app._lokasi+"' ",true);				
				if (typeof(data) != "string"){
					if (data.rs.rows[0] != undefined){
						var data = data.rs.rows[0];

						desk.getClientCanvas().innerHTML="<div style='font-size:12px;color:#000000;'>"+urldecode(data.deskripsi)+"</div>";
					}
				}
			}
		}catch(e){
			systemAPI.alert("Error:fUsaha##doChildItemsClick",e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){			
			if (methodName === "getDataProvider"){				
			}else if (methodName == "execArraySQL"){
				if (result.toLowerCase().search("error") === -1){
					if (this.action === "eprofil") {						
						this.uploadFile(this.uploader);
						this.uploadFile(this.uploader2);
						this.app.idplmr=this.nip2.getText();				
						this.standarLib.clearByTag(this, [0],this.nip2);
					}else if (this.action === "apply"){
							system.info(this,"Terima kasih atas partisipasi anda.<br>Lamaran Anda sudah masuk basis data kami","");
							this.inputlmrn=false;
							this.cekapply=false;							
					}else if (this.action === "daftar"){
						this.app.idplmr=this.nip.getText();
						this.app.karirlogin=true;
						this.app.userplmr=this.nama.getText();
						this.user.setText(this.nip.getText());
						this.user.setReadOnly(true);
						this.ePwd.setCaption("Status Login");
						this.ePwd.setReadOnly(true);
						this.ePwd.hide();
						this.blogin.setCaption("Logout");
						this.blogin.setTag("logout");
						this.karirMenu.addItems(["",""],["Edit Profil","Monitoring Lamaran"],["",""],["EProfil","MNTLMRN"]);
						this.standarLib.clearByTag(this, [0],this.nip);
					}
					this.action = "";
				}else alert(result,"");
			}
		}
		if (sender === this.file || sender === this.file2){
			if (methodName === "copyFileTo"){
				if (result.toLowerCase().search("fail") === -1)
					system.info(this,"Proccess Complete....","");
				else if (result === undefined) 
					alert("Proccess Complete....","");
			}
		}
	},
	doLogin : function(sender){
		try{
			if (sender == this.blogin){
				if (sender.getTag()==="login")
				{
					var data = this.dbLib.getDataProvider("select nip,nama,paswd from portal_pelamar where nip='"+this.user.getText()+"' and paswd='"+this.ePwd.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof(data) != "string"){
						if (data.rs.rows[0] !== undefined){
							data = data.rs.rows[0];
							if ((this.user.getText()===data.nip) && (this.ePwd.getText()===data.paswd)){
								this.pLogin.setCaption("Logout");
								this.app.karirlogin=true;
								this.app.idplmr=data.nip;
								this.app.userplmr=data.nama;
								this.user.setReadOnly(true);
								this.ePwd.setCaption("Status Login");								
								this.ePwd.setReadOnly(true);
								this.ePwd.hide();
								this.blogin.setCaption("Logout");
								this.blogin.setTag("logout");
								this.karirMenu.addItems(["","",""],["Lowongan","Edit Profil","Monitoring Lamaran"],
                                        ["Daftar lowongan yang ada","Form untuk mengedit biodata/profil","Form untuk memantau progres lamaran yang sudah Anda masukan"],
                                        ["Lowongan","EProfil","MNTLMRN"]);
								this.doChildItemsClick(this.karirMenu,"Lowongan");
							}else alert("Username or password is not correct");
						}else alert("Username or password is not correct");
					}else throw(data);
				}else{
					this.pLogin.setCaption("Login");
					this.app.karirlogin=false;
					this.app.idplmr="";
					this.app.userplmr="";
					this.user.setReadOnly(false);
					this.ePwd.setCaption("Password");
					this.ePwd.setText("");
					this.ePwd.setReadOnly(false);
					this.ePwd.show();
					this.blogin.setCaption("Login");
					this.blogin.setTag("login");
					if (this.p_tmp != undefined)
						this.p_tmp.free();
					this.detail.setCaption("");		
					this.karirMenu.addItems(["",""],["Lowongan","Registrasi"],["Daftar lowongan yang ada","Form daftar/registrasi sebelum melamar"],["Lowongan","Registrasi"]);
					this.doChildItemsClick(this.karirMenu,"Lowongan");
					this.cekapply=false;
				}
			}
		}catch(e){
			alert("app_frontend_alpa_transaksi_fTabToko::doLogin "+e);
		}
	},
	delTmpFile : function(){
		if (this.tmpFile !== ""){
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
		if (this.tmpFile2 !== ""){
			this.file2.deleteFile(this.tmpFile2);
			this.tmpFile2 = "";
		}
	},
	uploadFile: function(sender){
		if (sender===this.uploader2){
			if (this.tmpFile !== ""){
				var rootDir = this.file.getRootDir();										
				var separator = rootDir.charAt(rootDir.length-1);						
				this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
				this.file.deleteFile(this.tmpFile);
				this.tmpFile = "";
			}
		}
		if (sender===this.uploader){
			if (this.tmpFile2 !== ""){
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
			if (sender === this.uploader2){
				if (this.tmpFile !== ""){
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
			if (sender === this.uploader){
				if (this.tmpFile2 !== ""){			
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
			alert(e);
		}
	},
	keyDown: function(sender, keyCode, buttonState){
		if (keyCode === 13)
			this.doLogin(this.blogin);
	},
	doBtnClick: function(sender){
		this.action === sender.getTag();
		if (sender.getTag() === "apply"){			
			uses("server_util_arrayList");
			var data = this.dbLib.getDataProvider("select * from portal_pelamar where nip='"+this.app.idplmr+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof(data) != "string"){
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
						sql.add("insert into portal_pelamar_konten (nip,kode_konten,status,tanggal,kode_lokasi) values "+
							"('"+this.app.idplmr+"','"+this.idlwgn+"','P','"+(new Date()).getDateStr()+"','"+this.app._lokasi+"') ");
						this.dbLib.execArraySQL(sql);
						this.doChildItemsClick(this.karirMenu,"Lowongan");
					}else
					{
						system.alert(this,"Data Anda belum lengkap, silakan lengkapi dulu sebelum melamar!","");
						this.doChildItemsClick(this.karirMenu,"EProfil");						
					}
				}
			}
		}else if (sender.getTag() === "eprofil"){
			if (this.Pwd2.getText()===this.RPwd2.getText())
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
		}else if (sender.getTag() === "daftar"){
			if (this.Pwd.getText()===this.RPwd.getText())
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
