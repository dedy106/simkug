//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_assetsap_transaksi_fArsipV = function(owner,options){
	try{
		if (owner)
		{
			window.app_assetsap_transaksi_fArsipV.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_assetsap_transaksi_fArsipV";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar Arsip",0);
            this.initComponent();
            this.onClose.set(this,"doClose");
			this.app._mainForm.bSimpan.setCaption("Proses");
		}
	}catch(e)
	{
		alert("[app_assetsap_transaksi_fArsipV]::contruct:"+e,"");
	}
};
window.app_assetsap_transaksi_fArsipV.extend(window.childForm);
window.app_assetsap_transaksi_fArsipV.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 40);
    },
    doClose: function(sender){
        this.app._mainForm.bSimpan.setCaption("<u>S</u>impan");
    },
    initComponent: function(){
		try{
			uses("util_standar;util_filterRep;saiGrid;sgNavigator;toolbar;roundPanel;datePicker;radioButton");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.toolbar = new toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			this.p1mp = new panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar Arsip"});
			this.sg1mp = new saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,this.p1mp.height - 50],colCount:13,
				colTitle:"No Arsip, No Surat, Deskripsi, Lokasi, No Ordner, Alamat, Kelurahan, Kecamatan, Kodya, Propinsi, Luas Tanah, Luas Bangunan,Preview ",
                colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,100,100,100,150,80,80,150,100,100]],dblClick:[this,"sg1onDblClick"], 
                selectCell:[this,"doSgClick"], colFormat:[[10,11,12],[cfNilai,cfNilai, cfButton]],readOnly:true, colAlign:[[12],[alCenter]]});
            this.sgn = new sgNavigator(this.p1mp,{bound:[1,this.p1mp.height - 25,this.p1mp.width - 4,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
			
			this.p1mp2 = new panel(this,{bound:[20,300,500,180],border:3,caption:"Detail File"});
			this.sg1mp2 = new saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:2,readOnly:true,
				colTitle:"Nama File, Download",
                colWidth:[[1,0],[100,250]],colFormat:[[1],[cfButton]],click:[this,"doSgBtnClick"], 
                colAlign:[[1],[alCenter]]});
			this.sgn2 = new sgNavigator(this.p1mp2,{bound:[1,this.p1mp2.height - 25,this.p1mp2.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
					
			this.userLogin="";
			if (this.app._userStatus=='U')
			{
				this.userLogin = " and b.nik_buat='"+this.app._userLog+"'"; 
			}
			
			this.pager = 20;
			var sql = "select count(a.no_arsip)	   "+                         
					"from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
					"where a.kode_lokasi='"+this.app._lokasi+"' ";
			this.sqlCount = sql;
			this.rowCount = this.dbLib.getRowCount(sql, this.pager);
            this.sgn.setTotalPage(this.rowCount);
            this.sgn.rearrange();
                        
			this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:3,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],
				change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();          
            
            var sql = new server_util_arrayList({items:[
				"select a.kode_kodya, a.nama as nmkodya, b.nama as nmprop from amu_kodya a "+
				"	inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi "+
				"where a.kode_lokasi = '"+this.app._lokasi+"' ",
				"select distinct b.kode_lokfa, a.kode_rak from amu_rak a inner join amu_lokfa b on b.kode_lokasi = a.kode_lokasi and b.kode_lokfa between a.awal and a.akhir "+
				"where a.kode_lokasi = '"+this.app._lokasi +"' "
            ]});
            this.dbLib.getMultiDataProviderA(sql);
			this.sql =  "select distinct a.no_arsip, a.no_surat, a.nama, a.kode_lokfa, b.alamat, b.kel, b.kec, b.kode_kodya as kodya, b.kode_prop as prop, b.tanah, b.bangun "+
					" from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+					
					"where a.kode_lokasi = '"+this.app._lokasi+"' ";				
			this.filter = "";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Lokasi Aset","All","",""]);
			this.sgFilter.editData(2,["No Arsip","All","",""]);			
			this.filterRep = new util_filterRep();			
		}catch(e){
			alert(e);
		}
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
    doClick: function(sender){
        try{
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
			    this.filterRep.filterStr("a.kode_lokfa",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
			    this.filterRep.filterStr("a.no_arsip",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and")
    			this.rowCount = this.dbLib.getRowCount(this.sqlCount+this.filter, this.pager);				
				
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
    	        this.doPager(this.sgn,1);		        
    	        this.pFilter.hide();
            }
       }catch(e){
            alert(e);
       }
    },
    FindBtnClick: function(sender){
        if (sender == this.cbSales)
            this.standarLib.showListData(this.getForm(), "Data Lokasi Aset",sender,undefined,
										  "select kode_lokfa, alamat from amu_lokfa where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from  amu_lokfa where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_lokfa","alamat"],"and",["Kode Lokasi Aset","Alamat"]);
        if (sender == this.cbCust)
            this.standarLib.showListData(this.getForm(), "Data Arsip",sender,undefined,
										  "select no_arsip,nama, no_surat from amu_arsip where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from amu_arsip where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["no_arsip","nama","no_surat"],"and",["No Arsip","Nama","No Sertifikat"]);
    },
	doPager: function(sender,page){
			this.senderPager = sender;
			if (sender == this.sgn){
				this.activePage = page;
				this.dbLib.getDataProviderPageA(this.sql+" "+this.filter+" order by a.no_arsip",page, this.pager);   			 
			}
    },
	doRequestReady: function(sender, methodName, result){				
	   try{		   
		   if (sender === this.dbLib){
			   if (methodName == "getDataProviderPage"){			   				   
					var brg = JSON.parse(result);
					if (brg){			        
						this.sg1mp.clear();
						this.gridDataTmp = new arrayMap();
						if (brg.rs.rows[0]){
							this.sg1mp.showLoading();
							var line;
							for (var i in brg.rs.rows){
								line = brg.rs.rows[i];
								var dt = this.dataPropinsi.get(line.kodya);
								if (dt == undefined) dt = {nmkodya:'-', nmprop:'-'};
								var ordner = this.dataOrdner.get(line.kode_lokfa);
								if (ordner == undefined) ordner = {kode_rak:'-'};
								this.sg1mp.appendData([line.no_arsip, line.no_surat, line.nama, line.kode_lokfa, ordner.kode_rak,line.alamat, line.kel, line.kec, dt.nmkodya, dt.nmprop, line.tanah, line.bangun,"Preview"]);
								this.sg1mp.rows.get(i).setData(line);
								this.sg1mp.rows.get(i).setCellColor(12,"#ff9900");
								this.sg1mp.rows.get(i).setHint("Double Click untuk menampilkan detail.");
								this.gridDataTmp.set(line.no_arsip,line);
							}					
							this.sg1mp.hideLoading();
						}
					}	
				}else if (methodName == 'getMultiDataProvider'){
					var data = JSON.parse(result);
					this.dataPropinsi = new arrayMap();
					var line;
					for (var i in data.result[0].rs.rows){
						line = data.result[0].rs.rows[i];
						this.dataPropinsi.set(line.kode_kodya, line);						
					}
					this.dataOrdner = new arrayMap();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.dataOrdner.set(line.kode_lokfa, line);						
					}
				}
		   }
	   }catch(e){
			alert(e+"\r\n"+result);
	   }
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 1)
				window.open("server/media/"+this.sg1mp2.getCell(0,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
	},
	doSgClick:function(sender, col, row){				
		try{
			var data = this.dbLib.getDataProvider("select no_gambar as nm from amu_arsip_dok "+
					"where no_arsip='"+sender.getCell(0,row)+"'",true);
			this.sg1mp2.clear();
			if (typeof(data) != "string")
			{  
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mp2.showLoading();
					this.sg1mp2.setColWidth([1,0],[80,250]);
					for (var k in data.rs.rows){
						var line=data.rs.rows[k];
						this.sg1mp2.appendData([line.nm,"Download"]);
						this.sg1mp2.rows.get(k).setCellColor(1,"#ff9900");							
					}
					this.sg1mp2.hideLoading();
				}
			}				
			this.sgn2.setTotalPage(1);
			this.sgn2.rearrange();						
		}catch(e){
			alert(e);
		}
	},
	mainButtonClik: function(sender){
	   if (sender == this.app._mainForm.bSimpan) system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini akan di proses.");	
    },	
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1,2,3,4,5),new  Array("123","123","123","123","123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct date_format(tgl_input, '%Y%m') as periode from amu_arsip where kode_lokasi='"+this.app._lokasi+"' order by date_format(tgl_input, '%Y%m') desc ");
				if (rs instanceof arrayMap){
					sender.columns.get(2).pickList.clear();
					var ix=0;
					for (var i in rs.objList){								
						sender.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
						ix++;
					}
				}
			}
		}catch(e){
			alert(e);
		}
		
	},
	doEllipsFilterClick: function(sender, col, row){
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Aset",sender, sender.row, sender.col,
													  "select distinct kode_lokfa, alamat, kel, kec from amu_lokfa where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_lokfa) from amu_lokfa where kode_lokasi='"+this.app._lokasi+"'",
													  ["kode_lokfa","alamat","kec","kel"],"and",["Kode Lokasi","Alamat","Kelurahan","Kecamatan"]);
		}		
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Arsip",sender, sender.row, sender.col,
													  "select distinct no_arsip, nama, no_surat from amu_arsip where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct no_arsip, nama) from amu_arsip where kode_lokasi='"+this.app._lokasi+"'",
													  ["no_arsip","nama","no_surat"],"and",["No Arsip","Nama","No Surat"]);
		}		
	},
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (sender.getCell(1,row)=="All")
		 {
			sender.setCell(2,row,"");
			sender.setCell(3,row,"");
		 }
		} 
	}
});
