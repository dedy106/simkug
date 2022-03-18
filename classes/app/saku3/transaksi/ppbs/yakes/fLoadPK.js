window.app_saku3_transaksi_ppbs_yakes_fLoadPK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadPK.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadPK";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rencana Kerja Manajemen: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.bUpload = new portalui_uploader(this,{bound:[820,10,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,450],caption:"Data Rencana Kerja Manajemen"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:0,
				colTitle:["Kode PS","Program Strategis","Kode SubPS","Sub Program Strategis","Kode SubSubPS","Sub Sub Program Strategis","Kode PK","Program Kerja","Kode DRK","Nama Kegiatan","Rincian Kegiatan","Kode Akun","Prioritas","Keterangan","Status","Kode SubPK","Nama SubPK"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,100,70,80,150,150,60,150,60,150,90,150,80,150,60]],readOnly:true, defaultRow:1});		
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
window.app_saku3_transaksi_ppbs_yakes_fLoadPK.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadPK.implement({
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
			this.sg1.appendData([line.kode_ps,line.nama_ps,line.kode_subps,line.nama_subps,line.kode_subsubps,line.nama_subsubps,line.kode_pk,line.nama_pk,line.kode_drk,line.nama_drk,line.kegiatan,line.kode_akun,line.prioritas,line.keterangan,line.status,line.kode_subpk,line.kode_subpk]);
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
					/*
					var data = this.dbLib.getDataProvider("select kode_akun from masakun where kode_lokasi='"+this.app._lokasi+"'",true);					
					if (typeof data == "object"){
						this.dataJU = data;
						dataAkun = new arrayMap();
						for (var i in this.dataJU.rs.rows){
							line = this.dataJU.rs.rows[i];
							dataAkun.set(line.kode_akun, line);
						}
					}
					for (var j=0; j < this.dataUpload.rows.length;j++){
						line1 = this.dataUpload.rows[j];																		
						if (dataAkun.get(line1.kode_akun) == undefined) {
							system.alert(this,"Transaksi tidak valid.","Kode Akun tidak terdaftar. [kode "+line1.kode_akun+"]");
							return false;						
						}												
					}
					*/
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							
							sql.add("delete from agg_rkm where tahun ='"+this.e_tahun.getText()+"' ");
							sql.add("delete from agg_pk where tahun ='"+this.e_tahun.getText()+"' ");
							sql.add("delete from agg_drk where tahun ='"+this.e_tahun.getText()+"' ");
							sql.add("delete from agg_ps where tahun ='"+this.e_tahun.getText()+"' ");
							sql.add("delete from agg_subps where tahun ='"+this.e_tahun.getText()+"' ");
							sql.add("delete from agg_subsubps where tahun ='"+this.e_tahun.getText()+"' ");
							
							var line;							
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																
								sql.add("insert into agg_rkm(kode_ps,nama_ps,kode_subps,nama_subps,kode_subsubps,nama_subsubps,kode_pk,nama_pk,kode_drk,nama_drk,kegiatan,kode_akun,tahun,nu,prioritas,keterangan,status,kode_subpk,nama_subpk) values "+
										"('"+line.kode_ps+"','"+line.nama_ps+"','"+line.kode_subps+"','"+line.nama_subps+"','"+line.kode_subsubps+"','"+line.nama_subsubps+"','"+line.kode_pk+"','"+line.nama_pk+"','"+line.kode_drk+"','"+line.nama_drk+"','"+line.kegiatan+"','"+line.kode_akun+"','"+this.e_tahun.getText()+"',"+i+",'"+line.prioritas+"','"+line.keterangan+"','"+line.status+"','"+line.kode_subpk+"','"+line.nama_subpk+"')"); 
									
							}	
													
							
							sql.add("insert into agg_pk (kode_pk,nama,tahun) select distinct kode_pk,nama_pk,tahun from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("insert into agg_drk (kode_drk,kode_pk,nama,tahun,tf_aktif)  select distinct kode_drk,kode_pk,nama_drk,tahun,'1' from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("insert into agg_ps (kode_ps,nama,tahun) select distinct kode_ps,nama_ps,tahun from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("insert into agg_subps (kode_subps,kode_ps,nama,tahun) select distinct kode_subps,kode_ps,nama_subps,tahun from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");
							sql.add("insert into agg_subsubps (kode_subsubps,kode_subps,nama,tahun) select distinct kode_subsubps,kode_subps,nama_subsubps,tahun from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");							
							
							sql.add("insert into agg_subpk (kode_subpk,kode_pk,nama,tahun) select distinct kode_subpk,kode_pk,nama_subpk,tahun from agg_rkm where tahun = '"+this.e_tahun.getText()+"'");							
							
							
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
