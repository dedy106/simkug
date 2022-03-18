window.app_saku3_transaksi_yakes21_bpjs_fKlaim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bpjs_fKlaim.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yakes21_bpjs_fKlaim";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Klaim BPJS", 0);	
		
		this.maximize();		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);			
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Klaim","List Klaim"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
		            colTitle:["No Bill","Tanggal","Jenis","No Invoice","Deskripsi","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,250,100,70,70,100]],colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Billing",click:[this,"doLoad3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Klaim", readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Tot Tagih Awal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis Load",items:["BPJS"], readOnly:true, tag:2});								
		this.e_claim = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Tot. Claim", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_selisih = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,20],caption:"Tot. Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bUpload = new portalui_uploader(this.pc2.childPage[0],{bound:[560,18,80,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.bValid = new button(this.pc2.childPage[0],{bound:[660,18,80,18],caption:"Validasi",click:[this,"doValid"]});			
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,995,328], childPage:["Data Billing","Pesan Error"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:18,tag:9,
				colTitle:["Kode Mitra","No ref","NIK","Nama","Loker","Band","Nikes","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Tagihan Awal","Nilai Claim",
						  "Selisih Yakes", "Bulan","No BPJS"],
				colWidth:[[17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [100,100,80,    80,80,70,70,70,70,70,100,70,70,100,100,70, 100,70]],
				colFormat:[[13,14,15],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});				
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,980,300],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.stsSimpan = 1;
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		
		setTipeButton(tbAllFalse);		
		
		this.setTabChildIndex();		
		this.status = "";
		
		this.ykbilltmpbpjs = "yk_bill_tmp_bpjs"+this.app._lokasi;

		this.bValid.setEnabled(false);		
	}
};
window.app_saku3_transaksi_yakes21_bpjs_fKlaim.extend(window.portalui_childForm);
window.app_saku3_transaksi_yakes21_bpjs_fKlaim.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   						
			this.e_memo.setText("");
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);		
			
			var line;
			var tot = claim = selisih = 0;						
			var msg  = ""; this.e_memo.setText("");			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				
				tot += parseFloat(line.total);				
				claim += parseFloat(line.claim);
				selisih += parseFloat(line.selisih);
			}			
			
			this.e_total.setText(floatToNilai(tot));
			this.e_claim.setText(floatToNilai(claim));
			this.e_selisih.setText(floatToNilai(selisih));
			
			this.doLoadTmp();			
			this.bValid.setEnabled(true);
						
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;
			if (this.stsSimpan == 1) finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);			
			else finish = (finish > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				if (this.stsSimpan == 1) line = this.dataUpload.rows[i];
				else line = this.dataJU.rs.rows[i];
				this.sg1.appendData([line.kode_mitra,line.no_ref,line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_biaya,floatToNilai(line.total),floatToNilai(line.claim),  	
									 floatToNilai(line.selisih),line.bulan,line.no_bpjs]);
			}
			this.sg1.setNoUrut(start);
		}
		catch(e) {
			alert(e);
		}
	},	
	doLoadTmp: function(sender){		
		try {			
			this.status = "VALIDASI";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("truncate table "+this.ykbilltmpbpjs);			
			this.dbLib.execQuerySync(sql);			
			
			var line;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];															
				sql.add("insert into "+this.ykbilltmpbpjs+"(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,  total,claim,selisih, jenis,periode, bulan,no_bpjs) values "+
						"('"+this.nbTmp+"',"+i+",'"+this.app._lokasi+"','"+line.kode_mitra+"','"+line.no_ref+"','"+line.nik+"','"+line.nama+"','-','"+line.tgl_masuk+"','"+line.tgl_keluar+"','"+line.icdx+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.kode_biaya+"',"+line.total+","+line.claim+","+line.selisih+",'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+line.bulan+"','"+line.no_bpjs+"')");
			}		
			this.dbLib.execArraySQL(sql);								
		}
		catch(e) {
			alert(e);
		}
	},
	doValid: function(sender){									
		this.dbLib.execQuerySync("call sp_ykvalid_bpjs ('"+this.app._lokasi+"','"+this.nbTmp+"')");			
		var temu = false;
		var msg  = ""; this.e_memo.setText("");
		
		var strSQL = "select distinct a.kode_vendor from "+this.ykbilltmpbpjs+" a "+
					 "left join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "where total+claim+selisih <> 0 and b.kode_vendor is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "Kode Mitra : "+line.kode_vendor+"\n";				
			}
		}
						
		var strSQL = "select distinct a.icdx from "+this.ykbilltmpbpjs+" a "+
					 "left join yk_icdx b on a.icdx=b.kode_icdx "+
					 "where total+claim+selisih <> 0 and b.kode_icdx is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "Kode ICDX : "+line.icdx+"\n";				
			}
		}		
		
		//tgl masuk melebihi tgl aplod
		var strSQL = "select distinct nik+' - '+substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as nik "+
					 "from "+this.ykbilltmpbpjs+" "+
					 "where total+claim+selisih <> 0 and tgl_masuk>='"+this.dp_d1.getDateString()+"' and no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIK - Periode : "+line.nik+"\n";				
			}
		}
		
		var strSQL = "select distinct nik+' - '+substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as nik "+
					 "from "+this.ykbilltmpbpjs+" "+
					 "where total+claim+selisih <> 0 and loker ='-' and no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIK - Periode : "+line.nik+"\n";				
			}
		}
		
		//nikkes di cek
		var strSQL = "select distinct a.nikkes as nikkes from "+this.ykbilltmpbpjs+" a left join yk_peserta b on a.nikkes=b.nikes "+
					 "where b.nikes is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.loker <> 'SIGMA'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIKKES : "+line.nikkes+"\n";				
			}
		}
		
		var strSQL = "select distinct a.nikkes as nikkes from "+this.ykbilltmpbpjs+" a where substring(a.nikkes,1,6)<>substring(a.nik,1,6) and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.loker <> 'SIGMA'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "NIKKES dan NIK tidak valid : "+line.nikkes+"\n";				
			}
		}
		
		var strSQL = "select distinct a.bulan as bulan from "+this.ykbilltmpbpjs+" a "+
					 "where a.bulan not in ('01','02','03','04','05','06','07','08','09','10','11','12') and  a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				msg+= "BULAN tidak valid : "+line.bulan+"\n";				
			}
		}

		if (temu) {
			setTipeButton(tbAllFalse);
			this.e_memo.setText(msg);			
			system.alert(this,"Data tidak valid.","Lihat Pesan ERROR.");
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else setTipeButton(tbSimpan);					
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
					
					this.sg3.clear(1);
					this.e_memo.setText("");
					this.doClick(this.i_gen);
					setTipeButton(tbAllFalse);
					this.status = "";
				}
				break;
			case "simpan" :		
					if (nilaiToFloat(this.e_total.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Nilai Tidak boleh nol atau kurang");
						return false;
					}											
					this.doClick(this.i_gen);
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							sql.add("insert into yk_billbpjs_m(no_bill,kode_lokasi,tanggal,periode,tgl_input,nik_user,no_dokumen,keterangan,total,claim,selisih,jenis) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_claim.getText())+","+nilaiToFloat(this.e_selisih.getText())+",'"+this.c_jenis.getText()+"')");							
														
							sql.add("insert into yk_billbpjs_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,total,claim,selisih,jenis,periode,bulan,no_bpjs) "+
							        "select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,total,claim,selisih,'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"',bulan,no_bpjs "+
									"from "+this.ykbilltmpbpjs+" where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");							
							
							sql.add("truncate table "+this.ykbilltmpbpjs);
								
							this.status = "SIMPAN";
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbAllFalse);
						}
					}
				break;
			case "hapus" :
					this.status = "SIMPAN";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_billbpjs_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_billbpjs_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);					
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_billbpjs_m','no_bill',this.app._lokasi+"-BPJS"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
			this.bUpload.show();
			this.bValid.show();
			this.sg1.clear(1);
			this.sg3.clear(1);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						if (this.status == "SIMPAN") {
							this.app._mainForm.pesan(2,"Transaksi Sukses Tereksekusi ("+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();              
						}
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.total,a.claim,a.selisih "+
		             "from yk_billbpjs_m a  "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and  a.jenis='BPJS'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];																
			this.sg3.appendData([line.no_bill,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.total),floatToNilai(line.claim),floatToNilai(line.selisih)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},

	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				this.stsSimpan = 0;
				setTipeButton(tbHapus);
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bUpload.hide();
				this.bValid.hide();
				
				var strSQL = "select keterangan,jenis,tanggal,total,claim,selisih from yk_billbpjs_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);												
						this.e_total.setText(floatToNilai(line.total));						
						this.e_claim.setText(floatToNilai(line.claim));						
						this.e_selisih.setText(floatToNilai(line.selisih));						
					}
				}																
				
			}									
		} catch(e) {alert(e);}
	}
});
