window.app_frigia_transaksi_gaji_fGajiLoad = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_gaji_fGajiLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_frigia_transaksi_gaji_fGajiLoad";
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
		this.cb_param = new saiCBBL(this,{bound:[20,11,200,20],caption:"Parameter Gaji", multiSelection:false, maxLength:10, tag:2});									
		this.bUpload = new portalui_uploader(this,{bound:[720,11,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
								
		this.pc1 = new pageControl(this,{bound:[20,20,800,350], childPage:["Data Variable Gaji Hasil Load","Pesan Kesalahan"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:0,
				colTitle:["NIK","D/C","Nilai"],
				colWidth:[[2,1,0],[150,50,80]],
				colFormat:[[2],[cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[10,10,490,280],labelWidth:0,tag:9,readOnly:true});
		

		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);		
		setTipeButton(tbSimpan);	

		this.cb_param.setSQL("select kode_param,nama from fri_gaji_param where jenis = 'L' and kode_lokasi='"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Parameter",true);
	}
};
window.app_frigia_transaksi_gaji_fGajiLoad.extend(window.portalui_childForm);
window.app_frigia_transaksi_gaji_fGajiLoad.implement({
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
			this.sg1.appendData([line.nik, line.dc, parseFloat(line.nilai)]);
		}
		this.sg1.setNoUrut(start);
		
		var data = this.dbLib.getDataProvider("select nik from karyawan ",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataNIK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataNIK.set(line.nik, line);
			}
		}
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
					this.doClick();
				}
				break;
			case "simpan" :			
					if (this.err == "1") {						
						system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
						return false;
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							this.doClick();
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							sql.add("delete from fri_gajiload_m where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='GAJI'");
							sql.add("delete from fri_gajiload_d where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_form='GAJI'");
							
							sql.add("insert into fri_gajiload_m(no_load, kode_lokasi, tanggal, periode, keterangan, tgl_input, nik_user, flag_form)"+
									"                    values('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','GAJI')");
							var line;												
							for (var i in this.dataUpload.rows){
								line = this.dataUpload.rows[i];
								sql.add("insert into fri_gajiload_d(no_load,kode_lokasi,nik,kode_param,dc,nilai,periode,flag_form) values "+
									" ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.nik+"','"+this.cb_param.getText()+"','"+line.dc+"',"+line.nilai+",'"+this.e_periode.getText()+"','GAJI')");
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
		this.doClick();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_gajiload_m","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","000"));
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
