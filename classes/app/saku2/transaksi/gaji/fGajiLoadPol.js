window.app_saku2_transaksi_gaji_fGajiLoadPol = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fGajiLoadPol.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_gaji_fGajiLoadPol";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Variable Gaji : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.bUpload = new portalui_uploader(this,{bound:[520,14,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.e_total = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,370], childPage:["Data Variable Gaji Hasil Load","Pesan Kesalahan"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:26,tag:0,			
				colTitle:["NIK",   "RPGD","RAPL","RPTP","TLBR","TPKS","TTHR","TPRS","TRET","PCIT","PGAJ",
				                   "PINF","PKOP","PKOS","PLIN","PMAS","PWAK","PYUD","PZAK","CUTI",
								   "PTGD","PTTD","PTTP","PTLL","PJMS","TJMS"],
				colWidth:[[25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]],
				colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
				          [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
						   cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
						   cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
						  readOnly:true, pasteEnable:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[10,10,490,280],labelWidth:0,tag:9,readOnly:true});
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.rearrangeChild(10,23);		
		setTipeButton(tbSimpan);	
		
		this.e_memo.setReadOnly(true);
		
		var data = this.dbLib.getDataProvider("select nik from hr_karyawan where kode_lokasi='"+this.app._lokasi+"' ",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataNIK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataNIK.set(line.nik, line);
			}
		}
	}
};
window.app_saku2_transaksi_gaji_fGajiLoadPol.extend(window.portalui_childForm);
window.app_saku2_transaksi_gaji_fGajiLoadPol.implement({
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
			
			var line2;
			var tot = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line2 = this.dataUpload.rows[i];				
				tot += parseFloat(line2.rpgd) + parseFloat(line2.rapl) + parseFloat(line2.rptp) + parseFloat(line2.tlbr) + parseFloat(line2.tpks) + parseFloat(line2.tthr) + parseFloat(line2.tprs) + parseFloat(line2.tret) + parseFloat(line2.pcit) + parseFloat(line2.pgaj) + parseFloat(line2.pinf) + parseFloat(line2.pkop) + parseFloat(line2.pkos) + parseFloat(line2.plin) + parseFloat(line2.pmas) + parseFloat(line2.pwak) + parseFloat(line2.pyud) + parseFloat(line2.pzak) + parseFloat(line2.cuti) + parseFloat(line2.ptgd) + parseFloat(line2.pttd) + parseFloat(line2.pttp) + parseFloat(line2.ptll) + parseFloat(line2.pjms) + parseFloat(line2.tjms);
			}						
			this.e_total.setText(floatToNilai(tot));
			
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
			this.sg1.appendData([line.nik,floatToNilai(line.rpgd),floatToNilai(line.rapl),floatToNilai(line.rptp),floatToNilai(line.tlbr),floatToNilai(line.tpks),floatToNilai(line.tthr),floatToNilai(line.tprs),floatToNilai(line.tret),floatToNilai(line.pcit),floatToNilai(line.pgaj),floatToNilai(line.pinf),floatToNilai(line.pkop),floatToNilai(line.pkos),floatToNilai(line.plin),floatToNilai(line.pmas),floatToNilai(line.pwak),floatToNilai(line.pyud),floatToNilai(line.pzak),floatToNilai(line.cuti),floatToNilai(line.ptgd),floatToNilai(line.pttd),floatToNilai(line.pttp),floatToNilai(line.ptll),floatToNilai(line.pjms),floatToNilai(line.tjms)]);			
		}		
		this.sg1.setNoUrut(start);
		
		this.err = "0";
		var msg  = "";
		for (var j=0; j < this.dataUpload.rows.length;j++){
			line1 = this.dataUpload.rows[j];
			if (dataNIK.get(line1.nik) == undefined) {
				this.err = "1";
				msg+= "NIK tidak terdaftar. [kode : "+line1.nik+"]\n";				
			}
		}		
		if (this.err == "1") {				
			this.e_memo.setText(msg);
			system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");			
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
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
				}
				break;
			case "simpan" :			
					if (this.err == "1") {						
						system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
						return false;
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							this.doClick(this.i_gen);
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																			
							sql.add("insert into hr_gajiload_m(no_load, kode_lokasi, tanggal, periode, keterangan, tgl_input, nik_user, flag_form)"+
									" values('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','GAJI')");
							var line;												
							for (var i in this.dataUpload.rows){
								line = this.dataUpload.rows[i];																								
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','RPGD','D',"+line.rpgd+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','RAPL','D',"+line.rapl+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','RPTP','D',"+line.rptp+",'"+this.e_periode.getText()+"','GAJI')");															
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TLBR','D',"+line.tlbr+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TPKS','D',"+line.tpks+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TTHR','D',"+line.tthr+",'"+this.e_periode.getText()+"','GAJI')");							
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TPRS','D',"+line.tprs+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TRET','D',"+line.tret+",'"+this.e_periode.getText()+"','GAJI')");																		
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PCIT','C',"+line.pcit+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PGAJ','C',"+line.pgaj+",'"+this.e_periode.getText()+"','GAJI')");		
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PINF','C',"+line.pinf+",'"+this.e_periode.getText()+"','GAJI')");										
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PKOP','C',"+line.pkop+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PKOS','C',"+line.pkos+",'"+this.e_periode.getText()+"','GAJI')");		
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PLIN','C',"+line.plin+",'"+this.e_periode.getText()+"','GAJI')");																				
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PMAS','C',"+line.pmas+",'"+this.e_periode.getText()+"','GAJI')");								
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PWAK','C',"+line.pwak+",'"+this.e_periode.getText()+"','GAJI')");											
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PYUD','C',"+line.pyud+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PZAK','C',"+line.pzak+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','CUTI','D',"+line.cuti+",'"+this.e_periode.getText()+"','GAJI')");																			
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PTGD','C',"+line.ptgd+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PTTD','C',"+line.pttd+",'"+this.e_periode.getText()+"','GAJI')");																
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PTTP','C',"+line.pttp+",'"+this.e_periode.getText()+"','GAJI')");
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PTLL','C',"+line.ptll+",'"+this.e_periode.getText()+"','GAJI')");								
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','PJMS','C',"+line.pjms+",'"+this.e_periode.getText()+"','GAJI')");								
								sql.add("insert into hr_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									    " ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','TJMS','D',"+line.tjms+",'"+this.e_periode.getText()+"','GAJI')");								
							}
							sql.add("update a set a.nilai = b.nilai from hr_gaji_nik a inner join hr_gajiload_d b on a.nik=b.nik and a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi where b.no_load='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gajiload_m","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","000"));
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
