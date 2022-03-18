window.app_saku2_transaksi_kopeg_ppbs_fLoadOutLook = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fLoadOutLook.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_kopeg_ppbs_fLoadOutLook";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Anggaran,Realisasi dan Outlook (Thn Berjalan): Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun Berjalan",readOnly:true,tag:2});	
		this.c_bulan = new saiCB(this,{bound:[20,12,180,20],caption:"Bulan",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		this.bUpload = new portalui_uploader(this,{bound:[820,11,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,450],caption:"Data Anggaran,Realisasi dan Outlook"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
				colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Nilai RKA","Realisasi","Outlook"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,100,150,80,200,80]],
				colFormat:[[4,5,6,],[cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		this.c_tahun.items.clear();
		var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())-1 as tahun order by tahun desc",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.c_tahun.addItem(i,line.tahun);
			}
		}				
	    this.c_bulan.setText("07");	
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fLoadOutLook.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_ppbs_fLoadOutLook.implement({	
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
			this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,floatToNilai(line.rka),floatToNilai(line.realisasi),floatToNilai(line.outlook)]);
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
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																						
							sql.add("delete from agg_outlook where kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+this.c_tahun.getText()+"'");
							var line;							
							var dc = ""; var rka=realisasi=outlook=0;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];														
								rka = parseFloat(line.rka);
								realisasi = parseFloat(line.realisasi);
								outlook = parseFloat(line.outlook);
								sql.add("insert into agg_outlook(kode_lokasi,kode_akun,kode_pp,rka,realisasi,outlook,tahun,periode,p_max) values "+
										"('"+this.app._lokasi+"','"+line.kode_akun+"','"+this.cb_pp.getText()+"',"+rka+","+realisasi+","+outlook+",'"+this.c_tahun.getText()+"','"+this.c_tahun.getText()+this.c_bulan.getText()+"',0)");
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
