window.app_saku2_transaksi_siaga_fKontrakE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKontrakE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKontrakE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kontrak: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});						
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 		
		this.cb_vendor = new saiCBBL(this,{bound:[20,21,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});		
		this.c_curr = new saiCB(this,{bound:[20,20,160,20],caption:"Mt Uang",readOnly:true,tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Kontrak", tag:1, tipeText:ttNilai, text:"0"});
		
		this.rearrangeChild(10, 23);		
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");
			this.cb_vendor.setSQL("select kode_vendor, nama from gr_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKontrakE.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKontrakE.implement({
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
	simpan: function(){			
		try{									
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from gr_kontrak where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("insert into gr_kontrak(no_kontrak,no_dokumen,tanggal,periode,kode_lokasi,keterangan,tgl_mulai,tgl_selesai,nilai,kode_vendor,kode_curr) values "+
						    "	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"', '"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_vendor.getText()+"','"+this.c_curr.getText()+"')");					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.c_curr.setText("IDR");
					setTipeButton(tbUbahHapus);										
				break;
			case "ubah" :																	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" : 
					sql.add("delete from gr_kontrak where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
			    break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);		
	},		
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_kontrak, no_dokumen from gr_kontrak where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kontrak","no_dokumen"],false,["No Bukti","No Dokumen"],"and","Daftar Bukti",true);
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select a.tanggal,a.no_dokumen,a.kode_curr,a.nilai,a.keterangan,a.tgl_mulai,a.tgl_selesai,b.kode_vendor,b.nama as nama_vendor "+
			           "from gr_kontrak a "+
			           "	inner join gr_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					   
					   "where a.no_kontrak='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);	
					this.dp_d2.setText(line.tgl_mulai);	
					this.dp_d3.setText(line.tgl_selesai);	
					this.e_dok.setText(line.no_dokumen);					
					this.e_ket.setText(line.keterangan);
					this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);					
					this.c_curr.setText(line.kode_curr);	
					this.e_nilai.setText(floatToNilai(line.nilai));	
				} 
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi ("+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});