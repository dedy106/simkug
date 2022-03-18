window.app_saku3_transaksi_produk_fCoba = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fCoba.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fCoba";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Penjualan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Net Total"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.cb_brg = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Kode Barang",multiSelection:false,tag:1,change:[this,"doChange"], keyDown:[this,"editKeyDown"]});				
		this.e_nama = new saiEdit(this.pc2.childPage[0],{bound:[240,13,400,20],caption:"",tag:2,readOnly:true,labelWidth:0});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[650,13,100,20],labelWidth:50,caption:"Quantity",tag:2,change:[this,"doEnter"],tipeText:ttNilai,text:"",readOnly:true});
		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,350], childPage:["Data Item Barang"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:0,
		            colTitle:["Kode","Nama Barang","Harga","% Diskon","Jumlah","Subtotal"],					
					colWidth:[[5,4,3,2,1,0],[120,100,120,100,250,120]],					
					columnReadOnly:[true,[0,1,2,3,5]],
					colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.e_total = new saiLabelEdit(this.sgn,{bound:[785,1,200,20],caption:"Total",tag:2,tipeText:ttNilai,readOnly:true,text:"0"});

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);			
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_brg.setSQL("select kode_barang, nama from brg_barang where kode_lokasi = '"+this.app._lokasi+"'",["kode_barang","nama"],false,["Kode Barang","nama"],"and","Data Barang",true);			

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('JUALDIS','BRGPPNK','JUALKAS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "JUALKAS") this.akunKas = line.flag;						
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fCoba.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fCoba.implement({
	editKeyDown: function(sender, code, buttonState){
		this.cb_brg.setFocus();
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
		//	this.nik_user=this.app._userLog;						
		//	var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			if (this.stsSimpan == 1) this.doClick();	
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}	

					var strSQL = "select kode_pp from brg_gudang where kode_gudang = '"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var vKodePP = line.kode_pp;											
						}
					}	

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGJUAL','F','-','-','"+vKodePP+"','"+this.dp_d1.getDateString()+"','-','Penjualan No: "+this.e_nb.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','"+this.cb_gudang.getText()+"','-','-','-')");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							var data = this.dbLib.getDataProvider("select b.akun_pdpt from brg_barang a inner join brg_barangklp b on a.kode_barang=b.kode_barang where a.kode_barang ='"+this.sg.cells(0,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
							if (typeof data == "object"){
								var line = data.rs.rows[0];					
								this.akunPdpt = line.akun_pdpt;	

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+akunKas+"','D',"+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(5,i))+",'Kas Penjualan','BRGJUAL','KAS','IDR',1,'"+vKodePP+"','-','-','-','-','-','-','-','-')");
								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+akunPdpt+"','C',"+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(5,i))+",'Penjualan Barang','BRGJUAL','JUALBRG','IDR',1,'"+vKodePP+"','-','-','-','-','-','-','-','-')");
																	
							}	
						}		
					}

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGJUAL','BRGJUAL',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(0,i)+"','-',getdate(),'-','C',0,"+
										nilaiToFloat(this.sg.cells(4,i))+",0,"+nilaiToFloat(this.sg.cells(2,i))+",0,"+nilaiToFloat(this.sg.cells(3,i))+",0,0,"+nilaiToFloat(this.sg.cells(5,i))+")");
							}
						}						
					}	
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();
					this.nik_user=this.app._userLog;						
				//	var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				//	this.dbLib.execQuerySync(sql);										
				}
				break;
			case "simpan" :	
			case "ubah" :
			
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));								
				this.cb_brg.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}

			this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
			this.nik_user=this.app._userLog;						
			//var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";			
			//this.dbLib.execQuerySync(sql);			

			if (this.stsSimpan == 1) this.doClick();			
		}catch(e) {alert(e);}
	},	
	
	doChange:function(sender){		
		try {
			if (this.cb_brg.getText() != "") {
				this.e_nama.setText(this.cb_brg.rightLabelCaption);				
				this.e_jml.setText("1");
				//this.e_jml.setFocus();				
				this.doEnter();
			}	
		}
		catch(e) {
			alert(e);
		}
	},	
	
	doEnter:function(sender,col,row){
		try {

			if((sender == this.e_jml) && this.cb_brg.getText() != "" && this.e_jml.getText() != ""){
				var strSQL = "select a.kode_barang,a.nama,a.hna,isnull(b.p_disk,0) as diskon "+
							 "from brg_barang a "+
							 "left join brg_diskonjual_d b on a.kode_barang=b.kode_barang and a.kode_lokasi =b.kode_lokasi and '"+this.dp_d1.getDateString()+"' between b.tgl_mulai and b.tgl_selesai "+
							 "where a.kode_barang = '"+this.cb_brg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						var subtotal = Math.round(  (parseFloat(line.hna) - (parseFloat(line.hna) * parseFloat(line.diskon) / 100)) * nilaiToFloat(this.e_jml.getText())  );
						
						var vTemu = false;
						for (var i=0; i<this.sg.getRowCount(); i++){
							if (this.sg.rowValid(i)){
								if (this.cb_brg.getText() == this.sg.cells(0,i)) {
									vTemu = true;
									var j = i;
								}
							}
						}
						

						if (vTemu) {
							var jml = nilaiToFloat(this.sg.cells(4,j)) + nilaiToFloat(this.e_jml.getText());
							var subtotal = Math.round(  (parseFloat(line.hna) - (parseFloat(line.hna) * parseFloat(line.diskon) / 100)) * jml);
							this.sg.cells(4,j,jml);
							this.sg.cells(5,j,subtotal);
						} 
						else this.sg.appendData([this.cb_brg.getText(),line.nama,floatToNilai(line.hna),floatToNilai(line.diskon),this.e_jml.getText(),subtotal]);
					}
				}

				this.sg.validasi();
				this.cb_brg.setText("","");
				this.e_nama.setText("");
				this.e_jml.setText("");
				this.cb_brg.setFocus();	
		
			}
		}
		catch(e) {
			alert(e);
		}
	},
	
	doNilaiChange: function(){
		try{			
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "") {
					tot += nilaiToFloat(this.sg.cells(5,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));	

		}catch(e)
		{
			alert("[]"+e);
		}
	},	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptJual";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();

			this.nik_user=this.app._userLog;						
		//	var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		//	this.dbLib.execQuerySync(sql);				
		} catch(e) {
			alert(e);
		}
	}	
});