window.app_officeair_fOffice = function(owner,options){
	if (owner){
		try{
			window.app_officeair_fOffice.prototype.parent.constructor.call(this,owner,options);
			this.className  = "app_officeair_fOffice";			
			this.addStyle("border:2px solid #ffffff");
			uses("portalui_uploader;util_file;portalui_bevel");			
			this.eKantor = new portalui_saiLabelEdit(this,{bound:[10,50,300,20],caption:"<font color='#ffffff'>Nama Kantor</font>"});
			this.eAlamat = new portalui_saiLabelEdit(this, {bound:[10,31,600,20],caption:"<font color='#ffffff'>Alamat</font>"});
			this.eKodePos = new  portalui_saiLabelEdit(this,{bound:[10,32,200,20],caption:"<font color='#ffffff'>Kode Pos</font>"});
			this.eTelp = new portalui_saiLabelEdit(this,{bound:[10,33,300,20],caption:"<font color='#ffffff'>No Telp</font>"});
			this.eLogo = new portalui_saiLabelEdit(this,{bound:[10,34,300,20],caption:"<font color='#ffffff'>Logo</font>"});			
			this.uploader = new portalui_uploader(this,{bound:[329,34,80,20],param1:"uploadTo",param2:"classes/app/officeair/image/",afterUpload:[this,"doAfterUpload"],autoSubmit:true});			
			this.bDelLogo = new portalui_button(this,{bound:[420,34,80,20],caption:"Delete Logo",click:[this,"doClick"]});
			this.rearrangeChild(50,23);			
			this.img1 = new portalui_image(this,{bound:[110,150,200,150]});			
			this.bevel1 = new portalui_bevel(this,{bound:[10,this.height - 60,this.width - 40,25]});
			this.bSave = new portalui_button(this,{bound:[20,this.height - 56,80,18],caption:"Simpan",click:[this,"doClick"]});
			this.bCancel = new portalui_button(this,{bound:[110,this.height - 56,80,18],caption:"Hapus",click:[this,"doClick"]});			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.fileUtil = new util_file();			
			this.rootDir = this.fileUtil.getRootDir();
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
			this.imgSblm = "";
			if (window.dataLogin.office == "new Office" || window.dataLogin.office == "-"){
				this.formEvent = "save";
			}else{
				var data = this.dbLib.getDataProvider("select * from off_lokasi where kode_lokasi = '"+window.dataLogin.office+"' ",true);
				if (typeof data != "string"){
					if (data.rs.rows[0] !== undefined){
						this.eKantor.setText(data.rs.rows[0].nama);
						this.eAlamat.setText(data.rs.rows[0].alamat);
						this.eKodePos.setText(data.rs.rows[0].kode_pos);
						this.eTelp.setText(data.rs.rows[0].no_telp);
						this.eLogo.setText(data.rs.rows[0].logo);
						this.imgSblm = "classes/app/officeair/image/"+ data.rs.rows[0].logo;
						this.formEvent = "edit";
						this.img1.setImage(this.imgSblm);
					}					
				}else systemAPI.alert(data);
			}
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 85,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
		}catch(e){
			alert(e);
		}
	}
};
window.app_officeair_fOffice.extend(window.portalui_roundPanel);
window.app_officeair_fOffice.implement({
	doClick: function(sender){
		if (sender == this.bSave){	
			uses("server_util_arrayList");
			var kdLokasi = this.standarLib.noBuktiOtomatis(this.dbLib, "off_lokasi", "kode_lokasi","","00000");
			var sql = new server_util_arrayList();
			if (this.formEvent == "save"){
				sql.add("insert into off_lokasi(kode_lokasi, nama, alamat, kode_pos, no_telp, logo)values"+
					"	('"+kdLokasi+"','"+this.eKantor.getText()+"','"+this.eAlamat.getText()+"','"+this.eKodePos.getText()+"','"+this.eTelp.getText()+"','"+this.eLogo.getText()+"')");
				sql.add("update off_user set kode_lokasi = '"+kdLokasi+"' where email = '"+window.dataLogin.email+"'");
				this.kdLokasi = kdLokasi;
			}else {
				sql.add("update off_lokasi set nama = '"+this.eKantor.getText()+"', alamat='"+this.eAlamat.getText()+"', kode_pos='"+this.eKodePos.getText()+"', no_telp='"+this.eTelp.getText()+"', logo='"+this.eLogo.getText()+"' "+
				"	where kode_lokasi = '"+window.dataLogin.office+"' ");
				this.kdLokasi = window.dataLogin.office;
			}
			this.dbLib.execArraySQL(sql);
		}else if (sender == this.bDelLogo){				
			this.fileUtil.deleteFile(this.rootDir +"/"+ this.imgSblm);
			this.eLogo.setText("-");
			this.img1.setImage("");
		}else if (sender == this.bClose || sender == this.bMin){
			this.hide();			
		}
	},
	doAfterUpload: function(sender, result, data, filename){
		alert(filename);
		this.fileUtil.deleteFile(this.rootDir +"/"+ this.imgSblm);	
		this.eLogo.setText(data);
		this.img1.setImage("classes/app/officeair/image/"+ data);
		this.imgSblm = "classes/app/officeair/image/"+ data;
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.imgSblm = "";
						this.hide();
						this.formEvent = "edit";
						window.dataLogin.office = this.kdLokasi;
					}else systemAPI.alert(e);
					break;
			}
		}
	}
});