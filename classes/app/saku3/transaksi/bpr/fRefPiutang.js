window.app_saku3_transaksi_bpr_fRefPiutang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fRefPiutang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fRefPiutang";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Referensi Piutang Umum", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");

		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Referensi","Setup Referensi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["Kode PP","Nama PP","ID Ref","Deskripsi"],
					colWidth:[[3,2,1,0],[400,100,250,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
				
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"ID Referensi", maxLength:10, change:[this,"doChange"]});	
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"PP / Unit",tag:2,multiSelection:false}); 					
		this.cb_piu = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Akun Piutang",tag:2,multiSelection:false});	
		this.cb_ppn = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Akun PPN",tag:2,multiSelection:false});	
		this.cb_pph = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Akun PPh",tag:2,multiSelection:false});	
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,255], childPage:["Jurnal Pendapatan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,300,40,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); 			
			this.cb_piu.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='003' where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true); 			
			this.cb_pph.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='015' where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true); 			
			this.cb_ppn.setSQL("select kode_akun,nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true); 			

			this.cb_pp.setText(this.app._kodePP);	
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama "+
					"from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in  ('022') "+					
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' ");									
			sql.add("select a.kode_pp,a.nama from pp a "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");			
			this.dbLib.getMultiDataProviderA(sql);

			this.doLoad3();

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fRefPiutang.extend(window.childForm);
window.app_saku3_transaksi_bpr_fRefPiutang.implement({			
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from pu_ref_m where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from pu_ref_j where kode_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}
					
					sql.add("insert into pu_ref_m(kode_ref,nama,kode_lokasi,kode_pp,akun_piu,akun_ppn,akun_pph,flag_aktif) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_piu.getText()+"','"+this.cb_ppn.getText()+"','"+this.cb_pph.getText()+"','"+this.c_status.getText().substr(0,1)+"')");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){			
							sql.add("insert into pu_ref_j (kode_ref,kode_lokasi,nu,kode_akun,dc,keterangan,nilai,kode_pp) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pu_ref_m where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from pu_ref_j where kode_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.sg.clear(1);					
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);		
					this.doLoad3();				
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
				this.hapus();
				break;				
		}
	},		
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_nilaippn.setText(floatToNilai(nilaiPPN));				
		}			
	},				
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select a.* from pu_ref_m a  "+
							 "where a.kode_ref ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.stsSimpan = 0;		
						setTipeButton(tbUbahHapus);	
						this.pc2.setActivePage(this.pc2.childPage[1]);																		
						this.pc1.setActivePage(this.pc1.childPage[0]);																									
						
						this.e_nama.setText(line.nama);
						this.cb_pp.setText(line.kode_pp);
						this.cb_piu.setText(line.akun_piu);
						this.cb_ppn.setText(line.akun_ppn);
						this.cb_pph.setText(line.akun_pph);		

						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						
						var data2 = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.kode_pp,c.nama as nama_pp,a.nilai "+
								"from pu_ref_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_ref = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];															
								this.sg.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp]);
							}
						} else this.sg.clear(1);
																
					}
					else {
						this.stsSimpan = 1;	
						setTipeButton(tbSimpan);	
						this.sg.clear(1);			
					}
				}
			}								
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "") {							
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell");			
	},		
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '022' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(*)  from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '022' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select a.kode_pp,a.nama from pp a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'",
												  "select count(*) from pp a where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	     
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataPP = new portalui_arrayMap();					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
		var strSQL = "select a.kode_ref,a.nama,a.kode_pp,b.nama as nama_pp "+
		             "from pu_ref_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif ='1' order by a.kode_pp,a.kode_ref";		
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
			this.sg3.appendData([line.kode_pp,line.nama_pp,line.kode_ref,line.nama]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {				
				this.cb_kode.setText(this.sg3.cells(2,row));												
			}									
		} catch(e) {alert(e);}
	}
});