window.app_saku2_transaksi_yks_fLoadKunjCS = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fLoadKunjCS.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_fLoadKunjCS";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Billing Kunjungan - CS : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_kunj = new saiLabelEdit(this,{bound:[702,12,220,20],caption:"Nilai Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_data = new saiCBBL(this,{bound:[20,17,222,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});
		this.e_cs = new saiLabelEdit(this,{bound:[702,17,220,20],caption:"Nilai Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});
		this.bUpload = new portalui_uploader(this,{bound:[820,14,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,344],caption:"Data Bill Pengobatan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:15,tag:9,
				colTitle:["No Ref","NIK","Nama","Loker","Band","NIKKES","Nama Pasien","Dokter","Tanggal","Kode Biaya","Kunj Umum","Kunj Gigi","Kunj KB/KIA","Kunj MatKes","Nilai CS"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [80,80,80,80,80,  70,70,70,100,70,70,70,100,70,100]],
				colFormat:[[10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();		
		this.lastDataHR = "";
		this.cb_data.onChange.set(this, "doEditChange");		
		
	}
};
window.app_saku2_transaksi_yks_fLoadKunjCS.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_fLoadKunjCS.implement({
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
			var line;
			var tot = kunj = cs = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				kunj += parseFloat(line.umum)+parseFloat(line.gigi)+parseFloat(line.kbia)+parseFloat(line.matkes);
				cs += parseFloat(line.cs);
			}						
			this.e_kunj.setText(floatToNilai(kunj));
			this.e_cs.setText(floatToNilai(cs));
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
			this.sg1.appendData([line.no_ref,line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.kode_biaya,  
			                     floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs)]);
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
					// cek mitra,cek produk,cek nik,cek loker					
					var data = this.dbLib.getDataProvider("select kode_produk from yk_kunj",true);
					if (typeof data == "object"){
						this.dataJU = data;
						dataBiaya = new arrayMap();
						for (var i in this.dataJU.rs.rows){
							line = this.dataJU.rs.rows[i];
							dataBiaya.set(line.kode_produk, line);
						}
					} 						
					var page = 1;
					this.dataNIK = new arrayMap();
					var data = this.dbLib.getDataProvider("select count(nik) as tot from yk_peserta_d where no_load='"+this.cb_data.getText()+"'", true);
					if (typeof data != "string") totPage = Math.ceil(data.rs.rows[0].tot / 20000);
					for (var page=1; page <= totPage; page++){  
						var data = this.dbLib.getDataProviderPage("select nik from yk_peserta_d where no_load='"+this.cb_data.getText()+"'",page, 20000, true);			
						if (typeof data == "object"){
							this.dataJU = data;			
							for (var i in this.dataJU.rs.rows){
								line = this.dataJU.rs.rows[i];
								this.dataNIK.set(line.nik, line);
							}
						}
					}
					
					var kode_biaya = ""; var nilai = 0;
					for (var j=0; j < this.dataUpload.rows.length;j++){
						line1 = this.dataUpload.rows[j];													
						kode_biaya = line1.kode_biaya;
						if (dataBiaya.get(kode_biaya) == undefined) {
							system.alert(this,"Transaksi tidak valid.","Kode Biaya tidak terdaftar. [kode "+kode_biaya+" - "+(j+2).toString()+"]");
							setTipeButton(tbSimpan);
							return false;						
						}							
						if (this.dataNIK.get(line1.nik) == undefined) {							
							system.alert(this,"Transaksi tidak valid.","NIK tidak terdaftar. [kode "+line1.nik+" - "+(j+2).toString()+"]");
							setTipeButton(tbSimpan);
							return false;						
						}						
					}			
					
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_billkunj_m','no_bill',this.app._lokasi+"-KUNJ"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							
							sql.add("insert into yk_billkunj_m(no_bill,kode_lokasi,periode,tanggal,keterangan,progress,nik_user,tgl_input,total_kunj,total_cs,no_load,no_valid) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','0','"+this.app._userLog+"',getdate(),"+parseNilai(this.e_kunj.getText())+","+parseNilai(this.e_cs.getText())+",'"+this.cb_data.getText()+"','-')");
							var line;
							var nilai = n_kunj = n_cs = 0;
							var kode_biaya = "";
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																
								sql.add("insert into yk_billkunj_d(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai) values "+
										"	('"+this.e_nb.getText()+"',"+i+",'"+this.app._lokasi+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.tgl_masuk+"','"+line.kode_biaya+"','-','-','-','-','"+this.e_periode.getText()+"',"+line.umum+","+line.gigi+","+line.kbia+","+line.matkes+","+line.cs+",'-','-','0','KUNJ','-')");
							}		
							sql.add("update a set a.loker=b.loker "+
									"from yk_billkunj_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
									"where a.no_bill ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_billkunj_m','no_bill',this.app._lokasi+"-KUNJ"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.cb_data.setFocus();
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
