window.app_saku3_transaksi_dago_fJadwal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fJadwal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fJadwal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jadwal Kelas Produk: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Tahun",maxLength:4,tag:2,tipeText:ttAngka,change:[this,"doChange"]});		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Jadwal","Data Jadwal"]});						
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Jadwal","Tanggal Berangkat","Deskripsi","Kode Paket","Quota","Lama Hari"],
					colWidth:[[5,4,3,2,1,0],[100,150,150,500,300,200]], 
					readOnly:true,
					colFormat:[[5,6,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,230,20],caption:"No Jadwal",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[255,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Tgl Berangkat", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,128,18]});
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,330,20],caption:"Deskripsi", maxLength:50});				
		this.cb_paket = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,250,20],caption:"Paket",multiSelection:false,tag:2,change:[this,"doChange"]});
		this.e_harga = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,230,20],caption:"Harga", readOnly:true,tag:2});				
		this.e_quota = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,230,20],caption:"Quota", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_lama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,230,20],caption:"Lama Hari", tag:1, tipeText:ttNilai, text:"0"});			
		this.c_aktif = new saiCB(this.pc2.childPage[1],{bound:[20,22,230,20],caption:"Status Aktif",items:["Y","T"], readOnly:true,tag:2});		
		
		
		this.rearrangeChild(10, 22);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		 
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			
			var data = this.dbLib.getDataProvider("select year(getdate())  as tahun",true);
			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					this.e_tahun.setText(line.tahun);
				}
			}
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("USD");
			}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fJadwal.extend(window.portalui_childForm);
window.app_saku3_transaksi_dago_fJadwal.implement({
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
					if (this.stsSimpan == 1) this.doClick();										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from dgw_jadwal where no_jadwal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}										
					if (this.c_aktif.getText()=="Y") var flagAktif = "1"; else var flagAktif = "0"; 
					sql.add("insert into dgw_jadwal(no_jadwal,kode_lokasi,tgl_berangkat,no_paket,deskripsi,tgl_input,quota,lama_hari,flag_aktif) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.cb_paket.getText()+"','"+this.e_ket.getText()+"',getdate(),"+nilaiToFloat(this.e_quota.getText())+","+nilaiToFloat(this.e_lama.getText())+",'"+flagAktif+"')");										
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							 
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";								
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from haj_jadwal where no_jadwal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_tahun.getText()!= "") {
				if (this.stsSimpan == 1) {									
					this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi = '"+this.app._lokasi+"'",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);								
				}
				this.stsSimpan = 1;
				var data = this.dbLib.getDataProvider("select substring(cast(year(getdate()) as varchar),3,2) as tahun2",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.tahun2 = line.tahun2;
				}
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dgw_jadwal","no_jadwal",this.app._lokasi+"-JD"+this.tahun2+".","0000"));								
				this.e_ket.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},			
	doChange:function(sender){	
		try{			
			if (sender == this.e_tahun && this.e_tahun.getText()!="") {			
				if (this.stsSimpan == 1) this.doClick();
				this.doLoad3();		
			}
			if (sender == this.cb_paket && this.cb_paket.getText()!="") {			
				var data = this.dbLib.getDataProvider("select harga,kode_curr from dgw_paket where no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){	
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_harga.setText(line.kode_curr+" - "+line.harga);																				
					}
				}
			}

			if (this.e_nb.getText() != ""){			
				var strSQL = "select no_jadwal,tgl_berangkat,deskripsi,no_paket,quota,lama_hari from dgw_jadwal where no_jadwal ='"+this.e_nb.getText()+"' and kode_lokasi= '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){	
					var line = data.rs.rows[0];							
					if (line != undefined){					
					this.dp_d1.setText(line.tgl_berangkat);					
					this.e_ket.setText(line.deskripsi);					
					this.e_lama.setText(floatToNilai(line.lama_hari));												
					this.e_quota.setText(floatToNilai(line.quota));
					this.cb_paket.setText (line.no_paket);
					setTipeButton(tbUbahHapus);																			
					}
					else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}	
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jadwal='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.doLoad3();
			setTipeButton(tbAllFalse);						
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select no_jadwal,tgl_berangkat,deskripsi,no_paket,quota,lama_hari from dgw_jadwal where year(tgl_berangkat)='"+this.e_tahun.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' and flag_aktif='1' order by tgl_input";		
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
			this.sg3.appendData([line.no_jadwal,line.tgl_berangkat,line.deskripsi,line.no_paket,floatToNilai(line.quota),floatToNilai(line.lama_hari)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				setTipeButton(tbUbahHapus);
				this.pc2.setActivePage(this.pc2.childPage[1]);																							
				this.e_nb.setText(this.sg3.cells(0,row));	
				}												
			}									
		catch(e) {alert(e);}
	}
});  