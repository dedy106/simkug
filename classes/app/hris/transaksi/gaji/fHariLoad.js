window.app_hris_transaksi_gaji_fHariLoad = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_gaji_fHariLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_hris_transaksi_gaji_fHariLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hari Kerja : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,350,20],caption:"Keterangan", maxLength:150});		
		this.bUpload = new portalui_uploader(this,{bound:[520,14,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,600,400],caption:"Data Variable Hari Kerja Hasil Load"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,600,350],colCount:5,
				colTitle:["NIK","Nama","Jml Hari Kerja","Tgl Awal","Tgl Akhir"],
				colWidth:[[4,3,2,1,0],[80,80,100,200,100]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,375,600,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);				
	}
};
window.app_hris_transaksi_gaji_fHariLoad.extend(window.portalui_childForm);
window.app_hris_transaksi_gaji_fHariLoad.implement({
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
			this.sg1.appendData([line.nik, line.nama, parseFloat(line.hari), line.tgl_awal, line.tgl_akhir]);
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
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajiload_m","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","000"));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							sql.add("delete from gr_gajiload_m where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='HARI'");
							sql.add("delete from gr_gajiload_d where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='HARI'");
							
							sql.add("insert into gr_gajiload_m(no_load, kode_lokasi, tanggal, periode, keterangan, tgl_input, nik_user, flag_form)"+
									"                   values('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','HARI')");
							var line;												
							for (var i in this.dataUpload.rows){
								line = this.dataUpload.rows[i];
								sql.add("insert into gr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form,tgl_awal,tgl_akhir) values "+
									" ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','-','-',"+line.hari+",'"+this.e_periode.getText()+"','HARI','"+line.tgl_awal+"','"+line.tgl_akhir+"')");
							}
							setTipeButton(tbAllFalse);								
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajiload_m","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
