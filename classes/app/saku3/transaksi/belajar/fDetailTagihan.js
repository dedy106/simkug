window.app_saku3_transaksi_belajar_fDetailTagihan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fDetailTagihan.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_belajar_fDetailTagihan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tagihan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,450], childPage:["Daftar Tagihan","Data Tagihan"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9, 
		            colTitle:["No Tagihan","Tanggal","NIM","Keterangan"],
					colWidth:[[3,2,1,0],[400,100,80,100]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Tagihan",maxLength:20,change:[this,"doChange"]});	
		this.cb_nim = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIM", multiSelection:false, maxLength:10, tag:1});		
		this.e_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Keterangan",maxLength:200,tag:9,change:[this,"doChange"]});
		
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,this.pc1.width-4,this.pc1.height-125], childPage:["Input Tagihan"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:0,
		            colTitle:["Kode Tagihan","Jenis Tagihan","Nilai"],
					colWidth:[[2,1,0],[100,200,100]],
					columnReadOnly:[true,[1],[0,2]],
					buttonStyle:[[0],[bsEllips]],
					colFormat:[[2],[cfNilai]],					
					autoAppend:true,defaultRow:1,
					
					ellipsClick:[this,"doEllipsClick2"],
					change:[this,"doChangeCell2"]
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		
		
		
		
		//this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			//this.cb_jenis.setSQL("select kode_tagihan,jenis_tagihan from tipe_tagihan ",["kode_tagihan","jenis_tagihan"],false,["Kode","Jenis"],"where","Jenis Tagihan",true);			
			this.cb_nim.setSQL("select nim,nama from siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);
			//this.cb_nim2.setSQL("select nim,nama from siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);

			
			this.doLoad();
			
			var sql = new server_util_arrayList();
			sql.add("select kode_tagihan,jenis_tagihan from tipe_tagihan");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fDetailTagihan.extend(window.childForm);
window.app_saku3_transaksi_belajar_fDetailTagihan.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into tagihan2(no_tagihan, tanggal, nim, keterangan) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into detail_tagihan (no_tagihan,kode_tagihan,jumlah) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
						
						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from tagihan2 where no_tagihan = '"+this.e_nb.getText()+"'");
					sql.add("delete from detail_tagihan where no_tagihan = '"+this.e_nb.getText()+"'");
					sql.add("insert into tagihan2(no_tagihan, tanggal, nim, keterangan) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into detail_tagihan (no_tagihan,kode_tagihan,jumlah) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
					
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
					sql.add("delete from tagihan2 where no_tagihan = '"+this.e_nb.getText()+"'");
					sql.add("delete from detail_tagihan where no_tagihan = '"+this.e_nb.getText()+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
			if (sender == this.e_nb && this.e_nb.getText() != ""){
				var strSQL = "select no_tagihan, tanggal, nim, keterangan "+
				             "from tagihan2 where no_tagihan ='"+this.e_nb.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setDateString(line.tanggal);
						this.cb_nim.setText(line.nim);
						this.e_ket.setText(line.keterangan);
						var strSQL = "select a.kode_tagihan, a.jumlah, b.jenis_tagihan "+
									 "from detail_tagihan a "+
									 "inner join tipe_tagihan b on a.kode_tagihan = b.kode_tagihan " + 
									 "where a.no_tagihan = '"+this.e_nb.getText()+"' ";					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg2.appendData([line.kode_tagihan,line.jenis_tagihan,floatToNilai(line.jumlah)]);
							}
						} else this.sg2.clear(1);
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
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Tagihan",sender,undefined, 
						    "select kode_tagihan,jenis_tagihan from tipe_tagihan",
							"select count(*) from tipe_tagihan",
							["kode_tagihan","jenis_tagihan"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var tipe = this.dataTipe.get(sender.cells(0,row));				
				if (tipe) sender.cells(1,row,tipe);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tagihan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell2");		
	},
	
	
	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataTipe = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataTipe.set(line.kode_tagihan, line.jenis_tagihan);										
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") {
				var filter = " no_tagihan like '%"+this.e_kode2.getText()+"%' ";
			}
			if (this.cb_nim2.getText() != "") {
				var filter = filter + " nim like '%"+this.cb_nim2.getText()+"%' ";
			}
			var strSQL = "select no_tagihan,tanggal,nim,keterangan from tagihan2 "+						 
						 "where "+filter;
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select no_tagihan, tanggal, nim, keterangan from tagihan2";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_tagihan,line.tanggal,line.nim,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	}
});