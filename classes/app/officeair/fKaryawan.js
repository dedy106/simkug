window.app_officeair_fKaryawan = function(owner,options){
	if (owner){
		try{
			window.app_officeair_fKaryawan.prototype.parent.constructor.call(this,owner,options);
			this.className  = "app_officeair_fKaryawan";			
			this.addStyle("border:2px solid #ffffff");	
			uses("portalui_uploader;portalui_saiCBB;portalui_saiCB;portalui_saiGrid;util_file;portalui_bevel");
			//---------------------- input
			this.pInput = new portalui_panel(this,{bound:[0,50,this.width - 20, this.height-90]});
			this.eEmail = new portalui_saiCBB(this.pInput,{bound:[10,30,300,20],caption:"<font color='#ffffff'>Email</font>",btnClick:[this,"FindBtnClick"],rightLabelVisible:false,btnRefreshClick:[this,"doRefresh"]});
			this.eNama = new portalui_saiLabelEdit(this.pInput,{bound:[10,31,500,20],caption:"<font color='#ffffff'>Nama</font>"});
			this.eAlamat = new portalui_saiLabelEdit(this.pInput,{bound:[10,32,500,20],caption:"<font color='#ffffff'>Alamat</font>"});
			this.ePwd = new portalui_saiLabelEdit(this.pInput,{bound:[10,31,300,20],caption:"<font color='#ffffff'>Password</font>",password:true});
			this.eJab = new portalui_saiCB(this.pInput,{bound:[10,33,300,20],items:["GM","Direktur","Kabag","Staf","Manager"],caption:"<font color='#ffffff'>Jabatan</font>"});
			this.eTelp = new portalui_saiLabelEdit(this.pInput,{bound:[10,34,300,20],caption:"<font color='#ffffff'>No Telepon</font>"});			
			this.eFoto = new portalui_saiLabelEdit(this.pInput,{bound:[10,35,300,20], caption:"<font color='#ffffff'>Foto</font>"});					
			this.uploader = new portalui_uploader(this.pInput,{bound:[329,35,80,20],param1:"uploadTo",param2:"classes/app/officeair/image/",afterUpload:[this,"doAfterUpload"],autoSubmit:true});			
			this.bDelLogo = new portalui_button(this.pInput,{bound:[420,35,80,20],caption:"Delete Logo",click:[this,"doClick"]});
			this.pInput.rearrangeChild(30,23);
			this.img1 = new portalui_image(this.pInput,{bound:[110,190,200,150]});			
			this.bevel1 = new portalui_bevel(this.pInput,{bound:[10,this.height - 130,this.width - 40,25]});
			this.bSave = new portalui_button(this.pInput,{bound:[20,this.height - 126,80,18],caption:"Simpan",click:[this,"doClick"]});
			this.bCancel = new portalui_button(this.pInput,{bound:[110,this.height - 126,80,18],caption:"Hapus",click:[this,"doClick"]});			
			this.pInput.hide();
			this.pInput.getCanvas().style.border = "";
			this.pInput.getCanvas().style.background="";
			//------------------------browse
			this.pBrowse = new portalui_panel(this,{bound:[0,50,this.width - 20, this.height-90]});
			this.bAdd = new portalui_button(this.pBrowse,{bound:[20,5,80,18],caption:"Add",click:[this,"doClick"]});
			this.sgData = new portalui_saiGrid(this.pBrowse,{bound:[10,30,this.width - 40,this.height - 130],colCount:6,colTitle:["Email","Nama","Alamat","Jabatan","No. Telp","Foto"],readOnly:true,
				colWidth:[[0,1,2,3,4,5],[250,350,250,100,100,100]], dblClick:[this,"doSGDblClick"]});
			this.pBrowse.getCanvas().style.border = "";
			this.pBrowse.getCanvas().style.background="";
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();	
			this.rootDir = this.fileUtil.getRootDir();
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);
			this.imgSblm = "";
			this.owner.createListData();
			
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 85,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
			this.reloadData();
		}catch(e){
			alert(e);
		}
	}
};
window.app_officeair_fKaryawan.extend(window.portalui_roundPanel);
window.app_officeair_fKaryawan.implement({
	doClick: function(sender){
		try{
			if (sender == this.bSave){	
				uses("server_util_arrayList");			
				var sql = new server_util_arrayList();				
				if (this.formEvent == "save"){
					sql.add("insert into off_karyawan(email, kode_lokasi, nama, alamat, jabatan, no_telp, foto)values"+
						"	('"+this.eEmail.getText()+"','"+window.dataLogin.office+"','"+this.eNama.getText()+"','"+this.eAlamat.getText()+"','"+this.eJab.getText()+"','"+this.eTelp.getText()+"','"+this.eFoto.getText()+"')");					
				}else {
					sql.add("update off_karyawan set nama = '"+this.eNama.getText()+"', alamat='"+this.eAlamat.getText()+"', jabatan='"+this.eJab.getText()+"', no_telp='"+this.eTelp.getText()+"', foto='"+this.eFoto.getText()+"' "+
						"	where email = '"+this.eEmail.getText()+"' ");					
				}
				var data = this.dbLib.getDataProvider("select email from off_user where email ='"+this.eEmail.getText()+"' ",true);
				if (typeof data != "string"){
					if (data.rs.rows[0] == undefined)
						sql.add("insert into off_user (email, nama, kode_lokasi, pwd)values('"+this.eEmail.getText()+"','"+this.eNama.getText()+"','"+window.dataLogin.office+"','"+this.ePwd.getText()+"')");
					else sql.add("update off_user set kode_lokasi = '"+window.dataLogin.office+"',pwd='"+this.ePwd.getText()+"' where email = '"+this.eEmail.getText()+"'");
				}
				this.dbLib.execArraySQL(sql);
			}else if (sender == this.bDelLogo){				
				this.fileUtil.deleteFile(this.rootDir +"/"+ this.imgSblm);
				this.eFoto.setText("-");
				this.img1.setImage("");
			}else if (sender == this.bClose || sender == this.bMin){
				this.hide();
			}else if (sender == this.bAdd){
				this.pInput.show();
				this.pBrowse.hide();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doAfterUpload: function(sender, result, data, filename){
		this.fileUtil.deleteFile(this.rootDir +"/"+ this.imgSblm);	
		this.eFoto.setText(data);
		this.img1.setImage("classes/app/officeair/image/"+ data);
		this.imgSblm = "classes/app/officeair/image/"+ data;
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.pInput.hide();
						this.pBrowse.show();
						this.reloadData();
					}else systemAPI.alert(e);
					break;
			}
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.eEmail){
			this.standarLib.showListData(this,"Data Karyawan",sender, this.eNama,
				"select email, nama from off_karyawan where kode_lokasi = '"+window.dataLogin.office+"' ",
				"select count(*) as tot from off_karyawan where kode_lokasi = '"+window.dataLogin.office+"' ",
				["email","nama"],"and",["Email","Nama"],false);
		}
	},
	doRefresh: function(sender){		
		var data = this.dbLib.getDataProvider("select a.alamat, a.no_telp,  a.jabatan, a.foto, b.pwd from off_karyawan a left outer join off_user b on b.email = a.email where a.email = '"+sender.getText()+"' ",true);
		if (typeof data != "string"){
			if (data.rs.rows[0] != undefined){
				this.eAlamat.setText(data.rs.rows[0].alamat);
				this.eJab.setText(data.rs.rows[0].jabatan);
				this.eTelp.setText(data.rs.rows[0].no_telp);
				this.eFoto.setText(data.rs.rows[0].foto);
				this.ePwd.setText(data.rs.rows[0].pwd);
				this.formEvent = "edit";				
			}else {
				this.formEvent = "save";
			}
		}else systemAPI.alert(data);
	},
	doSGDblClick: function(sender, col, row){
		var email = this.sgData.cells(0,row);
		this.eEmail.setText(email);
		this.eNama.setText(this.sgData.cells(1,row));
		var data = this.dbLib.getDataProvider("select a.alamat, a.no_telp,  a.jabatan, a.foto, b.pwd from off_karyawan a left outer join off_user b on b.email = a.email where a.email = '"+email+"' ",true);
		if (typeof data != "string"){
			if (data.rs.rows[0] != undefined){
				this.eAlamat.setText(data.rs.rows[0].alamat);
				this.eJab.setText(data.rs.rows[0].jabatan);
				this.eTelp.setText(data.rs.rows[0].no_telp);
				this.eFoto.setText(data.rs.rows[0].foto);
				this.ePwd.setText(data.rs.rows[0].pwd);
				this.imgSblm = "classes/app/officeair/image/"+ data.rs.rows[0].foto;
				this.img1.setImage(this.imgSblm);
				this.formEvent = "edit";				
			}else {
				this.formEvent = "save";
			}
			this.pInput.show();
			this.pBrowse.hide();
		}else systemAPI.alert(data);
		
	},
	reloadData: function(){
		this.sgData.clear();
		var data = this.dbLib.getDataProvider("select email, nama, alamat, jabatan, no_telp, foto from off_karyawan where kode_lokasi ='"+window.dataLogin.office+"' ",true);			
		if (typeof data != "string"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				this.sgData.appendData([line.email,line.nama, line.alamat, line.jabatan, line.no_telp, line.foto]);
			}
		}
	},
	show: function(){
		window.app_officeair_fKaryawan.prototype.parent.show.call(this);
		this.pInput.hide();
		this.pBrowse.show();
		this.reloadData();
	}
});