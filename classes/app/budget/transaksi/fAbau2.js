/*
belum pengecekan
*/
window.app_budget_transaksi_fAbau2 = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fAbau2.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fAbau2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Anggaran Biaya Variable : Input - Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   								
		this.ePP = new portalui_saiCBBL(this,{bound:[20,100,200,20],caption:"PP", multiSelection:false,tag:2,change:[this,"doChange"]});	
		this.eTotal = new saiLabelEdit(this,{bound:[580,100,200,20], caption:"Total", readOnly:true, tipeText:ttNilai, text:"0"});
		this.i_viewer = new portalui_imageButton(this,{bound:[780,100,20,20],hint:"Hitung dan Validasi",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.bUpload = new portalui_uploader(this,{bound:[820,100,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,420],caption:"Data Anggaran Biaya Variabel"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,370],colCount:18,
				colTitle:[
						  "Kode PK","Nama PK","Kode DRK","Nama DRK","Kode RKA","Nama RKA",  
						  "Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif",
						  "Deskripsi",
						  "Kode PP","Nama PP",
						  "Jns Periode","Jumlah","Volume","Total"],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,395,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		if (this.app._userStatus == "A")
			this.ePP.setSQL("select kode_pp, nama, kode_bidang from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama","kode_bidang"],false,["Kode","Nama","Bidang"],"and","Data PP",true);
		else this.ePP.setSQL("select kode_pp, nama, kode_bidang from agg_pp where kode_bidang = '"+this.app._kodeBidang+"' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama","kode_bidang"],false,["Kode","Nama","Bidang"],"and","Data PP",true);
		this.ePP.setText(this.app._kodePP);
		this.kodeBidang = this.app._kodeBidang;
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}

		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
		var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.kodeBidang+"' ",true);
		if (typeof data2 == "object"){
			this.progApp = data2.rs.rows[0].progress;
		}
		
		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fAbau2.extend(window.portalui_childForm);
