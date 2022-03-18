window.app_budget_transaksi_fUploadFa = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fUploadFa.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fUploadFa";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Aktiva Tetap Eksisting", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],tag:2,caption:"Periode CutOff",tipeText: ttAngka,maxLength:6});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti Load", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   								
		this.eTotal = new saiLabelEdit(this,{bound:[580,78,200,20], caption:"Total", readOnly:true, tipeText:ttNilai, text:"0"});
		this.i_viewer = new portalui_imageButton(this,{bound:[780,78,20,20],hint:"Hitung dan Validasi",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.bUpload = new portalui_uploader(this,{bound:[820,78,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,400],caption:"Data Aktiva Tetap Eksisting"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,350],colCount:24,
				colTitle:"No Aktap, Nama, Akun Aktap, Kelompok Aktap, Kelompok Akun, Kode PP, Umur, % Susut, Nilai Perolehan, Kode RKA, Tgl Perolehan, Periode, Tgl Awal Susut, Per. Awl. Susut, Merk, Tipe, No Seri, Jenis, RKA BP, RKA BPP, Status Aktif, Kode PP BP, Kode PP BPP,Jumlah",
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,375,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}
		var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='2' ",true);
		if (typeof data2 == "object"){
			this.progApp = data2.rs.rows[0].progress;
		}
		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fUploadFa.extend(window.portalui_childForm);
window.app_budget_transaksi_fUploadFa.implement({
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
		//"No Aktap, Nama, Akun Aktap, Jenis Aktap, Kelompok Akun, Kode BU, Umur, % Susut, Nilai Perolehan, Kode RKA, 
		//Tgl Perolehan, Periode, Tgl Awal Susut, Per. Awl. Susut, Merk, Tipe, No Seri, Jenis, RKA BP, RKA BPP, Status, Kode PP BP, Kode PP BPP, jumlah"
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.no_fa, line.nama, line.kode_akun, line.kode_klpfa, line.kode_klpakun, line.kode_pp, line.umur, line.persen, parseFloat(line.nilai), 
			line.kode_rka, line.tgl_perolehan, line.periode, line.tgl_susut, line.periode_susut, line.merk, line.tipe, line.no_seri, line.jenis, line.kode_rka2, line.kode_rka3, line.status_aktif, line.kode_pp2, line.kode_pp3,parseFloat(line.jumlah)]);
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
						system.alert(this,"Transaksi tidak valid.","Transaksi Aktiva Tetap telah di Close.");
						return false;
					}
					try{
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti",this.app._lokasi+"-UPLFA"+this.eTahun.getText().substr(2,2)+'.',"0000"));
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						//mesti hitung ulang
						sql.add("delete from agg_d where modul in ('ASSET','BP','BPP') and tahun = '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from agg_fasusut_m where tahun ='"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from agg_fasusut_d where tahun= '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from agg_fa_asset where tahun_agg = '"+this.eTahun.getText()+"' and jenis_agg = 'E' and kode_lokasi = '"+this.app._lokasi+"' ");						
						var line;												
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
                            sql.add("insert into agg_fa_asset (no_fa,kode_klpfa,kode_klpakun,umur,persen, "+
							        "                          nama,nilai,kode_drk,tgl_perolehan,periode,"+
									"                          tgl_susut,periode_susut,merk,"+
									"                          tipe,no_seri,kode_akun,jenis,"+
									"                          kode_lokasi,kode_pp,"+
									"                          jenis_agg,tahun_agg,kode_rka2,kode_rka3,status_aktif,kode_pp2,kode_pp3,jumlah)values"+
								" ('"+line.no_fa+"','"+line.kode_klpfa+"', '"+line.kode_klpakun+"',"+line.umur+","+line.persen+",'"+line.nama+"',"+line.nilai+",'"+line.kode_rka+"','"+line.tgl_perolehan+"','"+line.periode+
								"','"+line.tgl_susut+"','"+line.periode_susut+"','"+line.merk+"','"+line.tipe+"', "+
								" '"+line.no_seri+"','"+line.kode_akun+"','"+line.jenis+"',"+
								" '"+this.app._lokasi+"','"+line.kode_pp+"','E','"+this.eTahun.getText()+"','"+line.kode_rka2+"','"+line.kode_rka3+"','"+line.status_aktif+"','"+line.kode_pp2+"','"+line.kode_pp3+"',"+line.jumlah+")");					 
						}
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doSelectDate: function(sender, y, m, d){						
		this.ed_period.setText(y+( m < 10 ? "0":"")+m);		
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ed_period.setText(thn+"12");
		
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti",this.app._lokasi+"-UPLFA"+this.eTahun.getText().substr(2,2)+'.',"0000"));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
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
	},
	doHitung: function(sender){
		var j=tot1 = 0;		
		this.dataValid = true;
		for (var i = 0;i < this.sg1.getRowCount();i++){
			j = i+1;
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
	}
});


/*
var data = this.dbLib.getDataProvider("select nama from agg_rka where kode_rka='"+line.kode_rka2+"' and tahun = '"+this.eTahun.getText()+"'",true);
if (typeof data == "object"){
	var line2 = data.rs.rows[0];							
	if (line2 == undefined){
		system.alert(this,"Kode RKA2 (RKA BP) "+line.kode_rka+" tidak valid.","");
		return false;
	}
}
var data = this.dbLib.getDataProvider("select nama from agg_rka where kode_rka='"+line.kode_rka3+"' and tahun = '"+this.eTahun.getText()+"'",true);
if (typeof data == "object"){
	var line2 = data.rs.rows[0];							
	if (line2 == undefined){
		system.alert(this,"Kode RKA3 (RKA BPP) "+line.kode_rka+" tidak valid.","");
		return false;
	}
}
var data = this.dbLib.getDataProvider("select nama from agg_masakun where kode_akun='"+line.kode_akun+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
if (typeof data == "object"){
	var line2 = data.rs.rows[0];							
	if (line2 == undefined){
		system.alert(this,"Kode Akun "+line.kode_akun+" tidak valid.","");
		return false;
	}
}
var data = this.dbLib.getDataProvider("select a.kode_klpakun,b.umur from agg_fa_klp a  "+
									  "inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun where a.kode_klpfa='"+line.kode_klpfa+"' ",true);
if (typeof data == "object"){
	var line2 = data.rs.rows[0];							
	if (line2 != undefined){
		if (line2.kode_klpakun != line.kode_klpakun || line2.umur != line.umur) {
			system.alert(this,"Kode Kelompok Akun / persentase untuk kelompok aktap "+line.kode_klpfa+" tidak valid.","");
			return false;
		}
	}
	else {
		system.alert(this,"Kode Kelompok Aktap "+line.kode_rka+" tidak valid.","");
		return false;
	}
}
var data = this.dbLib.getDataProvider("select nama from agg_pp where kode_pp='"+line.kode_pp+"' and kode_lokasi = '"+this.app._lokasi+"' ",true)
if (typeof data == "object"){
	var line2 = data.rs.rows[0];							
	if (line2 == undefined){
		system.alert(this,"Kode PP "+line.kode_pp+" tidak valid.","");
		return false;
	}
}
*/