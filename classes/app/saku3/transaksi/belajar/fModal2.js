window.app_saku3_transaksi_belajar_fModal2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fModal2.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_belajar_fModal2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Modal Test", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,440], childPage:["Daftar Grafik","Data Grafik","Filter Cari"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9, 
		      colTitle:["Kode","Nama","Modul","Format Nominal"],
					colWidth:[[3,2,1,0],[100,80,200,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
        
    this.cb_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:2});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,12,80,18],caption:"Cari Data",click:[this,"doCari"]});	
		
		this.addBtn = new button(this.pc1.childPage[1],{bound:[700,10,80,18],caption:"Tambah",click:[this,"entriesClick"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,this.pc1.width-4,this.pc1.height-55], childPage:["Data "]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:0,
		      colTitle:["Kode","Nama","Modul","Format Nominal","FS","Edit","Hapus"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,200,80]],
					// buttonStyle:[[0],[bsEllips,bsEllips]],
					click:[this,"entriesClick"],
					colAlign:[[5,6],[alCenter,alCenter]],
					colFormat:[[5,6],[cfButton,cfButton]],
					readOnly:true,		
					autoAppend:true,defaultRow:1
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
      this.doLoad();
      this.stsSimpan = 1;
			
			var sql = new server_util_arrayList();

			// this.cb_fs.setSQL("select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode","Nama"],"and","Data FS",true);

      //       sql.add("select distinct kode_neraca,nama from neraca where kode_lokasi='"+this.app._lokasi+"'");
			// this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fModal2.extend(window.childForm);
window.app_saku3_transaksi_belajar_fModal2.implement({
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
  
          // if(this.stsSimpan == 0){
          //     sql.add("delete from db_grafik_m where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					// }
					
					// sql.add("insert into db_grafik_m(kode_grafik, kode_lokasi, nama, modul, format) values "+
					// 		"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_modul.getText()+"','"+this.c_format.getText()+"')");
					
					var nu=1;
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into db_grafik_m(kode_grafik, kode_lokasi, nama, modul, format) values "+
							"('"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"')");
						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
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
					sql.add("delete from db_grafik_m where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
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
	doModalResult: function(event, modalResult,value){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
      case "ubah" :	
				this.simpan();
				break;						
			case "simpancek" : this.simpan();			
				break;		
			case "hapus" :	
				this.hapus();
				break;
			case "Add" :
				if ( modalResult == mrOk)
				{
				 try
				 {   
					 var valArray = value.split(";");
					 this.sg2.appendData(valArray);
					 var rowCount = this.sg2.getRowCount();
					 
					 this.sgn2.setTotalPage(Math.ceil(rowCount / 20));
					 this.sgn2.rearrange();					
					 
				 }catch(e)
				 {
					 alert(e);
				 }
			 }
			 break;
		 case "Edit" :
			 if (modalResult == mrOk)
			 {
				 var item = this.selectedItem;
				 row = item;
				 
				 var valArray = value.split(";");
				 this.sg2.cells(0,row,valArray[0]);
				 this.sg2.cells(1,row,valArray[1]);
				 this.sg2.cells(2,row,valArray[2]);
				 this.sg2.cells(3,row,valArray[3]);
				 this.sg2.cells(4,row,valArray[4]);
				 this.sg2.cells(5,row,"Edit");		
				 this.sg2.cells(6,row,"Hapus");											
			 }
			 break;
		 case "Remove" :
			 if (modalResult == mrOk)			
			 this.sg2.delRow(this.selectedItem);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses terseksekusi ");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNrc = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNrc.set(line.kode_grafik, line.nama);					
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
            var filter='';
			if (this.cb_kode2.getText() != "") {
				filter = " kode_grafik like '%"+this.cb_kode2.getText()+"%' ";
			}
			
			if(filter != ''){
				var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m "+	
						 "where "+filter+" and kode_lokasi='"+this.app._lokasi+"' ";
			}else{
				var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m where kode_lokasi='"+this.app._lokasi+"' ";
			}
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
			var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m where kode_lokasi='"+this.app._lokasi+"'";	
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
			this.sg1.appendData([line.kode_grafik,line.nama,line.modul,line.format]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	// doDoubleClick: function(sender, col , row) {
	// 	try{
	// 		if (this.sg1.cells(0,row) != "") {			
	// 			setTipeButton(tbUbahHapus);
	// 			this.pc1.setActivePage(this.pc1.childPage[1]);														
	// 			this.cb_kode.setText(this.sg1.cells(0,row));	
	// 		}
	// 	} catch(e) {alert(e);}
	// },
	entriesClick: function(sender,col,row){
		try
		{ 
		 	
				if (sender == this.addBtn ){
					uses("app_saku3_transaksi_belajar_fModalDet2");
					// if (this.entryMenu == undefined)
					this.entryMenu = new app_saku3_transaksi_belajar_fModalDet2(this.app,"");
					this.entryMenu.setTop((this.app._mainForm.height / 2) - 150);
					this.entryMenu.setLeft((this.app._mainForm.width / 2)- 200);			
					this.entryMenu.setHeight(300);
					this.entryMenu.setWidth(400);
					this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);

					this.selectedItem = undefined;		
					this.entryMenu.setCaption("Add Entries");			
										
					this.entryMenu.event = "Add";					
					// this.entryMenu.setItemParent(this.selectedItem);
					this.entryMenu.formRequester = this;
					this.entryMenu.cb_kode.setReadOnly(false);
					this.entryMenu.cb_kode.setText("");
					this.entryMenu.e_nama.setText("");
					this.entryMenu.showModal();
					
					// this.entryMenu.setModul(this.e0.getText());
					// var result = this.getSummary("");
					// result += ";-";
					// result = result.substr(1);
					// var resArray = result.split(";");
					// var resArray= [];
					// this.entryMenu.setSummaryItems(resArray);
				}
				else if (sender == this.sg2 && this.sg2.cells(0,row) != ""){
					if (col == 5){
						uses("app_saku3_transaksi_belajar_fModalDet2");
						// if (this.entryMenu == undefined)
						this.entryMenu = new app_saku3_transaksi_belajar_fModalDet2(this.app,"");
						this.entryMenu.setTop((this.app._mainForm.height / 2) - 150);
						this.entryMenu.setLeft((this.app._mainForm.width / 2)- 200);			
						this.entryMenu.setHeight(300);
						this.entryMenu.setWidth(400);
						this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);
						// var item = this.treev.getSelectedItem();
						this.selectedItem = this.sg2.row;
						this.entryMenu.event = "Edit";					
						this.entryMenu.formRequester = this;
						this.entryMenu.setCaption("Edit Data");
						// this.entryMenu.setItemParent(item);
						this.entryMenu.cb_kode.setText(this.sg2.cells(0,row));
						this.entryMenu.cb_kode.setReadOnly(true);
						this.entryMenu.e_nama.setText(this.sg2.cells(1,row));
						this.entryMenu.e_modul.setText(this.sg2.cells(2,row));
						this.entryMenu.c_format.setText(this.sg2.cells(3,row));
						this.entryMenu.cb_fs.setText(this.sg2.cells(4,row));
						this.entryMenu.showModal();		
					}
					if (col == 6){
						var item = this.sg2.row;
						this.selectedItem = item;
						var kode = this.sg2.cells(0,item);
						system.confirm(this, "Remove","Yakin data kode = "+kode+" akan dihapus?","");
					}
				}else if (sender == this.delBtn){
					var item = this.sg2.row;
					this.selectedItem = item;
					var kode = this.sg2.cells(0,item);
					system.confirm(this, "Remove","Yakin data kode = "+kode+" akan dihapus?","");
				}		
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
});