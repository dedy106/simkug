window.app_saku2_transaksi_anggaran_fLoadTpkk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadTpkk.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadTpkk";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Dokter TPKK: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.bUpload = new portalui_uploader(this,{bound:[640,10,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,700,520],caption:"Data Dokter TPKK"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,								
				colTitle:["Kode","Nama","Keterangan","Band","Kode PP","Volume","Status"],
				colWidth:[[6,5,4,3,2,1,0],[60,60,60,60,160,150,70]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
				
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);		
	}
};
window.app_saku2_transaksi_anggaran_fLoadTpkk.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadTpkk.implement({
	doEditChange: function(sender){
		if (this.lastDataHR != this.cb_data.getText()){
			this.lastDataHR = this.cb_data.getText();			
		}
	},
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;									
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.kode_dokter,line.nama,line.keterangan,line.band,line.kode_pp,line.volume,line.status]);
		}
		this.sg1.setNoUrut(start);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :		
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
						return false;
					}
					var data = this.dbLib.getDataProvider("select kode_pp from pp where flag_aktif='1' and initial='TPKK' and kode_lokasi='"+this.app._lokasi+"'",true);					
					if (typeof data == "object"){
						this.dataJU = data;
						dataPP = new arrayMap();
						for (var i in this.dataJU.rs.rows){
							line = this.dataJU.rs.rows[i];
							dataPP.set(line.kode_pp, line);
						}
					}
					for (var j=0; j < this.dataUpload.rows.length;j++){
						line1 = this.dataUpload.rows[j];																
						if (dataPP.get(line1.kode_pp) == undefined) {
							system.alert(this,"Transaksi tidak valid.","PP TPKK tidak terdaftar. [kode "+line1.kode_pp+"]");
							return false;						
						}
						if (line1.status != "T" && line1.status != "E") {
							system.alert(this,"Transaksi tidak valid.","Status tidak terdaftar [E=Lama,T=Baru]. [status "+line1.status+"]");
							return false;						
						}
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{								
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							sql.add("delete from agg_dokter where tahun ='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							var line;														
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];												
								sql.add("insert into agg_dokter(kode_dokter,kode_lokasi,tahun,nama,keterangan,kode_band,kode_pp,volume,status) values "+
										"('"+line.kode_dokter+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.nama+"','"+line.keterangan+"','"+line.band+"','"+line.kode_pp+"',"+line.volume+",'"+line.status+"')");
							}												
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbSimpan);
						}
					}
				break;
		}
	},	
	doChange:function(sender){
		if (sender == this.e_tahun && this.e_tahun.getText()!="") {
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}	
});
