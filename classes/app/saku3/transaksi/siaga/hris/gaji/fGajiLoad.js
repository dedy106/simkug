window.app_saku3_transaksi_siaga_hris_gaji_fGajiLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fGajiLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_hris_gaji_fGajiLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji Variable: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Load",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.e_total = new saiLabelEdit(this,{bound:[710,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.pc2 = new pageControl(this,{bound:[20,11,890,390], childPage:["Data Parameter","Data Validasi"]});		
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
				colTitle:["NIK","Nama","Kode Param","Nama Parameter","DC","Nilai"],
				colWidth:[[5,4,3,2,1,0],[190,60,200,100,200,100]],
				colFormat:[[5],[cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,
		        afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});	

		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		setTipeButton(tbAllFalse);	
		this.stsSimpan = 1;
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fGajiLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fGajiLoad.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();		
			this.doValid();

			var tot = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(5,i) != "") {
					tot += nilaiToFloat(this.sg1.cells(5,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));

		} catch(e) {alert(e);}
	},
	doValid: function() {
		this.inValid = false;	
		
		for (var j=0; j < this.sg1.getRowCount();j++){
			if (this.sg1.cells(4,j).toUpperCase() != "D" && this.sg1.cells(4,j).toUpperCase() != "C") {
				this.sg1.cells(4,j,"INVALID||"+this.sg1.cells(4,j));
				this.inValid = true;
			}												
		}
		
		var strSQL = "select nik from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'";			
		var dataTmp = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
			this.dataNIK = dataTmp;
		}							
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(0,i,"INVALID||"+this.sg1.cells(0,i));
			for (var j=0;j < this.dataNIK.rs.rows.length;j++){
				if (this.sg1.cells(0,i).substr(9,10) == this.dataNIK.rs.rows[j].nik) {
					this.sg1.cells(0,i,this.sg1.cells(0,i).substr(9,10));				
				}
			}	
			if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;									
		}
		
		var strSQL = "select kode_param from gr_gaji_param where flag_rutin ='0' and kode_lokasi='"+this.app._lokasi+"'";					
		var dataTmp = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataTmp == "object" && dataTmp.rs.rows[0] != undefined){
			this.dataParam = dataTmp;
		}					
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(2,i,"INVALID||"+this.sg1.cells(2,i));
			for (var j=0;j < this.dataParam.rs.rows.length;j++){								
				if (this.sg1.cells(2,i).substr(9,10) == this.dataParam.rs.rows[j].kode_param) {					
					this.sg1.cells(2,i,this.sg1.cells(2,i).substr(9,10));				
				}			
			}	
			if (this.sg1.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;									
		}
		
		if (this.inValid == false) setTipeButton(tbSimpan);	
		else {
			this.pc2.setActivePage(this.pc2.childPage[1]);	
			this.sg2.clear();
			for (var i=0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.cells(2,i).substr(0,7) == "INVALID" || this.sg1.cells(0,i).substr(0,7) == "INVALID" || this.sg1.cells(4,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j]);						
				}
			}
		}

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
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajiload_m","no_load",this.app._lokasi+"-GJV"+this.e_periode.getText().substr(2,4)+".","000"));
							
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							sql.add("delete from gr_gajiload_m where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='GAJIVAR'");
							sql.add("delete from gr_gajiload_d where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='GAJIVAR'");
							
							sql.add("insert into gr_gajiload_m(no_load, kode_lokasi, tanggal, periode, keterangan, tgl_input, nik_user, flag_form) values"+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','GAJIVAR')");
							
							if (this.sg1.getRowValidCount() > 0){
								for (var i=0;i < this.sg1.getRowCount();i++){
									if (this.sg1.rowValid(i)){
										sql.add("insert into gr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
											" ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(5,i))+",'"+this.e_periode.getText()+"','GAJIVAR')");
									}
								}
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
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gajiload_m","no_load",this.app._lokasi+"-GJV"+this.e_periode.getText().substr(2,4)+".","000"));
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