window.app_budget_transaksi_fAbau2.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				//this.sg1.setData(data,true,20);
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		//this.sg1.selectPage(page);		
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([
			line.kode_pk, line.nama_pk, line.kode_drk, line.nama_drk, line.kode_rka, line.nama_rka, 
			line.kode_var, line.nama_var, line.kode_akun, line.nama_akun, parseFloat(line.tarif), 
			line.kegiatan, 
			line.kode_pp, line.nama_pp, line.jns_periode, parseFloat(line.jumlah), parseFloat(line.volume), parseFloat(line.total)]);
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
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi Anggaran Biaya Variabel telah di Close.");
						return false;
					}
					if (this.progApp != "0") {
						system.alert(this,"Transaksi Norma Variable PP : "+this.ePP.rightLabelCaption+" telah di Approve.","Transaksi tidak dapat disimpan.");
						return false;
					}
					
					try{
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.eTahun.getText().substr(2,2)+".",'000'));
						this.doHitung(); if (!this.dataValid) return false;
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						var vTahun = this.eTahun.getText();
												
						sql.add("insert into agg_abau_m(no_abau, kode_lokasi, kode_pp, keterangan, jenis, tgl_input, nik_user, progress, tahun)"+
								"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ePP.getText()+"','-','L',now(), '"+this.app._userLog+"','0','"+this.eTahun.getText()+"') ");

						var total = idx = idx2 = 0;
						var line;												
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
                            idx2++;
							total = nilaiToFloat(line.jumlah) * nilaiToFloat(line.volume) * nilaiToFloat(line.tarif);
							sql.add("insert into agg_abau_dt(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,jns_periode,jumlah,volume,nilai,tahun,tarif,no_urut) values "+
								" ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"', '"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"','"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','"+line.jns_periode+
								"',"+line.jumlah+","+line.volume+","+total+",'"+vTahun+"',"+line.tarif+","+idx2+")");
							
							if (line.jns_periode.substr(0,1).toUpperCase() == "A"){
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
										" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','01',"+line.jumlah+","+line.volume+",'"+vTahun+"01"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
										" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','04',"+line.jumlah+","+line.volume+",'"+vTahun+"04"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
										" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','07',"+line.jumlah+","+line.volume+",'"+vTahun+"07"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
										" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','10',"+line.jumlah+","+line.volume+",'"+vTahun+"10"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
							} 
							else { 
								if (line.jns_periode.substr(0,1).toUpperCase() == "B"){
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
											" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','01',"+line.jumlah+","+line.volume+",'"+vTahun+"01"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
											" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','07',"+line.jumlah+","+line.volume+",'"+vTahun+"07"+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");							
								}
								else {
									if (line.jns_periode.substr(0,1).toUpperCase() == "C"){
										for (var j=1; j <= 12; j++){
											idx++;
											sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
													" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
													" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','"+(j<10?"0":"")+j+"',"+line.jumlah+","+line.volume+",'"+vTahun+(j<10?"0":"")+j+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
										}
									}
									else {
											sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
													" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rka+"','"+line.kode_drk+"','"+line.kode_pk+"','"+line.kode_var+"' "+
													" ,'"+line.kode_akun+"','"+line.kegiatan+"','"+line.kode_pp+"','"+line.jns_periode+"',"+line.jumlah+","+line.volume+",'"+vTahun+line.jns_periode+"',"+total+",'"+vTahun+"',"+line.tarif+","+idx+",'F','0')");
									}
								}
							}
						}
						
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
								"       select a.kode_lokasi,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,a.bulan,a.jumlah,a.volume,a.nilai,a.tahun,a.no_abau,'ABAU',a.progress,case when b.jenis = 'L' then 'E' else 'T' end as jenis,a.keterangan "+
								"       from agg_abau_d a inner join agg_abau_m b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
								"       where a.no_abau='"+this.ed_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");				
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doChange: function(sender)	{
		if (sender == this.ePP && this.ePP.getText()!="") {
			this.kodeBidang = this.ePP.dataFromList[2];
		}
		if (this.eTahun.getText()!="") {
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
		if (this.ePP.getText()!="") {
			var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.kodeBidang+"' ",true);
			if (typeof data2 == "object"){
				this.progApp = data2.rs.rows[0].progress;
			}		
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.eTahun.getText().substr(2,2)+".",'000'));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},
	doHitung: function(sender){
		var j=tot1 = 0;		
		this.dataValid = true;
		for (var i = 0;i < this.sg1.getRowCount();i++){
			j = i+1;
			tot1 = tot1 + (parseFloat(this.sg1.cells(10,i)) * parseFloat(this.sg1.cells(15,i)) * parseFloat(this.sg1.cells(16,i))); 
			var data = this.dbLib.getDataProvider("select a.kode_drk,b.kode_pk from agg_rka a  "+
												  "inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun where a.kode_rka='"+this.sg1.cells(4,i)+"' and a.tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				var line2 = data.rs.rows[0];							
				if (line2 != undefined){
					if (line2.kode_drk != this.sg1.cells(2,i) || line2.kode_pk != this.sg1.cells(0,i) ) {
						this.dataValid = false;
						system.alert(this,"Kode DRK dan PK untuk Kode RKA "+this.sg1.cells(4,i)+" tidak valid.","Baris : "+j);
						return false;
					}
				}
				else {
					this.dataValid = false;
					system.alert(this,"Kode RKA "+this.sg1.cells(4,i)+" tidak valid.","Baris :"+j);
					return false;
				}
			}
			var data = this.dbLib.getDataProvider("select tarif from agg_norma_var where kode_var='"+this.sg1.cells(6,i)+"' and tahun = '"+this.eTahun.getText()+"' ",true);
			if (typeof data == "object"){
				var line2 = data.rs.rows[0];							
				if (line2 != undefined){
					if (line2.tarif != this.sg1.cells(10,i)) {
						this.dataValid = false;
						system.alert(this,"Tarif untuk Kode Var "+this.sg1.cells(6,i)+" tidak valid.","Baris : "+j);
						return false;
					}
				}
				else {
					this.dataValid = false;
					system.alert(this,"Kode Variabel "+this.sg1.cells(6,i)+" tidak valid.","Baris : "+j);
					return false;
				}
			}
			var data = this.dbLib.getDataProvider("select nama from agg_masakun where kode_akun='"+this.sg1.cells(8,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line2 = data.rs.rows[0];							
				if (line2 == undefined){
					this.dataValid = false;
					system.alert(this,"Kode Akun "+this.sg1.cells(8,i)+" tidak valid.","Baris :"+j);
					return false;
				}
			}
			if (this.app._userStatus == "A") 
				var data = this.dbLib.getDataProvider("select nama from agg_pp where kode_pp='"+this.sg1.cells(12,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
			else var data = this.dbLib.getDataProvider("select nama from agg_pp where kode_bidang='"+this.app._kodeBidang+"' and kode_pp='"+this.sg1.cells(12,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
				
			if (typeof data == "object"){
				var line2 = data.rs.rows[0];							
				if (line2 == undefined){
					this.dataValid = false;
					system.alert(this,"Kode PP "+this.sg1.cells(12,i)+" tidak valid.","Baris :"+j);
					return false;
				}
			}
		}
		this.eTotal.setText(floatToNilai(tot1));
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
