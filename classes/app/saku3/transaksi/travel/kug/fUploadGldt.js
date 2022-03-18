window.app_saku3_transaksi_travel_kug_fUploadGldt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_kug_fUploadGldt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_kug_fUploadGldt";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload GLDT", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_debet = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kredit = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[5,12,990,400], childPage:["Data Transaksi","Error Msg"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["Bukti","Tanggal","Kode Akun","DC","Keterangan","Nilai","Kode PP"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,350,50,100,80,120]],					
					colFormat:[[5],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:500,afterPaste:[this,"doAfterPaste"],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.dataAkun = new portalui_arrayMap();							
			this.dataPP = new portalui_arrayMap();
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
							
			this.c_jenis.setText("BK");
			this.c_status.setText("TUNAI");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_kug_fUploadGldt.extend(window.childForm);
window.app_saku3_transaksi_travel_kug_fUploadGldt.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			var strSQL = "select kode_akun from masakun where kode_lokasi='"+this.app._lokasi+"'";			
			this.dataAkun = this.dbLib.getDataProvider(strSQL,true);

			var strSQL = "select kode_pp from pp where kode_lokasi='"+this.app._lokasi+"'";			
			this.dataPP = this.dbLib.getDataProvider(strSQL,true);

			var debet = kredit = 0;
			for (var i=0;i < this.sg.rows.getLength();i++){		
				this.sg.cells(2,i,"INVALID | "+this.sg.cells(2,i));					
				this.sg.cells(6,i,"INVALID | "+this.sg.cells(6,i));					

				if (this.sg.cells(3,i).toUpperCase() == "D") debet += nilaiToFloat(this.sg.cells(5,i));	
				if (this.sg.cells(3,i).toUpperCase() == "C") kredit+= nilaiToFloat(this.sg.cells(5,i));	

				if (this.dataAkun.rs.rows.length > 0) {
					for (var j=0;j < this.dataAkun.rs.rows.length;j++){							
						if (this.sg.cells(2,i).substr(10,20) == this.dataAkun.rs.rows[j].kode_akun) {
							this.sg.cells(2,i,this.dataAkun.rs.rows[j].kode_akun);								
						}																			
					}	
					if (this.sg.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;
				}	

				if (this.dataPP.rs.rows.length > 0) {
					for (var j=0;j < this.dataPP.rs.rows.length;j++){							
						if (this.sg.cells(6,i).substr(10,20) == this.dataPP.rs.rows[j].kode_pp) {
							this.sg.cells(6,i,this.dataPP.rs.rows[j].kode_pp);								
						}																			
					}	
					if (this.sg.cells(6,i).substr(0,7) == "INVALID") this.inValid = true;
				}

			}
						
			this.e_debet.setText(floatToNilai(debet));
			this.e_kredit.setText(floatToNilai(kredit));

			if (!this.inValid) setTipeButton(tbSimpan);	
			else {
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg.getRowCount();i++) {
					if (this.sg.cells(2,i).substr(0,7) == "INVALID" || this.sg.cells(6,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}


		} catch(e) {alert(e);}
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
	simpan: function(){			
		try{						
					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)) {
							var periode = this.sg.cells(1,i).substr(0,4)+this.sg.cells(1,i).substr(5,2);
							sql.add("insert into gldt(no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+periode+"','-','"+this.sg.cells(1,i)+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(4,i)+"','MI','LOAD','IDR',1,'"+this.sg.cells(6,i)+"','-','-','-','-','-','-','-','-')");	
						}
					}		

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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																					
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak sama.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;								
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});