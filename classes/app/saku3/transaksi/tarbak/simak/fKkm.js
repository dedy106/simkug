window.app_saku3_transaksi_tarbak_simak_fKkm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fKkm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fKkm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data KKM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah", readOnly:true, tag:2});
		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:2});					
	
		this.pc1 = new pageControl(this,{bound:[20,12,1000,410], childPage:["Data KKM","Daftar KKM"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Kode KKM","Kode TA","Kode Tingkat","Kode Jurusan"],
					colWidth:[[3,2,1,0],[150,150,150,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_kode = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,15,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_tingkat = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tingkat",multiSelection:false,tag:1});					
		this.cb_jur = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Jurusan",multiSelection:false,tag:1});					
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		this.bValid = new button(this.pc1.childPage[0],{bound:[850,11,100,20],caption:"Validasi", click:[this,"doRekon"]});
	
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,13,995,285], childPage:["Data KKM Matpel"]});				
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:1,
		            colTitle:["Kode Matpel","Nama","KKM"],
					colWidth:[[2,1,0],[80,250,100]],
					buttonStyle:[[0],[bsEllips]],
					ellipsClick:[this,"doEllipseClick"],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					columnReadOnly:[true,[1]],
					autoAppend:true,defaultRow:1
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2,pager:[this,"doPager2"]});

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.doLoad();
			this.doClick();			

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and  kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);			

			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"' ",["kode_tingkat","nama"],false,["Kode Tingkat","Nama"],"and","Data Tingkat",true);			
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_jur","nama"],false,["Kode Jurusan","Nama"],"and","Data Jurusan",true);			

			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fKkm.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fKkm.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},
	doRekon: function(sender){				
		try {
			var strSQL = "select kode_matpel from sis_matpel where kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataKode = dataS;
			}
			
			this.inValid = false;
			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(3,i,"INVALID");
				for (var j=0;j < this.dataKode.rs.rows.length;j++){
					if (this.sg2.cells(0,i) == this.dataKode.rs.rows[j].kode_matpel) {
						this.sg2.cells(3,i,"VALID");
					}
				}	
				if (this.sg2.cells(3,i) == "INVALID") this.inValid = true;									
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg3.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(3,i) == "INVALID") {
						var j = i+1;	
						this.sg3.appendData([j]);
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";		
					for (var i=0; i < this.sg2.getRowCount();i++){			
						sql.add("insert into sis_kkm(kode_kkm,kode_ta,kode_tingkat, kode_matpel,kode_lokasi,kode_pp,kkm,flag_aktif,kode_jur) values "+
							    "	('"+this.cb_kode.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_tingkat.getText()+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"','"+this.app._kodePP+"',"+parseFloat(this.sg2.cells(2,i))+",'"+vSts+"','"+this.cb_jur.getText()+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";
					sql.add("delete from sis_kkm where kode_kkm = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");					
					for (var i=0; i < this.sg2.getRowCount();i++){			
						sql.add("insert into sis_kkm(kode_kkm,kode_ta,kode_tingkat, kode_matpel,kode_lokasi,kode_pp,kkm,flag_aktif,kode_jur) values "+
							    "	('"+this.cb_kode.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_tingkat.getText()+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"','"+this.app._kodePP+"',"+parseFloat(this.sg2.cells(2,i))+",'"+vSts+"','"+this.cb_jur.getText()+"')");
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
					sql.add("delete from sis_kkm where kode_kkm = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Matpel",sender,undefined, 
											  "select kode_matpel,nama from sis_matpel where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  "select count(kode_matpel) from sis_matpel where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  ["kode_matpel","nama"],"and",["Kode","Nama"],false);				
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);		

				this.cb_kode.setText(this.sg1.cells(0,row));
				this.cb_ta.setText(this.sg1.cells(1,row));	
				this.cb_tingkat.setText(this.sg1.cells(2,row));
				this.cb_jur.setText(this.sg1.cells(3,row));
				
				var data = this.dbLib.getDataProvider("select a.kode_kkm, a.kode_tingkat, a.kode_matpel,b.nama, a.kkm from sis_kkm a inner join sis_matpel b on a.kode_matpel=b.kode_matpel where a.kode_kkm='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_matpel,line.nama,line.kkm]); 
					}
				} else this.sg2.clear(1);	
			}
		} catch(e) {alert(e);}
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doClick:function(sender){
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_kkm","kode_kkm",this.app._lokasi+"-KKM.","0000"));
			this.stsSimpan = 1;
			this.cb_tingkat.setFocus();
			setTipeButton(tbSimpan);
	},
	doLoad:function(sender){								
		var strSQL = "select a.kode_kkm, a.kode_tingkat,a.kode_ta,a.kode_jur from sis_kkm a where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' group by a.kode_kkm,kode_ta,a.kode_tingkat,a.kode_jur";		
		var data = this.dbLib.getDataProvider(strSQL,true);	
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_kkm,line.kode_ta,line.kode_tingkat,line.kode_jur]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
