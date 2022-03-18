window.app_saku2_transaksi_kopeg_fa_fVaLoadH = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fVaLoadH.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_kopeg_fa_fVaLoadH";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Inventarisasi Fisik: Pembatalan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Load", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,11,250,20],caption:"No Dokumen", maxLength:50});			
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});			
		this.e_total = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,354],caption:"Data Inventaris"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:23,tag:9,
				colTitle:["barcode","no_fa","kode_lokasi","nama","merk","tipe","no_seri","nilai","tgl_perolehan","no_bast","tgl_bast","no_po","kode_vendor","tgl_garansi","no_polis","kode_gedung","kode_prodi","kode_pnj","kode_fungsi","kode_jenis","kode_status","kode_kondisi","kode_ruang"],
				colFormat:[[7],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPager"]});
		this.sg.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		setTipeButton(tbHapus);				
	}
};
window.app_saku2_transaksi_kopeg_fa_fVaLoadH.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_fa_fVaLoadH.implement({
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
					this.sg.clear(1); 
					setTipeButton(tbHapus);
				}
				break;
			case "hapus" :		
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							sql.add("delete from va_load_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from va_fa_asset where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
		else this.e_periode.setText(this.app._periode);
	},	
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_bukti, keterangan from va_load_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Load","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal,a.keterangan,a.no_dokumen "+
					   "from va_load_m a "+			           
					   "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.dp_d1.setText(line.tanggal);
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);					
				} 
			}
			var data = this.dbLib.getDataProvider("select * "+
			           "from va_fa_asset where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			
			var tot = 0;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];									
				tot += parseFloat(line.nilai);				
			}
			this.e_total.setText(floatToNilai(tot));			
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.barcode,line.no_fa,line.kode_lokasi,line.nama,line.merk,line.tipe,line.no_seri,floatToNilai(line.nilai),line.tgl_perolehan,line.no_bast,line.tgl_bast,line.no_po,line.kode_vendor,line.tgl_garansi,line.no_polis,line.kode_gedung,line.kode_prodi,line.kode_pnj,line.kode_fungsi,line.kode_jenis,line.kode_status,line.kode_kondisi,line.kode_ruang]);
		}
		this.sg.setNoUrut(start);
	},		
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses Terhapus.("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
