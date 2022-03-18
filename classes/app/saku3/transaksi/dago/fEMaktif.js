window.app_saku3_transaksi_dago_fEMaktif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fEMaktif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fEMaktif";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Aktifasi E-Comm Mobile", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.cb_slot = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Slot", multiSelection:false, maxLength:10, tag:1});
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,12,98,18]}); 

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,280], childPage:["Data Produk"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
		            colTitle:["Kode Produk","Nama","Tenan","Index"],										
					colWidth:[[3,2,1,0],[100,300,200,100]],
					columnReadOnly:[true,[1,2],[0,3]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var sql = new server_util_arrayList();
			sql.add("select kode_produk,nama from em_produk where kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_slot.setSQL("select kode_slot, nama from em_slot where kode_lokasi='"+this.app._lokasi+"' ",["kode_slot","nama"],false,["Kode","Nama"],"and","Data Slot",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fEMaktif.extend(window.childForm);
window.app_saku3_transaksi_dago_fEMaktif.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from em_aktif_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from em_aktif_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 						
					sql.add("insert into em_aktif_m (no_bukti,kode_lokasi,tanggal,periode,keterangan,tgl_input,nik_user,tgl_mulai,tgl_selesai,kode_slot) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_slot.getText()+"')");
																				
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							sql.add("insert into em_aktif_d (no_bukti,kode_lokasi,kode_produk,no_idx,flag_aktif) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+this.sg.cells(3,i)+",'1')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doLoad3();
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
				sql.add("delete from em_aktif_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from em_aktif_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad3();
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg.clear(1); 											
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"em_aktif_m","no_bukti",this.app._lokasi+"-EM"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}			
	},		
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	   		
		if (col == 0) {
				if (sender.cells(0,row) != "") {
				var produk = this.dataProduk.get(sender.cells(0,row));
				if (produk) {
					sender.cells(1,row,produk);					
					var strSQL = "select a.kode_tenan+' | '+b.nama as tenan from em_produk a inner join em_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi where a.kode_produk = '"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.tenan);
							sender.cells(3,row,"0");																												
						}
					}							
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode produk "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){					
					this.standarLib.showListData(this, "Daftar produk",sender,undefined, 
							"select kode_produk, nama  from em_produk where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from em_produk where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_produk","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	    
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataProduk = new portalui_arrayMap();																											
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataProduk.set(line.kode_produk, line.nama);										
								}								
							}							
						}else throw result;
					break;  		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},				
	doLoad3:function(sender){																							
		var strSQL = "select * from em_aktif_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_bukti,line.tanggal,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from em_aktif_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);	
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_mulai);
						this.dp_d3.setText(line.tgl_selesai);
						this.cb_slot.setText(line.kode_slot);
					}
				}				
				
				var strSQL = "select a.kode_produk,a.nama,a.kode_tenan+' | '+b.nama as tenan,c.no_idx "+
							"from em_aktif_d c  "+
							"inner join em_produk a on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
							"inner join em_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
							"where c.no_bukti = '"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_produk,line.nama,line.tenan,line.no_idx]);
					}
				} else this.sg.clear(1);							
			}						
		} catch(e) {alert(e);}		
	}
});



